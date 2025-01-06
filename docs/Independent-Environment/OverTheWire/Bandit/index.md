# Bandit

:::info

The Bandit wargame is aimed at absolute beginners. It will teach the basics needed to be able to play other wargames.

Bandit 夺旗游戏专为绝对初学者设计。它将教授参与其他夺旗游戏所需的基础知识。

:::

:::note Note for beginners

这个游戏和大多数其他游戏一样，是按关卡组织的。你从第 0 关开始，尝试 “通过” 或 “完成” 它。完成一个关卡后，你会获得关于如何开始下一关的信息。网站上的 `Level <X>` 页面包含了如何从上一关进入第 X 关的信息。例如，“Level 1” 的页面提供了从第 0 关进入第 1 关的方法。本游戏的每个关卡都有对应的页面，所有这些页面都可以通过本页面左侧的侧边菜单访问。

在游戏中，你会遇到许多完全不知道该怎么做的情况。别慌！也不要放弃！这个游戏的目的是让你学习基础知识，而学习基础知识的一部分就是阅读大量的新信息。如果你从未使用过命令行，一个好的起点是阅读这篇用户命令的入门介绍。

当你不知道如何继续时，可以尝试以下几种方法：

1. 如果你知道一个命令，但不知道如何使用它，可以通过输入 `man <命令>` 来查看手册（man 页面）。例如，输入 `man ls` 学习 `ls` 命令。`man` 命令本身也有手册，可以试试 `man man`。在使用 `man` 时，按 `q` 键退出（你也可以使用 `/` 搜索，按 `n` 和 `N` 切换搜索结果）。
2. 如果没有 `man` 页面，该命令可能是 `shell` 内置命令。这种情况下，可以使用 `help <命令>` 来查看帮助。例如，`help cd`。
3. 使用搜索引擎：你的搜索引擎是你最好的朋友，学会如何高效使用它！推荐使用 Google。
4. 如果仍然卡住，可以通过聊天加入我们的讨论。

你已经准备好开始了！从页面左侧链接的第 0 关开始吧。祝你好运！

:::

## Level 0

:::info Level Goal

本关的目标是让您使用 SSH 登录游戏。您需要连接的主机是 `bandit.labs.overthewire.org`，端口为 2220。用户名为 `bandit0`，密码为 `bandit0`。登录后，请访问 “第 1 关” 页面，了解如何闯过第 1 关。

:::

构建 SSH 登录命令参数

```shell
┌──(randark ㉿ kali)-[~]
└─$ ssh bandit0@bandit.labs.overthewire.org -p 2220
# ASCII Art
bandit0@bandit.labs.overthewire.org's password:

# ASCII Art

Welcome to OverTheWire!

If you find any problems, please report them to the #wargames channel on
discord or IRC.

--[Playing the games]--

  This machine might hold several wargames.
  If you are playing "somegame", then:

    * USERNAMES are somegame0, somegame1, ...
    * Most LEVELS are stored in /somegame/.
    * PASSWORDS for each level are stored in /etc/somegame_pass/.

  Write-access to homedirectories is disabled. It is advised to create a
  working directory with a hard-to-guess name in /tmp/.  You can use the
  command "mktemp -d" in order to generate a random and hard to guess
  directory in /tmp/.  Read-access to both /tmp/ is disabled and to /proc
  restricted so that users cannot snoop on eachother. Files and directories
  with easily guessable or short names will be periodically deleted! The /tmp
  directory is regularly wiped.
  Please play nice:

    * don't leave orphan processes running
    * don't leave exploit-files laying around
    * don't annoy other players
    * don't post passwords or spoilers
    * again, DONT POST SPOILERS!
      This includes writeups of your solution on your blog or website!

--[Tips]--

  This machine has a 64bit processor and many security-features enabled
  by default, although ASLR has been switched off.  The following
  compiler flags might be interesting:

    -m32                    compile for 32bit
    -fno-stack-protector    disable ProPolice
    -Wl,-z,norelro          disable relro

  In addition, the execstack tool can be used to flag the stack as
  executable on ELF binaries.

  Finally, network-access is limited for most levels by a local
  firewall.

--[Tools]--

 For your convenience we have installed a few useful tools which you can find
 in the following locations:

    * gef (https://github.com/hugsy/gef) in /opt/gef/
    * pwndbg (https://github.com/pwndbg/pwndbg) in /opt/pwndbg/
    * gdbinit (https://github.com/gdbinit/Gdbinit) in /opt/gdbinit/
    * pwntools (https://github.com/Gallopsled/pwntools)
    * radare2 (http://www.radare.org/)

--[More information]--

  For more information regarding individual wargames, visit
  http://www.overthewire.org/wargames/

  For support, questions or comments, contact us on discord or IRC.

  Enjoy your stay!

bandit0@bandit:~$ whoami
bandit0
```

## Level 0 → Level 1

:::info Level Goal

下一级的密码保存在主目录下名为 `readme` 的文件中。 使用此密码通过 SSH 登录 `bandit1`。 每当找到某个关卡的密码时，请使用 SSH（2220 端口）登录该关卡并继续游戏。

:::

首先查看文件内容

```shell
bandit0@bandit:~$ cat readme 
Congratulations on your first steps into the bandit game!!
Please make sure you have read the rules at https://overthewire.org/rules/
If you are following a course, workshop, walkthrough or other educational activity,
please inform the instructor about the rules as well and encourage them to
contribute to the OverTheWire community so we can keep these games free!

The password you are looking for is: ZjLjTmM6FvvyRnrb2rfNWOZOTa6ip5If
```

接下来登录`bandit1`用户

```shell
┌──(randark㉿kali)-[~]
└─$ ssh bandit1@bandit.labs.overthewire.org -p 2220
# ......
bandit1@bandit:~$ whoami
bandit1
```

TODO 未完成
