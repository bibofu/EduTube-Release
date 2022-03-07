<!--  -->
<template>
  <div class="app-container">
    <el-form
      label-width="90px"
      :rules="rules"
      :model="adminUser"
      label-position="left"
    >
      <el-form-item label="管理员ID" prop="id">
        <el-input v-model="adminUser.id" class="input-name" />
      </el-form-item>
      <el-form-item label="讲师名称" prop="name">
        <el-input v-model="adminUser.name" class="input-name" />
      </el-form-item>
      <el-form-item label="管理员角色" prop="role">
        <el-select
          v-model="adminUser.role"
          clearable
          placeholder="请选择"
          class="role-select"
        >
          <el-option :value="1" label="高级管理员" />
          <el-option :value="2" label="中级管理员" />
          <el-option :value="3" label="普通管理员" />
        </el-select>
      </el-form-item>
      <el-form-item label="默认头像" class="default-avatar">
        <el-upload
          class="avatar-uploader"
          :action="BASE_API + '8002/eduoss/fileoss'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="adminUser.avatar" :src="adminUser.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-button
        :disabled="saveBtnDisabled"
        type="primary"
        @click="saveOrUpdate"
        >保存</el-button
      >
    </el-form>
  </div>
</template>

<script>
import PanThumb from "@/components/PanThumb";
export default {
  name: "",
  props: {
    msg: String,
  },
  data() {
    return {
      adminUser: {
        id: "",
        name: "",
        role: "",
        avatar: "",
      },
    };
  },
  component: { PanThumb },
  created() {
    //页面渲染之前执行
    this.init();
  },
  watch: {
    //监听
    $route(to, from) {
      //路由变化方式，路由发生变化，方法就会执行
      this.init();
    },
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
.app-container {
  text-align: center;
  padding: 0 40px;
}
.el-form {
  margin-top: 30px;
  padding: 30px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-form .el-form-item {
  width: 330px;
  margin: auto;
  margin-bottom: 30px;
}
.el-form .el-form-item .el-input {
  width: 220px;
}
.el-form .el-form-item .role-select {
  width: 220px;
}
.avatar-uploader .el-upload {
  border: 2px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 79px;
  height: 79px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
  border-radius: 4px;
}
</style>
