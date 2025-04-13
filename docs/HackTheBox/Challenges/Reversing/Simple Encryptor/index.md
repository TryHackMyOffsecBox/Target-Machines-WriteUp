# Simple Encryptor

:::note CHALLENGE DESCRIPTION

Difficulty: VERY EASY

On our regular checkups of our secret flag storage server we found out that we were hit by ransomware! The original flag data is nowhere to be found, but luckily we not only have the encrypted file but also the encryption program itself.

在我们对秘密旗帜存储服务器的例行检查中，我们发现服务器遭到了勒索软件的攻击！原始旗帜数据已经无处可寻，但幸运的是，我们不仅有加密文件，还有加密程序本身。

:::

首先，先尝试使用 `IDA` 进行反编译

```c
int __fastcall main(int argc, const char **argv, const char **envp)
{
    char v3; // al
    char v5; // [rsp+7h] [rbp-39h]
    unsigned int seed[2]; // [rsp+8h] [rbp-38h] BYREF
    __int64 i; // [rsp+10h] [rbp-30h]
    FILE *stream; // [rsp+18h] [rbp-28h]
    size_t size; // [rsp+20h] [rbp-20h]
    void *ptr; // [rsp+28h] [rbp-18h]
    FILE *s; // [rsp+30h] [rbp-10h]
    unsigned __int64 v12; // [rsp+38h] [rbp-8h]

    v12 = __readfsqword(0x28u);

    // 文件内容读取
    stream = fopen("flag", "rb"); // 建立 flag 文件的指针，read byte
    fseek(stream, 0LL, 2);
    size = ftell(stream);
    fseek(stream, 0LL, 0);
    ptr = malloc(size);
    fread(ptr, size, 1uLL, stream);
    fclose(stream);

    // 随机化初始化
    seed[0] = time(0LL);
    srand(seed[0]);

    // 加密
    for (i = 0LL; i < (__int64)size; ++i )
    {
        *((_BYTE *)ptr + i) ^= rand();
        v3 = rand();
        v5 = *((_BYTE *)ptr + i);
        seed[1] = v3 & 7;
        *((_BYTE *)ptr + i) = __ROL1__(v5, v3 & 7);
    }

    // 文件写入指针
    s = fopen("flag.enc", "wb");
    // 写入随机化种子
    fwrite(seed, 1uLL, 4uLL, s);
    // 写入加密后文件内容
    fwrite(ptr, 1uLL, size, s);
    fclose(s);

    return 0;
}
```

那么题目已经提供了 `flag.enc` 文件的前提下，将加密过程反向处理为解密过程即可

```c
#include <stdio.h>
#include <stdlib.h>

unsigned char ror(unsigned char val, int shift) {
    shift %= 8;
    return (val>> shift) | ((val << (8 - shift)) & 0xFF);
}

int main() {
    FILE *f = fopen("flag.enc", "rb");
    unsigned int seed;
    fread(&seed, 4, 1, f);
    srand(seed);

    fseek(f, 0, SEEK_END);
    long size = ftell(f) - 4;
    fseek(f, 4, SEEK_SET);

    unsigned char *data = malloc(size);
    fread(data, 1, size, f);
    fclose(f);

    for (long i = 0; i < size; i++) {
        int r1 = rand();
        int r2 = rand();
        data[i] = ror(data[i], r2 & 7);
        data[i] ^= r1 & 0xFF;
    }

    FILE *out = fopen("flag.dec", "wb");
    fwrite(data, 1, size, out);
    fclose(out);
    free(data);
    return 0;
}
```

:::warning

Linux 系统和 Windows 系统的随机数算法不一致，这里题目环境为 Linux 系统，需要使用 Linux 系统执行解密脚本

:::

编译解密脚本之后执行即可

```bash
┌──(randark ㉿ kali)-[~/tmp]
└─$ gcc solve.c -o solve

┌──(randark ㉿ kali)-[~/tmp]
└─$ ./solve

┌──(randark ㉿ kali)-[~/tmp]
└─$ cat flag.dec
HTB{vRy_s1MplE_F1LE3nCryp0r}
```

即可得到答案

```flag
HTB{vRy_s1MplE_F1LE3nCryp0r}
```
