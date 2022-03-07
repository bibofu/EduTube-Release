<template>
  <client-only>
    <div id="aCoursesList" class="bg-fa of">
      <!-- 讲师介绍 开始 -->
      <section class="container">
        <header class="comm-title">
          <h2 class="fl tac">
            <span class="c-333">讲师介绍</span>
          </h2>
        </header>
        <div class="t-infor-wrap">
          <!-- 讲师基本信息 -->
          <section class="fl t-infor-box c-desc-content">
            <div class="mt20 mr30 mb40">
              <section class="t-infor-pic ml30 mr50">
                <img :src="teacher.avatar" />
              </section>
              <h3 class="hLh30 pt60 mb50">
                <span class="fsize26 c-333 info-name"
                  >{{ teacher.name }}&nbsp;
                  {{ teacher.level === 1 ? "高级讲师" : "首席讲师" }}
                </span>
              </h3>
              <section class="t-infor-txt">
                <span class="fsize18 mt20">{{ teacher.career }}</span>
              </section>
              <section class="mt10">
                <span class="t-tag-bg mt20">{{ teacher.intro }}</span>
              </section>
              <div class="clear"></div>
            </div>
          </section>
          <div class="clear"></div>
        </div>
        <section class="mt30">
          <div>
            <header class="comm-title all-teacher-title c-course-content">
              <h2 class="fl tac">
                <span class="c-333">主讲课程</span>
              </h2>
              <section class="c-tab-title">
                <a href="javascript: void(0)">&nbsp;</a>
              </section>
            </header>
            <!-- /无数据提示 开始-->
            <section class="no-data-wrap" v-if="courseList.length == 0">
              <em class="icon30 no-data-ico">&nbsp;</em>
              <span class="c-666 fsize14 ml10 vam"
                >没有相关数据，小编正在努力整理中...</span
              >
            </section>
            <!-- /无数据提示 结束-->
            <article class="comm-course-list" id="t-to-t">
              <ul class="of">
                <li v-for="course in courseList" :key="course.id">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img :src="course.cover" class="img-responsive" />
                      <div class="cc-mask">
                        <a
                          :href="'/course/' + course.id"
                          title="开始学习"
                          target="_blank"
                          class="comm-btn c-btn-1"
                          >开始学习</a
                        >
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a
                        href="#"
                        :title="course.title"
                        target="_blank"
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
                        <i class="c-999 f-fA">9634人学习</i>
                        |
                        <i class="c-999 f-fA">9634评论</i>
                      </span>
                    </section>
                  </div>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
          </div>
        </section>
      </section>
      <!-- /讲师介绍 结束 -->
    </div>
  </client-only>
</template>
<style>
</style>
<script>
import teacherApi from "@/api/teacher";
export default {
  //params.id获取路径id值
  asyncData({ params, error }) {
    return { teacherId: params.id };
  },
  data() {
    return {
      teacher: {},
      courseList: [],
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      console.log("ID");
      console.log(this.teacherId);
      teacherApi.getTeacherInfo(this.teacherId).then((response) => {
        console.log(response);
        if (response.data.success == true) {
          this.teacher = response.data.data.teacher;
          this.courseList = response.data.data.courseList;
        } else {
          this.$message({
            type: "error",
            message: "加载错误",
          });
        }
      });
    },
  },
};
</script>
<style>
.c-desc-content {
  background-color: #fff;
}
.info-name {
  padding: 10px;
  background-color: #69a3f0;
  color: #fff;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
}
#t-to-t {
  background-color: #fff;
  padding: 0 15px;
}
#t-to-t ul {
  margin-left: 0;
}
#t-to-t li .cc-l-wrap {
  margin: 0 15px 30px 15px;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
}
#t-to-t li .cc-l-wrap h3 {
  margin: 10px;
}
#t-to-t li .cc-l-wrap .comminfo {
  margin: 10px;
}
</style>
