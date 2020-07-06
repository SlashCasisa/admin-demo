import service from '@/utils/axios';

export default {
  // 登录页面获取菜单
  login(data) {
    return service({
      url: `/login`,
      method: 'post',
      data
    })
  },
  // 获取菜单
  getMenu(data) {
    return service({
      url: `/getMenu`,
      method: 'post',
      data
    })
  },
  // 获取列表
  getList(params) {
    return service({
      url: `/list/${params.status}/${params.page}`,
      method: 'get',
    })
  },
  // 新添列表
  addList(data) {
    return service({
      url: `/create`,
      method: 'post',
      data
    })
  },
  //编辑某列
  editList(data) {
    return service({
      url: '/update',
      method: 'post',
      data
    })
  },
  // 删除任务or修改状态
  // 1.状态 1:表示代办,2:完成,3:删除,-1:全部
  deleteList(data) {
    return service({
      url: '/update_status',
      method: 'post',
      data
    })
  },
}