<template>
    <div>
        <vNav></vNav>
        <header class="a-header">
            <nav class="main-nav">
                <h1>About Me</h1>
            </nav>
        </header>
        <article>
            <p> <strong>Nickj</strong>  </p>
            <p><a href="https://github.com/Nicksapp">我的GitHub</a></p>
            <p>本项目源码 <a href="https://github.com/Nicksapp/ohmo-vue">Nicksapp/ohmo-vue</a></p>
        </article>

        <CopyRight />
    </div>
</template>

<script>
    export default {
        components: {
            'vNav': () => import('./components/Nav'),
            'CopyRight': () => import('./components/CopyRight.vue')
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/scss/about.scss';
</style>