# Photon Lockdown

:::note CHALLENGE DESCRIPTION

Difficulty: VERY EASY

We've located the adversary's location and must now secure access to their Optical Network Terminal to disable their internet connection. Fortunately, we've obtained a copy of the device's firmware, which is suspected to contain hardcoded credentials. Can you extract the password from it?

我们已经定位到对手的位置，现在需要确保能够访问他们的光纤网络终端（ONT），以切断他们的互联网连接。幸运的是，我们获取了该设备的固件副本，怀疑其中可能包含硬编码的凭证。你能从中提取出密码吗？

:::

解压附件压缩包，得到

```plaintext
D:.
└─ONT
        fwu_ver
        hw_ver
        rootfs
```

将 `rootfs` 文件使用 7-zip 进行解包，得到固件的文件系统

```plaintext
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----           2022/8/10    10:53                bin
d----           2022/8/10    10:50                dev
d----           2023/10/1    14:48                etc
d----           2023/10/1    14:51                home
d----           2023/10/1    14:53                image
d----           2022/8/10    10:53                lib
d----           2022/8/10    10:50                overlay
d----           2022/8/10    10:50                proc
d----           2022/8/10    10:50                run
d----           2022/8/10    10:50                sys
d----           2022/8/10    10:50                usr
d----           2022/8/10    10:50                var
-a---           2022/8/10    10:53              0 .lstripped
-a---            2024/3/9    11:49              0 config
```

在 `\etc\config_default.xml` 文件中，得到

```xml
<Value Name="SUSER_NAME" Value="admin"/>
<Value Name="SUSER_PASSWORD" Value="HTB{N0w_Y0u_C4n_L0g1n}"/>
<Value Name="ADSL_TONE" Value="00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00"/>
<Value Name="DIRECT_BRIDGE_MODE" Value="1"/>
```

```plaintext title="Flag"
HTB{N0w_Y0u_C4n_L0g1n}
```
