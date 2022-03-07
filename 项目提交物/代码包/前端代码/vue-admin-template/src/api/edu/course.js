import request from '@/utils/request'
export default {
    //1 添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: '/eduservice/course/addCourseInfo',
            method: 'post',
            data:courseInfo
          })
    },
    //2 查询所有讲师
    getListTeacher() {
        return request({
            url: '/eduservice/teacher/findAll',
            method: 'get'
          })
    },

    //3 根据课程id查看课程信息
    getCourseInfo(id) {
        return request({
            url: '/eduservice/course/getCourseInfo/'+id,
            method: 'get'
          })
    },

    //4 修改课程信息
    updateCourseInfo(courseInfo) {
        return request({
            url: '/eduservice/course/updateCourseInfo',
            method: 'post',
            data: courseInfo
          })
    },

    //5 课程确认信息
    getPublishCourseInfo(id) {
        return request({
            url: '/eduservice/course/getPublishCourseInfo/'+id,
            method: 'get'
            
          })
    },

    //6 课程最终发布
    publishCourse(id) {
        return request({
            url: '/eduservice/course/publishCourse/'+id,
            method: 'post'
            
          })
    },

    //7 获取课程列表
    getListCourse() {
        return request({
            url: '/eduservice/course',
            method: 'get'
          })
    },

    //8 删除课程
    removeCourse(id){
        return request({
            url: '/eduservice/course/'+id,
            method: 'delete'
        })
    }



}
