"use strict";(self.webpackChunktarget_machines_write_up=self.webpackChunktarget_machines_write_up||[]).push([[1555],{10629:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>r,toc:()=>p});const r=JSON.parse('{"id":"Independent-Environment/K8sLanParty/2","title":"Finding Neighbours","description":"Hello?","source":"@site/docs/Independent-Environment/K8sLanParty/2.md","sourceDirName":"Independent-Environment/K8sLanParty","slug":"/Independent-Environment/K8sLanParty/2","permalink":"/Target-Machines-WriteUp/docs/Independent-Environment/K8sLanParty/2","draft":false,"unlisted":false,"editUrl":"https://github.com/TryHackMyOffsecBox/Target-Machines-WriteUp/edit/main/docs/Independent-Environment/K8sLanParty/2.md","tags":[],"version":"current","frontMatter":{},"sidebar":"Independent_Environment_Sidebar","previous":{"title":"Recon","permalink":"/Target-Machines-WriteUp/docs/Independent-Environment/K8sLanParty/1"},"next":{"title":"Data Leakage","permalink":"/Target-Machines-WriteUp/docs/Independent-Environment/K8sLanParty/3"}}');var s=t(74848),a=t(28453);const i={},o="Finding Neighbours",c={},p=[];function l(n){const e={admonition:"admonition",code:"code",h1:"h1",header:"header",p:"p",pre:"pre",...(0,a.R)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"finding-neighbours",children:"Finding Neighbours"})}),"\n",(0,s.jsxs)(e.admonition,{type:"note",children:[(0,s.jsx)(e.p,{children:"Hello?"}),(0,s.jsx)(e.p,{children:"Sometimes, it seems we are the only ones around, but we should always be on guard against invisible sidecars reporting sensitive secrets."}),(0,s.jsx)(e.p,{children:"\u6709\u65f6\uff0c\u770b\u8d77\u6765\u6211\u4eec\u4f3c\u4e4e\u662f\u5468\u56f4\u552f\u4e00\u7684\u5b58\u5728\uff0c\u4f46\u6211\u4eec\u5e94\u8be5\u59cb\u7ec8\u8b66\u60d5\u90a3\u4e9b\u9690\u5f62\u7684 sidecar\uff0c\u5b83\u4eec\u53ef\u80fd\u4f1a\u6cc4\u9732\u654f\u611f\u7684\u79d8\u5bc6\u3002"})]}),"\n",(0,s.jsx)(e.p,{children:"\u67e5\u770b\u5f53\u524d\u7684\u7f51\u7edc\u8fde\u63a5"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-shell",children:"player@wiz-k8s-lan-party:~$ netstat -anopt\nActive Internet connections (servers and established)\nProto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name     Timer\ntcp        0      0 192.168.1.39:42882      10.100.171.123:80       TIME_WAIT   -                    timewait (58.43/0/0)\ntcp        0      0 192.168.1.39:42870      10.100.171.123:80       TIME_WAIT   -                    timewait (53.42/0/0)\n"})}),"\n",(0,s.jsxs)(e.p,{children:["\u53ef\u4ee5\u770b\u5230\uff0c\u6709\u5411 ",(0,s.jsx)(e.code,{children:"10.100.171.123:80"})," \u53d1\u8d77\u7684\u8fde\u63a5\uff0c\u4f46\u662f\u5728\u672c\u5bb9\u5668\u5185\u65e0\u6cd5\u5f97\u77e5\u8fd0\u884c\u7684\u8fdb\u7a0b\u4fe1\u606f"]}),"\n",(0,s.jsxs)(e.p,{children:["\u90a3\u4e48\u7ed3\u5408\u9898\u76ee\u63cf\u8ff0\uff0c\u53ef\u4ee5\u731c\u6d4b\u662f ",(0,s.jsx)(e.code,{children:"sidecar"})," \u5bb9\u5668\u53d1\u8d77\u7684\u7f51\u7edc\u8fde\u63a5\uff0c\u5c1d\u8bd5\u4f7f\u7528 ",(0,s.jsx)(e.code,{children:"tcpdump"})," \u6355\u83b7\u8fde\u63a5\u4e2d\u7684\u6570\u636e"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-shell",children:"player@wiz-k8s-lan-party:~$ tcpdump dst host 10.100.171.123 and dst port 80 -A\ntcpdump: verbose output suppressed, use -v[v]... for full protocol decode\nlistening on ns-eafe9b, link-type EN10MB (Ethernet), snapshot length 262144 bytes\n07:29:35.482799 IP 192.168.1.39.44170 > reporting-service.k8s-lan-party.svc.cluster.local.http: Flags [S], seq 513025098, win 64240, options [mss 1460,sackOK,TS val 2483130223 ecr 0,nop,wscale 7], length 0\nE..<.n@........'\nd.{...P..$J........w..........\n...o........\n07:29:35.482839 IP 192.168.1.39.44170 > reporting-service.k8s-lan-party.svc.cluster.local.http: Flags [.], ack 1811249520, win 502, options [nop,nop,TS val 2483130223 ecr 2391605501], length 0\nE..4.o@........'\nd.{...P..$Kk.yp....w......\n...o....\n07:29:35.482878 IP 192.168.1.39.44170 > reporting-service.k8s-lan-party.svc.cluster.local.http: Flags [P.], seq 0:214, ack 1, win 502, options [nop,nop,TS val 2483130223 ecr 2391605501], length 214: HTTP: POST / HTTP/1.1\nE..\n.p@........'\nd.{...P..$Kk.yp....x......\n...o....POST / HTTP/1.1\nHost: reporting-service\nUser-Agent: curl/7.64.0\nAccept: */*\nContent-Length: 63\nContent-Type: application/x-www-form-urlencoded\n\nwiz_k8s_lan_party{good-crime-comes-with-a-partner-in-a-sidecar}\n07:29:35.484560 IP 192.168.1.39.44170 > reporting-service.k8s-lan-party.svc.cluster.local.http: Flags [.], ack 206, win 501, options [nop,nop,TS val 2483130224 ecr 2391605502], length 0\nE..4.q@........'\nd.{...P..%!k.z=....w......\n...p....\n07:29:35.484662 IP 192.168.1.39.44170 > reporting-service.k8s-lan-party.svc.cluster.local.http: Flags [F.], seq 214, ack 206, win 501, options [nop,nop,TS val 2483130225 ecr 2391605502], length 0\nE..4.r@........'\nd.{...P..%!k.z=....w......\n...q....\n07:29:35.484701 IP 192.168.1.39.44170 > reporting-service.k8s-lan-party.svc.cluster.local.http: Flags [.], ack 207, win 501, options [nop,nop,TS val 2483130225 ecr 2391605503], length 0\nE..4.s@........'\nd.{...P..%\"k.z>....w......\n...q....\n^C\n6 packets captured\n6 packets received by filter\n0 packets dropped by kernel\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u5373\u53ef\u5f97\u5230\u7b54\u6848"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-flag",children:"wiz_k8s_lan_party{good-crime-comes-with-a-partner-in-a-sidecar}\n"})})]})}function d(n={}){const{wrapper:e}={...(0,a.R)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(l,{...n})}):l(n)}},28453:(n,e,t)=>{t.d(e,{R:()=>i,x:()=>o});var r=t(96540);const s={},a=r.createContext(s);function i(n){const e=r.useContext(a);return r.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:i(n.components),r.createElement(a.Provider,{value:e},n.children)}}}]);