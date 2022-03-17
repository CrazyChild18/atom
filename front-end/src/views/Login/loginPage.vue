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
        <alert
          v-if="sharedState.is_new"
          v-bind:variant="alertVariant"
          v-bind:message="alertMessage">
        </alert>
        <div class="welcome-page-title">Login</div>
        <!--登录表单区域-->
        <el-form  ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
          <!--用户名-->
<!--          <el-form-item prop="username">-->
<!--            <el-input-->
<!--                v-model="loginForm.username"-->
<!--                prefix-icon=""></el-input>-->
<!--          </el-form-item>-->
<!--          &lt;!&ndash;密码&ndash;&gt;-->
<!--          <el-form-item prop="password">-->
<!--            <el-input-->
<!--                v-model="loginForm.password"-->
<!--                prefix-icon=""-->
<!--                type="password"></el-input>-->
<!--          </el-form-item>-->
          <form @submit.prevent="onSubmit">
          <div class="form-group" v-bind:class="{'u-has-error-v1': loginForm.usernameError}">
            <label for="username">Username</label>
            <input type="text" v-model="loginForm.username" class="form-control" id="username" placeholder="">
            <small class="form-control-feedback" v-show="loginForm.usernameError">{{ loginForm.usernameError }}</small>
          </div>
          <div class="form-group" v-bind:class="{'u-has-error-v1': loginForm.passwordError}">
            <label for="password">Password</label>
            <input type="password" v-model="loginForm.password" class="form-control" id="password" placeholder="">
            <small class="form-control-feedback" v-show="loginForm.passwordError">{{ loginForm.passwordError }}</small>
          </div>
          <!--按钮区域-->
          <el-form-item class="btns">
            <button type="submit" class="btn btn-primary">登录</button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
<!--            <button href="/register">注册</button>-->
            <p>  New User? <router-link to="/register">Click to Register!</router-link></p>
          </el-form-item>
            </form>
        </el-form>
<!--        <el-menu-item index="/register">注册-->
<!--        <p index="">New User? >Click to Register!</p>-->
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import Alert from './Alert'
import store from '../../store.js'

export default {
  name: 'login',  //this is the name of the component
  components: {
    alert: Alert
  },
  data () {
    return {
      sharedState: store.state,
      alertVariant: 'info',
      alertMessage: 'Congratulations, you are now a registered user !',
      loginForm: {
        username: '',
        password: '',
        submitted: false,  // 是否点击了 submit 按钮
        errors: 0,  // 表单是否在前端验证通过，0 表示没有错误，验证通过
        usernameError: null,
        passwordError: null
      }
    }
  },
  methods: {
    onSubmit (e) {
      this.loginForm.submitted = true  // 先更新状态
      this.loginForm.errors = 0

      if (!this.loginForm.username) {
        this.loginForm.errors++
        this.loginForm.usernameError = 'Username required.'
      } else {
        this.loginForm.usernameError = null
      }

      if (!this.loginForm.password) {
        this.loginForm.errors++
        this.loginForm.passwordError = 'Password required.'
      } else {
        this.loginForm.passwordError = null
      }

      if (this.loginForm.errors > 0) {
        // 表单验证没通过时，不继续往下执行，即不会通过 axios 调用后端API
        return false
      }

      const path = 'http://localhost:5000/api/tokens'
      // axios 实现Basic Auth需要在config中设置 auth 这个属性即可
      axios.post(path, {}, {
        auth: {
          'username': this.loginForm.username,
          'password': this.loginForm.password
        }
      }).then((response) => {
          // handle success
          window.localStorage.setItem('atom-token', response.data.token)
          store.resetNotNewAction()
          store.loginAction()

          if (typeof this.$route.query.redirect == 'undefined') {
            this.$router.push('/')
          } else {
            this.$router.push(this.$route.query.redirect)
          }
        })
        .catch((error) => {
          // handle error
          if (error.response.status == 401) {
            this.loginForm.usernameError = 'Invalid username or password.'
            this.loginForm.passwordError = 'Invalid username or password.'
          } else {
            console.log(error.response)
          }
        })
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
  //background: transparent !important;
}
.username{
  //background: transparent !important;
}
.password{
  //background: transparent !important;
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