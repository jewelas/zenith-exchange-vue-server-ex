<template>
  <div class="notice-info home-bg">
    <!-- <c-pageBanner :title="$t('message.help_center')" className="d-1-bg"></c-pageBanner> -->
    <div class="main-content">
       <div class="h5-evenMenus" @click="h5ShowMenusFn" v-drag >
        <img
          src="https://saas-oss.oss-accelerate.aliyuncs.com/upload/20200710155735466.png"
          alt="">
      </div>
      <transition name="menus-fade">
        <div class="margin-left a-5-bg margin-left-h5" v-show="h5ShowMenus">
          <h3 class="menu-tit f-1-cl">
            <span class="h5-evenMenus-list" @click="h5ShowMenusFn">
              <svg class='icon icon-16 market-show-button' aria-hidden='true'>
                <use xlink:href='#icon-c_7'></use>
              </svg>
            </span>
          </h3>
          <div class="margin-left-h5-body">
            <ul class="f-2-cl">
              <li
                v-for="(item, index) in sideList"
                :key="index"
                @click="goPage(item)"
                :class = "{'f-1-cl c-4-bg' : contentId === item.fileName}"
                class="menu-item">
                  {{item.title}}
                </li>
            </ul>
          </div>
        </div>
      </transition>
      <div class="menu h5-menu margin-left-pc a-5-bg">
        <!-- <div class="menu-tit f-2-cl">{{$t('message.help_center')}}</div> -->
        <ul class="f-2-cl">
          <li
            v-for="(item, index) in sideList"
            :key="index"
            @click="goPage(item)"
            :class = "{'f-1-cl c-4-bg' : contentId === item.fileName}"
            class="menu-item">
              {{item.title}}
            </li>
        </ul>
      </div>
      <div class="content-box">
        <div class="content-text c-4-bg">
          <h1 class="content-title f-1-cl">{{notieContent.title}}</h1>
          <p class="time f-2-cl">{{notieContent.ctime}}</p>
          <div class="main-text f-2-cl" v-html ="notieContent.content">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/cms/cms';
import 'BlockChain-ui/PC/common-mixin/cms/cms.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
