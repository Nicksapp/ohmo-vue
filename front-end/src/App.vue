<template>
  <div id="app">
    <transition name="fade">
      <router-view class="router-view"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
@import './assets/scss/app.scss';
</style>
