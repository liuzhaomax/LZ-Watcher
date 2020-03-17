/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 22:26:25
 * @version   v1.0.0
 * filename   handlerUpdatePassword.js
 * function   更新个人密码
 ***************************************************************************/

const ctx = require('../../../../context.js');
// 模型引入
const users = require('../../models/modelUser.js');

const handler = {
    doHandler (req, res, next, passwordReq) {
        this.updatePassword(req, res, next);
    },

    updatePassword (req, res, next, passwordReq) {
        // RSA解密 md5加密
        let passwordDecoded = ctx.get('rsa').decrypt(passwordReq).toString();
        let passwordMd5 = utility.md5(passwordDecoded);
        ctx.userinfo.password = passwordMd5;
        users.update({'username': ctx.userinfo.username}, {$set: ctx.userinfo}, function (err) {
            if (err) console.log(err);
        });
        res.json({"process": "success"});
    }
}

module.exports = handler;