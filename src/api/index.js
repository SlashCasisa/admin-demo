import service from '@/utils/axios';

export default {
  // 获取列表
  getList(params) {
    return service({
      url: `list/${params.status}/${params.page}`,
      method: 'get',
    })
  },
  // 新添列表
  addList(data) {
    return service({
      url: `/api/create`,
      method: 'post',
      data
    })
  },
  //编辑某列
  editList(data) {
    return service({
      url: '/api/update',
      method: 'post',
      data
    })
  },
  // 删除任务or修改状态
  // 1.状态 1:表示代办,2:完成,3:删除,-1:全部
  deleteList(data) {
    return service({
      url: '/api/update_status',
      method: 'post',
      data
    })
  },
}