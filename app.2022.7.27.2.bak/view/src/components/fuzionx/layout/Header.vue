<template>
  <div class="header-container" :class="{mask: scrollY > 10}">
  <header class="v5-header h-1-bg" :class="{ 'int-header': navigationType === '2'}">
    <!-- 中国版 -->
    <i v-if="!logoUrl"></i>
    <section v-if="navigationType === '1' && headerTemplateReceived" class="v5-header_wrap">
      <!-- 主流板块 -->
      <div class="header-nav_section">
        <!-- logo -->
        <div class="logo-icon">
          <a @click="btnHref(headerLink.home)">
            <img src="../../../assets/fuzionx/images/logo.png" />
          </a>
        </div>
        <ul class="header-nav_wrap navigation-type_one" v-if="navType === '1'">
          <!-- 导航 -->
          <li
            v-for="(item, index) in headerList"
            :key="index"
            class="header-nav_item"
            :class="{'v5-1-cl': navHover === item.id}"
            @click="btnHref(item.httpUrl)"
            @mouseover="navHover = item.id"
            @mouseout="navHover = null"
          >
            <span>
              {{ item.title }}
              <span v-if="item.childList && item.childList.length > 0">
                <svg class="icon icon-12 hoverHide" aria-hidden="true">
                  <use xlink:href="#icon-v5_1_1"></use>
                </svg>
                <svg class="icon icon-12 hoverShow" aria-hidden="true">
                  <use xlink:href="#icon-v5_1_h"></use>
                </svg>
              </span>
            </span>
            <ul class="header-subNav_wrap" v-if="item.childList && item.childList.length > 0">
              <li
                v-for="(sub, i) in item.childList"
                :key="i"
                class="header-subNav_item"
                :class="{'v5-1-cl': subNavHover === sub.id}"
                @click.stop="btnHref(sub.httpUrl)"
                @mouseover="subNavHover = item.id"
                @mouseout="subNavHover = null"
              >
                {{ sub.title }}
              </li>
            </ul>
          </li>
        </ul>
        <ul class="header-nav_wrap navigation-type_two" v-else>
          <!-- 导航 -->
          <li
            v-for="(item, index) in headerList"
            :key="index"
            class="header-nav_item"
            :class="{'v5-1-cl': navHover === item.id}"
            @click="btnHref(item.httpUrl)"
            @mouseover="navHover = item.id"
            @mouseout="navHover = null"
          >
            <span>
              {{ item.title }}
              <span v-if="item.childList && item.childList.length > 0">
                <svg class="icon icon-12 hoverHide" aria-hidden="true">
                  <use xlink:href="#icon-v5_1_1"></use>
                </svg>
                <svg class="icon icon-12 hoverShow" aria-hidden="true">
                  <use xlink:href="#icon-v5_1_h"></use>
                </svg>
              </span>
            </span>
            <ul class="header-subNav_wrap" v-if="item.childList && item.childList.length > 0">
              <li
                v-for="(sub, i) in item.childList"
                :key="i"
                class="header-subNav_item"
                :class="{'v5-1-cl': subNavHover === sub.id}"
                @click.stop="btnHref(sub.httpUrl)"
                @mouseover="subNavHover = item.id"
                @mouseout="subNavHover = null"
              >
                <img class="logo" :src="sub.logo" alt="" />
                <dl>
                  <dt class="title">{{ sub.title }}</dt>
                  <dd class="subTitle">{{ sub.subTitle }}</dd>
                </dl>
                <span class="active-icon">
                  <svg class="icon icon-16" aria-hidden="true">
                    <use xlink:href="#icon-v5_18"></use>
                  </svg>
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 公共版款 -->
      <div class="header-options_wrap">
        <!-- 语言 -->
        <div class="header-language">
          <div
            class="lang-selected"
            :class="{'v5-1-cl': navHover === 'language'}"
            @mouseover="handMouseenter('language')"
            @mouseout="handMouseleave"
          >
            <span>{{ showLan }}</span>
            <svg class="icon icon-12 hoverHide" aria-hidden="true">
              <use xlink:href="#icon-v5_1_1"></use>
            </svg>
            <svg class="icon icon-12 hoverShow" aria-hidden="true">
              <use xlink:href="#icon-v5_1_h"></use>
            </svg>
          </div>
          <div class="langAndCurrency-list">
            <div class="lang-list_wrap">
              <ul class="header-lang_list  fuz-scroller"
                @mouseover="handMouseenter('language')"
                @mouseout="handMouseleave"
              >
                <li
                  class="header-lang_item"
                  v-for="(item, index) in langArr"
                  :class="{
                    'active v5-1-cl' : langHover === item.id,
                    active: lan === item.id
                  }"
                  @mouseover="langHover = item.id"
                  @mouseout="langHover = null"
                  @click="lanClick(item.id)"
                  :key="index"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 语言结束 -->
        <!-- 币种 -->
        <div class="header-language">
          <div
            class="lang-selected"
            :class="{'v5-1-cl': navHover === 'currency'}"
            @mouseover="handMouseenter('currency')"
            @mouseout="handMouseleave"
          >
            <span>{{ showCurrency }}</span>
            <svg class="icon icon-12 hoverHide" aria-hidden="true">
              <use xlink:href="#icon-v5_1_1"></use>
            </svg>
            <svg class="icon icon-12 hoverShow" aria-hidden="true">
              <use xlink:href="#icon-v5_1_h"></use>
            </svg>
          </div>
          <div class="langAndCurrency-list ">
            <div v-if="currencyList.length" class="lang-list_wrap">
              <ul class="header-lang_list fuz-scroller"
                @mouseover="handMouseenter('currency')"
                @mouseout="handMouseleave"
              >
                <li
                  class="header-lang_item"
                  v-for="(item, index) in currencyList"
                  :class="{
                    'active v5-1-cl' : currencyHover === item.lan,
                    active: userCurrency === item.lan
                  }"
                  @mouseover="currencyHover = item.lan"
                  @mouseout="currencyHover = null"
                  @click="currencyClick(item.lan)"
                  :key="index"
                >
                  {{ item.text }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 币种结束 -->
        <!-- 未登录时 -->
        <div class="header-sign" v-if="!isLogin && userInfoIsReady">
          <fuz-button
            color="#fff"
            ghost :border="false"
            v-if="loginHide === '0'"
            @click="btnLink('/login')"
            :class="{'v5-1-cl': navHover === 'login'}"
            @mouseover="handMouseenter('login')"
            @mouseout="handMouseleave"
            >
            <!-- 登录 -->
            {{ $t('header.login') }}
          </fuz-button>
          <fuz-button
            animation
            ghost
            color="#fff"
            v-if="registerHide === '0'"
            @click="btnLink('/register')">
            <!-- 注册 -->
            {{ $t('header.register') }}
            <i class="hover-layout"></i>
          </fuz-button>
        </div>
        <div class="header-isLogin_options" v-if="isLogin && userInfoIsReady">
          <!-- 资产 -->
          <div class="header-options_title">
            <div
              class="header-options_title--text"
              :class="{'v5-1-cl': navHover === 'assets'}"
              @mouseover="handMouseenter('assets')"
              @mouseout="handMouseleave"
              @click="btnLink('/newAssets')">
              {{ $t('header.assets') }}
            </div>
            <ul class="options-list">
              <li
                class="options-list_item"
                v-for="(item, index) in assetsList"
                @click="btnLink(item.link)"
                :class="{'v5-1-cl': subNavHover === 'assets' + index}"
                @mouseover="handMouseenter('assets' + index, 'sub')"
                @mouseout="handMouseleave('sub')"
                :key="index"
              >
                {{ item.title }}
              </li>
            </ul>
          </div>
          <!-- 订单 -->
          <div class="header-options_title">
            <div
              class="header-options_title--text"
              :class="{'v5-1-cl': navHover === 'order'}"
              @mouseover="handMouseenter('order')"
              @mouseout="handMouseleave"
              @click="btnLink('order')">
              {{ $t('header.order') }}
            </div>
            <ul class="options-list">
              <li
                class="options-list_item"
                v-for="(item, index) in orderList"
                @click="btnLink(item.link)"
                :class="{'v5-1-cl': subNavHover === 'order' + index}"
                @mouseover="handMouseenter('order' + index, 'sub')"
                @mouseout="handMouseleave('sub')"
                :key="index"
              >
                {{ item.title }}
              </li>
            </ul>
          </div>
        </div>
        <!-- 设置 -->
        <!-- <div class="header-options_title header-setting_icon" v-if="colorList.length > 1">
          <div @click="setAlert" class="icon-static">
            <svg v-if="userSkin === '2'" class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-v5_9_1" />
            </svg>
            <svg v-else class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-v5_8_1" />
            </svg>
          </div>
          <div @click="setAlert" class="icon-hover">
            <svg v-if="userSkin === '2'" class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-v5_9_h" />
            </svg>
            <svg v-else class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-v5_8_h" />
            </svg>
          </div>
        </div> -->
        <!-- 消息中心 -->
        <div
          class="header-options_title header-setting_icon header-message"
          v-if="isLogin && userInfoIsReady"
        >
          <div class="messageCount" v-if="messageCount"></div>
          <div @click="btnLink('/mesage')" class="icon-static">
            <svg class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-v5_5_1" />
            </svg>
          </div>
          <div @click="btnLink('/mesage')" class="icon-hover">
            <svg class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-v5_5_h" />
            </svg>
          </div>
          <div v-if="messageCount" class="header-message_info">
            <ul class="header-message_list">
              <li
                class="header-message_item"
                @click="btnLink('/mesage')"
                :key="index"
                v-for="(item, index) in userMessageList"
              >
                {{ item.messageContent }}
              </li>
            </ul>
            <div class="header-message_more v5-1-cl" @click="btnLink('/mesage')">
              <!-- 查看更多 -->
              {{ $t('header.more') }}
            </div>
          </div>
        </div>
        <!-- 个人中心 -->
        <div
          class="header-options_title header-setting_icon header-message"
          v-if="isLogin && userInfoIsReady"
        >
          <div @click="btnLink('/personal/userManagement')" class="icon-static">
            <svg class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-v5_2_1" />
            </svg>
          </div>
          <div @click="btnLink('/personal/userManagement')" class="icon-hover">
            <svg class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-v5_2_h" />
            </svg>
          </div>
          <div class="header-message_userinfo">
            <div class="userinfo">
              <div class="v5-5-cl userText">{{ userText }}</div>
              <!-- 账户状态 -->
              <div class="v5-6-cl userStatus">{{ $t('header.userStatus') }}：{{ userStatus }}</div>
            </div>
            <ul class="header-message_userlist">
              <li class="header-message_useritem"
              @click="btnLink('/personal/userManagement')"
              :class="{'v5-1-cl': isHover1}"
              @mouseover="isHover1=true"
              @mouseout="isHover1=false">
               <span class='icon icon-user fuz-grey' style='margin-right: 6px' />
                <!-- 账号管理 -->
                {{$t('personal.navMenu.list.userManagement')}}
              </li>
              <li class="header-message_useritem"
              v-if="linkurl.otcUrl"
              @mouseover="isHover2=true"
              @mouseout="isHover2=false"
              :class="{'v5-1-cl': isHover2}"
              @click="btnLink('/personal/leaglTenderSet')">
                <span class='icon icon-control fuz-grey' style='margin-right: 6px' />
                <!-- C2C设置 -->
                 {{$t('personal.navMenu.list.leaglTenderSet')}}
              </li>
              <li class="header-message_useritem"
              v-if="openapiHide === '1'"
              @mouseover="isHover3=true"
              @mouseout="isHover3=false"
              :class="{'v5-1-cl': isHover3}"
              @click="btnLink('/personal/apiManagement')">
                <span class='icon icon-gear fuz-grey' style='margin-right: 6px' />
                <!-- API管理 -->
                {{$t('personal.navMenu.list.apiManagement')}}
              </li>
              <li class="header-message_useritem"
              @mouseover="isHover4=true"
              @mouseout="isHover4=false"
              :class="{'v5-1-cl': isHover4}"
              @click="btnLink('/promotion')">
                <span class='icon icon-invite fuz-grey' style='margin-right: 6px' />
                <!-- 邀请好友 -->
                {{$t('invitePrize.invite_friends')}}
              </li>
            </ul>
            <div class="header-message_useritem" @click="out"
              :class="{'v5-1-cl': isHover5}"
              @mouseover="isHover5=true"
              @mouseout="isHover5=false">
              <span class='icon icon-log-out fuz-grey' style='margin-right: 6px' />
              <!-- 退出 -->
              {{ $t('header.out') }}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-else-if="headerTemplateReceived" class="int-header_wrap">
      <!-- 主流板块 -->
      <ul class="int-header-linkList">
        <!-- logo -->
        <li>
          <a class="button-logo" @click="btnHref(headerLink.home)">
            <img :src="intLogoUrl" />
          </a>
        </li>
        <li
          class="int-header-nav_item"
          v-for="(item, index) in headerList"
          :class="{'v5-1-cl h-4-bg': navHover === item.id}"
          :key="index"
          @click="btnHref(item.httpUrl)"
          @mouseover="navHover = item.id"
          @mouseout="navHover = null">
          <img class="nav-item_icon" :src="item.logo" alt="">
          <span class="nav-item_title">{{item.title}}</span>
          <ul
            v-if="navType === '1' && item.childList && item.childList.length > 0"
            class="int-header-subNav_wrap">
            <li
              v-for="(sub, i) in item.childList"
              :key="i"
              class="int-header-subNav_item"
              :class="{'v5-1-cl': subNavHover === sub.id}"
              @click.stop="btnHref(sub.httpUrl)"
              @mouseover="subNavHover = sub.id"
              @mouseout="subNavHover = null"
            >
              {{ sub.title }}
            </li>
          </ul>
          <ul
            v-else-if="item.childList && item.childList.length > 0"
              class="int-header-subNav_wrap int-header-subNav_wrap--b">
            <li
              v-for="(sub, i) in item.childList"
              :key="i"
              class="int-header-subNav_item"
              :class="{'v5-1-cl': subNavHover === sub.id}"
              @click.stop="btnHref(sub.httpUrl)"
              @mouseover="subNavHover = sub.id"
              @mouseout="subNavHover = null"
            >
              <img class="logo" :src="sub.logo" alt="" />
              <dl>
                <dt class="title">{{ sub.title }}</dt>
                <dd class="subTitle">{{ sub.subTitle }}</dd>
              </dl>
              <span class="active-icon">
                <svg class="icon icon-16" aria-hidden="true">
                  <use xlink:href="#icon-v5_18"></use>
                </svg>
              </span>
            </li>
          </ul>
        </li>
        <!-- 资产 -->
        <li
          v-if="isLogin && userInfoIsReady"
          class="int-header-nav_item"
          :class="navHover === 'assets' || router === 'assets' ? 'h-4-bg v5-1-cl' : ''"
          @mouseover="handMouseenter('assets')"
          @mouseleave="handMouseleave('assets')"
          @click="btnLink('/assets/exchangeAccount')"
        >
          <svg
            v-if="navHover === 'assets' || router === 'assets'"
            class="icon icon-18"
            aria-hidden="true"
          >
            <use xlink:href="#icon-b_27_1" />
          </svg>
          <svg v-else class="icon icon-18" aria-hidden="true">
            <use xlink:href="#icon-b_27" />
          </svg>
          <!-- <span class="nav-item_title">{{ $t('header.assets') }}</span> -->
          <span class="nav-item_title">Wallet</span>
        </li>
        <!-- 订单 -->
        <li
          v-if="isLogin && userInfoIsReady"
          class="int-header-nav_item"
          :class="navHover === 'order' || router === 'order' ? 'h-4-bg v5-1-cl' : ''"
          @mouseover="handMouseenter('order')"
          @mouseleave="handMouseleave('order')"
          @click="btnLink('order')"
        >
          <svg
            v-if="navHover === 'order' || router === 'order'"
            class="icon icon-18"
            aria-hidden="true"
          >
            <use xlink:href="#icon-b_27_1"></use>
          </svg>
          <svg v-else class="icon icon-18" aria-hidden="true">
            <use xlink:href="#icon-b_27"></use>
          </svg>
          <span class="nav-item_title">
            {{ $t('header.order') }}
          </span>
        </li>
        <!-- 个人中心 -->
        <li
          class="int-header-nav_item"
          :class="navHover === 'Account' || router === 'personal' ? 'h-4-bg x-3-cl' : ''"
          @mouseover="handMouseenter('Account')"
          @mouseleave="handMouseleave('Account')"
        >
          <i class="iconClass" style="top: 19px;">
            <svg
              v-if="navHover === 'Account' || router === 'personal'"
              class="icon icon-18"
              aria-hidden="true"
            >
              <use xlink:href="#icon-b_4_1" />
            </svg>
            <svg v-else class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-b_4" />
            </svg>
          </i>
          <span class="nav-item_title">
            <!-- 用户中心 -->
            {{ $t('header.account') }}
          </span>
          <div class="header-message_userinfo" v-if="isLogin && userInfoIsReady">
            <div class="userinfo">
              <div class="v5-5-cl userText">{{ userText }}</div>
              <!-- 账户状态 -->
              <div class="v5-6-cl userStatus">{{ $t('header.userStatus') }}：{{ userStatus }}</div>
            </div>
            <ul class="header-message_userlist">
              <li class="header-message_useritem"
              @click="btnLink('/personal/userManagement')"
              @mouseover="isHover1=true"
              :class="{'v5-1-cl': isHover1}"
              @mouseout="isHover1=false">
                <!-- 账号管理 -->
                {{$t('personal.navMenu.list.userManagement')}}
              </li>
              <li class="header-message_useritem"
              @mouseover="isHover2=true"
              :class="{'v5-1-cl': isHover2}"
              @mouseout="isHover2=false"
              @click="btnLink('/promotion')">
                <!-- 邀请好友 -->
                {{$t('invitePrize.invite_friends')}}
              </li>
            </ul>
            <div class="header-message_useritem loginOut"
            @mouseover="isHover3=true"
            :class="{'v5-1-cl': isHover3}"
            @mouseout="isHover3=false"
             @click="out">
              <!-- 退出 -->
              {{ $t('header.out') }}
            </div>
          </div>
        </li>
      </ul>
      <!-- 公共版款 -->
      <ul class="int-header-linkList nav-bottom">
        <!-- 消息 -->
        <li
          v-if="isLogin && userInfoIsReady"
          class="int-header-nav_item"
          :class="navHover === 'Message' ? 'h-4-bg x-3-cl' : ''"
          @click="btnLink('/mesage')"
          @mouseover="handMouseenter('Message')"
          @mouseleave="handMouseleave('Message')"
        >
          <div class="messageCount" v-if="messageCount"></div>
          <svg class="icon icon-18 hover-hide" aria-hidden="true">
            <use xlink:href="#icon-b_3" />
          </svg>
          <svg class="icon icon-18 hover-show" aria-hidden="true">
            <use xlink:href="#icon-b_3_1" />
          </svg>
          <span class="nav-item_title">
            <!-- 消息 -->
            {{ $t('header.message') }}
          </span>
        </li>
        <!-- 设置 -->
        <li
          v-if="colorList.length > 1"
          class="int-header-nav_item"
          :class="navHover === 'Setting' ? 'h-4-bg x-3-cl' : ''"
          @click="setAlert"
          @mouseover="handMouseenter('Setting')"
          @mouseleave="handMouseleave('Setting')"
        >
          <svg class="icon icon-18 hover-hide" aria-hidden="true">
            <use xlink:href="#icon-b_2" />
          </svg>
          <svg class="icon icon-18 hover-show" aria-hidden="true">
            <use xlink:href="#icon-b_2_1" />
          </svg>
          <span class="nav-item_title">
            <!-- 设置 -->
            {{ $t('header.set') }}
          </span>
        </li>
        <!-- 国际化 切换语言 -->
        <li
          class="int-header-nav_item showLan"
          :class="navHover === 'showLan' ? 'h-4-bg x-3-cl' : ''"
          @mouseover="handMouseenter('showLan')"
          @mouseleave="handMouseleave('showLan')"
        >
          <div class="lang-selected">
            {{ showLan }}
          </div>
          <div class="langAndCurrency-list">
            <div class="lang-list_wrap">
              <div class="list-title">Language</div>
              <ul class="header-lang_list">
                <li
                  class="header-lang_item"
                  v-for="(item, index) in langArr"
                  :class="{
                    'active v5-1-cl': currencyHover === item.lan,
                    active:lan === item.lan
                  }"
                  @mouseover="handMouseenter(item.id)"
                  @mouseout="handMouseleave(item.id)"
                  @click="lanClick(item.id)"
                  :key="index"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
        </li>
        <!-- 切换货币 -->
        <li
          class="int-header-nav_item showLan"
          :class="navHover === 'showLan' ? 'h-4-bg x-3-cl' : ''"
          @mouseover="handMouseenter('showLan')"
          @mouseleave="handMouseleave('showLan')"
        >
          <div class="lang-selected">
            {{ showCurrency }}
          </div>
          <div class="langAndCurrency-list">
            <div class="lang-list_wrap">
              <div class="list-title">Currency</div>
              <ul class="header-lang_list">
                <li
                  class="header-lang_item"
                  v-for="(item, index) in currencyList"
                  :class="{
                    'active v5-1-cl': currencyHover === item.lan,
                    active:userCurrency === item.lan
                  }"
                  @mouseover="currencyHover = item.lan"
                  @mouseout="currencyHover = null"
                  @click="currencyClick(item.lan)"
                  :key="index"
                >
                  {{ item.text }}
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <c-dialog
      v-if="headerTemplateReceived"
      :showFlag="showFlag"
      :titleText="$t('header.set')"
      @confirm="setConfirm"
      @close="setClose"
    >
      <div class="setBox">
        <div class="setColor clearfix">
          <div class="setColor-key x-2-cl">{{ $t('header.color') }}</div>
          <ul class="setColor-value">
            <li v-for="(item, i) in colorList" :key="i">
              <c-redio @click="setSkin(item.skinId)" :value="Dskin === item.skinId" />
              <template v-if="item.skinName && item.skinName[lan]">
                <span @click="setSkin(item.skinId)" class="b-1-cl">{{ item.skinName[lan] }}</span>
              </template>
              <template v-else>
                <span @click="setSkin(item.skinId)" class="b-1-cl">{{ item.mainClor }}</span>
              </template>
            </li>
          </ul>
        </div>
      </div>
    </c-dialog>
  </header>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/v5Header/index';
import 'BlockChain-ui/PC/common-mixin/modules/v5Header/index.styl';

export default {
  mixins: [mixin],
  data() {
    return { scrollY: 0 };
  },
  mounted() {
    this.init();
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      this.scrollY = window.scrollY;
    },
  },
};
</script>
<style lang="stylus" scoped>
.header-container{
  border-bottom:1px solid #35363F;
  position:fixed;
  top:0;
  left:0;
  right:0;
  z-index:99;
}
.header-container:before {
  content:'';
  display:block;
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  top:0;
  transform: translateY(-100%);
  z-index:0;
  background:rgba(0,0,0,.9);
  transition: all .4s ease-in-out;
}
.header-container.mask:before {
  transform: translateY(0);
}
.v5-header .v5-header_wrap .header-options_wrap .header-sign {
  margin-right: 0;
}
.logo-icon {
  padding-left: 0px !important;
}
.logo-icon img{
  width: 180px;
  max-width: 180px !important;
  max-height: auto !important;
}
.v5-header {
  background: transparent !important;
  padding: 30px 15px;
  height: auto !important;
  box-sizing: border-box;
  max-width: 1280px;
  margin: 0 auto;
  height: 118px !important;
  position:relative;
  z-index:1;
}
.v5-header >>> .header-nav_item {
  font-size:16px !important;
  font-weight: 600;
  line-height: 1 !important;
  height: 60px;
  display:flex;
  align-items:center;
  white-space: nowrap;
}
.header-subNav_wrap, .langAndCurrency-list, .options-list,.header-message_userinfo {
  background-color: rgb(64, 67, 63) !important;
  border-radius: 10px;
  overflow: hidden !important;
  white-space: nowrap;
  max-width: unset !important;
  padding: 0 !important;
  left:50% !important;
  min-width: 120px !important;
  border-radius: 10px !important;
  transform: translateX(-50%);
  width: max-content;
  box-shadow: rgb(0 0 0 / 20%) 0px 5px 5px -3px,
              rgb(0 0 0 / 14%) 0px 8px 10px 1px,
              rgb(0 0 0 / 12%) 0px 3px 14px 2px;
}
.lang-list_wrap {
  padding:0 !important;
}
.header-message_userlist {
  padding:0px !important;
}
.loginOut {
  border:none !important;
}
.header-subNav_item, .header-lang_item, .options-list_item, .header-message_useritem{
  color: #fff !important;
  border-radius: 0 !important;
  text-align: center !important;
  min-width: 120px !important;
  height: 34px !important;
  line-height: 34px !important;
  font-size:16px !important;
  font-family: Inter;
  &:hover {
    background: #535957 !important;
  }
  &.active {
    background: #535957 !important;
  }
  img {
    display:none !important;
  }
  dt {
    color: #fff !important;
  }
  dd {
    display:none;
  }
  .active-icon {
    display:none !important;
  }
}
.header-message_useritem {
  text-align: left !important;
  font-size:14px !important;
}
.register-btn {
  font-size:16px;
}
.hoverHide, .hoverShow {
  width: 0.8em !important;
  height: 0.8em !important;
}
.lang-selected {
  line-height: 1 !important;
  height: 60px;
  display:flex;
  align-items:center;
  white-space: nowrap;
  .icon{
    margin-left:3px;
  }
  .hoverShow {
    display:none;

  }
  .hoverHide {
    display:inline-block;
  }
}
.lang-selected.v5-1-cl {
  .hoverShow {
    display:inline-block;
  }
  .hoverHide {
    display:none;
  }
}
.login-btn {
  font-size: 16px !important;
}
/deep/ .header-sign{
  &:last-child{
    margin-right:0 !important;
  }
}
</style>
