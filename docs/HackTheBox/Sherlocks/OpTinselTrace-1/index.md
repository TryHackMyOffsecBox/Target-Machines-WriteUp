# OpTinselTrace-1

:::info Sherlock Scenario

An elf named "Elfin" has been acting rather suspiciously lately. He's been working at odd hours and seems to be bypassing some of Santa's security protocols. Santa's network of intelligence elves has told Santa that the Grinch got a little bit too tipsy on egg nog and made mention of an insider elf! Santa is very busy with his naughty and nice list, so he’s put you in charge of figuring this one out. Please audit Elfin’s workstation and email communications.

名叫 “小精灵” 的一位精灵最近行为很可疑。他一直在加班，并且似乎绕过了圣诞老人的一些安全协议。圣诞老人的情报精灵网络告诉圣诞老人，格林奇在蛋奶酒上喝得有点醉，并提到了一个内鬼精灵！圣诞老人忙于他的淘气和乖巧名单，所以他让你负责弄清楚这件事。请审计小精灵的工作站和电子邮件通信。
:::

## 题目数据

:::note

由于附件过大，故在此不提供下载链接

:::

## Task 1

> 小精灵正在使用的电子邮件客户端的名称是什么？

列出 `elfidence_collection\TriageData\C\users\Elfin\Appdata\Roaming` 目录下的数据

```plaintext
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----          2023/12/11    17:05                eM Client
d----          2023/12/11     1:20                Microsoft
d----          2023/12/11     1:30                Notepad++
d----          2023/12/11     1:30                top-secret
```

```plaintext title="Answer"
eM Client
```

## Task 2

> 威胁者正在使用的电子邮件是什么？

下载软件之后，使用题目附件中的数据覆盖本地的 `Appdata` 文件夹，加载数据即可

:::note

不建议直接手撕，直接使用软件进行加载 `Appdata` 数据即可

:::

```plaintext title="Answer"
definitelynotthegrinch@gmail.com
```

## Task 3

> 威胁者什么时候联系小精灵？

```plaintext title="Answer"
2023-11-27 17:27:26
```

## Task 4

> 精灵老板的名字是什么？

```plaintext title="Answer"
elfuttin bigelf
```

## Task 5

> 小精灵首次提及他可以访问圣诞老人特殊文件的电子邮件的标题是什么？

```plaintext title="Answer"
Re: work
```

## Task 6

> 威胁者更改了他们的名字，新名字是什么 + 小精灵收到它的第一封电子邮件的日期？

```plaintext title="Answer"
Wendy Elflower, 2023-11-28 10:00:21
```

## Task 7

> 小精灵提议与威胁者会面的酒吧的名字是什么？

```plaintext title="Answer"
SnowGlobe
```

## Task 8

> 小精灵什么时候提出向参与者发送秘密文件？

```plaintext title="Answer"
2023-11-28 16:56:13
```

## Task 9

> 小精灵的第一个可疑谷歌搜索的搜索字符串是什么？（格式：字符串）

在 `elfidence_collection\TriageData\C\users\Elfin\Appdata\Local\Google\Chrome\User Data\Default\History` 中就有

```plaintext title="Answer"
how to get around work security
```

## Task 10

> 撰写中情局实地手册文章的作者姓名是什么？

在历史记录中，找到这条记录 `https://www.corporate-rebels.com/blog/cia-field-manual`

```plaintext title="Answer"
Joost Minnaar
```

## Task 11

> 小精灵发送给参与者的圣诞老人秘密文件的名字是什么？

```plaintext title="Answer"
santa_deliveries.zip
```

## Task 12

> 根据文件系统，小精灵主机上秘密文件的准确创建时间是什么？

定位到 `elfidence_collection\TriageData\C\users\Elfin\Appdata\Roaming\top-secret\santa_deliveries.zip`

```shell
$ exiftool santa_deliveries.zip
ExifTool Version Number         : 12.67
File Name                       : santa_deliveries.zip
Directory                       : .
File Size                       : 13 kB
File Modification Date/Time     : 2023:11:29 02:01:29+09:00
File Access Date/Time           : 2023:12:20 10:18:26+09:00
File Inode Change Date/Time     : 2023:12:19 23:53:16+09:00
```

```plaintext title="Answer"
2023-11-28 17:01:29
```

## Task 13

> 小精灵将文件存储在哪个完整目录名中？

上文中

```plaintext title="Answer"
C:\users\Elfin\Appdata\Roaming\top-secret
```

## Task 14

> 小精灵在窃取文件后试图逃往哪个国家？

在历史记录中的搜索历史中找到 `flights to greece - Google Search`

```plaintext title="Answer"
greece
```

## Task 15

> 用户（小精灵）写出但未发送的道歉信的电子邮件地址是什么？

```plaintext title="Answer"
santa.claus@gmail.com
```

## Task 16

> 首席精灵 PixelPeppermint 已要求提供 Elfins 的任何密码，以协助调查。Elfin 主机的 Windows 密码是什么？

使用 `mimikatz` 或者 `pypykatz` 进行提取即可

```plaintext
HBoot Key: ad46560ea15b7d45a41bceda661cc5d110101010101010101010101010101010
Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
WDAGUtilityAccount:504:aad3b435b51404eeaad3b435b51404ee:95199bba413194e567908de6220d677e:::
Elfin:1001:aad3b435b51404eeaad3b435b51404ee:529848fe56902d9595be4a608f9fbe89:::
```

查询 NTLM 的彩虹表即可得到

```plaintext title="Answer"
Santaknowskungfu
```

## Reference

- [Hack The Box Sherlocks - OpTinselTrace-1 Writeup - はまやんはまやんはまやん](https://blog.hamayanhamayan.com/entry/2023/12/27/201532)
- [DFIR/WalkThroughs/OpTinselTrace-1-5.md at main · dbissell6/DFIR](https://github.com/dbissell6/DFIR/blob/main/WalkThroughs/OpTinselTrace-1-5.md)
