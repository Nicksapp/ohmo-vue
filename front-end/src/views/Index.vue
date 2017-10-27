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
          <section class="list-author" v-text="item.author"></section> 
          <section class="list-created" v-text="handleDateFormat(item.createdAt)"></section>
        </section>
      </li>
    </ul>
  
    <vFooter />
  </div>
</template>

<script>  
  import axios from 'axios'
  import { API_ROOT } from '../config'
  import { mapState } from 'vuex'

  export default {
    components: {
      'vHeader': () => import('./components/Header.vue'),
      'vFooter': () => import('./components/Footer.vue')
    },
    data() {
      return {
        headline: 'Nickj', // 用户名
        subline: '出发之前永远是梦想，上路之后永远是挑战', // 副标题
        imgSrc: null // 头图
      }
    },
    computed: mapState({
      contentList: state => state.contentList.contentList
    }),
    created() {
      var self = this;
      axios.get(API_ROOT + 'api/content/backgroundimg').then(res => {
        let imgURL = res.data
        self.imgSrc = imgURL[Math.floor(Math.random()*(imgURL.length))]
      })
      this.$store.dispatch('getContentByPage', 1)
    },
    methods: {
      handleDateFormat(date) {
        const myDate = date || '';
        if (myDate) {
          let dateSection = myDate.split(" ");
          let time = dateSection[0].split("-");
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
@import '../assets/scss/index.scss';
</style>
