<template>
  <div class="add">
   <div class = "nav">
        <van-nav-bar
        title="添加微信群"
        fixed
        left-arrow
        />
    </div>
  <div class="body">
    <h4>请选择需要机器人管理的微信群</h4>
    <van-cell-group>
 
     <van-button type="primary" plain size="normal" @click="">注销账户</van-button>
      <van-button type="primary" plain size="normal" @click="">注销账户</van-button>
    </van-cell-group>
  </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { login} from '@/api/api'
export default {
  data() {
      return {
        username: '',
        password: '',
      }
    },
  created(){
    
  },
  methods: {
    gourl(url){
      console.log(url)
      this.$router.push({
          path: url
        })
    },
   
  },
  mounted () {

  },
  components: {
    
  },
}
</script>


<style scoped lang="stylus" >
  .add
    .nav
      background: green
    .body
      font-size:14px
</style>
