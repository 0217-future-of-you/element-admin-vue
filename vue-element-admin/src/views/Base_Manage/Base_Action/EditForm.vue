<template>
  <!-- Form -->
<!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

<el-dialog title="内容编辑" :visible.sync="dialogFormVisible" width="40%">
   <el-form :model="entity">
      <el-form-item label="菜单名称" :label-width="formLabelWidth">
        <el-input
          v-model="entity.Name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
     
      <el-form-item label="上级菜单" :label-width="formLabelWidth">
            <SelectTree
      :props="prop"
      :options="tableData"
      :value="entity.ParentId"
      :clearable="isClearable"
      :accordion="isAccordion"
      @getValue="getValue($event)"
    />
         <!-- <el-select-tree
       width="120px"
       placeholder="请选择内容"
       :data="tableData"
       :props="prop"
        v-model="entity.ParentId"
        @change="handleNodeClick"
        ></el-select-tree> -->
        <!-- <el-select v-model="selectedValue" placeholder="请选择上级菜单" value-key="ParentId">
          <el-option style="height: auto" :value="entity.ParentId">
            <el-tree
              :data="tableData"
              :props="defaultProps"
               :default-checked-keys="selectValue"
              @node-click="handleNodeClick"
            ></el-tree>
          </el-option>
        
        </el-select> -->
      </el-form-item>
      <el-form-item label="类型" :label-width="formLabelWidth">
        <el-select placeholder="请选择类型" v-model="entity.Type">
          <el-option label="页面" :value=1></el-option>
          <el-option label="菜单" :value=0></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="路径" :label-width="formLabelWidth">
        <el-input v-model="entity.Url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否需要权限" :label-width="formLabelWidth" >
     <el-radio-group v-model="entity.NeedAction">
      <el-radio :label=false>否</el-radio>
      <el-radio :label=true>是</el-radio>
    </el-radio-group>
     </el-form-item>
      <el-form-item label="图标" :label-width="formLabelWidth">
        <el-input v-model="entity.Icon" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item label="排序" :label-width="formLabelWidth">
        <el-input v-model="entity.Sort" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="添加按钮" :label-width="formLabelWidth">
        <el-button type="primary" icon="el-icon-plus" @click="PermssionAdd()"
          >添加按钮（权限）</el-button>
      <permission-list ref="permiss"></permission-list>
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
import {saveData,GetTheData,GetPermissionList} from '../../../api/menu'  
import PermissionList from './PermissionList' 
import ElSelectTree from 'el-select-tree';
import SelectTree from '../../../components/Selecttree/treeSelect';
export default {
    name:"EditForm",
    components: {
     PermissionList,
     ElSelectTree,
     SelectTree
    
  },
 data() {
      return {
        dialogFormVisible: false,
        entity: {},
          isClearable: true, // 可清空（可选）
         isAccordion: true, // 可收起（可选）
        tableData:[],
        selectValue:[],//默认选中
        selectedValue:"",//显示的值
        formLabelWidth: '120px',
        depatementData:[],
        defaultProps: {
          children: 'Children',
          label: 'Text'
        },
         prop:{
        
          value: 'Id',
          label: 'title',
          children: 'Children'
           }
      
      };
     
    },
    mounted(){
      
        },
    methods:{
     //打开窗体
        OpenForm(row){
          if (row) {
            this.GetTheData(row.Id)
            this.GetPermissionList(row.Id)
          }
        
        // this.GetThreeData(),
        this.$parent.$parent.GetData();
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
          /**获取角色列表 */
         // GetRoleData(){
        //     let that=this;
        //     getRoles({}).then(res=>{
        //        that.RoleList= res.Data;

        //     })
        // },
        GetTheData(uid){
        //  console.log('%c 🥦 uid: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', uid.Id);
           GetTheData({id:uid}).then(res=>{
             console.log('%c 🍛 res: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', res);
               this.entity=res.Data;
              //  this.selectedValue.=res.Data.ParentId);
              //  this.selectedValue=res.Data.ParentId;
              //  this.selectedValue=res.Data.DepartmentName;
           })
        },
        /**获取权限列表 */
        GetPermissionList(uid){
          let that=this;
           GetPermissionList({parentId: uid}).then(res=>{
                 console.log('%c 🍬 res: ', 'font-size:20px;background-color: #465975;color:#fff;', res);
                   that.$refs.permiss.PromiseListData=res.Data;
               })
         },
        /**保存权限 */
        Save(){
          console.log("dsads");
          let that=this;
           that.entity.permissionList=this.$refs.permiss.PromiseListData;
          saveData(that.entity).then(res=>{
            console.log('%c 🍐 res: ', 'font-size:20px;background-color: #3F7CFF;color:#fff;', res);
            // if (res.Success) {
            // }
             console.log( this.$parent.$parent.GetData());
         
           this.$parent.$parent.GetData()
            that.dialogFormVisible = false;
            
        })
         },
        /**取消 */
        cancle(){
             this.dialogFormVisible = false;
        },
          getValue(value) {
      this.entity.ParentId = value;
     
    },
          /**获取选中的值 */
      //   handleNodeClick(data) {
      //     console.log('%c 🍸 data: ', 'font-size:20px;background-color: #42b983;color:#fff;', data);
         
      //          this.entity.ParentId=data.Id;
      //          this.selectedValue=data.Text;
        
      // },
      /**添加权限值 */
      PermssionAdd(){
        console.log( this.$refs.permiss);
        this.$refs.permiss.PromiseList();
      }
    }
}
</script>

<style>
</style>