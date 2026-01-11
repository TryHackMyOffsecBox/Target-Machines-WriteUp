# Storage Account 02 - Subdomain Enumeration

> Subdomain Enumeration

:::info

**Scenario**

The storage account is a service provided by Azure to store data. Since, a storage account has a globally unique name it is possible to perform subdomain enumeration and access storage account containers that have anonymous access enabled on them. Find one using the provided wordlist and obtain a flag.

**Overview**

What is anonymous blob or container access?

Azure Blob Storage provides the user settings to enable public access to individual blobs or containers. Setting the access level of a container or blob to "Public Blob" or "Public Container" allows anonymous read access to the resources.

**Hint**

- Storage containers and blobs can be accessed anonymously.

**Impact**

- A lot of companies allow anonymous container access which could cause unauthorized access to data, data leakage, and malicious activity. In some cases due to lack of accountability in anonymous access, it becomes difficult to identify the source of unauthorized access to the resource, which can hinder incident response and forensic investigations during security incidents.
- Enabling anonymous access may introduce compliance and regulatory challenges, especially if the data stored in the container is subject to specific regulations or data protection requirements.

**Reference**

- [Storage Blob Docs](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction)
- [Microburst](https://github.com/NetSPI/MicroBurst/tree/master)
- [torage Explorer](https://azure.microsoft.com/en-in/products/storage/storage-explorer)

:::

下载完字典文件，爆破就完事了

```powershell
PS D:\_Tools\MicroBurst> Import-Module .\MicroBurst.psm1
Imported Az MicroBurst functions
AzureAD module not installed, checking other modules
MSOnline module not installed, checking other modules
Imported Misc MicroBurst functions
Imported Azure REST API MicroBurst functions

PS D:\_Tools\MicroBurst> cd D:\Downloads\
PS D:\Downloads> Invoke-EnumerateAzureBlobs -Permutations ".\wordlist.txt" -Folders ".\wordlist.txt"
Found Storage Account -  asbmprcz736.blob.core.windows.net

Found Container - asbmprcz736.blob.core.windows.net/asbmprcz736
```

连接即可

![img](img/image_20260114-231444.png)

:::info Flags

<details>

<summary> What technique did we use to find the storage account name? (subdomain enumeration or email harvesting) </summary>

```plaintext
subdomain enumeration
```

</details>

<details>

<summary>  What is the flag value? </summary>

```plaintext
ashpuxvs736asyszqgp736
```

</details>

:::
