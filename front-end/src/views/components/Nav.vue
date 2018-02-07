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
            <li>
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
            this.scroll()
        },
        computed: {
            isLogin () {
                let flag = sessionStorage.getItem('username')
                let flag02 = this.$store.state.user.isLogin
                return !!(flag && flag02)
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
            }
        }
    }
</script>

<style lang="scss">
@import '../../assets/scss/components/nav.scss';
</style>