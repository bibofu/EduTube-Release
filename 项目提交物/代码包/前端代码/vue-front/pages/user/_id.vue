<!-- 用户个人中心 -->
<template>
  <client-only>
    <div class="user-container">
      <div class="userinfo">
        <img
          :src="loginInfo.avatar"
          width="30"
          height="30"
          class="vam picImg"
          alt
        />
        <span id="userName" class="vam disIb">{{ loginInfo.nickname }}</span>
        <a href="/settings">
          <el-button class="setting" type="info" plain icon="el-icon-setting"
            >个人设置</el-button
          ></a
        >
      </div>
      <section class="container">
        <!-- 我的课程 -->
        <div class="my-course">
          <h2>我的课程</h2>
          <el-tabs>
            <el-tab-pane label="已购买">
              <div class="mt40">
                <section class="no-data-wrap" v-if="dataBuy.length == 0">
                  <em class="icon30 no-data-ico">&nbsp;</em>
                  <span class="c-666 fsize14 ml10 vam"
                    >您尚未加入任何课程...</span
                  >
                </section>
                <article v-if="this.dataBuy.length > 0" class="comm-course-list">
                  <ul class="of" id="bna">
                    <li v-for="item in dataBuy" :key="item.id">
                      <!-- <div class="cc-l-wrap"> -->
                      <div class="course_card">
                        <section class="course-img">
                          <img
                            :src="item.cover"
                            class="image_card"
                            :alt="item.title"
                          />
                          <div class="cc-mask">
                            <a
                              :href="'/course/' + item.id"
                              title="开始学习"
                              class="comm-btn c-btn-1"
                              >开始学习</a
                            >
                          </div>
                        </section>
                        <!-- <h3 class="hLh30 txtOf mt10"> -->
                        <h3 class="course_title hLh30 txtOf mt10">
                          <a
                            :href="'/course/' + item.id"
                            :title="item.title"
                            class="course-title fsize18 c-333"
                            >{{ item.title }}</a
                          >
                        </h3>
                        <!-- <section class="mt10 hLh20 of"> -->
                        <section class="course_container">
                          <span
                            v-if="Number(item.price) === 0"
                            class="fr jgTag bg-green"
                          >
                            <i class="c-fff fsize12 f-fA">免费</i>
                          </span>
                          <span
                            v-if="Number(item.price) !== 0"
                            class="price_span"
                          >
                            <i class="price_font">￥ {{ item.price }}</i>
                          </span>
                          <span class="fl jgAttr c-ccc f-fA">
                            <i class="c-999 f-fA">{{ item.buyCount }}人学习</i>
                            |
                            <i class="c-999 f-fA">{{ item.viewCount }}评论</i>
                          </span>
                        </section>
                      </div>
                    </li>
                  </ul>
                  <div class="clear"></div>
                </article>
              </div>
            </el-tab-pane>
            <el-tab-pane label="我的收藏">
              <div class="mt40">
                <section class="no-data-wrap" v-if="data.length == 0">
                  <em class="icon30 no-data-ico">&nbsp;</em>
                  <span class="c-666 fsize14 ml10 vam"
                    >您尚未加入任何课程...</span
                  >
                </section>
                <article v-if="this.data.length > 0" class="comm-course-list">
                  <ul class="of" id="bna">
                    <li v-for="item in data" :key="item.id">
                      <!-- <div class="cc-l-wrap"> -->
                      <div class="course_card">
                        <section class="course-img">
                          <img
                            :src="item.cover"
                            class="image_card"
                            :alt="item.title"
                          />
                          <div class="cc-mask">
                            <a
                              :href="'/course/' + item.id"
                              title="开始学习"
                              class="comm-btn c-btn-1"
                              >开始学习</a
                            >
                          </div>
                        </section>
                        <!-- <h3 class="hLh30 txtOf mt10"> -->
                        <h3 class="course_title hLh30 txtOf mt10">
                          <a
                            :href="'/course/' + item.id"
                            :title="item.title"
                            class="course-title fsize18 c-333"
                            >{{ item.title }}</a
                          >
                        </h3>
                        <!-- <section class="mt10 hLh20 of"> -->
                        <section class="course_container">
                          <span
                            v-if="Number(item.price) === 0"
                            class="fr jgTag bg-green"
                          >
                            <i class="c-fff fsize12 f-fA">免费</i>
                          </span>
                          <span
                            v-if="Number(item.price) !== 0"
                            class="price_span"
                          >
                            <i class="price_font">￥ {{ item.price }}</i>
                          </span>
                          <span class="fl jgAttr c-ccc f-fA">
                            <i class="c-999 f-fA">{{ item.buyCount }}人学习</i>
                            |
                            <i class="c-999 f-fA">{{ item.viewCount }}评论</i>
                          </span>
                        </section>
                      </div>
                    </li>
                  </ul>
                  <div class="clear"></div>
                </article>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!-- /我的课程 -->
      </section>
    </div>
  </client-only>
</template>

<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/element-ui@2.15.3/lib/index.js"></script>

<script>
import cookie from "js-cookie";
import loginApi from "@/api/login";
import courseApi from "@/api/course";
import {Message} from "element-ui";

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
        sex: "",
      },
      data: [], //课程列表
      dataBuy:[],
      hasCollected: false, //
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
    this.getCourses();
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
      }
    },
    // 获取课程
    getCourses() {
      courseApi.getMyCourses().then((response) => {
        this.data = response.data.data.collect;
        console.log("collect")
        console.log(this.data);
        if (this.data.length != 0) {
          this.hasCollected = true;
        }
      });
      courseApi.getBuyCourses().then((response) => {
        if(response.data.success == false) {
          console.log("后台error")
          Message.error("后台错误，无法获取购买课程");
          return;
        }
        this.dataBuy = response.data.data.courseBuyList;
        console.log("buy")
        console.log(response);
      })
    },
  },
};
</script>
<style>
.user-container {
  background-color: #fff;
}
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
.userinfo .setting {
  float: right;
  margin-top: -30px;
  margin-right: 60px;
  padding: 7px 5px;
}
.userinfo .setting:hover {
  background-color: #f4f4f5;
  color: #909399;
  /* border: none; */
}

.my-course {
  padding: 20px;
  background-color: #fff;
}
.my-course h2 {
  font-size: 22px;
}
.course_card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;

  display: block;
  margin: 0 0 50px 30px;
  overflow: hidden;
}
.image_card {
  width: 100%;
  height: 120px;
  max-width: 100%;
  max-height: 100%;
  vertical-align: bottom;
  bottom: 0;
  object-fit: fill;
}
.course_title {
  padding: 10px;
  text-align: left;
}
.course_card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.course_container {
  padding: 2px 16px;
}
.pager {
  padding: 50px 0 20px;
  text-align: center;
}
.price_span {
  color: red;
  text-align: right;
  position: relative;
}
.price_font {
  font-size: 15px;
  line-height: 20px;
  font-weight: bold;
  float: right;
}
</style>