# The Needle

:::note CHALLENGE DESCRIPTION

VERY EASY

As a part of our SDLC process, we've got our firmware ready for security testing. Can you help us by performing a security assessment?

:::

尝试使用 `binwalk` 进行固件分析

```shell
┌──(randark ㉿ kali)-[~/tmp]
└─$ binwalk firmware.bin

DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             Linux kernel ARM boot executable zImage (big-endian)
14419         0x3853          xz compressed data
14640         0x3930          xz compressed data
538952        0x83948         Squashfs filesystem, little endian, version 4.0, compression:xz, size: 2068458 bytes, 995 inodes, blocksize: 262144 bytes, created: 2021-03-11 03:18:10
```

将其全部进行解包

```shell
┌──(randark ㉿ kali)-[~/tmp]
└─$ binwalk -e firmware.bin

DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             Linux kernel ARM boot executable zImage (big-endian)
14419         0x3853          xz compressed data
14640         0x3930          xz compressed data

WARNING: Extractor.execute failed to run external extractor 'sasquatch -p 1 -le -d'squashfs-root-0''%e'': [Errno 2] No such file or directory: 'sasquatch', 'sasquatch -p 1 -le -d'squashfs-root-0''%e'' might not be installed correctly

WARNING: Extractor.execute failed to run external extractor 'sasquatch -p 1 -be -d'squashfs-root-0''%e'': [Errno 2] No such file or directory: 'sasquatch', 'sasquatch -p 1 -be -d'squashfs-root-0''%e'' might not be installed correctly

WARNING: Symlink points outside of the extraction directory: /home/randark/tmp/_firmware.bin.extracted/squashfs-root/var -> /tmp; changing link target to /dev/null for security purposes.

WARNING: Symlink points outside of the extraction directory: /home/randark/tmp/_firmware.bin.extracted/squashfs-root/etc/TZ -> /tmp/TZ; changing link target to /dev/null for security purposes.

WARNING: Symlink points outside of the extraction directory: /home/randark/tmp/_firmware.bin.extracted/squashfs-root/etc/localtime -> /tmp/localtime; changing link target to /dev/null for security purposes.

WARNING: Symlink points outside of the extraction directory: /home/randark/tmp/_firmware.bin.extracted/squashfs-root/etc/resolv.conf -> /tmp/resolv.conf; changing link target to /dev/null for security purposes.

WARNING: Symlink points outside of the extraction directory: /home/randark/tmp/_firmware.bin.extracted/squashfs-root/etc/mtab -> /proc/1366/mounts; changing link target to /dev/null for security purposes.

WARNING: Symlink points outside of the extraction directory: /home/randark/tmp/_firmware.bin.extracted/squashfs-root/etc/ppp/resolv.conf -> /tmp/resolv.conf.ppp; changing link target to /dev/null for security purposes.
538952        0x83948         Squashfs filesystem, little endian, version 4.0, compression:xz, size: 2068458 bytes, 995 inodes, blocksize: 262144 bytes, created: 2021-03-11 03:18:10
```

解压后得到

```shell
┌──(randark ㉿ kali)-[~/tmp/_firmware.bin.extracted]
└─$ lh
total 36M
-rw-r--r--  1 randark randark  16M Mar 10 22:46 3853.xz
-rw-r--r--  1 randark randark 1.4M Mar 10 22:46 3930
-rw-r--r--  1 randark randark  16M Mar 10 22:46 3930.xz
-rw-r--r--  1 randark randark 2.0M Mar 10 22:46 83948.squashfs
drwxr-xr-x 16 randark randark 4.0K Mar 10 22:46 squashfs-root
drwxr-xr-x  2 randark randark 4.0K Mar 10 22:46 squashfs-root-0
```

进而找到固件的目录

```shell
┌──(randark ㉿ kali)-[~/tmp/_firmware.bin.extracted/squashfs-root]
└─$ lh
total 56K
drwxr-xr-x  2 randark randark 4.0K Mar  9  2021 bin
drwxr-xr-x  2 randark randark 4.0K Feb 21  2017 dev
drwxr-xr-x 18 randark randark 4.0K Mar 10 22:46 etc
drwxr-xr-x 11 randark randark 4.0K Mar  9  2021 lib
drwxr-xr-x  2 randark randark 4.0K Feb 21  2017 mnt
drwxr-xr-x  2 randark randark 4.0K Feb 21  2017 overlay
drwxr-xr-x  2 randark randark 4.0K Feb 21  2017 proc
drwxr-xr-x  2 randark randark 4.0K Feb 21  2017 rom
drwxr-xr-x  2 randark randark 4.0K Feb 21  2017 root
drwxr-xr-x  2 randark randark 4.0K Mar  9  2021 sbin
drwxr-xr-x  2 randark randark 4.0K Feb 21  2017 sys
drwxrwxrwt  2 randark randark 4.0K Feb 21  2017 tmp
drwxr-xr-x  7 randark randark 4.0K Feb 21  2017 usr
lrwxrwxrwx  1 randark randark    9 Mar 10 22:46 var -> /dev/null
drwxr-xr-x  4 randark randark 4.0K Feb 21  2017 www
```

在 `etc/config` 文件夹中发现

```plaintext title="./etc/config/sign"
qS6-X/n]u>fVfAt!
```

同时发现

```shell title="./squashfs-root/etc/scripts/telnetd.sh"
#!/bin/sh
sign=`cat /etc/config/sign`
TELNETD=`rgdb
TELNETD=`rgdb -g /sys/telnetd`
if ["$TELNETD" = "true"]; then
        echo "Start telnetd ..." > /dev/console
        if [-f "/usr/sbin/login"]; then
                lf=`rgbd -i -g /runtime/layout/lanif`
                telnetd -l "/usr/sbin/login" -u Device_Admin:$sign      -i $lf &
        else
                telnetd &
        fi
fi
```

那么就得到了一组凭据

```plaintext
Device_Admin:qS6-X/n]u>fVfAt!
```

尝试交互

```shell
┌──(randark ㉿ kali)-[~/tmp/_firmware.bin.extracted]
└─$ nc 94.237.57.88 55437
��������
ng-1332175-hwtheneedle-atb8k-796cfdbdd7-rvdts login: Device_Admin
Device_Admin
Password: qS6-X/n]u>fVfAt!

ng-1332175-hwtheneedle-atb8k-796cfdbdd7-rvdts:~$ ^[[49;50Rcat flag.txt
cat flag.txt
HTB{4_hug3_blund3r_d289a1_!!}
```

```plaintext title="Flag"
HTB{4_hug3_blund3r_d289a1_!!}
```
