# RogueOne

:::info Sherlock Scenario

Your SIEM system generated multiple alerts in less than a minute, indicating potential C2 communication from Simon Stark's workstation. Despite Simon not noticing anything unusual, the IT team had him share screenshots of his task manager to check for any unusual processes. No suspicious processes were found, yet alerts about C2 communications persisted. The SOC manager then directed the immediate containment of the workstation and a memory dump for analysis. As a memory forensics expert, you are tasked with assisting the SOC team at Forela to investigate and resolve this urgent incident.

您的 SIEM 系统在一分钟内生成了多个警报，表明西蒙 · 斯塔克的工作站存在潜在的 C2 通信。尽管西蒙没有注意到任何异常情况，但 IT 团队还是让他分享了任务管理器的屏幕截图，以检查是否有任何异常进程。没有发现可疑进程，但有关 C2 通信的警报仍然存在。然后，SOC 经理指示立即封存工作站并转储内存以进行分析。作为内存取证专家，您的任务是协助 Forela 的 SOC 团队调查并解决这一紧急事件。
:::

## 题目数据

由于附件过大，故在此不提供下载链接

## Task 1

> 请识别恶意进程并确认恶意进程的进程 ID。

首先，先识别出来镜像的基本信息

```shell title='vol -f 20230810.mem windows.info'
Volatility 3 Framework 2.5.0
Progress:  100.00               PDB scanning finished
Variable        Value

Kernel Base     0xf80178400000
DTB     0x16a000
Symbols file:///home/randark/.local/lib/python3.10/site-packages/volatility3/symbols/windows/ntkrnlmp.pdb/3789767E34B7A48A3FC80CE12DE18E65-1.json.xz
Is64Bit True
IsPAE   False
layer_name      0 WindowsIntel32e
memory_layer    1 FileLayer
KdVersionBlock  0xf8017900f398
Major/Minor     15.19041
MachineType     34404
KeNumberProcessors      8
SystemTime      2023-08-10 11:32:00
NtSystemRoot    C:\WINDOWS
NtProductType   NtProductWinNt
NtMajorVersion  10
NtMinorVersion  0
PE MajorOperatingSystemVersion  10
PE MinorOperatingSystemVersion  0
PE Machine      34404
PE TimeDateStamp        Mon Nov 24 23:45:00 2070
```

分析 `cmdline` 记录

```shell title="vol -f 20230810.mem windows.cmdline"
......
6812    svchost.exe     "C:\Users\simon.stark\Downloads\svchost.exe"
4364    cmd.exe C:\WINDOWS\system32\cmd.exe
9204    conhost.exe     \??\C:\WINDOWS\system32\conhost.exe 0x4
9784    SearchFilterHo  "C:\WINDOWS\system32\SearchFilterHost.exe" 0 764 820 828 8192 824 808
2776    RamCapture64.e  "C:\Users\simon.stark\Desktop\BelkaSoft Live RAM Capturer\BelkaSoft Live RAM Capturer\RamCapture64.exe"
9816    conhost.exe     \??\C:\WINDOWS\system32\conhost.exe 0x4
```

根据常识，文件 `C:\Users\simon.stark\Downloads\svchost.exe` 绝对有问题，系统组件不可能存在于下载目录

```plaintext title="Answer"
6812
```

## Task 2

> SOC 团队认为恶意进程可能生成了另一个进程，使威胁参与者能够执行命令。该子进程的进程 ID 是多少？

查看进程树

```shell title="vol -f 20230810.mem windows.pstree"
Volatility 3 Framework 2.5.0
Progress:  100.00               PDB scanning finished
PID     PPID    ImageFileName   Offset(V)       Threads Handles SessionId       Wow64   CreateTime      ExitTime

4       0       System  0x9e8b87680040  225     -       N/A     False   2023-08-10 11:13:38.000000      N/A
* 2184  4       MemCompression  0x9e8b8a038040  22      -       N/A     False   2023-08-10 11:13:44.000000      N/A
* 436   4       smss.exe        0x9e8b8843f040  2       -       N/A     False   2023-08-10 11:13:38.000000      N/A
* 140   4       Registry        0x9e8b876ce080  4       -       N/A     False   2023-08-10 11:13:32.000000      N/A
564     548     csrss.exe       0x9e8b882f8140  13      -       0       False   2023-08-10 11:13:41.000000      N/A
644     636     csrss.exe       0x9e8b893eb140  14      -       1       False   2023-08-10 11:13:41.000000      N/A
656     548     wininit.exe     0x9e8b89416080  1       -       0       False   2023-08-10 11:13:41.000000      N/A
* 808   656     lsass.exe       0x9e8b894a2080  12      -       0       False   2023-08-10 11:13:42.000000      N/A
* 964   656     fontdrvhost.ex  0x9e8b8952e180  5       -       0       False   2023-08-10 11:13:43.000000      N/A
* 788   656     services.exe    0x9e8b8949e080  10      -       0       False   2023-08-10 11:13:42.000000      N/A
** 512  788     svchost.exe     0x9e8b895a72c0  11      -       0       False   2023-08-10 11:13:43.000000      N/A
** 2588 788     svchost.exe     0x9e8b8a18c240  4       -       0       False   2023-08-10 11:13:44.000000      N/A
** 1564 788     svchost.exe     0x9e8b92bdf080  1       -       0       False   2023-08-10 11:14:54.000000      N/A
** 3108 788     svchost.exe     0x9e8b8a42f240  3       -       0       False   2023-08-10 11:13:44.000000      N/A
** 6692 788     svchost.exe     0x9e8b8c42c280  3       -       0       False   2023-08-10 11:14:07.000000      N/A
*** 6768        6692    ctfmon.exe      0x9e8b8c452280  12      -       1       False   2023-08-10 11:14:07.000000      N/A
** 1580 788     svchost.exe     0x9e8b89d900c0  7       -       0       False   2023-08-10 11:13:43.000000      N/A
*** 4112        1580    GoogleUpdate.e  0x9e8b8c74c080  3       -       0       True    2023-08-10 11:20:19.000000      N/A
*** 6324        1580    taskhostw.exe   0x9e8b8c45a300  8       -       1       False   2023-08-10 11:14:07.000000      N/A
** 2044 788     svchost.exe     0x9e8b89fc2080  8       -       0       False   2023-08-10 11:13:43.000000      N/A
** 1588 788     svchost.exe     0x9e8b89d94080  6       -       0       False   2023-08-10 11:13:43.000000      N/A
** 4160 788     svchost.exe     0x9e8b8b1ef280  2       -       0       False   2023-08-10 11:13:46.000000      N/A
** 3136 788     MsMpEng.exe     0x9e8b914f0300  10      -       0       False   2023-08-10 11:24:47.000000      N/A
** 7236 788     svchost.exe     0x9e8b8c6b2080  7       -       1       False   2023-08-10 11:14:11.000000      N/A
** 5196 788     svchost.exe     0x9e8b8ca65300  3       -       0       False   2023-08-10 11:27:43.000000      N/A
** 6224 788     svchost.exe     0x9e8b8a33e080  4       -       0       False   2023-08-10 11:28:46.000000      N/A
** 2644 788     svchost.exe     0x9e8b8a3ea240  2       -       0       False   2023-08-10 11:13:44.000000      N/A
** 2140 788     svchost.exe     0x9e8b89f6f200  2       -       0       False   2023-08-10 11:13:44.000000      N/A
** 3680 788     svchost.exe     0x9e8b8a60c2c0  3       -       0       False   2023-08-10 11:13:44.000000      N/A
** 4200 788     svchost.exe     0x9e8b90554240  0       -       0       False   2023-08-10 11:14:19.000000      2023-08-10 11:16:20.000000
** 2168 788     svchost.exe     0x9e8b8a039240  2       -       0       False   2023-08-10 11:13:44.000000      N/A
** 1148 788     svchost.exe     0x9e8b89c922c0  30      -       0       False   2023-08-10 11:13:43.000000      N/A
** 3204 788     spoolsv.exe     0x9e8b8a43f200  7       -       0       False   2023-08-10 11:13:44.000000      N/A
** 4744 788     svchost.exe     0x9e8b8946d1c0  1       -       0       False   2023-08-10 11:13:45.000000      N/A
** 652  788     svchost.exe     0x9e8b8cee2080  5       -       0       False   2023-08-10 11:14:13.000000      N/A
** 2704 788     svchost.exe     0x9e8b8a2581c0  1       -       0       False   2023-08-10 11:13:44.000000      N/A
** 5796 788     svchost.exe     0x9e8b8b4b61c0  5       -       0       False   2023-08-10 11:13:51.000000      N/A
** 3756 788     svchost.exe     0x9e8b8a6a4240  6       -       0       False   2023-08-10 11:13:44.000000      N/A
** 1712 788     svchost.exe     0x9e8b89dab1c0  2       -       0       False   2023-08-10 11:13:43.000000      N/A
** 2740 788     svchost.exe     0x9e8b8a25b080  11      -       0       False   2023-08-10 11:13:44.000000      N/A
*** 1908        2740    audiodg.exe     0x9e8b90ec9080  5       -       0       False   2023-08-10 11:27:38.000000      N/A
** 6344 788     svchost.exe     0x9e8b8a04f340  4       -       0       False   2023-08-10 11:26:32.000000      N/A
** 2256 788     svchost.exe     0x9e8b8a09c240  21      -       0       False   2023-08-10 11:13:44.000000      N/A
** 1748 788     svchost.exe     0x9e8b89e541c0  11      -       0       False   2023-08-10 11:13:43.000000      N/A
** 4308 788     svchost.exe     0x9e8b8b19a1c0  6       -       0       False   2023-08-10 11:13:46.000000      N/A
** 1756 788     svchost.exe     0x9e8b89e562c0  6       -       0       False   2023-08-10 11:13:43.000000      N/A
** 1244 788     svchost.exe     0x9e8b92987300  5       -       0       False   2023-08-10 11:26:35.000000      N/A
** 7904 788     svchost.exe     0x9e8b8cf91080  3       -       0       False   2023-08-10 11:27:43.000000      N/A
** 3816 788     svchost.exe     0x9e8b8a761240  11      -       0       False   2023-08-10 11:13:44.000000      N/A
** 3316 788     svchost.exe     0x9e8b8a510240  10      -       0       False   2023-08-10 11:13:44.000000      N/A
** 1272 788     svchost.exe     0x9e8b89cf4280  3       -       0       False   2023-08-10 11:13:43.000000      N/A
** 7416 788     svchost.exe     0x9e8b92ddd340  1       -       1       False   2023-08-10 11:15:45.000000      N/A
** 3324 788     svchost.exe     0x9e8b8a5652c0  7       -       0       False   2023-08-10 11:13:44.000000      N/A
** 1280 788     svchost.exe     0x9e8b89cf5080  4       -       0       False   2023-08-10 11:13:43.000000      N/A
** 2816 788     svchost.exe     0x9e8b8a2ed300  5       -       0       False   2023-08-10 11:13:44.000000      N/A
** 1792 788     svchost.exe     0x9e8b8b2561c0  5       -       0       False   2023-08-10 11:13:46.000000      N/A
** 1288 788     svchost.exe     0x9e8b89cf71c0  3       -       0       False   2023-08-10 11:13:43.000000      N/A
** 4876 788     svchost.exe     0x9e8b8aedb1c0  4       -       0       False   2023-08-10 11:13:45.000000      N/A
** 1296 788     svchost.exe     0x9e8b89cf91c0  4       -       0       False   2023-08-10 11:13:43.000000      N/A
** 4372 788     svchost.exe     0x9e8b8b9ce300  5       -       1       False   2023-08-10 11:14:07.000000      N/A
** 1304 788     svchost.exe     0x9e8b89cfb200  4       -       0       False   2023-08-10 11:13:43.000000      N/A
** 3352 788     svchost.exe     0x9e8b8a574080  1       -       0       False   2023-08-10 11:13:44.000000      N/A
** 9724 788     svchost.exe     0x9e8b911e3080  4       -       0       False   2023-08-10 11:28:20.000000      N/A
** 1828 788     svchost.exe     0x9e8b89e70240  6       -       0       False   2023-08-10 11:13:43.000000      N/A
*** 4272        1828    sihost.exe      0x9e8b8b872280  8       -       1       False   2023-08-10 11:14:07.000000      N/A
** 3368 788     svchost.exe     0x9e8b8a5631c0  16      -       0       False   2023-08-10 11:13:44.000000      N/A
** 3376 788     svchost.exe     0x9e8b8a575080  3       -       0       False   2023-08-10 11:13:44.000000      N/A
** 4912 788     msdtc.exe       0x9e8b8a9b3300  9       -       0       False   2023-08-10 11:13:45.000000      N/A
** 2356 788     svchost.exe     0x9e8b8a106280  2       -       0       False   2023-08-10 11:13:44.000000      N/A
** 2368 788     svchost.exe     0x9e8b8a108280  2       -       0       False   2023-08-10 11:13:44.000000      N/A
** 3404 788     svchost.exe     0x9e8b8a562080  7       -       0       False   2023-08-10 11:13:44.000000      N/A
** 5452 788     svchost.exe     0x9e8b8b34b240  28      -       0       False   2023-08-10 11:13:51.000000      N/A
** 5972 788     svchost.exe     0x9e8b8b4cb240  18      -       0       False   2023-08-10 11:13:52.000000      N/A
** 3416 788     vmtoolsd.exe    0x9e8b8a57a280  11      -       0       False   2023-08-10 11:13:44.000000      N/A
** 4440 788     dllhost.exe     0x9e8b8aac8080  10      -       0       False   2023-08-10 11:13:45.000000      N/A
** 10072        788     svchost.exe     0x9e8b92f1c340  9       -       0       False   2023-08-10 11:15:45.000000      N/A
** 864  788     svchost.exe     0x9e8b895a9240  6       -       0       False   2023-08-10 11:13:43.000000      N/A
** 3424 788     Sysmon64.exe    0x9e8b8a578200  13      -       0       False   2023-08-10 11:13:44.000000      N/A
** 7008 788     svchost.exe     0x9e8b8b5ea080  6       -       0       False   2023-08-10 11:14:05.000000      N/A
** 8560 788     svchost.exe     0x9e8b8c7430c0  7       -       0       False   2023-08-10 11:24:26.000000      N/A
** 6000 788     svchost.exe     0x9e8b926e7300  2       -       0       False   2023-08-10 11:27:43.000000      N/A
** 3444 788     VGAuthService.  0x9e8b8a57c300  2       -       0       False   2023-08-10 11:13:44.000000      N/A
** 1396 788     uhssvc.exe      0x9e8b930402c0  3       -       0       False   2023-08-10 11:15:45.000000      N/A
** 2936 788     svchost.exe     0x9e8b8a327240  5       -       0       False   2023-08-10 11:13:44.000000      N/A
** 4992 788     svchost.exe     0x9e8b8b9bd300  11      -       1       False   2023-08-10 11:14:07.000000      N/A
** 9088 788     svchost.exe     0x9e8b8c4020c0  2       -       0       False   2023-08-10 11:26:32.000000      N/A
** 2948 788     svchost.exe     0x9e8b8a33b1c0  3       -       0       False   2023-08-10 11:13:44.000000      N/A
** 3464 788     vm3dservice.ex  0x9e8b8a52d080  2       -       0       False   2023-08-10 11:13:44.000000      N/A
*** 3788        3464    vm3dservice.ex  0x9e8b8a71f200  2       -       1       False   2023-08-10 11:13:44.000000      N/A
** 2956 788     svchost.exe     0x9e8b8a33d1c0  4       -       0       False   2023-08-10 11:13:44.000000      N/A
** 9612 788     SecurityHealth  0x9e8b8c7d6080  11      -       0       False   2023-08-10 11:14:25.000000      N/A
** 1432 788     svchost.exe     0x9e8b89d121c0  5       -       0       False   2023-08-10 11:13:43.000000      N/A
** 928  788     svchost.exe     0x9e8b89527240  13      -       0       False   2023-08-10 11:13:42.000000      N/A
*** 4416        928     WmiPrvSE.exe    0x9e8b8aac5280  15      -       0       False   2023-08-10 11:13:45.000000      N/A
*** 8224        928     SearchApp.exe   0x9e8b89d92080  55      -       1       False   2023-08-10 11:14:14.000000      N/A
*** 8828        928     smartscreen.ex  0x9e8b8cff5300  8       -       1       False   2023-08-10 11:14:15.000000      N/A
*** 2240        928     ShellExperienc  0x9e8b8775c080  11      -       1       False   2023-08-10 11:27:30.000000      N/A
*** 4132        928     unsecapp.exe    0x9e8b8a9b00c0  3       -       0       False   2023-08-10 11:13:45.000000      N/A
*** 3616        928     RuntimeBroker.  0x9e8b8cb62080  6       -       1       False   2023-08-10 11:27:38.000000      N/A
*** 8488        928     RuntimeBroker.  0x9e8b8caa5080  8       -       1       False   2023-08-10 11:14:14.000000      N/A
*** 4664        928     dllhost.exe     0x9e8b907ef080  8       -       1       False   2023-08-10 11:14:21.000000      N/A
*** 5292        928     WmiPrvSE.exe    0x9e8b8b30a280  4       -       0       False   2023-08-10 11:13:47.000000      N/A
*** 7756        928     RuntimeBroker.  0x9e8b89c39080  4       -       1       False   2023-08-10 11:14:16.000000      N/A
*** 3024        928     TextInputHost.  0x9e8b9050d080  9       -       1       False   2023-08-10 11:17:11.000000      N/A
*** 5232        928     ApplicationFra  0x9e8b9a26d080  3       -       1       False   2023-08-10 11:27:42.000000      N/A
*** 7128        928     MoUsoCoreWorke  0x9e8b8b526280  10      -       0       False   2023-08-10 11:14:06.000000      N/A
*** 7704        928     StartMenuExper  0x9e8b8cd9e080  8       -       1       False   2023-08-10 11:14:13.000000      N/A
*** 4380        928     RuntimeBroker.  0x9e8b8cf95080  3       -       1       False   2023-08-10 11:14:13.000000      N/A
** 7072 788     svchost.exe     0x9e8b8b5f0240  9       -       0       False   2023-08-10 11:14:06.000000      N/A
** 2476 788     svchost.exe     0x9e8b8a131240  5       -       0       False   2023-08-10 11:13:44.000000      N/A
** 8116 788     svchost.exe     0x9e8b8cc6e240  10      -       0       False   2023-08-10 11:14:11.000000      N/A
** 1980 788     svchost.exe     0x9e8b89fbc240  3       -       0       False   2023-08-10 11:13:43.000000      N/A
** 1472 788     svchost.exe     0x9e8b89d3e1c0  7       -       0       False   2023-08-10 11:13:43.000000      N/A
** 10176        788     SgrmBroker.exe  0x9e8b911e5080  7       -       0       False   2023-08-10 11:15:45.000000      N/A
** 1988 788     svchost.exe     0x9e8b89fc1280  6       -       0       False   2023-08-10 11:13:43.000000      N/A
** 1996 788     svchost.exe     0x9e8b89fc4080  6       -       0       False   2023-08-10 11:13:43.000000      N/A
** 1500 788     svchost.exe     0x9e8b89d412c0  10      -       0       False   2023-08-10 11:13:43.000000      N/A
** 8680 788     SearchIndexer.  0x9e8b9010c240  15      -       0       False   2023-08-10 11:14:15.000000      N/A
*** 9784        8680    SearchFilterHo  0x9e8b92fda080  4       -       0       False   2023-08-10 11:31:32.000000      N/A
*** 8428        8680    SearchProtocol  0x9e8b8b742080  7       -       0       False   2023-08-10 11:29:25.000000      N/A
** 6136 788     svchost.exe     0x9e8b8b34a080  11      -       0       False   2023-08-10 11:13:53.000000      N/A
** 5628 788     svchost.exe     0x9e8b8b77e080  4       -       0       False   2023-08-10 11:13:53.000000      N/A
744     636     winlogon.exe    0x9e8b89441080  4       -       1       False   2023-08-10 11:13:42.000000      N/A
* 1048  744     dwm.exe 0x9e8b89c520c0  14      -       1       False   2023-08-10 11:13:43.000000      N/A
* 7400  744     userinit.exe    0x9e8b8c608340  0       -       1       False   2023-08-10 11:14:07.000000      2023-08-10 11:14:34.000000
** 7436 7400    explorer.exe    0x9e8b8c4d2080  75      -       1       False   2023-08-10 11:14:07.000000      N/A
*** 5864        7436    WinRAR.exe      0x9e8b92bdb0c0  5       -       1       False   2023-08-10 11:20:21.000000      N/A
**** 1576       5864    msedgewebview2  0x9e8b8b4cc080  47      -       1       False   2023-08-10 11:20:21.000000      N/A
***** 6084      1576    msedgewebview2  0x9e8b8b0f1080  19      -       1       False   2023-08-10 11:20:25.000000      N/A
***** 2728      1576    msedgewebview2  0x9e8b8cf97080  7       -       1       False   2023-08-10 11:20:21.000000      N/A
***** 2284      1576    msedgewebview2  0x9e8b8b8dc080  14      -       1       False   2023-08-10 11:20:25.000000      N/A
***** 1552      1576    msedgewebview2  0x9e8b8aa85080  8       -       1       False   2023-08-10 11:20:25.000000      N/A
***** 1616      1576    msedgewebview2  0x9e8b8a74f080  22      -       1       False   2023-08-10 11:20:25.000000      N/A
*** 936 7436    svchost.exe     0x9e8b8cd89080  0       -       1       False   2023-08-10 11:22:31.000000      2023-08-10 11:27:51.000000
**** 8260       936     cmd.exe 0x9e8b8afda300  2       -       1       False   2023-08-10 11:27:15.000000      N/A
***** 1668      8260    conhost.exe     0x9e8b92c65300  3       -       1       False   2023-08-10 11:27:15.000000      N/A
*** 9580        7436    SecurityHealth  0x9e8b90135340  1       -       1       False   2023-08-10 11:14:25.000000      N/A
*** 9712        7436    vmtoolsd.exe    0x9e8b8cbd5080  9       -       1       False   2023-08-10 11:14:26.000000      N/A
*** 2776        7436    RamCapture64.e  0x9e8b8aa66080  5       -       1       False   2023-08-10 11:31:52.000000      N/A
**** 9816       2776    conhost.exe     0x9e8b91cda080  6       -       1       False   2023-08-10 11:31:52.000000      N/A
*** 6812        7436    svchost.exe     0x9e8b87762080  3       -       1       False   2023-08-10 11:30:03.000000      N/A
**** 4364       6812    cmd.exe 0x9e8b8b6ef080  1       -       1       False   2023-08-10 11:30:57.000000      N/A
***** 9204      4364    conhost.exe     0x9e8b89ec7080  3       -       1       False   2023-08-10 11:30:57.000000      N/A
* 956   744     fontdrvhost.ex  0x9e8b89530180  5       -       1       False   2023-08-10 11:13:43.000000      N/A
10044   9952    OneDrive.exe    0x9e8b90507080  0       -       1       True    2023-08-10 11:15:31.000000      2023-08-10 11:15:37.000000
```

从中可以定位到

```plaintext
*** 6812        7436    svchost.exe     0x9e8b87762080  3       -       1       False   2023-08-10 11:30:03.000000      N/A
**** 4364       6812    cmd.exe 0x9e8b8b6ef080  1       -       1       False   2023-08-10 11:30:57.000000      N/A
```

```plaintext title="Answer"
4364
```

## Task 3

> 逆向工程团队需要恶意文件样本进行分析。您的 SOC 经理指示您查找文件的哈希，然后将样本转发给逆向工程团队。恶意文件的 md5 哈希是什么？

在上文中，我们已经找到了恶意文件的绝对路径

```plaintext
C:\Users\simon.stark\Downloads\svchost.exe
```

对文件的内存地址进行定位

```shell title='python2 volatility-master/vol.py -f 20230810.mem --profile=Win10x64_19041 filescan | grep"Downloads"| grep"svchost.exe"'
Volatility Foundation Volatility Framework 2.6.1
0x00009e8b909045d0      1      0 R--r-d \Device\HarddiskVolume3\Users\simon.stark\Downloads\svchost.exe
0x00009e8b91ec0140     12      0 R--r-d \Device\HarddiskVolume3\Users\simon.stark\Downloads\svchost.exe
```

```shell title='vol -f 20230810.mem windows.filescan | grep"Downloads"| grep"svchost.exe"'
0x9e8b909045d0.0\Users\simon.stark\Downloads\svchost.exe        216
0x9e8b91ec0140  \Users\simon.stark\Downloads\svchost.exe        216
```

将文件提取出来

```shell title='vol -f 20230810.mem windows.dumpfiles --virtaddr 0x9e8b91ec0140'
Volatility 3 Framework 2.5.0
Progress:  100.00               PDB scanning finished
Cache   FileObject      FileName        Result

DataSectionObject       0x9e8b91ec0140  svchost.exe     Error dumping file
ImageSectionObject      0x9e8b91ec0140  svchost.exe     file.0x9e8b91ec0140.0x9e8b957f24c0.ImageSectionObject.svchost.exe.img
```

计算提取出来文件的哈希

```shell
$ md5sum file.0x9e8b91ec0140.0x9e8b957f24c0.ImageSectionObject.svchost.exe.img
5bd547c6f5bfc4858fe62c8867acfbb5  file.0x9e8b91ec0140.0x9e8b957f24c0.ImageSectionObject.svchost.exe.img
```

```plaintext title="Answer"
5bd547c6f5bfc4858fe62c8867acfbb5
```

## Task 4

> 为了找出事件的范围，SOC 经理已部署了一个威胁搜寻团队，在整个环境中搜寻任何妥协指标。如果您能够确认 C2 IP 地址和端口，将对该团队大有帮助，以便我们的团队能够在搜寻中利用这些信息。

```shell title='vol -f 20230810.mem windows.netstat'
Volatility 3 Framework 2.5.0
Progress:  100.00               PDB scanning finished
Offset  Proto   LocalAddr       LocalPort       ForeignAddr     ForeignPort     State   PID     Owner   Created

0x9e8b90fe82a0  TCPv4   172.17.79.131   64263   20.54.24.148    443     ESTABLISHED     6136    svchost.exe     2023-08-10 11:31:18.000000
0x9e8b8aedeab0  TCPv4   172.17.79.131   64239   192.229.221.95  80      CLOSE_WAIT      8224    SearchApp.exe   2023-08-10 11:28:48.000000
0x9e8b8cb58010  TCPv4   172.17.79.131   64254   13.127.155.166  8888    ESTABLISHED     6812    svchost.exe     2023-08-10 11:30:03.000000
0x9e8b905ed260  TCPv4   172.17.79.131   64217   23.215.7.17     443     CLOSE_WAIT      8224    SearchApp.exe   2023-08-10 11:28:45.000000
0x9e8b9045f8a0  TCPv4   172.17.79.131   63823   20.198.119.84   443     ESTABLISHED     3404    svchost.exe     2023-08-10 11:14:21.000000
0x9e8b8cee4010  TCPv4   172.17.79.131   64237   13.107.213.254  443     CLOSE_WAIT      8224    SearchApp.exe   2023-08-10 11:28:47.000000
0x9e8b8b2e4a20  TCPv4   172.17.79.131   64218   20.198.118.190  443     ESTABLISHED     3404    svchost.exe     2023-08-10 11:28:45.000000
0x9e8b893f79f0  TCPv4   0.0.0.0 135     0.0.0.0 0       LISTENING       512     svchost.exe     2023-08-10 11:13:43.000000
0x9e8b893f79f0  TCPv6   ::      135     ::      0       LISTENING       512     svchost.exe     2023-08-10 11:13:43.000000
0x9e8b893f7cb0  TCPv4   0.0.0.0 135     0.0.0.0 0       LISTENING       512     svchost.exe     2023-08-10 11:13:43.000000
0x9e8b8a7d1ce0  TCPv4   172.17.79.131   139     0.0.0.0 0       LISTENING       4       System  2023-08-10 11:13:45.000000
0x9e8b8a7d1080  TCPv4   0.0.0.0 445     0.0.0.0 0       LISTENING       4       System  2023-08-10 11:13:45.000000
0x9e8b8a7d1080  TCPv6   ::      445     ::      0       LISTENING       4       System  2023-08-10 11:13:45.000000
0x9e8b893f75d0  TCPv4   0.0.0.0 3389    0.0.0.0 0       LISTENING       1148    svchost.exe     2023-08-10 11:13:44.000000
0x9e8b893f75d0  TCPv6   ::      3389    ::      0       LISTENING       1148    svchost.exe     2023-08-10 11:13:44.000000
0x9e8b893f8910  TCPv4   0.0.0.0 3389    0.0.0.0 0       LISTENING       1148    svchost.exe     2023-08-10 11:13:44.000000
0x9e8b8a7d3b20  TCPv4   0.0.0.0 5357    0.0.0.0 0       LISTENING       4       System  2023-08-10 11:13:46.000000
0x9e8b8a7d3b20  TCPv6   ::      5357    ::      0       LISTENING       4       System  2023-08-10 11:13:46.000000
0x9e8b8a7d3700  TCPv4   0.0.0.0 7680    0.0.0.0 0       LISTENING       6136    svchost.exe     2023-08-10 11:13:53.000000
0x9e8b8a7d3700  TCPv6   ::      7680    ::      0       LISTENING       6136    svchost.exe     2023-08-10 11:13:53.000000
0x9e8b893f71b0  TCPv4   0.0.0.0 49664   0.0.0.0 0       LISTENING       808     lsass.exe       2023-08-10 11:13:43.000000
0x9e8b893f71b0  TCPv6   ::      49664   ::      0       LISTENING       808     lsass.exe       2023-08-10 11:13:43.000000
0x9e8b893f8d30  TCPv4   0.0.0.0 49664   0.0.0.0 0       LISTENING       808     lsass.exe       2023-08-10 11:13:43.000000
0x9e8b8853ae90  TCPv4   0.0.0.0 49665   0.0.0.0 0       LISTENING       656     wininit.exe     2023-08-10 11:13:43.000000
0x9e8b8853ae90  TCPv6   ::      49665   ::      0       LISTENING       656     wininit.exe     2023-08-10 11:13:43.000000
0x9e8b893f7890  TCPv4   0.0.0.0 49665   0.0.0.0 0       LISTENING       656     wininit.exe     2023-08-10 11:13:43.000000
0x9e8b893f8650  TCPv4   0.0.0.0 49666   0.0.0.0 0       LISTENING       1472    svchost.exe     2023-08-10 11:13:43.000000
0x9e8b893f8650  TCPv6   ::      49666   ::      0       LISTENING       1472    svchost.exe     2023-08-10 11:13:43.000000
0x9e8b893f87b0  TCPv4   0.0.0.0 49666   0.0.0.0 0       LISTENING       1472    svchost.exe     2023-08-10 11:13:43.000000
0x9e8b893f7e10  TCPv4   0.0.0.0 49667   0.0.0.0 0       LISTENING       1580    svchost.exe     2023-08-10 11:13:44.000000
0x9e8b893f7e10  TCPv6   ::      49667   ::      0       LISTENING       1580    svchost.exe     2023-08-10 11:13:44.000000
0x9e8b893f7470  TCPv4   0.0.0.0 49667   0.0.0.0 0       LISTENING       1580    svchost.exe     2023-08-10 11:13:44.000000
0x9e8b893f8a70  TCPv4   0.0.0.0 49668   0.0.0.0 0       LISTENING       2936    svchost.exe     2023-08-10 11:13:44.000000
0x9e8b893f8a70  TCPv6   ::      49668   ::      0       LISTENING       2936    svchost.exe     2023-08-10 11:13:44.000000
0x9e8b893f84f0  TCPv4   0.0.0.0 49668   0.0.0.0 0       LISTENING       2936    svchost.exe     2023-08-10 11:13:44.000000
0x9e8b893f8230  TCPv4   0.0.0.0 49669   0.0.0.0 0       LISTENING       3204    spoolsv.exe     2023-08-10 11:13:44.000000
0x9e8b893f8230  TCPv6   ::      49669   ::      0       LISTENING       3204    spoolsv.exe     2023-08-10 11:13:44.000000
0x9e8b893f80d0  TCPv4   0.0.0.0 49669   0.0.0.0 0       LISTENING       3204    spoolsv.exe     2023-08-10 11:13:44.000000
0x9e8b893f7730  TCPv4   0.0.0.0 49670   0.0.0.0 0       LISTENING       808     lsass.exe       2023-08-10 11:13:44.000000
0x9e8b893f7730  TCPv6   ::      49670   ::      0       LISTENING       808     lsass.exe       2023-08-10 11:13:44.000000
0x9e8b893f8390  TCPv4   0.0.0.0 49670   0.0.0.0 0       LISTENING       808     lsass.exe       2023-08-10 11:13:44.000000
0x9e8b87676cb0  TCPv4   0.0.0.0 49671   0.0.0.0 0       LISTENING       788     services.exe    2023-08-10 11:13:44.000000
0x9e8b87676cb0  TCPv6   ::      49671   ::      0       LISTENING       788     services.exe    2023-08-10 11:13:44.000000
0x9e8b876769f0  TCPv4   0.0.0.0 49671   0.0.0.0 0       LISTENING       788     services.exe    2023-08-10 11:13:44.000000
0x9e8b8afb3e20  UDPv4   0.0.0.0 123     *       0               1280    svchost.exe     2023-08-10 11:13:57.000000
0x9e8b8afb3e20  UDPv6   ::      123     *       0               1280    svchost.exe     2023-08-10 11:13:57.000000
0x9e8b8afba540  UDPv4   0.0.0.0 123     *       0               1280    svchost.exe     2023-08-10 11:13:57.000000
0x9e8b8a926060  UDPv4   172.17.79.131   137     *       0               4       System  2023-08-10 11:13:45.000000
0x9e8b8a923c70  UDPv4   172.17.79.131   138     *       0               4       System  2023-08-10 11:13:45.000000
0x9e8b8af906f0  UDPv6   fe80::7994:1860:711:c243        1900    *       0               4308    svchost.exe     2023-08-10 11:13:46.000000
0x9e8b8af91370  UDPv6   ::1     1900    *       0               4308    svchost.exe     2023-08-10 11:13:46.000000
0x9e8b8af95b50  UDPv4   172.17.79.131   1900    *       0               4308    svchost.exe     2023-08-10 11:13:46.000000
0x9e8b8af95830  UDPv4   127.0.0.1       1900    *       0               4308    svchost.exe     2023-08-10 11:13:46.000000
0x9e8b8a0da6e0  UDPv4   0.0.0.0 3389    *       0               1148    svchost.exe     2023-08-10 11:13:44.000000
0x9e8b8a0da6e0  UDPv6   ::      3389    *       0               1148    svchost.exe     2023-08-10 11:13:44.000000
0x9e8b8a0db1d0  UDPv4   0.0.0.0 3389    *       0               1148    svchost.exe     2023-08-10 11:13:44.000000
0x9e8b8cb34150  UDPv4   0.0.0.0 3702    *       0               4876    svchost.exe     2023-08-10 11:28:45.000000
0x9e8b8cb34150  UDPv6   ::      3702    *       0               4876    svchost.exe     2023-08-10 11:28:45.000000
0x9e8b916733c0  UDPv4   0.0.0.0 3702    *       0               4876    svchost.exe     2023-08-10 11:28:45.000000
0x9e8b916733c0  UDPv6   ::      3702    *       0               4876    svchost.exe     2023-08-10 11:28:45.000000
0x9e8b88950710  UDPv4   0.0.0.0 3702    *       0               4876    svchost.exe     2023-08-10 11:28:45.000000
0x9e8b8a926e70  UDPv4   0.0.0.0 3702    *       0               4876    svchost.exe     2023-08-10 11:28:45.000000
0x9e8b8a94dc30  UDPv4   0.0.0.0 5353    *       0               1500    svchost.exe     2023-08-10 11:13:45.000000
0x9e8b8a94dc30  UDPv6   ::      5353    *       0               1500    svchost.exe     2023-08-10 11:13:45.000000
0x9e8b8a94bcf0  UDPv4   0.0.0.0 5353    *       0               1500    svchost.exe     2023-08-10 11:13:45.000000
0x9e8b912320a0  UDPv4   0.0.0.0 5355    *       0               1500    svchost.exe     2023-08-10 11:28:47.000000
0x9e8b912320a0  UDPv6   ::      5355    *       0               1500    svchost.exe     2023-08-10 11:28:47.000000
0x9e8b91231d80  UDPv4   0.0.0.0 5355    *       0               1500    svchost.exe     2023-08-10 11:28:47.000000
0x9e8b917a73f0  UDPv4   127.0.0.1       56532   *       0               8560    svchost.exe     2023-08-10 11:28:45.000000
0x9e8b8afc6d40  UDPv4   127.0.0.1       56962   *       0               808     lsass.exe       2023-08-10 11:14:01.000000
0x9e8b8b126390  UDPv4   127.0.0.1       57276   *       0               1756    svchost.exe     2023-08-10 11:28:45.000000
0x9e8b8a93fb30  UDPv6   fe80::7994:1860:711:c243        57398   *       0               4308    svchost.exe     2023-08-10 11:13:46.000000
0x9e8b8a9415c0  UDPv6   ::1     57399   *       0               4308    svchost.exe     2023-08-10 11:13:46.000000
0x9e8b8a9412a0  UDPv4   172.17.79.131   57400   *       0               4308    svchost.exe     2023-08-10 11:13:46.000000
0x9e8b8a940c60  UDPv4   127.0.0.1       57401   *       0               4308    svchost.exe     2023-08-10 11:13:46.000000
0x9e8b8b087a90  UDPv4   0.0.0.0 60211   *       0               4876    svchost.exe     2023-08-10 11:13:46.000000
0x9e8b8b08a4c0  UDPv4   0.0.0.0 60212   *       0               4876    svchost.exe     2023-08-10 11:13:46.000000
0x9e8b8b08a4c0  UDPv6   ::      60212   *       0               4876    svchost.exe     2023-08-10 11:13:46.000000
0x9e8b8a232050  UDPv4   127.0.0.1       60799   *       0               2476    svchost.exe     2023-08-10 11:13:44.000000
```

在其中定位到 `PID` 为 6812 的记录

```plaintext
0x9e8b8cb58010  TCPv4   172.17.79.131   64254   13.127.155.166  8888    ESTABLISHED     6812    svchost.exe     2023-08-10 11:30:03.000000
```

```plaintext title="Answer"
13.127.155.166:8888
```

## Task 5

> 我们需要一条时间线来帮助我们界定事件范围，并帮助更广泛的 DFIR 团队执行根本原因分析。您能确认进程执行和 C2 通道建立的时间吗？

上一题就有

```plaintext title="Answer"
10/08/2023 11:30:03
```

## Task 6

> 恶意进程的内存偏移量是多少？

```shell titlke='vol -f 20230810.mem windows.psscan'
......
6812    7436    svchost.exe     0x9e8b87762080  3       -       1       False   2023-08-10 11:30:03.000000      N/A     Disabled
```

```plaintext title="Answer"
0x9e8b87762080
```

## Task 7

> 您成功分析了一个内存转储，并得到了经理的表扬。第二天，您的经理要求您更新恶意文件的情况。您查看了 VirusTotal，发现该文件已被上传，可能是由逆向工程团队上传的。您的任务是确定样本首次提交到 VirusTotal 的时间。

定位到 `VirusTotal` 的这条提交记录 [VirusTotal - File - eaf09578d6eca82501aa2b3fcef473c3795ea365a9b33a252e5dc712c62981ea](https://www.virustotal.com/gui/file/eaf09578d6eca82501aa2b3fcef473c3795ea365a9b33a252e5dc712c62981ea)

得到以下时间戳信息

|      Title       |          Time           |
| :--------------: | :---------------------: |
|  Creation Time   | 2010-04-14 22:06:53 UTC |
| First Submission | 2023-08-10 11:58:10 UTC |
| Last Submission  | 2024-03-05 13:41:50 UTC |
|  Last Analysis   | 2023-12-14 13:39:27 UTC |

```plaintext title="Answer"
10/08/2023 11:58:10
```
