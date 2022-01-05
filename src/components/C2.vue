<template>
   <div class="C2">C2</div>
</template>

<script>
export default {
  name: 'C2',
  components: {},
  data () {
    return {}
  },
  beforeRouteLeave(to, from, next) {
    console.log('asdfasfsa_ beforeRouteLeave');
    next();
  },
}
</script>

<style lang='scss' scoped>
</style>
