<template>
  <div class="mainBox">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:25px">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
      <el-breadcrumb-item>班级浏览</el-breadcrumb-item>
      <el-breadcrumb-item><b>班级信息查看</b></el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="2.5">
        <b>
          <i class="el-icon-document"></i>
        </b>
        <span>
          <b>班级信息查看</b>
        </span>
      </el-col>
    </el-row>
    <!-- 班级汇总 -->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="班级名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="班级人数">
                <span>{{ props.row.number }}</span>
              </el-form-item>
              <el-form-item label="入学年份">
                <span>{{ props.row.syear }}</span>
              </el-form-item>
              <el-form-item label="毕业年份">
                <span>{{ props.row.fyear }}</span>
              </el-form-item>
              <el-form-item label="班级口号">
                <span>{{ props.row.talk }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="班级号"
          prop="id">
        </el-table-column>
        <el-table-column
          label="班级名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="年份"
          prop="syear">
        </el-table-column>
        <el-table-column
          label="专业"
          prop="desc">
        </el-table-column>
        <el-table-column
          label="操作"
          prop="desc">
          <template slot-scope="scope">
            <el-button type="info"  size="mini" @click="setCurrent(scope.row)"style="background:#C19892;border:none">申请</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
  export default {
    name: "MainBox",
    inject:['reload'],
    methods: {
      setCurrent(currentOrder) {
        console.log(currentOrder);
        this.update.orderId = currentOrder.orderId;
        this.update.orderSource = currentOrder.orderSource;
        this.update.totalPrice = currentOrder.totalPrice;
        this.update.remark = currentOrder.remark;
        this.dialogUpdateVisible = true;
        console.log(this.dialogUpdateVisible);
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
        update: {
          orderId: "",
          orderSource: "",
          totalPrice: "",
          remark: ""
        },
        tableData: [{
          id: '1',
          name: '信安1601',
          number: '30',
          syear: '2016',
          fyear: '2020',
          talk:'Good',
          desc:'计算机'
        }, {
          id: '2',
          name: '信安1602',
          number: '32',
          syear: '2016',
          fyear: '2020',
          talk:'Fine',
          desc:'计算机'
        }, {
          id: '3',
          name: '软件1601',
          number: '28',
          syear: '2016',
          fyear: '2020',
          talk:'Hello',
          desc:'计算机'
        }, {
          id: '4',
          name: '软件1602',
          number: '27',
          syear: '2016',
          fyear: '2020',
          talk:'yeah！',
          desc:'计算机'
        }]
        }
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
