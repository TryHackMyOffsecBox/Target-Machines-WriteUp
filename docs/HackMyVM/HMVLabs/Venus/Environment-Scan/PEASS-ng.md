# PEASS-ng

```plaintext

                               ╔═══════════════════╗
═══════════════════════════════╣ Basic information ╠═══════════════════════════════
                               ╚═══════════════════╝
OS: Linux version 5.10.0-13-amd64 (debian-kernel@lists.debian.org) (gcc-10 (Debian 10.2.1-6) 10.2.1 20210110, GNU ld (GNU Binutils for Debian) 2.35.2) #1 SMP Debian 5.10.106-1 (2022-03-17)
User & Groups: uid=1052(hacker) gid=1052(hacker) groups=1052(hacker)
Hostname: venus
Writable folder: /dev/shm
[-] No network discovery capabilities (fping or ping not found)
[+] /usr/bin/bash is available for network discovery, port scanning and port forwarding (linpeas can discover hosts, scan ports, and forward ports. Learn more with -h)



Caching directories . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . DONE

                              ╔════════════════════╗
══════════════════════════════╣ System Information ╠══════════════════════════════
                              ╚════════════════════╝
╔══════════╣ Operative system
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#kernel-exploits
Linux version 5.10.0-13-amd64 (debian-kernel@lists.debian.org) (gcc-10 (Debian 10.2.1-6) 10.2.1 20210110, GNU ld (GNU Binutils for Debian) 2.35.2) #1 SMP Debian 5.10.106-1 (2022-03-17)
lsb_release Not Found

╔══════════╣ Sudo version
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#sudo-version
Sudo version 1.9.13p3


╔══════════╣ PATH
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#writable-path-abuses
/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games:/sbin:/usr/sbin:/usr/local/sbin

╔══════════╣ Date & uptime
Sun Feb  4 07:49:15 UTC 2024
 07:49:15 up 192 days, 23:01,  0 user,  load average: 2.16, 1.62, 1.41

╔══════════╣ Any sd*/disk* disk in /dev? (limit 20)

╔══════════╣ Unmounted file-system?
╚ Check if you can mount umounted devices

╔══════════╣ Environment
╚ Any private information inside environment variables?
HISTFILESIZE=0
USER=hacker
SSH_CLIENT=218.85.18.147 25261 22
SHLVL=1
MOTD_SHOWN=pam
HOME=/pwned/hacker
OLDPWD=/var/tmp/"
SSH_TTY=/dev/pts/18
PS1=$(command printf "\[\033[01;31m\](remote)\[\033[0m\] \[\033[01;33m\]$(whoami)@$(hostname)\[\033[0m\]:\[\033[1;36m\]$PWD\[\033[0m\]\$ ")
LOGNAME=hacker
_=./linpeas.sh
TERM=xterm-256color
HISTCONTROL=ignorespace
PATH=/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games:/sbin:/usr/sbin:/usr/local/sbin
HISTSIZE=0
LS_COLORS=rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=00:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.avif=01;35:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:*~=00;90:*#=00;90:*.bak=00;90:*.old=00;90:*.orig=00;90:*.part=00;90:*.rej=00;90:*.swp=00;90:*.tmp=00;90:*.dpkg-dist=00;90:*.dpkg-old=00;90:*.ucf-dist=00;90:*.ucf-new=00;90:*.ucf-old=00;90:*.rpmnew=00;90:*.rpmorig=00;90:*.rpmsave=00;90:
SHELL=/bin/bash
PWD=/var/tmp
SSH_CONNECTION=218.85.18.147 25261 172.66.0.10 22
HISTFILE=/dev/null

╔══════════╣ Searching Signature verification failed in dmesg
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#dmesg-signature-verification-failed
dmesg Not Found

╔══════════╣ Executing Linux Exploit Suggester
╚ https://github.com/mzet-/linux-exploit-suggester
[+] [CVE-2021-3490] eBPF ALU32 bounds tracking for bitwise ops

   Details: https://www.graplsecurity.com/post/kernel-pwning-with-ebpf-a-love-story
   Exposure: probable
   Tags: ubuntu=20.04{kernel:5.8.0-(25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45|46|47|48|49|50|51|52)-*},ubuntu=21.04{kernel:5.11.0-16-*}
   Download URL: https://codeload.github.com/chompie1337/Linux_LPE_eBPF_CVE-2021-3490/zip/main
   Comments: CONFIG_BPF_SYSCALL needs to be set && kernel.unprivileged_bpf_disabled != 1

[+] [CVE-2022-32250] nft_object UAF (NFT_MSG_NEWSET)

   Details: https://research.nccgroup.com/2022/09/01/settlers-of-netlink-exploiting-a-limited-uaf-in-nf_tables-cve-2022-32250/
https://blog.theori.io/research/CVE-2022-32250-linux-kernel-lpe-2022/
   Exposure: less probable
   Tags: ubuntu=(22.04){kernel:5.15.0-27-generic}
   Download URL: https://raw.githubusercontent.com/theori-io/CVE-2022-32250-exploit/main/exp.c
   Comments: kernel.unprivileged_userns_clone=1 required (to obtain CAP_NET_ADMIN)

[+] [CVE-2022-2586] nft_object UAF

   Details: https://www.openwall.com/lists/oss-security/2022/08/29/5
   Exposure: less probable
   Tags: ubuntu=(20.04){kernel:5.12.13}
   Download URL: https://www.openwall.com/lists/oss-security/2022/08/29/5/1
   Comments: kernel.unprivileged_userns_clone=1 required (to obtain CAP_NET_ADMIN)

[+] [CVE-2022-0847] DirtyPipe

   Details: https://dirtypipe.cm4all.com/
   Exposure: less probable
   Tags: ubuntu=(20.04|21.04),debian=11
   Download URL: https://haxx.in/files/dirtypipez.c

[+] [CVE-2021-3156] sudo Baron Samedit

   Details: https://www.qualys.com/2021/01/26/cve-2021-3156/baron-samedit-heap-based-overflow-sudo.txt
   Exposure: less probable
   Tags: mint=19,ubuntu=18|20, debian=10
   Download URL: https://codeload.github.com/blasty/CVE-2021-3156/zip/main

[+] [CVE-2021-3156] sudo Baron Samedit 2

   Details: https://www.qualys.com/2021/01/26/cve-2021-3156/baron-samedit-heap-based-overflow-sudo.txt
   Exposure: less probable
   Tags: centos=6|7|8,ubuntu=14|16|17|18|19|20, debian=9|10
   Download URL: https://codeload.github.com/worawit/CVE-2021-3156/zip/main

[+] [CVE-2021-27365] linux-iscsi

   Details: https://blog.grimm-co.com/2021/03/new-old-bugs-in-linux-kernel.html
   Exposure: less probable
   Tags: RHEL=8
   Download URL: https://codeload.github.com/grimm-co/NotQuite0DayFriday/zip/trunk
   Comments: CONFIG_SLAB_FREELIST_HARDENED must not be enabled

[+] [CVE-2021-22555] Netfilter heap out-of-bounds write

   Details: https://google.github.io/security-research/pocs/linux/cve-2021-22555/writeup.html
   Exposure: less probable
   Tags: ubuntu=20.04{kernel:5.8.0-*}
   Download URL: https://raw.githubusercontent.com/google/security-research/master/pocs/linux/cve-2021-22555/exploit.c
   ext-url: https://raw.githubusercontent.com/bcoles/kernel-exploits/master/CVE-2021-22555/exploit.c
   Comments: ip_tables kernel module must be loaded


╔══════════╣ Executing Linux Exploit Suggester 2
╚ https://github.com/jondonas/linux-exploit-suggester-2

╔══════════╣ Protections
═╣ AppArmor enabled? .............. /etc/apparmor.d
═╣ AppArmor profile? .............. docker-default (enforce)
═╣ is linuxONE? ................... s390x Not Found
═╣ grsecurity present? ............ grsecurity Not Found
═╣ PaX bins present? .............. PaX Not Found
═╣ Execshield enabled? ............ Execshield Not Found
═╣ SELinux enabled? ............... sestatus Not Found
═╣ Seccomp enabled? ............... enabled
═╣ User namespace? ................ enabled
═╣ Cgroup2 enabled? ............... enabled
═╣ Is ASLR enabled? ............... Yes
═╣ Printer? ....................... No
═╣ Is this a virtual machine? ..... Yes (docker)

                                   ╔═══════════╗
═══════════════════════════════════╣ Container ╠═══════════════════════════════════
                                   ╚═══════════╝
╔══════════╣ Container related tools present (if any):
╔══════════╣ Am I Containered?
╔══════════╣ Container details
═╣ Is this a container? ........... docker
═╣ Any running containers? ........ No
╔══════════╣ Docker Container details
═╣ Am I inside Docker group ....... No
═╣ Looking and enumerating Docker Sockets (if any):
═╣ Docker version ................. Not Found
═╣ Vulnerable to CVE-2019-5736 .... Not Found
═╣ Vulnerable to CVE-2019-13139 ... Not Found
═╣ Rootless Docker? ............... No


╔══════════╣ Container & breakout enumeration
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation/docker-breakout
═╣ Container ID ................... venus═╣ Container Full ID .............. /
═╣ Seccomp enabled? ............... enabled
═╣ AppArmor profile? .............. docker-default (enforce)
═╣ User proc namespace? ........... enabled         0          0 4294967295
═╣ Vulnerable to CVE-2019-5021 .... No

══╣ Breakout via mounts
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation/docker-breakout/docker-breakout-privilege-escalation/sensitive-mounts
═╣ /proc mounted? ................. Yes
═╣ /dev mounted? .................. No
═╣ Run unshare .................... No
═╣ release_agent breakout 1........ No
═╣ release_agent breakout 2........ No
═╣ core_pattern breakout .......... No
═╣ binfmt_misc breakout ........... No
═╣ uevent_helper breakout ......... No
═╣ is modprobe present ............ No
═╣ DoS via panic_on_oom ........... No
═╣ DoS via panic_sys_fs ........... No
═╣ DoS via sysreq_trigger_dos ..... No
═╣ /proc/config.gz readable ....... No
═╣ /proc/sched_debug readable ..... Yes
═╣ /proc/*/mountinfo readable ..... No
═╣ /sys/kernel/security present ... Yes
═╣ /sys/kernel/security writable .. No

══╣ Namespaces
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation/docker-breakout/namespaces
total 0
lrwxrwxrwx 1 hacker hacker 0 Feb  4 07:49 cgroup -> 'cgroup:[4026532301]'
lrwxrwxrwx 1 hacker hacker 0 Feb  4 07:49 ipc -> 'ipc:[4026532240]'
lrwxrwxrwx 1 hacker hacker 0 Feb  4 07:49 mnt -> 'mnt:[4026532238]'
lrwxrwxrwx 1 hacker hacker 0 Feb  4 07:49 net -> 'net:[4026532243]'
lrwxrwxrwx 1 hacker hacker 0 Feb  4 07:49 pid -> 'pid:[4026532241]'
lrwxrwxrwx 1 hacker hacker 0 Feb  4 07:49 pid_for_children -> 'pid:[4026532241]'
lrwxrwxrwx 1 hacker hacker 0 Feb  4 07:49 time -> 'time:[4026531834]'
lrwxrwxrwx 1 hacker hacker 0 Feb  4 07:49 time_for_children -> 'time:[4026531834]'
lrwxrwxrwx 1 hacker hacker 0 Feb  4 07:49 user -> 'user:[4026531837]'
lrwxrwxrwx 1 hacker hacker 0 Feb  4 07:49 uts -> 'uts:[4026532239]'

╔══════════╣ Container Capabilities
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation/docker-breakout/docker-breakout-privilege-escalation#capabilities-abuse-escape
Current: =
Bounding set =cap_chown,cap_dac_override,cap_fowner,cap_fsetid,cap_kill,cap_setgid,cap_setuid,cap_setpcap,cap_net_bind_service,cap_net_raw,cap_sys_chroot,cap_mknod,cap_audit_write,cap_setfcap
Ambient set =
Current IAB: !cap_dac_read_search,!cap_linux_immutable,!cap_net_broadcast,!cap_net_admin,!cap_ipc_lock,!cap_ipc_owner,!cap_sys_module,!cap_sys_rawio,!cap_sys_ptrace,!cap_sys_pacct,!cap_sys_admin,!cap_sys_boot,!cap_sys_nice,!cap_sys_resource,!cap_sys_time,!cap_sys_tty_config,!cap_lease,!cap_audit_control,!cap_mac_override,!cap_mac_admin,!cap_syslog,!cap_wake_alarm,!cap_block_suspend,!cap_audit_read,!cap_perfmon,!cap_bpf,!cap_checkpoint_restore
Securebits: 00/0x0/1'b0 (no-new-privs=0)
 secure-noroot: no (unlocked)
 secure-no-suid-fixup: no (unlocked)
 secure-keep-caps: no (unlocked)
 secure-no-ambient-raise: no (unlocked)
uid=1052(hacker) euid=1052(hacker)
gid=1052(hacker)
groups=1052(hacker)
Guessed mode: HYBRID (4)

╔══════════╣ Privilege Mode
 Not Found

╔══════════╣ Interesting Files Mounted
overlay on / type overlay (rw,relatime,lowerdir=/var/lib/docker/overlay2/l/FNN54M5DXWLWCK4PGW7EH4YXEY:/var/lib/docker/overlay2/l/L2GJ2QELM4VCL65U3H3VAYX4HX:/var/lib/docker/overlay2/l/Z5EK72F6SCQOSXDEPB526GTC7L,upperdir=/var/lib/docker/overlay2/6403890918a3f3abfc467c8d4381965582ff153f006102a2285a3865715f3c8b/diff,workdir=/var/lib/docker/overlay2/6403890918a3f3abfc467c8d4381965582ff153f006102a2285a3865715f3c8b/work)
proc on /proc type proc (rw,nosuid,nodev,noexec,relatime)
tmpfs on /dev type tmpfs (rw,nosuid,size=65536k,mode=755)
devpts on /dev/pts type devpts (rw,nosuid,noexec,relatime,gid=5,mode=620,ptmxmode=666)
sysfs on /sys type sysfs (ro,nosuid,nodev,noexec,relatime)
cgroup on /sys/fs/cgroup type cgroup2 (ro,nosuid,nodev,noexec,relatime,nsdelegate,memory_recursiveprot)
mqueue on /dev/mqueue type mqueue (rw,nosuid,nodev,noexec,relatime)
shm on /dev/shm type tmpfs (rw,nosuid,nodev,noexec,relatime,size=65536k)
/dev/sda3 on /www type ext4 (rw,relatime,errors=remount-ro)
tmpfs on /tmp type tmpfs (rw,nosuid,nodev,noexec,relatime,size=488284k)
/dev/sda3 on /etc/resolv.conf type ext4 (rw,relatime,errors=remount-ro)
/dev/sda3 on /etc/hostname type ext4 (rw,relatime,errors=remount-ro)
/dev/sda3 on /etc/hosts type ext4 (rw,relatime,errors=remount-ro)
proc on /proc/bus type proc (ro,nosuid,nodev,noexec,relatime)
proc on /proc/fs type proc (ro,nosuid,nodev,noexec,relatime)
proc on /proc/irq type proc (ro,nosuid,nodev,noexec,relatime)
proc on /proc/sys type proc (ro,nosuid,nodev,noexec,relatime)
proc on /proc/sysrq-trigger type proc (ro,nosuid,nodev,noexec,relatime)
tmpfs on /proc/acpi type tmpfs (ro,relatime)
tmpfs on /proc/kcore type tmpfs (rw,nosuid,size=65536k,mode=755)
tmpfs on /proc/keys type tmpfs (rw,nosuid,size=65536k,mode=755)
tmpfs on /proc/timer_list type tmpfs (rw,nosuid,size=65536k,mode=755)
tmpfs on /proc/sched_debug type tmpfs (rw,nosuid,size=65536k,mode=755)
tmpfs on /sys/firmware type tmpfs (ro,relatime)

╔══════════╣ Possible Entrypoints



                                     ╔═══════╗
═════════════════════════════════════╣ Cloud ╠═════════════════════════════════════
                                     ╚═══════╝
═╣ Google Cloud Platform? ............... No
═╣ AWS ECS? ............................. No
═╣ AWS EC2? ............................. No
═╣ AWS EC2 Beanstalk? ................... No
═╣ AWS Lambda? .......................... No
═╣ AWS Codebuild? ....................... No
═╣ DO Droplet? .......................... No
═╣ Aliyun ECS? .......................... No
═╣ IBM Cloud VM? ........................ No
═╣ Azure VM? ............................ No
═╣ Azure APP? ........................... No



                ╔════════════════════════════════════════════════╗
════════════════╣ Processes, Crons, Timers, Services and Sockets ╠════════════════
                ╚════════════════════════════════════════════════╝
╔══════════╣ Cleaned processes
[i] Looks like ps is not finding processes, going to read from /proc/ and not going to monitor 1min of processes
╚ Check weird & unexpected proceses run by root: https://book.hacktricks.xyz/linux-hardening/privilege-escalation#processes
                 thread-self  cat/proc/thread-self//cmdline
                 self      cat/proc/self//cmdline
                 706911    bash
                 706910    script/dev/null-cbash
                 706883    ./dumpexportTERM=xterm
                 706567    bash
                 706566    script/dev/null-cbash
                 705752    bash
                 705751    script/dev/null-cbash
                 705717    bash
                 705716    script/dev/null-cbash
                 705420    ./exp1
                 705412    ./exp1
                 705410    ./exp1
                 705247    bash
                 705246    script/dev/null-cbash
                 45        /bin/sh/usr/bin/mysqld_safe
                 419510    logger-tmysqld-pdaemonerror
                 419509    /usr/sbin/mariadbd--basedir=/usr--datadir=/var/lib/mysql--plugin-dir=/usr/lib/mysql/plugin--user=mysql--skip-log-error--pid-file=/run/mysqld/mysqld.pid--socket=/run/mysqld/mysqld.sock
                 3594512   /var/tmp/exp1
                 3594504   /var/tmp/exp1
                 3594502   /var/tmp/exp1
                 3274582   ssh-agent
                 313       sshd: /usr/sbin/sshd [listener] 0 of 10-100 startups
                 302       nginx: worker process
                 301       nginx: master process /usr/sbin/nginx
                 268       php-fpm: pool www
                 267       php-fpm: pool www
                 266       php-fpm: master process (/etc/php/8.2/fpm/php-fpm.conf)
                 2630485   /usr/sbin/cron
                 251       /usr/sbin/named-ubind
                 2479763   /bin/sh./linpeas.sh
                 2479761   sort-r
                 2479760   /bin/sh./linpeas.sh
                 2479758   seds,amazon-ssm-agent|knockd|splunk,&,
                 2479756   seds,root,&,
                 2479755   seds,hacker,&,
                 2479748   /bin/sh./linpeas.sh
                 2476449   /bin/sh./linpeas.sh
                 2476231   bash
                 2476205   suemma
                 2476185   -bash
                 2476184   sshd: hacker@pts/18
                 2476178   sshd: hacker [priv]
                 2476157   -bash
                 2476156   sshd: hacker@pts/15
                 2476150   sshd: hacker [priv]
                 2475370   -bash
                 2475369   sshd: hacker@pts/13
                 2475363   sshd: hacker [priv]
                 2200265   bash
                 2200264   sueliza
                 2200178   bash
                 2200177   sufrida
                 2199989   bash
                 2199988   suclara
                 2199423   bash
                 2199422   sueva
                 2199400   bash
                 2199399   sunatalia
                 2199378   bash
                 2199369   sueva
                 2199354   /bin/bash
                 2199353   sudo-unatalia/bin/bash
                 2199352   sudo-unatalia/bin/bash
                 2199241   bash
                 2199240   suanna
                 2199026   bash
                 2199025   sualice
                 2198942   bash
                 2198941   suelena
                 2198882   bash
                 2198881   sulucy
                 2198821   bash
                 2198820   suviolet
                 2198681   bash
                 2198680   suisla
                 2198498   bash
                 2198497   suvictoria
                 2198432   bash
                 2198431   sueleanor
                 2198260   bash
                 2198259   suluna
                 2197800   bash
                 2197781   bash
                 2197780   script/dev/null-cbash
                 2197653   bash
                 2197634   bash
                 2197633   script/dev/null-cbash
                 2185578   -bash
                 2185577   sshd: emma@pts/5
                 2185571   sshd: emma [priv]
                 2185570   sshemma@venus.hackmyvm.eu-p5000
                 2185385   -bash
                 2185384   sshd: angela@pts/4
                 2185378   sshd: angela [priv]
                 2185377   sshangela@venus.hackmyvm.eu-p5000
                 2185297   -bash
                 2185296   sshd: sophia@pts/3
                 2185290   sshd: sophia [priv]
                 2185289   sshsophia@venus.hackmyvm.eu-p5000
                 2185188   bash
                 2185166   bash
                 2185165   script/dev/null-cbash
                 1         /bin/bash-l

╔══════════╣ Files opened by processes belonging to other users
╚ This is usually empty because of the lack of privileges to read other user processes information
COMMAND       PID     TID TASKCMD       USER   FD      TYPE    DEVICE SIZE/OFF      NODE NAME

╔══════════╣ Processes with credentials in memory (root req)
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#credentials-from-process-memory
gdm-password Not Found
gnome-keyring-daemon Not Found
lightdm Not Found
vsftpd Not Found
apache2 Not Found
sshd: process found (dump creds from memory as root)

╔══════════╣ Cron jobs
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#scheduled-cron-jobs
/usr/bin/crontab
incrontab Not Found
-rw-r--r-- 1 root root    1042 Mar  2  2023 /etc/crontab

/etc/cron.d:
total 24
drwxr-xr-x 1 root root 4096 Jul 26  2023 .
drwxr-xr-x 1 root root 4096 Jul 26  2023 ..
-rw-r--r-- 1 root root  102 Mar  2  2023 .placeholder
-rw-r--r-- 1 root root  201 Mar  5  2023 e2scrub_all
-rw-r--r-- 1 root root  712 Jul 13  2022 php

/etc/cron.daily:
total 32
drwxr-xr-x 1 root root 4096 Jul 26  2023 .
drwxr-xr-x 1 root root 4096 Jul 26  2023 ..
-rw-r--r-- 1 root root  102 Mar  2  2023 .placeholder
-rwxr-xr-x 1 root root 1478 May 25  2023 apt-compat
-rwxr-xr-x 1 root root  123 Mar 27  2023 dpkg
-rwxr-xr-x 1 root root 4722 May  4  2021 exim4-base

/etc/cron.hourly:
total 16
drwxr-xr-x 2 root root 4096 Jul 26  2023 .
drwxr-xr-x 1 root root 4096 Jul 26  2023 ..
-rw-r--r-- 1 root root  102 Mar  2  2023 .placeholder

/etc/cron.monthly:
total 16
drwxr-xr-x 2 root root 4096 Jul 26  2023 .
drwxr-xr-x 1 root root 4096 Jul 26  2023 ..
-rw-r--r-- 1 root root  102 Mar  2  2023 .placeholder

/etc/cron.weekly:
total 16
drwxr-xr-x 2 root root 4096 Jul 26  2023 .
drwxr-xr-x 1 root root 4096 Jul 26  2023 ..
-rw-r--r-- 1 root root  102 Mar  2  2023 .placeholder

/etc/cron.yearly:
total 16
drwxr-xr-x 2 root root 4096 Jul 26  2023 .
drwxr-xr-x 1 root root 4096 Jul 26  2023 ..
-rw-r--r-- 1 root root  102 Mar  2  2023 .placeholder

SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

17 *    * * *   root    cd / && run-parts --report /etc/cron.hourly
25 6    * * *   root    test -x /usr/sbin/anacron || { cd / && run-parts --report /etc/cron.daily; }
47 6    * * 7   root    test -x /usr/sbin/anacron || { cd / && run-parts --report /etc/cron.weekly; }
52 6    1 * *   root    test -x /usr/sbin/anacron || { cd / && run-parts --report /etc/cron.monthly; }

╔══════════╣ Systemd PATH
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#systemd-path-relative-paths

╔══════════╣ Analyzing .service files
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#services
/etc/systemd/system/multi-user.target.wants/mariadb.service could be executing some relative path
/usr/lib/systemd/system/getty-static.service could be executing some relative path
/usr/lib/systemd/system/getty.target.wants/getty-static.service could be executing some relative path
/usr/lib/systemd/system/initrd-cleanup.service could be executing some relative path
/usr/lib/systemd/system/initrd-parse-etc.service could be executing some relative path
/usr/lib/systemd/system/initrd-switch-root.service could be executing some relative path
/usr/lib/systemd/system/initrd-udevadm-cleanup-db.service could be executing some relative path
/usr/lib/systemd/system/mariadb.service could be executing some relative path
/usr/lib/systemd/system/mysql.service could be executing some relative path
/usr/lib/systemd/system/mysqld.service could be executing some relative path
/usr/lib/systemd/system/named-resolvconf.service could be executing some relative path
You can't write on systemd PATH

╔══════════╣ System timers
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#timers

╔══════════╣ Analyzing .timer files
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#timers

╔══════════╣ Analyzing .socket files
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#sockets

╔══════════╣ Unix Sockets Listening
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#sockets
sed: -e expression #1, char 0: no previous regular expression
/run/mysqld/mysqld.sock
  └─(Read Write)
/run/php/php8.2-fpm.sock

╔══════════╣ D-Bus config files
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#d-bus

╔══════════╣ D-Bus Service Objects list
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#d-bus
busctl Not Found


                              ╔═════════════════════╗
══════════════════════════════╣ Network Information ╠══════════════════════════════
                              ╚═════════════════════╝
╔══════════╣ Hostname, hosts and DNS
venus
127.0.0.1       localhost
::1     localhost ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
172.66.0.10     venus
nameserver 127.0.0.11
options edns0 trust-ad ndots:0

╔══════════╣ Interfaces
default         0.0.0.0
loopback        127.0.0.0
link-local      169.254.0.0

1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
9: eth0@if10: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:42:00:0a brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.66.0.10/24 brd 172.66.0.255 scope global eth0
       valid_lft forever preferred_lft forever

╔══════════╣ Active Ports
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#open-ports

╔══════════╣ Can I sniff with tcpdump?
No



                               ╔═══════════════════╗
═══════════════════════════════╣ Users Information ╠═══════════════════════════════
                               ╚═══════════════════╝
╔══════════╣ My user
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#users
uid=1052(hacker) gid=1052(hacker) groups=1052(hacker)

╔══════════╣ Do I have PGP keys?
gpg Not Found
netpgpkeys Not Found
netpgp Not Found

╔══════════╣ Checking 'sudo -l', /etc/sudoers, and /etc/sudoers.d
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#sudo-and-suid

╔══════════╣ Checking sudo tokens
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#reusing-sudo-tokens
ptrace protection is disabled (0), so sudo tokens could be abused
./linpeas.sh: 3303: ps: Permission denied

╔══════════╣ Checking doas.conf
permit denise as zora

╔══════════╣ Checking Pkexec policy
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation/interesting-groups-linux-pe#pe-method-2

╔══════════╣ Superusers
root:x:0:0:root:/root:/bin/bash

╔══════════╣ Users with console
adela:x:1040:1040::/pwned/adela:/bin/bash
alexa:x:1026:1026::/pwned/alexa:/bin/bash
alice:x:1014:1014:w8NvY27qkpdePox:/pwned/alice:/bin/bash
alora:x:1037:1037::/pwned/alora:/bin/bash
angela:x:1003:1003::/pwned/angela:/bin/bash
anna:x:1015:1015::/pwned/anna:/bin/bash
ariel:x:1027:1027::/pwned/ariel:/bin/bash
ava:x:1050:1050::/pwned/ava:/bin/bash
belen:x:1048:1048::/pwned/belen:/bin/bash
camila:x:1006:1006::/pwned/camila:/bin/bash
celeste:x:1029:1029::/pwned/celeste:/bin/bash
clara:x:1018:1018::/pwned/clara:/bin/bash
denise:x:1046:1046::/pwned/denise:/bin/bash
eleanor:x:1008:1008::/pwned/eleanor:/bin/bash
elena:x:1013:1013::/pwned/elena:/bin/bash
eliza:x:1020:1020::/pwned/eliza:/bin/bash
eloise:x:1022:1022::/pwned/eloise:/bin/bash
emma:x:1004:1004::/pwned/emma:/bin/bash
eva:x:1017:1017::/pwned/eva:/bin/bash
executor:x:1001:1001::/pwned/executor:/bin/bash
freya:x:1025:1025::/pwned/freya:/bin/bash
frida:x:1019:1019::/pwned/frida:/bin/bash
gloria:x:1036:1036::/pwned/gloria:/bin/bash
hacker:x:1052:1052::/pwned/hacker:/bin/bash
irene:x:1039:1039::/pwned/irene:/bin/bash
iris:x:1021:1021::/pwned/iris:/bin/bash
isabel:x:1024:1024::/pwned/isabel:/bin/bash
isla:x:1010:1010::/pwned/isla:/bin/bash
julie:x:1038:1038::/pwned/julie:/bin/bash
karla:x:1045:1045::/pwned/karla:/bin/bash
kira:x:1031:1031::/pwned/kira:/bin/bash
lana:x:1033:1033::/pwned/lana:/bin/bash
leona:x:1049:1049::/pwned/leona:/bin/bash
lola:x:1028:1028::/pwned/lola:/bin/bash
lucia:x:1023:1023::/pwned/lucia:/bin/bash
lucy:x:1012:1012::/pwned/lucy:/bin/bash
luna:x:1007:1007::/pwned/luna:/bin/bash
maia:x:1035:1035::/pwned/maia:/bin/bash
maria:x:1051:1051::/pwned/maria:/bin/bash
mercy:x:1043:1043::/pwned/mercy:/bin/bash
mia:x:1005:1005::/pwned/mia:/bin/bash
natalia:x:1016:1016::/pwned/natalia:/bin/bash
nina:x:1030:1030::/pwned/nina:/bin/bash
noa:x:1034:1034::/pwned/noa:/bin/bash
paula:x:1044:1044::/pwned/paula:/bin/bash
root:x:0:0:root:/root:/bin/bash
sarah:x:1042:1042::/pwned/sarah:/bin/bash
sky:x:1041:1041::/pwned/sky:/bin/bash
sophia:x:1002:1002::/pwned/sophia:/bin/bash
veronica:x:1032:1032::/pwned/veronica:/bin/bash
victoria:x:1009:1009::/pwned/victoria:/bin/bash
violet:x:1011:1011::/pwned/violet:/bin/bash
violin:x:1000:1000::/pwned/violin:/bin/bash
zora:x:1047:1047::/pwned/zora:/bin/bash

╔══════════╣ All users & groups
uid=0(root) gid=0(root) groups=0(root)
uid=1(daemon[0m) gid=1(daemon[0m) groups=1(daemon[0m)
uid=10(uucp) gid=10(uucp) groups=10(uucp)
uid=100(mysql) gid=102(mysql) groups=102(mysql)
uid=1000(violin) gid=1000(violin) groups=1000(violin)
uid=1001(executor) gid=1001(executor) groups=1001(executor)
uid=1002(sophia) gid=1002(sophia) groups=1002(sophia)
uid=1003(angela) gid=1003(angela) groups=1003(angela),1054(www3)
uid=1004(emma) gid=1004(emma) groups=1004(emma)
uid=1005(mia) gid=1005(mia) groups=1005(mia)
uid=1006(camila) gid=1006(camila) groups=1006(camila)
uid=1007(luna) gid=1007(luna) groups=1007(luna)
uid=1008(eleanor) gid=1008(eleanor) groups=1008(eleanor)
uid=1009(victoria) gid=1009(victoria) groups=1009(victoria)
uid=101(Debian-exim) gid=103(Debian-exim) groups=103(Debian-exim)
uid=1010(isla) gid=1010(isla) groups=1010(isla)
uid=1011(violet) gid=1011(violet) groups=1011(violet)
uid=1012(lucy) gid=1012(lucy) groups=1012(lucy)
uid=1013(elena) gid=1013(elena) groups=1013(elena)
uid=1014(alice) gid=1014(alice) groups=1014(alice)
uid=1015(anna) gid=1015(anna) groups=1015(anna)
uid=1016(natalia) gid=1016(natalia) groups=1016(natalia)
uid=1017(eva) gid=1017(eva) groups=1017(eva)
uid=1018(clara) gid=1018(clara) groups=1018(clara)
uid=1019(frida) gid=1019(frida) groups=1019(frida)
uid=102(messagebus) gid=104(messagebus) groups=104(messagebus)
uid=1020(eliza) gid=1020(eliza) groups=1020(eliza)
uid=1021(iris) gid=1021(iris) groups=1021(iris)
uid=1022(eloise) gid=1022(eloise) groups=1022(eloise)
uid=1023(lucia) gid=1023(lucia) groups=1023(lucia)
uid=1024(isabel) gid=1024(isabel) groups=1024(isabel)
uid=1025(freya) gid=1025(freya) groups=1025(freya)
uid=1026(alexa) gid=1026(alexa) groups=1026(alexa)
uid=1027(ariel) gid=1027(ariel) groups=1027(ariel)
uid=1028(lola) gid=1028(lola) groups=1028(lola)
uid=1029(celeste) gid=1029(celeste) groups=1029(celeste)
uid=103(bind) gid=106(bind) groups=106(bind)
uid=1030(nina) gid=1030(nina) groups=1030(nina)
uid=1031(kira) gid=1031(kira) groups=1031(kira)
uid=1032(veronica) gid=1032(veronica) groups=1032(veronica)
uid=1033(lana) gid=1033(lana) groups=1033(lana)
uid=1034(noa) gid=1034(noa) groups=1034(noa)
uid=1035(maia) gid=1035(maia) groups=1035(maia)
uid=1036(gloria) gid=1036(gloria) groups=1036(gloria)
uid=1037(alora) gid=1037(alora) groups=1037(alora)
uid=1038(julie) gid=1038(julie) groups=1038(julie)
uid=1039(irene) gid=1039(irene) groups=1039(irene)
uid=104(sshd) gid=65534(nogroup) groups=65534(nogroup)
uid=1040(adela) gid=1040(adela) groups=1040(adela)
uid=1041(sky) gid=1041(sky) groups=1041(sky)
uid=1042(sarah) gid=1042(sarah) groups=1042(sarah)
uid=1043(mercy) gid=1043(mercy) groups=1043(mercy)
uid=1044(paula) gid=1044(paula) groups=1044(paula),1053(hidden)
uid=1045(karla) gid=1045(karla) groups=1045(karla)
uid=1046(denise) gid=1046(denise) groups=1046(denise)
uid=1047(zora) gid=1047(zora) groups=1047(zora)
uid=1048(belen) gid=1048(belen) groups=1048(belen)
uid=1049(leona) gid=1049(leona) groups=1049(leona)
uid=1050(ava) gid=1050(ava) groups=1050(ava)
uid=1051(maria) gid=1051(maria) groups=1051(maria)
uid=1052(hacker) gid=1052(hacker) groups=1052(hacker)
uid=13(proxy) gid=13(proxy) groups=13(proxy)
uid=2(bin) gid=2(bin) groups=2(bin)
uid=3(sys) gid=3(sys) groups=3(sys)
uid=33(www-data) gid=33(www-data) groups=33(www-data)
uid=34(backup) gid=34(backup) groups=34(backup)
uid=38(list) gid=38(list) groups=38(list)
uid=39(irc) gid=39(irc) groups=39(irc)
uid=4(sync) gid=65534(nogroup) groups=65534(nogroup)
uid=42(_apt) gid=65534(nogroup) groups=65534(nogroup)
uid=5(games) gid=60(games) groups=60(games)
uid=6(man) gid=12(man) groups=12(man)
uid=65534(nobody) gid=65534(nogroup) groups=65534(nogroup)
uid=7(lp) gid=7(lp) groups=7(lp)
uid=8(mail) gid=8(mail) groups=8(mail)
uid=9(news) gid=9(news) groups=9(news)
uid=997(systemd-timesync) gid=997(systemd-timesync) groups=997(systemd-timesync)
uid=998(systemd-network) gid=998(systemd-network) groups=998(systemd-network)

╔══════════╣ Login now
 07:49:35 up 192 days, 23:02,  0 user,  load average: 2.68, 1.77, 1.46
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT

╔══════════╣ Last logons

╔══════════╣ Last time logon each user

╔══════════╣ Do not forget to test 'su' as any other user with shell: without password and with their names as password (I don't do it in FAST mode...)

╔══════════╣ Do not forget to execute 'sudo -l' without password or with valid password (if you know it)!!



                             ╔══════════════════════╗
═════════════════════════════╣ Software Information ╠═════════════════════════════
                             ╚══════════════════════╝
╔══════════╣ Useful software
/usr/bin/base64
/usr/bin/curl
/usr/bin/doas
/usr/bin/perl
/usr/bin/php
/usr/bin/socat
/usr/bin/sudo
/usr/bin/wget

╔══════════╣ Installed Compilers

╔══════════╣ MySQL version
mysql  Ver 15.1 Distrib 10.11.3-MariaDB, for debian-linux-gnu (x86_64) using  EditLine wrapper


═╣ MySQL connection using default root/root ........... No
═╣ MySQL connection using root/toor ................... No
═╣ MySQL connection using root/NOPASS ................. No

╔══════════╣ Searching mysql credentials and exec
From '/etc/mysql/mariadb.conf.d/50-server.cnf' Mysql user: 
Found readable /etc/mysql/my.cnf
[client-server]
socket = /run/mysqld/mysqld.sock
!includedir /etc/mysql/conf.d/
!includedir /etc/mysql/mariadb.conf.d/

╔══════════╣ Analyzing MariaDB Files (limit 70)
-rw-r--r-- 1 root root 1126 May 25  2023 /etc/mysql/mariadb.cnf
[client-server]
socket = /run/mysqld/mysqld.sock
!includedir /etc/mysql/conf.d/
!includedir /etc/mysql/mariadb.conf.d/

-rw------- 1 root root 544 Jul 26  2023 /etc/mysql/debian.cnf

╔══════════╣ Analyzing Apache-Nginx Files (limit 70)
Apache version: apache2 Not Found
httpd Not Found

Nginx version: 
══╣ PHP exec extensions
drwxr-xr-x 2 root root 4096 Jul 26  2023 /etc/nginx/sites-enabled
drwxr-xr-x 2 root root 4096 Jul 26  2023 /etc/nginx/sites-enabled
lrwxrwxrwx 1 root root 34 Jul 26  2023 /etc/nginx/sites-enabled/default -> /etc/nginx/sites-available/default
server {
        listen 80 default_server;
        listen [::]:80 default_server;
        root /var/www/html;
        index index.html index.htm index.nginx-debian.html;
        server_name _;
        location / {
                try_files $uri $uri/ =404;
        }
        location ~ \.php$ {
                include snippets/fastcgi-php.conf;
                fastcgi_pass unix:/run/php/php8.2-fpm.sock;
        }
}
server {
server_name venus.hmv;
root /var/www/htm;
index index.html index.htm index.nginx-debian.html;
 location / {
                try_files $uri $uri/ =404;
        }
  }



-rw-r--r-- 1 root root 73940 Jun  9  2023 /etc/php/8.2/cli/php.ini
allow_url_fopen = On
allow_url_include = Off
odbc.allow_persistent = On
mysqli.allow_persistent = On
pgsql.allow_persistent = On
-rw-r--r-- 1 root root 73944 Jun  9  2023 /etc/php/8.2/fpm/php.ini
allow_url_fopen = On
allow_url_include = Off
odbc.allow_persistent = On
mysqli.allow_persistent = On
pgsql.allow_persistent = On

-rw-r--r-- 1 root root 1446 Mar 14  2023 /etc/nginx/nginx.conf
user www-data;
worker_processes auto;
pid /run/nginx.pid;
error_log /var/log/nginx/error.log;
include /etc/nginx/modules-enabled/*.conf;
events {
  worker_connections 768;
}
http {
  sendfile on;
  tcp_nopush on;
  types_hash_max_size 2048;
  include /etc/nginx/mime.types;
  default_type application/octet-stream;
  ssl_prefer_server_ciphers on;
  access_log /var/log/nginx/access.log;
  gzip on;
  include /etc/nginx/conf.d/*.conf;
  include /etc/nginx/sites-enabled/*;
}

-rw-r--r-- 1 root root 389 Mar 14  2023 /etc/default/nginx

-rwxr-xr-x 1 root root 4579 Mar 14  2023 /etc/init.d/nginx

-rw-r--r-- 1 root root 329 Mar 14  2023 /etc/logrotate.d/nginx

drwxr-xr-x 1 root root 4096 Jul 26  2023 /etc/nginx
-rw-r--r-- 1 root root 1125 Mar 14  2023 /etc/nginx/fastcgi.conf
fastcgi_param  SCRIPT_FILENAME    $document_root$fastcgi_script_name;
fastcgi_param  QUERY_STRING       $query_string;
fastcgi_param  REQUEST_METHOD     $request_method;
fastcgi_param  CONTENT_TYPE       $content_type;
fastcgi_param  CONTENT_LENGTH     $content_length;
fastcgi_param  SCRIPT_NAME        $fastcgi_script_name;
fastcgi_param  REQUEST_URI        $request_uri;
fastcgi_param  DOCUMENT_URI       $document_uri;
fastcgi_param  DOCUMENT_ROOT      $document_root;
fastcgi_param  SERVER_PROTOCOL    $server_protocol;
fastcgi_param  REQUEST_SCHEME     $scheme;
fastcgi_param  HTTPS              $https if_not_empty;
fastcgi_param  GATEWAY_INTERFACE  CGI/1.1;
fastcgi_param  SERVER_SOFTWARE    nginx/$nginx_version;
fastcgi_param  REMOTE_ADDR        $remote_addr;
fastcgi_param  REMOTE_PORT        $remote_port;
fastcgi_param  REMOTE_USER        $remote_user;
fastcgi_param  SERVER_ADDR        $server_addr;
fastcgi_param  SERVER_PORT        $server_port;
fastcgi_param  SERVER_NAME        $server_name;
fastcgi_param  REDIRECT_STATUS    200;
-rw-r--r-- 1 root root 423 Mar 14  2023 /etc/nginx/snippets/fastcgi-php.conf
fastcgi_split_path_info ^(.+?\.php)(/.*)$;
try_files $fastcgi_script_name =404;
set $path_info $fastcgi_path_info;
fastcgi_param PATH_INFO $path_info;
fastcgi_index index.php;
include fastcgi.conf;
-rw-r--r-- 1 root root 217 Mar 14  2023 /etc/nginx/snippets/snakeoil.conf
ssl_certificate /etc/ssl/certs/ssl-cert-snakeoil.pem;
ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;
-rw-r--r-- 1 root root 1446 Mar 14  2023 /etc/nginx/nginx.conf
user www-data;
worker_processes auto;
pid /run/nginx.pid;
error_log /var/log/nginx/error.log;
include /etc/nginx/modules-enabled/*.conf;
events {
  worker_connections 768;
}
http {
  sendfile on;
  tcp_nopush on;
  types_hash_max_size 2048;
  include /etc/nginx/mime.types;
  default_type application/octet-stream;
  ssl_prefer_server_ciphers on;
  access_log /var/log/nginx/access.log;
  gzip on;
  include /etc/nginx/conf.d/*.conf;
  include /etc/nginx/sites-enabled/*;
}

-rw-r--r-- 1 root root 374 Mar 14  2023 /etc/ufw/applications.d/nginx

-rwxr-xr-x 1 root root 1260032 Mar 14  2023 /usr/sbin/nginx

drwxr-xr-x 2 root root 4096 Jul 26  2023 /usr/share/doc/nginx

drwxr-xr-x 3 root root 4096 Jul 26  2023 /usr/share/nginx

drwxr-xr-x 1 root root 4096 Jul 26  2023 /var/lib/nginx
find: '/var/lib/nginx/scgi': Permission denied
find: '/var/lib/nginx/body': Permission denied
find: '/var/lib/nginx/proxy': Permission denied
find: '/var/lib/nginx/uwsgi': Permission denied
find: '/var/lib/nginx/fastcgi': Permission denied

drwxr-xr-x 1 root adm 4096 Jul 26  2023 /var/log/nginx


╔══════════╣ Analyzing FastCGI Files (limit 70)
-rw-r--r-- 1 root root 1055 Mar 14  2023 /etc/nginx/fastcgi_params

╔══════════╣ Analyzing Rsync Files (limit 70)
-rw-r--r-- 1 root root 1044 Dec 18  2022 /usr/share/doc/rsync/examples/rsyncd.conf
[ftp]
  comment = public archive
  path = /var/www/pub
  use chroot = yes
  lock file = /var/lock/rsyncd
  read only = yes
  list = yes
  uid = nobody
  gid = nogroup
  strict modes = yes
  ignore errors = no
  ignore nonreadable = yes
  transfer logging = no
  timeout = 600
  refuse options = checksum dry-run
  dont compress = *.gz *.tgz *.zip *.z *.rpm *.deb *.iso *.bz2 *.tbz


╔══════════╣ Analyzing Ldap Files (limit 70)
The password hash is from the {SSHA} to 'structural'
drwxr-xr-x 2 root root 4096 Jul 26  2023 /etc/ldap


╔══════════╣ Searching ssl/ssh files
╔══════════╣ Analyzing SSH Files (limit 70)





-rw-r--r-- 1 root root 172 Jul 26  2023 /etc/ssh/ssh_host_ecdsa_key.pub
-rw-r--r-- 1 root root 92 Jul 26  2023 /etc/ssh/ssh_host_ed25519_key.pub
-rw-r--r-- 1 root root 564 Jul 26  2023 /etc/ssh/ssh_host_rsa_key.pub

UsePAM yes
PubkeyAuthentication yes
══╣ Some certificates were found (out limited):
/etc/ssl/certs/ACCVRAIZ1.pem
/etc/ssl/certs/AC_RAIZ_FNMT-RCM.pem
/etc/ssl/certs/AC_RAIZ_FNMT-RCM_SERVIDORES_SEGUROS.pem
/etc/ssl/certs/ANF_Secure_Server_Root_CA.pem
/etc/ssl/certs/Actalis_Authentication_Root_CA.pem
/etc/ssl/certs/AffirmTrust_Commercial.pem
/etc/ssl/certs/AffirmTrust_Networking.pem
/etc/ssl/certs/AffirmTrust_Premium.pem
/etc/ssl/certs/AffirmTrust_Premium_ECC.pem
/etc/ssl/certs/Amazon_Root_CA_1.pem
/etc/ssl/certs/Amazon_Root_CA_2.pem
/etc/ssl/certs/Amazon_Root_CA_3.pem
/etc/ssl/certs/Amazon_Root_CA_4.pem
/etc/ssl/certs/Atos_TrustedRoot_2011.pem
/etc/ssl/certs/Autoridad_de_Certificacion_Firmaprofesional_CIF_A62634068.pem
/etc/ssl/certs/Autoridad_de_Certificacion_Firmaprofesional_CIF_A62634068_2.pem
/etc/ssl/certs/Baltimore_CyberTrust_Root.pem
/etc/ssl/certs/Buypass_Class_2_Root_CA.pem
/etc/ssl/certs/Buypass_Class_3_Root_CA.pem
/etc/ssl/certs/CA_Disig_Root_R2.pem
2476449PSTORAGE_CERTSBIN

══╣ Some home ssh config file was found
/usr/share/openssh/sshd_config
Include /etc/ssh/sshd_config.d/*.conf
KbdInteractiveAuthentication no
UsePAM yes
X11Forwarding yes
PrintMotd no
AcceptEnv LANG LC_*
Subsystem       sftp    /usr/lib/openssh/sftp-server

══╣ /etc/hosts.allow file found, trying to read the rules:
/etc/hosts.allow


Searching inside /etc/ssh/ssh_config for interesting info
Include /etc/ssh/ssh_config.d/*.conf
Host *
    SendEnv LANG LC_*
    HashKnownHosts yes
    GSSAPIAuthentication yes

╔══════════╣ Analyzing PAM Auth Files (limit 70)
drwxr-xr-x 1 root root 4096 Jul 26  2023 /etc/pam.d
-rw-r--r-- 1 root root 2133 Feb  8  2023 /etc/pam.d/sshd
account    required     pam_nologin.so
session [success=ok ignore=ignore module_unknown=ignore default=bad]        pam_selinux.so close
session    required     pam_loginuid.so
session    optional     pam_keyinit.so force revoke
session    optional     pam_motd.so  motd=/run/motd.dynamic
session    optional     pam_motd.so noupdate
session    optional     pam_mail.so standard noenv # [1]
session    required     pam_limits.so
session    required     pam_env.so # [1]
session    required     pam_env.so user_readenv=1 envfile=/etc/default/locale
session [success=ok ignore=ignore module_unknown=ignore default=bad]        pam_selinux.so open




./linpeas.sh: 4033: ps: Permission denied
╔══════════╣ Analyzing Keyring Files (limit 70)
drwxr-xr-x 2 root root 4096 May 25  2023 /etc/apt/keyrings
drwxr-xr-x 2 root root 4096 Jul  3  2023 /usr/share/keyrings




╔══════════╣ Searching uncommon passwd files (splunk)
passwd file: /etc/pam.d/passwd
passwd file: /etc/passwd
passwd file: /usr/bin/passwd
passwd file: /usr/share/lintian/overrides/passwd

╔══════════╣ Analyzing PGP-GPG Files (limit 70)
gpg Not Found
netpgpkeys Not Found
netpgp Not Found

-rw-r--r-- 1 root root 8700 Mar 28  2023 /usr/share/keyrings/debian-archive-bookworm-automatic.gpg
-rw-r--r-- 1 root root 8709 Mar 28  2023 /usr/share/keyrings/debian-archive-bookworm-security-automatic.gpg
-rw-r--r-- 1 root root 280 Mar 28  2023 /usr/share/keyrings/debian-archive-bookworm-stable.gpg
-rw-r--r-- 1 root root 8700 Mar 28  2023 /usr/share/keyrings/debian-archive-bullseye-automatic.gpg
-rw-r--r-- 1 root root 8709 Mar 28  2023 /usr/share/keyrings/debian-archive-bullseye-security-automatic.gpg
-rw-r--r-- 1 root root 2453 Mar 28  2023 /usr/share/keyrings/debian-archive-bullseye-stable.gpg
-rw-r--r-- 1 root root 8132 Mar 28  2023 /usr/share/keyrings/debian-archive-buster-automatic.gpg
-rw-r--r-- 1 root root 8141 Mar 28  2023 /usr/share/keyrings/debian-archive-buster-security-automatic.gpg
-rw-r--r-- 1 root root 2332 Mar 28  2023 /usr/share/keyrings/debian-archive-buster-stable.gpg
-rw-r--r-- 1 root root 56156 Mar 28  2023 /usr/share/keyrings/debian-archive-keyring.gpg
-rw-r--r-- 1 root root 54031 Mar 28  2023 /usr/share/keyrings/debian-archive-removed-keys.gpg


╔══════════╣ Analyzing Cache Vi Files (limit 70)
-rw------- 1 ariel ariel 28672 Sep 12 00:48 /var/tmp/.goas.swp.swp
-rw------- 1 alice alice 12288 Jan 24 10:12 /var/tmp/.mission.txt.swp.swp
-rw------- 1 ariel ariel 12288 Jan 31 09:45 /var/tmp/.swp
-rw-r----- 1 nina nina 12288 Jan 16 22:37 /var/tmp/1337.txt.swp
-rw------- 1 alice alice 20480 Jan 24 09:53 /var/tmp/MIE1.1-20070121.pdf.swp
-rw------- 1 angela angela 24576 Aug 10 12:38 /var/tmp/findme.txt.swp
-rw------- 1 ariel ariel 12288 Aug 15 23:40 /var/tmp/goas.swp
-rw------- 1 hacker hacker 12288 Nov 13 16:07 /var/tmp/mission.txt.swp
-rw------- 1 alice alice 12288 Sep 21 19:25 /var/tmp/passwd.swp
-rw------- 1 camila camila 12288 Nov  9 20:17 /var/tmp/test.sh.swp



╔══════════╣ Analyzing FTP Files (limit 70)



-rw-r--r-- 1 root root 69 Jun  9  2023 /etc/php/8.2/mods-available/ftp.ini
-rw-r--r-- 1 root root 69 Jun  9  2023 /usr/share/php8.2-common/common/ftp.ini






╔══════════╣ Analyzing DNS Files (limit 70)
drwxr-sr-x 2 root bind 4096 Jul 26  2023 /etc/bind
drwxr-sr-x 2 root bind 4096 Jul 26  2023 /etc/bind
-rw-r--r-- 1 root root 271 Jun 21  2023 /etc/bind/db.127
-rw-r--r-- 1 root root 2403 Jun 21  2023 /etc/bind/bind.keys
-rw-r----- 1 bind bind 100 Jul 26  2023 /etc/bind/rndc.key
-rw-r--r-- 1 root bind 307 Jul 26  2023 /etc/bind/named.conf.local
-rw-r--r-- 1 root bind 498 Jun 21  2023 /etc/bind/named.conf.default-zones
-rw-r--r-- 1 root bind 458 Jun 21  2023 /etc/bind/named.conf
-rw-r--r-- 1 root root 1317 Jun 21  2023 /etc/bind/zones.rfc1918
-rw-r--r-- 1 root root 270 Jun 21  2023 /etc/bind/db.local
-rw-r--r-- 1 root root 237 Jun 21  2023 /etc/bind/db.255
-rw-r--r-- 1 root root 353 Jun 21  2023 /etc/bind/db.empty
-rw-r--r-- 1 root bind 613 Jul 26  2023 /etc/bind/db.venus.hmv
-rw-r--r-- 1 root bind 219 Jul 26  2023 /etc/bind/named.conf.options
-rw-r--r-- 1 root root 255 Jun 21  2023 /etc/bind/db.0

-rw-r----- 1 bind bind 100 Jul 26  2023 /etc/bind/rndc.key

-rw-r--r-- 1 root bind 307 Jul 26  2023 /etc/bind/named.conf.local
zone "venus.hmv" IN {
      type master;
      file "/etc/bind/db.venus.hmv";
      allow-query { any; };
      allow-transfer { any; };
};
-rw-r--r-- 1 root bind 498 Jun 21  2023 /etc/bind/named.conf.default-zones
zone "." {
  type hint;
  file "/usr/share/dns/root.hints";
};
zone "localhost" {
  type master;
  file "/etc/bind/db.local";
};
zone "127.in-addr.arpa" {
  type master;
  file "/etc/bind/db.127";
};
zone "0.in-addr.arpa" {
  type master;
  file "/etc/bind/db.0";
};
zone "255.in-addr.arpa" {
  type master;
  file "/etc/bind/db.255";
};
-rw-r--r-- 1 root bind 458 Jun 21  2023 /etc/bind/named.conf
include "/etc/bind/named.conf.options";
include "/etc/bind/named.conf.local";
include "/etc/bind/named.conf.default-zones";
-rw-r--r-- 1 root bind 219 Jul 26  2023 /etc/bind/named.conf.options
options {
        directory "/var/cache/bind";
        dnssec-validation auto;
        listen-on port 53 { localhost; };
 version "not currently available";
 recursion no;
 querylog yes;
 allow-transfer { none; };
};

drwxr-xr-x 2 root root 4096 Jul 26  2023 /usr/lib/x86_64-linux-gnu/bind
drwxr-xr-x 2 root root 4096 Jul 26  2023 /usr/lib/x86_64-linux-gnu/bind
-rw-r--r-- 1 root root 22784 Jun 21  2023 /usr/lib/x86_64-linux-gnu/bind/filter-aaaa.so
-rw-r--r-- 1 root root 22784 Jun 21  2023 /usr/lib/x86_64-linux-gnu/bind/filter-a.so
drwxrwxr-x 1 root bind 4096 Feb  4 06:52 /var/cache/bind
drwxrwxr-x 1 root bind 4096 Feb  4 06:52 /var/cache/bind
-rw-r--r-- 1 bind bind 297 Feb  4 06:52 /var/cache/bind/managed-keys.bind
-rw-r--r-- 1 bind bind 3096 Feb  4 06:52 /var/cache/bind/managed-keys.bind.jnl
drwxrwxr-x 2 root bind 4096 Jul 26  2023 /var/lib/bind
drwxrwxr-x 2 root bind 4096 Jul 26  2023 /var/lib/bind

╔══════════╣ Analyzing Interesting logs Files (limit 70)
-rw-r----- 1 www-data adm 11677553 Feb  4 06:58 /var/log/nginx/access.log

-rw-r----- 1 www-data adm 1076 Dec  6 20:11 /var/log/nginx/error.log

╔══════════╣ Analyzing Windows Files (limit 70)
lrwxrwxrwx 1 root root 22 Jul 26  2023 /etc/alternatives/my.cnf -> /etc/mysql/mariadb.cnf
lrwxrwxrwx 1 root root 24 Oct 20  2020 /etc/mysql/my.cnf -> /etc/alternatives/my.cnf
-rw-r--r-- 1 root root 83 Jul 26  2023 /var/lib/dpkg/alternatives/my.cnf



╔══════════╣ Analyzing Other Interesting Files (limit 70)
-rw-r--r-- 1 root root 3526 Apr 23  2023 /etc/skel/.bashrc
-rw-r--r-- 1 hacker hacker 3621 Aug 10 14:17 /pwned/hacker/.bashrc
-rw-r--r-- 1 root root 807 Apr 23  2023 /etc/skel/.profile
-rw-r--r-- 1 hacker hacker 807 Apr 23  2023 /pwned/hacker/.profile

                      ╔════════════════════════════════════╗
══════════════════════╣ Files with Interesting Permissions ╠══════════════════════
                      ╚════════════════════════════════════╝
╔══════════╣ SUID - Check easy privesc, exploits and write perms
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#sudo-and-suid
strace Not Found
-rwsr-xr-x 1 root root 1.4M Jul  2  2023 /usr/sbin/exim4
-rwsr-xr-- 1 root messagebus 51K Jul 11  2023 /usr/lib/dbus-1.0/dbus-daemon-launch-helper
-rwsr-xr-x 1 root root 639K Feb  8  2023 /usr/lib/openssh/ssh-keysign
-rwsr-xr-x 1 root root 48K Mar 23  2023 /usr/bin/newgrp  --->  HP-UX_10.20
-rwsr-xr-x 1 root root 62K Mar 23  2023 /usr/bin/chfn  --->  SuSE_9.3/10
-rwsr-xr-x 1 root root 35K Mar 23  2023 /usr/bin/umount  --->  BSD/Linux(08-1996)
-rwsr-xr-x 1 root root 71K Mar 23  2023 /usr/bin/su
-rwsr-xr-x 1 root root 59K Mar 23  2023 /usr/bin/mount  --->  Apple_Mac_OSX(Lion)_Kernel_xnu-1699.32.7_except_xnu-1699.24.8
-rwsr-xr-x 1 root root 52K Mar 23  2023 /usr/bin/chsh
-rwsr-xr-x 1 root root 87K Mar 23  2023 /usr/bin/gpasswd
-rwsr-xr-x 1 root root 43K Jul 27  2022 /usr/bin/doas
-rwsr-xr-x 1 root root 276K Jun 27  2023 /usr/bin/sudo  --->  check_if_the_sudo_version_is_vulnerable

╔══════════╣ SGID
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#sudo-and-suid
-rwxr-sr-x 1 root shadow 39K Jan  3  2023 /usr/sbin/unix_chkpwd
-rwxr-sr-x 1 root shadow 79K Mar 23  2023 /usr/bin/chage
-rwxr-sr-x 1 root shadow 31K Mar 23  2023 /usr/bin/expiry
-rwxr-sr-x 1 root tty 39K Mar 23  2023 /usr/bin/wall
-rwxr-sr-x 1 root crontab 43K Mar  2  2023 /usr/bin/crontab
-rwxr-sr-x 1 root mail 23K Feb  4  2021 /usr/bin/dotlockfile
-rwxr-sr-x 1 root _ssh 471K Feb  8  2023 /usr/bin/ssh-agent

╔══════════╣ Checking misconfigurations of ld.so
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#ld.so
/etc/ld.so.conf
Content of /etc/ld.so.conf:
include /etc/ld.so.conf.d/*.conf

/etc/ld.so.conf.d
  /etc/ld.so.conf.d/libc.conf
  - /usr/local/lib
  /etc/ld.so.conf.d/x86_64-linux-gnu.conf
  - /usr/local/lib/x86_64-linux-gnu
  - /lib/x86_64-linux-gnu
  - /usr/lib/x86_64-linux-gnu

/etc/ld.so.preload
╔══════════╣ Capabilities
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#capabilities
══╣ Current shell capabilities
CapInh:  0x0000000000000000=
CapPrm:  0x0000000000000000=
CapEff:  0x0000000000000000=
CapBnd:  0x00000000a80425fb=cap_chown,cap_dac_override,cap_fowner,cap_fsetid,cap_kill,cap_setgid,cap_setuid,cap_setpcap,cap_net_bind_service,cap_net_raw,cap_sys_chroot,cap_mknod,cap_audit_write,cap_setfcap
CapAmb:  0x0000000000000000=

══╣ Parent process capabilities
CapInh:  0x0000000000000000=
CapPrm:  0x0000000000000000=
CapEff:  0x0000000000000000=
CapBnd:  0x00000000a80425fb=cap_chown,cap_dac_override,cap_fowner,cap_fsetid,cap_kill,cap_setgid,cap_setuid,cap_setpcap,cap_net_bind_service,cap_net_raw,cap_sys_chroot,cap_mknod,cap_audit_write,cap_setfcap
CapAmb:  0x0000000000000000=


Files with capabilities (limited to 50):

╔══════════╣ Users with capabilities
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#capabilities

╔══════════╣ AppArmor binary profiles
-rw-r--r-- 1 root root  730 May 28  2023 usr.sbin.mariadbd
-rw-r--r-- 1 root root 2654 Jun 21  2023 usr.sbin.named

╔══════════╣ Files with ACLs (limited to 50)
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#acls
files with acls in searched folders Not Found

╔══════════╣ Files (scripts) in /etc/profile.d/
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#profiles-files
total 20
drwxr-xr-x 1 root root 4096 Jul 26  2023 .
drwxr-xr-x 1 root root 4096 Jul 26  2023 ..
-rw-r--r-- 1 root root 1107 Feb 19  2023 gawk.csh
-rw-r--r-- 1 root root  757 Feb 19  2023 gawk.sh

╔══════════╣ Permissions in init, init.d, systemd, and rc.d
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#init-init-d-systemd-and-rc-d

═╣ Hashes inside passwd file? ........... No
═╣ Writable passwd file? ................ No
═╣ Credentials in fstab/mtab? ........... No
═╣ Can I read shadow files? ............. No
═╣ Can I read shadow plists? ............ No
═╣ Can I write shadow plists? ........... No
═╣ Can I read opasswd file? ............. No
═╣ Can I write in network-scripts? ...... No
═╣ Can I read root folder? .............. No

╔══════════╣ Searching root files in home dirs (limit 30)
/home/
/root/
/var/www
/var/www/htm
/var/www/html
/var/www/html/index.nginx-debian.html
/pwned/violin
/pwned/executor
/pwned/sophia
/pwned/angela
/pwned/emma
/pwned/mia
/pwned/camila
/pwned/luna
/pwned/eleanor
/pwned/victoria
/pwned/isla
/pwned/violet
/pwned/lucy
/pwned/elena
/pwned/alice
/pwned/anna
/pwned/natalia
/pwned/eva
/pwned/clara
/pwned/frida
/pwned/eliza
/pwned/iris
/pwned/eloise
/pwned/lucia

╔══════════╣ Searching folders owned by me containing others files on it (limit 100)

╔══════════╣ Readable files belonging to root and readable by me but not world readable
-rw-r----- 1 root hacker 16 Jul 26  2023 /pwned/hacker/.myhiddenpazz
-rw-r----- 1 root hacker 2542 Jul 26  2023 /pwned/hacker/readme.txt
-rw-r----- 1 root hacker 287 Jul 26  2023 /pwned/hacker/mission.txt
-rw-r----- 1 root hacker 31 Jul 26  2023 /pwned/hacker/...

╔══════════╣ Interesting writable files owned by me or writable by everyone (not in Home) (max 500)
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#writable-files
/dev/mqueue
/dev/shm
/run/lock
/tmp
/var/lib/php/sessions
/var/tmp
/var/tmp/"
/var/tmp/"/libc.so.6
/var/tmp/base64
/var/tmp/cat
/var/tmp/exp
/var/tmp/exp2
/var/tmp/exp_dir
#)You_can_write_even_more_files_inside_last_directory

╔══════════╣ Interesting GROUP writable files (not in Home) (max 500)
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#writable-files



                            ╔═════════════════════════╗
════════════════════════════╣ Other Interesting Files ╠════════════════════════════
                            ╚═════════════════════════╝
╔══════════╣ .sh files in path
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#script-binaries-in-path

╔══════════╣ Executable files potentially added by user (limit 70)
2024-02-04+07:48:51.8179416270 /var/tmp/linpeas.sh
2024-01-17+00:41:00.5264282130 /var/tmp/whoami
2024-01-17+00:39:13.5356346860 /var/tmp/cat
2024-01-17+00:12:50.9814558970 /var/tmp/raj.sh
2024-01-16+23:55:08.0734686580 /var/tmp/exploitremolon2
2024-01-16+23:49:12.8374488210 /var/tmp/exploitremolon
2023-11-23+16:33:58.9479777210 /var/tmp/"/libc.so.6
2023-11-23+16:32:23.9250464940 /var/tmp/exp
2023-10-13+17:07:52.2011487830 /var/tmp/my8.out
2023-10-13+17:05:36.7306498570 /var/tmp/my7.out
2023-10-13+16:55:27.9173945800 /var/tmp/my3.out
2023-10-13+16:50:54.4364231230 /var/tmp/my2.out
2023-10-13+16:50:28.3087123900 /var/tmp/my.out
2023-10-01+16:42:37.2110016990 /var/tmp/exp2
2023-10-01+16:40:25.6281283250 /var/tmp/exp1
2023-07-26+09:01:43.8029532840 /.dockerenv

╔══════════╣ Unexpected in /opt (usually empty)
total 12
drwxr-xr-x 1 root root 4096 Jul 26  2023 .
drwxr-xr-x 1 root root 4096 Jul 26  2023 ..
drwxr-xr-x 2 root root 4096 Jul 26  2023 hereiam

╔══════════╣ Unexpected in root
/pwned
/www
/free
/.dockerenv

╔══════════╣ Modified interesting files in the last 5mins (limit 100)
/var/mail/mail


╔══════════╣ Files inside /pwned/hacker (limit 20)
total 44
drwxr-x--- 1 root   hacker 4096 Jul 26  2023 .
drwxr-xr-x 1 root   root   4096 Jul 26  2023 ..
-rw-r----- 1 root   hacker   31 Jul 26  2023 ...
-rw-r--r-- 1 hacker hacker  220 Apr 23  2023 .bash_logout
-rw-r--r-- 1 hacker hacker 3621 Aug 10 14:17 .bashrc
-rw-r----- 1 root   hacker   16 Jul 26  2023 .myhiddenpazz
-rw-r--r-- 1 hacker hacker  807 Apr 23  2023 .profile
-rw-r----- 1 root   hacker  287 Jul 26  2023 mission.txt
-rw-r----- 1 root   hacker 2542 Jul 26  2023 readme.txt

╔══════════╣ Files inside others home (limit 20)
/var/www/htm/index.html
/var/www/html/key.php
/var/www/html/cebolla.html
/var/www/html/index.nginx-debian.html
/var/www/html/index.html
/var/www/html/waiting.php
/var/www/html/method.php

╔══════════╣ Searching installed mail applications
exim
sendmail

╔══════════╣ Mails (limit 50)
   934796    664 -rw-------   1 mail     mail       675480 Feb  4 07:49 /var/mail/mail
   934796    664 -rw-------   1 mail     mail       675480 Feb  4 07:49 /var/spool/mail/mail

╔══════════╣ Backup files (limited 100)
-rwxr-xr-x 1 root root 2569 May 11  2023 /usr/libexec/dpkg/dpkg-db-backup
-rw-r--r-- 1 root root 138 Mar 27  2023 /usr/lib/systemd/system/dpkg-db-backup.timer
-rw-r--r-- 1 root root 147 Mar 27  2023 /usr/lib/systemd/system/dpkg-db-backup.service
-rw-r--r-- 1 root root 355 May 28  2023 /usr/share/man/man1/wsrep_sst_backup.1.gz
-rw-r--r-- 1 root root 346 May 28  2023 /usr/share/man/man1/wsrep_sst_mariabackup.1.gz
-rw-r--r-- 1 root root 12741 Jan 28  2018 /usr/share/doc/exim4-base/changelog.Debian.old.gz
-rwxr-xr-x 1 root root 52256 May 28  2023 /usr/bin/wsrep_sst_mariabackup
-rwxr-xr-x 1 root root 3025 May 28  2023 /usr/bin/wsrep_sst_backup
-rw-r--r-- 1 root root 61 Jul  3  2023 /var/lib/systemd/deb-systemd-helper-enabled/dpkg-db-backup.timer.dsh-also
-rw-r--r-- 1 root root 0 Jul  3  2023 /var/lib/systemd/deb-systemd-helper-enabled/timers.target.wants/dpkg-db-backup.timer


╔══════════╣ Web files?(output limit)
/var/www/:
total 20K
drwxr-xr-x 4 root root 4.0K Jul 26  2023 .
drwxr-xr-x 1 root root 4.0K Jul 26  2023 ..
drwxr-xr-x 2 root root 4.0K Jul 26  2023 htm
drwxr-xr-x 2 root root 4.0K Jul 26  2023 html

/var/www/htm:
total 12K
drwxr-xr-x 2 root     root     4.0K Jul 26  2023 .

╔══════════╣ All relevant hidden files (not in /sys/ or the ones listed in the previous check) (limit 70)
-rw-r----- 1 root hidden 16 Jul 26  2023 /usr/src/.karl-a
-rw-r--r-- 1 root root 16 Jul 26  2023 /opt/hereiam/.here
-rwx------ 1 sophia sophia 35592 Oct 13 17:18 /var/tmp/.aclpmrth
-rw------- 1 root root 0 Jul  3  2023 /etc/.pwd.lock
-rw-r--r-- 1 root root 220 Apr 23  2023 /etc/skel/.bash_logout
-rw-r--r-- 1 hacker hacker 220 Apr 23  2023 /pwned/hacker/.bash_logout
-rw-r----- 1 root hacker 16 Jul 26  2023 /pwned/hacker/.myhiddenpazz
-rw-r----- 1 root hacker 31 Jul 26  2023 /pwned/hacker/...

╔══════════╣ Readable files inside /tmp, /var/tmp, /private/tmp, /private/var/at/tmp, /private/var/tmp, and backup folders (limit 70)
-rwxr-xr-x 1 hacker hacker 853290 Feb  4 07:48 /var/tmp/linpeas.sh
-rwxr-xr-x 1 hacker hacker 16880 Jan 16 23:49 /var/tmp/exploitremolon
-rwxr-xr-x 1 sophia sophia 17280 Oct 13 16:55 /var/tmp/my3.out
-rwxr-xr-x 1 hacker hacker 17288 Jan 16 23:55 /var/tmp/exploitremolon2
-rw-r--r-- 1 irene irene 16 Jan 27 16:35 /var/tmp/decrypted.txt
-rw-r--r-- 1 ava ava 643 Jan 12 05:59 /var/tmp/n3pruebas/lista
-rwxrwxrwx 1 maria maria 8 Jan 17 00:12 /var/tmp/raj.sh
-rwxr-xr-x 1 maria maria 125640 Jan 17 00:41 /var/tmp/whoami
-rw-r--r-- 1 freya freya 0 Aug  7 23:53 /var/tmp/passfre
-rw-r--r-- 1 victoria victoria 16 Jul 26  2023 /var/tmp/k/pwned/victoria/passw0rd.txt
-rw-r--r-- 1 celeste celeste 811 Nov  4 16:09 /var/tmp/people.sql
-rwxr-xr-x 1 sophia sophia 16704 Oct 13 17:07 /var/tmp/my8.out
-rwxr-xr-x 1 hacker hacker 16648 Nov 23 16:32 /var/tmp/exp
-rwxr-xr-x 1 sophia sophia 17280 Oct 13 16:50 /var/tmp/my2.out
-rwxrwxrwx 1 maria maria 125640 Jan 17 00:39 /var/tmp/cat
-rw-r--r-- 1 noa noa 4779 Aug  3  2023 /var/tmp/trashs.txt
-rw-r--r-- 1 iris iris 12941 Jan 29 21:46 /var/tmp/pass.txt
-rw-r--r-- 1 celeste celeste 0 Jan 12 08:30 /var/tmp/asdasd.log
-rwxr-xr-x 1 hacker hacker 1926256 Nov 23 16:33 '/var/tmp/"/libc.so.6'
-rw-r--r-- 1 hacker hacker 1926256 Nov 23 16:32 /var/tmp/libc.so.6
-rw-r--r-- 1 lana lana 16 Jul 26  2023 /var/tmp/pwned/lana/zip
-rw-r--r-- 1 maria maria 0 Feb  3 16:02 /var/tmp/exp_dir/data
-rw-r--r-- 1 maria maria 0 Feb  3 16:02 /var/tmp/exp_dir/data2
-rw-r--r-- 1 eloise eloise 69 Jan 29 22:26 /var/tmp/bruh.txt
-rwxr-xr-x 1 sophia sophia 17280 Oct 13 16:50 /var/tmp/my.out
-rwxr-xr-x 1 maria maria 37136 Oct  1 16:40 /var/tmp/exp1

╔══════════╣ Searching passwords in history files
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:<li>Changed handling of escaped characters in #[CSTR] lines of -@ argfile
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:<li>Fixed shared-write permission problem with -@ argfile when using -stay_open
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:    with the -sep option when using the advanced-formatting "@" feature
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:<li>Added "#[CSTR]" feature to -@ argfile
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:<li>Documented new advanced-formatting "@" feature which has existed since
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:<li>Patched tests to avoid failures with Perl 5.25.11 due to missing "." in @INC
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:    treatment of @ARGV elements
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:<li>Minor change to parsing of -@ argfile (comment lines may may no longer have
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:<li>No longer trim trailing spaces from arguments in -@ argfiles
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:<li>Added -password option for processing password-protected PDF documents
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:    <li>Added <a href="ExifTool.html#Password">Password option</a>
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:<li>Improved -@ option to allow a UTF-8 BOM at the start of the input file
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:<li>Changed -@ to insert arguments at the current position in the command line
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:<li>Fixed bug introduced in 5.99 which broke the "-tagsFromFile @" feature
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:<li>Fixed problem which generated warnings about symbol "@indent" in Nikon.pm
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:    expanded beyond its "Image" roots!)
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:<li>Assume '-TagsFromFile @' for any redirected tags (eg. '-SRCTAG&gt;DSTTAG' or
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:<li>Ignore white space around '=' sign of arguments in '-@' file
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:<li>Fixed problem with new '-tagsFromFile @' feature which occurred when
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:<li>Allow target file to be specified by '@' with -TagsFromFile option
/usr/share/doc/libimage-exiftool-perl/html/ancient_history.html:<li>Added -@ option and two utility files (iptc2xmp.args and xmp2iptc.args) to

╔══════════╣ Searching *password* or *credential* files in home (limit 70)
/etc/bind/rndc.key
/etc/pam.d/common-password
/usr/bin/systemd-ask-password
/usr/bin/systemd-tty-ask-password-agent
/usr/lib/mysql/plugin/password_reuse_check.so
/usr/lib/mysql/plugin/simple_password_check.so
/usr/lib/systemd/system/multi-user.target.wants/systemd-ask-password-wall.path
/usr/lib/systemd/system/sysinit.target.wants/systemd-ask-password-console.path
/usr/lib/systemd/system/systemd-ask-password-console.path
/usr/lib/systemd/system/systemd-ask-password-console.service
/usr/lib/systemd/system/systemd-ask-password-wall.path
/usr/lib/systemd/system/systemd-ask-password-wall.service
  #)There are more creds/passwds files in the previous parent folder

/usr/lib/x86_64-linux-gnu/libmariadb3/plugin/caching_sha2_password.so
/usr/lib/x86_64-linux-gnu/libmariadb3/plugin/mysql_clear_password.so
/usr/lib/x86_64-linux-gnu/libmariadb3/plugin/sha256_password.so
/usr/share/dns/root.key
/usr/share/man/man1/systemd-ask-password.1.gz
/usr/share/man/man1/systemd-tty-ask-password-agent.1.gz
/usr/share/man/man7/systemd.system-credentials.7.gz
/usr/share/man/man8/systemd-ask-password-console.path.8.gz
/usr/share/man/man8/systemd-ask-password-console.service.8.gz
/usr/share/man/man8/systemd-ask-password-wall.path.8.gz
/usr/share/man/man8/systemd-ask-password-wall.service.8.gz
  #)There are more creds/passwds files in the previous parent folder

/usr/share/pam/common-password.md5sums
/var/cache/debconf/passwords.dat
/var/lib/pam/password

```
