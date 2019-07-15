<template>
  <div class="suggess">
   <div class = "nav">
        <van-nav-bar
        title=""
        fixed
        @click.native="goback"
        left-arrow
        />
    </div>
  <div class="body">
    <span>意见反馈</span>
    <van-cell-group>
      <van-field
        v-model="message"
        label="内容"
        type="textarea"
        placeholder="请输入要反馈的内容"
        rows="10"
      
      />
    </van-cell-group>
  
    <div class="button">
 
 
      <van-button type="primary" plain size="large" @click="submit">提交</van-button>
    </div>
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
        message:''
      }
    },
  created(){
    
  },
  methods: {
    goback(){
      this.$router.back(-1)
    },
    submit(){

    },
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
  .suggess
    .nav
      .van-nav-bar
        background:green
        .van-icon
          color:#fff
    .body
      text-align:left
      padding:15px
      span
        color:green
        font-size:12px
      .button
        text-align:center

</style>
