/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-30 02:51:55
 * @version   v1.0.0
 * filename   routerSystemConfigMonitorConfig.js
 * function   系统设置的监控设置路由
 ***************************************************************************/

const express = require('express');
const router  = express.Router();
// 方法拦截器
const InterceptorRouterFunc = require('../interceptors/InterceptorRouterFunc.js');
const interceptorRouterFunc = new InterceptorRouterFunc();
router.get('/', interceptorRouterFunc.doInterceptor('systemConfigMonitorConfig'));
router.patch('/alarmSoundStatus', interceptorRouterFunc.doInterceptor('systemConfigMonitorConfig'));
// 业务处理器
const handlerGetMonitorConfig       = require('../services/systemConfigMonitorConfig/handlerGetMonitorConfig.js');
const handlerUpdateAlarmSoundStatus = require('../services/systemConfigMonitorConfig/handlerUpdateAlarmSoundStatus.js');

// GET 系统设置的监控设置数据
router.get('/', (req, res, next) => {
    handlerGetMonitorConfig.doHandler(req, res, next);
});

// PATCH 修改警报铃声
router.patch('/alarmSoundStatus', (req, res, next) => {
    handlerUpdateAlarmSoundStatus.doHandler(req, res, next);
});

module.exports = router;