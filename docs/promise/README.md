---
title: Promise
---

## prmise
解决回调地狱的问题，在指定回调和错误处理上更灵活
- 介绍与基本使用
- API
- Promise相关问题
- 自定义封装
- async与await

## Promise是什么
- 抽象表达
  - 是异步编程心得一种解决方案（ES6规范，旧的使用回调函数）
- 具体表达
  - 从无法上说，Promise是一个构造函数
  - 从功能上说，Promise对象用来封装一个异步操作并可以获取其成功/失败的结果

## 异步编程
- fs文件操作（基于node）
- ajax
- 定时器
- 回调函数

## 为什么要用Promise
指定回调函数的方式灵活（可以在异步任务结束后指定/多个）   
支持链式调用，解决回调地狱


## 初体验（4个异步操作例子）
定时器
```html
<body>
<h3></h3>
<button>点击抽奖</button>
<script>
    function rand(m, n) {
        return Math.ceil(Math.random() * (n - m + 1)) + m - 1;
    }

    const btn = document.getElementsByTagName('button')[0];
    btn.onclick = () => {
        // 定时器
        setTimeout(() => {
            let result = rand(1, 100);
            if (result <= 50) {
                alert('恭喜，抽中洗衣液一桶！');
            } else {
                alert('再接再厉！');
            }
        }, 500);

        // 用Promise封装异步操作
        const p = new Promise((resolve, reject) => {
            setTimeout(() => {
                let result = rand(1, 100);
                if (result <= 50) {
                    resolve(`恭喜，抽中洗衣液一桶！中奖号为${result}`);
                } else {
                    reject('再接再厉！');
                }
            }, 500);
        });
        p.then(data => {
            alert(data);
        }, error => {
            alert(error);
        })
    };
</script>
</body>
```

fs文件操作
```js
const fs = require('fs');

// 异步操作
fs.readFile('./resource/file.txt', (err, data) => {
    if (err) throw err;
    console.log(data.toString());
});

// 1、使用Promise封装
const p = new Promise((resolve, reject) => {
    fs.readFile('./resource/file.txt', (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data.toString());
        }
    });
});
p.then(data => {
    console.log(data);
}, err => {
    console.log(err);
});

/**
 * 2、封装一个函数，返回Promise对象
 * @param path 文件地址
 * @return Promise对象
 */
function toReadFile(path) {
    return new Promise((resolve, reject) => {
        // ...读文件操作
    });
}
toReadFile('./resource/file1.txt').then(data => {
    console.log(data, 1122);
}, err => {
    console.log(err, 1122);
});
```

发送ajax请求
```html
<button>发送请求</button>
<div id="result"></div>
<script>
    const btn = document.getElementsByTagName('button')[0];
    const result = document.getElementById('result');

    btn.addEventListener('click', () => {
        // 异步操作
        // ...发送ajax请求

        // 1、用Promise封装
        const p = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://127.0.0.1:8020/server/get');
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(xhr.response);
                    } else {
                        reject('请求失败');
                    }
                }
            };
        });
        p.then(data => {
            result.innerHTML = data;
        }, err => {
            alert(err);
        });

        /**
         * 2、封装函数
         * @param url 文件地址
         * @return Promise对象
         */
        function sendAjax(url) {
            // ...发送ajax请求
        }

        sendAjax('http://127.0.0.1:8020/server/get').then(data => {
            result.innerHTML = data;
        }, err => {
            alert(err);
        });
    });
</script>
```

util的promise方法，基于node
```js
const fs = require('fs');
// 传入一个以 err, value 风格的函数->readFile，返回promise
let myReadFile = require('util').promisify(fs.readFile);

myReadFile('./resource/file.txt').then(data => {
    console.log(data.toString(), 3344);
});
```

## Promise 的状态
状态改变由 pedding-->fulfill或reject，promise的状态只能改变一次
- pedding：等待状态
- fulfill：满足状态，主动调用resolve()，回调调用.then()
- reject：满足状态，主动调用reject()，回调调用.catch()

## Promise 对象的值
- PromiseValue：对象成功/失败的返回结果

## Promise 的API
- Promise构造函数：Promise(excutor) {}
  - excutor执行器，(resolve, reject) => {}，里面是同步调用立即执行
- then方法：.then(value => {}, reason => {});
- catch方法（语法糖）：p.catch(reason => {});   
   

<strong style="color:#0000ff">Promise函数对象的方法</strong>   
并不是实例对象，作用是为了快速得到一个promise对象

- <span style="color:#0000ff">Promise.resolve()方法</span>
  - 传入 非Promise对象，返回成功的Promise对象，结果值为传入值
  - 传入 Promise对象，``返回Promise对象的状态``为传入Promise的状态，``结果值``为传入Promise的结果值
- <span style="color:#0000ff">Promise.reject()方法</span>
  - 传入 非Promise对象，返回失败的Promise对象，结果值为传入值
  - 传入 Promise对象，返回失败的Promise对象，结果值为传入的Promise对象
- <span style="color:#0000ff">Promise.all()方法</span>，传入参入为Promise的数组
  - 返回一个Promise对象，所有的Promise成功才成功，结果值为三个Promise结果值的数组
- <span style="color:#0000ff">Promise.race()方法</span>，传入参入为Promise的数组
  - 谁先状态改变就返回谁的值

```html
<body>
<script>
    /**
     * Promise.resolve方法
     */
    // 传入 非Promise对象，返回成功Promise对象，结果值为传入值
    const p1 = Promise.resolve('ok1');
    console.log(p1, 1111);
    // 传入 Promise对象，返回Promise对象 的状态为传入Promise的状态，结果值 为传入Promise的结果值
    const p2 = Promise.resolve(new Promise((resolve, reject) => {
        // resolve('ok2');
        reject('err2');
    }));
    console.log(p2, 2222);

    /**
     * Promise.reject方法
     */
    // 传入 非Promise对象，返回失败的Promise对象，结果值为传入值
    const p3 = Promise.reject('ok3');
    console.log(p3, 3333);
    // 传入 Promise对象，返回失败的Promise对象，结果值为传入的Promise对象
    const p4 = Promise.reject(new Promise((resolve, reject) => {
        resolve('ok4');
        // reject('err4');
    }));
    console.log(p4, 4444);

    /**
     * Promise.all方法
     */
    const p5 = new Promise((resolve, reject) => resolve('ok5.1'));
    const p6 = Promise.resolve('ok5.2');
    const p7 = Promise.resolve('ok5.3');
    const p8 = Promise.reject('err5.1');
    const allResult = Promise.all([p5, p6, p7, p8]);
    console.log(allResult, 5555);

    /**
     * Promise.race方法
     */
    const p9 = new Promise((resolve, reject) => {
        setTimeout(() => {resolve('ok6.1')}, 1000);
    });
    const p10 = Promise.resolve('ok6.2');
    const p11 = Promise.resolve('err6.1');
    const raceResult = Promise.race([p9, p10, p11]);
    console.log(raceResult, 6666);

</script>
</body>
```





