const navConfig = require('./config/nav-config.js');
const sidebarConfig = require('./config/sidebar-config.js');
const headConfig = require('./config/head-config.js');
const pluginsConfig = require('./config/plugins-config.js');

// 配置文件
module.exports = {
    themeConfig: {

        /** 4、导航栏 */
        nav: navConfig,
        /** 4、logo图片 */
        logo: '/assets/imgs/header.png',

        /** 5、侧边栏 */
        sidebar: sidebarConfig,  // 自定义侧边栏
        // sidebar: 'auto',
        sidebarDepth: 2,

        /** 7、更新时间 */
        lastUpdated: '更新时间'
    },

    /** 6、个人信息 */
    title: 'zys笔记',
    description: 'Welcome to zys_notes',
    port: '3030',
    head: headConfig,

    /** 插件 */
    plugins: pluginsConfig,

    /** 8、发布github */
    /** 配置base */
    base: '/zys_notes/',

    configureWebpack: {
        node: {
            global: true,
            process: true
        }
    }
};
