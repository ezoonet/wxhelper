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
        <van-tab title="群成员">
          <form action="/">
            <van-search
              v-model="value"
              placeholder="请输入群成员名称"
              show-action
              @search=""
              @cancel=""
            />
          </form>
        <p>启用批量踢人功能需将管理员转让给机器人或将机器人设置为微信群管理员</p>
        <div class= "radiobox">
         

         <van-checkbox-group v-model="result">
            <van-checkbox
              v-for="(item, index) in lists"
              :key="index"
              :name="item.name"
            >
              复选框 {{ item.name }}
            </van-checkbox>
          </van-checkbox-group>
          <van-button type="primary" plain size="normal" @click="">批量踢人</van-button>

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
import { Toast } from 'vant';
import { login} from '@/api/api'
export default {
  data() {
      return {
        id:this.$route.params.id,
        value:'',
        active:0,
        result: ['a', 'b'],
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
    
  },
  methods: {
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
</style>
