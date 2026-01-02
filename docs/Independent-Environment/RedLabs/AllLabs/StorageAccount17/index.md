# Storage Account 17 - Enumerate Blob Name

> Enumerate Blob Name

:::info

**Scenario**

Storage Account is a service provided by Azure, since Storage Accounts have a globally unique name it is possible to perform subdomain enumeration and access Storage Account containers that have anonymous access enabled on them. Find one now using the wordlist provided.

**Overview**

What is anonymous blob or container access?

Azure Blob Storage provides the user settings to enable public access to individual blobs or containers. Setting the access level of a container or blob to "Public Blob" or "Public Container" allows anonymous read access to the resources.

**Hint**

- Storage account containers and blobs can be accessed anonymously.

**Impact**

- A lot of companies allow anonymous container access which could unauthorized access to data, data leakage malicious activity in some cases anonymous access due to lack of accountability it becomes difficult to identify the source of unauthorized access to the resource, which can hinder incident response and forensic investigations during security incidents.
- Enabling anonymous access may introduce compliance and regulatory challenges, especially if the data stored in the container is subject to specific regulations or data protection requirements.

**Reference**

- [Storage Blob Docs](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction)
- [Dirsearch](https://github.com/maurosoria/dirsearch)

:::

题目给出了两个信息，分别是 BlobURL 和 Wordlist

简单写一个爆破脚本遍历一下

```python
import requests

with open("./wordlist.txt", "r") as file:
    dics = [line.strip() for line in file.readlines()]

base_url = "https://asgqhykbaxts735.blob.core.windows.net/aslpezroxubd735/"

for dic in dics:
    url = base_url + dic
    response = requests.get(url)
    if response.status_code == 200:
        print(f"Found: {url}")
        print(response.content.decode())
        break
    else:
        print(f"Not Found: {url}")
```

运行即可得到结果

:::info Flags

<details>

<summary> What technique did we use to find the blob name? (subdomain enumeration or directory busting) </summary>

```plaintext
directory busting
```

<summary> What is the flag value? </summary>

```plaintext
asktpsnfylic735asshodzifqvx735
```

</details>

:::
