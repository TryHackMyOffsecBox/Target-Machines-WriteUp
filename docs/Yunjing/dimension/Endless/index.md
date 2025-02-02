# 无间计划

无间是一套难度为困难的靶场环境，完成该挑战可以帮助玩家了解内网渗透中的代理转发、内网扫描、信息收集、特权提升以及横向移动技术方法，加强对域环境核心认证机制的理解，以及掌握域环境渗透中一些有趣的技术要点。该靶场共有12个flag，分布于不同的靶机。P.S 某些节点注入请不要使用sqlmap，因为原生问题会导致环境崩溃无法自动重启，只能重置或重新下发。

<!-- truncate -->

:::info

Tags

- Oracle
- Confluence
- Gitlab
- MSSQL
- 内网渗透

:::

```plaintext title="入口点"
39.98.109.138 入口点1
39.98.107.251 入口点2
```

## 入口点探测

```plaintext title="39.98.109.138"
start infoscan
39.98.109.138:80 open
39.98.109.138:22 open
[*] alive ports len is: 2
start vulscan
[*] WebTitle http://39.98.109.138      code:200 len:481    title:Search UserInfo
```

```plaintext title="39.98.107.251"
start infoscan
39.98.107.251:22 open
39.98.107.251:80 open
[*] alive ports len is: 2
start vulscan
[*] WebTitle http://39.98.107.251      code:200 len:19781  title:PbootCMS-永久开源免费的PHP企业网站开发建设管理系统
```

## 入口点2 PbootCMS RCE

TODO 没沙砾了，太贵了
