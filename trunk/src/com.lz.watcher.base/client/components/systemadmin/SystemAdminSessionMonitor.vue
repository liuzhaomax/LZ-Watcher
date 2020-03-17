<template>
    <div class="systemAdminSessionMonitor">
        <Layout class="layout">
            <Content class="content">
                <Breadcrumb class="breadcrumb">
                    <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                    <BreadcrumbItem>系统管理</BreadcrumbItem>
                    <BreadcrumbItem>会话监控</BreadcrumbItem>
                </Breadcrumb>
                <Card class="card">
                    <div class="search">
                        <Input search enter-button="搜索" placeholder="请输入用户名" ref="search" @on-search="fetchData"/>
                    </div>
                    <div class="table">
                        <Table :columns="columns" :data="data"></Table>
                    </div>
                    <div class="page">
                        <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-sizer show-elevator show-total @on-change="changePage" @on-page-size-change="changePageSize"/>
                    </div>
                    <div class="lastRow"></div>
                    <div class="spinShade" v-show="spinShow">
                        <Spin class="spin" size="large"></Spin>
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script type="text/javascript">
import handlerSystemAdmin from '../../javascripts/handlers/handlerSystemAdmin.js';
export default {
    name: 'SystemAdminSessionMonitor',
    components: {},
    data () {
        return {
            spinShow: true,
            pageTotal: 100,
            pageNum: 1,
            pageSize: 10,
            data: [
                {
                    sessionId: 'oidjfsoidjfosidjfjjiosdfojjf',
                    username: 'liuzhaomax',
                    ip: '192.222.222.222',
                    createTime: '1986-02-03 22:22:22',
                    destroyTime: '1986-02-03 22:22:22',
                    reqTimes: 88888,
                    resTime: 8888,
                    maxSimul: 8888
                }
            ],
            columns: [
                {
                    type: 'index',
                    align: 'center',
                    width: 50
                }, {
                    title: 'SessionId',
                    key: 'sessionId',
                    align: 'left',
                    minWidth: 60
                }, {
                    title: '创建用户',
                    key: 'username',
                    align: 'center'
                }, {
                    title: 'IP地址',
                    key: 'ip',
                    align: 'center'
                }, {
                    title: '创建时间',
                    key: 'createTime',
                    align: 'center',
                    sortType: 'desc'
                }, {
                    title: '销毁时间',
                    key: 'destroyTime',
                    align: 'center'
                }, {
                    title: '请求次数',
                    key: 'reqTimes',
                    align: 'center',
                    width: 110
                }, {
                    title: '最大响应(ms)',
                    key: 'resTime',
                    align: 'center',
                    width: 110
                }, {
                    title: '最大并发',
                    key: 'maxSimul',
                    align: 'center',
                    width: 110
                }
            ]
        }
    },
    mounted () {
        this.fetchData();
        this.toggleSpin(3000);
    },
    methods: {
        /**
         * @method
         * 跳转相应分页页码
         *
         * @param  {Number} pageNum 分页页码
         * @return {}
         */
        changePage (pageNum) {
            this.pageNum = pageNum;
            this.fetchData();
        },

        /**
         * @method
         * 修改单页数据长度
         *
         * @param  {Number} pageSize 单页数据长度
         * @return {}
         */
        changePageSize (pageSize) {
            this.pageSize = pageSize;
            this.fetchData();
        },

        /**
         * @method
         * 抓取后台数据
         *
         * @return {}
         */
        fetchData () {
            let searchVal = this.$refs.search.$refs.input.value;
            handlerSystemAdmin.postSystemAdmin(this, '/sessionMonitor', this.pageNum, this.pageSize, searchVal);
            handlerSystemAdmin.getSystemAdmin(this, '/sessionMonitor').then((val) => {
                this.data = val;
            });
        },

        /**
         * @method
         * N秒后spin消失
         *
         * @param  {Number} delay 延迟时间ms
         * @return {}
         */
        toggleSpin (delay) {
            setTimeout(() => {
                this.spinShow = false;
            }, delay);
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
@import '../../stylesheets/gColor.scss';
.systemAdminSessionMonitor {
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
    overflow: auto;
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

.search {
    float: right;
    width: 300px;
}

.table {
    margin: 50px 0 16px;
}

.page {
    float: right;
}

.lastRow {
    height: 16px;
}

.spinShade {
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: $spinShade;
}

.spin {
    /* 因为spin的large是32px */
    position: absolute;
    width: 32px;
    height: 32px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
</style>
