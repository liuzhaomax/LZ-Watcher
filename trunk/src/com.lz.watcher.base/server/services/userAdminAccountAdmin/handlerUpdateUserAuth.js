/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-28 22:45:18
 * @version   v1.0.0
 * filename   handlerUpdateUserAuth.js
 * function   更新用户权限信息
 ***************************************************************************/

const ctx   = require('../../../../context.js');
const Utils = require('../../../../../lib/com.lz.mevn.util.utils/Utils.js');
const utils = new Utils();
// 模型引入
const users = require('../../models/modelUser.js');
const roles = require('../../models/modelRole.js');
const user_func_authorities = require('../../models/modelAuthorityFunc.js');
const user_data_authorities = require('../../models/modelAuthorityData.js');

const handler = {
    doHandler (req, res, next) {
        this.updateUserAuth(req, res, next);
    },

    updateUserAuth (req, res, next) {
        // 中英转换
        for (let i = 0; i < req.body.authorityFunc.length; i++) {
            utils.traverseTree(req.body.authorityFunc, 'children', (el) => {
                for (let key in ctx.authority) {
                    if (el.title === ctx.authority[key]) {
                        el.title = key;
                        break;
                    }
                }
            });
        }
        users.find({'username': req.body.username})
            .populate({path: 'role', select: {role: 1}})
            .populate({path: 'authorityFunc', select: {authorityFunc: 1}})
            .populate({path: 'authorityData', select: {authorityData: 1}})
            .exec((err, doc) => {
            // 功能权限修改
            doc[0]['_doc'].authorityFunc.authorityFunc[0].children = req.body.authorityFunc;
            user_func_authorities.update({'_id': doc[0]['_doc'].authorityFunc._id}, {$set:
                {
                    'authorityFunc': doc[0]['_doc'].authorityFunc.authorityFunc
                }
            }, (err, doc) => { if (err) console.log(err); });
            // 分组数据权限修改
            user_data_authorities.update({'_id': doc[0]['_doc'].authorityData._id}, {$set:
                {
                    authorityData: req.body.authorityData
                }
            }, (err, doc) => { if (err) console.log(err); });
            // 角色修改
            roles.update({'_id': doc[0]['_doc'].role._id}, {$set:
                {
                    role: req.body.role
                }
            }, (err, doc) => { if (err) console.log(err); });
        });
        res.json({"process": "success"});
    }
}

module.exports = handler;