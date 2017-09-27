<template>
  <header>
    <vNav></vNav>
    <div class="img-wrap">
      <img :src="mySrc" />
    </div>
    <div class="text-wrap">
      <h1>{{headline}}</h1>
      <p>{{subline}}</p>
    </div>
  </header>
</template>

<script>
  export default {
    props: ['headline', 'subline', 'mySrc'],
    components: {
      'vNav': () => import('./Nav.vue')
    }
  }
</script>

<style lang="scss" scoped>
@import '../../assets/scss/components/header.scss';
</style>