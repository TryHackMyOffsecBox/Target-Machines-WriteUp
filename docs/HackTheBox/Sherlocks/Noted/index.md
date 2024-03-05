# Noted

:::info Sherlock Scenario

Simon, a developer working at Forela, notified the CERT team about a note that appeared on his desktop. The note claimed that his system had been compromised and that sensitive data from Simon's workstation had been collected. The perpetrators performed data extortion on his workstation and are now threatening to release the data on the dark web unless their demands are met. Simon's workstation contained multiple sensitive files, including planned software projects, internal development plans, and application codebases. The threat intelligence team believes that the threat actor made some mistakes, but they have not found any way to contact the threat actors. The company's stakeholders are insisting that this incident be resolved and all sensitive data be recovered. They demand that under no circumstances should the data be leaked. As our junior security analyst, you have been assigned a specific type of DFIR (Digital Forensics and Incident Response) investigation in this case. The CERT lead, after triaging the workstation, has provided you with only the Notepad++ artifacts, suspecting that the attacker created the extortion note and conducted other activities with hands-on keyboard access. Your duty is to determine how the attack occurred and find a way to contact the threat actors, as they accidentally locked out their own contact information. Warning : This sherlock requires an element of OSINT and players will need to interact with 3rd party services on internet.

西蒙，Forela 的一名开发人员，向 CERT 团队报告了他的桌面上出现的一条笔记。该笔记声称他的系统已被入侵，并且西蒙工作站中的敏感数据已被收集。犯罪分子在他的工作站上实施了数据勒索，现在威胁要将数据发布在暗网上，除非他们的要求得到满足。西蒙的工作站包含多个敏感文件，包括计划中的软件项目、内部开发计划和应用程序代码库。威胁情报团队认为威胁参与者犯了一些错误，但他们没有找到任何联系威胁参与者的方法。该公司的利益相关者坚持要求解决此事件并恢复所有敏感数据。他们要求在任何情况下都不应泄露数据。作为我们的初级安全分析师，您已在此案例中被分配了一项特定类型的 DFIR（数字取证和事件响应）调查。CERT 负责人对工作站进行分类后，仅向您提供了 Notepad++ 工件，怀疑攻击者创建了勒索信并通过键盘访问进行了其他活动。您的职责是确定攻击是如何发生的，并找到联系威胁参与者的方法，因为他们意外地锁定了自己的联系信息。警告：此 sherlock 需要 OSINT 的元素，玩家需要与互联网上的第三方服务进行交互。
:::

## 题目数据

[Noted.zip](./Noted.zip)

## Task 1

> 西蒙用于 AWS 操作的脚本的完整路径是什么？

首先先将样本进行解压，压缩包内的目录为

```plaintext
\Noted\C\Users\Simon.stark\AppData\Roaming\Notepad++
```

得到以下文件

```plaintext
D:.
│  config.xml
│  session.xml
│
└─backup
        LootAndPurge.java@2023-07-24_145332
        YOU HAVE BEEN HACKED.txt@2023-07-24_150548
```

在 `config.xml` 中得到以下记录

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<NotepadPlus>
    <FindHistory nbMaxFindHistoryPath="10" nbMaxFindHistoryFilter="10" nbMaxFindHistoryFind="10" nbMaxFindHistoryReplace="10" matchWord="no" matchCase="no" wrap="yes" directionDown="yes" fifRecuisive="yes" fifInHiddenFolder="no" fifProjectPanel1="no" fifProjectPanel2="no" fifProjectPanel3="no" fifFilterFollowsDoc="no" fifFolderFollowsDoc="no" searchMode="0" transparencyMode="1" transparency="150" dotMatchesNewline="no" isSearch2ButtonsMode="no" regexBackward4PowerUser="no" bookmarkLine="no" purge="no" />
    <History nbMaxFile="10" inSubMenu="no" customLength="-1">
        <File filename="C:\Program Files\Notepad++\change.log" />
        <File filename="C:\Users\Simon.stark\Documents\Internal-DesktopApp\Prototype-Internal_Login.cs" />
        <File filename="C:\Users\Simon.stark\Documents\Dev-WebServer-BetaProd\dev2prod_fileupload.php" />
        <File filename="C:\Users\Simon.stark\Documents\Internal-DesktopApp\App_init_validation.yml" />
        <File filename="C:\Users\Simon.stark\Documents\Dev_Ops\AWS_objects migration.pl" />
```

```plaintext title="Answer"
C:\Users\Simon.stark\Documents\Dev_Ops\AWS_objects migration.pl
```

## Task 2

> 攻击者复制了一些程序代码并在系统上对其进行了编译，因为他们知道受害者是一名软件工程师，并且拥有所有必需的实用程序。他们这样做是为了融入环境，并且没有携带任何工具。该代码收集了敏感数据并为其外泄做好了准备。该程序源文件的完整路径是什么？

在 `session.xml` 中得到

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<NotepadPlus>
    <Session activeView="0">
        <mainView activeIndex="1">
            <File firstVisibleLine="21" xOffset="0" scrollWidth="848" startPos="1697" endPos="1697" selMode="0" offset="0" wrapCount="1" lang="Java" encoding="-1" userReadOnly="no" filename="C:\Users\Simon.stark\Desktop\LootAndPurge.java" backupFilePath="C:\Users\Simon.stark\AppData\Roaming\Notepad++\backup\LootAndPurge.java@2023-07-24_145332" originalFileLastModifTimestamp="-1354503710" originalFileLastModifTimestampHigh="31047188" tabColourId="-1" mapFirstVisibleDisplayLine="-1" mapFirstVisibleDocLine="-1" mapLastVisibleDocLine="-1" mapNbLine="-1" mapHigherPos="-1" mapWidth="-1" mapHeight="-1" mapKByteInDoc="512" mapWrapIndentMode="-1" mapIsWrap="no" />
            <File firstVisibleLine="0" xOffset="0" scrollWidth="1072" startPos="672" endPos="672" selMode="0" offset="0" wrapCount="1" lang="None (Normal Text)" encoding="-1" userReadOnly="no" filename="C:\Users\Simon.stark\Desktop\YOU HAVE BEEN HACKED.txt" backupFilePath="C:\Users\Simon.stark\AppData\Roaming\Notepad++\backup\YOU HAVE BEEN HACKED.txt@2023-07-24_150548" originalFileLastModifTimestamp="1536217129" originalFileLastModifTimestampHigh="31047190" tabColourId="-1" mapFirstVisibleDisplayLine="-1" mapFirstVisibleDocLine="-1" mapLastVisibleDocLine="-1" mapNbLine="-1" mapHigherPos="-1" mapWidth="-1" mapHeight="-1" mapKByteInDoc="512" mapWrapIndentMode="-1" mapIsWrap="no" />
        </mainView>
        <subView activeIndex="0" />
    </Session>
</NotepadPlus>
```

```plaintext title="Answer"
C:\Users\Simon.stark\Desktop\LootAndPurge.java
```

## Task 3

> 包含所有要外泄的数据的最终存档文件的文件名是什么？

在 `backup\LootAndPurge.java@2023-07-24_145332` 中得到源码数据

```java
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class Sensitive_data_extort {
    public static void main(String[] args) {
        String username = System.getProperty("user.name");
        String desktopDirectory = "C:\\Users\\" + username + "\\Desktop\\";
        List<String> extensions = Arrays.asList("zip", "docx", "ppt", "xls", "md", "txt", "pdf");
        List<File> collectedFiles = new ArrayList<>();

        collectFiles(new File(desktopDirectory), extensions, collectedFiles);

        String zipFilePath = desktopDirectory + "Forela-Dev-Data.zip";
        String password = "sdklY57BLghvyh5FJ#fion_7";

        createZipArchive(collectedFiles, zipFilePath, password);

        System.out.println("Zip archive created successfully at:" + zipFilePath);
    }

    private static void collectFiles(File directory, List<String> extensions, List<File> collectedFiles) {
        File[] files = directory.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    collectFiles(file, extensions, collectedFiles);
                } else {
                    String fileExtension = getFileExtension(file.getName());
                    if (extensions.contains(fileExtension)) {
                        collectedFiles.add(file);
                    }
                }
            }
        }
    }


    private static String getFileExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf(".");
        if (dotIndex> 0 && dotIndex < fileName.length() - 1) {
            return fileName.substring(dotIndex + 1).toLowerCase();
        }
        return "";
    }

    private static void createZipArchive(List<File> files, String zipFilePath, String password) {
        byte[] buffer = new byte[1024];

        try (ZipOutputStream zipOutputStream = new ZipOutputStream(new FileOutputStream(zipFilePath))) {
            zipOutputStream.setMethod(ZipOutputStream.DEFLATED);
            zipOutputStream.setComment("Forela-Dev-Data.zip");
            zipOutputStream.setPassword(password.toCharArray());

            for (File file : files) {
                FileInputStream fileInputStream = new FileInputStream(file);
                zipOutputStream.putNextEntry(new ZipEntry(file.getName()));

                int length;
                while ((length = fileInputStream.read(buffer)) > 0) {
                    zipOutputStream.write(buffer, 0, length);
                }

                zipOutputStream.closeEntry();
                fileInputStream.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

```plaintext title="Answer"
Forela-Dev-Data.zip
```

## Task 4

> 攻击者最后修改程序源文件时的 UTC 时间戳是什么？

在 `Task 2` 中得到以下信息

```plaintext
backupFilePath="C:\Users\Simon.stark\AppData\Roaming\Notepad++\backup\LootAndPurge.java@2023-07-24_145332"
originalFileLastModifTimestamp="-1354503710"
originalFileLastModifTimestampHigh="31047188"
```

根据 `Notepad++` 社区提供给的信息 [Need Explanation of a few Session.xml Parameters & Values | Notepad++ Community](https://community.notepad-plus-plus.org/topic/22662/need-explanation-of-a-few-session-xml-parameters-values)

使用脚本进行计算

```python
import datetime

timestamp_low = -1354503710
timestamp_high = 31047188

full_timestamp = (timestamp_high << 32) | (timestamp_low & 0xFFFFFFFF)

timestamp_seconds = full_timestamp / 10**7
timestamp = datetime.datetime(1601, 1, 1) + datetime.timedelta(seconds=timestamp_seconds)

print(timestamp)
# 2023-07-24 09:53:23.322723
```

```plaintext title="Answer"
2023-07-24 09:53:23
```

## Task 5

> 攻击者在窃取数据后写了一份数据勒索信。攻击者要求付款的加密钱包地址是什么？

在 `backup\YOU HAVE BEEN HACKED.txt@2023-07-24_150548` 中，得到

```plaintext
HEllo

This note is placed in your desktop and copied to other locations too. You have been hacked and your data has been deleted from your
system. We made copies of your sensitive data and uploaded to our servers. The rule is simple

                                                       YOU PAY US
                                                           AND
                         WE DO NOT RELEASE YOUR COMPANY SECRETS TO PUBLIC AND RETURN YOUR DATA SAFELY TO YOU


Failiure to oblige will result in immediate data leak to the public.

For detailed information and process , Visit below link

https://pastebin.com/CwhBVzPq

OR

https://pastes.io/mvc6sue6cf
```

在上面的链接中，查看具体的信息都需要密码，然后在源码中注意到

```java
String password = "sdklY57BLghvyh5FJ#fion_7";
```

使用 `sdklY57BLghvyh5FJ#fion_7` 作为密码成功得到进一步的付款信息

```plaintext
If you are here then you know that you have no other choice than to pay us.Your Sensitive DATA is in our hands and we WILL release it to PUBLIC By midnight if you don't pay us a ransom.

We Want 50000e $ in ETH currency by midnight. This amount is very reasonable as we know FORELA is a multi million dollar company, but since we were able to extort small amount of data , this is our final offer.

Ethereum Wallet: 0xca8fa8f0b631ecdb18cda619c4fc9d197c8affca

Person of contact : CyberJunkie@mail2torjgmxgexntbrmhvgluavhj7ouul5yar6ylbvjkxwqf6ixkwyd.onion
```

```plaintext title="Answer"
0xca8fa8f0b631ecdb18cda619c4fc9d197c8affca
```

## Task 6

> 联系支持人员的电子邮件地址是什么？

上一题中就有

```plaintext title="Answer"
CyberJunkie@mail2torjgmxgexntbrmhvgluavhj7ouul5yar6ylbvjkxwqf6ixkwyd.onion
```
