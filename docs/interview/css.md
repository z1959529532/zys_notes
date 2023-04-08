---
title: css系列
---

### 1、盒模型
标准盒模型、IE怪异盒模型（width包含padding、border）   
```box-sizing: content-box | border-box```

### 2、BFC
块级格式化上下文，是页面中的一块渲染区域，并且有一套属于自己的渲染规则，内部的元素不会影响到外部的元素

触发条件：
* 根元素
* 绝对定位元素
* ```overflow```不为```visible```的元素

应用场景：
* 同一个bfc下margin重叠，处理是包裹一层容器生成一个新的bfc
* 清除内部浮动float，计算高度时将内部浮动元素高度算入，```overflow: hidden```使外部元素生成bfc

### 3、水平垂直居中的方法
```定位上下左右0+margin auto```、```定位50%+ margin负值自身宽```、```定位50%+ transform```(兼容性好)、```flex```   
京东移动端顶部logo用的display


### 选择器和继承属性
- 选择器   
id选择器、类选择器、标签选择器   
后代选择器(#box div)、子选择器(.one>abc注意只有子辈)，相邻选择器(.one+two)   
伪类选择器、伪元素选择器
- 继承属性   
字体、文本、visibility、表格布局等

### px/em/rem/vh区别
```px``` 绝对单位，像素   
浏览器默认字体16px   
```em``` 相对单位(不固定)，相对于父级字体大小计算，父级无设定则相对浏览器   
```css
body {font-size: 10px} /* 公式16px*62.5%=10px,1rem=10px */
```
```rem``` 相对单位，相对于根节点html字体大小计算   
```css
html {font-size: 10px} /* 公式16px*62.5%=10px,1rem=10px */
```
```vh、vw``` 相对于窗口宽高，等分100份

### 如何让chrome支持小于12px的字体
chrome中文版默认最小字号12px   
```zoom: 0.8```、```-webkit-transform: scale(0.8)```

### 隐藏元素方法
```display```、```visibility```、```opacity```、```宽高0```、```position移出```

### 动画animation
animation:   
```animation-name(动画名称)```   
```animation-duration(动画时间)```   
```animation-timing-function(过度效果)```   
```animation-iteration-count(循环次数)```   
```animation-fill-mode(动画时间之外的状态)```   
```@keyframes```

### 转换transform
```translate(50%, 50%)位移```、```scale(.8)缩放```、```rotate(15deg)旋转```、```skew(-5deg)扭曲```

### 响应式相关
* flex盒布局
  * 决定主轴方向和排列方式，控制换行
    * flex-flow： flex-direction、 flex-wrap
    * flex-direction： ```row``` | ```row-reverse``` | ```column``` | ```column-reverse```
    * flex-wrap： ```nowrap``` | ```wrap``` | ```wrap-reverse```
  * 主轴方向对齐方式
    * justify-content：```flex-start``` | ```flex-end``` | ```center``` | ```space-between``` | ```space-around```
  * 侧轴方向对齐方式 单行/多行
    * align-items：```flex-start``` | ```flex-end``` | ```center``` | ```baseline``` | ```stretch```（拉伸，子盒子不要给高度）
    * align-content（多行）：```flex-start``` | ```flex-end``` | ```center``` | ```space-between``` | ```space-around``` | ```stretch```
  * 分配空间
    * flex：flex-grow（扩展比例）、flex-shrink（收缩比例）、flex-basis
    * flex-basis（伸缩基准值）：```<length>``` | ```<percentage>``` | ```auto``` | ```content```

* 媒体查询   
  * ```<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">```   
  * width=device-width：自适应屏幕宽度
  * initial-scale：初始化的缩放
  * user-scalable：用户可以缩放操作   

```@media screen and (min-device-width: 400px) and (max-device-width: 800px) {}```   
通过媒体查询，对不同分辨率设备下的样式设定

* 百分比，rem

### 单行/多行文本溢出省略
* 单行
  * ```overflow: hidden;```
  * ```white-space: nowrap;```  文本间的空格与换行（空格合并为一个，不换行）
  * ```text-overflow: ellipsis;```  溢出部分...替换

* 多行
  * ```overflow: hidden```
  * ```-webkit-line-clamp: 2``` 限制块元素的文本行数
  * ```text-overflow: ellipsis``` 溢出部分...替换
  * ```display: -webkit-box``` 将对象作为弹性盒子模型
  * ```-webkit-box-orient: vertical``` 设置伸缩盒子元素的排列
  * ```word-break: break-all```

### 回流和重绘
回流可理解为计算节点的位置和大小，触发条件：一开始渲染、添加删除dom、位置和尺寸变化、窗口尺寸变化   
重绘可理解为节点画好形状后触发(回流)，画上颜色等特性，触发条件：颜色修改、文本方向   
如何减少：   
触发回流一定触发重绘   
* 避免设置多项内敛样式
* 元素动画尽量脱离文档流position
* 避免使用table布局

### 预编译语言
扩展了css，增加了注入变量、混入(mixin)、模块化等概念，使用方便易于维护   
基本使用（less需写大括号）、变量（@、$）、作用域（sass无全局变量概念）、混入
