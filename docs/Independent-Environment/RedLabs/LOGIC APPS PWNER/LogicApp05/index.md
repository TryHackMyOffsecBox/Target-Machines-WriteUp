# Logic App 05 - Tamper Trigger Parameter and Abuse Storage Table

> Tamper Trigger Parameter and Abuse Storage Table

:::info

**Scenario**

Logic apps use connectors that perform defined actions when triggered, which when misconfigured or when the trigger URL is exposed could reveal sensitive data. Abuse the exposed trigger URL and obtain the flag.

**Overview**

What is SAS URL (Shared Access Signature URL)?

A SAS URL (Shared Access Signature URL) is a URL that contains a shared access signature token. It allows secure access to specific resources within an Azure Storage account for a limited period, without requiring the account key. SAS URLs provide us with a way to grant granular access permissions to clients or applications without exposing the storage account keys.

**Hint**

- Access resources without exposing keys.

**Impact**

Logic app using request trigger with parameter here acted as an IDOR vulnerability. When triggered with the "admin" parameter the logic app revealed sensitive data. Here the logic app is integrated with multiple other Azure services, which is a storage table for this case. Here the logic app trigger URL is exposing the sensitive data from the table.

**Reference**

- [Logic Apps Docs](https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-overview)
- [Table Storage Docs](https://learn.microsoft.com/en-us/azure/storage/tables/table-storage-overview)
- [Azure Table Connector](https://learn.microsoft.com/en-us/connectors/azuretables/)
- [Azure Storage Explorer](https://azure.microsoft.com/en-in/products/storage/storage-explorer)

:::

题目给出了 TriggerURL 和 TableSASURL 两个信息

首先先触发 TriggerURL 之后，去看 TableSASURL

需要注意的是，如果没有触发 TriggerURL 就去访问 TableSASURL 的话，里面是没有数据的

![img](img/image_20260153-215335.png)

:::info Flags

<details>

<summary> In which storage account service did we find the flag value? (Container, Queue, Table or File) </summary>

```plaintext
Table
```

</details>

<details>

<summary> What is the flag value we obtain ? </summary>

```plaintext
asufoaki735asnphkji735
```

</details>

:::
