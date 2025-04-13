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
```

更简单一点，一行执行

```bash
echo IyEvYmluL2Jhc2gKCiMgRnVuY3Rpb24gdG8gY2hlY2sgaWYgYSBjb21tYW5kIGV4aXN0cwpjaGVja19jb21tYW5kKCkgewogICAgaWYgY29tbWFuZCAtdiAkMSAmPiAvZGV2L251bGw7IHRoZW4KICAgICAgICByZXR1cm4gMAogICAgZWxzZQogICAgICAgIHJldHVybiAxCiAgICBmaQp9CgojIENoZWNrIGlmIHNzIGFuZCBsc29mIGV4aXN0CmlmIGNoZWNrX2NvbW1hbmQgc3MgJiYgY2hlY2tfY29tbWFuZCBsc29mOyB0aGVuCiAgICBlY2hvICJEZXRlY3RlZCBzcyBhbmQgbHNvZiwgZXhlY3V0aW5nIHJlbGF0ZWQgY29tbWFuZHMuLi4iCiAgICBzcyAtdHVsbiB8IGdyZXAgTElTVEVOIHwgZ3JlcCAiMC4wLjAuMCIgfCB3aGlsZSByZWFkIC1yIGxpbmU7IGRvCiAgICAgICAgcG9ydD0kKGVjaG8gIiRsaW5lIiB8IGF3ayAne3ByaW50ICQ1fScgfCByZXYgfCBjdXQgLWQnOicgLWYxIHwgcmV2KQogICAgICAgIHBpZD0kKGxzb2YgLWkgOiRwb3J0IHwgZ3JlcCBMSVNURU4gfCBhd2sgJ3twcmludCAkMn0nIHwgaGVhZCAtbiAxKQogICAgICAgIGlmIFsgLW4gIiRwaWQiIF07IHRoZW4KICAgICAgICAgICAgY21kbGluZT0kKGNhdCAvcHJvYy8kcGlkL2NtZGxpbmUgfCB0ciAnXDAnICcgJykKICAgICAgICAgICAgZWNobyAtZSAiUG9ydDogJHBvcnQsIFBJRDogJHBpZFxu4oCUPiBDb21tYW5kOiAkKGVjaG8gIiRjbWRsaW5lIiB8IHNlZCAtRSAncy8oYXBhY2hlMj98bmdpbnh8amF2YXxweXRob258bm9kZXxmdHApL1x4MWJbMzFtJlx4MWJbMG0vZycpIgogICAgICAgIGVsc2UKICAgICAgICAgICAgZWNobyAtZSAiUG9ydDogJHBvcnQsIFBJRDogTm90IGZvdW5kXG7igJQ+IENvbW1hbmQ6IE5vdCBhdmFpbGFibGUiCiAgICAgICAgZmkKICAgIGRvbmUKIyBDaGVjayBpZiBuZXRzdGF0IGV4aXN0cwplbGlmIGNoZWNrX2NvbW1hbmQgbmV0c3RhdDsgdGhlbgogICAgZWNobyAiRGV0ZWN0ZWQgbmV0c3RhdCwgZXhlY3V0aW5nIHJlbGF0ZWQgY29tbWFuZHMuLi4iCiAgICBuZXRzdGF0IC1hbm9wdCB8IGdyZXAgIjo6OiIgfCB3aGlsZSByZWFkIC1yIGxpbmU7IGRvCiAgICAgICAgcGlkPSQoZWNobyAiJGxpbmUiIHwgYXdrICd7cHJpbnQgJDd9JyB8IGN1dCAtZCcvJyAtZjEpCiAgICAgICAgcG9ydD0kKGVjaG8gIiRsaW5lIiB8IGF3ayAne3ByaW50ICQ0fScgfCByZXYgfCBjdXQgLWQnOicgLWYxIHwgcmV2KQogICAgICAgIGNtZGxpbmU9JChjYXQgL3Byb2MvIiRwaWQiL2NtZGxpbmUgfCB0ciAnXDAnICcgJykKICAgICAgICBlY2hvIC1lICJQb3J0OiAkcG9ydCwgUElEOiAkcGlkXG7igJQ+IENvbW1hbmQ6ICQoZWNobyAiJGNtZGxpbmUiIHwgc2VkIC1FICdzLyhhcGFjaGUyP3xuZ2lueHxqYXZhfHB5dGhvbnxub2RlfGZ0cCkvXHgxYlszMW0mXHgxYlswbS9nJykiCiAgICBkb25lCiMgSWYgbm9uZSBvZiB0aGUgY29tbWFuZHMgZXhpc3QKZWxzZQogICAgZWNobyAtZSAiXHgxYlszMW1XYXJuaW5nOiBOZWl0aGVyIHNzLCBsc29mLCBub3IgbmV0c3RhdCBjb21tYW5kcyB3ZXJlIGZvdW5kLiBUaGUgc2NyaXB0IGNhbm5vdCBwcm9jZWVkLlx4MWJbMG0iCiAgICBleGl0IDEKZmkKCiMgT3V0cHV0IGEgc2VwYXJhdG9yCmVjaG8gLWUgIlxuIyMg4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCUICMjXG4iCgojIENoZWNrIGlmIG5naW54IGV4aXN0cwppZiBjaGVja19jb21tYW5kIG5naW54OyB0aGVuCiAgICBlY2hvICJEZXRlY3RlZCBuZ2lueCwgYW5hbHl6aW5nIGl0cyBjb25maWd1cmF0aW9uLi4uIgoKICAgICMgR2V0IHRoZSBmaXJzdCBub24tbG9vcGJhY2sgbmV0d29yayBpbnRlcmZhY2UKICAgIGludGVyZmFjZT0kKGlwIC00IGFkZHIgc2hvdyB8IGdyZXAgLXYgJyBsbzonIHwgYXdrICcvXlswLTldKzovIHtwcmludCAkMn0nIHwgY3V0IC1kJzonIC1mMSB8IGhlYWQgLW4gMSkKCiAgICAjIEdldCB0aGUgSVAgYWRkcmVzcyBvZiB0aGUgZmlyc3Qgbm9uLWxvb3BiYWNrIGludGVyZmFjZQogICAgaXA9JChpcCAtNCBhZGRyIHNob3cgIiRpbnRlcmZhY2UiIHwgZ3JlcCAtb1AgJyg/PD1pbmV0XHMpXGQrKFwuXGQrKXszfScpCgogICAgIyBJbml0aWFsaXplIGEgdmFyaWFibGUgdG8gc3RvcmUgYWxsIGhvc3RzCiAgICBhbGxfaG9zdHM9IiIKCiAgICAjIExvb3AgdGhyb3VnaCBhbGwgZW5hYmxlZCBuZ2lueCBjb25maWd1cmF0aW9uIGZpbGVzCiAgICBmb3IgZmlsZSBpbiAvZXRjL25naW54L3NpdGVzLWVuYWJsZWQvKjsgZG8KICAgICAgICAjIEV4dHJhY3Qgc2VydmVyX25hbWVzIGFuZCByb290IGRpcmVjdG9yeQogICAgICAgIHNlcnZlcl9uYW1lcz0kKHNlZCAtbiAnL15ccypzZXJ2ZXJfbmFtZVxzLio7XHMqJC9wJyAiJGZpbGUiIHwgYXdrIC1GICdzZXJ2ZXJfbmFtZScgJ3twcmludCAkMn0nIHwgc2VkICdzLzsvL2cnIHwgdHIgLXMgJyAnKQogICAgICAgIHJvb3RfZGlyPSQoc2VkIC1uICcvXlxzKnJvb3Rccy4qO1xzKiQvcCcgIiRmaWxlIiB8IGF3ayAne3ByaW50ICQyfScgfCBzZWQgJ3MvOy8vZycpCgogICAgICAgICMgSWYgc2VydmVyX25hbWVzIGFyZSBmb3VuZCwgcHJpbnQgdGhlIGRldGFpbHMKICAgICAgICBpZiBbIC1uICIkc2VydmVyX25hbWVzIiBdOyB0aGVuCiAgICAgICAgICAgIGVjaG8gLWUgIkZpbGU6ICRmaWxlXG5Sb290OiAkcm9vdF9kaXJcbkhvc3RzOiIKICAgICAgICAgICAgZWNobyAiJHNlcnZlcl9uYW1lcyIgfCBhd2sgLXYgaXA9IiRpcCIgJ3twcmludCBpcCwgJDB9JwogICAgICAgICAgICBhbGxfaG9zdHMrPSIkKGVjaG8gIiRzZXJ2ZXJfbmFtZXMiIHwgYXdrIC12IGlwPSIkaXAiICd7cHJpbnQgaXAsICQwfScpXG4iCiAgICAgICAgICAgIGVjaG8gIuKAlOKAlOKAlCIKICAgICAgICBmaQogICAgZG9uZQoKICAgICMgUHJpbnQgdW5pcXVlIGhvc3RzCiAgICBlY2hvIC1lICJcblVuaXF1ZSBIb3N0czoiCiAgICBlY2hvIC1lICIkYWxsX2hvc3RzIiB8IHNvcnQgfCB1bmlxCmVsc2UKICAgIGVjaG8gIk5naW54IGlzIG5vdCBpbnN0YWxsZWQuIgpmaQoKIyBPdXRwdXQgYSBzZXBhcmF0b3IKZWNobyAtZSAiXG4jIyDigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJQgIyNcbiIKCiMgQ2hlY2sgaWYgYXBhY2hlIChodHRwZCkgZXhpc3RzCmlmIGNoZWNrX2NvbW1hbmQgYXBhY2hlMiB8fCBjaGVja19jb21tYW5kIGh0dHBkOyB0aGVuCiAgICBlY2hvICJEZXRlY3RlZCBhcGFjaGUsIGFuYWx5emluZyBpdHMgY29uZmlndXJhdGlvbi4uLiIKCiAgICAjIEdldCB0aGUgZmlyc3Qgbm9uLWxvb3BiYWNrIG5ldHdvcmsgaW50ZXJmYWNlCiAgICBpbnRlcmZhY2U9JChpcCAtNCBhZGRyIHNob3cgfCBncmVwIC12ICcgbG86JyB8IGF3ayAnL15bMC05XSs6LyB7cHJpbnQgJDJ9JyB8IGN1dCAtZCc6JyAtZjEgfCBoZWFkIC1uIDEpCgogICAgIyBHZXQgdGhlIElQIGFkZHJlc3Mgb2YgdGhlIGZpcnN0IG5vbi1sb29wYmFjayBpbnRlcmZhY2UKICAgIGlwPSQoaXAgLTQgYWRkciBzaG93ICIkaW50ZXJmYWNlIiB8IGdyZXAgLW9QICcoPzw9aW5ldFxzKVxkKyhcLlxkKyl7M30nKQoKICAgICMgSW5pdGlhbGl6ZSBhIHZhcmlhYmxlIHRvIHN0b3JlIGFsbCBob3N0cwogICAgYWxsX2hvc3RzPSIiCgogICAgIyBMb29wIHRocm91Z2ggYWxsIGVuYWJsZWQgYXBhY2hlIGNvbmZpZ3VyYXRpb24gZmlsZXMKICAgIGZvciBmaWxlIGluIC9ldGMvYXBhY2hlMi9zaXRlcy1lbmFibGVkLyo7IGRvCiAgICAgICAgIyBFeHRyYWN0IFNlcnZlck5hbWUgYW5kIFNlcnZlckFsaWFzCiAgICAgICAgc2VydmVyX25hbWU9JChzZWQgLW4gJy9eXHMqU2VydmVyTmFtZVxzLiokL3AnICIkZmlsZSIgfCBhd2sgJ3twcmludCAkMn0nKQogICAgICAgIHNlcnZlcl9hbGlhc2VzPSQoc2VkIC1uICcvXlxzKlNlcnZlckFsaWFzXHMuKiQvcCcgIiRmaWxlIiB8IGF3ayAne3ByaW50ICQyfScpCgogICAgICAgICMgQ29tYmluZSBTZXJ2ZXJOYW1lIGFuZCBTZXJ2ZXJBbGlhcwogICAgICAgIGlmIFsgLW4gIiRzZXJ2ZXJfbmFtZSIgXTsgdGhlbgogICAgICAgICAgICBob3N0cz0iJHNlcnZlcl9uYW1lIgogICAgICAgICAgICBpZiBbIC1uICIkc2VydmVyX2FsaWFzZXMiIF07IHRoZW4KICAgICAgICAgICAgICAgIGhvc3RzKz0iICRzZXJ2ZXJfYWxpYXNlcyIKICAgICAgICAgICAgZmkKCiAgICAgICAgICAgICMgRXh0cmFjdCBEb2N1bWVudFJvb3QKICAgICAgICAgICAgZG9jdW1lbnRfcm9vdD0kKHNlZCAtbiAnL15ccypEb2N1bWVudFJvb3Rccy4qJC9wJyAiJGZpbGUiIHwgYXdrICd7cHJpbnQgJDJ9JykKCiAgICAgICAgICAgICMgUHJpbnQgdGhlIGRldGFpbHMKICAgICAgICAgICAgZWNobyAtZSAiRmlsZTogJGZpbGVcbkRvY3VtZW50Um9vdDogJGRvY3VtZW50X3Jvb3Rcbkhvc3RzOiIKICAgICAgICAgICAgZWNobyAiJGhvc3RzIiB8IHRyICcgJyAnXG4nIHwgYXdrIC12IGlwPSIkaXAiICd7cHJpbnQgaXAsICQwfScKICAgICAgICAgICAgYWxsX2hvc3RzKz0iJChlY2hvICIkaG9zdHMiIHwgdHIgJyAnICdcbicgfCBhd2sgLXYgaXA9IiRpcCIgJ3twcmludCBpcCwgJDB9JylcbiIKICAgICAgICAgICAgZWNobyAi4oCU4oCU4oCUIgogICAgICAgIGZpCiAgICBkb25lCgogICAgIyBQcmludCB1bmlxdWUgaG9zdHMKICAgIGVjaG8gLWUgIlxuVW5pcXVlIEhvc3RzOiIKICAgIGVjaG8gLWUgIiRhbGxfaG9zdHMiIHwgc29ydCB8IHVuaXEKZWxzZQogICAgZWNobyAiQXBhY2hlIGlzIG5vdCBpbnN0YWxsZWQuIgpmaQoKIyBPdXRwdXQgYSBzZXBhcmF0b3IKZWNobyAtZSAiXG4jIyDigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJQgIyNcbiIKCiMgQ2hlY2sgL2V0Yy9zdWRvZXJzIGZpbGUgKGV4Y2x1ZGluZyBjb21tZW50cykKZWNobyAiQ2hlY2tpbmcgL2V0Yy9zdWRvZXJzIChhY3RpdmUgY29uZmlndXJhdGlvbnMgb25seSk6IgpncmVwIC12ICdeIycgL2V0Yy9zdWRvZXJzIHwgZ3JlcCAtdiAnXiQnIHwgc2VkICdzL14vICAvJwplY2hvICLigJTigJTigJQiCgojIEZpbmQgU1VJRCBmaWxlcwplY2hvICJGaW5kaW5nIFNVSUQgZmlsZXM6IgpmaW5kIC8gLXBlcm0gLXU9cyAtdHlwZSBmIC1leGVjdXRhYmxlIDI+L2Rldi9udWxsCmVjaG8gIuKAlOKAlOKAlCIKCiMgRmluZCBmaWxlcyB3aXRoIHNwZWNpYWwgY2FwYWJpbGl0aWVzCmVjaG8gIkZpbmRpbmcgZmlsZXMgd2l0aCBzcGVjaWFsIGNhcGFiaWxpdGllczoiCmdldGNhcCAtciAvIDI+L2Rldi9udWxsIHwgc2VkICdzL14vICAvJwplY2hvICLigJTigJTigJQi | base64 -d | bash
```

使用 gzip 进一步压缩体积

```bash
echo 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 | base64 -d | gunzip | bash
```

## 参考资料

[Linux Privilege Escalation | Exploit Notes](https://exploit-notes.hdks.org/exploit/linux/privilege-escalation/)

[Exploit Notes](https://exploit-notes.hdks.org/)

[whoami | J4ckie0x17](https://j4ckie0x17.gitbook.io/notes-pentesting)
