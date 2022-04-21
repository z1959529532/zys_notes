/** 侧边栏配置 */
module.exports =
    // 1、自动生成
    // 'auto'
    
    // 2、数组形式
    [
        '/',
        '/about/',
        '/ajax/',
        // 数组的扩展形式
        {
            title: 'vue学习',
            path: '/vue/',
            collapsable: false,
            sidebarDepth: 1,
            children: [
                '/vue/learn-vue2',
                '/vue/learn-vue3',
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
