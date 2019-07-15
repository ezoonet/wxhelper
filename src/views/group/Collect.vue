<template>
  <div class="collect">
   <div class = "nav">
        <van-nav-bar
        title="统计"
        fixed
        @click.native="goback()"
        left-arrow
        />
    </div>
    <div class="body">
      <van-tabs v-model="active">
        <van-tab title="实时">
          <div class="now">
            <van-cell-group>
              <van-switch-cell v-model="yestodayReport" title="昨日体验报告" />
              <span>每天早上08:30-09:30发送到群里</span>
            </van-cell-group>
 
           <van-grid style="font-size:12px;color:green" :column-num="3">
              <van-grid-item   > <p>用户数</p><p>dfss</p> </van-grid-item>
              <van-grid-item   > <p>新增人数</p><p>dfss</p> </van-grid-item>
              <van-grid-item   > <p>离群人数</p><p>dfss</p> </van-grid-item>
              <van-grid-item   > <p>活跃人数</p><p>dfss</p> </van-grid-item>
              <van-grid-item   > <p>消息数</p><p>dfss</p> </van-grid-item>
              <van-grid-item   > <p>连续活跃天数</p><p>dfss</p> </van-grid-item>        
     <!--          <van-grid-item icon="photo-o" text="新增人数" />
             <van-grid-item icon="photo-o" text="离群人数" />
             <van-grid-item icon="photo-o" text="活跃人数" />
             <van-grid-item icon="photo-o" text="消息数" />
             <van-grid-item icon="photo-o" text="连续活跃天数" /> -->
          </van-grid>

          <div class="msgcount">
            <h8>消息统计</h8>
          </div>

          </div>



        </van-tab>
      
      <van-tab title="昨日">
        <div >
           <van-grid style="font-size:12px;color:green" :column-num="3">
              <van-grid-item   > <p>用户数</p><p>dfss</p> </van-grid-item>
              <van-grid-item   > <p>新增人数</p><p>dfss</p> </van-grid-item>
              <van-grid-item   > <p>离群人数</p><p>dfss</p> </van-grid-item>
              <van-grid-item   > <p>活跃人数</p><p>dfss</p> </van-grid-item>
              <van-grid-item   > <p>消息数</p><p>dfss</p> </van-grid-item>
              <van-grid-item   > <p>连续活跃天数</p><p>dfss</p> </van-grid-item>        
     <!--          <van-grid-item icon="photo-o" text="新增人数" />
             <van-grid-item icon="photo-o" text="离群人数" />
             <van-grid-item icon="photo-o" text="活跃人数" />
             <van-grid-item icon="photo-o" text="消息数" />
             <van-grid-item icon="photo-o" text="连续活跃天数" /> -->
          </van-grid>
        </div>
      </van-tab>
       <van-tab title="统计">
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
        yestodayReport:false,
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
  .collect
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
    .msgcount
      background:#fff
      padding:20px
      text-align:left
</style>
