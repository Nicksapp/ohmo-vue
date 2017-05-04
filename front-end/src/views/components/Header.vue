<template>
  <header>
    <ul :class="['nav', { 'nav-fixed': !isTop, 'nav-invisible': !isVisible }]">
      <li>
        <router-link class="item" to="/home">主页</router-link>
      </li>
      <li>
        <router-link class="item" to="/about">关于</router-link>
      </li>
      <li>
        <router-link class="item" to="/tags">标签</router-link>
      </li>
    </ul>
    <div class="img-wrap">
      <img src="http://of30nsqpd.bkt.clouddn.com/2015061101335924.jpeg" />
    </div>
    <div class="text-wrap">
      <h1>Nickj</h1>
      <p>出发之前永远是梦想，上路之后永远是挑战</p>
    </div>
  </header>
</template>

<script>
  export default {
    data() {
      return {
        nav: 'nav',
        isTop: true,
        isVisible: true,
      }
    },
    created() {
      this.scroll()
    },
    methods: {
      scroll() {
        let beforeScrollTop = document.body.scrollTop
        window.onscroll = () => {
          const afterScrollTop = document.body.scrollTop
          const delta = afterScrollTop - beforeScrollTop
          this.isTop = afterScrollTop === 0
          if (delta === 0) return false
          beforeScrollTop = afterScrollTop
          this.isVisible = delta <= 0
          if (afterScrollTop < 48) {
            this.isVisible = true
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
    .item {
      font-size: 1rem;
      color: #fff;
    }
  }
  
  .nav-fixed {
    background-color: rgba(255, 255, 255, 0.95);
    border-bottom: 1px solid #bababa;
    .item {
      color: rgba(0, 0, 0, .8);
    }
  }
  
  .nav-invisible {
    transform: translate(0, -4rem)
  }
  
  .nav a {
    font-size: 1rem;
    display: block;
    margin: 0;
    padding: .8rem 1.2rem;
    opacity: 1;
    transition: opacity 0.4s;
    cursor: pointer;
  }
  
  .nav a:hover {
    opacity: 0.7;
  }
  
  header {
    position: relative;
    max-height: 100vh;
    .img-wrap {
      display: inline-block;
      width: 100%;
      max-height: 100vh;
      img {
        width: 100%;
        max-height: inherit;
        max-width: 100%;
        vertical-align: middle;
      }
    }
    .text-wrap {
      position: absolute;
      color: #fff;
      text-align: center;
      max-width: 94%;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      h1 {
        font-size: 3.2rem;
      }
      p {
        font-size: 1.2rem;
      }
    }
  }
</style>