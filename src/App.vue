<template>
  <div id="app">
    <router-view ></router-view>
    <el-container>
      <el-header>
        <router-view name="aheader"></router-view>
      </el-header>
      <el-container class="mainContainer">
        <el-aside >
          <router-view name="aleft"></router-view>
        </el-aside>
        <el-main >
          <router-view name="amain"></router-view>
        </el-main>
        <el-aside >
          <router-view name="aright" ></router-view>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "App"
  };
</script>

<style>

  body {
    margin: 0;
    padding: 0;
  }
  .el-header {
    background-color: #E0CDCF;
    color: #333;
    min-height:60px;
  }
  .mainContainer {
    background-color: #E0CDCF;
    display: flex;
    min-height: 800px;
  }
  .el-aside {
    background-color: #E0CDCF;
    flex: 2;

  }

  .el-main {
    background-color: #FFFFFF;
    flex: 8;
  }
</style>
