<template>
  <h2>音乐详情页面</h2>
  <h2>歌曲id: {{musicId}}</h2>
  <h2>歌曲名称: {{musicName}}</h2>
  <h2>作者: {{musicWriter}}</h2>
  <h2>歌词: {{musicWord}}</h2>
  <img :scr="musicPic"/>
</template>

<script>
import axios from "axios";
export default {
  name: "musicDetail",
  data(){
    return{
      musicId: '', // 歌曲id
      musicName: '', // 歌曲名称
      musicWord: '', // 歌词
      musicWriter: '', // 作者
      musicPic: '', // 封面
    }
  },
  created() {},
  mounted: function () {
    // console.log(this.$route);
    this.musicId = this.$route.query.musicId;
    this.getMusicDetail();
  },
  methods:{
    // 获取歌曲详情
    getMusicDetail: function () {
      const that = this;
      axios.get("http://localhost:3000/song/detail?ids=" + that.musicId)
          .then(
              function (res) {
                console.log(res)
                that.musicName = res.data.songs[0].name;
                that.musicPic = res.data.songs[0].al.picUrl;
                console.log(that.musicPic);
              }, function (err) {
              });
    }
  },
}
</script>

<style scoped>
</style>