<template>
  <section class="europeHome">
    <!-- 轮播图 -->
    <SwiperVue :slideList="slideList" :slideListTitle="slideListTitle"/>
    <!-- 公告 -->
    <div class="bulletinBoard">
      <template  v-if="noticeList.length > 0">
        <div class="bull-bar">
          <template v-for="(item, index) in noticeList">
            <p
              :key="index"
              v-if="index < 1"
              class="notice-item">
              <span class="new u-8-bd u-8-cl">
                <img :src="newImg" alt="">
              </span>
              <router-link class="hoverHide x-2-cl" :to="'/noticeInfo/' + item.id">
                {{item.noticeText}}
              </router-link>
              <router-link class="hoverShow x-1-cl" :to="'/noticeInfo/' + item.id">
                {{item.noticeText}}
              </router-link>
            </p>
          </template>
          <span class="moreButton" @click="btnLink">
            <img :src="omGg" alt="">
          </span>
        </div>
      </template>
    </div>
    <!-- 推荐位 -->
    <Recommend v-if="headerSymbol.length" :dataList="recommendDataList"/>
    <!-- 自定义模板 -->
    <Custom :homeHtml='home_edit_html' :homeEditReady="homeEditReady"/>

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


    <!-- 自定义模板结束 -->
    <i v-if="!baseInfo"></i>
  </section>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/home/home';
import 'BlockChain-ui/PC/common-mixin/home/home/home.styl';
import mixin from 'BlockChain-ui/PC/common-mixin/home/home/europe/europe';
import 'BlockChain-ui/PC/common-mixin/home/home/europe/europe.styl';

import SwiperVue from '../swiper/europe.vue';
import Recommend from '../recommend/europe.vue';
import Custom from '../custom/europe.vue';

export default {
  mixins: [commonMixin, mixin],
  components: {
    Recommend,
    Custom,
    SwiperVue,
  },
  created() {
    this.init();
  },
};
</script>
