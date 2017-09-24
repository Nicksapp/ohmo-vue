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
          <el-button @click="submit()">发布</el-button>
        </div>
      </el-col>
    </el-row>
  
    <el-row>
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
          <div class="md-main" v-html="content">
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
      }
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
          "abstract": this.article.slice(0, 50)
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
  $borderColor: #C0CCDA;
  $titleHeight: 8vh;
  $mainHeight: 100vh-$titleHeight;
  .my-post {
    overflow-x: hidden;
    overflow-y: hidden;
    .title-section {
      border-bottom: 1px solid $borderColor;
      .title-input {
        height: $titleHeight;
        input {
          height: inherit;
          font-size: 1.5rem;
          font-weight: bold;
          border: none;
          border-radius: 0;
        }
      }
      .button-section {
        height: $titleHeight;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        button {
          width: 8rem;
          padding: 8px 15px;
          border-radius: 3px;
        }
      }
    }
    .grid-content {
      height: $mainHeight;
    }
    .post-section {
      border-right: 1px solid $borderColor;
      .article-textarea {
        height: 92%;
        textarea {
          height: 100%;
          border: none;
          border-radius: 0;
          resize: none;
        }
      }
    }
    .md-section {
      .md-main {
        box-sizing: border-box;
        height: 92%;
        overflow-y: scroll;
        padding: 5px 7px;
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
        h3,
        h4,
        h5,
        h6 {
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
    .post-info,
    .md-info {
      font-size: .8rem;
      font-weight: bold;
      height: 8%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      border-top: 1px solid $borderColor;
    }
    .bg-purple {
      background: #d3dce6;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
  }
</style>
