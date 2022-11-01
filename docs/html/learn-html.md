---
title: html基础
---

- 超文本标记语言

## 基本标签   
```<!DOCTYPE html> ```：H5语法   
```<p></p>```：段落标记   
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
```b&lt;a&gtc```：```表示b<a>c```   
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
作用：收集用户输入的信息   
```<form action=""></form>```   
```action属性```：指定服务器地址   
```<input type="submit" value="保存" />```：对于按钮来说，```value```属性用来指定按钮显示文本   
```<input type="reset" value="清空"/>```   
```<input type="text" name="username" value="admin"/>```：有```name```属性才会参与提交   





