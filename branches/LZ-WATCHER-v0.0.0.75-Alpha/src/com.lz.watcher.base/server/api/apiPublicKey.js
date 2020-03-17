/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-15 00:07:40
 * @version   v1.0.0
 * filename   apiPublicKey
 * function   RSA公钥API
 ***************************************************************************/

const express = require('express');
const router  = express.Router();
const ctx     = require('../../../context.js');
const NodeRSA = require('node-rsa');

const rsa = new NodeRSA({b: 512});
rsa.setOptions({encryptionScheme: 'pkcs1'});
ctx.set('rsa', rsa);

// GET RSA公钥
router.get('/', (req, res, next) => {
    let publicKey = rsa.exportKey('public');
    res.send(publicKey);
});

module.exports = router;