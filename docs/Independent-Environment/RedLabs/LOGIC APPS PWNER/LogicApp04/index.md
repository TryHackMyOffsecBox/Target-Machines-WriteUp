# Logic App 04 - Tamper Trigger Parameter and Abuse Storage Queue

> Tamper Trigger Parameter and Abuse Storage Queue

:::info

**Scenario**

In certain scenarios, a logic app might trigger and reveal sensitive data. Leverage this information to obtain the flag.

**Overview**

What is SAS URL (Shared Access Signature URL)?

A SAS URL (Shared Access Signature URL) is a URL that contains a shared access signature token. It allows secure access to specific resources within an Azure Storage account for a limited period, without requiring the account key. SAS URLs provide us with a way to grant granular access permissions to clients or applications without exposing the storage account keys.

What is IDOR?

IDOR, or Insecure Direct Object Reference, is a type of security vulnerability that occurs when an application provides direct access to objects based on user-supplied input. In simpler terms, it means that an attacker can manipulate input, such as URLs or form parameters, to gain unauthorized access to data.

**Hint**

- Access resources without exposing keys.

**Impact**

Logic app using request trigger with parameter here acted as an IDOR vulnerability. When triggered with the "admin" parameter the logic app revealed sensitive data.

**Reference**

- [Logic Apps Docs](https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-overview)
- [Storage Queues Docs](https://learn.microsoft.com/en-us/azure/storage/queues/storage-queues-introduction)
- [Azure Queue Connector](https://learn.microsoft.com/en-us/connectors/azurequeues/)
- [Azure Storage Explorer](https://azure.microsoft.com/en-in/products/storage/storage-explorer)

:::

题目给出了 TriggerURL 和 QueueSASURL 两个信息

如 03 的情况一样，尝试与 TriggerURL 进行交互没有数据传回，尝试通过 SAS 进行连接

```plaintext title="TriggerURL"
https://asmqiesp735.queue.core.windows.net/asvlzqgd735?sv=2019-07-07&sig=fG2EMYW0kM%2Bw9opDHbRmyKwGJe%2BIuy1ka8UD5wlgt7A%3D&se=2026-07-01T12%3A31%3A06Z&sp=r
```

通过 TriggerURL 的参数，可以确定其为 Queue 的 SAS URL

![img](img/image_20260142-214207.png)

连接即可得到答案

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
aspcyesk735astalguy735
```

</details>

:::
