---
title: JS系列
---
## 基础
### 数据类型
String、Number、Boolean、null、undefined、Object、Symbol、BigInt   
引用：对象、数组、函数   
ES6：   
Symbol：创建后独一无二且不可变的数据类型，解决变量冲突   
BigInt：可以安全存储和操作大整数

### typeof和instanceof
typeof：返回类型字符串，（null、对象和数组判断为object类型）   
instanceof：返回布尔值，只能判断引用数据类型（内部运行机制是判断在原型链中能否找到该类型的原型）   
```Object.prototype.toString.call()```使用Object对象的原型方法toString，通用```[Object 类型]```   
```js
function getType(obj) {
    return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
}
```

### null和undefined区别
初始化空对象，未定义   
null用type of判断时会返回object   
相等返回true，全等返回false

### 判断对象是空对象的方法
```Object.keys(obj).length == 0```、```JSON.stringify(obj) == '{}'```

### ==和===区别
相等会做类型转换，再进行值比较（true==1）
全等要类型相同，值也要相同

### 字符串常见方法
- 增：```+```拼接，```concat()```拼接新的字符串
- 删/截取：```slice()```，```substring()```，```substr()```接收一个或两个参数(顾头不顾尾)
- 查：```indexOf()```返回下标，```includes()```返回布尔
- 大小写转化：```toUpperCase()```、 ```toLowerCase()```

### 数组常见方法
数组操作基本是改变元数据   
* 增：```.push()```，```.unshift()```开头添加，```新数组=a.concat(...)```不改变原数据，返回合并后新数组
* 删：```.pop()```末尾删除，```shift()```删第一项  
```新数组=a.slice(begin, end)```不改变原数据，一个或两个参数   
  一个参数，删除之前元素   
  两个参数，截取，end位置元素不包括
* 查： ```indexOf()```返回下标，```includes()```返回布尔
* ```.splice(开始位置index, 删除数量, 插入的元素)```返回删除元素数组  
  一个参数，删除之后元素   
  两个参数   
  三个参数   
* 迭代方法（不改变原数据）：```.find(() => )```返回匹配项，```.some(() => )```有一个满足返回true，```.every(() => )```所有满足返回true，```b=a.filter(() => )```返回满足数组，```.map()```
* ```reverse()```反转，```sort(a,b=>)```排序(a-b小到大)
* es6：```Array.from()```、```Array.of()```、```find```、```includes()```、```flatMap()```

### 数组去重方法
* 循环利用```indexOf()```方法往新数组push去重，```.indexOf(arr[i]) === -1```
* 利用es6的```Set```去重，```Array.from(new Set())```
* 利用```filter```去重，```arr.filter((val, index) => arr.indexOf(val) === index)```
* 利用Map数据结构去重，```arr.filter(val => !map.has(val) && map.set(val, 1))```

### 闭包
函数套函数，内层函数中访问到其外层函数的作用域
- 两个优点：保存和保护
  - 保护内部变量不受外界干扰，适合模块化开发，在ES6 module和CommonJs都能看到
  - 保存就是形成一个不销毁的作用域，一直存在内存中，容易造成内存泄露
  - 主要应用[防抖节流](/interview/encapsulation.html#防抖节流)

### 防抖节流
都是防止一段时间重复性操作      
```防抖```：n秒后执行操作，若n秒内重复触发，重新计时（输入框发送请求的防抖）   
```节流```：n秒内只执行一次（提交按钮）   
[防抖节流实现](/interview/encapsulation.html#防抖节流)

### 浅拷贝深拷贝
针对于Object和Array引用数据类型
* 浅拷贝：属性是基本类型，拷贝的是基本类型的值，属性是引用类型，拷贝的就是内存地址（指向同一块内存）   
  赋值和浅拷贝的区别在于第一层的基本数据类型，赋值后改值源对象会改变   
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

* 深拷贝：将一个对象从内存中完整的拷贝一份出来（不共享同一块内存），修改新对象不会影响原对象
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

### for...in和for...of区别
for in：遍历对象（拿key），遍历数组（拿索引）   
for of：遍历数组（拿每项item）

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

### 箭头函数和普通函数的区别
- 写法简洁
- 没有自己的this，继承上一层的this而且指向不会改变
- 没有prototype，不能new一个箭头函数

### Promise
是异步编程新的一种解决方案，支持链式调用解决回调地狱的问题

### async/await
基于Promise实现的，好处就是让异步的代码看起来和同步代码一样，代码容易阅读和维护   
* async声明一个异步的function，返回值为Promise对象
```js
// 函数里return结果，相当于Promise.resolve()
async function abc() {}
const result = abc();
console.log(result, 1122); // Promise对象
```
* await等待一个异步方法执行完成，一般右侧为Promise对象
```js
async function abc() {
  console.log(await Promise.resolve(123));  // 123
  console.log(await 123);  // 123
  try {  // 失败要try...catch捕获
    const result3 = await Promise.reject('error');
  } catch (e) {
    console.log(e);
  }
}
abc();
```
* 优势：如果是链式调用，Promise得用then去执行，async/await写法几乎和同步代码一样
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

## 其它
### 内存泄露
说白了就是内存使用了之后没有被浏览器回收   
闭包一定会造成内存泄漏吗？看它有没有被外界接收了   
垃圾回收方式：```标记清除```，```引用计数```   

* 使用未声明的变量，意外创建了一个全局变量
* 未清理定时器```setInterval()```，```clearInterval()```
* 闭包，函数内部的局部变量，没有释放
* 删除dom元素，没有清理dom的引用
```js
var a = document.getElementById('btn');
document.body.removeChild(document.getElementById('btn'));
// 解决手动删除 a = null;
```

### DOM和BOM
DOM：文档对象模型，是W3C标准规范，主要学习操作页面元素   
BOM：浏览器对象模型   
常见的BOM对象：window(核心对象)包含-->location、screen、navigator

### 作用域和作用域链
* 作用域
  * 全局作用域：不在函数和大括号中声明的变量
  * 函数作用域
  * 块级作用域
* 作用域链：js中使用变量，会在当前作用域开始，层层向上寻找

### 原型和原型链
原型：js中是使用函数创建对象的，都有一个prototype属性，也就是原型对象，用来存放属性和方法   
原型链：我理解得本质就是个列表，当返回函数实例时，会有__proto__属性指向函数的原型，当访问对象属性时会搜索该对象的原型，层层向上找   
```p.__proto__===Person.prototype```   
```Object.prototypep.__proto__===null```
```js
function Person() {}
console.log(Person.prototype);

// 输出
{
  constructor: ƒ Person()
  __proto__: {
    constructor: ƒ Object()
    hasOwnProperty: ƒ hasOwnProperty()
    isPrototypeOf: ƒ isPrototypeOf()
    propertyIsEnumerable: ƒ propertyIsEnumerable()
    toLocaleString: ƒ toLocaleString()
    toString: ƒ toString()
    valueOf: ƒ valueOf()
  }
}

const p = new Person();
console.log(p);
// 输出
{
  __proto__: {
    constructor: ƒ Person()
    __proto__: Object
  }
}
```

### 事件代理
事件流经过三个阶段：捕获-->目标-->冒泡，事件代理就是在冒泡阶段完成   
就是把一组元素的事件委托到父级或更外层元素上，绑定事件是外层元素   
优点：动态绑定减少重复工作，减少所需内存

### 事件循环机制 Event Loop
JS执行代码是单线程的，每次只能做一件事，遇到异步任务不会一直等待返回结果，会将对应的任务放在事件队列中（微任务、宏任务）   
事件循环可理解为一个桥梁   
首先执行同步代码这属于宏任务，执行中遇到微任务加入到微任务队列（宏任务也一样），执行完当前宏任务后，有微任务就执行微任务   
然后浏览器会执行渲染，接着JS线程执行下一个宏任务
* 宏任务：宿主环境提供，script代码、setTimeout、setInterval、ajax、UI交互
* 微任务：语言本身提供，Promise、mutationObserver

### AJAX
异步更新网页（更新网页对应部分，不需要刷新整个网页）
* 过程
  * 创建XMLHttpRequest实例对象（new XMLHttpRequest()）
  * 与服务器建立连接.open
  * 发送给服务端.send

### Axios
支持promise、浏览器端发送AJAX请求、node端发http请求


