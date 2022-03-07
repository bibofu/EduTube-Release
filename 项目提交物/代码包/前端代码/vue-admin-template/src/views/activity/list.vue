<!-- 活动管理 -->
<template>
  <div class="app-container">
    <div class="search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="activityQuery.name" placeholder="活动名称" />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="activityQuery.state"
            clearable
            placeholder="活动状态"
          >
            <el-option :value="1" label="未开始" />
            <el-option :value="2" label="进行中" />
            <el-option :value="3" label="已结束" />
          </el-select>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()"
          >查询</el-button
        >
        <el-button type="success" plain @click="resetData()">清空</el-button>
      </el-form>
    </div>
    <div class="showlist">
      <el-table :data="list" border fit highlight-current-row>
        <el-table-column label="序号" width="70" align="center">
          <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
          </template>
        </el-table-column>

        <el-table-column prop="acTitle" label="名称" width="110" align="center" />
        <el-table-column prop="acContent" label="内容" width="110" align="center" />

        <el-table-column
          prop="actBegintime"
          label="活动时间"
          width="300"
          align="center"
        />
        <el-table-column
          prop="actEndtime"
          label="结束时间"
          width="300"
          align="center"
        />
        <el-table-column
          prop="gmtCreate"
          label="添加时间"
          width="160"
          align="center"
        />

        <!-- <el-table-column label="操作" width="200" align="center">
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
        </el-table-column> -->
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
import actApi from "@/api/activity"
export default {
  name: "",
  props: {
    msg: String,
  },
  data() {
    return {
      list: null,
      page: 1,
      limit: 5,
      total: 0,
      activityQuery: {},
    };
  },
  created() {
    actApi.getActivity().then((response) => {
      console.log(response)
      this.list = response.data.ActList;
    })
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
</style>