<template>
  <div @click="topf">普法调节</div>
</template>

<script>
export default {
  methods: {
    topf() {
      window.location.href = "/pftj";
    },
  },
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