---
title: vue3
---

## 1、vue3带来了什么
### （1）性能的提升
- 打包大小减少41%
- 初次渲染快55%, 更新渲染快133%
- 内存减少54%

### （2）源码的升级
- 使用Proxy代替defineProperty实现响应式
- 重写虚拟DOM的实现和Tree-Shaking

### （3）拥抱TypeScript
- Vue3可以更好的支持TypeScript

### （4）新的特性
1. Composition API（组合API）
   - setup配置
   - ref与reactive
   - watch与watchEffect
   - provide与inject
   
2. 新的内置组件
   - Fragment 
   - Teleport
   - Suspense
   
3. 其他改变
   - 新的生命周期钩子
   - data 选项应始终被声明为一个函数
   - 移除keyCode支持作为 v-on 的修饰符

## 2、创建Vue3.0工程
### （1）使用 vue-cli 创建
[官方文档：https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)
```bash
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
## 安装或者升级你的@vue/cli
npm install -g @vue/cli
## 创建
vue create vue3_test    创建不了问题：npm缓存、重装node、网络
## 启动
cd vue3_test
npm run serve
```

### （2）使用 vite 创建
[官方文档：https://v3.cn.vuejs.org/guide/installation.html#vite](https://v3.cn.vuejs.org/guide/installation.html#vite)   

[vite官网：https://vitejs.cn](https://vitejs.cn)

- 什么是vite？—— 下一代前端开发与构建工具。（不用等打包，现用现分析，动态的引入和代码的分割）
- 优势如下：
  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的热重载（HMR）。
  - 真正的按需编译，不再等待整个应用编译完成。
- 传统构建 与 vite构建对比图

```bash
## 创建工程
npm init vite-app <project-name>
## 进入工程目录
cd <project-name>
## 安装依赖
npm install
## 运行
npm run dev
```

## 3、常用 Composition API(组合式API)
[官方文档: https://v3.cn.vuejs.org/guide/composition-api-introduction.html](https://v3.cn.vuejs.org/guide/composition-api-introduction.html)

### （1）拉开序幕的setup
1. 理解：Vue3.0中一个新的配置项，值为一个函数。
2. <span style="color:#00f">setup是所有Composition API（组合API）“ 表演的舞台 ”</span>。
3. 组件中所用到的：数据、方法等等，均要配置在setup中。
4. setup函数的两种返回值：
   1. 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。<span style="color:#00f">（重点关注！）</span>
   2. 若返回一个渲染函数：则可以自定义渲染内容。<span style="color:#00f">（了解）</span>
5. 注意点：
   1. 尽量不要与Vue2.x配置混用
      - Vue2.x配置（data、methos、computed...）中<span style="color:#00f">可以访问到</span>setup中的属性、方法。
      - 但在Vue3的setup中<span style="color:#00f">不能访问到</span>Vue2.x配置（data、methos、computed...）。
      - <span style="color:#00f">如果有重名</span>, setup优先。
   2. setup不能是一个async函数，因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性。（后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合）
```bash
#示例
<h2>姓名：{{ name }}</h2>
<h2>年龄：{{ age }}</h2>
<button @click="sayHello">弹出提示</button>

#此处只是测试setup，暂时不考虑响应式的问题
setup() {
    #// 数据、方法直接定义
    let name = '张三';
    let age = 24;

    function sayHello() {
        alert(`你好，我是${name}，今年${age}`);
    }

    return {
        name,
        age,
        sayHello
    }

    #// 返回渲染函数，了解
    #// import {h} from 'vue';
    #// return () => h('h1', '张三');
}
```

### （2）ref函数
- 作用: 定义一个<strong style="color:#00f">响应式</strong>的数据
- 语法: <span style="color:#00f">const xxx = ref(value)</span>
  - 创建一个包含响应式数据的<span style="color:#00f">引用对象（reference对象，简称ref对象）</span>。
  - JS中操作数据： <span style="color:#00f">xxx.value （拿到ref中真正传入的值）</span>
  - 模板中读取数据: <span style="color:#00f">不需要.value</span>，直接使用
- 备注：
  - 接收的数据可以是：基本类型、也可以是对象类型。
  - 基本类型的数据：响应式依然是靠<span style="color:#00f"> Object.defineProperty() </span>的```get```与```set```完成的。（数据劫持）
  - 对象类型的数据：内部 <i style="color:#00f;font-weight:bold">“ 求助 ”</i> 了Vue3.0中的一个新函数—— ```reactive```函数。（proxy）
```bash
#示例
<h2>姓名：{{ name }}</h2>
<h2>年龄：{{ age }}</h2>
<h2>工作种类：{{ job.type }}</h2>
<h2>工作薪水：{{ job.salary }}</h2>
<button @click="changeInfo">修改信息</button>

setup() {
    #// let name = '张三';    // 1、不支持响应式
    
    import {ref} from 'vue';    // 2、借助ref函数
    let name = ref('张三');
    let age = ref(24);
    let job = ref({type: '前端工程师', salary: '20k'});
    
    #// 修改信息方法
    function changeInfo() {
        #// name = '李四';
        #// age = 30;
        #// console.log(name);    // 1、数据改了，页面没有更新
    
        name.value = '李四';
        age.value = 30;
        job.value.type = '后端工程师';
        job.value.salary = '30k';
    }

    return {
        name,
        age,
        job,
        changeInfo
    };
}
```

### （3）reactive函数
- 作用: 定义一个<strong style="color:#00f">对象类型</strong>的响应式数据（<strong style="color:#00f">基本类型不要用它，要用```ref```函数</strong>）
- 语法：<span style="color:#00f">```const 代理对象= reactive(源对象)```接收一个对象（或数组）</span>，返回一个代理对象（Proxy的实例对象，简称proxy对象）
- reactive定义的响应式数据是<span style="color:#00f">“深层次的”</span>。
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。
```bash
#示例
<h3 v-show="person?.name">姓名：{{person.name}}</h3>
<h3>工作种类：{{ person.job.type }}</h3>
<h3>工作薪水：{{ person.job.salary }}</h3>
<h3>测试深层次对象：{{ person.job.a.b.c }}</h3>
<h3>测试数组：{{ person.hobby }}</h3>
<button @click="changeInfo">修改信息</button>

setup() {
    #// let job = ref({type: '前端工程师', salary: '20k'});

    #2、reactive函数
    #// let number = reactive(666);   // 基本类型不要用reactive
    #// let job = reactive(
    #//     {type: '前端工程师', salary: '20k', a: {b: {c: 666}}}
    #// );
    #// let hobby = reactive(['打篮球', '跑步', '游泳']);

    #// 3、直接交一整个对象
    let person = reactive({
        name: '张三',
        job: {type: '前端工程师', salary: '20k', a: {b: {c: 666}}},
        hobby: ['打篮球', '跑步', '游泳']
    });

    function changeInfo() {
        #// 2、
        #// job.type = '后端工程师';
        #// job.salary = '30k';
        #// job.a.b.c = 999;
        #// hobby[2] = '打乒乓球';

        #// 3、直接交一整个对象
        person.job.type = '后端工程师';
        person.job.salary = '30k';
        person.job.a.b.c = 999;
        person.hobby[2] = '打乒乓球';
    }

    return {
        // job,
        // hobby,
        person,    #// 3、直接交一整个对象
        changeInfo
    };
}
```

## 4、Vue3.0中的响应式原理
### （1）先说vue2.x的响应式
- 实现原理：
  - 对象类型：通过<span style="color:#00f">Object.defineProperty()</span>对属性的读取、修改进行拦截（<span style="color:#00f">数据劫持</span>）。
  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。
```bash
Object.defineProperty(data, 'count', {
    get () {}, 
    set () {}
})
```

- 存在问题：
  - 新增属性、删除属性, 界面不会更新。  <span style="color:#00f">this.$set()，this.$delete()</span>
  - 直接通过下标修改数组, 界面不会自动更新。
```bash
#例子（对象新增、删除属性，数组下标改值）
<h2 v-show="person.name">{{ person.name }}</h2>
<h2>{{ person.age }}</h2>
<h2 v-show="person.sex">{{ person.sex }}</h2>
<h2>{{ person.hobby }}</h2>

person: {name: '张三', age: 22, hobby: ['打篮球', '跑步']}

import Vue from 'vue'
#添加sex属性
addSex() {
    // this.person.sex = '男';    #打印数据有了，但是页面没有更新
    this.$set(this.person, 'sex', '男');
    Vue.set(this.person, 'sex', '男');    #这种要导入Vue
}

#删除name属性
deleteName() {
    // delete this.person.name;    #打印数据删了，但页面没有更新
    this.$delete(this.person, 'name');
    Vue.delete(this.person, 'name');    #这种要导入Vue
}

#改hobby数组值
updateHobby() {
    // this.person.hobby[1] = '打羽毛球';    #页面没有更新
    this.$set(this.person.hobby, 1, '打羽毛球');
    this.person.hobby.splice(1, 1, '打羽毛球');
}
```

### （2）Vue3.0的响应式
- 实现原理: 
  - <span style="color:#00f">通过Proxy（代理）</span>:  拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等
  - <span style="color:#00f">通过Reflect（反射）</span>:  对源对象的属性进行操作。
  - MDN文档中描述的Proxy与Reflect：
    - Proxy：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
    - Reflect：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
- 不存在vue2里的问题

```bash
#示例代码
<h3 v-show="person?.name">姓名：{{person.name}}</h3>
<h3 v-show="person?.sex">性别：{{person.sex}}</h3>
<button @click="addProperty">添加一个sex属性</button>
<br/>
<button @click="deleteProperty">删除name属性</button>

import {reactive} from 'vue';
setup() {
    let person = reactive({
        name: '张三',
        job: {type: '前端工程师', salary: '20k', a: {b: {c: 666}}},
        hobby: ['打篮球', '跑步', '游泳']
    });

    function addProperty() {
        person.sex = '张三';    #// 页面更新
    }
    function deleteProperty() {
        delete person.name;    #// 页面更新
    }

    return {
        person,
        addProperty,
        deleteProperty
    };
}
```
原理解析：
```html
<script>
    // 源数据
    let person = {
        name: '张三',
        age: 20
    };
    
    // 模拟Vue2实现的响应式
    let p = {};
    Object.defineProperty(p, 'name', {
        configurable: true,
        get() {
            return person.name;
        },
        set(value) {  // 修改name时调用
            console.log('调用了修改name属性');
            person.name = value;
        }
    });
    
    // 模拟Vue3实现的响应式
    // 捕获响应式
    const p = new Proxy(person, {
        // target是传入的源数据  propName是属性
        get(target, propName) {
            return target[propName];
        },
        // 修改或添加属性调用
        set(target, propName, value) {
            console.log(`修改了p身上的${propName}属性`);
            target[propName] = value;
        },
        deleteProperty(target, propName) {
            console.log(`删除了p身上的${propName}属性`);
            return delete target[propName];
        }
    });

    // Reflect使用
    // 先说Object.defineProperty重复操作属性，会报错，封装的话比较麻烦，要用try catch
    Object.defineProperty(obj, 'c', {
        get () {
            return 3;
        }
    });
    Object.defineProperty(obj, 'c', {
        get () {
            return 4;
        }
    });
    // reflect有返回值，相对友好一点
    c1 = Reflect.defineProperty(obj, 'c', {
        get () {
            return 3;
        }
    });
    console.log(c1);
    c2 = Reflect.defineProperty(obj, 'c', {
        get () {
            return 4;
        }
    });
    console.log(c2);
    if (c1) {console.log('哪个操作成功了！')}
    

    // 最后引出了vue的响应式原理
    const p = new Proxy(person, {
        get (target, propName) {
            return Reflect.get(target, propName);
        },
        set (target, propName, value) {
            console.log(`修改了p身上的${propName}属性`);
            Reflect.set(target, propName, value);
        },
        deleteProperty (target, propName) {
            console.log(`删除了p身上的${propName}属性`);
            return Reflect.deleteProperty(target, propName);
        }
    });
</script>
```

## 5、reactive对比ref
-  从定义数据角度对比：
   -  <strong style="color:#0000ff">ref</strong>用来定义：<span style="color:#0000ff">基本类型数据</span>。
   -  <strong style="color:#0000ff">reactive</strong>用来定义：<span style="color:#0000ff">对象（或数组）类型数据</span>。
   -  备注：ref 也可以用来定义对象（或数组）类型数据, 它内部会自动通过 reactive 转为代理对象。
-  从原理角度对比：
   -  ref 通过 ``Object.defineProperty()`` 的 ``get`` 与 ``set`` 来实现响应式<span style="color:#0000ff">（数据劫持）</span>。
   -  reactive 通过使用 ``Proxy`` 来实现响应式（数据劫持）, 并通过 ``Reflect`` 操作源对象内部的数据。
-  从使用角度对比：
   -  ref 定义的数据：操作数据需要 ``.value``，读取数据时模板中直接读取<span style="color:#0000ff">不需要</span>```.value```。
   -  reactive 定义的数据：操作数据与读取数据：均不需要 ``.value``。

## 6、setup的两个注意点
- vue2中子组件打印this   
    props传值和$attrs（子组件不写接收），$slots（子组件不写坑位）

- setup执行的时机
  - 在beforeCreate之前执行一次，this是undefined。
- setup的参数
  - <span style="color:#0000ff">props</span>：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  - <span style="color:#0000ff">context</span>：上下文对象
    - attrs: 值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性, 相当于 ```this.$attrs```。
    - slots: 收到的插槽内容, 相当于 ```this.$slots```。
    - emit: 分发自定义事件的函数, 相当于 ```this.$emit```。
```js
props: ['msg', 'a'],
emits: ['hello'],
beforeCreate () {
    console.log('beforeCreate----');
},
setup (props, context) {
    console.log('setup----this', this);
    console.log('setup----props', props);  // 子组件接收父组件传值，不声明 props: [] 会警告

    // 上下文
    console.log('setup----context', context.attrs);  // 不接收props，相当于vue2的$attrs
    console.log('setup----emit', context.emit);  // 触发自定义事件，注意 emits属性声明
    console.log('setup----slots', context.slots);  // 插槽v-slot:

    function testHello () {
        context.emit('hello', 666);
    }

    return {
        testHello
    };
}
```

## 7、计算属性与监视
### （2）computed函数


