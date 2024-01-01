# Litter

:::info Sherlock Scenario

Khalid has just logged onto a host that he and his team use as a testing host for many different purposes, it’s off their corporate network but has access to lots of resources in network. The host is used as a dumping ground for a lot of people at the company but it’s very useful, so no one has raised any issues. Little does Khalid know; the machine has been compromised and company information that should not have been on there has now been stolen – it’s up to you to figure out what has happened and what data has been taken.

哈立德刚刚登录了一个主机，他和他的团队用作多种测试目的的测试主机，它不在公司网络中，但可以访问网络中的许多资源。这台主机被公司很多人当作垃圾场使用，但它非常有用，所以没有人提出任何问题。哈立德并不知道，这台机器已经被入侵了，并且公司不应该存在的信息已经被窃取了 - 现在轮到你来弄清楚发生了什么，并且哪些数据已经被取走了。

:::

## 题目数据

[litter.zip](./litter.zip)

## Task 1

> 一眼看去，在这次攻击中，哪种协议似乎是可疑的？

在流量的后半段，发生了大量的 DNS 请求，这个与正常环境的 DNS 请求相比，存在很大的问题

![wireshark dns](img/image_20231207-190712.png)

```plaintext title="Answer"
DNS
```

## Task 2

> 我们的主机和另一个主机之间有大量的流量，可疑主机的 IP 地址是什么？

使用 ` 统计 ` - ` 会话 `，在 ipv4，使用分组大小进行筛选，数量最大的即为目标对象

![wireshark 统计 会话 ipv4 分组](img/image_20231209-190959.png)

```plaintext title="Answer"
192.168.157.145
```

## Task 3

> 攻击者发送给客户端的第一个命令是什么？

:::note

接下来使用筛选器 `ip.src==192.168.157.145 || ip.dst==192.168.157.145` 导出特定分组为新的 pcap 文件进行分析

:::

对 DNS 请求的数据进行提取

![wireshark dns udp track](img/image_20231228-192833.png)

```plaintext
1eca012ec7305cb1f877686f616d690a6465736b746f702d756d6e636265<375c746573740d0a0d0a433a5c55736572735c746573745c446f776e6c6f.6164733e
```

hex 解码后即可得到答案

```plaintext title="Answer"
whoami
```

## Task 4

> 攻击者使用的 DNS 隧道工具版本是多少？

继续对受害者的返回数据进行解码研判，发现以下 DNS 请求数据

```plaintext
02cb012ec7332cb1fd422e42726f777365722e666f722e53514c6974652d<332e31322e322d77696e36342e6d73690d0a32382f30352f323031362020<32313a333820202020202020202020203134322c33333620646e73636174.322d76302e30372d636c69656e74
```

解码得到

```plaintext
28/05/2016  21:38           142,336 dnscat2-v0.07-client
```

```plaintext title="Answer"
0.07
```

## Task 5

> 攻击者试图重命名他们意外留在客户主机上的工具。他们将其命名为什么？

在后续的 DNS 流量中进行解码研判，发现以下数据

![wireshark DNS](img/image_20231247-194709.png)

```plaintext
2c43011ccd48f6758d72656e2072656e2027646e73636174322d76302e30<372d636c69656e742d77696e33322e65786527202777696e5f696e737461<6c6c2e6578650a5468652073796e746178206f662074686520636f6d6d61.6e6420697320696e636f72726563
```

解码后得到

```plaintext
ren ren 'dnscat2-v0.07-client-win32.exe' 'win_install.exe
```

```plaintext title="Answer"
win_install.exe
```

## Task 6

> 攻击者试图枚举用户的云存储。他们在云存储目录中定位到多少个文件？

用户的云储存位于 `Onedrive`，相关 DNS 流量如下

```plaintext
2be5011ccd61f875ee20204d757369630d0a30342f30362f323032312020<30383a3532202020203c4449523e202020202020202020204f6e65447269<76650d0a31312f30362f32303231202031333a3430202020203c4449523e.2020202020202020202050696374
```

继续往下追踪的话，会发现其中没有任何文件

```plaintext title="Answer"
0
```

## Task 7

> 被窃取的个人身份信息（PII）文件的完整位置是什么？

在 DNS 数据中，发现

```plaintext
7170011ccd863877ab747970652022433a5c55736572735c746573745c44<6f63756d656e74735c636c69656e742064617461206f7074696d69736174<696f6e5c757365722064657461696c732e637376220a2c6a6f622c636f6d.70616e792c73736e2c7265736964
```

解码后得到

```plaintext
type "C:\Users\test\Documents\client data optimisation\user details.csv"
```

```plaintext title="Answer"
C:\users\test\documents\client data optimization\user details.csv
```

## Task 8

> 究竟被窃取了多少个客户的个人身份信息记录？

这题相对比较复杂，可以用以下方式进行自动化处理

首先，使用 wireshark+tshark 进行原始数据提取

```shell
# wireshark 使用以下筛选器提取 dns 数据为新的 pcap 文件，命名为 1.pcap

ip.src==192.168.157.145 || ip.dst==192.168.157.145

# 使用 tshark 提取 dns 流量

tshark -r 1.pcap -T fields -Y "ip.src==192.168.157.144" -e udp.payload | sed '/^\s*$/d' > dnsdata.txt
```

然后使用 python 进行分析，首先分析 dns 传输量大小的统计

```python
with open("./dnsdata.txt", "r") as f:
    dnsdata_raw = f.read()

dnsdata_raw = dnsdata_raw.split("\n")

res = {}

for i in dnsdata_raw:
    tmp = len(i)
    if tmp in res.keys():
        res[tmp] += 1
    else:
        res[tmp] = 1

headers = list(res.keys())
headers.sort()
for i in headers:
    print(i, res.get(i))
```

看出来目标应该是长度为 494 的会话流量，继续尝试分析，在进行一定尝试之后，分析出来 dns 会话的具体结构，将额外信息进行剪切，只保留会话的 shell 数据

```python
with open("./dnsdata.txt", "r") as f:
    dnsdata_raw = f.read()

dnsdata_raw = dnsdata_raw.split("\n")

dnsdata = []

for i in dnsdata_raw:
    tmp = len(i)
    if tmp == 494:
        dnsdata.append(i)

res = ""

for i in dnsdata:
    tmp1 = bytes.fromhex(i[62:]).split(b"\x1c")
    tmp2 = "".join(tmp1[0].decode().split("<")) + tmp1[1].decode().split("\r")[0]
    # print(tmp2)
    res += bytes.fromhex(tmp2).decode()

print(res)
```

对还原出来的DNS会话中的shell数据进行分析，提取出来 `C:\users\test\documents\client data optimization\user details.csv` 的文件数据

<details>

<summary> 文件的完整数据 </summary>

[data.txt](./data.txt)

</details>

对数据进行分析，由于数据前面带有序号，所以就可以统计出来具体有多少条数据被泄露

```plaintext title="Answer"
721
```
