<template>
  <div class="mainBox">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:25px">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
      <el-breadcrumb-item>班级浏览</el-breadcrumb-item>
      <el-breadcrumb-item><b>查看班级成员</b></el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="2.5">
        <b>
          <i class="el-icon-document"></i>
        </b>
        <span>
          <b>班级成员信息</b>
        </span>
      </el-col>
    </el-row>

    <!-- 已审核班级成员 -->
    <el-table :data="FactoryOrderInfo" border>
      <el-table-column prop="number" label="学号" align="center"></el-table-column>
      <el-table-column prop="orderId" label="班级" align="center"></el-table-column>
      <el-table-column prop="number" label="姓名" align="center"></el-table-column>
      <el-table-column prop="orderSource" label="性别" align="center"></el-table-column>
      <el-table-column prop="orderSource" label="联系方式" align="center"></el-table-column>
      <el-table-column prop="orderSource" label="邮箱" align="center"></el-table-column>
    </el-table>

  </div>
</template>

<script>
  export default {
    name: "s-classmate",
    inject: ['reload'],
    methods: {
      mounted() {
        // 加载数据
        console.log("loading data.")
        this.$ajax({
          method: 'get',
          url: 'http://localhost:8080/order/findAll',
        }).then(response => {
          console.log(response.data);
          for (let i = 0; i < response.data.length; i++) {
            this.FactoryOrderInfo.push(response.data[i]);
          }
        });
      },
      data() {
        return {
          dialogCreateVisible: false,
          dialogUpdateVisible: false,
          create: {
            orderId: "",
            orderSource: "",
            totalPrice: "",
            remark: ""
          },
          update: {
            orderId: "",
            orderSource: "",
            totalPrice: "",
            remark: ""
          },
          FactoryOrderInfo: [],
        };
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
