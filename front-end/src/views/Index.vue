<template lang="html">
  <div class="">
    <vHeader :headline="headline"
             :subline="subline"
             :mySrc="imgSrc"/>
  
    <ul class="main-wrapper" id="content">
      <li v-for="item in contentList" class="main-item">
        <router-link :to="{name: 'article', params: {id: item.objectId}}" class="item">
          <section class="list-title" v-text="item.title"></section>
        </router-link>
  
        <section class="list-abstract">
          {{item.abstract}}
          <router-link :to="{name: 'article', params: {id: item.objectId}}">»</router-link>
        </section>
  
        <section class="list-info">
          <section class="list-author" v-text="item.author"></section> |
          <section class="list-created" v-text="item.createdAt"></section>
        </section>
      </li>
    </ul>
  
    <vFooter />
  </div>
</template>

<script>  
  import axios from 'axios'
  import { API_ROOT } from '../config'
  import vHeader from './components/Header.vue'
  import vFooter from './components/Footer.vue'
  
  export default {
    data() {
      return {
        headline: 'Nickj', // 用户名
        subline: '出发之前永远是梦想，上路之后永远是挑战', // 副标题
        imgSrc: null // 头图
      }
    },
    computed: {
      contentList() {
        return this.$store.state.contentList.contentList
      }
    },
    created() {
      var self = this;
      axios.get(API_ROOT + 'api/content/backgroundimg').then(res => {
        let imgURL = res.data
        self.imgSrc = imgURL[Math.floor(Math.random()*(imgURL.length))]
      })
      this.$store.dispatch('getContentByPage', 1)
    },
    components: {
      vHeader,
      vFooter
    }
  }
</script>

<style lang="scss">
@import '../assets/scss/index.scss';
</style>
