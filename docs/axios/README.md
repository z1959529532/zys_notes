---
title: axios
---

## 前置知识
* Ajax
* Promise

- 使用 ```json-server``` 快速搭建Http服务
  - npm install -g json-server
  - 创建 ```db.json``` 文件
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



