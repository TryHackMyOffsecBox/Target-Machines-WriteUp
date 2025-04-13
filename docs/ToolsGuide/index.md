---
sidebar_position: 0
---

# 工具指南

## 环境信息收集

使用 `netstat` 查询对外开放端口

```shell
netstat -anopt | grep ":::" | while read -r line; do pid=$(echo "$line" | awk '{print $7}' | cut -d'/' -f1); port=$(echo "$line" | awk '{print $4}' | rev | cut -d':' -f1 | rev); cmdline=$(cat /proc/"$pid"/cmdline | tr '\0' ' '); echo -e "Port: $port, PID: $pid\n—> Command: $(echo "$cmdline" | sed -E 's/(apache2?|nginx|java|python|node|ftp)/\x1b[31m&\x1b[0m/g')"; done
```

```shell
echo bmV0c3RhdCAtYW5vcHQgfCBncmVwICI6OjoiIHwgd2hpbGUgcmVhZCAtciBsaW5lOyBkbyBwaWQ9JChlY2hvICIkbGluZSIgfCBhd2sgJ3twcmludCAkN30nIHwgY3V0IC1kJy8nIC1mMSk7IHBvcnQ9JChlY2hvICIkbGluZSIgfCBhd2sgJ3twcmludCAkNH0nIHwgcmV2IHwgY3V0IC1kJzonIC1mMSB8IHJldik7IGNtZGxpbmU9JChjYXQgL3Byb2MvIiRwaWQiL2NtZGxpbmUgfCB0ciAnXDAnICcgJyk7IGVjaG8gLWUgIlBvcnQ6ICRwb3J0LCBQSUQ6ICRwaWRcbuKAlD4gQ29tbWFuZDogJChlY2hvICIkY21kbGluZSIgfCBzZWQgLUUgJ3MvKGFwYWNoZTI/fG5naW54fGphdmF8cHl0aG9ufG5vZGV8ZnRwKS9ceDFiWzMxbSZceDFiWzBtL2cnKSI7IGRvbmU= | base64 -d | bash
```

使用 `ss` 配合`lsof`

```shell
ss -tuln | grep LISTEN | grep "0.0.0.0" | while read -r line; do port=$(echo "$line" | awk '{print $5}' | rev | cut -d':' -f1 | rev); pid=$(lsof -i :$port | grep LISTEN | awk '{print $2}' | head -n 1); [ -n "$pid" ] && cmdline=$(cat /proc/$pid/cmdline | tr '\0' ' ') && echo -e "Port: $port, PID: $pid\n—> Command: $(echo "$cmdline" | sed -E 's/(apache2?|nginx|java|python|node|ftp)/\x1b[31m&\x1b[0m/g')" || echo -e "Port: $port, PID: Not found\n—> Command: Not available"; done
```

```shell
echo c3MgLXR1bG4gfCBncmVwIExJU1RFTiB8IGdyZXAgIjAuMC4wLjAiIHwgd2hpbGUgcmVhZCAtciBsaW5lOyBkbyBwb3J0PSQoZWNobyAiJGxpbmUiIHwgYXdrICd7cHJpbnQgJDV9JyB8IHJldiB8IGN1dCAtZCc6JyAtZjEgfCByZXYpOyBwaWQ9JChsc29mIC1pIDokcG9ydCB8IGdyZXAgTElTVEVOIHwgYXdrICd7cHJpbnQgJDJ9JyB8IGhlYWQgLW4gMSk7IFsgLW4gIiRwaWQiIF0gJiYgY21kbGluZT0kKGNhdCAvcHJvYy8kcGlkL2NtZGxpbmUgfCB0ciAnXDAnICcgJykgJiYgZWNobyAtZSAiUG9ydDogJHBvcnQsIFBJRDogJHBpZFxu4oCUPiBDb21tYW5kOiAkKGVjaG8gIiRjbWRsaW5lIiB8IHNlZCAtRSAncy8oYXBhY2hlMj98bmdpbnh8amF2YXxweXRob258bm9kZXxmdHApL1x4MWJbMzFtJlx4MWJbMG0vZycpIiB8fCBlY2hvIC1lICJQb3J0OiAkcG9ydCwgUElEOiBOb3QgZm91bmRcbuKAlD4gQ29tbWFuZDogTm90IGF2YWlsYWJsZSI7IGRvbmU= | base64 -d | bash
```

使用 `lsof`

```shell
lsof -i | grep "*:"
```

## Web Service 信息搜集

针对 apache2 服务查询解析配置

```shell
sed -n '/ServerName/p; /ServerAlias/p; /DocumentRoot/p' /etc/apache2/sites-enabled/*
```

针对 nginx 服务查询解析配置

```shell
sed -n '/server_name/p; /root/p' /etc/nginx/sites-enabled/*
```

针对 nginx 服务查询解析配置，并自动生成hosts记录

```shell
ip=$(ip -4 addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}') && all_hosts="" && for file in /etc/nginx/sites-enabled/*; do server_names=$(sed -n '/^\s*server_name\s.*;\s*$/p' "$file" | awk -F 'server_name' '{print $2}' | sed 's/;//g' | tr -s ' '); root_dir=$(sed -n '/^\s*root\s.*;\s*$/p' "$file" | awk '{print $2}' | sed 's/;//g'); if [ -n "$server_names" ]; then echo -e "File: $file\nRoot: $root_dir\nHosts:" && echo "$server_names" | awk -v ip="$ip" '{print ip, $0}'; all_hosts+="$(echo "$server_names" | awk -v ip="$ip" '{print ip, $0}')\n"; echo "———"; fi; done && echo -e "\nUnique Hosts:" && echo -e "$all_hosts" | sort | uniq
```

快速搜索高危命令执行函数

```shell
grep -r -n -E --include="*.php" "(eval\(|exec\(|system\(|passthru\(|shell_exec\(|popen\(|proc_open\(|assert\(|create_function\(|preg_replace\s*\(.*/e)" /var/www | awk -F: '{print "File: " $1 "\nLine: " $2 "\nCode: " $3 "\n"}'
```

## 基础提权路径排查

列出 sudo 可执行范围

```shell
sudo -l
```

寻找 suid 特殊文件

```shell
find / -perm -u=s -type f -executable 2>/dev/null
```

寻找特殊程序能力

```shell
getcap -r / 2>/dev/null
```

## 一站式脚本

```bash
#!/bin/bash

# Function to check if a command exists
check_command() {
    if command -v $1 &> /dev/null; then
        return 0
    else
        return 1
    fi
}

# Check if ss and lsof exist
if check_command ss && check_command lsof; then
    echo "Detected ss and lsof, executing related commands..."
    ss -tuln | grep LISTEN | grep "0.0.0.0" | while read -r line; do
        port=$(echo "$line" | awk '{print $5}' | rev | cut -d':' -f1 | rev)
        pid=$(lsof -i :$port | grep LISTEN | awk '{print $2}' | head -n 1)
        if [ -n "$pid" ]; then
            cmdline=$(cat /proc/$pid/cmdline | tr '\0' ' ')
            echo -e "Port: $port, PID: $pid\n—> Command: $(echo "$cmdline" | sed -E 's/(apache2?|nginx|java|python|node|ftp)/\x1b[31m&\x1b[0m/g')"
        else
            echo -e "Port: $port, PID: Not found\n—> Command: Not available"
        fi
    done
# Check if netstat exists
elif check_command netstat; then
    echo "Detected netstat, executing related commands..."
    netstat -anopt | grep ":::" | while read -r line; do
        pid=$(echo "$line" | awk '{print $7}' | cut -d'/' -f1)
        port=$(echo "$line" | awk '{print $4}' | rev | cut -d':' -f1 | rev)
        cmdline=$(cat /proc/"$pid"/cmdline | tr '\0' ' ')
        echo -e "Port: $port, PID: $pid\n—> Command: $(echo "$cmdline" | sed -E 's/(apache2?|nginx|java|python|node|ftp)/\x1b[31m&\x1b[0m/g')"
    done
# If none of the commands exist
else
    echo -e "\x1b[31mWarning: Neither ss, lsof, nor netstat commands were found. The script cannot proceed.\x1b[0m"
    exit 1
fi

# Output a separator
echo -e "\n## ———————————————————————————— ##\n"

# Check if nginx exists
if check_command nginx; then
    echo "Detected nginx, analyzing its configuration..."

    # Get the IP address of eth0
    ip=$(ip -4 addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}')

    # Initialize a variable to store all hosts
    all_hosts=""

    # Loop through all enabled nginx configuration files
    for file in /etc/nginx/sites-enabled/*; do
        # Extract server_names and root directory
        server_names=$(sed -n '/^\s*server_name\s.*;\s*$/p' "$file" | awk -F 'server_name' '{print $2}' | sed 's/;//g' | tr -s ' ')
        root_dir=$(sed -n '/^\s*root\s.*;\s*$/p' "$file" | awk '{print $2}' | sed 's/;//g')

        # If server_names are found, print the details
        if [ -n "$server_names" ]; then
            echo -e "File: $file\nRoot: $root_dir\nHosts:"
            echo "$server_names" | awk -v ip="$ip" '{print ip, $0}'
            all_hosts+="$(echo "$server_names" | awk -v ip="$ip" '{print ip, $0}')\n"
            echo "———"
        fi
    done

    # Print unique hosts
    echo -e "\nUnique Hosts:"
    echo -e "$all_hosts" | sort | uniq
else
    echo "Nginx is not installed."
fi

# Output a separator
echo -e "\n## ———————————————————————————— ##\n"

# Check if apache (httpd) exists
if check_command apache2 || check_command httpd; then
    echo "Detected apache, analyzing its configuration..."

    # Get the IP address of eth0
    ip=$(ip -4 addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}')

    # Initialize a variable to store all hosts
    all_hosts=""

    # Loop through all enabled apache configuration files
    for file in /etc/apache2/sites-enabled/*; do
        # Extract ServerName and ServerAlias
        server_name=$(sed -n '/^\s*ServerName\s.*$/p' "$file" | awk '{print $2}')
        server_aliases=$(sed -n '/^\s*ServerAlias\s.*$/p' "$file" | awk '{print $2}')

        # Combine ServerName and ServerAlias
        if [ -n "$server_name" ]; then
            hosts="$server_name"
            if [ -n "$server_aliases" ]; then
                hosts+=" $server_aliases"
            fi

            # Extract DocumentRoot
            document_root=$(sed -n '/^\s*DocumentRoot\s.*$/p' "$file" | awk '{print $2}')

            # Print the details
            echo -e "File: $file\nDocumentRoot: $document_root\nHosts:"
            echo "$hosts" | tr ' ' '\n' | awk -v ip="$ip" '{print ip, $0}'
            all_hosts+="$(echo "$hosts" | tr ' ' '\n' | awk -v ip="$ip" '{print ip, $0}')\n"
            echo "———"
        fi
    done

    # Print unique hosts
    echo -e "\nUnique Hosts:"
    echo -e "$all_hosts" | sort | uniq
else
    echo "Apache is not installed."
fi
```

## 参考资料

[Linux Privilege Escalation | Exploit Notes](https://exploit-notes.hdks.org/exploit/linux/privilege-escalation/)

[Exploit Notes](https://exploit-notes.hdks.org/)

[whoami | J4ckie0x17](https://j4ckie0x17.gitbook.io/notes-pentesting)
