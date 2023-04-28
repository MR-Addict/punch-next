# 值班笔记-Next.js

值班笔记 Next.js 重构

## 1. 部署

添加环境变量：

```env
MONGODB_URI="mongodb://username:password@mongodb0.example.com:27017/"
```

编译项目:

```bash
npm run build
```

启动项目:

```bash
npm start
```

## 2. 可能存在的问题

- [时区问题](时间显示默认使用东八区，如果你的Mongodb不在东八区，很可能会告诉你今日已提交)

## 3. 可用链接

- [https://punch.mraddict.top](https://punch.mraddict.top)
- [https://punch.mraddict.vercel.app](https://punch.mraddict.vercel.app)

> 原项目地址:
>
> - [https://github.com/MR-Addict/punch](https://github.com/MR-Addict/punch)
