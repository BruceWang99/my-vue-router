<template>
  <div id="app">
     <router-link to="/C1">Go to C1</router-link>
     <router-link to="/C2">Go to C2</router-link>
     <Button @click="testPush('/C1')">测试push方法(c1)</Button>
     <Button @click="testPush('/C2')">测试push方法(c2)</Button>
     <Button @click="testReplace('/C2')">测试replace方法(C2)</Button>
     <Button @click="testReplace('/C1')">测试replace方法(C1)</Button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  mounted () {
    console.log('asdfasd', this)
  },
  methods:  {
    testPush (path) {
      this.$router.push(path);
    },
    testReplace (path) {
      this.$router.replace(path);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
