<template>
  <div>
    <div class="pics" height="150px">
      <el-carousel height="400px":interval="5000" arrow="always">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <h2 align="center">在线校友录管理系统</h2>
    <div class="b" align="center" >
      <el-tabs type="border-card" style="width:40%;"stretch="true">
        <el-tab-pane label="校友注册" >
          <div class="login-wrap" v-show="showLogin" >
            <p v-show="showTishi">{{tishi}}</p>
            <input type="text" placeholder="请输入用户名" v-model="username">
            <input type="password" placeholder="请输入密码" v-model="password">
            <el-button type="info" @click="register"style="background:#D79B7C;border:none">注 册</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>


<script>
  import {setCookie,getCookie} from '../../assets/js/cookie.js'
  export default{
    mounted(){
      /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
      if(getCookie('username')){
        this.$router.push('/home')
      }
    },
    methods:{
       register() {
        if (this.newUsername == "" || this.newPassword == "") {
          alert("请输入用户名或密码")
        } else {
          let data = {'username': this.newUsername, 'password': this.newPassword}
          this.$http.post('http://localhost/vueapi/index.php/Home/user/register', data).then((res) => {
            console.log(res)
            if (res.data == "ok") {
              this.tishi = "注册成功"
              this.showTishi = true
              this.username = ''
              this.password = ''
              /*注册成功之后再跳回登录页*/
              setTimeout(function () {
                this.showRegister = false
                this.showLogin = true
                this.showTishi = false
              }.bind(this), 1000)
            }
          })
        }
      }
    },

    data(){
      return{
        showLogin: true,
        showRegister: false,
        showTishi: false,
        tishi: '',
        username: '',
        password: '',
        newUsername: '',
        newPassword: ''
      }
    }
  };

</script>

<style>
  .login-wrap{text-align:center;}
  input{display:block; width:250px; height:40px; line-height:40px; margin:0 auto; margin-bottom: 10px; outline:none; border:1px solid #888; padding:10px; box-sizing:border-box;}

  .register{float:left;}
  .pic{float:left;}

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    float:left;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
