<template>
  <div id="assets" class="assets">
    <div class="assets-main">
      <div class="h5-evenMenus" @click="h5ShowMenusFn" v-drag >
        <img
          src="https://saas-oss.oss-accelerate.aliyuncs.com/upload/20200710155735466.png"
          alt="">
      </div>
      <transition name="menus-fade">
        <div class="margin-left a-5-bg margin-left-h5" v-show="h5ShowMenus">
          <!-- 资产中心 -->
          <p
            v-if="templateLayoutType !== '2'"
            class="assets-title b-1-cl medium-fonts medium">
            {{ $t('assets.index.title') }}
            <span class="h5-evenMenus-list" @click="h5ShowMenusFn">
              <svg class='icon icon-16 market-show-button' aria-hidden='true'>
                <use xlink:href='#icon-c_7'></use>
              </svg>
            </span>
          </p>
          <div class="margin-left-h5-body">
            <c-navMenu
              :width="190"
              :lineHidth1="lineHidth1"
              :subLineHidth = "subLineHidth"
              :navList="navList"
              :navListActive="navListActive"
              @listChange="listChanges"
            />
          </div>
        </div>
      </transition>
      <div class="margin-left a-5-bg margin-left-pc">
        <!-- 资产中心 -->
        <p
          v-if="templateLayoutType !== '2'"
          class="assets-title b-1-cl medium-fonts medium">
          {{ $t('assets.index.title') }}
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
      <div class="assets-page-title a-5-bg" v-if="templateLayoutType === '2'">
        <div class="page-title-bar b-1-cl">
            {{pageTitleText}}
        </div>
      </div>
      <div v-if="!isShowH5Router" class="margin-right a-5-bg clearfix assets-pc">
        <vue-scroll>
          <router-view/>
        </vue-scroll>
      </div>
      <div v-else class="margin-right a-5-bg clearfix assets-h5">
      <!-- <vue-scroll> -->
        <router-view/>
      <!-- </vue-scroll> -->
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/index/index';
import 'BlockChain-ui/PC/common-mixin/assets/index/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
