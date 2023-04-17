---
title: Websocket
---

HTML5下一种新的协议（基于tcp的协议）   
让服务器端可以主动向客户端发送信息，实现了浏览器与服务器全双工通信

* 使用
```js
const ws = new WebSocket('ws://localhost:8666');
// 成功回调
ws.onopen = function (e) {}
// 关闭回调
ws.onclose = function (e) {}
// 出错回调
ws.onerror = function (e) {}
// 接收消息回调
ws.onmessage = function (e) {}

// 发送消息
ws.send('内容');
// 手动关闭
ws.close();
```

- websocket的状态```readyState```
  - 0 表示正在连接
  - 1 表示连接成功，可以通信
  - 2 表示连接正在关闭
  - 3 表示连接已经关闭，或者打开连接失败

### 不稳定
websocket不稳定可能会断开连接，两种解决方案   
1、设置一个变量，在关闭/出错回调统一去判断是不是手动关闭的，不是就重连
* 优点：易设置请求少（相对心跳检测）
* 缺点：可能会丢失数据，在断开重连过程中恰好在通信
```js
function closeHandle(e) {
    if (close) {
        ws = null;
        // 重连websocket
        this.openWebSocket();
    } else {
        // 手动关闭
    }
}
```
2、心跳检测，间隔固定时间客户端向服务器发消息证明活着，服务器也同样告诉客户端
```js

```

