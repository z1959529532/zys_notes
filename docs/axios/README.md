---
title: axios
---

## 前置知识

* 会Ajax
* 会Promise

- 使用 ```json-server``` 快速搭建Http服务
    - npm install -g json-server
    - 创建 ```db.json``` 文件存放数据
    - 启动服务 ```json-server --watch db.json```
    - ```json-server --watch db.json -d 2000```
    - 操作参考github

## axios的基本使用

* 可在浏览器端发送Ajax请求
* 在node.js中发送Http请求
* 支持Promise

- 安装   
  npm install axios   
  yarn add axios   
  cdn引入

- 基本使用练习（github参考：axios、json-server）

```html

<body>
<button>发送 GET 请求</button>
<button>发送 POST 请求</button>
<button>发送 PUT 请求</button>
<button>发送 DELETE 请求</button>
<script>
    const btns = document.getElementsByTagName('button');

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

## axios其他方式发送请求（axios.get等）

* axios.request(config: {})
* axios.get(url, config: {})
* axios.post(url, {data, config: {}})
* axios.put(url, {data, config: {}})
* axios.delete(url, config: {})

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

## 创建axios实例对象（配置默认配置）发送ajax请求

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
  /adapters                 发送请求适配器 xhr或http
    /http.js                实现http适配器
    /xhr.js                 实现xhr适配器
  /cancel                   定义取消功能
  /core                     核心功能
    /Axios.js               axios的核心主类
    /dispatchRequest.js     决定发送请求的函数，决定调xhr和http
    /InterceptorManager.js  拦截器的管理器
  /axios.js                 axios的入口文件
```

## 模拟axios创建过程
```
Axios函数（Axios.js核心主类）中默认属性defaults、interceptors，原型挂request方法等
createInstance函数（axios.js入口文件）中
给instance绑定request方法和挂载属性（.defaults、.get等）的过程
let axios = createInstance();
```
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

## 模拟axios发送请求过程
```
Axios.js核心主类中，原型request方法里进行传入判断、config合并、请求方法的设定
返回一个成功的promise
    let promise = Promise.resolve(config);
    let chains = [dispatchRequest, undefined];
    return promise.then(chain[0]等于dispatchRequest，chain[1]);
dispatchRequest函数（决定发送请求函数xhr和http）返回adapter中请求的结果
adapter（发送请求）返回promise对象，promise里发送请求
```
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

## 模拟axios拦截器原理
* 通过拦截器管理器InterceptorManager保存回调
* 在request处调用，整合，存在数组中
* 通过promise链条方式执行回调
```html

<body>
<script>
    // 构造函数
    function Axios(config) {
        this.defaults = config;
        this.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager()
        }
    }

    Axios.prototype.request = function (config) {
        // 难点与重点
        let promise = Promise.resolve(config);
        const chains = [dispatchRequest, undefined];
        // 处理拦截器
        // 请求拦截器放在前面,响应拦截器放在后面
        this.interceptors.request.handlers.forEach(val => {
            chains.unshift(val.fulfilled, val.rejected);
        })
        this.interceptors.response.handlers.forEach(val => {
            chains.push(val.fulfilled, val.rejected);
        })

        while (chains.length > 0) {
            promise = promise.then(chains.shift(), chains.shift())
        }
        return promise;
    }

    // 发送请求
    function dispatchRequest() {
        return new Promise((resolve, reject) => {
            resolve({
                status: 200,
                statusText: 'OK'
            })
        })
    }

    // 拦截器管理器
    function InterceptorManager() {
        this.handlers = [];
    }

    InterceptorManager.prototype.use = function (fulfilled, rejected) {
        this.handlers.push({
            fulfilled,
            rejected
        })
    }
    // 创建axios函数
    let context = new Axios({});
    let axios = Axios.prototype.request.bind(context);
    Object.keys(context).forEach(key => {
        axios[key] = context[key];
    });


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

    console.dir(axios);

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

## 模拟axios取消请求原理
```
CancelToken函数（CancelToken.js）中原型挂一个promise
将这个promise成功状态赋给一个变量暴露给外部
当外部执行改变成功状态时，就会执行发送请求处的
if (config.cancelToken) {
    config.cancelToken.promise.then(value => {
        xhr.abort();
    })
}
```
```html
<body>
<button>发送请求</button>
<button>取消请求</button>
<script>
    // 构造函数
    function Axios(config) {
        this.defaults = config;
    }
    Axios.prototype.request = function (config) {
        return dispatchRequest(config);
    }
    function dispatchRequest(config) {
        return xhrAdapter(config);
    }
    function xhrAdapter(config) {
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
            // 关于取消请求的处理
            if (config.cancelToken) {
                config.cancelToken.promise.then(value => {
                    xhr.abort();
                })
            }
        });
    }
    // cancelToken构造函数
    function CancelToken(executer) {
        let resolvePromise;
        this.promise = new Promise((resolve) => {
            resolvePromise = resolve;
        })
        // 调用executer函数
        executer(function () {
            resolvePromise();
        })
    }

    // 创建axios函数
    let context = new Axios({});
    let axios = Axios.prototype.request.bind(context);

    const btns = document.getElementsByTagName('button');
    let cancel = null;
    btns[0].onclick = () => {
        // 如果上一次请求未完成
        if (cancel != null) {
            cancel();
        }

        // 创建cancelToken的值
        const cancelToken = new CancelToken(function (c) {
            cancel = c;
        })
        axios({
            method: 'GET',
            url: 'http://localhost:3000/posts',
            cancelToken: cancelToken
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