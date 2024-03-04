# Hyperfiletable

:::info Sherlock Scenario

There has been a new joiner in Forela, they have downloaded their onboarding documentation, however someone has managed to phish the user with a malicious attachment. We have only managed to pull the MFT record for the new user, are you able to triage this information?

在 Forela 中有一名新成员加入，他们已经下载了他们的入职文件，但是有人成功通过恶意附件钓鱼攻击了该用户。我们只能获取到该新用户的 MFT 记录，您能处理这些信息吗？

:::

## 题目数据

[hyperfiletable.zip](./hyperfiletable.zip)

## Task 1

> MFT 的 MD5 哈希值是多少？

```plaintext
File path and name: D:\Downloads\hyperfiletable\mft.raw\mft.raw
Name: mft.raw
Type: .raw
Size: 115.5 MB
Bytes: 121110528
Modified: 2023-06-02 22:38:10
Attributes: A
Copies: 1
CRC32: 29C15241
CRC64: 4EE3D6ED243B4347
MD5: 3730C2FEDCDC3ECD9B83CBEA08373226
```

```plaintext title="Answer"
3730C2FEDCDC3ECD9B83CBEA08373226
```

## Task 2

:::info

这里使用到 [MFTECmd](https://github.com/EricZimmerman/MFTECmd) 这款工具

:::

> 系统中唯一用户的名称是什么？

使用 `MFTECmd` 这款工具解析 mft 文件

```shell
PS D:\_Tool\_ForensicAnalyzer\MFTECmd> .\MFTECmd.exe -f D:\Downloads\hyperfiletable\mft.raw\mft.raw --csv "D:\Downloads\hyperfiletable\mft.raw"
MFTECmd version 1.2.2.1

Author: Eric Zimmerman (saericzimmerman@gmail.com)
https://github.com/EricZimmerman/MFTECmd

Command line: -f D:\Downloads\hyperfiletable\mft.raw\mft.raw --csv D:\Downloads\hyperfiletable\mft.raw

Warning: Administrator privileges not found!

File type: Mft

Processed D:\Downloads\hyperfiletable\mft.raw\mft.raw in 1.5877 seconds

D:\Downloads\hyperfiletable\mft.raw\mft.raw: FILE records found: 110,818 (Free records: 7,240) File size: 115.5MB
        CSV output will be saved to D:\Downloads\hyperfiletable\mft.raw\20240102085049_MFTECmd_$MFT_Output.csv
```

分析输出的结果文件，在其中搜索关键词 `\user`，即可得到用户个人文件夹的路径

```plaintext title="Answer"
Randy Savage
```

## Task 3

> 被该用户下载的恶意 HTA 的名称是什么？

使用用户的默认下载目录作为关键词进行搜索 `.\Users\Randy Savage\Downloads`

> 由于数据量较大，完整数据未在此体现

| EntryNumber | SequenceNumber | InUse | ParentEntryNumber | ParentSequenceNumber | ParentPath                     | FileName                       | Extension   | FileSize | ReferenceCount | ReparseTarget | IsDirectory | HasAds | IsAds | `SI<FN` | uSecZeros | Copied | SiFlags | NameType | Created0x10 | Created0x30 | LastModified0x10 | LastModified0x30 | LastRecordChange0x10 | LastRecordChange0x30 | LastAccess0x10 | LastAccess0x30 | UpdateSequenceNumber | LogfileSequenceNumber | SecurityId |
| :---------- | :------------- | :---- | :---------------- | :------------------- | :----------------------------- | :----------------------------- | :---------- | :------- | :------------- | :------------ | :---------- | :----- | :---- | :---- | :-------- | :----- | :------ | :------- | :---------- | :---------- | :--------------- | :--------------- | :------------------- | :------------------- | :------------- | :------------- | :------------------- | :-------------------- | :--------- |
| 103820      | 7              | TRUE  | 105011            | 2                    | .\Users\Randy Savage\Downloads | Onboarding.hta                 | .hta        | 1144     | 1              |               | FALSE       | TRUE   | FALSE | FALSE | FALSE     | FALSE  | Archive | Windows  | 21:40.1     |             | 21:45.6          | 21:40.1          | 21:45.6              | 21:40.2              | 22:01.0        | 21:40.1        | 27166224             | 375731114             | 1793       |
| 103820      | 7              | TRUE  | 105011            | 2                    | .\Users\Randy Savage\Downloads | Onboarding.hta:Zone.Identifier | .Identifier | 389      | 1              |               | FALSE       | FALSE  | TRUE  | FALSE | FALSE     | FALSE  | Archive | Windows  | 21:40.1     |             | 21:45.6          | 21:40.1          | 21:45.6              | 21:40.2              | 22:01.0        | 21:40.1        | 27166224             | 375731114             | 1793       |

即可找到答案

```plaintext title="Answer"
Onboarding.hta
```

## Task 4

> 恶意 HTA 文件的 ZoneId 是多少？

上文记录的末尾就有

```plaintext
[ZoneTransfer]
ZoneId=3
HostUrl=https://doc-10-8k-docs.googleusercontent.com/docs/securesc/9p3kedtu9rd1pnhecjfevm1clqmh1kc1/9mob6oj9jdbq89eegoedo0c9f3fpmrnj/1680708975000/04991425918988780232/11676194732725945250Z/1hsQhtmZJW9xZGgniME93H3mXZIV4OKgX?e=download&uuid=56e1ab75-ea1e-41b7-bf92-9432cfa8b645&nonce=u98832u1r35me&user=11676194732725945250Z&hash=j5meb42cqr57pa0ef411ja1k70jkgphq
```

```plaintext title="Answer"
3
```

## Task 5

> 恶意 HTA 的下载 URL 是什么？

```plaintext title="Answer"
https://doc-10-8k-docs.googleusercontent.com/docs/securesc/9p3kedtu9rd1pnhecjfevm1clqmh1kc1/9mob6oj9jdbq89eegoedo0c9f3fpmrnj/1680708975000/04991425918988780232/11676194732725945250Z/1hsQhtmZJW9xZGgniME93H3mXZIV4OKgX?e=download&uuid=56e1ab75-ea1e-41b7-bf92-9432cfa8b645&nonce=u98832u1r35me&user=11676194732725945250Z&hash=j5meb42cqr57pa0ef411ja1k70jkgphq
```

## Task 6

:::info

接下来使用 [MFTExplorer](https://www.sans.org/tools/mftexplorer/) 这个工具

:::

> HTA 文件的分配大小是多少？（字节）

在 `MFTExplorer` 的输出结果中，可以得到以下信息

```plaintext
**** FILE NAME ****
Type: FileName, Attribute #: 0x8, Size: 0x78, Content size: 0x5A, Name size: 0x0, Content offset: 0x18, Resident: True

File name: ONBOAR~1.HTA (Length: 0xC)
Flags: Archive, Name Type: Dos, Reparse Value: 0x0, Physical Size: 0x1000, Logical Size: 0x478
Parent Mft Record: Entry/seq: 0x19A33-0x2

Created On:  2023-04-05 13:21:40.0706726
Content Modified On: 2023-04-05 13:21:40.0732403
Record Modified On: 2023-04-05 13:21:40.2279587
Last Accessed On: 2023-04-05 13:21:40.0732403
```

```plaintext title="Answer"
4096
```

## Task 7

> HTA 文件的实际大小是多少？（字节）

```plaintext title="Answer"
1144
```

## Task 8

> 用户何时下载了 PowerPoint 演示文稿？

| EntryNumber | SequenceNumber | InUse | ParentEntryNumber | ParentSequenceNumber | ParentPath                          | FileName      | Extension | FileSize | ReferenceCount | ReparseTarget | IsDirectory | HasAds | IsAds | `SI<FN` | uSecZeros | Copied | SiFlags | NameType | Created0x10 | Created0x30 | LastModified0x10 | LastModified0x30 | LastRecordChange0x10 | LastRecordChange0x30 | LastAccess0x10 | LastAccess0x30 | UpdateSequenceNumber | LogfileSequenceNumber | SecurityId |
| :---------- | :------------- | :---- | :---------------- | :------------------- | :---------------------------------- | :------------ | :-------- | :------- | :------------- | :------------ | :---------- | :----- | :---- | :---- | :-------- | :----- | :------ | :------- | :---------- | :---------- | :--------------- | :--------------- | :------------------- | :------------------- | :------------- | :------------- | :------------------- | :-------------------- | :--------- |
| 105622      | 4              | FALSE | 107430            | 3                    | .\Users\Randy Savage\Documents\Work | Proposal.pptx | .pptx     | 16552989 | 1              |               | FALSE       | TRUE   | FALSE | FALSE | FALSE     | FALSE  | Archive | Windows  | 11:49.7     |             | 11:54.0          |                  | 12:14.6              | 11:54.0              | 11:54.0        |                | 26143496             | 375276644             | 1793       |

```plaintext
**** STANDARD INFO ****
Type: StandardInformation, Attribute #: 0x0, Size: 0x60, Content size: 0x48, Name size: 0x0, Content offset: 0x18, Resident: True

Flags: Archive, Max Version: 0x0, Flags 2: None, Class Id: 0x0, Owner Id: 0x0, Security Id: 0x701, Quota Charged: 0x0
Update Sequence #: 0x18EEB08

Created On:  2023-04-05 13:11:49.7425214
Content Modified On: 2023-04-05 13:11:53.9605745
Record Modified On: 2023-04-05 13:12:14.5858420
Last Accessed On: 2023-04-05 13:11:53.9605745
```

```plaintext title="Answer"
05/04/2023 13:11:49
```

## Task 9

> 用户记录了他们的工作凭据，请问他们的密码是什么？

在 `.\Users\Randy Savage\Documents\Work\notes.txt` 的 MFT 数据中，得到以下明文信息

```plaintext
New onboarding process:
Download onboarding tool from Google Drive
Username: RSavage
Password: ReallyC00lDucks2023!
```

```plaintext title="Answer"
ReallyC00lDucks2023!
```

## Task 10

> 在 `C:\Users\` 目录下还剩下多少个文件？（递归计算）

这题可以直接借助 Excel 的强大的统计能力

首先，使用筛选功能，对 `ParentPath` 列的数据进行筛选，使用菜单中的文本筛选功能

然后将结果复制黏贴为新的工作表，将 `IsDirectory` 筛选为 `FALSE` 模式，继续筛选

:::warning  题目答案存在争议

我自己使用 `MFTECmd` 导出的 csv 报告进行筛选分析，但是出来的结果和标准答案不符合，不确定是哪里出现问题

:::

```plaintext title="Answer"
3471
```
