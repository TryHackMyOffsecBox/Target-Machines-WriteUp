# Circus

## 信息收集

```bash
Detected ss and lsof, executing related commands...
Port: 22, PID: 727
—> Command: sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups 
Port: 33060, PID: 815
—> Command: /usr/sbin/mysqld 
Port: 3306, PID: 815
—> Command: /usr/sbin/mysqld 
Port: 53, PID: 563
—> Command: /lib/systemd/systemd-resolved 

## ———————————————————————————— ##

Nginx is not installed.

## ———————————————————————————— ##

Detected apache, analyzing its configuration...
File: /etc/apache2/sites-enabled/mybb.conf
DocumentRoot: /var/www/mybb
Hosts:
10.10.110.101 circus.htb
10.10.110.101 www.circus.htb
———

Unique Hosts:

10.10.110.101 circus.htb
10.10.110.101 www.circus.htb

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
/opt/cleaner
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/eject/dmcrypt-get-device
/usr/lib/policykit-1/polkit-agent-helper-1
/usr/lib/openssh/ssh-keysign
/usr/bin/mount
/usr/bin/sudo
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
  /usr/lib/x86_64-linux-gnu/gstreamer1.0/gstreamer-1.0/gst-ptp-helper = cap_net_bind_service,cap_net_admin+ep
  /usr/bin/ping = cap_net_raw+ep
  /usr/bin/python2.7 = cap_setfcap+eip
  /usr/bin/mtr-packet = cap_net_raw+ep
  /usr/bin/traceroute6.iputils = cap_net_raw+ep
———
```

## Port 8080 dev vhost

```php title="/var/www/dev/db.php"
<?php

function OpenCon(){
        $dbhost = "localhost";
        $dbuser = "web_data";
        $dbpass = "UncrackablePassword123!";
        $db = "dev_data";

        $conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);
        return $conn;
}

function CloseCon($conn){
        $conn -> close();
}

?>
```

```php title="/var/www/dev/index.php"
<?php
include 'db.php';
$db = OpenCon();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

  $stmt = $db->prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
  $stmt->bind_param('sss', $_POST['name'], $_POST['email'], $_POST['password']);

  // Execute the insert statement
  $stmt->execute();

  // Redirect the user to the login page
  header('Location: login.php');
  exit;
}

?>
```

sql 查询用了预编译，没啥攻击的可能性

## Port 80 MyBB
