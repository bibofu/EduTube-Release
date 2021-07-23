package com.cqu.ucenter.utils;

import com.bibofu.edu.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @author CGT
 * @create 2021-07-16 14:55
 */
@Component
@FeignClient(name = "service-statistics",fallback = StatisticsClientFallback.class)
public interface StatisticsClient {
    @GetMapping(value = "/edustatistics/statistics/updateLoginNum/{day}")
    public R updateLoginNum(@PathVariable("day") String day);

    @GetMapping(value = "/edustatistics/statistics/updateRegisterNum/{day}")
    public R updateRegisterNum(@PathVariable("day")String day);
}
