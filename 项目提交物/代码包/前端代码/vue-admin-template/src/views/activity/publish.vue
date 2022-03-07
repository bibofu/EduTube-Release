<template>
  <div class="app-container body">
    <el-form
      inline
      ref="form"
      :model="form"
      label-width="90px"
      label-position="left"
    >
      <el-form-item label="活动名称" class="single">
        <el-input v-model="form.acTitle" class="input-name" />
      </el-form-item>
      <el-form-item label="活动时间" class="single">
        <el-col :span="11">
          <el-date-picker
            v-model="form.actBegintime"
            type="date"
            placeholder="开始"
            :picker-options="pickerOptionsStart"
            style="width: 100%"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-date-picker
            v-model="form.actEndtime"
            type="date"
            placeholder="结束"
            :picker-options="pickerOptionsEnd"
            style="width: 100%"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="活动封面">
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
      <el-form-item label="活动内容" class="double">
        <el-input
          v-model="form.acContent"
          type="textarea"
          placeholder="200字以内"
          :autosize="{ minRows: 4, maxRows: 6 }"
          maxlength="200"
          @input="descInput"
          clearable
        />
        <span class="gray"> 字数限制:{{ enterlength }}/200</span>
      </el-form-item>
    </el-form>
    <div class="doPublish">
      <el-button type="primary" @click="onSubmit">发布</el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import actApi from "@/api/activity"
export default {
  data() {
    return {
      form: {
        acContent: '',
        cover:'',
        acTitle: '',
        actBegintime:'',
        actEndtime:'',
      },
      enterlength:0,
      BASE_API: process.env.BASE_API,
      imageURL:'',
      pickerOptionsStart: {
        disabledDate: (time) => {
          let endDateVal = this.form.actEndtime;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        },
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          let beginDateVal = this.form.actBegintime;
          if (beginDateVal) {
            return time.getTime() < new Date(beginDateVal).getTime();
          }
        },
      },
    };
  },
  methods: {
    onSubmit() {
      this.$message("submit!");
      console.log(this.form);
      
      actApi.addActivity(this.form).then((response) => {
        console.log(response)
        if(response.data.success == false){
          this.$message({
            type:"error",
            message:"发布出错"
          })
        }
        else{
          this.$message({
            type:"success",
            message:"发布成功"
          })
          this.form = []
        }
      })
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
    descInput() {
      var txtVal = this.form.acContent.length;
      this.enterlength = txtVal;
    },
    //上传封面成功调用的方法
    handleAvatarSuccess(res, file) {
      this.$message({
        type: 'success',
        message: '图片上传成功!'
      });
      this.form.cover = res.data.url;
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
  },
};
</script>

<style scoped>
.body {
  margin: 20px 40px 0 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.line {
  text-align: center;
}
.el-form .el-form-item {
  margin: 15px 20px;
  padding-left: 20px;
}
.el-form .single {
  width: 45%;
}
.el-form .double {
  width: 90%;
}
.el-form .double .el-textarea {
  width: 700px;
}
.el-form .double span {
  display: block;
}
.el-form .el-form-item .input-name {
  width: 210px;
}
.el-form .el-form-item .el-col {
  width: 130px;
}
.el-form .el-form-item .el-col-2 {
  width: 20px;
}
.doPublish {
  text-align: center;
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

