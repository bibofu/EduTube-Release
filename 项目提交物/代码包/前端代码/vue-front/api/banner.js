import request from '@/utils/request'
export default {
    getListBanner() {
        return request({
            url: `/eduservice/courseFront/getNewCourse`,
            method: 'get'
        })
    }
}