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
2. setup是所有<span style="color:#00f">Composition API（组合API）“ 表演的舞台 ”</span>。
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
