<template>
  <div class="main personalPage fuz-page-content" :class="{'hideNav': hideNav}">
    <div v-if="hideNav" class="hideNav-box">
      <router-view />
    </div>
    <div v-else>
      <div class="h5-evenMenus" @click="h5ShowMenusFn" v-drag >
          <img
            src="https://saas-oss.oss-accelerate.aliyuncs.com/upload/20200710155735466.png"
            alt="">
        </div>
      <transition name="menus-fade">
        <div class="margin-left clearfix margin-left-h5"
          v-show="h5ShowMenus">
          <div
            v-if="templateLayoutType !== '2'"
            class="title b-1-cl medium-fonts medium"
          >
            {{ this.$t("personal.navMenu.title") }}
            <span class="h5-evenMenus-list" @click="h5ShowMenusFn">
              <svg class='icon icon-16 market-show-button' aria-hidden='true'>
                <use xlink:href='#icon-c_7'></use>
              </svg>
            </span>
          </div>
          <c-navMenu
            :width="190"
            :lineHidth1="lineHidth1"
            :subLineHidth="subLineHidth"
            activeColor="b-1-cl"
            :navList="navList"
            :navListActive="navListActive"
            @listChange="listChanges"
          />
        </div>
      </transition>
      <div class="margin-left clearfix margin-left-pc fuz-nav fuz-transparent deep">
        <!-- <div
          v-if="templateLayoutType !== '2'"
          class="title b-1-cl medium-fonts medium"
        >
          {{ this.$t("personal.navMenu.title") }}
        </div> -->
        <c-navMenu
          class='fuz-menu'
          :width="190"
          :lineHidth1="lineHidth1"
          :subLineHidth="subLineHidth"
          activeColor="b-1-cl"
          :navList="navList"
          :navListActive="navListActive"
          @listChange="listChanges"
        />
      </div>
      <div class="page-title" v-if="templateLayoutType === '2'">
        <div class="page-title-bar b-1-cl">
          {{ pageTitleText }}
        </div>
      </div>
      <div class="margin-right clearfix">
        <vue-scroll v-if="templateLayoutType === '2'">
          <div class="margin-right-bar">
            <router-view />
          </div>
        </vue-scroll>
        <div class="margin-right-bar" v-else>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/index/index';
import 'BlockChain-ui/PC/common-mixin/personal/index/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.margin-right {
  width: auto !important;
}
.personalPage{
  padding: 0 !important;
}
</style>
