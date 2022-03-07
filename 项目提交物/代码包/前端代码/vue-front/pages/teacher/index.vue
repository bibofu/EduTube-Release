<template>
  <client-only>
    <div class="teacher-container">
      <el-backtop>
        <div class="backtop">UP</div>
      </el-backtop>
      <div id="aCoursesList" class="bg-fa of">
        <!-- 讲师列表 开始 -->
        <section class="container">
          <header class="comm-title all-teacher-title" id="allteacher-t">
            <h2 class="fl tac">
              <span class="c-333">全部讲师</span>
            </h2>
            <!-- <section class="c-tab-title"> -->
            <!-- <a id="subjectAll" title="全部" href="#">全部</a> -->
            <!-- <c:forEach var="subject" items="${subjectList }">
                            <a id="${subject.subjectId}" title="${subject.subjectName }" href="javascript:void(0)" onclick="submitForm(${subject.subjectId})">${subject.subjectName }</a>
          </c:forEach>-->
            <!-- </section> -->
          </header>
          <section class="c-sort-box unBr">
            <div>
              <!-- /无数据提示 开始-->
              <section class="no-data-wrap" v-if="data.total == 0">
                <em class="icon30 no-data-ico">&nbsp;</em>
                <span class="c-666 fsize14 ml10 vam"
                  >没有相关数据，小编正在努力整理中...</span
                >
              </section>
              <!-- /无数据提示 结束-->
              <article
                v-if="data.total > 0"
                class="i-teacher-list"
                id="teacherList"
              >
                <ul class="of">
                  <li v-for="teacher in data.items" :key="teacher.id">
                    <section class="i-teach-wrap">
                      <div class="i-teach-pic" id="teacher-pic">
                        <a
                          :href="'/teacher/' + teacher.id"
                          :title="teacher.name"
                          target="_blank"
                        >
                          <img :src="teacher.avatar" :alt="teacher.name" />
                        </a>
                      </div>
                      <div class="mt10 hLh30 txtOf tac">
                        <a
                          :href="'/teacher/' + teacher.id"
                          :title="teacher.name"
                          target="_blank"
                          class="fsize18 c-666"
                          >{{ teacher.name }}</a
                        >
                      </div>
                      <div class="hLh30 txtOf tac">
                        <span class="fsize14 c-999">{{ teacher.career }}</span>
                      </div>
                      <div class="mt15 i-q-txt">
                        <p class="c-999 f-fA">{{ teacher.intro }}</p>
                      </div>
                    </section>
                  </li>
                </ul>
                <div class="clear"></div>
              </article>
            </div>
            <!-- 公共分页 开始 -->
            <!-- 公共分页 开始 -->
            <div>
              <div class="paging">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :page-size="this.pagelimit"
                  :total="this.data.total"
                  @current-change="changePage"
                >
                </el-pagination>
              </div>
            </div>
            <!-- 公共分页 结束 -->
            <!-- 公共分页 结束 -->
          </section>
        </section>
        <!-- /讲师列表 结束 -->
      </div>
    </div>
  </client-only>
</template>




<script>
import teacherApi from "@/api/teacher";

export default {
  data() {
    return {
      page: 1,
      pagelimit: 20,
    };
  },
  //异步调用，调用一次
  //params: 相当于之前 this.$route.params.id  等价  params.id
  asyncData({ params, error }) {
    return teacherApi.getTeacherList(1, 20).then((response) => {
      //this.data = response.data.data
      return { data: response.data.data };
    });
  },
  methods: {
    //分页切换的方法
    //参数是页码数
    gotoPage(page) {
      teacherApi.getTeacherList(page, this.pagelimit).then((response) => {
        this.data = response.data.data;
      });
    },
    // 换页
    changePage(page) {
      console.log("换页:" + page);
      this.gotoPage(page);
    },
  },
};
</script>

<style>
.teacher-container #aCoursesList {
  padding-bottom: 30px;
}
#allteacher-t {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
#allteacher-t h2 {
  display: block;
  width: 100%;
  text-align: left;
  border-bottom: 1px solid #e2e2e2;
}
#teacherList ul {
  margin-top: 20px;
}
#teacherList ul li {
  width: 20%;
}
#teacher-pic img {
  width: 100px;
  height: 110px;
  object-fit: cover;
}
</style>