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
        <van-tabs v-model="active">
          <van-tab title="群发列表">

            <div class="text-box" v-if = "!showGroupAdd">
              <!-- 列表部分 -->
              <van-cell-group>
                  <van-cell   value="" v-for="(item,i) in textList" :key=i>
                    <template slot="title" >
                      <span class="custom-title">{{item.name}}</span>
                    </template>
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
                              label="文本名称"
                              type="textarea"
                              placeholder="请输入文本名称"
                              rows="1"
                            />
                          </van-cell-group>
                    
                       <van-cell-group>
                            <van-field
                              v-model="textContent"
                              label="文本内容"
                              type="textarea"
                              placeholder="请输入文本内容"
                              rows="5"
                            />
                          </van-cell-group>
                           <van-button style="margin-right:50px;" type="primary" plain  @click="">保存</van-button> 
                           <van-button type="default" plain  @click="">取消</van-button> 
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
               <div>
                 {{choiceMedia.name}}
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
   
              <h4> 发送时间：</h4>
             <label>小提示：请确保每天进行群发的数量不超过20词（包括重复的群发），否则腾讯有封号风险</label>
             <div class="group-sendbutton">
              <van-button type="primary" plain size="small" @click="summit">提交</van-button>
              <van-button  plain size="small" @click="">取消</van-button>
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
          {{item.name}}
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
        textList:[{
          name:'dsfdf',
          content:'sdfsdsf'
        },{
          name:'dsfdf2',
          content:'sdfsdsf2'
        },{
          name:'dsfdf3',
          content:'sdfsdsf3'
        },{
          name:'dsfdf3',
          content:'sdfsds33f'
        }

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
  },
  methods: {
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
 
      if (this.radioPeriod==2 && this.periodresult.length ==0) {
        Toast.fail('请选择发送时间')
        return
      }       
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
                if (v.type ==0 ){
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
    del(){
      Dialog.confirm({
        title: '确定删除',
        message: '删除后不可恢复'
      }).then(() => {
          this.step = 2
        // on confirm
      }).catch(() => {
      
        // on cancel
      });
    },
    goedit(item){
      this.showEdit=!this.showEdit
      this.textName = item.name
      this.textContent = item.content
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
