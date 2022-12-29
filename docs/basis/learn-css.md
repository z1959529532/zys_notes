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
```fixed```：与```absolute```类似，不过相浏览器窗口   
```sticky```：

## 盒子模型
* box-sizing
  * content-box：标准盒模型
  * border-box：IE怪异盒模型（元素width=width，包含padding、border）   

width、height、padding、border、margin   
* 行级元素设置```margin-top/margin-bottom```无用，```padding-top/padding-bottom```不占空间
* 盒子稳定性 width > padding > margin
* margin重叠，bfc内容

## Flex布局
灵活性大，符合响应式布局   
<span style="color:#0000ff">注：用flex布局后，就不分行级元素和块级元素了</span>   
<span style="color:#0000ff">注：父盒子设flex，子元素的float、clear和vertical-align将失效</span>      
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
  * flex-basis（基准值设置，宽度将失效）：```<length>``` | ```<percentage>``` | ```auto``` | ```content```
* align-self
* order：子项排列顺序，默认0

## 响应式案例
* 媒体查询，不同宽度匹配不同的方案   
```device-width（浏览器）/max-device-width（屏幕）```
```html
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>
  @media screen and (min-device-width: 400px) and (max-device-width: 600px) {
    .media1 {
      background-color: purple;
    }
  }
</style>

<!--其它写法-->
<style media="(min-device-width: 400px) and (max-device-width: 600px)">
  .media1 {
    background-color: purple;
  }
</style>
<link href="./css/aaa.css" rel="stylesheet" 
      media="(min-device-width: 400px) and (max-device-width: 600px)">
```

* flex布局
* %和rem（相对于根节点html字体大小计算）
* 自适应布局：js判断不同设备显示不同页面，局部自适应配合媒体查询

