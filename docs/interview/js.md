---
title: js系列
---
## JS篇
### 数据类型
基本：String、Number、Boolean、null、undefined   
引用：Object、Array、Function   
ES6：   
Symbol：创建后独一无二且不可变的数据类型，解决变量冲突   
BigInt：可以存储和操作大整数   

### typeof和instanceof
typeof：返回类型字符串，null、对象和数组判断为object类型   
instanceof：返回布尔值，只能判断引用数据类型   
```Object.prototype.toString.call()```方法实现全局通用的数据类型判断   
```js
function getType(obj) {
    const type = typeof obj;
    if (type !== 'object') {
        return type;
    }
    return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
}
```

### undefined和null区别
未定义和定义空对象

### 判断对象是空对象的方法
```Object.keys(obj).length == 0```、```JSON.stringify(obj) == '{}'```

### ==和===区别
相等会做类型转换，再进行值比较（true==1）
全等要类型相同，值也要相同

### DOM和BOM
DOM：文档对象模型，是W3C标准规范，主要学习操作页面元素   
BOM：浏览器对象模型   
常见的BOM对象：window(核心对象)包含-->location、screen、navigator

### AJAX
异步更新网页（更新网页对应部分，不需要刷新整个网页）    
* 过程
  * 创建XMLHttpRequest实例对象（new XMLHttpRequest()）
  * 与服务器建立连接.open
  * 发送给服务端.send

### Axios
支持promise、浏览器端发送AJAX请求、node端发http请求

### for...in和for...of区别
for in：遍历对象（拿key），遍历数组（拿索引）   
for of：遍历数组（拿每项item）

### 浅拷贝深拷贝
* 浅拷贝
```手写代码```，```Object.assign```，```拓展运算符...```
```js
function shallowClone(obj) {
        const newObj = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = obj[key];
            }
        }
        return newObj;
    }
```

* 深拷贝
```手写代码递归```，```lodash.cloneDeep```，```JSON.string（会忽略undefined，symbol，函数）```
```js
function deepClone(obj, hash = new WeakMap()) {
    if (obj == null) return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return RegExp(obj);
    if (typeof obj !== 'object') return obj;
    if (hash.get(obj)) return hash.get(obj);
    let cloneObj = new obj.constructor();
    hash.set(obj, cloneObj);
    for (let key in cloneObj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key], hash);
        }
    }
    return cloneObj;
}
```

### 内存泄露
* 使用未声明的变量，意外创建了一个全局变量，使变量在内存中无法被收回
* 闭包，读取函数内部的局部变量
```js
// 简单的理解成定义在一个函数内部的函数
function f1() {
  var n = 100;
  function f2() {
    console.log(n);
  }
}
```
* 删除dom元素，没有清理dom的引用
```js
var a = document.getElementById('btn');
document.body.removeChild(document.getElementById('btn'));
// 解决手动删除 a = null;
```

## ES6篇
### var、let、const
变量提升、作用域、声明和修改
```js
var a = 4;
function fn () {
    console.log(a);
    var a = 5;
}
fn() // undefined

function a () {}
var a;
console.log(typeof a) // function
var a = 1;
console.log(typeof a) // number
// 函数提升优先级高于变量提升，不会被变量声明覆盖，但是会被同名变量赋值后覆盖
```

### Promise
是异步编程新的一种解决方案，支持链式调用解决回调地狱的问题

### async/await
* async声明一个异步的function，返回值为Promise对象
```js
// 函数里return结果，相当于Promise.resolve()
async function abc() {}
const result = abc();
console.log(result, 1122); // Promise对象
```
* await等待一个异步方法执行完成，一般右侧为Promise对象
```js
// 返回成功Promise的值，其它值直接返回，失败Promise要try...catch
async function abc() {
  console.log(await Promise.resolve(123));
  console.log(await 123);
  console.log(abc(), 1122);
}
```
* 优势：如果是链式调用，Promise得用then去执行，async/await写法几乎和同步代码一样，错误处理友好try…catch
```js
async function getResult() {
    const result1 = await 异步方法1(123);
    const result2 = await 异步方法2(result1);
    const result = await 异步方法3(result2);
}
```

### Proxy
用于创建一个对象代理，实现对对象的拦截和自定义   
vue3的响应式就是通过```proxy```实现
```js
// target目标对象，handler拦截属性（set，get等）
var proxy = new Proxy(target, handler)
// 取消代理
proxy.revocable(target, handler)
```



