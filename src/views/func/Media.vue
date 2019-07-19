<template>
  <div class="media">
   <div class = "nav">
        <van-nav-bar
        title="素材管理"
        fixed
        @click.native="goback()"
        left-arrow
        />
    </div>
    <div class="body"  >
        <van-tabs v-model="active">
          <van-tab title="文字">
            <div class="text-box">
              <!-- 列表部分 -->
              <van-cell-group v-if="textList.length>0">
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
                       @click.native="_del(item)"
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
                           <van-button style="margin-right:50px;" type="primary" plain  @click="_save()">保存</van-button> 
                           <van-button type="default" plain  @click="showEdit=false;showAddButton=true">取消</van-button> 
                      </div>
                </van-cell-group >    
                 <van-cell-group v-else>
                  暂无数据
                 </van-cell-group>    
                  

              <van-button v-if="showAddButton" type="primary" plain size="large" @click="_add">新增文本素材</van-button> 
            </div>

        

          </van-tab>

            <van-tab title="图片"> 

             <div class="pic-box">
            <p>自定义图片素材</p>
            <van-uploader v-model="fileList" multiple   :after-read="afterRead" />
           </div>
            <van-button style="margin-right:50px;" type="primary" plain  size="large" @click="_saveimg()">保存</van-button> 
            <p>图片预览</p>
            <div class= "pic-list">
                <van-grid :border="false" :column-num="3" clickable >
                  <van-grid-item v-for="(item,i) in imgList" :key="i" >
                    <van-image :src="item.content" /><span @click="_del(item)">X</span>
                  </van-grid-item>
                 
                </van-grid>
            </div>
           </van-tab>
        </van-tabs>
         

   </div>
 


 
    </div>
  
</template>

<script>
import { Toast,Dialog,Uploader } from 'vant';
import { uploadImgs} from '@/api/api'
export default {
  data() {
      return {
        type:0,
        editId:0,
        showAddButton:true,
        imgList:[{
          id:0,
          imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg'
        },{
          id:1,
          imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg'
        },{
          id:2,
          imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg'
        },{
          id:3,
          imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg'
        },{
          id:4,
          imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg'
        },{
          id:5,
          imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg'
        },{
          id:6,
          imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg'
        }
      
        ],
        fileList:[],
        fileUrl:[],
        showEdit:false,
        textName:'',
        textContent:'',
        textId:0,
        mediaList:[],
        textList:[{
          id:0,
          name:'dsfdf',
          content:'sdfsdsf'
        },{
          id:1,
          name:'dsfdf2',
          content:'sdfsdsf2'
        },{
          id:2,
          name:'dsfdf3',
          content:'sdfsdsf3'
        },{
          id:3,
          name:'dsfdf3',
          content:'sdfsds33f'
        }

        ],
        active:0,
  
      }
    },
  created(){
 
    if (!localStorage['_stock_uid']) {
      Toast.fail('请先登陆')
      return
    }
    this._getMediaList()
  },
  methods: {
    _saveimg(){
      let alist = this.fileList
      this.fileList = []
      alist.forEach(v=>{
        this.upload(v)
      }) 

    },  
    _save(){
      let obj ={}
      obj.uid = localStorage['_stock_uid']
      if (this.type == 1) {
        // add
         obj.type = 1
         obj.mediatype = 0
      } 
      if (this.type == 2) {
        // edit
        obj.type = 2
        obj.id = this.textId
      }

     
      obj.name = this.textName
      obj.content = this.textContent  

      this.$getapi('robot/manageMedia',obj).then(res=>{
        if (res.status==200) {
          Toast.success('成功')
      
 
          this._getMediaList()
        } else {
          Toast.fail(res.msg)
        }
      })
     
    },
    _getMediaList(){
      let obj ={}
      obj.uid = localStorage['_stock_uid']
      obj.type = 0

      this.$getapi('robot/manageMedia',obj).then(res=>{
            if (res.status == 200 ) {
              this.mediaList = res.data
              this.textList=[]
              this.imgList=[]
              res.data.forEach(v=>{
                if (v.type == 0) {
                  //文字
                  this.textList.push(v)
                } 
                if (v.type == 1) {
                  //图片
                  this.imgList.push(v)
                }
              })
            } else {
              Toast.fail(res.msg)
            }
          })
    },
 
    _add(){
      this.textName = ''
      this.textContent = ''
      this.showEdit = true
      this.showAddButton = false
      this.type = 1
    },
    upload(file) {

 
      console.log(file)
      let param = new FormData(); //创建form对象
      param.append('imgFiles',file.file);//通过append向form对象添加数据
      
      uploadImgs(param).then((res) => {
          if (res.status === 200) {
               let obj ={}
                obj.uid = localStorage['_stock_uid']
                obj.type = 1 //add
                obj.name = 'img'
                obj.content = res.data  
                obj.mediatype = 1 //img
                this.$getapi('robot/manageMedia',obj).then(res=>{
                  if (res.status==200) {
                    Toast.success('成功')
                    this._getMediaList()
                  } else {
                    Toast.fail(res.msg)
                  }
                })
          } else {
            Toast.fail(res.msg)
          }
        })
    },
     
    afterRead(file) {
     // this.upload(file)
      // 此时可以自行将文件上传至服务器
   
    },
    _del(item){
      Dialog.confirm({
        title: '确定删除',
        message: '删除后不可恢复'
      }).then(() => {
          this.step = 2
          let obj ={}
          obj.uid = localStorage['_stock_uid']
          obj.type = 3
          obj.id = item.id
          this.$getapi('robot/manageMedia',obj).then(res=>{
            if (res.status==200) {
              Toast.success('删除成功')
              this._getMediaList()
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
      this.textId = item.id
      this.showEdit=!this.showEdit
      this.textName = item.name
      this.textContent = item.content
      this.type = 2

        
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
  .media
    position:absolute
    width:100%
    height:100%
    background:#eee
    .nav
      background: green
    .body
      padding:15px
      font-size:14px
      .text-edit-box
        background:#fff
    .pic-box
      text-align:left
    .pic-list
      span
        margin-top:15px
</style>
