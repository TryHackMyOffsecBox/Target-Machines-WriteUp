# Windmill

:::info

场景介绍

> 大风车吱呀吱哟哟地转~
>
> - 综合场景
> - 多层代理
> - Evasion
> - 信息收集
> - 域渗透

:::

## 入口点

```plaintext
http://www.windmill.cs1ab.com:8080/
```

## 信息收集

```bash
┌──(randark㉿kali)-[~]
└─$ sudo ./tools/fscan-1.8.4/fscan -h www.windmill.cs1ab.com

   ___                              _    
  / _ \     ___  ___ _ __ __ _  ___| | __ 
 / /_\/____/ __|/ __| '__/ _` |/ __| |/ /
/ /_\\_____\__ \ (__| | | (_| | (__|   <    
\____/     |___/\___|_|  \__,_|\___|_|\_\   
                     fscan version: 1.8.4
start infoscan
www.windmill.cs1ab.com:135 open
www.windmill.cs1ab.com:139 open
www.windmill.cs1ab.com:445 open
www.windmill.cs1ab.com:8080 open
[*] alive ports len is: 4
start vulscan
[*] NetInfo 
[*]www.windmill.cs1ab.com
   [->]WIN-2PNAS7U283S
   [->]172.25.66.15
   [->]172.26.50.22
[*] WebTitle http://www.windmill.cs1ab.com:8080 code:200 len:22     title:None
已完成 4/4
[*] 扫描结束,耗时: 21.884599198s
```

目录爆破一下
