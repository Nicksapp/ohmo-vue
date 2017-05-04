<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,body,#app {
  width: 100%;
  height: 100%;
  max-height: 100%;
  font-size: 62.5%;
}
a {
  text-decoration: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
@media only screen and (max-width: 726px) {
    html {
       font-size: 75%;
    }
  }
@media only screen and (min-width: 727px) {
    html {
       font-size: 85%;
    }
  }
</style>
