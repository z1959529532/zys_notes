---
title: Vue虚拟Dom与Diff算法
---

Vue源码借鉴了snabbdom实现虚拟Dom和Diff算法的方式   
[Github地址：https://github.com/snabbdom/snabbdom](https://github.com/snabbdom/snabbdom)   
[b站视频地址](https://www.bilibili.com/video/BV1v5411H7gZ/?spm_id_from=333.999.0.0&vd_source=12de02404b987499ed9c11dde9553bfc)

### snabbdom
源码用TS写的   
想使用build好的JS版本的snabbdom的库，可以从npm下载```yarn add snabbdom -D```   


Diff发生在新的虚拟Dom和旧的虚拟Dom对比上，最后反映到真实Dom   
不研究Dom如何转化为虚拟Dom，属于模板编译   
h函数---->虚拟Dom---->真实Dom   


#### h函数产生虚拟节点   
创建虚拟节点```h函数```---->创建patch函数---->patch函数```让虚拟节点上树```

- 手写h函数   

依赖包```snabbdom```---->```h.ts```传入参数形式分多种情况---->```vnode.ts```里面函数重载，返回一个虚拟节点对象

#### Diff算法
感受最小更新，同级加key   
得同一个虚拟节点   
只进行同层比较，不跨层   

#### patch函数
判断oldVnode是虚拟节点还是Dom节点（是Dom用h函数包装为虚拟节点）   
然后判断是不是同一根节点（key和sel选择器）---->是（***精细比较***）/ 不是（递归生成dom，直接插入新的，删除旧的）   

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





