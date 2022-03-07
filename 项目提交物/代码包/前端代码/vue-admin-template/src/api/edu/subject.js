import request from '@/utils/request'
export default {
    //1 课程分类列表
    getSubjectList() {
        return request({
            url: '/eduservice/subject/getAllSubject',
            method: 'get'
          })
    },
    //2 添加课程分类
    addOneSubject(subject){
        return request({
            url: '/eduservice/subject/addOneSubject',
            method: 'post',
            data:subject
        })
    },
    //3 删除课程分类
    deleteOneSubject(id){
        return request({
            url:'/eduservice/subject/deleteSubject/'+id,
            method: 'delete'
        })
    }
    
} 