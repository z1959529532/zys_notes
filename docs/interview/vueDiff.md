---
title: Vue虚拟Dom与Diff算法
---

Vue源码借鉴了snabbdom实现虚拟Dom和Diff算法的方式

### snabbdom
源码用TS写的   
想使用build好的JS版本的snabbdom的库，可以从npm下载```yarn add snabbdom -D```   


Diff发生在新的虚拟Dom和旧的虚拟Dom上，最后反映到真实Dom   
不研究Dom如何转化为虚拟Dom，属于模板编译   
h函数---->虚拟Dom---->真实Dom   


#### h函数产生虚拟节点   
创建虚拟节点```h函数```---->创建patch函数---->patch函数```让虚拟节点上树```

#### 手写h函数
依赖包```snabbdom```---->```h.ts```传入参数形式分多种情况---->```vnode.ts```里面函数重载，返回一个对象

#### Diff算法
感受最小更新，同级加key   
得同一个虚拟节点   
只进行同层比较，不跨层


