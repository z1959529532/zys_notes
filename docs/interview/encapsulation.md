---
title: 个人封装实现
---

## 拖拽指令实现
* 元素设置绝对定位   
* 鼠标按下，计算得到鼠标点击元素位置```disX = e.pageX - el.offsetLeft;```   
* 鼠标移动，计算得到元素横行纵向距离，判断有没有出可视区，给元素偏移量   
```0```<=```x = e.pageX - disX```<=```document.body.clientWidth - el.offsetWidth```   
* 鼠标松开，完成一次拖拽并将事件清除   
[参考https://juejin.cn/post/7067051410671534116](https://juejin.cn/post/7067051410671534116)

## 虚拟列表
- 容器高度自适应，给每一项高度
  - （1）撑开滚动条可滚动：计算列表总高度，在容器下放个盒子给定高度
  - （2）监听容器滚动条滚动事件：
  - （3）通过滚动条到顶部的高度算起始下标(向上取整)
  - （4）容器高度算显示区结尾下标(向下取整)
  - （5）通过下标得到显示的列表数据
```js
// 可视区定位
get listTop() {
    // return this.top + 'px';  // top一直变化，所以一直触发，列表不会有滚动效果
    return this.startIndex * this.itemHeight + 'px';
}
// 可视区列表数据
updateVisibleData(content: HTMLElement) {
    this.top = content.scrollTop;
    this.startIndex = Math.floor(content.scrollTop / this.itemHeight);
    this.endIndex = this.startIndex + Math.ceil(content.offsetHeight / this.itemHeight);
    this.showItems = CloneUtil.deepClone(this.allItems).slice(this.startIndex, this.endIndex);
}
```

## 一键换肤


## 图片懒加载和预加载
### 懒加载   
对于图片列表，减少同一时间图片的网络请求，提升网页性能，解决思路是初始不给src的值，图片进入可视区后再进行加载   
[参考地址1.https://blog.csdn.net/weixin_54145360/article/details/127789692](https://blog.csdn.net/weixin_54145360/article/details/127789692)   
[参考地址2.https://blog.csdn.net/weixin_49554584/article/details/128736678](https://blog.csdn.net/weixin_49554584/article/details/128736678)   
```ts
// js代码实现 图片设置默认高度让容器产生滚动条
// 监听容器滚动条事件，遍历所有图片元素
// 图片距离浏览器窗口高度getBoundingClientRect() - 容器距浏览器窗口高度 < 容器高度
this.imgContent.addEventListener("scroll", this.lazyLoad);
lazyLoad() {
    if (this.timer) {
        return;
    }
    this.timer = setTimeout(() => {
        const imgs = document.querySelectorAll('#lazy_load_img img');
        for (let i = 0; i < imgs.length; i++) {
            const offsetTop = imgs[i].getBoundingClientRect().top - this.imgContent.offsetTop;
            if (offsetTop < this.imgContent.clientHeight) {
                imgs[i].src = require(`@/assets/${imgs[i].getAttribute('data-src')}`);
            }
        }
        clearTimeout(this.timer);
        this.timer = null;
    }, 200);
}

// 指令实现 浏览器的IntersectionObserver
Vue.directive('lazyLoadImg', {
    inserted(el: HTMLElement, binding: DirectiveBinding) {
        // 有绑定值，不做懒加载处理
        if (binding.value != undefined && !binding.value) return;
        // 通过 data-src 属性获取图片地址
        const imgSrc = el.getAttribute('data-src');
        // 监听元素是否出现在可视区域内
        const observer = new IntersectionObserver(([{isIntersecting}]) => {
            if (isIntersecting) {
                // 加载图片
                (el as any).src = require(`@/assets/${imgSrc}`);
                // 停止监听
                observer.unobserve(el);
            }
        });
        // 开启监听，传入dom
        observer.observe(el);
    }
});
```

### 预加载
大图或者切换图片可能会出现空白情况，本地js代码先将图片资源请求好，提高用户体验
```ts
this.preload().then(res => {}, err => {})

// 图片给地址请求资源，通过onload方法计数
preload() {
    return new Promise((resolve, reject) => {
        let count = 0;
        for (let i = 0; i < this.imgData.length; i++) {
            let image = new Image();
            image.src = require(`@assets/${this.imgData[i]}`);
            image.onload = () => {
                count++;
                if (count == this.imgData.length) {
                    setTimeout(() => { resolve(count) }, 2000);
                }
            }
            image.onerror = (e) => reject(e);
        }
    });
}
```

### 防抖节流
