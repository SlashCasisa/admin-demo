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
            // header_style: this.setHeaderStyel(),
            loading: false, //页面加载
            loading_list: false, //列表加载
            table_data: [], // 表格数据
            currentPage: 1, // 当前页
            pageSize: 10, //页码条数
            total: 0

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
        // // msg获取近一周的日期,//key_msg,user_msg,user_search_msg用到
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
            try {
                let res = await this.list_api(this.list_params)
                console.log(res, 'table list')
                this.table_data = res.list.rows;
                this.total = res.list.count;
            } catch (err) {
                console.log(err)
            } finally {
                this.loading = false
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
            // this.$router.go()
            this.handleListData()
        }
    }
}