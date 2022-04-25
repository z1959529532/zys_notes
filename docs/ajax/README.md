---
title: ajax
---

## HTTP
- HTTP协议（hypertext transport protocol）[超文本传输协议]，协议详细规定了浏览器和万维网服务器之间相互通信的原则。
  - 约定，规则
  
## 报文
重点是格式与参数
### 请求报文
```
行       POST url HTTP/1.1 （方法，路径，http协议版本）
头       Host: atguigu.com
        Cookie: name=guigu
        Content-Type: application/x-www-form-urlencoded ...
空行
体       username=admin&password=123456
        GET方法请求体为空，POST请求体可以不为空
```
### 响应报文
```
行       HTTP/1.1 200 OK （http协议版本，响应状态码，响应状态字符串）
头       Content-Type: application/x-www-form-urlencoded ...
空行
体       <html>
            <div>123</div>
        </html>
```

## 原生AJAX请求的案例
- 准备
```sh
# 环境：Node，Express(基于Node)
# 下载安装Node
npm init --yes
npm i express
```
- 创建server.js模拟服务端，node启动，可直接访问 localhost:8020/server
```js
// 1、引入express
const express = require('express');
// 2、创建对象应用
const app = express();
// 3、创建路由规则
// request是对请求报文的封装
// response是对响应报文的封装
app.get('/server/get', (request, response) => {
    // 设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 设置一个响应体
    response.send('HELLO AJAX GET');
});
// 4、监听端口启动服务
app.listen(8020, () => {
    console.log('服务已启动，8020端口监听中...');
});
```
### GET案例
- GET请求例子，页面GET.html中
  - 用GET方法请求结果显示
  - 设置请求参数，再初始化``.open``中加参数
```html
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
        xhr.open('GET', 'http://127.0.0.1:8020/server/get?a=100&b=200');
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
```

### POST案例
```js
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
```
- 页面POST.html中
  - 用POST方法请求结果显示（在服务端server创建与之匹配的路由规则）
  - 设置POST请求参数，再初始化.send中加参数
- 设置请求头信息
  - ``xhr.setRequestHeader('Content-Type'， 'application/x-www-form-urlencoded')``
  - 自定义请求头的话，服务端设置相应响应头  
```html
<script>
    result.addEventListener('click', () => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:8020/server/post');
        // 设置请求头信息
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('name', 'zhangSan');  //自定义
        xhr.send('a=100&b=200');  // 参数写法多种
    });
</script>
```

### 响应JSON数据案例
```js
// 响应JSON数据
app.all('/server/json', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    // 响应一个JSON数据
    const data = {name: 'zhangSan'};
    response.send(JSON.stringify(data));  // 要进行字符串转换
});
```
- 页面JSON.html中
  - 两种转换数据方式：手动（JSON.parse）、自动
  - 自动：设置xhr中响应体数据类型
```html
<script>
    result.addEventListener('click', () => {
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
    });
</script>
```

## server.js热更新
- 安装nodemon（npm i nodemon）
- nodemon server.js启动就可

## IE缓存问题
当请求没有变化时，IE浏览器会走本地缓存
```js
// IE缓存
app.all('/server/ie', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send('HELLO IE');
});
```
- 解决，在IE.html中
```html
<script>
    const xhr = new XMLHttpRequest();
    // 时间不一样，会认为两次请求，而不会走本地缓存
    xhr.open('GET', 'http://127.0.0.1:8020/server/ie?t='+Date.now());
    xhr.send();
</script>
```

## 请求超时与网络异常的处理
- 让服务响应延时，设置超时时间
- f12把network中 ``No throttling``切换为``Offline`` 模拟网络异常
server中创建服务
```js
// 延时响应（针对请求超时与网络异常）
app.all('/server/delay', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(() => {
        response.send('HELLO DELAY');
    }, 3000);
});
```
html中
```html
<script>
    const xhr = new XMLHttpRequest();
    // 超时设置
    xhr.timeout = 2000;
    // 超时回调
    xhr.ontimeout = () => {
        alert('请求超时！');
    };
    // 网络异常回调
    xhr.onerror = () => {
        alert('你的网络似乎出了一些问题！');
    };
    xhr.open('GET', 'http://127.0.0.1:8020/server/delay');
    xhr.send();
</script>
```

## 取消请求与重复请求问题
- 请求未完成可取消请求``xhr.abort()``
- 阻止发送重复请求   
server中创建服务
```js
app.all('/server/cancelorrepeat', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    setTimeout(() => {
        response.send('HELLO CANCELORREPEAT');
    }, 1500);
});
```
html中
```html
<script>
    let xhr = null;
    let isSending = false; // 是否正在发送请求标识
    btn.onclick = function () {
        if(isSending) xhr.abort();  // 如果正在发送，取消当前请求
        xhr = new XMLHttpRequest();
        isSending = true;  // 发送
        xhr.open('GET', 'http://127.0.0.1:8020/server/cancelorrepeat');
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                // 在返回所有结果处重新置位，因为有失败情况
                isSending = false;
                if (xhr.status >= 200 && xhr.status < 300) {
                    console.log(xhr.response);
                } else {}
            }
        };
    };
</script>
```

## jQuery发ajax请求
server中创建服务
```js
app.all('/server/jquery', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    // response.send('HELLO jQuery发ajax');
    const data = {name: '张三'};
    response.send(JSON.stringify(data));
});
```
html中
```html
<script>
    $('button').eq(0).click(() => {
        $.get('http://127.0.0.1:8020/server/jquery', {a: 100, b: 200}, (data) => {
            console.log(data);
        });
    });
    $('button').eq(1).click(() => {
        $.post('http://127.0.0.1:8020/server/jquery', {a: 100, b: 200}, function (data) {
            console.log(data);
        }, 'json');  // json格式
    });
    
    // 通用方法
    $('button').eq(2).click(() => {
        $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:8020/server/jquery',
            data: {a: 100, b: 200},
            dataType: 'json',
            timeout: 2000,
            headers: {
                name: 'atguigu'
            },
            success: (data) => {
                console.log(data);
            },
            error: () => {}
        });
    });
</script>
```

## axios发ajax请求
server中创建服务
```js
app.all('/server/axios', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    const data = {name: '张三'};
    response.send(JSON.stringify(data));
});
```
html中
```html
<script>
    // 配置通用baseUrl
    axios.defaults.baseURL = 'http://127.0.0.1:8020/server';
    btns[0].onclick = () => {
        axios.get('/axios', {
            params: {a: 100, b: 200},
            headers: {name: 'atguigu'}
        }).then(data => {
            console.log(data);
        });
    };
    btns[1].onclick = () => {
        axios.post('/axios', {  // 第二个参数为请求体
            username: 'admin',
            password: '123456'
        }, {  // 第三个参数为其他配置
            params: {a: 100, b: 200},
            headers: {name: 'atguigu'}
        }).then(data => {
            console.log(data);
        });
    };
    
    // 通用方法
    btns[2].onclick = () => {
        axios({
            method: 'POST',
            url: '/axios',
            params: {a: 100, b: 200},
            headers: {name: 'atguigu'},
            data: {  // 请求体
                username: 'admin',
                password: '123456'
            }
        }).then(data => {
            console.log(data);
        });
    };
</script>
```

## fetch函数发ajax请求
server中创建服务
```js
app.all('/server/fetch', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    const data = {name: '张三'};
    response.send(JSON.stringify(data));
});
```
html中
```html
<script>
    btn.onclick = () => {
        fetch('http://127.0.0.1:8020/server/fetch', {
            method: 'POST',
            headers: {name: 'atguigu'},
            body: {  // 请求体
                username: 'admin',
                password: '123456'
            }
        }).then(response => {
            // return response.text();
            return response.json();  // 返回json格式
        }).then(data => {
            console.log(data);
        });
    };
</script>
```



