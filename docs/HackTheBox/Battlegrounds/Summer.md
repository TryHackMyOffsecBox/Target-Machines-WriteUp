# Summer

## 信息收集

```bash
Detected ss and lsof, executing related commands...
Port: 53, PID: 574
—> Command: /lib/systemd/systemd-resolved 
Port: 22, PID: 821
—> Command: sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups 
Port: 25, PID: 1077
—> Command: /usr/lib/postfix/sbin/master -w 
Port: 1337, PID: 820
—> Command: /usr/bin/socat TCP-LISTEN:1337,reuseaddr,fork EXEC:/home/mats/jailor/jail.py 
Port: 5000, PID: 1228
—> Command: /usr/bin/python3 /home/mats/summer-software/main.py 

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
———
Finding SUID files:
/usr/lib/snapd/snap-confine
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/openssh/ssh-keysign
/usr/lib/policykit-1/polkit-agent-helper-1
/usr/lib/eject/dmcrypt-get-device
/usr/bin/mount
/usr/bin/umount
/usr/bin/chfn
/usr/bin/pkexec
/usr/bin/passwd
/usr/bin/fusermount
/usr/bin/ed
/usr/bin/newgrp
/usr/bin/sudo
/usr/bin/gpasswd
/usr/bin/nice
/usr/bin/chsh
/usr/bin/at
/usr/bin/su
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
/snap/core18/2253/bin/mount
/snap/core18/2253/bin/ping
/snap/core18/2253/bin/su
/snap/core18/2253/bin/umount
/snap/core18/2253/usr/bin/chfn
/snap/core18/2253/usr/bin/chsh
/snap/core18/2253/usr/bin/gpasswd
/snap/core18/2253/usr/bin/newgrp
/snap/core18/2253/usr/bin/passwd
/snap/core18/2253/usr/bin/sudo
/snap/core18/2253/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core18/2253/usr/lib/openssh/ssh-keysign
/snap/snapd/14295/usr/lib/snapd/snap-confine
/snap/snapd/14549/usr/lib/snapd/snap-confine
———
Finding files with special capabilities:
  /usr/lib/x86_64-linux-gnu/gstreamer1.0/gstreamer-1.0/gst-ptp-helper = cap_net_bind_service,cap_net_admin+ep
  /usr/bin/ping = cap_net_raw+ep
  /usr/bin/traceroute6.iputils = cap_net_raw+ep
  /usr/bin/ed = cap_setuid+ep
  /usr/bin/mtr-packet = cap_net_raw+ep
  /snap/core20/1328/usr/bin/ping = cap_net_raw+ep
  /snap/core20/1270/usr/bin/ping = cap_net_raw+ep
```

## Port 5000 Python Server

```python title="/home/mats/summer-software/main.py"
#!/usr/bin/python3
from app.app import app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

```python title="util.py"
import subprocess

def get_date(fmt):
    proc = subprocess.Popen('date -d "14 FEB 2023" "+{}"'.format(fmt), shell=True, stdout=subprocess.PIPE)
    out = proc.stdout.read().decode('utf-8')
    return out
```

```python title="./blueprints/routes.py"
from flask import render_template, request, current_app, Blueprint, url_for, render_template_string, redirect
from app.util import get_date


web = Blueprint('web', __name__)

@web.route('/')
def index():
    return render_template('index.html')

@web.route('/release', methods=['GET'])
def time():
    if request.args.get('format'):
        fmt = request.args.get('format')
        date = get_date(fmt)
        return render_template('date.html',date=date)
    else:
        return redirect("/release?format=%25d%20%25h%20%25Y", code=302)
```

```python title="./app/app.py"
from flask import Flask
from app.blueprints.routes import web
from sassutils.wsgi import SassMiddleware

app = Flask(__name__)
app.wsgi_app = SassMiddleware(app.wsgi_app, { 'app': ('static/scss', 'static/css', '/static/css')})

app.config['SECRET_KEY'] = 'R3d_p4ndaz_ru1e$%#$%'
app.register_blueprint(web, url_prefix='/')
@app.errorhandler(Exception)
def handle_error(error):
    message = error.description if hasattr(error, 'description') else [str(x) for x in error.args]
    response = {
        'error': {
            'type': error.__class__.__name__,
            'message': message
        }
    }

    return response, error.code if hasattr(error, 'code') else 500
```

兔子洞，这边控制 fmt 变量的值没有意义，不能实现 SSTI 和 RCE

## Port 1337 Pyjail
