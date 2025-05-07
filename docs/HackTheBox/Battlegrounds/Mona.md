# Mona

```bash
Nmap scan report for 10.10.110.102
Host is up (0.25s latency).
Not shown: 65523 closed tcp ports (reset)
PORT      STATE SERVICE    VERSION
21/tcp    open  ftp        ProFTPD
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_drwxr-xr-x  13 1001     root         4096 May 25  2020 TeamCity
22/tcp    open  ssh        OpenSSH 8.2p1 Ubuntu 4ubuntu0.1 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 b5:27:ac:f0:43:8a:ee:eb:ec:38:c2:2a:a5:f9:4d:c3 (RSA)
|   256 f8:14:15:ba:88:7c:97:e1:8e:35:b9:44:c2:bd:bb:9a (ECDSA)
|_  256 c3:4a:00:b5:c6:f8:52:22:8d:79:18:2c:f9:6d:b7:43 (ED25519)
111/tcp   open  rpcbind    2-4 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  3,4          111/tcp6  rpcbind
|   100000  3,4          111/udp6  rpcbind
|   100003  3           2049/udp   nfs
|   100003  3           2049/udp6  nfs
|   100003  3,4         2049/tcp   nfs
|   100003  3,4         2049/tcp6  nfs
|   100005  1,2,3      36871/udp   mountd
|   100005  1,2,3      39271/tcp   mountd
|   100005  1,2,3      46641/udp6  mountd
|   100005  1,2,3      60385/tcp6  mountd
|   100021  1,3,4      35996/udp6  nlockmgr
|   100021  1,3,4      36963/udp   nlockmgr
|   100021  1,3,4      37443/tcp   nlockmgr
|   100021  1,3,4      40711/tcp6  nlockmgr
|   100227  3           2049/tcp   nfs_acl
|   100227  3           2049/tcp6  nfs_acl
|   100227  3           2049/udp   nfs_acl
|_  100227  3           2049/udp6  nfs_acl
2049/tcp  open  nfs        3-4 (RPC #100003)
8111/tcp  open  http       Apache Tomcat (language: en)
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-favicon: Unknown favicon MD5: CEE18E28257988B40028043E65A6C2A3
| http-title: Log in to TeamCity &mdash; TeamCity
|_Requested resource was /login.html
9090/tcp  open  tcpwrapped
34171/tcp open  java-rmi   Java RMI
37443/tcp open  nlockmgr   1-4 (RPC #100021)
38975/tcp open  tcpwrapped
39271/tcp open  mountd     1-3 (RPC #100005)
45563/tcp open  mountd     1-3 (RPC #100005)
51621/tcp open  mountd     1-3 (RPC #100005)
Device type: general purpose
Running: Linux 4.X|5.X
OS CPE: cpe:/o:linux:linux_kernel:4 cpe:/o:linux:linux_kernel:5
OS details: Linux 4.15 - 5.19
Uptime guess: 26.475 days (since Fri Apr 11 04:56:20 2025)
Network Distance: 2 hops
TCP Sequence Prediction: Difficulty=262 (Good luck!)
IP ID Sequence Generation: All zeros
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE (using port 110/tcp)
HOP RTT       ADDRESS
1   252.45 ms 10.10.14.1
2   252.44 ms 10.10.110.102

NSE: Script Post-scanning.
Initiating NSE at 16:20
Completed NSE at 16:20, 0.00s elapsed
Initiating NSE at 16:20
Completed NSE at 16:20, 0.00s elapsed
Initiating NSE at 16:20
Completed NSE at 16:20, 0.00s elapsed
Read data files from: /usr/share/nmap
OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 50.87 seconds
           Raw packets sent: 71301 (3.138MB) | Rcvd: 71076 (3.026MB)



start infoscan
10.10.110.102:9090 open
10.10.110.102:22 open
10.10.110.102:21 open
[*] alive ports len is: 3
start vulscan
[+] ftp 10.10.110.102:21:anonymous 
   [->]TeamCity
```

## FTP anonymous

```bash
┌──(randark㉿kali)-[~]
└─$ ftp 10.10.110.102
Connected to 10.10.110.102.
220 ProFTPD Server (Debian) [::ffff:10.10.110.102]
Name (10.10.110.102:randark): anonymous
331 Anonymous login ok, send your complete email address as your password
Password: 
230 Anonymous access granted, restrictions apply
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls -lah
229 Entering Extended Passive Mode (|||2776|)
150 Opening ASCII mode data connection for file list
drwxr-xr-x   3 root     root         4.0k May 25  2020 .
drwxr-xr-x   3 root     root         4.0k May 25  2020 ..
drwxr-xr-x  13 1001     root         4.0k May 25  2020 TeamCity
226 Transfer complete
ftp> cd TeamCity
250 CWD command successful
ftp> ls -lah
229 Entering Extended Passive Mode (|||53314|)
150 Opening ASCII mode data connection for file list
drwxr-xr-x  13 1001     root         4.0k May 25  2020 .
drwxr-xr-x   3 root     root         4.0k May 25  2020 ..
drwxr-xr-x   2 1001     1001         4.0k May 25  2020 bin
-rwxr-xr-x   1 1001     1001            0 May 16  2020 BUILD_78475
drwxr-xr-x  13 1001     1001         4.0k May  7 08:11 buildAgent
drwxr-xr-x   6 1001     1001         4.0k May  7 08:11 .BuildServer
drwxr-xr-x   3 1001     1001         4.0k May  7 08:11 conf
drwxr-xr-x   6 1001     1001         4.0k May 16  2020 devPackage
drwxr-xr-x   2 1001     1001         4.0k May 16  2020 lib
drwxr-xr-x   2 1001     1001         4.0k May 16  2020 licenses
drwxr-xr-x   2 1001     1001         4.0k May  7 08:11 logs
-rwxr-xr-x   1 1001     1001          343 May 16  2020 service.properties
-rwxr-xr-x   1 1001     1001          414 May 16  2020 TeamCity-readme.txt
drwxr-xr-x   6 1001     1001         4.0k May  7 08:13 temp
-rwxr-xr-x   1 1001     1001        16.3k May 16  2020 Tomcat-running.txt
drwxr-xr-x   3 1001     1001         4.0k May 16  2020 webapps
drwxr-xr-x   3 1001     1001         4.0k May 25  2020 work
226 Transfer complete
```
