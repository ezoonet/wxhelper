<template>
  <div class="share">
   <div class = "nav">
        <van-nav-bar
        title=""
        fixed
        @click.native="goback"
        left-arrow
        />
    </div>
  <div class="body">
    <span  >推广方式</span>
    <div class="share-link">
      <span>链接推广</span>
      <div class="link-text"> 运营过1000个大煞风景封建时代</div>
      <div class="button">
        <van-button type="primary" plain size="normal" @click="submit">链接推广</van-button>
      </div>
    </div>
   
  <div class="share-pic">
      <p>图片推广</p>
  
        <img src="https://img.yzcdn.cn/vant/logo.png">
 
      <div class="button">
        <van-button type="primary" plain size="normal" @click="submit">图片推广</van-button>
      </div>
    </div>


  </div>
 
    <van-action-sheet 
      title="选择要分享的平台"
      cancel-text="取消分享"
      v-model="popShow"
      @select="onSelect"
    >
    <div class = "share-list">
      <div class="share-card"  v-for="(item,i) in actions" :k=i>
        <img src="https://img.yzcdn.cn/vant/logo.png">
        <span>微信</span>
      </div>
    </div>
    </van-action-sheet>

  </div>
</template>

<script>
import { Toast } from 'vant';
import { login} from '@/api/api'
export default {
  data() {
      return {
        popShow:true,
        username: '',
        password: '',
        message:'',
        actions: [
            { name: '微信',imgUrl:'https://img.yzcdn.cn/vant/logo.png' },
            { name: '朋友圈',imgUrl:'https://img.yzcdn.cn/vant/logo.png'  },
            { name: '微信收藏',imgUrl:'https://img.yzcdn.cn/vant/logo.png'  }
          ]
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
  .share
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
        font-size:14px
      .share-link
        margin-top:20px
        background:#eee
        padding:30px
        .link-text
          margin-top:10px
          padding:15px 10px
          background:#fff
          font-size:12px
        .button
          margin-top:30px
      .share-pic
        padding:30px
        margin-top:20px
        background:#eee
        p
          text-align:left
          font-size:14px
          color:green
        text-align:center
        margin-top:20px
        img
          width:200px
        .button
          text-align:left
   .share-list
      display:flex
      justify-content: space-around;
      img
        width:50px
        height:50px
      .share-card
        padding-top:15px
        display:flex
        flex-direction: column;
        span
          margin-top:10px
          font-size:14px
</style>
