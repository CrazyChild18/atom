<template>

  <!--轮播图-->
  <!--reference: https://element-plus.gitee.io/zh-CN/component/carousel.html-->
  <div id="btn_up" @click="this.$refs.nop.prev();"><img height="50" src="../../../assets/up.png"></div>
  <el-carousel ref="nop" height="74vh" direction="vertical" :autoplay="false" arrow="always" loop="false" trigger="click">
    <el-carousel-item v-for="item in 5" :key="item">
      <div class="btndiv">
        <h3 style="height: 100%">
          <MusicContent></MusicContent>
        </h3>
      </div>
    </el-carousel-item>
  </el-carousel>
  <div id="btn_down" @click="this.$refs.nop.next();"><img height="50" src="../../../assets/down.png"></div>

</template>

<script setup>
import MusicContent from "@/components/MusicContent";
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  /*height: 85vh;*/
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

#btn_up, #btn_down {
  text-align: center;
  opacity: 0.5;
}
#btn_down {
  margin-top: 5px;
}

#btn_up{
margin-bottom: 5px;
}

</style>