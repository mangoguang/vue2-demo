<template>
  <van-overlay class-name="loading" :show="$store.state.isLoading" @click="show = false">
    <van-loading type="spinner" color="#1989fa" />
  </van-overlay>
</template>

<script>
export default {
  name: 'Loading',
};
</script>

<style lang="scss" scoped>
  /deep/ .van-loading {
    top: 50%;
    transform: translateY(-15px);
  }
</style>
