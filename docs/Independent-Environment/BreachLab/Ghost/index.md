# Ghost

## 00 First Contact

```plaintext
[ Level 0 → 1 ]  First Contact
 ─────────────────────────────────────────────

 The previous analyst left in a hurry.
 His terminal is still open. His files — still here.
 Find what he left behind.

 Goal:    Retrieve the password for ghost1
 Connect: ssh ghost1@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man1/ls.1.html
   https://man7.org/linux/man-pages/man1/cat.1.html
   https://man7.org/linux/man-pages/man1/cd.1.html
```

```markdown title="README"
ANALYST WORKSTATION — KAEL
Last active: 2026-03-28 02:47 UTC
Status: Abandoned

If you're reading this, you found my terminal.
I left in a hurry. Didn't have time to clean up.

Nothing in this shell is hidden. It's just here.
If you can't see it, you're not looking hard enough.

Don't leave traces.

— KAEL
```

在当前用户目录中进行探测，发现文件夹`~/workspace`

```plaintext title="notes.txt"
OPERATIONAL NOTES — KAEL
========================
Target: internal network segment 10.4.x.x
Method: passive recon, no active scanning
Status: ongoing

Credentials filed separately in archive/.
Do not store passwords in plaintext notes.
```

并看到

```shell
ghost0@breachlab:~/workspace/archive$ ls -laih
total 24K
1426005 drwxr-x--- 1 ghost0 ghost0 4.0K Apr 20 11:50 .
1426004 drwxr-x--- 1 ghost0 ghost0 4.0K Apr 20 11:50 ..
1426007 -rw-r----- 1 ghost0 ghost0   15 Apr 20 11:50 credentials
ghost0@breachlab:~/workspace/archive$ cat credentials 
**hidden**
```

## 01 Name Game

```plaintext
 [ Level 1 → 2 ]  Name Game
 ─────────────────────────────────────────────

 KAEL was paranoid. He named his files
 in ways that make the shell fight you.
 Read the MANIFEST. Then figure out how.

 Goal:    Retrieve the password for ghost2
 Connect: ssh ghost2@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man1/cat.1.html
   https://www.gnu.org/software/bash/manual/bash.html#Quoting
   https://ss64.com/bash/syntax-quoting.html
```

注意到当前目录确实存在有很多畸形文件名的文件

```shell
ghost1@breachlab:~$ ls -laih
total 72K
1426028 -rw-r----- 1 ghost1 ghost1   13 Apr 20 11:50  -
1426031 -rw-r----- 1 ghost1 ghost1   13 Apr 20 11:50  --help
1430189 drwx------ 1 ghost1 ghost1 4.0K Apr 20 13:19  .
1430187 drwxr-xr-x 1 root   root   4.0K Apr 20 11:50  ..
1426030 -rw-r----- 1 ghost1 ghost1   13 Apr 20 11:50  ...
1425709 -rw-r--r-- 1 ghost1 ghost1  220 Jan  6  2022  .bash_logout
1425710 -rw-r--r-- 1 ghost1 ghost1 3.7K Jan  6  2022  .bashrc
1417505 drwx------ 2 ghost1 ghost1 4.0K Apr 20 13:19  .cache
1425704 -rw-r--r-- 1 ghost1 ghost1  807 Jan  6  2022  .profile
1426032 -rw-r----- 1 ghost1 ghost1  228 Apr 17 09:30  MANIFEST
1426029 -rw-r----- 1 ghost1 ghost1   15 Apr 20 11:50 'file name'
```

尝试读取这些文件的内容

```shell
ghost1@breachlab:~$ cat ./-
a1e7c9d4f2b8
ghost1@breachlab:~$ cat ./--help 
9c02b47fa6d1
ghost1@breachlab:~$ cat ./... 
e3fa20b81f4c
ghost1@breachlab:~$ cat MANIFEST 
NOTES — KAEL
────────────
I named my files to watch careless analysts
give up before they even read them.

Most people who poke around this directory
will quit before they open the first one.

— KAEL
ghost1@breachlab:~$ cat file\ name 
**hidden**
```

## 02 In The Shadows

```plaintext
 [ Level 2 → 3 ]  In The Shadows
 ─────────────────────────────────────────────

 KAEL compartmentalized everything.
 The investigation folder has reports — but not what you need.
 He kept active leads somewhere else. Somewhere less obvious.

 Goal:    Retrieve the password for ghost3
 Connect: ssh ghost3@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man1/ls.1.html
   https://man7.org/linux/man-pages/man1/find.1.html
```

探测环境

```shell
ghost2@breachlab:~$ ls -laih
total 48K
1430197 drwx------ 1 ghost2 ghost2 4.0K Apr 20 13:35 .
1430187 drwxr-xr-x 1 root   root   4.0K Apr 20 11:50 ..
1425773 -rw-r--r-- 1 ghost2 ghost2  220 Jan  6  2022 .bash_logout
1425774 -rw-r--r-- 1 ghost2 ghost2 3.7K Jan  6  2022 .bashrc
1430783 drwx------ 2 ghost2 ghost2 4.0K Apr 20 13:35 .cache
1426049 -rw-r----- 1 ghost2 ghost2  153 Apr 20 11:50 .memo
1425772 -rw-r--r-- 1 ghost2 ghost2  807 Jan  6  2022 .profile
1426042 drwxr-x--- 1 ghost2 ghost2 4.0K Apr 20 11:50 investigation
ghost2@breachlab:~$ cat ./.memo 
NOTE TO SELF — KAEL

The work happens off the main paths.
Compartmentalization is the only real opsec.
If it's in plain sight, it's not worth finding.
```

继续深入

```shell
ghost2@breachlab:~$ cd investigation/
ghost2@breachlab:~/investigation$ ls -laih
total 40K
1426042 drwxr-x--- 1 ghost2 ghost2 4.0K Apr 20 11:50 .
1436041 drwx------ 1 ghost2 ghost2 4.0K Apr 20 14:01 ..
1426043 drwxr-x--- 1 ghost2 ghost2 4.0K Apr 20 11:50 .leads
1426044 -rw-r----- 1 ghost2 ghost2  201 Apr 20 11:50 report.txt
1426045 -rw-r----- 1 ghost2 ghost2  205 Apr 20 11:50 summary.txt
ghost2@breachlab:~/investigation$ cat report.txt 
INCIDENT REPORT — Q1 2026
Status: Classified
Prepared by: KAEL

Summary: Unauthorized access detected on segment C.
Response: Ongoing. Active leads compartmentalized.

Full details filed separately.
ghost2@breachlab:~/investigation$ cat summary.txt 
OPERATIONAL SUMMARY
===================
Operation: GHOST WATCH
Status: Active

All active source files have been compartmentalized
and moved to a separate location.

This document contains no credentials.
```

进一步深入

```shell
ghost2@breachlab:~/investigation/.leads$ ls -laih
total 40K
1426043 drwxr-x--- 1 ghost2 ghost2 4.0K Apr 20 11:50 .
1426042 drwxr-x--- 1 ghost2 ghost2 4.0K Apr 20 11:50 ..
1426046 -rw-r----- 1 ghost2 ghost2   13 Apr 20 11:50 .source_alpha
1426047 -rw-r----- 1 ghost2 ghost2   13 Apr 20 11:50 .source_beta
1426048 -rw-r----- 1 ghost2 ghost2   15 Apr 20 11:50 .source_omega
ghost2@breachlab:~/investigation/.leads$ cat ./.*
cat: ./.: Is a directory
cat: ./..: Is a directory
7a4e91c63d2f
bb50d8e4a11c
**hidden**
```

## 03 Access Denied

```plaintext
 [ Level 3 → 4 ]  Access Denied
 ─────────────────────────────────────────────

 KAEL structured his storage by access level.
 Not everything is readable by everyone.
 Know who you are. Know what you can reach.

 Goal:    Retrieve the password for ghost4
 Connect: ssh ghost4@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://linux.die.net/man/1/id
   https://man7.org/linux/man-pages/man1/find.1.html
   https://man7.org/linux/man-pages/man1/chmod.1.html
```

枚举一下

```shell
ghost3@breachlab:~$ cat map.txt 
KAEL'S STORAGE LAYOUT
=====================
Recovered from workstation. Partially redacted.

  /var/intel/public/   — world readable
  /var/intel/ops/      — restricted
  /var/intel/archive/  — root only

Access follows the group scheme. The kernel will
tell you what you are, if you ask it.

— KAEL
ghost3@breachlab:~$ ls -laih /var/intel/public/
total 16K
1969939 drwxr-xr-x 1 root root 4.0K Apr 20 22:13 .
1969938 drwxr-xr-x 1 root root 4.0K Apr 20 22:13 ..
1969940 -rw-r--r-- 1 root root  161 Apr 20 22:13 report_q1.txt
ghost3@breachlab:~$ ls -laih /var/intel/ops/
total 20K
1969941 drwxr-x--- 1 root analysts 4.0K Apr 20 22:13 .
1969938 drwxr-xr-x 1 root root     4.0K Apr 20 22:13 ..
1969943 ----r----- 1 root analysts   19 Apr 20 22:13 access_codes.dat
1969942 ----r----- 1 root analysts  103 Apr 20 22:13 operative_list.txt
ghost3@breachlab:~$ ls -laih /var/intel/archive/
ls: cannot open directory '/var/intel/archive/': Permission denied
ghost3@breachlab:~$ id
uid=1003(ghost3) gid=1003(ghost3) groups=1003(ghost3),1010(analysts)
ghost3@breachlab:~$ cat /var/intel/ops/access_codes.dat
**hidden**
```

## 04 Signal in the Noise

```plaintext
 KAEL dumped everything into the vault.
 Hundreds of log entries. One of them isn't like the others.
 The real signal has a different format. Find it.

 Goal:    Retrieve the password for ghost5
 Connect: ssh ghost5@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man1/grep.1.html
   https://ryanstutorials.net/linuxtutorial/piping.php
```

枚举一下

```shell
ghost4@breachlab:~$ ls -laih
total 68K
1974079 drwx------ 1 ghost4 ghost4 4.0K Apr 21 21:36 .
1974067 drwxr-xr-x 1 root   root   4.0K Apr 20 22:13 ..
1969683 -rw-r--r-- 1 ghost4 ghost4  220 Jan  6  2022 .bash_logout
1969684 -rw-r--r-- 1 ghost4 ghost4 3.7K Jan  6  2022 .bashrc
 177407 drwx------ 2 ghost4 ghost4 4.0K Apr 21 21:11 .cache
1969682 -rw-r--r-- 1 ghost4 ghost4  807 Jan  6  2022 .profile
 177409 drwx------ 2 ghost4 ghost4 4.0K Apr 21 21:36 .ssh
1969956 drwx------ 1 ghost4 ghost4  20K Apr 21 18:57 vault
ghost4@breachlab:~$ cd vault/
ghost4@breachlab:~/vault$ ls -laih
total 2.0M
1969956 drwx------ 1 ghost4 ghost4  20K Apr 21 18:57 .
1974079 drwx------ 1 ghost4 ghost4 4.0K Apr 21 21:36 ..
 176643 -rw-r--r-- 1 root   root     63 Apr 21 18:57 record_0001
 176644 -rw-r--r-- 1 root   root     63 Apr 21 18:57 record_0002
 176645 -rw-r--r-- 1 root   root     63 Apr 21 18:57 record_0003
```

简单

```shell
ghost4@breachlab:~/vault$ cat ./* | grep -v "STATUS"
[2026-03-28 02:47:13] password=yOq35HkPPR3V4cTs
[CLASSIFIED] CREDENTIAL: **hidden**
[2026-03-28 02:47:13] password=9xHdl9M5jaZpz8kW
[2026-03-28 02:47:13] password=IAZW6T90MJrOZwU6
[2026-03-28 02:47:13] password=Kq5jSlA8yLGW31hg
[2026-03-28 02:47:13] password=5OCqCi2Zuzinemd4
```

## 05 The Listener

```plaintext
 [ Level 5 → 6 ]  The Listener
 ─────────────────────────────────────────────

 KAEL stopped trusting files after the incident.
 He ran a service instead. Said if it's not on disk,
 it can't be found. He forgot about the ports.

 Goal:    Retrieve the password for ghost6
 Connect: ssh ghost6@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man1/nc.1.html
   https://man7.org/linux/man-pages/man1/nmap.1.html
```

先枚举一下

```shell
ghost5@breachlab:~$ cat /proc/net/tcp
  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode                                                     
   0: 00000000:7A6B 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 8118624 1 0000000000000000 100 0 0 10 0                   
   1: 0B00007F:B165 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 8115144 2 0000000000000000 100 0 0 10 0                   
   2: 00000000:7C2E 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 8117685 1 0000000000000000 100 0 0 10 0                   
   3: 00000000:0016 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 8118635 1 0000000000000000 100 0 0 10 0                   
   4: 00000000:A179 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 8117132 1 0000000000000000 100 0 0 10 0                   
   5: 00000000:7594 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 8116090 1 0000000000000000 100 0 0 10 0                   
   6: 00000000:7595 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 8117683 1 0000000000000000 100 0 0 10 0                   
   7: 00000000:7530 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 8117134 1 0000000000000000 100 0 0 10 0                   
   8: 00000000:7531 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 8116092 1 0000000000000000 100 0 0 10 0                   
   9: 00000000:7532 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 8117131 1 0000000000000000 100 0 0 10 0                   
  10: 020013AC:0016 A35AACA7:E8DC 01 00000000:00000000 02:000AFA4A 00000000     0        0 37798210 2 0000000000000000 63 4 30 10 -1                 
  11: 020013AC:0016 1FAC9767:72B6 01 00000054:00000000 01:00000029 00000000     0        0 34964221 4 0000000000000000 41 4 31 10 -1                 
  12: 020013AC:0016 F7E04D78:D0B8 01 00000000:00000000 02:000AFC40 00000000     0        0 37798216 3 0000000000000000 55 4 26 10 -1 
```

分别对应

- 7A6B - 31339 - None
- B165 - 45413
- 7C2E - 31790 - None
- 0016 - 22
- A179 - 41337
- 7594 - 30100
- 7595 - 30101
- 7530 - 30000
- 7531 - 30001
- 7532 - 30002
- ......

枚举一下就好

```shell
ghost5@breachlab:~$ nc 127.0.0.1 30100

  GHOST PROTOCOL — CHANNEL A
  ─────────────────────────────────────

  This channel is informational only.

  Authentication token: GHOST
  Secure channel: port 30101

  Send the token to receive your credential.


ghost5@breachlab:~$ nc 127.0.0.1 30101
AUTHENTICATE: GHOST

  Credential: **hidden**
```

## 06 Ghost in the Machine

```plaintext
 [ Level 6 → 7 ]  Ghost in the Machine
 ─────────────────────────────────────────────

 After the breach, KAEL stopped writing secrets
 to disk. He told himself the shell would forget
 them. It doesn't.

 Goal:    Retrieve the password for ghost7
 Connect: ssh ghost7@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man1/env.1.html
   https://man7.org/linux/man-pages/man1/base64.1.html
   https://12factor.net/config
```

简单

```shell
ghost6@breachlab:~$ env | grep API_DIGEST
API_DIGEST=M252X0wzNGtzXzN2M3J5dGgxbmc=
ghost6@breachlab:~$ echo M252X0wzNGtzXzN2M3J5dGgxbmc= | base64 -d
**hidden**
```

## 07 Lost in Translation

```plaintext
 [ Level 7 → 8 ]  Lost in Translation
 ─────────────────────────────────────────────

 KAEL said one layer was never enough.
 Nothing he sent was ever just one thing.
 The transmission file isn't what it looks like.

 Goal:    Retrieve the password for ghost8
 Connect: ssh ghost8@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man1/xxd.1.html
   https://man7.org/linux/man-pages/man1/base64.1.html
```

简单

```shell
ghost7@breachlab:~$ cat transmission.dat
00000000: 5244 4e6a 4d47 517a 587a 4279 5830 5178  RDNjMGQzXzByX0Qx
00000010: 4d77 3d3d 0a                             Mw==.
ghost7@breachlab:~$ echo RDNjMGQzXzByX0QxMw== | base64 -d
**hidden**
```

## 08 Something's Running

```plaintext
 [ Level 8 → 9 ]  Something's Running
 ─────────────────────────────────────────────

 He cleaned the files. Wiped the logs.
 Removed every argument from his processes.
 But /proc remembers what the shell forgets.

 Goal:    Retrieve the password for ghost9
 Connect: ssh ghost9@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man1/ps.1.html
   https://man7.org/linux/man-pages/man5/proc.5.html
```

枚举一下

```shell
ghost8@breachlab:~$ ps aux | grep ghost8
root        2029  0.0  0.0   7040  4240 ?        S    Apr21   0:00 runuser -u ghost8 -p -- python3 /usr/local/bin/level8-daemon.py
root        2030  0.0  0.0   7040  4240 ?        S    Apr21   0:00 runuser -u ghost8 -- python3 /usr/local/bin/level8-daemon.py
ghost8      2039  0.0  0.1  13544  7980 ?        S    Apr21   0:00 python3 /usr/local/bin/level8-daemon.py
ghost8      2042  0.0  0.1  13544  8032 ?        S    Apr21   0:00 python3 /usr/local/bin/level8-daemon.py
root      108664  0.0  0.1  16896 11056 ?        Ss   08:12   0:00 sshd: ghost8 [priv]
ghost8    108676  0.0  0.1  17168  8152 ?        S    08:12   0:00 sshd: ghost8@pts/0
ghost8    108677  0.0  0.0   4628  3952 pts/0    Ss   08:12   0:00 -bash
ghost8    108779  0.0  0.0   7064  3088 pts/0    R+   08:15   0:00 ps aux
ghost8    108780  0.0  0.0   3472  1816 pts/0    S+   08:15   0:00 grep --color=auto ghost8
```

简单

```shell
ghost8@breachlab:~$ cat /proc/2039/environ 
ANALYST_KEY=**hidden**HOSTNAME=breachlabPWD=/HOME=/rootSHLVL=0PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/binDEBIAN_FRONTEND=noninteractive_=/usr/sbin/runuser
```

## 09 Noise Floor

```plaintext
 [ Level 9 → 10 ]  Noise Floor
 ─────────────────────────────────────────────

 Twelve kilobytes of random noise with one
 broadcast buried inside. Don't open it by eye —
 that's not what binaries are for.

 Goal:    Retrieve the password for ghost10
 Connect: ssh ghost10@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man1/strings.1.html
   https://man7.org/linux/man-pages/man1/file.1.html
   https://man7.org/linux/man-pages/man1/grep.1.html
```

简单

```shell
ghost9@breachlab:~$ strings signal.bin | grep -E "[A-Za-z0-9]{5,}"
vwkFU
}BeQkb
== **hidden** ==
```

## 10 Binary Strings

```plaintext
 [ Level 10 → 11 ]  Binary Strings
 ─────────────────────────────────────────────

 A dump of passwords. Every line appears twice —
 except one. Find the one that's on its own,
 without reading the file by eye.

 Goal:    Retrieve the password for ghost11
 Connect: ssh ghost11@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man1/sort.1.html
   https://man7.org/linux/man-pages/man1/uniq.1.html
```

简单

```shell
ghost10@breachlab:~$ cat data.txt | grep -v "line"
**hidden**
```

## 11 Wrapped Three Deep

```plaintext
 [ Level 11 → 12 ]  Wrapped Three Deep
 ─────────────────────────────────────────────

 KAEL nested his payload three layers deep.
 Each layer is a different compression format.
 Identify first, unpack second. Keep going.

 Goal:    Retrieve the password for ghost12
 Connect: ssh ghost12@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man1/file.1.html
   https://man7.org/linux/man-pages/man1/tar.1.html
   https://man7.org/linux/man-pages/man1/gzip.1.html
   https://man7.org/linux/man-pages/man1/bzip2.1.html
```

已经有人处理好了

```shell
ghost11@breachlab:~$ ls -laih
total 68K
1974086 drwx------ 1 ghost11 ghost11 4.0K Apr 21 23:34 .
1974067 drwxr-xr-x 1 root    root    4.0K Apr 20 22:13 ..
1970099 -rw-r--r-- 1 ghost11 ghost11  220 Jan  6  2022 .bash_logout
1971512 -rw-r--r-- 1 ghost11 ghost11 3.7K Jan  6  2022 .bashrc
 136436 drwx------ 2 ghost11 ghost11 4.0K Apr 21 23:30 .cache
1970092 -rw-r--r-- 1 ghost11 ghost11  807 Jan  6  2022 .profile
 136457 drwx------ 2 ghost11 ghost11 4.0K Apr 21 23:34 .ssh
 136456 -rw-r--r-- 1 ghost11 ghost11   16 Apr 20 22:13 core.txt
1973697 -rw-r----- 1 ghost11 ghost11  10K Apr 20 22:13 data.wrapped
ghost11@breachlab:~$ cat core.txt 
**hidden**
```

## 12 Key Not Password

```plaintext
 [ Level 12 → 13 ]  Key Not Password
 ─────────────────────────────────────────────

 There is no password for the next level.
 There's a private key instead. Learn what SSH
 key authentication actually is — and use it.

 Goal:    Log in as ghost13 using the key
 Connect: ssh -i <key> ghost13@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://man.openbsd.org/ssh
   https://man.openbsd.org/ssh-keygen
   https://www.ssh.com/academy/ssh/public-key-authentication
```

简单

```shell
ghost12@breachlab:~$ ssh ghost13@127.0.0.1 -i sshkey.private
......
ghost13@breachlab:~$ cat flag 
**hidden**
```

## 13 Port 30000

```plaintext
 [ Level 13 → 14 ]  Port 30000
 ─────────────────────────────────────────────

 A service on port 30000 will trade the next
 password for the current one. Hand-craft the
 conversation. No browser. No client library.

 Goal:    Retrieve the password for ghost14
 Connect: ssh ghost14@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://man.openbsd.org/nc
   https://man7.org/linux/man-pages/man1/curl.1.html
```

简单

```shell
ghost13@breachlab:~$ nc 127.0.0.1 30000
GET /
Wrong. Send the current level's password.

ghost13@breachlab:~$ nc 127.0.0.1 30000
**hidden**
Correct! Next password: **hidden**
```

## 14 TLS, Not Plaintext

```plaintext
 [ Level 14 → 15 ]  TLS, Not Plaintext
 ─────────────────────────────────────────────

 Same idea as the last level — but the service
 now speaks TLS. Plain netcat will not work.
 Find a CLI that speaks TLS, and greet it right.

 Goal:    Retrieve the password for ghost15
 Connect: ssh ghost15@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://man.openbsd.org/openssl
   https://www.openssl.org/docs/man3.0/man1/openssl-s_client.html
```

上面我们已经探测过端口信息了，这一次只需要枚举即可

```shell
ghost14@breachlab:~$ openssl s_client -quiet -connect 127.0.0.1:30001
Can't use SSL_get_servername
depth=0 CN = ghost-internal
verify error:num=18:self-signed certificate
verify return:1
depth=0 CN = ghost-internal
verify return:1
Send the current level password:
**hidden**
Correct! Next password: **hidden**
40078958B87A0000:error:0A000126:SSL routines:ssl3_read_n:unexpected eof while reading:../ssl/record/rec_layer_s3.c:317:
```

## 15 Port Range

```plaintext
 [ Level 15 → 16 ]  Port Range
 ─────────────────────────────────────────────

 One port in a range speaks TLS.
 The rest are closed or silent.
 Find the one that will greet you back.

 Goal:    Retrieve the password for ghost16
 Connect: ssh ghost16@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://nmap.org/book/man.html
   https://man.openbsd.org/nc
```

简单

```shell
ghost15@breachlab:~$ openssl s_client -quiet -connect 127.0.0.1:31790
Can't use SSL_get_servername
depth=0 CN = ghost-internal
verify error:num=18:self-signed certificate
verify return:1
depth=0 CN = ghost-internal
verify return:1
Send the current level password:
**hidden**
Correct! Next password: **hidden**
40678B284E710000:error:0A000126:SSL routines:ssl3_read_n:unexpected eof while reading:../ssl/record/rec_layer_s3.c:317:
```

## 16 Diff

```plaintext
 [ Level 16 → 17 ]  Diff
 ─────────────────────────────────────────────

 Two files. Almost identical. The password is
 the single line that differs. Don't read by eye —
 this is what diff was built for.

 Goal:    Retrieve the password for ghost17
 Connect: ssh ghost17@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man1/diff.1.html
   https://man7.org/linux/man-pages/man1/comm.1.html
```

简单

```shell
ghost16@breachlab:~$ ls -laih
total 64K
1974091 drwx------ 1 ghost16 ghost16 4.0K Apr 22 00:04 .
1974067 drwxr-xr-x 1 root    root    4.0K Apr 20 22:13 ..
1973498 -rw-r--r-- 1 ghost16 ghost16  220 Jan  6  2022 .bash_logout
1973499 -rw-r--r-- 1 ghost16 ghost16 3.7K Jan  6  2022 .bashrc
 137090 drwx------ 2 ghost16 ghost16 4.0K Apr 22 00:02 .cache
1973497 -rw-r--r-- 1 ghost16 ghost16  807 Jan  6  2022 .profile
 142627 drwx------ 2 ghost16 ghost16 4.0K Apr 22 00:04 .ssh
1973818 -rw-r----- 1 ghost16 ghost16 3.3K Apr 20 22:13 passwords.new
1973803 -rw-r----- 1 ghost16 ghost16 3.3K Apr 20 22:13 passwords.old
ghost16@breachlab:~$ diff passwords.old passwords.new
42c42
< entry_0042: a442f8df9ce99b76d97a
---
> entry_0042: **hidden**
```

## 17 No Shell For You

```plaintext
 [ Level 17 → 18 ]  No Shell For You
 ─────────────────────────────────────────────

 Log in and get kicked. The server runs a
 startup script that boots you on arrival.
 Read a file without ever getting an interactive shell.

 Goal:    Retrieve the password for ghost18
 Connect: ssh ghost18@204.168.229.209 -p 2222
```

简单

```shell
ghost16@breachlab:~$ ssh ghost17@127.0.0.1 'whoami && id && cat flag'
(ghost17@127.0.0.1) Password: **hidden**
ghost17
uid=1017(ghost17) gid=1018(ghost17) groups=1018(ghost17)
**hidden**
```

## 18 Wrong User

```plaintext
 [ Level 18 → 19 ]  Wrong User
 ─────────────────────────────────────────────

 There's a binary on this system that belongs
 to another user — but the permission bits on it
 mean something special. Read them. Use the tool.

 Goal:    Retrieve the password for ghost19
 Connect: ssh ghost19@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man1/ls.1.html
   https://en.wikipedia.org/wiki/Setuid
```

根据题目信息进行枚举

```shell
ghost18@breachlab:~$ find / -user ghost19 -perm -4000 -exec ls -ldb {} \; 2>/dev/null
-rwsr-x--- 1 ghost19 ghost18 819664 Apr 20 13:58 /usr/local/bin/ghost-reader
ghost18@breachlab:~$ /usr/local/bin/ghost-reader
**hidden**
```

## 19 Your First Script

```plaintext
 [ Level 19 → 20 ]  Your First Script
 ─────────────────────────────────────────────

 A service wants a password and a 4-digit PIN.
 Ten thousand possibilities. Stop typing them by hand —
 write code that types them for you.

 Goal:    Retrieve the password for ghost20
 Connect: ssh ghost20@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://www.gnu.org/software/bash/manual/bash.html#Looping-Constructs
   https://tldp.org/LDP/abs/html/loops1.html
   https://man.openbsd.org/nc
```

蹭一下别人的车

```shell
ghost19@breachlab:~$ cat fast_brute.sh 
#!/bin/bash
PASS="**hidden**"
PORT=30002
echo "[*] Brute-force optimizado..."
for i in $(seq -w 0 9999); do
    RESP=$(timeout 1 bash -c 'echo "'"$PASS"' $1" >&3; cat <&3' _ "$i" 3<>/dev/tcp/localhost/$PORT 2>/dev/null)
    if [[ -n "$RESP" && "$RESP" != *"Wrong"* ]]; then
        echo -e "\n[✅] PIN: $i | $RESP"; exit 0
    fi
    [[ $((10#$i % 1000)) -eq 0 ]] && echo -n "[*] $i/9999"$'\r'
done
echo -e "\n[❌] No encontrado."
ghost19@breachlab:~$ ./fast_brute.sh 
[*] Brute-force optimizado...
[*] 7000/9999
[✅] PIN: 7349 | Correct! Next password: **hidden**
```

## 20 Cron Discovery

```plaintext
 [ Level 20 → 21 ]  Cron Discovery
 ─────────────────────────────────────────────

 Something runs on a schedule as root. Find what.
 Find where it writes. Find what it reads.
 Scheduled tasks live in specific corners of /etc.

 Goal:    Retrieve the password for ghost21
 Connect: ssh ghost21@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man8/cron.8.html
   https://man7.org/linux/man-pages/man5/crontab.5.html
   https://linuxhandbook.com/cron-privilege-escalation/
```

枚举一下环境

```shell
ghost20@breachlab:~$ cat /etc/crontab
# /etc/crontab: system-wide crontab
# Unlike any other crontab you don't have to run the `crontab'
# command to install the new version when you edit this file
# and files in /etc/cron.d. These files also have username fields,
# that none of the other crontabs do.

SHELL=/bin/sh
# You can also override PATH, but by default, newer versions inherit it from the environment
#PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# Example of job definition:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name command to be executed
17 *    * * *   root    cd / && run-parts --report /etc/cron.hourly
25 6    * * *   root    test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.daily )
47 6    * * 7   root    test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.weekly )
52 6    1 * *   root    test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.monthly )
ghost20@breachlab:~$ cd /etc/cron.d/
ghost20@breachlab:/etc/cron.d$ ls -laih
total 24K
1973896 drwxr-xr-x 1 root root 4.0K Apr 20 22:13 .
 176600 drwxr-xr-x 1 root root 4.0K Apr 21 18:57 ..
1419539 -rw-r--r-- 1 root root  102 Mar 23  2022 .placeholder
1284863 -rw-r--r-- 1 root root  201 Jan  8  2022 e2scrub_all
1973897 -rw-r--r-- 1 root root   38 Apr 20 22:13 ghost-level20
ghost20@breachlab:/etc/cron.d$ cat ghost-level20
* * * * * root /opt/ghost-cron/job.sh
ghost20@breachlab:/etc/cron.d$ cat /opt/ghost-cron/job.sh
#!/bin/bash
cat /etc/ghost-cron-secret > /tmp/ghost-cron-output 2>/dev/null
sleep 2
rm -f /tmp/ghost-cron-output
```

那也简单了，直接竞争读取就好

```shell
ghost20@breachlab:/etc/cron.d$ while true; do
  if [ -f /tmp/ghost-cron-output ]; then
    cat /tmp/ghost-cron-output
    break
  fi
done
**hidden**
```

## 21 Git Archaeology

```plaintext
 [ Level 21 → 22 ]  Git Archaeology
 ─────────────────────────────────────────────

 A git repo was pulled off an internal server.
 Main is clean now. But tags and abandoned branches
 remember every secret that was ever committed.

 Goal:    Retrieve the password for ghost22
 Connect: ssh ghost22@204.168.229.209 -p 2222

 If you're stuck — read up on the topic, then come back:
   https://git-scm.com/docs/git-log
   https://git-scm.com/docs/git-tag
   https://git-scm.com/docs/git-reflog
   https://blog.gitguardian.com/how-to-handle-secrets-in-git/
```

枚举一下环境

```shell
ghost21@breachlab:~$ cd repo/
ghost21@breachlab:~/repo$ ls -laih
total 40K
1973891 drwxr-xr-x 1 ghost21 ghost21 4.0K Apr 20 22:13 .
1974096 drwx------ 1 ghost21 ghost21 4.0K Apr 23 09:00 ..
1973908 drwxr-xr-x 1 ghost21 ghost21 4.0K Apr 23 08:56 .git
1973932 -rw-r--r-- 1 ghost21 ghost21  102 Apr 20 22:13 README.md
1973935 -rw-r--r-- 1 ghost21 ghost21   96 Apr 20 22:13 config.txt
```

查看 Git 历史

```shell
ghost21@breachlab:~/repo$ git log --all --oneline --graph
* 8be4e48 (HEAD -> main) docs: mention archived snapshots
| * 0b3bd96 (tag: v0.9-internal) temp: hardcode prod secret for debug trace
|/  
* 7c35982 add telemetry toggle
* 45e1f92 initial config <E2><80><94> env-based secret
```

那么就简单了

```shell
ghost21@breachlab:~/repo$ git show 0b3bd96
commit 0b3bd96a801a2296dd4033f858aa483c5dc140ca (tag: v0.9-internal)
Author: KAEL <kael@ghost>
Date:   Mon Apr 20 22:13:51 2026 +0000

    temp: hardcode prod secret for debug trace

diff --git a/config.txt b/config.txt
index 90a29a8..0016c2d 100644
--- a/config.txt
+++ b/config.txt
@@ -1,5 +1,6 @@
 # Ghost Operations Config
-SECRET_KEY=${GHOST_SECRET}
+SECRET_KEY=**hidden**
 DATABASE=internal
 REGION=eu-1
 TELEMETRY=on
+DEBUG=true
```

## Ghost Graduation

```plaintext
 [ Level 22 · CLASSIFIED ]  Graduation
 ─────────────────────────────────────────────

 Twenty-two levels behind you.
 One classified file left on this machine — split
 into three shards, each guarded by a different
 technique from the track:

   Shard 1 — buried in a binary blob
   Shard 2 — encoded for transport
   Shard 3 — guarded by a SUID helper

 Recover all three. Hand them to the gatekeeper
 listening on TCP :31339. Format (exact):

   SHARD1:<val>|SHARD2:<val>|SHARD3:<val>

 Goal:    Claim the Ghost graduation flag
 Start:   ls  ·  cat BRIEFING  ·  then recover the shards

 If you're stuck — revisit the techniques from the track:
   https://man7.org/linux/man-pages/man1/strings.1.html
   https://en.wikipedia.org/wiki/Setuid
   https://man.openbsd.org/nc
```

也不难

```shell
ghost22@breachlab:~$ ls -laih
total 76K
1974097 drwx------ 1 ghost22 ghost22 4.0K Apr 22 15:44 .
1974067 drwxr-xr-x 1 root    root    4.0K Apr 20 22:13 ..
1973678 -rw-r--r-- 1 ghost22 ghost22  220 Jan  6  2022 .bash_logout
1973679 -rw-r--r-- 1 ghost22 ghost22 3.7K Jan  6  2022 .bashrc
 143102 drwx------ 2 ghost22 ghost22 4.0K Apr 22 15:44 .cache
1973677 -rw-r--r-- 1 ghost22 ghost22  807 Jan  6  2022 .profile
1974024 -rw-r----- 1 ghost22 ghost22  343 Apr 20 22:13 BRIEFING
1973990 -rw-r----- 1 ghost22 ghost22 8.1K Apr 20 22:13 relic.bin
1921063 -rw-r----- 1 ghost22 ghost22   25 Apr 20 22:13 scroll.b64
ghost22@breachlab:~$ strings relic.bin | grep "SHARD"
::SHARD1:ALPHA_Z3R0::

ghost22@breachlab:~$ cat scroll.b64 | base64 -d
SHARD2:BR4V0_0N3

ghost22@breachlab:~$ find / -perm -4000 -exec ls -ldb {} \; 2>/dev/null | grep ghost22
-rwsr-x--- 1 root ghost22 819664 Apr 20 13:58 /usr/local/bin/ghost-archivist
ghost22@breachlab:~$ /usr/local/bin/ghost-archivist
SHARD3:CH4RL13_TW0
```

然后

```plaintext
ghost22@breachlab:~$ nc localhost 31339
Ghost Graduation Gatekeeper
===========================
Submit three shards in one line, pipe-separated, no spaces:
  SHARD1:<val>|SHARD2:<val>|SHARD3:<val>

> SHARD1:ALPHA_Z3R0|SHARD2:BR4V0_0N3|SHARD3:CH4RL13_TW0

VERIFIED. All three shards accepted.
GRADUATION FLAG: **hidden**
```
