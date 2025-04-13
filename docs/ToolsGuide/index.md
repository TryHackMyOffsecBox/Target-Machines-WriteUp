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

更简单一点，一行执行

```bash
echo IyEvYmluL2Jhc2gKCiMgRnVuY3Rpb24gdG8gY2hlY2sgaWYgYSBjb21tYW5kIGV4aXN0cwpjaGVja19jb21tYW5kKCkgewogICAgaWYgY29tbWFuZCAtdiAkMSAmPiAvZGV2L251bGw7IHRoZW4KICAgICAgICByZXR1cm4gMAogICAgZWxzZQogICAgICAgIHJldHVybiAxCiAgICBmaQp9CgojIENoZWNrIGlmIHNzIGFuZCBsc29mIGV4aXN0CmlmIGNoZWNrX2NvbW1hbmQgc3MgJiYgY2hlY2tfY29tbWFuZCBsc29mOyB0aGVuCiAgICBlY2hvICJEZXRlY3RlZCBzcyBhbmQgbHNvZiwgZXhlY3V0aW5nIHJlbGF0ZWQgY29tbWFuZHMuLi4iCiAgICBzcyAtdHVsbiB8IGdyZXAgTElTVEVOIHwgZ3JlcCAiMC4wLjAuMCIgfCB3aGlsZSByZWFkIC1yIGxpbmU7IGRvCiAgICAgICAgcG9ydD0kKGVjaG8gIiRsaW5lIiB8IGF3ayAne3ByaW50ICQ1fScgfCByZXYgfCBjdXQgLWQnOicgLWYxIHwgcmV2KQogICAgICAgIHBpZD0kKGxzb2YgLWkgOiRwb3J0IHwgZ3JlcCBMSVNURU4gfCBhd2sgJ3twcmludCAkMn0nIHwgaGVhZCAtbiAxKQogICAgICAgIGlmIFsgLW4gIiRwaWQiIF07IHRoZW4KICAgICAgICAgICAgY21kbGluZT0kKGNhdCAvcHJvYy8kcGlkL2NtZGxpbmUgfCB0ciAnXDAnICcgJykKICAgICAgICAgICAgZWNobyAtZSAiUG9ydDogJHBvcnQsIFBJRDogJHBpZFxu4oCUPiBDb21tYW5kOiAkKGVjaG8gIiRjbWRsaW5lIiB8IHNlZCAtRSAncy8oYXBhY2hlMj98bmdpbnh8amF2YXxweXRob258bm9kZXxmdHApL1x4MWJbMzFtJlx4MWJbMG0vZycpIgogICAgICAgIGVsc2UKICAgICAgICAgICAgZWNobyAtZSAiUG9ydDogJHBvcnQsIFBJRDogTm90IGZvdW5kXG7igJQ+IENvbW1hbmQ6IE5vdCBhdmFpbGFibGUiCiAgICAgICAgZmkKICAgIGRvbmUKIyBDaGVjayBpZiBuZXRzdGF0IGV4aXN0cwplbGlmIGNoZWNrX2NvbW1hbmQgbmV0c3RhdDsgdGhlbgogICAgZWNobyAiRGV0ZWN0ZWQgbmV0c3RhdCwgZXhlY3V0aW5nIHJlbGF0ZWQgY29tbWFuZHMuLi4iCiAgICBuZXRzdGF0IC1hbm9wdCB8IGdyZXAgIjo6OiIgfCB3aGlsZSByZWFkIC1yIGxpbmU7IGRvCiAgICAgICAgcGlkPSQoZWNobyAiJGxpbmUiIHwgYXdrICd7cHJpbnQgJDd9JyB8IGN1dCAtZCcvJyAtZjEpCiAgICAgICAgcG9ydD0kKGVjaG8gIiRsaW5lIiB8IGF3ayAne3ByaW50ICQ0fScgfCByZXYgfCBjdXQgLWQnOicgLWYxIHwgcmV2KQogICAgICAgIGNtZGxpbmU9JChjYXQgL3Byb2MvIiRwaWQiL2NtZGxpbmUgfCB0ciAnXDAnICcgJykKICAgICAgICBlY2hvIC1lICJQb3J0OiAkcG9ydCwgUElEOiAkcGlkXG7igJQ+IENvbW1hbmQ6ICQoZWNobyAiJGNtZGxpbmUiIHwgc2VkIC1FICdzLyhhcGFjaGUyP3xuZ2lueHxqYXZhfHB5dGhvbnxub2RlfGZ0cCkvXHgxYlszMW0mXHgxYlswbS9nJykiCiAgICBkb25lCiMgSWYgbm9uZSBvZiB0aGUgY29tbWFuZHMgZXhpc3QKZWxzZQogICAgZWNobyAtZSAiXHgxYlszMW1XYXJuaW5nOiBOZWl0aGVyIHNzLCBsc29mLCBub3IgbmV0c3RhdCBjb21tYW5kcyB3ZXJlIGZvdW5kLiBUaGUgc2NyaXB0IGNhbm5vdCBwcm9jZWVkLlx4MWJbMG0iCiAgICBleGl0IDEKZmkKCiMgT3V0cHV0IGEgc2VwYXJhdG9yCmVjaG8gLWUgIlxuIyMg4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCUICMjXG4iCgojIENoZWNrIGlmIG5naW54IGV4aXN0cwppZiBjaGVja19jb21tYW5kIG5naW54OyB0aGVuCiAgICBlY2hvICJEZXRlY3RlZCBuZ2lueCwgYW5hbHl6aW5nIGl0cyBjb25maWd1cmF0aW9uLi4uIgoKICAgICMgR2V0IHRoZSBJUCBhZGRyZXNzIG9mIGV0aDAKICAgIGlwPSQoaXAgLTQgYWRkciBzaG93IGV0aDAgfCBncmVwIC1vUCAnKD88PWluZXRccylcZCsoXC5cZCspezN9JykKCiAgICAjIEluaXRpYWxpemUgYSB2YXJpYWJsZSB0byBzdG9yZSBhbGwgaG9zdHMKICAgIGFsbF9ob3N0cz0iIgoKICAgICMgTG9vcCB0aHJvdWdoIGFsbCBlbmFibGVkIG5naW54IGNvbmZpZ3VyYXRpb24gZmlsZXMKICAgIGZvciBmaWxlIGluIC9ldGMvbmdpbngvc2l0ZXMtZW5hYmxlZC8qOyBkbwogICAgICAgICMgRXh0cmFjdCBzZXJ2ZXJfbmFtZXMgYW5kIHJvb3QgZGlyZWN0b3J5CiAgICAgICAgc2VydmVyX25hbWVzPSQoc2VkIC1uICcvXlxzKnNlcnZlcl9uYW1lXHMuKjtccyokL3AnICIkZmlsZSIgfCBhd2sgLUYgJ3NlcnZlcl9uYW1lJyAne3ByaW50ICQyfScgfCBzZWQgJ3MvOy8vZycgfCB0ciAtcyAnICcpCiAgICAgICAgcm9vdF9kaXI9JChzZWQgLW4gJy9eXHMqcm9vdFxzLio7XHMqJC9wJyAiJGZpbGUiIHwgYXdrICd7cHJpbnQgJDJ9JyB8IHNlZCAncy87Ly9nJykKCiAgICAgICAgIyBJZiBzZXJ2ZXJfbmFtZXMgYXJlIGZvdW5kLCBwcmludCB0aGUgZGV0YWlscwogICAgICAgIGlmIFsgLW4gIiRzZXJ2ZXJfbmFtZXMiIF07IHRoZW4KICAgICAgICAgICAgZWNobyAtZSAiRmlsZTogJGZpbGVcblJvb3Q6ICRyb290X2RpclxuSG9zdHM6IgogICAgICAgICAgICBlY2hvICIkc2VydmVyX25hbWVzIiB8IGF3ayAtdiBpcD0iJGlwIiAne3ByaW50IGlwLCAkMH0nCiAgICAgICAgICAgIGFsbF9ob3N0cys9IiQoZWNobyAiJHNlcnZlcl9uYW1lcyIgfCBhd2sgLXYgaXA9IiRpcCIgJ3twcmludCBpcCwgJDB9JylcbiIKICAgICAgICAgICAgZWNobyAi4oCU4oCU4oCUIgogICAgICAgIGZpCiAgICBkb25lCgogICAgIyBQcmludCB1bmlxdWUgaG9zdHMKICAgIGVjaG8gLWUgIlxuVW5pcXVlIEhvc3RzOiIKICAgIGVjaG8gLWUgIiRhbGxfaG9zdHMiIHwgc29ydCB8IHVuaXEKZWxzZQogICAgZWNobyAiTmdpbnggaXMgbm90IGluc3RhbGxlZC4iCmZpCgojIE91dHB1dCBhIHNlcGFyYXRvcgplY2hvIC1lICJcbiMjIOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlOKAlCAjI1xuIgoKIyBDaGVjayBpZiBhcGFjaGUgKGh0dHBkKSBleGlzdHMKaWYgY2hlY2tfY29tbWFuZCBhcGFjaGUyIHx8IGNoZWNrX2NvbW1hbmQgaHR0cGQ7IHRoZW4KICAgIGVjaG8gIkRldGVjdGVkIGFwYWNoZSwgYW5hbHl6aW5nIGl0cyBjb25maWd1cmF0aW9uLi4uIgoKICAgICMgR2V0IHRoZSBJUCBhZGRyZXNzIG9mIGV0aDAKICAgIGlwPSQoaXAgLTQgYWRkciBzaG93IGV0aDAgfCBncmVwIC1vUCAnKD88PWluZXRccylcZCsoXC5cZCspezN9JykKCiAgICAjIEluaXRpYWxpemUgYSB2YXJpYWJsZSB0byBzdG9yZSBhbGwgaG9zdHMKICAgIGFsbF9ob3N0cz0iIgoKICAgICMgTG9vcCB0aHJvdWdoIGFsbCBlbmFibGVkIGFwYWNoZSBjb25maWd1cmF0aW9uIGZpbGVzCiAgICBmb3IgZmlsZSBpbiAvZXRjL2FwYWNoZTIvc2l0ZXMtZW5hYmxlZC8qOyBkbwogICAgICAgICMgRXh0cmFjdCBTZXJ2ZXJOYW1lIGFuZCBTZXJ2ZXJBbGlhcwogICAgICAgIHNlcnZlcl9uYW1lPSQoc2VkIC1uICcvXlxzKlNlcnZlck5hbWVccy4qJC9wJyAiJGZpbGUiIHwgYXdrICd7cHJpbnQgJDJ9JykKICAgICAgICBzZXJ2ZXJfYWxpYXNlcz0kKHNlZCAtbiAnL15ccypTZXJ2ZXJBbGlhc1xzLiokL3AnICIkZmlsZSIgfCBhd2sgJ3twcmludCAkMn0nKQoKICAgICAgICAjIENvbWJpbmUgU2VydmVyTmFtZSBhbmQgU2VydmVyQWxpYXMKICAgICAgICBpZiBbIC1uICIkc2VydmVyX25hbWUiIF07IHRoZW4KICAgICAgICAgICAgaG9zdHM9IiRzZXJ2ZXJfbmFtZSIKICAgICAgICAgICAgaWYgWyAtbiAiJHNlcnZlcl9hbGlhc2VzIiBdOyB0aGVuCiAgICAgICAgICAgICAgICBob3N0cys9IiAkc2VydmVyX2FsaWFzZXMiCiAgICAgICAgICAgIGZpCgogICAgICAgICAgICAjIEV4dHJhY3QgRG9jdW1lbnRSb290CiAgICAgICAgICAgIGRvY3VtZW50X3Jvb3Q9JChzZWQgLW4gJy9eXHMqRG9jdW1lbnRSb290XHMuKiQvcCcgIiRmaWxlIiB8IGF3ayAne3ByaW50ICQyfScpCgogICAgICAgICAgICAjIFByaW50IHRoZSBkZXRhaWxzCiAgICAgICAgICAgIGVjaG8gLWUgIkZpbGU6ICRmaWxlXG5Eb2N1bWVudFJvb3Q6ICRkb2N1bWVudF9yb290XG5Ib3N0czoiCiAgICAgICAgICAgIGVjaG8gIiRob3N0cyIgfCB0ciAnICcgJ1xuJyB8IGF3ayAtdiBpcD0iJGlwIiAne3ByaW50IGlwLCAkMH0nCiAgICAgICAgICAgIGFsbF9ob3N0cys9IiQoZWNobyAiJGhvc3RzIiB8IHRyICcgJyAnXG4nIHwgYXdrIC12IGlwPSIkaXAiICd7cHJpbnQgaXAsICQwfScpXG4iCiAgICAgICAgICAgIGVjaG8gIuKAlOKAlOKAlCIKICAgICAgICBmaQogICAgZG9uZQoKICAgICMgUHJpbnQgdW5pcXVlIGhvc3RzCiAgICBlY2hvIC1lICJcblVuaXF1ZSBIb3N0czoiCiAgICBlY2hvIC1lICIkYWxsX2hvc3RzIiB8IHNvcnQgfCB1bmlxCmVsc2UKICAgIGVjaG8gIkFwYWNoZSBpcyBub3QgaW5zdGFsbGVkLiIKZmkKCiMgT3V0cHV0IGEgc2VwYXJhdG9yCmVjaG8gLWUgIlxuIyMg4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCUICMjXG4iCgojIENoZWNrIC9ldGMvc3Vkb2VycyBmaWxlIChleGNsdWRpbmcgY29tbWVudHMpCmVjaG8gIkNoZWNraW5nIC9ldGMvc3Vkb2VycyAoYWN0aXZlIGNvbmZpZ3VyYXRpb25zIG9ubHkpOiIKZ3JlcCAtdiAnXiMnIC9ldGMvc3Vkb2VycyB8IGdyZXAgLXYgJ14kJyB8IHNlZCAncy9eLyAgLycKZWNobyAi4oCU4oCU4oCUIgoKIyBGaW5kIFNVSUQgZmlsZXMKZWNobyAiRmluZGluZyBTVUlEIGZpbGVzOiIKZ3JlcCAtdiAnXiMnIC9ldGMvc3Vkb2VycyB8IGdyZXAgLXYgJ14kJyB8IGdyZXAgLXYgJ15EZWZhdWx0cycgfCBzZWQgJ3MvXi8gIC8nCmVjaG8gIuKAlOKAlOKAlCIKCiMgRmluZCBmaWxlcyB3aXRoIHNwZWNpYWwgY2FwYWJpbGl0aWVzCmVjaG8gIkZpbmRpbmcgZmlsZXMgd2l0aCBzcGVjaWFsIGNhcGFiaWxpdGllczoiCmdldGNhcCAtciAvIDI+L2Rldi9udWxsIHwgc2VkICdzL14vICAvJwplY2hvICLigJTigJTigJQi | base64 -d | bash
```

## 参考资料

[Linux Privilege Escalation | Exploit Notes](https://exploit-notes.hdks.org/exploit/linux/privilege-escalation/)

[Exploit Notes](https://exploit-notes.hdks.org/)

[whoami | J4ckie0x17](https://j4ckie0x17.gitbook.io/notes-pentesting)
