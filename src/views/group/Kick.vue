<template>
  <div class="kick">
   <div class = "nav">
        <van-nav-bar
        title="踢人管理"
        fixed
        @click.native="goback()"
        left-arrow
        />
    </div>
    <div class="body">
      <van-tabs v-model="active">
        <van-tab title="踢人">
        
        <p>启用批量踢人功能需将管理员转让给机器人或将机器人设置为微信群管理员</p>
        <van-cell-group>
          <van-switch-cell v-model="autoValue" @change="setAutoKick" title="机器人自动踢人" />
        </van-cell-group>
         
        <van-cell-group>
          <van-switch-cell v-model="keyValue" title="关键词自动踢人" />
        </van-cell-group>
        <van-cell-group>
          <p>最近48小时踢人记录</p>
          <div class="kick-list">
              <van-row>
                  <van-col span="6">成员名称</van-col>
                  <van-col span="6">被踢方式</van-col>
                  <van-col span="6">被踢时间</van-col>
                  <van-col span="6">操作</van-col>            
               </van-row>
                <van-row>
                  <van-col span="6">卅饭店</van-col>
                  <van-col span="6">冯绍峰的</van-col>
                  <van-col span="6">被踢时间</van-col>
                  <van-col span="6">加入黑名单</van-col>            
               </van-row>
            </div>
        </van-cell-group>   
       

        </van-tab>
      
      <van-tab title="黑名单">
        <div >
         <van-cell-group>
          <h4>黑名单记录</h4>
          <div class="kick-list">
              <van-row>
                  <van-col span="6">成员名称</van-col>
                  <van-col span="6">被踢方式</van-col>
                  <van-col span="6">被踢时间</van-col>
                  <van-col span="6">操作</van-col>            
               </van-row>
                <van-row>
                  <van-col span="6">卅饭店</van-col>
                  <van-col span="6">冯绍峰的</van-col>
                  <van-col span="6">被踢时间</van-col>
                  <van-col span="6">解除黑名单</van-col>            
               </van-row>
            </div>
        </van-cell-group>   </div>
      </van-tab>

      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { login} from '@/api/api'
export default {
  data() {
      return {
        autoValue:false,
        keyValue:false,
        active:0,
        id:this.$route.params.id,
        result: '',
        radio:0,
        lists:[{
          name:'sfsdfs',
          id:1
        },{
          name:'sdfsdfsdf',
          id:2
        }
        ],
        icon: {
          active: 'https://img.yzcdn.cn/vant/user-active.png',
          inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
        },
        username: '',
        password: '',
      }
    },
  created(){
    this.getValue()
  },
  methods: {
    getValue(){
      let obj ={}
      obj.uid = localStorage['_stock_uid']
      obj.type = 0
      obj.name = 'autoKick'
      this.$getapi('other/manageConfig',obj).then(res=>{
            if (res.status == 200 ) {
               this.autoValue = res.data =='1'? true:false
            } else {
              Toast.fail(res.msg)
            }
          })
    },
    setAutoKick(){
      let obj ={}
      obj.uid = localStorage['_stock_uid']
      obj.type = 2
      obj.name = 'autoKick'
   
      obj.value = this.autoValue == true ? '1':'0'
      this.$getapi('other/manageConfig',obj).then(res=>{
            if (res.status == 200 ) {
               Toas.success('ok')
            } else {
              Toast.fail(res.msg)
            }
          })
    },
    goback(){
      this.$router.back(-1)
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
  .kick
    position:absolute
    width:100%
    height:100%
    background:#eee
    .nav
      background: green
    .body
      padding:15px
      font-size:14px
      p
        padding: 0px 10px
        text-align: left
      .radiobox
        width:100%
        .van-checkbox-group
          padding: 15px
          .van-checkbox
            padding:5px
    .van-row
      padding-top:5px
</style>
