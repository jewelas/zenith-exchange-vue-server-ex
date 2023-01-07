<template>
  <div class="newTrade-themeSetting">
    <div class="modal"></div>
    <div class="newTrade-themeSetting_wrap a-7-bg" :class="{'newTrade-themeSetting_close': hide}">
      <h5 class="setting-title a-3-bd">
        <b class="b-1-cl">
          {{$t('header.set')}}
        </b>
        <span @click="setClose">
          <svg aria-hidden="true" class="icon icon-16">
            <use xlink:href='#icon-c_7'></use>
          </svg>
        </span>
      </h5>
      <div class="theme-bg">
        <h5 class="b-1-cl">{{$t('trade5.themeBg')}}</h5>
        <ul class="themeBg-value">
          <li v-for="(item, i) in colorList" :key="i">
            <c-redio @click="setSkin(item.skinId)"
              :value="Dskin === item.skinId"/>
            <template v-if="item.skinName && item.skinName[lan]">
              <span @click="setSkin(item.skinId)" class="b-1-cl">{{ item.skinName[lan] }}</span>
            </template>
            <template v-else>
              <span @click="setSkin(item.skinId)" class="b-1-cl">{{ item.mainClor }}</span>
            </template>
          </li>
        </ul>
      </div>
      <div class="theme-layout">
        <h5 class="b-1-cl">{{$t('trade5.tradeLayout')}}</h5>
        <ul>
          <li @click="setLayout('ord')">
            <div
              class="a-7-bd"
              @mouseover="layHover = 'ord'"
              @mouseout="layHover = null"
              :class="{'a-12-bd selected': layout === 'ord' || layHover === 'ord'}">
              <img :src="layoutImg[0]" alt="">
            </div>
            <span class="b-1-cl">{{$t('header.ord')}}</span>
          </li>
          <li @click="setLayout('pro')">
            <div
              class="a-7-bd"
              @mouseover="layHover = 'pro'"
              @mouseout="layHover = null"
              :class="{'a-12-bd selected': layout === 'pro' || layHover === 'pro'}">
              <img :src="layoutImg[1]" alt="">
            </div>
            <span class="b-1-cl">{{$t('header.pro')}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/newTrade/themeSetting/themeSetting';
import 'BlockChain-ui/PC/common-mixin/modules/newTrade/themeSetting/themeSetting.styl';

export default {
  name: 'themeSetting',
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
