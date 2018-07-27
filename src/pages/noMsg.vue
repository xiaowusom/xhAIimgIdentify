<template>
  <div id="demo" :class="{demo_div: !showLoding}">
    <div class="top">
      <Icon type="ios-undo-outline" @click="pre"></Icon>
      <span class="title">通用识别</span>
    </div>
    <div class="top">
      <span class="title title2">建议类别：{{typeName}}</span>
    </div>
    <div v-show="!showLoding">
      <img id="img" :src="imgSrc" v-show="!showLoding"></img>
      <!-- <img id="img" src="https://upload-images.jianshu.io/upload_images/3480018-e7ce60d75c36e4e0.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/372" v-show="!showLoding"></img> -->
     <!--  <div class="comfirm_btn" @click="backMain" v-show="!showLoding">
         <Button class="btn" long type="primary" :loading="loading">返回</Button>
      </div> -->
    </div>
    <Row v-if="showLoding">
      <Col class="demo-spin-col" span="8">
      <Spin fix>
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>图片正在努力识别中</div>
      </Spin>
      </Col>
    </Row>
    <Modal v-model="modal" title="提示" @on-ok="modalOk" @on-cancel="modalOk">
      <p>请求出错，即将返回商品列表</p>
    </Modal>
  </div>
</template>
<script type="text/javascript">
import Cropper from 'cropperjs'
import { setSession, getSession, getData } from '@/script/util'
import { mapState } from 'vuex'
export default {
  components: {},
  data() {
    return {
      jcrop_api: null,
      bounds: null,
      imgSrc: null,
      loading: false,
      selectInfo: null,
      showLoding: false,
      destroyFlag: false,
      scale: null,
      modal: false,
      typeName: null
    }
  },
  computed: {
    ...mapState(['boxRefreshFlag'])
  },
  created() {
    // 判断是否刷新
    // console.log(this.boxRefreshFlag)
    // if (this.boxRefreshFlag) {
    //   window.location.reload()
    // }
  },
  mounted() {
    var _this = this
    this.typeName = this.$route.query.type
    this.countScale()
    this.setHeight()
    this.getImg()
    setTimeout(function() {
      _this.initJcrop()
    }, 200)
  },
  methods: {
    pre() {
      this.$router.push({ path: '/' })
    },
    modalOk() {
      this.modal = false
      this.$router.push({ path: '/details' })
    },
    countScale() {
      var imgWidth = JSON.parse(getSession('imgInfo')).w
      this.scale = imgWidth / document.documentElement.clientWidth
      this.scale = parseFloat(this.scale)
      this.scale = this.scale.toFixed(3)
      console.log(this.scale)
    },
    setHeight() {
      console.log(document.getElementById('demo').style)
      document.getElementById('demo').style.height = document.documentElement.clientHeight + 'px'
    },
    getImg() {
      this.imgSrc = getData('img')
    },
    getFrameInfo() {
      var obj = JSON.parse(getSession('frame'))
      var arr = []
      console.log(obj)
      if (!obj.x) {
        var tempArr = []
        var imgInfo = JSON.parse(getSession('imgInfo'))
        tempArr[0] = 20
        tempArr[1] = 20
        tempArr[2] = imgInfo.w / this.scale - 30
        tempArr[3] = imgInfo.h /this.scale - 30
        console.log(imgInfo)
        return tempArr
      } else {
        arr[0] = parseInt(parseFloat(obj.x) / this.scale)
        arr[1] = parseInt(parseFloat(obj.y) / this.scale)
        arr[2] = parseInt(parseFloat(obj.width) / this.scale) + arr[0]
        arr[3] = parseInt(parseFloat(obj.height) / this.scale) + arr[1]
        return arr
      }
    },
    initJcrop() {
      var _this = this
      var winWidth = document.documentElement.clientWidth
      $("#img").Jcrop({
        // onChange: onChange,
        onSelect: _this.getSelectInfo,
        // boxHeight: 500,
        boxWidth: winWidth,
        allowSelect: false,
        allowMove: true
        // aspectRatio: 1
      }, function() {
        _this.jcrop_api = this;

        // 获取框信息并转换
        var arr = _this.getFrameInfo()
        console.log(arr)
        _this.jcrop_api.setSelect(arr);
        // _this.jcrop_api.setSelect([100, 100, 200, 200]);
        console.log(_this.jcrop_api)
      });
    },

    getSelectInfo(c) {
      this.selectInfo = c
    },
    backMain() {
      this.$router.push({ path: '/' })
    }
  }
}

</script>
<style type="text/css">
.demo_div {
  /*position: relative;*/
  background-color: #878787;
}

#img {
  width: 100%;
  height: 100%;
}

.comfirm_btn {
  width: 6rem;
  position: absolute;
  bottom: 1rem;
  right: 50%;
  transform: translateX(50%);
}

.btn {
  font-size: 0.3rem;
  font-weight: bold;
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
}

.return_btn {
  color: blue;
  font-size: 0.3rem
}

.top {
  background-color: #fff;
  height: 0.9rem;
  border-bottom: 0.02rem solid #999;
}
i.ivu-icon.ivu-icon-ios-undo-outline {
    position: absolute;
    left: 0;
    top: 0.1rem;
}
.top i {
  font-size: 0.8rem;
  color: #777;
  margin-left: 0.2rem;
  text-align: left;
}
span.title.title2 {
    padding-top: 0.15rem;
}

.title {
    font-size: 0.35rem;
    color: #000;
    line-height: 0.8rem;
}
</style>
