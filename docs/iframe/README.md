---
title: iframe通信
---

作为一个html标签，可嵌入任何的html网页

* 优点：
    - 原封不动嵌入网页
    - 用起来简单方便，可以直接调用和修改嵌入页面的内容
    - 解决第三方内容加载缓慢的问题（广告，图标）
* 缺点：
    - 会阻塞主页面onload事件，要在iframe加载完毕后(dom，css，js)才会触发，影响网页加载速度
    - 共享连接池，影响页面并行加载（个解决方案是在优先级更高的资源下载完成后再动态的给iframe的src赋值）
    - 对于小设备展示不全兼容性差

### 通信（非跨域/跨域）

```vue

<iframe id="showChildrenIframe"
        class="showChildrenIframe" :src="地址" frameborder="0"></iframe>

<script lang="ts">
export default class Main extends Vue {
    // 父
    sendGreet() {
        const sonFrame: any = document.getElementById('showChildrenIframe');
        sonFrame.onload = () => {
            // 非跨域
            // sonFrame.contentWindow.showGreet('hello 在吗？');
            // 跨域
            sonFrame.contentWindow.postMessage(
                {data: 'hello 在吗？', type: 'zys', parentUrl: location.href},
                location.origin + `/#/iframeTest` // 子页面地址，*为所有
            )
            // 获取子dom
            console.log(sonFrame.contentWindow.document.getElementById('greet'), 1122);
        }
    }

    // 子
    sendReply() {
        // 非跨域
        // parent.window.receiveReply('你好！在');
        // 跨域
        window.parent.postMessage(
            {data: '你好！在', type: 'zys', parentUrl: ''},
            'parentUrl'  // 父页面地址，*为所有
        );
        // 获取父dom
        console.log(window.parent.document.getElementById('reply'), 1122);
    }

    // 跨域接收消息
    mounted() {
        window.addEventListener("message", (e) => {
            if (e.data?.type && e.data.type == 'zys') {
            }
        })
    }
}
</script>
```
