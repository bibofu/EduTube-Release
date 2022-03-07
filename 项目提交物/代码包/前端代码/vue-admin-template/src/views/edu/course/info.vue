<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>

    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-form label-width="120px" :rules="rules" :model="courseInfo">
      <el-form-item label="课程标题" prop="title">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        />
      </el-form-item>

      <!-- 所属分类 TODO -->
      <el-form-item label="课程分类" prop="subjectId">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="一级分类"
          @change="subjectLevelOneChanged"
        >
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>

        <!-- 二级分类 -->
        <el-select 
          v-show="this.twoListDisplaying"
          v-model="courseInfo.subjectId" 
          placeholder="二级分类"
          @change="subjectLevelTwoChanged"
        >
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <!-- 课程讲师 TODO -->
      <!-- 课程讲师 -->
      <el-form-item label="课程讲师" prop="teacherId">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="热度" prop="version">
        <el-input-number
          :min="0"
          v-model="courseInfo.version"
          controls-position="right"
          placeholder="请填写课程的实时热度"
        />
      </el-form-item>

      <el-form-item label="总课时" prop="lessonNum">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程简介 TODO -->
      <!-- 课程简介-->
      <el-form-item label="课程简介" prop="description">
        <tinymce :height="300" v-model="courseInfo.description" />
      </el-form-item>

      <!-- 课程封面 TODO -->
      <!-- 课程封面-->
      <el-form-item label="课程封面" prop="cover">
        <el-upload
          class="avatar-uploader"
          :action="BASE_API+'/eduoss/fileoss'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageURL" :src="imageURL" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格" prop="price">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
        元
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import course from "@/api/edu/course";
import subject from "@/api/edu/subject";
import Tinymce from "@/components/Tinymce"; //引入组件

export default {
  //声明组件
  components: { Tinymce },
  data() {
    return {
      twoListDisplaying:true,
      saveBtnDisabled: false,
      courseInfo: {
        title: "",
        subjectId: "", //二级分类id
        subjectParentId: "", //一级分类id
        teacherId: "",
        lessonNum: 0,
        description: "",
        cover: '',
        price: 0,
        version: 0
      },
      imageURL:"",
      courseId: "",
      BASE_API: process.env.BASE_API, // 接口API地址
      teacherList: [], //封装所有的讲师
      subjectOneList: [], //一级分类
      subjectTwoList: [], //二级分类
      rules:{
        title: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        subjectId:[
          { required: true, message: "请选择分类", trigger: "blur" },
        ],
        teacherId:[
          { required: true, message: "请选择讲师", trigger: "blur"}
        ],
        version:[
          { required: true, message: "请选择热度", trigger: "blur"}
        ],
        lessonNum:[
          { required: true, message: "请设置课时", trigger: "blur"}
        ],
        description:[
          { required: true, message: "请填写课程介绍", trigger: "blur"}
        ],
        cover:[
          { required: true, message: "请上传封面", trigger: "blur"}
        ],
        price:[
          { required: true, message: "请设置价格", trigger: "blur"}
        ]
      }
    };
  },
  created() {
    // //获取路由id值
    // if(this.$route.params && this.$route.params.id) {
    //     this.courseId = this.$route.params.id
    //     //调用根据id查询课程的方法
    //     this.getInfo()

    // } else {
    //     //初始化所有讲师
    //     this.getListTeacher()
    //     //初始化一级分类
    //     this.getOneSubject()
    // }
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
    //根据课程id查询
    getInfo() {
      course.getCourseInfo(this.courseId).then((response) => {
        //在courseInfo课程基本信息，包含 一级分类id 和 二级分类id
        this.courseInfo = response.data.courseInfo;
        this.imageURL = this.courseInfo.cover;
        //1 查询所有的分类，包含一级和二级
        subject.getSubjectList().then((response) => {
          //2 获取所有一级分类
          this.subjectOneList = response.data.subjectList;
          //3 把所有的一级分类数组进行遍历，
          for (var i = 0; i < this.subjectOneList.length; i++) {
            //获取每个一级分类
            var oneSubject = this.subjectOneList[i];
            //比较当前courseInfo里面一级分类id和所有的一级分类id
            if (this.courseInfo.subjectParentId == oneSubject.id) {
              //获取一级分类所有的二级分类
              this.subjectTwoList = oneSubject.children;
              
            }
          }
        });
        //初始化所有讲师
        this.getListTeacher();
      });
    },
    //上传封面成功调用的方法
    handleAvatarSuccess(res, file) {
      this.$message({
        type: 'success',
        message: '图片上传成功!'
      });
      this.courseInfo.cover = res.data.url;
      this.imageURL = res.data.url;
      console.log(this.courseInfo.cover);
    },
    //上传之前调用的方法
    beforeAvatarUpload(file) {
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
    //点击某个一级分类，触发change，显示对应二级分类
    subjectLevelOneChanged(value) {
      //value就是一级分类id值
      //遍历所有的分类，包含一级和二级
      for (var i = 0; i < this.subjectOneList.length; i++) {
        //每个一级分类
        var oneSubject = this.subjectOneList[i];
        //判断：所有一级分类id 和 点击一级分类id是否一样
        if (value === oneSubject.id) {
          //从一级分类获取里面所有的二级分类
          this.subjectTwoList = oneSubject.children;
          //把二级分类id值清空
          this.courseInfo.subjectId = this.subjectTwoList[0].id;
        }
      }
    },
    subjectLevelTwoChanged(value){
      this.twoListDisplaying = false;
      this.twoListDisplaying = true;
    },
    //查询所有的一级分类
    getOneSubject() {
      subject.getSubjectList().then((response) => {
        this.subjectOneList = response.data.subjectList;
      });
    },
    //查询所有的讲师
    getListTeacher() {
      course.getListTeacher().then((response) => {
        this.teacherList = response.data.teacher;
      });
    },
    //添加课程
    addCourse() {
      course.addCourseInfo(this.courseInfo).then((response) => {
        //提示
        this.$message({
          type: "success",
          message: "添加课程信息成功!",
        });
        console.log(response);
        //跳转到第二步
        this.$router.push({
          path: "/course/chapter/" + response.data.id,
        });
      });
    },
    //修改课程
    updateCourse() {
      course.updateCourseInfo(this.courseInfo).then((response) => {
        //提示
        this.$message({
          type: "success",
          message: "修改课程信息成功!",
        });
        //跳转到第二步
        this.$router.push({ path: "/course/chapter/" + this.courseId });
      });
    },
    saveOrUpdate() {
      //判断添加还是修改
      if (!this.courseInfo.id) {
        //添加
        this.addCourse();
      } else {
        this.updateCourse();
      }
    },

    init() {
      console.log("init");
      //获取路由id值
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id;
        //调用根据id查询课程的方法
        this.getInfo();
      } else {
        //路径没有id值，做添加
        //清空表单
        this.getListTeacher();
        //初始化一级分类
        this.getOneSubject();
        this.courseInfo = {};
        this.courseInfo.cover = "";
        this.courseInfo.subjectId = "";
      }
    },
  },
};
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
.el-form .el-input {
  width: 500px;
}

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 50%;
    height: 50%;
    display: block;
  }
</style>