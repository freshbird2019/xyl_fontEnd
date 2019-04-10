<template>
  <div class="mainBox">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:25px">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动浏览</el-breadcrumb-item>
      <el-breadcrumb-item><b>已参加的活动</b></el-breadcrumb-item>
    </el-breadcrumb>
    </el-breadcrumb>

    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="2.5">
        <b>
          <i class="el-icon-document"></i>
        </b>
        <span>
          <b>已申请参加的活动</b>
        </span>
      </el-col>
    </el-row>

    <!-- 待审核活动信息汇总 -->
    <el-table :data="FactoryOrderInfo" border>
      <el-table-column prop="number" label="活动编号" align="center"></el-table-column>
      <el-table-column prop="orderId" label="主题" align="center"></el-table-column>
      <el-table-column prop="orderSource" label="人数" align="center"></el-table-column>
      <el-table-column prop="orderSource" label="内容" align="center"></el-table-column>
      <el-table-column prop="orderSource" label="时间" align="center"></el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="small" icon="el-icon-delete" @click="removed(scope.row)">退出</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "s-iact",
    inject:['reload'],
    methods: {
      // 新建订单
      removed(currentOrder) {
        console.log("退出该活动");
        this.$confirm(
          "确定退出参加此活动？ " + currentOrder.orderId + ", 是否继续?",
          "提示",
          {
            type: "warning"
          }
        ).then(() => {
          console.log("确认拒绝此活动的申请");
          // 向请求服务端删除
          let orderId = currentOrder.orderId;
          console.log(orderId);
          this.$ajax.get('http://localhost:8080/order/deleteOne/'+orderId,).then(response=> {
            console.log(response);
            if(response.data=="success"){
              this.open1();
            }
          }).catch(function (error){
            console.log("delete failed！")
          });
        })
          .catch(() => {
            this.$message.info("已取消操作!");
          });
      },
      open1() {
        this.$message({
          message: '已退出该活动',
          type: 'success'
        });
        this.reload();
      },
      open2() {
        this.$message({
          message: '已通过此活动的申请',
          type: 'success'
        });
        this.reload();
      },
      open3() {
        this.$message({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },
    },
    mounted(){
      // 加载数据
      console.log("loading data.")
      this.$ajax({
        method:'get',
        url:'http://localhost:8080/order/findAll',
      }).then(response=>{
        console.log(response.data);
        for(let i= 0; i<response.data.length;i++) {
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
  };
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
