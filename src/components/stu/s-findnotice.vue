<template>
  <div class="mainBox">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:25px">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
      <el-breadcrumb-item>寻人启事</el-breadcrumb-item>
    </el-breadcrumb>

  <div align="center" v-if="flag === 1">
    <h1><b>
      <i class="el-icon-document"></i>
    </b>寻人启事</h1>
    <div class="col-md-8" v-for="item in ly" @click="toOnefindnotice">
      <div class="quote">
        <span class="text">{{item.info}}</span>
        <span>by:
            <small class="author">{{item.xyByLyxid.name}}</small>
          </span>
      </div>
    </div>
  </div>



  </div>
</template>

<script>

      export default {
        name: "s-findnotice",
        methods:{
          toOnefindnotice(){
              console.log("hi");
          }
        },
        mounted(){
          console.log("ly")
          this.$ajax({
            method:'get',
            url:'http://localhost:8088/xyl/xyGetAllLy',
          }).then(response=>{
            console.log(response.data);
            for(let i= 0; i<response.data.length;i++) {
              if(response.data[i].best ==1)
                this.ly.push(response.data[i]);
            }
          });
        },
        data(){
          return{
            flag:1,
            ly:[],
          }
        }
      }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

</style>
