<template>
<div class="login-page">
  <div class="login">
        <div class="login__form">
          <div class="login__row">
            <svg class="login__icon name svg-icon" viewBox="0 0 20 20">
              <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
            </svg>
            <input type="text" class="login__input name" placeholder="Username" v-model="name"/>
          </div>
          <div class="login__row">
            <svg class="login__icon pass svg-icon" viewBox="0 0 20 20">
              <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
            </svg>
            <input type="password" class="login__input pass" placeholder="Password"  v-model="pwd"/>
          </div>
          <button type="button" class="login__submit" @click="doLogin" :class="{processing: isProcessing, success: isSuccess}">注 册</button>
          <p class="login__signup">
            <router-link to="/user/login">
              登录
            </router-link>
          </p>
        </div>
      </div>
</div>
</template>
<script>
  import {httpPost} from 'common/utils/http-util'
  import * as Constants from 'common/const/constants'
  import Utils from 'common/utils/util.js'
  import CryptoJS from 'crypto-js'

  export default {
    data () {
      return {
        name: '',
        pwd: '',
        randomKey: '',
        animating: false,
        isProcessing: false,
        isSuccess: false
      }
    },
    methods: {
      doLogin: function () {
        if (this.name === '' || this.pwd === '') {
          return
        }
        if (this.animating) {
          return
        }
        this.animating = true
        this.isProcessing = true
        this.getRandom()
      },
      getRandom: function () {
        httpPost(Constants.SYSTEM.USR, 'random', {}).then((data) => {
          console.log('success')
          this.randomKey = data.randomKey
          this.login()
        }, (data) => {
          Utils.showValidate(data)
        })
      },
      login: function () {
        let key = CryptoJS.enc.Utf8.parse(this.randomKey)
        let srcs = CryptoJS.enc.Utf8.parse(this.pwd)
        let encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7})
        let p = encrypted.toString()
        console.log(p)
        let param = {'data': {'name': this.name, 'pwd': p}}
        let that = this
        httpPost(Constants.SYSTEM.USR, 'register', param).then((data) => {
          console.log('success')
          that.isSuccess = true
          Utils.showValidate('注册成功')
          setTimeout(function () {
            that.$router.push({'path': '/user/login'})
          }, 1500)
        }, (data) => {
          Utils.showValidate(data)
          that.animating = false
          that.isSuccess = false
          that.isProcessing = false
        })
      }
    },
    mounted () {
    }
  }
</script>
<style scoped>
  svg {
  display: inline-block;
  width: 28px;
  height: 28px;
  overflow: visible;
}
button:focus{
     outline:none;
}
.svg-icon {
  cursor: pointer;
}
.svg-icon path {
  stroke: rgba(255, 255, 255, 0.9);
  fill: none;
  stroke-width: 1;
}

.login-page {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.login {
  position: relative;
  height: 100%;
  background: linear-gradient(to bottom, rgba(29, 70, 98, 0.8) 0%, rgba(22, 15, 31, 0.6) 100%);
  transition: opacity 0.1s, transform 0.3s cubic-bezier(0.17, -0.65, 0.665, 1.25);
  transform: scale(1);
}
.login.inactive {
  opacity: 0;
  transform: scale(1.1);
}

.login__form {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 50%;
  text-align: center;
}
.login__row {
  height: 45px;;
  padding-top: 15px;
}
.login__icon {
  margin-bottom: -7px;
  margin-right: 8px;
}
.login__icon.name path {
  stroke-dasharray: 73.50196075439453;
  stroke-dashoffset: 73.50196075439453;
  animation: animatePath 2s 0.5s forwards;
}
.login__icon.pass path {
  stroke-dasharray: 92.10662841796875;
  stroke-dashoffset: 92.10662841796875;
  animation: animatePath 2s 0.5s forwards;
}
.login__input {
  display: inline-block;
  padding: 0 0 0 15px;
  border: 1px;
  width: 70%;
  height: 100%;
  padding-left: 16px;
  font-size: 20px;
  background: transparent;
  color: #FDFCFD;
}
.login__submit {
  position: relative;
  width: 90%;
  height: 44px;
  margin: 20px 15px 10px;
  color: rgba(255, 255, 255, 0.8);
  background: #5dcdbf;
  font-size: 20px;
  border-radius: 44px;
  cursor: pointer;
  overflow: hidden;
  transition: width 0.3s 0.15s, font-size 0.1s 0.15s;
  -webkit-appearance: none;
  border: 0px;
}
.login__submit:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -20px;
  margin-top: -20px;
  width: 40px;
  height: 40px;
  border: 2px dotted #fff;
  border-radius: 50%;
  border-left: none;
  border-bottom: none;
  animation: rotate 0.5s infinite linear;
  transition: opacity 0.1s 0.4s;
  opacity: 0;
}
.login__submit.processing {
  width: 44px;
  font-size: 0;
}
.login__submit.processing:after {
  opacity: 1;
}
.login__submit.success {
  transition: transform 0.3s 0.1s ease-out, opacity 0.1s 0.3s, background-color 0.1s 0.3s;
  transform: scale(30);
  opacity: 0.9;
}
.login__submit.success:after {
  transition: opacity 0.1s 0s;
  opacity: 0;
}
.login__signup {
  font-size: 16px;
  color: #ABA8AE;
  margin: 5px;
}
.login__signup a {
  color: #fff;
  cursor: pointer;
}


@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

@keyframes animatePath {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
