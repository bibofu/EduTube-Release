# EduTube-Release
2021.7.5-2021.7.26实训项目



项目github地址 ：https://github.com/bibofu/EduTube-Release , 该版本于2021-7-23发布





## 使用手册：

1 git clone https://github.com/bibofu/EduTube-Release，把项目下载到本地

2 用IDEA或eclipse等IDE打开，运行各个模块的启动类即可启动相关服务

3  由于用到私服的依赖，可能导致maven出错

![image 20210723152144373](https://z3.ax1x.com/2021/07/23/WsMRBj.png)

下载地址：https://pan.baidu.com/s/1zdqS9s7qEdGflK81dUB16g  提取码：3seh 



4  模块说明

![image 20210723152354750](https://z3.ax1x.com/2021/07/23/WsM2uQ.png)

service-act 模块为活动管理模块，包括管理员对活动进行发布，修改，删除等操作，用户前台看到活动并买到打折优惠课程，此模块尚处于开发中

service-alipay模块暂无内容

service-dailycount模块用于每日数据统计，包括注册人数，登录人数等

service-edu模块为课程模块，包括课程发布相关，课程评论，课程收藏

service-oss为上传图片所用模块

service-pay模块是支付相关模块，暂时实现生成订单，查看用户是否购买某门课等功能

service-ucenter模块为前台用户模块，包括注册，登录，修改信息，查看个人购买，收藏等功能

service-vod模块为视频相关模块，包括上传视频，获取视频播放凭证等



5  部署说明

代码里面写的mysql数据库，redis数据库，nacos地址都是我们小组的地址，包括pom里的部署配置为个人nexus私服