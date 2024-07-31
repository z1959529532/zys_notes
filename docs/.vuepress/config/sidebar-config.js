/** 侧边栏配置 */
module.exports =
    // 1、自动生成
    // 'auto'

    // 2、数组形式
    [
        '/',
        // 数组的扩展形式
        {
            title: 'vue学习',
            path: '/vue/start',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                '/vue/learn-vue2',
                '/vue/learn-vue3',
            ],
        },
        {
            title: 'vite学习',
            path: '/vite/vite',
            collapsable: true,
            sidebarDepth: 2,
        },
        {
            title: 'uniapp学习',
            path: '/uniapp/uniapp',
            collapsable: true,
            sidebarDepth: 2,
        },
        '/angular/angular',
        '/websocket/websocket',
        {
            title: '前端基础',
            path: '/basis/',
            collapsable: false,
            sidebarDepth: 2,
            children: [
                '/basis/learn-html',
                '/basis/learn-css'
            ],
        },
        '/ajax/',
        '/promise/',
        '/axios/',
        '/iframe/',
        {
            title: '准备',
            path: '/interview/',
            collapsable: false,
            sidebarDepth: 2,
            children: [
                '/interview/encapsulation',
                '/interview/vue',
                '/interview/js',
                '/interview/css',
                '/interview/http',
                '/interview/webgis',
                '/interview/vueDiff',
            ],
        },
    ];

    // 3、对象形式
    // {
    //     // 这样直接地址栏访问vue
    //     '/vue/': [
    //         '',
    //         'learn-vue2',
    //         'learn-vue3'
    //     ],
    //     '/': [
    //         ''
    //     ]
    // };
