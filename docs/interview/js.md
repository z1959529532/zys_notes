---
title: js系列
---

### 数据类型
基本：String、Number、Boolean、null、undefined   
引用：Object、Array、Function

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

### 判断对象是空对象的方法
```Object.keys(obj).length == 0```、```JSON.stringify(obj) == '{}'```

### ==和===区别
相等会做类型转换，再进行值比较（true==1）
全等要类型相同，值也要相同

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

### Proxy
用于创建一个对象代理，实现对对象的拦截和自定义



