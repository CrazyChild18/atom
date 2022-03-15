<template>
  <div class="fullPage" ref="fullPage">
    <div
     class="fullPageContainer"
     ref="fullPageContainer"
     @mousewheel="mouseWheelHandle"
    >
      <div class="section section1">
         <div class="common-layout" style="height: 100%">
            <el-container style="height: 100%">
              <el-aside width="300px" style="height: 100%">
                <!--歌曲名-->
                <h3 style="height: 30%; text-align: center; margin-top: 20%">{{musicNameList[0]}}</h3>
              </el-aside>
              <el-main style="height: 100%">
                <audio
                    :src="musicUrlList[0]"
                    type="audio/mpeg"
                    controls
                    autoplay
                    loop></audio>
              </el-main>
            </el-container>
          </div>
      </div>
      <div class="section section2">
        <div class="common-layout" style="height: 100%">
            <el-container style="height: 100%">
              <el-aside width="300px" style="height: 100%">
                <!--歌曲名-->
                <h3 style="height: 30%; text-align: center; margin-top: 20%">{{musicNameList[1]}}</h3>
              </el-aside>
              <el-main style="height: 100%;">
                <audio
                    :src="musicUrlList[1]"
                    type="audio/mpeg"
                    controls
                    autoplay
                    loop></audio>
              </el-main>
            </el-container>
          </div>
      </div>
      <div class="section section3">
        <div class="common-layout" style="height: 100%">
            <el-container style="height: 100%">
              <el-aside width="300px" style="height: 100%">
                <!--歌曲名-->
                <h3 style="height: 30%; text-align: center; margin-top: 20%">{{musicNameList[2]}}</h3>
              </el-aside>
              <el-main style="height: 100%">
                <audio
                    :src="musicUrlList[2]"
                    type="audio/mpeg"
                    controls
                    autoplay
                    loop></audio>
              </el-main>
            </el-container>
          </div>
      </div>
      <div class="section section4">
        <div class="common-layout" style="height: 100%">
            <el-container style="height: 100%">
              <el-aside width="300px" style="height: 100%">
                <!--歌曲名-->
                <h3 style="height: 30%; text-align: center; margin-top: 20%">{{musicNameList[3]}}</h3>
              </el-aside>
              <el-main style="height: 100%">
                <audio
                    :src="musicUrlList[3]"
                    type="audio/mpeg"
                    controls
                    autoplay
                    loop></audio>
              </el-main>
            </el-container>
          </div>
      </div>
      <div class="section section5">
        <div class="common-layout" style="height: 100%">
            <el-container style="height: 100%">
              <el-aside width="300px" style="height: 100%">
                <!--歌曲名-->
                <h3 style="height: 30%; text-align: center; margin-top: 20%">{{musicNameList[4]}}</h3>
              </el-aside>
              <el-main style="height: 100%">
                <audio
                    :src="musicUrlList[4]"
                    type="audio/mpeg"
                    controls
                    autoplay
                    loop></audio>
              </el-main>
            </el-container>
          </div>
      </div>
      <div class="section section6">
        <div class="common-layout" style="height: 100%">
            <el-container style="height: 100%">
              <el-aside width="300px" style="height: 100%">
                <!--歌曲名-->
                <h3 style="height: 30%; text-align: center; margin-top: 20%">{{musicNameList[5]}}</h3>
              </el-aside>
              <el-main style="height: 100%">
                <audio
                    :src="musicUrlList[5]"
                    type="audio/mpeg"
                    controls
                    autoplay
                    loop></audio>
              </el-main>
            </el-container>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
 name: "musicShow2",
 data() {
  return {
    musicNameList:[],//歌曲名称
    musicIDList:[],// 歌曲数组，存放歌曲id
    musicUrlList:[],// 歌曲地址

    musicCover:"",// 歌曲封面
    isPlaying:false,// 动画播放状态
    mvUrl:"",// mv地址
    playStatus: false, //播放状态，用来控制播放、暂停按钮的显示
    Timer: "", //定时器，我们需要实时监听到歌曲的播放进度
    currentBar: 0, //进度条长度，默认为0，根据歌曲进度同步更新
    currentText: "00:00", //进度条旁边的播放时间，同样要实时更新
    durationText: "00:00", //当前歌曲的播放时长
    currentRow:0,
    listShow: false,  //控制播放列表的显示
    fullpage: {
      current: 1, // 当前的页面编号
      isScrolling: false, // 是否在滚动,是为了防止滚动多页，需要通过一个变量来控制是否滚动
      deltaY: 0 // 返回鼠标滚轮的垂直滚动量，保存的鼠标滚动事件的deleteY,用来判断是往下还是往上滚
    }
  };
 },
 methods: {
   next() { // 往下切换
     let len = 6; // 页面的个数
     if (this.fullpage.current + 1 <= len) { // 如果当前页面编号+1 小于总个数，则可以执行向下滑动
       this.fullpage.current += 1; // 页面+1
       this.move(this.fullpage.current); // 执行切换
     }
   },
   pre() {// 往上切换
     if (this.fullpage.current - 1 > 0) { // 如果当前页面编号-1 大于0，则可以执行向下滑动
       this.fullpage.current -= 1;// 页面+1
       this.move(this.fullpage.current);// 执行切换
     }
   },
   move(index) {
     this.fullpage.isScrolling = true; // 为了防止滚动多页，需要通过一个变量来控制是否滚动
     this.directToMove(index); //执行滚动
     setTimeout(() => {    //这里的动画是1s执行完，使用setTimeout延迟1s后解锁
       this.fullpage.isScrolling = false;
     }, 1010);
   },
   directToMove(index) {
     let height = this.$refs["fullPage"].clientHeight; //获取屏幕的宽度
     let scrollPage = this.$refs["fullPageContainer"];  // 获取执行tarnsform的元素
     let scrollHeight; // 计算滚动的告诉，是往上滚还往下滚
     scrollHeight = -(index - 1) * height + "px";
     scrollPage.style.transform = `translateY(${scrollHeight})`;
     this.fullpage.current = index;
   },
   mouseWheelHandle(event) { // 监听鼠标监听
     // 添加冒泡阻止
     let evt = event || window.event;
     if (evt.stopPropagation) {
       evt.stopPropagation();
     } else {
       evt.returnValue = false;
     }
     if (this.fullpage.isScrolling) { // 判断是否可以滚动
       return false;
     }
     let e = event.originalEvent || event;
     this.fullpage.deltaY = e.deltaY || e.detail; // Firefox使用detail
     if (this.fullpage.deltaY > 0) {
       this.next();
     } else if (this.fullpage.deltaY < 0) {
       this.pre();
     }
   },

   // 歌曲列表
   getMusicList: function () {
     const that = this;
     const type = 0; // 获取歌类型
     axios.get("http://localhost:3000/top/song?type=" + type)
         .then(
             function (res) {
               for (let i = 0; i < 10; i++) {
                 // 执行获取id列表
                 that.musicIDList[i] = res.data.data[i].id;
                 // 执行获取歌名列表
                 // that.musicUrlList[i] = that.getMusicURL(res.data.data[i].id);
                axios.get("http://localhost:3000/song/url?id=" + res.data.data[i].id)
                         .then(
                             function (res) {
                               // console.log(res);
                               that.musicUrlList[i] = res.data.data[0].url;
                             }, function (err) {
                          });
                 // 执行获取url列表
                 // that.musicNameList[i] = that.getMusicName(res.data.data[i].id);
                 axios.get("http://localhost:3000/song/detail?ids=" + res.data.data[i].id)
                         .then(
                             function (res) {
                               console.log(res);
                               that.musicNameList[i] = res.data.songs[0].name;
                             }, function (err) {
                             });

               }
             }, function (err) {
             });
     // console.log(that.musicNameList);
   },
 },
  created() {
    this.getMusicList();
  },
};

</script>

<style scoped>
.lyric-row{
  height: 30px;
}
.wordListPart::-webkit-scrollbar { width: 0 !important }
.fullPage{
 height: 100%;
 overflow: hidden;
 background-color: rgb(189, 211, 186);
}
.fullPageContainer{
 width: 100%;
 height: 100%;
 transition: all linear 0.5s;
}
.section {
 width: 100%;
 height: 100%;
 background-position: center center;
 background-repeat: no-repeat;
}
.section1 {
 background-color: rgb(189, 211, 186);
}
.section1 .secction1-content {
 color: #ffdb53;
 text-align: center;
 position: absolute;
 top: 40%;
 right: 0;
 left: 0;
}
.secction1-content h1 {
 font-size: 40px;
 padding-bottom: 30px;
}
.secction1-content p {
 font-size: 20px;
}
.section2 {
 background-color: rgb(31, 45, 27);
}
.section3 {
 background-color: rgb(25, 110, 74);
}
.section4 {
 background-color: rgb(201, 202, 157);
}
.section5 {
 background-color: rgb(163, 157, 202);
}
.section6 {
 background-color: rgb(176, 40, 64);
}
</style>