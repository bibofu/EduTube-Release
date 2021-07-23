package com.cqu.orderservice.client;

import com.bibofu.edu.ordervo.UcenterMemberOrder;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

/**
 * @author fubibo
 * @create 2021-07-16 下午2:57
 */


@Component
@FeignClient(name = "service-ucenter",fallback = UcenterClientfallback.class)
public interface UcenterClient {

    //根据用户id获取用户信息
    @PostMapping("/ucenter/member/getUserInfoOrder/{id}")
    public UcenterMemberOrder getUserInfoOrder(@PathVariable("id") String id);


}
