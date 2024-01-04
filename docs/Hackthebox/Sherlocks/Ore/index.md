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
            info_2 = [i for i in info_1[2].split(" ") if i.startswith(("path", "remote_addr"))]
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

经过筛选，可以得到ip数据的集合

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
            info_2 = [i for i in info_1[2].split(" ") if i.startswith(("remote_addr"))]
            print(info_1[1], " ".join(info_2))
            ip = [i for i in i.split(" ") if i.startswith(("remote_addr"))][0].split("=")[1]
            if ip in ips.keys():
                ips[ip] += 1
            else:
                ips[ip] = 1

for i in ips.keys():
    print(str(i).ljust(18," "), ips[i])
```

得到以下ip的集合

```plaintext
86.24.61.7         11
86.31.99.194       1
95.181.232.32      1
```

对以上提取出来的ip集合进行人工研判，得到以下信息

|     ip地址     |                  行为                  |
| :------------: | :------------------------------------: |
| 89.247.167.247 |      api访问，密码重置，路径穿越       |
|   86.24.61.7   | 大量登陆尝试（错误的网址），攻击性较低 |
| 89.247.167.246 |   api访问（错误的网址），攻击性较低    |
| 95.181.232.32  |                路径穿越                |
| 195.80.150.137 |         路径穿越，大量api访问          |

将上面的ip地址进行升序排序，得到

```plaintext
86.24.61.7,89.247.167.246,89.247.167.247,95.181.232.32,195.80.150.137
```

根据数据，进行分组爆破答案

```plaintext
89.247.167.247,95.181.232.32,195.80.150.137
195.80.150.137,89.247.167.247,95.181.232.32
89.247.167.247,95.181.232.32
95.181.232.32,195.80.150.137
89.247.167.247,195.80.150.137
```

```plaintext title="Answer"

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

```plaintext title="Answer"

```

## Task 5

> TA 使用哪个程序下载了 injector.sh 脚本？

```plaintext title="Answer"
wget
```

## Task 6

> 最初将加密挖矿二进制文件和配置文件下载到了哪里？

```plaintext title="Answer"

```

## Task 7

> TA 使用哪个程序同时下载了加密挖矿二进制文件和配置文件？

```plaintext title="Answer"

```

## Task 8

> 我们需要确认 SOC 团队开始收集证据的确切时间，因为报告中没有包含此信息。他们使用与我们林肯系统管理员相同的公网 IP 地址。

```plaintext title="Answer"

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

```plaintext title="./catscale_ip-172-31-13-147-20221124-1501/catscale_out/Process_and_Network/ip-172-31-13-147-20221124-1501-processes-axwwSo.txt"
root      1089     1 2829088 9944 ?        Ssl  14:32 00:29:28 /usr/share/.logstxt/xmrig -c /usr/share/.logstxt/config.json -- threads=0
```

```plaintext title="Answer"
0
```

## Task 11

> 我们的 CISO 要求获取有关可能使用的挖矿池的其他细节。请确认 TA 使用了哪个（如果有）挖矿池。

```plaintext title="Answer"

```

## Task 12

> 我们无法在原始下载位置找到加密挖矿二进制文件和配置文件。TA 将它们移动到文件系统的哪个位置？

Task 10 就有

```plaintext title="Answer"
/usr/share/.logstxt/
```

## Task 13

> 我们无法进行取证地恢复用于分析的 “injector.sh” 脚本。我们认为 TA 可能运行了一个命令，阻止我们恢复该文件。TA 运行了哪个命令？

```plaintext title="Answer"

```

## Task 14

> 由我们的 IT 管理员创建的 cronjob 为 TA 修改的脚本运行多频繁？

```plaintext title="Answer"

```
