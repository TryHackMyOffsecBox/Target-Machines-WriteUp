# Micro-CMS v1

## 1 XSS

访问服务

![img](img/image_20250512-091200.png)

点击`Create a new page`尝试创建页面

![img](img/image_20250520-092000.png)

既然是可以控制页面内容，可以考虑储存型XSS

![img](img/image_20250521-092132.png)

很明显失败了，因为页面内容包裹在`scrubbed`标签中

![img](img/image_20250522-092211.png)

尝试在标题处进行注入

![img](img/image_20250522-092240.png)

返回主页之后，即可触发XSS

![img](img/image_20250524-092444.png)

![img](img/image_20250524-092455.png)

## 2 SQLi

在页面编辑页面，URL参数中很明显的是int作为页面索引

![img](img/image_20250526-092655.png)

尝试在`9`后面添加一个单引号

![img](img/image_20250527-092738.png)

TODO 未完成
