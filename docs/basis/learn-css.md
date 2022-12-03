---
title: css部分
---

## display和visibility
- display
  - ```none```：元素不可见
  - ```inline```：
  - ```block```：
  - ```inline-block```：行级块元素，可以与其它元素共占一行，又可设置宽高
<br><br>
- ```visibility: hidden```：元素不可见，dom中物理空间还保留

## position定位布局
```static```   
```relative```   
```absolute```：相对最近position不为static的父级给偏移量   
```fixed```：与```absolute```类似，不过相对窗口   
```sticky```：

## 盒子模型
width、height、padding、border、margin
* 行级元素设置```margin-top/margin-bottom```无用，```padding-top/padding-bottom```不占空间
* 盒子稳定性 width > padding > margin
* margin重叠，bfc内容

## Flex布局
* 决定主轴方向和排列方式，控制换行
  * flex-flow： flex-direction、 flex-wrap
  * flex-direction： ```row``` | ```row-reverse``` | ```column``` | ```column-reverse```
  * flex-wrap： ```nowrap``` | ```wrap``` | ```wrap-reverse```
* 主轴方向对齐方式
  * justify-content：```flex-start``` | ```flex-end``` | ```center``` | ```space-between``` | ```space-around```
* 侧轴方向对齐方式 单行/多行
  * align-items：```flex-start``` | ```flex-end``` | ```center``` | ```baseline``` | ```stretch```（拉伸，子盒子不要给高度）
  * align-content（多行）：```flex-start``` | ```flex-end``` | ```center``` | ```space-between``` | ```space-around``` | ```stretch```
* 分配空间(子)
  * flex：flex-grow（扩展比例）、flex-shrink（收缩比例）、flex-basis
  * flex-basis（伸缩基准值）：```<length>``` | ```<percentage>``` | ```auto``` | ```content```

注：父盒子设flex，子元素的float、clear和vertical-align将失效
