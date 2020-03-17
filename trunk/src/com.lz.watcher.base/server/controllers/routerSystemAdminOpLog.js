/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-31 13:47:11
 * @version   v1.0.0
 * filename   routerSystemAdminOpLog.js
 * function   系统管理操作日志路由
 ***************************************************************************/

const express = require('express');
const router  = express.Router();
// 方法拦截器
const InterceptorRouterFunc = require('../interceptors/InterceptorRouterFunc.js');
const interceptorRouterFunc = new InterceptorRouterFunc();
router.post('/', interceptorRouterFunc.doInterceptor('systemAdminOpLog'));
router.get('/', interceptorRouterFunc.doInterceptor('systemAdminOpLog'));
// 业务处理器
const handlerPostDisplayInfo = require('../services/systemAdminOpLog/handlerPostDisplayInfo.js');
const handlerGetOpLog        = require('../services/systemAdminOpLog/handlerGetOpLog.js');

// POST 提交分页数和分页数据条数
router.post('/', (req, res, next) => {
    handlerPostDisplayInfo.doHandler(req, res, next);
});

// GET 系统设置的操作日志数据
router.get('/', (req, res, next) => {
    handlerGetOpLog.doHandler(req, res, next);
});

module.exports = router;