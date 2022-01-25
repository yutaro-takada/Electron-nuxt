<template>
  <div class="">
    <div class="row">
      <div class="col-sm-12">
        <a href="#modal1" class="button">モーダルウィンドウ1</a>
        <a href="#modal2" class="button">モーダルウィンドウ2</a>
        <a href="#modal3" class="button">モーダルウィンドウ3</a>
      </div>
    </div>
    <div id="modal1" class="overlays">
      <a class="cancel" href="#"></a>
      <div class="modals">
        <h2>モーダルウィンドウ1</h2>
        <div class="cont">
          <p>×マークでも背景クリックでも解除できます。</p>
          <p class="close"><a href="#">×</a></p>
        </div>
      </div>
    </div>
    <div id="modal2" class="overlays">
      <a class="cancel" href="#"></a>
      <div class="modals">
        <h2>モーダルウィンドウ2</h2>
        <div class="cont">
          <p>背景クリックで解除ができます。</p>
        </div>
      </div>
    </div>
    <div id="modal3" class="overlays">
      <div class="modals">
        <h2>モーダルウィンドウ3</h2>
        <div class="cont">
          <p>✗ボタンのみで解除できます。</p>
          <p class="close"><a href="#">✗</a></p>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      //   open: false
    };
  },
  methods: {
    hideModal() {
      this.open = false;
    }
  }
};
</script>
 
<style>


</style>
