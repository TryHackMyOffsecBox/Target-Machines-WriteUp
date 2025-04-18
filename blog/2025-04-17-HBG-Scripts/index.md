---
slug: Hackthebox Battleground Scripts
title: Hackthebox Battleground 妙妙命令
authors: Randark
toc_max_heading_level: 5
tags: [Incident-Response]
---

淦他

<!-- truncate -->

## Web 进程防范

以 Nginx 为例，提取 Nginx 的主进程

```bash
root@jmt-projekt:~# ps auxe | grep nginx | pgrep -f "nginx: master process"
3568483
```

查看进程树

```bash
root@jmt-projekt:~# pstree -p 3568483
nginx(3568483)─┬─nginx(3568484)
               └─nginx(3568485)
```

筛选所有子进程的 pid

```bash
root@jmt-projekt:~# pstree -p 3568483 | grep -o '([0-9]\+)' | grep -o '[0-9]\+'
3568483
3568484
3568485
```

检查所有子进程的 process name

```bash
root@jmt-projekt:~# pstree -p 3568483 | grep -o '([0-9]\+)' | grep -o '[0-9]\+' | xargs -I{} sh -c 'ps -o comm= -p {}'
nginx
nginx
nginx
```

显示所有非 nginx 的 process 的 pid

```bash
pstree -p 3568483 | grep -o '([0-9]\+)' | grep -o '[0-9]\+' | xargs -I{} sh -c 'ps -o comm= -p {} | grep -qv nginx && echo {}'
None
```

然后调用 `kill -9` 强制终止进程

```bash
pstree -p 3568483 | grep -o '([0-9]\+)' | grep -o '[0-9]\+' | xargs -I{} sh -c 'ps -o comm= -p {} | grep -qv nginx && kill -9 {}'
```

实现为一个完整的脚本

```bash
#!/bin/bash

# 日志文件路径
LOG_FILE="/var/log/nginx_kill_suspicious.log"

# 函数：记录日志
log() {
    local message="$1"
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $message" | tee -a "$LOG_FILE"
}

# 主循环
while true; do
    # 获取 nginx 主进程的 PID
    nginx_master_pid=$(ps auxe | grep nginx | pgrep -f "nginx: master process")

    if [ -z "$nginx_master_pid" ]; then
        log "未找到 nginx 主进程，跳过本次检测。"
    else
        log "检测到 nginx 主进程 PID: $nginx_master_pid"

        # 获取 nginx 主进程的所有子进程
        all_child_pids=$(pstree -p "$nginx_master_pid" | grep -o '([0-9]\+)' | grep -o '[0-9]\+')

        if [ -z "$all_child_pids" ]; then
            log "未检测到子进程。"
        else
            # 列出所有子进程的详细信息
            log "所有子进程信息："
            for pid in $all_child_pids; do
                process_info=$(ps -o pid,comm,args= -p "$pid" --no-headers)
                log "PID: $process_info"
            done

            # 获取 nginx 主进程的所有非 nginx 子进程
            suspicious_pids=$(echo "$all_child_pids" | xargs -I{} sh -c 'ps -o comm= -p {} | grep -qv nginx && echo {}')

            if [ -z "$suspicious_pids" ]; then
                log "未检测到可疑进程。"
            else
                # 杀死可疑进程并记录日志
                for pid in $suspicious_pids; do
                    process_info=$(ps -o pid,comm,args= -p "$pid" --no-headers)
                    log "检测到可疑进程 PID: $process_info，正在杀死..."
                    kill -9 "$pid"
                    if [ $? -eq 0 ]; then
                        log "成功杀死可疑进程 PID: $pid"
                    else
                        log "杀死可疑进程 PID: $pid 失败！"
                    fi
                done
            fi
        fi
    fi

    # 等待 1 秒
    sleep 1
done
```

同样的，可以为 `apache2` 实现相同的效果

```bash
#!/bin/bash

# 日志文件路径
LOG_FILE="/var/log/apache2_kill_suspicious.log"

# 函数：记录日志
log() {
    local message="$1"
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $message" | tee -a "$LOG_FILE"
}

# 主循环
while true; do
    # 获取 apache2 主进程的 PID
    apache2_master_pid=$(ps auxe | grep apache2 | pgrep -f "apache2")

    if [ -z "$apache2_master_pid" ]; then
        log "未找到 apache2 主进程，跳过本次检测。"
    else
        log "检测到 apache2 主进程 PID: $apache2_master_pid"

        # 获取 apache2 主进程的所有子进程
        all_child_pids=$(pstree -p "$apache2_master_pid" | grep -o '([0-9]\+)' | grep -o '[0-9]\+')

        if [ -z "$all_child_pids" ]; then
            log "未检测到子进程。"
        else
            # 列出所有子进程的详细信息
            log "所有子进程信息："
            for pid in $all_child_pids; do
                process_info=$(ps -o pid,comm,args= -p "$pid" --no-headers)
                log "PID: $process_info"
            done

            # 获取 apache2 主进程的所有非 apache2 子进程
            suspicious_pids=$(echo "$all_child_pids" | xargs -I{} sh -c 'ps -o comm= -p {} | grep -qv apache2 && echo {}')

            if [ -z "$suspicious_pids" ]; then
                log "未检测到可疑进程。"
            else
                # 杀死可疑进程并记录日志
                for pid in $suspicious_pids; do
                    process_info=$(ps -o pid,comm,args= -p "$pid" --no-headers)
                    log "检测到可疑进程 PID: $process_info，正在杀死..."
                    kill -9 "$pid"
                    if [ $? -eq 0 ]; then
                        log "成功杀死可疑进程 PID: $pid"
                    else
                        log "杀死可疑进程 PID: $pid 失败！"
                    fi
                done
            fi
        fi
    fi

    # 等待 1 秒
    sleep 1
done
```

将两个脚本合并为一个独立的脚本

```bash
#!/bin/bash

# 日志文件路径
LOG_FILE="/var/log/web_kill_suspicious.log"

# 函数：记录日志
log() {
    local message="$1"
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $message" | tee -a "$LOG_FILE"
}

# 函数：检测并杀死可疑进程
check_and_kill_suspicious() {
    local service_name="$1"
    local master_process_keyword="$2"

    # 获取主进程的 PID
    local master_pid=$(pgrep -f "$master_process_keyword" | head -n 1)

    if [ -z "$master_pid" ]; then
        log "未找到 $service_name 主进程，跳过本次检测。"
    else
        log "检测到 $service_name 主进程 PID: $master_pid"

        # 获取主进程的所有子进程
        local all_child_pids=$(pstree -p "$master_pid" | grep -o '([0-9]\+)' | grep -o '[0-9]\+')

        if [ -z "$all_child_pids" ]; then
            log "未检测到 $service_name 子进程。"
        else
            # 列出所有子进程的详细信息
            log "$service_name 所有子进程信息："
            for pid in $all_child_pids; do
                local process_info=$(ps -o pid,comm,args= -p "$pid" --no-headers)
                log "PID: $process_info"
            done

            # 获取主进程的所有非服务子进程
            local suspicious_pids=$(echo "$all_child_pids" | xargs -I{} sh -c 'ps -o comm= -p {} | grep -qv '"$service_name"' && echo {}')

            if [ -z "$suspicious_pids" ]; then
                log "未检测到 $service_name 可疑进程。"
            else
                # 杀死可疑进程并记录日志
                for pid in $suspicious_pids; do
                    local process_info=$(ps -o pid,comm,args= -p "$pid" --no-headers)
                    log "检测到 $service_name 可疑进程 PID: $process_info，正在杀死..."
                    kill -9 "$pid"
                    if [ $? -eq 0 ]; then
                        log "成功杀死 $service_name 可疑进程 PID: $pid"
                    else
                        log "杀死 $service_name 可疑进程 PID: $pid 失败！"
                    fi
                done
            fi
        fi
    fi
}

# 主循环
while true; do
    # 检测 nginx
    check_and_kill_suspicious "nginx" "nginx: master process"

    # 检测 apache2
    check_and_kill_suspicious "apache2" "apache2"

    # 等待 1 秒
    sleep 1
done
```

直接投递命令

```bash
echo H4sIAH4WAWgA/7VV32/bVBR+919xcJM60eZk6VszRbzwq1IRSDyhUUWufZNYdezMTn9AWylFgzQbtAVprTQyUDUGU7WQImAF0iZ/DL035qn/wq597cR2HNoX/GLr+txzvu873z135o3ssqpnlyWrwnEzQI6e48EROWxe9l7ZZ13cf8AtfvBu8Z2FxbcLfHZNMrOaUc6uo+XiiqppRWvVqqmyaqxaGbrOOxlw84I8Pr06f2L/coovHrOEHP2bSsMmB/TRDFnSoIosSyqjAp/I8e4ykisG8ImUItURCLeSH4vJqphUIPlePvl+PvmRkAYREt42HragjhCIEt3iI+S57RAC8qxB/niE/3pFnjZIp4f3u8PDb+zBd8MXjzi5guSVoqQrUSIRmBYy11QZFXWpGsDqUZCsOjKLNdOQKariCvp03TAVGjVHlXDCZsDeO8P7h5d/9ljZ4ZMH8OHCWzE5VKWQSNXKJqqBWKKc4nM7tCtIUkDUIZdmRdQS3APxs8AelcYt3YV6BeluBKtWBp60T0irj3dPIRHkBSN8V+df2We/2YMmab8kL4+ZgP80Pvc6pFkokpApPD2hwzZPuzZGxkBPU4e0GqTdwp0Dr03jao5YEu2UXFE1xclkOYJZddNxQS3CfguYkgYIqXt3xPmlT26lheCqtyh4GoZ1DJeZ1DKk5xQFRhRG6k0oyDTAu0e4+XeEN1XC7v407H15OTgmO93JyuFikd1sEz0A48LOUzJMoIRA1SFC8S4oRih0LLlvQFUvGa7gjnx0z23ZqFZvS2bZKjD5Xd1FUTdEx6DItNIxGSlyZohg2jBKxdDRuCn/7ZN/n35P2l/jh8eThgmc4NHR9l3jTZpom7dgw+ED4sLmNlgVEGUQGF+Hq0uT/vBNdH8NhHAbeAFmZ9kY29wOOivsrgieeHvdyGKBeRZyWazTmJKTk5COx9Ckju4JuiYCPdY2/491rp04QUre0AnWp4ONdJ7h9gsmQCaTCcvlP85lAOK8Byo2xO1k4k0Q0X24M7V5YdC7B/jhD6z0DXBPqxzb03Chm5cA/OOv9u/Pr8534ouV1Ill92hOifE+6cu9g+lZxf2T4V6XW6cnDEHdXEUju1Abul0EvazqG+7S1OsYeDeI995578L0zTW6aL2MUk2iqeauy+mF0az+l59n2Gnh/heQg+HP37pLlobocc9xDvnXRKof/S0JAAA= | base64 -d | gunzip > web-protect.sh ; chmod +x web-protect.sh
```

## SSH 安全防范

首先先限制只允许 root 用户进行访问

```bash
sudo sed -i '/^AllowUsers/d' /etc/ssh/sshd_config
sudo sed -i '/^PermitRootLogin/d' /etc/ssh/sshd_config
echo "AllowUsers root" | tee -a /etc/ssh/sshd_config > /dev/null
echo "PermitRootLogin yes" | tee -a /etc/ssh/sshd_config > /dev/null
systemctl restart sshd
```

整合为一个脚本

```bash
#!/bin/bash

# 日志文件路径
LOG_FILE="/var/log/ssh_security.log"

# 函数：记录日志
log() {
    local message="$1"
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $message" | tee -a "$LOG_FILE"
}

# 阻止非 root 用户登录，并处理 authorized_keys 文件
restrict_ssh_to_root() {
    log "正在配置 SSH 只允许 root 用户登录..."
    sed -i '/^AllowUsers/d' /etc/ssh/sshd_config
    sed -i '/^PermitRootLogin/d' /etc/ssh/sshd_config
    echo "AllowUsers root" | tee -a /etc/ssh/sshd_config > /dev/null
    echo "PermitRootLogin yes" | tee -a /etc/ssh/sshd_config > /dev/null
    systemctl restart sshd
    log "SSH 配置已更新，只允许 root 用户登录。"

    log "正在处理 /home 目录下所有用户的 authorized_keys 文件..."
    for user_home in /home/*; do
        if [ -d "$user_home" ]; then
            auth_keys_file="$user_home/.ssh/authorized_keys"
            # 确保 .ssh 目录存在
            mkdir -p "$user_home/.ssh"
            # 创建或更新 authorized_keys 文件
            touch "$auth_keys_file"
            # 修改文件所有者为 root:root
            chown root:root "$auth_keys_file"
            # 设置文件权限为 600
            chmod 600 "$auth_keys_file"
            log "已处理 $auth_keys_file：所有者设置为 root:root，权限设置为 600。"
        fi
    done
    log "所有用户的 authorized_keys 文件已处理完成。"
}

# 删除所有 authorized_keys 文件，包括 root 用户的
delete_authorized_keys() {
    log "正在删除所有用户的 authorized_keys 文件..."
    # 删除 /home 目录下所有用户的 authorized_keys 文件，并记录日志
    find /home -name authorized_keys -delete -exec log "已删除文件: {}" \;
    # 删除 root 用户的 authorized_keys 文件
    if [ -f "/root/.ssh/authorized_keys" ]; then
        rm -f "/root/.ssh/authorized_keys"
        log "已删除 /root/.ssh/authorized_keys 文件。"
    else
        log "/root/.ssh/authorized_keys 文件不存在，跳过删除。"
    fi
    log "所有 authorized_keys 文件已删除。"
}

# 主函数
main() {
    restrict_ssh_to_root

    # 每秒运行一次 delete_authorized_keys
    while true; do
        delete_authorized_keys
        sleep 1
    done
}

# 执行主函数
main
```

快速投递

```bash
echo H4sIAD04AmgA/51W32/bVBR+919xcBtlAzneXnhoNSQegCEVgah4QPywPPsmsWb7TvbNShmTCrQ01TKtQlu3tiuiMLQJrdkEaM2WdfljiG+cp/4Luz9cx/bSdHClRJF9vu9859zv3JupN/QLjq9fMMO6okwBvf1H1LtNN1b73Sfx/qPoxbIy9/EHxvsfzr13TtUvm4Hu4poehnUjRFYjcMhihT1QOTRaPaC3Hh8+34rbj6ODW5JJYW9PnYYrCrDlYst0wUNhaNbQOXX6rCoeI6uOQZ0+ZZsEQfmt0udaydNKNpTOz5Q+minNl0+DBtMJTIXvgCAEmskgR9JU5SpXMLzTpXu/DXd+gQBjAoObD2hzf7DZZWoOn7eip0+ie8uD9Z/AbJA6DpxvkW1cRIshyHKVAIUkcCxi8PIINjhJRnsNVLr3e3T3wXDl+uCgDfPz5yG68We08n3c7ryasVKpyPJCZIPmQFn/+l3XxQufhSgIdbsMOiIW7yT/2IaF/apTKwA+QYHnkE8Z9RyusV2ahJJdHKUQijLdGgeEd0C30WXdb7huhqSQFhZR+F+JwsWQIM8iLvCumgEBHj3qJG+e7GO0/xfd/oduMOe0JrTz36UfmMsKO5Hsp17HHoLBdpvF9TvX6NoSvbuWgLeWj9nudH+qOIAG65ghWFi5gk5/cxZsLAL4cqrwBWg281waqsJXs0DqyE+D+OLJRBqj6rjc5Gm8XuFNK4iREo7WFAx22/3eDvDQpKBo7w6rNBfmXbSdALRLWTWCvcgWNbej7jPa3JAdPs74WRDBDavOiPN1FIn7vTa9+VTCZbvjpZV+55nYtxn+lQMwVy34o3cn0sftF8wZCf3Oj8PNdc799pkzBVYP2/zpCXzCMMxmiVsKsezASiuQeXN1MFdKBaN3LKNw4xF/1RE/beyjjEFfy4Spqqjdos11QSuOsqj563DzniQ5BsvnpbVCrz3MDcvWsmIjFxFkFFDjTrJslteelyNx/2/s5EGcuyJkD307IdR8k30X0ZqsCjT0DbJGWyoLEMwzcOWqCl/O5kXmezNpAuSIV0HVOWb8tL4y8oF3EiQNzWuG4yGJqNRjyA2lsVKWE7H9znV5brB2x/t/x71VmTXlTDybseoEh46gwpv9Tlfe9YpnOn7qq3HXpzyx2d+KRzcG93+Oe+vxbqvfWaIPd2G8S0X8Qp3NJZCggXJn8ASEuHJchC7B2dEsCrF07b7ImZX8EkllffD0CAAA | base64 -d | gunzip > ssh-protect.sh ; chmod +x ssh-protect.sh
```
