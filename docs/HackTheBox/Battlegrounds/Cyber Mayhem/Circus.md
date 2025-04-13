# Circus

## dev vhost

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
