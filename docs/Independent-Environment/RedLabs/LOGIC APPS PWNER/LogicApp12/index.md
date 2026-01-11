# Logic App 12 - Tamper Trigger Parameter and Key Vault

> Tamper Trigger Parameter and Key Vault

:::info

**Scenario**

Logic apps use connectors that perform defined actions when triggered, which when misconfigured or when the trigger URL is exposed could reveal sensitive data. Abuse the key vault connector and obtain the flag.

**Overview**

What is a logic app?

Azure Logic Apps is a cloud-based service provided by Microsoft Azure that allows us to create and run automated workflows and integrate various applications, systems, and services.

What is Azure key vault?

A Key Vault is a secure cloud service in Azure that allows us to safeguard and manage cryptographic keys, secrets, and certificates. It provides a centralized location for storing and managing sensitive information used by our applications and services.

What is Requests trigger?

Azure Logic Apps, the "Requests" trigger is a commonly used trigger that allows us to initiate a workflow whenever an HTTP request is received.

**Hint**

- IDORs are common web application vulnerabilities.

**Reference**

- [Logic Apps Docs](https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-overview)
- [Key Vault Docs](https://learn.microsoft.com/en-us/azure/key-vault/general/overview)
- [Key Vault Connector](https://learn.microsoft.com/en-us/connectors/keyvault/)

:::

题目给出的是一个 TriggerURL

```plaintext title="TriggerURL"
https://prod-09.australiaeast.logic.azure.com/workflows/3fdcd3fe123e43f9bbc409d80306707b/triggers/manual/paths/invoke/%7Bname%7D?api-version=2018-07-01-preview&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Q3qIe2Yesx9QpNt0KeG9cxPN8MFDBfoQOj78x1FF_t4
```

尝试将其中的 `{name}` 更改为 `admin`

![img](img/image_20260159-225905.png)

即可得到答案

:::info Flags

<details>

<summary> What parameter was used to get the flag value from the key vault secret? (admin or debug) </summary>

```plaintext
admin
```

</details>

<details>

<summary> What is the flag value we obtain ? </summary>

```plaintext
asochwpj735asptxzuf735
```

</details>

:::
