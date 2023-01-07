<template>
  <div class="order-page-box fuz-page-content">
    <div class="order-main fuz-full">
      <div class="h5-evenMenus" @click="h5ShowMenusFn" v-drag >
        <img
          src="https://saas-oss.oss-accelerate.aliyuncs.com/upload/20200710155735466.png"
          alt="">
      </div>
      <transition name="menus-fade">
        <div class="margin-left margin-left-h5" v-show="h5ShowMenus">
          <!-- 订单中心 -->
          <p
            v-if="templateLayoutType !== '2'"
            class="order-title b-1-cl medium-fonts medium">
            {{ $t('order.index.title') }}
            <span class="h5-evenMenus-list" @click="h5ShowMenusFn">
              <svg class='icon icon-16 market-show-button' aria-hidden='true'>
                <use xlink:href='#icon-c_7'></use>
              </svg>
            </span>
          </p>
          <c-navMenu
            :width="190"
            :lineHidth1="lineHidth1"
            :subLineHidth = "subLineHidth"
            :navList="navList"
            :navListActive="navListActive"
            @listChange="listChanges"
          />
        </div>
      </transition>
      <div class="margin-left  margin-left-pc fuz-nav">
        <c-navMenu
          :width="190"
          :lineHidth1="lineHidth1"
          :subLineHidth = "subLineHidth"
          :navList="navList"
          class="fuz-menu"
          :navListActive="navListActive"
          @listChange="listChanges"
        />
      </div>
      <div class="assets-page-title a-5-bg" v-if="templateLayoutType === '2'">
        <div class="page-title-bar b-1-cl">
            {{pageTitleText}}
        </div>
      </div>
      <!-- PC  -->
      <div class="margin-right order-pc fuz-full">
        <vue-scroll>
          <div class="margin-right-bar">
            <router-view/>
          </div>
        </vue-scroll>
      </div>
      <!-- H5  -->
      <div class="margin-right order-h5 fuz-full">
          <div class="margin-right-bar">
            <router-view/>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/order/index/index';
import 'BlockChain-ui/PC/common-mixin/order/index/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
