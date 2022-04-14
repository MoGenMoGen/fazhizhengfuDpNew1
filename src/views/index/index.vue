<template>
<div>
    <!-- <div @click="topf">普法调节</div>
  <div @click="topr" style="color:#fff">数字执法</div> -->
  <MyHeader></MyHeader>
</div>


</template>

<script>
import MyHeader from '../../components/MyHeader'
export default {
  components:{MyHeader}
 
};
</script>

<style lang="less" scoped>
@import "../../assets/css/font/font.css";
#page_pftj {
  width: 100vw;
  min-height: 100vh;
  background: url(~@/images/bg.png) top center;
}
  
</style>