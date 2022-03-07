package com.cqu.eduservice.controller;


import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.bibofu.edu.R;
import com.cqu.eduservice.entity.EduHistory;
import com.cqu.eduservice.entity.EduTeacher;
import com.cqu.eduservice.entity.vo.TeacherQuery;
import com.cqu.eduservice.service.EduHistoryService;
import com.cqu.eduservice.service.EduTeacherService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 * 讲师 前端控制器
 * </p>
 *
 * @author fubibo
 * @since 2021-07-05
 */

@Api(description="讲师管理")
@RestController
@CrossOrigin
@RequestMapping("/eduservice/teacher")
public class EduTeacherController {
    @Autowired
    private EduTeacherService teacherService;

    @Autowired
    private EduHistoryService historyService;



    //1. 查询讲师表所有数据
    @ApiOperation(value = "所有讲师列表")
    @GetMapping("findAll")
    public R finaAll(){

        List<EduTeacher> list = teacherService.list(null);


        EduHistory history=new EduHistory();
        history.setDescription("查询所有讲师");
        historyService.save(history);

        return R.ok().data("teacher",list);

    }

    //2. 删除讲师
    @ApiOperation(value = "删除讲师")
    @DeleteMapping("{id}")
    public R delete(@PathVariable String id){

        EduTeacher teacher = teacherService.getById(id);
        String name = teacher.getName();

        boolean b = teacherService.removeById(id);
        if (b){
            EduHistory history=new EduHistory();
            history.setDescription("删除名字为"+name+"的讲师");
            historyService.save(history);

            return R.ok();

        }else{
            return R.error();
        }


    }
    //3. 分页查询讲师
    @ApiOperation(value = "分页查询讲师")
    @GetMapping("pageTeacher/{current}/{limit}")
    public R page(@PathVariable long current,@PathVariable long limit){

        Page<EduTeacher> page=new Page<>(current,limit);
        teacherService.page(page,null);

        long total = page.getTotal();
        List<EduTeacher> records = page.getRecords();

        EduHistory history=new EduHistory();
        history.setDescription("分页查询讲师");
        historyService.save(history);


        return R.ok().data("total",total).data("rows",records);
    }

    //4. 条件查询带分页
    @ApiOperation(value = "条件查询讲师带分页")
    @PostMapping("pageTeacherCondition/{current}/{limit}")
    public R pageCondition(@PathVariable long current,@PathVariable long limit,
                           @RequestBody(required = false) TeacherQuery teacherQuery){

        Page<EduTeacher> teacherPage=new Page<>(current,limit);
        QueryWrapper<EduTeacher> wrapper=new QueryWrapper<>();

        String name = teacherQuery.getName();
        Integer level = teacherQuery.getLevel();
        String begin = teacherQuery.getBegin();
        String end = teacherQuery.getEnd();

        if (!StringUtils.isEmpty(name)){
            wrapper.like("name",name);
        }

        if (!StringUtils.isEmpty(level)){
            wrapper.eq("level",level);

        }

        if (!StringUtils.isEmpty(begin)){
            wrapper.ge("gmt_create",begin);
        }
        if (!StringUtils.isEmpty(end)){
            wrapper.le("gmt_modified",end);
        }

        teacherService.page(teacherPage,wrapper);

        long total = teacherPage.getTotal();
        List<EduTeacher> records = teacherPage.getRecords();

        EduHistory history=new EduHistory();
        history.setDescription("条件查询(带分页)讲师");
        historyService.save(history);

        return R.ok().data("total",total).data("rows",records);

    }

    //5. 添加讲师
    @ApiOperation(value = "添加讲师")
    @PostMapping("addTeacher")
    public R add(@RequestBody EduTeacher teacher){

        boolean save = teacherService.save(teacher);

        String id = teacher.getId();
        String name = teacher.getName();

        if (save){
            EduHistory history=new EduHistory();
            history.setDescription("添加讲师,名字为:"+name+",id为:"+id);
            historyService.save(history);
            return R.ok();
        }else{
            return R.error();
        }


    }

    //6. 根据id查询讲师
    @ApiOperation(value = "根据id查询讲师")
    @GetMapping("getTeacher/{id}")
    public R getTeacher(@PathVariable String id){
        EduTeacher teacher = teacherService.getById(id);
        String name = teacher.getName();

        EduHistory history=new EduHistory();
        history.setDescription("查询讲师,id为:"+id+",名字为:"+name);
        historyService.save(history);

        return R.ok().data("teacher",teacher);
    }

    //7. 讲师修改
    @ApiOperation(value = "讲师修改")
    @PostMapping("updateTeacher")
    public R updateTeacher(@RequestBody EduTeacher teacher){

        String id = teacher.getId();
        String name = teacher.getName();

        boolean b = teacherService.updateById(teacher);
        if (b){
            EduHistory history=new EduHistory();
            history.setDescription("修改讲师,id为:"+id+",名字为:"+name);
            historyService.save(history);

            return R.ok();
        }else{
            return R.error();
        }
    }

    //8. 获取操作讲师记录
    @ApiOperation(value = "讲师操作记录")
    @GetMapping("history")
    public R history(){
        List<EduHistory> list = historyService.list(null);
        return R.ok().data("history",list);
    }

    //9. 获取最新10条操作记录
    @ApiOperation(value = "获取最新10条操作记录")
    @GetMapping("newhistory")
    public R newhistory(){
        QueryWrapper<EduHistory> wrapper=new QueryWrapper<>();
        wrapper.orderByDesc("id");
        wrapper.last("limit 10");

        List<EduHistory> list = historyService.list(wrapper);

        return R.ok().data("newhistory",list);

    }

    //10 增加讲师热度
    @ApiOperation(value = "增加讲师热度")
    @PostMapping("addteahot/{teacherId}")
    public R addhot(@PathVariable String teacherId){
        EduTeacher teacher = teacherService.getById(teacherId);
        Integer sort = teacher.getSort();
        sort++;
        teacher.setSort(sort);
        teacherService.updateById(teacher);

        return R.ok();
    }




}

