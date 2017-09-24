<template>
    <footer>
      <div class="pagination">
          <div v-show="!isFirst" @click="lastPage()" class="new-post">
              <span>←</span> Newer Post 
          </div>
          <span class="page-number">
              Page {{curPage}} of {{allPage}}
          </span>
          <div v-show="!isEnd" @click="nextPage()" class="older-post">
              Older Post <span>→</span>
          </div>
      </div>
    
      <div class="footer-info">
        <span><strong> <a href="https://github.com/Nicksapp/ohmo-vue">Ohmo</a></strong> © 2017</span>
        <span>Proudly Made By <strong> <a href="https://github.com/Nicksapp">Nickj</a> </strong></span>
      </div>
    </footer>
</template>

<script>
export default {
    data() {
       return {
           isFirst: true,
           page: 1,
           isEnd: false
       } 
    },
    created () {
        this.$store.dispatch('getAllContentList')  
    },
    computed: {
        curPage() {
            return this.$store.state.contentList.curPage
        },
        allPage() {
            let allContentListLength = this.$store.state.contentList.length
            return Math.ceil(allContentListLength/10)
        }
    },
    watch: {
        curPage(value) {
            if (value > 1 && value < this.allPage) {
                this.isFirst = false
            } else if (value === this.allPage) {
                this.isEnd = true
                this.isFirst = false
            } else {
                this.isFirst = true
                this.isEnd = false
            }
        },
    },
    methods: {
        nextPage() {
            this.$store.dispatch('getContentByPage', ++this.page)
        },
        lastPage() {
            this.$store.dispatch('getContentByPage', --this.page)
        }
    }
}
</script>

<style lang="scss">
  footer {
    .pagination {
        position: relative;
        width: 80%;
        max-width: 710px;
        margin: 0 auto 4rem;
        font-family: "Open Sans", sans-serif;
        font-size: 1rem;
        color: #9EABB3;
        text-align: center;
        .page-number {
            display: inline-block;
            padding: 2px 0;
            min-width: 100px;
            line-height: 2rem;
        }
        .older-post {
            color: #9EABB3;
            transition: all .3s ease;
            right: 0;
        }
        .new-post {
            color: #9EABB3;
            transition: all .3s ease;
            left: 0; 
        }
        .older-post, .new-post {
            position: absolute;
            display: inline-block;
            padding: 6px 15px;
            border: #bfc8cd 1px solid;
            border-radius: 4px;
            &:hover {
                color: #889093;
                border-color: #98a0a4;
            }
        }
    }
    .footer-info {
      margin-top: 8rem;
      font-size: .75em;
      color: #BBC7CC;
      display: flex;
      justify-content: space-between;
      padding: 1em 15px;
    }
  }
</style>