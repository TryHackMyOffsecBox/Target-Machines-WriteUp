"use strict";(self.webpackChunktarget_machines_write_up=self.webpackChunktarget_machines_write_up||[]).push([[5164],{45199:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>d,default:()=>l,frontMatter:()=>c,metadata:()=>s,toc:()=>o});const s=JSON.parse('{"id":"Independent-Environment/Fengtaisec/3","title":"Modbus\u534f\u8bae","description":"\u9ed1\u5ba2\u901a\u8fc7\u5916\u7f51\u8fdb\u5165\u4e00\u5bb6\u5de5\u5382\u7684\u63a7\u5236\u7f51\u7edc\uff0c\u4e4b\u540e\u5bf9\u5de5\u63a7\u7f51\u7edc\u4e2d\u7684\u64cd\u4f5c\u5458\u7ad9\u7cfb\u7edf\u8fdb\u884c\u4e86\u653b\u51fb\uff0c\u6700\u7ec8\u901a\u8fc7\u5de5\u63a7\u534f\u8bae\u7834\u574f\u4e86\u6b63\u5e38\u7684\u4e1a\u52a1\u3002\u6211\u4eec\u5f97\u5230\u4e86\u64cd\u4f5c\u5458\u7ad9\u5728\u653b\u51fb\u524d\u540e\u7684\u7f51\u7edc\u6d41\u91cf\u6570\u636e\u5305\uff0c\u6211\u4eec\u9700\u8981\u5206\u6790\u6d41\u91cf\u4e2d\u7684\u86db\u4e1d\u9a6c\u8ff9\uff0c\u627e\u5230FLAG","source":"@site/docs/Independent-Environment/Fengtaisec/3.md","sourceDirName":"Independent-Environment/Fengtaisec","slug":"/Independent-Environment/Fengtaisec/3","permalink":"/Target-Machines-WriteUp/docs/Independent-Environment/Fengtaisec/3","draft":false,"unlisted":false,"editUrl":"https://github.com/TryHackMyOffsecBox/Target-Machines-WriteUp/edit/main/docs/Independent-Environment/Fengtaisec/3.md","tags":[],"version":"current","frontMatter":{},"sidebar":"Independent_Environment_Sidebar","previous":{"title":"\u5e38\u89c1\u7684\u5bf9\u79f0\u52a0\u5bc6","permalink":"/Target-Machines-WriteUp/docs/Independent-Environment/Fengtaisec/28"},"next":{"title":"MMS \u534f\u8bae\u5206\u6790","permalink":"/Target-Machines-WriteUp/docs/Independent-Environment/Fengtaisec/4"}}');var i=t(74848),r=t(28453);const c={},d="Modbus\u534f\u8bae",a={},o=[];function p(e){const n={admonition:"admonition",code:"code",h1:"h1",header:"header",img:"img",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"modbus\u534f\u8bae",children:"Modbus\u534f\u8bae"})}),"\n",(0,i.jsxs)(n.admonition,{type:"note",children:[(0,i.jsx)(n.p,{children:"\u9ed1\u5ba2\u901a\u8fc7\u5916\u7f51\u8fdb\u5165\u4e00\u5bb6\u5de5\u5382\u7684\u63a7\u5236\u7f51\u7edc\uff0c\u4e4b\u540e\u5bf9\u5de5\u63a7\u7f51\u7edc\u4e2d\u7684\u64cd\u4f5c\u5458\u7ad9\u7cfb\u7edf\u8fdb\u884c\u4e86\u653b\u51fb\uff0c\u6700\u7ec8\u901a\u8fc7\u5de5\u63a7\u534f\u8bae\u7834\u574f\u4e86\u6b63\u5e38\u7684\u4e1a\u52a1\u3002\u6211\u4eec\u5f97\u5230\u4e86\u64cd\u4f5c\u5458\u7ad9\u5728\u653b\u51fb\u524d\u540e\u7684\u7f51\u7edc\u6d41\u91cf\u6570\u636e\u5305\uff0c\u6211\u4eec\u9700\u8981\u5206\u6790\u6d41\u91cf\u4e2d\u7684\u86db\u4e1d\u9a6c\u8ff9\uff0c\u627e\u5230FLAG"}),(0,i.jsxs)(n.p,{children:["flag\u5f62\u5f0f\u4e3a ",(0,i.jsx)(n.code,{children:"flag{}"})]})]}),"\n",(0,i.jsxs)(n.p,{children:["\u9898\u76ee\u63d0\u4f9b\u4e86\u4e00\u4e2a\u6587\u4ef6 ",(0,i.jsx)(n.code,{children:"Modbus.pcap"})]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"img",src:t(71138).A+"",width:"1765",height:"1199"})}),"\n",(0,i.jsxs)(n.p,{children:["\u5728 ",(0,i.jsx)(n.code,{children:"TCPSession 2195"}),"\u4e2d\uff0c\u53ef\u4ee5\u770b\u5230"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"img",src:t(21887).A+"",width:"1711",height:"1436"})}),"\n",(0,i.jsx)(n.p,{children:"\u5373\u53ef\u5f97\u5230\u7b54\u6848"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"img",src:t(25238).A+"",width:"1914",height:"1315"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-flag",children:"flag{TheModbusProtocolIsFunny!}\n"})})]})}function l(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}},71138:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/image_20241205-220529-f465609fda4461682572a7cb941d426d.png"},21887:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/image_20241209-220915-95459f56fe166275d97df7aa622fc35a.png"},25238:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/image_20241211-221123-b998fe60984f580e73b02809f6087499.png"},28453:(e,n,t)=>{t.d(n,{R:()=>c,x:()=>d});var s=t(96540);const i={},r=s.createContext(i);function c(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);