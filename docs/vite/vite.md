---
title: vite学习
---

## 相对于webpack优势
项目越大，所要处理的js代码就越多，造成的结果```构建工具```需要很长时间才能启动```开发服务器```把项目跑起来   
即使使用了热更新，文件修改后也要几秒钟才能在浏览器中反映出来，迟钝会影响开发者的开发效率   
   
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

```create vite```内置了```vite```   
```vue-cli```内置```webpack```   
vite、create-vite ---> vue团队   

使用脚手架创建```vue-cli```/```create vite```(相当于给你一套预设)：less, babel下载并配置好了   
自己搭建：自家下载插件处理

## 初体验（开箱即用）
在默认情况下，```es module```导资源要么是相对路径，要么是绝对路径，否则浏览器不知道怎么去找   
- 那为什么es官方不默认搜寻node_modules呢？   
  - 如果浏览器可以做，可以找到下面```lodash```，那```lodash```下是也就会有更多的```import```
  - 浏览器中模块是通过```http```加载的，太多的话消耗浏览器的性能
  - ```commonjs```是运行在服务端，不一样，它找node_modules不是通过网络请求
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
vite找到对应的依赖后，然后调用```esbuild```将其他规范的代码转换成```es module```规范，
然后放到当前目录下的```node_modules/.vite/deps```对```esmodule```规范的各个模块进行统一集成

- 开发
  - yarn dev：开发环境每次重新构建vite去搜索补全路径，就是上面的```依赖预构建```
- 生产
  - 生产环境```vite```交给一个叫做```rollup```的库去完成打包，会兼容更多的场景，例如有的三方库（axios）是以```commonjs```规范导出，```module.exports```，

* vite解决的问题
  * 第三方包不同的导出格式
  * 路径的处理```node_modules/.vite/deps```
  * *** 网络多包传输的性能问题-上面举例```loadsh```下会有更多的导入问题，有了依赖预构建vite会将他们进行集成最后只生成一个或者几个模块

## vite配置文件智能提示和环境处理
[参考官网vite配置智能提示 - https://cn.vitejs.dev/config/#config-intellisense](https://cn.vitejs.dev/config/#config-intellisense)
```js
import {defineConfig} from 'vite'  // 第三方库
export default defineConfig({})
```

- 区分环境去区分配置文件
- ```vite.config.js```
  - vite.base.config.js
  - vite.prod.config.js
  - vite.dev.config.js
```js
import {defineConfig} from 'vite'
import viteBaseConfig from "./vite.base.config";
import viteProdConfig from "./vite.prod.config";
import viteDevConfig from "./vite.dev.config";

// 策略模式
const envResolver = {
  "build": () => Object.assign({}, viteBaseConfig, viteDevConfig),
  "serve": () => {
    console.log('开发环境');
    return Object.assign({}, viteBaseConfig, viteProdConfig)
  }
}
export default defineConfig({
  return envResolver[command]();
})
```

## vite环境变量
```vite```内置了```dotenv```这个第三方库，自动读取```.env```文件解析对应环境变量，
然后将其注入到process对象下(但是vite考虑到和其他配置的一些冲突问题, 他不会直接注入到process对象下)   

涉及到```vite.config.js```中的一些配置，```envDir```: 用来配置开发/生产环境变量的文件地址   
可以在加载配置文件前，调用```vite```的```loadEnv方法```来手动确认```env```文件，这样就可以将.env当作所有环境下的共有变量      
```js
// .env文件
APP_KEY = 110

// vite.config.js文件
export default defineConfig(({command, mode}) => {
    // console.log(process.env);  // 打印中没有APP_KEY
    console.log('process.cwd() ---> ' + process.cwd());
    // 第二个参数：当前env所在目录--process.cwd()方法返回当前node进程的工作目录
    const env = loadEnv(mode, process.cwd(), "");  // 第三个参数不传默认是.env
    // console.log(env);  // 打印中就有APP_KEY了

    console.log('command ---> ' + command);
    return envResolver[command]();
})
```

* mode参数   
是根据命令来的```yarn dev```相当于默认```yarn dev --mode development```，mode就是development   
也可以手动```yarn dev --mode develop```，mode就是develop
```js
const env = loadEnv(mode, process.cwd(), "");
// 调用loadEnv, 会做如下几件事
// 找到.env文件解析其中的环境变量放进一个对象
// 将传进来的mode这个变量的值进行拼接: .env.development，根据拼接名称去取对应的配置文件并环境变量, 并放进一个对象
// 最终得到的对象 const lastEnvConfig = { ...baseEnvConfig, ...modeEnvConfig }
```

* 客户端的使用   
vite会将环境变量注入到```import.meta.env```里，注意vite做了一个拦截，避免将隐私性的变量直接注入进去   
处理是在变量前加```VITE_```，```VITE_APP_KEY = 120```   
可以通过设置vite配置文件```envPrefix: 'ENV_'```默认是```VITE_```   

## vite解析识别vue文件
```yarn create vite my-vue-app --template vue```通过脚手架创建项目   
运行后在网络中看App.vue响应是js代码，它是如何解析的呢？初步了解开发服务器原理node   
新建3、vite-dev-server中```yarn add koa```，node端的框架   
通过koa实例返回请求地址案例，访问的App.vue文件最终是解析成js代码

## vite中处理css大概原理
vite本身支持对css的处理，初体验项目里   
1. vite在读取到main.js中引用到了Index.css
2. 直接去使用fs模块去读取index.css中文件内容
3. 直接创建一个style标签, 将index.css中文件内容直接copy进style标签里
4. 将style标签插入到index.html的```head```中
5. 将该css文件中的内容直接替换为js脚本(方便热更新或者css模块化), 同时设置Content-Type为js 从而让浏览器以JS脚本的形式来执行该css后缀的文件

- 场景：协同开发可能起一样的类名   
mian.js中引入componentA.js和componentB.js，两套css创建同样类名会出现覆盖
1. module.css (module是一种约定, 表示需要开启css模块化)
2. 他会将你的所有类名进行一定规则的替换（将footer 替换成 _footer_i22st_1）
3. 同时创建一个映射对象{ footer: "_footer_i22st_1" }
4. 将替换过后的内容塞进style标签里然后放入到```head```标签中 (能够读到index.html的文件内容)
5. 将componentA.module.css内容进行全部抹除, 替换成JS脚本（看network）
5. 将创建的映射对象在脚本中进行默认导出

- less同样支持模块化，安装```yarn add less```，main.js中导入less文件

## vite中配置CSS
[参考地址https://cn.vitejs.dev/config/shared-options.html#css-modules](https://cn.vitejs.dev/config/shared-options.html#css-modules)   
在配置文件中的配置```vite.base.config```
- localsConvention：css生成类名key的展示形式
- scopeBehaviour：
- generateScopedName：css生成类名value的展示形式
- hashPrefix
- globalModulePaths：不参与到css模块化的路径
