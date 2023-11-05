---
title: iframe通信
---

作为一个html标签，可嵌入任何的html网页

* 优点：
    - 用起来简单，原封不动嵌入，可以直接调用和修改嵌入页面的内容
    - 解决第三方内容加载缓慢的问题（广告，图标）
* 缺点：
    - 会阻塞主页面onload事件，要在iframe加载完毕后(dom，css，js)才会触发，影响网页加载速度
    - 共享连接池，影响页面并行加载（个解决方案是在优先级更高的资源下载完成后再动态的给iframe的src赋值）
    - 对于小设备展示不全兼容性差

### 通信（非跨域/跨域）

```vue

<iframe id="showChildrenIframe"
        class="showChildrenIframe" :src="iframeUrl" frameborder="0"></iframe>

<script>
/************************************ 父 ************************************/
this.iframeUrl = location.origin + `/#/iframeSon`;
this.$nextTick(() => {
  const iframe = document.getElementById('ifr') as any;
  // iframe.contentWindow.location.reload();
  iframe.onload = () => {
    // 非跨域
    // iframe.contentWindow.document.getElementById('abc');
    // iframe.contentWindow.showGreet('hello 在吗？');
    // 跨域
    iframe.contentWindow.postMessage(
            {data: '在工位吗？过来一下', type: 'zys', parentUrl: location.href},
            this.iframeUrl
            // '*'
    )
  }
})

/************************************ 子 ************************************/
// 非跨域
// window.parent.showReply('好的')
// window.top
// 跨域
window.parent.postMessage(
    {data: '好的', type: 'zys', parentUrl: ''},
    this.message.parentUrl
    // '*'
)

// 跨域接收消息
mounted() {
  window.addEventListener("message", (e) => {
    if (e.data?.type && e.data.type == 'zys') {
    }
  })
}
</script>
```
