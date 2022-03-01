<template>
    <div id="printer-page">
        <template v-if="curTitle">
            <h1 id="printer-page-h1" :class="{'text-open': textOpen, 'text-close': textClose}">
                <span v-for="(item, index) in curTitle" :key="item+index">{{ item }}</span>
            </h1>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'printer-page',
        data() {
            return {
                curTitle: '',
                titleArr: ['跟随光，成为光！', '如果没有梦想，和咸鱼有什么区别！'],
                curIndex: 0,
                h1: null,
                spans: null,
                
                textOpen: false,
                textClose: false
            };
        },
        mounted() {
            setTimeout(() => {
                this.initPrinter();
            }, 800);
        },
        methods: {
            /**
             * 初始化打印机
             */
            initPrinter() {
                if (this.curIndex === this.titleArr.length) {
                    this.curIndex = 0;
                    // return;
                }
                this.curTitle = this.titleArr[this.curIndex];
                
                this.$nextTick(() => {
                    this.textOpen = true;
                    this.h1 = document.getElementById('printer-page-h1');
                    this.spans = [...document.querySelectorAll('#printer-page-h1 span')];
                    
                    let delay = 0;
                    this.spans.forEach(val => {
                        delay += 0.14;
                        val.style.setProperty('--delay', `${delay}s`);
                    });
                    // 监听到最后一个span给光标闪动
                    this.h1.addEventListener('animationend', this.goForward);
                });
            },
            
            goForward(e) {
                if (e.target === document.querySelector('#printer-page-h1 span:last-child')) {
                    this.h1.classList.add('ended');
                    
                    setTimeout(() => {
                        this.h1.removeEventListener('animationend', this.goForward);
                        this.h1.classList.remove('ended');
                        
                        this.goBack();
                    }, 1600);
                }
            },
            
            goBack() {
                this.textOpen = false;
                this.textClose = true;
                let goBackDelay = 0;
                this.spans.reverse().forEach(val => {
                    goBackDelay += 0.1;
                    val.style.animationDelay = `${goBackDelay}s`;
                });
                this.h1.addEventListener('animationend', this.textEnd);
            },
            
            textEnd(e) {
                if (e.target === document.querySelector('#printer-page-h1 span:first-child')) {
                    this.curTitle = '';
                    this.h1.removeEventListener('animationend', this.textEnd);
                    this.textClose = false;
                    this.curIndex++;
                    this.initPrinter();
                }
            }
            
        }
    };
</script>

<style scoped>
    #printer-page {
        height: 50vh;
        width: 100%;
        background-color: rgba(0, 0, 0, .1);
        
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    @media screen and (max-device-width: 600px) {
        h1 {
            font-size: 1.2rem;
        }
    }
    
    @media screen and (min-device-width: 600px) {
        h1 {
            font-size: 1.8rem;
        }
    }
    
    h1 {
        margin: 0;
        padding: 0;
        /* 等宽字体 */
        font-family: monospace;
        position: relative;
    }
    
    /* 光标 */
    h1::after {
        content: '';
        display: inline-block;
        position: absolute;
        width: 4px;
        height: 2.2ch;
        background: #000;
        border-radius: 2px;
        right: -0.5ch;
        
        /*animation: 1.1s cursor steps(2, jump-none) infinite;*/
    }
    
    h1.ended::after {
        animation: 1.1s cursor infinite;
    }
    
    @keyframes cursor {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    .text-open span {
        display: inline-block;
        overflow: hidden;
        width: 0;
        
        --delay: 10s;
        animation: 0.1s text-in ease-in-out forwards;
        animation-delay: var(--delay);
    }
    
    .text-close span {
        display: inline-block;
        overflow: hidden;
        width: 2ch;
        
        --delay: 10s;
        animation: 0.1s text-out ease-in-out forwards;
        animation-delay: var(--delay);
    }
    
    @keyframes text-in {
        from {
            width: 0;
        }
        to {
            width: 2ch;
        }
    }
    
    @keyframes text-out {
        from {
            width: 2ch;
        }
        to {
            width: 0;
        }
    }

</style>