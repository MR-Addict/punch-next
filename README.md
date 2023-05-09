# 值班笔记

值班笔记 Next.js 重构

![preview](preview.png)

## 1. 开发项目

添加环境变量 env：

```env
MONGODB_URI="mongodb://username:password@mongodb0.example.com:27017/"
```

开发项目:

```bash
npm run dev
```

## 2. 相关问题

关于**时区**，默认使用东八区。

关于**数据库**，本项目使用 **mongodb** 作为数据库，只需要提供正确的 URL 即可，schema 由项目配置，正确连接后提交的值班笔记会存到 **stas/notes** 当中。

关于**归档**，每学期结束后我会把本学期的笔记添加到归档页面当中，归档页面不再使用云端数据库，而是存在本地的 JSON 文件当中并编译成静态页面，以提高访问速度。

关于**ISR**，也就是 Next.js 的按需编译，查看笔记页面只有在有人提交笔记后才会重新编译更新页面，正常的时候都是静态页面，因此可以大大提高用户体验。~~但是测试发现目前 13.3.2 版本本地使用存在问题，可是部署在 Vercel 之后又可以正常使用。这应该是 Bug，我会持续关注随时更新 Next.js 的版本。另外目前 ISR 还没有嵌入到 app 目录当中，仍然在使用 pages 中的 api。~~（更新：13.4.0 之后的稳定版本推出后增加的**server action**绝对又是一个全栈开发的利器，让前后端交互更为轻松，但是我没有在这个项目使用。不过另外一个小更新完美解决了 ISR 的问题，现在使用**revalidatePath**就可以很简单地在服务端重新编译想要的静态页面，不需要另开 API 了。）

## 3. 相关链接

- [https://punch.mraddict.top](https://punch.mraddict.top)

> 原项目地址（已弃用）:
>
> - [https://github.com/MR-Addict/punch](https://github.com/MR-Addict/punch)
