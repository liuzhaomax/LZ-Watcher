<template>
    <div class="systemAdmin">
        <router-view name="systemAdminSider" v-show="viewSystemAdminSider"/>
        <router-view name="systemAdminOpLog" v-show="viewSystemAdminOpLog"/>
        <router-view name="systemAdminRouteMonitor" v-show="viewSystemAdminRouteMonitor"/>
        <router-view name="systemAdminSessionMonitor" v-show="viewSystemAdminSessionMonitor"/>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'SystemAdmin',
    components: {},
    data () {
        return {

        }
    },
    computed: {
        viewSystemAdminSider () {
            return this.$store.getters.getViewSystemAdminSider;
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
         * 初始化组件，直接刷新路由的初始化状态机调整
         *
         * @return {}
         */
        init () {
            let component = this.$el.baseURI.split('/');
            component = component[component.length - 1];
            component = 'SystemAdmin' + component.slice(0, 1).toUpperCase() + component.slice(1);
            this.$store.dispatch('setActiveNameSystemAdminVal', component);
            if (component === 'SystemSystemAdminOpLog') {
                this.$store.dispatch('setViewSystemAdminOpLogVal', true);
                this.$store.dispatch('setViewSystemAdminRouteMonitorVal', false);
                this.$store.dispatch('setViewSystemAdminSessionMonitorVal', false);
            }
            if (component === 'SystemAdminRouteMonitor') {
                this.$store.dispatch('setViewSystemAdminOpLogVal', false);
                this.$store.dispatch('setViewSystemAdminRouteMonitorVal', true);
                this.$store.dispatch('setViewSystemAdminSessionMonitorVal', false);
            }
            if (component === 'SystemAdminSessionMonitor') {
                this.$store.dispatch('setViewSystemAdminOpLogVal', false);
                this.$store.dispatch('setViewSystemAdminRouteMonitorVal', false);
                this.$store.dispatch('setViewSystemAdminSessionMonitorVal', true);
            }
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
@import '../../stylesheets/gColor.scss';
.systemConfig {
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
}
</style>
