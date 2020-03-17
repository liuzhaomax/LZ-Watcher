/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-10 14:55:28
 * @version   v1.0.0
 * filename   routerUserAdminAccountAdmin.js
 * function   用户管理的帐户管理路由
 ***************************************************************************/

const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');
// 方法拦截器
const InterceptorRouterFunc = require('../interceptors/InterceptorRouterFunc.js');
const interceptorRouterFunc = new InterceptorRouterFunc();
router.post('/', interceptorRouterFunc.doInterceptor('userAdminAccountAdmin'));
router.get('/', interceptorRouterFunc.doInterceptor('userAdminAccountAdmin'));
router.patch('/activation', interceptorRouterFunc.doInterceptor('userAdminAccountAdmin'));
router.patch('/userinfoBase', interceptorRouterFunc.doInterceptor('userAdminAccountAdmin'));
router.patch('/userinfoAuth', interceptorRouterFunc.doInterceptor('userAdminAccountAdmin'));
router.delete('/userDeletion', interceptorRouterFunc.doInterceptor('userAdminAccountAdmin'));
router.post('/userinfo', interceptorRouterFunc.doInterceptor('userAdminAccountAdmin'));
router.patch('/passwordReset', interceptorRouterFunc.doInterceptor('userAdminAccountAdmin'));
router.patch('/accountsActivation', interceptorRouterFunc.doInterceptor('userAdminAccountAdmin'));
router.get('/templateUserinfo', interceptorRouterFunc.doInterceptor('userAdminAccountAdmin'));
router.get('/excelUserinfoExport', interceptorRouterFunc.doInterceptor('userAdminAccountAdmin'));
router.post('/excelUserinfoImport', interceptorRouterFunc.doInterceptor('userAdminAccountAdmin'));
// 业务处理器
const handlerSearchInfo       = require('../services/userAdminAccountAdmin/handlerSearchInfo.js');
const handlerGetAccounts      = require('../services/userAdminAccountAdmin/handlerGetAccounts.js');
const handlerUpdateActivation = require('../services/userAdminAccountAdmin/handlerUpdateActivation.js');
const handlerUpdateUserBase   = require('../services/userAdminAccountAdmin/handlerUpdateUserBase.js');
const handlerUpdateUserAuth   = require('../services/userAdminAccountAdmin/handlerUpdateUserAuth.js');
const handlerDeleteUser       = require('../services/userAdminAccountAdmin/handlerDeleteUser.js');
const handlerCreateUser       = require('../services/userAdminAccountAdmin/handlerCreateUser.js');
const handlerResetPassword    = require('../services/userAdminAccountAdmin/handlerResetPassword.js');
const handlerActivateAccounts = require('../services/userAdminAccountAdmin/handlerActivateAccounts.js');
const handlerDownload         = require('../services/userAdminAccountAdmin/handlerDownload.js');
const handlerExportExcel      = require('../services/userAdminAccountAdmin/handlerExportExcel.js');
const handlerImportExcel      = require('../services/userAdminAccountAdmin/handlerImportExcel.js');

// POST 提交分页数和分页数据条数
router.post('/', (req, res, next) => {
    handlerSearchInfo.doHandler(req, res, next);
});

// GET 用户管理帐户管理数据
router.get('/', (req, res, next) => {
    handlerGetAccounts.doHandler(req, res, next);
});

// PATCH 修改激活状态
router.patch('/activation', (req, res, next) => {
    handlerUpdateActivation.doHandler(req, res, next);
});

// PATCH 用户基础信息修改
router.patch('/userinfoBase', (req, res, next) => {
    handlerUpdateUserBase.doHandler(req, res, next);
});

// PATCH 用户权限信息修改
router.patch('/userinfoAuth', (req, res, next) => {
    handlerUpdateUserAuth.doHandler(req, res, next);
});

// DELETE 用户删除
router.delete('/userDeletion', (req, res, next) => {
    handlerDeleteUser.doHandler(req, res, next);
});

// POST 新增用户
router.post('/userinfo', (req, res, next) => {
    handlerCreateUser.doHandler(req, res, next, req.body.newUser);
});

// PATCH 批量重置用户密码为123456
router.patch('/passwordReset', (req, res, next) => {
    handlerResetPassword.doHandler(req, res, next, req.body.arrUsername);
});

// PATCH 批量启用或批量禁用用户
router.patch('/accountsActivation', (req, res, next) => {
    handlerActivateAccounts.doHandler(req, res, next, req.body.arrUsername, req.body.activation);
});

// GET 下载用户信息模板
router.get('/templateUserinfo', (req, res, next) => {
    handlerDownload.doHandler(req, res, next, './static/templates/tmpUserAdminUserinfo.xlsx', '用户管理帐户信息.xlsx');
});

// GET 导出用户EXCEL
router.get('/excelUserinfoExport', (req, res, next) => {
    handlerExportExcel.doHandler(req, res, next);
});

// POST 导入用户EXCEL
let upload = multer({ dest: path.join(__dirname, '../../../../static/buffer') });
router.post('/excelUserinfoImport', upload.single('userAdminUserinfoImport'), (req, res, next) => {
    handlerImportExcel.doHandler(req, res, next);
});

module.exports = router;