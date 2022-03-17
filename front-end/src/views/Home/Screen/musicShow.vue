<template>
  <div class="music">
    <ul class="music-list" @mousewheel="changeMusic" :style="{transform: `translate(0,${musicCur * -100}%)`}">
      <li v-for="item in musicList" :key="item.name">

        <!--左半侧-->
        <aside class="music-left">
          <h2 class="MusicTitle">{{ item.name }}</h2>
          <ul v-for="w in item.writer" :key="w" style="margin-top: 30%">
            <li style="margin-top: 5%; text-align: right; margin-right: 5%; list-style: none; color: black"><h4>{{ w }}</h4></li>
          </ul>
        </aside>

        <!--右半侧-->
        <div class="music-right">
          <!--歌曲详情按钮-->
          <el-button type="primary" class="float-right" round @click="turnDetailPage(item.id)" style="margin-right: 25px">
            Go for Detail
            <el-icon class="el-icon--right">
              <ArrowRight/>
            </el-icon>
          </el-button>
          <img class="musicPic" :src="item.picUrl"/>
          <!--音频-->
          <audio
              class="musicAudio"
              :src="item.url"
              ref="musicAudioControl"
              controls>
          </audio>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import {
  ArrowRight
} from '@element-plus/icons-vue';

export default {
  name: "musicShow",

  components: {
    ArrowRight
  },

  data() {
    return {
      musicCur: 0,	//当前显示的是第几条
      musicTime: 0, //理论上是控制滑动速度的
      musicList: [], //初始化数据，插入5条
    };
  },

  methods: {
    // 切换音乐
    changeMusic({deltaY}) {
      // 根据显示页面来控制播放器播放音乐
      console.log(this.$refs.musicAudioControl[this.musicCur])
      // this.$refs.musicAudioControl[this.musicCur]
      const now = new Date().getTime()
      if (this.musicTime + 600 > now) return;
      this.musicTime = now
      this.musicCur += (deltaY > 0 ? 1 : -1)
      if (this.musicCur < 0) this.musicCur = 0;
      // 重新插入5组数据
      // 在显示倒数第二个页面时开始加载
      if (this.musicCur >= this.musicList.length-1) {
        const currentLength = this.musicList.length;
        const targetLength = currentLength * 2;
        const that = this;
        axios.get("http://localhost:3000/personalized/newsong?limit=" + targetLength)
            .then(
                function (res) {
                  for (let i = 0; i < targetLength; i++) {
                    if(i > currentLength-1){
                      const musicItem = {};
                      // 执行获取id列表
                      musicItem.id = res.data.result[i].id;
                      musicItem.name = res.data.result[i].name;
                      musicItem.picUrl = res.data.result[i].picUrl;
                      const writers = []
                      if(res.data.result[i].song.artists.length > 1){
                        for (let j=0; j<res.data.result[i].song.artists.length; j++){
                          writers.push(res.data.result[i].song.artists[j].name)
                        }
                      }else{
                        writers.push(res.data.result[i].song.artists[0].name)
                      }
                      musicItem.writer = writers
                      // 执行获取url列表
                      axios.get("http://localhost:3000/song/url?id=" + res.data.result[i].id)
                          .then(
                              function (res) {
                                musicItem.url = res.data.data[0].url;
                              },
                              function (err) {
                              });
                      that.musicList.push(musicItem);
                    }
                  }
                },
                function (err) {
                });
      }
    },

    // 页面跳转函数
    turnDetailPage: function (musicId) {
      this.$router.push({
        path: '/musicDetail',
        query: {
          musicId: musicId
        }
      })
    },

    // 初始化歌曲列表
    getMusicList: function () {
      const that = this;
      axios.get("http://localhost:3000/personalized/newsong?limit=5")
          .then(
              function (res) {
                console.log(res);
                for (let i = 0; i < 5; i++) {
                  const musicItem = {};
                  // 执行获取id列表
                  musicItem.id = res.data.result[i].id;
                  musicItem.name = res.data.result[i].name;
                  musicItem.picUrl = res.data.result[i].picUrl;
                  const writers = []
                  if(res.data.result[i].song.artists.length > 1){
                    for (let j=0; j<res.data.result[i].song.artists.length; j++){
                      writers.push(res.data.result[i].song.artists[j].name)
                    }
                  }else{
                    writers.push(res.data.result[i].song.artists[0].name)
                  }
                  musicItem.writer = writers
                  // 执行获取url列表
                  axios.get("http://localhost:3000/song/url?id=" + res.data.result[i].id)
                      .then(
                          function (res) {
                            musicItem.url = res.data.data[0].url;
                          },
                          function (err) {
                          });
                  that.musicList.push(musicItem);
                }
              },
              function (err) {
              });
    },

    // 测试函数
    // 用于检测系统账号是否登录
    checkLoginStatus() {
      axios.get("http://localhost:3000/login/status")
          .then(
              function (res) {
                console.log("系统已登陆")
              },
              function (err) {
                console.log("系统未登录")
              });
    }
  },

  created() {
    this.checkLoginStatus();
    this.getMusicList();
  },

};
</script>

<style>
.el-main {
  height: 0;
}
</style>
<style lang="scss" scoped>
*{
}
.music {
  height: 100%;
  width: 100%;
  overflow: hidden;

  .music-list {
    width: 100%;
    overflow: visible;
    height: 100%;
    padding: 0;
    position: relative;
    transition: all 0.5s;
    color: #fff;

    > li {
      list-style: none;
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      align-items: stretch;

      .music-left {
        width: 30%;
        font-size: 50px;
        border-style: double;
        border-color: orange;
        border-radius: 50px;
        border-width: 15px;
        border-right: none;
        background-color:transparent;
      }

      .music-right {
        flex: 1;
        height: 100%;
        border-style: double;
        border-color: orange;
        border-radius: 50px;
        border-width: 15px;
        border-left: none;
        border-top: none;
        border-bottom: none;
        background-color:transparent;
      }
    }
  }
}
.MusicTitle{
  text-align: center;
  margin-top: 60%;
  margin-bottom: 10%;
  border-bottom-style: dashed;
  border-bottom-color: #5fa0fd;
  padding-bottom: 20px;
  border-bottom-width: 4px;
  border-top-style: dashed;
  border-top-color: #5fa0fd;
  padding-top: 20px;
  border-top-width: 4px;
  color: #1679fd;
  font-weight: bolder;
}
.musicPic{
  width: 50%;
  margin-top: 15%;
  margin-left: 25%;
  border-radius:50%;
  -webkit-transform: rotate(360deg);
  animation: rotation 10s linear infinite;
  -moz-animation: rotation 10s linear infinite;
  -webkit-animation: rotation 10s linear infinite;
  -o-animation: rotation 10s linear infinite;
  box-shadow: 0 10px 60px rgba(53,53,53,0.53) ;
}
@-webkit-keyframes rotation {
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
}
.musicAudio{
  float: bottom;
  margin-bottom: 0px;
  width: 80%;
  margin-left: 10%;
}
</style>