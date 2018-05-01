<template lang="html">
  <div class="my-post">
  
    <el-row class="title-section">
      <el-col :xs="18" :sm="20" :lg="22">
        <div>
          <el-input class="title-input" v-model="title" placeholder="Your Post Title"></el-input>
        </div>
      </el-col>
      <el-col :xs="6" :sm="4" :lg="2">
        <div class="button-section">
          <el-button :disabled="!isLogin" @click="submit()">发布</el-button>
        </div>
      </el-col>
    </el-row>
  
    <el-row class="title-content">
      <el-col :xs="16" :sm="12" :lg="12">
        <div class="grid-content post-section">
          <el-input class="article-textarea" type="textarea" placeholder="请输入内容" v-model="article">
          </el-input>
          <div class="post-info">
            <p>Markdown</p>
            <p>M</p>
          </div>
        </div>
      </el-col>
      <el-col :xs="8" :sm="12" :lg="12">
        <div class="grid-content md-section">
          <div class="md-main markdown-body" v-html="content">
          </div>
          <div class="md-info">
            <p>Preview</p>
            <p>{{words}} words</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import marked from 'marked'
  import Prism from 'prismjs'
  import 'prismjs/themes/prism.css'
  import router from '../router'
  marked.setOptions({
    highlight: (code) => Prism.highlight(code, Prism.languages.javascript)
  })
  
  export default {
    data() {
      return {
        title: '',
        article: ''
      }
    },
    computed: {
      content() {
        let _content = this.article
        marked(_content, (err, content) => {
          if (!err) {
            _content = content
          }
        })
        return _content
      },
      words() {
        const reg = /(\w)|[\u4e00-\u9fa5]/g
        if (this.article) return this.article.match(reg).length
        return 0
      },
      isLogin () {
        let flag = sessionStorage.getItem('username')
        let flag02 = this.$store.state.user.isLogin
        return !!(flag && flag02)
      }  
    },
    created () {
        this.alertWarn('当前只有登录用户可以发布文章');
    },
    methods: {
      submit() {
        if (!this.title.trim() || !this.article.trim()) {
          this.alertWarn('标题或文章不可为空！');
          return
        }
   
        const _postData = {
          "title": this.title,
          "content": this.article,
          "abstract": this.article.slice(0, 100)
        }
        this.$store.dispatch('submitArticle', _postData)
  
        this.title = ''
        this.content = ''
  
        router.push('/')

        this.$message({
            message: '发布成功!',
            type: 'success'
        });
      },
      alertWarn(msg) {
        this.$message({
          message: msg,
          type: 'warning'
        });
      }
    }
  }
</script>

<style lang="scss">
  @import '../../node_modules/github-markdown-css/github-markdown.css';
  @import '../assets/scss/post.scss';
</style>
