# Panel

## 信息收集

```bash
Detected ss and lsof, executing related commands...
Port: 8000, PID: 906
—> Command: php -S 0.0.0.0:8000 -t public 
Port: 33060, PID: 994
—> Command: /usr/sbin/mysqld 
Port: 3306, PID: 994
—> Command: /usr/sbin/mysqld 
Port: 8080, PID: 1374
—> Command: python3 logontracer.py -r -o 8080 -u neo4j -p neo4j -s 0.0.0.0 
Port: 40181, PID: 836
—> Command: /usr/bin/containerd 
Port: 53, PID: 649
—> Command: /lib/systemd/systemd-resolved 
Port: 22, PID: 904
—> Command: sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups 

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
  kim   ALL=(ALL) NOPASSWD: /usr/bin/cmp /root/panel/release/bins/*
  kim   ALL=(ALL) NOPASSWD: /usr/bin/ctr
  %admin ALL=(ALL) ALL
  %sudo ALL=(ALL:ALL) ALL
———
Finding SUID files:
/snap/snapd/12883/usr/lib/snapd/snap-confine
/snap/snapd/13270/usr/lib/snapd/snap-confine
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
/snap/core20/1169/usr/bin/chfn
/snap/core20/1169/usr/bin/chsh
/snap/core20/1169/usr/bin/gpasswd
/snap/core20/1169/usr/bin/mount
/snap/core20/1169/usr/bin/newgrp
/snap/core20/1169/usr/bin/passwd
/snap/core20/1169/usr/bin/su
/snap/core20/1169/usr/bin/sudo
/snap/core20/1169/usr/bin/umount
/snap/core20/1169/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core20/1169/usr/lib/openssh/ssh-keysign
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
  /snap/core20/1169/usr/bin/ping = cap_net_raw+ep
  /usr/lib/x86_64-linux-gnu/gstreamer1.0/gstreamer-1.0/gst-ptp-helper = cap_net_bind_service,cap_net_admin+ep
  /usr/bin/ping = cap_net_raw+ep
  /usr/bin/mtr-packet = cap_net_raw+ep
  /usr/bin/traceroute6.iputils = cap_net_raw+ep
———
```
