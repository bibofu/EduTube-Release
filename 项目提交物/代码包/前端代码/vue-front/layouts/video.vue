<template>
  <div class="edu-player">
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="/">
            <img
              src="~/assets/img/EduTube_Logo.png"
              width="100%"
              alt="EduTube"
            />
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="h-r-login">
            <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
              <a href="/user">
                <img
                  :src="loginInfo.avatar"
                  width="30"
                  height="30"
                  class="vam picImg"
                  alt
                />
                <span id="userName" class="vam disIb ml5">{{
                  loginInfo.nickname
                }}</span>
              </a>
              <a
                href="javascript:void(0);"
                @click="logout()"
                class="ml10 fsize15"
                >退出</a
              >
            </li>
          </ul>
        </div>
      </section>
    </header>
    <!-- <div class="body">
      <div class="content"><nuxt /></div>
    </div> -->
    <nuxt />
    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a
                href="https://gitee.com/agrinJPG/edu-tube_-vue"
                title="Gitee"
                target="_blank"
                >EduTube_Vue</a
              >
            </li>
            <li>
              <a
                href="https://github.com/bibofu/EduTube"
                title="Github"
                target="_blank"
                >EduTube_back</a
              >
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a
                  href="https://github.com/bibofu/"
                  title="Giuhub"
                  target="_blank"
                  >Github/bibofu</a
                >|
                <a
                  href="https://gitee.com/agrinJPG/"
                  title="Gitee"
                  target="_blank"
                  >Gitee/agrinJPG</a
                >|
                <a
                  href="https://gitee.com/wake-xx"
                  title="Gitee"
                  target="_blank"
                  >Gitee/lxc</a
                >|

                <a
                  href="https://weibo.com/u/7401945924"
                  title="Weibo"
                  target="_blank"
                  >Weibo/bibofu</a
                >|
                <a
                  href="https://twitter.com/kobeball6"
                  title="Twitter"
                  target="_blank"
                  >Twitter</a
                >|

                <span>Email：bibofu24@gmail.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>@Created By bibofu,agrinJPG,lxc,ChloeAya 2021</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt />
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt />
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>
<script>
import "~/assets/css/reset.css";
import "~/assets/css/theme.css";
import "~/assets/css/global.css";
import "~/assets/css/web.css";
import "~/assets/css/base.css";

import cookie from "js-cookie";
import loginApi from "@/api/login";

export default {
  data() {
    return {
      token: "",
      loginInfo: {
        id: "",
        age: "",
        avatar: "",
        mobile: "",
        nickname: "",
        sex: "",
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
      //调用接口，根据token值获取用户信息
      loginApi.getLoginUserInfo().then((response) => {
        // console.log('################'+response.data.data.userInfo)
        this.loginInfo = response.data.data.userInfo;
        cookie.set("guli_ucenter", this.loginInfo, { domain: "localhost" });
      });
    },
    //创建方法，从cookie获取用户信息
    showInfo() {
      //从cookie获取用户信息
      var userStr = cookie.get("guli_ucenter");
      // 把字符串转换json对象(js对象)
      if (userStr) {
        this.loginInfo = JSON.parse(userStr);
      }
    },

    logout() {
      //清空cookie值
      cookie.set("guli_token", "", { domain: "localhost" });
      cookie.set("guli_ucenter", "", { domain: "localhost" });
      //回到首页面
      window.location.href = "/";
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
}
</style>

<style scoped>
/* .head {
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.head .logo {
  height: 50px;
  margin-left: 10px;
}

.body {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
} */
#header {
  height: 62px;
}
</style>