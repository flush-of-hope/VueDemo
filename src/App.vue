<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        这是侧边栏

      </el-aside>
      <el-container>
        <el-header>欢迎进入</el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>


  </div>
</template>

<script>
  export default {
    data () {
      return {
        foo: 'bar'
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-table th,td{
    text-align: center;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {

  }
</style>
