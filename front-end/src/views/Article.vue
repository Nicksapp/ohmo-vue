<template lang="html">
  <div class="">
    <h1>article</h1>
    <div class="article-wrapper">
      <div v-html="article"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    article () {
      return this.$store.state.article
    }
  },
  created () {
    this.$store.dispatch('getArticle',this.$route.params.id)
  },
  beforeDestroy (){
    this.$store.dispatch('clearArticle')
  },
  methods: {

  }
}
</script>

<style lang="scss">
</style>
