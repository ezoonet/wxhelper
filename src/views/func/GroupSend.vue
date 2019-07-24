<template>
  <div class="groupsend">
   <div class = "nav">
        <van-nav-bar
        title="群发管理"
        fixed
        @click.native="goback()"
        left-arrow
        />
    </div>
    <div class="body"  >
        <van-tabs v-model="active" @change="tabChanged()">
          <van-tab title="群发列表">

            <div class="text-box" v-if = "!showGroupAdd">
              <!-- 列表部分 -->
              <van-cell-group>
                  <van-cell   value="" v-for="(item,i) in textList" :key=i>
                    <template slot="title" >
                      <span class="custom-title">{{item.Nickname}}</span>
                    </template>
                    <van-tag v-if="item.type==1" plain type="danger">文</van-tag>
                     <van-tag v-if="item.type==2"  plain type="success">图</van-tag>
                      <van-icon
                        @click="goedit(item)"
                        slot="right-icon"
                        name="edit"
                        style="padding-right:10px;line-height: inherit;">
                      </van-icon>
                      <van-icon
                       @click.native="del(item)"
                        slot="right-icon"
                        name="delete"
                        style="padding-right:10px;line-height: inherit;">
                      </van-icon>
   
                   </van-cell>
                    <!-- 编辑部分 -->
                    <div class="text-edit-box" v-if="showEdit">
                        <van-cell-group>
                            <van-field
                              v-model="textName"
                              label="名称"
                              type="textarea"
                              placeholder="请输入名称"
                              rows="1"
                            />
                          </van-cell-group>
                    
                       <van-cell-group>
                            <img v-if="typeradio==2" style="width:150px" :src = "textContent" >
                            <van-field v-if="typeradio==1"
                              v-model="textContent"
                              label="内容"
                              type="textarea"
                              placeholder="请输入内容"
                              rows="5"
                            />
                          </van-cell-group>
                       <van-cell-group>
                         <van-checkbox-group v-model="preiodResult" style="display: flex; flex-wrap: wrap;">
                            <van-checkbox style="margin-right:10px;"
                              v-for="(item2, i) in periodWeek"
                              :key="item2"
                              :name="item2"
                            >
                              {{ item2 }}
                            </van-checkbox>
                          </van-checkbox-group>

                       </van-cell-group>


                 <!-- <van-radio-group style="margin-top:20px" disabled v-model="typeradio">
                    <van-radio name="1">文字</van-radio>
                    <van-radio name="2">图片</van-radio>
                  </van-radio-group> -->

                          <!--  <van-button style="margin-right:50px;" type="primary" plain  @click="">保存</van-button> 
                           <van-button type="default" plain  @click="">取消</van-button>  -->
                      </div>

                </van-cell-group>    

 
                  

              <van-button type="primary" plain size="large" @click="showGroupAdd=true">新增群发</van-button> 
            </div>

            <div class="groupadd-box" v-if="showGroupAdd">
             <van-cell-group>
                <h4>群发标题</h4>
                  <van-field v-model="newTitle" placeholder="请输入标题" />
             </van-cell-group>
             <van-cell-group>
               <h4>群发内容</h4>
               <div v-if="choiceMedia.type ==1 ">
                 {{ choiceMedia.name}}   ( {{ choiceMedia.content}})
             
               </div >
               <div v-else style="text-align: center">
                 <img style="width:150px" :src="choiceMedia.content" >
               </div>
               <div class="groupadd-box-button" @click="showMedia=true">+ 添加</div> 
             </van-cell-group>
            <van-cell-group >
               <h4> 选择要群发的群</h4>
              <van-checkbox-group v-model="groupChoiced">
                <van-checkbox
                  v-for="(item, index) in grouplist"
                  :key="index"
                  :name="item.UserName"
                >
                   {{ item.Nickname }}
                </van-checkbox>
              </van-checkbox-group>
             </van-cell-group>
              <label>小提示：dsfs</label>
              <h4> 是否重复发送：</h4>
              <van-radio-group v-model="radioPeriod" style="display:flex; flex-wrap: wrap;" >
                <van-radio name="1">不重复</van-radio>
                <van-radio name="2">周期重复</van-radio>
              </van-radio-group>
            <van-checkbox-group v-model="periodresult" style="margin-top:25px;display:flex; flex-wrap: wrap;" >
              <van-checkbox
                v-for="(item, index) in periodWeek"
                :key="index"
                :name="item"
              >
                {{ item }}
              </van-checkbox>
            </van-checkbox-group>

           </van-cell-group>
   
              <h4 @click="showTimepicker=true" > 发送时间：<span style="color:red">{{sendtime==''?'请选择':sendtime}}</span></h4>
          
              <van-datetime-picker 
                v-if ="showTimepicker"
                v-model="sendtime"
                type="time"
                :visible-item-count= 3
                @cancel = "showTimepicker=false;sendtime=''"
                @confirm = "showTimepicker=false"
              />

             <label>小提示：请确保每天进行群发的数量不超过20词（包括重复的群发），否则腾讯有封号风险</label>
             <div class="group-sendbutton">
              <van-button type="primary" plain size="small" @click="summit">提交</van-button>
              <van-button  plain size="small" @click="showGroupAdd=false">取消</van-button>
            </div>
            </van-checkbox-group>
            </div>
     

          </van-tab>

            <van-tab title="群发记录"> 

           <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="(item,i) in grouplist"
              :key="i"
              :title="item.name"
            />
          </van-list>
      
           </van-tab>

        </van-tabs>

     

   </div>
 

<van-popup v-model="showMedia" style="width:80%;height:60%;padding:20px;">
  <van-tabs v-model="mediaActive" style="    padding-left: 10%;">
      <van-tab title="文本" >
         <van-radio-group v-model="mediaradio">
          <van-radio :name="item.id" v-for="(item,i) in mediatextList" :key="i">
          {{item.name}} ({{item.content}})
        </van-radio>
        </van-radio-group>
      </van-tab>
      <van-tab title="图片" >
        <van-radio-group v-model="mediaradio" >
          <van-radio :name="item.id" v-for="(item,i) in mediapicList" :key="i">
          <img style="width:150px;" :src="item.content" >
   
        </van-radio>
        </van-radio-group>
      </van-tab>
    </van-tabs>
    <van-button  style="position: fixed;margin-left:-50px;width:100px;bottom:20px" type="primary" plain size="small" @click="_choiceMedia()">确定</van-button>
</van-popup>

 
    </div>
  
</template>

<script>
import { Toast,Dialog,Uploader } from 'vant';
import { login} from '@/api/api'
export default {
  data() {
      return {
        showTimepicker:false,
        sendtime: '',
        typeradio:'1',
        preiodResult:[],
        choiceMedia:'',
        mediaActive:0,
        mediaradio:'0',
        mediatextList: [
        ],
        mediaList:[],
        mediapicList:[],
        showMedia:false,
        periodresult:[],
        currentDate: new Date(),
        periodWeek:['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
        radioPeriod:0,
        groupChoiced:[],
        newTitle:'',
        showGroupAdd:false,
        grouplist:[],
        loading:false,
        finished:false,
        imgList:[
        'https://img.yzcdn.cn/vant/apple-1.jpg','https://img.yzcdn.cn/vant/apple-1.jpg','https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-1.jpg','https://img.yzcdn.cn/vant/apple-1.jpg','https://img.yzcdn.cn/vant/apple-1.jpg'
        ],
        fileList:[],
        showEdit:false,
        textName:'',
        textContent:'',
        textList:[ 

        ],
        active:0,
        id:this.$route.params.id,
      }
    },
  created(){

    console.log(this.id)
    if (!localStorage['_stock_Uin']) {
      Toast.fail('请先登陆机器人')
      this.$router.back(-1)
      return

    }
    this.getMdeia()
    this._getGroupList()
    this.getGroupSendList()
  },
  methods: {
    tabChanged(){
      if(this.active ==0) {
        this.getGroupSendList()
      } else {
        this.getSendedList()
      }
    },
    getSendedList(){
      let obj ={}
      obj.Uin = localStorage['_stock_Uin']
      obj.type = 1 //get list
      this.grouplist = []
      this.$getapi('robot/sendGroup',obj).then(res=>{
        this.grouplist = res.data
      })
    },
    getGroupSendList(){
      let obj ={}
      obj.Uin = localStorage['_stock_Uin']
      obj.type = 0 //get list
      this.textList = []
      this.$getapi('robot/sendGroup',obj).then(res=>{
        this.textList = res.data
      })
    },
    summit(){
      if (!this.newTitle) {
        Toast.fail('请输入标题')
        return
      }
      if (!this.choiceMedia) {
        Toast.fail('请选择素材')
        return
      }
      if (this.groupChoiced.length==0) {
        Toast.fail('请选择要群发的群')
        return
      }   
      if (!this.radioPeriod) {
        Toast.fail('请选择发送周期')
        return
      }   
 
       if (!this.sendtime) {
        Toast.fail('请选择发送时间')
        return
      }   
      if (this.radioPeriod==2 && this.periodresult.length ==0) {
        Toast.fail('请选择发送时间')
        return
      }      
      let obj ={}
      obj.Uin = localStorage['_stock_Uin']
      obj.title = this.newTitle
      obj.content = this.choiceMedia.content
      obj.mediaType = this.choiceMedia.type
      obj.group = this.groupChoiced
      obj.period = this.radioPeriod
      obj.sendPeriod= this.radioPeriod==2?this.periodresult:0
      obj.sendtime = this.sendtime
      this.$getapi('robot/sendGroup',obj).then(res=>{
      if (res.status == 200 ) {
          Toast.success('成功')
          this.showGroupAdd=false
        } else {
          Toast.fail(res.msg)
        }
      })
  
    },
    _getGroupList(){
      let obj ={}
      obj.Uin = localStorage['_stock_Uin']
      obj.type = 0
      this.list = []

      this.$getapi('robot/dogroup',obj).then(res=>{
            if (res.status == 200 ) {
              this.grouplist = res.data
            } else {
              Toast.fail(res.msg)
            }
          })
    },
    _choiceMedia(){
      console.log(this.mediaradio)
      this.showMedia = false
      this.mediaList.forEach(v=>{
        if (v.id == this.mediaradio) {
          this.choiceMedia = v
          return
        }
      })

    },
    getMdeia(){
      let obj ={}
      obj.type =0
      obj.uid = localStorage['_stock_uid']
      this.$getapi('robot/manageMedia',obj).then(res=>{
            if (res.status == 200 ) {
              this.meidatextList = []
              this.mediapicList = []
              this.mediaList = res.data
              res.data.forEach(v=>{
                if (v.type ==1 ){
                  this.mediatextList.push(v)
                } else {
                  this.mediapicList.push(v)
                }
              })
               
            } else {
              Toast.fail(res.msg)
            }
          })
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.grouplist.push(this.grouplist.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.grouplist.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    del(item){
      Dialog.confirm({
        title: '确定删除',
        message: '删除后不可恢复'
      }).then(() => {

       
          let obj ={}
          obj.type =3
          obj.id = item.id
          this.$getapi('robot/sendGroup',obj).then(res=>{
                if (res.status == 200 ) {
                  Toast.success('ok')    
                      this.step = 2
                      this.getGroupSendList()           
                } else {
                  Toast.fail(res.msg)
                }
           })
        // on confirm
      }).catch(() => {
      
        // on cancel
      });
    },
    goedit(item){
      this.showEdit=!this.showEdit
      this.textName = item.title
      this.textContent = item.content
      this.preiodResult = item.sendPeriod.split(',')
      this.typeradio = item.type

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
  .groupsend

    position:absolute
    width:100%
    height:100%
    background:#fff
    .nav
      background: green
    .body
      padding:15px
      font-size:14px
      .text-edit-box
        background:#fff
    .groupadd-box
      color:green
      text-align:left
      .groupadd-box-button
        background:#eee
        text-align:center
        padding:10px
      .group-sendbutton
        padding-top:20px
        text-align:center
</style>
