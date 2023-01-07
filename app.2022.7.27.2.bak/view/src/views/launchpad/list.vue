<template>
  <div class="launchpad">
    <div class="launchpad-banner" :class="!liveList.length ? 'launchpad-banner-top' : ''">
        <div class="banner-text">
            <p class="banner-text1">{{$t('launchpad.text1')}}</p>
            <p class="banner-text2">{{$t('launchpad.text2')}}</p>
        </div>
    </div>
    <!-- 进行中项目 -->
    <div class="project-live" v-if="liveList.length">
      <div class="project-live-item"
        :key = "index"
        v-for="(item, index) in newLiveList" >
        <div class="live-item-title">{{$t('launchpad.text3')}}</div>
        <div class="live-item-content">
          <div class="live-item-content-left">
              <div class="item-content-left-logo">
                <img :src="item.launchpadBanner ?
                item.launchpadBanner : ''" alt="">
                <div class="left-logo-icon">
                  {{item.status === 3 ? $t('launchpad.text4') : $t('launchpad.text32')}}
                </div>
              </div>
              <div class="item-content-left-info">
                <p class="left-info-title">{{item.name}}</p>
                <p class="left-info-des">
                {{item.projectMassage}}
                </p>
                <div class="left-info-total">
                  <p>{{$t('launchpad.text34')}}</p>
                  <p class="left-info-value">
                    {{fixDFun(item.money, item.coinSymbol)}}
                    {{item.coinSymbol | getCoinShowName(coinList)}}
                  </p>
                </div>
                <div class="left-info-total" style="margin-bottom:0px;">
                  <p>{{$t('launchpad.text36')}}</p>
                  <div class="left-info-value">
                    <p class="val" v-if="item.orderType === 1">
                        1
                        {{ item.grantSymbol | getCoinShowName(coinList) }}
                        =
                        {{ fixDFun(item.initPriceV2, item.coinSymbol) }}
                        {{ item.coinSymbol | getCoinShowName(coinList) }}
                    </p>
                    <p class="val" v-else>
                        1 {{ item.coinSymbol | getCoinShowName(coinList) }}
                        =
                        {{ fixDFun(item.initPrice, item.grantSymbol) }}
                        {{ item.grantSymbol | getCoinShowName(coinList) }}
                    </p>
                  </div>
                </div>
              </div>
          </div>
          <div class="live-item-content-right">
            <div class="item-content-right-line">
              <p class="item-content-right-lineText">
                <span >
                    <!-- 融资总额 -->
                    <span class="content-right-lineText-name">{{$t('launchpad.text35')}}:</span>
                    {{fixDFun(item.money, item.coinSymbol)}}
                    {{item.coinSymbol | getCoinShowName(coinList)}}
                </span>
                <span>
                  {{countScale(item.speed ,100)}}%
                </span>
              </p>
              <div class="item-content-right-bar v5-17-bg">
                <div class="jdt-bar v5-1-bg"
                :style="{'width':countScale(item.speed ,100)  + '%'}">
                </div>
              </div>
            </div>
            <div class="item-content-right-btn v5-1-bg" @click="submit(item.projectId)">
              <!-- Participate -->
              {{$t('launchpad.text6')}}
            </div>
          </div>
        </div>
        <div class="live-item-icon">
          <div class="live-item-content-icon">
            <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627182750549.png"
            v-if='item.shareConfiguration && item.shareConfiguration.twitter'
            @click="openNew(item.shareConfiguration.twitter)"
            />
            <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627182806218.png"
            v-if='item.shareConfiguration && item.shareConfiguration.telegram'
            @click="openNew(item.shareConfiguration.telegram)"
            />
            <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627182827300.png"
            v-if='item.shareConfiguration && item.shareConfiguration.discord'
            @click="openNew(item.shareConfiguration.discord)"
            />
            <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627182725156.png"
            v-if='item.shareConfiguration && item.shareConfiguration.other'
            @click="openNew(item.shareConfiguration.other)"
            />
          </div>
        </div>
      </div>
    </div>
    <div @click="seeMore('liveCount')" v-if="!noMore1" class="seeMore">
      <!-- See More -->
      {{$t('launchpad.text7')}}
      <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220705163352514.svg" alt="" style="width: 10px;">
      <!-- <svg class="icon icon-10"
      style="font-size: 10px;margin-top: 0px;position: absolute;top: 6px;right: 8px;"
        aria-hidden="true">
        <use xlink:href="#icon-v5_25" />
      </svg> -->
    </div>
    <!-- 即将开始项目 -->
    <div class="project-normal" >
      <div class="project-normal-title">{{$t('launchpad.text8')}}</div>
      <div class="project-normal-list" v-if="upcomingList.length">
        <div class="project-normal-item fuz-card-plain" :key = "index"
          v-for="(item, index) in newUpcomingList">
            <div class="normal-item-logo">
                <img :src="item.launchpadBanner ?
                item.launchpadBanner : 'https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220705112302185.png'" alt="">
                <div class="normal-item-logo-icon">
                  <!-- Upcoming -->
                  {{$t('launchpad.text9')}}
                </div>
            </div>
            <div class="normal-item-content">
               <div class="normal-item-conten-title">
                  <div class="item-conten-title-name">
                      {{item.name}}
                  </div>
                  <div class="item-conten-title-logo">
                    <img :src="item.logo" alt="" />
                  </div>
               </div>
               <div class="normal-item-conten-icon">
                  <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627182750549.png"
                  v-if='item.shareConfiguration && item.shareConfiguration.twitter'
                  @click="openNew(item.shareConfiguration.twitter)"
                  />
                  <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627182806218.png"
                  v-if='item.shareConfiguration && item.shareConfiguration.telegram'
                  @click="openNew(item.shareConfiguration.telegram)"
                  />
                  <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627182827300.png"
                  v-if='item.shareConfiguration && item.shareConfiguration.discord'
                  @click="openNew(item.shareConfiguration.discord)"
                  />
                  <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627182725156.png"
                  v-if='item.shareConfiguration && item.shareConfiguration.other'
                  @click="openNew(item.shareConfiguration.other)"
                  />
               </div>
               <div class="normal-item-conten-data">
                  <div class="item-conten-data-name">
                    <!-- Total Raise -->
                    {{$t('launchpad.text34')}}
                  </div>
                  <div class="item-conten-data-value">
                    {{fixDFun(item.money, item.coinSymbol)}}
                    {{item.coinSymbol | getCoinShowName(coinList)}}
                  </div>
               </div>
               <div class="normal-item-conten-data">
                  <div class="item-conten-data-name">
                    <!-- Sale Price -->
                    {{$t('launchpad.text36')}}
                  </div>
                  <div class="item-conten-data-value">
                    {{fixDFun(item.money, item.coinSymbol)}}
                    {{item.coinSymbol | getCoinShowName(coinList)}}
                  </div>
               </div>
               <div class="normal-item-conten-data">
                  <div class="item-conten-data-name">
                    <!-- Starts -->
                    {{$t('launchpad.text27')}}
                  </div>
                  <div class="item-conten-data-value">
                      {{formatTimeFn(item.startTime)}}
                  </div>
               </div>
            </div>
            <div class="normal-item-btn v5-17-bg v5-1-cl" @click="submit(item.projectId)">
              <!-- See Details -->
              {{$t('launchpad.text10')}}
            </div>
        </div>
      </div>
      <div class="project-nodata" v-else>
        <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627190134634.png" alt="">
        <p>
          <!-- 暂无数据 -->
          {{$t('common.notData')}}
        </p>
      </div>
    </div>
    <div @click="seeMore('upcomingCount')" v-if="!noMore2" class="seeMore">
      <!-- See More -->
      {{$t('launchpad.text7')}}
      <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220705163352514.svg" alt="" style="width: 10px;">

      <!-- <svg class="icon icon-12"
      style="font-size: 10px;margin-top: 0px;position: absolute;top: 6px;right: 8px;"
        aria-hidden="true">
        <use xlink:href="#icon-v5_25" />
      </svg> -->
    </div>
    <!-- 已结束项目 -->
    <div class="project-normal" >
      <div class="project-normal-title">{{$t('launchpad.text11')}}</div>
      <div class="project-normal-list" v-if="endList.length">
        <div class="project-normal-item fuz-card-plain" :key = "index"
          v-for="(item, index) in newEndList">
            <div class="normal-item-logo">
                <img :src="item.launchpadBanner ?
                item.launchpadBanner : 'https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220705112302185.png'" alt="">
                <div class="normal-item-logo-icon funded">
                  <!-- Funded -->
                  {{$t('launchpad.text12')}}
                </div>
            </div>
            <div class="normal-item-content">
               <div class="normal-item-conten-title">
                  <div class="item-conten-title-name">
                      {{item.name}}
                  </div>
                  <div class="item-conten-title-logo">
                    <img :src="item.logo" alt="" />
                  </div>
               </div>
               <div class="normal-item-conten-icon">
                  <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627182750549.png"
                  v-if='item.shareConfiguration && item.shareConfiguration.twitter'
                  @click="openNew(item.shareConfiguration.twitter)"
                  />
                  <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627182806218.png"
                  v-if='item.shareConfiguration && item.shareConfiguration.telegram'
                  @click="openNew(item.shareConfiguration.telegram)"
                  />
                  <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627182827300.png"
                  v-if='item.shareConfiguration && item.shareConfiguration.discord'
                  @click="openNew(item.shareConfiguration.discord)"
                  />
                  <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627182725156.png"
                  v-if='item.shareConfiguration && item.shareConfiguration.other'
                  @click="openNew(item.shareConfiguration.other)"
                  />
               </div>
               <div class="normal-item-conten-data">
                  <div class="item-conten-data-name">
                    <!-- Total Raise -->
                    {{$t('launchpad.text34')}}
                  </div>
                  <div class="item-conten-data-value">
                    {{fixDFun(item.money, item.coinSymbol)}}
                    {{item.coinSymbol | getCoinShowName(coinList)}}
                  </div>
               </div>
               <div class="normal-item-conten-data">
                  <div class="item-conten-data-name">
                    <!-- Sale Price -->
                    {{$t('launchpad.text36')}}
                  </div>
                  <div class="item-conten-data-value">
                    {{fixDFun(item.money, item.coinSymbol)}}
                    {{item.coinSymbol | getCoinShowName(coinList)}}
                  </div>
               </div>
               <div class="normal-item-conten-data">
                  <div class="item-conten-data-name">
                    <!-- Starts -->
                    {{ $t("launchpad.text26") }}
                  </div>
                  <div class="item-conten-data-value">
                      {{formatTimeFn(item.endTime)}}
                  </div>
               </div>
            </div>
            <div class="normal-item-btn v5-17-bg v5-1-cl" @click="submit(item.projectId)">
              <!-- See Details -->{{$t('launchpad.text10')}}
            </div>
        </div>
      </div>
      <div class="project-nodata" v-else>
        <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627190134634.png" alt="">
        <p>
          <!-- 暂无数据 -->
          {{$t('common.notData')}}
        </p>
      </div>
    </div>
    <div @click="seeMore('endCount')" v-if="!noMore3" class="seeMore">
      <!-- See More -->
      {{$t('launchpad.text7')}}
      <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220705163352514.svg" alt="" style="width: 10px;">

      <!-- <svg class="icon icon-10"
      style="font-size: 10px;margin-top: 0px;position: absolute;top: 6px;right: 8px;"
        aria-hidden="true">
        <use xlink:href="#icon-v5_25" />
      </svg> -->
    </div>
    <!-- 自定义区域 -->
    <div class="custom-box" v-if="customOpen && custom !== 'launchpad_footer_html'">
      <!-- <div class="custom-box-top">
        <div class="custom-box-top-content">
          <div class="custom-box-top-left">
            <div class="custom-top-left-title">
              Launch your project on xINVESTOR
            </div>
            <div class="custom-top-left-des">
               services
            </div>
            <a class="custom-top-left-btn v5-1-bg" href='https://www.baidu.com' target="_blank">
              Apply to Launch
            </a>
          </div>
          <div class="custom-box-top-right">
            <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627184032777.png" alt="" />
          </div>
        </div>
      </div>
      <div class="custom-box-bottom">
        <div class="custom-box-bottom-content">
          <div class="custom-box-bottom-title">Learn About xINVESTOR</div>
          <div class="custom-box-bottom-img">
            <a class="custom-box-bottom-img-box" href='https://www.baidu.com' target="_blank">
              <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627184059905.png" alt="" class="v5-17-bg"/>
              <div class="custom-box-bottom-img-boxText">How to buy the xINVESTOR $INV token?</div>
            </a>
            <a class="custom-box-bottom-img-box" href='https://www.baidu.com' target="_blank">
              <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627184118896.png" alt="" class="v5-17-bg" />
              <div class="custom-box-bottom-img-boxText">
              What is an IEO (initial exchange offering)</div>
            </a>
          </div>
        </div>

      </div> -->
      <div v-html="custom"></div>
    </div>
    <!-- 去注册 -->
    <div v-if="isLogin" style="height:120px"></div>
    <div class="go-register" v-if="!isLogin">
      <h1 class="go-register-title">
        {{$t('home.custom_text25')}}
      </h1>
      <p>
        {{$t('home.custom_text26')}}
      </p>
      <a href="/register" class="v5-1-bg">
        <span>{{$t('home.custom_text27')}}</span>
        <span>→</span>
        <span class="btn-hover"></span>
      </a>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/launchpad/list/list';
import 'BlockChain-ui/PC/common-mixin/launchpad/list/list.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.launchpad {
  background: transparent;
}
.launchpad >>> .custom-box-top{
  background: transparent !important;
}

.launchpad >>> .custom-box-bottom-title,
.launchpad >>> .custom-top-left-title,
.launchpad >>> .go-register-title,
.launchpad >>> .project-normal-title,
.launchpad >>> *
{
  color: #fff !important;
  font-family: Inter;
}
.project-normal {
  width: 1280px !important
}
.go-register {
  background: transparent;
}
</style>
