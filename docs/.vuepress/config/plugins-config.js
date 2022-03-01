const secrt = require('./secret');

module.exports = {
    /** 7、时间转换插件(显示更新时间) */
    '@vuepress/last-updated': {
        transformer: (timestamp, lang) => {
            // 不要忘了安装 moment
            const moment = require('moment');
            // moment.locale(lang)
            moment.locale('zh-cn');
            return moment(timestamp).format('LLLL');
        }
    },
    
    /** 10、vssue插件(评论功能) */
    '@vssue/vuepress-plugin-vssue': {
        // 设置 `platform` 而不是 `api`
        platform: 'github-v4',
        
        // 其他的 Vssue 配置
        owner: 'z1959529532',
        repo: 'zys_notes',
        clientId: secrt.clientId,
        clientSecret: secrt.clientSecret,
        autoCreateIssue: true
    },
    
    /** 11、回到顶部 */
    '@vuepress/back-to-top': true,
    
};