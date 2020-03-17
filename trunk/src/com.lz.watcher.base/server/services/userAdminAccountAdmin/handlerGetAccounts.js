/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-28 22:29:12
 * @version   v1.0.0
 * filename   handlerGetAccounts.js
 * function   获取用户
 ***************************************************************************/

const ctx   = require('../../../../context.js');
const Utils = require('../../../../../lib/com.lz.mevn.util.utils/Utils.js');
const utils = new Utils();
// 模型引入
const users = require('../../models/modelUser.js');

const handler = {
    doHandler (req, res, next) {
        this.getAccounts(req, res, next);
    },

    getAccounts (req, res, next) {
        users.find()
            .populate({path: 'role', select: {role: 1}})
            .populate({path: 'authorityFunc', select: {authorityFunc: 1}})
            .populate({path: 'authorityData', select: {authorityData: 1}})
            .sort({'_id': -1})
            .exec((err, doc) => {
            let searchObjKey = ctx.userAdminAccountAdminSearchItem;
            let searchObjVal = ctx.userAdminAccountAdminSearchVal;
            let result = [];
            for (let i = 0; i < doc.length; i++) {
                delete doc[i]['_doc'].password;
                delete doc[i]['_doc']._id;
                doc[i]['_doc'].role = doc[i]['_doc'].role.role;
                doc[i]['_doc'].group = doc[i]['_doc'].authorityData.authorityData.group.slice(1);
                doc[i]['_doc'].duty = doc[i]['_doc'].authorityData.authorityData.duty;
                doc[i]['_doc'].jobLevel = doc[i]['_doc'].authorityData.authorityData.jobLevel;
                doc[i]['_doc'].authorityFunc = doc[i]['_doc'].authorityFunc.authorityFunc;
                doc[i]['_doc'].authorityData = doc[i]['_doc'].authorityData.authorityData;
                if (!!searchObjKey && !!searchObjVal) {
                    if (searchObjKey === 'group') {
                        for (let j = 0; j < doc[i]['_doc'][searchObjKey].length; j++) {
                            if (doc[i]['_doc'][searchObjKey][j] === searchObjVal) {
                                result.push(doc[i]['_doc']);
                            }
                        }
                    } else if (searchObjKey === 'duty') {
                        for (let j = 0; j < doc[i]['_doc'][searchObjKey].length; j++) {
                            if (doc[i]['_doc'][searchObjKey][j] === searchObjVal) {
                                result.push(doc[i]['_doc']);
                            }
                        }
                    } else if (searchObjKey === 'jobLevel') {
                        if (doc[i]['_doc'][searchObjKey][0] === searchObjVal) {
                            result.push(doc[i]['_doc']);
                        }
                    } else {
                        if (doc[i]['_doc'][searchObjKey] === searchObjVal) {
                            result.push(doc[i]['_doc']);
                        }
                    }
                } else {
                    result.push(doc[i]['_doc']);
                }
                // 中英转换
                for (let i = 0; i < doc[i].authorityFunc.length; i++) {
                    utils.traverseTree(doc[i].authorityFunc, 'children', (el) => {
                        for (let key in ctx.authority) {
                            if (el.title === key) {
                                el.title = ctx.authority[key];
                                break;
                            }
                        }
                    });
                }
            }
            // 隐藏超级管理员
            for (var i = 0; i < result.length; i++) {
                if (result[i].username === 'admin') {
                    let index = result.indexOf(result[i]);
                    result.splice(index, 1);
                }
            }
            ctx.userAdminAccountAdmin = result;
            res.json({"userAdminAccountAdmin": ctx.userAdminAccountAdmin});
        });
    }
}

module.exports = handler;