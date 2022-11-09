---
title: html部分
---

- 超文本标记语言

## 基本标签(Tag)   
```<!DOCTYPE html> ```：H5文档类型   
```<!---->```：注释   
```<p></p>```：段落标签   
```<h2></h2>```：标题字   
```<br>```：换行（独目标记）   
```<hr color="red" width="50%">```：分割线   
```<pre></pre>```：预留格式   
```<del></del>```：删除字   
```<ins></ins>```：插入字   
```<b></b>```：粗体字   
```<i></i>```：斜体字   
```<font color="red" size="5"></font>```：字体标签   

## 实体符号   
以&开始，以;结束   
```b&lt;a&gt;c```：```表示b<a>c```   
```&nbsp```：空格   

## table表格   
```<table border="1" width="400" height="200" align="center">```   
```<tr><th>a</th></tr>```   
```<tr><td align="center">4</td></tr>```   
```<td rowspan="2"></td>```：行合并，删除下面   
```<td colspan="2"></td>```：列合并，删除哪个没要求   
```thead、tbody、tfoot```：加这些为了js更好的操作   

## 背景色和背景   
```<body bgcolor="#add8e6" background="img/Default.jpg">```  

## 图片  
```<img src="img/Default.jpg" alt="图片找不到" width="100%" title="我的图片">```：图片是浮在背景上

## 超链接
作用：通过超链接可以从浏览器向服务器发送请求   
```<a href="http://www.baidu.com" target="_blank">百度网址</a>```：可以是相对路径也可以是绝对路径；可以是网络中某个资源路径，也可以是本地资源   
```target属性```：_blank(新窗口)、_self(当前窗口)、_top、_parent

## 列表   
- 无序列表：```<ul type="disc"><li>中国</li></ul>```   
- 有序列表：```<ol type="1"><li>水果</li></ol>```   

## 表单   
作用：收集用户输入的信息，与超链接都可提交数据，不同是表单是可输入的   
- ```<form action=""></form>```   
  - ```action属性```：指定提交服务器地址   
  - ```method属性```：指定请求方式get/post   
<br>
   
表单中有```name```属性才会参与提交   
* ```<input type="text" name="username" value="admin" placeholder="请输入用户名"/>```   
* ```<input type="radio" name="sex" value="1" checked/>男```：单选按钮，```name```属性相同表示一组；```checked```为默认选中   
* ```<input type="checkbox" name="hobby" value="run" checked/>跑步```：多选按钮```name```属性相同表示一组；```checked```为默认选中
* ```<select name="grade"><option value="bk" selected>本科</option></select>```：下拉框，```selected```为默认选中，```multiple```属性多选，```size```多选个数   
* ```<textarea rows="5" cols="25" name="introduce"></textarea>```：文本域，没有value属性   
* ```<input type="hidden" name="userid" value="132">```：隐藏域，网页看不到，会参与表单提交   
* ```<input type="file"/>```：选取文件   
* ```readonly```：只读属性、```disabled```：禁用属性，不参与表单提交   
* ```maxlength```：输入最大长度   
<br>
   
- ```<input type="button" value="保存"/>```：对于按钮来说，```value```属性用来指定按钮显示文本   
- ```<input type="submit" value="保存" />```   
- ```<input type="reset" value="清空"/>```   

## 块级元素和行级元素(内敛)
- 行级元素：通常在块级元素内，只占必要的宽度(不可以设置宽高)   
```span```、```a```、```font```
- 块级元素：独占一行   
```p```、```h1```、```div```、```ul```、```form```、```table```
- 行级块元素：可以与其它元素共占一行，又可设置宽高   
```input```、```img```、```button```

## id属性
在html中任何元素都有id属性，id是该元素的唯一标识，js中为了方便获取到该元素   

## div和span
div、span可以让页面灵活的布局，table布局死板不够灵活   
区别：div独占一行(默认情况下)

## html5表单验证
- form标签上属性
  - ```enctype="multipart/form-data"```：表单中有file   
  - ```novalidate```：表单不校验，与```submit```上加```formnovalidate```效果一样   
  - ```autocomplete```：是否记住表单输入值   
- input标签上
  - ```autofocus```：默认聚焦
  - ```required```：表示必填，提交时表单校验
  - ```pattern="^\d{4}[abcd]$"```：输入满足正则格式
  - ```maxlength```、```minlength```、```max```、```min```
  - ```formnovalidate```：放在submit上，表单不校验
```html
<!--输入框带提示列表-->
<input type="text" name="position" list="tips" placeholder="请输入职位">
<dataList id="tips">
  <option value="前端"></option>
  <option value="后端"></option>
  <option value="测试"></option>
</dataList>
```
- label标签的for属性
在radio和checkbox上体现，点字就可选中
```html
<input type="radio" name="sex" id="man" value="1" checked/><label for="man">男</label>
<input type="radio" name="sex" id="woman" value="0"/><label for="woman">女</label>
```
<br><br>

- html5验证Api
  - ```document.getElementById("username").validity```：验证状态   
  ```valueMissing```：require校验状态   
  ```patternMismatch```：正则校验状态   
  ```tooLong```、```tooShort```：对应maxlength和minlength但状态不会变   
  ```typeMismatch```：类型格式校验状态   
  ```rangeOverflow```、```rangeUnderflow```：对应数字输入框max和min最大最小值校验
- ```document.getElementById("username").checkValidity()```：所有约束校验状态，返回Boolean值   
- ```numInput.setCustomValidity('不能为空！')```：自定义验证信息，可配合oninput、oninvalid、onchange事件定义   
<br><br>

- html5自带验证美化   
通过css修改校验输入框的样式   
  - ```:required```和```:optional```：必填和非必填，例input:required:focus { CSS样式 }
  - ```:valid```和```invalid```：验证通过和验证不通过
- 修改默认气泡
利用js监听表单invalid和submit事件，阻止默认事件```e.preventDefault()```   
再拿到错误信息插dom操作，设置想要的样式


