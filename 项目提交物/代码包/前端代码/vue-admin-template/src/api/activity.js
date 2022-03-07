/**
 * @author agrinJPG
 * @date 2021/7/22
 * @Description 活动
 */

 import request from '@/utils/request'

 export default{
     // 获取活动列表
     addActivity(act){
         return request({
             url: '/acti/edu-activity/addActivity',
             method: 'post',
             data:act
         })
     },
     getActivity(){
         return request({
             url: '/acti/front/getAll',
             method: 'get'
         })
     }
 }