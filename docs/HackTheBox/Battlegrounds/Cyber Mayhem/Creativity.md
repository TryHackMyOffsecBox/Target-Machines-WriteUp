# Creativity

## 信息收集

```bash
Detected ss and lsof, executing related commands...
Port: 3306, PID: 856
—> Command: /usr/sbin/mysqld 
Port: 6379, PID: 737
—> Command: /usr/bin/redis-server 127.0.0.1:6379        
Port: 53, PID: 562
—> Command: /lib/systemd/systemd-resolved 
Port: 22, PID: 752
—> Command: sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups 
Port: 4822, PID: 742
—> Command: /usr/local/sbin/guacd -p /var/run/guacd.pid 
Port: 5432, PID: 857
—> Command: /usr/lib/postgresql/12/bin/postgres -D /var/lib/postgresql/12/main -c config_file=/etc/postgresql/12/main/postgresql.conf 
Port: 33060, PID: 856
—> Command: /usr/sbin/mysqld 

## ———————————————————————————— ##

Nginx is not installed.

## ———————————————————————————— ##

Detected apache, analyzing its configuration...
Device "eth0" does not exist.
File: /etc/apache2/sites-enabled/000-default.conf
DocumentRoot: /var/www/html
Hosts:
 creativity.htb
 fuel.creativity.htb
 creativity.htb
 fuel.creativity.htb
———

Unique Hosts:

 creativity.htb
 fuel.creativity.htb

## ———————————————————————————— ##

Checking /etc/sudoers (active configurations only):
  Defaults      env_reset
  Defaults      mail_badpass
  Defaults      secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"
  root  ALL=(ALL:ALL) ALL
  %admin ALL=(ALL) ALL
  %sudo ALL=(ALL:ALL) ALL
———
Finding SUID files:
  root  ALL=(ALL:ALL) ALL
  %admin ALL=(ALL) ALL
  %sudo ALL=(ALL:ALL) ALL
———
Finding files with special capabilities:
  /usr/lib/x86_64-linux-gnu/gstreamer1.0/gstreamer-1.0/gst-ptp-helper = cap_net_bind_service,cap_net_admin+ep
  /usr/bin/ping = cap_net_raw+ep
  /usr/bin/mtr-packet = cap_net_raw+ep
  /usr/bin/traceroute6.iputils = cap_net_raw+ep
———
```

## creativity.htb

![img](img/image_20250416-191659.png)

## fuel.creativity.htb

![img](img/image_20250417-191708.png)

```plaintext
Fuel CMS Version 1.4
```

[Fuel CMS 1.4.1 - Remote Code Execution](https://www.exploit-db.com/exploits/50477)

## Port 8009

```plaintext
/opt/tomcat/bin/bootstrap.jar
```
