<template>
    <div class="systemConfigSider">
        <Sider class="systemConfigSider">
            <Menu class="menu" :active-name="activeNameSystemConfig" theme="light" width="auto">
                <MenuItem name="SystemConfigBaseConfig" to="/home/systemConfig/baseConfig" @click.native="showViewSystemConfigBaseConfig()">
                    <Icon type="ios-construct" />
                    <span>基本设置</span>
                </MenuItem>
                <MenuItem name="SystemConfigMonitorConfig" to="/home/systemConfig/monitorConfig" @click.native="showViewSystemConfigMonitorConfig()">
                    <Icon type="md-desktop" />
                    <span>监控设置</span>
                </MenuItem>
            </Menu>
        </Sider>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'SystemConfigSider',
    components: {},
    data () {
        return {

        }
    },
    computed: {
        activeNameSystemConfig () {
            return this.$store.getters.getActiveNameSystemConfig;
        },
        viewSystemConfigBaseConfig () {
            return this.$store.getters.getViewSystemConfigBaseConfig;
        },
        viewSystemConfigMonitorConfig () {
            return this.$store.getters.getViewSystemConfigMonitorConfig;
        }
    },
    mounted () {
        this.init();
    },
    methods: {
        /**
         * @method
         * 初始化组件
         *
         * @return {}
         */
        init () {
            if (this.viewSystemConfigBaseConfig) {
                this.$store.dispatch('setActiveNameSystemConfigVal', 'SystemConfigBaseConfig');
            }
            if (this.viewSystemConfigMonitorConfig) {
                this.$store.dispatch('setActiveNameSystemConfigVal', 'SystemConfigMonitorConfig');
            }
        },

        /**
         * @method
         * 将基本设置MenuItem对应上其页面
         *
         * @return {}
         */
        showViewSystemConfigBaseConfig () {
            this.$store.dispatch('setActiveNameSystemConfigVal', 'SystemConfigBaseConfig');
            this.$store.dispatch('setViewSystemConfigBaseConfigVal', true);
            this.$store.dispatch('setViewSystemConfigMonitorConfigVal', false);
        },

        /**
         * @method
         * 将监控设置MenuItem对应上其页面
         *
         * @return {}
         */
        showViewSystemConfigMonitorConfig () {
            this.$store.dispatch('setActiveNameSystemConfigVal', 'SystemConfigMonitorConfig');
            this.$store.dispatch('setViewSystemConfigBaseConfigVal', false);
            this.$store.dispatch('setViewSystemConfigMonitorConfigVal', true);
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
.systemConfigSider {
    position: fixed;
    height: 100vh;
    left: 0;
    overflow: auto;
}

.menu {
    width: auto;
}
</style>
