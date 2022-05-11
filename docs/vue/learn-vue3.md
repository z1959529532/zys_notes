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
### （1）computed函数
- 与Vue2.x中computed配置功能一致
- 写法
```js
import {computed} from 'vue'

// vue2
// computed: {
//     fullName () {
//         return this.person.firstName + this.person.lastName;
//     }
// },
setup () {
    let person = reactive({
        firstName: '张',
        lastName: '三'
    });

    // 计算属性（简写）
    // person.fullName = computed(() => {
    //     return person.firstName + '-' + person.lastName;
    // });
    // 修改计算属性（上面是只读的）
    person.fullName = computed({
        get () {
            return person.firstName + '-' + person.lastName;
        },
        set (value) {
            const nameArr = value.split('-');
            person.firstName = nameArr[0];
            person.lastName = nameArr[1];
        }
    });

    return {
        person
    };
}
```

### （2）watch函数
- 与Vue2.x中watch配置功能一致
- 两个小“坑”：
  - 直接监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置失效）。
  - 监视reactive定义的响应式数据中某个属性（对象）时：deep配置有效。
```js
// 监听练习如下

// 1、监听ref定义的一个数据
watch(sum, (newValue, oldValue) => {
    console.log('sum的值发生了变化', newValue, oldValue);
});

// 2、监听ref定义的多个数据
watch([sum, msg], (newValue, oldValue) => {
    console.log('watch监听变化', newValue, oldValue);
}, {immediate: true});

// 3、监听reactive定义的对象
// 注意1：无法正确获取oldValue
// 注意2：强制开启了深度监视，deep无效
watch(person, (newValue, oldValue) => {
    console.log('watch监听person对象变化', newValue, oldValue);
}, {deep: false});

// 4、监听reactive定义的对象的某一个属性
watch(() => person.age, (newValue, oldValue) => {
    console.log('watch监听person对象age的变化', newValue, oldValue);
});

// 5、监听reactive定义的对象的某些属性
watch([() => person.name, () => person.age], (newValue, oldValue) => {
    console.log('watch监听person对象name、age变化', newValue, oldValue);
});

// 特殊情况，监听reactive定义的对象的对象属性
watch(() => person.job, (newValue, oldValue) => {
    console.log('watch监听person对象job变化', newValue, oldValue);
}, {deep: true});



// watch监听ref定义的对象问题
console.log(sum, 1122);
console.log(msg, 1122);
console.log(person, 1122);
// 1、监听的是结构RefImpl，而不是.value
// watch(sum.value, (newValue, oldValue) => {
//     console.log('sum的值发生了变化', newValue, oldValue);
// });
// 2、person对象用ref定义，监听person.value不是ref定义的数据，而是里面求助于reactive
// watch(person.value, (newValue, oldValue) => {
//     console.log('watch监听person对象变化', newValue, oldValue);
// });
watch(person, (newValue, oldValue) => {
    console.log('watch监听person对象变化', newValue, oldValue);
}, {deep: true});
```

vue2中的watch：
```js
watch: {
    // sum (newValue, oldValue) {
    //     console.log('sum的值发生了变化', newValue, oldValue);
    // }

    sum: {
        immediate: true,
        deep: true,
        handler(newValue, oldValue) {
            console.log('sum的值发生了变化', newValue, oldValue);
        }
    }
}
```

### （3）watchEffect函数
- watch的套路是：既要指明监视的属性，也要指明监视的回调。
- watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。

- watchEffect有点像computed：
  - 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。
```js
// 示例
let sum = ref(0);
let msg = ref('你好');
let person = reactive({
    name: '张三',
    age: 20,
    job: {
        a: {
            b: 11111
        }
    }
});

// watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
watchEffect(() => {
    const x1 = sum.value;
    const x2 = person.job.a.b;
    console.log('---执行了watchEffect的回调');
});
```


## 8、生命周期   

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

- Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有有两个被更名：
  - ``beforeDestroy``改名为 ``beforeUnmount``
  - ``destroyed``改名为 ``unmounted``
- Vue3.0也提供了 Composition API 形式的生命周期钩子，与Vue2.x中钩子对应关系如下：
  - `beforeCreate`===>`setup()`
  - `created`=======>`setup()`
  - `beforeMount` ===>`onBeforeMount`
  - `mounted`=======>`onMounted`
  - `beforeUpdate`===>`onBeforeUpdate`
  - `updated` =======>`onUpdated`
  - `beforeUnmount` ==>`onBeforeUnmount`
  - `unmounted` =====>`onUnmounted`
```js
setup () {
    let sum = ref(0);

    // 通过组合式Api的形式使用生命周期钩子
    // beforeCreate、created相当于setup
    onBeforeMount(() => {
        console.log('---onBeforeMount---');
    });
    onMounted(() => {
        console.log('---onMounted---');
    });
    onBeforeUpdate(() => {
        console.log('---onBeforeUpdate---');
    });
    onUpdated(() => {
        console.log('---onUpdated---');
    });
    onBeforeUnmount(() => {
        console.log('---onBeforeUnmount---');
    });
    onUnmounted(() => {
        console.log('---onUnmounted---');
    });

    return {
        sum
    };
},

// beforeCreate () {
//     console.log('---beforeCreate---');
// },
// created () {
//     console.log('---created---');
// },
// beforeMount () {
//     console.log('---beforeMount---');
// },
// mounted () {
//     console.log('---mounted---');
// },
// beforeUpdate () {
//     console.log('---beforeUpdate---');
// },
// updated () {
//     console.log('---updated---');
// },
// beforeUnmount () {
//     console.log('---beforeUnmount---');
// },
// unmounted () {
//     console.log('---unmounted---');
// },
```


## 9、自定义hook函数
- 什么是hook？—— 本质是一个函数，把setup函数中使用的Composition API进行了封装。
- 类似于vue2.x中的mixin。
- 自定义hook的优势: 复用代码, 让setup中的逻辑更清楚易懂。
```js
// 代码示例
<h2>当前点击时鼠标的坐标 x：{{ point.x }}，y：{{ point.y }}</h2>

setup () {
    let point = usePoint();

    return {
        point
    };
}

// 使用hook函数usePoint.js，将组合式API进行抽离
import {reactive, onMounted, onBeforeUnmount} from 'vue';
export default function () {
    let point = reactive({
        x: 0,
        y: 0
    });
    
    onMounted(() => {
        window.addEventListener('click', getPagePoint);
    });
    
    onBeforeUnmount(() => {
        window.removeEventListener('click', getPagePoint);
    });
    
    function getPagePoint (event) {
        console.log(event.pageX, event.pageY);
        point.x = event.pageX;
        point.y = event.pageY;
    }
    
    return point;
}
```

## 10、toRef
- 作用：创建一个 ``ref`` 对象，其value值指向另一个对象中的某个属性。
- 语法：```const name = toRef(person,'name')```
- 应用:   要将响应式对象中的某个属性单独提供给外部使用时。
- 扩展：``toRefs`` 与 ``toRef`` 功能一致，但可以批量创建多个 ref 对象，语法：``toRefs(person)``
```js
<h3>源数据姓名：{{ person.name }}</h3>
<h3>toRef姓名：{{ name }}</h3>
<h3>新ref姓名：{{ name2 }}</h3>
<h3>年龄：{{ person.age }}</h3>
<h3>薪资：{{ salary }}</h3>
<button @click="name='李四'">修改toRef姓名</button>
<button @click="name2='李四'">修改新ref姓名</button>
<button @click="person.age++">年龄+1</button>
<button @click="salary=salary+2000">加薪</button>

import {ref, reactive, toRef, toRefs} from 'vue';
setup () {
    let person = reactive({
        name: '张三',
        age: 20,
        job: {
            a: {
                b: 11111
            }
        }
    });

    // let myName = toRef(person, 'name');
    // console.log(myName, 1122);

    // const a = toRefs(person);
    // console.log(a, 1122);

    return {
        person,

        // toRef
        name: toRef(person, 'name'),
        name2: ref(person.name),  // 这样是新的值，而不是指向源数据
        salary: toRef(person.job.a, 'b'),

        // toRefs
        // ...toRefs(person)  // person第一层可以直接写
    };
}
```

## 11、shallowReactive 与 shallowRef（其它API）
- shallowReactive：只处理对象最外层属性的响应式<span style="color:#0000ff">（浅响应式）。</span>
- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。

- 什么时候使用?
  -  如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
  -  如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

```js
<button @click="person.name='李四'">修改姓名</button>
<button @click="person.job.a.b=person.job.a.b+2000">加薪</button>
// 发现问题是，点击加薪不变，再点击修改姓名就变了

<hr>
// 1,2
// <h3>测试x值为：{{x}}</h3>
// <button @click="x++">点我+1</button>

// 3
<h3>测试值为：{{x.y}}</h3>
<button @click="x.y++">点我+1</button>
<button @click="x={y: 20}">点我替换x</button>

// let person = reactive({
let person = shallowReactive({  // 只考虑第一层的响应式
    name: '张三',
    age: 20,
    job: {
        a: {
            b: 11111
        }
    }
});

// let x = ref(0);
// 2
// let x = shallowRef(0);  // 处理基本类型数据响应式，与ref作用一样
// console.log(x, 1122);
// 3
let x = shallowRef({  // 处理对象类型，不进行对象的响应式处理
    y: 10
});
console.log(x, 1122);  // 不是响应式的
```

## 12、readonly 与 shallowReadonly（其它API）
- readonly: 让一个响应式数据变为只读的<span style="color:#0000ff">（深只读）</span>。
- shallowReadonly：让一个响应式数据变为只读的<span style="color:#0000ff">（浅只读）</span>。
- 应用场景: 不希望数据被修改时。

```js
let person = reactive({
    name: '张三',
    age: 20,
    job: {
        a: {
            b: 11111
        }
    }
});
let num = ref(0);

person = readonly(person);  // 只读保护
person = shallowReadonly(person);  // 浅只读，只考虑第一层数据
num = readonly(num);
num = shallowReadonly(num);
// 这样写是不自相矛盾（声明完响应式又不让改），有可能是别人组件生命的响应式数据，让你只能用
```

## 13、toRaw 与 markRaw（其它API）
- toRaw：
  - 作用：将一个由``reactive``生成的<span style="color:#0000ff">响应式对象</span>转为<span style="color:#0000ff">普通对象</span>。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
- markRaw：
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景:
    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

```js
let person = reactive({
    name: '张三',
    age: 20,
    job: {
        a: {
            b: 11111
        }
    }
});

function showRawPerson() {
    const p = toRaw(person);  // 将响应式对象还原普通对象
    console.log(p);
}

function addCar() {
    // person.car = {name: '奔驰', price: '40w'};
    // 标记对象后值能改，但vue不做响应式了
    person.car = markRaw({name: '奔驰', price: '40w'});
}
function changeCarName() {
    person.car.name = '宝马';
    console.log(person);
}
```

## 14、customRef（其它API）
- 作用：<span style="color:#0000ff">创建一个自定义的 ref</span>，并对其依赖项跟踪和更新触发进行显式控制。
- 实现防抖效果：
```vue
<template>
    <input type="text" v-model="keyWord" />
    <h3>{{ keyWord }}</h3>
</template>

<script>
import {ref, customRef} from 'vue';
export default {
    name: 'App',
    components: {},
    setup () {
        // let keyWord = ref('hello');  // 1、使用ref

        function myRef(value, delay) {
            let timer = null;
            return customRef((track, trigger) => {
                return {
                    get() {
                        track(); // 通知vue追踪数据的变化
                        return value;
                    },
                    set(newValue) {
                        value = newValue;
                        clearTimeout(timer);
                        timer = setTimeout(() => {
                            trigger();  // 通知vue重新解析模板，调get
                        }, delay);
                    }
                }
            });
        }
        let keyWord = myRef('hello', 1000);  // 2、使用自定义ref

        return {
            keyWord
        };
    }
};
</script>
```

## 15、provide 与 inject（提供与注入，其它API）
<img src="https://v3.cn.vuejs.org/images/components_provide.png" style="width:300px" />   

- 作用：<span style="color:#0000ff">实现祖与后代组件间通信</span>
- 套路：父组件有一个 ``provide`` 选项来提供数据，后代组件有一个 ``inject`` 选项来开始使用这些数据
- 具体写法：
  1. 祖组件中：
```vue
<script>
import {reactive, toRefs, provide} from 'vue';
export default {
    name: 'App',
    components: {Child},
    setup () {
        let car = reactive({carName: '奔驰', price: '40w'});
        provide('car', car);  // 提供，给自己的后代组件传递数据
        return {...toRefs(car)};
    }
};
</script>
```

  2. 后代组件中：
```vue
<script>
import {inject} from 'vue'
export default {
    name: "Son",
    components: {},
    setup() {
        let propCar = inject('car');  // 注入，后代组件接收
        // console.log(propCar);
        return {propCar}
    }
}
</script>
```

## 16、响应式数据的判断（其它API）
- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 ``reactive`` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 ``readonly`` 创建的只读代理
- isProxy: 检查一个对象是否是由 ``reactive`` 或者 ``readonly`` 方法创建的代理   
示例：
```vue
<script>
import {ref, reactive, readonly, isRef, isReactive, isReadonly, isProxy} from 'vue';
export default {
    name: 'App',
    components: {},
    setup () {
        let car = reactive({carName: '奔驰', price: '40w'});
        let sum = ref(0);
        let car2 = readonly(car);

        // 响应式数据的判断
        console.log(isRef(sum));  // true
        console.log(isReactive(car));  // true
        console.log(isReadonly(car2));  // true
        console.log(isProxy(car));  // true
        console.log(isProxy(car2));  // true，注意，readonly处理完依然是proxy
        console.log(isProxy(sum));  // false
        return {};
    }
};
</script>
```

## 17、Fragment（新的组件）
- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
- 好处: 减少标签层级, 减小内存占用

## 18、Teleport（新的组件）
- 什么是Teleport？
  - `Teleport` 是一种能够将我们的<span style="color:#0000ff">组件html结构</span>移动到指定位置的技术。
  - 直接脱离当前组件，不影响当前结构

```vue
<div>
    <button @click="isShow=true">点我显示弹窗</button>
    <!--直接插入body中-->
    <teleport to="body">
        <!--蒙层-->
        <!--    <div v-if="isShow" class="mask">-->
        <div v-if="isShow" class="dialog">
            <h3>我是弹窗</h3>
            <h4>内容...</h4>
            <button @click="isShow=false">关闭弹窗</button>
        </div>
        <!--</div>-->
    </teleport>
</div>

<script>
    import {ref} from 'vue'
    export default {
        name: "Dialog",
        components: {},
        setup() {
            let isShow = ref(false);
            return {isShow}
        }
    }
</script>
```

## 19、Suspense（新的组件）
- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验
- 两种情况会导致显示的慢，网速、异步组件

- 静态引入：要等最里层的渲染完成，整个才显示   
- 异步引入：渲染完成就显示，好一点。   
  有个小问题，未显示内容时用户以为没东西了呢（fallback解决）   
  内置的，直接能使用

```vue
<div class="app">
    <h3>我是App组件（父）</h3>
    <suspense>
        <template v-slot:default>
            <child></child>
        </template>
        <template v-slot:fallback>
            <h3>稍等，加载中...</h3>
        </template>
    </suspense>
</div>

<script>
// import Child from "./components/Demo13/Child";  // 静态引入
import {defineAsyncComponent} from 'vue'  // 异步引入
const Child = defineAsyncComponent(() => import('./components/Demo13/Child'));
export default {
    name: 'App',
</script>
```

子组件：
```vue
<template>
    <div class="child">
        <h3>我是Child组件（子）</h3>
        {{sum}}
    </div>
</template>

<script>
import {ref} from 'vue'
export default {
    name: "Child",
    components: {},
    // 异步
    async setup() {
        let sum = ref(0);
        let p = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({sum});
            }, 1500);
        });
        return await p;
    }
}
</script>
```

