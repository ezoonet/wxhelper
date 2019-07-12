<template>
  <div class="login">
   <div class = "nav">
        <van-nav-bar
        title="登录"
        fixed
        />
    </div>
    <div class="login-box">
        <van-cell-group>
        <van-field
            v-model="username"
            value="请输入用户名"
            label="用户名"
            left-icon="contact"
        />
        <div style="padding:10px"/>
        <van-field
            v-model="password"
            value="请输入密码"
            label="登录密码"
            type="password"
            left-icon="cashier-o"
            right-icon="eye"
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
    _login(){
      let obj = {}
      obj.mobile = this.username
      obj.code = this.password
      obj.invite_code = ''
      login(obj).then(res=>{
        if (res.code === 200) {
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
