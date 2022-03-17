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
          <el-form  ref="registerFormRef" :model="registerForm"  label-width="0px" class="login_form">
             <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" v-model="registerForm.username" class="form-control" v-bind:class="{'is-invalid': registerForm.usernameError}" id="username" placeholder="">
            <div v-show="registerForm.usernameError" class="invalid-feedback">{{ registerForm.usernameError }}</div>
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" v-model="registerForm.email" class="form-control" v-bind:class="{'is-invalid': registerForm.emailError}" id="email" aria-describedby="emailHelp" placeholder="">
            <small v-if="!registerForm.emailError" id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            <div v-show="registerForm.emailError" class="invalid-feedback">{{ registerForm.emailError }}</div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="registerForm.password" class="form-control" v-bind:class="{'is-invalid': registerForm.passwordError}" id="password" placeholder="">
            <div v-show="registerForm.passwordError" class="invalid-feedback">{{ registerForm.passwordError }}</div>
          </div>
          <button type="submit" class="btn btn-primary" >Register</button>
        </form>
          </el-form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import store from '../../store.js'

export default {
  name: 'register', //this is the name of the component
  data () {
    return {
      registerForm: {
        username: '',
        email: '',
        password: '',
        submitted: false,  // 是否点击了 submit 按钮
        errors: 0,  // 表单是否在前端验证通过，0 表示没有错误，验证通过
        usernameError: null,
        emailError: null,
        passwordError: null
      }
    }
  },
  methods: {
    onSubmit (e) {
      this.registerForm.submitted = true  // 先更新状态
      this.registerForm.errors = 0

      if (!this.registerForm.username) {
        this.registerForm.errors++
        this.registerForm.usernameError = 'Username required.'
        console.log('用户名错误')
      } else {
        this.registerForm.usernameError = null
      }

      if (!this.registerForm.email) {
        this.registerForm.errors++
        this.registerForm.emailError = 'Email required.'
      } else if (!this.validEmail(this.registerForm.email)) {
        this.registerForm.errors++
        this.registerForm.emailError = 'Valid email required.'
      } else {
        this.registerForm.emailError = null
      }

      if (!this.registerForm.password) {
        this.registerForm.errors++
        this.registerForm.passwordError = 'Password required.'
      } else {
        this.registerForm.passwordError = null
      }

      if (this.registerForm.errors > 0) {
        // 表单验证没通过时，不继续往下执行，即不会通过 axios 调用后端API
        return false
      }

      const path = 'http://localhost:5000/api/users'
      const payload = {
        username: this.registerForm.username,
        email: this.registerForm.email,
        password: this.registerForm.password
      }
      axios.post(path, payload)
        .then((response) => {
          // handle success
          this.$router.push('/login')
        })
        .catch((error) => {
          // handle error
          for (var field in error.response.data.message) {
            if (field == 'username') {
              this.registerForm.usernameError = error.response.data.message.username
            } else if (field == 'email') {
              this.registerForm.emailError = error.response.data.message.email
            } else if (field == 'password') {
              this.registerForm.passwordError = error.response.data.message.password
            }
          }
        })
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
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