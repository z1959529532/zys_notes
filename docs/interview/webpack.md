---
title: Webpack
---

进行模块化开发和打包的工具
- [webpack的构建流程](/interview/webpack.html#webpack的构建流程)
- [loader](/interview/webpack.html#loader)
- [plugin](/interview/webpack.html#plugin)
- [webpack性能优化](/interview/webpack.html#webpack性能优化)

### webpack的构建流程
初始化参数   
开始编译   
确定⼊⼝   
编译模块   
输出资源

### loader
“转换器”，主要用于转换其它类型的模块，因为webpack只能解析js文件   
配置在```webpack.config```的```module.rules```关键字下   
注意：loader执行顺序“从右向左”，因为选择了compose这样的函数式编程   
- 常见
  - css-loader：允许require的方式引入，使用css
  - style-loader：将css添加到内联样式标签
  - file-loader：把⽂件输出到⼀个⽂件夹中，在代码中通过相对URL输出
  - babel-loader：把 ES6 转换成 ES5 

### plugin
“插件”，可以扩展webpack的功能，在生命周期不同阶段达到不同目的
配置在```webpack.config```的```plugins```关键字下   
- 常见
  - html-webpack-plugin：打包html文件
  - uglifyjs-webpack-plugin：压缩js文件代码
  - mini-css-extract-plugin：CSS提取到单独的⽂件中，⽀持按需加载 

### webpack热更新的原理
```express server```和 ```socket server```

### webpack提升构建速度
- DllPlugin：不经常改变代码，抽成共享库
- 使用cache-loader
- terser 启用多线程

### webpack性能优化
- 压缩代码：uglifyjs-webpack-plugin插件
- 代码分包：做到按需加载，不重复请求
- 利用cdn加速：可以通过配置修改静态资源的路径，避免打包三方库，是体积更小
- treeshaking：摇树优化，不走用不到的代码



