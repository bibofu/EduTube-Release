/**
 * @author agrinJPG
 * @date 2021/7/6 17:16
 * @Description 路由
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // { path: '/login', component: () => import('@/views/edu/subject/list'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/logs',
    component: Layout,
    hidden: true,
    name: '操作记录',
    meta: { title: '操作记录' },
    children: [{
      path: '',
      component: () => import('@/views/logs/index')
    }]

  },
  {
    path: '/settings',
    component: Layout,
    hidden: true,
    name: '个人设置',
    meta: { title: '个人设置' },
    children: [{
      path: '',
      component: () => import('@/views/settings/index')
    }]

  },
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/table',
    name: '讲师管理',
    meta: { title: '讲师管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '讲师列表',
        component: () => import('@/views/edu/teacher/list'),
        meta: { title: '讲师列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加讲师',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: '添加讲师', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: 'EduTeacherEdit',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: '编辑讲师', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: '课程分类管理',
    meta: { title: '课程分类管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '课程分类列表',
        component: () => import('@/views/edu/subject/list'),
        meta: { title: '课程分类列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加课程分类',
        component: () => import('@/views/edu/subject/save'),
        meta: { title: '添加课程分类', icon: 'tree' }
      }
    ]
  },

  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: '课程管理',
    meta: { title: '课程管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '课程列表',
        component: () => import('@/views/edu/course/list'),
        meta: { title: '课程列表', icon: 'table' }
      },
      {
        path: 'info',
        name: '添加课程',
        component: () => import('@/views/edu/course/info'),
        meta: { title: '添加课程', icon: 'tree' }
      },
      {
        path: 'info/:id',
        name: 'EduCourseInfoEdit',
        component: () => import('@/views/edu/course/info'),
        meta: { title: '编辑课程基本信息', noCache: true },
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: 'EduCourseChapterEdit',
        component: () => import('@/views/edu/course/chapter'),
        meta: { title: '编辑课程大纲', noCache: true },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'EduCoursePublishEdit',
        component: () => import('@/views/edu/course/publish'),
        meta: { title: '发布课程', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/list',
    name: '活动管理',
    meta: { title: '活动管理', icon: 'example' },
    hidden: true,
    children: [
      {
        path: 'table',
        name: '活动列表',
        component: () => import('@/views/activity/list'),
        meta: { title: '活动列表', icon: 'table' },
      },
      {
        path: 'publish',
        name: '发布活动',
        component: () => import('@/views/activity/publish'),
        meta: { title: '发布活动', icon: 'form' },
      },
      {
        path: 'edit/:id',
        name: 'EduActivityEdit',
        component: () => import('@/views/activity/publish'),
        meta: { title: '编辑活动', noCache: true },
      }
    ]
  },

  // {
  //   path: '/adminUser',
  //   component: Layout,
  //   redirect: '/AdminUser/menu1',
  //   name: 'adminUser',
  //   meta: {
  //     title: '管理员管理',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'adminList',
  //       component: () => import('@/views/adminUser/adminList'),
  //       meta: { title: '管理员列表', icon: 'table' }
  //     },
  //     {
  //       path: 'adminAdd',
  //       name: '发布活动',
  //       component: () => import('@/views/adminUser/adminAdd'),
  //       meta: { title: '添加管理员', icon: 'form' }
  //     },
  //     {
  //       path: 'edit/:id',
  //       name: 'EduAdminUserEdit',
  //       component: () => import('@/views/adminUser/adminAdd'),
  //       meta: { title: '编辑管理员', noCache: true },
  //       hidden: true
  //     },
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/adminUser/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/adminUser/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/adminUser/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/adminUser/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/adminUser/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/adminUser/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/adminUser/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  {
    path: '/analysis',
    component: Layout,
    redirect: '/analysis/index',
    name: '数据管理',
    meta: { title: '数据管理', icon: 'example' },
    children: [
      {
        path: 'index',
        name: '统计数据',
        component: () => import('@/views/analysis/index'),
        meta: { title: '统计数据', icon: 'table' }
      }
    ]
  },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'vue-element-admin', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
