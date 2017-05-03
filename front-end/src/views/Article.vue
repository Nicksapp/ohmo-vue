<template lang="html">
  <div class="">
    <header class="a-header">
      <nav class="main-nav">
      </nav>
    </header>
    <div class="article-wrapper">
      <div class="title" v-text="article.title"></div>
      <div class="content" v-text="article.content"></div>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    computed: {
      article() {
        return this.$store.state.article
      }
    },
    created() {
      this.$store.dispatch('getArticle', this.$route.params.id)
    },
    beforeDestroy() {
      this.$store.dispatch('clearArticle')
    }
  }
</script>

<style lang="scss">
  .a-header {
    height: 65vh;
    min-height: 180px;
    background: #222 url(https://drscdn.500px.org/photo/112353591/q%3D80_m%3D2000/c4d20edc117ef574780d90b3b69783da) no-repeat center center;
    background-size: cover;
    .main-nav {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: inherit;
      background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0) 100%);
    }
  }
  .article-wrapper {
    width: 80%;
    max-width: 710px;
    margin: 4rem auto;
    .title {
        text-align: left;
        color: #2E2E2E;
        font-size: 2.6rem;
        font-weight: bold;
        font-family: "Open Sans", sans-serif;
      }
      .content {
        margin-top: 3.4rem;
        font-size: 1.2rem;
      }
  }
</style>
