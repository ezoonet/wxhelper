<template>
  <div class="add">
   <div class = "nav">
        <van-nav-bar
        title="添加微信群"
        fixed
        left-arrow
        @click.native="gourl('/wx')"
        />
    </div>
  <div class="body">
    <h4>请选择需要机器人管理的微信群</h4>
    <div class="add-search">
     <van-field v-model="value" placeholder="请输入用户名" />
     <van-button style="margin-right: 8px" type="primary" plain size="small" @click="_search">搜索</van-button>
      <van-button type="primary" plain size="small" @click="refresh">刷新</van-button>
    </div>
    <div class="add-list">

      <van-checkbox-group v-model="result" v-if="list.length>0">
        <van-checkbox
          v-for="(item, index) in list"
          :key="index"
          :name="item.id"
        >
           {{ item.Nickname }}
        </van-checkbox>
      </van-checkbox-group>
      <van-checkbox-group v-else>
        未获取到数据,刷新重试
      </van-checkbox-group>
    </div>
    <div >
       <van-button type="primary" plain size="small" @click="showHelpNoFind=true">未找到要管理的群？</van-button>
    </div>

    <div class="add-footer">
      <div class="add-footer-box">
        <van-radio name="1"  v-model="radio" @click="_selectall">全选</van-radio>
        <van-button type="primary" plain size="small" @click="_commit" >确定</van-button>
       </div>
    </div>

  </div>
  <div class="helpNofind" >
    <van-popup v-model="showHelpNoFind">
      <h3>怎样找到未发现的群？</h3>
      <ul>
        <li>1.首先将机器人拉到需要管理的群里。</li>
        <li>2.然后在群里任意发布一条消息，再点击刷新重试</li>
      </ul>
    </van-popup>
  </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { login} from '@/api/api'
export default {
  data() {
      return {
        radio:1,
        showHelpNoFind:false,
        list: [],
        result: [],
        value:'',
        username: '',
        password: '',
      }
    },
  created(){
    if (!localStorage['_stock_Uin']) {
      Toast.fail('请先登陆机器人')
      this.$router.back(-1)
      return
    }
    this._getGroupList()
  },
  methods: {
    _setGroupInManage(){
        let obj ={}
        obj.Uin = localStorage['_stock_Uin']
        obj.type = 2
        obj.idList = this.result
        this.$getapi('robot/dogroup',obj).then(res=>{
          if (res.status==200) {
            Toast.success('成功')
          } else {
            Toast.fail('无改变')
          }
        })
    },
    _getGroupList(){
      let obj ={}
      obj.Uin = localStorage['_stock_Uin']
      obj.type = 0
      this.$getapi('robot/dogroup',obj).then(res=>{
            if (res.status == 200 ) {
              this.list = res.data
              // this.list = []
              // res.data.forEach(v=>{
          
              //   this.list.push(v.Nickname)
              // })
            } else {
              Toast.fail(res.msg)
            }
          })
    },
    _selectall(){
   
      if (this.result.length==0) {
        this.result =[]
        this.list.forEach(v=>{
         this.result.push(v.id)
        })
        this.radio= '1'
      } else {
        this.result =[]
        this.radio= '0'
      }
 
    },
    _commit(){
      if (this.result.length ==0) {
        Toast.fail('请先选择')
        return
      }
 
      this._setGroupInManage()
    },
    refresh(){
      console.log('refresh')
      this._getGroupList()
    },
    _search(){
      if (this.value== '') {
        console.log('refresh')
      } else {
        let tlist = []
        this.list.forEach(v=>{
     
          if (v.Nickname.indexOf(this.value) != -1) {
            tlist.push(v)
          }
        })
        if (tlist.length>0) {
           this.list = tlist     
        } 
      }


    },
    onClickLeft(){
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
  .add
    .nav
      background: green
    .body
      font-size:14px
      .add-search
        padding:0 15px 
        display: flex;
        align-items: center;
      .add-list
        padding: 20px 50px
      .add-footer
        position: fixed;
        width: 100%;
        bottom: 10px;
        .add-footer-box
          display: flex;
          justify-content: space-between;
          padding: 0 20px
  .helpNofind
    .van-popup
      text-align:left
      width:80%
      padding:5% 6% 10% 6%
</style>
