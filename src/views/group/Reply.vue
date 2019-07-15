<template>
  <div class="reply">
   <div class = "nav">
        <van-nav-bar
        title="回复管理"
        fixed
        @click.native="goback()"
        left-arrow
        />
    </div>
    <div class="body" v-if="!showAdd">
      <van-tabs v-model="active">
        <van-tab title="新人入群">
               <van-cell-group>
                  <van-cell   value="">
                    <template slot="title" >
                      <span class="custom-title">{{newText}}</span>
                    
                    </template>
                      <van-icon
                        slot="right-icon"
                        name="edit"
                        style="padding-right:10px;line-height: inherit;">
                      </van-icon>
                      <van-icon
                        slot="right-icon"
                        name="play-circle-o"
                        style="padding-right:10px;line-height: inherit;">
                      </van-icon>
   
                   </van-cell>

              </van-cell-group>     
       

        </van-tab>
      
      <van-tab title="关键词回复">
        <van-cell-group>
            <van-cell   value="">
              <template slot="title" >
                <span class="custom-title">关键词</span>
              
              </template>
                <van-icon
                  slot="right-icon"
                  name="eye-o"
                  style="padding-right:10px;line-height: inherit;">
                </van-icon>
                <van-icon
                  slot="right-icon"
                  name="more-o"
                  style="padding-right:10px;line-height: inherit;">
                </van-icon>
               <van-icon
                  slot="right-icon"
                  name="delete"
                  style="padding-right:10px;line-height: inherit;">
                </van-icon>
             </van-cell>

        </van-cell-group>

        <div class="add-reply" v-if="showReply" >
          <p style="color:green">关键词回复</p>
          <div class="add-reply-box">
             <van-row >
                  <van-col span="10">关键词（上限5个）</van-col>
                  <van-col span="6"> </van-col>
                  <van-col span="8" style="color:green"><span style="padding-right: 6px"><van-icon name="plus" /></span><span>添加关键词</span></van-col>
                </van-row>
              <div class="add-reply-list">

                   <span v-for="(item,i) in keys" :key="i" class="key-box" > {{item}} <label @click="del">✖️</label> </span>      
             
              </div>
            </div>

            <div class="reply-values">
                <van-row >
                  <van-col span="10">回复（随机上限3个）</van-col>
                  <van-col span="6"> </van-col>
                  <van-col span="8" style="color:green"><span style="padding-right: 6px"><van-icon name="plus" /></span><span>添加回复</span></van-col>
                </van-row>
                <van-cell-group>
                  <van-cell   value="">
                    <template slot="title" >
                      <span class="custom-title">深度放松的方式</span>
                    
                    </template>
                      <van-icon
                        slot="right-icon"
                        name="edit"
                        style="padding-right:10px;line-height: inherit;">
                      </van-icon>
                      <van-icon
                        slot="right-icon"
                        name="delete"
                        style="padding-right:10px;line-height: inherit;">
                      </van-icon>
   
                   </van-cell>

              </van-cell-group>

            </div>

        </div>




        <div class="reply-button">
             <van-button type="primary" plain size="normal" @click="showReply=!showReply">新增回复</van-button>
         </div>




      </van-tab>

      </van-tabs>
    </div>

    <div class="popadd" v-if="showAdd" >
        <van-cell-group>
          <van-field
            v-model="message"
            label="留言"
            type="textarea"
            placeholder="请输入留言"
            rows="10"
         
          />
        </van-cell-group>
         <van-button type="primary" plain size="large" @click="saveNew">保存</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { login} from '@/api/api'
export default {
  data() {
      return {
        newText:'多少岁的方式',
        showAdd:false,
        keys:['房贷首付','fdsf','fs','sfsfs','fsdfsfsdfsf'],
        showReply:false,
        active:1,
        id:this.$route.params.id,
      }
    },
  created(){
    console.log(this.id)
  },
  methods: {
    saveNew(){
      this.showAdd = false
    },
    del(){

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
  .reply
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
      .add-reply
        .add-reply-box
          width:100%
          background:#fff
          .add-reply-list
            margin:15px
            padding:15px
            display:flex
            flex-wrap:wrap
            justify-content: space-between;
            background:#fff
            span
              margin-bottom:8px
            .key-box
              margin-left:15px
              padding:10px
              border:1px solid #666;
        .reply-values
          padding-left:10px
          background:#fff
    .van-row
      padding-top:5px

  .reply-button
    padding-top:15px
    text-align:left
  .popadd
    background:#fff
    position:absolute
    width:100%
    height:100%
</style>
