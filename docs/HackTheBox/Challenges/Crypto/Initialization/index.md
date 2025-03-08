# Initialization

:::note CHALLENGE DESCRIPTION

Difficulty: VERY EASY

During a cyber security audit of your government&#039;s infrastructure, you discover log entries showing traffic directed towards an IP address within the enemy territory of &quot;Oumara&quot;. This alarming revelation triggers suspicion of a mole within Lusons&#039; government. Determined to unveil the truth, you analyze the encryption scheme with the goal of breaking it and decrypting the suspicious communication. Your objective is to extract vital information and gather intelligence, ultimately protecting your nation from potential threats.

在对政府基础设施进行网络安全审计时，你发现了一些日志条目，显示流量被定向到敌对国家 “Oumara” 境内的一个 IP 地址。这一令人震惊的发现引发了怀疑，认为 Lusons 政府内部可能存在内奸。为了揭露真相，你决定分析加密方案，目标是破解它并解密这些可疑的通信。你的目标是提取关键信息并收集情报，最终保护你的国家免受潜在的威胁。

:::

```python title="source.py"
#!/usr/bin/env python3

import os
from Crypto.Util import Counter
from Crypto.Util.Padding import pad
from Crypto.Cipher import AES

class AdvancedEncryption:
    def __init__(self, block_size):
        self.KEYS = self.generate_encryption_keys()
        self.CTRs = [Counter.new(block_size) for i in range(len(MSG))] # nonce reuse : avoided!

    def generate_encryption_keys(self):
        keys = [[b'\x00']*16] * len(MSG)
        for i in range(len(keys)):
            for j in range(len(keys[i])):
                keys[i][j] = os.urandom(1)
        return keys

    def encrypt(self, i, msg):
        key = b''.join(self.KEYS[i])
        ctr = self.CTRs[i]
        cipher = AES.new(key, AES.MODE_CTR, counter=ctr)
        return cipher.encrypt(pad(msg.encode(), 16))

def main():
    AE = AdvancedEncryption(128)
    with open('output.txt', 'w') as f:
        for i in range(len(MSG)):
            ct = AE.encrypt(i, MSG[i])
            f.write(ct.hex()+'\n')

if __name__ == '__main__':
    with open('messages.txt') as f:
        MSG = eval(f.read())
    main()
```

```plaintext title="messages.txt"
[
    'This is some public information that can be read out loud.',
    'No one can crack our encryption algorithm.',
    'HTB{?????????????????????????????????????????????}',
    'Secret information is encrypted with Advanced Encryption Standards.',
]
```

看起来就是实现了一个 AES 加密逻辑，尝试编写解密脚本

```python
from pwn import unhex, xor

P = [i.strip() for i in open("messages.txt", "r").read()[1:-2].replace(",", "").strip().split("'") if i.strip() != ""]

C = open("output.txt", "r").read().splitlines()

res = xor(unhex(C[2]), unhex(C[3]), P[3].encode())

res = "".join([chr(i) for i in res if i in range(0, 127)])

res = res[0 : res.find("}") + 1]

print(res)
```

```plaintext title="Flag"
HTB{d4mn_th3s3_ins3cur3_bl0ckch41n_p4r4m3t3rs!!!!}
```
