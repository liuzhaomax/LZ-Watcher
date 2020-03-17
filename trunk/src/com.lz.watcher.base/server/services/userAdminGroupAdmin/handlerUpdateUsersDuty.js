/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 20:46:26
 * @version   v1.0.0
 * filename   handlerUpdateUsersDuty.js
 * function   更新所有用户的职位
 ***************************************************************************/

const Utils = require('../../../../../lib/com.lz.mevn.util.utils/Utils.js');
const utils = new Utils();
// 模型引入
const users = require('../../models/modelUser.js');
const user_data_authorities = require('../../models/modelAuthorityData.js');

const handler = {
    doHandler (req, res, next) {
        this.updateUsersDuty(req, res, next);
    },

    updateUsersDuty (req, res, next) {
        users.find().populate({path: 'authorityData', select: {authorityData: 1}}).exec((err, doc) => {
            utils.traverseTree(doc, 'children', (el) => {
                for (var i = 0; i < el['_doc'].authorityData.authorityData.duty.length; i++) {
                    if (el['_doc'].authorityData.authorityData.duty[i] === req.body.oldTitle) {
                        el['_doc'].authorityData.authorityData.duty[i] = req.body.newTitle;
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