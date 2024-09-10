# 值班笔记

值班笔记 Next.js 重构。

<img width="400" src="preview.jpg" alt="preview" />

本项目主要是个南京工业大学校大学生科协技术开发部使用的值班笔记，用来让大家记录值班期间所作的活动，同时做个值班备份，让后人可以来查看。

## 1. 项目说明

### 1.1. 数据库

本项目使用`mongodb`作为数据库，只需要提供数据库的 URI 即可，新提交的值班笔记会存到`stas/notes`路径下。

### 1.2. 笔记归档

每学期结束后我会把本学期的笔记添加到归档页面当中，归档页面不再使用数据库存储，而是使用本地的 JSON 文件，并编译成静态页面以提高访问速度。JSON 文件的路径是`archive` ，每条笔记的 schema 如下：

```json
{
  "_id": "string",
  "date": "string",
  "week": "number",
  "name": "string",
  "content": "string"
}
```

### 1.3. 值班时间

值班笔记可以设置值班时间，不在值班时间不能提交值班笔记，只能查看笔记。需要设置的时间有**第一周时间**，**开始时间**，**结束时间**和**当前学期**，第一周时间必须是每学期的第一天，否则页面有关学期周数的地方都会不准确，另外第一周时间和开始时间不一定要一样。

下面是一个参考示例：

```conf
FIRST_WEEK="2024-09-02 00:01"
START_DATE="2024-09-02 00:01"
END_DATE="2025-01-19 23:59"
CURRENT_TERM="2024-2025年第一学期"
```

### 1.4. ISR

ISR，也就是 Next.js 的按需编译，查看笔记的页面正常情况下都是静态页面，只有在有新的提交笔记后才会重新编译，这样可以显著提高访问流畅度。

~~但是测试发现目前 13.3.2 版本本地使用存在问题，可是部署在 Vercel 之后又可以正常使用。这应该是 Bug，我会持续关注随时更新 Next.js 的版本。另外目前 ISR 还没有嵌入到 app 目录当中，仍然在使用 pages 中的 api。~~（更新：13.4.0 之后的稳定版本推出后，现在使用 **revalidatePath** 就可以很简单地在服务端重新编译想要的静态页面，不需要另开 API 了。）

## 2. Docker部署

我已经提前编译好了 Docker 镜像，可以直接使用，部署的话记得修改其中的环境变量：

```yaml
services:
  punch:
    image: mraddict063/punch
    restart: unless-stopped
    ports:
      - 3000:3000
    environment:
      - FIRST_WEEK=2024-09-02 00:01
      - START_DATE=2024-09-02 00:01
      - END_DATE=2025-01-19 23:59
      - CURRENT_TERM=2024-2025年第一学期
      - MONGODB_URI=mongodb://punch:punch@mongodb:27017
    depends_on:
      - mongodb

  mongodb:
    image: mongo
    restart: unless-stopped
    environment:
      - MONGO_INITDB_ROOT_USERNAME=punch
      - MONGO_INITDB_ROOT_PASSWORD=punch
    volumes:
      - ./data:/data/db
```

## 3. 原项目地址

原来的项目已经不再维护，但是仍然可以使用：

- [https://github.com/MR-Addict/punch](https://github.com/MR-Addict/punch)
