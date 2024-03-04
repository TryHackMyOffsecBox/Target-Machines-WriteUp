# Lockpick

:::info Sherlock Scenario

Forela needs your help! A whole portion of our UNIX servers have been hit with what we think is ransomware. We are refusing to pay the attackers and need you to find a way to recover the files provided. Warning This is a warning that this Sherlock includes software that is going to interact with your computer and files. This software has been intentionally included for educational purposes and is NOT intended to be executed or used otherwise. Always handle such files in isolated, controlled, and secure environments. One the Sherlock zip has been unzipped, you will find a DANGER.txt file. Please read this to proceed.

Forela 需要你的帮助！我们的一大部分 UNIX 服务器遭受了我们认为是勒索软件的攻击。我们拒绝向攻击者支付赎金，并需要你找到一种恢复提供的文件的方法。警告：这是一份警告，本次 Sherlock 包含将与您的计算机和文件进行交互的软件。此软件已经故意包含用于教育目的，不打算被执行或以其他方式使用。请始终在隔离、受控和安全的环境中处理此类文件。解压缩 Sherlock 压缩包后，你会找到一个 DANGER.txt 文件，请阅读此文件以继续。

:::

## 题目数据

[lockpick1.zip](./lockpick1.zip)

:::warning 附件具有危险性

亲爱的用户，

这个文本文件是要警告您，ZIP 文件中包含的软件将与您的计算机和文件进行交互。此软件已经故意包含用于教育目的，不打算被执行或以其他方式使用。请始终在隔离、受控和安全的环境中处理此类文件。

强烈建议您按照以下步骤操作：
1 - 在受控环境中运行样本，例如 EP Pwnbox 或隔离的虚拟机。
2 - 只在此受控环境中使用提供的密码解压软件。
3 - 在虚拟机中解压文件并进行分析！

请务必格外小心！

包含软件的 ZIP 文件已经进行了密码保护，以确保您的安全。密码是 "E@iwyzXK7HK&"。强烈建议您不要解压或执行此 ZIP 文件的内容，除非您了解所涉及的风险。

通过阅读此文件并使用提供的密码解压文件，您确认并完全理解此警告中详细说明的风险。

:::

:::note

本文章的逆向工作基于 IDA，请注意相关反编译后结果的不同

:::

## Task 1

> 请确认用于加密所提供文件的加密密钥字符串？

以下为反编译出来的几个主要函数

```c title="main"
int __fastcall main(int argc, const char **argv, const char **envp)
{
  process_directory("/forela-criticaldata/", "bhUlIshutrea98liOp");
  return 0;
}
```

```c title="process_directory"
int __fastcall process_directory(const char *a1, __int64 a2)
{
  char s[1024]; // [rsp+10h] [rbp-410h] BYREF
  struct dirent *v4; // [rsp+410h] [rbp-10h]
  DIR *dirp; // [rsp+418h] [rbp-8h]

  dirp = opendir(a1);
  if (!dirp)
    return printf("Error opening directory: %s\n", a1);
  while (1)
  {
    v4 = readdir(dirp);
    if (!v4)
      break;
    if (strcmp(v4->d_name, ".") && strcmp(v4->d_name, "..") )
    {
      snprintf(s, 0x400uLL, "%s/%s", a1, v4->d_name);
      if (v4->d_type == 4 )
      {
        process_directory(s, a2);
      }
      else if (v4->d_type == 8
             && (strstr(v4->d_name, ".txt")
              || strstr(v4->d_name, ".sql")
              || strstr(v4->d_name, ".pdf")
              || strstr(v4->d_name, ".docx")
              || strstr(v4->d_name, ".xlsx")
              || strstr(v4->d_name, ".csv")
              || strstr(v4->d_name, ".json")
              || strstr(v4->d_name, ".xml")) )
      {
        printf("Encrypting: %s\n", s);
        encrypt_file(s, a2);
      }
    }
  }
  return closedir(dirp);
}
```

在其中可以看到 `encrypt_file` 这个函数，根据分析，第一个参数是要加密文件的路径，第二个为密码，则根据参数传递的逻辑，可以定位到加密密钥位于 `main` 函数中

```plaintext title="Answer"
bhUlIshutrea98liOp
```

## Task 2

> 我们最近收到了来自 `wbevansn1@cocolog-nifty.com` 的一封电子邮件，要求知道我们将他注册为的名字和姓氏。他们认为在申请过程中犯了错误。请确认这个申请人的名字和姓氏。

使用以下脚本，对文件进行恢复

```python
import sys

a2 = "bhUlIshutrea98liOp"

filename=sys.argv[1]

with open(filename, "rb") as f:
    file_data = f.read()

size = len(file_data)

res = []

for i in range(0, size):
    res.append(hex(ord(a2[i % len(a2)]) ^ file_data[i])[2:].rjust(2,"0"))

with open(filename.replace(".24bes","")+".hex",'w+') as file:
    file.write(str(res))

byte_data = bytes.fromhex(''.join(x for x in res))

# 将字节对象写入文件
with open(filename.replace(".24bes",""),'wb+') as file:
    file.write(byte_data)
```

在解密后的 `forela_uk_applicants.sql` 数据库文件中，找到以下记录

```sql
(830,'Walden','Bevans','wbevansn1@cocolog-nifty.com','Male','Aerospace Manufacturing','2023-02-16')
```

```plaintext title="Answer"
Walden Bevans
```

## Task 3

> Hart Manifould 分配的笔记本电脑的 MAC 地址和序列号是什么？

在 `it_assets.xml` 这个文件中，根据关键词找到以下记录

```xml
<record>
    <asset_id>501</asset_id>
    <MAC>E8-16-DF-E7-52-48</MAC>
    <asset_type>laptop</asset_type>
    <serial_number>1316262</serial_number>
    <purchase_date>8/3/2022</purchase_date>
    <last_patch_date>1/6/2023</last_patch_date>
    <patch_status>pending</patch_status>
    <assigned_to>Hart Manifould</assigned_to>
    <location>Room 1156</location>
</record>
```

```plaintext title="Answer"
E8-16-DF-E7-52-48, 1316262
```

## Task 4

> 攻击者的电子邮件地址是什么？

最简单的一题，邮箱地址就在攻击者留下的联系方式里面

```plaintext title="Answer"
bes24@protonmail.com
```

## Task 5

> 伦敦市警方对我们交易组织内部可能存在某些内幕交易的行为产生了怀疑。请确认单笔交易中利润百分比最高的人的电子邮件地址以及其利润百分比。

使用 python 脚本进行数据处理

```python
import json

with open("./trading-firebase_bkup.json", "r") as f:
    data = json.load(f)

data = dict(data)

email, profit_percentage = "", -10000.0

for i in data.keys():
    # print(data[i]["email"], data[i]["profit_percentage"])
    if data[i]["profit_percentage"] > profit_percentage:
        email, profit_percentage = data[i]["email"], data[i]["profit_percentage"]

print(email, profit_percentage)
# fmosedale17a@bizjournals.com 142303.19960539296
```

需要注意的是，python 会对数据进行压缩，所以要到原始数据里面进行提取

```json
"-NTy-crBi1fPrGaU6Uiu": {
    "id": 1559,
    "first_name": "Farah",
    "last_name": "Mosedale",
    "email": "fmosedale17a@bizjournals.com",
    "gender": "Female",
    "ip_address": "79.9.35.201",
    "stock_name": "Pennsylvania Real Estate Investment Trust",
    "stock_symbol": "PEI^A",
    "purchase_price": 304.1,
    "sale_price": 433048.13,
    "quantity": 842496,
    "purchase_date": "5/1/2022",
    "sale_date": "8/2/2022",
    "profit": 432744.03,
    "profit_percentage": 142303.1996053929628411706675436,
    "industry": "Energy"
},
```

```plaintext title="Answer"
fmosedale17a@bizjournals.com, 142303.1996053929628411706675436
```

## Task 6

> 我们的电子发现团队希望确认销售预测日志中所述的 IP 地址，该 IP 地址涉嫌与同事共享其帐户。请确认 Karylin O'Hederscoll 的 IP 地址。

根据关键词，可以在 `sales_forecast.xlsx` 文件中找到记录

```plaintext
87   Karylin   O'Hederscoll   kohederscoll2e@dagondesign.com   Female   8.254.104.208
```

```plaintext title="Answer"
8.254.104.208
```

## Task 7

> 以下哪种文件扩展名不是恶意软件的目标？.txt，.sql，.ppt，.pdf，.docx，.xlsx，.csv，.json，.xml

查看反编译得到的源码即可知道

```plaintext title="Answer"
.ppt
```

## Task 8

> 我们需要确认解密后文件的完整性。请确认申请者数据库的 MD5 哈希值。

```plaintext
f3894af4f1ffa42b3a379dddba384405
```

## Task 9

> 我们需要确认解密后文件的完整性。请确认交易备份的 MD5 哈希值。

```plaintext
87baa3a12068c471c3320b7f41235669
```

## Task 10

> 我们需要确认解密后文件的完整性。请确认投诉文件的 MD5 哈希值。

```plaintext
c3f05980d9bd945446f8a21bafdbf4e7
```
