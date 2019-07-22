<template>
  <div class="login">
   <div class = "nav">
        <van-nav-bar
        title="登录"
        fixed
        />
    </div>
    <div class="login-box">
        <van-cell-group style="display:flex;    align-items: center;">
        <van-field
            v-model="username"
            placeholder="请输入手机号"
            label="手机号"
            left-icon="contact"
        />
         <div style="width:50px" >
           <van-button v-if="!inSending" type="primary" size="mini" @click="sendSms">发送</van-button>
           <van-count-down  @finish="timeFinish" format="ss秒" v-else :time="time" />
         </div>
        </van-cell-group>
        <van-cell-group>
        <div style="padding:10px"/>
        <van-field
            v-model="password"
            placeholder="请输入验证码"
            label="验证码"
         
            left-icon="cashier-o"
   
        />
        </van-cell-group>
    </div>
    <div class="button-box">
      <van-button type="primary" size="large" @click="_login">登录</van-button>
    </div>
    <div class="foot-box">
      <van-row>
        <van-col span="8" @click.native="gourl('/reg')">手机快速注册</van-col>
        <van-col span="8"></van-col>
        <van-col span="8" @click.native="gourl('/forget')">忘记密码</van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
 
export default {
  data() {
      return {
        time: 60 * 1000,
        inSending:false,
        username: '',
        password: '',
      }
    },
  created(){
    
  },
  methods: {
    timeFinish(){
      this.time = 60* 1000
      this.inSending = false
    },
    gourl(url){
      console.log(url)
      this.$router.push({
          path: url
        })
    },
    sendSms(){
      if (this.username.length != 11) {
        Toast.fail('手机号错误')
        return 
      }
   
      let obj ={}
      obj.mobile = this.username
      this.inSending = true
      this.$getdevapi('user/sendSms',obj).then(res=>{
            if (res.code == 200 ) {
              Toast.success(res.msg)
            } else {
              Toast.fail(res.msg)
            }
          })
    },
    _login(){
      let obj = {}
      obj.mobile = this.username
      obj.code = this.password
      obj.invite_code = ''
      this.$getapi('user/login',obj).then(res=>{
        if (res.status === 200) {
          localStorage['_stock_token'] = res.data.token
          localStorage['_stock_uid'] = res.data.uid 
          Toast.success('登陆成功！')
          this.$router.push({
              path: '/wx'
            })
        } else {
          Toast.fail(res.msg)
        }
       })
    }
  },
  mounted () {

  },
  components: {
    
  },
}
</script>


<style scoped lang="stylus" >
  .login
    .login-box
      padding:40px 10px
    .button-box
      padding:10px
    .foot-box
      font-size:14px
</style>
