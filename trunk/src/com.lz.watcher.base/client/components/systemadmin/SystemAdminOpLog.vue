<template>
    <div class="systemAdminOpLog">
        <Layout class="layout">
            <Content class="content">
                <Breadcrumb class="breadcrumb">
                    <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                    <BreadcrumbItem>系统管理</BreadcrumbItem>
                    <BreadcrumbItem>操作日志</BreadcrumbItem>
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
    name: 'SystemAdminOpLog',
    components: {},
    data () {
        return {
            spinShow: true,
            pageTotal: 100,
            pageNum: 1,
            pageSize: 10,
            data: [
                {
                    username   : 'liuzhaomax',
                    realname   : '刘昭马克西',
                    method     : 'PATCH',
                    path       : '/home/systemAdmin/sessionMonitor',
                    sessionId  : 'joijidiwjijeijroijod0w09j30e9',
                    resTime    : 88888,
                    dataLength : '88888',
                    ip         : '198.982.222.222',
                    opTime     : '1986-02-03 22:22:22'
                }
            ],
            columns: [
                {
                    type: 'index',
                    align: 'center',
                    width: 50
                }, {
                    title: '用户名',
                    key: 'username',
                    align: 'center'
                }, {
                    title: '姓名',
                    key: 'realname',
                    align: 'center'
                }, {
                    title: '操作',
                    key: 'method',
                    align: 'center',
                    width: 110
                }, {
                    title: '路径',
                    key: 'path',
                    align: 'left',
                    minWidth: 100
                }, {
                    title: 'SessionID',
                    key: 'sessionId',
                    align: 'left',
                    minWidth: 60
                }, {
                    title: '响应时长(ms)',
                    key: 'resTime',
                    align: 'center',
                    width: 110
                }, {
                    title: '数据长度(B)',
                    key: 'dataLength',
                    align: 'center',
                    width: 110
                }, {
                    title: 'IP地址',
                    key: 'ip',
                    align: 'center'
                }, {
                    title: '操作时间',
                    key: 'opTime',
                    align: 'center',
                    sortType: 'desc'
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
            handlerSystemAdmin.postSystemAdmin(this, '/opLog', this.pageNum, this.pageSize, searchVal);
            handlerSystemAdmin.getSystemAdmin(this, '/opLog').then((val) => {
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
.systemAdminOpLog {
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
    position: relative;
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
