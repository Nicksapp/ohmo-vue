<template>
      <div class="pagination">
          <div v-show="!isFirst" @click="lastPage()" class="new-post">
              <span>←</span> Newer Post 
          </div>
          <span class="page-number">
              Page {{curPage}} of {{allPage}}
          </span>
          <div v-show="isEnd" @click="nextPage()" class="older-post">
              Older Post <span>→</span>
          </div>
      </div>
</template>

<script>
export default {
    data() {
       return {
           isFirst: true,
           page: 1,
           isEnd: true
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
                this.isEnd = false
                this.isFirst = false
            } else {
                this.isFirst = true
                this.isEnd = true
            }
        },
    },
    methods: {
        nextPage() {
            window.scrollTo(0,0)
            this.$store.dispatch('getContentByPage', ++this.page)
        },
        lastPage() {
            window.scrollTo(0,0)
            this.$store.dispatch('getContentByPage', --this.page)
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/components/footer.scss';
</style>