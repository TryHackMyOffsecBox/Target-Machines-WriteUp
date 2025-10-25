# lab15

:::info

场景介绍

> ATT&CK实战框架-lab15
>
> - linux渗透
> - 内网渗透
> - 多层代理
> - 横向移动
> - ATT&CK

:::

## 入口点

```plaintext
https://10.10.10.6:10000/
```

## Webmin 1.910 - RCE

访问入口点的时候，可以在返回头中发现

```plaintext
Server: MiniServ/1.910
```

根据此特征，可以定位到 [roughiz/Webmin-1.910-Exploit-Script: Webmin 1.910 - Remote Code Execution Using Python Script](https://github.com/roughiz/Webmin-1.910-Exploit-Script)

但是首先需要爆破出账户和其密码

TODO 没有思路了，弱口令测不出来
