# Devvortex

:::info

Difficulty: Easy

Operating System: Linux

:::

## nmap 信息搜集

```shell title="sudo nmap -A --min-rate=5000 -T5 -p- 10.10.11.242"
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.9 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   3072 48:ad:d5:b8:3a:9f:bc:be:f7:e8:20:1e:f6:bf:de:ae (RSA)
|   256 b7:89:6c:0b:20:ed:49:b2:c1:86:7c:29:92:74:1c:1f (ECDSA)
|_  256 18:cd:9d:08:a6:21:a8:b8:b6:f7:9f:8d:40:51:54:fb (ED25519)
80/tcp open  http    nginx 1.18.0 (Ubuntu)
|_http-title: Did not follow redirect to http://devvortex.htb/
|_http-server-header: nginx/1.18.0 (Ubuntu)
```

## web service

添加 hosts 记录之后，访问 `http://devvortex.htb/`

![img](img/image_20240348-184843.png)

尝试进行目录爆破

```shell
┌──(randark ㉿ kali)-[~]
└─$ gobuster dir -w /usr/share/wordlists/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -u http://devvortex.htb/
===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://devvortex.htb/
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.6
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
/images               (Status: 301) [Size: 178] [--> http://devvortex.htb/images/]
/css                  (Status: 301) [Size: 178] [--> http://devvortex.htb/css/]
/js                   (Status: 301) [Size: 178] [--> http://devvortex.htb/js/]
===============================================================
Finished
===============================================================
```

没有发现有价值信息，尝试进行 dns 子域爆破，发现一个子域 `dev.devvortex.htb`

对 `dev.devvortex.htb` 进行目录爆破

```plaintext
[19:06:46] 200 -   31B  - /administrator/cache/
[19:06:46] 301 -  178B  - /administrator/logs  ->  http://dev.devvortex.htb/administrator/logs/
[19:06:46] 200 -   31B  - /administrator/logs/
[19:06:47] 200 -   12KB - /administrator/index.php
[19:06:47] 200 -   12KB - /administrator/
[19:07:16] 200 -   31B  - /cache/
[19:07:17] 403 -    4KB - /cache/sql_error_latest.cgi
[19:07:24] 200 -   31B  - /cli/
[19:07:27] 301 -  178B  - /components  ->  http://dev.devvortex.htb/components/
[19:07:27] 200 -   31B  - /components/
[19:07:31] 200 -    0B  - /configuration.php
[19:08:16] 200 -    7KB - /htaccess.txt
[19:08:19] 301 -  178B  - /images  ->  http://dev.devvortex.htb/images/
[19:08:19] 200 -   31B  - /images/
[19:08:21] 200 -   31B  - /includes/
[19:08:21] 301 -  178B  - /includes  ->  http://dev.devvortex.htb/includes/
[19:08:32] 301 -  178B  - /language  ->  http://dev.devvortex.htb/language/
[19:08:32] 200 -   31B  - /layouts/
[19:08:34] 200 -   31B  - /libraries/
[19:08:34] 200 -   18KB - /LICENSE.txt
[19:08:46] 200 -   31B  - /media/
[19:08:46] 301 -  178B  - /media  ->  http://dev.devvortex.htb/media/
[19:08:52] 301 -  178B  - /modules  ->  http://dev.devvortex.htb/modules/
[19:08:53] 200 -   31B  - /modules/
[19:09:22] 301 -  178B  - /plugins  ->  http://dev.devvortex.htb/plugins/
[19:09:22] 200 -   31B  - /plugins/
[19:09:32] 200 -    5KB - /README.txt
[19:09:37] 200 -  764B  - /robots.txt
[19:10:07] 200 -   31B  - /templates/
[19:10:07] 200 -   31B  - /templates/index.html
[19:10:07] 200 -    0B  - /templates/system/
[19:10:11] 200 -   31B  - /tmp/
[19:10:30] 200 -    3KB - /web.config.txt
......
```

TODO 未完成