<template>
  <div class="bot">
   <div class = "nav">
        <van-nav-bar
        @click.native="goback"
        fixed
        left-arrow
        />
    </div>
   <div class="step0" v-if="step==0">
      <van-row type="flex" justify="space-around" style="align-items: center;  ">
        <van-col span="4">机器人</van-col>
        <van-col span="16"><van-field v-model="namevalue" placeholder="请输入名称" /></van-col>
        <van-col span="2"><van-icon name="question-o" /></van-col>
      </van-row>
      <div class="step0-card">
        <van-row type="flex" justify="space-between" style="align-items: center; ">
          <van-col span="6"> <img src="https://img.yzcdn.cn/vant/logo.png" ></van-col>
          <van-col span="15" style="padding-left:20px;text-align: left;">
            <p>机器人：dsfsf</p>
            <p>状态：在线</p>
            <p><van-button plain type="primary" @click="switchrb" size="small">更换机器人</van-button>
            <van-button plain type="primary" size="small" @click="reset">重启机器人</van-button></p>
          </van-col>
        <van-col span="2" @click.native="del"> ✖️ </van-col>
        </van-row>
      </div>
      <van-button type="primary" size="large" style="margin-top:30px" @click="createrb">创建</van-button>
   </div>

   <div class="step1" v-if="step==1">
    <div class="step1-title">创建机器人</div>
    <div class="step1-content">
      <p>两步即可完成创建机器人：</p>
      <ul>
        <li>1.请用另一台设备（可让身边朋友帮忙）拍摄二维码；</li>
        <li>2.再用微信“扫一扫”对着另一台设备拍摄的二维码扫码。</li>   
      </ul>
    <div class="step1-img">
    </div>
    <div class="step1-alert">
      <van-icon name="info" />
      不支持微信内截图/长按识别扫码
    </div>
      <p>小提示：</p>
      <ul>
        <li>1.扫码后，扫码微信号将变成机器人（不影响微信号正常使用）；</li>
        <li>2.若无法完成扫码，请<span style="color:green" @click="gochat">点击联系客服。</span></li>   
      </ul>
    </div>
   </div>


   <div class="step2" v-if="step==2">
    <img src = "https://img.yzcdn.cn/vant/logo.png"> 
    <p> 用机器人的微信号扫描上方二维码（长按识别无效），重新登陆机器人</p>
   </div>

   <div class="step3" v-if = "step==3">
     <div class="step3-title">更换机器人</div>
     <ul>
      <li>注意事项：</li>
      <li>在更换机器人前，请您确保：</li>
      <li>原机器人和替换的机器人微信必须在被管理的微信群里。</li>  
     </ul>

     <ul>
      <li>更换步骤：</li>
      <li>1.点击重启机器人：</li>
      <li>2.在原机器人上微信上取消登陆。</li>  
      <li>3.用替换的机器人微信扫描界面上出现的二维码，即可更换机器人</li>  
      

     </ul>

     <span>注意：更换机器人可能会造成数据，服务异常，请谨慎操作，若无法完成操作，可<span style="color:green">点击联系客服</span></span>
   </div>

  </div>
</template>

<script>
import { Toast,Field ,Dialog} from 'vant';
import { login} from '@/api/api'
export default {
  data() {
      return {
        step:2,
        namevalue:'',
        username: '',
        password: '',
      }
    },
  created(){
    
  },
  methods: {
    createrb(){
      this.step = 1
    },
    switchrb(){
      this.step = 3
    },
    del(){
      Dialog.confirm({
        title: '确定删除',
        message: '删除机器人后，您将自动放弃该机器人所有使用权，机器人和群数据也将被清除，确定删除机器人？'
      }).then(() => {
        // on confirm
      }).catch(() => {
        // on cancel
      });
    },
    reset(){
      Dialog.confirm({
        title: '确定重启',
        message: '重启机器人需要用机器人微信号 扫码/确认登陆，若重启失败，将影响机器人的所有功能正常使用，确定重启机器人吗？'
      }).then(() => {
          this.step = 2
        // on confirm
      }).catch(() => {
      
        // on cancel
      });
    },
    gochat(){

    },
    goback(){
      console.log(this.step)
      switch(this.step) {
        case 0:
         this.$router.back(-1)
         break;
        case 1:
          this.step = 0
        case 2:
          this.step = 0
        case 3:
          this.step = 0
      }
       
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
  .bot
    .nav
      .van-nav-bar
        background:green
        color:#fff
        .van-icon
          color:#fff
    padding:15px
    .step0
      padding:10px
      .step0-card
        img
          width:80px
        p
          line-height: 10px;
    .step1
      font-size:12px
      text-align:left
      .step1-title
        color:green
        padding-bottom:20px
      .step1-alert
        padding-top: 15px 
        color:orange
    .step2
      font-size:14px
      padding:15px
      img
        width:100px
    .step3
      font-size:12px
      padding:15px
      text-align:left
      .step3-title
        color:green
        margin-bottom:25px
      ul
        margin:25px 0 25px 0 



</style>
