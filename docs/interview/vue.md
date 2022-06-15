---
title: vue系列
---

### 组件data必须为函数
函数return的都是新地址的data，这样组件之间数据不会影响，防止数据污染

### vue的$nextTick
vue更新dom是异步执行的，修改数据后，在回调中拿到更新后的dom结构
$nextTick()返回一个promise对象


