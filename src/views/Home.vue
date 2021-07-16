<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div @click="BA_testClick">埋点</div>
    <Tabbar />
  </div>
</template>

<script>
// @ is an alias to /src
import MD5 from 'crypto-js/md5'
import { apiLogin } from '@/apis/common'
import { localStorageKeys } from '@/common/constants'
import { apiCheckUser, apiGetMahjongList } from '@/apis/mahjong'
import Tabbar from '@/components/common/Tabbar';

export default {
  name: 'Home',
  components: {
    Tabbar,
  },
  async mounted() {
    const data = await apiLogin('guang', { password: MD5('427815').toString(), uuid: '123456' })
    localStorage.setItem(localStorageKeys.TOKEN, `Bearer ${data.data.token}`)
    // console.log('?????????????????', data)
    apiCheckUser('mangoguang', { name: 'guang' })
    localStorage.setItem(localStorageKeys.TOKEN, `Bearer ${data.data.token}1`)
    const res = await apiGetMahjongList({ limit1: 100, page1: 1 }, { isLoading: true })
    console.log('返回信息', res)
  },
  methods: {
    BA_testClick() {
      console.log('success!!!', this.$ba);
      this.$ba.trackEvent('test', '新增', '收入', 100);
    },
    login () {
      apiLogin()
    }
  },
};
</script>
