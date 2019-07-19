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
      <div class="help-text1">小贴士：点击“侧边栏”尝试更多功能，再来阅读用户指南，可以更加快捷熟悉各种功能哦。</div>
      <div class="help-text2">
        <ul>
          <li>1.工具简介及功能介绍</li>
          <li>2.机器人使用攻略</li>      
          <li>3.常见问题</li>
       </ul>
      </div>
      <div class="help-title">基础功能介绍</div>
      <div class="help-text2">
        <ul>
          <li>1.如何使用素材管理？</li>
          <li>2.如何使用群发管理？</li>      
          <li>3.如何删除群？</li>
       </ul>
      </div>
      <div class="help-title">群聊功能介绍</div>
      <div class="help-text2">
        <ul>
          <li>1.如何统计群内数据？</li>
          <li>2.如何设置自动回复？</li>      
          <li>3.如何设置管理员</li>
          <li>4.如何踢人？</li>    
       </ul>
      </div>

    </div>
 <!--弹出层-->
 
    <van-popup position="left" v-model="showPop">
     <div class="pop">
        <div class="pop-top">
          <img src="https://img.yzcdn.cn/vant/logo.png">
            <van-button type="primary" plain size="normal" @click="logout">注销账户</van-button>
        </div>
        <van-divider />
      <div class="pop-body">
          <van-cell-group>
            <van-cell @click="gourl('/botconf')" title="机器人配置" icon="location-o" />
            <van-cell @click="gourl('/share')" title="分享应用" icon="location-o" />
            <van-cell @click="gourl('/suggess')"  title="意见反馈" icon="location-o" />
          </van-cell-group>
        </div>
      </div>
    </van-popup>
 

    <div class="fun-box" v-if="!showHelp">
        <div class="fun-box-manager">
            <van-row type="flex">
                <van-col span="8" @click.native="gourl('/media')">
                  <van-icon name="video-o" />
                  <span>素材管理</span>
                </van-col>
                <van-col span="8"></van-col>
                <van-col span="8"  @click.native="gourl('/groupsend')">
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
        <div class = "group-list" >

          <van-collapse v-model="activeName" accordion v-if="groupList.length>0">

            <van-collapse-item :title="item.Nickname" :name="item.id"  v-for="(item,i) in groupList" :key = i>
              <div>
                <van-grid :column-num="2">
                  <van-grid-item
                    icon="photo-o"
                    text="群成员管理"
                    @click="gourl('/grouplist/'+item.id)"
                  />
                <van-grid-item
                    @click="gourl('/kick/'+item.id)"
                    icon="photo-o"
                    text="踢人"
                  />
                <van-grid-item
                   @click="gourl('/reply/'+item.id)" 
                    icon="photo-o"
                    text="自动回复"
                  />
                <van-grid-item
                     @click="gourl('/collect/'+item.id)" 
                    icon="photo-o"
                    text="数据分析"
                  /> 
                </van-grid>
            </div>
            </van-collapse-item>
          </van-collapse>
          <div style="text-align: center;padding:20px 0 " v-else>请先配置机器人</div>
        </div>

        <div class="button-box">
          <van-button type="primary" plain size="large" @click="gourl('/add')">添加微信群</van-button>
        </div>
    </div>
  </div>
</template>

<script>
import { Toast,Dialog } from 'vant';
import { login} from '@/api/api'
export default {
  data() {
      return {
        showHelp:false,
        showPop:false,
        value: '',
        activeName: '0',
        serverList:[],
        groupList:[]
      }
    },
  created(){
    // this.groupList = this.serverList
    if (!localStorage['_stock_Uin']) {
      Dialog.confirm({
        title: '提示',
        message: '您尚未登陆机器人，前往登陆？'
      }).then(() => {
        this.gourl('/botconf')
        // on confirm
      }).catch(() => {
        // on cancel
      });
      
    } else {
       this._getGroupList()
    }

  },
  methods: {
    _getGroupList(){
      let obj ={}
      obj.Uin = localStorage['_stock_Uin']
      obj.type = 0
      obj.inManage = 1
      this.$getapi('robot/dogroup',obj).then(res=>{
            if (res.status == 200 ) {
              this.groupList = res.data
            } else {
              Toast.fail(res.msg)
            }
          })
    },
    logout(){
      Dialog.confirm({
        title: '提示',
        message: '退出登录将无法使用机器人，无法使用群管理功能，是否确定退出？'
      }).then(() => {
        localStorage.clear()
        this.gourl('/')
        // on confirm
      }).catch(() => {
        // on cancel
      });
    },

    onSearch(){
      if (this.value == '') {
         this.groupList = this.serverList
      } else {
        let tlist = []
        this.serverList.forEach(v=>{
          console.log(v.name)
          if (v.name.indexOf(this.value) !=-1) {
            tlist.push(v)
          }
        })
        if (tlist.length >0 ) this.groupList = tlist
      }
     
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
    .help
      text-align:left
      .help-title
        color:green
        padding:10px 0px 40px 0 
      .help-text1
        font-size:12px
        padding-bottom:15px
        color:#666
      .help-text2
        font-size:12px
        li
          padding-bottom:5px

      
</style>
