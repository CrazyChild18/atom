<template>
    <el-aside width="200px">
      <div style="margin-left: 17%; height: 20%; margin-top: 30%;">
        <!--标题-->
        <h2 style="display: inline">Music-</h2>
        <h2 style="display: inline; color: orange;background-color: black">Hub</h2>
        <!--用户头像-->
        <div class="demo-basic--circle">
        <div class="block" style="margin-left: 15%; margin-top: 15%">
          <el-avatar :size="70" :src="circleUrl" @click="open"></el-avatar>
        </div>
      </div>
      </div>


      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router="True"
      >
        <el-menu-item index="/music">
          <el-icon><monitor /></el-icon>
          <template #title>Music Show</template>
        </el-menu-item>
        <el-menu-item index="/info">
          <el-icon><avatar /></el-icon>
          <template #title>Account</template>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><share /></el-icon>
          <template #title>Share</template>
        </el-menu-item>
        <el-menu-item index="/login">
          <el-icon><circle-close-filled /></el-icon>
          <template #title>Log in</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
</template>

<script setup>
import {
  Monitor,
  Avatar,
  Share,
  CircleCloseFilled,
} from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { reactive, toRefs } from 'vue'

const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['large', 'default', 'small'],
})

const { circleUrl } = toRefs(state)

const open = () => {
  ElMessageBox.prompt('Please input your e-mail', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern:
      /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: 'Invalid Email',
  })
    .then(({ value }) => {
      ElMessage({
        type: 'success',
        message: `Your email is:${value}`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled',
      })
    })
}
</script>

<style>
.el-aside{
  height: 100vh;
  background-color: orange;
}
.el-menu-item{
  background-color: orange;
}
</style>