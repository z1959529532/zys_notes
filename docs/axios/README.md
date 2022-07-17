---
title: axios
---

## 前置知识

* Ajax
* Promise

- 使用 ```json-server``` 快速搭建Http服务
    - npm install -g json-server
    - 创建 ```db.json``` 文件存放数据
    - 启动服务 ```json-server --watch db.json```
    - 操作参考github

## axios的基本使用

* 可在浏览器端发送Ajax请求
* 在node.js中发送Http请求
* 支持Promise

- 安装   
  npm install axios   
  yarn add axios   
  cdn引入

- 基本使用练习

```html

<body>
<button>发送 GET 请求</button>
<button>发送 POST 请求</button>
<button>发送 PUT 请求</button>
<button>发送 DELETE 请求</button>
<script>
    const btns = document.querySelectorAll('button');

    // get请求
    btns[0].onclick = () => {
        axios({
            method: 'GET',
            url: 'http://localhost:3000/posts/2'
        }).then(response => {
            console.log(response);
        });
    };

    // post请求
    btns[1].onclick = () => {
        axios({
            method: 'POST',
            url: 'http://localhost:3000/posts',
            data: {
                title: '哈哈哈',
                author: '张三'
            }
        }).then(response => {
            console.log(response);
        });
    };

    // put请求更新
    btns[2].onclick = () => {
        axios({
            method: 'PUT',
            url: 'http://localhost:3000/posts/3',
            data: {
                title: '哈哈哈',
                author: '李四'
            }
        }).then(response => {
            console.log(response);
        });
    };

    // delete请求删除
    btns[3].onclick = () => {
        axios({
            method: 'delete',
            url: 'http://localhost:3000/posts/3'
        }).then(response => {
            console.log(response);
        });
    };
</script>
</body>
```

## axios其他方式发送请求（axios.get...）

* axios.request(config: {})
* axios.get(url, config: {})
* axios.post(url, {data, config: {}})
* axios.put(url, {data, config: {}})
* axios.delete(url, config: {})

- 练习与上类似

```html

<body>
<script>
    const btns = document.querySelectorAll('button');

    // 发送get请求
    btns[0].onclick = () => {
        axios.request({
            method: 'GET',
            url: 'http://localhost:3000/comments'
        }).then(response => console.log(response));
    };

    // 发送post请求
    btns[1].onclick = () => {
        axios.post('http://localhost:3000/comments', {
            postId: 1,
            body: '评论1'
        }).then(response => console.log(response));
    };
</script>
</body>
```

## axios的配置对象

* baseURL：通用baseUrl
* url：地址
* method：'get'
* transformRequest
* transformResponse
* headers：请求头信息（一般验证）
* params：设置url参数
* data： 请求体设置（对象形式，字符串形式）
* timeout：超时时间设置
* responseType：响应体格式设置（默认json）

## axios的默认配置

- 设置默认请求类型
    - ```axios.defaults.method = 'GET';```
- 设置默认通用baseUrl
    - ```axios.defaults.baseURL = 'http://localhost:3000';```
- 设置默认请求参数 ```params```
- 设置默认请求超时时间 ```timeout```

## axios创建实例对象发送ajax请求

* const myAxios = axios.create(```config...```);
* 优点：可针对不同的服务器不同配置

```html

<body>
<script>
    // 创建实例对象
    // http://localhost:3000/posts
    const myAxios = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 2000
    });
    // 这里 myAxios 和 axios 的功能几乎一样
    console.log(myAxios);

    // 1
    myAxios({
        method: 'GET',
        url: 'posts'
    }).then(response => {
        console.log(response, 1122);
    });
    // 2
    myAxios.get('posts').then(response => {
        console.log(response, 3344);
    });
</script>
</body>
```

## axios拦截器

* ```请求```拦截器
* ```响应```拦截器
* 多个拦截器执行顺序：请求拦截器后进先执行，响应拦截器先进先执行
* 请求拦截器config(配置)修改，响应拦截器response修改

```html

<body>
<script>
    // 设置 请求 拦截器
    axios.interceptors.request.use(function (config) {
        console.log('请求拦截器1 成功');
        // 修改config参数
        config.params = {a: 100};
        return config;
        // throw '有问题';
    }, function (error) {
        console.log('请求拦截器1 失败');
        return Promise.reject(error);
    });
    axios.interceptors.request.use(function (config) {
        console.log('请求拦截器2 成功');
        config.timeout = 2000;
        return config;
        // throw '有问题';
    }, function (error) {
        console.log('请求拦截器2 失败');
        return Promise.reject(error);
    });

    // 设置 响应 拦截器
    axios.interceptors.response.use(function (response) {
        console.log('响应拦截器1 成功');
        // return response;
        return response.data;
    }, function (error) {
        console.log('响应拦截器1 失败');
        return Promise.reject(error);
    });
    axios.interceptors.response.use(function (response) {
        console.log('响应拦截器2 成功');
        return response;
    }, function (error) {
        console.log('响应拦截器2 失败');
        return Promise.reject(error);
    });

    // Promise

    axios({
        method: 'GET',
        url: 'http://localhost:3000/posts'
    }).then(response => {
        console.log(response, 1122);
    }).catch(err => {
        console.log(err, 3344);
    });
</script>
</body>
```

## axios取消请求

* 服务延迟响应：json-server --watch db.json -d 2000
* 参照axios中的 ```CancelToken```
  [CancelToken](https://github.com/axios/axios#canceltoken-deprecated)

```html

<body>
<button>发送请求</button>
<button>取消请求</button>
<script>
    const btns = document.getElementsByTagName('button');
    // 2、声明全局变量
    let cancel = null;

    btns[0].onclick = () => {
        // 如果上一次请求未完成
        if (cancel != null) {
            cancel();
        }

        axios({
            method: 'GET',
            url: 'http://localhost:3000/posts',
            // 1、添加配置对象的属性
            cancelToken: new axios.CancelToken(function (c) {
                // 3、赋值
                cancel = c;
            })
        }).then(response => {
            console.log(response);
            // 请求成功后置为null
            cancel = null;
        });
    }

    btns[1].onclick = () => {
        cancel();
    }
</script>
</body>
```

## axios源码解析
```
/dist                       打包输出路径
/lib                        项目源码目录
  /adapters                 定义请求适配器 xhr、http
    /http.js                实现http适配器
    /xhr.js                 实现xhr适配器
  /cancel                   定义取消功能
  /core                     核心功能
    /Axios.js               axios的核心主类
    /dispatchRequest.js     发送请求的函数，决定调xhr和http
    /InterceptorManager.js  拦截器的管理器
  /axios.js                 axios的入口文件
```

## 查看axios创建过程   
```
查看axios创建过程  F12查看源码ctrl+p
axios.js文件  38断点  下一步->创建实例
下一步-> Axios.js  挂载配置属性方法
```

```html
<head>
  <!--引用包文件-->
  <script src="./node_modules/axios/dist/mine-axios.js"></script>
</head>
<body>
<script>
  console.log(axios);
</script>
</body>
```

## 模拟axios创建过程
就是创建函数（函数本身可以传配置），往函数身上挂属性的过程

```html
<body>
<script>
    // 构造函数
    function Axios(config) {
        // 默认属性
        this.defaults = config;
        this.interceptors = {
            request: {},
            response: {}
        }
    }

    Axios.prototype.request = function (config) {
        console.log('发送请求，类型为：' + config.method);
    }
    Axios.prototype.get = function () {
        this.request({method: 'GET'});
    }
    Axios.prototype.post = function () {
        this.request({method: 'POST'});
    }

    // 声明函数
    function createInstance(defaultConfig) {
        let context = new Axios(defaultConfig);
        context.request({method: 'get'});  // // 实例化的context对象

        let instance = Axios.prototype.request.bind(context);
        instance({method: 'get'});  // instance函数

        // 往 instance函数 上添加属性 request和defaults等
        Object.keys(Axios.prototype).forEach(key => {
            // console.log(key, Axios.prototype[key]);
            instance[key] = Axios.prototype[key].bind(context);
        });
        Object.keys(context).forEach(key => {
            // console.log(key, context[key]);
            instance[key] = context[key];
        });
        return instance;
    }

    let axios = createInstance();
    axios({method: 'GET'});
    axios.request({method: 'GET'});
    axios.post();
</script>
</body>
```

## 查看axios发送请求的过程
```
查看axios发送请求的过程 F12查看源码ctrl+p
Axios.js文件  36行断点
传入判断  config合并  请求方法设定
返回一个成功的promise，chain里的dispatchRequest是返回值
下一步dispatchRequest.js文件  请求信息的设置
调用xhrAdapter适配器，发送xhr（XMLHttpRequest）ajax请求
```
* 调request --> chain里的dispatchRequest --> xhr（XMLHttpRequest）ajax请求

## 模拟axios发送请求过程
```html
<body>
<script>
  // 1、声明构造函数
  function Axios(config) {
    this.config = config;
  }

  Axios.prototype.request = function (config) {
    // 发送请求
    // config合并处理其它操作
    // 创建promise对象
    let promise = Promise.resolve(config);
    // 声明一个数组
    let chains = [dispatchRequest, undefined];  // undefined占位
    // 循环处理
    let result = promise.then(chains[0], chains[1]);
    return result;
  }

  // 2、dispatchRequest函数
  function dispatchRequest(config) {
    // 调用适配器发送请求
    return xhrAdapter(config).then(response => {
      console.log(response);
      // 对响应的结果做处理
      return response;
    }, err => {
      console.log(err);
      throw err;
    });
  }

  // 3、adapter适配器
  function xhrAdapter(config) {
    console.log('adapter');
    return new Promise((resolve, reject) => {
      // 发送ajax请求
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json'
      xhr.open(config.method, config.url);
      xhr.send();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve({
              config: config,
              data: xhr.response,
              headers: xhr.getAllResponseHeaders(),
              request: xhr,
              status: xhr.status,
              statusText: xhr.statusText
            });
          } else {
            reject(new Error('失败'));
          }
        }
      }
    });
  }

  // 4、创建axios函数
  let axios = Axios.prototype.request.bind(null);
  axios({
    method: 'GET',
    url: 'http://localhost:3000/posts'
  }).then(response => {
    console.log(response, 1122);
  });
</script>
</body>
```