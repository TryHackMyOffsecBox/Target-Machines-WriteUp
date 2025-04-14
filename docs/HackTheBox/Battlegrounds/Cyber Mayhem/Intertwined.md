# Intertwined

## 信息收集

```bash
Detected ss and lsof, executing related commands...
Port: 53, PID: 586
—> Command: /lib/systemd/systemd-resolved 
Port: 22, PID: 805
—> Command: sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups 
Port: 27017, PID: 750
—> Command: /usr/bin/mongod --config /etc/mongod.conf 
Port: 8080, PID: 1060
—> Command: node index.js 
Port: 10000, PID: 879
—> Command: /usr/bin/perl /usr/share/webmin/miniserv.pl /etc/webmin/miniserv.conf 

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
———
Finding SUID files:
/snap/snapd/17883/usr/lib/snapd/snap-confine
/snap/core18/2667/bin/mount
/snap/core18/2667/bin/ping
/snap/core18/2667/bin/su
/snap/core18/2667/bin/umount
/snap/core18/2667/usr/bin/chfn
/snap/core18/2667/usr/bin/chsh
/snap/core18/2667/usr/bin/gpasswd
/snap/core18/2667/usr/bin/newgrp
/snap/core18/2667/usr/bin/passwd
/snap/core18/2667/usr/bin/sudo
/snap/core18/2667/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core18/2667/usr/lib/openssh/ssh-keysign
/snap/core20/1778/usr/bin/chfn
/snap/core20/1778/usr/bin/chsh
/snap/core20/1778/usr/bin/gpasswd
/snap/core20/1778/usr/bin/mount
/snap/core20/1778/usr/bin/newgrp
/snap/core20/1778/usr/bin/passwd
/snap/core20/1778/usr/bin/su
/snap/core20/1778/usr/bin/sudo
/snap/core20/1778/usr/bin/umount
/snap/core20/1778/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core20/1778/usr/lib/openssh/ssh-keysign
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/eject/dmcrypt-get-device
/usr/lib/snapd/snap-confine
/usr/lib/policykit-1/polkit-agent-helper-1
/usr/lib/openssh/ssh-keysign
/usr/bin/mount
/usr/bin/doas
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
  /snap/core20/1778/usr/bin/ping = cap_net_raw+ep
  /usr/lib/x86_64-linux-gnu/gstreamer1.0/gstreamer-1.0/gst-ptp-helper = cap_net_bind_service,cap_net_admin+ep
  /usr/bin/ping = cap_net_raw+ep
  /usr/bin/mtr-packet = cap_net_raw+ep
  /usr/bin/traceroute6.iputils = cap_net_raw+ep
———
```

## Web Service Nodejs

Nodejs 开了两个服务

* Port 8080 静态路由
* Port 8081 真实服务

```javascript title="index.js"
const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```

```javascript title="app.js"
require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const User = require("./model/user");
const auth = require("./middleware/auth");
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const { base64encode, base64decode } = require('nodejs-base64');
const nodesrv = require('node-srv');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//setup public folder
app.use(express.static('./public'));

var staticfileserver = new nodesrv({
    port: 8080,
    root: './www',
    logs: true
}, function () {
    console.log('Server stopped');
});

app.get('/logout', function(req, res){
    cookie = req.cookies.token;
    if(cookie != undefined){
    res.clearCookie('token', { path: '/' })
      res.redirect('/');
    }
    res.clearCookie('token', { path: '/' })

    res.redirect('/');
  });
  
  
app.get("/", async (req, res) => {
  res.render('index')
})

// app.post("/signup", async (req, res) => {
//   try {
//     // Get user input
//     console.log(req.body)
//     const { username, email, password } = req.body;

//     // Validate user input
//     if (!(email && password && username)) {
//       res.status(400).send("All input is required");
//     }

//     // check if user already exist
//     // Validate if user exist in our database
//     const oldUser = await User.findOne({ email });

//     if (oldUser) {
//       return res.status(409).send("User Already Exist. Please Login");
//     }

//     //Encrypt user password
//     encryptedPassword = await bcrypt.hash(password, 10);

//     // Create user in our database
//     const user = await User.create({
//       username,
//       email: email.toLowerCase(), // sanitize: convert email to lowercase
//       password: encryptedPassword,
//     });

//     // Create token
//     const token = jwt.sign(
//       { user_id: user._id, email, username },
//       process.env.TOKEN_KEY,
//       {
//         expiresIn: "2h",
//       }
//     );
//     // save user token
//     user.token = token;

//     // return new user
//     let options = {
//       maxAge: 1000 * 60 * 15, // would expire after 15 minutes
//       httpOnly: true, // The cookie only accessible by the web server
//       signed: false // Indicates if the cookie should be signed
//   }

//     res.cookie('token', user.token , options) // options is optional
//     res.status(201).redirect('/profile');
//   } catch (err) {
//     console.log(err);
//   }
// });

app.post("/signup", async (req, res) => {
    res.status(500).send("Registration disabled");
})

// Test Creds 
// username: testuser
// email: test@test.htb
// Password: testpassword

app.post("/login", async (req, res) => {
  try {
    // Get user input
    console.log(req.body)
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    console.log(user)
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email , username: user.username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
    // return new user
    let options = {
      maxAge: 1000 * 60 * 15, // would expire after 15 minutes
      httpOnly: true, // The cookie only accessible by the web server
      signed: false // Indicates if the cookie should be signed
  }

      // user
      console.log(user)
      res.cookie('token', user.token , options) // options is optional

      res.status(200).redirect('/profile');
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

app.get("/profile", auth, (req, res) => {
  const  ca = req.cookies.token;
  const  base64Url = ca.split('.')[1];
  const decodedValue = JSON.parse(base64decode(base64Url));
  console.log(decodedValue)
  html = showProfile(decodedValue.username)
  res.status(200).send(html);
});

// This should be the last route else any after it won't work
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});
```

在其中获得一个测试凭据

```plaintext
username: testuser
email: test@test.htb
Password: testpassword
```

## Port 10000 Webmin 1.984

但是没有凭据啊，也不能爆破
