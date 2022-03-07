import request from '@/utils/request'
export default {

    //添加小节
    addVideo(video) {
        console.log('addVideo:')
        console.log(video)
        return request({
            url: '/eduservice/video/addVideo',
            method: 'post',
            data: video
          })
    },
    //更新小节
    updateVideo(video) {
        console.log('updateVideo:')
        console.log(video)
        return request({
            url: '/eduservice/video/updateVideo',
            method: 'post',
            data: video
        })
    },
    //删除小节
    deleteVideo(id) {
        return request({
            url: '/eduservice/video/'+id,
            method: 'DELETE'
          })
    },

    //删除视频
    deleteAliyunvod(id){
        return request({
            url:'/eduvod/video/deleteAliVideo/'+id,
            method:'DELETE'
        })
    }
}