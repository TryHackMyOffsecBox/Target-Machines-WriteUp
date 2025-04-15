# Mega

## 信息收集

```bash
Detected ss and lsof, executing related commands...
Port: 56263, PID: 777
—> Command: /usr/sbin/rpc.mountd --manage-gids 
Port: 37673, PID: 777
—> Command: /usr/sbin/rpc.mountd --manage-gids 
Port: 3306, PID: 819
—> Command: /usr/sbin/mysqld 
Port: 111, PID: 1
—> Command: /sbin/init maybe-ubiquity 
Port: 53, PID: 573
—> Command: /lib/systemd/systemd-resolved 
Port: 22, PID: 775
—> Command: sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups 
Port: 48223, PID: 777
—> Command: /usr/sbin/rpc.mountd --manage-gids 
Port: 2049, PID: Not found
—> Command: Not available
Port: 33060, PID: 819
—> Command: /usr/sbin/mysqld 

## ———————————————————————————— ##

Nginx is not installed.

## ———————————————————————————— ##

Detected apache, analyzing its configuration...
File: /etc/apache2/sites-enabled/000-default.conf
DocumentRoot: /var/www/wordpress
/var/www/html/maian_cart/store
Hosts:
10.10.111.103 mega.htb
10.10.111.103 store.mega.htb
10.10.111.103 mega.htb
10.10.111.103 store.mega.htb
———

Unique Hosts:

10.10.111.103 mega.htb
10.10.111.103 store.mega.htb

## ———————————————————————————— ##

Checking /etc/sudoers (active configurations only):
  Defaults      env_reset
  Defaults      mail_badpass
  Defaults      secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"
  root  ALL=(ALL:ALL) ALL
  %admin ALL=(ALL) ALL
  %sudo ALL=(ALL:ALL) ALL
———
Finding SUID files:
/usr/sbin/mount.nfs
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/eject/dmcrypt-get-device
/usr/lib/policykit-1/polkit-agent-helper-1
/usr/lib/openssh/ssh-keysign
/usr/bin/mount
/usr/bin/sudo
/usr/bin/pkexec
/usr/bin/gpasswd
/usr/bin/umount
/usr/bin/passwd
/usr/bin/fusermount
/usr/bin/chsh
/usr/bin/at
/usr/bin/chfn
/usr/bin/newgrp
/usr/bin/su
———
Finding files with special capabilities:
  /usr/lib/x86_64-linux-gnu/gstreamer1.0/gstreamer-1.0/gst-ptp-helper = cap_net_bind_service,cap_net_admin+ep
  /usr/bin/ping = cap_net_raw+ep
  /usr/bin/mtr-packet = cap_net_raw+ep
  /usr/bin/traceroute6.iputils = cap_net_raw+ep
```

## mega.htb Wordpress wpscan

```bash
[+] URL: http://mega.htb/ [10.10.111.103]
[+] Started: Tue Apr 15 20:35:51 2025

Interesting Finding(s):

[+] Headers
 | Interesting Entry: Server: Apache/2.4.41 (Ubuntu)
 | Found By: Headers (Passive Detection)
 | Confidence: 100%

[+] XML-RPC seems to be enabled: http://mega.htb/xmlrpc.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%
 | References:
 |  - http://codex.wordpress.org/XML-RPC_Pingback_API
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_ghost_scanner/
 |  - https://www.rapid7.com/db/modules/auxiliary/dos/http/wordpress_xmlrpc_dos/
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_xmlrpc_login/
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_pingback_access/

[+] WordPress readme found: http://mega.htb/readme.html
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%

[+] Upload directory has listing enabled: http://mega.htb/wp-content/uploads/
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%

[+] The external WP-Cron seems to be enabled: http://mega.htb/wp-cron.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 60%
 | References:
 |  - https://www.iplocation.net/defend-wordpress-from-ddos
 |  - https://github.com/wpscanteam/wpscan/issues/1299

[+] WordPress version 5.8.2 identified (Insecure, released on 2021-11-10).
 | Found By: Rss Generator (Passive Detection)
 |  - http://mega.htb/?feed=rss2, <generator>https://wordpress.org/?v=5.8.2</generator>
 |  - http://mega.htb/?feed=comments-rss2, <generator>https://wordpress.org/?v=5.8.2</generator>

[+] WordPress theme in use: spicepress-dark
 | Location: http://mega.htb/wp-content/themes/spicepress-dark/
 | Last Updated: 2023-12-05T00:00:00.000Z
 | Readme: http://mega.htb/wp-content/themes/spicepress-dark/readme.txt
 | [!] The version is out of date, the latest version is 1.1.3
 | [!] Directory listing is enabled
 | Style URL: http://mega.htb/wp-content/themes/spicepress-dark/style.css?ver=5.8.2
 | Style Name: SpicePress Dark
 | Style URI: https://spicethemes.com/spicepress-dark-wordpress-theme/
 | Description: SpicePress Dark WordPress Theme is a lightweight, elegant, fully responsive, and translation-ready t...
 | Author: spicethemes
 | Author URI: https://spicethemes.com
 |
 | Found By: Css Style In Homepage (Passive Detection)
 |
 | Version: 0.1 (80% confidence)
 | Found By: Style (Passive Detection)
 |  - http://mega.htb/wp-content/themes/spicepress-dark/style.css?ver=5.8.2, Match: 'Version: 0.1'

[+] Enumerating All Plugins (via Passive Methods)
[+] Checking Plugin Versions (via Passive and Aggressive Methods)

[i] Plugin(s) Identified:

[+] pie-register
 | Location: http://mega.htb/wp-content/plugins/pie-register/
 | Last Updated: 2025-03-24T15:27:00.000Z
 | [!] The version is out of date, the latest version is 3.8.4.3
 |
 | Found By: Urls In Homepage (Passive Detection)
 |
 | Version: 3.7.1.4 (80% confidence)
 | Found By: Readme - Stable Tag (Aggressive Detection)
 |  - http://mega.htb/wp-content/plugins/pie-register/readme.txt

[+] Enumerating Config Backups (via Passive and Aggressive Methods)
 Checking Config Backups - Time: 00:00:07 <=================================================================================================================================> (137 / 137) 100.00% Time: 00:00:07

[i] No Config Backups Found.

[!] No WPScan API Token given, as a result vulnerability data has not been output.
[!] You can get a free API token with 25 daily requests by registering at https://wpscan.com/register

[+] Finished: Tue Apr 15 20:36:14 2025
[+] Requests Done: 173
[+] Cached Requests: 5
[+] Data Sent: 42.313 KB
[+] Data Received: 373.986 KB
[+] Memory used: 260.941 MB
[+] Elapsed time: 00:00:22
```

但是应该 Wordpress 限制登陆了，上传插件利用失败了

## store.mega.htb

```plaintext
Maian-Cart 3.8 - Remote Code Execution (RCE) (Unauthenticated)
/usr/share/exploitdb/exploits/php/webapps/50394.py
```
