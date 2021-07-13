<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="balance-o">牌局</van-tabbar-item>
    <van-tabbar-item icon="todo-list-o">备忘录</van-tabbar-item>
  </van-tabbar>
</template>

<script>

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data() {
    return {
      active: ''
    }
  },
  methods: {

  }
}
</script>
