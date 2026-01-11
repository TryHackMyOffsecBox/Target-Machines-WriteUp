# Logic App 20 - Modify Workflow and Abuse Storage Table

> Modify Workflow and Abuse Storage Table

:::info

**Scenario**

Sometimes the user whom we compromised can have permission to edit the workflow of the logic app. Abuse the permission of the user on the logic and read the flag from the table storage.

**Overview**

What is logic app workflow?

A logic app workflow is a visual representation and implementation of a business process or integration scenario in Azure Logic Apps. It defines the steps, actions, and conditions that are executed in a specific sequence to automate a particular workflow.

**Hint**

- make use of the storage table connector action.

**Impact**

- With appropriate permissions in the logic app we could manipulate the logic app to interact with other services and perform malicious activity.

**Reference**

- [Logic Apps Docs](https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-overview)
- [Azure table storage Docs](https://learn.microsoft.com/en-us/azure/storage/tables/table-storage-overview)
- [Azure Table Storage Connector](https://learn.microsoft.com/en-us/connectors/azuretables/)

:::

同样的，题目给出了 UserCreds 信息，登陆后查看所有资源

![img](img/image_20260154-215412.png)

同样的流程，进入 Logic app 的编辑界面

![img](img/image_20260155-215538.png)

根据题目要求，在其中加入对 Azure 表储存的操作

指定目标的资源

![img](img/image_20260104-220445.png)

将获得的数据添加到返回中

![img](img/image_20260104-220453.png)

保存后，触发 Logic app

![img](img/image_20260105-220508.png)

:::info Flags

<details>

<summary> Which storage table logic app connector (ignore the version) did we use to fetch the flag? (Get entities or Get file content) </summary>

```plaintext
Get entities
```

</details>

<details>

<summary> What is the flag value we obtain ? </summary>

```plaintext
asyjnrsp735asjdmopg735
```

</details>

:::
