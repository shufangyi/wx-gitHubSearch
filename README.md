# wx-gitHubSearch

微信小程序-利用 gitHub v4 GraphQL 接口

> 这也是学习中的产物～最近在看 GraphQL 和小程序
> 脑子 🧠 一抽抽，就想将两者合起来写个东西。其实还蛮难的，嚯～
> github 提供的 V4 版 graphql 接口，正好拿来用～

---

## 立 flag！整个项目先完成以下功能

- 完成热门项目(trending 部分，这块 github 并没有提供接口，在 [[huchenme]](https://github.com/huchenme/github-trending-api) 基础上做出了一点修改)
- 完成项目搜索(下一步，提供搜索类别、排序等选项)
- ~~用户部分(这部分我在看一下接口，进行用户登录什么的。之后才能 star 之类的)~~ 小程序根本不支持 oauth 的三方登录。上一次查完，走三方登录是不可能了，我考虑以下可以直接用账户密码登录，但好像用户会觉得不安全。还有一种就是，粘贴token。github有提供供授权token，在用户设置里面。这部分功能再考虑一下！
- 。。。先写起来
- 完成用户详情页，提供基础的用户信息(包括个人用户和组织用户)
- 完成仓库REABME部分的展示，点击仓库条目，可以查看该仓库的readme

---

## PS.

> 小程序不允许直接调用 github 的接口。居然因为 github 没在国内备案！！！晕 😷
> 项目中，我自己用服务器做了个代理，在 config.js 中可以看到代理接口。
> 不知道为什么，trending 部分的接口 gayhub 没有给出。上面提到的解决方式，就是请求页面，分析页面结构而已。
