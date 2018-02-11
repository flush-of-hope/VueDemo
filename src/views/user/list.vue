<template id="list">
  <section>
  <el-table  :data="users"  style="width: 100%; text-align: center; height: 690px; padding-bottom: 5px" max-height="700"  element-loading-text="拼命加载中" >
    <el-table-column  type="selection"   width="50" align="right" sortable>
    </el-table-column>
    <el-table-column   prop="id"  label="用户编号"  width="110" align="center">
    </el-table-column>
    <el-table-column  prop="name" label="姓名" width="110" align="center">
    </el-table-column>
    <el-table-column    prop="age"  label="年龄" width="110" align="center">
    </el-table-column >
    <el-table-column    prop=""  label="" align="left">
    </el-table-column >
    <el-table-column   label="操作"  width="100" align="left">
      <template slot-scope="scope">
        <el-button  @click.native.prevent="modify(scope.$index, scope.row)" type="text" size="small" >
          修改
        </el-button>
         <el-button  @click.native.prevent="deleteRow(scope.$index, users)" type="text" size="small">
           移除
         </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-col>
    <div style="float: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </el-col>
    <!--编辑框-->
    <el-dialog title="编辑" :visible.sync="dialogVisible" >
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-editForm">
        <el-form-item label="用户编号" prop="id">
          <el-input v-model="editForm.id" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
        <el-form-item label="用户年龄" prop="age" align="left">
          <el-input-number v-model="editForm.age" :min="18" :max="200"></el-input-number>
        </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">修改</el-button>
            <el-button @click="cancelForm">取消</el-button>
          </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
  export default {
    name: 'list',
    data() {
      return {
        users:[],
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        dialogVisible: false,
        editForm:{
          name:"",
          age:"",
          id:""
        },
        rules: {
          name: [
            { required: true, message: '用户名称为必填项', trigger: 'blur' },
            { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    created: function () {
      this.getdata();
    },
    methods: {
      deleteRow(index, rows) {
        //先发送请求在数据删除在进行前台删除
        rows.splice(index, 1);
      },
      modify(index,row){
          this.dialogVisible=true;
          this.editForm = Object.assign({}, this.editForm ,row);
      },
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      getdata(){
        var a = this;
        this.$axios.get("http://localhost:8011/getUser?id=123", {params: {  }})
          .then(response => {
            a.users=[];
            a.users=response.data;
          }, response => {
            console.clear();
            console.log(response);
            a.message="服务器异常请稍候重试";
          })
      },
      submitForm() {
        var a = this;
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('您确认要修改用户的信息吗?', '提示', { confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'}
            ).then(() => {
              $.axios.post("http://localhost:8011/updatetUser",).then(function(response){
                if(response.data==0){
                  this.$message({type: 'success',message: '修改成功!'});
                }else{
                  this.$message({type: 'error',message: '修改失败!'});
                }
              })

            }).catch(() => {

            });
          } else {
            this.$message({ type: 'error',message: '校验失败'});
            return false;
          }
        });
      },
      cancelForm() {
        this.dialogVisible=false;
        this.$message({ type: 'info',message: '您已取消修改'});
      }
    }
  }
</script>

<style scoped>

</style>
