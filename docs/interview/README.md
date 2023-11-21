---
title: 面试题
---

## 个人技能
* [字符串常见方法](/interview/js.html#字符串常见方法)
* [数组常见方法](/interview/js.html#数组常见方法)
* [Vue经典面试题：https://juejin.cn/post/7097067108663558151?searchId=20231114212935B49E5A86A5981924F39B#heading-92](https://juejin.cn/post/7097067108663558151?searchId=20231114212935B49E5A86A5981924F39B#heading-92)

### [闭包](/interview/js.html#闭包)
函数套函数，内层函数访问外层函数的作用域
- 两个优点：保存和保护
  - 保护内部变量不受外界干扰，适合模块化开发，在ES6 module和CommonJs都有应用
  - 保存就是形成一个不销毁的作用域，一直存在内存中，容易造成[内存泄露](/interview/js.html#内存泄露)
  - 主要应用[防抖节流](/interview/encapsulation.html#防抖节流)

### [原型和原型链](/interview/js.html#原型和原型链)
原型：js中是使用函数创建对象的，都有一个prototype属性，也就是原型对象，用来存放属性和方法   
原型链：我理解得本质就是个列表，当返回函数实例时，会有__proto__属性作为桥梁指向函数的原型，当访问对象属性时会搜索该对象的原型，层层向上找直到原型链的末端   
```p.__proto__===Person.prototype```   
```Object.prototypep.__proto__===null```

### 跨域
浏览器的安全机制，为了防止读取非同源的DOM、Cookie、LocalStorage、IndexDB   
协议、域名、端口都相同，否则就是跨域   
* CORS：在服务端设置响应头```Access-Control-Allow-Origin```--```express```
* JSONP：借助有跨域能力的标签```script```，有缺陷：只支持get、传递信息有限制
* 服务器代理：```node```、```nginx```（允许前端带上cookie）不经过浏览器

### [Promise](/promise)
是异步编程新的一种解决方案，支持链式调用解决回调地狱的问题   
* 状态：```pedding``` --> ```fulfilled``` 或 ```rejected```
* Api：```.then(value => {}, reason => {})```，```.catch(reason => {})```（失败语法糖）
* Promise对象的方法：```.resolve()```，```.reject()```，```.all()```，```.race()```   

async 与 await   
基于Promise实现的，好处就是让异步的代码看起来和同步代码一样，代码容易阅读和维护
* async：返回结果是Promise对象，返回结果和Promise.resolve一样
* await：返回结果是成功promise的值（右侧一般为Promise对象，失败Promise要加try...catch），await必须写在async函数中，但async函数中可以没有await

### [Vue 虚拟Dom和Diff算法](/interview/vueDiff.html)
Vue源码借鉴了snabbdom实现虚拟Dom和Diff算法的方式   
原理就是h函数产生虚拟节点 --> patch函数将对比完的虚拟节点上树   
Diff发生在新旧虚拟Dom对比上，也就是patch函数里，最后反映到真实Dom   
#### patch函数
判断oldVnode是虚拟节点还是Dom节点（是Dom用h函数包装为虚拟节点）   
然后判断是不是同一根节点```sameVnode```（key和sel选择器）---->是（***精细比较***）/ 不是（递归生成dom，直接插入新的，删除旧的）

#### 子节点的比较(Diff算法-双端对比)
- 四种对比方式--四个指针
  - 新前--旧前
  - 新后--旧后
  - 新后--旧前（新前指的节点，移动到旧后之后）
  - 新前--旧后（新前指的节点，移动到旧前之前）

- Vue3 快速Diff的不同
  - 头和头
  - 尾和尾
  - 然后通过```最长递增子序列```进行移动/添加/删除

### Vue源码解决的问题
- data为什么必须是个函数
- 虚拟Dom实现原理，理解Vue更新机制，优化组件渲染性能

### Vue3与Vue2的区别
[组合式Api的不同：https://blog.csdn.net/qq_39290323/article/details/124786099](https://blog.csdn.net/qq_39290323/article/details/124786099)   
[Vue3的优点：https://blog.csdn.net/Clytza/article/details/130137753](https://blog.csdn.net/Clytza/article/details/130137753)

### 0到1搭建项目
[参考地址1：https://blog.csdn.net/Lyrelion/article/details/128066489](https://blog.csdn.net/Lyrelion/article/details/128066489)   
[参考地址2：https://blog.csdn.net/qq_41581588/article/details/127048451](https://blog.csdn.net/qq_41581588/article/details/127048451)   
[脚手架创建：https://blog.csdn.net/A121212789/article/details/129818690](https://blog.csdn.net/A121212789/article/details/129818690)   
[手动webpack搭建：https://blog.csdn.net/Amouzy/article/details/129277140](https://blog.csdn.net/Amouzy/article/details/129277140)

## 项目经历
### 大文件上传-切片上传
[参考地址：https://juejin.cn/post/7099362510532247589?searchId=2023102319245149D480042C1B7764B392](https://juejin.cn/post/7099362510532247589?searchId=2023102319245149D480042C1B7764B392)
- 导致问题
  - 网络不好
  - 服务器过载失败
  - 时间长-影响用户体验
- 实现
  - 拿到文件对象通过```slice```进行切片处理，Blob保存在数组中
  - 同时用文件```spark-md5```的值（hash值）
  - 通过hash值向后端获取```文件上传状态```（成功--文件妙传 percent=100 | url）
  - 未成功执行```切片上传```，过滤拿到未上传切片数组继续上传
  - 判断所有切片上传成功，告诉后端```合并切片```

并发请求Promise.all()   
停止请求，请求配置axios.CancelToken.source()，然后调用.cancel

### 首屏优化-->性能优化
* 首屏优化
  * 减少请求，接口整合，”使用缓存“
  * 懒加载
  * 将资源用cdn形式
  * gzip压缩，图片压缩
  * 分包（三方库，避免重复请求）
* 性能优化
  * [图片懒加载、预加载](/interview/encapsulation.html#图片懒加载和预加载)（getBoundingClientRect，IntersectionObserver）
  * [列表的虚拟滚动](/interview/encapsulation.html#虚拟列表)
  * [防抖节流](/interview/js.html#防抖和节流)
  * UI库按需加载
  * 代码（清定时器，销毁监听事件）--（v-show）--（v-for加key，避免与v-if一起使用）--（keep-alive缓存组件）

### [列表虚拟滚动](/interview/encapsulation.html#虚拟列表)

### iframe
微前端：多个小型前端组合成一个应用的方式，独立部署、不同技术栈子应用   

- 解决问题
  - 首页卡的问题：主系统iFrame预加载（js创建iFrame），子应用减少加载资源   
    [参考1：https://pythonjishu.com/niljfcmmrkzqpwd/](https://pythonjishu.com/niljfcmmrkzqpwd/)   
  - 记住子应用路由问题：子应用路由发生变化就发送到主应用，存在缓存中，下次重新显示时直接给iframe的url
  - cookie登录失效：跨域情况下，新增了SameSite属性防止攻击和追踪，无法set-cookie；解决：服务端代理，前端处理cookie   

[项目问题参考：https://www.cnblogs.com/smileZAZ/archive/2023/08/01/17598642.html](https://www.cnblogs.com/smileZAZ/archive/2023/08/01/17598642.html)


### webpack优化
[webpack优化技巧：https://zhuanlan.zhihu.com/p/536200606](https://zhuanlan.zhihu.com/p/536200606)
- 缓存cache：开发环境开启缓存，加快构建速度（webpack5内置了缓存配置,低版本的话安装cache-loader）
- 多线程```thread-loader```：
- 摇树优化```tree-shaking```：不编译没有用到的代码（webpack5内置，确保在编译时使用生产模式，mode: 'production'）   

[图片无损压缩参考：https://blog.csdn.net/jieyucx/article/details/131261301](https://blog.csdn.net/jieyucx/article/details/131261301)

### 封装组件
- [echarts封装参考1](https://juejin.cn/post/6995518429952212999?searchId=202311181708496B05DEBF215F11B65FFA#heading-11)   
- [递归树组件参考1](https://juejin.cn/post/7273435543677583423?searchId=20231119091004DC84D2ED091A7A228C64)
- 图片预览：放大缩小旋转，loading，全屏，多图轮播
- 文件上传：校验，进度条
- 拼音搜索下拉框：借助```pinyin-match```插件

[//]: # (封装脚手架工具)
