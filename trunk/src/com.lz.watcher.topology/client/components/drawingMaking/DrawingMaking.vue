<template>
    <div class="drawingMaking">
        <router-view name="drawingMakingIndex" v-model="viewDrawingMakingIndex"/>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'DrawingMaking',
    components: {},
    data () {
        return {

        }
    },
    computed: {
        viewDrawingMakingIndex () {
            return this.$store.getters.getDrawingMakingIndex;
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
            this.$store.dispatch('setViewDrawingMakingIndexVal', true);
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
.drawingMaking {
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
}
</style>
