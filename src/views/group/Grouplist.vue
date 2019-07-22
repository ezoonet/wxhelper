<template>
  <div class="groupList">
   <div class = "nav">
        <van-nav-bar
        title="添加微信群"
        fixed
        @click.native="goback()"
        left-arrow
        />
    </div>
    <div class="body">
      <van-tabs v-model="active">
        <van-tab title="群成员" >
            <van-search
              v-model="value"
              placeholder="请输入群成员名称"
              show-action
              @cancel="_cancel">
          
              <div slot="action" >
             
                <span @click="_search">搜索</span>             
            </div>
           </van-search>
          </form>
        <p>启用批量踢人功能需将管理员转让给机器人或将机器人设置为微信群管理员</p>
        <div class= "radiobox">
         

         <van-checkbox-group v-model="result">
            <van-checkbox
              v-for="(item, index) in lists"
              :key="index"
              :name="item"
            >
             {{ item.NickName }}
            </van-checkbox>
          </van-checkbox-group>
          <van-button type="primary" plain size="normal" @click="_kick">批量踢人</van-button>

        </div> 

        </van-tab>
      
      <van-tab title="潜水">
        <div >暂未开放</div>
      </van-tab>

      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Toast,Dialog } from 'vant';
import { login} from '@/api/api'
export default {
  data() {
      return {
 
        value:'',
        active:0,
        result: [],
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
    this.getGroupList()
  },
  methods: {
    getGroupList(){
      let obj ={}
      obj.Uin = localStorage['_stock_Uin']
      obj.type = 0
      obj.groupid = this.$route.params.id
      this.$getapi('robot/manageGroup',obj).then(res=>{
        if (res.status == 200 ) {

          this.lists = res.data
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    _kick(){
      if (this.result.length ==0 ) return
      Dialog.confirm({
      title: '提示',
      message: '确定踢人'
    }).then(() => {
      // on confirm
           console.log(this.result)
    }).catch(() => {
      // on cancel
    });
 
    },
    _cancel(){
      // to do 
      // query data
    },
    _refresh(){
      
    },
    _search(){
      if (this.value == '') {
         this.getGroupList()
         return
      }
      let tlist = []
      console.log(this.value)
      this.lists.forEach(v=>{
        console.log(v.name)
        if (v.NickName.indexOf(this.value) !=-1) {
          tlist.push(v)
        }
      })
      if (tlist.length>0) {
        this.lists = tlist
      }
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
  .groupList
    position:absolute
    width:100%
    height:100%
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
</style>
