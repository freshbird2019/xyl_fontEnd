<template>
  <div class="a" >
    <div class="pics" >
    <el-carousel height="400px":interval="5000" arrow="always" >
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    </div>
    <h2 align="center" >在线校友录管理系统</h2>
    <div class="b" align="center" >
    <el-tabs type="border-card" style="width:40%;"stretch="true" >
      <el-tab-pane label="管理员登录"  >
        <div class="login-wrap" v-show="showLogin" >
          <p v-show="showTishi">{{tishi}}</p>
          <input type="text" placeholder="请输入用户名" v-model="username">
          <input type="password" placeholder="请输入密码" v-model="password">
          <el-button type="info" @click="loginGly"style="background:#D79B7C;border:none">登 录</el-button>
          <router-link to="/stu/s-welcome">
            <el-button type="info" style="background:#D79B7C;border:none">测 试</el-button>
          </router-link>
        </div>
      </el-tab-pane>
      <el-tab-pane label="校友登录" >
        <div class="login-wrap" v-show="showLogin" >
          <p v-show="showTishi">{{tishi}}</p>
          <input type="text" placeholder="请输入用户名" v-model="username">
          <input type="password" placeholder="请输入密码" v-model="password">
          <el-button type="info" @click="loginXy"style="background:#D79B7C;border:none">登 录</el-button>
          <el-button type="info" @click="ToRegister"style="background:#D79B7C;border:none">注 册</el-button>
          <router-link to="/adm/a-welcome">
          <el-button type="info" style="background:#D79B7C;border:none">测 试</el-button>
          </router-link>
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

      loginXy() { // 校友登陆

      },

      loginGly(){ //管理员登陆
        if(this.username == "" || this.password == ""){
          alert("请输入用户名或密码")
        }else{
          let data = {'username':this.username,'password':this.password};
          let info = "id="+this.username+"&pw="+this.password;
          /*接口请求*/
          this.$ajax.post('http://localhost:8088/xyl/checkLogin?'+info).then((res)=>{
            console.log(res)
            /*接口的传值是(false,该用户不存在),(false,密码错误)，同时还会检测管理员账号的值*/
            if(! res.data){
              this.tishi = "用户名或密码错误"
              this.showTishi = true
            }else{
              this.tishi = "登录成功"
              this.showTishi = true
              setCookie('username',this.username,1000*60)
              setTimeout(function(){
                this.$router.push('/adm/a-classpage')
              }.bind(this),1000)
            }
          })
        }
      },
      ToRegister(){
        this.$router.push('/login/register')
      },
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
  body{background-color: #E0CDCF}
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
  .el-tabs__item{
    background-color:#DDDDDD;
    color:#fff!important;
    font-size:16px;
  }
  .el-tabs__item.is-active{
    background-color:#ffffff;
    color:#D79B7C!important;

  }
</style>
