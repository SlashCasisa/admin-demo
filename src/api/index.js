import axios from '@/utils/axios';

export default {
  getMovieList() {
    return axios({
      url: `/api?s=man&apikey=4a3b711b`,
      method: 'get',
    })
  },
}