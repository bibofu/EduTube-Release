<template>
  <div class="sign">
    <!--标题-->
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
        <aside class="visitor">
          <a href="/">随 便 逛 逛<i class="el-icon-monitor"></i></a>
        </aside>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    <div class="logo">
      <img src="~/assets/img/EduTube_Logo.png" alt="logo" />
    </div>
    <div class="welcome">
      <span>开源创新教育平台</span>
      <span
        >Sharing is good, and with digital technology, sharing is easy.</span
      >
    </div>
    <!--表单-->
    <nuxt />
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
  </div>
</template>