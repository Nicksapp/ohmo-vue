<template>
    <div>
        <ul :class="['nav', { 'nav-fixed': !isTop, 'nav-invisible': !isVisible }]">
            <li>
                <router-link class="item" :to="{name: 'Index'}">主页</router-link>
            </li>
            <li>
                <router-link class="item" :to="{name: 'about'}">关于</router-link>
            </li>
            <li>
                <router-link class="item" :to="{name: 'tags'}">标签</router-link>
            </li>
            <li v-if="isLogin">
                <router-link class="item" :to="{name: 'post'}">发布</router-link>
            </li>
            <li v-if="!isLogin">
                <router-link class="item" :to="{name: 'login'}">登录</router-link>
            </li>
            <li v-else @click="handleLogout()">
                <span class="item">登出</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import router from '../../router'
    export default {
        data() {
            return {
                nav: 'nav',
                isTop: true,
                isVisible: true
            }
        },
        created() {
            this.throttle(this.scroll(), 100, 500)
        },
        computed: {
            isLogin () {
                let flag = sessionStorage.getItem('username')
                let flag02 = this.$store.state.user.isLogin
                if (flag || flag02) {
                    return true;
                } else {
                    return false;
                }
            }  
        },
        methods: {
            scroll() {
                let beforeScrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                window.onscroll = () => {
                    const afterScrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    const delta = afterScrollTop - beforeScrollTop
                    this.isTop = afterScrollTop === 0
                    if (delta === 0) return false
                    beforeScrollTop = afterScrollTop
                    this.isVisible = delta <= 0
                    if (afterScrollTop < 48) {
                        this.isVisible = true
                    }
                }
            },
            handleLogout() {
                this.$store.dispatch('logoutUser')
                router.push({name: 'Index'})
                this.$message({
                    message: '登出成功!',
                    type: 'success'
                });
            },
            throttle (fun, delay, time) {
                var timeout,
                    startTime = new Date();
                return function() {
                    var context = this,
                        args = arguments,
                        curTime = new Date();
                    clearTimeout(timeout);
                    // 如果达到了规定的触发时间间隔，触发 handler
                    if (curTime - startTime >= time) {
                        fun.apply(context, args);
                        startTime = curTime;
                        // 没达到触发间隔，重新设定定时器
                    } else {
                        timeout = setTimeout(fun, delay);
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    .nav {
        position: fixed;
        width: 100%;
        display: flex;
        -webkit-flex-flow: row wrap;
        justify-content: flex-end;
        background-color: rgba(0, 0, 0, 0);
        transition: all .4s;
        list-style: none;
        z-index: 100;
        .item {
            font-size: 1.2rem;
            display: block;
            margin: 0;
            padding: 1rem 1.2rem;
            opacity: 1;
            transition: opacity 0.4s;
            cursor: pointer;
            color: #fff;
        }
    }
    
    .nav-fixed {
        background-color: rgba(255, 255, 255, 0.95);
        border-bottom: 1px solid #bababa;
        z-index: 1;
        .item {
            color: rgba(0, 0, 0, .8);
        }
    }
    
    .nav-invisible {
        transform: translate(0, -4rem)
    }
    
    .nav a:hover {
        opacity: 0.7;
    }
</style>