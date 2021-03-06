// const hostUrl = 'http://xl.jiaxiangtech.com/'
// const hostUrl = 'http://192.168.2.109'
import $ from "jquery";

class until {

  //格式化时间,转换为2020-06-19 15:26:07,这种格式可以直接比较大小,例如：2020-06-19 15:26:07<2020-06-20 15:26:07 结果为true
  dateFormat(date) {
    if(date instanceof  Date){
      var year=date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
      var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
      var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
      var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
      var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
      // 拼接
      return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
    }else{
      return date
    }
  }




  //判断是否是PC浏览器
  isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }

  // 判断安卓
  isAndroid() {
    var u = navigator.userAgent;
    if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
      return true;
    }
    return false;
  }
// 判断设备为 ios
  isIos() {
    var u = navigator.userAgent;
    if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
      return true;
    }
    return false;
  }


  //毫秒转天时分秒，如果不需要天，则
  formatDuring(mss) {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = parseInt((mss % (1000 * 60)) / 1000);//不足一秒的毫米数直接舍去
    // return days + " 天 " + hours + ":" + minutes + ":" + seconds;
      hours = hours > 10 ? hours : '0'+hours
      minutes = minutes > 10 ? minutes : '0'+minutes
      seconds = seconds > 10 ? seconds : '0' + seconds
    return  hours + ":" + minutes + ":" + seconds;
  }



  //对象数组方法去重
  arrayDeduplication(arr) {
    const obj = {};
    return arr.reduce((curr, next) => {
      obj[next.matchMenuId]
        ? ""
        : (obj[next.matchMenuId] =
            true && (next.type === 0 || next.type === 1) && curr.push(next));
      return curr;
    }, []);
  }
  //判断是否登录
  ifLogin() {
    // console.log(localStorage.getItem('user'))
    if (!this.loGet("user")) {

      return false;
    } else {
      return true;
    }
  }
  down(obj) {
    let objArr = obj.split("/");
    let name = objArr[objArr.length - 1];
    let url =
      "http://mx.jiaxiangtech.com/upload/201812/5b24f0422eb24717a37f08d43c529713.jpg";
    // for(let i=0; i<objArr.length-1;i++){
    //   name+=objArr[i]
    // }
    // console.log(url)
    // 创建隐藏的可下载链接
    var eleLink = document.createElement("a");
    // http___khtest.10jqka.com.cn_dev_taojinchao_vuepdf_dist_test
    eleLink.download = name;
    eleLink.style.display = "none";
    // 字符内容转变成blob地址
    var blob = new Blob([url]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
  }
  getPk() {
    let obj = this.loGet("JS_token");
    return JSON.parse(obj).accInfo.teachAccPk;
  }
  getInfo() {
    let $q = new Promise((resolve, reject) => {
      let obj = this.loGet("JS_token");
      let pk = JSON.parse(obj).accInfo.teachAccPk;
      this.get("/teach/acc/info/" + pk, {}).then(
        res => {
          if (res.status == 200) {
            this.info = res.data;
            resolve(res.data);
          } else {
            reject(res.message);
          }
        },
        err => {
          reject(err);
        }
      );
    });
    return $q;
  }
  //ajax请求
  postImg(url, data) {
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        contentType: false,
        processData: false,
        url,
        data,
        cache: false,
        dataType: "json",
        success(data) {
          resolve(data);
        },
        error(data) {
          reject(data);
        }
      });
    });
    return promise;
  }
  upImg(e) {
    let $q = new Promise((resolve, reject) => {
      let blob = e.target.files[0];
      let maxSize = 1024 * 1024 * 10;
      if (blob.size > maxSize) {
        return reject("最大不能超过10M！");
      }
      if (/^image/.test(blob.type) || /^application\/pdf/.test(blob.type)) {
        let param = new FormData();
        param.append("file", blob);
        this.postImg("/general/file/upload", param).then(
          res => {
            e.target.value = "";
            if (res.status == 500) {
              reject(res.message);
            } else {
              resolve(res.data);
            }
          },
          err => {
            e.target.value = "";
            reject(`${err}上传失败`);
          }
        );
      } else {
        return reject("请选择图片文件或者PDF！");
      }
    });
    return $q;
  }
  upMoreImg(e) {
    let $q = new Promise((resolve, reject) => {
      let blob = e.target.files;
      Object.keys(blob).forEach(o => {
        if (!/^image/.test(blob[o].type)) {
          delete blob[o];
        }
      });
      if (blob.length < 1) {
        return reject("请选择图片文件");
      }
      let param = new FormData();
      Object.keys(blob).forEach(o => {
        let obj = blob[o];
        param.append("files", obj);
      });
      this.postImg("/zhongbiao/app/upload/ups", param).then(
        res => {
          e.target.value = "";
          if (res.resultCode == 500) {
            reject(res.resultMessage);
          } else {
            resolve(res.data.imgUrl);
          }
        },
        err => {
          e.target.value = "";
          reject(`${err}上传失败`);
        }
      );
    });
    return $q;
  }
  post(url, data,header) {
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url,
        data,
          header,
        async: true,
        cache: false,
        dataType: "json",
        success(data) {
          if (data.code != 0) {
            Toast(data.msg);
            return
          }
          resolve(data);
        },
        error(data) {
          reject(data);
        }
      });
    });
    return promise;
  }
  postCard(url, data) {
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url,
        data,
        async: true,
        cache: false,
        dataType: "json",
        headers: {
          "Content-Type": "application/json"
        },
        success(data) {
            if (data.code != 0) {
                Toast(data.msg);
            }
            resolve(data);
        },
        error(data) {
          reject(data);
        }
      });
    });
    return promise;
  }
  postData(url, data) {
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url,
        data,
        async: true,
        cache: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success(data) {

          resolve(data);
        },
        error(data) {
          reject(data);
        }
      });
    });
    return promise;
  }

  get(url, data,header, processData = true) {
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        type: "GET",
        url,
        data,
        cache: false,
        dataType: "json",
          header,
        processData,
        success(data) {
          if (data.code === 401) {
            Toast(data.msg)
              window.location.href = 'accountLogin.html'
          } else if (data.code != 0) {
              Toast(data.msg)
              reject(data);
          }else {
            resolve(data)
          }
        },
        error(data) {
            Toast(JSON.stringify(data))
        }
      });
    });
    return promise;
  }
  //fetch请求
  async fetch(url, data) {
    if (window.fetch) {
      let body = this.param(data);
      let requestConfig = {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "force-cache",
        body
      };
      try {
        const response = await fetch(url, requestConfig);
        const responseJson = await response.json();
        return responseJson;
      } catch (error) {
        throw new Error(error);
      }
    } else {
      this.post(url, data);
    }
  }
  //fetch参数格式化
  param(data) {
    let str = "";
    Object.keys(data).forEach(index => {
      str = str + index + "=" + data[index] + "&";
    });
    str = str.substring(0, str.length - 1);
    return str;
  }
  //是否登录并跳转
  isLogin(self) {
    let state = this.loGet("JS_token") ? true : false;
    if (!state) {
      self.$hero.msg.show({
        text: "未登录"
      });
      setTimeout(() => {
        location.href = "../system/register.html";
      }, 1000);
      return false;
    }
    return true;
  }
  //是否登录
  isLogined() {
    let state = this.loGet("JS_token") ? true : false;
    return state;
  }
  //,分割数组
  cutArray(str) {
    let result = [];
    if (str.indexOf(";") > -1) {
      result = str.split(";");
    } else {
      result.push(str);
    }
    let panel = result.filter(t => {
      if (t) {
        return true;
      } else {
        return false;
      }
    });
    return panel;
  }
  //跳转页面
  href(url) {
    window.location.href = url;
  }
  //跳转页面
  replace(url) {
    window.location.replace(url) ;
  }
  //后退
  back() {
    window.history.back();
  }
  //session存取
  seSave(name, obj) {
    sessionStorage.setItem(name, obj);
  }
  seGet(name) {
    return sessionStorage.getItem(name);
  }
  seRemove(name) {
    sessionStorage.removeItem(name);
  }
  //local存取
  loSave(name, obj) {
    localStorage.setItem(name, obj);
  }
  loGet(name) {
    return localStorage.getItem(name);
  }
  loRemove(name) {
    localStorage.removeItem(name);
  }
  //获取TS_token
  getToken() {
    return JSON.parse(localStorage.getItem("JS_token"));
  }
  getId() {
    let obj = this.getToken();
    return obj.result.uuid;
  }
  //截取URL参数
  getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    } else {
      return null;
    }
  }
  //判断是否空对象
  isEmptyObject(obj) {
    for (var name in obj) {
      return false; //返回false，不为空对象
    }
    return true; //返回true，为空对象
  }
  //格式化日期,返回 年 月 日 星期
  formatDate(str = "") {
    // str = str==""?new Date():new Date(str.replace(/-/g, "/"));
    str = str == "" ? new Date() : new Date(str);
    let week = [
      "天",
      "一",
      "二",
      "三",
      "四",
      "五",
      "六"
    ];
    let year = str.getFullYear();
    let month =
      str.getMonth() + 1 < 10 ? "0" + (str.getMonth() + 1) : str.getMonth() + 1;
    let day = str.getDate() < 10 ? "0" + str.getDate() : str.getDate();
    let hour = str.getHours() < 10 ? "0" + str.getHours() : str.getHours();
    let minite =
      str.getMinutes() < 10 ? "0" + str.getMinutes() : str.getMinutes();
    let second =
      str.getSeconds() < 10 ? "0" + str.getSeconds() : str.getSeconds();
    week = week[str.getDay()];
    return {
      year,
      month,
      day,
      hour,
      minite,
      second,
      week
    };
  }
  formatDay(fmt, tm = "") {
    let times = tm ? new Date(tm.replace(/(-)/g, "/")) : new Date();
    var o = {
      "M+": times.getMonth() + 1, //月份
      "d+": times.getDate(), //日
      "h+": times.getHours(), //小时
      "m+": times.getMinutes(), //分
      "s+": times.getSeconds(), //秒
      "q+": Math.floor((times.getMonth() + 3) / 3), //季度
      S: times.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (times.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return fmt;
  }
  //指定时间倒计时(结束秒数)
  TimeSlot(count) {
    let end = new Date();
    //Date类型的valueOf(),返回当前日期毫秒数,可以直接比较
    if (count < end) {
      return {
        h: "00",
        m: "00",
        s: "00"
      };
    }
    let total = (count - end.getTime()) / 1000;
    let h = parseInt((total / (60 * 60)) % 24);
    let m = parseInt((total / 60) % 60);
    let s = parseInt(total % 60);
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    return {
      h,
      m,
      s
    };
  }
  TimeStep(times) {
    let start = new Date(times);
    let end = new Date();
    let count = (end.getTime() - start.getTime()) / 1000;
    let d = parseInt(count / (60 * 60) / 24);
    return d;
  }


  //设置只能输入数字
  formatNumber(val, max) {
    max = parseInt(max);
    let reg = /^\d+$/g;
    val = val.toString();
    if (val.match(reg)) {
      return val > max ? max : Number(val);
    } else {
      if (val == "") {
        return "";
      }
      if (!val[0].match(reg)) {
        return "";
      }
      let str = "";
      for (let i = 0; i < val.length; i++) {
        str += val[i].match(reg) ? val[i] : "";
      }
      return parseInt(str);
    }
  }
  count(flag, val, max) {
    //加减按钮点击
    max = parseInt(max);
    if (max == 0) {
      return 0;
    }
    if (flag == "-") {
      return val == 1 ? 1 : --val;
    } else {
      return val == max ? max : ++val;
    }
  }
  //数组排序(某属性数值)
  Sort(array, flag, state = "up") {
    let box = array.sort((v1, v2) => {
      if (state == "up") {
        return v1[flag] - v2[flag];
      } else {
        return v2[flag] - v1[flag];
      }
    });
    return box;
  }
  //随机生成 n~m 之间的数
  Random(min, max) {
    let choices = max - min + 1;
    return Math.floor(Math.random() * choices + min);
  }
  /*验证码倒计时*/
  countdown(el, count) {
    let timer = setInterval(() => {
      if (count == 0) {
        el.innerHTML = `重新获取`;
        el.removeAttribute("disabled");
        clearInterval(timer);
      } else {
        count--;
        el.innerHTML = `( ${count} )`;
        el.setAttribute("disabled", true);
      }
    }, 1000);
  }
}
//touch判断方向
class judge {
  // 1上2下3左4右
  getDirection(startx, starty, endx, endy) {
    let angx = endx - startx;
    let angy = endy - starty;
    let result = 0;
    var angle = this.getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
      result = 1;
    } else if (angle > 45 && angle < 135) {
      result = 2;
    } else if (
      (angle >= 135 && angle <= 180) ||
      (angle >= -180 && angle < -135)
    ) {
      result = 3;
    } else if (angle >= -45 && angle <= 45) {
      result = 4;
    }
    return result;
  }
  getAngle(angx, angy) {
    return (Math.atan2(angy, angx) * 180) / Math.PI;
  }
}
class reg {
  //取消首尾空格,中间空格不去掉，以下两种方法都可以用
  trim(str){
    return  str.replace(/(^\s+)|(\s+$)/g, "")
    // return  str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,'');
  }



  //验证身份证号码
  checkCard(str) {

    let arg1 = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if (!this.trim(str)) {
      return "请输入身份证号码";
    }
    if (!arg1.test(str)) {
      return "请输入正确的身份证号码";
    }
    return "ok";
  }
  //验证手机号
  checkPhone(str) {
    let regPhone = /^1[3456789]\d{9}$/;
    if (str == "") {
      return "请输入手机号";
    }
    if (!regPhone.test(str)) {
      return "请填写正确的手机号";
    }
    return "ok";
  }
  //验证用户名
  checkUserName(str) {
    let reg = /[\u4e00-\u9fa5]/g;
    if (str.length == 0) {
      return "请输入用户名";
    }
    if (reg.test(str)) {
      return "用户名不能包含中文";
    }
    return "ok";
  }
  //验证真实姓名
  checkName(str) {
    let reg = /^[\u4E00-\u9FA5]+$/;
    if (str.length == 0) {
      return "请输入真实姓名";
    }
    if (str.length < 2) {
      return "请输入正确名字";
    }
    if (!reg.test(str)) {
      return "请输入中文名";
    }
    return "ok";
  }
  //验证密码
  checkPwd(str) {
    let reg = /^[0-9a-zA-Z]{6,}$/;
    if (str == "") {
      return "请输入密码";
    }
    if (!reg.test(str)) {
      return "请输入正确规则密码";
    }
    return "ok";
  }
  //验证邮箱
  checkMail(str) {
    let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (str == "") {
      return "请输入邮箱";
    }
    if (!reg.test(str)) {
      return "请输入正确的邮箱";
    }
    return "ok";
  }

  //验证银行卡号
  checkMoney(str) {
    let reg = /^([1-9]{1})(\d{14}|\d{18})$/;
    if (str == "") {
      return "请输入银行卡号";
    }
    if (!reg.test(str)) {
      return "请输入正确的银行卡号";
    }
    return "ok";
  }
}

export { until, reg, judge };
