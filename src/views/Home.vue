<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div @click="BA_testClick">埋点</div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    // HelloWorld,
  },
  methods: {
    BA_testClick() {
      console.log('success!!!', this.$ba);
      this.$ba.trackEvent('test', '新增', '收入', 100);
    },
  },
};
</script>
