// const app = getApp()
// Vue.prototype.globalData = getApp().globalData
// http://ht.jiaxiangtech.com
import query from "./query";
import qs from 'qs';
const axios = require('axios');
/*
api 即vue.config.js 中配置的地址
http://pj.xiaomy.net/
https://ks.zjfzol.com.cn
 */
const url='/'
// const url=process.env.NODE_ENV !== 'production' ? '/' : 'https://ks.zjfzol.com.cn/'


// const url= 'http://pj.xiaomy.net/'

// axios.defaults.baseURL = url
// axios.defaults.timeout = 10000 // 请求超时
let token=localStorage.getItem('token')
const instance = axios.create({
    baseURL:url,
    timeout: 1000 * 30,
    withCredentials: true,
    /*
    no-cache：必须和服务器端确认响应是否发生变化，如果没有就是用缓存，否则更新请求响应数据；
    no-store：禁止使用缓存；
     */

    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'zjfzol-token':token
    }
})
function get(url, data) {

    let myData = {};
    if (data) {
        //过滤掉空的参数
        for (let [key, val] of Object.entries(data)) {
            if (val) {
                myData[key] = val;
            }
        }
    }

    let promise = new Promise((resolve) => {
        Indicator.open()
        instance.get(url,

            {
            params: data
        })
            .then(function (res) {
                Indicator.close();
                resolve(res.data)
               // if(res.data.code===0){
               //   resolve(res.data)
               // }else if(res.data.code==401){
               //     Toast(
               //         {
               //             message: res.data.msg ||  res.data.message,
               //             iconClass:"mint-toast-icon mintui mintui-field-warning"
               //         });
               //     //跳转到首页再次登录
               //     setTimeout(()=>{
               //         // window.location.replace('./login.html')
               //     },2000)
				//    window.location.replace('./login.html')
               //
               // }else {
               //
               //     if(url.indexOf('ques/question/apis/listByTopic2')!=-1){
               //         Dialog.alert({
               //             title: '标题',
               //             message: res.data.msg,
               //         }).then(() => {
               //             window.history.back();
               //         });
               //
               //     }else {
               //         let text = res.data.msg.indexOf('触发分钟级流控')!=-1 ?  '请一分钟后再试' : res.data.msg
               //         Toast(
               //             {
               //                 message: text,
               //                 iconClass:"mint-toast-icon mintui mintui-field-warning"
               //             });
               //     }
               //
               //
               //
               // }




            })
            .catch(function (error) {
                Indicator.close();
                Toast(
                    {
                        message: JSON.stringify(error),
                        iconClass:"mint-toast-icon mintui mintui-field-warning"
                    });
            })

    });
    return promise;
}

function post(url, data,tips) {
    Indicator.open()
    let promise = new Promise((resolve) => {
        instance.post(url, data)
            .then(function (res) {
                Indicator.close();
                if(res.data.code===0){
                    resolve(res.data)
                } else if (!tips) {
					Toast({
						message: res.data.msg ||  res.data.message,
						iconClass:"mint-toast-icon mintui mintui-field-warning"
					});
				} else if (res.data.code==401) {
                    Toast({
						message: res.data.msg ||  res.data.message,
						iconClass:"mint-toast-icon mintui mintui-field-warning"
					});
					window.location.replace('./login.html')
                }
            })
            .catch(function (error) {
				Indicator.close();
				Toast({
					message: JSON.stringify(error),
					iconClass:"mint-toast-icon mintui mintui-field-warning"
				});
            });
    });
    return promise;
}

class api {
}

export { api };
