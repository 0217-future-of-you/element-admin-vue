<template>
  <!-- Form -->
<!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

<el-dialog title="内容编辑" :visible.sync="dialogFormVisible" width="40%">
   <el-form :model="entity">
      <el-form-item label="部门名称" :label-width="formLabelWidth">
        <el-input
          v-model="entity.Name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
     
      <el-form-item label="上级部门" :label-width="formLabelWidth">
         <!-- <el-select-tree
        width="120px"
        placeholder="请选择内容"
       :data="tableData"
       :props="prop"
        v-model="entity.ParentId"
        @change="handleNodeClick"
        ></el-select-tree> -->
         <!-- 调用树形下拉框组件 -->
    <SelectTree
      :props="prop"
      :options="tableData"
      :value="entity.ParentId"
      :clearable="isClearable"
      :accordion="isAccordion"
      @getValue="getValue($event)"
    />
       
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
import { getTreeDepartment,getTheDepartment,saveData } from "../../../api/Base_Department";
import ElSelectTree from 'el-select-tree';
import SelectTree from '../../../components/Selecttree/treeSelect';
export default {
    name:"EditForm",
    components: {
    SelectTree,
     ElSelectTree
    
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
            console.log('%c 🍪 row: ', 'font-size:20px;background-color: #33A5FF;color:#fff;', row);
            this.GetTheData(row.Id)
          }
          this.getTreeDepartment()
        // this.GetThreeData(),
        this.$parent.$parent.GetData();
        // this.GetRoleData()
        this.dialogFormVisible=true;

        },
   getValue(value) {
      this.entity.ParentId = value;
     
    },
        GetTheData(uid){
           getTheDepartment({id:uid}).then(res=>{
               this.entity=res.Data;
           })
        },
        /**获取权限列表 */
        getTreeDepartment(uid){
          let that=this;
           getTreeDepartment({parentId: uid}).then(res=>{
            that.tableData=res.Data;
               })
         },
        /**保存 */
        Save(){
       
          let that=this;
          saveData(that.entity).then(res=>{
           this.$parent.$parent.GetData()
            that.dialogFormVisible = false;
            
        })
         },
        /**取消 */
        cancle(){
             this.dialogFormVisible = false;
        },
          /**获取选中的值 */
        handleNodeClick(data) {
          // console.log('%c 🍸 data: ', 'font-size:20px;background-color: #42b983;color:#fff;', data);
         
          //      this.entity.ParentId=data.Id;
          //      this.selectedValue=data.Text;
        
      },
      /**添加权限值 */
      // PermssionAdd(){
      //   console.log( this.$refs.permiss);
      //   this.$refs.permiss.PromiseList();
      // }
    }
}
</script>

<style>
</style>