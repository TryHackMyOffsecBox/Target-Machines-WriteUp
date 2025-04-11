# Envy

## 信息搜集

```plaintext
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.5 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 48add5b83a9fbcbef7e8201ef6bfdeae (RSA)
|   256 b7896c0b20ed49b2c1867c2992741c1f (ECDSA)
|_  256 18cd9d08a621a8b8b6f79f8d405154fb (ED25519)
80/tcp   open  http    Apache httpd 2.4.41 ((Ubuntu))
|_http-server-header: Apache/2.4.41 (Ubuntu)
|_http-generator: CMS Made Simple - Copyright (C) 2004-2022. All rights reserved.
|_http-title: Home - Envy
8080/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
|_http-open-proxy: Proxy might be redirecting requests
|_http-server-header: Apache/2.4.41 (Ubuntu)
| http-title: PetLover - Pet Care Website Template
|_Requested resource was index.php?page=index.html
```

## http 80 目录扫描

```plaintext
[12:13:32] 301 -  314B  - /admin  ->  http://10.10.110.101/admin/
[12:13:33] 302 -    0B  - /admin/  ->  http://10.10.110.101/admin/login.php
[12:13:33] 302 -    0B  - /admin/?/login  ->  http://10.10.110.101/admin/login.php
[12:13:33] 302 -    0B  - /admin/index.php  ->  http://10.10.110.101/admin/login.php
[12:13:34] 200 -    4KB - /admin/login.php
[12:13:46] 200 -    2KB - /assets/
[12:13:46] 301 -  315B  - /assets  ->  http://10.10.110.101/assets/
[12:13:53] 200 -    0B  - /config.php
[12:13:58] 200 -   24B  - /doc/
[12:13:58] 301 -  312B  - /doc  ->  http://10.10.110.101/doc/
[12:14:07] 200 -   19KB - /index.php
[12:14:10] 301 -  312B  - /lib  ->  http://10.10.110.101/lib/
[12:14:10] 200 -   24B  - /lib/
[12:14:15] 301 -  316B  - /modules  ->  http://10.10.110.101/modules/
[12:14:15] 200 -    3KB - /modules/
[12:14:27] 403 -  278B  - /server-status/
[12:14:27] 403 -  278B  - /server-status
[12:14:34] 301 -  312B  - /tmp  ->  http://10.10.110.101/tmp/
[12:14:34] 200 -    1KB - /tmp/
[12:14:36] 301 -  316B  - /uploads  ->  http://10.10.110.101/uploads/
[12:14:36] 200 -    0B  - /uploads/
```

## http 8080 目录扫描

```plaintext
[12:10:18] 200 -    1KB - /LICENSE.txt
[12:10:24] 200 -   22KB - /about.html
[12:10:49] 200 -   14KB - /contact.html
[12:10:50] 301 -  319B  - /css  ->  http://10.10.110.101:8080/css/
[12:11:00] 301 -  319B  - /img  ->  http://10.10.110.101:8080/img/
[12:11:01] 302 -    0B  - /index.php  ->  index.php?page=index.html
[12:11:01] 302 -    0B  - /index.php/login/  ->  index.php?page=index.html
[12:11:02] 200 -   46KB - /index.html
[12:11:03] 200 -  931B  - /js/
[12:11:04] 301 -  319B  - /lib  ->  http://10.10.110.101:8080/lib/
[12:11:04] 200 -    2KB - /lib/
[12:11:07] 301 -  320B  - /mail  ->  http://10.10.110.101:8080/mail/
[12:11:07] 200 -    1KB - /mail/
```

## http 80 cms config

```php
<?php
# CMS Made Simple Configuration File
# Documentation: https://docs.cmsmadesimple.org/configuration/config-file/config-reference
#
$config['dbms'] = 'mysqli';
$config['db_hostname'] = 'localhost';
$config['db_username'] = 'db_admin';
$config['db_password'] = 'ThisIsAVerySecurePassword123!';
$config['db_name'] = 'cmsms';
$config['db_prefix'] = 'cms_';
$config['timezone'] = 'UTC';
?>
```
