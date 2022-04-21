---
title: ajax
---

## HTTP
- HTTP协议（hypertext transport protocol）[超文本传输协议]，协议详细规定了浏览器和万维网服务器之间相互通信的原则。
  - 约定，规则
  
## 请求报文
- 重点是格式与参数
```
行       POST url HTTP/1.1 （方法，路径，http协议版本）
头       Host: atguigu.com
        Cookie: name=guigu
        Content-Type: application/x-www-form-urlencoded ...
空行
体       username=admin&password=123456
        GET方法请求体为空，POST请求体可以不为空
```

## 响应报文
```
行       HTTP/1.1 200 OK （http协议版本，响应状态码，响应状态字符串）
头       Content-Type: application/x-www-form-urlencoded ...
空行
体       <html>
            <div>123</div>
        </html>
```

## 原生AJAX请求的案例
- 环境：Node，Express
- npm init --yes， npm i express
- 创建server模拟服务端，node启动
- 创建前端页面GET.html，用GET方法请求结果显示
  - 设置请求参数，再初始化.open中甲参数
- 创建前端页面POST.html，用POST方法请求结果显示（在服务端创建与之匹配的路由规则）
  - 设置POST请求参数，在初始化.send中放入参数
- 设置请求头信息
  - ``xhr.setRequestHeader('Content-Type'， 'application/x-www-form-urlencoded')``
  - 自定义请求头的话，服务端设置相应响应头   

server.js代码
```js
// 1、引入express
const express = require('express');

// 2、创建对象应用
const app = express();

// 3、创建路由规则
// request是对请求报文的封装
// response是对响应报文的封装
app.get('/server', (request, response) => {
    // 设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 设置一个响应体
    response.send('HELLO AJAX GET');
});

// POST请求
// app.post('/server/post', (request, response) => {
//     response.setHeader('Access-Control-Allow-Origin', '*');
//     response.send('HELLO AJAX POST');
// });
app.all('/server/post', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 响应头  自定义
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.send('HELLO AJAX POST');
});

// 响应JSON数据
app.all('/server/json', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    // 响应一个JSON数据
    const data = {name: 'zhangSan'};
    response.send(JSON.stringify(data));  // 要进行字符串转换
});

// 4、监听端口启动服务
app.listen(8020, () => {
    console.log('服务已启动，8020端口监听中...');
});
```

GET.html代码
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AJAX GET请求</title>
    <style>
        #result {
            height: 100px;
            width: 200px;
            border: 1px solid lightblue;
        }
    </style>
</head>
<body>
<button>点击发送请求</button>
<div id="result"></div>
<script>
    // 获取dom元素
    const btn = document.getElementsByTagName('button')[0];
    const result = document.getElementById('result');
    
    // 绑定事件
    btn.onclick = function () {
        // console.log('test');
        // 1、创建对象
        const xhr = new XMLHttpRequest();
        // 2、初始化 设置请求方法和url
        xhr.open('GET', 'http://127.0.0.1:8020/server?a=100&b=200');
        // 3、发送
        xhr.send();
        // 4、绑定事件 处理服务端返回的结果
        // on 当...时候
        // readystate 是xhr对象中的属性，状态值是 0 1 2 3 4
        // 改变
        xhr.onreadystatechange = function () {
            // 处理服务端返回结果（服务端返回的所有结果）
            if (xhr.readyState === 4) {
                // 判断响应的状态码
                if (xhr.status >= 200 && xhr.status < 300) {
                    // 处理结果（行，头，空行，体）
                    // console.log(xhr.status);  // 状态码
                    // console.log(xhr.statusText);  // 状态字符串
                    // console.log(xhr.getAllResponseHeaders());  // 所有响应头
                    // console.log(xhr.response);  // 响应体
                    
                    // 显示结果
                    result.innerHTML = xhr.response;
                }
            }
        };
    };
</script>
</body>
</html>
```

POST.html代码
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AJAX POST请求</title>
    <style>
        #result {
            height: 100px;
            width: 200px;
            border: 1px solid lightblue;
        }
    </style>
</head>
<body>
<div id="result"></div>
<script>
    // 获取dom元素
    const result = document.getElementById('result');
    
    // 绑定事件
    result.addEventListener('mouseover', () => {
        // console.log('test');
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:8020/server/post');
        // 设置请求头信息
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('name', 'zhangSan');  //自定义
        xhr.send('a=100&b=200');  // 参数写法多种
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    // 显示结果
                    result.innerHTML = xhr.response;
                } else {}
            }
        };
    });
</script>
</body>
</html>
```

JSON.html代码
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JSON响应</title>
    <style>
        #result {
            height: 100px;
            width: 200px;
            border: 1px solid lightblue;
        }
    </style>
</head>
<body>
<div id="result"></div>
<script>
    // 获取dom元素
    const result = document.getElementById('result');
    // 绑定键盘按下事件
    window.onkeydown = () => {
        // console.log('test');
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';  // 设置xhr中响应体数据类型
        xhr.open('POST', 'http://127.0.0.1:8020/server/json');
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    // 结果为JSON数据形式
                    
                    // let data = JSON.parse(xhr.response);  // 手动转换
                    // result.innerHTML = data.name;
                    // 自动转换，设置xhr中响应体数据类型
                    result.innerHTML = xhr.response.name;
                } else {}
            }
        };
    };
</script>
</body>
</html>
```

