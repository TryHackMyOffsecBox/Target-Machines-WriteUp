# i-like-to

:::info Sherlock Scenario

We have unfortunately been hiding under a rock and did not see the many news articles referencing the recent MOVEit CVE being exploited in the wild. We believe our Windows server may be vulnerable and has recently fallen victim to this compromise. We need to understand this exploit in a bit more detail and confirm the actions of the attacker & retrieve some details so we can implement them into our SOC environment. We have provided you with a triage of all the necessary artifacts from our compromised Windows server. PS: One of the artifacts is a memory dump, but we forgot to include the vmss file. You might have to go back to basics here...

不幸的是，我们一直躲在岩石下面，没有看到很多新闻文章提及最近在野外利用的 MOVEit CVE。我们认为我们的 Windows 服务器可能存在漏洞，并且最近遭受了此漏洞的攻击。我们需要更详细地了解此漏洞，并确认攻击者的行为并检索一些详细信息，以便我们可以将它们实施到我们的 SOC 环境中。我们为您提供了来自我们受损 Windows 服务器的所有必要工件的分诊。PS：其中一件工件是内存转储，但我们忘记包含 vmss 文件。您可能必须回到这里讨论基本知识...

:::

## 题目数据

:::note

由于附件过大，故在此不提供下载链接

:::

## First of all

根据题目中所提到的 `MOVEit CVE` 信息，定位到 `CVE-2023-34362`

### 附件解压

首先，先将附件解压后，得到

```plaintext
D:.
    I-like-to-27a787c5.vmem
    Triage.zip
```

将 `Triage.zip` 解压后，得到

```plaintext
D:.
├─results
└─uploads
    ├─auto
    │  ├─%5C%5C.%5CC%3A
    │  │  └─Windows
    │  │      └─System32
    │  │          └─LogFiles
    │  │              └─WMI
    │  │                  └─RtBackup
    │  └─C%3A
    │      ├─$Recycle.Bin
    │      │  └─S-1-5-21-4088429403-1159899800-2753317549-500
    │      ├─inetpub
    │      │  └─logs
    │      │      ├─FailedReqLogFiles
    │      │      └─LogFiles
    │      │          └─W3SVC2
    │      ├─MOVEitTransfer
    │      │  └─Logs
    │      ├─ProgramData
    │      │  └─Microsoft
    │      │      ├─Windows
    │      │      │  └─Start Menu
    │      │      │      └─Programs
    │      │      └─Windows Defender
    │      │          └─Support
    │      ├─Users
    │      │  ├─%2ENET v4.5
    │      │  │  └─AppData
    │      │  │      ├─Local
    │      │  │      │  └─Microsoft
    │      │  │      │      └─Windows
    │      │  │      └─Roaming
    │      │  │          └─Microsoft
    │      │  │              └─Internet Explorer
    │      │  │                  └─Quick Launch
    │      │  ├─%2ENET v4.5 Classic
    │      │  │  └─AppData
    │      │  │      ├─Local
    │      │  │      │  └─Microsoft
    │      │  │      │      └─Windows
    │      │  │      └─Roaming
    │      │  │          └─Microsoft
    │      │  │              └─Internet Explorer
    │      │  │                  └─Quick Launch
    │      │  ├─Administrator
    │      │  │  └─AppData
    │      │  │      ├─Local
    │      │  │      │  ├─ConnectedDevicesPlatform
    │      │  │      │  │  └─L.Administrator
    │      │  │      │  └─Microsoft
    │      │  │      │      ├─Internet Explorer
    │      │  │      │      │  ├─CacheStorage
    │      │  │      │      │  ├─DomainSuggestions
    │      │  │      │      │  ├─EmieSiteList
    │      │  │      │      │  ├─EmieUserList
    │      │  │      │      │  ├─IECompatData
    │      │  │      │      │  ├─IEFlipAheadCache
    │      │  │      │      │  ├─imagestore
    │      │  │      │      │  │  └─zxjua2i
    │      │  │      │      │  ├─Recovery
    │      │  │      │      │  │  └─High
    │      │  │      │      │  │      └─Last Active
    │      │  │      │      │  ├─Tiles
    │      │  │      │      │  │  └─pin-314712940
    │      │  │      │      │  └─VersionManager
    │      │  │      │      └─Windows
    │      │  │      │          ├─Explorer
    │      │  │      │          ├─History
    │      │  │      │          │  └─History.IE5
    │      │  │      │          │      └─MSHist012023061320230614
    │      │  │      │          ├─IEDownloadHistory
    │      │  │      │          ├─INetCookies
    │      │  │      │          │  ├─DNTException
    │      │  │      │          │  └─ESE
    │      │  │      │          └─WebCache
    │      │  │      └─Roaming
    │      │  │          └─Microsoft
    │      │  │              ├─Internet Explorer
    │      │  │              │  └─Quick Launch
    │      │  │              │      └─User Pinned
    │      │  │              │          └─TaskBar
    │      │  │              ├─Protect
    │      │  │              │  └─S-1-5-21-4088429403-1159899800-2753317549-500
    │      │  │              └─Windows
    │      │  │                  ├─PowerShell
    │      │  │                  │  └─PSReadLine
    │      │  │                  └─Recent
    │      │  │                      ├─AutomaticDestinations
    │      │  │                      └─CustomDestinations
    │      │  ├─Default
    │      │  │  └─AppData
    │      │  │      └─Roaming
    │      │  │          └─Microsoft
    │      │  │              └─Internet Explorer
    │      │  │                  └─Quick Launch
    │      │  ├─dfir
    │      │  │  └─AppData
    │      │  │      ├─Local
    │      │  │      │  ├─ConnectedDevicesPlatform
    │      │  │      │  │  └─L.dfir
    │      │  │      │  └─Microsoft
    │      │  │      │      ├─Internet Explorer
    │      │  │      │      │  ├─CacheStorage
    │      │  │      │      │  ├─EmieSiteList
    │      │  │      │      │  ├─EmieUserList
    │      │  │      │      │  ├─IECompatData
    │      │  │      │      │  ├─imagestore
    │      │  │      │      │  │  └─lq16xzq
    │      │  │      │      │  └─Recovery
    │      │  │      │      │      └─Last Active
    │      │  │      │      └─Windows
    │      │  │      │          ├─Explorer
    │      │  │      │          ├─History
    │      │  │      │          │  ├─History.IE5
    │      │  │      │          │  │  └─MSHist012023061320230614
    │      │  │      │          │  └─Low
    │      │  │      │          │      └─History.IE5
    │      │  │      │          ├─IEDownloadHistory
    │      │  │      │          ├─INetCookies
    │      │  │      │          │  ├─DNTException
    │      │  │      │          │  ├─ESE
    │      │  │      │          │  └─Low
    │      │  │      │          │      └─ESE
    │      │  │      │          └─WebCache
    │      │  │      └─Roaming
    │      │  │          └─Microsoft
    │      │  │              ├─Internet Explorer
    │      │  │              │  └─Quick Launch
    │      │  │              │      └─User Pinned
    │      │  │              │          └─TaskBar
    │      │  │              ├─Protect
    │      │  │              │  └─S-1-5-21-4088429403-1159899800-2753317549-1007
    │      │  │              └─Windows
    │      │  │                  └─Recent
    │      │  │                      ├─AutomaticDestinations
    │      │  │                      └─CustomDestinations
    │      │  ├─moveitsvc
    │      │  │  └─AppData
    │      │  │      ├─Local
    │      │  │      │  └─Microsoft
    │      │  │      │      └─Windows
    │      │  │      └─Roaming
    │      │  │          └─Microsoft
    │      │  │              ├─Internet Explorer
    │      │  │              │  └─Quick Launch
    │      │  │              └─Protect
    │      │  │                  └─S-1-5-21-4088429403-1159899800-2753317549-1000
    │      │  └─moveitsvc.WIN-LR8T2EF8VHM.002
    │      │      └─AppData
    │      │          ├─Local
    │      │          │  ├─ConnectedDevicesPlatform
    │      │          │  │  └─L.moveitsvc
    │      │          │  └─Microsoft
    │      │          │      ├─Internet Explorer
    │      │          │      │  ├─CacheStorage
    │      │          │      │  └─IECompatData
    │      │          │      └─Windows
    │      │          │          ├─Explorer
    │      │          │          ├─History
    │      │          │          │  └─History.IE5
    │      │          │          └─WebCache
    │      │          └─Roaming
    │      │              └─Microsoft
    │      │                  ├─Internet Explorer
    │      │                  │  └─Quick Launch
    │      │                  │      └─User Pinned
    │      │                  │          └─TaskBar
    │      │                  ├─Protect
    │      │                  │  └─S-1-5-21-4088429403-1159899800-2753317549-1006
    │      │                  └─Windows
    │      │                      ├─PowerShell
    │      │                      │  └─PSReadLine
    │      │                      └─Recent
    │      │                          ├─AutomaticDestinations
    │      │                          └─CustomDestinations
    │      └─Windows
    │          ├─appcompat
    │          │  └─Programs
    │          ├─INF
    │          ├─ServiceProfiles
    │          │  ├─LocalService
    │          │  └─NetworkService
    │          │      └─AppData
    │          │          └─Local
    │          │              └─Microsoft
    │          │                  └─Windows
    │          │                      └─DeliveryOptimization
    │          │                          └─Logs
    │          ├─System32
    │          │  ├─config
    │          │  │  └─RegBack
    │          │  ├─LogFiles
    │          │  │  └─Sum
    │          │  ├─sru
    │          │  ├─Tasks
    │          │  │  └─Microsoft
    │          │  │      └─Windows
    │          │  │          ├─%2ENET Framework
    │          │  │          ├─Active Directory Rights Management Services Client
    │          │  │          ├─AppID
    │          │  │          ├─Application Experience
    │          │  │          ├─ApplicationData
    │          │  │          ├─AppxDeploymentClient
    │          │  │          ├─Autochk
    │          │  │          ├─BitLocker
    │          │  │          ├─Bluetooth
    │          │  │          ├─BrokerInfrastructure
    │          │  │          ├─CertificateServicesClient
    │          │  │          ├─Chkdsk
    │          │  │          ├─Clip
    │          │  │          ├─CloudExperienceHost
    │          │  │          ├─Customer Experience Improvement Program
    │          │  │          ├─Data Integrity Scan
    │          │  │          ├─Defrag
    │          │  │          ├─Device Information
    │          │  │          ├─Device Setup
    │          │  │          ├─Diagnosis
    │          │  │          ├─DirectX
    │          │  │          ├─DiskCleanup
    │          │  │          ├─DiskDiagnostic
    │          │  │          ├─DiskFootprint
    │          │  │          ├─EDP
    │          │  │          ├─ExploitGuard
    │          │  │          ├─File Classification Infrastructure
    │          │  │          ├─Flighting
    │          │  │          │  ├─FeatureConfig
    │          │  │          │  └─OneSettings
    │          │  │          ├─InstallService
    │          │  │          ├─LanguageComponentsInstaller
    │          │  │          ├─License Manager
    │          │  │          ├─Location
    │          │  │          ├─Maintenance
    │          │  │          ├─Maps
    │          │  │          ├─MemoryDiagnostic
    │          │  │          ├─Mobile Broadband Accounts
    │          │  │          ├─MUI
    │          │  │          ├─Multimedia
    │          │  │          ├─NetTrace
    │          │  │          ├─Network Controller
    │          │  │          ├─Offline Files
    │          │  │          ├─PI
    │          │  │          ├─PLA
    │          │  │          ├─Plug and Play
    │          │  │          ├─Power Efficiency Diagnostics
    │          │  │          ├─PushToInstall
    │          │  │          ├─Ras
    │          │  │          ├─RecoveryEnvironment
    │          │  │          ├─Registry
    │          │  │          ├─Server Manager
    │          │  │          ├─Servicing
    │          │  │          ├─SharedPC
    │          │  │          ├─Shell
    │          │  │          ├─Software Inventory Logging
    │          │  │          ├─SoftwareProtectionPlatform
    │          │  │          ├─SpacePort
    │          │  │          ├─Speech
    │          │  │          ├─Storage Tiers Management
    │          │  │          ├─Task Manager
    │          │  │          ├─TextServicesFramework
    │          │  │          ├─Time Synchronization
    │          │  │          ├─Time Zone
    │          │  │          ├─TPM
    │          │  │          ├─UpdateOrchestrator
    │          │  │          ├─UPnP
    │          │  │          ├─User Profile Service
    │          │  │          ├─WaaSMedic
    │          │  │          ├─WDI
    │          │  │          ├─Windows Defender
    │          │  │          ├─Windows Error Reporting
    │          │  │          ├─Windows Filtering Platform
    │          │  │          ├─Windows Media Sharing
    │          │  │          ├─WindowsColorSystem
    │          │  │          ├─WindowsUpdate
    │          │  │          ├─Wininet
    │          │  │          └─Workplace Join
    │          │  ├─wbem
    │          │  │  └─Repository
    │          │  ├─WDI
    │          │  │  └─LogFiles
    │          │  └─winevt
    │          │      └─Logs
    │          ├─Tasks
    │          └─Temp
    └─ntfs
        └─%5C%5C.%5CC%3A
            └─$Extend
                └─$RmMetadata
                    └─$TxfLog
```

很明显为 Windows 的日志文件

## 内存镜像加载

由于只有 `I-like-to-27a787c5.vmem` 文件，没有 `vmss` 文件，导致无法使用 `Volatility` 对内存镜像进行解析，但是仍然可以通过 `strings` 和 `R-Studio` 程序对内存镜像进行解析

![img](img/image_20240345-184551.png)

TODO 未完成

## Task 1

> 攻击者上传的 ASPX webshell 的名称是什么？

```plaintext title="Answer"

```

## Task 2

> 攻击者的 IP 地址是什么？

```plaintext title="Answer"

```

## Task 3

> 最初的攻击使用的是什么用户代理？

```plaintext title="Answer"

```

## Task 4

> 攻击者上传 ASPX webshell 的时间是什么时候？

```plaintext title="Answer"

```

## Task 5

> 攻击者上传了一个不起作用的 ASP webshell，它的文件大小是多少（以字节为单位）？

```plaintext title="Answer"

```

## Task 6

> 攻击者最初用来枚举易受攻击服务器的工具是什么？

```plaintext title="Answer"

```

## Task 7

> 我们怀疑攻击者可能更改了我们服务帐户的密码。请确认发生此情况的时间（UTC）

```plaintext title="Answer"

```

## Task 8

> 攻击者使用哪种协议远程进入受感染的计算机？

```plaintext title="Answer"

```

## Task 9

> 请确认攻击者远程访问受感染计算机的日期和时间？

```plaintext title="Answer"

```

## Task 10

> 攻击者用于访问 webshell 的用户代理是什么?

```plaintext title="Answer"

```

## Task 11

> 攻击者的 inst ID 是什么？

```plaintext title="Answer"

```

## Task 12

> 攻击者运行了什么命令来检索 webshell？

```plaintext title="Answer"

```

## Task 13

>TA 部署的 webshell 的标题头中的字符串是什么？

```plaintext title="Answer"

```

## Task 14

>TA 将我们的 moveitsvc 帐户密码更改为什么？

```plaintext title="Answer"

```

## Task 15

>

```plaintext title="Answer"

```
