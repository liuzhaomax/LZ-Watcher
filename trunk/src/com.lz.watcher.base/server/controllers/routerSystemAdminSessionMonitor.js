/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-31 13:48:28
 * @version   v1.0.0
 * filename   routerSystemAdminSessionMonitor.js
 * function   系统管理会话监控
 ***************************************************************************/

const express = require('express');
const router  = express.Router();
// 方法拦截器
const InterceptorRouterFunc = require('../interceptors/InterceptorRouterFunc.js');
const interceptorRouterFunc = new InterceptorRouterFunc();
router.post('/', interceptorRouterFunc.doInterceptor('systemAdminSessionMonitor'));
router.get('/', interceptorRouterFunc.doInterceptor('systemAdminSessionMonitor'));
// 业务处理器
const handlerPostDisplayInfo   = require('../services/systemAdminSessionMonitor/handlerPostDisplayInfo.js');
const handlerGetSessionMonitor = require('../services/systemAdminSessionMonitor/handlerGetSessionMonitor.js');

// POST 提交分页数和分页数据条数和搜索值
router.post('/', (req, res, next) => {
    handlerPostDisplayInfo.doHandler(req, res, next);
});

// GET 系统设置的会话监控数据
router.get('/', (req, res, next) => {
    handlerGetSessionMonitor.doHandler(req, res, next);
});

module.exports = router;