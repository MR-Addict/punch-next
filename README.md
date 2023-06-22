# 值班笔记

值班笔记 Next.js 重构

![preview](preview.png)

## 1. 项目开发

添加环境变量.env：

```env
MONGODB_URI="mongodb://username:password@mongodb0.example.com:27017/"
```

开发项目:

```sh
npm run dev
```

编译项目：

```sh
npm run build
```

启动项目：

```sh
npm run start
```

格式化项目代码：

```sh
npm run format
```

## 2. 相关问题

### 2.1. 时区

时区默认使用东八区，你可以在配置文件中设置时区，配置文件的路径是`src/config.ts`：

```ts
export const config = {
  timezone: 8
};
```

### 2.2. 数据库

本项目使用`mongodb`作为数据库，只需要提供可使用数据的 URL 即可，schema 由项目配置，提交的值班笔记会保存到`stas/notes`当中。

### 2.3. 归档笔记

每学期结束后我会把本学期的笔记添加到归档页面当中，归档页面不再使用云端数据库，而是存在本地的 JSON 文件当中并编译成静态页面，以提高访问速度，JSON 文件的路径是`/src/assets` ，每条笔记的 schema 如下：

```json
{
  "_id": "unique_id",
  "date": "ISO_date",
  "group": "group_name",
  "name": "name",
  "content": "notes_content"
}
```

### 2.4. 值班时间

值班笔记可以设置值班时间，不在值班时间不能提交值班笔记，只能查看笔记。值班时间需要设置开始时间和结束时间，开始时间必须是每学期的第一天，否则页面有关周数的地方都会不准确，配置文件的路径是`/src/config.ts`，下面是一个参考示例：

```ts
export const config = {
  start: new Date("2023-02-13 00:01"),
  end: new Date("2023-06-02 23:59")
};
```

### 2.5. ISR

ISR，也就是 Next.js 的按需编译，查看笔记的页面正常情况下都是静态页面，只有在有新的提交笔记后才会重新编译更新页面，因此可以大大提高访问速度。

~~但是测试发现目前 13.3.2 版本本地使用存在问题，可是部署在 Vercel 之后又可以正常使用。这应该是 Bug，我会持续关注随时更新 Next.js 的版本。另外目前 ISR 还没有嵌入到 app 目录当中，仍然在使用 pages 中的 api。~~（更新：13.4.0 之后的稳定版本推出后，现在使用**revalidatePath**就可以很简单地在服务端重新编译想要的静态页面，不需要另开 API 了。）

## 3. 相关链接

- [https://punch.mraddict.top](https://punch.mraddict.top)

> 原项目地址（已弃用）:
>
> - [https://github.com/MR-Addict/punch](https://github.com/MR-Addict/punch)
