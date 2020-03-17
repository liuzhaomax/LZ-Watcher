/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-29 18:41:20
 * @version   v1.0.0
 * filename   childrenSystemConfig.js
 * function   系统设置子路由
 ***************************************************************************/

import EntrancePanelApp from '../../components/titleBar/EntrancePanelApp.vue';
import SystemConfig from '../../components/systemConfig/SystemConfig.vue';
import SystemConfigSider from '../../components/systemConfig/SystemConfigSider.vue';
import SystemConfigBaseConfig from '../../components/systemConfig/SystemConfigBaseConfig.vue';
import SystemConfigMonitorConfig from '../../components/systemConfig/SystemConfigMonitorConfig.vue';

const childrenRouterArray = [
    {
        path: '/home/systemConfig/baseConfig',
        name: 'SystemConfigBaseConfig',
        components: {
            home: EntrancePanelApp,
            systemConfig: SystemConfig,
            systemConfigSider: SystemConfigSider,
            systemConfigBaseConfig: SystemConfigBaseConfig
        }
    }, {
        path: '/home/systemConfig/monitorConfig',
        name: 'SystemConfigMonitorConfig',
        components: {
            home: EntrancePanelApp,
            systemConfig: SystemConfig,
            systemConfigSider: SystemConfigSider,
            systemConfigMonitorConfig: SystemConfigMonitorConfig
        }
    }
];

export default childrenRouterArray;
