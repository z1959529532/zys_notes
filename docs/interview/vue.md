---
title: Vue系列
---

### 对Vue看法
是一个渐进式框架，可作为应用的一部分嵌入其中，容易迅速开发一些中小型项目

### SPA
单页面应用，应用加载好一个Web页面(html、js、css)后不会再随用户的操作重新加载或跳转，而是动态重写当前页面内容
* 优点：用户体验好、快，前后端分离开发
* 缺点：初次加载耗时，SEO难度高

### 双向绑定的理解
数据劫持结合发布订阅   
监听器```Observer```对数据劫持监听，数据变化再由订阅者```Watcher```看是否需要更新，交由订阅器```Dep```收集订阅者统一管理

### MVVM
* Model：数据层，数据业务逻辑处理和服务端交互。
* View：视图层，可以理解为展示给用户各种信息的DOM层。
* VueModel：视图模型层，是View和Model之间的通信桥梁，一方面实现Data Banding另一方面实现了Dom Listener。

### v-model原理
v-bind + v-on   
```:value="abc"``` + ```v-on:input="abc = $event.target.value"```

### vue的响应式原理
* vue2的是通过 ```Object.defineproperty``` 数据劫持，初始化时对每个属性加上get/set（存在问题对象新增、删除属性界面不更新，得用$set；通过下标改数组界面不更新
* vue3的是通过 ```Proxy``` 拦截对象中任意属性变化（优点不用监听每个属性），通过 ```Reflect(反射)``` 对源对象属性操作（优点，重复性操作属性时，Reflect它是有返回值的，Object会报错）


---

### v-if和v-show的区别
都能控制元素的显隐   
v-show条件为false时，只是元素的display属性设置为none，节点还存在dom中   
v-if是直接添加与删除dom，开销大

### v-for中key的作用
加key能更高效的更新虚拟dom，与dom的diff算法有关   
diff算法：diff算法在vue中主要是用于虚拟dom和渲染后的真实dom比较（同级比较，循环向中间比较）   
数据和key相同时dom不用更新   
数据发生改变，匹配元素顺序不会移动

### 为什么v-if和v-for不建议一起用
在同一元素上使用，v-for的优先级高，每次遍历后再判断影响性能   
解决：就是加template外层判断，不生成dom

### 修饰符有哪些
- 表单修饰符v-model：```.trim``` ```.number``` ```.lazy```
- 事件修饰符：```.stop``` ```.prevent``` ```.once``` ```.native```
- 鼠标：```.left``` ```.right``` ```.middle```
- 按键：```@keyup.enter```
- v-bind修饰符：```:abc.sync```

### vue的$nextTick
vue更新dom是异步执行的，修改数据后视图不会立刻更新，在回调中拿到更新后的dom结构   
$nextTick()返回一个promise对象


---


### create和mounted中间间隔受哪些因素影响
mounted是在挂载完dom后调用的，比如页面复杂度，数据复杂度可能会影响dom的渲染


---


### Vue组件data必须为函数
函数return的都是新地址的data，这样组件之间数据不会相互影响，防止数据污染

### 计算属性computed
使用情况：对数据进行一些转化后在显示   
与方法对比好处是有缓存，多次使用只会调用一次
```
computed: {
  getAll() { return this.message1+' '+this.message2; }
}
person.fullName = computed(() => { return person.firstName + '-' + person.lastName; })
```

### watch监听
使用情况：监听值变化需要做一些业务逻辑时
```
watch: { sum (newValue, oldValue) { 业务 } }
```
* Vue3中 ```watch```和```watchEffect```区别   
  watch既要指明监视的属性也要指明回调
  而watchEffect不用指明监视的属性，回调中用到的数据有变化就会执行

### 混入mixin的理解
在需要相似度极高的组件时可以用到，让组件复用一些我们配置相同的生命周期或者方法   


---


### 组件化的理解
尽可能的将页面拆分成一个个小的可复用的组件，这样代码更方便维护和管理，扩展性更强   
高内聚，低耦合

### Vue组件为什么只有一个根元素
从三个方面来说   
Vue实例的根节点app入口不能有两个   
组件中template下的div也是实例的入口，其实就是树状结构的根处理为VDOM渲染成html   
树状结构是diff算法所要求的虚拟dom结构

### 组件通信的方式有哪些
父传子用```props```接收，子传父用```this.$emit('事件名', 参数)```   
父访问子```this.$refs.aaa```、```this.$children```   
子访问父```this.$parent```   
```provide```/```reject```   
```eventBus```   
```Vuex```

### 组件和插件的区别
组件用来构成业务和界面模块，作用是App.vue   
插件通常用来给Vue添加全局功能，作用是Vue本身（全局属性、指令、混入）
* 编写和注册形式也不一样   
  Vue.use(插件名)、Vue.component('组件名', {})

### 组件name的作用
* 配合```keep-alive```缓存组件状态
* 组件递归操作，允许组件模板调自身
* vue调试工具vue-tools

### 是什么插槽
让封装的组件更有扩展性 ，将共性保留在组件中，将不同暴露为插槽   
使用：子组件```slot```开启插槽，父组件使用子组件标签夹显示内容   
具名插槽(带有name去决定显示哪些不同内容)，作用域插槽（子组件提供数据，绑定在slot上）


---


### vue-router路由模式
* hash   
  地址栏上带有#的，也就是用来指示hash值的
* history   
  对应的是HTML5History，```pushState()```和```replaceState()```
  区别：history模式下，刷新就会向后端请求整个网址，前后端地址要完全一致，否则会404报错，处理就是前端加一个搭配404页面

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


### Vuex是什么
全局状态管理，可以将多个组件共享的数据存储在一个对象里

### Vuex中mutations和actions区别
区别在于mutations中最好放同步方法，这样能跟踪到，对于异步操作放在actions中


---


### 项目中解决跨域
1、通过```vue.config.js```文件配置代理```proxy```    
2、通过```nginx```实现代理   
3、CORS服务端设置响应头   
4、JSONP借助有跨域能力的标签

### 权限怎么做
* 路由权限
  - 动态生成路由（数据前后端都可以，后端的话映射），```router.addRoutes()```添加，再通过new实例```.matcher```实现第二次清空
  - 也可通过```meta```设定权限标识，在```beforeEach((to, from, next) => {}))```去判断进行跳转
* 按钮权限：通过```自定义权限指令```控制

### 性能优化
- 代码层面的优化
  - 减少请求次数：数据缓存，keep-alive缓存
  - ```v-for```添加```key```
  - 长列表优化-分页、虚拟滚动
  - 资源的懒加载、预加载
  - 防抖节流
- webpack优化
  - 代码的提取分包
  - 图片压缩
  - 打包优化
- web技术优化
  - 开启```gzip```压缩

[//]: # (- 避免无用渲染：懒加载、预加载)
[//]: # (- 减少回流重绘)
[//]: # (- SSR渲染)
[//]: # (- 开启gzip压缩)


<!--

### 第一次页面加载触发哪几个钩子
beforeCreate、created、beforeMount、mounted

### vue3提升体现在哪
打包减小、渲染快、内存减小   
源码（响应式）   
更好的支持typescript   
新特性：Composition API、内置组件


### Composition API
setup：使用和注意，执行时机，this，两个参数   
ref、reactive：使用和原理，它俩的对比   
toRef、shallowReavtive和shallowRef（浅响应式）   
readonly（深只读）和shallowReadonly（浅只读）   
toRaw和markRaw   
自定义ref
provide与inject

-->





