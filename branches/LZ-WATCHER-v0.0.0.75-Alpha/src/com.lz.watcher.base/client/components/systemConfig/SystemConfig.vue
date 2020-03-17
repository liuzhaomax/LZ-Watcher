<template>
    <div class="systemConfig">
        <router-view name="systemConfigSider" v-show="viewSystemConfigSider"/>
        <router-view name="systemConfigBaseConfig" v-show="viewSystemConfigBaseConfig"/>
        <router-view name="systemConfigMonitorConfig" v-show="viewSystemConfigMonitorConfig"/>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'SystemConfig',
    components: {},
    data () {
        return {

        }
    },
    computed: {
        viewSystemConfigSider () {
            return this.$store.getters.getViewSystemConfigSider;
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
         * 初始化组件，直接刷新路由的初始化状态机调整
         *
         * @return {}
         */
        init () {
            let component = this.$el.baseURI.split('/');
            component = component[component.length - 1];
            component = 'SystemConfig' + component.slice(0, 1).toUpperCase() + component.slice(1);
            this.$store.dispatch('setActiveNameSystemConfigVal', component);
            if (component === 'SystemConfigBaseConfig') {
                this.$store.dispatch('setViewSystemConfigBaseConfigVal', true);
                this.$store.dispatch('setViewSystemConfigMonitorConfigVal', false);
            }
            if (component === 'SystemConfigMonitorConfig') {
                this.$store.dispatch('setViewSystemConfigBaseConfigVal', false);
                this.$store.dispatch('setViewSystemConfigMonitorConfigVal', true);
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
