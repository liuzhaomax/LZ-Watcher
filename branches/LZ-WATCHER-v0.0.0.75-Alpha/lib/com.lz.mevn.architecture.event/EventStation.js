/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-07-26 10:53:22
 * @version   v1.0.0
 * filename   EventStation.js
 * function   事件站
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const TreeNode = require('../com.lz.mevn.util.container/TreeNode.js');
const ArrayList = require('../com.lz.mevn.util.container/ArrayList.js');

com.lz.mevn.architecture.event.EventStation = com.lz.mevn.util.container.TreeNode.extend({

    // 类名
    NAME : 'com.lz.mevn.architecture.event.EventStation',

    /**
     * @method
     * 构造函数
     *
     * @return {}
     */
    init : function () {
        this._super();
        this.upperEventDispatchers = new com.lz.mevn.util.container.ArrayList();
        this.subscribedEventDispatchers = this.children;
        this.enablePublish = false;
    },

    /**
     * @method
     * 在上个节点注册
     *
     * @param  {Object} eventDispatcherObj 事件调度中心
     * @return {Object}                    调用者
     */
    subcribe : function (eventDispatcherObj) {
        eventDispatcherObj.subscribedEventStations.add(this);
        this.upperEventDispatchers.add(eventDispatcherObj);
        return this;
    },

    /**
     * @method
     * 事件发布
     *
     * @param  {Object} eventObj 事件对象
     * @return {Object}          调用者
     */
    release : function (eventObj) {
        if (!eventObj) return;
        if (!eventObj.event) return;

        if (this.enablePublish) {
            this.subscribedEventDispatchers.each(function (i, child) {
                child.broadcast(eventObj);
            });
        }
        return this;
    },

    /**
     * @method
     * 事件发布
     *
     * @param  {String}  event    事件
     * @param  {AnyType} oldValue 旧值
     * @param  {AnyType} newValue 新值
     * @return {Object}           调用者
     */
    publish : function (event, oldValue, newValue) {
        var eventObj = {};
        eventObj.event    = event;
        eventObj.source   = this;
        eventObj.newValue = newValue;
        eventObj.oldValue = oldValue;
        this.release(eventObj);
        return this;
    },

    // lztodo: 如何利用eventObj
    onEvent : function (eventMap, eventObj) {
        // 怎么把eventDispatcher里的eventMap里的event的callback传过来
        // eventObj里面的4个字段怎么办
        var callbackObj = eventMap.get(eventObj.event);
        callbackObj.callback();
        return this;
    },

    /**
     * @method
     * 事件监听处理
     *
     * @param  {Object}  eventMap 事件回调图
     * @param  {String}  event    事件
     * @param  {AnyType} oldValue 旧值
     * @param  {AnyType} newValue 新值
     * @param  {Object}  source   事件源
     * @return {Object}           调用者
     */
    onMessage : function (eventMap, event, oldValue, newValue, source) {
        var eventObj = {};
        eventObj.event    = event;
        eventObj.source   = source;
        eventObj.newValue = newValue;
        eventObj.oldValue = oldValue;
        this.onEvent(eventObj);
        return this;
    },

    /**
     * @method
     * 信息推送开启
     *
     * @return {}
     */
    onPublish : function () {
        this.enablePublish = true;
        return this;
    },

    /**
     * @method
     * 信息推送关闭
     *
     * @return {}
     */
    offPublish : function () {
        this.enablePublish = false;
        return this;
    }
});

module.exports = com.lz.mevn.architecture.event.EventStation;