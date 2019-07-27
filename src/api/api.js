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
export function getdevUrl() {
  return 'http://devapi.ezoonet.com/cleanstock/'
}

export function getUrl() {
  return 'http://api.ezoonet.com/wxhelper/'
}

function getdev(urls, obj) {
  const url = getdevUrl() + urls
  const data = obj
  return getData(url, data)
}

function get(urls, obj) {
  const url = getUrl() + urls
  const data = obj
  return getData(url, data)
}
 
export function getdevapi(api,obj) {
  return getdev(api, obj)
}

export function getapi(api,obj) {
  return get(api, obj)
}

export function uploadImgs(obj) {
	let config = {
        headers:{'Content-Type':'multipart/form-data'}
      }; //添加请求头
  const url = getUrl() + 'upload/upload'
  return axios.post(url, obj,config).then((res) => {
    return Promise.resolve(res.data)
  })
}

 export function timestampToTime (cjsj) {
        var date = new Date(cjsj*1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y+M+D+h+m+s
    }