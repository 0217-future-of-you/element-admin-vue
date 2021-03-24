<template>
  <el-table
    style="width: 80%"
    :data="PromiseListData"
    class="tb-edit"
    highlight-current-row
    @row-click="handleCurrentChange"
  >
    <el-table-column label="权限名称" width="120">
      <template scope="scope">
        <el-input
          size="small"
          v-model="scope.row.Name"
          placeholder="请输入内容"
         
        ></el-input>
        <!-- <span>{{ scope.row.Name }}</span> -->
      </template>
    </el-table-column>

    <el-table-column label="权限值" width="100">
      <template scope="scope">
        <el-input
          size="small"
          v-model="scope.row.Value"
          placeholder="请输入内容"
       
        ></el-input>
        <!-- <span>{{ scope.row.Value }}</span> -->
      </template>
    </el-table-column>
  
    <el-table-column label="操作">
      <template slot-scope="scope">
      
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
           <!-- <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >编辑</el-button
        > -->
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
var uuid = require("node-uuid");
export default {
    name:"PermissionList",
    //PtableData: [], //权限按钮数据
data(){
    return{
      PromiseListData:[]
    }
},mounted(){

},
    methods:{
          handleDelete(index, row) {
             this.PromiseListData = this.PromiseListData.filter(s => s.key != row.key);
         },
          PromiseList() {
            const obj = {
            key: uuid.v4(),
            Name: "权限名",
            Value: "权限值",
            Type: 2,
           ParentId: null
          };
        this.PromiseListData.push(obj);
     },
         handleNodeClick(data) {
      this.ParentName = data.title;
      this.form.ParentId = data.Id;
      console.log(
        "%c 🍾 data.title: ",
        "font-size:20px;background-color: #F5CE50;color:#fff;",
        data.title
      );
      console.log(data);
    },
    handleCurrentChange(row, event, column) {},
    handleDelete(index, row) {
      this.PromiseListData = this.PromiseListData.filter(s => s.key != row.key);
    }
  }

    

}
</script>

<style>
</style>