---
title: Vue系列
---
## 1、基础
### 对Vue看法
是一个轻量型渐进式框架，可作为应用的一部分嵌入其中，容易迅速开发一些中小型项目

### SPA
单页面应用，应用加载好一个Web页面(html、js、css)后不会再随用户的操作重新加载或跳转，而是动态重写当前页面内容
* 优点：用户体验好、快，前后端分离开发
* 缺点：初次加载耗时，SEO难度高

### MVVM
* Model：数据层，数据业务逻辑处理和服务端交互。
* View：视图层，可以理解为展示给用户各种信息的DOM层。
* ViewModel：视图模型层，是View和Model之间的通信桥梁，一方面实现Data Banding另一方面实现了Dom Listener。

### 双向绑定的原理
数据劫持结合发布订阅   
监听器```Observer```对数据劫持监听   
```Compile```解析模板指令，绑定更新函数，渲染和更新视图   
数据变化再由订阅者```Watcher```决定是否需要更新（Observer、Compile通信桥梁）   
交由订阅器```Dep```收集订阅者统一管理

### vue的响应式原理
* vue2的是通过 ```Object.defineproperty``` 数据劫持，初始化时对每个属性加上get/set（存在问题对象新增、删除属性界面不更新，得用$set（Vue内部通过重写函数）；通过下标改数组界面不更新
* vue3的是通过 ```Proxy``` 拦截对象中任意属性变化（优点不用监听每个属性），通过 ```Reflect(反射)``` 对源对象属性操作（优点，重复性操作属性时，Reflect它是有返回值的，Object会报错）

### v-model原理
v-bind + v-on   
```:value="abc"``` + ```v-on:input="abc = $event.target.value"```

### computed和watch的区别
- computed计算属性对数据进行一些转化后在显示，要依赖其他属性的，也就是依赖的属性值发生改变才会触发，并且它有缓存（多次调用只触发一次，和method方法的区别）   
- watch监听器就是观察作用，监听数据变化是执行后续操作逻辑，无缓存
* Vue3中 ```watch```和```watchEffect```区别   
  watch既要指明监视的属性也要指明回调
  而watchEffect不用指明监视的属性，回调中用到的数据有变化就会执行

### slot插槽
是Vue的内容分发机制，其实就是让组件更有扩展性   
使用：子组件```slot```开启插槽，父组件使用子组件标签夹显示内容   
具名插槽(带有name去决定显示哪些不同内容)，作用域插槽（子组件提供数据，绑定在slot上）

### filters过滤器
用来改变数据的输出显示   
computed和method都是通过修改数据来触发控制输出显示的

### 修饰符有哪些
- 表单修饰符v-model：```.trim``` ```.number``` ```.lazy```
- 事件修饰符：```.stop``` ```.prevent```等于```event.stopPropagation()``` ```.once``` ```.native```
- 鼠标：```.left``` ```.right``` ```.middle```
- 按键：```@keyup.enter```
- v-bind修饰符：```:abc.sync```

### v-if和v-show的区别
都能控制元素的显隐   
v-show条件为false时，只是元素的display属性设置为none，节点还存在dom中   
v-if是直接添加与删除dom，开销大

### Vue组件data必须为函数
函数return的都是新地址的data，这样多个组件之间数据不会相互影响，防止数据污染

### vue的$nextTick
vue更新dom是异步执行的，修改数据后视图不会立刻更新，在回调中拿到更新后的dom结构   
- 操作随数据变化的dom结构时   
- Vue生命周期在create()操作dom，mounted()是在挂载完dom触发   
$nextTick()返回一个promise对象

### 自定义指令directive
使用场景：有些需要操作普通dom的情况（下拉菜单、图片懒加载、集成三方插件）   

### Vue模板编译
模板template不是浏览器的标准无法解析渲染，所以需要一个模板编译转化的过程   
三个阶段：parse解析->转化抽象语法树AST，optimize优化，generate生成->转化为render函数   

### v-for中key的作用
加key能更高效的更新虚拟dom，与dom的diff算法有关   
diff算法：diff算法在vue中主要是用于虚拟dom和渲染后的真实dom比较（同级比较，循环向中间比较）   
数据和key相同时dom不用更新   
数据发生改变，匹配元素顺序不会移动

### 为什么v-if和v-for不建议一起用
在同一元素上使用，v-for的优先级高，每次遍历后再判断影响性能   
解决：就是加template外层判断，不生成dom

### create和mounted中间间隔受哪些因素影响
mounted是在挂载完dom后调用的，比如页面复杂度，数据复杂度可能会影响dom的渲染

### 混入mixin的理解
在需要相似度极高的组件时可以用到，让组件复用一些我们配置相同的生命周期或者方法

### Vue组件为什么只有一个根元素
从三个方面来说   
Vue实例的根节点app入口不能有两个   
组件中template下的div也是实例的入口，其实就是树状结构的根处理为VDOM渲染成html   
树状结构是diff算法所要求的虚拟dom结构

### 组件和插件的区别
组件用来构成业务和界面模块，作用是App.vue   
插件通常用来给Vue添加全局功能，作用是Vue本身（全局属性、指令、混入）
* 编写和注册形式也不一样   
  Vue.use(插件名)、Vue.component('组件名', {})

### 组件name的作用
* 配合```keep-alive```缓存组件状态
* 组件递归操作，允许组件模板调自身
* vue调试工具vue-tools

---

## 2、生命周期

---

## 3、组件通信
### 组件通信的方式有哪些
父传子用```props```接收，子传父用```this.$emit('事件名', 参数)```   
父访问子```this.$refs.aaa```、```this.$children```   
子访问父```this.$parent```   
```provide```/```reject```   
```eventBus```   
```Vuex```

### 父子组件双向绑定
参考：
[vue -> 组件化开发 -> 父子组件双向绑定](/vue/learn-vue2.html#父子组件双向绑定)

---

4、路由
### 懒加载实现
- 箭头函数 + 动态引入import('')
- 箭头函数 + require

### vue-router路由模式
* hash   
  地址栏上带有#的，也就是用来指示hash值的
* history   
  对应的是HTML5History，```pushState()```和```replaceState()```
  区别：history模式下，刷新就会向后端请求整个网址，前后端地址要完全一致，否则会404报错，处理就是前端加一个搭配404页面

### params和query的区别
params方式就是在地址后跟上参数

### $router和$route的区别
$router是VueRouter实例，包含了所有路由以及路由的跳转方法   
$route是当前跳转的路由对象，里面含有一些路由信息（name、path、query、params等）

### active-class
router-link（渲染成a标签）路由匹配默认样式，修改在实例VueRouter处

### 路由守卫有哪些
```router.beforeEach(to, from, next)```全局前置守卫，调用next()进入下一个页面   
```router.afterEach(to, from, next)```后置守卫，不用主动调next()   
```beforeEnter```路由独享守卫   
```beforeRouteEnter```组件内守卫

### keep-alive的作用
* 是Vue的一个内置组件，使被包含的组件保留状态，避免重新渲染（不走destoryed）
* 两个属性
  * ```include```组件name匹配会被缓存
  * ```exclude```
* 只有使用keep-alive才生效的两个钩子函数
  * activated(){}
  * deactivated (to, from, next){}

---

## 状态管理
### Vuex是什么
全局状态管理，可以将多个组件共享的数据存储在一个对象里

### Vuex中mutations和actions区别
区别在于mutations中最好放同步方法，这样能跟踪到，对于异步操作放在actions中

---

## Vue3
### Vue2与Vue3的变化
- Vue3最大化的兼容了Vue2（Vue3里可以写Vue2）
- 组合式Api   
  ```setup```会在```beforeCreate```之前调用
- 

---

## 项目篇
### 项目中解决跨域
[参考：同源策略](/ajax/#同源策略)   
浏览器中不是同源就会拦截，所以一般利用构建工具/第三方库/自己搭一个开发服务器代理请求   
1、webpack-->```vue.config.js```
```js
devServer: {
    '/zysDevApi': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // pathRewrite作用是把实际地址+给定值http://localhost:3000/abc
        // 一般为空
        pathRewrite: {
            '^/zysDevApi': ''
        }
    }
}
```
2、vite-->```vite.config.js```
```js
server: {
    proxy: {
        '/zys_dev_api': {
            target: 'http://localhost:4050',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/zys_dev_api/, '')
        }
    }
}
```
3、通过```nginx```实现代理   
4、```CORS```服务端设置响应头   
5、```JSONP```借助有跨域能力的标签

### 权限怎么做
* 路由权限
  - 动态生成路由（数据前后端都可以，后端的话映射），```router.addRoutes()```添加，再通过new实例```.matcher```实现第二次清空
  - 也可通过```meta```设定权限标识，在```beforeEach((to, from, next) => {}))```去判断进行跳转
* 按钮权限：通过```自定义权限指令```控制

### 性能优化
- 打包构建方面```webpack/vite```
  - 分包：不重复请求，三方库单独打包处理
  - cdn加速：将三方依赖模块写成cdn形式注入
  - gzip压缩
  - 动态引入```import('')```与三方库按需加载相类似
- 页面方面
  - [图片懒加载、预加载](/interview/encapsulation.html)
  - 长列表虚拟滚动
  - 首屏页面缓存，数据缓存
  - 骨架屏
- 代码方面
  - 路由懒加载
  - [防抖节流](/interview/js.html#防抖和节流)
  - 清定时器，销毁监听事件
  - v-show
  - v-for加key，避免与v-if一起使用
  - keep-alive缓存组件

### 搭建项目
* 根据项目需求采用合适的技术栈，构建方式：脚手架/模板 ```vue + ts + vite```   
第三方依赖：   
* 安装路由```npm i vue-router```
* 全局状态管理```npm i vuex```
* UI组件库```npm i element-ui```
* 安装http工具axios，封装请求工具
* css预编译器，全局样式和主题色的修改
* 代码规范和代码美化工具
* git hooks钩子






