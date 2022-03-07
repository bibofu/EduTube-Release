<!--  -->
<template>
  <div class="app-container">
    <div class="search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="adminQuery.name" placeholder="管理员ID" />
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()"
          >查询</el-button
        >
        <el-button type="success" plain @click="resetData()">清空</el-button>
      </el-form>
    </div>
    <div class="showlist">
      <el-table :data="list" border fit highlight-current-row>
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" width="90" align="center" />
        <el-table-column
          prop="name"
          label="用户名"
          width="110"
          align="center"
        />
        <el-table-column prop="role" label="角色" align="center" width="110" />
        <el-table-column
          prop="permission"
          label="权限范围"
          width="300"
          align="center"
        />
        <el-table-column
          prop="gmtCreate"
          label="添加时间"
          width="160"
          align="center"
        />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <router-link :to="'/adminUser/edit/' + scope.row.id">
              <el-button type="primary" size="mini" icon="el-icon-edit"
                >修改管理员信息</el-button
              >
            </router-link>
            <router-link :to="'/adminUser/edit/' + scope.row.id">
              <el-button type="success" size="mini" icon="el-icon-edit"
                >修改权限</el-button
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
    </div>
    <div class="page">
      <el-pagination
        :current-page="page"
        :page-size="limit"
        :total="total"
        style="padding: 30px 0; text-align: center"
        layout="total, prev, pager, next, jumper"
        @current-change="getList"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    msg: String,
  },
  data() {
    return {
      adminQuery: {},
    };
  },
  methods: {},
};
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  text-decoration: none;
  color: #42b983;
}
.search {
  text-align: center;
}
.el-form {
  margin: auto;
}
</style>
