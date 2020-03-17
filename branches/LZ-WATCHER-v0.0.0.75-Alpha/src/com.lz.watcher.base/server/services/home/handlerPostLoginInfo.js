/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 22:11:17
 * @version   v1.0.0
 * filename   handlerPostLoginInfo.js
 * function   提交登录信息
 ***************************************************************************/

const ctx     = require('../../../../context.js');
const utility = require('utility');
const Utils   = require('../../../../../lib/com.lz.mevn.util.utils/Utils.js');
const utils   = new Utils();
// 模型引入
const users = require('../../models/modelUser.js');

const handler = {
    doHandler (req, res, next, usernameReq, passwordReq) {
        this.postLoginInfo(req, res, next, usernameReq, passwordReq);
    },

    postLoginInfo (req, res, next, usernameReq, passwordReq) {
        // RSA解密 md5加密
        let passwordDecoded = ctx.get('rsa').decrypt(passwordReq).toString();
        let passwordMd5 = utility.md5(passwordDecoded);
        let usernameMd5 = utility.md5(usernameReq);
        // 登录校验  session
        users.find({'username': usernameReq, 'password': passwordMd5})
            .populate({path: 'role', select: {role: 1}})
            .populate({path: 'authorityFunc', select: {authorityFunc: 1}})
            .populate({path: 'authorityData', select: {authorityData: 1}})
            .exec((err, doc) => {
            if (!!doc.length) {
                let date = new Date();
                req.session.userinfo = utility.md5(usernameMd5 + utils.formatDateTime(date), 'base64').slice(0, -2).toUpperCase();
                res.cookie('SESSIONID', req.session.userinfo, {maxAge: 1000 * 60 * 60 * 24 * 1});
                ctx.session.id = req.session.userinfo;
                ctx.session.createTime = utils.formatDateTime(date);
                ctx.session.destroyTime = 'Online';
                ctx.session.maxSimul++;
                for (let key in ctx.userinfo) {
                    if (key === 'role' || key === 'authorityFunc' || key === 'authorityData') {
                        ctx.userinfo[key] = doc[0]['_doc'][key][key];
                    } else {
                        ctx.userinfo[key] = doc[0]['_doc'][key];
                    }
                }
                if (ctx.userinfo.activation) {
                    res.json({"permission": true});
                } else {
                    res.json({"permission": false});
                }
            } else {
                res.json({"permission": false});
            }
        });
    }
}

module.exports = handler;