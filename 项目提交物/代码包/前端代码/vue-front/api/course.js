import request from '@/utils/request'

export default {
  //条件分页课程查询的方法
  getCourseList(page,limit,searchObj) {
    return request({
      url: `/eduservice/courseFront/getFrontCourseList/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  //查询所有分类的方法
  getAllSubject() {
    return request({
      url: '/eduservice/subject/getAllSubject',
      method: 'get'
    })
  },
  //课程详情的方法
  getCourseInfo(id) {
    return request({
      url: '/eduservice/courseFront/getFrontCourseInfo/'+id,
      method: 'get'
    })
  },

  //课程订单信息
  getCourseOrder(id) {
    return request({
      url: '/eduservice/courseFront/getCourseInfoOrder/'+id,
      method: 'get'
    })
  },

  // 课程评论
  getCourseComment(id,page,limit){
    return request({
      url: `/eduservice/comment/${id}/${page}/${limit}`,
      method: 'get'
    })
  },

  // 发布评论
  pubComment(pub){
    console.log("pub:")
    console.log(pub)
    return request({
      url: '/eduservice/comment/auth/save',
      method: 'post',
      data:pub
    })
  }, 
  // 获取我的课程
  getMyCourses(){
    return request({
      url: '/eduservice/courseFront/getCollect',
      method: 'get'
    })
  },
  getBuyCourses(){
    return request({
      url: '/eduservice/courseFront/getBuy',
      method: 'get'
    })
  },
  // 收藏，加入课程
  collectCourse(courseId){
    return request({
      url: `/eduservice/courseFront/collect/${courseId}`,
      method: 'post'
    })
  },

  // 是否收藏
  isCollectCourse(courseId){
    return request({
      url: `/eduservice/courseFront/hascollect/${courseId}`,
      method: 'get'
    })
  },

  // 取消收藏
  cancelCollectCourse(courseId){
    return request({
      url: `/eduservice/courseFront/cancelcollect/${courseId}`,
      method: 'post'
    })
  },

  // 增加课程热度
  courseAddHot(courseId){
    return request({
      url: `/eduservice/course/addhot/${courseId}`,
      method: 'post'
    })
  }

}