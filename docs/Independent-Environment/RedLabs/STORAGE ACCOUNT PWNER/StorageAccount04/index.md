# Storage Account 04 - Connection String

> Connection String

:::info

**Scenario**

A connection string is one way to access a storage account without credentials. Let's make the most use of the one provided to use and find the flag.

**Overview**

What is a connection string?

A connection string in the Azure storage account is a string that contains the necessary details to create a connection between the application and the Azure storage account. It contains the authentication credentials and other necessary details to access the storage account.

**Hint**

- Storage account can be accessed via a connection string.

**Impact**

- A leak of the connection string for an Azure storage account can have a significant security impact. It can be used for unauthorized access to the storage account, which may lead to data breach, account compromise, increased attack surface, and loss of control. Changing account credentials takes a considerable amount of time, disrupting workflow in the process.

**Reference**

- [Storage Blob Docs](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction)
- [Azure Storage Explorer](https://azure.microsoft.com/en-in/products/storage/storage-explorer)
- [Storage connection strings](https://learn.microsoft.com/en-us/azure/data-explorer/kusto/api/connection-strings/storage-connection-strings)

:::

题目给出了 ConnectionString 信息，可以用于直接连接储存账户

![img](img/image_20260152-225202.png)

输入 ConnectionString 进行连接

![img](img/image_20260152-225229.png)

即可得到flag

![img](img/image_20260153-225326.png)

:::info Flags

<details>

<summary> What type of credential did we use to connect to the storage account? (Access key or connection string) </summary>

```plaintext
connection string
```

</details>

<details>

<summary> What is the flag value? </summary>

```plaintext
kswhcmqupz7525041dzxfjwlksn7752514asuxejgp736asvemowk736
```

</details>

:::
