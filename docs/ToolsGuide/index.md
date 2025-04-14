---
sidebar_position: 0
---

# 工具指南

## 环境信息收集

使用 `netstat` 查询对外开放端口

```bash
netstat -anopt | grep ":::" | while read -r line; do pid=$(echo "$line" | awk '{print $7}' | cut -d'/' -f1); port=$(echo "$line" | awk '{print $4}' | rev | cut -d':' -f1 | rev); cmdline=$(cat /proc/"$pid"/cmdline | tr '\0' ' '); echo -e "Port: $port, PID: $pid\n—> Command: $(echo "$cmdline" | sed -E 's/(apache2?|nginx|java|python|node|ftp)/\x1b[31m&\x1b[0m/g')"; done
```

```bash
echo bmV0c3RhdCAtYW5vcHQgfCBncmVwICI6OjoiIHwgd2hpbGUgcmVhZCAtciBsaW5lOyBkbyBwaWQ9JChlY2hvICIkbGluZSIgfCBhd2sgJ3twcmludCAkN30nIHwgY3V0IC1kJy8nIC1mMSk7IHBvcnQ9JChlY2hvICIkbGluZSIgfCBhd2sgJ3twcmludCAkNH0nIHwgcmV2IHwgY3V0IC1kJzonIC1mMSB8IHJldik7IGNtZGxpbmU9JChjYXQgL3Byb2MvIiRwaWQiL2NtZGxpbmUgfCB0ciAnXDAnICcgJyk7IGVjaG8gLWUgIlBvcnQ6ICRwb3J0LCBQSUQ6ICRwaWRcbuKAlD4gQ29tbWFuZDogJChlY2hvICIkY21kbGluZSIgfCBzZWQgLUUgJ3MvKGFwYWNoZTI/fG5naW54fGphdmF8cHl0aG9ufG5vZGV8ZnRwKS9ceDFiWzMxbSZceDFiWzBtL2cnKSI7IGRvbmU= | base64 -d | bash
```

使用 `ss` 配合 `lsof`

```bash
ss -tuln | grep LISTEN | grep "0.0.0.0" | while read -r line; do port=$(echo "$line" | awk '{print $5}' | rev | cut -d':' -f1 | rev); pid=$(lsof -i :$port | grep LISTEN | awk '{print $2}' | head -n 1); [ -n "$pid" ] && cmdline=$(cat /proc/$pid/cmdline | tr '\0' ' ') && echo -e "Port: $port, PID: $pid\n—> Command: $(echo "$cmdline" | sed -E 's/(apache2?|nginx|java|python|node|ftp)/\x1b[31m&\x1b[0m/g')" || echo -e "Port: $port, PID: Not found\n—> Command: Not available"; done
```

```bash
echo c3MgLXR1bG4gfCBncmVwIExJU1RFTiB8IGdyZXAgIjAuMC4wLjAiIHwgd2hpbGUgcmVhZCAtciBsaW5lOyBkbyBwb3J0PSQoZWNobyAiJGxpbmUiIHwgYXdrICd7cHJpbnQgJDV9JyB8IHJldiB8IGN1dCAtZCc6JyAtZjEgfCByZXYpOyBwaWQ9JChsc29mIC1pIDokcG9ydCB8IGdyZXAgTElTVEVOIHwgYXdrICd7cHJpbnQgJDJ9JyB8IGhlYWQgLW4gMSk7IFsgLW4gIiRwaWQiIF0gJiYgY21kbGluZT0kKGNhdCAvcHJvYy8kcGlkL2NtZGxpbmUgfCB0ciAnXDAnICcgJykgJiYgZWNobyAtZSAiUG9ydDogJHBvcnQsIFBJRDogJHBpZFxu4oCUPiBDb21tYW5kOiAkKGVjaG8gIiRjbWRsaW5lIiB8IHNlZCAtRSAncy8oYXBhY2hlMj98bmdpbnh8amF2YXxweXRob258bm9kZXxmdHApL1x4MWJbMzFtJlx4MWJbMG0vZycpIiB8fCBlY2hvIC1lICJQb3J0OiAkcG9ydCwgUElEOiBOb3QgZm91bmRcbuKAlD4gQ29tbWFuZDogTm90IGF2YWlsYWJsZSI7IGRvbmU= | base64 -d | bash
```

使用 `lsof`

```bash
lsof -i | grep "*:"
```

## Web Service 信息搜集

针对 apache2 服务查询解析配置

```bash
sed -n '/ServerName/p; /ServerAlias/p; /DocumentRoot/p' /etc/apache2/sites-enabled/*
```

针对 nginx 服务查询解析配置

```bash
sed -n '/server_name/p; /root/p' /etc/nginx/sites-enabled/*
```

针对 nginx 服务查询解析配置，并自动生成 hosts 记录

```bash
ip=$(ip -4 addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}') && all_hosts="" && for file in /etc/nginx/sites-enabled/*; do server_names=$(sed -n '/^\s*server_name\s.*;\s*$/p' "$file" | awk -F 'server_name' '{print $2}' | sed 's/;//g' | tr -s ' '); root_dir=$(sed -n '/^\s*root\s.*;\s*$/p' "$file" | awk '{print $2}' | sed 's/;//g'); if [ -n "$server_names" ]; then echo -e "File: $file\nRoot: $root_dir\nHosts:" && echo "$server_names" | awk -v ip="$ip" '{print ip, $0}'; all_hosts+="$(echo "$server_names" | awk -v ip="$ip" '{print ip, $0}')\n"; echo "———"; fi; done && echo -e "\nUnique Hosts:" && echo -e "$all_hosts" | sort | uniq
```

快速搜索高危命令执行函数

```bash
grep -r -n -E --include="*.php" "(eval\(|exec\(|system\(|passthru\(|shell_exec\(|popen\(|proc_open\(|assert\(|create_function\(|preg_replace\s*\(.*/e)" /var/www | awk -F: '{print "File: " $1 "\nLine: " $2 "\nCode: " $3 "\n"}'
```

## 基础提权路径排查

列出 sudo 可执行范围

```bash
sudo -l
```

寻找 suid 特殊文件

```bash
find / -perm -u=s -type f -executable 2>/dev/null
```

寻找特殊程序能力

```bash
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

    # Get the first non-loopback network interface
    interface=$(ip -4 addr show | grep -v ' lo:' | awk '/^[0-9]+:/ {print $2}' | cut -d':' -f1 | head -n 1)

    # Get the IP address of the first non-loopback interface
    ip=$(ip -4 addr show "$interface" | grep -oP '(?<=inet\s)\d+(\.\d+){3}')

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

    # Get the first non-loopback network interface
    interface=$(ip -4 addr show | grep -v ' lo:' | awk '/^[0-9]+:/ {print $2}' | cut -d':' -f1 | head -n 1)

    # Get the IP address of the first non-loopback interface
    ip=$(ip -4 addr show "$interface" | grep -oP '(?<=inet\s)\d+(\.\d+){3}')

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

# Output a separator
echo -e "\n## ———————————————————————————— ##\n"

# Check /etc/sudoers file (excluding comments)
echo "Checking /etc/sudoers (active configurations only):"
grep -v '^#' /etc/sudoers | grep -v '^$' | sed 's/^/  /'
echo "———"

# Find SUID files
echo "Finding SUID files:"
find / -perm -u=s -type f -executable 2>/dev/null
echo "———"

# Find files with special capabilities
echo "Finding files with special capabilities:"
getcap -r / 2>/dev/null | sed 's/^/  /'
echo "———"

# Check if nginx or apache2 is running and /var/www exists
if (ps -A | grep -q 'nginx') || (ps -A | grep -q 'apache2'); then
    echo "Detected nginx or apache2 process running."

    # Check if /var/www exists
    if [ -d "/var/www" ]; then
        echo "Found /var/www directory. Compressing it to web.zip..."
        zip -r -9 web.zip /var/www
        if [ $? -eq 0 ]; then
            echo "Compression completed: web.zip created."
        else
            echo "Compression failed."
        fi
    else
        echo "/var/www directory not found."
    fi
else
    echo "No nginx or apache2 process is running."
fi
```

使用 gzip 进一步压缩体积，一行执行

```bash
echo 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 | base64 -d | gunzip | bash
```

## 参考资料

[Linux Privilege Escalation | Exploit Notes](https://exploit-notes.hdks.org/exploit/linux/privilege-escalation/)

[Exploit Notes](https://exploit-notes.hdks.org/)

[whoami | J4ckie0x17](https://j4ckie0x17.gitbook.io/notes-pentesting)
