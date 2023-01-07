<template>
  <div class="homes korea-home-container" style="background-color: #fff">
    <div class="korea-header" :style="headerStyle">
      <div class="korea-header-bar">
        <h1 class="title">{{ slideListTitle.title }}</h1>
        <p class="subTitle">{{ slideListTitle.subTitle }}</p>
        <div class="count">
          <p class="item">
            <span class="num">188</span>
            <span class="name">{{ $t("korea.types")[0] }}</span>
          </p>
          <p class="item">
            <span class="num">236</span>
            <span class="name">{{ $t("korea.types")[1] }}</span>
          </p>
        </div>
        <div class="button-box">
          <c-button
            @click="goPage('trade')"
            paddingW="24px"
            width="180px"
            height="50px"
          >
            {{ $t("korea.goTrade") }}
          </c-button>
          <c-button
            @click="goPage('login')"
            v-if="!isLogin"
            paddingW="24px"
            class="loginBtn"
            width="180px"
            height="50px"
          >
            {{ $t("korea.login") }}
          </c-button>
        </div>
        <div class="gg" v-if="noticeList.length > 0">
          <div class="gg-h">
            <span class="h4">{{ $t("korea.noticeInfo") }}</span>
            <span
              class="button"
              type="text"
              :class="'more x-3-cl'"
              @click="btnLink"
            >
              <!-- 更多 -->
              <!-- {{$t('home.more')}} -->
              <img :src="koMore" alt="" />
            </span>
          </div>
          <template v-for="(item, index) in noticeList">
            <p :key="index" v-if="index < 4" class="notice-item">
              <router-link class="x-2-cl" :to="'/noticeInfo/' + item.id">
                <i class="dian"></i>{{ item.noticeText }}
              </router-link>
            </p>
          </template>
        </div>
      </div>
    </div>
    <div class="makter-content">
      <!-- 推荐位 -->
      <div class="Recommend-box">
        <Recommend v-if="headerSymbol.length" :dataList="recommendDataList" />
      </div>
      <!-- 24小时行情 -->
      <div class="Market-box">
        <Market :dataList="marketDataList" :marketCurrent="marketCurrent" />
      </div>
    </div>
    <Custom :homeHtml="home_edit_html" :homeEditReady="homeEditReady"></Custom>
    <i v-if="!baseInfo"></i>
  </div>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/home/home';
import 'BlockChain-ui/PC/common-mixin/home/home/home.styl';
import mixin from 'BlockChain-ui/PC/common-mixin/home/home/korea/korea';
import 'BlockChain-ui/PC/common-mixin/home/home/korea/korea.styl';

import Custom from '../custom/korea.vue';
import Market from '../market/korea.vue';
import Recommend from '../recommend/korea.vue';

export default {
  mixins: [commonMixin, mixin],
  components: {
    Recommend,
    Market,
    Custom,
  },
  created() {
    this.init();
  },
};
</script>
