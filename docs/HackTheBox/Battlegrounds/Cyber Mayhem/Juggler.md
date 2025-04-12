# Juggler

## web

```php title="index.php"
<?php
require_once('User.php');

if ( isset($_POST['username']) && isset($_POST['password'])) {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    if ( strcmp($user, $username) == 0 && strcmp($pass, $password) == 0 ) {
        $logged = true;
    } else {
        $logged = false;
        $msg = "Invalid Credentials";
    }
}
?>
```

```php title="User.php"
<?php
$username = "admin";
$password = "EKkrcTUw+pq0sJHWU4zG7g==";

class User {
    public $username;
    public $id;

    public function __construct($username) {
        $this->username = $username;
        $this->id = "1000";
    }

    public function __wakeup() {
        $this->id = exec("id -u " . $this->username);
    }

}
```

```php title="home.php"
<?php
if (isset($_COOKIE['data'])) {
    $user = unserialize($_COOKIE['data']);
} else {
    $user = new User(system('whoami'));
    setcookie('data',  serialize($user), time() + 3600);
}
echo "<p>System Administrator (SYSADM) - " . $user->username . " (" . $user->id . ")</p>";
?>
```
