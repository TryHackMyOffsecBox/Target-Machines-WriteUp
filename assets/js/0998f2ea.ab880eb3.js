"use strict";(self.webpackChunktarget_machines_write_up=self.webpackChunktarget_machines_write_up||[]).push([[9591],{83310:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>r,contentTitle:()=>l,default:()=>g,frontMatter:()=>a,metadata:()=>i,toc:()=>t});const i=JSON.parse('{"id":"Xuanji/Incident Response/94","title":"\u9493\u9c7c\u4e8b\u4ef6\u5e94\u6025","description":"First of all","source":"@site/docs/Xuanji/Incident Response/94.md","sourceDirName":"Xuanji/Incident Response","slug":"/Xuanji/Incident Response/94","permalink":"/Target-Machines-WriteUp/docs/Xuanji/Incident Response/94","draft":false,"unlisted":false,"editUrl":"https://github.com/TryHackMyOffsecBox/Target-Machines-WriteUp/edit/main/docs/Xuanji/Incident Response/94.md","tags":[],"version":"current","frontMatter":{},"sidebar":"Xuanji_Sidebar","previous":{"title":"\u67d0\u53d8\u5f02 Webshell \u6d41\u91cf\u5206\u6790","permalink":"/Target-Machines-WriteUp/docs/Xuanji/Incident Response/103"},"next":{"title":"Linux \u540e\u95e8\u5e94\u6025","permalink":"/Target-Machines-WriteUp/docs/Xuanji/Incident Response/95"}}');var c=s(74848),d=s(28453);const a={},l="\u9493\u9c7c\u4e8b\u4ef6\u5e94\u6025",r={},t=[{value:"First of all",id:"first-of-all",level:2},{value:"1",id:"1",level:2},{value:"2",id:"2",level:2},{value:"3",id:"3",level:2},{value:"4",id:"4",level:2},{value:"5",id:"5",level:2},{value:"6",id:"6",level:2},{value:"7",id:"7",level:2},{value:"8",id:"8",level:2},{value:"9",id:"9",level:2}];function h(e){const n={admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",header:"header",img:"img",p:"p",pre:"pre",...(0,d.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.header,{children:(0,c.jsx)(n.h1,{id:"\u9493\u9c7c\u4e8b\u4ef6\u5e94\u6025",children:"\u9493\u9c7c\u4e8b\u4ef6\u5e94\u6025"})}),"\n",(0,c.jsx)(n.h2,{id:"first-of-all",children:"First of all"}),"\n",(0,c.jsx)(n.p,{children:"\u6253\u5f00 Defender \u4e4b\u540e\uff0c\u5bf9\u684c\u9762\u52a0\u5165\u767d\u540d\u5355"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"img",src:s(36135).A+"",width:"2010",height:"1151"})}),"\n",(0,c.jsxs)(n.p,{children:["\u7136\u540e\u4e0a\u4f20 ",(0,c.jsx)(n.code,{children:"disable-defender"})," \u5de5\u5177\uff0c\u5148\u628a Defender \u6740\u4e86\uff0c\u4e0d\u7136\u540e\u7eed\u6837\u672c\u53ef\u80fd\u4f1a\u627e\u4e0d\u5230"]}),"\n",(0,c.jsx)(n.h2,{id:"1",children:"1"}),"\n",(0,c.jsxs)(n.blockquote,{children:["\n",(0,c.jsxs)(n.p,{children:["\u653b\u51fb\u8005\u901a\u8fc7\u9493\u9c7c\u653b\u51fb\u62ff\u4e0b\u6765\u76ee\u6807\u4e3b\u673a\uff0c\u8bf7\u7ed9\u51fa\u653b\u51fb\u8005\u9493\u9c7c\u4f7f\u7528\u7684\u6f0f\u6d1e\u7f16\u53f7\uff0cflag \u683c\u5f0f: ",(0,c.jsx)(n.code,{children:"flag{CVE-2019-13514}"})]}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:"\u4f7f\u7528 RDP \u767b\u9646\u5230\u8fdc\u7a0b\u670d\u52a1\u5668"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"img",src:s(9240).A+"",width:"2014",height:"1264"})}),"\n",(0,c.jsx)(n.p,{children:"\u684c\u9762\u4e0a\u6709\u4e00\u4e2a rar \u538b\u7f29\u5305\uff0c\u4e3a\u6f0f\u6d1e\u901a\u62a5\u7684\u62a5\u544a\uff0c\u4e0b\u8f7d\u4e0b\u6765\u67e5\u770b"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"img",src:s(23288).A+"",width:"1391",height:"672"})}),"\n",(0,c.jsx)(n.p,{children:"\u67e5\u770b pdf \u6587\u4ef6"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"img",src:s(48156).A+"",width:"1172",height:"1302"})}),"\n",(0,c.jsx)(n.p,{children:"\u4f46\u662f\u5f88\u660e\u663e\u4e0d\u5bf9\uff0crar \u6587\u4ef6\u4e2d\u5b58\u5728\u6709\u4e00\u4e2a cmd \u811a\u672c"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"img",src:s(174).A+"",width:"1391",height:"672"})}),"\n",(0,c.jsx)(n.p,{children:"\u90a3\u4e48\u8bf4\u660e\u8fd9\u662f\u4e00\u4efd\u9493\u9c7c\u6587\u4ef6\uff0c\u5728 rar \u6267\u884c\u89e3\u538b\u7684\u8fc7\u7a0b\u4e2d\u7531\u4e8e\u6f0f\u6d1e\u4f1a\u89e6\u53d1\u8fd9\u4e2a cmd \u6587\u4ef6"}),"\n",(0,c.jsx)(n.p,{children:"\u6839\u636e\u5173\u952e\u8bcd\u8fdb\u884c\u641c\u7d22\uff0c\u5373\u53ef\u5b9a\u4f4d\u5177\u4f53\u6f0f\u6d1e"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-flag",children:"flag{CVE-2023-38831}\n"})}),"\n",(0,c.jsx)(n.h2,{id:"2",children:"2"}),"\n",(0,c.jsxs)(n.blockquote,{children:["\n",(0,c.jsxs)(n.p,{children:["\u7ed9\u51fa\u9493\u9c7c\u7a0b\u5e8f\u4e0b\u8f7d\u6728\u9a6c\u7684\u5730\u5740\uff0cflag \u683c\u5f0f: ",(0,c.jsx)(n.code,{children:"flag{http://127.0.0.1:3000/shell.exe}"})]}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:"\u5c06 rar \u538b\u7f29\u5305\u4e2d\u7684 cmd \u811a\u672c\u63d0\u53d6\u51fa\u6765\u67e5\u770b"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"img",src:s(97348).A+"",width:"1084",height:"797"})}),"\n",(0,c.jsx)(n.p,{children:"\u4e00\u4e2a\u4e8c\u8fdb\u5236\u7a0b\u5e8f\uff0c\u76f4\u63a5\u4e91\u6c99\u7bb1\u8fdb\u884c\u5206\u6790"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"img",src:s(41125).A+"",width:"2559",height:"1371"})}),"\n",(0,c.jsx)(n.p,{children:"\u76f4\u63a5\u5728\u884d\u751f\u6587\u4ef6\u9009\u9879\u4e2d\u4e0b\u8f7d pcap \u6d41\u91cf\u5305"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"img",src:s(53297).A+"",width:"2560",height:"1540"})}),"\n",(0,c.jsx)(n.p,{children:"\u5e76\u6ca1\u6709\u53d1\u73b0\u6709\u4ef7\u503c\u4fe1\u606f\uff0c\u4e8e\u662f\u76f4\u63a5 IDA \u8fdb\u884c\u9006\u5411\u5206\u6790"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"img",src:s(22980).A+"",width:"2560",height:"1540"})}),"\n",(0,c.jsx)(n.p,{children:"\u76f4\u63a5\u5f97\u5230\u4e86\u8fdc\u63a7\u6728\u9a6c\u7684\u4e0b\u8f7d\u5730\u5740"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-flag",children:"flag{http://192.168.229.156:7001/wls-wsat/7z.exe}\n"})}),"\n",(0,c.jsx)(n.h2,{id:"3",children:"3"}),"\n",(0,c.jsxs)(n.blockquote,{children:["\n",(0,c.jsxs)(n.p,{children:["\u7ed9\u51fa\u8fdc\u63a7\u6728\u9a6c\u7684\u5c0f\u5199 md5\uff0cflag \u683c\u5f0f\uff1a",(0,c.jsx)(n.code,{children:"flag{md5(shell.exe)}"})]}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:"\u5728\u4e0a\u4e00\u9898\u4e2d\uff0c\u5f97\u77e5\u4e86\u8fdc\u63a7\u6728\u9a6c\u4f1a\u4fdd\u5b58\u5728"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-plaintext",children:"C:\\\\Users\\\\Administrator\\\\AppData\\\\Local\\\\Temp\\\\7z.exe\n"})}),"\n",(0,c.jsx)(n.p,{children:"\u4f46\u662f\u5728\u8fd9\u4e2a\u76ee\u5f55\u4e0b\u6ca1\u6709\u53d1\u73b0\u6837\u672c\u6587\u4ef6"}),"\n",(0,c.jsx)(n.p,{children:"\u540c\u65f6\uff0c\u5728\u6728\u9a6c\u6837\u672c\u4e2d\u53d1\u73b0"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"img",src:s(77714).A+"",width:"2560",height:"1540"})}),"\n",(0,c.jsxs)(n.p,{children:["\u5b58\u5728\u6709 ",(0,c.jsx)(n.code,{children:"main_HideFile"})," \u51fd\u6570\uff0c\u53ef\u4ee5\u731c\u6d4b\u4e3a\u5c06\u6587\u4ef6\u8fdb\u884c\u9690\u85cf"]}),"\n",(0,c.jsx)(n.p,{children:"\u5f3a\u5236\u8bfb\u53d6\u6587\u4ef6\u7684\u6587\u4ef6\u54c8\u5e0c"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"img",src:s(87966).A+"",width:"2010",height:"1151"})}),"\n",(0,c.jsx)(n.p,{children:"\u5373\u53ef\u5f97\u5230\u6728\u9a6c\u6587\u4ef6\u7684\u54c8\u5e0c"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-flag",children:"flag{d1e11c3281072d11088e7b422ad52e6c}\n"})}),"\n",(0,c.jsx)(n.h2,{id:"4",children:"4"}),"\n",(0,c.jsxs)(n.blockquote,{children:["\n",(0,c.jsxs)(n.p,{children:["\u7ed9\u51fa\u8fdc\u63a7\u6728\u9a6c\u7a0b\u5e8f\u7684\u670d\u52a1\u7aef IP\uff1aflag \u683c\u5f0f\uff1a",(0,c.jsx)(n.code,{children:"flag{127.0.0.1}"})]}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:"\u5c06\u6728\u9a6c\u6587\u4ef6\u89e3\u9664\u9690\u85cf\u5c5e\u6027"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-shell",children:"PS C:\\Users\\Administrator\\AppData\\Local\\Temp> attrib.exe -H -S .\\7z.exe\n"})}),"\n",(0,c.jsx)(n.p,{children:"\u5373\u53ef\u770b\u5230\u6728\u9a6c\u6587\u4ef6"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"img",src:s(51691).A+"",width:"2010",height:"1151"})}),"\n",(0,c.jsx)(n.p,{children:"\u5c06\u6728\u9a6c\u6587\u4ef6\u63d0\u53d6\u51fa\u6765\u8fdb\u884c\u5206\u6790"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"img",src:s(26).A+"",width:"2559",height:"1371"})}),"\n",(0,c.jsx)(n.p,{children:"\u5728\u7f51\u7edc\u8fde\u63a5\u90e8\u5206\uff0c\u5373\u53ef\u770b\u5230\u8fdc\u63a7\u670d\u52a1\u5668\u7684 ip"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"img",src:s(65413).A+"",width:"2559",height:"1371"})}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-flag",children:"flag{192.168.229.136}\n"})}),"\n",(0,c.jsx)(n.h2,{id:"5",children:"5"}),"\n",(0,c.jsxs)(n.blockquote,{children:["\n",(0,c.jsxs)(n.p,{children:["\u7ed9\u51fa\u653b\u51fb\u8005\u5728\u6a2a\u5411\u4e2d\u4e0a\u4f20\u7684\u5185\u7f51\u626b\u63cf\u5de5\u5177\u4f4d\u7f6e\uff0cflag \u683c\u5f0f\uff1a",(0,c.jsx)(n.code,{children:"flag{C:\\Program Files (x86)\\Mozilla Firefox\\fonts\\a.exe}"})]}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:"\u6839\u636e\u653b\u51fb\u8005\u7684\u4e60\u60ef\uff0c\u5728 Windows \u5e38\u89c1\u7684 temp \u4e34\u65f6\u76ee\u5f55\u8fdb\u884c\u6392\u67e5\uff0c\u5e76\u7ed3\u5408 everything \u5de5\u5177\u53cc\u7ba1\u9f50\u4e0b\u8fdb\u884c\u641c\u7d22\uff0c\u5b9a\u4f4d\u5230"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-plaintext",children:"C:\\Windows\\Temp\\fscan.exe\n"})}),"\n",(0,c.jsx)(n.p,{children:"\u5373\u53ef\u786e\u5b9a\u7b54\u6848"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-flag",children:"flag{C:\\Windows\\Temp\\fscan.exe}\n"})}),"\n",(0,c.jsx)(n.h2,{id:"6",children:"6"}),"\n",(0,c.jsxs)(n.blockquote,{children:["\n",(0,c.jsxs)(n.p,{children:["\u7ed9\u51fa\u653b\u51fb\u8005\u5728\u6743\u9650\u7ef4\u6301\u4e2d\u521b\u5efa\u7684\u670d\u52a1\u540d\u79f0\uff0cflag \u683c\u5f0f:",(0,c.jsx)(n.code,{children:"flag{sc_name}"})]}),"\n"]}),"\n",(0,c.jsx)(n.admonition,{type:"note",children:(0,c.jsx)(n.p,{children:"\u4e00\u822c\u653b\u51fb\u8005\u521b\u5efa\u670d\u52a1\u7684\u65f6\u5019\uff0c\u4e0d\u4f1a\u523b\u610f\u9690\u85cf\uff0c\u6240\u4ee5\u76f4\u63a5\u4f18\u5148\u5148\u770b\u6ca1\u6709\u63cf\u8ff0\u7684\u670d\u52a1"})}),"\n",(0,c.jsxs)(n.p,{children:["\u6267\u884c ",(0,c.jsx)(n.code,{children:"services.msc"})," \u6253\u5f00\u670d\u52a1\u7a97\u53e3\uff0c\u5b9a\u4f4d\u5230"]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"img",src:s(86211).A+"",width:"2010",height:"1151"})}),"\n",(0,c.jsx)(n.p,{children:"\u770b\u8fd9\u4e2a\u7a0b\u5e8f\u8def\u5f84\uff0c\u80af\u5b9a\u662f\u540e\u95e8\u6743\u9650\u7ef4\u6301\u7684\u670d\u52a1"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-flag",children:"flag{MysqlServer}\n"})}),"\n",(0,c.jsx)(n.h2,{id:"7",children:"7"}),"\n",(0,c.jsxs)(n.blockquote,{children:["\n",(0,c.jsxs)(n.p,{children:["\u7ed9\u51fa\u653b\u51fb\u8005\u521b\u5efa\u5f71\u5b50\u8d26\u6237\u7684\u540d\u79f0\uff0cflag \u683c\u5f0f\uff1a",(0,c.jsx)(n.code,{children:"flag{username}"})]}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:"\u5728 Users \u76ee\u5f55\u4e0b\u5c31\u53ef\u4ee5\u770b\u5230"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"img",src:s(16507).A+"",width:"2010",height:"1150"})}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-flag",children:"flag{hack$}\n"})}),"\n",(0,c.jsx)(n.h2,{id:"8",children:"8"}),"\n",(0,c.jsxs)(n.blockquote,{children:["\n",(0,c.jsxs)(n.p,{children:["\u7ed9\u51fa\u653b\u51fb\u8005\u7b2c\u4e00\u6b21\u6210\u529f\u8fdc\u7a0b\u767b\u5165\u7cfb\u7edf\u7684\u65f6\u95f4 flag \u683c\u5f0f\uff1a",(0,c.jsx)(n.code,{children:"flag{2024-01-01 01:01:01}"})]}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:"\u4e8b\u4ef6\u7ba1\u7406\u5668\uff0c\u76f4\u63a5\u5b9a\u4f4d\u4e8b\u4ef6 id \u4e3a 4624 \u7684\u8bb0\u5f55"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"img",src:s(94753).A+"",width:"2010",height:"1150"})}),"\n",(0,c.jsx)(n.p,{children:"\u5373\u53ef\u5b9a\u4f4d\u5230\u7b2c\u4e00\u6b21\u653b\u51fb\u8005\u5229\u7528\u540e\u95e8\u8d26\u6237\u767b\u5f55\u7684\u8bb0\u5f55"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-flag",children:"flag{2024-09-22 13:15:11}\n"})}),"\n",(0,c.jsx)(n.h2,{id:"9",children:"9"}),"\n",(0,c.jsxs)(n.blockquote,{children:["\n",(0,c.jsxs)(n.p,{children:["\u653b\u51fb\u8005\u5728\u6a2a\u5411\u4e2d\u521b\u5efa\u4e86\u4e00\u4e2a\u7aef\u53e3\u8f6c\u53d1\u89c4\u5219\uff0c\u7ed9\u51fa\u8f6c\u53d1\u7684\u76ee\u7684 IP \u5730\u5740\u548c\u7aef\u53e3\uff0cflag \u683c\u5f0f:",(0,c.jsx)(n.code,{children:"flag{127.0.0.1:3389}"})]}),"\n"]}),"\n",(0,c.jsxs)(n.p,{children:["\u770b ",(0,c.jsx)(n.code,{children:"netstat"})]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"img",src:s(33468).A+"",width:"2010",height:"1151"})}),"\n",(0,c.jsxs)(n.p,{children:["\u4f46\u662f\u4e0d\u662f\u7a0b\u5e8f\u8bbe\u7f6e\u7684\u7aef\u53e3\u8f6c\u53d1\uff0c\u4e8e\u662f ",(0,c.jsx)(n.code,{children:"netsh interface portproxy show all"})," \u67e5\u770b\u7f51\u7edc\u8bbe\u7f6e\u4e2d\u7684\u7aef\u53e3\u8f6c\u53d1"]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"img",src:s(68426).A+"",width:"2010",height:"1151"})}),"\n",(0,c.jsx)(n.p,{children:"\u5373\u53ef\u5f97\u5230\u7b54\u6848"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-flag",children:"flag{10.10.10.103:3389}\n"})})]})}function g(e={}){const{wrapper:n}={...(0,d.R)(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(h,{...e})}):h(e)}},94753:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/image_20241003-140342-e5858bf5a0e1d422feda4b54aa94e2ef.png"},87966:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/image_20241005-230514-b7d5c0fdc1ae62784afd71d549b5deea.png"},51691:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/image_20241010-231046-ed2b07de438093572c53d6c1f915285b.png"},26:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/image_20241011-231145-d6a043f872d2a227e7d7e0007712d978.png"},65413:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/image_20241012-231217-7ac45c426a461dd9b08c0ad021f88157.png"},36135:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/image_20241016-231615-9f97e50ab708fcc967228746efda136b.png"},9240:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/image_20241017-131728-3a0fbbca6e665e04218b2988ba9f08f8.png"},23288:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/image_20241018-131857-b72909ea02e8cd61c15ded757f2c8431.png"},48156:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/image_20241019-131959-153e8e5d693c5f8501168a46d8e6857e.png"},174:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/image_20241020-132026-ad82fcc528216da1a60617d625f012c1.png"},97348:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/image_20241023-132335-b164680053cf6b421bf557064cf486d0.png"},86211:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/image_20241026-232600-416c8b609cdf355434f3f5db4ab7d82e.png"},41125:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/image_20241029-132949-f3154031eb2c08e5ab589c0c5a56d1b1.png"},33468:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/image_20241029-232938-620a1b5376b7c1053ce6449416c2f91e.png"},53297:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/image_20241031-133107-3052e3dac998968e2afd8cbefe9c70e2.png"},22980:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/image_20241035-133515-5fca4c3092f62e33e94236b252cf3735.png"},68426:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/image_20241038-233858-bb7f37871052401468097c3b43f083ef.png"},77714:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/image_20241043-134320-ff4dd65beefca0387c1c3c1f5dfb1d2e.png"},16507:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/image_20241058-135854-aff65ea78942cf65dea78f2ca55c425c.png"},28453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>l});var i=s(96540);const c={},d=i.createContext(c);function a(e){const n=i.useContext(d);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:a(e.components),i.createElement(d.Provider,{value:n},e.children)}}}]);