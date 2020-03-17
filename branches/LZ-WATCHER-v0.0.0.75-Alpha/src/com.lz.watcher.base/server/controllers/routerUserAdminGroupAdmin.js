/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-10 14:56:07
 * @version   v1.0.0
 * filename   routerUserAdminGroupAdmin.js
 * function   用户管理分组管理路由
 ***************************************************************************/

const express = require('express');
const router  = express.Router();
// 方法拦截器
const InterceptorRouterFunc = require('../interceptors/InterceptorRouterFunc.js');
const interceptorRouterFunc = new InterceptorRouterFunc();
router.get('/', interceptorRouterFunc.doInterceptor('userAdminGroupAdmin'));
router.put('/group', interceptorRouterFunc.doInterceptor('userAdminGroupAdmin'));
router.patch('/groupTitle', interceptorRouterFunc.doInterceptor('userAdminGroupAdmin'));
router.put('/duty', interceptorRouterFunc.doInterceptor('userAdminGroupAdmin'));
router.patch('/dutyTitle', interceptorRouterFunc.doInterceptor('userAdminGroupAdmin'));
router.put('/jobLevel', interceptorRouterFunc.doInterceptor('userAdminGroupAdmin'));
router.patch('/jobLevelTitle', interceptorRouterFunc.doInterceptor('userAdminGroupAdmin'));
// 业务处理器
const handlerGetAuthorityData    = require('../services/userAdminGroupAdmin/handlerGetAuthorityData.js');
const handlerUpdateGroup         = require('../services/userAdminGroupAdmin/handlerUpdateGroup.js');
const handlerUpdateUsersGroup    = require('../services/userAdminGroupAdmin/handlerUpdateUsersGroup.js');
const handlerUpdateDuty          = require('../services/userAdminGroupAdmin/handlerUpdateDuty.js');
const handlerUpdateUsersDuty     = require('../services/userAdminGroupAdmin/handlerUpdateUsersDuty.js');
const handlerUpdateJobLevel      = require('../services/userAdminGroupAdmin/handlerUpdateJobLevel.js');
const handlerUpdateUsersJobLevel = require('../services/userAdminGroupAdmin/handlerUpdateUsersJobLevel.js');

// GET 用户管理数据权限数据
router.get('/', (req, res, next) => {
    handlerGetAuthorityData.doHandler(req, res, next);
});

// PUT 替换用户管理分组管理数据
router.put('/group', (req, res, next) => {
    handlerUpdateGroup.doHandler(req, res, next);
});

// PATCH 修改所有用户的分组名称数据
router.patch('/groupTitle', (req, res, next) => {
    handlerUpdateUsersGroup.doHandler(req, res, next);
});

// PUT 替换用户管理分组管理数据
router.put('/duty', (req, res, next) => {
    handlerUpdateDuty.doHandler(req, res, next);
});

// PATCH 修改所有用户的分组名称数据
router.patch('/dutyTitle', (req, res, next) => {
    handlerUpdateUsersDuty.doHandler(req, res, next);
});

// PUT 替换用户管理分组管理数据
router.put('/jobLevel', (req, res, next) => {
    handlerUpdateJobLevel.doHandler(req, res, next);
});

// PATCH 修改所有用户的分组名称数据
router.patch('/jobLevelTitle', (req, res, next) => {
    handlerUpdateUsersJobLevel.doHandler(req, res, next);
});

module.exports = router;