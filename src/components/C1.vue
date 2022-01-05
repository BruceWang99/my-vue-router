<template>
   <div class="C1">C1</div>
</template>

<script>
export default {
  name: 'C1',
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
