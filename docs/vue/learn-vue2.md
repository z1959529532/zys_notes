---
title: vue2
---

## vue

渐进式框架（可以将vue作为应用的一部分嵌入）   
上手容易，容易迅速开发出一些中小型项目

### vue中的MVVM

* Model：数据层
* View：视图层，dom展示
* VueModel：视图模型层，一方面实现数据绑定（Data Binding），另一方面实现Dom监听（Dom Listener）

### 创建Vue传入的options

* el：决定挂在哪一个dom
* data：数据
* methods：方法

### 生命周期

Vue2与Vue3对比

<div style="display: flex">
<div style="width: 40%;border:1px solid black">
<strong>vue2.x的生命周期</strong>   
<img src="https://cn.vuejs.org/images/lifecycle.png" alt="lifecycle_2" style="zoom:33%;width:1200px" />
</div>

<div style="width: 50%;border:1px solid black;margin-left: 10px">
<strong>vue3.0的生命周期</strong>   
<img src="https://v3.cn.vuejs.org/images/lifecycle.svg" alt="lifecycle_2" style="zoom:33%;width:2500px" />
</div>
</div>

## 基础语法

```vue
Mustache语法：{{name}}
指令：
v-once：只渲染一次，不随数据改变
<h2 v-once>{{name}}</h2>
v-html：将string的html文本解析并渲染
<h2 v-html="link"></h2>，link: '<a href="https://www.baidu.com">百度一下</a>'
v-text：作用和Mustache一致，接收一个string类型
<h2 v-text="name"></h2>
v-pre：跳过元素的编译过程，直接显示{{name}}
<h2 v-pre>{{name}}</h2>
v-clock：延迟渲染，vue创建后再移除斗篷
<h2 v-cloak>{{name}}</h2>
```

```vue
v-bind：作用是动态绑定，语法糖 :
<h2>{{name}}</h2>    name: '张三'
动态绑定class：对象语法、数组语法
<h2 :class="{'active': true}"></h2>
<h2 :class="['active', 'line']"></h2>
动态绑定style
<h2 :style="{color: activeColor, fontSize: activeSize+'px'}"></h2>
activeColor: 'yellow'    activeSize: 20
```

## 计算属性
有时要对数据进行一些转化后显示，就用计算属性

* 计算属性与方法对比，它是有缓存的，多次使用只调用一遍（效率高）
```vue

<div id="app">
<h2>{{getSentence()}}</h2>
<h2>{{getSentence()}}</h2>

<h2>{{getAll}}</h2>
<h2>{{getAll}}</h2>
</div>
<script>
const app = new Vue({
    el: '#app',
    data: {
        message1: '你好',
        message2: '张三'
    },
    // 计算属性
    computed: {
        getAll() {
            return this.message1 + ' ' + this.message2;
        }
    },
    methods: {
        getSentence() {
            return this.message1 + ' ' + this.message2;
        }
    }
})
</script>
```

* 计算属性的getter（默认）和setter（不常用）
```vue
<script>
const app = new Vue({
    computed: {
        getName: {
            get() {},
            set(newValue) {}
        }
    }
})
</script>
```

## 事件监听 v-on
- 简写：v-on:click ==> @click
- 参数问题：
  - 调用方法无参数，写不写括号都行 ```@click="btnClick"```
  - 调用方法有一个参数，定义事件不写参数，会将 ```event事件对象``` 传入
  - 调用方法既需要event对象又要其它参数，```@click="btnClick($event, '123')```
- v-on修饰符
  - .stop：```@click.stop``` 调用 ```event.stopPropagation();``` 阻止冒泡
  - .prevent：```@click.prevent``` 调用 ```event.preventDefault()``` 阻止默认行为
  - .once：```@click.once``` 只触发一次回调
  - @keyup.enter
  - @keyup.13

## v-if条件渲染















