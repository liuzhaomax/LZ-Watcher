/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-28 22:42:11
 * @version   v1.0.0
 * filename   handlerUpdateUserBase.js
 * function   更新用户基础信息
 ***************************************************************************/

// 模型引入
const users = require('../../models/modelUser.js');

const handler = {
    doHandler (req, res, next) {
        this.updateUserBase(req, res, next);
    },

    updateUserBase (req, res, next) {
        users.update({'username': req.body.username}, {$set:
            {
                'dateOfBirth' : req.body.dateOfBirth,
                'realname'    : req.body.realname,
                'gender'      : req.body.gender,
                'workId'      : req.body.workId,
                'phone'       : req.body.phone,
                'wechat'      : req.body.wechat,
                'email'       : req.body.email,
                'address'     : req.body.address
            }
        }, (err, doc) => {
            if (err) console.log(err);
        });
        res.json({"process": "success"});
    }
}

module.exports = handler;