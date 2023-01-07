<template>
  <div class="order-page-box fuz-page-content"  :class="{'light-theme': userSkin === '2'}">
    <div class="v5-order-main fuz-full">
      <div class="margin-left margin-left-pc fuz-nav ">
        <!-- 订单中心 -->
        <c-navMenu
          class='fuz-menu'
          :width="190"
          :lineHidth1="lineHidth1"
          :subLineHidth = "subLineHidth"
          :navList="navList"
          :navListActive="navListActive"
          @listChange="listChanges"
        />
      </div>
      <!-- PC  -->
      <div class="margin-right order-pc" style='width:auto'>
        <vue-scroll>
          <div class="margin-right-bar">
            <router-view/>
          </div>
        </vue-scroll>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newOrder/index/index';
import 'BlockChain-ui/PC/common-mixin/newOrder/index/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style>
</style>
