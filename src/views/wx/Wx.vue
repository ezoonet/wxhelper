<template>
  <div class="wx">
    <div class="nav">
     <van-nav-bar  fixed >
        <van-icon name="label-o" size="20px"  @click="showPop=!showPop" slot="left" />
        <van-icon name="question-o" size="20px"  slot="right" @click="showHelp=!showHelp" />
     </van-nav-bar>
    </div>
     <!--帮助层-->
    <div class="help" v-if="showHelp">
      <div class="help-title">新手指南</div>
      <div class="help-text">sdfsdfs</div>
    </div>
 <!--弹出层-->
 
    <van-popup position="left" v-model="showPop">
     <div class="pop">
        <div class="pop-top">
          <img src="https://img.yzcdn.cn/vant/logo.png">
            <van-button type="primary" plain size="normal" @click="">注销账户</van-button>
        </div>
        <van-divider />
      <div class="pop-body">
          <van-cell-group>
            <van-cell title="机器人配置" icon="location-o" />
            <van-cell title="分享应用" icon="location-o" />
            <van-cell title="意见反馈" icon="location-o" />
          </van-cell-group>
        </div>
      </div>
    </van-popup>
 

    <div class="fun-box" v-if="!showHelp">
        <div class="fun-box-manager">
            <van-row type="flex">
                <van-col span="8">
                  <van-icon name="video-o" />
                  <span>素材管理</span>
                </van-col>
                <van-col span="8"></van-col>
                <van-col span="8">
                  <van-icon name="cluster-o" />
                  <span>群发管理</span>
                </van-col>
            </van-row>
        </div>
        <div class="fun-box-search">
          <van-search
            v-model="value"
            placeholder="请输入群名称"
            show-action
            shape="round"
            @search="onSearch"
          >
            <div slot="action" @click="onSearch">搜索</div>
          </van-search>
        </div>
        <div class = "group-list">
          <van-collapse v-model="activeName" accordion>
            <van-collapse-item title="标题1" name="1">内容</van-collapse-item>
            <van-collapse-item title="标题2" name="2">内容</van-collapse-item>
            <van-collapse-item title="标题3" name="3">内容</van-collapse-item>
          </van-collapse>
        </div>

        <div class="button-box">
          <van-button type="primary" plain size="large" @click="gourl('/add')">添加微信群</van-button>
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
        showHelp:false,
        showPop:false,
        value: '',
        activeName: '',
      }
    },
  created(){
    
  },
  methods: {
    onSearch(){

    },
    gourl(url){
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
  .wx
    padding:0 20px
    .nav
      .van-nav-bar
        background:green 
        .van-icon
          color:#fff
    .fun-box
      .fun-box-manager
        border: 1px solid #eee;
        padding:30px 20px
      .fun-box-search
        margin-top: 20px
        border: 1px solid #eee
      .group-list
        text-align: left
    .van-popup
      width:80%
      height:100%
      .pop-top
        text-align:center
        display: flex;
        align-items: center;
        flex-direction: column;
        padding:10px
        img
          margin:20px
          width:100px
      .pop-body
        padding-left:5px
        text-align:left
      
</style>
