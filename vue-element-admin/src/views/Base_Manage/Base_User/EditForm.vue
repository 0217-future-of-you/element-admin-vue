<template>
  <!-- Form -->
<!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

<el-dialog title="内容编辑" :visible.sync="dialogFormVisible" width="40%">
  <el-form :model="entity" ref="userEdit">
    <el-form-item label="用户名:" :label-width="formLabelWidth" prop="UserName">
      <el-input v-model="entity.UserName" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="密码:" :label-width="formLabelWidth" prop="newPwd">
      <el-input v-model="entity.newPwd" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="姓名:" :label-width="formLabelWidth" prop="RealName">
      <el-input v-model="entity.RealName" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="性别:" :label-width="formLabelWidth" prop="Sex">
       <el-radio-group v-model="entity.Sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
  </el-radio-group>
    </el-form-item>
     <el-form-item label="生日:" :label-width="formLabelWidth" prop="Birthday">
        <el-date-picker
      v-model="entity.Birthday"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
    </el-form-item>
    
    <el-form-item label="部门:" :label-width="formLabelWidth"  prop="DepartmentId">
      <el-select v-model="selectedValue" placeholder="请选择活动区域">
          <el-option style="height:60px" :value="entity.DepartmentId">
             <el-tree :data="depatementData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="角色:" :label-width="formLabelWidth"  prop="RoleIdList">
     <el-select v-model="entity.RoleIdList" multiple placeholder="请选择活动区域">
            <el-option
      v-for="item in RoleList"
      :key="item.Id"
      :label="item.RoleName"
      :value="item.Id">
    </el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancle">取 消</el-button>
    <el-button type="primary" @click="Save">确 定</el-button>
  </div>
  </div>
</el-dialog>

</template>

<script>
import {getTreeDepartment} from '../../../api/Base_Department'
import {SaveUser} from '../../../api/user'
import {getRoles} from '../../../api/role'   
export default {
   name:"EditForm",
 data() {
      return {
        dialogFormVisible: false,
        entity: {},
        RoleList:[],//角色表
        selectedValue:"",//显示的值
        formLabelWidth: '120px',
        depatementData:[],
        defaultProps: {
          children: 'Children',
          label: 'Text'
        }
      };
    },
    mounted(){
        this.GetThreeData(),
        this.GetRoleData()
        },
    methods:{
        /**获取树形部门表 */
        GetThreeData(){
            let that=this;
            getTreeDepartment({}).then(res=>{
                that.depatementData=res.Data;

            })
        },
        /**获取角色列表 */
        GetRoleData(){
            let that=this;
            getRoles({}).then(res=>{
               that.RoleList= res.Data;
                console.log('%c 🍏 res: ', 'font-size:20px;background-color: #E41A6A;color:#fff;', res);

            })
        },
        /**保存用户 */
     Save(){
         let that=this;
        
           console.log(that.entity);
          SaveUser(that.entity).then(res=>{
              if (res.Success==true) {
                   console.log('%c 🍥 that.$$parent: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', that.$parent);
                    that.$refs["userEdit"].resetFields()
                      that.$parent.$parent.GetData();
                
                
                  that.dialogFormVisible = false;
              }
            
        })
     },
     cancle(){
             this.dialogFormVisible = false;
     },


          /**获取选中的值 */
        handleNodeClick(data) {
               this.entity.DepartmentId=data.Id;
              this.selectedValue=data.Text;
        
      }
    }
}
</script>

<style>

</style>