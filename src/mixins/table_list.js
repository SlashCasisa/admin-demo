import {
    mapGetters
} from 'vuex'
export default {
    name: 'table-list',
    components: {},
    computed: {
        ...mapGetters([
            'data_theme'
        ])
    },
    data() {
        return {
            // table_row_style: this.setTableRowStyle(),
            header_style: this.setHeaderStyel(),
            loading: false,
            is_focus: false, // 输入框是否聚焦
            require_catch: false // 请求是否catch了
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
        focusSearch() {
            this.is_focus = true
        },
        blurSearch() {
            this.is_focus = false
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
        // setTableRowStyle() { // table样式
        //   if (window.localStorage.getItem('curTheme') === 'theme1') {
        //     return {
        //       'border-color': '#dadada',
        //       'background': '#fff',
        //       'color': '#0f0f0f',
        //       'font-size': '14px'
        //     }
        //   } else {
        //     return {
        //       'border-color': '#2C3949',
        //       'background': '#14151A',
        //       'color': '#d0d0d0',
        //       'font-size': '14px'
        //     }
        //   }
        // },
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
        // msg获取近一周的日期,//key_msg,user_msg,user_search_msg用到
        getNowWeekDate() {
            const end_time = new Date().getTime() + 3600 * 1000 * 24 * 1
            const end = new Date(end_time)
            const time_Y = end.getFullYear()
            const time_M = (end.getMonth() + 1 < 10 ? '0' + (end.getMonth() + 1) : end.getMonth() + 1)
            const time_D = (end.getDate() < 10 ? '0' + end.getDate() : end.getDate())
            const end_date = `${time_Y}-${time_M}-${time_D}`
            const start_time = new Date().getTime() - 3600 * 1000 * 24 * 7
            const start = new Date(start_time)
            const start_time_Y = start.getFullYear()
            const start_time_M = (start.getMonth() + 1 < 10 ? '0' + (start.getMonth() + 1) : start.getMonth() + 1)
            const start_time_D = (start.getDate() < 10 ? '0' + start.getDate() : start.getDate())
            const start_date = `${start_time_Y}-${start_time_M}-${start_time_D}`
            this.frist_beginDate = start_date
            this.frist_endDate = end_date
        },
        // 处理列表返回数据
        async handleListData() {
            // add by lyn
            if (!this.list_api) return
            // add end
            this.require_catch = false
            this.loading = true
            this.$store.dispatch(this.list_api, this.list_params).then(() => {
                const data = this.list_response.data
                this.table_data = data.content || data.list
                this.pagesize = data.list ? data.pageSize : data.size
                this.total = data.totalElements || data.total
                // ---------------------------------------------处理数据返回旧版本与新版本
                // 旧版本：content，size，totalElements
                // 新版本： list，pageSize，total
                // ---------------------------------------------
                this.loading = false
            }).catch(() => {
                console.log('error@@@@')
                this.require_catch = true
                this.loading = false
            })
        },
        async handleCurrentChange(page) { // 选择页码
            this.page = page
            this.handleListData()
        },
        async handleResult() { // 查询结果
            this.page = 1
            this.handleListData()
        },
        handleReload() { // 重新加载
            // this.$router.go()
            this.handleListData()
        }
    }
}