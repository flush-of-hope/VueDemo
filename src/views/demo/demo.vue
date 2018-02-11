<template>
  <section>
    <el-row >
      <el-col :span="23">
        <div align="right">
            <span style="font-size:15px;">还未注册供应商?</span>
            <el-col>
              <el-button type="primary" icon="el-icon-search" size="small">供应商注册</el-button>
            </el-col>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <div class="grid-content bg-purple"  align="right">
          申请单单号:<el-input  v-model="check.appCode" placeholder="请输入" class="checkInput"></el-input><br/>
          供应商名称:<el-input  v-model="check.supplierName" placeholder="请输入"  class="checkInput"></el-input><br/>
          申请单提交时间(从):<el-date-picker  v-model="check.startDate" type="date"  placeholder="选择日期" class="checkInput">  </el-date-picker>
        </div>
      </el-col>
      <el-col :span="4"></el-col>
      <el-col :span="7">
        <div class="grid-content bg-purple-light"  align="right">
          申请单类型:
            <el-select  v-model="check.appCalss" class="checkInput">
              <el-option label="请选择" value="0"></el-option>
              <el-option label="供应商注册申请单" value="1"></el-option>
              <el-option label="供应商基本信息变更申请单" value="2"></el-option>
              <el-option label="供应商地点信息变更申请单" value="3"></el-option>
              <el-option label="供应商基本信息失效申请单" value="4"></el-option>
              <el-option label="供应商地点信息失效申请单" value="5"></el-option>
            </el-select>
            <br/>
          审批状态:
            <el-select  v-model="check.appStatus" class="checkInput">
              <el-option label="请选择" value="0"></el-option>
              <el-option label="未提交" value="1"></el-option>
              <el-option label="审批中" value="2"></el-option>
              <el-option label="已批准" value="3"></el-option>
              <el-option label="已拒绝" value="4"></el-option>
            </el-select>
            <br/>
          申请单提交时间(至):
            <el-date-picker  v-model="check.endDate"  type="date"  placeholder="选择日期" class="checkInput"> </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-col :span="14" align="right">
              <el-button type="primary" icon="el-icon-search" @click="getSeAppSdh">查询</el-button>
               <el-button icon="el-icon-refresh" style="margin:0px 35px 0px 45px">重置</el-button>
             </el-col>
          </div>
      </el-col>
    </el-row>

    <el-table  :data="apply"  style="width: 100%; text-align: center; height: 690px; padding-bottom: 5px;margin-top:10px" max-height="700"  element-loading-text="拼命加载中"  >
      <el-table-column  type="selection"   width="50" align="right" sortable>
      </el-table-column>
      <el-table-column   prop="appCode"  label="申请单号"  width="200" align="center">
      </el-table-column>
      <el-table-column  prop="appCalss" label="申请单类型" width="200"  align="center" :formatter="formatAppCalss">
      </el-table-column>
      <el-table-column    prop="submmitDate"  label="申请单提交时间" width="200"  align="center" :formatter="formatDate">
      </el-table-column >
      <el-table-column    prop="creationDate"  label="系统创建时间" width="200"  align="center" :formatter="formatDate">
      </el-table-column >
      <el-table-column    prop="appStatus"  label="审批状态" width="200"  align="center" :formatter="formatAppStatus">
      </el-table-column >
      <el-table-column    prop=""  label="供应商名称" width="200"  align="center"><!--supplierName-->
      </el-table-column >
      <el-table-column    prop=""  label="处理结果" align="center">
      </el-table-column >
      <el-table-column   label="操作"  width="100" align="left">
        <template slot-scope="scope">
          <el-button  @click.native.prevent="deleteRow(scope.$index, users)" type="text" size="small">
            查询明细
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col>
      <div style="float: right;margin-top: 7px">
        <el-pagination @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>
    </el-col>
  </section>
</template>

<script>
  import {formatDate} from "../../api/utils/timeUtils"
  export default {
    name: 'list',
    data() {
      return {
        apply:[],
        page:{
          currentPage:1,
          total:1,
          pageSize:10
        },
        check:{
          appCode:"",
          appCalss:"0",
          supplierName:"",
          appStatus:"0",
          startDate:"",
          endDate:""
        }
      };
    },
    created: function () {
      this.getSeAppSdh();
    },
    methods: {
      handleSizeChange(val) {
        this.page.pageSize=val;
        this.getSeAppSdh();
      },
      handleCurrentChange(val) {
        this.page.currentPage=val;
        this.getSeAppSdh();
      },
      getSeAppSdh(){
        var a = this;
        let para={};
        para = a.page;
        this.$axios.post("http://localhost:8011/getSeAppSdhList", {params: para})
        .then(response => {
          a.apply =[];
          a.apply =response.data.data;
        }, response => {
          console.clear();
          console.log(response);
          a.message="服务器异常请稍候重试";
        })
      },
      formatAppCalss(row, column ,cellValue){
        return cellValue == 1 ? '供应商注册申请单' : cellValue == 2 ? '供应商基本信息变更申请单': cellValue == 3 ? '供应商地点信息变更申请单' : cellValue == 4 ? '供应商基本信息失效申请单': cellValue == 5 ? '供应商地点信息失效申请单':"未知类型";
      },
      formatAppStatus(row, column ,cellValue){
        return cellValue == 1 ? '未提交' : cellValue == 2 ? '审批中': cellValue == 3 ? '已批准' : cellValue == 4 ? '已拒绝': "未知状态";
      },
      formatDate(row, column ,cellValue){
        let data = new Date(cellValue);
        return formatDate(data,'yyyy-MM-dd hh:mm:ss');
      }
    }
  }
</script>

<style scoped>
    .checkInput {
      width:230px;
      margin: 0px 0px 8px 8px;
    }
</style>
