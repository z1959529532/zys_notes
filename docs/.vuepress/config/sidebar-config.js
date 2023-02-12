/** 侧边栏配置 */
module.exports =
    // 1、自动生成
    // 'auto'

    // 2、数组形式
    [
        '/',
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
        // 数组的扩展形式
        {
            title: 'vue学习',
            path: '/vue/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                '/vue/learn-vue2',
                '/vue/learn-vue3',
            ],
        },
        {
            title: '面试问题',
            path: '/interview/',
            collapsable: false,
            sidebarDepth: 2,
            children: [
                '/interview/vue',
                '/interview/css',
                '/interview/js'
            ],
        }
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
