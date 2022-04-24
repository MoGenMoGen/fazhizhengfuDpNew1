<template>
  <div class="cpdf" id="cpdf">
    <!-- <top-normal-bar normalTitle="法律文书详情"></top-normal-bar> -->
    <div class="center">
      <div class="contor">
        <button @click="prev">上一页</button>
        <button @click="next">下一页</button>
        <span
          >Page: <span v-text="page_num"></span> /
          <span v-text="page_count"></span
        ></span>

        <!-- <button @click="addscale" >加</button>
          <button @click="minus" >减</button>
          <button id="prev" @click="closepdf">关闭</button> -->
      </div>
      <div class="canvasbox">
        <canvas class="canvasstyle" id="the-canvas"></canvas>
      </div>
    </div>
  </div>
</template>
  <script>
import PDFJS from "pdfjs-dist";

export default {
  name: "c-pdf",
  props: ["pdfurl"],
  data() {
    return {
      pdfDoc: null, //pdfjs 生成的对象
      pageNum: 1, //
      pageRendering: false,
      pageNumPending: null,
      scale: 1, //放大倍数
      page_num: 0, //当前页数
      page_count: 0, //总页数
      maxscale: 2, //最大放大倍数
      minscale: 0.8, //最小放大倍数
    };
  },
  methods: {
    renderPage(num) {
      //渲染pdf
      let vm = this;
      this.pageRendering = true;
      let canvas = document.getElementById("the-canvas");
      // Using promise to fetch the page
      this.pdfDoc.getPage(num).then(function (page) {
        var viewport = page.getViewport(vm.scale);
        viewport.width = 600;
        // viewport.height=700;
        //alert(vm.canvas.height)
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: vm.ctx,
          viewport: viewport,
        };
        var renderTask = page.render(renderContext);

        // Wait for rendering to finish
        renderTask.promise.then(function () {
          vm.pageRendering = false;
          if (vm.pageNumPending !== null) {
            // New page rendering is pending
            vm.renderPage(vm.pageNumPending);
            vm.pageNumPending = null;
          }
        });
      });
      vm.page_num = vm.pageNum;
    },
    addscale() {
      //放大
      if (this.scale >= this.maxscale) {
        return;
      }
      this.scale += 0.1;
      this.queueRenderPage(this.pageNum);
    },
    minus() {
      //缩小
      if (this.scale <= this.minscale) {
        return;
      }
      this.scale -= 0.1;
      this.queueRenderPage(this.pageNum);
    },
    prev() {
      //上一页
      let vm = this;
      if (vm.pageNum <= 1) {
        return;
      }
      vm.pageNum--;
      vm.queueRenderPage(vm.pageNum);
    },
    next() {
      //下一页
      let vm = this;
      console.log(111, vm.pageNum, vm.page_count);
      if (vm.pageNum >= vm.page_count) {
        return;
      }
      vm.pageNum++;
      vm.queueRenderPage(vm.pageNum);
    },
    closepdf() {
      //关闭PDF
      this.$emit("closepdf");
    },
    queueRenderPage(num) {
      if (this.pageRendering) {
        this.pageNumPending = num;
      } else {
        this.renderPage(num);
      }
    },
  },
  computed: {
    ctx() {
      let id = document.getElementById("the-canvas");
      return id.getContext("2d");
    },
  },
  mounted() {
    let vm = this;
    PDFJS.getDocument(vm.pdfurl).then(function (pdfDoc_) {
      //初始化pdf
      vm.pdfDoc = pdfDoc_;
      vm.page_count = vm.pdfDoc.numPages;
      vm.renderPage(vm.pageNum);
    });
  },
};
</script>
  <style type="text/less" lang="less" scoped>
.cpdf {
  position: absolute;
  left: 50%;
  top: 67px;
  // width: 683px !important;
  // height: 850px !important;
  width: 650px !important;
  height: 620px !important;
  transform: translateX(-50%);
  // margin-top: -425px !important;
  // margin-left: -342.5px !important;
  // background: url("../images/flws.png") no-repeat !important;
  background-size: 100% 100% !important;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  // overflow-y: scroll;
  // overflow-x: hidden;
  margin: 20px 0;
  .center {
    // overflow-y: scroll;
    // overflow-x: hidden;
    text-align: center;
    width: 100%;
    height: 100%;
    // overflow: auto;
    // padding-top: 20px;
    // &::-webkit-scrollbar {
    //   display: none;
    // }
    .contor {
      margin-bottom: 10px;
      // position: sticky;
      // top: 0px;
      button {
        cursor: pointer;
        margin-right: 5px;
        &:hover {
          color: #3498db;
        }
      }
      span{
        color: #fff;
      }
    }
    .canvasbox {
      width: 650px;
      height: 690px;
      overflow-y: scroll;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
