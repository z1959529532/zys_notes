---
title: Promise
---

## 1、Prmise
是异步编程新的一种解决方案，支持链式调用解决回调地狱的问题   
在指定回调和错误处理上更灵活

- 介绍与基本使用
- API
- Promise相关问题
- 自定义封装
- async与await

## 2、异步编程
- 定时器
- fs文件操作（基于node）
- ajax
- 回调函数

## 3、初体验（4个异步操作例子）
定时器
```html
<body>
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

## 4、Promise的状态-promiseState
状态改变由 ```pedding```-->```fulfilled```或```rejected```，<span style="color:#0000ff">promise的状态只能改变一次</span>
- pedding：等待状态
- fulfilled：满足状态，主动调用resolve()，回调调用.then()
- rejected：满足状态，主动调用reject()，回调调用.catch()

## 5、Promise对象的值-promiseResult
- PromiseValue：Promise对象成功/失败的返回结果值

## 6、Promise的API
### (1) 构造、then、catch方法
- Promise构造函数：Promise(executor) {}
  - executor执行器，(resolve, reject) => {}，里面是同步调用立即执行
- then方法：.then(value => {}, reason => {});
- catch方法（语法糖）：p.catch(reason => {});   
   

### (2) Promise函数对象的方法
并不是实例对象，为了快速得到一个promise对象

- Promise.resolve()方法
- Promise.reject()方法
- Promise.all()方法
- Promise.race()方法

```html
<body>
<script>
    /**
     * Promise.resolve方法
     */
    // 传入非Promise，返回成功的Promise，结果值是传入值
    const p1 = Promise.resolve(); //undefined
    const p2 = Promise.resolve('ok1');
    // 传入Promise，返回Promise状态为传入Promise的状态，结果值为传入Promise的结果值
    const p3 = Promise.resolve(new Promise((resolve, reject) => {
      // resolve('ok1.2');
      reject('err1.3');
    }));

    /**
     * Promise.reject方法
     */
    // 传入非Promise，返回失败的Promise，结果值是传入值
    const p4 = Promise.reject('ok2.1');
    // 传入Promise，返回失败的Promise对象，结果值为传入Promise的结果值
    const p5 = Promise.reject(new Promise((resolve, reject) => {
      // resolve('ok2.2');
      reject('err2.3');
    }));

    /**
     * Promise.all方法
     */
    // 传入Promise数组，所有Promise成功才成功，结果值是传入Promise结果值的数组
    // 有一个Promise失败就失败，结果值是第一个失败Promise的结果值
    const p6 = new Promise((resolve, reject) => resolve('ok3.1'));
    const p7 = Promise.resolve('ok3.2');
    const p8 = Promise.resolve('ok3.3');
    const p9 = Promise.reject('err3.4');
    const allResult = Promise.all([p6, p7, p8, p9]);

    /**
     * Promise.race方法
     */
    // 传入Promise数组，谁先改变状态就返回谁的值
    const p10 = new Promise((resolve, reject) => {
              setTimeout(() => {resolve('ok641')}, 1000);
            });
    const p11 = Promise.reject('ok4.2');
    const p12 = Promise.resolve('err4.1');
    const raceResult = Promise.race([p10, p11, p12]);

</script>
</body>
```

## 7、Promise 的几个关键问题
### (1) 如何改变Promise的状态
- resolve
- reject
- throw '出问题了'（抛出错误）
```html
<body>
<script>
    let p1 = new Promise((resolve, reject) => {
        // 1、调用resolve，pedding-->fulfill
        resolve('ok');
        // 2、调用reject，pedding-->rejected
        reject('err');
        // 3、抛出错误
        throw '出问题了';
    });
</script>
</body>
```

### (2) Promise能否指定多个回调，都会调用吗？
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

### (3) 改变状态与指定回调他俩的执行顺序问题
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

### (4) then方法的返回结果-Promise对象
- 由.then指定回调的执行结果决定，与Promise.resolve基本一样
  - 无返回
  - 返回非Promise
  - 返回Promise对象
  - 抛出异常throw，返回失败的Promise


### (5) 串联多个任务（链式调用）
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

### (6) 异常穿透
- 就是在链式调用最后指定失败的回调
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

### (7) 中断Promise链
- 只有一种方式，返回一个pedding状态的Promise
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

## 8、async 与 await
基于Promise实现的，好处就是让异步的代码看起来和同步代码一样，代码容易阅读和维护
### async函数
- 返回值为Promise对象
- 函数返回非Promise情况，返回成功的Promise对象，返回值为结果值
- 函数返回Promise情况，状态和结果值和返回Promise的一样
- 抛出异常，返回失败的Promise对象，抛出的值为结果值
```html
<body>
<script>
    async function main() {
        // 1、返回值是非Promise情况，返回成功的Promise对象，返回值为结果值
        // return 123;
        // 2、返回值是Promise情况，状态和结果值和返回的一样
        // return new Promise((resolve, reject) => {
        //     // resolve('ok');
        //     reject('error');
        // });
        // 3、抛出异常，返回失败的Promise对象，抛出的值为结果值
        throw '有问题';
    }

    // async函数返回的结果
    const result = main();
    console.log(result);
</script>
</body>
```

### await表达式
- await右侧的表达式一般为Promise对象，也可以是其他的值
- 如果表达式是Promise对象，await返回的是成功Promise的值
- 如果表达式时其它值，直接将此值作为await的返回值
- 注意：
  - await必须写在async函数中，但async函数中可以没有await
  - 如果await的Promise失败了，就会抛异常，要通过try...catch捕获
```html
<body>
<script>
    async function main() {

        // 1、右侧为Promise情况，返回成功Promise的值
        const result1 = await Promise.resolve('ok');
        console.log(result1);
        // 2、右侧为非Promise情况，直接返回此值
        const result2 = await 20;
        console.log(result2);
        // 3、失败的Promise情况，加try...catch
        try {
            const result3 = await Promise.reject('error');
        } catch (e) {
            console.log(e);
        }
    }

    main();
</script>
</body>
```

### async与await结合（简洁）
```js
// 读取文件内容
const fs = require('fs');
const mineReadFile = require('util').promisify(fs.readFile);

// 回调函数方式
fs.readFile('./resource/1.txt', (err, data1) => {
    if (err) throw err;
    fs.readFile('./resource/2.txt', (err, data2) => {
        if (err) throw err;
        fs.readFile('./resource/3.txt', (err, data3) => {
            if (err) throw err;
            console.log(data1 + data2 + data3);
        });
    });
});

// async与await结合
async function main() {
    try {
        const data1 = await mineReadFile('./resource/1.txt');
        const data2 = await mineReadFile('./resource/2.txt');
        const data3 = await mineReadFile('./resource/3.txt');
        console.log(data1 + data2 + data3, 'async与await结合');
    } catch (e) {
        console.log(e);
    }
}
main();
```

```html
<body>
<button>发送请求</button>
<script>
    function sendAjax(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
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
    }

    const btn = document.getElementsByTagName('button')[0];

    btn.addEventListener('click', async () => {
        const reply = await sendAjax('http://127.0.0.1:8020/server/get');
        console.log(reply);
    });
</script>
</body>
```

---

## 9、自定义Promise
- Promise构造函数中
  - executor()执行器
  - 属性设置 ``promiseState`` 和 ``promiseResult``，注意this指向问题
  - 对应 ``resolve`` 和 ``reject`` 的回调函数 ``修改状态``
  - throw情况（在executor外加try...catch），执行 ``reject``
  - Promise状态只能改变一次的设置，加判断

- then方法中
  - 状态判断 ``fulfilled`` 和 ``rejected``，执行传入回调，返回结果
  
- 代码
  - promise.js创建 ``Promise构造函数`` 和 ``then方法``
  - html中引入文件，new Promise就不是全局的Promise了，而是我们创建的 ``Promise构造函数``
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

    // 针对异步任务时，要判断pedding状态
    if (this.promiseState === 'pedding') {
        // 此时构造函数中状态不确定，要保存回调函数
        // 异步任务，最后还是要执行到上面构造函数
        // this.callback.push({
        //     onResolved: onResolved,
        //     onRejected: onRejected
        // });
        this.callback.push({
            onResolved: onResolved,
            onRejected: onRejected
        });
    }
};
```
- 当Promise里为异步任务
  - 此时状态为 ``pedding`` 状态，而且也没接到状态值
  - 要将then传入的回调保存 ``本地callback变量`` 中
  - 等执行Promise构造函数中 ``改变状态后``，再执行callback对象中 ``保存过then传入的回调``

- 当Promise执行多个回调时
  - then传入的回调，后面会覆盖前面的
  - 所以将Promise构造函数中 ``callback存为数组形式``

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

### 同步任务then方法返回结果的实现
- 回顾``关键问题中``then方法的返回结果
- 下面代码返回 ``undefined``，是因为我们的then方法里并没有return
- 在then方法外层返回新的Promise，对回调结果进行判断 ``给.then返回值``
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

### 异步任务then方法返回结果的实现
- 将 ``then传入的回调`` 存到函数中
- 当Promise状态改变，执行存起来的函数
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
        }
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
- 回顾 ``关键问题中异常穿透`` 在链式调用的最后指定一个 ``catch`` 失败的回调
- 状态失败的话，直接走最后的 ``catch``
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
- 我们要在then方法实现中，刚进的地方加回调参数的判断
- 执行 ``throw reason;`` 返回新的Promise，这样往下.then继续调用失败的回调，直到.catch
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
- 与上面 ``异常穿透`` 类似，加回调参数的判断给返回值
- 这样then方法返回结果是新的Promise，会继续执行.then
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
- 回顾 ``Promise的API`` 中Promise.resolve()方法
- 快速返回一个Promise对象
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

### Promise.reject() 方法的实现
- 回顾 ``Promise的API`` 中Promise.resolve()方法
- 快速返回一个Promise对象
```html
<head>
    <script src="./promise.js"></script>
</head>
<body>
<script>
    // const p = Promise.reject('error');
    const p  = Promise.reject(new Promise((resolve, reject) => {
        resolve('ok');
        // reject('error');
    }));

    console.log(p);
</script>
</body>
```
- 传入 非Promise对象，返回失败的Promise对象，结果值为传入值
- 传入 Promise对象，返回失败的Promise对象，结果值为传入的Promise对象
- 总结：返回一个失败的Promise，结果值为传入值
```js
// 添加 reject方法
Promise.reject = function (value) {
    return new Promise((resolve, reject) => {
        reject(value);
    });
};
```

### Promise.all() 方法的实现
- 回顾 ``Promise的API`` 中Promise.resolve()方法
- 接收Promise对象的一个数组
- 返回一个Promise对象
```html
<head>
    <script src="./promise.js"></script>
</head>
<body>
<script>
    const p1 = new Promise((resolve, reject) => {
        resolve('ok1');
    });
    const p2 = Promise.resolve('ok2');
    const p3 = Promise.resolve('ok3');
    // const p4 = Promise.reject('error');
    
    const result = Promise.all([p1, p2, p3]);
    console.log(result);
</script>
</body>
```
- 所有的Promise成功才成功，结果值为三个Promise结果值的数组
```js
// 添加 all方法
Promise.all = function (promiseArr) {
    return new Promise((resolve, reject) => {
        // 计数
        let count = 0;
        let resultArr = [];
        for (let i = 0; i < promiseArr.length; i++) {
            promiseArr[i].then(data => {
                // 对象状态是成功
                count++;
                // 注意有顺序问题
                resultArr[i] = data;
                // 计数，所有的状态都成功后，调成功，返回成功结果的数组
                if (count === promiseArr.length) {
                    resolve(resultArr);
                }
            }, err => {
                reject(err);
            });
        }
    });
};
```

### Promise.race() 方法的实现
- 回顾 ``Promise的API`` 中Promise.race()方法
- 接收Promise对象的一个数组
- 返回一个Promise对象
```html
<head>
    <script src="./promise.js"></script>
</head>
<body>
<script>
    const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok1')
        }, 1000);
    });
    const p2 = Promise.resolve('ok2');
    const p3 = Promise.resolve('ok3');
    const raceResult = Promise.race([p1, p2, p3]);
    console.log(raceResult);
</script>
</body>
```
- 谁先改变状态就返回谁的值
```js
// 添加 race方法
Promise.race = function (promiseArr) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promiseArr.length; i++) {
            // 谁先改变状态就返回谁的值
            promiseArr[i].then(data => {
                resolve(data);
            }, err => {
                reject(err);
            });
        }
    });
};
```

### 注意点：then方法回调里是异步执行
- 系统的then方法里是异步执行
- 而我们实现的不是，要在执行回调的地方加定时器，让它异步执行
```html
<head>
    <script src="./promise.js"></script>
</head>
<body>
<script>
    const p = new Promise((resolve, reject) => {
        resolve('ok');
        console.log(111);
    });
    p.then(data => {
        console.log(222);
    });
    console.log(333);
    // 输出 111 333 222
</script>
</body>
```
```js
// then方法中执行回调的地方加定时器
if (this.promiseState === 'fulfilled') {
    setTimeout(() => {
        // 调公用方法，传入执行回调
        callback(onResolved);
    });
}
```
