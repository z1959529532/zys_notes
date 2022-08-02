---
title: css系列
---

### 盒模型

### 选择器和继承属性

### 隐藏元素方法
```display```  ```visiablity```  ```opacity```  ```宽高0```  ```position移出```

### 水平垂直居中的方法
```定位+margin auto```  ```定位+ margin负值```  ```定位+ transform```  ```flex```

### 动画animation
animation:   
```animation-name(动画名称)```   
```animation-duration(动画时间)```   
```animation-timing-function(过度效果)```   
```animation-iteration-count(循环次数)```   
```animation-fill-mode(动画时间之外的状态)```

### 转换transform
```translate(50%, 50%)位移```  ```scale(.8)缩放```  ```rotate(15deg)旋转```  ```skew(-5deg)扭曲```

### 响应式相关
* flex盒布局
  * 决定主轴方向和排列方式，控制换行
    * flex-flow： flex-direction、 flex-wrap
    * flex-direction： ```row``` | ```row-reverse``` | ```column``` | ```column-reverse```
    * flex-wrap： ```nowrap``` | ```wrap``` | ```wrap-reverse```
  * 主轴方向对齐方式
    * justify-content：```flex-start``` | ```flex-end``` | ```center``` | ```space-between``` | ```space-around```
  * 侧轴方向对齐方式 单行/多行
    * align-items：```flex-start``` | ```flex-end``` | ```center``` | ```baseline``` | ```stretch```
    * align-content：```flex-start``` | ```flex-end``` | ```center``` 
  * 分配空间
    * flex：flex-grow（扩展比例）、flex-shrink（收缩比例）、flex-basis
    * flex-basis（伸缩基准值）：```<length>``` | ```<percentage>``` | ```auto``` | ```content```

* 媒体查询   
  * ```<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">```   
  * width=device-width：自适应屏幕宽度
  * initial-scale：初始化的缩放
  * user-scalable：用户可以缩放操作   

```@media screen and (min-device-width: 400px) and (max-device-width: 800px) {}```   
通过媒体查询，对不同分辨率设备下的央视设定

* 百分比，rem

### 单行/多行文本溢出省略
* 单行
  * ```overflow: hidden;```
  * ```white-space: nowrap;```  文本间的空格与换行（空格合并为一个，不换行）
  * ```text-overflow: ellipsis;```  溢出部分替换...

* 多行



