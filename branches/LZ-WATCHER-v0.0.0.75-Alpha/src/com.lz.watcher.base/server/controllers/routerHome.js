/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-10-16 18:41:10
 * @version   v1.0.0
 * filename   routerHome.js
 * function   登录首页
 ***************************************************************************/

const express = require('express');
const router  = express.Router();
// 过滤器引入
const FilterUsername = require('../filters/FilterUsername.js');
const FilterPassword = require('../filters/FilterPassword.js');
// 业务处理器
const handlerPostLoginInfo  = require('../services/home/handlerPostLoginInfo.js');
const handlerGetRealName    = require('../services/home/handlerGetRealName.js');
const handlerGetUserinfo    = require('../services/home/handlerGetUserinfo.js');
const handlerUpdateUserinfo = require('../services/home/handlerUpdateUserinfo.js');
const handlerUpdatePassword = require('../services/home/handlerUpdatePassword.js');

// POST 登录首页-提交帐号密码
router.post('/', (req, res, next) => {
    // 过滤：username去除所有空格
    let filterUsername = new FilterUsername(req.body.username);
    let usernameReq = filterUsername.doFilter({sanitisation: {offAllSpaces: true}}).username;
    // 过滤：password去除所有空格
    let filterPassword = new FilterPassword(req.body.password);
    let passwordReq = filterPassword.doFilter({sanitisation: {offAllSpaces: true}}).password;
    // 业务逻辑
    handlerPostLoginInfo.doHandler(req, res, next, usernameReq, passwordReq);
});

// GET 真实姓名
router.get('/realname', (req, res, next) => {
    handlerGetRealName.doHandler(req, res, next);
});

// GET 个人资料
router.get('/userinfo', (req, res, next) => {
    handlerGetUserinfo.doHandler(req, res, next);
});

// PATCH 修改部分个人资料
router.patch('/userinfo', (req, res, next) => {
    handlerUpdateUserinfo.doHandler(req, res, next);
});

// PATCH 修改个人密码
router.patch('/password', (req, res, next) => {
    // 过滤：password去除所有空格
    let filterPassword = new FilterPassword(req.body.password);
    let passwordReq = filterPassword.doFilter({sanitisation: {offAllSpaces: true}}).password;
    // 业务逻辑
    handlerUpdatePassword.doHandler(req, res, next, passwordReq);
});

module.exports = router;