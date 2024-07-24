"use strict";(self.webpackChunktarget_machines_write_up=self.webpackChunktarget_machines_write_up||[]).push([[383],{49040:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>c,toc:()=>o});var a=s(85893),t=s(11151);const i={},r="OpTinselTrace-2",c={id:"HackTheBox/Sherlocks/OpTinselTrace-2/index",title:"OpTinselTrace-2",description:"It seems our precious technology has been leaked to the threat actor. Our head Elf, PixelPepermint, seems to think that there were some hard-coded sensitive URLs within the technology sent. Please audit our Sparky Cloud logs and confirm if anything was stolen! PS - Santa likes his answers in UTC...",source:"@site/docs/HackTheBox/Sherlocks/OpTinselTrace-2/index.md",sourceDirName:"HackTheBox/Sherlocks/OpTinselTrace-2",slug:"/HackTheBox/Sherlocks/OpTinselTrace-2/",permalink:"/Target-Machines-WriteUp/docs/HackTheBox/Sherlocks/OpTinselTrace-2/",draft:!1,unlisted:!1,editUrl:"https://github.com/TryHackMyOffsecBox/Target-Machines-WriteUp/edit/main/docs/HackTheBox/Sherlocks/OpTinselTrace-2/index.md",tags:[],version:"current",frontMatter:{},sidebar:"HackTheBox_Sidebar",previous:{title:"OpTinselTrace-1",permalink:"/Target-Machines-WriteUp/docs/HackTheBox/Sherlocks/OpTinselTrace-1/"},next:{title:"Ore",permalink:"/Target-Machines-WriteUp/docs/HackTheBox/Sherlocks/Ore/"}},l={},o=[{value:"\u9898\u76ee\u6570\u636e",id:"\u9898\u76ee\u6570\u636e",level:2},{value:"Task 1",id:"task-1",level:2},{value:"Task 2",id:"task-2",level:2},{value:"Task 3",id:"task-3",level:2},{value:"Task 4",id:"task-4",level:2},{value:"Task 5",id:"task-5",level:2},{value:"Task 6",id:"task-6",level:2},{value:"Task 7",id:"task-7",level:2},{value:"Task 8",id:"task-8",level:2},{value:"Task 9",id:"task-9",level:2}];function d(e){const n={admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",img:"img",p:"p",pre:"pre",...(0,t.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"optinseltrace-2",children:"OpTinselTrace-2"}),"\n",(0,a.jsxs)(n.admonition,{title:"Sherlock Scenario",type:"info",children:[(0,a.jsx)(n.p,{children:"It seems our precious technology has been leaked to the threat actor. Our head Elf, PixelPepermint, seems to think that there were some hard-coded sensitive URLs within the technology sent. Please audit our Sparky Cloud logs and confirm if anything was stolen! PS - Santa likes his answers in UTC..."}),(0,a.jsx)(n.p,{children:"\u770b\u6765\u6211\u4eec\u7684\u73cd\u8d35\u6280\u672f\u5df2\u6cc4\u9732\u7ed9\u5a01\u80c1\u53c2\u4e0e\u8005\u3002\u6211\u4eec\u7684\u9996\u5e2d\u7cbe\u7075 PixelPepermint \u4f3c\u4e4e\u8ba4\u4e3a\uff0c\u53d1\u9001\u7684\u6280\u672f\u4e2d\u5305\u542b\u4e00\u4e9b\u786c\u7f16\u7801\u7684\u654f\u611f URL\u3002\u8bf7\u5ba1\u8ba1\u6211\u4eec\u7684 Sparky Cloud \u65e5\u5fd7\u5e76\u786e\u8ba4\u662f\u5426\u4e22\u5931\u4e86\u4efb\u4f55\u4e1c\u897f\uff01\u9644\u8a00 - \u5723\u8bde\u8001\u4eba\u559c\u6b22\u5728 UTC \u4e2d\u5f97\u5230\u4ed6\u7684\u7b54\u6848... \u63d0\u4f9b..."})]}),"\n",(0,a.jsx)(n.h2,{id:"\u9898\u76ee\u6570\u636e",children:"\u9898\u76ee\u6570\u636e"}),"\n",(0,a.jsx)(n.p,{children:"[title.zip]"}),"\n",(0,a.jsx)(n.h2,{id:"task-1",children:"Task 1"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u5a01\u80c1\u53c2\u4e0e\u8005\u5728 S3 \u5b58\u50a8\u6876\u4f4d\u7f6e\u627e\u5230\u7684\u4e8c\u8fdb\u5236\u6587\u4ef6\u7684 MD5 \u548c\u662f\u591a\u5c11\uff1f"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["\u5728\u65e5\u5fd7\u6587\u4ef6\u4e2d\uff0c\u5173\u6ce8\u5230 ",(0,a.jsx)(n.code,{children:"\\optinseltrace2-cloudtrail\\eu-west-2\\2023\\11\\27\\949622803460_CloudTrail_eu-west-2_20231127T0650Z_Ztna6Dl7FYVZ1LTR.json"})]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-json",children:'{\n    "eventVersion": "1.09",\n    "userIdentity": {\n        "type": "AssumedRole",\n        "principalId": "AROA52GPOBQCCJKRKBE3A:access-analyzer",\n        "arn": "arn:aws:sts::949622803460:assumed-role/AWSServiceRoleForAccessAnalyzer/access-analyzer",\n        "accountId": "949622803460",\n        "accessKeyId": "ASIA52GPOBQCNQMZ455V",\n        "sessionContext": {\n            "sessionIssuer": {\n                "type": "Role",\n                "principalId": "AROA52GPOBQCCJKRKBE3A",\n                "arn": "arn:aws:iam::949622803460:role/aws-service-role/access-analyzer.amazonaws.com/AWSServiceRoleForAccessAnalyzer",\n                "accountId": "949622803460",\n                "userName": "AWSServiceRoleForAccessAnalyzer"\n            },\n            "attributes": {\n                "creationDate": "2023-11-27T06:48:50Z",\n                "mfaAuthenticated": "false"\n            }\n        },\n        "invokedBy": "access-analyzer.amazonaws.com"\n    },\n    "eventTime": "2023-11-27T06:48:53Z",\n    "eventSource": "s3.amazonaws.com",\n    "eventName": "GetBucketLocation",\n    "awsRegion": "eu-west-2",\n    "sourceIPAddress": "access-analyzer.amazonaws.com",\n    "userAgent": "access-analyzer.amazonaws.com",\n    "requestParameters": {\n        "bucketName": "papa-noel",\n        "location": "",\n        "Host": "papa-noel.s3.eu-west-2.amazonaws.com"\n    },\n    "responseElements": null,\n    "additionalEventData": {\n        "SignatureVersion": "SigV4",\n        "CipherSuite": "ECDHE-RSA-AES128-GCM-SHA256",\n        "bytesTransferredIn": 0,\n        "AuthenticationMethod": "AuthHeader",\n        "x-amz-id-2": "8jsjy+KRWjeSNnwvWeZkM3Oa5t/S7IARSP5rm2bJ+ohJ9O5o3Rjn/EuNQSIFfcjlaG3KrKBonbs=",\n        "bytesTransferredOut": 137\n    },\n    "requestID": "ED0GTKZTNP255DDY",\n    "eventID": "64539d2f-a5ec-4c41-b5e9-439bcc1615b2",\n    "readOnly": true,\n    "resources": [\n        {\n            "accountId": "949622803460",\n            "type": "AWS::S3::Bucket",\n            "ARN": "arn:aws:s3:::papa-noel"\n        }\n    ],\n    "eventType": "AwsApiCall",\n    "managementEvent": true,\n    "recipientAccountId": "949622803460",\n    "eventCategory": "Management"\n}\n'})}),"\n",(0,a.jsxs)(n.p,{children:["\u5728\u5176\u4e2d\u6ce8\u610f\u5230 ",(0,a.jsx)(n.code,{children:'"Host": "papa-noel.s3.eu-west-2.amazonaws.com"'})]}),"\n",(0,a.jsxs)(n.p,{children:["\u5728\u641c\u7d22\u8fc7\u7a0b\u4e2d\uff0c\u5728 ",(0,a.jsx)(n.code,{children:"Virustotal"})," \u6ce8\u610f\u5230"]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"img",src:s(65475).Z+"",width:"2560",height:"3082"})}),"\n",(0,a.jsxs)(n.p,{children:["\u5b58\u5728\u4e00\u4e2a\u4e8c\u8fdb\u5236\u6837\u672c ",(0,a.jsx)(n.code,{children:"https://www.virustotal.com/gui/file/b15b02994c1c454571f877f9a0b99d06231f7b33f90bcca911e8845ab1ab5e55"})]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"img",src:s(49730).Z+"",width:"2560",height:"1371"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"62d5c1f1f9020c98f97d8085b9456b05 \n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-2",children:"Task 2"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u5a01\u80c1\u53c2\u4e0e\u8005\u5f00\u59cb\u81ea\u52a8\u68c0\u7d22\u6211\u4eec\u516c\u5f00\u7684 S3 \u5b58\u50a8\u6876\u5185\u5bb9\u7684\u65f6\u95f4\u662f\u51e0\u70b9\uff1f"}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"TODO \u4e0d\u505a\u4e86\uff0c\u4e00\u5927\u5768\u7684\u5c4e"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"'})}),"\n",(0,a.jsx)(n.h2,{id:"task-3",children:"Task 3"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u5a01\u80c1\u53c2\u4e0e\u8005\u5b8c\u6210\u81ea\u52a8\u68c0\u7d22\u6211\u4eec\u516c\u5f00\u7684 S3 \u5b58\u50a8\u6876\u5185\u5bb9\u7684\u65f6\u95f4\u662f\u51e0\u70b9\uff1f"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"'})}),"\n",(0,a.jsx)(n.h2,{id:"task-4",children:"Task 4"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u6839\u636e\u5a01\u80c1\u53c2\u4e0e\u8005\u7684\u7528\u6237\u4ee3\u7406 - TA \u53ef\u80fd\u4f7f\u7528\u4ec0\u4e48\u811a\u672c\u8bed\u8a00\u6765\u68c0\u7d22\u6587\u4ef6\uff1f"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"'})}),"\n",(0,a.jsx)(n.h2,{id:"task-5",children:"Task 5"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u5a01\u80c1\u53c2\u4e0e\u8005\u5728\u54ea\u4e2a\u6587\u4ef6\u4e2d\u627e\u5230\u4e86\u4e00\u4e9b\u786c\u7f16\u7801\u7684\u51ed\u8bc1\uff1f"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"'})}),"\n",(0,a.jsx)(n.h2,{id:"task-6",children:"Task 6"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u8bf7\u8be6\u7ec6\u8bf4\u660e\u6240\u6709\u5df2\u786e\u8ba4\u7684\u6076\u610f IP \u5730\u5740\u3002\uff08\u5347\u5e8f\uff09"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"'})}),"\n",(0,a.jsx)(n.h2,{id:"task-7",children:"Task 7"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u6211\u4eec\u975e\u5e38\u62c5\u5fc3 TA \u8bbe\u6cd5\u5165\u4fb5\u6211\u4eec\u7684\u79c1\u6709 S3 \u5b58\u50a8\u6876\uff0c\u5176\u4e2d\u5305\u542b\u4e00\u4e2a\u91cd\u8981\u7684 VPN \u6587\u4ef6\u3002\u8bf7\u786e\u8ba4\u6b64 VPN \u6587\u4ef6\u7684\u540d\u79f0\u4ee5\u53ca TA \u68c0\u7d22\u8be5\u6587\u4ef6\u7684\u65f6\u95f4\u3002"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"'})}),"\n",(0,a.jsx)(n.h2,{id:"task-8",children:"Task 8"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u8bf7\u786e\u8ba4\u53d7\u611f\u67d3\u7684 AWS \u5e10\u6237\u7684\u7528\u6237\u540d\uff1f"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"'})}),"\n",(0,a.jsx)(n.h2,{id:"task-9",children:"Task 9"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u6839\u636e\u5b8c\u6210\u7684\u5206\u6790\uff0c\u5723\u8bde\u8001\u4eba\u63d0\u51fa\u4e86\u4e00\u4e9b\u5efa\u8bae\u3002\u9700\u8981\u9501\u5b9a\u7684 S3 \u5b58\u50a8\u6876\u7684 ARN \u662f\u4ec0\u4e48\uff1f"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"'})})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},65475:(e,n,s)=>{s.d(n,{Z:()=>a});const a=s.p+"assets/images/image_20240318-201831-819153b772e7f1b559264c68270c92a0.png"},49730:(e,n,s)=>{s.d(n,{Z:()=>a});const a=s.p+"assets/images/image_20240319-201928-2bf379d0f07b97bab87ba301de438eae.png"},11151:(e,n,s)=>{s.d(n,{Z:()=>c,a:()=>r});var a=s(67294);const t={},i=a.createContext(t);function r(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),a.createElement(i.Provider,{value:n},e.children)}}}]);