# Logic App 01 - Tamper Trigger Parameter

> Tamper Trigger Parameter

:::info

**Scenario**

Some developers leave some sensitive parameters that reveal sensitive data. Find the parameter in the URL and obtain the flag.

**Overview**

What is a logic app?

Azure Logic Apps is a cloud-based service provided by Microsoft Azure that allows us to create and run automated workflows and integrate various applications, systems, and services.

What is Requests trigger?

Azure Logic Apps, the "Requests" trigger is a commonly used trigger that allows us to initiate a workflow whenever an HTTP request is received.

What is IDOR?

IDOR, or Insecure Direct Object Reference, is a type of security vulnerability that occurs when an application provides direct access to objects based on user-supplied input. In simpler terms, it means that an attacker can manipulate input, such as URLs or form parameters, to gain unauthorized access to data.

**Hint**

- IDORs are common web application vulnerabilities.

**Impact**

- Logic app using request trigger with parameter here acted as an IDOR vulnerability. When triggered with the "admin" parameter the logic app revealed sensitive data.

**Reference**

- [Logic Apps Docs](https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-overview)
- [Logic Apps Docs](https://learn.microsoft.com/en-us/azure/connectors/connectors-native-reqres?tabs=consumption)

:::

题目给出的是 TriggerURL

直接 GET 请求一下看看

![img](img/image_20260155-205501.png)

注意到 url 中的 `{admin}` 参数

![img](img/image_20260155-205548.png)

修改为 `admin`

![img](img/image_20260156-205609.png)

:::info Flags

<details>

<summary> What was the parameter which revealed the flag value? (admin or debug) </summary>

```plaintext
admin
```

<summary> What is the flag value we obtain ? </summary>

```plaintext
aswrafuk735asaetbjv735
```

</details>

:::
