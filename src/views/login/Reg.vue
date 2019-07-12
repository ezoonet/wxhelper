<template>
  <div class="reg">
    <div class="nav">
        <van-nav-bar
        title="注册"
        fixed
        left-arrow
        @click-left="onClickLeft"
        />
    </div>
        <div class="step">
            <van-steps :active="active">
                <van-step>1.输入手机号</van-step>
                <van-step>2.输入验证码</van-step>
                <van-step>3.设置密码</van-step>
            </van-steps>
        </div>
    <div class="step1" v-if="active==0"> 
        <div class="abox">
            <van-cell-group>
            <van-field v-model="value" placeholder="请输入您的手机号" />
            </van-cell-group>
            <van-button style="margin-top:5px" type="primary" size="large" @click="getSms">获取验证码</van-button>
      </div>
    </div>

    <div class="step2" v-if="active==1">
       <van-cell-group>
            <van-field input-align="center" v-model="value" disabled placeholder="验证短信已发送到xxxx" />
        </van-cell-group>
        <van-button style="margin-top:5px" type="primary" size="large" @click="submitSms">提交验证码</van-button>
   
    </div>

    <div class="step3" v-if="active==2">
         <van-cell-group>
            <van-field    type="password" disabled placeholder="输入密码" />
        </van-cell-group>
         <van-cell-group>
            <van-field  type="password" v-model="password" disabled placeholder="确认密码" />
        </van-cell-group>  
        <div class="memo">密码长度8-32位，须包含数字，字母，符号至少2种以上元素。</div>
      <van-button style="margin-top:5px" type="primary" size="large" @click="submit">确认提交</van-button>
      
    </div>


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
  .reg
    width:100%
    .step
      width:100%
      .van-step
        text-align: left;
    .abox
      padding:5px 10px
    .step2
      padding:5px 5px
    .step3
      .memo
       font-size:12px
       color: #999;

</style>
