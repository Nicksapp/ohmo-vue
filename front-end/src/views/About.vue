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
            <p>西安电子科技大学 FE 大四 软件学院</p>
            <p><a href="https://github.com/Nicksapp">我的GitHub</a></p>
            <p>微博 <a href="http://weibo.com/516724275">@反贪局局长猴两瓶</a></p>
            <p>本项目源码 <a href="https://github.com/Nicksapp/ohmo-vue">Nicksapp/ohmo-vue</a></p>
        </article>
    </div>
</template>

<script>
    export default {
        components: {
            vNav: function(resolve) {
                require(['./components/Nav'], resolve)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .a-header {
        height: 65vh;
        min-height: 180px;
        background: url(http://bannerdesign.cn/wp-content/uploads/2015/12/2015121211250767.jpeg) no-repeat 50% 100%;
        background-size: cover;
        @media screen and (max-width: 900px) {
            height: 45vh;
        }
        @media screen and (max-width: 500px) {
            height: 30vh;
        }
        .main-nav {
            display: flex;
            justify-content: center;
            align-items: center;
            height: inherit;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
            h1 {
                font-size: 3rem;
                font-weight: 400;
                color: #fff;
                font-family: "Comic Sans MS", curslve, sans-serif;
            }
        }
    }
    article {
        width: 80%;
        margin: 0 auto; 
        font-size: 1.55rem;
        p {
            margin: 1.2rem 0;
        }
    }
</style>