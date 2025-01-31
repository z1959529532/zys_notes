(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{467:function(e,t,r){"use strict";r.r(t);var a=r(39),_=Object(a.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h2",{attrs:{id:"个人技能"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#个人技能"}},[e._v("#")]),e._v(" 个人技能")]),e._v(" "),r("ul",[r("li",[r("RouterLink",{attrs:{to:"/interview/js.html#字符串常见方法"}},[e._v("字符串常见方法")])],1),e._v(" "),r("li",[r("RouterLink",{attrs:{to:"/interview/js.html#数组常见方法"}},[e._v("数组常见方法")])],1),e._v(" "),r("li",[r("a",{attrs:{href:"https://juejin.cn/post/7097067108663558151?searchId=20231114212935B49E5A86A5981924F39B#heading-92",target:"_blank",rel:"noopener noreferrer"}},[e._v("Vue经典面试题：https://juejin.cn/post/7097067108663558151?searchId=20231114212935B49E5A86A5981924F39B#heading-92"),r("OutboundLink")],1)])]),e._v(" "),r("h3",{attrs:{id:"闭包"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#闭包"}},[e._v("#")]),e._v(" "),r("RouterLink",{attrs:{to:"/interview/js.html#闭包"}},[e._v("闭包")])],1),e._v(" "),r("p",[e._v("函数套函数，内层函数访问外层函数的作用域")]),e._v(" "),r("ul",[r("li",[e._v("两个优点：保存和保护\n"),r("ul",[r("li",[e._v("保护内部变量不受外界干扰，适合模块化开发，在ES6 module和CommonJs都有应用")]),e._v(" "),r("li",[e._v("保存就是形成一个不销毁的作用域，一直存在内存中，容易造成"),r("RouterLink",{attrs:{to:"/interview/js.html#内存泄露"}},[e._v("内存泄露")])],1),e._v(" "),r("li",[e._v("主要应用"),r("RouterLink",{attrs:{to:"/interview/encapsulation.html#防抖节流"}},[e._v("防抖节流")])],1)])])]),e._v(" "),r("h3",{attrs:{id:"原型和原型链"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#原型和原型链"}},[e._v("#")]),e._v(" "),r("RouterLink",{attrs:{to:"/interview/js.html#原型和原型链"}},[e._v("原型和原型链")])],1),e._v(" "),r("p",[e._v("原型：js中是使用函数创建对象的，都有一个prototype属性，也就是原型对象，用来存放属性和方法"),r("br"),e._v("\n原型链：我理解得本质就是个列表，当返回函数实例时，会有__proto__属性作为桥梁指向函数的原型，当访问对象属性时会搜索该对象的原型，层层向上找直到原型链的末端"),r("br"),e._v(" "),r("code",[e._v("p.__proto__===Person.prototype")]),r("br"),e._v(" "),r("code",[e._v("Object.prototypep.__proto__===null")])]),e._v(" "),r("h3",{attrs:{id:"跨域"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#跨域"}},[e._v("#")]),e._v(" 跨域")]),e._v(" "),r("p",[e._v("浏览器的安全机制，为了防止读取非同源的DOM、Cookie、LocalStorage、IndexDB"),r("br"),e._v("\n协议、域名、端口都相同，否则就是跨域")]),e._v(" "),r("ul",[r("li",[e._v("CORS：在服务端设置响应头"),r("code",[e._v("Access-Control-Allow-Origin")]),e._v("--"),r("code",[e._v("express")])]),e._v(" "),r("li",[e._v("JSONP：借助有跨域能力的标签"),r("code",[e._v("script")]),e._v("，有缺陷：只支持get、传递信息有限制")]),e._v(" "),r("li",[e._v("服务器代理："),r("code",[e._v("node")]),e._v("、"),r("code",[e._v("nginx")]),e._v("（允许前端带上cookie）不经过浏览器")])]),e._v(" "),r("h3",{attrs:{id:"promise"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#promise"}},[e._v("#")]),e._v(" "),r("a",{attrs:{href:"/promise"}},[e._v("Promise")])]),e._v(" "),r("p",[e._v("是异步编程新的一种解决方案，支持链式调用解决回调地狱的问题")]),e._v(" "),r("ul",[r("li",[e._v("状态："),r("code",[e._v("pedding")]),e._v(" --\x3e "),r("code",[e._v("fulfilled")]),e._v(" 或 "),r("code",[e._v("rejected")])]),e._v(" "),r("li",[e._v("Api："),r("code",[e._v(".then(value => {}, reason => {})")]),e._v("，"),r("code",[e._v(".catch(reason => {})")]),e._v("（失败语法糖）")]),e._v(" "),r("li",[e._v("Promise对象的方法："),r("code",[e._v(".resolve()")]),e._v("，"),r("code",[e._v(".reject()")]),e._v("，"),r("code",[e._v(".all()")]),e._v("，"),r("code",[e._v(".race()")])])]),e._v(" "),r("p",[e._v("async 与 await"),r("br"),e._v("\n基于Promise实现的，好处就是让异步的代码看起来和同步代码一样，代码容易阅读和维护")]),e._v(" "),r("ul",[r("li",[e._v("async：返回结果是Promise对象，返回结果和Promise.resolve一样")]),e._v(" "),r("li",[e._v("await：返回结果是成功promise的值（右侧一般为Promise对象，失败Promise要加try...catch），await必须写在async函数中，但async函数中可以没有await")])]),e._v(" "),r("h3",{attrs:{id:"vue-虚拟dom和diff算法"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#vue-虚拟dom和diff算法"}},[e._v("#")]),e._v(" "),r("RouterLink",{attrs:{to:"/interview/vueDiff.html"}},[e._v("Vue 虚拟Dom和Diff算法")])],1),e._v(" "),r("p",[e._v("Vue源码借鉴了snabbdom实现虚拟Dom和Diff算法的方式"),r("br"),e._v("\n原理就是h函数产生虚拟节点 --\x3e patch函数将对比完的虚拟节点上树"),r("br"),e._v("\nDiff发生在新旧虚拟Dom对比上，也就是patch函数里，最后反映到真实Dom")]),e._v(" "),r("h4",{attrs:{id:"patch函数"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#patch函数"}},[e._v("#")]),e._v(" patch函数")]),e._v(" "),r("p",[e._v("判断oldVnode是虚拟节点还是Dom节点（是Dom用h函数包装为虚拟节点）"),r("br"),e._v("\n然后判断是不是同一根节点"),r("code",[e._v("sameVnode")]),e._v("（key和sel选择器）----\x3e是（"),r("em",[r("strong",[e._v("精细比较")])]),e._v("）/ 不是（递归生成dom，直接插入新的，删除旧的）")]),e._v(" "),r("h4",{attrs:{id:"子节点的比较-diff算法-双端对比"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#子节点的比较-diff算法-双端对比"}},[e._v("#")]),e._v(" 子节点的比较(Diff算法-双端对比)")]),e._v(" "),r("ul",[r("li",[r("p",[e._v("四种对比方式--四个指针")]),e._v(" "),r("ul",[r("li",[e._v("新前--旧前")]),e._v(" "),r("li",[e._v("新后--旧后")]),e._v(" "),r("li",[e._v("新后--旧前（新前指的节点，移动到旧后之后）")]),e._v(" "),r("li",[e._v("新前--旧后（新前指的节点，移动到旧前之前）")])])]),e._v(" "),r("li",[r("p",[e._v("Vue3 快速Diff的不同")]),e._v(" "),r("ul",[r("li",[e._v("头和头")]),e._v(" "),r("li",[e._v("尾和尾")]),e._v(" "),r("li",[e._v("然后通过"),r("code",[e._v("最长递增子序列")]),e._v("进行移动/添加/删除")])])])]),e._v(" "),r("h3",{attrs:{id:"vue源码解决的问题"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#vue源码解决的问题"}},[e._v("#")]),e._v(" Vue源码解决的问题")]),e._v(" "),r("ul",[r("li",[e._v("data为什么必须是个函数")]),e._v(" "),r("li",[e._v("虚拟Dom实现原理，理解Vue更新机制，优化组件渲染性能")])]),e._v(" "),r("h3",{attrs:{id:"vue3与vue2的区别"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#vue3与vue2的区别"}},[e._v("#")]),e._v(" Vue3与Vue2的区别")]),e._v(" "),r("p",[r("a",{attrs:{href:"https://blog.csdn.net/qq_39290323/article/details/124786099",target:"_blank",rel:"noopener noreferrer"}},[e._v("组合式Api的不同：https://blog.csdn.net/qq_39290323/article/details/124786099"),r("OutboundLink")],1),r("br"),e._v(" "),r("a",{attrs:{href:"https://blog.csdn.net/Clytza/article/details/130137753",target:"_blank",rel:"noopener noreferrer"}},[e._v("Vue3的优点：https://blog.csdn.net/Clytza/article/details/130137753"),r("OutboundLink")],1)]),e._v(" "),r("ul",[r("li",[e._v("Vue3最大化的兼容了Vue2（Vue3里可以写Vue2）")]),e._v(" "),r("li",[e._v("源码升级，响应式原理的不同（Proxy），Diff算法的优化")]),e._v(" "),r("li",[e._v("组件对象式声明方式，更好的支持TypeScript，Vue2需要用装饰器")]),e._v(" "),r("li",[e._v("优化了tree shaking，提供了新的内置功能（Fragment，Teleport）")])]),e._v(" "),r("h3",{attrs:{id:"_0到1搭建项目"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_0到1搭建项目"}},[e._v("#")]),e._v(" 0到1搭建项目")]),e._v(" "),r("p",[r("a",{attrs:{href:"https://blog.csdn.net/Lyrelion/article/details/128066489",target:"_blank",rel:"noopener noreferrer"}},[e._v("参考地址1：https://blog.csdn.net/Lyrelion/article/details/128066489"),r("OutboundLink")],1),r("br"),e._v(" "),r("a",{attrs:{href:"https://blog.csdn.net/qq_41581588/article/details/127048451",target:"_blank",rel:"noopener noreferrer"}},[e._v("参考地址2：https://blog.csdn.net/qq_41581588/article/details/127048451"),r("OutboundLink")],1),r("br"),e._v(" "),r("a",{attrs:{href:"https://blog.csdn.net/A121212789/article/details/129818690",target:"_blank",rel:"noopener noreferrer"}},[e._v("脚手架创建：https://blog.csdn.net/A121212789/article/details/129818690"),r("OutboundLink")],1),r("br"),e._v(" "),r("a",{attrs:{href:"https://blog.csdn.net/Amouzy/article/details/129277140",target:"_blank",rel:"noopener noreferrer"}},[e._v("手动webpack搭建：https://blog.csdn.net/Amouzy/article/details/129277140"),r("OutboundLink")],1)]),e._v(" "),r("h2",{attrs:{id:"项目经历"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#项目经历"}},[e._v("#")]),e._v(" 项目经历")]),e._v(" "),r("h3",{attrs:{id:"大文件上传-切片上传"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#大文件上传-切片上传"}},[e._v("#")]),e._v(" 大文件上传-切片上传")]),e._v(" "),r("p",[r("a",{attrs:{href:"https://juejin.cn/post/7099362510532247589?searchId=2023102319245149D480042C1B7764B392",target:"_blank",rel:"noopener noreferrer"}},[e._v("参考地址：https://juejin.cn/post/7099362510532247589?searchId=2023102319245149D480042C1B7764B392"),r("OutboundLink")],1)]),e._v(" "),r("ul",[r("li",[e._v("导致问题\n"),r("ul",[r("li",[e._v("网络不好")]),e._v(" "),r("li",[e._v("服务器过载失败")]),e._v(" "),r("li",[e._v("时间长-影响用户体验")])])]),e._v(" "),r("li",[e._v("实现\n"),r("ul",[r("li",[e._v("拿到文件对象通过"),r("code",[e._v("slice")]),e._v("进行切片处理，Blob保存在数组中")]),e._v(" "),r("li",[e._v("同时用文件"),r("code",[e._v("spark-md5")]),e._v("的值（hash值）")]),e._v(" "),r("li",[e._v("通过hash值向后端获取"),r("code",[e._v("文件上传状态")]),e._v("（成功--文件妙传 percent=100 | url）")]),e._v(" "),r("li",[e._v("未成功执行"),r("code",[e._v("切片上传")]),e._v("，过滤拿到未上传切片数组继续上传")]),e._v(" "),r("li",[e._v("判断所有切片上传成功，告诉后端"),r("code",[e._v("合并切片")])])])])]),e._v(" "),r("p",[e._v("注意文件切片的缓存（转字符串或二进制"),r("code",[e._v("localstorage")]),e._v("/"),r("code",[e._v("SessionStorage")]),e._v("）"),r("br"),e._v("\n并发请求Promise.all()"),r("br"),e._v("\n停止请求，请求配置axios.CancelToken.source()，然后调用.cancel")]),e._v(" "),r("h3",{attrs:{id:"首屏优化-性能优化"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#首屏优化-性能优化"}},[e._v("#")]),e._v(" 首屏优化--\x3e性能优化")]),e._v(" "),r("ul",[r("li",[e._v("首屏优化\n"),r("ul",[r("li",[e._v("减少请求，接口整合，”使用缓存“")]),e._v(" "),r("li",[e._v("懒加载")]),e._v(" "),r("li",[e._v("将资源用cdn形式")]),e._v(" "),r("li",[e._v("gzip压缩，图片压缩")]),e._v(" "),r("li",[e._v("分包（三方库，避免重复请求）")])])]),e._v(" "),r("li",[e._v("性能优化\n"),r("ul",[r("li",[r("RouterLink",{attrs:{to:"/interview/encapsulation.html#图片懒加载和预加载"}},[e._v("图片懒加载、预加载")]),e._v("（getBoundingClientRect，IntersectionObserver）")],1),e._v(" "),r("li",[r("RouterLink",{attrs:{to:"/interview/encapsulation.html#虚拟列表"}},[e._v("列表的虚拟滚动")])],1),e._v(" "),r("li",[r("RouterLink",{attrs:{to:"/interview/js.html#防抖和节流"}},[e._v("防抖节流")])],1),e._v(" "),r("li",[e._v("UI库按需加载")]),e._v(" "),r("li",[e._v("代码（清定时器，销毁监听事件）--（v-show）--（v-for加key，避免与v-if一起使用）--（keep-alive缓存组件）")])])])]),e._v(" "),r("h3",{attrs:{id:"列表虚拟滚动"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#列表虚拟滚动"}},[e._v("#")]),e._v(" "),r("RouterLink",{attrs:{to:"/interview/encapsulation.html#虚拟列表"}},[e._v("列表虚拟滚动")])],1),e._v(" "),r("h3",{attrs:{id:"iframe"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#iframe"}},[e._v("#")]),e._v(" iframe")]),e._v(" "),r("p",[e._v("微前端：多个小型前端组合成一个应用的方式，独立部署、不同技术栈子应用")]),e._v(" "),r("ul",[r("li",[e._v("解决问题\n"),r("ul",[r("li",[e._v("首页卡的问题：主系统iFrame预加载（js创建iFrame），子应用减少加载资源"),r("br"),e._v(" "),r("a",{attrs:{href:"https://pythonjishu.com/niljfcmmrkzqpwd/",target:"_blank",rel:"noopener noreferrer"}},[e._v("参考1：https://pythonjishu.com/niljfcmmrkzqpwd/"),r("OutboundLink")],1)]),e._v(" "),r("li",[e._v("记住子应用路由问题：子应用路由发生变化就发送到主应用，存在缓存中，下次重新显示时直接给iframe的url")]),e._v(" "),r("li",[e._v("cookie登录失效：跨域情况下，新增了SameSite属性防止攻击和追踪，无法set-cookie；解决：服务端代理，前端处理cookie")]),e._v(" "),r("li",[e._v("前进后退：监听")])])])]),e._v(" "),r("p",[r("a",{attrs:{href:"https://www.cnblogs.com/smileZAZ/archive/2023/08/01/17598642.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("项目问题参考：https://www.cnblogs.com/smileZAZ/archive/2023/08/01/17598642.html"),r("OutboundLink")],1)]),e._v(" "),r("h3",{attrs:{id:"webpack优化"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#webpack优化"}},[e._v("#")]),e._v(" webpack优化")]),e._v(" "),r("p",[r("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/536200606",target:"_blank",rel:"noopener noreferrer"}},[e._v("webpack优化技巧：https://zhuanlan.zhihu.com/p/536200606"),r("OutboundLink")],1)]),e._v(" "),r("ul",[r("li",[e._v("缓存cache：开发环境开启缓存，加快构建速度（webpack5内置了缓存配置,低版本的话安装cache-loader）")]),e._v(" "),r("li",[e._v("多线程"),r("code",[e._v("thread-loader")]),e._v("：")]),e._v(" "),r("li",[e._v("摇树优化"),r("code",[e._v("tree-shaking")]),e._v("：不编译没有用到的代码（webpack5内置，确保在编译时使用生产模式，mode: 'production'）")])]),e._v(" "),r("p",[r("a",{attrs:{href:"https://blog.csdn.net/jieyucx/article/details/131261301",target:"_blank",rel:"noopener noreferrer"}},[e._v("图片无损压缩参考：https://blog.csdn.net/jieyucx/article/details/131261301"),r("OutboundLink")],1)]),e._v(" "),r("h3",{attrs:{id:"封装组件"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#封装组件"}},[e._v("#")]),e._v(" 封装组件")]),e._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"https://juejin.cn/post/6995518429952212999?searchId=202311181708496B05DEBF215F11B65FFA#heading-11",target:"_blank",rel:"noopener noreferrer"}},[e._v("echarts封装参考1"),r("OutboundLink")],1)]),e._v(" "),r("li",[r("a",{attrs:{href:"https://juejin.cn/post/7273435543677583423?searchId=20231119091004DC84D2ED091A7A228C64",target:"_blank",rel:"noopener noreferrer"}},[e._v("递归树组件参考1"),r("OutboundLink")],1)]),e._v(" "),r("li",[e._v("图片预览：放大缩小旋转，loading，全屏，多图轮播")]),e._v(" "),r("li",[e._v("文件上传：校验，进度条")]),e._v(" "),r("li",[e._v("拼音搜索下拉框：借助"),r("code",[e._v("pinyin-match")]),e._v("插件")])])])}),[],!1,null,null,null);t.default=_.exports}}]);