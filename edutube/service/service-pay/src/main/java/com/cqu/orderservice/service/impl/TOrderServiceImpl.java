package com.cqu.orderservice.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;

import com.bibofu.edu.ordervo.CourseWebVoOrder;
import com.bibofu.edu.ordervo.UcenterMemberOrder;
import com.cqu.orderservice.client.EduClient;
import com.cqu.orderservice.client.UcenterClient;
import com.cqu.orderservice.entity.TOrder;
import com.cqu.orderservice.mapper.TOrderMapper;
import com.cqu.orderservice.service.TOrderService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cqu.orderservice.utils.OrderNoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 订单 服务实现类
 * </p>
 *
 * @author fubibo
 * @since 2021-07-16
 */
@Service
public class TOrderServiceImpl extends ServiceImpl<TOrderMapper, TOrder> implements TOrderService {


    /**
     * 远程调用edu ucenter服务
     */
    @Autowired
    private EduClient eduClient;

    @Autowired
    private UcenterClient ucenterClient;




    @Override
    public String createOrder(String courseId, String userId) {


        //通过远程调用根据用户id获取用户信息
        UcenterMemberOrder userInfoOrder = ucenterClient.getUserInfoOrder(userId);

        //通过远程调用根据课程id获取课信息
        CourseWebVoOrder courseInfoOrder = eduClient.getCourseInfoOrder(courseId);

        QueryWrapper<TOrder>wrapper=new QueryWrapper<>();
        wrapper.eq("course_id",courseId);
        wrapper.eq("member_id",userId);
        TOrder tOrder=baseMapper.selectOne(wrapper);
        if(tOrder!=null)
        {
            return tOrder.getOrderNo();
        }
        //创建Order对象，向order对象里面设置需要数据
        TOrder order = new TOrder();
        order.setOrderNo(OrderNoUtil.getOrderNo());//订单号
        order.setCourseId(courseId); //课程id
        order.setCourseTitle(courseInfoOrder.getTitle());
        order.setCourseCover(courseInfoOrder.getCover());
        order.setTeacherName(courseInfoOrder.getTeacherName());
        order.setTotalFee(courseInfoOrder.getPrice());
        order.setMemberId(userId);
        order.setMobile(userInfoOrder.getMobile());
        order.setNickname(userInfoOrder.getNickname());
        order.setStatus(0);  //订单状态（0：未支付 1：已支付）
        order.setPayType(1);  //支付类型 ，微信1

        baseMapper.insert(order);

        return order.getOrderNo();
    }
}
