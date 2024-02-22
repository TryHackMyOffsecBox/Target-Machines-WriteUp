# Pickle

:::note

[Linux VM] [Tested on VirtualBox] created by || 0xEEX75

⏲️ Release Date // 2020-10-22

✔️ MD5 // b686ceacc5e04131dcb895e19f2de9d4

☠ Root // 31

💀 User // 29

📝Notes //
Contact me if you need any help. @OldProgrammer#1257.

:::

## 靶机启动

靶机IP

```plaintext
192.168.56.118
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.118
Host is up (0.00052s latency).
Not shown: 65533 closed tcp ports (reset)
PORT     STATE SERVICE VERSION
21/tcp   open  ftp     vsftpd 3.0.3
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to ::ffff:192.168.56.102
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 1
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_-rwxr-xr-x    1 0        0            1306 Oct 12  2020 init.py.bak
1337/tcp open  http    Werkzeug httpd 1.0.1 (Python 2.7.16)
| http-auth: 
| HTTP/1.0 401 UNAUTHORIZED\x0D
|_  Basic realm=Pickle login
|_http-server-header: Werkzeug/1.0.1 Python/2.7.16
|_http-title: Site doesn't have a title (text/html; charset=utf-8).
```

## ftp 匿名登陆

```shell
ftp> ls -lah
229 Entering Extended Passive Mode (|||33958|)
150 Here comes the directory listing.
drwxr-xr-x    2 0        0            4096 Oct 12  2020 .
drwxr-xr-x    2 0        0            4096 Oct 12  2020 ..
-rwxr-xr-x    1 0        0            1306 Oct 12  2020 init.py.bak
```

下载下来进行分析

```python
from functools import wraps
from flask import *
import hashlib
import socket
import base64
import pickle
import hmac

app = Flask(__name__, template_folder="templates", static_folder="/opt/project/static/")

@app.route('/', methods=["GET", "POST"])
def index_page():
        '''
                __index_page__()
        '''
        if request.method == "POST" and request.form["story"] and request.form["submit"]:
                md5_encode = hashlib.md5(request.form["story"]).hexdigest()
                paths_page  = "/opt/project/uploads/%s.log" %(md5_encode)
                write_page = open(paths_page, "w")
                write_page.write(request.form["story"])

                return "The message was sent successfully!"

        return render_template("index.html")

@app.route('/reset', methods=["GET", "POST"])
def reset_page():
        '''
                __reset_page__()
        '''
        pass


@app.route('/checklist', methods=["GET", "POST"])
def check_page():
        '''
                __check_page__()
        '''
        if request.method == "POST" and request.form["check"]:
                path_page    = "/opt/project/uploads/%s.log" %(request.form["check"])
                open_page    = open(path_page, "rb").read()
                if "p1" in open_page:
                        open_page = pickle.loads(open_page)
                        return str(open_page)
                else:
                        return open_page
        else:
                return "Server Error!"

        return render_template("checklist.html")

if __name__ == '__main__':
        app.run(host='0.0.0.0', port=1337, debug=True)
```

## snmp 服务探测

```shell
┌─[randark@parrot]─[~/tmp]
└──╼ $ snmpwalk -c public -v 1 192.168.56.118 | head -n 15
iso.3.6.1.2.1.1.1.0 = STRING: "Linux pickle 4.19.0-11-amd64 #1 SMP Debian 4.19.146-1 (2020-09-17) x86_64"
iso.3.6.1.2.1.1.2.0 = OID: iso.3.6.1.4.1.8072.3.2.10
iso.3.6.1.2.1.1.3.0 = Timeticks: (2074634) 5:45:46.34
iso.3.6.1.2.1.1.4.0 = STRING: "lucas:SuperSecretPassword123!"
iso.3.6.1.2.1.1.5.0 = STRING: "pickle"
iso.3.6.1.2.1.1.6.0 = STRING: "Sitting on the Dock of the Bay"
iso.3.6.1.2.1.1.7.0 = INTEGER: 72
iso.3.6.1.2.1.1.8.0 = Timeticks: (6) 0:00:00.06
iso.3.6.1.2.1.1.9.1.2.1 = OID: iso.3.6.1.6.3.11.3.1.1
iso.3.6.1.2.1.1.9.1.2.2 = OID: iso.3.6.1.6.3.15.2.1.1
iso.3.6.1.2.1.1.9.1.2.3 = OID: iso.3.6.1.6.3.10.3.1.1
iso.3.6.1.2.1.1.9.1.2.4 = OID: iso.3.6.1.6.3.1
iso.3.6.1.2.1.1.9.1.2.5 = OID: iso.3.6.1.6.3.16.2.2.1
iso.3.6.1.2.1.1.9.1.2.6 = OID: iso.3.6.1.2.1.49
iso.3.6.1.2.1.1.9.1.2.7 = OID: iso.3.6.1.2.1.4
```

在其中得到一组凭据

```plaintext
lucas:SuperSecretPassword123!
```
