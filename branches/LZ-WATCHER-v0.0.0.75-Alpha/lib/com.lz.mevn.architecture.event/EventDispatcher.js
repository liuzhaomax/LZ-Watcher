/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-08-07 20:03:46
 * @version   v1.0.0
 * filename   EventDispatcher.js
 * function   事件调度中心
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const TreeNode = require('../com.lz.mevn.architecture.aop/Aspect.js');
const MultiValueMap = require('../com.lz.mevn.util.container/MultiValueMap.js');

com.lz.mevn.architecture.event.EventDispatcher = com.lz.mevn.util.container.TreeNode.extend({

    // 类名
    NAME : 'com.lz.mevn.architecture.event.EventDispatcher',

    /**
     * @method
     * 构造函数
     *
     * @return {}
     */
    init : function () {
        this._super();
        this.subscribedEventStations = this.children;
        this.eventMap = new com.lz.mevn.util.container.MultiValueMap();
    },

    /**
     * @method
     * 在上个节点注册
     *
     * @param  {Object} eventStationObj 事件站对象
     * @return {Object}                 调用者
     */
    subscribe : function (eventStationObj) {
        eventStationObj.subscribedEventDispatchers.add(this);
        return this;
    },

    /**
     * @method
     * 注册事件及其所在对象与回调函数
     *
     * @param  {String}   event    事件
     * @param  {Function} callback 回调函数
     * @param  {Object}   instance 事件所在对象
     * @return {Object}            调用者
     */
    eventRegister : function (event, callback, instance) {
        this.eventMap.set(event, {callback: callback, instance: instance});
        return this;
    },

    /**
     * @method
     * 注销事件及其所在对象与回调函数
     *
     * @param  {String}   event    事件
     * @param  {Function} callback 回调函数
     * @param  {Object}   instance 事件所在对象
     * @return {Object}            调用者
     */
    eventUnregister : function (event, callback, instance) {
        var listeners = this.eventMap.get(event);
        var listener  = null;
        if (listeners) {
            listeners.each(function (i, ele) {
                var _callback = ele.callback;
                var _instance = ele.instance;
                if ((callback === _callback) && (instance === _instance)) {
                    listener = ele;
                    return false;
                }
            });
        }

        if (listener) {
            this.eventMap.removeValue(event, listener);
        }
        return this;
    },

    /**
     * @method
     * 事件广播
     *
     * @param  {Object} eventObj 事件对象
     * @return {Object}          调用者
     */
    broadcast : function (eventObj) {
        if (!eventObj) return;
        if (!eventObj.event) return;

        var listeners = this.eventMap.get(eventObj.event);

        if(listeners){
            listeners.each(function (i, ele) {
                var callback = ele.callback;
                var instance = ele.instance;

                if (!callback) {
                    return;
                } else if (callback && instance) {
                    callback.call(instance, eventObj);
                } else {
                    callback.call(null, eventObj);
                }
            });
        }

        this.subscribedEventStations.each(function (i, observer) {
            if (typeof observer.onEvent === "function") {
                observer.onEvent(this.eventMap, eventObj);
            }
        });
        return this;
    },

    /**
     * @method
     * 事件广播
     *
     * @param  {String}  event    事件
     * @param  {AnyType} oldValue 旧值
     * @param  {AnyType} newValue 新值
     * @param  {Object}  source   源对象
     * @return {Object}           调用者
     */
    fire : function (event, oldValue, newValue, source) {
        var eventObj = {};
        eventObj.event    = event;
        eventObj.source   = source;
        eventObj.newValue = newValue;
        eventObj.oldValue = oldValue;
        this.broadcast(eventObj);
        return this;
    },

    /**
     * @method
     * 绑定监听eventStation
     *
     * @param  {Object} eventStation 监听对象
     * @return {Object}              调用者
     */
    bindEventStation : function (eventStation) {
        if (typeof eventStation.onEvent === "function") {
            this.subscribedEventStations.add(eventStation);
        } else {
            throw "对象必须实现onEvent函数";
        }
        return this;
    },

    /**
     * @method
     * 解绑监听eventStation
     *
     * @param  {Object} eventStation 监听对象
     * @return {Object}              调用者
     */
    unbindEventStation : function (eventStation) {
        this.subscribedEventStations.remove(eventStation);
        return this;
    }
});

module.exports = com.lz.mevn.architecture.event.EventDispatcher;