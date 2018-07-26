<template>
  <div class="imgBox">
    <div v-if="!showLoding">
      <div class="imgFlex">
        <div>
          <div class="photographic">
            <input id="input" type="file" ref="uploadImg" accept="image/*" capture="camera" @change="getImg($event)">
          </div>
        </div>
        <div>
          <img class="logo" src="../images/jhline.png">
        </div>
        <div>
          <div class="openPhoto">
            <input class="PhotoAlbum" type="file" name="file" accept="image/*" @change="getImg($event)">
          </div>
        </div>
      </div>
      <div>
        <span class="bottom_img"></span>
      </div>
    </div>
    <!-- 用作识别照片尺寸的作用 -->
    <img id="hideImg" :src="base64Url" alt="" v-show="false">
    <Row v-if="showLoding">
      <Col class="demo-spin-col" span="8">
      <Spin fix>
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>图片正在努力识别中</div>
      </Spin>
      </Col>
    </Row>
    <Modal v-model="modal" title="提示" @on-ok="modalOk" @on-cancel="modalOk">
      <p>请求出错</p>
    </Modal>
  </div>
</template>
<script>
import lrz from 'lrz'
import {
  setSession,
  getSession,
  saveData,
  getData
} from '@/script/util'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      showLoding: false,
      base64Url: null,
      modal: false
    }
  },
  mounted() {
    this.$store.commit('REFRESH', true)
  },
  computed: {
    ...mapState(['imgFile'])
  },
  methods: {
    modalOk() {
      this.modal = false
    },
    showJq() {
      console.log($('input'))
    },
    getImgInfo(dom) {
      // 延时方可获取到
      setTimeout(function() {
        var imgInfo = {}
        imgInfo.w = dom.naturalWidth
        imgInfo.h = dom.naturalHeight
        setSession('imgInfo', imgInfo)
        console.log(imgInfo)
      }, 500)
    },
    getImg(event) {
      console.log(( new Date()).valueOf())
      var _this = this
      this.showLoding = true
      var showFile = event.target.files[0]
      console.log(showFile)
      // 进行压缩
      lrz(showFile, {quality: 0.5, width: 800}).then(function(rst) {
        console.log(rst)
        // 转base64
        var reader = new FileReader();
        reader.readAsDataURL(rst.file);
        reader.onloadend = function() {
          saveData('img', reader.result)
          _this.base64Url = reader.result

          // console.log(reader.result)

          // 为了获取图片的原始高宽
          var imgDom = document.getElementById('hideImg')
          _this.getImgInfo(imgDom)

          // 进行数据请求，后台不需要base字头，先截取字符串
          var imgBase64 = reader.result
          var index = imgBase64.indexOf('base64,')
          imgBase64 = imgBase64.slice(index + 7)
          console.log(( new Date()).valueOf())
          _this.$http.post('http://47.94.242.44:8080/ccb/image_detection', {image: imgBase64, frame: {}}).then(res => {
            console.log(res)
            _this.showLoding = false
            var imgURL = res.body.imageList
            setSession('imgData', imgURL)

            // 存储框的信息
            setSession('frame', res.body.frame)
            if (res.body.category == 'cellphone' || res.body.category == 'drink') {
              _this.$router.push({ path: '/details' })
            } else {
              _this.$router.push({ path: '/noMsg', query: {type: res.body.category} })
            }

          }, err => {
            // _this.$router.push({ path: '/details' })
            _this.showLoding = false
            _this.modal = true
            // console.log(error)
          })
        };

        // var zipFormData = new FormData()
        // zipFormData.append('image', rst.file)
        // _this.$http.post('http://47.94.242.44:8080/ccb/image_detection', zipFormData)
        //   .then(
        //     (response) => {
        //       _this.showLoding = false
        //       var imgURL = response.body.imageList
        //       setSession('imgData', imgURL)
        //       _this.$router.push({ path: '/details' })
        //     },
        //     (error) => {
        //       _this.$router.push({ path: '/details' })
        //       _this.showLoding = false
        //       console.log(error)
        //     }
        //   )
      })
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.imgBox {
  width: 100%;
  height: 100%;
  padding-top: 1rem;
}

.imgFlex {
  width: 100%;
  height: 8.6rem;
  /*text-align: center;*/
}

.photographic {
  background: url(../images/photographic.png)no-repeat;
  background-size: cover;
  margin: 0 auto;
  width: 2.3rem;
  height: 2.3rem;
  position: relative;
}

.logo {
  width: 7rem;
  height: 0.6rem;
  margin-top: 2.01rem;
  margin-bottom: 2.01rem;
  /*margin-left:-0.095rem;*/
}

.openPhoto {
  background: url(../images/openPhoto.png)no-repeat;
  background-size: cover;
  width: 2.3rem;
  height: 2.3rem;
  margin: 0 auto;
  position: relative;
  ;
}

.bottom_img {
  width: 100%;
  height: 1.11rem;
  background: url(../images/pattern.png)no-repeat;
  background-size: cover;
  position: absolute;
  left: 0em;
  bottom: 0;
}

#input {
  width: 2.09rem;
  height: 2.09rem;
  position: absolute;
  left: 0;
  /*background-color:red;*/
  top: 0;
  opacity: 0;
  z-index: 100;
}

.PhotoAlbum {
  width: 2.09rem;
  height: 2.09rem;
  background: red;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 100;
}

.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
  font-size: 24px;
}

@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.demo-spin-col {
  width: 100%;
  height: 100%;
  position: relative;
  margin-top: 3rem;
  font-size: 16px;
  /*border: 1px solid #eee;*/
}

</style>
