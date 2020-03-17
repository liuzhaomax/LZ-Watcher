/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 19:12:37
 * @version   v1.0.0
 * filename   handlerGetRoleAuthorityFunc.js
 * function   获取角色功能权限
 ***************************************************************************/

const ctx   = require('../../../../context.js');
const Utils = require('../../../../../lib/com.lz.mevn.util.utils/Utils.js');
const utils = new Utils();
// 模型引入
const role_func_authorities = require('../../models/modelRoleAuthority.js');

const handler = {
    doHandler (req, res, next) {
        this.getRoleAuthorityFunc(req, res, next);
    },

    getRoleAuthorityFunc (req, res, next) {
        role_func_authorities.find().exec((err, doc) => {
            let roleAuthArray = [];
            let roleAuthElement = {};
            for (let i = 1; i < doc.length; i++) {
                for (let key in doc[i]['_doc']) {
                    if (key !== '_id') {
                        roleAuthElement[key] = doc[i]['_doc'][key];
                    }
                }
                roleAuthArray.push(roleAuthElement);
                roleAuthElement = {};
            }
            // 中英转换
            for (let i = 0; i < roleAuthArray.length; i++) {
                utils.traverseTree(roleAuthArray[i].authorityFunc, 'children', (el) => {
                    for (let key in ctx.authority) {
                        if (el.title === key) {
                            el.title = ctx.authority[key];
                            break;
                        }
                    }
                });
            }
            ctx.userAdminAuthorityAdmin = roleAuthArray;
            res.json({"userAdminAuthorityAdmin": ctx.userAdminAuthorityAdmin});
        });
    }
}

module.exports = handler;