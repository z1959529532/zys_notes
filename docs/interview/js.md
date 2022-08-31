---
title: js系列
---

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




