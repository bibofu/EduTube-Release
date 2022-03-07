import request from '@/utils/request'

export default {
    //登录的方法
  submitLoginUser(userInfo) {
    return request({
      url: `ucenter/member/login`,
      method: 'post',
      data: userInfo
    })
  },
  wxGetCode(){
    return request({
      url: `/api/ucenter/wx/login`,
      method: 'get'
    })
  },

  //根据token获取用户信息
  getLoginUserInfo() {
    return request({
      url: `/ucenter/member/getMemberInfo`,
      method: 'get'
    })
  },

  // 修改密码，需要登陆
  changePassword(password) {
    return request({
      url: `/ucenter/description/updateMobilePass`,
      method: 'post',
      data:password
    })
  },

  // 修改头像
  changeAvatar(UrlVo){
    console.log(UrlVo)
    return request({
      url: `/ucenter/description/updateAvatar`,
      method: 'post',
      data:UrlVo
    })
  },

  // 修改昵称
  changeNickname(userInfo) {
    console.log(userInfo)
    return request({
      url: `/ucenter/description/updateOther`,
      method: 'post',
      data:userInfo
    })
  }

}