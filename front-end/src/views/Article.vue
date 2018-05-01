<template lang="html">
  <div class="" 
       v-loading.fullscreen.lock="loading">
    <header class="a-header" 
            :style="{background: 'url('+article.cover+')' + 'center center / cover', backgroundSize: 'cover'}">
      <vNav></vNav>
    </header>
    <div class="article-wrapper">
      <div class="title" v-text="article.title"></div>
      <div class="create">{{article.createdAt | handleDateFormat}}</div>
      <div class="content markdown-body" v-html="content"></div>
      
      <Comment></Comment>
    </div>
    <CopyRight />
  </div>
</template>

<script>
  import marked from 'marked'
  import Prism from 'prismjs'
  import 'prismjs/themes/prism.css'
  
  marked.setOptions({
    highlight: (code) => Prism.highlight(code, Prism.languages.javascript)
  })
  
  export default {
    components: {
      'Comment': () => import('./components/Comment.vue'),
      'CopyRight': () => import('./components/CopyRight.vue'),
      'vNav': () => import('./components/Nav.vue')
    },
    computed: Vuex.mapState({
      article: state => state.article,
      loading: state => state.article.loading,
      content(){
        let _content = this.article.content
        marked(_content, (err, content) => {
          if (!err) {
            _content = content
          }
        })
        return _content
      }
    }),
    created() {
      this.$store.dispatch('getArticle', this.$route.params.id)
    },
    beforeDestroy() {
      this.$store.dispatch('clearArticle')
    },
  }
</script>

<style lang="scss">
  @import '../../node_modules/github-markdown-css/github-markdown.css';
  @import '../assets/scss/article.scss';
</style>
