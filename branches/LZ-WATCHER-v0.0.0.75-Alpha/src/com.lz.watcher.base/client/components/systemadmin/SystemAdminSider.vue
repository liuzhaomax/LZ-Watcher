<template>
    <div class="systemAdminSider">
        <Sider class="systemAdminSider">
            <Menu class="menu" :active-name="activeNameSystemAdmin" theme="light" width="auto">
                <MenuItem name="SystemAdminOpLog" to="/home/systemAdmin/opLog" @click.native="showViewSystemAdminOpLog()">
                    <Icon type="md-clipboard" />
                    <span>操作日志</span>
                </MenuItem>
                <MenuItem name="SystemAdminRouteMonitor" to="/home/systemAdmin/routeMonitor" @click.native="showViewSystemAdminRouteMonitor()">
                    <Icon type="md-git-branch" />
                    <span>路径监控</span>
                </MenuItem>
                <MenuItem name="SystemAdminSessionMonitor" to="/home/systemAdmin/sessionMonitor" @click.native="showViewSystemAdminSessionMonitor()">
                    <Icon type="ios-chatbubbles" />
                    <span>会话监控</span>
                </MenuItem>
            </Menu>
        </Sider>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'SystemAdminSider',
    components: {},
    data () {
        return {

        }
    },
    computed: {
        activeNameSystemAdmin () {
            return this.$store.getters.getActiveNameSystemAdmin;
        },
        viewSystemAdminOpLog () {
            return this.$store.getters.getViewSystemAdminOpLog;
        },
        viewSystemAdminRouteMonitor () {
            return this.$store.getters.getViewSystemAdminRouteMonitor;
        },
        viewSystemAdminSessionMonitor () {
            return this.$store.getters.getViewSystemAdminSessionMonitor;
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
            if (this.viewSystemAdminOpLog) {
                this.$store.dispatch('setActiveNameSystemAdminVal', 'SystemAdminOpLog');
            }
            if (this.viewSystemAdminRouteMonitor) {
                this.$store.dispatch('setActiveNameSystemAdminVal', 'SystemAdminRouteMonitor');
            }
            if (this.viewSystemAdminSessionMonitor) {
                this.$store.dispatch('setActiveNameSystemAdminVal', 'SystemAdminSessionMonitor');
            }
        },

        /**
         * @method
         * 将操作日志MenuItem对应上其页面
         *
         * @return {}
         */
        showViewSystemAdminOpLog () {
            this.$store.dispatch('setActiveNameSystemAdminVal', 'SystemAdminOpLog');
            this.$store.dispatch('setViewSystemAdminOpLogVal', true);
            this.$store.dispatch('setViewSystemAdminRouteMonitorVal', false);
            this.$store.dispatch('setViewSystemAdminSessionMonitorVal', false);
        },

        /**
         * @method
         * 将路径监控MenuItem对应上其页面
         *
         * @return {}
         */
        showViewSystemAdminRouteMonitor () {
            this.$store.dispatch('setActiveNameSystemAdminVal', 'SystemAdminRouteMonitor');
            this.$store.dispatch('setViewSystemAdminOpLogVal', false);
            this.$store.dispatch('setViewSystemAdminRouteMonitorVal', true);
            this.$store.dispatch('setViewSystemAdminSessionMonitorVal', false);
        },

        /**
         * @method
         * 将会话监控MenuItem对应上其页面
         *
         * @return {}
         */
        showViewSystemAdminSessionMonitor () {
            this.$store.dispatch('setActiveNameSystemAdminVal', 'SystemAdminSessionMonitor');
            this.$store.dispatch('setViewSystemAdminOpLogVal', false);
            this.$store.dispatch('setViewSystemAdminRouteMonitorVal', false);
            this.$store.dispatch('setViewSystemAdminSessionMonitorVal', true);
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
.systemAdminSider {
    position: fixed;
    height: 100vh;
    left: 0;
    overflow: auto;
}

.menu {
    width: auto;
}
</style>
