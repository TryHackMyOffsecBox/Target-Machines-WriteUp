# Emilie

## 信息搜集

```shell
Nmap scan report for bogon (10.10.110.103)
Host is up (0.25s latency).
Not shown: 65529 closed tcp ports (reset)
PORT      STATE SERVICE     VERSION
22/tcp    open  ssh         OpenSSH 8.2p1 Ubuntu 4 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   3072 8b:8c:dd:5a:5d:97:ce:fc:a4:b9:0a:9d:d6:43:7a:78 (RSA)
|   256 a6:0e:b9:34:ea:e4:0d:82:0a:22:4b:68:4a:c7:12:c2 (ECDSA)
|_  256 d4:6a:55:a3:68:14:8c:67:6e:3d:6b:7e:31:69:c9:f4 (ED25519)
80/tcp    open  http        Apache httpd 2.4.41 ((Ubuntu))
|_http-title: Apache2 Ubuntu Default Page: It works
|_http-server-header: Apache/2.4.41 (Ubuntu)
| http-methods:
|_  Supported Methods: POST OPTIONS HEAD GET
139/tcp   open  netbios-ssn Samba smbd 4
445/tcp   open  netbios-ssn Samba smbd 4
3306/tcp  open  mysql?
| mysql-info:
|   Protocol: 10
|   Version: 8.0.20-0ubuntu0.20.04.1
|   Thread ID: 65
|   Capabilities flags: 65535
|   Some Capabilities: DontAllowDatabaseTableColumn, ConnectWithDatabase, SupportsTransactions, IgnoreSpaceBeforeParenthesis, Support41Auth, FoundRows, ODBCClient, Speaks41ProtocolOld, IgnoreSigpipes, SwitchToSSLAfterHandshake, SupportsLoadDataLocal, LongColumnFlag, LongPassword, InteractiveClient, Speaks41ProtocolNew, SupportsCompression, SupportsMultipleResults, SupportsAuthPlugins, SupportsMultipleStatments
|   Status: Autocommit
|   Salt: M%@NsKM\x1D)oDAZ>Q5OcU,
|_  Auth Plugin Name: caching_sha2_password
33060/tcp open  mysqlx?
Device type: general purpose
Running: Linux 4.X|5.X
OS CPE: cpe:/o:linux:linux_kernel:4 cpe:/o:linux:linux_kernel:5
OS details: Linux 4.15 - 5.19
Uptime guess: 21.495 days (since Fri Mar 21 07:50:46 2025)
Network Distance: 2 hops
TCP Sequence Prediction: Difficulty=260 (Good luck!)
IP ID Sequence Generation: All zeros
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

## wpscan

```shell
┌──(randark ㉿ kali)-[~]
└─$ sudo wpscan --url 10.10.111.107
_______________________________________________________________
         __          _______   _____
         \ \        / /  __ \ / ____|
          \ \  /\  / /| |__) | (___   ___  __ _ _ __ ®
           \ \/  \/ / |  ___/ \___ \ / __|/ _` | '_ \
            \  /\  /  | |     ____) | (__| (_| | | | |
             \/  \/   |_|    |_____/ \___|\__,_|_| |_|

         WordPress Security Scanner by the WPScan Team
                         Version 3.8.28
       Sponsored by Automattic - https://automattic.com/
       @_WPScan_, @ethicalhack3r, @erwan_lr, @firefart
_______________________________________________________________

[+] URL: http://10.10.111.107/ [10.10.111.107]
[+] Started: Fri Apr 11 19:53:02 2025

Interesting Finding(s):

[+] Headers
 | Interesting Entry: Server: Apache/2.4.41 (Ubuntu)
 | Found By: Headers (Passive Detection)
 | Confidence: 100%

[+] XML-RPC seems to be enabled: http://10.10.111.107/xmlrpc.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%
 | References:
 |  - http://codex.wordpress.org/XML-RPC_Pingback_API
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_ghost_scanner/
 |  - https://www.rapid7.com/db/modules/auxiliary/dos/http/wordpress_xmlrpc_dos/
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_xmlrpc_login/
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_pingback_access/

[+] WordPress readme found: http://10.10.111.107/readme.html
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%

[+] Upload directory has listing enabled: http://10.10.111.107/wp-content/uploads/
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%

[+] The external WP-Cron seems to be enabled: http://10.10.111.107/wp-cron.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 60%
 | References:
 |  - https://www.iplocation.net/defend-wordpress-from-ddos
 |  - https://github.com/wpscanteam/wpscan/issues/1299

[+] WordPress version 5.4.1 identified (Insecure, released on 2020-04-29).
 | Found By: Style Etag (Aggressive Detection)
 |  - http://10.10.111.107/wp-admin/load-styles.php, Match: '5.4.1'
 | Confirmed By: Opml Generator (Aggressive Detection)
 |  - http://10.10.111.107/wp-links-opml.php, Match: 'generator="WordPress/5.4.1"'

[i] The main theme could not be detected.

[+] Enumerating All Plugins (via Passive Methods)

[i] No plugins Found.

[+] Enumerating Config Backups (via Passive and Aggressive Methods)
 Checking Config Backups - Time: 00:00:06 <=================================================================================================================================> (137 / 137) 100.00% Time: 00:00:06

[i] Config Backup(s) Identified:

[!] http://10.10.111.107/wp-config.php.bak
 | Found By: Direct Access (Aggressive Detection)

[!] No WPScan API Token given, as a result vulnerability data has not been output.
[!] You can get a free API token with 25 daily requests by registering at https://wpscan.com/register

[+] Finished: Fri Apr 11 19:53:11 2025
[+] Requests Done: 140
[+] Cached Requests: 39
[+] Data Sent: 35.601 KB
[+] Data Received: 19.988 KB
[+] Memory used: 242.301 MB
[+] Elapsed time: 00:00:09
```

## SMB
