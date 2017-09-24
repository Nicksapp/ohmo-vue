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
      vNav: function(resolve) {
        require(['./Nav'], resolve)
      }
    }
  }
</script>

<style lang="scss" scoped>
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