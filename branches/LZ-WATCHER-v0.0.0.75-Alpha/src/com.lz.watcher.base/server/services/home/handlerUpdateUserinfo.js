/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 22:24:55
 * @version   v1.0.0
 * filename   handlerUpdateUserinfo.js
 * function   更新个人资料
 ***************************************************************************/

const ctx = require('../../../../context.js');
// 模型引入
const users = require('../../models/modelUser.js');

const handler = {
    doHandler (req, res, next) {
        this.updateUserinfo(req, res, next);
    },

    updateUserinfo (req, res, next) {
        for (let key in req.body) {
            ctx.userinfo[key] = req.body[key];
        }
        users.update({'username': ctx.userinfo.username}, {$set: ctx.userinfo}, function (err) {
            if (err) console.log(err);
        });
        res.json({"process": "success"});
    }
}

module.exports = handler;