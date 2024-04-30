# Runner

:::info

Difficulty: Medium

Operating System: Linux

:::

## nmap 信息搜集

```plaintext title="sudo nmap -A --min-rate=5000 -T5 -p- 10.10.11.13"
Nmap scan report for 10.10.11.13
Host is up (0.41s latency).
Not shown: 47891 filtered tcp ports (no-response), 17641 closed tcp ports (reset)
PORT     STATE SERVICE     VERSION
22/tcp   open  ssh         OpenSSH 8.9p1 Ubuntu 3ubuntu0.6 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   256 3e:ea:45:4b:c5:d1:6d:6f:e2:d4:d1:3b:0a:3d:a9:4f (ECDSA)
|_  256 64:cc:75:de:4a:e6:a5:b4:73:eb:3f:1b:cf:b4:e3:94 (ED25519)
80/tcp   open  http        nginx 1.18.0 (Ubuntu)
|_http-title: Did not follow redirect to http://runner.htb/
|_http-server-header: nginx/1.18.0 (Ubuntu)
8000/tcp open  nagios-nsca Nagios NSCA
|_http-title: Site doesn't have a title (text/plain; charset=utf-8).
```
