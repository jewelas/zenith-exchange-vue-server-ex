<template>
  <section class="lxgHome">
    <!-- 轮播图 -->
    <SwiperVue :slideList="slideList" :slideListTitle="slideListTitle"/>
    <!-- 公告 -->
    <div class="bulletinBoard">
      <template  v-if="noticeList.length > 0">
        <div class="bull-bar">
          <template v-for="(item, index) in noticeList">
            <p
              :key="index"
              v-if="index < 3"
              class="notice-item">
              <!-- <span class="new u-8-bd u-8-cl">
                <img :src="newImg" alt="">
              </span> -->
              <router-link class="hoverHide x-2-cl" :to="'/noticeInfo/' + item.id">
                {{item.noticeText}}
              </router-link>
              <router-link class="hoverShow x-1-cl" :to="'/noticeInfo/' + item.id">
                {{item.noticeText}}
              </router-link>
              /
            </p>
          </template>
          <span class="moreButton" @click="btnLink">
            <!-- <img :src="omGg" alt=""> -->
            More
          </span>
        </div>
      </template>
    </div>
    <!-- 推荐位 -->
    <!-- <Recommend v-if="headerSymbol.length" :dataList="recommendDataList"/> -->

    <!-- 24小时行情 -->
    <Market :dataList='marketDataList' :marketCurrent='marketCurrent'/>

    <div v-if="home_edit_html" v-html="home_edit_html"></div>
    <!-- 自定义模板 -->
    <Custom v-else :homeHtml='home_edit_html' :homeEditReady="homeEditReady"/>
    <!-- 自定义模板结束 -->
    <i v-if="!baseInfo"></i>
    <div class="product-re" :style="{backgroundImage: 'url(' + omBottombg + ')'}">
        <h2 class="title">{{$t('europe.regester.title')}}</h2>
        <p class="maker">{{$t('europe.regester.desc')}}</p>
        <div class="register">
          <c-inputFind
            :promptText="registerPlace"
            :value="registerInfo"
            @onchanges="registerChange"
            :inputStyle="inputStyle"
            name="register-infos"
            :iconHide=true
            className="register-infos"/>
          <c-button
            @click="goRegister"
            class="go-register-btn"
            height="50"
            paddingW="32px"
          >
            {{$t('europe.regester.goRegister')}}
          </c-button>
        </div>
      </div>
  </section>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/home/home';
import 'BlockChain-ui/PC/common-mixin/home/home/home.styl';
import mixin from 'BlockChain-ui/PC/common-mixin/home/home/lxg/lxg';
import 'BlockChain-ui/PC/common-mixin/home/home/lxg/lxg.styl';

import SwiperVue from '../swiper/lxg.vue';
// import Recommend from '../recommend/lxg.vue';
import Market from '../market/lxg.vue';
import Custom from '../custom/lxg.vue';


export default {
  mixins: [commonMixin, mixin],
  components: {
    // Recommend,
    Market,
    SwiperVue,
    Custom,
  },
  created() {
    this.init();
  },
};
</script>
