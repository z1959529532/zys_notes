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

## 初体验（开箱即用）
在默认情况下，```es module```导资源要么是相对路径，要么是绝对路径，否则浏览器不知道怎么去找   
- 那为什么es官方不默认搜寻node_modules呢？   
  - 如果浏览器可以做，可以找到下面```lodash```，那```lodash```下是也就会有更多的```import```
  - 浏览器中模块是通过```http```加载的，太多的话消耗浏览器的性能
  - ```commonjs```是运行在服务端，它找node_modules不是通过网络请求
```js
// index.html
<script src="./man.js" type="module"></script>

// man.js
import {count} from "./count.js";
console.log(count);
// count.js
import _ from 'lodash';
// 在默认情况下，es module导资源要么是相对路径，要么是绝对路径，否则浏览器不知道怎么去找
console.log(_);
export const count = 0;

// 安装
yarn init -y
yarn add lodash
yarn add vite -D
// 安装vite会处理找到，路径补全
// import _ from "/node_modules/.vite/lodash";
// import __vite__cjsImport0_lodash from "/node_modules/.vite/deps/lodash.js?v=55bcfa4a";
```

## 依赖预构建
vite找到对应的依赖后，然后调用```esbuild```将其他规范的代码转换成```es module```规范，然后放到当前目录下的```node_modules/.vite/deps```对esmodule规范的各个模块进行统一集成

- 开发
  - yarn dev：开发环境每次重新构建vite去搜索补全路径，就是上面的```依赖预构建```
- 生产
  - 生产环境```vite```交给一个叫做```rollup```的库去完成打包，会兼容更多的场景，例如有的三方库（axios）是以```commonjs```规范导出，```module.exports```，

* vite解决的问题
  * 第三方包不同的导出格式
  * 路径的处理```node_modules/.vite/deps```
  * 网络多包传输的性能问题-上面举例```loadsh```下会有更多的导入问题
