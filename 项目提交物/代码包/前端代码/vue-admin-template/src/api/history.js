/**
 * @author agrinJPG
 * @date 2021/7/7
 * @Description 获取操作记录
 */

import request from '@/utils/request'

export default{
    // 获取所有操作记录
    getHistory(){
        return request({
            url:'/eduservice/teacher/history',
            method: 'get'
        })
    },
    // 获取最近操作记录
    getNewHistory(){
        return request({
            url:'/eduservice/teacher/newhistory',
            method: 'get'
        })
    },
    // 获取十五天前台数据
    getHotData(){
        return request({
            url:'/edustatistics/cart/findFifteen',
            method: 'get'
        })
    }
}