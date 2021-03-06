// const app = getApp()
// Vue.prototype.globalData = getApp().globalData
// http://ht.jiaxiangtech.com
import query from "./query";
import qs from 'qs';
import {
    MessageBox, Loading
} from 'element-ui'

const axios = require('axios');
/*
api 即vue.config.js 中配置的地址
http://pj.xiaomy.net/
https://ks.zjfzol.com.cn
 */
const baseURL = '/'
// const url=process.env.NODE_ENV !== 'production' ? '/' : 'https://ks.zjfzol.com.cn/'


// const url= 'http://pj.xiaomy.net/'

// axios.defaults.baseURL = url
// axios.defaults.timeout = 10000 // 请求超时
const instance = axios.create({
    baseURL: baseURL,
    timeout: 1000 * 30,
    withCredentials: true,
    /*
    no-cache：必须和服务器端确认响应是否发生变化，如果没有就是用缓存，否则更新请求响应数据；
    no-store：禁止使用缓存；
     */

    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
    }
})
function get(url, data, headers) {

    let myData = {};
    if (data) {
        //过滤掉空的参数
        for (let [key, val] of Object.entries(data)) {
            if (val) {
                myData[key] = val;
            }
        }
    }

    let promise = new Promise((resolve, reject) => {
        // Indicator.open()
        instance.get(url,

            {
                params: data,
                headers

            })
            .then(function (res) {
                // Indicator.close();
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
                reject(error)
                MessageBox({
                    message: JSON.stringify(error),
                    type: 'warning'
                });
            })

    });
    return promise;
}

function post(url, data, headers, tips) {
    // Indicator.open()
    let promise = new Promise((resolve, reject) => {
        instance.post(url, {
            params: data,
            headers

        })
            .then(function (res) {
                // Indicator.close();
                if (res.data.code === 0) {
                    resolve(res.data)
                } else if (!tips) {
                    MessageBox({
                        message: res.data.msg || res.data.message,
                        type: 'warning'
                    });
                }
                // else if (res.data.code == 401) {
                //     MessageBox.confirm('您未登录，立即登录?', '提示', {
                // 		confirmButtonText: '确定',
                // 		cancelButtonText: '取消',
                // 		type: 'warning'
                // 	}).then(() => {
                // 	})
                // }
            })
            .catch(function (error) {
                reject(error)
                MessageBox({
                    message: JSON.stringify(error),
                    type: 'warning'
                });
            });
    });
    return promise;
}

class api {
    // 提交新增跟进数据
    commitNewfollow(data) {
        return new Promise((resolve, reject) => {
            post('/hss/wxFollowup/add', data).then(res => {
                resolve(res)
            })

        })
    }
    // 获取沟通方式列表
    getcommtypeList(data) {

        return new Promise((resolve, reject) => {
            get('/hss/wxCommonfield/page?query=' + data).then(res => {
                resolve(res.data.list)
            })

        })
    }
    // 获取法治政府视频、介绍
    getFzIntro() {
        return new Promise((resolve, reject) => {
            get('/api/open/introduce/introduce/video').then(res => {
                resolve(res.data)
            })

        })
    }
    // 获取审查统计
    getCensorshipRate() {
        return new Promise((resolve, reject) => {
            get('/api/examination/examination/compute', {}, {
                'Content-Type': 'multipart/form-data',
                'Connection': 'keep-alive',
            }).then(res => {
                resolve(res.data)
            })

        })
    }
    // 获取审查人数统计
    getReviewCount(data) {
        return new Promise((resolve, reject) => {
            get('/api/examination/examination/scope', data, {
                'Content-Type': 'multipart/form-data',
                'Connection': 'keep-alive',
            }).then(res => {
                resolve(res.data)
            })

        })
    }
    // 审查合同展示列表
    getContractList(data) {
        return new Promise((resolve, reject) => {
            get('/api/examination/examination/frontShow', data, {
                'Content-Type': 'multipart/form-data',
                'Connection': 'keep-alive',
            }).then(res => {
                resolve(res.data)
            })

        })
    }
    getAuditDetails(data) {
        return new Promise((resolve, reject) => {
            get('/api/examination/examination/detail?id=' + data, {}, {
                'Content-Type': 'multipart/form-data',
                'Connection': 'keep-alive',
            }).then(res => {
                resolve(res.data)
            })

        })
    }
    // 获取法治队伍人数统计
    getFzdwStatis() {
        return new Promise((resolve, reject) => {
            get('/api/open/ranks/ranks/count').then(res => {
                resolve(res.data)
            })

        })
    }
    // 法治队伍分页
    getFzdwList(data) {
        return new Promise((resolve, reject) => {
            get('/api/open/ranks/ranks/page', data).then(res => {
                resolve(res.data)
            })

        })
    }
     // 法治队伍详情
     getFzdwDtl(data) {
        return new Promise((resolve, reject) => {
            get('/api/open/ranks/ranks/detail?id=' + data).then(res => {
                resolve(res.data)
            })

        })
    }
    // 重点人员列表展示
    getKeyPersonnel(data) {
        return new Promise((resolve, reject) => {
            get('/api/keyuser/keyuser/frontShow', data, {
                'Content-Type': 'multipart/form-data',
                'Connection': 'keep-alive',
            }).then(res => {
                resolve(res.data)
            })

        })
    }
   
    // 重点人员统计
    getStatistics() {
        return new Promise((resolve, reject) => {
            get('/api/keyuser/keyuser/compute', {}, {
                'Content-Type': 'multipart/form-data',
                'Connection': 'keep-alive',
            }).then(res => {
                resolve(res.data)
            })
        })
    }
    // 法治乡村统计
    getFzxcStatis() {
        return new Promise((resolve, reject) => {
            get('/api/open/village/village/getVillageCount').then(res => {
                resolve(res.data)
            })

        })
    }
    // 法治乡村分页
    getFzxcList(data) {
        return new Promise((resolve, reject) => {
            get('/api/open/village/village/list?', data).then(res => {
                resolve(res.data)
            })

        })
    }
    // 法治乡村详情
    getFzxcDtl(data) {
        return new Promise((resolve, reject) => {
            get('/api/open/village/village/detail?id=' + data).then(res => {
                resolve(res.data)
            })

        })
    }
    // 法律宝典统计
    getFlbdStatis() {
        return new Promise((resolve, reject) => {
            get('/api/open/bible/bible/getBibleCount').then(res => {
                resolve(res.data)
            })

        })
    }
    // 法律宝典分页
    getFlbdList(data) {
        return new Promise((resolve, reject) => {
            get('/api/open/bible/bible/list', data).then(res => {
                resolve(res.data)
            })

        })
    }
    // 法律宝典详情
    getFlbdDtl(data) {
        return new Promise((resolve, reject) => {
            get('/api/open/bible/bible/detail?id=' + data).then(res => {
                resolve(res.data)
            })

        })
    }
    // 法律宝典浏览量+1
    AddPageview(data) {
        return new Promise((resolve, reject) => {
            post('/api/open/bible/bible/read?id=', data).then(res => {
                resolve(res)
            })

        })
    }
    // 法律宝典下载量+1
    AddDownloads(data) {
        return new Promise((resolve, reject) => {
            post('/api/open/bible/bible/download?id=', data).then(res => {
                resolve(res)
            })

        })
    }
    // 法律咨询统计
    getFlzxStatis() {
        return new Promise((resolve, reject) => {
            get('/api/open/consult/consult/getConsultCount').then(res => {
                resolve(res.data)
            })

        })
    }
    // 法律咨询分页
    getFlzxList(data) {
        return new Promise((resolve, reject) => {
            get('/api/open/consult/consult/list', data).then(res => {
                resolve(res.data)
            })

        })
    }
    // 法律咨询详情
    getFlzxDtl(data) {
        return new Promise((resolve, reject) => {
            get('/api/open/consult/consult/detail?id=' + data).then(res => {
                resolve(res.data)
            })

        })
    }
    // 法制动态分页
    getFzdtList(data) {
        return new Promise((resolve, reject) => {
            get('/api/open/dynamic/dynamic/list', data).then(res => {
                resolve(res.data)
            })

        })
    }
    // 法制动态详情
    getFzdtDtl(data) {
        return new Promise((resolve, reject) => {
            get('/api/open/dynamic/dynamic/detail?id=' + data).then(res => {
                resolve(res.data)
            })

        })
    }
    // 共享法庭分页
    getGxftList(data) {
        return new Promise((resolve, reject) => {
            get('/api/open/court/court/list', data).then(res => {
                resolve(res.data)
            })

        })
    }


}

export { api };
