# Logjammer

:::info Sherlock Scenario

You have been presented the opportunity to work as a junior DFIR consultant for a big consultancy, however they have provided a technical assessment for you to complete. The consultancy Forela-Security would like to gauge your knowledge on Windows Event Log Analysis. Please analyse and report back on the questions they have asked.

你被提供了一份技术评估，这是为了成为一家大型咨询公司的初级数字取证和应急响应（DFIR）顾问。咨询公司 Forela-Security 希望评估你在 Windows 事件日志分析方面的知识。请分析并报告他们提出的问题。

:::

## 题目数据

[logjammer.zip](./logjammer.zip)

## Task 1

> 用户 cyberjunkie 何时成功登录了他的计算机？（UTC 时间）

登录的事件 ID 为 `4648`，借此可以定位到以下记录

```xml
<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event">
  <System>
    <Provider Name="Microsoft-Windows-Security-Auditing" Guid="{54849625-5478-4994-a5ba-3e3b0328c30d}" />
    <EventID>4648</EventID>
    <Version>0</Version>
    <Level>0</Level>
    <Task>12544</Task>
    <Opcode>0</Opcode>
    <Keywords>0x8020000000000000</Keywords>
    <TimeCreated SystemTime="2023-03-27T14:37:09.8798342Z" />
    <EventRecordID>13057</EventRecordID>
    <Correlation ActivityID="{986a053f-60b9-0002-5b05-6a98b960d901}" />
    <Execution ProcessID="780" ThreadID="824" />
    <Channel>Security</Channel>
    <Computer>DESKTOP-887GK2L</Computer>
    <Security />
  </System>
  <EventData>
    <Data Name="SubjectUserSid">S-1-5-18</Data>
    <Data Name="SubjectUserName">DESKTOP-887GK2L$</Data>
    <Data Name="SubjectDomainName">WORKGROUP</Data>
    <Data Name="SubjectLogonId">0x3e7</Data>
    <Data Name="LogonGuid">{00000000-0000-0000-0000-000000000000}</Data>
    <Data Name="TargetUserName">CyberJunkie</Data>
    <Data Name="TargetDomainName">DESKTOP-887GK2L</Data>
    <Data Name="TargetLogonGuid">{00000000-0000-0000-0000-000000000000}</Data>
    <Data Name="TargetServerName">localhost</Data>
    <Data Name="TargetInfo">localhost</Data>
    <Data Name="ProcessId">0x570</Data>
    <Data Name="ProcessName">C:\Windows\System32\svchost.exe</Data>
    <Data Name="IpAddress">127.0.0.1</Data>
    <Data Name="IpPort">0</Data>
  </EventData>
</Event>
```

记得转换为 UTC 标准时间

```plaintext title="Answer"
27/03/2023 14:37:09
```

## Task 2

> 用户篡改了系统的防火墙设置。分析防火墙事件日志以找出添加的防火墙规则的名称是什么？

添加防火墙规则的事件 ID 为 `2004`

通过对日志文件的筛查，可以得到用户的用户 ID 为 `S-1-5-21-3393683511-3463148672-371912004-1001`

借此得到了以下记录

```xml
<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event">
  <System>
    <Provider Name="Microsoft-Windows-Windows Firewall With Advanced Security" Guid="{d1bc9aff-2abf-4d71-9146-ecb2a986eb85}" />
    <EventID>2004</EventID>
    <Version>0</Version>
    <Level>4</Level>
    <Task>0</Task>
    <Opcode>0</Opcode>
    <Keywords>0x8000020000000000</Keywords>
    <TimeCreated SystemTime="2023-03-27T14:44:43.4157021Z" />
    <EventRecordID>1120</EventRecordID>
    <Correlation />
    <Execution ProcessID="2384" ThreadID="2868" />
    <Channel>Microsoft-Windows-Windows Firewall With Advanced Security/Firewall</Channel>
    <Computer>DESKTOP-887GK2L</Computer>
    <Security UserID="S-1-5-19" />
  </System>
  <EventData>
    <Data Name="RuleId">{11309293-FB68-4969-93F9-7F75A9032570}</Data>
    <Data Name="RuleName">Metasploit C2 Bypass</Data>
    <Data Name="Origin">1</Data>
    <Data Name="ApplicationPath">
    </Data>
    <Data Name="ServiceName">
    </Data>
    <Data Name="Direction">2</Data>
    <Data Name="Protocol">6</Data>
    <Data Name="LocalPorts">*</Data>
    <Data Name="RemotePorts">4444</Data>
    <Data Name="Action">3</Data>
    <Data Name="Profiles">2147483647</Data>
    <Data Name="LocalAddresses">*</Data>
    <Data Name="RemoteAddresses">*</Data>
    <Data Name="RemoteMachineAuthorizationList">
    </Data>
    <Data Name="RemoteUserAuthorizationList">
    </Data>
    <Data Name="EmbeddedContext">
    </Data>
    <Data Name="Flags">1</Data>
    <Data Name="Active">1</Data>
    <Data Name="EdgeTraversal">0</Data>
    <Data Name="LooseSourceMapped">0</Data>
    <Data Name="SecurityOptions">0</Data>
    <Data Name="ModifyingUser">S-1-5-21-3393683511-3463148672-371912004-1001</Data>
    <Data Name="ModifyingApplication">C:\Windows\System32\mmc.exe</Data>
    <Data Name="SchemaVersion">542</Data>
    <Data Name="RuleStatus">65536</Data>
    <Data Name="LocalOnlyMapped">0</Data>
  </EventData>
</Event>
```

```plaintext title="Answer"
Metasploit C2 Bypass
```

## Task 3

> 防火墙规则的方向是什么？

上一题的日志数据中就有

```plaintext title="Answer"
Outbound
```

## Task 4

> 用户更改了计算机的审计策略。这个更改策略的子类是什么？

审计策略更改的日志 ID 为 `4719` 借此定位到以下记录

```xml
<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event">
  <System>
    <Provider Name="Microsoft-Windows-Security-Auditing" Guid="{54849625-5478-4994-a5ba-3e3b0328c30d}" />
    <EventID>4719</EventID>
    <Version>0</Version>
    <Level>0</Level>
    <Task>13568</Task>
    <Opcode>0</Opcode>
    <Keywords>0x8020000000000000</Keywords>
    <TimeCreated SystemTime="2023-03-27T14:50:03.7218352Z" />
    <EventRecordID>13102</EventRecordID>
    <Correlation ActivityID="{986a053f-60b9-0002-5b05-6a98b960d901}" />
    <Execution ProcessID="780" ThreadID="1488" />
    <Channel>Security</Channel>
    <Computer>DESKTOP-887GK2L</Computer>
    <Security />
  </System>
  <EventData>
    <Data Name="SubjectUserSid">S-1-5-18</Data>
    <Data Name="SubjectUserName">DESKTOP-887GK2L$</Data>
    <Data Name="SubjectDomainName">WORKGROUP</Data>
    <Data Name="SubjectLogonId">0x3e7</Data>
    <Data Name="CategoryId">%%8274</Data>
    <Data Name="SubcategoryId">%%12804</Data>
    <Data Name="SubcategoryGuid">{0cce9227-69ae-11d9-bed3-505054503030}</Data>
    <Data Name="AuditPolicyChanges">%%8449</Data>
  </EventData>
</Event>
```

Other Object Access Events

```plaintext title="Answer"

```

## Task 5

> 用户 "cyberjunkie" 创建了一个计划任务。这个任务的名称是什么？

创建计划任务的事件 ID 为 `4698`，借此定位到以下记录

```xml
<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event">
  <System>
    <Provider Name="Microsoft-Windows-Security-Auditing" Guid="{54849625-5478-4994-a5ba-3e3b0328c30d}" />
    <EventID>4698</EventID>
    <Version>1</Version>
    <Level>0</Level>
    <Task>12804</Task>
    <Opcode>0</Opcode>
    <Keywords>0x8020000000000000</Keywords>
    <TimeCreated SystemTime="2023-03-27T14:51:21.4817206Z" />
    <EventRecordID>13103</EventRecordID>
    <Correlation ActivityID="{986a053f-60b9-0002-5b05-6a98b960d901}" />
    <Execution ProcessID="780" ThreadID="4180" />
    <Channel>Security</Channel>
    <Computer>DESKTOP-887GK2L</Computer>
    <Security />
  </System>
  <EventData>
    <Data Name="SubjectUserSid">S-1-5-21-3393683511-3463148672-371912004-1001</Data>
    <Data Name="SubjectUserName">CyberJunkie</Data>
    <Data Name="SubjectDomainName">DESKTOP-887GK2L</Data>
    <Data Name="SubjectLogonId">0x25f28</Data>
    <Data Name="TaskName">\HTB-AUTOMATION</Data>
    <Data Name="TaskContent">......</Data>
    <Data Name="ClientProcessStartKey">4222124650660162</Data>
    <Data Name="ClientProcessId">9320</Data>
    <Data Name="ParentProcessId">6112</Data>
    <Data Name="RpcCallClientLocality">0</Data>
    <Data Name="FQDN">DESKTOP-887GK2L</Data>
  </EventData>
</Event>
```

```plaintext title="Answer"
HTB-AUTOMATION
```

## Task 6

> 被安排执行任务的文件的完整路径是什么？

在上文记录的 `TaskContent` 条目中就有

```xml
<?xml version="1.0" encoding="UTF-16"?>
<Task version="1.2"
    xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
    <RegistrationInfo>
        <Date>2023-03-27T07:51:21.4599985</Date>
        <Author>DESKTOP-887GK2L\CyberJunkie</Author>
        <Description>practice</Description>
        <URI>\HTB-AUTOMATION</URI>
    </RegistrationInfo>
    <Triggers>
        <CalendarTrigger>
            <StartBoundary>2023-03-27T09:00:00</StartBoundary>
            <Enabled>true</Enabled>
            <ScheduleByDay>
                <DaysInterval>1</DaysInterval>
            </ScheduleByDay>
        </CalendarTrigger>
    </Triggers>
    <Principals>
        <Principal id="Author">
            <RunLevel>LeastPrivilege</RunLevel>
            <UserId>DESKTOP-887GK2L\CyberJunkie</UserId>
            <LogonType>InteractiveToken</LogonType>
        </Principal>
    </Principals>
    <Settings>
        <MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
        <DisallowStartIfOnBatteries>true</DisallowStartIfOnBatteries>
        <StopIfGoingOnBatteries>true</StopIfGoingOnBatteries>
        <AllowHardTerminate>true</AllowHardTerminate>
        <StartWhenAvailable>false</StartWhenAvailable>
        <RunOnlyIfNetworkAvailable>false</RunOnlyIfNetworkAvailable>
        <IdleSettings>
            <Duration>PT10M</Duration>
            <WaitTimeout>PT1H</WaitTimeout>
            <StopOnIdleEnd>true</StopOnIdleEnd>
            <RestartOnIdle>false</RestartOnIdle>
        </IdleSettings>
        <AllowStartOnDemand>true</AllowStartOnDemand>
        <Enabled>true</Enabled>
        <Hidden>false</Hidden>
        <RunOnlyIfIdle>false</RunOnlyIfIdle>
        <WakeToRun>false</WakeToRun>
        <ExecutionTimeLimit>P3D</ExecutionTimeLimit>
        <Priority>7</Priority>
    </Settings>
    <Actions Context="Author">
        <Exec>
            <Command>C:\Users\CyberJunkie\Desktop\Automation-HTB.ps1</Command>
            <Arguments>-A cyberjunkie@hackthebox.eu</Arguments>
        </Exec>
    </Actions>
</Task>
```

```plaintext title="Answer"
C:\Users\CyberJunkie\Desktop\Automation-HTB.ps1
```

## Task 7

> 该命令的参数是什么？

上一题中就有

```plaintext title="Answer"
-A cyberjunkie@hackthebox.eu
```

## Task 8

> 系统上运行的防病毒软件识别出一个威胁并对其执行了操作。防病毒软件识别出的恶意软件是哪个工具？

`Microsoft Defender` 检测到恶意软件的事件 ID 为 `1117`，借此定位到以下记录

```xml
<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event">
  <System>
    <Provider Name="Microsoft-Windows-Windows Defender" Guid="{11cd958a-c507-4ef3-b3f2-5fd9dfbd2c78}" />
    <EventID>1117</EventID>
    <Version>0</Version>
    <Level>4</Level>
    <Task>0</Task>
    <Opcode>0</Opcode>
    <Keywords>0x8000000000000000</Keywords>
    <TimeCreated SystemTime="2023-03-27T14:42:48.3526591Z" />
    <EventRecordID>443</EventRecordID>
    <Correlation />
    <Execution ProcessID="3300" ThreadID="3056" />
    <Channel>Microsoft-Windows-Windows Defender/Operational</Channel>
    <Computer>DESKTOP-887GK2L</Computer>
    <Security UserID="S-1-5-18" />
  </System>
  <EventData>
    <Data Name="Product Name">Microsoft Defender Antivirus</Data>
    <Data Name="Product Version">4.18.2302.7</Data>
    <Data Name="Detection ID">{0EBC4BEA-5532-4EFB-8A34-64F91CC8702E}</Data>
    <Data Name="Detection Time">2023-03-27T14:42:34.272Z</Data>
    <Data Name="Unused">
    </Data>
    <Data Name="Unused2">
    </Data>
    <Data Name="Threat ID">2147814944</Data>
    <Data Name="Threat Name">HackTool:MSIL/SharpHound!MSR</Data>
    <Data Name="Severity ID">4</Data>
    <Data Name="Severity Name">High</Data>
    <Data Name="Category ID">34</Data>
    <Data Name="Category Name">Tool</Data>
    <Data Name="FWLink">https://go.microsoft.com/fwlink/?linkid=37020&amp;name=HackTool:MSIL/SharpHound!MSR&amp;threatid=2147814944&amp;enterprise=0</Data>
    <Data Name="Status Code">103</Data>
    <Data Name="Status Description">
    </Data>
    <Data Name="State">2</Data>
    <Data Name="Source ID">4</Data>
    <Data Name="Source Name">Downloads and attachments</Data>
    <Data Name="Process Name">Unknown</Data>
    <Data Name="Detection User">DESKTOP-887GK2L\CyberJunkie</Data>
    <Data Name="Unused3">
    </Data>
    <Data Name="Path">containerfile:_C:\Users\CyberJunkie\Downloads\SharpHound-v1.1.0.zip; file:_C:\Users\CyberJunkie\Downloads\SharpHound-v1.1.0.zip-&gt;SharpHound.exe; webfile:_C:\Users\CyberJunkie\Downloads\SharpHound-v1.1.0.zip|https://objects.githubusercontent.com/github-production-release-asset-2e65be/385323486/70d776cc-8f83-44d5-b226-2dccc4f7c1e3?X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20230327%2Fus-east-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20230327T144228Z&amp;X-Amz-Expires=300&amp;X-Amz-Signature=f969ef5ca3eec150dc1e23623434adc1e4a444ba026423c32edf5e85d881a771&amp;X-Amz-SignedHeaders=host&amp;actor_id=0&amp;key_id=0&amp;repo_id=385323486&amp;response-content-disposition=attachment%3B%20filename%3DSharpHound-v1.1.0.zip&amp;response-content-type=application%2Foctet-stream|pid:3532,ProcessStart:133244017530289775</Data>
    <Data Name="Origin ID">4</Data>
    <Data Name="Origin Name">Internet</Data>
    <Data Name="Execution ID">0</Data>
    <Data Name="Execution Name">Unknown</Data>
    <Data Name="Type ID">0</Data>
    <Data Name="Type Name">Concrete</Data>
    <Data Name="Pre Execution Status">0</Data>
    <Data Name="Action ID">2</Data>
    <Data Name="Action Name">Quarantine</Data>
    <Data Name="Unused4">
    </Data>
    <Data Name="Error Code">0x80508023</Data>
    <Data Name="Error Description">The program could not find the malware and other potentially unwanted software on this device. </Data>
    <Data Name="Unused5">
    </Data>
    <Data Name="Post Clean Status">0</Data>
    <Data Name="Additional Actions ID">0</Data>
    <Data Name="Additional Actions String">No additional actions required</Data>
    <Data Name="Remediation User">NT AUTHORITY\SYSTEM</Data>
    <Data Name="Unused6">
    </Data>
    <Data Name="Security intelligence Version">AV: 1.385.1261.0, AS: 1.385.1261.0, NIS: 1.385.1261.0</Data>
    <Data Name="Engine Version">AM: 1.1.20100.6, NIS: 1.1.20100.6</Data>
  </EventData>
</Event>
```

```plaintext title="Answer"
SharpHound
```

## Task 9

> 引发警报的恶意软件的完整路径是什么？

上文就有

```plaintext title="Answer"
C:\Users\CyberJunkie\Downloads\SharpHound-v1.1.0.zip
```

## Task 10

> 防病毒软件采取了什么行动？

上文就有

```plaintext title="Answer"
Quarantine
```

## Task 11

> 用户使用 PowerShell 执行了哪个命令？

执行命令的事件ID为`4104`，定位到以下记录

```xml
日志名称:          Microsoft-Windows-PowerShell/Operational
来源:            Microsoft-Windows-PowerShell
日期:            2023/3/27 22:58:33
事件 ID:         4104
任务类别:          执行远程命令
级别:            详细
关键字:           无
用户:            S-1-5-21-3393683511-3463148672-371912004-1001
计算机:           DESKTOP-887GK2L
描述:
正在创建 Scriptblock 文本(已完成 1，共 1):
Get-FileHash -Algorithm md5 .\Desktop\Automation-HTB.ps1

ScriptBlock ID: b4fcf72f-abdc-4a84-923f-8e06a758000b
路径: 
事件 Xml:
<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event">
  <System>
    <Provider Name="Microsoft-Windows-PowerShell" Guid="{a0c1853b-5c40-4b15-8766-3cf1c58f985a}" />
    <EventID>4104</EventID>
    <Version>1</Version>
    <Level>5</Level>
    <Task>2</Task>
    <Opcode>15</Opcode>
    <Keywords>0x0</Keywords>
    <TimeCreated SystemTime="2023-03-27T14:58:33.3647699Z" />
    <EventRecordID>571</EventRecordID>
    <Correlation ActivityID="{986a053f-60b9-0001-a819-6a98b960d901}" />
    <Execution ProcessID="7152" ThreadID="2000" />
    <Channel>Microsoft-Windows-PowerShell/Operational</Channel>
    <Computer>DESKTOP-887GK2L</Computer>
    <Security UserID="S-1-5-21-3393683511-3463148672-371912004-1001" />
  </System>
  <EventData>
    <Data Name="MessageNumber">1</Data>
    <Data Name="MessageTotal">1</Data>
    <Data Name="ScriptBlockText">Get-FileHash -Algorithm md5 .\Desktop\Automation-HTB.ps1</Data>
    <Data Name="ScriptBlockId">b4fcf72f-abdc-4a84-923f-8e06a758000b</Data>
    <Data Name="Path">
    </Data>
  </EventData>
</Event>
```

```plaintext title="Answer"
Get-FileHash -Algorithm md5 .\Desktop\Automation-HTB.ps1
```

## Task 12

> 我们怀疑用户删除了一些事件日志。被清除的事件日志文件是哪个？

日志清空的事件 ID 为 `104`，就可以定位到以下日志记录

```xml
<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event">
  <System>
    <Provider Name="Microsoft-Windows-Eventlog" Guid="{fc65ddd8-d6ef-4962-83d5-6e5cfe9ce148}" />
    <EventID>104</EventID>
    <Version>0</Version>
    <Level>4</Level>
    <Task>104</Task>
    <Opcode>0</Opcode>
    <Keywords>0x8000000000000000</Keywords>
    <TimeCreated SystemTime="2023-03-27T15:01:56.5158362Z" />
    <EventRecordID>2186</EventRecordID>
    <Correlation />
    <Execution ProcessID="1332" ThreadID="5332" />
    <Channel>System</Channel>
    <Computer>DESKTOP-887GK2L</Computer>
    <Security UserID="S-1-5-21-3393683511-3463148672-371912004-1001" />
  </System>
  <UserData>
    <LogFileCleared xmlns="http://manifests.microsoft.com/win/2004/08/windows/eventlog">
      <SubjectUserName>CyberJunkie</SubjectUserName>
      <SubjectDomainName>DESKTOP-887GK2L</SubjectDomainName>
      <Channel>Microsoft-Windows-Windows Firewall With Advanced Security/Firewall</Channel>
      <BackupPath>
      </BackupPath>
    </LogFileCleared>
  </UserData>
</Event>
```

```plaintext title="Answer"
Microsoft-Windows-Windows Firewall With Advanced Security/Firewall
```
