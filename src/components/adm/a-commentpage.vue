<template>
  <div>
    <div class="mainBox">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:25px">
        <el-breadcrumb-item >首页</el-breadcrumb-item>
        <el-breadcrumb-item>留言管理</el-breadcrumb-item>
        <el-breadcrumb-item><b>查看当前留言</b></el-breadcrumb-item>
      </el-breadcrumb>

      <el-row :gutter="20" class="orderTitle">
        <!--标题-->
        <el-col :span="2.5">
          <b>
            <i class="el-icon-document"></i>
          </b>
          <span>
          <b>留言板</b>
        </span>
        </el-col>
      </el-row>
      <!-- 留言汇总 -->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column >
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-row>
                <el-col :span="7">
                  <el-form-item label="序号：">
                    <span>{{ props.row.lid }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item label="留言人：">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item label="时间：">
                    <span>{{ moment(props.row.lydate).format('YYYY-MM-DD HH:mm:ss') }}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="内容：">
                    <span>{{ props.row.info }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          prop="state" width="100px">
          <template slot-scope="scope">
            <el-button type="danger" size="small" icon="el-icon-delete" style="border:none"@click="removed(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: "s-comment",
    inject:['reload'],
    methods: {
      moment:moment,
      setCurrent(currentOrder) {
        console.log(currentOrder);
        this.update.orderId = currentOrder.orderId;
        this.update.orderSource = currentOrder.orderSource;
        this.update.totalPrice = currentOrder.totalPrice;
        this.update.remark = currentOrder.remark;
        this.dialogUpdateVisible = true;
        console.log(this.dialogUpdateVisible);
      },
      // 删除留言
      removed(currentLy) {
        console.log("删除留言");
        this.$confirm(
          "此操作将永久删除留言 " + currentLy.lid + ", 是否继续?",
          "提示",
          {
            type: "warning"
          }
        ).then(() => {
          console.log("确认留言");
          // 向请求服务端删除
          let lid =currentLy.lid;
          console.log(lid);
          this.$ajax.get('http://127.0.0.1:8088/xyl/delete.do?lid='+lid).then(response => {
            console.log(response);
            if (response.data == true) {
              this.open1();
            }
          }).catch(function (error) {
            console.log("delete failed！")
          });
        })
          .catch(() => {
            this.$message.info("已取消操作!");
          });
      },
      open1() {
        this.$message({
          message: '恭喜你，删除成功',
          type: 'success'
        });
        this.reload();
      }
    },
    mounted(){
      // 加载数据
      console.log("loading data.")
      this.$ajax({
        method:'get',
        url:'http://localhost:8088/xyl/xyGetAllLy',
      }).then(response=>{
        console.log(response.data);
        for(let i= 0; i<response.data.length;i++) {
          this.tableData.push(response.data[i]);
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
          lid: '1',
          name: '李泽言',
          lydate:'2019.03.02 19:12:58',
          state:'已审核',
          info:'不能回头，就走的更远吧。'
        }, {
          lid: '2',
          name: '白起',
          lydate:'2019.03.02 19:12:58',
          state:'已审核',
          info:'只要你在风里，我就感知得到。'
        }, {
          lid: '3',
          name: '周棋洛',
          lydate:'2019.03.02 19:12:58',
          state:'已审核',
          info:'千万人的喜欢，不及你一个人的重要。'
        }, {
          lid: '4',
          name: '许墨',
          lydate:'2019.03.02 19:12:58',
          state:'已审核',
          info:'我贪得无厌想要你的全部。'
        }],
        textarea: ''

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
