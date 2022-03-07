<!--
 * @author agrinJPG
 * @date 2021/7/6 17:16
 * @Description 讲师列表
-->

<template>
  <div class="app-container">
    <!--查询表单-->
    <div class="search">
      <el-form :inline="true" class="demo-form-inline" label-position="right">
        <div class="id">
          <el-form-item label="ID" class="id-input">
            <el-input v-model="teacherQuery.id" placeholder="讲师ID" />
          </el-form-item>
        </div>
        <div class="name_level">
          <el-form-item label="姓名">
            <el-input
              v-model="teacherQuery.name"
              placeholder="讲师姓名"
              class="name-input"
            />
          </el-form-item>
          <el-form-item label="头衔">
            <el-select
              v-model="teacherQuery.level"
              clearable
              placeholder="讲师头衔"
              class="level-input"
            >
              <el-option :value="1" label="首席讲师" />
              <el-option :value="2" label="高级讲师" />
              <el-option :value="3" label="初级讲师" />
            </el-select>
          </el-form-item>
        </div>
        <div class="time">
          <el-form-item label="添加时间">
            <el-date-picker
              v-model="teacherQuery.begin"
              type="datetime"
              placeholder="选择开始时间"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="teacherQuery.end"
              type="datetime"
              placeholder="最后修改时间"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </div>
        <div class="doSearch">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="getList()"
            size="mini"
            >查询</el-button
          >
          <el-button type="success" plain @click="resetData()" size="mini"
            >清空</el-button
          >
        </div>
      </el-form>
    </div>

    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" width="40" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="180" align="center" />
      <el-table-column prop="name" label="姓名" width="80" align="center" />

      <el-table-column label="头衔" width="80" align="center">
        <template slot-scope="scope">
          {{
            scope.row.level === 1
              ? "首席讲师"
              : scope.row.level === 2
              ? "高级讲师"
              : "初级讲师"
          }}
        </template>
      </el-table-column>

      <el-table-column prop="career" label="资历" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.career | ellipsis(40) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="gmtCreate"
        label="添加时间"
        width="160"
        align="center"
      />
      <el-table-column
        prop="gmtModified"
        label="最近修改"
        width="160"
        align="center"
      />
      <el-table-column prop="sort" label="排序" width="40" align="center" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >修改</el-button
            >
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
            >删除</el-button
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
import teacher from "@/api/edu/teacher";
export default {
  data() {
    return {
      list: null,
      page: 1,
      limit: 5,
      total: 0,
      teacherQuery: {},
    };
  },
  filters: {
    ellipsis(value, limit) {
      if (!value) return "";
      if (value.length > limit) {
        return value.slice(0, limit) + "...";
      }
      return value;
    },
  },
  created() {
    this.getList();
  },

  methods: {
    //讲师列表
    getList(page = 1) {
      this.page = page;
      teacher
        .getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then((response) => {
          //console.log(response)
          this.list = response.data.rows;
          this.total = response.data.total;

          console.log(this.list);
          console.log(this.total);
        })
        .catch((error) => {
          console.log("列表有问题");
          console.log(error);
        });
    },
    // 清空数据
    resetData() {
      this.teacherQuery = {};
      this.getList();
    },

    // 删除讲师
    removeDataById(id) {
      this.$confirm("此操作将永久删除讲师记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //点击确定，执行then方法
        //调用删除的方法
        teacher.deleteTeacherId(id).then((response) => {
          //删除成功
          //提示信息
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //回到列表页面
          this.getList();
        });
      }); //点击取消，执行catch方法
    },
  },
};
</script>

<style>
.search {
  padding-top: 15px;
  background-color: #ecf5ff;
}
.el-form {
  margin: 0 18px;
  padding-bottom: 10px;
  text-align: center;
}
.el-form .el-form-item {
  margin-bottom: 0;
}
.el-form-item__label,
.el-input__inner {
  height: 30px;
}
.el-form .id-input {
  margin-right: 0;
}
.id {
  display: inline;
  width: 20%;
}
.name_level {
  display: inline;
  width: 30%;
}
.time {
  display: inline;
}
.id-input .el-input__inner {
  width: 180px;
}
.time .el-input__inner {
  width: 190px;
}
.time .el-date-editor {
  width: 190px;
}
.name-input {
  width: 100px;
}
.level-input {
  width: 110px;
}
.doSearch {
  text-align: center;
  margin-top: 10px;
}
</style>
