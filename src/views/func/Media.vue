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


                  

              <van-button type="primary" plain size="large" @click="">新增文本素材</van-button> 
            </div>

        

          </van-tab>

            <van-tab title="图片"> 
             <div class="pic-box">
            <p>自定义图片素材</p>
            <van-uploader v-model="fileList" multiple   :after-read="afterRead" />
           </div>
            <p>图片预览</p>
            <van-grid :border="false" :column-num="3">
              <van-grid-item v-for="(item,i) in imgList" :key="i">
                <van-image :src="item" />
              </van-grid-item>
             
            </van-grid>

           </van-tab>
        </van-tabs>
         

   </div>
 


 
    </div>
  
</template>

<script>
import { Toast,Dialog,Uploader } from 'vant';
import { login} from '@/api/api'
export default {
  data() {
      return {
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
  },
  methods: {
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

</style>
