# Ancient Encodings

:::note CHALLENGE DESCRIPTION

VERY EASY

Your initialization sequence requires loading various programs to gain the necessary knowledge and skills for your journey. Your first task is to learn the ancient encodings used by the aliens in their communication.

:::

在附件中得到加密脚本

```python
from Crypto.Util.number import bytes_to_long
from base64 import b64encode
from secret import FLAG


def encode(message):
    return hex(bytes_to_long(b64encode(message)))


def main():
    encoded_flag = encode(FLAG)
    with open("output.txt", "w") as f:
        f.write(encoded_flag)


if __name__ == "__main__":
    main()
```

编写解密脚本

```python
from Crypto.Util.number import long_to_bytes
from base64 import b64encode, b64decode

with open("output.txt", "r") as f:
    data = f.read()

data = b64decode(long_to_bytes(int(data, 16)).decode()).decode()

print(data)
```

```plaintext title="Flag"
HTB{411_7h3_3nc0d1n9_423_h323_70_574y}
```
