
/** 导航栏配置 */
module.exports = [
    {text: 'Vuepress', link: '/vp-notes/', icon: 'reco-tag'},
    {text: 'Vue', link: '/vue/'},
    {
        text: '面试问题',
        items: [
            {text: 'vue', link: '/interview/vue'},
            {text: 'js', link: '/interview/js'},
            {text: 'vue', link: '/interview/css'}
        ]
    },
    { text: '时间线', link: '/timeline/', icon: 'reco-date' }
    // {
    //     text: '更多',
    //     items: [
    //         {text: 'About1', link: '/about/about1'},
    //         {text: 'About2', link: '/about/about2'}
    //     ]
    // },
];

// /** 禁用 */
// false