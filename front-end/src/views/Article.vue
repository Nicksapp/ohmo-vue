<template lang="html">
  <div class="" 
       v-loading.fullscreen.lock="loading">
    <header class="a-header" 
            :style="{background: 'url('+article.cover+')' + 'center center / cover', backgroundSize: 'cover'}">
      <nav class="main-nav">
      </nav>
    </header>
    <div class="article-wrapper">
      <div class="title" v-text="article.title"></div>
      <div class="content markdown-body" v-html="content"></div>
      
      <Comment></Comment>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  import Prism from 'prismjs'
  import 'prismjs/themes/prism.css'
  import Comment from './components/Comment.vue'
  
  marked.setOptions({
    highlight: (code) => Prism.highlight(code, Prism.languages.javascript)
  })
  
  export default {
    components: {
      Comment
    },
    computed: {
      article() {
        return this.$store.state.article
      },
      content() {
        let _content = this.article.content
        marked(_content, (err, content) => {
          if (!err) {
            _content = content
          }
        })
        return _content
      },
      loading () {
        return this.$store.state.article.loading
      }
    },
    created () {
      this.$store.dispatch('getArticle', this.$route.params.id)
    },
    beforeDestroy() {
      this.$store.dispatch('clearArticle')
    }
  }
</script>

<style lang="scss">
  @import '../../node_modules/github-markdown-css/github-markdown.css';
  @import '../assets/scss/article.scss';
</style>
