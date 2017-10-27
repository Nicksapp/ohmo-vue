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
      <div class="create"  v-text="handleDateFormat(article.createdAt)"></div>
      <div class="content markdown-body" v-html="content"></div>
      
      <Comment></Comment>
    </div>
    <CopyRight />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import marked from 'marked'
  import Prism from 'prismjs'
  import 'prismjs/themes/prism.css'
  
  marked.setOptions({
    highlight: (code) => Prism.highlight(code, Prism.languages.javascript)
  })
  
  export default {
    components: {
      'Comment': () => import('./components/Comment.vue'),
      'CopyRight': () => import('./components/CopyRight.vue')
    },
    computed: mapState({
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
    methods: {
      handleDateFormat(date) {
        const myDate = date || '';
        if (myDate) {
          let time = myDate.split('-');
          switch (time[1]) {
            case '01': time[1] = 'January'; break;
            case '02': time[1] = 'February'; break;
            case '03': time[1] = 'March'; break;
            case '04': time[1] = 'April'; break;
            case '05': time[1] = 'May'; break;
            case '06': time[1] = 'June'; break;
            case '07': time[1] = 'July'; break;
            case '08': time[1] = 'August'; break;
            case '09': time[1] = 'September'; break;
            case '10': time[1] = 'October'; break;
            case '11': time[1] = 'November'; break;
            case '12': time[1] = 'December'; break;
          }
          return time[2] + " " + time[1] + " " + time[0];
        }
        return myDate;
      }
    }
  }
</script>

<style lang="scss">
  @import '../../node_modules/github-markdown-css/github-markdown.css';
  @import '../assets/scss/article.scss';
</style>
