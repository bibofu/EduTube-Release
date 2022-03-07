<template>
  <div class="app-container">
    <!--查询表单-->
    <div class="search">
      <el-form :inline="true" class="demo-form-inline">
        <div class="id">
          <el-form-item label="ID" class="id-input">
            <el-input v-model="courseQuery.id" placeholder="课程ID" />
          </el-form-item>
        </div>
        <el-form-item>
          <el-input v-model="courseQuery.title" placeholder="课程名称" />
        </el-form-item>

        <el-form-item>
          <el-select
            v-model="courseQuery.status"
            clearable
            placeholder="课程状态"
          >
            <el-option value="Normal" label="已发布" />
            <el-option value="Draft" label="未发布" />
          </el-select>
        </el-form-item>

        <el-button type="primary" icon="el-icon-search" @click="getList()"
          >查询</el-button
        >
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form>
    </div>

    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="170" align="center" />
      <el-table-column prop="title" label="课程名" align="center" />
      <el-table-column
        prop="teacherId"
        label="讲师ID"
        width="170"
        align="center"
      />
      <el-table-column label="课程状态" width="90" align="center">
        <template slot-scope="scope">
          {{ scope.row.status === "Normal" ? "已发布" : "未发布" }}
        </template>
      </el-table-column>

      <el-table-column
        prop="lessonNum"
        label="课时数"
        width="70"
        align="center"
      />

      <el-table-column
        prop="gmtCreate"
        label="添加时间"
        width="200"
        align="center"
      />

      <el-table-column
        prop="viewCount"
        label="浏览数量"
        width="80"
        align="center"
      />

      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑课程基本信息</el-button
            >
          </router-link>
          <router-link :to="'/course/chapter/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑课程大纲信息</el-button
            >
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
            >删除课程所有信息</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>
<script>
//引入调用course.js文件
import course from "@/api/edu/course";

export default {
  //写核心代码位置
  // data:{
  // },
  data() {
    //定义变量和初始值
    return {
      list: null, //查询之后接口返回集合
      allList: null, // 存储所有数据
      page: 1, //当前页
      limit: 10, //每页记录数
      total: 0, //总记录数
      courseQuery: {}, //条件封装对象
    };
  },
  created() {
    //页面渲染之前执行，一般调用methods定义的方法
    //调用
    this.getList();
  },
  methods: {
    //创建具体的方法，调用teacher.js定义的方法
    //讲师列表的方法
    getList(current) {
      if (current != null) this.page = current;
      this.$message({
        type: "success",
        message: "刷新成功，但是条件查询未提供接口",
      });
      course.getListCourse().then((response) => {
        //请求成功
        //response接口返回的数据
        console.log(response.data);
        this.total = response.data.courseList.length;
        this.allList = response.data.courseList;
        this.list = [];
        for (
          var i = (this.page - 1) * this.limit;
          i < this.page * this.limit;
          i++
        ) {
          if (i == this.total) {
            return;
          }
          this.list.push(this.allList[i]);
        }
      });
    },
    resetData() {
      //清空的方法
      //表单输入项数据清空
      this.courseQuery = {};
      //查询所有讲师数据
      this.getList();
    },
    removeDataById(Id) {
      console.log("删除:" + Id);
      course.removeCourse(Id).then((response) => {
        // 打印返回数据
        this.getList();
        console.log(response);
      });
    },
  },
};
</script>