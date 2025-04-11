# Murphy

## 信息搜集

```shell
Nmap scan report for bogon (10.10.110.102)
Host is up (0.22s latency).
Not shown: 65533 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.0p1 Ubuntu 6build1 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   3072 65:7f:5a:d3:9d:29:86:9f:f3:54:b7:85:fa:8c:c1:c8 (RSA)
|   256 9d:2a:4f:58:71:1d:36:d5:8c:d2:ee:da:df:74:ad:3f (ECDSA)
|_  256 a6:a2:66:6e:06:24:bf:2e:8e:1d:c6:a2:fe:03:3d:a0 (ED25519)
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
|_http-title: Space and Time
|_http-server-header: Apache/2.4.41 (Ubuntu)
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
Device type: general purpose
Running: Linux 4.X|5.X
OS CPE: cpe:/o:linux:linux_kernel:4 cpe:/o:linux:linux_kernel:5
OS details: Linux 4.15 - 5.19
Uptime guess: 37.159 days (since Wed Mar  5 16:28:13 2025)
Network Distance: 2 hops
TCP Sequence Prediction: Difficulty=253 (Good luck!)
IP ID Sequence Generation: All zeros
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

## 漏洞文件

```php titile="/dashboard/call.php"
<?php

if(isset($_POST['call'])){
        function stripos_array($h, $n){
                foreach($n as $ns) {
                        if(($r = stripos($h, $ns)) !== false) {
                                return $r;
                        }
                }

                return false;
        }

        $call = $_POST['call'];
        $dir = "/bin";
        $block = scandir($dir);
        if(stripos_array($call, $block) === false){
                $regex = '/[#$%^&()+=\\[\]\';,.\/{}":<>?~\\\\]/';
                if(preg_match($regex, $call)){
                        echo 'Something went wrong!';
                }
                else {
                        echo exec($call);
                }
        }
        else {
                echo 'Something went wrong';
        }

}
?>
```
