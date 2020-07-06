// import {
//     mapGetters
// } from 'vuex'


export default {
    name: 'table-list',
    components: {},
    computed: {
        // ...mapGetters([
        //     'data_theme'
        // ])
    },
    data() {
        return {
            // table_row_style: this.setTableRowStyle(),
            // header_style: this.setHeaderStyel(),
            loading: false, //页面加载
            loading_list: false, //列表加载
            table_data: [], // 表格数据
            currentPage: 1, // 当前页
            pageSize: 10, //页码条数
            total: 0, //列表总数
            type: '', //哪种方式打开弹出框
        }
    },
    watch: {
        // data_theme(val) {
        //     // this.table_row_style = this.setTableRowStyle()
        //     this.header_style = this.setHeaderStyel()
        // },
        // page(val) {

        // }
    },
    mounted() {
        this.handleListData()
    },
    methods: {
        //处理时间的函数 在vue调用formatTimestamp(val,'minute')
        formatTimestamp(_timestamp, format) {
            if (_timestamp) {
                let _chuo = _timestamp.toString() + '000';
                let normal_date;
                let times = new Date(Number(_chuo));
                let time_Y = times.getFullYear();
                let time_M = (times.getMonth() + 1 < 10 ? '0' + (times.getMonth() + 1) : times.getMonth() + 1);
                let time_D = (times.getDate() < 10 ? '0' + times.getDate() : times.getDate());
                let time_h = (times.getHours() < 10 ? '0' + times.getHours() : times.getHours());
                let time_m = (times.getMinutes() < 10 ? '0' + times.getMinutes() : times.getMinutes());
                let time_s = (times.getSeconds() < 10 ? '0' + times.getSeconds() : times.getSeconds());
                // normal_date = time_Y + "-" + time_M + "-" + time_D;
                normal_date = `${time_Y}-${time_M}-${time_D}`
                if (format === 'minute') {
                    normal_date = `${time_Y}-${time_M}-${time_D}    ${time_h}:${time_m}`
                }
                if (format === 'second') {
                    normal_date = `${time_Y}-${time_M}-${time_D}    ${time_h}:${time_m}:${time_s}`
                }
                return normal_date;
            }
            return ''
        },
        setTableCellName({
            rowIndex
        }) { // table的cell的class名斑马色
            if (rowIndex % 2 === 0) {
                return 'odd-row'
            } else {
                return 'even-row'
            }
        },
        setHeaderStyel() { // table-setHeaderStyel样式
            if (window.localStorage.getItem('curTheme') === 'theme1') {
                return {
                    'text-align': 'center',
                    'border-color': '#EAECF0',
                    'background': '#FAFAFA',
                    'color': '#3A3A3A',
                    'font-size': '16px'
                }
            } else {
                return {
                    'text-align': 'center',
                    'border-color': '#272D31',
                    'background': '#1A1B1C',
                    'color': '#fff',
                    'font-weight': '0',
                    'font-size': '16px'
                }
            }
        },
        // // msg获取近一周的日期
        // getNowWeekDate() {
        //     const end_time = new Date().getTime() + 3600 * 1000 * 24 * 1
        //     const end = new Date(end_time)
        //     const time_Y = end.getFullYear()
        //     const time_M = (end.getMonth() + 1 < 10 ? '0' + (end.getMonth() + 1) : end.getMonth() + 1)
        //     const time_D = (end.getDate() < 10 ? '0' + end.getDate() : end.getDate())
        //     const end_date = `${time_Y}-${time_M}-${time_D}`
        //     const start_time = new Date().getTime() - 3600 * 1000 * 24 * 7
        //     const start = new Date(start_time)
        //     const start_time_Y = start.getFullYear()
        //     const start_time_M = (start.getMonth() + 1 < 10 ? '0' + (start.getMonth() + 1) : start.getMonth() + 1)
        //     const start_time_D = (start.getDate() < 10 ? '0' + start.getDate() : start.getDate())
        //     const start_date = `${start_time_Y}-${start_time_M}-${start_time_D}`
        //     this.frist_beginDate = start_date
        //     this.frist_endDate = end_date
        // },
        // 处理列表返回数据
        async handleListData() {
            this.loading = true
            this.loading_list = true
            try {
                let res = await this.listApi(this.listParams)
                this.table_data = res.list.rows;
                this.total = res.list.count;
            } catch (err) {
                console.log(err)
            } finally {
                this.loading = false
                this.loading_list = false
            }
        },
        async handleCurrentChange(currentPage) { // 切换页码
            this.currentPage = currentPage
            this.handleListData()
        },
        async handleResult() { // 查询结果
            this.page = 1
            this.handleListData()
        },
        handleReload() { // 重新加载
            this.handleListData()
        },
        handleDelete(id) { // 重新加载
            // 3
            this.$confirm('此操作将永久删除这条内容, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let data = {
                    "id": id,
                    "status": 3
                }
                try {
                    await this.deleteApi(data)
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                } catch (err) {
                    console.log(err)
                    this.$message({
                        type: 'error',
                        message: '服务器繁忙，请稍后再试'
                    });
                } finally {
                    this.handleListData()
                }


            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        async handleDialog(type, row) { //处理弹出框
            this.type = type
            if (type == "edit") {
                console.log(row)
                try {
                    let data = {
                        id: row.id
                    }
                    let res = await this.getTodoApi(data)
                    this.$refs.tableDialog.openDialog()
                    this.dialogForm = res.todo
                } catch (err) {
                    this.$message({
                        type: "error",
                        message: err
                    })
                }

            } else {
                for (let [key] of Object.entries(this.dialogForm)) {
                    this.dialogForm[key] = "";
                }
                this.$refs.tableDialog.openDialog()
            }
        }
    }
}