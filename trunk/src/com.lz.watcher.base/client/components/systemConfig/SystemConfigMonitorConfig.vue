<template>
    <div class="systemConfigMonitorConfig">
        <Layout class="layout">
            <Content class="content">
                <Breadcrumb class="breadcrumb">
                    <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                    <BreadcrumbItem>系统设置</BreadcrumbItem>
                    <BreadcrumbItem>监控设置</BreadcrumbItem>
                </Breadcrumb>
                <Card class="card">
                    <Row>
                        <Col span="3" class="key">
                            <span>警报铃声：</span>
                        </Col>
                        <Col span="1">&nbsp;</Col>
                        <Col span="8" class="val">
                            <Switch v-model="alarmSoundStatus" @on-change="toggleAlarmSoundStatus()" />
                        </Col>
                        <Col span="12">

                        </Col>
                    </Row>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script type="text/javascript">
import handlerSystemConfig from '../../javascripts/handlers/handlerSystemConfig.js';
export default {
    name: 'SystemConfigMonitorConfig',
    components: {},
    data () {
        return {
            alarmSoundStatus: false
        }
    },
    mounted () {
        handlerSystemConfig.getSystemConfig(this, '/monitorConfig').then((val) => {
            this.alarmSoundStatus = val.alarmSoundStatus;
        });
    },
    methods: {
        /**
         * @method
         * 切换警报铃声状态
         *
         * @return {}
         */
        toggleAlarmSoundStatus () {
            this.$Message.info('警报铃声 --> ' + (this.alarmSoundStatus ? '开启' : '关闭'));
            handlerSystemConfig.patchItem(this, '/monitorConfig', '/alarmSoundStatus', this.alarmSoundStatus);
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
@import '../../stylesheets/gColor.scss';
.systemConfigMonitorConfig {
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
    left: 200px;
    padding-right: 200px;
}

.layout {
    position: fixed;
    height: 100%;
    left: 200px;
    right: 0;
}

.content {
    padding: 0 16px 16px 16px;
}

.breadcrumb {
    margin: 16px 0;
}

.card {
    margin-bottom: 16px;
    width: 100%;
    padding: 16px;
    height: 100%;
    min-height: 87.5vh;
}

.key {
    text-align: right;
    background-color: $bgKey;
}

.val {
    text-align: left;
}
</style>
