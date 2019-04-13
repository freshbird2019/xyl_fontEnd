<template>
  <div align="center" >
    <div class="col-md">
      <div class="demo-input-suffix">
      找谁：
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="ftitle">
      </el-input>
      </div>
      谁可见：
      <el-radio v-model="radio" label="1">全部成员</el-radio>
      <el-radio v-model="radio" label="2">班级成员</el-radio>
      描述：

    <el-input
      type="textarea"
      :rows="4"
      size="medium"
      placeholder="请输入内容"
      v-model="description">
    </el-input>
    </div>
    </div>
</template>

<script>
    export default {
        name: "addnewfind",
      methods: {
        ToAdd(){
          let data = {'lyxyname':this.xyname}
          console.log(data);
          this.$http.post('http://127.0.0.1:8088/xyl/addLy.do',data
          ).then(response => {
            console.log(response);
            this.open1();
          }).catch(function (error) {
            console.log("save failed！")
          });
        },
        open1(){
          this.$message({
            message:'留言成功，等待审核',
            type:'success'
          });
          this.reload();
        }
      },
      data () {
        return {
          xyname:getCookie("xyusername"),
          radio: '1',
      };
      }

    }
</script>

<style scoped>
  .col-md {
    margin-right: auto;
    width: 66.66666667%;
  }
</style>
