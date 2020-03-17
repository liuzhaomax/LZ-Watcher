/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-03 20:08:47
 * @version   v1.0.0
 * filename   childrenDrawingMaking.js
 * function   制图模块子路由
 ***************************************************************************/

import EntrancePanelApp from '../../../../com.lz.watcher.base/client/components/titleBar/EntrancePanelApp.vue';
import DrawingMaking from '../../components/drawingMaking/DrawingMaking.vue';
import DrawingMakingIndex from '../../components/drawingMaking/DrawingMakingIndex.vue';

const childrenRouterArray = [
    {
        path: '/home/drawingMaking/drawingMakingIndex',
        name: 'DrawingMakingIndex',
        components: {
            home: EntrancePanelApp,
            drawingMaking: DrawingMaking,
            drawingMakingIndex: DrawingMakingIndex
        }
    }
];

export default childrenRouterArray;