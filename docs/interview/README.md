---
title: 面试题
---

## 个人技能
* [字符串常见方法](/interview/js.html#字符串常见方法)
* [数组常见方法](/interview/js.html#数组常见方法)

### [闭包](/interview/js.html#闭包)
函数套函数，内层函数中访问到其外层函数的作用域
- 两个优点：保存和保护
  - 保护内部变量不受外界干扰，适合模块化开发，在ES6 module和CommonJs都能看到
  - 保存就是形成一个不销毁的作用域，一直存在内存中，容易造成[内存泄露](/interview/js.html#内存泄露)
  - 主要应用[防抖节流](/interview/encapsulation.html#防抖节流)

### [原型和原型链](/interview/js.html#原型和原型链)
原型：js中是使用函数创建对象的，都有一个prototype属性，也就是原型对象，用来存放属性和方法   
原型链：我理解得本质就是个列表，当返回函数实例时，会有__proto__属性指向函数的原型，当访问对象属性时会搜索该对象的原型，层层向上找   
```p.__proto__===Person.prototype```   
```Object.prototypep.__proto__===null```

### 跨域

### [Promise](/promise)

### [Vue 虚拟Dom和Diff算法](/interview/vueDiff.html)

## 项目经历
### 大文件上传-切片上传
[参考地址：https://juejin.cn/post/7099362510532247589?searchId=2023102319245149D480042C1B7764B392](https://juejin.cn/post/7099362510532247589?searchId=2023102319245149D480042C1B7764B392)
- 导致问题
  - 网络不好
  - 服务器过载失败
  - 时间长-影响用户体验
- 实现
  - 拿到文件对象进行切片处理```slice```，Blob保存在数组中
  - 同时用文件```spark-md5```的值（hash值）
  - 通过hash值向后端获取```文件上传状态```（成功 percent=100 | url）
  - 未成功执行```切片上传```，过滤拿到未上传切片数组继续上传
  - 通过切片数组判断所有切片上传成功，告诉后端```合并切片```

### 首屏优化-->性能优化
* 首屏优化
  * 减少请求，接口整合，使用缓存
  * 懒加载
  * 将资源用cdn形式
  * 图片压缩，gzip压缩
  * 分包（三方库，避免重复请求）
* 性能优化
  * [图片懒加载、预加载](/interview/encapsulation.html#图片懒加载和预加载)（IntersectionObserver）
  * [长列表的虚拟滚动](/interview/encapsulation.html#虚拟列表)
  * [防抖节流](/interview/js.html#防抖和节流)
  * UI库按需加载
  * 代码（清定时器，销毁监听事件）--（v-show）--（v-for加key，避免与v-if一起使用）--（keep-alive缓存组件）
