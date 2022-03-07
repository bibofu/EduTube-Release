<template>
  <!-- 该组件只是占位且用于仅在客户端渲染其他组件 -->
  <client-only>
    <div class="index-container">
      <el-backtop>
        <div class="backtop">UP</div>
      </el-backtop>
      <div class="nav-container container">
        <!-- 左侧分类导航 -->
        <div class="subjectNav">
          <el-menu
            class="el-menu-vertical-demo"
            :collapse="true"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#094FF2"
          >
            <el-submenu
              v-for="(subject, subindex) in subjectList"
              :key="subindex.toString()"
              :index="subindex.toString()"
            >
              <template slot="title">
                <i class="el-icon-location"></i>{{ subject.title }}
                <span slot="title">导航一</span>
              </template>
              <el-menu-item-group>
                <!-- <span slot="title">分组一</span> -->
                <el-menu-item
                  v-for="(i, csubindex) in subjectList[subindex].children"
                  :key="csubindex.toString()"
                  :index="csubindex.toString()"
                  >
                  <a :href="'/course/?subjectId='+ i.id+'&'+'index='+csubindex+'&'+'parentId='+subject.id" style="color:#fff">{{ i.title }}
                  </a>  
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
        <!-- /左侧分类导航 -->

        <!-- 幻灯片 开始 -->
        <div class="banner">
          <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
              <div
                v-for="banner in bannerList"
                :key="banner.id"
                class="swiper-slide"
                style="background: #040b1b"
              >
                <!-- <a target="_blank" :href="banner.linkUrl"> -->
                <a target="_blank" :href="'/course/' + banner.id">
                  <img :src="banner.cover" :alt="banner.title" />
                </a>
              </div>
            </div>
            <div class="swiper-pagination swiper-pagination-white"></div>
            <div
              class="swiper-button-prev swiper-button-white"
              slot="button-prev"
            ></div>
            <div
              class="swiper-button-next swiper-button-white"
              slot="button-next"
            ></div>
          </div>
        </div>
        <!-- 幻灯片 结束 -->

        <!-- 我的课程 -->
        <div class="mycourse">
          <el-card :body-style="{ padding: '0px' }">
            <div v-if="!loginInfo.id" class="mycourse-default">
              <img src="../assets/img/default-avatar.png" class="image" />
              <div style="padding: 14px">
                <span>登录查看更多</span>
                <div class="bottom clearfix">
                  <div class="btn">
                    <a href="/login">
                      <input
                        type="button"
                        class="sign-in-button"
                        value="登录 / 注册"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="loginInfo.id" class="mycourse-show">
              <img :src="loginInfo.avatar" class="image" />
              <div style="padding: 14px">
                <span>{{ loginInfo.nickname }}</span>
                <div class="bottom clearfix">
                  <!-- 用户个人课程 -->
                  <ul class="lastMycourse">
                    <li v-for="course in data" :key="course.id">
                      <span
                        ><a :href="'/course/' + course.id">{{
                          course.title
                        }}</a></span
                      >
                    </li>
                  </ul>
                  <a href="/user">
                    <el-button type="text" class="button">我的课程</el-button>
                  </a>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div class="hotList">
        <div id="aCoursesList">
          <!-- 网校课程 开始 -->
          <div>
            <section class="container">
              <header class="comm-title">
                <h2 class="tac">
                  <span class="c-333">热门课程</span>
                </h2>
              </header>
              <div>
                <article class="comm-course-list">
                  <ul class="of" id="bna">
                    <li v-for="course in eduList" :key="course.id">
                      <div class="cc-l-wrap">
                        <section class="course-img">
                          <img
                            :src="course.cover"
                            class="img-responsive"
                            :alt="course.title"
                          />
                          <div class="cc-mask">
                            <a
                              :href="'/course/' + course.id"
                              title="开始学习"
                              class="comm-btn c-btn-1"
                              >开始学习</a
                            >
                          </div>
                        </section>
                        <h3 class="hLh30 txtOf mt10">
                          <a
                            href="#"
                            :title="course.title"
                            class="course-title fsize18 c-333"
                            >{{ course.title }}</a
                          >
                        </h3>
                        <section class="comminfo mt10 hLh20 of">
                          <span
                            class="fr jgTag bg-green"
                            v-if="Number(course.price) === 0"
                          >
                            <i class="c-fff fsize12 f-fA">免费</i>
                          </span>
                          <span class="fl jgAttr c-ccc f-fA">
                            <i class="c-999 f-fA">{{course.buyCount}}学习</i>
                            |
                            <i class="c-999 f-fA">{{course.viewCount}}评论</i>
                          </span>
                        </section>
                      </div>
                    </li>
                  </ul>
                  <div class="clear"></div>
                </article>
                <section class="allcourse tac pb30">
                  <a href="/course" title="全部课程" class="comm-btn c-btn-2"
                    >全部课程</a
                  >
                </section>
              </div>
            </section>
          </div>
          <!-- /网校课程 结束 -->
          <!-- 网校名师 开始 -->
          <div>
            <section class="container">
              <header class="comm-title">
                <h2 class="tac">
                  <span class="c-333">名师大咖</span>
                </h2>
              </header>
              <div>
                <article class="i-teacher-list">
                  <ul class="of">
                    <li v-for="teacher in teacherList" :key="teacher.id">
                      <section class="i-teach-wrap">
                        <div class="i-teach-pic">
                          <a href="/teacher/1" :title="teacher.name">
                            <img :alt="teacher.name" :src="teacher.avatar" />
                          </a>
                        </div>
                        <div class="mt10 hLh30 txtOf tac">
                          <a
                            href="/teacher/1"
                            :title="teacher.name"
                            class="fsize18 c-666"
                            >{{ teacher.name }}</a
                          >
                        </div>
                        <div class="hLh30 txtOf tac">
                          <span class="fsize14 c-999">{{
                            teacher.career
                          }}</span>
                        </div>
                        <div class="mt15 i-q-txt">
                          <p class="c-999 f-fA">{{ teacher.intro }}</p>
                        </div>
                      </section>
                    </li>
                  </ul>
                  <div class="clear"></div>
                </article>
                <section class="tac pb20">
                  <a href="/teacher" title="全部讲师" class="comm-btn c-btn-2"
                    >全部讲师</a
                  >
                </section>
              </div>
            </section>
          </div>
          <!-- /网校名师 结束 -->
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import banner from "@/api/banner";
import index from "@/api/index";
import course from "@/api/course";

import cookie from "js-cookie";
import loginApi from "@/api/login";
import courseApi from "@/api/course";

export default {
  data() {
    return {
      swiperOption: {
        //配置分页
        pagination: {
          el: ".swiper-pagination", //分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: ".swiper-button-next", //下一页dom节点
          prevEl: ".swiper-button-prev", //前一页dom节点
        },
      },
      subjectList: [],
      bannerList: [],
      loginInfo: {
        id: "",
        age: "",
        avatar: "",
        mobile: "",
        nickname: "",
        sex: "",
      },
      data: [], //课程列表
      eduList: [],
      teacherList: [],
    };
  },

  created() {
    //调用查询banner的方法
    this.getBannerList();

    //调用查询热门课程和名师的方法
    this.getHotCourseTeacher();
    // 获取课程分类
    this.getSubjectList();

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
        console.log(this.data);
        if (this.data.length != 0) {
          this.hasCollected = true;
          console.log(this.hasCollected);
        }
        var newdata = [];
        for (var i = 0; i < this.data.length; i++) {
          if (i > 2) {
            break;
          }
          // console.log("add");
          newdata.push(this.data[i]);
        }
        this.data = newdata;
      });
    },
    //查询热门课程和名师
    getHotCourseTeacher() {
      // this.eduList = response.data.data.eduList;
      // this.teacherList = response.data.data.teacherList;
      index.getHotCourse().then((response) => {
        console.log("Course");
        console.log(response);
        this.eduList = response.data.data.courseList;
      });
      index.getHotTeacher().then((response) => {
        console.log("Teacher");
        console.log(response);
        this.teacherList = response.data.data.teacherList;
      });
    },

    //查询banner数据
    getBannerList() {
      banner.getListBanner().then((response) => {
        console.log("Get banner:");
        console.log(response.data.data);
        this.bannerList = response.data.data.courseList;
      });
    },
    getSubjectList() {
      course.getAllSubject().then((response) => {
        console.log("getList:");
        this.subjectList = response.data.data.subjectList;
        console.log(this.subjectList);
      });
    },
  },
};
</script>

<style>
@import url("//unpkg.com/element-ui@2.15.3/lib/theme-chalk/index.css");
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.index-container {
  width: 100%;
}
.nav-container {
  margin-bottom: 20px;
  height: 320px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.subjectNav {
  display: inline-block;
  position: absolute;
}
.subjectNav .el-menu--collapse {
  width: 205px;
  height: 319px;
}
.subjectNav .el-menu-item,
.el-submenu__title {
  height: 53px;
}

/* icon 与 title 的间隙 */
.el-menu--collapse > .el-menu-item [class^="el-icon-"],
.el-menu--collapse > .el-submenu > .el-submenu__title [class^="el-icon-"] {
  margin-right: 20px;
  color: #fff;
}

.el-submenu__title:focus,
.el-submenu__title:hover {
  outline: 0 !important;
  color: #409eff !important;
  background: #3f4449;
}
.el-menu-item-group__title {
  padding: 0;
  background-color: #545c64;
}
.el-menu-item-group {
  background-color: #545c64;
}
.el-menu-item:hover {
  outline: 0 !important;
  color: #409eff !important;
  background: #3f4449;
}

.mycourse {
  display: block;
  position: absolute;
  /* float: right; */
  width: 205px;
  margin-left: 955px;
  /* top: 20px; */
  /* right: 90px; */
  text-align: center;
}
.el-card {
  height: 319px;
  font-size: 18px;
}
.mycourse .el-card {
  box-shadow: none;
}
.mycourse-default {
  padding-top: 30px;
}
.mycourse-default span {
  font-size: 12px;
  color: #666;
}
.mycourse-default .sign-in-button {
  margin-top: 10px;
  width: 60%;
  padding: 5px 8px;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  color: #ffffff;
  /* background-color: #3194d0; */
  cursor: pointer;
}

.bottom {
  /* margin-top: 13px; */
  line-height: 12px;
  text-align: center;
  border-top: 1px solid #ccc;
}

.button {
  padding: 0;
  float: center;
  /* background-color: #409eff;
  color: #000000; */
  padding: 15px;
  font-size: 15px;
  font-weight: bold;
  /* margin-top: 20px; */
  border-radius: 10px;
}

.image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  display: block;
  margin: auto;
  margin-top: 20px;
  border-radius: 50%;
}
/* .lastMycourse {
  text-align: center;
} */
.lastMycourse li {
  width: 90%;
  margin: 10px 15px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.lastMycourse li a {
  font-size: 14px;
}
.lastMycourse li a:hover {
  text-decoration: none;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.hotList #aCoursesList {
  padding-bottom: 30px;
}
.hotList .comm-title {
  width: 1100px;
  border-radius: 15px 15px 0 0;
}
.hotList .comm-btn {
  background-color: #fff;
}
.hotList .comm-title .tac {
  font-weight: bold;
  letter-spacing: 5px;
}
.hotList .c-btn-1 {
  color: #1989fa;
}
.hotList .comm-title .c-333 {
  color: #69a3f0;
}
.comm-course-list {
  width: 1160px;
}
.comm-course-list ul {
  margin-left: 0;
  /* margin-right: -5px; */
  padding-left: 5px;
  padding-right: 5px;
  background-color: #fff;
}
.comm-course-list ul li .cc-l-wrap {
  margin-left: 15px;
  margin-right: 15px;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
}
.comm-course-list ul li .cc-l-wrap h3 {
  margin: 10px;
}
.comm-course-list ul li .cc-l-wrap .comminfo {
  margin: 10px;
}
.allcourse {
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 0 0 15px 15px;
}
</style>