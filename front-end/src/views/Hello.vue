<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><div class="color hot"></div></li>
      <li><div class="color cloudy"></div></li>
      <li><div class="color breezy"></div></li>
      <li><div class="color night"></div></li>
      <li><div class="color stormy"></div></li>
      <br>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.hello {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom right,
    #2C3E50, #FD746C,
    #FF8235, #ffff1c,
    #92FE9D, #00C9FF,
    #a044ff, #e73827);
  background-repeat: no-repeat;
  background-size: 1000% 1000%;
  animation: gradient 240s ease infinite;
}
@keyframes gradient {
  0%{background-position:0% 0%}
  50%{background-position:100% 100%}
  100%{background-position:0% 0%}
}

.color {
  width: 120px;
  height: 200px;
  border-radius: 6px;
}
.hot {
  background: linear-gradient(to top right, rgba(255,87,34,1) 0%, rgba(251,140,0,1) 100%);
  box-shadow: 1px 1px 30px rgba(255,111,0,1);
}
.cloudy {
  background: linear-gradient(to top right, rgba(63,81,181,1) 0%, rgba(3,155,229,1) 80%);
  box-shadow: 1px 1px 30px rgba(2,119,189,1);
}
.breezy {
  background: linear-gradient(to top right, rgba(156,204,101,1) 0%, rgba(38,198,218,1) 50%);
  box-shadow: 1px 1px 30px rgba(38,198,218,1);
}
.night {
  background: linear-gradient( to bottom right,rgba(63,81,181,1) 0%, rgba(171,71,188 ,1) 70%);
	box-shadow: 1px 1px 30px rgba(81,45,168 ,1);
}
.stormy {
  background:linear-gradient( to top right,rgba(117,117,117 ,1) 0%, rgba(33,33,33 ,1) 90%);
	box-shadow: 1px 1px 30px rgba(33,33,33 ,1);
}


h1, h2 {
  font-weight: normal;
  color: #fff;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

</style>
