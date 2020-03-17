/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-31 13:47:59
 * @version   v1.0.0
 * filename   routerSystemAdminRouteMonitor.js
 * function   系统管理路径监控路由
 ***************************************************************************/

const express = require('express');
const router  = express.Router();
// 方法拦截器
const InterceptorRouterFunc = require('../interceptors/InterceptorRouterFunc.js');
const interceptorRouterFunc = new InterceptorRouterFunc();
router.post('/', interceptorRouterFunc.doInterceptor('systemAdminRouteMonitor'));
router.get('/', interceptorRouterFunc.doInterceptor('systemAdminRouteMonitor'));
// 业务处理器
const handlerPostDisplayInfo = require('../services/systemAdminRouteMonitor/handlerPostDisplayInfo.js');
const handlerGetRouteMonitor = require('../services/systemAdminRouteMonitor/handlerGetRouteMonitor.js');

// POST 提交分页数和分页数据条数
router.post('/', (req, res, next) => {
    handlerPostDisplayInfo.doHandler(req, res, next);
});

// GET 系统设置的路径监控数据
router.get('/', (req, res, next) => {
    handlerGetRouteMonitor.doHandler(req, res, next);
});

module.exports = router;