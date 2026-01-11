# Logic App 10 - Abusing Storage Container (New) Trigger

> Abusing Storage Container (New) Trigger

:::info

**Scenario**

Logic apps use connectors that perform defined actions when triggered, which when misconfigured or when the trigger URL is exposed could reveal sensitive data. Abuse the storage blob connector and obtain the flag.

**Overview**

What is blob trigger?

The "Blob" trigger is a type of trigger that allows us to initiate a workflow whenever a new or modified blob (file) is detected within a specified Azure Blob storage container.

**Hint**

- Add something to me and I will add something.

**Reference**

- [Logic Apps Docs](https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-overview)
- [Storage Queues Docs](https://learn.microsoft.com/en-us/azure/storage/queues/storage-queues-introduction)
- [Storage Blob Docs](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview)
- [Azure Blob Connector](https://learn.microsoft.com/en-us/connectors/azureblob/)

:::

题目只给出了 UserCreds 这一信息

根据题目信息，探测用户权限，发现可以访问 Container

![img](img/image_20260124-222424.png)

以及访问 Queue 的权限 (没有更改)

![img](img/image_20260124-222437.png)

尝试上传几份文件

![img](img/image_20260127-222710.png)

稍等片刻，即可在 Queue 中得到答案

![img](img/image_20260127-222759.png)

:::info Flags

<details>

<summary> In which storage account service did we find the flag value? (Container, Queue, Table or File) </summary>

```plaintext
Queue
```

</details>

<details>

<summary> What is the flag value we obtain ? </summary>

```plaintext
asuzomvi735asbqiefk735
```

</details>

:::
