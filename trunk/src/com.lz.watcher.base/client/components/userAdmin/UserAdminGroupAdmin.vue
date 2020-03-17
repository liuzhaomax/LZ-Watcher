<template>
    <div class="userAdminGroupAdmin">
        <Layout class="layout">
            <Content class="content">
                <Breadcrumb class="breadcrumb">
                    <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                    <BreadcrumbItem>用户管理</BreadcrumbItem>
                    <BreadcrumbItem>分组管理</BreadcrumbItem>
                </Breadcrumb>
                <Card class="card">
                    <Row>
                        <Col span="10">
                            <Tree :data="dataGroup" :render="renderContentGroup" ref="tree"></Tree>
                        </Col>
                        <Col span="7">
                            <Tree :data="dataDuty" :render="renderContentDuty" ref="tree"></Tree>
                        </Col>
                        <Col span="7">
                            <Tree :data="dataJobLevel" :render="renderContentJobLevel" ref="tree"></Tree>
                        </Col>
                    </Row>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script type="text/javascript">
import FilterSanitisation from '../../../../../lib/com.lz.mevn.module.filter/FilterSanitisation.js';
import handlerUserAdmin from '../../javascripts/handlers/handlerUserAdmin.js';
import Utils from '../../../../../lib/com.lz.mevn.util.utils/Utils.js';
const utils = new Utils();
export default {
    name: 'UserAdminGroupAdmin',
    components: {},
    data () {
        return {
            dataGroup: [
                {
                    title: '组织架构',
                    expand: true,
                    render: (h, { root, node, data }) => {
                        return h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%'
                            }
                        }, [
                            h('span', [
                                h('Icon', {
                                    props: {
                                        type: 'md-cube'
                                    },
                                    style: {
                                        marginRight: '8px'
                                    }
                                }),
                                h('span', {
                                    style: {
                                        cursor: 'default'
                                    }
                                }, data.title)
                            ]),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    marginLeft: '32px'
                                }
                            }, [
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'md-add',
                                        type: 'primary'
                                    }),
                                    style: {
                                        width: '64px'
                                    },
                                    on: {
                                        click: () => this.appendGroup(data)
                                    }
                                })
                            ])
                        ]);
                    },
                    children: []
                }
            ],
            dataDuty: [
                {
                    title: '职位',
                    expand: true,
                    render: (h, { root, node, data }) => {
                        return h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%'
                            }
                        }, [
                            h('span', [
                                h('Icon', {
                                    props: {
                                        type: 'md-cube'
                                    },
                                    style: {
                                        marginRight: '8px'
                                    }
                                }),
                                h('span', {
                                    style: {
                                        cursor: 'default'
                                    }
                                }, data.title)
                            ]),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    marginLeft: '32px'
                                }
                            }, [
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'md-add',
                                        type: 'primary'
                                    }),
                                    style: {
                                        width: '64px'
                                    },
                                    on: {
                                        click: () => this.appendDuty(data)
                                    }
                                })
                            ])
                        ]);
                    },
                    children: []
                }
            ],
            dataJobLevel: [
                {
                    title: '职级',
                    expand: true,
                    render: (h, { root, node, data }) => {
                        return h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%'
                            }
                        }, [
                            h('span', [
                                h('Icon', {
                                    props: {
                                        type: 'md-cube'
                                    },
                                    style: {
                                        marginRight: '8px'
                                    }
                                }),
                                h('span', {
                                    style: {
                                        cursor: 'default'
                                    }
                                }, data.title)
                            ]),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    marginLeft: '32px'
                                }
                            }, [
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'md-add',
                                        type: 'primary'
                                    }),
                                    style: {
                                        width: '64px'
                                    },
                                    on: {
                                        click: () => this.appendJobLevel(data)
                                    }
                                })
                            ])
                        ]);
                    },
                    children: []
                }
            ],
            buttonProps: {
                type: 'default',
                size: 'small'
            }
        }
    },
    mounted () {
        this.fetchData();
    },
    methods: {
        /**
         * @method
         * 抓取后台数据
         *
         * @return {}
         */
        fetchData () {
            handlerUserAdmin.getUserAdmin(this, '/groupAdmin').then((val) => {
                // 递归遍历val，然后塞入expand:true
                utils.traverseTree(val.group[0].children, 'children', (el) => {
                    el.expand = true;
                });
                this.dataGroup[0].children = val.group[0].children;
                utils.traverseTree(val.duty, 'children', (el) => {
                    el.expand = true;
                });
                this.dataDuty[0].children = val.duty;
                utils.traverseTree(val.jobLevel, 'children', (el) => {
                    el.expand = true;
                });
                this.dataJobLevel[0].children = val.jobLevel;
            });
        },

        /**
         * @method
         * 发送数据
         *
         * @param  {String} itemPath '/xxxxx'
         * @param  {Object} data     数据对象可能是数组
         * @return {}
         */
        emitData (itemPath, data) {
            handlerUserAdmin.putUserAdmin(this, '/groupAdmin', itemPath, data);
        },

        /**
         * @method
         * 发送修改的title
         *
         * @param  {String} itemPath '/xxxxx'
         * @param  {String} oldTitle 旧名称
         * @param  {String} newTitle 新名称
         * @return {}
         */
        emitTitle (itemPath, oldTitle, newTitle) {
            handlerUserAdmin.patchTitle(this, '/groupAdmin', itemPath, oldTitle, newTitle);
        },

        /**
         * @method
         * 弹出修改分组名称的Madel
         *
         * @return {}
         */
        changeTitle (root, node, data, objTreeData, itemPathData, itemPathTitle) {
            let oldTitle = data.title;
            let newTitle = '';
            this.$Modal.confirm({
                render: (h) => {
                    return h('Input', {
                        props: {
                            value: data.title,
                            autofocus: true,
                            placeholder: '请输入分组名称...'
                        },
                        on: {
                            input: (val) => {
                                let filterSanitisation = new FilterSanitisation(val);
                                let value = filterSanitisation.offAllSpaces().target;
                                newTitle = value;
                            }
                        }
                    });
                },
                onOk: () => {
                    this.$Message.info('点击了确定');
                    let repeatTitle = false;
                    utils.traverseTree(objTreeData[0].children, 'children', (el) => {
                        if (el.title === newTitle) {
                            repeatTitle = true;
                        }
                    });
                    if (repeatTitle || !newTitle || oldTitle === newTitle) {
                        this.$Notice.error({
                            title: '操作失败',
                            desc: '分组名称不可重复，新分组名称不可为空或与之前相同！'
                        });
                    } else if (!repeatTitle && !!newTitle && oldTitle !== newTitle) {
                        data.title = newTitle;
                        let dataPut = this.prepareData(objTreeData[0].children);
                        this.emitData(itemPathData, dataPut);
                        this.emitTitle(itemPathTitle, oldTitle, newTitle);
                        this.$Notice.success({ title: '分组名称修改成功！' });
                    }
                },
                onCancel: () => {
                    this.$Message.info('点击了取消');
                }
            });
        },

        /**
         * @method
         * 生成符合数据库数据结构的数据
         *
         * @param  {Array} data 数据权限树
         * @return {Array}      数据权限树
         */
        prepareData (data) {
            let result = [];
            for (var i = 0; i < data.length; i++) {
                if (!!data[i].children && data[i].children.length !== 0) {
                    result.push({
                        title: data[i].title,
                        children: this.prepareData(data[i].children)
                    });
                } else {
                    result.push({
                        title: data[i].title
                    });
                }
            }
            return result;
        },

        /**
         * @method
         * 渲染分组树
         *
         * @param  {Object} h            vue对象
         * @param  {Object} options.root 父节点
         * @param  {Object} options.node 当前节点
         * @param  {Object} options.data 数据
         * @return {}
         */
        renderContentGroup (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: 'ios-folder'
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span', {
                        style: {
                            cursor: 'pointer'
                        },
                        on: {
                            click: () => this.changeTitle(root, node, data, this.dataGroup, '/group', '/groupTitle')
                        }
                    }, data.title)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        marginLeft: '32px'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'md-add'
                        }),
                        style: {
                            marginRight: '8px'
                        },
                        on: {
                            click: () => this.appendGroup(data)
                        }
                    }),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'md-close'
                        }),
                        on: {
                            click: () => this.removeGroup(root, node, data)
                        }
                    })
                ])
            ]);
        },

        /**
         * @method
         * 添加节点
         *
         * @param  {Object} data 数据
         * @return {}
         */
        appendGroup (data) {
            const children = data.children || [];
            children.push({
                title: '新分组',
                expand: true
            });
            this.$set(data, 'children', children);
            let dataPut = this.prepareData(this.dataGroup[0].children);
            this.emitData('/group', dataPut);
        },

        /**
         * @method
         * 删除节点
         *
         * @param  {Object} root 根节点
         * @param  {Object} node 当前节点
         * @param  {Object} data 数据
         * @return {}
         */
        removeGroup (root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
            let dataPut = this.prepareData(this.dataGroup[0].children);
            this.emitData('/group', dataPut);
        },

        /**
         * @method
         * 渲染职位树
         *
         * @param  {Object} h            vue对象
         * @param  {Object} options.root 父节点
         * @param  {Object} options.node 当前节点
         * @param  {Object} options.data 数据
         * @return {}
         */
        renderContentDuty (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: 'ios-folder'
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span', {
                        style: {
                            cursor: 'pointer'
                        },
                        on: {
                            click: () => this.changeTitle(root, node, data, this.dataDuty, '/duty', '/dutyTitle')
                        }
                    }, data.title)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        marginLeft: '32px'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'md-close'
                        }),
                        on: {
                            click: () => this.removeDuty(root, node, data)
                        }
                    })
                ])
            ]);
        },

        /**
         * @method
         * 添加节点
         *
         * @param  {Object} data 数据
         * @return {}
         */
        appendDuty (data) {
            const children = data.children || [];
            children.push({
                title: '新分组',
                expand: true
            });
            this.$set(data, 'children', children);
            let dataPut = this.prepareData(this.dataDuty[0].children);
            this.emitData('/duty', dataPut);
        },

        /**
         * @method
         * 删除节点
         *
         * @param  {Object} root 根节点
         * @param  {Object} node 当前节点
         * @param  {Object} data 数据
         * @return {}
         */
        removeDuty (root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
            let dataPut = this.prepareData(this.dataDuty[0].children);
            this.emitData('/duty', dataPut);
        },

        /**
         * @method
         * 渲染分组树
         *
         * @param  {Object} h            vue对象
         * @param  {Object} options.root 父节点
         * @param  {Object} options.node 当前节点
         * @param  {Object} options.data 数据
         * @return {}
         */
        renderContentJobLevel (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: 'ios-folder'
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span', {
                        style: {
                            cursor: 'pointer'
                        },
                        on: {
                            click: () => this.changeTitle(root, node, data, this.dataJobLevel, '/jobLevel', '/jobLevelTitle')
                        }
                    }, data.title)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        marginLeft: '32px'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'md-add'
                        }),
                        style: {
                            marginRight: '8px'
                        },
                        on: {
                            click: () => this.appendJobLevel(data)
                        }
                    }),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'md-close'
                        }),
                        on: {
                            click: () => this.removeJobLevel(root, node, data)
                        }
                    })
                ])
            ]);
        },

        /**
         * @method
         * 添加节点
         *
         * @param  {Object} data 数据
         * @return {}
         */
        appendJobLevel (data) {
            const children = data.children || [];
            children.push({
                title: '新分组',
                expand: true
            });
            this.$set(data, 'children', children);
            let dataPut = this.prepareData(this.dataJobLevel[0].children);
            this.emitData('/jobLevel', dataPut);
        },

        /**
         * @method
         * 删除节点
         *
         * @param  {Object} root 根节点
         * @param  {Object} node 当前节点
         * @param  {Object} data 数据
         * @return {}
         */
        removeJobLevel (root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
            let dataPut = this.prepareData(this.dataJobLevel[0].children);
            this.emitData('/jobLevel', dataPut);
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
@import '../../stylesheets/gColor.scss';
.userAdminGroupAdmin {
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
    left: 200px;
    padding-right: 200px;
}

.layout {
    overflow: auto;
    position: fixed;
    height: 100%;
    left: 200px;
    right: 0;
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
</style>
