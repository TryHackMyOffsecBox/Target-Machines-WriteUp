# Intertwined

## 信息收集

```bash
(remote) root@htb:/root# ss -tuln | grep LISTEN | grep "0.0.0.0"
tcp    LISTEN  0       128          127.0.0.1:27017        0.0.0.0:*            
tcp    LISTEN  0       511            0.0.0.0:8080         0.0.0.0:*            
tcp    LISTEN  0       4096           0.0.0.0:10000        0.0.0.0:*            
tcp    LISTEN  0       4096     127.0.0.53%lo:53           0.0.0.0:*            
tcp    LISTEN  0       128            0.0.0.0:22           0.0.0.0:*  
```

## Web Service Nodejs

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
