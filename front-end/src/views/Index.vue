<template lang="html">
  <div class="">
    <vHeader />
  
    <ul class="main-wrapper">
      <li v-for="item in contentList" class="main-item">
        <router-link :to="{name: 'article', params: {id: item.objectId}}" class="item">
          <section class="list-title" v-text="item.title"></section>
          <section class="list-abstract" v-text="item.abstract"></section>
          <section class="list-info">
            <section class="list-author">Nickj</section> |
            <section class="list-created" v-text="item.createdAt"></section>
          </section>
        </router-link>
      </li>
    </ul>
  
    <vFooter />
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  
  import vHeader from './components/Header.vue'
  import vFooter from './components/Footer.vue'
  
  export default {
    computed: {
      contentList() {
        return this.$store.state.contentList.contentList
      }
    },
    created() {
      this.$store.dispatch('getContentList')
    },
    components: {
      vHeader,
      vFooter
    }
  }
</script>

<style lang="scss">
  .main-wrapper {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1em;
    .main-item {
      width: 90vh;
      text-align: left;
      padding: 1em 0;
      list-style: none;
      &::after {
        content: '';
        width: inherit;
        height: 1px;
        display: block;
        background-color: #EFF2F7;
        margin-top: 2em;
      }
      .item {
        color: #1F2D3D;
        .list-title {
          font-size: 1.5em;
          font-weight: 600;
        }
        .list-abstract {
          font-size: 1em;
          font-weight: 300;
          padding: .3em 0 1.2em 0;
        }
        .list-info {
          font-size: .75em;
          display: flex;
          color: #8492A6;
          .list-author {
            padding: 0 .5em 0 0;
          }
          .list-created {
            padding: 0 .5em;
          }
        }
      }
    }
  }
  
</style>
