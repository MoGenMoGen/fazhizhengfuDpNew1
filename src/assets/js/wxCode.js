

import wx from 'weixin-js-sdk';

//微信公众号获取code，微信分享配置


let appid='wx9a4f33ff814a663f'//微信公众号的appid
let scope='snsapi_userinfo'//应用授权作用域，snsapi_userinfo：弹出授权页面，snsapi_base：不弹出授权页面
/*
拼接的几个参数，response_type：返回类型，填写code，
state：重定向后会带上state参数，
redirect_uri：授权后重定向的回调链接地址，要对连接编码
 */

function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}


function getCode() {
    return new Promise((resolve) => {
        let redirectUrl =window.encodeURIComponent(window.location.href.split("#")[0])//获取当前页面地址，并编码
        window.console.log('重定向url：'+redirectUrl)
        let code = getQueryString('code')
        window.console.log('code='+code)

        if(typeof(code) == 'undefined' || code === null){
            let authUrl=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUrl}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
            window.console.log(authUrl)
            window.console.log('code不存在进入到微信。。。')
            window.location.href=authUrl
            resolve({code:code})
        }else{
            window.console.log('调用微信登录接口')
            //调用微信登录接口
            resolve({code:code})

        }
    });
}

//自定义公众号分享内容
function wxShare(config,info) {
    window.console.log("调用。。。。。。。。。。。方法。。。。")
    wx.config({
        debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: config.appId,         // 必填，公众号的唯一标识，填自己的！
        timestamp: config.timestamp, // 必填，生成签名的时间戳，刚才接口拿到的数据
        nonceStr: config.nonceStr,   // 必填，生成签名的随机串
        signature: config.signature, // 必填，签名，见附录1
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ]
    })
    //wx.ready中的回调函数不能带参数
    wx.ready(() => {
        //分享到朋友圈
        wx.onMenuShareTimeline({
            title: info.shareTitle,   // 分享时的标题
            link: 'http://zjfzol.zj.gov.cn/answer/index.html',     // 分享时的链接
            imgUrl: info.iconImg,    // 分享时的图标
            success() {
                window.console.log("分享朋友圈成功");
            },
            cancel() {
                window.console.log("取消朋友圈分享");
            }
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
            title: info.shareTitle,
            desc: info.shareDesc,
            link: 'http://zjfzol.zj.gov.cn/answer/index.html',
            imgUrl: info.iconImg,
            type: '',
            dataUrl: '',
            success() {
                window.console.log("分享好友成功");
            },
            cancel() {
                window.console.log("取消好友分享");
            }
        })
    })

}

export {wxShare ,getCode}
// 使用方法：import { wxShare } from '../../assets/js/wxCode'
