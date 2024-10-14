# 渗透测试常用 poc

<!-- truncate -->

## 信息搜集

### nmap 信息搜集

```shell
sudo nmap -A --min-rate=5000 -T4 -p- ip
```

## 提权探测

```shell
# 寻找特殊程序能力

getcap -r / 2>/dev/null

# 寻找 suid 特殊文件

find / -perm -u=s -type f 2>/dev/null

## 列出 sudo 可执行范围

sudo -l
```
