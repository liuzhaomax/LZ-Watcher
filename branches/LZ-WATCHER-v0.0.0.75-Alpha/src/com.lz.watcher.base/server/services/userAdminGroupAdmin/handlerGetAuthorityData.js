/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 20:22:00
 * @version   v1.0.0
 * filename   handlerGetAuthorityData.js
 * function   获取数据权限
 ***************************************************************************/

const ctx = require('../../../../context.js');
// 模型引入
const group_data_authorities = require('../../models/modelGroupAuthority.js');

const handler = {
    doHandler (req, res, next) {
        this.getAuthorityData(req, res, next);
    },

    getAuthorityData (req, res, next) {
        group_data_authorities.find().exec((err, doc) => {
            ctx.userAdminGroupAdmin = doc[0]['_doc'].authorityData;
            res.json({"userAdminGroupAdmin": ctx.userAdminGroupAdmin});
        });
    }
}

module.exports = handler;