"use strict";(self.webpackChunktarget_machines_write_up=self.webpackChunktarget_machines_write_up||[]).push([[5569],{34725:(A,C,g)=>{g.r(C),g.d(C,{assets:()=>o,contentTitle:()=>B,default:()=>i,frontMatter:()=>e,metadata:()=>I,toc:()=>n});var Q=g(85893),E=g(11151);const e={},B="Setgo - 030",I={id:"HackMyVM/Challenges/Stego/030",title:"Setgo - 030",description:"created by || sml",source:"@site/docs/HackMyVM/Challenges/Stego/030.md",sourceDirName:"HackMyVM/Challenges/Stego",slug:"/HackMyVM/Challenges/Stego/030",permalink:"/Target-Machines-WriteUp/docs/HackMyVM/Challenges/Stego/030",draft:!1,unlisted:!1,editUrl:"https://github.com/TryHackMyOffsecBox/Target-Machines-WriteUp/edit/main/docs/HackMyVM/Challenges/Stego/030.md",tags:[],version:"current",frontMatter:{},sidebar:"HackMyVM_Sidebar",previous:{title:"Setgo - 028",permalink:"/Target-Machines-WriteUp/docs/HackMyVM/Challenges/Stego/028"},next:{title:"Setgo - 038",permalink:"/Target-Machines-WriteUp/docs/HackMyVM/Challenges/Stego/038"}},o={},n=[{value:"flag",id:"flag",level:2}];function t(A){const C={admonition:"admonition",code:"code",h1:"h1",h2:"h2",img:"img",p:"p",pre:"pre",...(0,E.a)(),...A.components};return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(C.h1,{id:"setgo---030",children:"Setgo - 030"}),"\n",(0,Q.jsxs)(C.admonition,{type:"note",children:[(0,Q.jsx)(C.p,{children:"created by || sml"}),(0,Q.jsx)(C.p,{children:"\u23f2\ufe0f Release Date // 2022-10-09"}),(0,Q.jsx)(C.p,{children:"\ud83d\udc80 Solvers // 19"}),(0,Q.jsx)(C.p,{children:"\ud83e\udde9 Type // stego"}),(0,Q.jsx)(C.p,{children:(0,Q.jsx)(C.code,{children:"The image contains the flag."})})]}),"\n",(0,Q.jsx)(C.p,{children:"\u539f\u56fe"}),"\n",(0,Q.jsx)(C.p,{children:(0,Q.jsx)(C.img,{alt:"img raw",src:g(65453).Z+"",width:"856",height:"360"})}),"\n",(0,Q.jsx)(C.p,{children:"\u5927\u6982\u770b\u51fa\u4e86\u4e8c\u7ef4\u7801\u7684\u7ed3\u6784\uff0c\u624b\u52a8\u5c06\u4e09\u4e2a\u5b9a\u4f4d\u7b26\u8865\u5168\u5c31\u53ef\u4ee5"}),"\n",(0,Q.jsx)(C.p,{children:(0,Q.jsx)(C.img,{alt:"img fixed",src:g(87552).Z+"",width:"1119",height:"992"})}),"\n",(0,Q.jsx)(C.h2,{id:"flag",children:"flag"}),"\n",(0,Q.jsx)(C.pre,{children:(0,Q.jsx)(C.code,{className:"language-plaintext",children:"HMV{qrsospecial}\n"})})]})}function i(A={}){const{wrapper:C}={...(0,E.a)(),...A.components};return C?(0,Q.jsx)(C,{...A,children:(0,Q.jsx)(t,{...A})}):t(A)}},65453:(A,C,g)=>{g.d(C,{Z:()=>Q});const Q="data:image/png;base64,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"},87552:(A,C,g)=>{g.d(C,{Z:()=>Q});const Q=g.p+"assets/images/image_20240230-173007-ae494e06d9e9dda5b02059f97e6ceb2e.png"},11151:(A,C,g)=>{g.d(C,{Z:()=>I,a:()=>B});var Q=g(67294);const E={},e=Q.createContext(E);function B(A){const C=Q.useContext(e);return Q.useMemo((function(){return"function"==typeof A?A(C):{...C,...A}}),[C,A])}function I(A){let C;return C=A.disableParentContext?"function"==typeof A.components?A.components(E):A.components||E:B(A.components),Q.createElement(e.Provider,{value:C},A.children)}}}]);