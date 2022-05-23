---
title: ajax
---

- 异步更新网页（不需要刷新整个页面，无刷新获取数据），懒加载按需加载

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
体       a=100&b=200
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
- 创建server.js模拟服务端，node启动（node server.js），可直接访问 localhost:8020/server/get
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
- 设置自定义请求头信息
  - ``xhr.setRequestHeader('Content-Type'， 'application/x-www-form-urlencoded')``
  - 自定义请求头的话，服务端设置相应响应头  
```html
<button>点击发送请求</button>
<div id="result"></div>
<script>
   const btn = document.getElementsByTagName('button')[0];
   const result = document.getElementById('result');

    btn.onclick = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:8020/server/post');
        // 设置请求头信息
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('name', 'zhangSan');  //自定义头信息
        xhr.send('a=100&b=200');  // 参数写法多种
    };
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
    response.send(JSON.stringify(data));
});
```
- 页面JSON.html中
  - 两种转换数据方式：手动（JSON.parse）、自动
  - 自动：设置xhr中响应体数据类型
```html
<script>
    btn.onclick = () => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';  // 设置xhr中响应体数据类型
        xhr.open('POST', 'http://127.0.0.1:8020/server/json');
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    // 结果为JSON数据形式
                    
                    // 1、手动转换
                    // let data = JSON.parse(xhr.response);
                    // result.innerHTML = data.name;
                    // 2、自动转换，设置xhr中响应体数据类型
                    result.innerHTML = xhr.response.name;
                } else {}
            }
        };
    };
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

## 同源策略
- 是什么？
  - 是浏览器的一种安全策略
  - 同源是指：<span style="color:#0000ff">协议、域名、端口</span>必须完全相同
违背就是跨域
- 如何解决跨域
  - JSONP、CORS

创建服务
```js
// 同源策略
// 不设置可跨域请求头信息
// 访问127.0.0.1:8020/tongyuan  返回本地页面页面
app.all('/tongyuan', (request, response) => {
    response.sendFile(__dirname + '/10_跨域/01_同源策略.html');
});
app.all('/tongyuan/request', (request, response) => {
    response.send('用户数据');
});
```
10_跨域/01_同源策略.html中
```html
<body>
<h3>同源策略</h3>
<button>点击过去数据</button>
<script>
    const btn = document.getElementsByTagName('button')[0];

    btn.onclick = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/tongyuan/request');
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    console.log(xhr.response);
                } else {}
            }
        };
    };
</script>
```

## JSONP（解决跨域）
- 是一个非官方的跨域解决方案，只支持get
- 网页有一些标签具有跨域能力（img、link、iframe、script）JSONP就是借助script

- 示例1：同源策略
```js
// 提前写好函数，用script标签引入js文件去调函数
const data = {
    name: '张三'
};
handle(data);
```

- 示例2，JSONP原理（script访问服务，返回结果调用提前写好的函数）
```js
// JSONP原理
app.all('/jsonp', (request, response) => {
    // 直接返回会报错 Uncaught SyntaxError: Unexpected identifier
    // response.send('HELLO JSONP');
    // 要返回js代码
    // response.send(`console.log("HELLO JSONP")`);
    // 返回要调用的方法
    const data = {name: '李四'};
    response.send(`handle(${JSON.stringify(data)})`);
});
```
html中
```html
<body>
<div id="result"></div>
<script>
    function handle(data) {
        const result = document.getElementById('result');
        result.innerHTML = data.name;
    }
</script>
<!--1、提前写好方法，script引入文件调用该方法-->
<!--<script src="./a.js"></script>-->

<!--2、script请求返回需要的js代码-->
<script src="http://127.0.0.1:8020/jsonp"></script>
</body>
```

- 示例3：原生JSONP实践（js创建script标签，设置src属性，返回结果调用提前写好的函数）
```js
app.all('/jsonp/practice', (request, response) => {
    const data = {exist: 1, msg: '用户名已存在'};
    response.send(`handle(${JSON.stringify(data)})`);
});
```
html中
```html
用户名：<input type="text" id="username"/>
<p id="result"></p>
<script>
    const input = document.getElementsByTagName('input')[0];
    const p = document.getElementById('result');

    function handle (data) {
        p.innerHTML = data.msg;
    }

    input.onblur = () => {
        if (input.value) {
            // 1、创建script标签
            // 2、设置标签的src属性
            // 3、将script插入文档中
            const script = document.createElement('script');
            script.src = 'http://127.0.0.1:8020/jsonp/practice';
            document.body.appendChild(script);
        }
    };
</script>
```

- 示例4：JQery发jsonp请求
```js
// JQuery发送jsonp请求
app.all('/jquery-jsonp', (request, response) => {
    const data = {name: '张三'};
    // 接收callback参数
    let cb = request.query.callback;
    
    response.send(`${cb}(${JSON.stringify(data)})`);
});
```
html中
```html
<button>发送请求</button>
<div id="result"></div>
<script>
    $('button').eq(0).click(() => {
        // callback是固定写法
        // 这样发送，callback是有值的看f12
        // 服务端是可以将接收的callback值作为调用的函数，相当于jquery已经注册了这样的一个函数
        $.getJSON('http://127.0.0.1:8020/jquery-jsonp?callback=?', (data) => {
            // console.log(data);
            $('#result').html(`姓名：${data.name}`);
        });
    });
</script>
```

## CORS（解决跨域）
- 是官方的跨域解决方案，特点是不在客户端操作，完全在浏览器中处理
  (像我们之前在请求中设置的请求头信息)
- 怎么工作，设置一个响应头
- 使用：在服务端设置即可

```js
// cors
app.all('/cors', (request, response) => {
    // 允许跨域的响应头
    // response.setHeader('Access-Control-Allow-Origin', '*');
    // response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    // response.setHeader('Access-Control-Allow-Headers', '*');
    // 还有好多写法
    
    response.send('HELLO CORS');
});
```
html中
```html
<button>发送请求</button>
<div id="result"></div>
<script>
    const btn = document.getElementsByTagName('button')[0];

    btn.onclick = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://127.0.0.1:8020/cors');
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    result.innerHTML = xhr.response;
                } else {}
            }
        };
    };
</script>
```



