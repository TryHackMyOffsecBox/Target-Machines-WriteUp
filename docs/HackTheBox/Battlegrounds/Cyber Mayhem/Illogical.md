# Illogical

## 信息收集

```bash
Detected ss and lsof, executing related commands...
Port: 38801, PID: Not found
—> Command: Not available
Port: 22, PID: 959
—> Command: sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups 
Port: 48567, PID: 963
—> Command: /usr/sbin/rpc.mountd --manage-gids 
Port: 56633, PID: 963
—> Command: /usr/sbin/rpc.mountd --manage-gids 
Port: 2049, PID: Not found
—> Command: Not available
Port: 46215, PID: 963
—> Command: /usr/sbin/rpc.mountd --manage-gids 
Port: 18443, PID: 1015
—> Command: /opt/bitcoin-0.21.0/bin/bitcoind -pid=/run/bitcoind/bitcoind.pid -conf=/etc/bitcoin/bitcoin.conf -datadir=/var/lib/bitcoind 
Port: 18444, PID: 1015
—> Command: /opt/bitcoin-0.21.0/bin/bitcoind -pid=/run/bitcoind/bitcoind.pid -conf=/etc/bitcoin/bitcoin.conf -datadir=/var/lib/bitcoind 
Port: 18445, PID: 1015
—> Command: /opt/bitcoin-0.21.0/bin/bitcoind -pid=/run/bitcoind/bitcoind.pid -conf=/etc/bitcoin/bitcoin.conf -datadir=/var/lib/bitcoind 
Port: 111, PID: 1
—> Command: /sbin/init maybe-ubiquity 

## ———————————————————————————— ##

Nginx is not installed.

## ———————————————————————————— ##

Apache is not installed.

## ———————————————————————————— ##

Checking /etc/sudoers (active configurations only):
  Defaults      env_reset
  Defaults      mail_badpass
  Defaults      secure_path="/opt/bitcoin-0.21.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"
  root  ALL=(ALL:ALL) ALL
  valentine     ALL=(ALL:ALL) NOPASSWD:ALL
  %lvm    ALL=(ALL:ALL) NOPASSWD:/usr/sbin/lvmdump
———
Finding SUID files:
/snap/snapd/14295/usr/lib/snapd/snap-confine
/snap/snapd/14549/usr/lib/snapd/snap-confine
/snap/core18/2284/bin/mount
/snap/core18/2284/bin/ping
/snap/core18/2284/bin/su
/snap/core18/2284/bin/umount
/snap/core18/2284/usr/bin/chfn
/snap/core18/2284/usr/bin/chsh
/snap/core18/2284/usr/bin/gpasswd
/snap/core18/2284/usr/bin/newgrp
/snap/core18/2284/usr/bin/passwd
/snap/core18/2284/usr/bin/sudo
/snap/core18/2284/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core18/2284/usr/lib/openssh/ssh-keysign
/snap/core18/1705/bin/mount
/snap/core18/1705/bin/ping
/snap/core18/1705/bin/su
/snap/core18/1705/bin/umount
/snap/core18/1705/usr/bin/chfn
/snap/core18/1705/usr/bin/chsh
/snap/core18/1705/usr/bin/gpasswd
/snap/core18/1705/usr/bin/newgrp
/snap/core18/1705/usr/bin/passwd
/snap/core18/1705/usr/bin/sudo
/snap/core18/1705/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core18/1705/usr/lib/openssh/ssh-keysign
/snap/core20/1328/usr/bin/chfn
/snap/core20/1328/usr/bin/chsh
/snap/core20/1328/usr/bin/gpasswd
/snap/core20/1328/usr/bin/mount
/snap/core20/1328/usr/bin/newgrp
/snap/core20/1328/usr/bin/passwd
/snap/core20/1328/usr/bin/su
/snap/core20/1328/usr/bin/sudo
/snap/core20/1328/usr/bin/umount
/snap/core20/1328/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core20/1328/usr/lib/openssh/ssh-keysign
/snap/core20/1270/usr/bin/chfn
/snap/core20/1270/usr/bin/chsh
/snap/core20/1270/usr/bin/gpasswd
/snap/core20/1270/usr/bin/mount
/snap/core20/1270/usr/bin/newgrp
/snap/core20/1270/usr/bin/passwd
/snap/core20/1270/usr/bin/su
/snap/core20/1270/usr/bin/sudo
/snap/core20/1270/usr/bin/umount
/snap/core20/1270/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core20/1270/usr/lib/openssh/ssh-keysign
/usr/sbin/lvm
/usr/sbin/mount.nfs
/usr/lib/policykit-1/polkit-agent-helper-1
/usr/lib/snapd/snap-confine
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/openssh/ssh-keysign
/usr/lib/eject/dmcrypt-get-device
/usr/bin/chsh
/usr/bin/chfn
/usr/bin/passwd
/usr/bin/gpasswd
/usr/bin/umount
/usr/bin/fusermount
/usr/bin/pkexec
/usr/bin/su
/usr/bin/at
/usr/bin/newgrp
/usr/bin/mount
/usr/bin/sudo
———
Finding files with special capabilities:
  /snap/core20/1328/usr/bin/ping = cap_net_raw+ep
  /snap/core20/1270/usr/bin/ping = cap_net_raw+ep
  /usr/lib/x86_64-linux-gnu/gstreamer1.0/gstreamer-1.0/gst-ptp-helper = cap_net_bind_service,cap_net_admin+ep
  /usr/bin/mtr-packet = cap_net_raw+ep
  /usr/bin/ping = cap_net_raw+ep
  /usr/bin/traceroute6.iputils = cap_net_raw+ep
———
No nginx or apache2 process is running.
```

## bitcoin 配置文件

```plaintext title="/etc/bitcoin/bitcoin.conf"
rpcuser=bitcoin
rpcpassword=b1tc01n
regtest=1
daemon=1

[regtest]
rpcallowip=0.0.0.0/0
rpcbind=0.0.0.0
```

## nfs 挂载
