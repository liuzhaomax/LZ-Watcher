/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-07 16:41:11
 * @version   v1.0.0
 * filename   index.js
 * function   MEVN索引
 ***************************************************************************/

const com = require('./com.lz.mevn.namespace/Namespace.js');
// 插件
// const draw2d = require('./com.lz.mevn.draw2d/index.js');
// com.lz.mevn.draw2d = draw2d; // 前端用，非通用，全局变量是window的问题
module.exports = com;

// 基础
require('./com.lz.mevn.base.core/Object.js');
// 架构
require('./com.lz.mevn.architecture.aop/Aspect.js');
require('./com.lz.mevn.architecture.event/EventDispatcher.js');
require('./com.lz.mevn.architecture.event/EventStation.js');
// 模块
require('./com.lz.mevn.module.filter/FilterBase.js');
require('./com.lz.mevn.module.filter/FilterCheck.js');
require('./com.lz.mevn.module.filter/FilterSanitisation.js');
require('./com.lz.mevn.module.filter/FilterTransformation.js');
// 杂物
require('./com.lz.mevn.util.utils/Utils.js');
require('./com.lz.mevn.util.container/Collection.js');
require('./com.lz.mevn.util.container/List.js');
require('./com.lz.mevn.util.container/ArrayList.js');
require('./com.lz.mevn.util.container/LinkedListNode.js');
require('./com.lz.mevn.util.container/SingleLinkedList.js');
require('./com.lz.mevn.util.container/DoubleLinkedList.js');
require('./com.lz.mevn.util.container/CircularLinkedList.js');
require('./com.lz.mevn.util.container/TreeNode.js');
require('./com.lz.mevn.util.container/BinaryTreeNode.js');
require('./com.lz.mevn.util.container/BinaryTree.js');
require('./com.lz.mevn.util.container/BinarySearchTree.js');
require('./com.lz.mevn.util.container/Pair.js');
require('./com.lz.mevn.util.container/Map.js');
require('./com.lz.mevn.util.container/MultiValueMap.js');
require('./com.lz.mevn.util.container/Queue.js');
require('./com.lz.mevn.util.container/Deque.js');
require('./com.lz.mevn.util.container/Stack.js');
require('./com.lz.mevn.util.container/Set.js');