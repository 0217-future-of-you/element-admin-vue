<template>
  <!-- Form -->
<!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

<el-dialog title="内容编辑" :visible.sync="dialogFormVisible" width="40%">
  <el-form :model="entity" ref="userEdit">
    <el-form-item label="角色名:" :label-width="formLabelWidth" prop="RoleName">
      <el-input v-model="entity.RoleName" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="权限:" :label-width="formLabelWidth" prop="Actions">
           <el-tree
           ref="tree"
          :data="MenuActions"
          :props="defaultProps"
           node-key="Id"
          :default-expanded-keys="checkedkeys"
          :default-checked-keys="checkedkeys"
          show-checkbox
          @check-change="handleCheckChange"
        >
        </el-tree>
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
// import {getTreeDepartment} from '../../../api/Base_Department'
// import {SaveUser,GetTheData} from '../../../api/user'
import {getRoles,SaveData,GetTheData} from '../../../api/role'  
import {GetActionTreeList} from '../../../api/menu'    
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
          children: 'children',
          label: 'title'
        },
        checkedkeys:[],
        expandedkeys:[],
        MenuActions:[]
      };
    },
    mounted(){
      
        },
    methods:{
     //打开窗体
        OpenForm(row){
      
          if (row) {
            this.GetTheData(row.Id)
          }
        this.GetThreeActionsData(),
        // this.GetRoleData()
        this.dialogFormVisible=true;

        },
        // /**获取树形部门表 */
        // GetThreeData(){
        //     let that=this;
        //     getTreeDepartment({}).then(res=>{
        //         that.depatementData=res.Data;

        //     })
        // },
         GetThreeActionsData(){
           let that=this;
         
           GetActionTreeList({}).then(res=>{
            that.MenuActions=res.Data

           })
        //    GetActionTreeList(that.entity).then(res=>{
        //    console.log('%c 🍅 res: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', res);
        //    that.MenuActions=res.Data;
        //    console.log('%c 🍠 this.MenuActions: ', 'font-size:20px;background-color: #42b983;color:#fff;', this.MenuActions);

        // })
      },
        /**获取角色列表 */
        // GetRoleData(){
        //     let that=this;
        //     getRoles({}).then(res=>{
        //        that.RoleList= res.Data;

        //     })
        // },
        /**获取单个数据 */
        GetTheData(uid){
        //  console.log('%c 🥦 uid: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', uid.Id);
           GetTheData({id:uid}).then(res=>{
             console.log('%c 🍛 res: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', res);
              this.entity=res.Data;
              this.checkedkeys=res.Data.Actions;
           })
        },
        /**保存角色 */
        Save(){
          let that=this;
          var t=that. getCheckedKeys();
          that.entity.Actions=t;
         
          SaveData(that.entity).then(res=>{
              if (res.Success==true) {
                    // that.$refs["userEdit"].resetFields()
                      that.$parent.$parent.GetData();
                      that.dialogFormVisible = false;
              }
            
        })
         },
        /**取消 */
        cancle(){
             this.dialogFormVisible = false;
        },
          handleCheckChange(data, checked, indeterminate) {
             console.log(data, checked, indeterminate);
             var k=[];
             if (checked) {
               this.checkedkeys.push(data.Id)
              //  this.checkedkeys=k
             }
             if (!checked) {
                this.checkedkeys.remove(data.Id)
             }
           },
           getCheckedKeys(){
           var t=  this.$refs.tree.getCheckedKeys()
           return t;
           },
             handleNodeClick(data) {
                 console.log(data);
             },
      // handleNodeClick(data) {
      //   console.log(data);
      // },
          /**获取选中的值 */
      //   handleNodeClick(data) {
         
      //          this.entity.DepartmentId=data.Id;
      //          this.selectedValue=data.Text;
        
      // }
    }
}
</script>

<style>
</style>