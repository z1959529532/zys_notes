---
title: vue2
---

## vue
是一个轻量型渐进式框架，可作为应用的一部分嵌入其中，容易迅速开发一些中小型项目

#### vue中的MVVM
* Model：数据层
* View：视图层，dom展示
* VueModel：视图模型层，一方面实现数据绑定（Data Binding），另一方面实现Dom监听（Dom Listener）

#### 创建Vue传入的options

* el：决定挂在哪一个dom
* data：数据
* methods：方法

#### 生命周期

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

## computed计算属性
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

## v-on事件监听
- 简写：```v-on:click ==> @click```
- 参数问题：
  - 调用方法无参数，写不写括号都行 ```@click="btnClick"```
  - 调用方法有一个参数，定义事件不写参数，会将 ```event事件对象``` 传入
  - 调用方法既需要event对象又要其它参数，```@click="btnClick($event, '123')```
- v-on修饰符
  - - 事件修饰符：```.stop``` ```.prevent``` ```.once``` ```.native```
  - 鼠标：```.left``` ```.right``` ```.middle```
  - 按键：```@keyup.enter```

## v-if条件渲染
与js中if、else、else if类似
```vue
<h2 v-if="score>=90">优秀</h2>
<h2 v-else-if="score>=80">良好</h2>
<h2 v-else-if="score>=60">及格</h2>
<h2 v-else>不及格</h2>
```
* v-show：同样也是控制元素显隐   
与v-if不同的是条件为false时，元素的display属性设置为none，元素还存在dom中

## v-for遍历数组
类似js中的for循环
```vue
<!--遍历数组-->
<li v-for="(item, index) in cars" key="item">{{index+1}}、{{item}}</li>
<!--遍历对象-->
<li v-for="(item, key, index) in userInfo" key="item">{{index +'-'+ key +'-'+ item}}</li>
```
* v-for中的key：   
与dom的diff算法有关，主要是为了更高效的更新虚拟dom，数据和key相同时dom不用更新

* 检测数组更新   
```.push``` ```.pop``` ```.shift``` ```.unshift``` ```.splice``` ```.sort``` ```.reverse```
```js
/* 1、末尾添加 */
this.myArr.push('aaa', 'bbb', 'ccc');
/* 2、删除最后一个 */
this.myArr.pop();
/* 3、删除第一个 */
this.myArr.shift();
/* 4、最前面添加 */
this.myArr.unshift('aaa', 'bbb', 'ccc');
/* 5、splice：删除/插入/替换 */
this.myArr.splice(2);  // 删除留前几位
this.myArr.splice(0, 2);  // 删除从0的两位
this.myArr.splice(2, 0, 'aaa', 'bbb', 'ccc');  // 从第二位，插入
this.myArr.splice(0, 2, 'a', 'b');  // 从第0位替换两位
/* 6、sort */
this.myArr.sort();
/* 7、reverse：倒置 */
this.myArr.reverse();
```
* 注意：通过下标改变数组中的元素，dom不会更新

## v-model双向绑定
实现表单元素和数据的双向绑定
```vue
<input type="text" v-model="message">
<h2>{{message}}</h2>

<!--原理-->
<input type="text" :value="message" @input="message = $event.target.value">
<h2>{{message}}</h2>
```

* 修饰符
  * .lazy：可以让数据在失焦或回车后才会更新   
  ```<input type="text" v-model.lazy="message">```
  * .number：输入框正常会被当作字符串处理，让输入内容转成数字类型   
  ```<input type="number" v-model.number="age">```
  * .trim：去掉输入内容首尾空格   
  ```<input type="text" v-model.trim="name">```

## 组件化开发
组件化思想：尽可能的将页面拆分成一个个小的，可复用的组件。这样代码更方便维护和管理，扩展性更强

### 注册组件
- 注册组件的三个步骤
  - 创建组件构造器：```Vue.extend({template: ``});``` 
  - 注册组件：```Vue.component('my-cpn', cpn);``` ```Vue.component('my-cpn', {template: ``})```
  - 使用组件：```<my-cpn></my-cpn>```
```vue
<div id="app">
  <!-- 3、使用组件 -->
  <my-cpn></my-cpn>
</div>
<script>
/* 1、创建组件构造器 */
const cpn = Vue.extend({
  template: `<div>123</div>`
});
/* 2、注册全局组件 */
Vue.component('my-cpn', cpn);

const app = new Vue({
  el: '#app',
  data: {},
  // 2、注册局部组件
  components: {
    'my-cpn': cpn,
    // 语法糖
    'my-cpn': {
      template: `<div>123</div>`
    },
    // 模板分离写法
    template: '#cpn'
  }
});
</script>
<!--模板分离写法-->
<template id="cpn">
  <div>123</div>
</template>
```

### 组件的数据存放
* 组件data为什么是一个函数：   
因为函数return的都是新地址的data，这样组件间数据不会相互影响，防止数据污染
```vue
<script>
const app = new Vue({
  el: '#app',
  data: {},
  components: {
    'my-cpn': cpn
  }
});
const cpn = Vue.extend({
  template: `<div>123</div>`,
  data() {
    return {
      title: 'abc'
    }
  },
  // data: {  // 不能是一个对象
  //   title: 'abc'
  // },
});
</script>
```

### 父子组件
```vue
<script>
const app = new Vue({
  el: '#app',
  data: {},
  components: {
    'app-parent': parent
  }
});
const parent = Vue.extend({
  template: `
    <div style="border: 1px solid black;padding: 10px">
    <h3>我是组件一</h3>
    <app-son></app-son>
    </div>
  `,
  data() {return {}},
  components: {
    'app-son': son
  }
});
const son = Vue.extend({
  template: `
    <div style="border: 1px solid blue">
      <h3>我是组件二</h3>
    </div>
  `
});
</script>
```

### 父子组件通信
- 父传子通过props   
  父组件标签上 ```:name="name"```，子组件props接收```props: {a: {type, default, required}}```
```ts
props: ['myTitle', 'sonMovies']
props: {
  myTitle: {
    type: String,
    default: 'aaa',
    required: true
  },
  sonMovies: Array
}
```
- 子传父通过$emit   
  子组件js代码 ```this.$emit('son-click', data);```，父组件定义接收事件 ```@son-click="sonClick"```
- 父访问子   
  $refs ```this.$refs.son``` 和$children ```this.$children```
- 子访问父   
  $parent ```this.$parent``` 多层的话 ```this.$root```
- ```provide```/```reject```   
- ```eventBus```
### 父子组件双向绑定
```ts
/**************** 方法一 .sync *****************/
// 父组件
:abc.sync="name"
// 子组件
// ts
@Component({
  watch: {
    sonName(newValue, oldValue) {
      this.$emit('update:abc', newValue);
    }
  }
})
@Prop(String) readonly abc!: string;
mounted() { this.sonName = this.abc; }
// js
props: { abc: String }
watch: {
  sonName(newValue, oldValue) {
    this.$emit('update:abc', newValue);
  }
}
mounted() { this.sonName = this.abc;}

/**************** 方法二 v-model *****************/
// 父组件
v-model="name"
// 子组件
@Model('parentNameChange', { type: String }) readonly name!: string;
watch: {
  sonName(newValue, oldValue) {
    this.$emit('parentNameChange', newValue);
  }
}
mounted() { this.sonName = this.abc }
// js
props: { abc: String }
model: { prop: 'name', event: 'parentNameChange' }
watch: {
  sonName(newValue, oldValue) {
    this.$emit('changeParentName', newValue);
  }
}
mounted() { this.sonName = this.abc }
```

### slot插槽
为了让组件更有扩展性，将共性抽取到组件中，将不同暴露为插槽

* 基本使用
```vue
<!--父组件-->
<my-son></my-son>
<my-son><span>替换内容</span></my-son>
<!--子组件-->
<h3>我是子组件</h3>
<slot>123</slot>
```

* 具名插槽：当子组件的功能复杂时，子组件的插槽并非是一个   
这时要给slot元素加一个name属性
```vue
<!--父组件，替换名字匹配的插槽-->
<my-son><button slot="center">按钮</button></my-son>
<!--子组件-->
<slot name="left"><button>左</button></slot>
<slot name="center"><button>中间</button></slot>
<slot name="right"><button>右</button></slot>
```

* 编译作用域：就是说父组件模板的东西会在父级作用域编译，子组件也同样
* 作用域插槽
```vue
<!--父组件-->
<son>
  <!-- 获取子组件中的PLanguages -->
  <template slot-scope="slot">
    <span>{{slot.data.join('、')}}</span>
  </template>
</son>

<!--子组件-->
<slot :data="PLanguages">
  <ul>
    <li v-for="item in PLanguages">{{item}}</li>
  </ul>
</slot>
```

## 模块化开发
* 原始js多文件存在的问题：变量冲突，和文件导入的顺序也有关系
```js
<script src="aaa.js"></script>
<script src="bbb.js"></script>
<script src="mmm.js"></script>

// 文件1
var flag = true
// 文件2
var flag = false
// 文件3
if (flag) {
  console.log('我是文件3');
}
```
* 匿名函数（函数闭包）解决
```js
(function () {
  var flag = false
})()
```
* CommonJs导出   
需要node支撑解析
```js
// 文件1
var flag = true
module.exports = {
  flag
}
// 文件2
var aaa = require('./aaa.js')
if(aaa.flag) {
  console.log('hello');
}
```
* Es5模块导出
```js
// 文件1
var moduleA = (function () {
  var flag = true
  // Es5 用一个导出的对象
  var obj = {}
  obj.flag = flag;
  return obj
})()
// 文件2
if (moduleA.flag) {
  console.log('hello');
}
```

### ES6模块导出导入
* export
  * 定义后一起{}导出
  * 直接导出
* axport default（默认导出）：在同一模块中默认导出只能有一个   
让导入者自己来命名 ```import abc from "./aaa.js"```

```js
// 定义后导出
var flag = true
function sum (num1, num2) {
  return num1 + num2;
}
export {flag, sum}
// 直接导出
export var flag = true
export function sum (num1, num2) {
  return num1 + num2;
}
```
```js
import {flag, sum} from "./aaa.js";
if (flag) {
  console.log(sum(20, 30));
}
```

## vue-router路由
是vue.js官方的路由插件，它和vue.js是深度集成的

- hash模式
  - 地址栏上带有```#```的来指示hash值
  - 通过 ```location.hash``` 来改变href，页面不发生刷新
- history模式（html5）
  - ```history.pushState({}, '', '/foo')```，不刷新，有历史记录
  - ```history.replaceState({}, '', '/foo')```，无历史记录
  - ```history.go(1)```，相当于界面的前进后退

- 安装
  - npm install vue-router --save
- 使用
src/router/index.js
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'

// 使用插件
Vue.use(VueRouter)
// 定义路由
const routes = [];
// 创建路由实例
const router = new VueRouter({
  routes,
  // mode: 'history'  // html5的history模式
})
// 导出
export default router
```

* router-link
```
是vue-router的内置组件，它会被渲染成<a>标签
<router-link :to="'/user'" tag="button" replace>用户</router-link>
tag：决定渲染成什么元素  replace：不会留下history记录  
active-class：路由匹配默认class，修改实在路由实例中 linkActiveClass: 'active'
```
* router-view   
```<router-view></router-view>```子路由显示内容，动态渲染不同组件

### 默认路由
```js
const routes = [
  {
    path: '/',
    name: '',
    redirect: '/home'  // 重定向
  }
];
```
### 懒加载
把所有页面导入js文件会非常大，另外性能浪费，要达到按需加载，并且打包后的分成多个   
ES6的写法
```js
const routes = [
  {
    path: '/home',
    name: '',
    // component: Home
    component: () => import('../components/Home')
  }
];
```
### 嵌套路由
也就是子路由，home组件内用```<router-view></router-view>```显示
```js
const routes = [
  {
    path: '/home',
    name: '',
    component: () => import('../components/Home'),
    children: []
  }
];
```

### 跳转、传参与接参
- 跳转
  - router-link方式
  - js代码：```this.$router.push('/home/son')```、```this.$router.replace('/home/son')```（无记录）
- 传参与接参
  - 标签传字符串：```<router-link :to="'/user/123'">```对应路由```path: '/user/:userId',```
  - 标签传对象：```<router-link :to="{path:'/user/123', query:{name: '李四', age: '22'}}">```
  - js代码传参：```this.$router.push({path:'/user/123', query:{name: '李四', age: '22'}})```
  - js代码接收参数：```this.$route.params```
- $router和$route区别
  - $router为VueRouter实例，通过它导航不同的url
  - $route可获取跳转对象中的参数信息

### 导航守卫
* 全局前置守卫 ```router.beforeEach((to, form, next) => {next()}```   
可以配合meta用来修改网页的标题   
* 全局后置守卫 ```router.afterEach((to, form, next) => {})```，不需要主动调用next()
```js
const routes = [
  {
    path: '/home',
    name: '',
    component: () => import('../components/Home'),
    meta: {title: '首页'}
  }
];
router.beforeEach((to, form, next) => {
  window.document.title = to.meta.title;
  next()
})
```
* 路由守卫 ```beforeEnter: (to, from, next) => {}```
* 组件守卫 ```beforeRouteEnter(to, from, next) {}```，```beforeRouteLeave(to, from, next) {}```

### keep-alive
是Vue的一个内置组件，可以使被包含的组件保留状态，避免重新渲染（不走destoryed）
* include：对应组件name，匹配的组件缓存
* exclude：匹配的组件不缓存 ```<keep-alive exclude="About">```
* activated() {}：钩子函数只有使用了keep-alive，组件活跃时调用
* deactivated() {}：钩子函数只有使用了keep-alive

## Vuex状态管理
是专为vue.js应用开发的状态管理模式，集中式存储管理   
类似vue的prototype，可以在多个组件使用，但它不是响应式的
* 安装：```npm install vuex --save```

- Devtools：跟踪，浏览器提供的插件

### 基本使用
src/store/index.js
```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  // 共享状态
  state: { count: 100 },
  getters: {},
  // 方法
  mutations: {},
  actions: {},
  modules: {}
});
export default store
```
在main.js中导入使用

### 核心概念
- state共享状态：   
```state: { count: 100 }```，用```this.$store.state.count```访问
- getters：获取将store中一些state变换后的数据，类似计算属性，但计算属性多个页面用的话得写多个   
```getters: { countSquare(state) {return state.count * state.count;} }```
- mutations状态更新：对store状态更新的方式就是提交mutation   
store中定义```mutations: { updateCount(state, payload) { state.count = payload; } }```   
js代码中提交```this.$store.commit('updateCount', 10);```
- actions：类似mutation，但异步操作要放在action中   
```js
// store中定义，使用context也用通过mutation提交
actions: {
  updateCountAction(context, payload) {
    setTimeout(() => {context.commit('updateCount', payload);}, 1000);
  }
}
// js代码使用dispatch分发
this.$store.dispatch('updateCountAction', 1000)
```
- modules：将状态管理分成模块   
```this.$store.state.moduleA.name```   
```this.$store.getters.fullName```   
```this.$store.commit('updateName', 'James');```   
```this.$store.dispatch('updateNameAction', 'James');```   
```js
modules: {
    moduleA:{ 
        state: { name: 'Kobe' }
        getters: {
          fullName(state) {
            return state.name + ' - Bryant';
          }
        }
        mutations: {
          updateName(state, payload) {
            state.name = payload;
          }
        }
        actions: {
          updateNameAction(context, payload) {
          setTimeout(() => {
            context.commit('updateName', payload);
          }, 1000);
        }
    }
}
```




