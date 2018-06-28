<template>
  <div class="imgBox">
    <div v-if = "!showLoding">
      <div class="imgFlex">
        <div >
          <div class= "photographic" ></div>
          <input id="input" type="file" ref="uploadImg" accept="image/*" capture="camera" @change="getImg($event)" >
        </div>
        <div >
          <img class= "logo" src="../images/jhline.png">
        </div>
        <div >
          <div class= "openPhoto" ></div>
          <input class="PhotoAlbum" type="file"  accept="image/*">
        </div>
      </div>
      <div>
        <span class="bottom_img"></span>
      </div>
    </div>
    <Row v-if = "showLoding">
      <i-col class="demo-spin-col" span="8">
          <Spin fix>
              <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              <div>图片正在努力识别中</div>
          </Spin>
      </i-col>
    </Row>
  </div>
</template>

<script>
import lrz from 'lrz'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      showLoding: false
    }
  },
  mounted () {

  },
  methods: {
    getImg (event) {
      this.showLoding = true
      var showFile = event.target.files[0]
      var file = this.$refs.uploadImg.files[0]
      lrz(file).then(function (rst) {
        console.log(rst.file)
      })
      console.log(showFile)
      var zipFormData = new FormData()
      zipFormData.append('image', file, showFile)
      // console.log(qs.stringify({ 'image': showFile }))
      this.$http.post('http://47.94.242.44:8080/ccb/image_detection', zipFormData)
        .then(
          (response) => {
            console.log(response)
            this.showLoding = false
            this.$router.push({path: '/details'})
          },
          (error) => {
            this.showLoding = false
            console.log(error)
          }
        )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.imgBox{
  width:7.5rem;
  height:100%;
  padding-top:1rem;
}
.imgFlex{
  width:100%;
  height:8.6rem;
  /*text-align: center;*/
}
.photographic{
  background:url(../images/photographic.png)no-repeat;
  background-size:cover;
  margin:0 auto;
  width:2.3rem;
  height:2.3rem;
}
.logo{
  width:7rem;
  height:0.6rem;
  margin-top:2.01rem;
  margin-bottom:2.01rem ;
  /*margin-left:-0.095rem;*/
}
.openPhoto{
  background:url(../images/openPhoto.png)no-repeat;
  background-size:cover;
  width:2.3rem;
  height:2.3rem;
  margin:0 auto;
}
.bottom_img{
  width:100%;
  height:1.11rem;
  background:url(../images/pattern.png)no-repeat;
  background-size:cover;
  position:absolute;
  left:0em;
  bottom:0;
}
#input{
  width:2.09rem;
  height:2.09rem;
  position: absolute;
  left:2.7rem;
  /*background-color:red;*/
  top:1rem;
  opacity:0;
  z-index: 100;
}
.PhotoAlbum{
  width:2.09rem;
  height:2.09rem;
  background:red;
  position: absolute;
  bottom: 3.5rem;
  left:2.7rem;
  opacity:0;
  z-index: 100;
}
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  .demo-spin-col{
    width:100%;
    height: 100%;
    position: relative;
    margin-top:3rem;
    font-size:0.24rem;
    /*border: 1px solid #eee;*/
  }
</style>
