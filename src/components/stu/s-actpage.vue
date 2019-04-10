<template>
  <div class="mainBox">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:25px">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动浏览</el-breadcrumb-item>
      <el-breadcrumb-item><b>当前活动信息</b></el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="2.5">
        <b>
          <i class="el-icon-document"></i>
        </b>
        <span>
          <b>活动信息汇总</b>
        </span>
      </el-col>
    </el-row>

    <!-- 活动汇总 -->
    <el-table :data="FactoryOrderInfo" border>
      <el-table-column prop="number" label="活动编号" align="center"></el-table-column>
      <el-table-column prop="orderId" label="主题" align="center"></el-table-column>
      <el-table-column prop="orderSource" label="人数" align="center"></el-table-column>
      <el-table-column prop="orderSource" label="内容" align="center"></el-table-column>
      <el-table-column prop="orderSource" label="时间" align="center"></el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-setting"
            @click="setCurrent(scope.row)"
          >申请加入</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-col :span="1"  style="margin-left:89%;margin-top:3%;">
      <el-button type="info" @click="dialogCreateVisible = true" style="background:#C19892;border:none">发起新活动</el-button>
    </el-col>
    <!-- 新建活动 -->
    <el-dialog title="发起新活动" :visible.sync="dialogCreateVisible"width="30%" align="center">
      <el-form id="#create" :model="create" ref="create" label-width="100px">
        <el-form-item label="活动编号" prop="username">
          <el-input v-model="create.orderId"></el-input>
        </el-form-item>
        <el-form-item label="主题" prop="name">
          <el-input v-model="create.orderSource"></el-input>
        </el-form-item>
        <el-form-item label="人数" prop="password">
          <el-input v-model="create.totalPrice" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="checkpass">
          <el-input v-model="create.remark" type="password"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="checkpass">
          <el-input v-model="create.remark" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" @click="createOrder"style="background:#C19892;border:none">确 定</el-button>
        <el-button @click="dialogCreateVisible = false">取 消</el-button>

      </div>
    </el-dialog>

    <!-- 修改活动信息 -->
    <el-dialog
      title="修改活动信息"
      :visible.sync="dialogUpdateVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form id="#update" :model="update" ref="update" label-width="100px">
        <el-form-item label="活动编号" prop="orderId">
          <el-input v-model="update.orderId"></el-input>
        </el-form-item>
        <el-form-item label="主题" prop="orderSource">
          <el-input v-model="update.orderSource"></el-input>
        </el-form-item>
        <el-form-item label="人数" prop="totalPrice">
          <el-input v-model="update.totalPrice"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="totalPrice">
          <el-input v-model="update.remark"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="checkpass">
          <el-input v-model="create.remark" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateOrder"style="background:#C19892;border:none">确 定</el-button>
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>

      </div>
    </el-dialog>

  </div>
</template>

<script>
    export default {
        name: "s-actpage",
      methods: {
        // 新建活动
        createOrder() {
          let data = this.create;
          console.log(data);
          this.$ajax.post('http://localhost:8080/order/saveOne/', JSON.stringify(data),
            {
              headers: { 'Content-Type': 'application/json;charset=UTF-8'}
            }
          ).then(response=> {
            console.log(response);
            this.dialogCreateVisible=false;
            this.open2();
          }).catch(function (error){
            console.log("save failed！")
          });
        },
        setCurrent(currentOrder) {
          console.log(currentOrder);
          this.update.orderId = currentOrder.orderId;
          this.update.orderSource = currentOrder.orderSource;
          this.update.totalPrice = currentOrder.totalPrice;
          this.update.remark = currentOrder.remark;
          this.dialogUpdateVisible = true;
          console.log(this.dialogUpdateVisible);
        },
        updateOrder() {
          console.log("确定编辑活动信息");
          this.dialogUpdateVisible = false;
        },
        // 删除订单
        removed(currentOrder) {
          console.log("删除此活动");
          this.$confirm(
            "此操作将删除此活动信息 " + currentOrder.orderId + ", 是否继续?",
            "提示",
            {
              type: "warning"
            }
          ).then(() => {
            console.log("确认删除活动");
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
            message: '已成功删除此活动',
            type: 'success'
          });
          this.reload();
        },
        open2() {
          this.$message({
            message: '已成功添加活动',
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
</style>
