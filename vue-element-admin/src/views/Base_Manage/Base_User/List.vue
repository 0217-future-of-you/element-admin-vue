<template>
  <el-card class="box-card">
    <!-- 按钮区域 -->
    <div class="button-custom">
      <div>
        <el-button type="primary" icon="el-icon-plus" @click="AddContent()"
          >添加</el-button
        >
        <el-button type="danger" icon="el-icon-delete"  @click="submitDelete(selectValue)">删除</el-button>
      </div>
      <div class="seach-custom">
        <!-- 搜索区域 -->
        <el-select
          v-model="Contention"
          placeholder="请选择"
          style="width: 160px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-input
          v-model="keyword"
          placeholder="请输入内容"
          style="width: 240px; margin-left: 10px"
        ></el-input>

        <el-button
          type="primary"
          icon="el-icon-zoom-in"
          style="margin-left: 10px; margin-left: 10px"
          >搜索</el-button
        >
        <el-button type="info" icon="el-icon-plus">重置</el-button>
      </div>
    </div>
    <div>
      <!-- 表格区域 -->
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column prop="UserName" label="用户名" width="120">
        </el-table-column>
        <el-table-column prop="RoleNames" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="SexText" label="性别" width="120">
        </el-table-column>
        <el-table-column prop="Birthday" label="出生日期" width="120">
        </el-table-column>
        <el-table-column
          prop="DepartmentName"
          label="所属部门"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.DepartmentName }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="所属角色" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ setJoin(scope.row.RoleNameList) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <div class="block" style="margin-top: 15px">
        <el-pagination
          align="center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="Page.currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="Page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="Page.total"
        >
        </el-pagination>
      </div>
    </div>
    <edit-form ref="editform"></edit-form>
  </el-card>
</template>

<script>
import { getAllUser,DeleteUser } from "../../../api/user";
import EditForm from "./EditForm";
export default {
  components: {
    EditForm
  },
  data() {
    return {
      keyword: "",
      options: [],
      Contention: "",
      tableData: [],
      selectValue:[],//多选删除
      Entity: {
        PageIndex: 1,
        PageRows: 5,
        SortField: "CreateTime",
        SortType: "desc",
        Search: {
          //  roleId: "",
          //  roleName: ""
        }
      },
      multipleSelection: [],
      Page: {
        currentPage: 0, // 当前页码
        total: 0, // 总条数
        pageSize: 0// 每页的数据条数
      }
    };
  },
  mounted() {
    this.GetData();
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.selectValue=[];
      val.forEach(e=>{
       this.selectValue.push(e.Id)
      })
      
      console.log('%c 🍞 this.multipleSelection: ', 'font-size:20px;background-color: #3F7CFF;color:#fff;', this.selectValue);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      let Ids=[]
      Ids.push(row.Id)
     
       this.submitDelete(Ids)
//       DeleteUser(data).then(res=>{
//   console.log('%c 🥖 res: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', res);

// })
      console.log(index, row);
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // this.Page.currentPage = 1;
      this.Page.pageSize = val;
      this.Entity.PageRows = this.Page.pageSize;
      this.GetData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.Page.currentPage = val;
       this.Entity.PageIndex = this.Page.currentPage;
      this.GetData();
    },

    /**获取用户列表数据 */
    GetData() {
      let that = this;
      getAllUser(this.Entity).then(res => {
        that.Page.total=res.Total;
        that.tableData = res.Data;
        console.log(
          "%c 🍐 res: ",
          "font-size:20px;background-color: #93C0A4;color:#fff;",
          res
        );
      });
    },
    /**添加用户 */
    AddContent() {
      this.$refs.editform.dialogFormVisible = true;
    },
    /**删除用户 */
      submitDelete(ids){

   this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
 DeleteUser(ids).then(res=>{
       console.log('%c 🥖 res: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', res);
      if (res.Success==true) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        this.GetData();
    
     }
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });


     

})
    },
    /**分组用户身份 */

    setJoin(RoleNameList = []) {
      // console.log('%c 🥑  RoleNameList.join(,): ', 'font-size:20px;background-color: #E41A6A;color:#fff;',  RoleNameList.join(','));
      return RoleNameList.join(","); //变成字符串后，以逗号分隔
    }
  }
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  padding: 20px 20px;
}

.box-card {
  margin: 20px 20px;
  width: 98%;
  height: 80%;
}
.seach-custom {
  margin: 20px 0px;
  /* padding: 0px 10px; */
}
</style>
