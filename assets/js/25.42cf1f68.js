(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{472:function(e,t,_){"use strict";_.r(t);var v=_(39),a=Object(v.a)({},(function(){var e=this,t=e.$createElement,_=e._self._c||t;return _("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[_("p",[e._v("Vue源码借鉴了snabbdom实现虚拟Dom和Diff算法的方式"),_("br"),e._v(" "),_("a",{attrs:{href:"https://github.com/snabbdom/snabbdom",target:"_blank",rel:"noopener noreferrer"}},[e._v("Github地址：https://github.com/snabbdom/snabbdom"),_("OutboundLink")],1),_("br"),e._v(" "),_("a",{attrs:{href:"https://www.bilibili.com/video/BV1v5411H7gZ/?spm_id_from=333.999.0.0&vd_source=12de02404b987499ed9c11dde9553bfc",target:"_blank",rel:"noopener noreferrer"}},[e._v("b站视频地址"),_("OutboundLink")],1)]),e._v(" "),_("h3",{attrs:{id:"snabbdom"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#snabbdom"}},[e._v("#")]),e._v(" snabbdom")]),e._v(" "),_("p",[e._v("源码用TS写的"),_("br"),e._v("\n想使用build好的JS版本的snabbdom的库，可以从npm下载"),_("code",[e._v("yarn add snabbdom -D")])]),e._v(" "),_("p",[e._v("Diff发生在新的虚拟Dom和旧的虚拟Dom对比上，最后反映到真实Dom"),_("br"),e._v("\n不研究Dom如何转化为虚拟Dom，属于模板编译"),_("br"),e._v("\nh函数----\x3e虚拟Dom----\x3e真实Dom")]),e._v(" "),_("h4",{attrs:{id:"h函数产生虚拟节点"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#h函数产生虚拟节点"}},[e._v("#")]),e._v(" h函数产生虚拟节点")]),e._v(" "),_("p",[e._v("创建虚拟节点"),_("code",[e._v("h函数")]),e._v("----\x3e创建patch函数----\x3epatch函数"),_("code",[e._v("让虚拟节点上树")])]),e._v(" "),_("ul",[_("li",[e._v("手写h函数")])]),e._v(" "),_("p",[e._v("依赖包"),_("code",[e._v("snabbdom")]),e._v("----\x3e"),_("code",[e._v("h.ts")]),e._v("传入参数形式分多种情况----\x3e"),_("code",[e._v("vnode.ts")]),e._v("里面函数重载，返回一个虚拟节点对象")]),e._v(" "),_("h4",{attrs:{id:"diff算法"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#diff算法"}},[e._v("#")]),e._v(" Diff算法")]),e._v(" "),_("p",[e._v("感受最小更新，同级加key"),_("br"),e._v("\n得同一个虚拟节点"),_("br"),e._v("\n只进行同层比较，不跨层")]),e._v(" "),_("h4",{attrs:{id:"patch函数"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#patch函数"}},[e._v("#")]),e._v(" patch函数")]),e._v(" "),_("p",[e._v("判断oldVnode是虚拟节点还是Dom节点（是Dom用h函数包装为虚拟节点）"),_("br"),e._v("\n然后判断是不是同一根节点"),_("code",[e._v("sameVnode")]),e._v("（key和sel选择器）----\x3e是（"),_("em",[_("strong",[e._v("精细比较")])]),e._v("）/ 不是（递归生成dom，直接插入新的，删除旧的）")]),e._v(" "),_("h4",{attrs:{id:"子节点的比较-diff算法-双端对比-updatechildren"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#子节点的比较-diff算法-双端对比-updatechildren"}},[e._v("#")]),e._v(" 子节点的比较(Diff算法-双端对比) updateChildren")]),e._v(" "),_("ul",[_("li",[_("p",[e._v("四种对比方式--四个指针")]),e._v(" "),_("ul",[_("li",[e._v("新前--旧前")]),e._v(" "),_("li",[e._v("新后--旧后")]),e._v(" "),_("li",[e._v("新后--旧前（新前指的节点，移动到旧后之后）")]),e._v(" "),_("li",[e._v("新前--旧后（新前指的节点，移动到旧前之前）")])])]),e._v(" "),_("li",[_("p",[e._v("Vue3 快速Diff的不同")]),e._v(" "),_("ul",[_("li",[e._v("头和头")]),e._v(" "),_("li",[e._v("尾和尾")]),e._v(" "),_("li",[e._v("然后通过"),_("code",[e._v("最长递增子序列")]),e._v("进行移动/添加/删除")])])])])])}),[],!1,null,null,null);t.default=a.exports}}]);