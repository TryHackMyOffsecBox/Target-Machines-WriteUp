# OpTinselTrace-2

:::info Sherlock Scenario

It seems our precious technology has been leaked to the threat actor. Our head Elf, PixelPepermint, seems to think that there were some hard-coded sensitive URLs within the technology sent. Please audit our Sparky Cloud logs and confirm if anything was stolen! PS - Santa likes his answers in UTC...

看来我们的珍贵技术已泄露给威胁参与者。我们的首席精灵 PixelPepermint 似乎认为，发送的技术中包含一些硬编码的敏感 URL。请审计我们的 Sparky Cloud 日志并确认是否丢失了任何东西！附言 - 圣诞老人喜欢在 UTC 中得到他的答案... 提供...

:::

## 题目数据

[title.zip]

## Task 1

> 威胁参与者在 S3 存储桶位置找到的二进制文件的 MD5 和是多少？

在日志文件中，关注到 `\optinseltrace2-cloudtrail\eu-west-2\2023\11\27\949622803460_CloudTrail_eu-west-2_20231127T0650Z_Ztna6Dl7FYVZ1LTR.json`

```json
{
    "eventVersion": "1.09",
    "userIdentity": {
        "type": "AssumedRole",
        "principalId": "AROA52GPOBQCCJKRKBE3A:access-analyzer",
        "arn": "arn:aws:sts::949622803460:assumed-role/AWSServiceRoleForAccessAnalyzer/access-analyzer",
        "accountId": "949622803460",
        "accessKeyId": "ASIA52GPOBQCNQMZ455V",
        "sessionContext": {
            "sessionIssuer": {
                "type": "Role",
                "principalId": "AROA52GPOBQCCJKRKBE3A",
                "arn": "arn:aws:iam::949622803460:role/aws-service-role/access-analyzer.amazonaws.com/AWSServiceRoleForAccessAnalyzer",
                "accountId": "949622803460",
                "userName": "AWSServiceRoleForAccessAnalyzer"
            },
            "attributes": {
                "creationDate": "2023-11-27T06:48:50Z",
                "mfaAuthenticated": "false"
            }
        },
        "invokedBy": "access-analyzer.amazonaws.com"
    },
    "eventTime": "2023-11-27T06:48:53Z",
    "eventSource": "s3.amazonaws.com",
    "eventName": "GetBucketLocation",
    "awsRegion": "eu-west-2",
    "sourceIPAddress": "access-analyzer.amazonaws.com",
    "userAgent": "access-analyzer.amazonaws.com",
    "requestParameters": {
        "bucketName": "papa-noel",
        "location": "",
        "Host": "papa-noel.s3.eu-west-2.amazonaws.com"
    },
    "responseElements": null,
    "additionalEventData": {
        "SignatureVersion": "SigV4",
        "CipherSuite": "ECDHE-RSA-AES128-GCM-SHA256",
        "bytesTransferredIn": 0,
        "AuthenticationMethod": "AuthHeader",
        "x-amz-id-2": "8jsjy+KRWjeSNnwvWeZkM3Oa5t/S7IARSP5rm2bJ+ohJ9O5o3Rjn/EuNQSIFfcjlaG3KrKBonbs=",
        "bytesTransferredOut": 137
    },
    "requestID": "ED0GTKZTNP255DDY",
    "eventID": "64539d2f-a5ec-4c41-b5e9-439bcc1615b2",
    "readOnly": true,
    "resources": [
        {
            "accountId": "949622803460",
            "type": "AWS::S3::Bucket",
            "ARN": "arn:aws:s3:::papa-noel"
        }
    ],
    "eventType": "AwsApiCall",
    "managementEvent": true,
    "recipientAccountId": "949622803460",
    "eventCategory": "Management"
}
```

在其中注意到 `"Host": "papa-noel.s3.eu-west-2.amazonaws.com"`

在搜索过程中，在 `Virustotal` 注意到

![img](img/image_20240318-201831.png)

存在一个二进制样本 `https://www.virustotal.com/gui/file/b15b02994c1c454571f877f9a0b99d06231f7b33f90bcca911e8845ab1ab5e55`

![img](img/image_20240319-201928.png)

```plaintext title="Answer"
62d5c1f1f9020c98f97d8085b9456b05 
```

## Task 2

> 威胁参与者开始自动检索我们公开的 S3 存储桶内容的时间是几点？

TODO 不做了，一大坨的屎

```plaintext title="Answer"

```

## Task 3

> 威胁参与者完成自动检索我们公开的 S3 存储桶内容的时间是几点？

```plaintext title="Answer"

```

## Task 4

> 根据威胁参与者的用户代理 - TA 可能使用什么脚本语言来检索文件？

```plaintext title="Answer"

```

## Task 5

> 威胁参与者在哪个文件中找到了一些硬编码的凭证？

```plaintext title="Answer"

```

## Task 6

> 请详细说明所有已确认的恶意 IP 地址。（升序）

```plaintext title="Answer"

```

## Task 7

> 我们非常担心 TA 设法入侵我们的私有 S3 存储桶，其中包含一个重要的 VPN 文件。请确认此 VPN 文件的名称以及 TA 检索该文件的时间。

```plaintext title="Answer"

```

## Task 8

> 请确认受感染的 AWS 帐户的用户名？

```plaintext title="Answer"

```

## Task 9

> 根据完成的分析，圣诞老人提出了一些建议。需要锁定的 S3 存储桶的 ARN 是什么？

```plaintext title="Answer"

```
