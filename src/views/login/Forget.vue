<template>
  <div class="forget">
       <div class = "nav">
        <van-nav-bar
        left-arrow
        @click-left="onClickLeft"
        title="找回密码"
        fixed
        />
    </div>
      <div class="step">
            <van-steps :active="active">
                <van-step>选择验证方式</van-step>
                <van-step>安全验证</van-step>
                <van-step>找回登录密码</van-step>
            </van-steps>
        </div>
    <van-cell-group>
    <van-field
        v-model="sms"
        center
        clearable
 
        placeholder="请输入短信验证码"
    >
        <van-button plain slot="button" size="small" type="primary">立即验证</van-button>
    </van-field>
    </van-cell-group>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { login} from '@/api/api'
export default {
  data() {
      return {
        active: 0,
        password: '',
      }
    },
  created(){
    
  },
  methods: {
    onClickLeft(){
      this.$router.back(-1)
    },
    getSms(){
        this.active = 1
    },
    submitSms(){
        this.active = 2
    },
    submit(){

    }

  },
  mounted () {

  },
  components: {
    
  },
}
</script>


<style scoped lang="stylus" >
  .forget
    .step
      padding: 0 5px
      text-align:left

</style>
