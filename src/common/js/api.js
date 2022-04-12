import { until } from "./until";
const untilApi = new until();
import Axios from 'axios';
import { MessageBox } from "element-ui";
class api {
  getCurrentPositionByIP(){
    return new Promise((resolve, reject) => {

      untilApi.get('https://apis.map.qq.com/ws/location/v1/ip?ip='+returnCitySN["cip"]+'&key=F5ABZ-CP3LK-M6QJC-A7NJP-B7QY6-DAF7B').then(res=>{
        console.log(res)
      })
    });

  }
  getAllCity () {
    return Axios.get('../../static/citydata.json');
  }
  getLocationQQ(){
    return new Promise(resolve => {
      let geolocation = new qq.maps.Geolocation(
        "F5ABZ-CP3LK-M6QJC-A7NJP-B7QY6-DAF7B",
        "二供天气定位"
      );

      geolocation.getLocation(sucCallback, showErr, options);
      var options = { timeout: 8000 };

      var self = this;
      function sucCallback(position) {
        resolve(position)
      }

      function showErr() {
        alert("定位失败");
      }
    })


  }
  getWeatherInfo (){
    let that = this
    return new Promise((resolve, reject) => {
      this.getAllCity().then(city=>{
        let citys = city.data;
        let cityNameByIp = '宁波'
        citys.zone.forEach(province => {

          province.zone.forEach(city => {

            city.zone.forEach(area => {

              // let cityNameByJson = area.name.match(cityNameByIp);
              if (cityNameByIp.includes(area.name)) {
                // 根据城市代码获取天气信息
                that.getWeatherByCityCode(area.code).then(data => {
                  // 将数据传给下一个then
                  resolve(data.data.data);
                });
              }

            });
          });
        })
      })
    });
  }
  getWeatherInfo2 (){
    let that = this
    return new Promise((resolve, reject) => {
      // 等两个函都获取到数据
      Axios.all([this.getAllCity(), this.getLocationQQ()])
        .then(Axios.spread(function(city, position) {
          let citys = city.data;
          // let cityNamesByIp = position.data.address || position.data.data.address;
          // let cityNameByIp = cityName || cityNamesByIp.split('|')[2];
          // let cityNameByIp = cityName || position.data.data.area;
          let cityNameByIp = position.cityName ||  position.city;
          let weatherData = '';
          // 遍历城市json对象获取城市代码
          citys.zone.forEach(province => {

            province.zone.forEach(city => {

              city.zone.forEach(area => {

                // let cityNameByJson = area.name.match(cityNameByIp);
                if (cityNameByIp.includes(area.name)) {
                  // 根据城市代码获取天气信息
                  that.getWeatherByCityCode(area.code).then(data => {
                    // 将数据传给下一个then
                    resolve(data.data.data);
                  });
                }

              });
            });
          })
        }));
    });
  }
  getWeatherByCityCode (code){
    // let URL = "/WeatherApi?citykey=101010100";
    let URL = "http://wthrcdn.etouch.cn/weather_mini?citykey=" + code;
    return Axios.get(URL);
  }
  //后台首页数据（除地图外）
  adminData(data){
      return untilApi.get("/crm/trigger/homePageStatistics", data)

  }
  //后台首页数据（地图）
  adminMap(data){
    return untilApi.get("/crm/trigger/homeMapPageStatistics", data)

  }
}

export { api };
