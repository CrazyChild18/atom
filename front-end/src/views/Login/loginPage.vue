<template>

  <!--reference: https://blog.51cto.com/u_15477976/4901327-->
  <div class="welcome-page">
    <vue-particles
        color="#ffffff"
        :particleOpacity="0.7"
        :particlesNumber="50"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
    >
    </vue-particles>
    <div class="welcome-page-center">
      <div class="welcome-page-content">
        <div class="welcome-page-title">Music-Hub</div>
        <div class="nav-item-group">
          <!--登录表单区域-->
          <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
            <!--用户名-->
            <el-form-item prop="username" class="username">
              <el-input
                  v-model="loginForm.username"
                  placeholder="请输入用户名"></el-input>
            </el-form-item>
            <!--密码-->
            <el-form-item prop="password" class="password">
              <el-input
                  v-model="loginForm.password"
                  placeholder="请输入密码"
                  type="password"></el-input>
            </el-form-item>
            <!--按钮区域-->
            <el-form-item class="btns">
              <el-button type="primary" @click="submitForm">登录</el-button>
              <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'loginPage',
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这是表单规则的对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          {
            required: true,
            message: '请输入登录名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        // 验证密码是否合法
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      },
      topNav: [{
        title: "Welcome to Login",
      }]
    }
  },
  methods: {
    jumpSystem(path) {
      window.open(path);
    },
    // 点击重置按钮
    resetLoginForm () {
      // console.log(this)
      // Element-UI 中的 resetFields 方法重置
      this.$refs.loginFormRef.resetFields()
    },
    // 用到了vue的element组件库，使用fetch解决了vue前台服务器和数据库后台服务器的跨域问题
    // 登录账号作为sessionStorage的值
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // 后台的验证
        fetch("/api/login",{
          method:"post",
          headers:{
            'content-type':'application/x-www-form-urlencoded'
          },
          body:`name=${this.loginForm.username}&pass=${this.loginForm.password}`
        }).then((r) => {
          return r.json()  //
        }).then((data) => {
          if (data.status == 'ok'){
              sessionStorage.setItem('accessToken',data.session)
              this.$router.push({name:'indexPage'})
          }else{
              this.$message.error(data.info);
              return false;
          }
        })
      });
    }
  }
}
</script>

<style lang="scss" scoped>
//npm install sass-loader -D
//npm install node-sass -D
.login_form {
  width: 100%;
  padding: 5% 15% 3%;
  box-sizing: border-box;
  background: transparent !important;
}
.username{
  background: transparent !important;
}
.password{
  background: transparent !important;
  margin-top: 6%;
}
.btns {
  margin-top: 10%;
  display: flex;
  justify-content: flex-end;
}
.welcome-page {
  font-size: 16px;
  color: #fff;
  background: url(../../../src/assets/loginBackground.jpg) no-repeat;
  min-height: 100vh;
}

.welcome-page-center {
  width: 50%;
  height: 50%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.welcome-page-title {
  font-size: 42px;
  padding-top: 5%;
  text-align: center;
  user-select: none;
}

.welcome-page-content {
  background-color: rgba(46, 46, 46, .61);
  border-radius: 10px;
  box-shadow: 0 0 20px 0 #f0f8ff;
}

.nav-item-group {
  padding: 18px 0;
}

.nav-item-title {
  font-size: 22px;
  padding-left: 20px;
}

.nav-item {
  display: inline-block;
  min-width: 128px;
  padding: 5px 10px;
  text-align: center;
  background: transparent;
  border: 1px solid #FFF;
  color: #f0f8ff;
  text-shadow: 0 0 0;
  border-radius: 5px;
  margin: 10px 20px;
}

.nav-item:hover {
  cursor: pointer;
  animation: .5s ease-in-out 0s 1 normal both running pulsate-bck;
}

@-webkit-keyframes pulsate-bck {
  0%, to {
    -webkit-transform: scale(1);
    transform: scale(1)
  }
  50% {
    -webkit-transform: scale(.9);
    transform: scale(.9)
  }
}

@keyframes pulsate-bck {
  0%, to {
    -webkit-transform: scale(1);
    transform: scale(1)
  }
  50% {
    -webkit-transform: scale(.9);
    transform: scale(.9)
  }
}
</style>