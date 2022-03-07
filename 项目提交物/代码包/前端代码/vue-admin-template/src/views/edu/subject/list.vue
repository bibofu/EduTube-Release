<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      node-key="id"
      :props="defaultProps"
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
      class="filter-tree"
      :render-content="renderContent"
      default-expand-all 
    />
  <!-- 添加节点的表单 -->
    <el-dialog :visible.sync="dialogPointFormVisible" title="添加分类">
        <el-form :model="Point" label-width="120px">
            <el-form-item label="分类标题">
                <el-input v-model="Point.title"/>
            </el-form-item>
            <el-form-item label="标号">
                <el-input-number v-model="Point.sort" :min="0" controls-position="right" />
                <el-tooltip placement="right-end">
                    <div slot="content">
                        也就是第几个分类
                    </div>
                    <i class="el-icon-question"/>
                </el-tooltip>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogPointFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addPoint">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>

<script>
import subject from '@/api/edu/subject'

export default {

  data() {
    return {
      filterText: '',
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      Point:{
        parentId: '',
        sort:0,
        title:''
      },
      dialogPointFormVisible:false,
    }
  },
  created() {
      this.getAllSubjectList()
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    },
    remove(node, data){
      var str = "子节点"
      console.log(data.id)
      if(node.data.children != null){
        str = "父节点，删除会删除与之相关的所有信息"
      }
      this.$confirm('此操作将永久删除该'+str+', 是否继续?', data.title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除
          subject.deleteOneSubject(data.id).then((response) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getAllSubjectList()
          }).catch((response) => {
            console.log("删除失败")
            this.$message({
              type: 'error',
              message: '删除失败'
            });
            console.log(response);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          }); 
        })
    },
    Add(node, data){
      // console.log(this.data2)
      // console.log(node)
      // console.log(data)
      data.children == null
      // 子节点
      this.Point.parentId =  node.data.id;
      this.Point.sort = node.childNodes.length;
      this.dialogPointFormVisible = true;
    },
    // 上传修改
    addPoint(){
      console.log(this.Point);
      subject.addOneSubject(this.Point)
        .then(response => {
          this.dialogPointFormVisible = false;
          //提示
          console.log(response)
          this.$message({
            type: 'success',
            message: '添加小节成功!'
          });
          this.getAllSubjectList()
      })
    },
    // remove(node, data) {
    //     console.log("node: "+data.id);
    //     var oneindex = 0;
    //     var twoindex = 0;
    //     if(node.parent.parent == null){
    //       console.log("一级列表");
    //       const parent = node.parent;
    //       // 删 data
    //       oneindex = this.data2.findIndex(d => d.id === data.id);
    //       this.data2.splice(oneindex,1);
          
    //     }
    //     else{
    //       console.log("二级列表");
    //       const parent = node.parent;
    //       // 删 data
    //       oneindex = this.data2.findIndex(d => d.id === parent.data.id);
    //       twoindex = this.data2[oneindex].children.findIndex(d => d.id === data.id);
    //       this.data2[oneindex].children.splice(twoindex,1);
    //     }
        
    //     console.log(this.data2[oneindex]);
        
    // },

    getAllSubjectList(){
        subject.getSubjectList()
        .then(response=>{
            this.data2=response.data.subjectList
        })
    },

    renderContent(h, { node, data, store }) {
      if(node.parent.parent == null){
        console.log("父节点");
        return (
            <span class="custom-tree-node">
              <span>{node.label}</span>
              <span>
                <el-button size="mini" type="text" on-click={ () => this.Add(node, data) } >Add</el-button>
                <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
              </span>
            </span>);
      }
      else{
        return (
            <span class="custom-tree-node">
              <span>{node.label}</span>
              <span>
                <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
              </span>
            </span>);
      }
          
    },



  }
}
</script>

