---
title: 开始vue
---

### node

- node.js是基于V8引擎的JavaScript运行时，可作为一个后台服务器运行js代码   

这里使用```nvm```，```node```版本管理工具，便于本地进行多个node版本之间切换   
[参考地址：https://blog.csdn.net/m0_65634497/article/details/127789013](https://blog.csdn.net/m0_65634497/article/details/127789013)   
- [下载地址：github --> Assets --> nvm-setup.zip](https://github.com/coreybutler/nvm-windows/releases)
- 查看版本：```nvm -v```
- 使用淘宝镜像：```nvm```安装目录下的```setting.txt```里加
```js
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```
- nvm指令
```js
nvm off                     // 禁用node.js版本管理(不卸载任何东西)
nvm on                      // 启用node.js版本管理
nvm install <version>       // 安装node.js的命名 
nvm uninstall <version>     // 卸载node.js是的命令
nvm ls                      // 显示所有安装的node.js版本
nvm list available          // 显示可以安装的所有node.js的版本
nvm use <version>           // 切换到使用指定的nodejs版本
nvm v                       // 显示nvm版本
nvm install stable          // 安装最新稳定版
```

- 遇到问题
```js
Node.js v18.15.0
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```
[参考：往package.json启动加```set NODE_OPTIONS=--openssl-legacy-provider```](https://blog.csdn.net/Gyakir/article/details/131257174)

### Vue CLI（内置了webpack）
Vue CLI是一个 Vue.js 项目脚手架，可快速搭建Vue开发环境以及对应的 webpack 配置   
[官网地址](https://cli.vuejs.org/zh/)
- 安装：```npm install -g @vue/cli``` / ```yarn global add @vue/cli```
- 查看版本：```vue --version```
- 用脚手架创建项目：```vue create app```

### vue-property-decorator
[vue-property-decorator 使用参考地址：https://blog.csdn.net/weixin_44116302/article/details/111225763](https://blog.csdn.net/weixin_44116302/article/details/111225763)
