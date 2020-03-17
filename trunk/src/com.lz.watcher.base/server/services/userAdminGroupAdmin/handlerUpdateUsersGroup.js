/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 20:27:00
 * @version   v1.0.0
 * filename   handlerUpdateUsersGroup.js
 * function   更新所有用户的分组
 ***************************************************************************/

const Utils = require('../../../../../lib/com.lz.mevn.util.utils/Utils.js');
const utils = new Utils();
// 模型引入
const users = require('../../models/modelUser.js');
const user_data_authorities = require('../../models/modelAuthorityData.js');

const handler = {
    doHandler (req, res, next) {
        this.updateUsersGroup(req, res, next);
    },

    updateUsersGroup (req, res, next) {
        users.find().populate({path: 'authorityData', select: {authorityData: 1}}).exec((err, doc) => {
            utils.traverseTree(doc, 'children', (el) => {
                for (var i = 0; i < el['_doc'].authorityData.authorityData.group.length; i++) {
                    if (el['_doc'].authorityData.authorityData.group[i] === req.body.oldTitle) {
                        el['_doc'].authorityData.authorityData.group[i] = req.body.newTitle;
                        let id_AuthorityData = el['_doc'].authorityData['_id'];
                        user_data_authorities.update({"_id": id_AuthorityData}, {$set:
                            {
                                'authorityData': el['_doc'].authorityData.authorityData
                            }
                        }, (err) => { if (err) console.log(err); });
                    }
                }
            });
        });
        res.json({"process": "success"});
    }
}

module.exports = handler;