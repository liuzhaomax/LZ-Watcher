/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-09-21 17:45:11
 * @version   v1.0.0
 * filename   routerIndex.js
 * function   模块首页路由
 ***************************************************************************/

const express = require('express');
const router  = express.Router();
// 业务处理器
const handlerGetLoginStatus    = require('../services/index/handlerGetLoginStatus.js');
const handlerDeleteLoginStatus = require('../services/index/handlerDeleteLoginStatus.js');
const handlerGetSystemTitle    = require('../services/index/handlerGetSystemTitle.js');

// GET index页面
router.get('/', (req, res, next) => {
    res.render('index');
});

// GET 登录状态
router.get('/loginStatus', (req, res, next) => {
    handlerGetLoginStatus.doHandler(req, res, next);
});

// DELETE 删除session
router.delete('/loginStatus', (req, res, next) => {
    handlerDeleteLoginStatus.doHandler(req, res, next);
});

// GET 系统名称
router.get('/systemTitle', (req, res, next) => {
    handlerGetSystemTitle.doHandler(req, res, next);
});

module.exports = router;