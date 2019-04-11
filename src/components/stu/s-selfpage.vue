<template>
  <div class="mainBox">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:25px">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item><b>修改个人信息</b></el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="2.5">
        <b>
          <i class="el-icon-document"></i>
        </b>
        <span>
          <b>个人信息</b>
        </span>
      </el-col>
    </el-row>


                  <span>"姓名："{{ nowxyinfo.name }}</span>


                  <span>"性别："{{ nowxyinfo.sex}}</span>


                  <span>"电话："{{ nowxyinfo.phone }}</span>



                  <span>"邮箱："{{ nowxyinfo.mail }}</span>




                  <span>"地址："{{ nowxyinfo.address }}</span>


    <el-col :span="1"  style="margin-left:93%;margin-top:3%;">
      <el-button type="info" @click="setCurrent()" style="background:#C19892;border:none">修改与完善</el-button>
    </el-col>

    <el-dialog
      title="修改成员信息"
      :visible.sync="dialogUpdateVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form id="#update" :model="update" ref="update" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="update.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="update.sex"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="update.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="mail">
          <el-input v-model="update.mail"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="update.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="Modify">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import {getCookie} from "../../assets/js/cookie";

    export default {
        name: "s-selfpage",
      mounted(){
        // 加载数据
        let name=this.xyname
        console.log(name)
        this.$http.post('http://127.0.0.1:8088/xyl/getXyByname?xyname='+name).then(response=>{
          console.log(response.data);
          this.nowxyinfo=response.data;
        });
      },
      methods:{
        setCurrent() {
          this.update.name = this.xyInfo.name;
          this.update.sex = this.xyInfo.sex;
          this.update.phone = this.xyInfo.phone;
          this.update.mail=this.xyInfo.mail;
          this.update.address=this.xyInfo.address;
          this.dialogUpdateVisible = true;
          console.log(this.dialogUpdateVisible);
        },
        Modify(){
          console.log("确定编辑班级成员信息");
          this.dialogUpdateVisible = false;
        },
      },
      data(){
        return {
          dialogUpdateVisible: false,
          xyname: getCookie("xyusername"),
          nowxyinfo:{
          name: "",
            sex: "",
            phone: "",
            mail: "",
            address:"",
            clazz: []
        },
          update: {
            name: "",
            sex: "",
            phone: "",
            mail: "",
            address:"",
            clazz: []
          },
        };
      },
    }
</script>

<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

  .orderTitle {
    border-bottom: 2px #B68C8C solid;
    font-size: 24px;
    padding-bottom: 10px;
  }
  .board {
    font-size: 20px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
