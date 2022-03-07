<template>
  <client-only>
    <div id="aCoursesList" class="bg-fa of">
      <el-backtop>
        <div class="backtop">UP</div>
      </el-backtop>
      <!-- /课程列表 开始 -->
      <section class="container">
        <header class="comm-title">
          <h2 class="fl tac">
            <span class="c-333"> </span>
          </h2>
          <el-radio-group v-model="radio1" @change="typeChanged">
            <el-radio-button label="免费课程"></el-radio-button>
            <el-radio-button label="付费课程"></el-radio-button>
          </el-radio-group>
        </header>
        <section class="c-sort-box">
          <section class="c-s-dl">
            <dl class="subject-select">
              <dt>
                <span class="c-999 fsize18">课程类别</span>
              </dt>
              <dd class="c-s-dl-li">
                <ul class="clearfix">
                  <li>
                    <a
                      class="tag-select"
                      title="全部"
                      href="#"
                      @click="findAll"
                      :class="{ active: oneIndex == -1 }"
                      >全部</a
                    >
                  </li>
                  <li
                    v-for="(item, index) in subjectNestedList"
                    :key="index"
                    :class="{ active: oneIndex == index }"
                  >
                    <a
                      :title="item.title"
                      href="#"
                      @click="searchOne(item.id, index)"
                      >{{ item.title }}</a
                    >
                  </li>
                </ul>
              </dd>
            </dl>
            <dl>
              <dt>
                <span class="c-999 fsize14"></span>
              </dt>
              <dd class="c-s-dl-li">
                <ul class="clearfix">
                  <li
                    v-for="(item, index) in subSubjectList"
                    :key="index"
                    :class="{ active: twoIndex == index }"
                  >
                    <a
                      :title="item.title"
                      href="#"
                      @click="searchTwo(item.id, index)"
                      >{{ item.title }}</a
                    >
                  </li>
                </ul>
              </dd>
            </dl>
            <div class="clear"></div>
          </section>
          <div class="js-wrap">
            <section class="fl pl20">
              <ol class="js-tap clearfix">
                <li :class="{ 'current bg-orange': buyCountSort != '' }">
                  <a
                    title="销量"
                    href="javascript:void(0);"
                    @click="searchBuyCount()"
                    >销量
                    <span :class="{ hide: buyCountSort !== '1' }">↓</span>
                    <span :class="{ hide: buyCountSort !== '0' }">↑</span>
                  </a>
                </li>
                <li :class="{ 'current bg-orange': gmtCreateSort != '' }">
                  <a
                    title="最新"
                    href="javascript:void(0);"
                    @click="searchGmtCreate()"
                    >最新
                    <span :class="{ hide: gmtCreateSort !== '1' }">↓</span>
                    <span :class="{ hide: gmtCreateSort !== '0' }">↑</span>
                  </a>
                </li>
                <li :class="{ 'current bg-orange': priceSort != '' }">
                  <a
                    title="价格"
                    href="javascript:void(0);"
                    @click="searchPrice()"
                    >价格&nbsp;
                    <span :class="{ hide: priceSort !== '1' }">↓</span>
                    <span :class="{ hide: priceSort !== '0' }">↑</span>
                  </a>
                </li>
              </ol>
            </section>
          </div>
          <div class="mt40">
            <!-- /无数据提示 开始-->
            <section class="no-data-wrap" v-if="data.total == 0">
              <em class="icon30 no-data-ico">&nbsp;</em>
              <span class="c-666 fsize14 ml10 vam"
                >没有相关数据，平台正在努力整理中...</span
              >
            </section>
            <!-- /无数据提示 结束-->
            <article v-if="data.total > 0" class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="item in data.items" :key="item.id">
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
                      <span v-if="Number(item.price) !== 0" class="price_span">
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
          <!-- 公共分页 开始 -->
          <div>
            <div class="pager">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="this.pagelimit"
                :total="this.data.total"
                @current-change="changePage"
              >
              </el-pagination>
              <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
              <!-- <a
          :class="{undisable: !data.hasPrevious}"
          href="#"
          title="首页"
          @click.prevent="gotoPage(1)">首</a>
        <a
          :class="{undisable: !data.hasPrevious}"
          href="#"
          title="前一页"
          @click.prevent="gotoPage(data.current-1)">&lt;</a>
        <a
          v-for="page in data.pages"
          :key="page"
          :class="{current: data.current == page, undisable: data.current == page}"
          :title="'第'+page+'页'"
          href="#"
          @click.prevent="gotoPage(page)">{{ page }}</a>
        <a
          :class="{undisable: !data.hasNext}"
          href="#"
          title="后一页"
          @click.prevent="gotoPage(data.current+1)">&gt;</a>
        <a
          :class="{undisable: !data.hasNext}"
          href="#"
          title="末页"
          @click.prevent="gotoPage(data.pages)">末</a> -->
              <!-- <div class="clear"/> -->
            </div>
          </div>
        </section>
      </section>
      <!-- /课程列表 结束 -->
    </div>
  </client-only>
</template>
<script>
import courseApi from "@/api/course";

export default {
  data() {
    return {
      radio1: "免费课程",
      page: 1, //当前页
      data: {}, //课程列表
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表

      searchObj: {}, // 查询表单对象
      oneIndex: -1,
      twoIndex: -1,
      buyCountSort: "",
      gmtCreateSort: "",
      priceSort: "",
      pagelimit: 20,
    };
  },
  created() {
    let price = this.$route.query.price;
    console.log("price");
    console.log(price);
    if (price == 1) {
      this.title = "VIP课程";
      this.searchObj.price = 1;
    } else {
      this.title = "免费课程";
    }
    //课程第一次查询
    this.initCourseFirst();
    //一级分类显示
    this.initSubject();
    
  },
  methods: {
    //1 查询第一页数据
    initCourseFirst() {
      courseApi
        .getCourseList(1, this.pagelimit, this.searchObj)
        .then((response) => {
          this.data = response.data.data;
          console.log(this.data);
        });
    },

    //2 查询所有一级分类
    initSubject() {
      courseApi.getAllSubject().then((response) => {
        this.subjectNestedList = response.data.data.subjectList;
        if(this.$route.query.subjectId != null) {
          console.log("首页加载")
          this.searchTwo(this.$route.query.subjectId, this.$route.query.index);
        }
      });
    },
    typeChanged(value) {
      var price = value;
      console.log(price);
      if (price == "付费课程") {
        this.searchObj.price = 1;
      } else {
        this.searchObj = {};
      }
      //课程第一次查询
      this.initCourseFirst();
      //一级分类显示
      this.initSubject();
    },
    //3 分页切换的方法
    gotoPage(page) {
      courseApi
        .getCourseList(page, this.pagelimit, this.searchObj)
        .then((response) => {
          this.data = response.data.data;
        });
    },
    // 换页
    changePage(page) {
      console.log("换页:" + page);
      this.gotoPage(page);
    },
    findAll() {
      console.log("findAll");
      this.oneIndex = -1;
      this.subSubjectList = [];
      courseApi.getCourseList(1, this.pagelimit, {}).then((response) => {
        this.data = response.data.data;
      });
    },
    //4 点击某个一级分类，查询对应二级分类
    searchOne(subjectParentId, index) {
      console.log(subjectParentId,index)
      //把传递index值赋值给oneIndex,为了active样式生效
      this.oneIndex = index;

      this.twoIndex = -1;
      this.searchObj.subjectId = "";
      this.subSubjectList = [];

      //把一级分类点击id值，赋值给searchObj
      this.searchObj.subjectParentId = subjectParentId;
      //点击某个一级分类进行条件查询
      this.gotoPage(1);

      //拿着点击一级分类id 和 所有一级分类id进行比较，
      //如果id相同，从一级分类里面获取对应的二级分类
      for (let i = 0; i < this.subjectNestedList.length; i++) {
        //获取每个一级分类
        var oneSubject = this.subjectNestedList[i];
        //比较id是否相同
        if (subjectParentId == oneSubject.id) {
          //从一级分类里面获取对应的二级分类
          this.subSubjectList = oneSubject.children;
        }
      }
    },

    //5 点击某个二级分类实现查询
    searchTwo(subjectId, index) {
      console.log(subjectId,index)
      //把index赋值,为了样式生效
      this.twoIndex = index;
      //把二级分类点击id值，赋值给searchObj
      this.searchObj.subjectId = subjectId;
      //点击某个二级分类进行条件查询
      this.gotoPage(1);
    },

    //6 根据销量排序
    searchBuyCount() {
      //设置对应变量值，为了样式生效
      if (this.buyCountSort == "1") {
        this.buyCountSort = "0";
      } else {
        this.buyCountSort = "1";
      }
      this.gmtCreateSort = "";
      this.priceSort = "";

      //把值赋值到searchObj
      this.searchObj.buyCountSort = this.buyCountSort;
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;

      //调用方法查询
      this.gotoPage(1);
    },

    //7 最新排序
    searchGmtCreate() {
      //设置对应变量值，为了样式生效

      this.buyCountSort = "";
      if (this.gmtCreateSort == "1") {
        this.gmtCreateSort = "0";
      } else {
        this.gmtCreateSort = "1";
      }
      this.priceSort = "";

      //把值赋值到searchObj
      this.searchObj.buyCountSort = this.buyCountSort;
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;

      //调用方法查询
      this.gotoPage(1);
    },

    //8 价格排序
    searchPrice() {
      //设置对应变量值，为了样式生效
      this.buyCountSort = "";
      this.gmtCreateSort = "";
      if (this.priceSort == "1") {
        this.priceSort = "0";
      } else {
        this.priceSort = "1";
      }

      //把值赋值到searchObj
      this.searchObj.buyCountSort = this.buyCountSort;
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;

      //调用方法查询
      this.gotoPage(1);
    },
  },
};
</script>
<style scoped>
.active {
  background: #bdbdbd;
}
.hide {
  display: none;
}
.show {
  display: block;
}
.c-s-dl .subject-select {
  padding-left: 30px;
}
.clearfix .active {
  background-color: #409eff;
  color: #fff;
}
.c-s-dl-li ul li a:hover {
  color: #409eff;
}
.c-s-dl .c-s-dl-li ul .active a,
.c-s-dl .c-s-dl-li ul .active:hover a {
  color: #fff;
}
.c-s-dl-li ul li .active:hover {
  color: #fff;
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
</style>