import 'whatwg-fetch'
import { Toast } from 'antd-mobile'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

/**
 * 处理url
 * @param url
 * @param param
 * @returns {*}
 */
function handleURL (url, param) {
    let completeUrl = BASE_URL + url
    if (param) {
        if (completeUrl.indexOf('?') === -1) {
            completeUrl = `${completeUrl}?${ObjToURLString(param)}`
        } else {
            completeUrl = `${completeUrl}&${ObjToURLString(param)}`
        }
    }
    //这个返回的就是 带有参数的url
    return completeUrl
}

/**
 * 将参数对象转化为'test=1&test2=2'这种字符串形式
 * @param param
 * @returns {string}
 * @constructor
 */
function ObjToURLString (param) {
    let str = ''
    if (Object.prototype.toString.call(param) === '[object Object]') {
        const list = Object.entries(param).map(item => {
            return `${item[0]}=${item[1]}`
        })
        str = list.join('&')
    }
    return str
}

export async function get (url, param) {
    //调用handleURL方法 拼接参数
    const completeUrl = handleURL(url, param)
    //通过fetch方法发送请求
    const response = await fetch(completeUrl, {
        credentials: 'include',
        xhrFields: {
            withCredentials: true       //跨域
        },
    })
    if (response.ok) {
        //这里就是请求数据成功了，返回json格式的数据
        return response.json()
    } else {
        Toast.offline(response.statusText || '网络错误')
        return response
    }
}

export async function post (url, parma) {
    //post方法 在url中是不带参数的
    const completeUrl = BASE_URL + url
    const response = await fetch(completeUrl, {
        credentials: 'include',
        method: 'POST',
        xhrFields: {
            withCredentials: true
        },
        //post方法需要设置请求头
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        //加入请求的参数
        body: JSON.stringify(parma),
    })
    if (response.ok) {
        //请求数据成功，返回json格式的数据
        return response.json()
    } else {
        Toast.offline(response.statusText || '网络错误')
        return response
    }
}
