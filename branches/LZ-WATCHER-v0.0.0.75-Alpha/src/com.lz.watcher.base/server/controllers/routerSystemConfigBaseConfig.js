/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-30 02:17:30
 * @version   v1.0.0
 * filename   routerSystemConfigBaseConfig.js
 * function   系统设置的基础设置路由
 ***************************************************************************/

const express = require('express');
const router  = express.Router();
// 方法拦截器
const InterceptorRouterFunc = require('../interceptors/InterceptorRouterFunc.js');
const interceptorRouterFunc = new InterceptorRouterFunc();
router.get('/', interceptorRouterFunc.doInterceptor('systemConfigBaseConfig'));
router.patch('/systemTitle', interceptorRouterFunc.doInterceptor('systemConfigBaseConfig'));
router.patch('/passwordDefault', interceptorRouterFunc.doInterceptor('systemConfigBaseConfig'));
// 业务处理器
const handlerGetBaseConfig         = require('../services/systemConfigBaseConfig/handlerGetBaseConfig.js');
const handlerUpdateSystemTitle     = require('../services/systemConfigBaseConfig/handlerUpdateSystemTitle.js');
const handlerUpdatePasswordDefault = require('../services/systemConfigBaseConfig/handlerUpdatePasswordDefault.js');

// GET 系统设置的基础设置数据
router.get('/', (req, res, next) => {
    handlerGetBaseConfig.doHandler(req, res, next);
});

// PATCH 修改系统名称
router.patch('/systemTitle', (req, res, next) => {
    handlerUpdateSystemTitle.doHandler(req, res, next);
});

// PATCH 修改默认密码
router.patch('/passwordDefault', (req, res, next) => {
    handlerUpdatePasswordDefault.doHandler(req, res, next);
});

module.exports = router;