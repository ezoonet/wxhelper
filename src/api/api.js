/**
 * 前端
 * 2017-11-10
 */
import axios from 'axios' 
import {stringify} from 'qs'

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

export function getData(url, data) { 
   return axios.post(url, stringify(data)).then((res) => {
      return Promise.resolve(res.data)
    })
}
export function getUrl() {
  return 'http://devapi.ezoonet.com/cleanstock/'
}

function get(urls, obj) {
  const url = getUrl() + urls
  const data = obj
  return getData(url, data)
}

// 登录
export function login(obj) {
  return get('user/login', obj)
}
