<template lang="html">
  <div class="">
    <h1>Content List</h1>
    <ul>
      <li v-for="item in contentList">
        <router-link :to="{name: 'article', params: {id: item.objectId}}">
          <section class="list-title" v-text="item.title"></section>
          <section class="list-created" v-text="item.createdAt"></section>
          <section class="list-abstract" v-text="item.abstract"></section>
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    contentList () {
      return this.$store.state.contentList.contentList
    }
  },
  created () {
    this.$store.dispatch('getContentList')
  },
  methods: {

  }

}
</script>

<style lang="scss">
</style>
