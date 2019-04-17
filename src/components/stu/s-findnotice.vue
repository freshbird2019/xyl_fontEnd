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

    <div class="col-md-8" v-for="item in findNotice" @click="toOnefindnotice(item)">
      <div class="quote">
        <span class="text">{{item.xyByFid.name}}&nbsp;&nbsp;寻找&nbsp;&nbsp; <i class="to">{{item.ftitle}}</i>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="small">{{moment(item.ftime).format('YYYY-MM-DD HH:mm:ss')}}</i></span>
      </div>
    </div>
  </div>

   <div align="center" v-if="flag === 2">
     <div v-if="flag === 2" style="margin-right: 100%" class="el-icon-back" @click="back">
     </div>
      <div  style="margin-top:80px">

        <span class="text">{{thisfd.ftime}}&nbsp;&nbsp;寻找&nbsp;&nbsp;
          <i class="to">{{thisfd.description}}</i></span>

      </div>
    </div>

  </div>
</template>

<script>

      import {getCookie} from "../../assets/js/cookie";
      import moment from 'moment'
      export default {
        name: "s-findnotice",
        methods:{
          moment:moment,
          toOnefindnotice(currentfd){
            this.thifd=currentfd;
            this.flag=2;
            console.log(this.thifd.description);
          },
          back(){
            this.flag=1;
            this.reload();
          },
        },
        mounted(){
          let name=this.xyname;
          console.log(name);
          this.$http.post('http://localhost:8088/xyl/getXyByname?xyname='+name).then(res=> {
            console.log(res.data);
            this.nowxy=res.data;

            let cid=this.nowxy.clazzByClassid.Cid;
            console.log(cid)
            console.log("loading data.")

            this.$ajax.get('http://localhost:8088/xyl/getAllFindNotice?cid='+cid).then(response=>{
              console.log(response.data);
              for(let i= 0; i<response.data.length;i++) {
                  this.findNotice.push(response.data[i]);
              }
            });

          });
        },
        data(){
          return{
            xyname:getCookie("xyusername"),
            nowxy:{},
            flag:1,
            findNotice:[],
            thisfd:{
              ftitle:"",
              description:"",
              ftime:"",
              xy:{},
            },
          }
        }
      }
</script>
<style scoped>
  .quote {
    padding: 10px;
    margin-bottom: 30px;
    border: 1px solid #333333;
    border-radius: 5px;
    box-shadow: 2px 2px 3px #333333;
    cursor: pointer;
  }
  .col-md-8 {
    width: 66.66666667%;
  }

  .quote span.text {
    display: block;
    margin-bottom: 5px;
    font-size: large;
    font-style: italic;
  }

  .to {
    font-weight: bold;
    color: #e88917;
  }

  .small {
    font-size:70%
  }
</style>
