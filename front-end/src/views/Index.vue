<template lang="html">
  <div class="">
    <vHeader />
  
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
    // text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    .main-item {
      width: 80%;
      max-width: 710px;
      margin: 4rem auto;
      text-align: left;
      list-style: none;
      padding-bottom: 4rem;
      position: relative;
      border-bottom: 1px solid #ebf2f6;
      @media only screen and (max-width: 726px) {
        width: auto;
        margin-top: 2rem;
        margin-bottom: 2rem;
        margin-left: 16px;
        margin-right: 16px;
        padding-bottom: 2rem;
      }
      &::after {
        content: '';
        width: 7px;
        height: 7px;
        display: block;
        border: 1px solid #e7eef2;
        position: absolute;
        left: 50%;
        bottom: -5px;
        border-radius: 100%;
        box-shadow: #FFF 0 0 0 5px;
        background-color: #fff;
      }
      .item {
        color: #4A4A4A;
        .list-title {
          font-size: 2.6rem;
          font-weight: bold;
          margin-bottom: .4rem;
          transition: color .3s ease;
          &:hover {
            color: #2E2E2E;
          }
        }
      }
      .list-abstract {
        font-size: 1.2rem;
        line-height: 1.9rem;
        // font-weight: 300;
        padding: .3rem 0 1.2rem 0;
      }
      .list-info {
        font-size: .75rem;
        display: flex;
        color: #8492A6;
        .list-author {
          padding: 0 .5rem 0 0;
        }
        .list-created {
          padding: 0 .5rem;
        }
      }
    }
  }

</style>
