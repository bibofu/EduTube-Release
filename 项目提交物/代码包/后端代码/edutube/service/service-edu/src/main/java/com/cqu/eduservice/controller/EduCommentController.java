package com.cqu.eduservice.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import com.bibofu.edu.JwtUtils;
import com.bibofu.edu.R;
import com.bibofu.edu.uservo.LoginInfoVo;
import com.cqu.eduservice.client.UcenterClient;
import com.cqu.eduservice.entity.EduComment;
import com.cqu.eduservice.service.EduCommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 评论 前端控制器
 * </p>
 *
 * @author fubibo
 * @since 2021-07-15
 */

@Api(description = "课程评论")
@RestController
@CrossOrigin
@RequestMapping("/eduservice/comment")
public class EduCommentController {

    @Autowired
    private EduCommentService commentService;

    @Autowired
    private UcenterClient ucenterClient;


    //根据课程id查询评论列表
    @ApiOperation(value = "评论分页列表")
    @GetMapping("{courseId}/{page}/{limit}")
    public R index(@PathVariable String courseId, @PathVariable Long page, @PathVariable Long limit) {
        Page<EduComment> pageParam = new Page<>(page, limit);
        QueryWrapper<EduComment> wrapper = new QueryWrapper<>();
        wrapper.eq("course_id",courseId);
        commentService.page(pageParam,wrapper);
        List<EduComment> commentList = pageParam.getRecords();
        Map<String, Object> map = new HashMap<>();
        map.put("items", commentList);
        map.put("current", pageParam.getCurrent());
        map.put("pages", pageParam.getPages());
        map.put("size", pageParam.getSize());
        map.put("total", pageParam.getTotal());
        map.put("hasNext", pageParam.hasNext());
        map.put("hasPrevious", pageParam.hasPrevious());
        return R.ok().data(map);
    }


    @ApiOperation(value = "添加评论")
    @PostMapping("auth/save")
    public R save(@RequestBody EduComment comment, HttpServletRequest request) {
        String memberId = JwtUtils.getMemberIdByJwtToken(request);
        if(StringUtils.isEmpty(memberId)) {
            return R.error().code(28004).message("请登录");
        }
        comment.setMemberId(memberId);
        LoginInfoVo info = ucenterClient.getUcenterInfo(memberId);

        comment.setNickname(info.getNickname());
        comment.setAvatar(info.getAvatar());
        commentService.save(comment);

        return R.ok();
    }




}

