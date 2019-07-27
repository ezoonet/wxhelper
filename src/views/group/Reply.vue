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
      <van-tabs v-model="active" @change = "onTabchange()">
        <van-tab title="新人入群">
               <van-cell-group>
                  <van-cell   value="" style="    align-items: center;">
                    <template slot="title" >
                      <span class="custom-title">
                          <van-field autofocus    type="textarea"  autosize rows="3" v-model="newText" :disabled="textDisabled" placeholder="请输入内容" />
                      </span>
                    
                    </template>
                      <van-icon
                        slot="right-icon"
                        name="edit"
                        @click.native="updateNewText(0)"
                        style="padding-right:10px;line-height: inherit;">
                      </van-icon>
                      <van-icon
                        slot="right-icon"
                        @click.native="updateNewText(1)"
                        name="delete"
                        style="padding-right:10px;line-height: inherit;">
                      </van-icon>
   
                   </van-cell>

              </van-cell-group>     
       

        </van-tab>
      
      <van-tab title="关键词回复">
        <van-cell-group v-for="(item,i) in keysList" :key="i">
            <van-cell   value="" style="align-items: center;">
              <van-tag style="margin-right:5px"type="danger">{{item.type == 0?'私':item.type==1?'群':''}}</van-tag>
              <template slot="title" >
                <span class="custom-title">  <van-field autofocus  v-model="item.keywords" :disabled="keyTextDisabled" placeholder="请输入内容" /><span>{{item.content}}</span></span>
              
              </template>
          <!--       <van-icon
                  @click="_keyReply(0,item)"
                  slot="right-icon"
                  name="eye-o"
                  style="padding-right:10px;line-height: inherit;">
                </van-icon> -->
                <van-icon
                 @click="_keyReply(1,item)"
                  slot="right-icon"
                  name="more-o"
                  style="padding-right:10px;line-height: inherit;">
                </van-icon>
               <van-icon
                 @click="_keyReply(2,item)"
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
                  <van-col span="8" style="color:green"  @click.native="_addFrom(0)"  ><span style="padding-right: 6px"><van-icon name="plus" /></span><span>添加关键词</span></van-col>
                </van-row>
              <div class="add-reply-list">

                   <span v-for="(item,i) in keys" :key="i" class="key-box" > {{item}} <label @click="_delkey(item)">✖️</label> </span>      
             
              </div>
            </div>

            <div class="reply-values">
                <van-row >
                  <van-col span="10">回复</van-col>
                  <van-col span="6"> </van-col>
                  <van-col span="8" @click.native="_addFrom(1)" style="color:green"><span style="padding-right: 6px" ><van-icon name="plus" /></span><span >添加回复</span></van-col>
                </van-row>
               
                <van-cell-group v-for="(item,i) in replyList" :key="i">
                  <van-cell   value=""  style="align-items: center;">
                    <template slot="title" >
                      <span class="custom-title">
                       <van-field autofocus   v-model="replyList[i]" :disabled="RpyTextDisabled" placeholder="请输入内容" />
                     </span>
                    
                    </template>
                      <van-icon
                        slot="right-icon"
                        name="edit"
                        @click="_editRly(item)"
                        style="padding-right:10px;line-height: inherit;">
                      </van-icon>
                      <van-icon
                        slot="right-icon"
                        @click="_delRly(item)"
                        name="delete"
                        style="padding-right:10px;line-height: inherit;">
                      </van-icon>
   
                   </van-cell>

              </van-cell-group>

            </div>

            <van-button style="margin-top:20px" type="primary" plain size="normal" @click="submitRly">提交新增</van-button>
        </div>




        <div class="reply-button" v-if="!showReply">
             <van-button type="primary" plain size="normal" @click="showReply=true">新增回复</van-button>
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

    <van-dialog
        v-model="addShow"
        title="请输入内容"
        show-cancel-button
        @confirm ="onConfirm"
      >
         <van-field autofocus  v-model="addText" placeholder="请输入内容" />
</van-dialog>

  </div>
</template>

<script>
import { Toast,Dialog } from 'vant';
import { login} from '@/api/api'
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};


export default {
  data() {
      return {
        addType:0,
        addText:'',
        addShow:false,
        keyTextDisabled:true,
        RpyTextDisabled:true,
        keyText:'dsfsfdsf',
        textDisabled:true,
        newText:'',
        showAdd:false,
        keys:[],
        replyList:[
         

        ],
        showReply:false,
        keysList:[

        ],
        active:0,
        id:this.$route.params.id,
      }
    },
  created(){
    this._getNewReply()

  },
  methods: {
    onTabchange(){
      console.log(this.active)
      if (this.active == 0) {
        //new
        this._getNewReply()
      } else {
        this._getReply()
      }
    },
    _getReply(){
      let obj = {}
      obj.Uin = localStorage['_stock_Uin']
      obj.groupid = this.id
      obj.type = 0
      this.keysList =[]
      this.$getapi('robot/manageReply',obj).then(res=>{
        if (res.status == 200 ) {
          this.keysList = res.data
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    _getNewReply(){
      let obj = {}
      obj.Uin = localStorage['_stock_Uin']
      obj.groupid = this.id
      obj.type = 0
      this.$getapi('robot/manageNewreply',obj).then(res=>{
        if (res.status == 200 ) {
          this.newText = res.data.content
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    _delRly(item){

      Dialog.confirm({
        title: '提示',
        message: '确定删除'
      }).then(() => {
         this.replyList.remove(item)
        // on confirm
      }).catch(() => {
        // on cancel
      });
    },
    _editRly(item){
      
      this.RpyTextDisabled = !this.RpyTextDisabled
      if (this.RpyTextDisabled) {
        //完成编辑
        console.log('final'+item)
      } else {
        //开始编辑
        console.log('orign'+item)
      }

    },
    submitRly(){
      console.log(this.keys)
      console.log(this.replyList)
      if (this.keys.length ==0 ) {
        Toast.fail('请先设置回复关键词')
        return
      }  
      if (this.replyList.length !=1) {
        Toast.fail('回复内容错误')
        return
      }


          let obj = {}
          obj.Uin = localStorage['_stock_Uin']
          obj.type = 1
          obj.groupid = this.id
          obj.keywords = this.keys
          obj.content = this.replyList
          console.log(obj)
          return
          this.$getapi('robot/manageReply',obj).then(res=>{
            if (res.status == 200 ) {
               this._getReply()
              Toast.success('ok')
            } else {
              Toast.fail(res.msg)
            }
          })
      // this.showReply=!this.showReply
    },
    onConfirm(){
      console.log(this.addType)
      if (this.addType == 0) {
          this.keys.push(this.addText)
         
      }
       if (this.addType == 1) {
          
          this.replyList.push(this.addText)
      } 

    },

    _addFrom(type){
      console.log(type)
      //0 关键词
      //1 回复
      if (type ==0 && this.replyList.length>5) {
        Toast.fail('超过5个')
        return
      }
      if (type ==1 && this.replyList.length>=1) {
        Toast.fail('超过1个')
        return
      }
      this.addType = type
      this.addShow = true

    },
    _keyReply(type,item) {
      if (type ==0) {
        // switcher
        console.log(item.id)

      } 
      if (type ==1) {
        // edit
        console.log(item.id)
        console.log(item.content)
        this.keyTextDisabled = !this.keyTextDisabled
      }
      if (type == 2) {
        //delete
         Dialog.confirm({
        title: '提示',
          message: '确定删除'
        }).then(() => {
          console.log(item)
          // on confirm
          let obj = {}
          obj.Uin = localStorage['_stock_Uin']
          obj.id = item.id
          obj.type = 3
          obj.groupid = this.id
          this.$getapi('robot/manageReply',obj).then(res=>{
            if (res.status == 200 ) {
               this._getReply()
              Toast.success('ok')
            } else {
              Toast.fail(res.msg)
            }
          })
        }).catch(() => {
          // on cancel
        }); 
          console.log(item.id)
        //del 
      }
 
    },
    updateNewText(type){
      //type 0:edit  1:run
      console.log(type)
      if (type == 0 ) {
        this.textDisabled= !this.textDisabled
        if (this.textDisabled) {
          // 禁止状态下
          let obj = {}
          obj.Uin = localStorage['_stock_Uin']
          obj.groupid = this.id
          obj.content = this.newText
          obj.type = 2
          this.$getapi('robot/manageNewreply',obj).then(res=>{
            if (res.status == 200 ) {
        
              Toast.success('更新成功！')
            } else {
              Toast.fail(res.msg)
            }
          }) 
          }
      
  
      } else {
       Dialog.confirm({
        title: '提示',
          message: '确定删除'
        }).then(() => {
               //update set no work
            let obj = {}
            obj.Uin = localStorage['_stock_Uin']
            obj.groupid = this.id
            obj.type = 3
            obj.replytype = 10
            this.$getapi('robot/manageNewreply',obj).then(res=>{
              if (res.status == 200 ) {
                this.newText = ''
                Toast.success('删除成功！')

              } else {
                Toast.fail(res.msg)
              }
            }) 
        
         
        }).catch(() => {
          // on cancel
        }); 
          console.log(item.id)
        //del 
      } 
      
    

    },
    saveNew(){
      this.showAdd = false
    },
    _delkey(item){
 
     Dialog.confirm({
        title: '提示',
        message: '确定删除'
      }).then(() => {
        this.keys.remove(item); 

        // on confirm
      }).catch(() => {
        // on cancel
      });   
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
