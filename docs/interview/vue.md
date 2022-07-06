---
title: vue系列
---

## 组件data必须为函数
函数return的都是新地址的data，这样组件之间数据不会影响，防止数据污染

## vue的$nextTick
vue更新dom是异步执行的，修改数据后，在回调中拿到更新后的dom结构   
$nextTick()返回一个promise对象

## create和mounted中间间隔受哪些因素影响
mounted是在挂载完dom后调用的，比如页面复杂度，数据复杂度可能会影响dom的渲染

## vue的响应式原理
* vue2的是通过 ```Object.defineproperty``` 数据劫持，初始化时对每个属性加上get/set（存在问题对象新增、删除属性界面不更新，得用$set；通过下标改数组界面不更新
* vue3的是通过 ```Proxy``` 拦截对象中任意属性变化（优点不用监听每个属性），通过 ```Reflect(反射)``` 对源对象属性操作（优点，重复性操作属性时，Reflect它是有返回值的，defineproperty会报错）

## vue组件和插件的不同
* 使用场景：
  插件是增加功能模块，作用是Vue本身；组件构成界面业务模块，作用是App.vue
* 注册形式：
  Vue.use(插件名)、Vue.component
* 编写形式

## keep-alive的作用
* 是Vue的一个内置组件，可以使被包含的组建保留状态，避免重新渲染（不走destoryed）
* 只有使用keep-alive才生效的两个函数
  * activated(){}
  * deactivated (to, from, next){}

## vue-router中 hash与history有什么区别
hash模式地址栏url会带#
history每次刷新会重新请求整个网址，也就是重新请求服务器




