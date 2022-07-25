---
title: vue系列
---

## 对Vue看法
是一个渐进式框架，可作为应用的一部分嵌入其中，容易迅速开发一些中小型项目

## 双向绑定的理解
MVVM

## vue的响应式原理
* vue2的是通过 ```Object.defineproperty``` 数据劫持，初始化时对每个属性加上get/set（存在问题对象新增、删除属性界面不更新，得用$set；通过下标改数组界面不更新
* vue3的是通过 ```Proxy``` 拦截对象中任意属性变化（优点不用监听每个属性），通过 ```Reflect(反射)``` 对源对象属性操作（优点，重复性操作属性时，Reflect它是有返回值的，Object会报错）

## 计算属性

## v-if和v-show的区别
v-show条件为false时，只是元素的display属性设置为none，元素还存在dom中

## v-for中key的作用
与dom的diff算法有关，主要是为了更高效的更新虚拟dom，数据和key相同时dom不用更新

## 为什么v-if和v-for不建议一起用
放在同一元素上时，v-for的优先级高，每次遍历后再判断影响性能

## 修饰符有哪些
- 表单修饰符v-model：```.trim``` ```.number``` ```.lazy```
- 事件修饰符：```.stop``` ```.prevent``` ```.once``` ```.native```
- 鼠标：```.left``` ```.right``` ```.middle```
- 按键：```@keyup.enter```
- v-bind修饰符：```:abc.sync```
- 
## 什么是组件化

## 注册组件步骤

## 组件data必须为函数
函数return的都是新地址的data，这样组件之间数据不会相互影响，防止数据污染

## 父子组件通信
父传子用props接收，子传父用$emit
父访问子$refs和$children
子访问父$parent

## 插槽

## 生命周期

## 第一次页面加载触发哪几个钩子
beforeCreate、created、beforeMount、mounted

## 父子组件执行生命周期的顺序

## create和mounted中间间隔受哪些因素影响
mounted是在挂载完dom后调用的，比如页面复杂度，数据复杂度可能会影响dom的渲染

## 模块化

## vue-router中 hash与history有什么区别
hash模式地址栏url会带#   
兼容性的问题   
history每次刷新会重新请求整个网址，也就是重新请求服务器

## 路由传参的方式

## vue的$nextTick
vue更新dom是异步执行的，修改数据后，在回调中拿到更新后的dom结构   
$nextTick()返回一个promise对象

## keep-alive的作用
* 是Vue的一个内置组件，可以使被包含的组件保留状态，避免重新渲染（不走destoryed）
* 只有使用keep-alive才生效的两个函数
  * activated(){}
  * deactivated (to, from, next){}

## vue组件和插件的不同
* 使用场景：
  插件是增加功能模块，作用是Vue本身；组件构成界面业务模块，作用是App.vue
* 注册形式：
  Vue.use(插件名)、Vue.component
* 编写形式

## vue3提升体现在哪
打包减小、渲染快、内存减小   
源码（响应式）   
更好的支持typescript   
新特性：Composition API、内置组件

## vite

## Composition API
setup：使用和注意，执行时机，this，两个参数   
ref、reactive：使用和原理，它俩的对比   
toRef、shallowReavtive和shallowRef（浅响应式）   
readonly（深只读）和shallowReadonly（浅只读）   
toRaw和markRaw   
自定义ref
provide与inject

## 响应式原理
## 计算属性
person.fullName = computed(() => {})
## watch监听
使用







