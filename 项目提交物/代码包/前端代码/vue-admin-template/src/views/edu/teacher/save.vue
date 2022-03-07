<!--
 * @author agrinJPG
 * @date 2021/7/6 17:16
 * @Description 保存讲师修改
-->

<template>
  <div class="app-container">
    <el-form label-width="120px" :rules="rules" :model="teacher">
      <el-form-item label="讲师名称" prop="name">
        <el-input v-model="teacher.name" class="input-name" />
      </el-form-item>
      <el-form-item label="讲师热度" prop="sort">
        <el-input-number
          v-model="teacher.sort"
          controls-position="right"
          :min=0
        />
      </el-form-item>
      <el-form-item label="讲师头衔" prop="level">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="首席讲师" />
          <el-option :value="2" label="高级讲师" />
          <el-option :value="3" label="初级讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历" prop="career">
        <el-input
          v-model="teacher.career"
          placeholder="填写讲师学历及其目前职业"
        />
      </el-form-item>
      <el-form-item label="讲师简介" prop="intro">
        <el-input
          v-model="teacher.intro"
          :rows="10"
          type="textarea"
          placeholder="选填"
        />
      </el-form-item>
      <el-form-item label="讲师头像">
        <el-upload
          class="avatar-uploader"
          :action="BASE_API + '/eduoss/fileoss'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageURL" :src="imageURL" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :http-request="picSave"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageURL" :src="imageURL" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from "@/api/edu/teacher";
import PanThumb from "@/components/PanThumb";
export default {
  components: { PanThumb },
  data() {
    return {
      teacher: {
        name: "",
        sort: 0,
        level: 1,
        career: "",
        intro: "",
        avatar: "",
      },
      imageURL:'',
      rules: {
        name: [
          { required: true, message: "请输入讲师名称", trigger: "blur" },
          { min: 1, max: 6, message: "长度在 1 到 6 个字符", trigger: "blur" },
        ],
        sort: [{ required: true, message: "请选择讲师等级", trigger: "blur" }],
        level: [{ required: true, message: "请选择讲师头衔", trigger: "blur" }],
        career: [
          { required: true, message: "请填写讲师资历", trigger: "blur" },
          { max: 50, message: "最多 50 个字符", trigger: "blur" },
        ],
      },
      avatarSaved: false,
      BASE_API: process.env.BASE_API, //获取dev.env.js里面地址
      saveBtnDisabled: false, // 保存按钮是否禁用,
    };
  },
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
  methods: {
    init() {
      //判断路径有id值,做修改
      if (this.$route.params && this.$route.params.id) {
        //从路径获取id值
        const id = this.$route.params.id;
        //调用根据id查询的方法
        this.getInfo(id);
      } else {
        //路径没有id值，做添加
        //清空表单
        this.teacher = {};
      }
    },
    //根据讲师id查询的方法
    getInfo(id) {
      teacherApi.getTeacherInfo(id).then((response) => {
        this.teacher = response.data.teacher;
        this.imageURL = this.teacher.avatar;
      });
    },
    saveOrUpdate() {
      //判断修改还是添加
      //根据teacher是否有id
      if (!this.teacher.id) {
        //添加
        this.saveTeacher();
      } else {
        //修改
        this.updateTeacher();
      }
    },
    //修改讲师的方法
    updateTeacher() {
      if (!this.dataCheck(true)) {
        return;
      }
      teacherApi.updateTeacherInfo(this.teacher).then((response) => {
        //提示信息
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        //回到列表页面 路由跳转
        this.$router.push({ path: "/teacher/table" });
      });
    },
    //添加讲师的方法
    saveTeacher() {
      console.log(this.teacher);
      if (!this.dataCheck()) {
        return;
      }
      teacherApi.addTeacher(this.teacher).then((response) => {
        //添加成功
        //提示信息
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        //回到列表页面 路由跳转
        this.$router.push({ path: "/teacher/table" });
      });
    },
    // 信息检查
    dataCheck(isUpdate) {
      if (
        this.teacher.name == null ||
        this.teacher.sort == null ||
        this.teacher.level == null ||
        this.teacher.career == null
      ) {
        this.$message({
          type: "error",
          message: "讲师信息不完善",
        });
        return false;
      }
      if (this.avatarSaved == false && !isUpdate) {
        this.$message({
          type: "error",
          message: "未上传图片",
        });
        return false;
      }
      return true;
    },
    // 图片保存入 teacher base64 编码
    // picSave(val) {
    //   console.log("picSave");
    //   console.log(val.file);
    //   let _this = this
    //   let rd = new FileReader() // 创建文件读取对象
    //   let file = val.file
    //   rd.readAsDataURL(file) // 文件读取装换为base64类型
    //   rd.onloadend = function (e) {
    //     _this.avatarSaved = true;
    //     _this.teacher.avatar = this.result // this指向当前方法onloadend的作用域
    //     console.log("avatar:\n"+_this.teacher.avatar);
    //     _this.imageURL = _this.teacher.avatar;
    //   }

    //   return true;
    // },
    handleAvatarSuccess(res, file) {
      this.$message({
        type: "success",
        message: "图片上传成功!",
      });
      console.log(res);
      this.teacher.avatar = res.data.url;
      this.imageURL = this.teacher.avatar;
      this.avatarSaved = true;
    },
    beforeAvatarUpload(file) {
      console.log(this.BASE_API);
      const isJPG = file.type === "image/jpeg";
      const isLtM = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLtM) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isJPG && isLtM;
    },
  },
};
</script>
<style scoped>
.app-container{
  text-align: left;
  padding: 20px;
}
.el-form .el-form-item .input-name {
  width: 300px;
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
  width: 177px;
  height: 177px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 50%;
  height: 50%;
  display: block;
  border-radius: 4px;
}
</style>