/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-10 14:57:04
 * @version   v1.0.0
 * filename   routerUserAdminAuthorityAdmin.js
 * function   用户管理权限管理路由
 ***************************************************************************/

const express = require('express');
const router  = express.Router();
// 方法拦截器
const InterceptorRouterFunc = require('../interceptors/InterceptorRouterFunc.js');
const interceptorRouterFunc = new InterceptorRouterFunc();
router.get('/', interceptorRouterFunc.doInterceptor('userAdminAuthorityAdmin'));
router.put('/', interceptorRouterFunc.doInterceptor('userAdminAuthorityAdmin'));
// 业务处理器
const handlerGetRoleAuthorityFunc    = require('../services/userAdminAuthorityAdmin/handlerGetRoleAuthorityFunc.js');
const handlerUpdateRoleAuthorityFunc = require('../services/userAdminAuthorityAdmin/handlerUpdateRoleAuthorityFunc.js');

// GET 用户管理权限管理数据（角色权限）
router.get('/', (req, res, next) => {
    handlerGetRoleAuthorityFunc.doHandler(req, res, next);
});

// PUT 替换用户管理权限管理数据
router.put('/', (req, res, next) => {
    handlerUpdateRoleAuthorityFunc.doHandler(req, res, next);
});

module.exports = router;