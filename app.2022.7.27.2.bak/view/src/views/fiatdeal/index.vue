<template>
  <div class="main">
    <div class="h5-evenMenus" @click="h5ShowMenusFn" v-drag >
        <img
          src="https://saas-oss.oss-accelerate.aliyuncs.com/upload/20200710155735466.png"
          alt="">
      </div>
      <transition name="menus-fade">
        <div class="margin-left a-5-bg margin-left-h5" v-show="h5ShowMenus">
          <div class="margin-left clearfix">
            <div class="title b-1-cl medium-fonts medium">
              {{
                fiatTradeOpen
                ? $t('assets.b2c.otcShow.fiatdealTitle')
                : $t('fiatdeal.title')}}
                <span class="h5-evenMenus-list" @click="h5ShowMenusFn">
                  <svg class='icon icon-16 market-show-button' aria-hidden='true'>
                  <use xlink:href='#icon-c_7'></use>
                </svg>
              </span>
            </div>
             <div class="margin-left-h5-body">
              <c-navMenu
                :width="190"
                :lineHidth1="56"
                :navList="navList"
                :navListActive="navListActive"
                @listChange="listChanges"
              />
             </div>
          </div>
        </div>
      </transition>
    <div class="margin-left clearfix fuz-card margin-left-pc menus">
      <div class="margin-left clearfix">
        <div class="title b-1-cl medium-fonts medium">
          {{
            fiatTradeOpen
            ? $t('assets.b2c.otcShow.fiatdealTitle')
            : $t('fiatdeal.title')}}
        </div>
        <c-navMenu
          :width="190"
          :lineHidth1="56"
          :navList="navList"
          :navListActive="navListActive"
          @listChange="listChanges"
        />
      </div>
    </div>
    <div class="otc-page-title a-5-bg" v-if="templateLayoutType === '2'">
      <div class="page-title-bar b-1-cl">
          {{pageTitleText}}
      </div>
    </div>
    <div class="margin-right fuz-card clearfix otc-pc">
      <vue-scroll>
        <Center />
      </vue-scroll>
    </div>
    <div class="margin-right a-5-bg clearfix otc-h5">
      <Center />
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/fiatdeal/index/index';
import 'BlockChain-ui/PC/common-mixin/fiatdeal/index/index.styl';
import Center from '@/views/fiatdeal/center.vue';

export default {
  mixins: [mixin],
  components: {
    Center,
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.menus >>> .navMenuList .nolistActive  {
  background: transparent !important;
}
.menus >>> .navMenuList .listActive  {
  background: rgba(255,255,255,0.12) !important;
}
</style>
