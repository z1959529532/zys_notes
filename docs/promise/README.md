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

## Promise 的状态（promiseState）
状态改变由 pedding-->fulfill或rejected，<span style="color:#0000ff">promise的状态只能改变一次</span>
- pedding：等待状态
- fulfill：满足状态，主动调用resolve()，回调调用.then()
- rejected：满足状态，主动调用reject()，回调调用.catch()

## Promise 对象的值（promiseResult）
- PromiseValue：对象成功/失败的返回结果值

## Promise 的API
- Promise构造函数：Promise(executor) {}
  - executor执行器，(resolve, reject) => {}，里面是同步调用立即执行
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

## Promise 的几个关键问题
- 如何改变Promise的状态
  - resolve
  - reject
  - throw '出问题了'（抛出错误）
```html
<body>
<script>
    let p = new Promise((resolve, reject) => {
        // 1、调用resolve，pedding-->fulfill
        resolve('ok');
        // 2、调用reject，pedding-->rejected
        reject('err');
        // 3、抛出错误
        throw '出问题了';
    });
    console.log(p);
</script>
</body>
```
  
- Promise能否指定多个回调，都会调用吗？
  - 必须是状态改变后，然后才都会执行
```html
<body>
<script>
    let p2 = new Promise((resolve, reject) => {
        resolve('ok');
    });
    // 状态改变执行.then
    p2.then(data => {
        console.log(data, 2222);
    });
    p2.then(data => {
        console.log(data, 3333);
    });
</script>
</body>
```

- 改变状态与指定回调他俩的执行顺序问题
  - 情况1：Promise里是同步任务，这样先执行改变状态
  - 情况2：Promise里是异步任务，先执行回调.then
```html
<body>
<script>
    let p3 = new Promise((resolve, reject) => {
        // 情况1 Promise里是同步任务，这样先执行改变状态
        // resolve('ok');

        // 情况2 Promise里是异步任务，先执行回调.then
        setTimeout(() => {
            resolve('ok');
        }, 1000);
    });
    p3.then(data => {
        console.log(data, 4444);
    });
</script>
</body>
```

- .then方法的返回结果-<span style="color:#0000ff">新的Promise对象</span>
  - 由.then指定回调的执行结果决定
  - .then执行回调中无返回, 相当于``return了undefined``，和返回非Promise对象一样
  - .then执行回调中有返回
    - 抛出错误，.then的结果是失败的Promise（throw '有问题'）
    - 返回非Promise对象，.then的结果是成功的Promise，return的值就是成功的结果
    - 返回Promise对象，.then的结果状态由Promise的状态决定，.then的结果值就是Promise返回的结果值
```html
<body>
<script>
    let p4 = new Promise((resolve, reject) => {
        resolve('ok');
    });
    const result = p4.then(data => {
        // （1）抛出错误，.then的结果是失败的Promise
        // throw '有问题';
        // （2）返回非Promise对象，.then的结果是成功的Promise，return的值就是成功的结果
        // return 520;
        // （3）返回Promise对象，.then的结果状态由Promise的状态决定，.then的结果值就是Promise返回的结果值
        return new Promise((resolve, reject) => {
            resolve('ok1');
            // reject('error1');
        });
    }, err => {
    });
    console.log(result, 5555);
</script>
</body>
```

- 串联多个任务（链式调用）
```html
<body>
<script>
    const p5 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok');
        }, 1000)
    });
    p5.then(data1 => {
        return new Promise((resolve, reject) => {
            resolve('success');
        });
    }).then(data2 => {
        console.log(data2, 6666);  // success
    }).then(data3 => {
        console.log(data3, 7777);  // undefined
    });
</script>
</body>
```

- 异常穿透，就是在链式调用最后指定失败的回调
```html
<body>
<script>
    const p6 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok');
        }, 1000)
    });
    p6.then(data1 => {
    }).then(data2 => {
    }).then(data3 => {
    }).catch(err => {
        console.log('err');
    });
</script>
</body>
```

- 中断Promise链，只有一种方式，返回一个pedding状态的Promise
```html
<body>
<script>
    const p7 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok');
        }, 1000)
    });
    p7.then(data1 => {
        return new Promise((resolve, reject) => {});
    }).then(data2 => {
    }).then(data3 => {
    });
</script>
</body>
```

## 自定义Promise
- Promise构造函数中
  - executor()执行
  - 对应resolve和reject的回调函数，以及throw情况（在executor外加try...catch）
  - 属性设置（promiseState和promiseResult），this指向问题
  - Promise状态只能改变一次的设置

- then方法中
  - 状态判断``fulfilled``和``rejected``，执行回调，返回结果

- 当Promise里为异步任务
  - 此时状态为``pedding``状态，而且也没接到状态值
  - 要将回调保存``本地callback对象中``
  - 等执行Promise构造函数中回调后，再执行callback对象中保存过的回调
  
- 代码
  - promise.js创建``Promise构造函数``和``then方法``
  - html中引入文件，new Promise就不是全局的Promise了，而是创建的``Promise构造函数``
```js
// 构造函数
function Promise(executor) {
    /** 设置所有属性 */
    this.promiseState = 'pedding';
    this.promiseResult = null;
    const _this = this;
    // 异步时保存回调函数用
    // this.callback = {};
    this.callback = [];

    // 对应resolve函数，名字并不需要一样，与executor中对应就行
    function resolve1(value) {
        // Promise状态只能改变一次的判断
        if (_this.promiseState !== 'pedding') return;

        // console.log(this);  // 这里的this指向的是window
        // 1、修改对象状态 promiseState
        _this.promiseState = 'fulfilled';
        // 2、设置对象结果值 promiseResult
        _this.promiseResult = value;

        // 异步时保存回调函数有值，执行保存的回调
        // if (_this.callback.onResolved) {
        //     _this.callback.onResolved(value);
        // }
        _this.callback.forEach(item => {
            if (item.onResolved) {
                item.onResolved(value);
            }
        });
    }

    // 对应reject函数
    function reject1(err) {
        if (_this.promiseState !== 'pedding') return;
        _this.promiseState = 'rejected';
        _this.promiseResult = err;
        // if (_this.callback.onRejected) {
        //     _this.callback.onRejected(err);
        // }
        _this.callback.forEach(item => {
            if (item.onRejected) {
                item.onRejected(err);
            }
        });
    }

    // try...catch对应throw抛出的异常
    try {
        // 执行器函数 是同步调用的
        executor(resolve1, reject1);
    } catch (e) {
        reject1(e);
    }
}

// 添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {
    // 调用回调函数  先对状态进行判断
    if (this.promiseState === 'fulfilled') {
        onResolved(this.promiseResult);
    }
    if (this.promiseState === 'rejected') {
        onRejected(this.promiseResult);
    }

    // 异步任务时，要判断pedding状态
    if (this.promiseState === 'pedding') {
        // 此时构造函数中状态不确定，要保存回调函数
        // 异步任务，最后还是要执行到上面构造函数
        this.callback.push({
            onResolved: onResolved,
            onRejected: onRejected
        });
    }
};
```
- 当Promise执行多个回调时
  - 后面的回调会覆盖前面的
  - 将Promise构造函数中``callback存为数组形式``，再去遍历执行保存过的回调

html中
```html
<head>
    <script src="./promise.js"></script>
</head>
<body>
<script>
    const p = new Promise((resolve, reject) => {
        // resolve('ok');
        // reject('error');
        // throw '有问题';

        // 异步时
        setTimeout(() => {
            // resolve('ok');
            reject('error');
        }, 1000);
    });
    console.log(p);
    p.then(data => {
        console.log(data, 1111);
    }, err => {
        console.warn(err, 1111);
    });

    // Promise指定多个回调，会将前面的覆盖掉
    p.then(data => {
        console.log(data, 2222);
    }, err => {
        console.warn(err, 2222);
    });
</script>
</body>
```

- 同步任务then方法返回结果的实现
  - 回顾``关键问题中``then方法的返回结果
  - 而我们创建的Promise返回undefined，是因为我们的then方法并没有return
  - 在then方法外层返回新的Promise，但状态不会由执行回调的结果决定，对回调结果进行判断给.then返回值
```html
<head>
    <script src="./promise.js"></script>
</head>
<body>
<script>
    const p = new Promise((resolve, reject) => {
        resolve('ok');
        // reject('error');
    });

    const res = p.then(data => {
        // return 'hello';
        return new Promise((resolve, reject) => {
            // resolve('hello success');
            // reject('error');
            // 抛出错误
            throw '有问题';
        });
    }, err => {
    });
    console.log(res);
</script>
</body>
```
then方法实现中  
要返回Promise对象，外层return new Promise
```js
Promise.prototype.then = function (onResolved, onRejected) {
    return new Promise((resolve, reject) => {
        if (this.promiseState === 'fulfilled') {
            const result = onResolved(this.promiseResult);
            // 对结果进行判断，给.then返回值
            try {
                if (result instanceof Promise) {
                    result.then(data => {
                        resolve(data);
                    }, err => {
                        reject(err);
                    });
                } else {  // 非Promise对象
                    resolve(result);
                }
            } catch (e) {
                reject(e);
            }
        }
    });
}
```

- 异步任务then方法返回结果的实现
```html
<head>
    <script src="./promise.js"></script>
</head>
<body>
<script>
    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok');
        }, 500);
    });

    const res = p.then(data => {
        // return 'hello';
        // throw '有问题';
    }, err => {
    });
    console.log(res);
</script>
</body>
```

```js
Promise.prototype.then = function (onResolved, onRejected) {
    return new Promise((resolve, reject) => {
        if (this.promiseState === 'pedding') {
        this.callback.push({
            onResolved: function () {
                // 判断结果，给.then返回值
                try {
                    const result = onResolved(_this.promiseResult);
                    if (result instanceof Promise) {
                        result.then(data => {
                            resolve(data);
                        }, err => {
                            reject(err);
                        });
                    } else {  // 非Promise对象
                        resolve(result);
                    }
                } catch (e) {
                    reject(e);
                }
            }
        })
    });
}
```

### catch方法的实现
- 在自定义Promise加入catch方法的实现
```js
// 添加 catch 方法，直接调then方法，成功回调不传即可
Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};
```

### 异常穿透
- 像（关键问题中异常穿透）在链式调用的最后指定一个``catch``失败的回调
- 状态失败的话，直接走最后的``catch``
```html
<head>
    <script src="./promise.js"></script>
</head>
<body>
<script>
    const p = new Promise((resolve, reject) => {
        reject('error');
    });

    p.then(data => {
        console.log(1111);
    }).then(data => {
        console.log(2222);
    }).then(data => {
        console.log(3333);
    }).catch(err => {
        console.log(err);
    });
</script>
</body>
```
- 这样会报``TypeError: onRejected is not a function``
- 因为上面.then中并没由传入失败的回调
- 我们要在then方法实现中，刚进的地方加入判断
- 执行``throw reason;``，这样往下.then继续调用失败的回调，直到.catch
```js
Promise.prototype.then = function (onResolved, onRejected) {
    // 判断回调参数
    // 异常穿透
    if (typeof onRejected !== 'function') {
        onRejected = reason => {
            throw reason;
        }
    }
}
```

### 值传递
- 另外还存在.then回调都不传的情况
- 与上面``异常穿透``类似，给then方法有返回值
- 这样then方法返回结果是新的Promise，会继续执行.then
```html
<head>
    <script src="./promise.js"></script>
</head>
<body>
<script>
    const p = new Promise((resolve, reject) => {
        resolve('ok');
    });

    p.then()
    .then(data => {
        console.log(111);
    }).then(data => {
        console.log(222);
    }).catch(err => {
        console.log(err);
    });
</script>
</body>
```
- 在then方法实现中，加入回调参数的判断
```js
// 值传递情况
if (typeof onResolved !== 'function') {
    onResolved = value => value;
    // onResolved = value => {
    //     return value;
    // }
}
```

### Promise.resolve() 方法的实现
- ``Promise的API``中Promise.resolve()方法
- 返回一个Promise对象
```html
<head>
    <script src="./promise.js"></script>
</head>
<body>
<script>
    // const p = Promise.resolve('ok');
    const p = Promise.resolve(new Promise((resolve, reject) => {
        // resolve('ok');
        reject('error');
    }));

    console.log(p);
</script>
</body>
```
- promise.js中加入resolve方法的实现
- 对传入值进行判断，Promise和非Promise情况
```js
// 添加 resolve方法
Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            value.then(data => {
                resolve(data);
            }, err => {
                reject(err);
            });
        } else {
            resolve(value);
        }
    });
};
```

