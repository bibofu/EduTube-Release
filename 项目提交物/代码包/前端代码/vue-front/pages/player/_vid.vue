<template>
  <div class="container">
    <section class="path-wrap txtOf hLh30" id="course-path">
      <a href="/course" title class="c-999 fsize14">{{
        courseWebVo.subjectLevelOne
      }}</a>
      \
      <span class="c-999 fsize14">{{ courseWebVo.subjectLevelTwo }}</span>
      \
      <span class="c-333 fsize14">{{ courseWebVo.title }}</span>
    </section>
    <!-- <aside class="v-t-info"><section></section></aside> -->
    <article class="v-page-main">
      <section class="v-player">
        <link
          rel="stylesheet"
          href="https://g.alicdn.com/de/prismplayer/2.9.3/skins/default/aliplayer-min.css"
        />
        <script
          charset="utf-8"
          type="text/javascript"
          src="https://g.alicdn.com/de/prismplayer/2.9.3/aliplayer-min.js"
        ></script>

        <!-- 定义播放器dom -->
        <div id="J_prismPlayer" class="prism-player" />
      </section>
      <div class="sideComment">
        <div class="i-box">
          <div>
            <section class="c-infor-tabTitle c-tab-title">
              <a class="current" title href="javascript:void(0)">评论</a>
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
              <el-button class="button" @click="pubComment">发布评论</el-button>
            </div>
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
      </div>
    </article>

    <aside class="v-menu">
      <div class="i-box">
        <div class="chapter-t">
          <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
            <a name="c-i" class="current">目录</a>
          </section>
        </div>
        <article>
          <div>
            <section>
              <div class="lh-menu-wrap">
                <menu id="lh-menu" class="lh-menu">
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
                        <!-- <em class="lh-menu-i-1 icon18 mr10"></em
                          > -->
                        {{ chapter.title }}
                      </a>

                      <ol class="lh-menu-ol" style="display: block">
                        <li
                          class="lh-menu-second"
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
        </article>
      </div>
    </aside>
  </div>
</template>
<script>
import vod from "@/api/vod";
import { Message } from "element-ui";
import courseApi from "@/api/course";

export default {
  layout: "video", //应用video布局
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
    };
  },
  asyncData({ params, error }) {
    console.log(params);
    var str = params.vid;
    var vid = str.substring(0, str.search("courseId:"));
    var cid = str.substring(str.search("courseId:") + 9, str.length);
    console.log(vid);
    console.log(cid);
    return vod.getPlayAuth(vid).then((response) => {
      console.log(response.data);
      return {
        playAuth: response.data.data.Auth,
        vid: vid,
        courseId: cid,
      };
    });
  },
  created() {
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
        } else {
          (this.courseWebVo = response.data.data.courseWebVo),
            (this.chapterVideoList = response.data.data.chapterVideoList);
        }
      });
      courseApi
        .getCourseComment(this.courseId, this.currentpage, this.pagelimit)
        .then((response) => {
          this.commentList = response.data.data.items;
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
  mounted() {
    //页面渲染之后  created
    new Aliplayer(
      {
        id: "J_prismPlayer",
        vid: this.vid, // 视频id
        playauth: this.playAuth, // 播放凭证
        // encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
        width: "100%",
        height: "500px",
        // 以下可选设置
        // cover: 'http://guli.shop/photo/banner/1525939573202.jpg', // 封面
        qualitySort: "asc", // 清晰度排序

        mediaType: "video", // 返回音频还是视频
        autoplay: false, // 自动播放
        isLive: false, // 直播
        rePlay: false, // 循环播放
        preload: true,
        controlBarVisibility: "hover", // 控制条的显示方式：鼠标悬停
        useH5Prism: true, // 播放器类型：html5
      },
      function (player) {
        console.log("播放器创建成功");
      }
    );
  },
};
</script>

<style>
#course-path {
  margin-bottom: 10px;
}
.v-page-main {
  display: block;
  margin: 20px;
  margin-top: 0;
  margin-left: 0;
  width: 870px;
  float: left;
}
.v-player {
  display: block;
  /* margin: 20px; */
  margin-bottom: 30px;
  padding: 10px;
  width: 850px;
  /* height: 100%; */
  height: 540px;
  background-color: #fff;
}
#J_prismPlayer {
  width: 100%;
  height: 100% !important;
}
.chapter-t .c-infor-tabTitle.c-tab-title {
  margin-top: 10px;
  margin-bottom: 5px;
}

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

.sideComment {
  display: block;
  width: 100%;
}
.button-div {
  text-align: right;
}
.button-div .button {
  margin-top: 10px;
  width: 120px;
  padding: 5px 8px;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  color: #ffffff;
  background-color: #00baf2;
  cursor: pointer;
}
.v-menu .i-box {
  padding-bottom: 0;
}
.v-menu .lh-menu {
  margin: 0;
}
.v-menu .lh-menu ul li.lh-menu-stair a {
  font: 16px/26px "Microsoft YaHei";
  height: 26px;
  /* padding: 0; */
}
</style>