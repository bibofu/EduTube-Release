<!--  -->
<template>
  <client-only>
    <div>
      <div class="userinfo">
        <el-upload
          class="avatar-uploader"
          :action="'http://localhost:9001/eduoss/fileoss'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="loginInfo.avatar" :src="loginInfo.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span id="userName" class="vam disIb">{{ loginInfo.nickname }}</span>
      </div>
      <div class="card">
        <el-tabs type="border-card">
          <el-tab-pane label="基本信息">
            <el-radio-group size="small"> </el-radio-group>
            <div style="margin: 20px"></div>
            <el-form
              :inline="true"
              status-icon
              label-position="left"
              label-width="95px"
              :model="loginInfo"
              class="demo-ruleForm"
            >
              <el-form-item label="昵称">
                <el-input v-model="loginInfo.nickname"></el-input
              ></el-form-item>
              <el-form-item label="用户ID">
                <el-input v-model="loginInfo.id" disabled></el-input
              ></el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="loginInfo.sex">
                  <el-radio :label="0">男</el-radio>
                  <el-radio :label="1">女</el-radio>
                  <el-radio :label="2">其他</el-radio>
                </el-radio-group></el-form-item
              >
              <el-form-item
                label="年龄"
                prop="age"
                :rules="[{ type: 'number', message: '年龄必须为数字值' }]"
              >
                <el-input
                  v-model.number="loginInfo.age"
                  type="age"
                  placeholder="18"
                  autocomplete="off"
                ></el-input
              ></el-form-item>
              <el-form-item label="联系电话" prop="mobile">
                <el-input
                  v-model="loginInfo.mobile"
                  placeholder="+86"
                disabled></el-input
              ></el-form-item>
              <el-form-item label="微信ID">
                <el-input v-model="loginInfo.openid" disabled></el-input
              ></el-form-item>
              <div class="do_set">
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="resetForm('numberValidateForm')"
                  >重置</el-button
                >
              </div>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="账号设置">
            <div class="accountSet">
              <!-- <account-reset /> -->
              <el-form
                status-icon
                label-position="left"
                label-width="95px"
                :model="loginInfo"
                class="demo-ruleForm"
              >
                <el-form-item label="用户ID">
                  <el-input v-model="loginInfo.id" disabled></el-input
                ></el-form-item>
                <el-form-item label="绑定手机号">
                  <el-input
                    v-model="loginInfo.mobile"
                    placeholder="+86"
                  ></el-input
                ></el-form-item>
                <el-form-item label="修改密码">
                  <el-input
                    v-model="loginInfo.newpassword"
                    type="password"
                    placeholder="请输入新密码"
                  ></el-input
                ></el-form-item>
                <el-form-item label="确认密码">
                  <el-input
                    v-model="loginInfo.checkPass"
                    type="password"
                    placeholder="请再次输入密码"
                  ></el-input
                ></el-form-item>
              </el-form>
              <div class="do_set">
                <el-button type="primary" @click="changePassword"
                  >修改</el-button
                >
                <el-button @click="resetForm('numberValidateForm')"
                  >重置</el-button
                >
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </client-only>
</template>

<script>
import cookie from "js-cookie";
import loginApi from "@/api/login";
import { Message } from "element-ui";

export default {
  name: "",
  props: {
    msg: String,
  },
  data() {
    return {
      loginInfo: {
        id: "",
        age: "",
        avatar: "",
        mobile: "",
        nickname: "",
        openid: "",
        password: "",
        newpassword: "",
        checkPass: "",
        sex: "",
      },
      baseInfo: {
        nickname: "",
        sex: "",
        age: "",
      },
      accountInfo: {
        mobile: "",
        password: "",
      },
      UrlVo: {
        url: "",
      },
    };
  },
  created() {
    //获取路径里面token值
    this.token = this.$route.query.token;
    console.log(this.token);
    if (this.token) {
      //判断路径是否有token值
      this.wxLogin();
    }

    this.showInfo();
  },
  methods: {
    //微信登录显示的方法
    wxLogin() {
      //console.log('************'+this.token)
      cookie.set("guli_token", this.token, { domain: "localhost" });
      cookie.set("guli_ucenter", "", { domain: "localhost" });
      //把token值放到cookie里面
      // cookie.set("edu_token", this.token, { domain: "localhost" });
      // cookie.set("edu_ucenter", "", { domain: "localhost" });
      //console.log('====='+cookie.get('guli_token'))
      //调用接口，根据token值获取用户信息
      loginApi.getLoginUserInfo().then((response) => {
        // console.log('################'+response.data.data.userInfo)
        this.loginInfo = response.data.data.userInfo;
        cookie.set("guli_ucenter", this.loginInfo, { domain: "localhost" });
        // cookie.set("edu_ucenter", this.loginInfo, { domain: "localhost" });
      });
    },
    //创建方法，从cookie获取用户信息
    showInfo() {
      //从cookie获取用户信息
      var userStr = cookie.get("guli_ucenter");
      // var userStr = cookie.get("edu_ucenter");
      // 把字符串转换json对象(js对象)
      if (userStr) {
        this.loginInfo = JSON.parse(userStr);
        // this.baseInfo.name = this.loginInfo.nickname;
        // this.baseInfo.id = this.loginInfo.id;
        // this.baseInfo.mobile = this.loginInfo.mobile;
        console.log(this.loginInfo);
      }
    },
    onSubmit() {
      this.baseInfo.nickname = this.loginInfo.nickname;
      this.baseInfo.age = this.loginInfo.age;
      this.baseInfo.sex = this.loginInfo.sex;
      loginApi
        .changeNickname(this.baseInfo)
        .then((response) => {
          if (response.data.success == true) {
            Message.success("修改成功");
            loginApi.getLoginUserInfo().then((response) => {
              this.loginInfo = response.data.data.userInfo;
              console.log(this.loginInfo);
              cookie.set("guli_ucenter", this.loginInfo, {
                domain: "localhost",
              });
            });
          } else {
            Message.error("保存修改失败");
          }
        })
        .catch((err) => {
          Message.error(err);
        });
    },
    changePassword() {
      if (this.loginInfo.newpassword == "") {
        Message.error("请输入修改的密码");
        return;
      }
      if (this.loginInfo.newpassword != this.loginInfo.checkPass) {
        Message.error("确认密码不匹配");
        return;
      }
      this.accountInfo.password = this.loginInfo.newpassword;
      this.accountInfo.mobile = this.loginInfo.mobile;
      console.log(this.accountInfo);
      loginApi.changePassword(this.accountInfo).then((response) => {
        console.log(response.data);
        if (response.data.success == true) {
          Message.success("修改成功");
          //清空cookie值
          cookie.set("guli_token", "", { domain: "localhost" });
          cookie.set("guli_ucenter", "", { domain: "localhost" });
          // cookie.set("edu_token", "", { domain: "localhost" });
          // cookie.set("edu_ucenter", "", { domain: "localhost" });
          //回到首页面
          window.location.href = "/login";
        } else {
          Message.error("修改失败，请重试");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      console.log("ossUrl")
      console.log(res);
      this.loginInfo.avatar = res.data.url;
      this.UrlVo.url = res.data.url;
      loginApi
        .changeAvatar(this.UrlVo)
        .then((response) => {
          console.log(response.data);
          if (response.data.success == true) {
            Message.success("图片上传成功!");
            loginApi.getLoginUserInfo().then((response) => {
              this.loginInfo = response.data.data.userInfo;
              console.log(this.loginInfo);
              cookie.set("guli_ucenter", this.loginInfo, {
                domain: "localhost",
              });
            });
            //location.reload()
          } else {
            Message.error("图片上传失败，" + response.data.message);
          }
        })
        .catch((err) => {
          Message.error("上传失败：" + err.message);
        });
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
<style>
.userinfo img {
  display: block;
  margin: auto;
  margin-top: 40px;
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 50%;
}
.userinfo #userName {
  display: block;
  color: #fff;
  font-size: 26px;
}
.card {
  display: block;
  background-color: #fff;
  padding: 50px 0;
}
.card .el-tabs--border-card {
  margin: 0 15%;
}
.card .el-tabs__item {
  font-size: 18px;
}
.previewBox {
  text-align: center;
  margin-left: 60px;
}

.preview {
  width: 150px;
  height: 150px;
  margin: 0px auto 20px auto;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-color: #ccc;
  overflow: hidden;
}

.cropper {
  width: 260px;
  height: 260px;
}
.card .el-form {
  margin: auto;
  margin-top: -15px;
  width: 670px;
}
.card .accountSet .el-form {
  width: 350px;
  margin: auto;
  margin-top: 23px;
  margin-bottom: 42px;
}
.card .el-form-item__label {
  width: 300px;
  padding-right: 0;
}
.card .el-form-item .el-input {
  width: 200px;
  margin-right: 20px;
}
.card .el-form-item .el-radio-group {
  width: 220px;
}
.card .el-form-item .el-radio {
  margin-right: 18px;
}
.do_set {
  text-align: center;
  margin-top: 20px;
}
.do_set .el-button {
  margin: auto;
}
/* .card .accountSet .el-form {
  margin-top: 23px;
  margin-left: 200px;
} */
.card .el-tab-pane {
  margin-bottom: 30px;
}
</style>