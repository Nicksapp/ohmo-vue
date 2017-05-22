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
      <div class="content" v-html="content"></div>
      
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
    mounted () {
      
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
    @media screen and (max-width: 900px) {
      height: 45vh;
    }
    @media screen and (max-width: 500px) {
      height: 30vh;
    }
    .main-nav {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: inherit;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
    }
  }
  
  .article-wrapper {
    // width: 95%;
    max-width: 710px;
    margin: 4rem auto;
    .title {
      text-align: left;
      color: #2E2E2E;
      font-size: 2.6rem;
      font-weight: bold;
    }
    .content {
      margin: 2rem 1rem;
      font-size: 1.2rem;
      pre {
        margin: 1rem;
        padding: 1rem;
        font: 1.2rem Consolas, "Liberation Mono", Menlo, Courier, monospace;
        background-color: #f7f7f7;
        white-space: pre-wrap;
        overflow: auto;
        max-width: 800px;
      }
      code {
        font: inherit;
        padding: 2px 4px;
        color: #4d4d4c;
        background: #f7f7f7;
        border-radius: 3px;
      }
      table {
        border-collapse: collapse;
        margin-bottom: 1rem;
      }
      td,
      th {
        border: 1px solid #ddd;
        padding: .3rem .6rem;
      }
      tbody tr:nth-child(2n+1) {
        background-color: #f7f7f7;
      }
      a {
        color: #4078c0;
        transition: all;
        &:hover {
          color: #80b2ff;
        }
      }
      img,
      code {
        max-width: 100%;
        margin: 1rem 0;
      }
      h1,
      h2 {
        border-bottom: 1px solid #d2d2d2;
        margin: 1rem 0;
      }
      h3,h4,h5,h6 {
        margin: 1.2rem 0 1rem;
      }
      ul {
        padding-left: 2rem;
      }
      li {
        list-style: disc;
      }
      p,
      li {
        margin-bottom: 1.2rem;
        color: rgba(0, 0, 0, .8);
      }
      blockquote {
        padding: 0 1.5rem;
        margin: 0;
        color: #777;
        border-left: 4px solid #ddd;
      }
    }
  }
</style>
