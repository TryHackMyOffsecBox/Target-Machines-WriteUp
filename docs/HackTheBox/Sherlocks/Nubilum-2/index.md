# Nubilum-2

:::info Sherlock Scenario

Leading telecoms provider Forela uses AWS S3 as an essential part of their infrastructure. They can deploy applications quickly and do effective analytics on their sizable dataset thanks to it acting as both an application storage and a data lake storage. Recently, a user reported an urgent issue to the helpdesk: an inability to access files within a designated S3 directory. This disruption has not only impeded critical operations but has also raised immediate security concerns. The urgency of this situation demands a security-focused approach. Reports of a misconfigured S3 Bucket policy for the forela-fileshare bucket, resulting in unintended public access, highlight a potential security vulnerability that calls for immediate corrective measures. Consequently, a thorough investigation is paramount.

领先的电信提供商 Forela 将 AWS S3 用作其基础设施的重要组成部分。由于它既可用作应用程序存储，又可用作数据湖存储，因此他们可以快速部署应用程序，并对其庞大的数据集执行有效的分析。最近，一位用户向帮助台报告了一个紧急问题：无法访问指定 S3 目录中的文件。这种中断不仅妨碍了关键操作，而且还引发了直接的安全问题。这种情况的紧急性要求采取以安全为重点的方法。有报告称 forela-fileshare 存储桶的 S3 存储桶策略配置不当，导致意外的公共访问，这突显了一个潜在的安全漏洞，需要立即采取纠正措施。因此，彻底调查至关重要。
:::

## 题目数据

[nubilum_2.zip](./nubilum_2.zip)

## Task 1

> 攻击者 (TA) 用于渗透 Forela 的 AWS 账户的初始 IP 地址是什么？

解压后，日志文件存放在 `nubilum_2\949622803460\CloudTrail` 目录下，按照不同的节点存放有 json 格式的日志文件

首先，先对所有请求的 `userAgent` 进行提取

```python
import os
import json


def get_json_files(directory):
    json_files = []
    for item in os.listdir(directory):
        path = os.path.join(directory, item)
        if os.path.isfile(path) and path.endswith(".json"):
            json_files.append(path)
        elif os.path.isdir(path):
            json_files.extend(get_json_files(path))
    return json_files


json_files = get_json_files(os.getcwd())

records = []
for log in json_files:
    with open(log, "r") as f:
        res = json.load(f)["Records"][0]
        if type(res) == dict:
            record = res["userAgent"]
            if record in records:
                continue
            else:
                records.append(record)

print("\n".join(records))
```

得到

```plaintext title="userAgent"
resource-explorer-2.amazonaws.com
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36
[S3Console/0.4, aws-internal/3 aws-sdk-java/1.12.488 Linux/5.10.197-164.748.amzn2int.x86_64 OpenJDK_64-Bit_Server_VM/25.372-b08 java/1.8.0_372 vendor/Oracle_Corporation cfg/retry-mode/standard]
cloudtrail.amazonaws.com
s3.amazonaws.com
[aws-cli/2.0.30 Python/3.7.7 Windows/10 botocore/2.0.0dev34]
[S3Console/0.4, aws-internal/3 aws-sdk-java/1.12.488 Linux/5.10.196-163.744.amzn2int.x86_64 OpenJDK_64-Bit_Server_VM/25.372-b08 java/1.8.0_372 vendor/Oracle_Corporation cfg/retry-mode/standard]
AWS Internal
Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0
access-analyzer.amazonaws.com
APN/1.0 HashiCorp/1.0 Terraform/1.5.6 aws-sdk-go/1.44.122 (go1.20.8; freebsd; amd64)
APN/1.0 HashiCorp/1.0 Terraform/1.5.6 (+https://www.terraform.io) terraform-provider-aws/4.67.0 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.261 (go1.19.8; freebsd; amd64)
[python-requests/2.31.0]
[Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0]
Boto3/1.10.2 Python/3.8.0 Linux/4.14.138-99.102.amzn2.x86_64 exec-env/AWS_Lambda_python3.8 Botocore/1.13.2 Botocore/1.31.49
[curl/7.81.0]
[aws-cli/2.12.0 Python/3.11.4 Linux/6.3.0-kali1-cloud-amd64 source/x86_64.kali.2023 prompt/off command/s3.cp]
[Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36]
[Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0]
aws-cli/2.0.30 Python/3.7.7 Windows/10 botocore/2.0.0dev34
```

在其中找到不合理的请求

```plaintext
[python-requests/2.31.0]
```

因为这个常用于编写脚本进行恶意攻击

通过 `userAgent` 即可定位到具体的 `sourceIPAddress`

```plaintext title="Answer"
54.242.59.197
```

## Task 2

>TA 访问的第一个记录的 s3 对象的时间、文件名和账户 ID 是什么？

使用脚本定位 `res["sourceIPAddress"] == "54.242.59.197"` 的记录时间

```python
import os
import json


def get_json_files(directory):
    json_files = []
    for item in os.listdir(directory):
        path = os.path.join(directory, item)
        if os.path.isfile(path) and path.endswith(".json"):
            json_files.append(path)
        elif os.path.isdir(path):
            json_files.extend(get_json_files(path))
    return json_files


json_files = get_json_files(os.getcwd())

records = []
for log in json_files:
    with open(log, "r") as f:
        for res in json.load(f)["Records"]:
            if type(res) == dict and res["sourceIPAddress"] == "54.242.59.197":
                record = res["eventTime"]
                records.append(record)
records.sort()
print("\n".join(records))
```

得到

```plaintext
2023-11-02T14:43:01Z
2023-11-02T14:43:01Z
2023-11-02T14:43:05Z
2023-11-02T14:50:26Z
2023-11-02T14:52:03Z
2023-11-02T14:52:29Z
2023-11-02T14:52:56Z
2023-11-02T14:53:33Z
......
```

查看 `2023-11-02T14:43:01Z` 这一条日志 `\us-east-1\02\949622803460_CloudTrail_us-east-1_20231102T1450Z_kBa7hfxgwxghPxsW.json` 的信息

```json
{
    "eventVersion": "1.09",
    "userIdentity": {
        "type": "AWSAccount",
        "principalId": "",
        "accountId": "anonymous"
    },
    "eventTime": "2023-11-02T14:43:01Z",
    "eventSource": "s3.amazonaws.com",
    "eventName": "ListObjects",
    "awsRegion": "us-east-1",
    "sourceIPAddress": "54.242.59.197",
    "userAgent": "[python-requests/2.31.0]",
    "requestParameters": {
        "bucketName": "forela-fileshare",
        "Host": "forela-fileshare.s3.amazonaws.com"
    },
    "responseElements": null,
    "additionalEventData": {
        "bytesTransferredIn": 0,
        "x-amz-id-2": "xPfXNRRuOb+M2U0fBbK5fZWFAVOVZtf9SuU/FkFYp8SuVS1aM5+Higaw2vnkJSxDtSk2xfKUj2M=",
        "bytesTransferredOut": 24199
    },
    "requestID": "KCCGDR7PPACSD86C",
    "eventID": "78704491-a65c-45a1-8d61-d8633f1f615a",
    "readOnly": true,
    "resources": [
        {
            "type": "AWS::S3::Object",
            "ARNPrefix": "arn:aws:s3:::forela-fileshare/"
        },
        {
            "accountId": "949622803460",
            "type": "AWS::S3::Bucket",
            "ARN": "arn:aws:s3:::forela-fileshare"
        }
    ],
    "eventType": "AwsApiCall",
    "managementEvent": false,
    "recipientAccountId": "949622803460",
    "sharedEventID": "aa1bd006-d625-4520-9346-2431cd70a20a",
    "eventCategory": "Data",
    "tlsDetails": {
        "clientProvidedHostHeader": "forela-fileshare.s3.amazonaws.com"
    }
    },
    {
    "eventVersion": "1.09",
    "userIdentity": {
        "type": "AWSAccount",
        "principalId": "",
        "accountId": "anonymous"
    },
    "eventTime": "2023-11-02T14:43:01Z",
    "eventSource": "s3.amazonaws.com",
    "eventName": "ListObjects",
    "awsRegion": "us-east-1",
    "sourceIPAddress": "54.242.59.197",
    "userAgent": "[python-requests/2.31.0]",
    "requestParameters": {
        "bucketName": "forela-fileshare",
        "Host": "forela-fileshare.s3.amazonaws.com"
    },
    "responseElements": null,
    "additionalEventData": {
        "bytesTransferredIn": 0,
        "x-amz-id-2": "knjomhCuHRDFBuQU/D3ozulQdlBRSV+cNgNy4tddcvOI/vTWQjUIBsUx71z5yxurgO5+lb2J/XVVCSYazXu26zFG+jQ77Hyf23HewbQcK/k=",
        "bytesTransferredOut": 24199
    },
    "requestID": "KCCWVPEMVVYMKCJQ",
    "eventID": "02776453-0f23-437d-8e12-0e1172e18d43",
    "readOnly": true,
    "resources": [
        {
            "type": "AWS::S3::Object",
            "ARNPrefix": "arn:aws:s3:::forela-fileshare/"
        },
        {
            "accountId": "949622803460",
            "type": "AWS::S3::Bucket",
            "ARN": "arn:aws:s3:::forela-fileshare"
        }
    ],
    "eventType": "AwsApiCall",
    "managementEvent": false,
    "recipientAccountId": "949622803460",
    "sharedEventID": "f92fc659-879f-47e6-b825-b66041d5cdd1",
    "eventCategory": "Data",
    "tlsDetails": {
        "clientProvidedHostHeader": "forela-fileshare.s3.amazonaws.com"
    }
}
```

TODO 做不出来

```plaintext title="Answer"

```

## Task 3

> 最少有多少个访问密钥遭到破坏？

```plaintext title="Answer"

```

## Task 4

>TA 执行了一条命令来筛选 EC2 实例。用于筛选的名称和值是什么？

```plaintext title="Answer"

```

## Task 5

> 在使用受损密钥获得提升访问权限之前，TA 进行的失败的发现和权限提升尝试的次数是多少？

```plaintext title="Answer"

```

## Task 6

> 在这次事件中，哪个 IAM 用户成功获得了提升的权限？

```plaintext title="Answer"

```

## Task 7

> 哪个事件名称允许攻击者生成管理员级别的策略？

```plaintext title="Answer"

```

## Task 8

> 创建了哪个策略的名称和声明，该策略授予标准用户帐户提升的权限？

```plaintext title="Answer"

```

## Task 9

> 用于加密文件的 ARN（亚马逊资源名称）是什么？

```plaintext title="Answer"

```

## Task 10

>TA 上传到 S3 存储桶的文件名称是什么？

```plaintext title="Answer"

```

## Task 11

>TA 修改了哪个 IAM 用户帐户以获取额外的持续访问权限？

```plaintext title="Answer"

```

## Task 12

> 用户未被授权执行什么操作才能查看或下载 S3 存储桶中的文件？

```plaintext title="Answer"

```
