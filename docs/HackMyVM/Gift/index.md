# Gift

:::note

 [Linux VM] [Tested on VirtualBox] created by || sml

⏲️ Release Date // 2020-09-25

✔️ MD5 // 8739fe37f9831989cff0ec5dba714947

☠ Root // 516

💀 User // 501

A really easy VM. Thats a gift :)

:::

## 靶机启动

![靶机启动](img/image_20231248-224823.png)

虚拟机 IP：

```plaintext
192.168.163.129
```

## nmap 信息搜集

```shell
Nmap scan report for 192.168.163.129
Host is up (0.00037s latency).
Not shown: 65533 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.3 (protocol 2.0)
| ssh-hostkey:
|   3072 2c1b3627e54c527b3e10944139efb295 (RSA)
|   256 93c11e32240e34d9020effc39c599bdd (ECDSA)
|_  256 81ab36ecb12b5cd28655120c510027d7 (ED25519)
80/tcp open  http    nginx
|_http-title: Site doesn't have a title (text/html).
MAC Address: 00:0C:29:8A:C2:42 (VMware)
Device type: general purpose
Running: Linux 4.X|5.X
OS CPE: cpe:/o:linux:linux_kernel:4 cpe:/o:linux:linux_kernel:5
OS details: Linux 4.15 - 5.6
Network Distance: 1 hop
```

## 访问 web - 80

![web port 80](img/image_20231255-225548.png)

```shell
┌─[randark@randark-Parrot]─[~]
└──╼ $http get 192.168.163.129
HTTP/1.1 200 OK
Accept-Ranges: bytes
Connection: keep-alive
Content-Length: 57
Content-Type: text/html
Date: Thu, 21 Dec 2023 15:11:49 GMT
ETag: "5f678373-39"
Last-Modified: Sun, 20 Sep 2020 16:29:39 GMT
Server: nginx

Dont Overthink. Really, Its simple.
        <!-- Trust me -->
```

## 尝试目录爆破

```shell
┌─[✗]─[randark@randark-Parrot]─[~]
└──╼ $dirsearch -u 192.168.163.129

  _|. _ _  _  _  _ _|_    v0.4.2
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 30 | Wordlist size: 10903

Output File: /usr/lib/python3/dist-packages/dirsearch/reports/192.168.163.129_23-12-21_22-56-29.txt

Error Log: /usr/lib/python3/dist-packages/dirsearch/logs/errors-23-12-21_22-56-29.log

Target: http://192.168.163.129/

[22:56:29] Starting:
[22:56:38] 200 -   57B  - /index.html
```

## 尝试登录 SSH 服务

:::note 上文 web 所说的内容

```plaintext
ont Overthink. Really, Its simple.
```

尝试使用 `simple` 作为凭据登录 ssh 服务

:::

```shell
┌─[randark@randark-Parrot]─[~]
└──╼ $ssh root@192.168.163.129
root@192.168.163.129's password:
IM AN SSH SERVER
gift:~# whoami
root
gift:~# ls -lh
total 8K
----------    1 root     root          12 Sep 24  2020 root.txt
-rw-rw----    1 root     root          12 Sep 24  2020 user.txt
```

## user pwned

```shell
gift:~# cat user.txt
HMV665sXzDS
```

## root pwned

```shell
gift:~# cat root.txt
HMVtyr543FG
```
