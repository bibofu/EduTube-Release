<template>
  <div id="aCoursesList" class="bg-fa of">
    <el-backtop>
      <div class="backtop">UP</div>
    </el-backtop>
    <!-- /课程详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="/" title class="c-999 fsize14">首页</a>
        \
        <a href="/course" title class="c-999 fsize14">{{
          courseWebVo.subjectLevelOne
        }}</a>
        \
        <span class="c-333 fsize14">{{ courseWebVo.subjectLevelTwo }}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px">
          <section class="p-h-video-box" id="videoPlay">
            <img
              height="357px"
              :src="courseWebVo.cover"
              :alt="courseWebVo.title"
              class="dis c-v-pic"
            />
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml40 mr15">
            <!-- <h2 class="hLh30 txtOf mt30" id="course-t"> -->
            <h2 class="hLh30 mt30" id="course-t">
              <span class="c-fff fsize24">{{ courseWebVo.title }}</span>
            </h2>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14"
                >主讲： {{ courseWebVo.teacherName }}&nbsp;&nbsp;&nbsp;</span
              >
            </section>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size: 24px"
                >￥{{ courseWebVo.price }}</b
              >
            </section>

            <section class="c-attr-jg of">
              <span class="vam" id="collect">
                <!-- <em class="icon18 scIcon"></em> -->
                <el-button
                  v-if="this.isCollect != '已收藏'"
                  @click="collect"
                  icon="el-icon-star-off"
                  id="uncollect"
                  >{{ this.isCollect }}</el-button
                >
                <el-button
                  v-else
                  @click="collect"
                  icon="el-icon-star-off"
                  id="collected"
                  >{{ this.isCollect }}</el-button
                >
              </span>
            </section>
            <section
              v-if="isbuy || Number(courseWebVo.price) === 0"
              class="c-attr-gm"
            >
              <a
                :href="
                  (this.chapterVideoList[0] && this.chapterVideoList[0].children[0] && this.chapterVideoList[0].children.length !== 0 
                  && this.chapterVideoList[0].children[0].videoSourceId !== '')
                    ? '/player/' +
                      this.chapterVideoList[0].children[0].videoSourceId +
                      'courseId:' +
                      courseId
                    : ''
                "
                class="comm-btn c-btn-3"
                id="id-course-main-btn"
                >立即观看</a
              >
            </section>
            <section v-else class="c-attr-gm">
              <a
                @click="createOrders()"
                href="#"
                title="立即购买"
                class="comm-btn c-btn-3"
                id="id-course-main-btn"
                >立即购买</a
              >
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ courseWebVo.buyCount }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ courseWebVo.lessonNum }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ courseWebVo.viewCount }}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p v-html="courseWebVo.description">
                        {{ courseWebVo.description }}
                      </p>
                    </section>
                  </div>
                </div>
                <!-- /课程介绍 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 文件目录 -->
                          <li
                            class="lh-menu-stair"
                            v-for="chapter in chapterVideoList"
                            :key="chapter.id"
                          >
                            <a
                              href="javascript: void(0)"
                              :title="chapter.title"
                              class="current-1"
                            >
                              <em class="lh-menu-i-1 icon18 mr10"></em
                              >{{ chapter.title }}
                            </a>

                            <ol class="lh-menu-ol" style="display: block">
                              <li
                                class="lh-menu-second ml30"
                                v-for="video in chapter.children"
                                :key="video.id"
                              >
                                <a
                                  :href="
                                    video.isFree == true ||
                                    (isbuy == true && video.videoSourceId == '')
                                      ? '/player/' +
                                        video.videoSourceId +
                                        'courseId:' +
                                        courseId
                                      : '<h1>尚未购买本课程，或课程未上传视频</h1>'
                                  "
                                  target="_blank"
                                  @click="clickVideo(video.isFree)"
                                >
                                  <span class="fr">
                                    <i
                                      class="free-icon vam mr10"
                                      v-show="video.isFree"
                                      >免费试听</i
                                    >
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em
                                  >{{ video.title }}
                                </a>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box mb20">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a class="current" title>主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto">
                  <li>
                    <div class="u-face">
                      <a :href="'/teacher/' + courseWebVo.teacherId">
                        <img :src="courseWebVo.avatar" alt />
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a
                        class="c-333 fsize16 fl"
                        :href="'/teacher/' + courseWebVo.teacherId"
                        >{{ courseWebVo.teacherName }}</a
                      >
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{ courseWebVo.intro }}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
          </div>
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a class="current" title href="javascript:void(0)">评论</a>
              </section>
              <section
                class="stud-act-list"
                v-for="comment in commentList"
                :key="comment.id"
              >
                <ul style="height: auto">
                  <li>
                    <div class="u-face">
                      <a href="#">
                        <img :src="comment.avatar" alt />
                      </a>
                    </div>
                    {{ comment.nickname }} :<br />
                    {{ comment.content }}
                  </li>
                </ul>
              </section>
              <div class="text-edit">
                <el-input
                  type="textarea"
                  placeholder="请输入评论"
                  v-model="newComment.content"
                  maxlength="30"
                  show-word-limit
                >
                </el-input>
              </div>
              <div class="button-div">
                <el-button class="button" @click="pubComment"
                  >发布评论</el-button
                >
              </div>
              <div style="text-align: center; margin-top: 10px">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :page-size="this.currentpage"
                  :total="this.pagetotal"
                  @current-change="pageChange"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>
    </section>
    <!-- /课程详情 结束 -->
  </div>
</template>
<style scoped>
.text-edit {
  margin-top: 10px;
}
.button-div {
  text-align: right;
}
.button-div .button {
  margin-top: 10px;
  width: 40%;
  padding: 5px 8px;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  color: #ffffff;
  background-color: #00baf2;
  cursor: pointer;
}
</style>
<script>
import courseApi from "@/api/course";
import ordersApi from "@/api/orders";
import { Message } from "element-ui";
export default {
  asyncData({ params, error }) {
    return { courseId: params.id };
  },
  data() {
    return {
      courseWebVo: {},
      chapterVideoList: [],
      isbuy: false,
      commentList: [],
      currentpage: 1,
      pagelimit: 10,
      pagetotal: 0,
      newComment: {
        content: "",
        courseId: "",
      },
      isCollect: "收藏",
    };
  },
  created() {
    //在页面渲染之前执行
    this.initCourseInfo();
  },
  methods: {
    //查询课程详情信息
    initCourseInfo() {
      courseApi.getCourseInfo(this.courseId).then((response) => {
        console.log(response);
        if (response.data.success == false) {
          Message({
            type: "error",
            message: "未登录无法查看信息",
          });
          this.$router.push('/course/')
        } else {
          (this.courseWebVo = response.data.data.courseWebVo),
            (this.chapterVideoList = response.data.data.chapterVideoList),
            (this.isbuy = response.data.data.isBuy);
          courseApi.isCollectCourse(this.courseId).then((response) => {
            if (response.data.data.hascollect == 1) this.isCollect = "已收藏";
            else {
              this.isCollect = "收藏";
            }
          });
          courseApi.courseAddHot(this.courseId).then((response) => {
            if (response.data.success == false)
              Message.error("出现了一点问题。");
          });
        }
      });
      courseApi
        .getCourseComment(this.courseId, this.currentpage, this.pagelimit)
        .then((response) => {
          this.commentList = response.data.data.items;
        });
    },
    collect() {
      if (this.isCollect == "已收藏") {
        courseApi.cancelCollectCourse(this.courseId).then((response) => {
          console.log(this.courseId);
          if (response.data.success == true) {
            Message.info("取消收藏");
            this.isCollect = "收藏";
          } else {
            Message.error("取消失败");
          }
        });
      } else {
        courseApi.collectCourse(this.courseId).then((response) => {
          if (response.data.success == true) {
            Message.success("收藏成功");
            this.isCollect = "已收藏";
          } else {
            Message.error("收藏失败，或已收藏  ");
          }
        });
      }
    },
    //生成订单
    createOrders() {
      ordersApi
        .createOrders(this.courseId)
        .then((response) => {
          //获取返回订单号
          //生成订单之后，跳转订单显示页面
          console.log(response.data);
          this.$router.push({ path: "/orders/" + response.data.data.orderId });
        })
        .catch((err) => {
          Message.error(err.message);
        });
    },
    // 评论转页
    gotoPage(value) {
      this.currentPage = value;
      courseApi
        .getCourseComment(this.courseId, this.currentpage, this.pagelimit)
        .then((response) => {
          this.commentList = response.data.data.items;
        });
    },

    pageChange(value) {
      this.gotoPage(value);
    },

    pubComment() {
      this.newComment.courseId = this.courseId;
      courseApi.pubComment(this.newComment).then((response) => {
        console.log(response);
        if (response.data.success == true) {
          Message.success("发布评论成功");
          this.newComment.content = "";
        } else {
          Message.error("发布评论失败，请重试");
        }
        // 刷新
        courseApi
          .getCourseComment(this.courseId, this.currentpage, this.pagelimit)
          .then((response) => {
            this.commentList = response.data.data.items;
          });
      });
    },
    // 点击了章节
    clickVideo(isFree) {
      if (isFree == false) {
        Message.error(
          "您尚未购买本课程，且该节不为试看课；若已购买则该节视频错误"
        );
      }
    },
  },
};
</script>

<style>
#course-t {
  height: 65px;
  line-height: 60px;
}
#course-t span {
  display: inline-block;
  line-height: 30px;
  vertical-align: middle;
}
#collect {
  margin-left: 100px;
}
#collect .el-icon-star-off {
  vertical-align: middle;
}
#collect #uncollect {
  width: 105px;
  font-weight: bold;
  font-size: 16px;
  border-color: #fc0;
  background-color: #fc0;
  color: #fff;
}
#collect #collected {
  width: 105px;
  font-weight: bold;
  font-size: 16px;
  border-color: #666;
  /* background-color: #fc0; */
  color: #666;
}
#id-course-main-btn {
  border-color: #fc0;
  color: #fc0;
}
</style>