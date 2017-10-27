<template>
  <header>
    <vNav></vNav>
    <div class="img-wrap">
      <img :src="mySrc" />
    </div>
    <div class="text-wrap">
      <h1 class="shaddow">{{headline}}</h1>
      <p class="shadow-light">{{subline}}</p>
    </div>
    <div class="pointer-wrap" @click="scrollDown()">
      <i class="el-icon-arrow-down"></i>
    </div>
  </header>
</template>

<script>
  export default {
    props: ['headline', 'subline', 'mySrc'],
    components: {
      'vNav': () => import('./Nav.vue')
    },
    methods: {
      scrollDown() {
        window.scrollTo(0, 800);
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../assets/scss/components/header.scss';
</style>