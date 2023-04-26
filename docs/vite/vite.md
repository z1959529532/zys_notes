---
title: vite学习
---

## 相对于webpack优势
项目越大，所要处理的js代码就越多，造成的结果```构建工具```需要很长时间才能启动```开发服务器```把项目跑起来   
使用了热更新，文件修改后也要几秒钟才能在浏览器中反映出来，迟钝会影响开发者的开发效率   
   
webpack能改吗？
```js
// webpack支持多种模块化，开始必须要统一模块化代码, 所以意味着他需要将所有的依赖全部读一遍
const lodash = require("lodash"); // commonjs 规范
import Vue from "vue"; // es6 module

// webpack的一个转换结果
const lodash = webpack_require("lodash");
const Vue = webpack_require("vue");
```

```vite```是基于```es modules```的, 侧重点不一样, ```webpack```更多的关注兼容性, 而```vite```关注浏览器端的开发体验   
```vite```的上手难度更低，直接启动开发服务器根据```entry```按需加载   
![vite es moudle server](../.vuepress/public/assets/vite/viteServer.png)

## create vite脚手架和vite
- ```yarn create vite```
  - 帮我们全局安装一个东西: create-vite (vite的脚手架)
  - 直接运行这个create-vite bin目录的下的一个执行配置

```create-vite```内置了```vite```   
```vue-cli```内置```webpack```   
vite、create-vite ---> vue团队   

使用脚手架创建```vue-cli```/```create vite```(相当于给你一套预设)：less, babel下载并配置好了   
自己搭建：自家下载插件处理


