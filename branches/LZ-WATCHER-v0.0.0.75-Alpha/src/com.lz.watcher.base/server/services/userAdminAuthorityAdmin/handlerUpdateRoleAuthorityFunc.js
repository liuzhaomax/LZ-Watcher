/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 19:39:38
 * @version   v1.0.0
 * filename   handlerUpdateRoleAuthorityFunc.js
 * function   更新角色功能权限
 ***************************************************************************/

const ctx   = require('../../../../context.js');
const Utils = require('../../../../../lib/com.lz.mevn.util.utils/Utils.js');
const utils = new Utils();
// 模型引入
const role_func_authorities = require('../../models/modelRoleAuthority.js');

const handler = {
    doHandler (req, res, next) {
        this.updateRoleAuthorityFunc(req, res, next);
    },

    updateRoleAuthorityFunc (req, res, next) {
        // 中英转换
        for (let i = 0; i < req.body.authority.authority.length; i++) {
            utils.traverseTree(req.body.authority.authority, 'children', (el) => {
                for (let key in ctx.authority) {
                    if (el.title === ctx.authority[key]) {
                        el.title = key;
                        break;
                    }
                }
            });
        }
        role_func_authorities.find({"role": req.body.authority.role}).exec((err, doc) => {
            doc[0]['_doc'].authorityFunc[0].children = req.body.authority.authority;
            let result = doc[0]['_doc'];
            role_func_authorities.update({"role": req.body.authority.role}, {$set: result}, function (err) {
                if (err) console.log(err);
            });
        });
        res.json({"process": "success"});
    }
}

module.exports = handler;