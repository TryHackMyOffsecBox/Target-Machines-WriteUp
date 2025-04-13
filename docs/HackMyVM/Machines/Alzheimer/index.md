# Alzheimer

:::note

[Linux VM] [Tested on VirtualBox] created by || sml

⏲️ Release Date // 2020-10-03

✔️ MD5 // 181b8e3df47b920d4c9fb00e9e019986

☠ Root // 203

💀 User // 208

📝Notes //
Enjoy this VM. Tested on Virtualbox.

:::

## 靶机启动

![靶机启动](img/image_20231233-113327.png)

靶机 IP：

```plaintext
192.168.56.108
```

## nmap 信息搜集

```plaintext
21/tcp open     ftp     vsftpd 3.0.3
|_ftp-anon: Anonymous FTP login allowed (FTP code 230)
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
|      At session startup, client count was 2
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp filtered ssh
80/tcp filtered http
MAC Address: 08:00:27:DB:86:1E (Oracle VirtualBox virtual NIC)
Device type: general purpose
Running: Linux 4.X|5.X
OS CPE: cpe:/o:linux:linux_kernel:4 cpe:/o:linux:linux_kernel:5
OS details: Linux 4.15 - 5.6
Network Distance: 1 hop
Service Info: OS: Unix
```

## 探测 ftp 服务

通过匿名登陆，发现目录下存在以下文件

```bash
ftp> ls -lah
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxr-xr-x    2 0        113          4096 Oct 03  2020 .
drwxr-xr-x    2 0        113          4096 Oct 03  2020 ..
-rw-r--r--    1 0        0              70 Oct 03  2020 .secretnote.txt
226 Directory send OK.
```

查看文件内容

```plaintext title=".secretnote.txt"
I need to knock this ports and
one door will be open!
1000
2000
3000
```

## knockd 开启防火墙

通过查阅相关资料

```plaintext title="使用 knock 管理防火牆相關行為 - https://linux.vbird.org/linux_server/others/knockd.php"
knockd 主要的目的是希望可以動態的修改防火牆規則，他的運作流程是這樣的：

    伺服器端的防火牆規則中先開放三個左右的埠口，這些埠口沒有被其他程式啟用，且可由 knockd 所偵測；
    用戶端若依照設定的順序依序的連線到這三個埠口時， knockd 將進行動態防火牆規則的設定
    防火牆規則被修改，且 knockd 持續進行偵測；
    當用戶端讓 knockd 等候逾時，或者是用戶端離線後，剛剛步驟三的防火牆規則將會被移除。

如此一來，當我在非固定 IP 的網段想要連線到伺服器時，就可以透過這個機制來處理啦！
```

使用 knockd 开启相关端口

```bash
┌─[✗]─[randark@randark-Parrot]─[~/tmp/HackMyVM-Alzheimer]
└──╼ $knock 192.168.56.108 1000 2000 3000 -v -d 1000
hitting tcp 192.168.56.108:1000
hitting tcp 192.168.56.108:2000
hitting tcp 192.168.56.108:3000
```

多次敲门之后，发现端口仍未开放，怀疑是靶机上的 knockd 配置文件存在问题，直接读取虚拟机的磁盘文件

```plaintext title="/etc/knockd.conf"
[options]
        UseSyslog
        Interface = enp0s3
[openSSH]
        sequence = 1000,2000,3000
        seq_timeout = 15
        tcpflags = syn
        start_command = /sbin/iptables -I INPUT -s %IP% -p tcp --dport 80 -j ACCEPT;echo "Ihavebeenalwayshere!!!" >> /srv/ftp/.secretnote.txt;sleep 120;/sbin/iptables -I INPUT -s %IP% -p tcp --dport 22 -j ACCEPT

```

发现网卡被写死为：`enp0s3` ，如果后期更改了网卡设置，可能会导致问题

:::warning 死题了

由于无法直接改写 knockd 配置文件，所以在不改变本地网络环境的前提下，此靶机无法完成

:::

这里直接给出直接读取磁盘文件得到的 flag

```plaintext title="/home/medusa/user.txt"
HMVrespectmemories
```

```plaintext title="/root/root.txt"
HMVlovememories
```
