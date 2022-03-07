import request from '@/utils/request'

export default {
  //查询热门课程和名师
  getHotCourse(){
    return request({
      url: '/eduservice/hotcourse/getHotCourse',
      method: 'GET'
    })
  },
  getHotTeacher(){
    return request({
      url: '/eduservice/hotteacher/getHotTeacher',
      method: 'GET'
    })
  }
}