<!-- // Created by 任泽阳 on 18/12/05.
// 头部组件 -->
<template>
  <header
    ref="commonHeader"
    class="common-header h-3-bd x-2-cl"
    @mouseout="handMouseleave('')"
    :class="navigationType === '1' ? 'top-common-header': 'left-common-header'">
    <!-- 中国版 -->
    <i v-if="!logoUrl"></i>
    <template v-if="navigationType === '1' && headerTemplateReceived">
      <!-- 主流板块 -->
      <ul class="common-header-linkList">
        <!-- logo -->
        <li class="linkList-logo-li">
          <a class="linkList-logo" @click="btnHref(headerLink.home)">
            <img :src="logoUrl" />
          </a>
        </li>
        <li class="header-nav-ifl"  v-if="subNavisShow">
          <svg class="icon icon-18" aria-hidden="true">
            <use xlink:href="#icon-b_1"></use>
          </svg>
          <svg class="icon icon-18 hover" aria-hidden="true">
            <use xlink:href="#icon-b_1_1"></use>
          </svg>
          <div
            class="header-sub-nav h-1-bg">
            <ul v-if="publicInfo" class="header-user-text x-2-cl">
              <li
                v-if="userInfo && userInfo.agentStatus === 1"
                class="g-3-cl-h">
                <span
                  @click="btnLink('/broker')"
                  :class="(langHover === 'broker') ? 'h-4-bg x-1-cl' : ''"
                  @mouseenter="handMouseenter('broker')"
                  @mouseout="handMouseleave('broker')"
                >
                <!-- 经纪人系统 -->
                {{$t('header.broker')}}
                </span>
              </li>
              <li
                v-if="publicInfo && publicInfo.switch.is_return_open === '1'"
                class="g-3-cl-h">
                <span
                  @click="btnLink('/mining')"
                  :class="(langHover === 'minings') ? 'h-4-bg x-1-cl' : ''"
                  @mouseenter="handMouseenter('minings')"
                  @mouseout="handMouseleave('minings')"
                  >
                <!-- 交易挖矿 -->
                {{$t('header.minings')}}
                </span>
              </li>
              <li
                v-if="publicInfo && publicInfo.switch.newcoinOpen === '1'"
                class="x-2-cl g-3-cl-h">
                <span
                  @click="btnLink('/innovation')"
                  :class="(langHover === 'innov_tit') ? 'h-4-bg x-1-cl' : ''"
                  @mouseenter="handMouseenter('innov_tit')"
                  @mouseout="handMouseleave('innov_tit')"
                  >
                  <!-- 创新试验区 -->
                  {{$t('header.innov_tit')}}
                </span>
              </li>
              <li
                v-if="publicInfo && publicInfo.switch.is_financing_open === '1'"
                class="x-2-cl g-3-cl-h">
                <span
                  @click="btnLink('/manageFinances')"
                  :class="(langHover === 'manageFinances') ? 'h-4-bg x-1-cl' : ''"
                  @mouseenter="handMouseenter('manageFinances')"
                  @mouseout="handMouseleave('manageFinances')"
                  >
                  <!-- 理财宝 -->
                  {{$t('manageFinances.manage_finances')}}
                </span>
              </li>
              <!-- <li v-if="appDownload.app_page_url" class="x-2-cl g-3-cl-h">
                <span
                  @click="btnLink('/appDownload')"
                  :class="(langHover === 'appDownload') ? 'h-4-bg x-1-cl' : ''"
                  @mouseenter="handMouseenter('appDownload')"
                  @mouseout="handMouseleave('appDownload')"
                  > -->
                  <!-- app 下载 -->
                  <!-- {{$t('header.appDownLoad')}}
                </span>
              </li> -->
              <li class="x-2-cl g-3-cl-h">
                <span
                  @click="btnLink('/questions/init')"
                  :class="(langHover === '/questions/init') ? 'h-4-bg x-1-cl' : ''"
                  @mouseenter="handMouseenter('/questions/init')"
                  @mouseout="handMouseleave('/questions/init')"
                  >
                  <!-- 问题中心 -->
                  {{ $t('questions.title') }}
                </span>
              </li>
            </ul>
          </div>
        </li>
        <li
          v-for="(item, index) in tradesList"
          :key="index"
          class="header-navEven"
          :class="getClass(item.activeId)"
          @mouseenter="evenHandMouseenter(item.activeId)"
          @mouseleave="evenHandMouseleave"
          @click="btnHref(item.link)">
          {{ item.title }}
        </li>
        <!--  自定义导航 -->
        <template v-if="headerTemplate.length">
          <li
            class="header-navEven"
            :key="'info' + index"
            v-for="(item, index) in headerTemplate"
            :class="getClass(item.activeId)"
            @mouseenter="evenHandMouseenter(item.activeId)"
            @mouseleave="evenHandMouseleave"
            @click="btnHref(item.link, item.target)">
            {{item.text}}
            <div v-if="item.new" class="new-label x-3-cl h-5-bg">NEW</div>
          </li>
        </template>
      </ul>
      <!-- 公共版款 -->
      <div class="common-header-optionList">
        <!-- 未登录时 -->
        <div class="header-guide h-2-bd" v-if="!isLogin && userInfoIsReady">
          <c-button type="text"
            :kind="true"
            paddingW="22px"
            height="30px"
            @click="btnLink('/login')"
            class="header-login-button">
              <!-- 登录 -->
              {{$t('header.login')}}
            </c-button>
          <c-button class="header-reg-button"
            height="30px"
            type="hollow"
            :big="true"
            @click="btnLink('/register')">
            <!-- 注册 -->
            {{$t('header.register')}}
          </c-button>
        </div>
        <div class="header-isLogin" v-if="isLogin && userInfoIsReady">
          <!-- 资产 -->
          <div class="header-isLogin-navEven"
            :class="getClass('assets')"
            @mouseenter="evenHandMouseenter('assets')"
            @mouseleave="evenHandMouseleave">
            <div class="header-isLogin-navEven-title"
              @click="btnLink('/assets/exchangeAccount')">
              {{$t('header.assets')}}
            </div>
            <ul class="lang-list h-1-bg b-2-cl">
              <!--  || activeMark === item.link -->
              <li v-for="(item, index) in assetsList"
                :class="(hoverMark === item.link)
                  ?'h-4-bg x-1-cl'
                  : ''"
                @mouseenter="markMouseenter(item.link)"
                @mouseleave="markMouseleave"
                @click="btnLink(item.link)"
                :key="index">{{ item.title }}</li>
            </ul>
          </div>
          <!-- 订单 -->
          <div class="header-isLogin-navEven"
            :class="getClass('order')"
            @mouseenter="evenHandMouseenter('order')"
            @mouseleave="evenHandMouseleave"
            >
            <div class="header-isLogin-navEven-title"
              @click="btnLink('/order/exchangeOrder')">
              {{$t('header.order')}}
            </div>
            <ul class="lang-list h-1-bg b-2-cl">
              <!--  || activeMark === item.link -->
              <li v-for="(item, index) in orderList"
                :class="(hoverMark === item.link)
                  ? 'h-4-bg x-1-cl'
                  : ''"
                @mouseenter="markMouseenter(item.link)"
                @mouseleave="markMouseleave"
                @click="btnLink(item.link)"
                :key="index">{{ item.title }}</li>
            </ul>
          </div>
        </div>
        <!-- app下载 -->
        <div class="header-user h-2-bd"
        v-if="appDownload.app_page_url">
          <div class="header-user-apphove" @click="btnLink('/appDownload')">
            <div class="header-user-icon icon-info">
              <svg class="icon icon-18" aria-hidden="true"><use xlink:href="#icon-b_33"></use></svg>
            </div>
            <div class="header-user-icon icon-active">
            <svg class="icon icon-18" aria-hidden="true"><use xlink:href="#icon-b_33_1"></use></svg>
            </div>
          </div>
          <div class="header-user-appdown h-1-bg">
            <div class="code-box">
                <div class="download-options-code">
                <img :src="appDownload.app_page_url" alt="">
                 {{!appDownload.app_page_url}}
              </div>
              <!-- 扫描二维码下载 -->
              <p class="download-options-codeText">
                {{ $t('appDownLoad.headerCode') }}
              </p>
            </div>

            <div class="download-options-buttons">
              <c-button className="download-button"
                @click="download('ios_ipa')">
                <svg class="icon icon-18" aria-hidden="true">
                  <use xlink:href="#icon-b_13"></use>
                </svg>
                &nbsp;
                {{$t('appDownLoad.platform')[0]}}
              </c-button>
              <c-button className="download-button"
                @click="download('android')">
                <svg class="icon icon-18" aria-hidden="true">
                  <use xlink:href="#icon-b_14"></use>
                </svg>
                &nbsp;
                {{$t('appDownLoad.platform')[1]}}
              </c-button>
            </div>
          </div>
        </div>
        <!-- 设置 -->
         <div class="header-user h-2-bd" v-if="colorList.length > 1" >
          <div @click="setAlert" class="header-user-icon icon-info">
            <svg class="icon icon-18" aria-hidden="true"><use xlink:href="#icon-b_2"></use></svg>
          </div>
          <div @click="setAlert" class="header-user-icon icon-active">
            <svg class="icon icon-18" aria-hidden="true"><use xlink:href="#icon-b_2_1"></use></svg>
          </div>
        </div>
        <!-- 消息中心 -->
        <div class="header-user h-2-bd"  v-if="isLogin && userInfoIsReady">
          <div class="messageCount" v-if="messageCount"></div>
          <div @click="btnLink('/mesage')" class="header-user-icon icon-info">
            <svg class="icon icon-18" aria-hidden="true"><use xlink:href="#icon-b_3"></use></svg>
          </div>
          <div @click="btnLink('/mesage')" class="header-user-icon icon-active">
            <svg class="icon icon-18" aria-hidden="true"><use xlink:href="#icon-b_3_1"></use></svg>
          </div>
          <div v-if="messageCount" class="header-user-message h-1-bg">
            <ul class="header-user-text">
              <li class="x-2-cl mesageNav"
                @click="btnLink('/mesage')"
                :key ="index"
                v-for="(item, index) in userMessageList">
                {{item.messageContent}}
              </li>
              <!-- <li class="x-2-cl">账户状态：{{userStatus}}</li> -->
            </ul>
            <div class="header-user-out h-4-bg x-3-cl" @click="btnLink('/mesage')">
              <!-- 查看更多 -->
              {{$t('header.more')}}
            </div>
          </div>
        </div>
        <!-- 个人中心 -->
        <div class="header-user h-2-bd" v-if="isLogin && userInfoIsReady">
          <div @click="btnLink('/personal/userManagement')" class="header-user-icon icon-info">
            <svg class="icon icon-18" aria-hidden="true"> <use xlink:href="#icon-b_4"></use></svg>
          </div>
          <div @click="btnLink('/personal/userManagement')" class="header-user-icon icon-active">
            <svg class="icon icon-18" aria-hidden="true"> <use xlink:href="#icon-b_4_1"></use></svg>
          </div>
          <div class="header-user-market h-1-bg">
            <ul class="header-user-text">
              <li class="x-1-cl userText"
                @click="btnLink('/personal/userManagement')">{{userText}}</li>
              <li class="x-2-cl">
                <!-- 账户状态 -->
                {{$t('header.userStatus')}}：{{userStatus}}</li>
            </ul>
            <div class="header-user-out h-4-bg x-1-cl" @click="out">
              <!-- 退出 -->
              {{$t('header.out')}}
            </div>
          </div>
        </div>
        <div class="h-2-bd header-lang x-2-cl">
          <div class="show-lang">
            <!-- {{$t('header.zh')}} -->
            <!--{{ showLan }}-->
            Language
            <svg class="icon icon-14" aria-hidden="true">
              <use xlink:href="#icon-a_13"></use>
            </svg>
          </div>
          <ul class="lang-list h-1-bg">
            <li v-for="(item, index) in langArr"
              :class="(lan === item.id || langHover === item.id) ? 'h-4-bg x-1-cl' : ''"
              @mouseenter="handMouseenter(item.id)"
              @mouseout="handMouseleave(item.id)"
              @click="lanClick(item.id)"
              :key="index">{{ item.name }}</li>
          </ul>
        </div>
      </div>
    </template>
    <!-- 国际版 -->
    <template v-else-if="headerTemplateReceived">
      <!-- 主流板块 -->
      <ul class="int-header-linkList">
        <!-- logo -->
        <li
          @mouseover="handMouseenter('logo')"
          @mouseleave="handMouseleave('logo')">
          <a class="button-logo" @click="btnHref(headerLink.home)">
            <img :src="intLogoUrl" />
          </a>
        </li>
        <!-- 行情 -->
        <li
          v-if="publicInfo && publicInfo.switch.index_kline_switch === '1'"
          class="button-li"
          :class="(langHover === 'market' || router === 'market') ? 'h-4-bg x-1-cl' : ''"
          @click="btnLink('/market')"
          @mouseover="handMouseenter('market')"
          @mouseleave="handMouseleave('market')">
          <svg
            v-if="langHover === 'market' || router === 'market'"
            class="icon icon-18"
            aria-hidden="true">
            <use xlink:href="#icon-b_30_1"></use>
          </svg>
          <svg v-else
            class="icon icon-18"
            aria-hidden="true">
            <use xlink:href="#icon-b_30"></use>
          </svg>
          <span class="header-button-links">
            {{$t('header.market')}}
          </span>
        </li>
        <!-- 币币交易 -->
        <li
          v-if="headerLink.trade"
          class="button-li"
          :class="(langHover === 'trade' || router === 'trade') ? 'h-4-bg x-1-cl' : ''"
          @click="btnHref(headerLink.trade)"
          @mouseover="handMouseenter('trade')"
          @mouseleave="handMouseleave('trade')">
          <svg
            v-if="langHover === 'trade' || router === 'trade'"
            class="icon icon-18"
            aria-hidden="true">
            <use xlink:href="#icon-b_5_1"></use>
          </svg>
          <svg v-else
            class="icon icon-18"
            aria-hidden="true">
            <use xlink:href="#icon-b_5"></use>
          </svg>
          <span class="header-button-links">
            {{$t('header.trade')}} xxxx
          </span>
        </li>
        <!-- 法币交易 -->
        <li
          v-if="headerLink.otc"
          class="button-li"
          :class="(langHover === 'otc' || router === 'fiatdeal') ? 'h-4-bg x-1-cl' : ''"
          @mouseover="handMouseenter('otc')"
          @mouseleave="handMouseleave('otc')"
          @click="btnHref(headerLink.otc)">
          <svg
            v-if="langHover === 'otc' || router === 'fiatdeal'"
            class="icon icon-18"
            aria-hidden="true">
            <use xlink:href="#icon-b_6_1"></use>
          </svg>
          <svg v-else class="icon icon-18" aria-hidden="true">
            <use xlink:href="#icon-b_6"></use>
          </svg>
          <span class="header-button-links">
            <!-- 一键买币 -->
            {{ $t('header.otc') }}
          </span>
        </li>
        <!-- 法币交易 -->
        <li
          v-if="!headerLink.otc && saasOtcFlowConfig"
          class="button-li"
          :class="(langHover === 'otc' || router === 'fiatdeal') ? 'h-4-bg x-1-cl' : ''"
          @mouseover="handMouseenter('otc')"
          @mouseleave="handMouseleave('otc')"
          @click="btnHref('/mobility')">
          <svg
            v-if="langHover === 'otc' || router === 'fiatdeal'"
            class="icon icon-18"
            aria-hidden="true">
            <use xlink:href="#icon-b_6_1"></use>
          </svg>
          <svg v-else class="icon icon-18" aria-hidden="true">
            <use xlink:href="#icon-b_6"></use>
          </svg>
          <span class="header-button-links">
            <!-- 一键买币 -->
            {{ $t('mobilityTrade.immediately') }}
          </span>
        </li>
        <!-- 合约交易 -->
        <li
          v-if="headerLink.co"
          class="button-li"
          :class="(langHover === 'co' || router === 'cotrade') ? 'h-4-bg x-1-cl' : ''"
          @mouseover="handMouseenter('co')"
          @mouseleave="handMouseleave('co')"
          @click="btnHref(headerLink.co)">
          <svg
            v-if="langHover === 'co' || router === 'cotrade'"
            class="icon icon-18"
            aria-hidden="true">
            <use xlink:href="#icon-b_23_1"></use>
          </svg>
          <svg v-else class="icon icon-18" aria-hidden="true">
            <use xlink:href="#icon-b_23"></use>
          </svg>
          <span class="header-button-links">
            {{$t('header.co')}}
          </span>
        </li>
        <!-- 杠杆交易 -->
        <li v-if="publicInfo && publicInfo.switch
          && publicInfo.switch.lever_open
          && publicInfo.switch.lever_open.toString() === '1'"
          class="button-li"
          :class="(langHover === 'lever' || router === 'margin') ? 'h-4-bg x-1-cl' : ''"
          @mouseover="handMouseenter('lever')"
          @mouseleave="handMouseleave('lever')"
          @click="btnHref(headerLink.lever)">
          <svg class="icon icon-18 hover-hide" aria-hidden="true">
            <use xlink:href="#icon-b_24"></use>
          </svg>
          <svg class="icon icon-18 hover-show" aria-hidden="true">
            <use xlink:href="#icon-b_24_1"></use>
          </svg>
          <span class="header-button-links">
            {{$t('header.lever')}}
          </span>
        </li>
        <!-- 资产 -->
        <li
          v-if="isLogin && userInfoIsReady"
          class="button-li"
          :class="(langHover === 'assets' || router === 'assets') ? 'h-4-bg x-1-cl' : ''"
          @mouseover="handMouseenter('assets')"
          @mouseleave="handMouseleave('assets')"
          @click="btnLink('/assets/exchangeAccount')">
          <svg
            v-if="langHover === 'assets' || router === 'assets'"
            class="icon icon-18"
            aria-hidden="true">
            <use xlink:href="#icon-b_27_1"></use>
          </svg>
          <svg v-else class="icon icon-18" aria-hidden="true">
            <use xlink:href="#icon-b_27"></use>
          </svg>
          <span class="header-button-links">
            {{$t('header.assets')}}
          </span>
        </li>
        <!-- 订单 -->
        <li
          v-if="isLogin && userInfoIsReady"
          class="button-li"
          :class="(langHover === 'order' || router === 'order') ? 'h-4-bg x-1-cl' : ''"
          @mouseover="handMouseenter('order')"
          @mouseleave="handMouseleave('order')"
          @click="btnLink('/order/exchangeOrder')">
          <svg
            v-if="langHover === 'order' || router === 'order'"
            class="icon icon-18"
            aria-hidden="true">
            <use xlink:href="#icon-b_27_1"></use>
          </svg>
          <svg v-else class="icon icon-18" aria-hidden="true">
            <use xlink:href="#icon-b_27"></use>
          </svg>
          <span class="header-button-links">
            {{$t('header.order')}}
          </span>
        </li>
        <!-- 个人中心 -->
        <li
          class="button-li header-user"
          :class="(langHover === 'Account' || router === 'personal') ? 'h-4-bg x-1-cl' : ''"
          @mouseover="handMouseenter('Account')"
          @mouseleave="handMouseleave('Account')"
          @click="btnLink('/personal/userManagement')">
          <i class="iconClass" style="top: 19px;">
            <svg
              v-if="langHover === 'Account' || router === 'personal'"
              class="icon icon-18"
              aria-hidden="true">
              <use xlink:href="#icon-b_4_1"></use>
            </svg>
            <svg v-else class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-b_4"></use>
            </svg>
          </i>
          <span class="header-button-links">
            <!-- 用户中心 -->
            {{$t('header.account')}}
          </span>
          <div v-if="isLogin && userInfoIsReady" class="header-user-market h-1-bg">
            <ul class="header-user-text">
              <li class="x-1-cl userText"
                @click="btnLink('/personal/userManagement')">{{userText}}</li>
              <li class="x-2-cl">
                <!-- 账户状态 -->
                {{$t('header.userStatus')}}：{{userStatus}}</li>
            </ul>
            <div class="header-user-out h-4-bg x-1-cl" @click="out">
              <!-- 退出 -->
              {{$t('header.out')}}
            </div>
          </div>
        </li>
        <!-- 更多功能 -->
        <li
          v-if="subNavisShow"
          class="button-li"
          ref="extension"
          :class="(langHover === 'extension') ? 'h-4-bg x-1-cl' : ''"
          @mouseover="handMouseenter('extension')">
          <svg
            v-if="langHover === 'extension'"
            class="icon icon-18" aria-hidden="true">
            <use xlink:href="#icon-b_1_1"></use>
          </svg>
          <svg v-else class="icon icon-18" aria-hidden="true">
            <use xlink:href="#icon-b_1"></use>
          </svg>
          <span class="header-button-links">
            <!-- 更多 -->
            {{$t('header.moreText')}}
          </span>
        </li>
      </ul>
      <!-- 公共版款 -->
      <ul class="int-header-linkList nav-bottom">
        <!-- 消息 -->
        <li
          v-if="isLogin && userInfoIsReady"
          class="button-li"
          :class="(langHover === 'Message') ? 'h-4-bg x-1-cl' : ''"
          @click="btnLink('/mesage')"
          @mouseover="handMouseenter('Message')"
          @mouseleave="handMouseleave('Message')">
          <div class="messageCount" v-if="messageCount"></div>
          <svg class="icon icon-18 hover-hide" aria-hidden="true">
            <use xlink:href="#icon-b_3"></use>
          </svg>
          <svg class="icon icon-18 hover-show" aria-hidden="true">
            <use xlink:href="#icon-b_3_1"></use>
          </svg>
          <span class="header-button-links">
            <!-- 消息 -->
            {{$t('header.message')}}
          </span>
        </li>
        <!-- 设置 -->
        <li
          v-if="colorList.length > 1"
          class="button-li"
          :class="(langHover === 'Setting') ? 'h-4-bg x-1-cl' : ''"
          @click="setAlert"
          @mouseover="handMouseenter('Setting')"
          @mouseleave="handMouseleave('Setting')">
          <svg class="icon icon-18 hover-hide" aria-hidden="true">
            <use xlink:href="#icon-b_2"></use>
          </svg>
          <svg class="icon icon-18 hover-show" aria-hidden="true">
            <use xlink:href="#icon-b_2_1"></use>
          </svg>
          <span class="header-button-links">
            <!-- 设置 -->
            {{$t('header.set')}}
          </span>
        </li>
        <!-- 国际化 切换语言 -->
        <li
          class="button-li showLan"
          :class="(langHover === 'showLan') ? 'h-4-bg x-1-cl' : ''"
          @mouseover="handMouseenter('showLan')"
          @mouseleave="handMouseleave('showLan')">
          <span class="header-button-links">
            <!--{{ showLan }}-->
            Language
          </span>
          <div
            class="header-user-showLan h-1-bg x-2-cl">
            <ul class="lang-list h-1-bg">
              <li v-for="(item, index) in langArr"
                :class="(lan === item.id || langHoverSub === item.id) ? 'h-4-bg x-1-cl' : ''"
                @mouseenter="handMouseenter(item.id, 'sub')"
                @mouseout="handMouseleave(item.id, 'sub')"
                @click="lanClick(item.id)"
                :key="index">{{ item.name }}</li>
            </ul>
          </div>
        </li>
      </ul>
      <!-- 扩展功能二级菜单 -->
      <div
        :style = "extensionPosition"
        class="header-sub-nav"
        v-show="langHover === 'extension'">
        <vue-scroll>
          <ul
            v-if="publicInfo"
            @mouseover="handMouseenter('extension')"
            @mouseleave="handMouseleave('extension')"
            class="header-user-text x-2-cl h-1-bg">
            <li
              v-if="userInfo && userInfo.agentStatus === 1"
              class="g-3-cl-h">
              <span
                @click="btnLink('/broker')"
                :class="(langHoverSub === 'broker') ? 'h-4-bg x-1-cl' : ''"
                @mouseenter="handMouseenter('broker', 'sub')"
                @mouseout="handMouseleave('broker', 'sub')"
              >
              <!-- 经纪人系统 -->
              {{$t('header.broker')}}
              </span>
            </li>
            <li
              v-if="publicInfo && publicInfo.switch.is_return_open === '1'"
              class="g-3-cl-h">
              <span
                @click="btnLink('/mining')"
                :class="(langHoverSub === 'minings') ? 'h-4-bg x-1-cl' : ''"
                @mouseenter="handMouseenter('minings', 'sub')"
                @mouseout="handMouseleave('minings', 'sub')"
                >
              <!-- 交易挖矿 -->
              {{$t('header.minings')}}
              </span>
            </li>
            <li
              v-if="publicInfo && publicInfo.switch.newcoinOpen === '1'"
              class="x-2-cl g-3-cl-h">
              <span
                @click="btnLink('/innovation')"
                :class="(langHoverSub === 'innov_tit') ? 'h-4-bg x-1-cl' : ''"
                @mouseenter="handMouseenter('innov_tit', 'sub')"
                @mouseout="handMouseleave('innov_tit', 'sub')"
                >
                <!-- 创新试验区 -->
                {{$t('header.innov_tit')}}
              </span>
            </li>
            <li
              v-if="publicInfo && publicInfo.switch.is_financing_open === '1'"
              class="x-2-cl g-3-cl-h">
              <span
                @click="btnLink('/manageFinances')"
                :class="(langHoverSub === 'manageFinances') ? 'h-4-bg x-1-cl' : ''"
                @mouseenter="handMouseenter('manageFinances', 'sub')"
                @mouseout="handMouseleave('manageFinances', 'sub')"
                >
                <!-- 理财宝 -->
                {{$t('manageFinances.manage_finances')}}
              </span>
            </li>
            <li v-if="appDownload.app_page_url" class="x-2-cl g-3-cl-h">
              <span
                @click="btnLink('/appDownload')"
                :class="(langHoverSub === 'appDownload') ? 'h-4-bg x-1-cl' : ''"
                @mouseenter="handMouseenter('appDownload', 'sub')"
                @mouseout="handMouseleave('appDownload', 'sub')"
                >
                <!-- app 下载 -->
                {{$t('header.appDownLoad')}}
              </span>
            </li>
            <li class="x-2-cl g-3-cl-h">
              <span
                @click="btnLink('/questions/init')"
                :class="(langHoverSub === '/questions/init') ? 'h-4-bg x-1-cl' : ''"
                @mouseenter="handMouseenter('/questions/init', 'sub')"
                @mouseout="handMouseleave('/questions/init', 'sub')"
                >
                <!-- 问题中心 -->
                {{ $t('questions.title') }}
              </span>
            </li>
            <!--  自定义导航 -->
            <template v-if="headerTemplate.length">
              <li
                class="x-2-cl g-3-cl-h"
                :key= "index"
                v-for="(item, index) in headerTemplate">
                <span
                  @click="btnHref(item.link, item.target)"
                  :class="(langHoverSub === item.link) ? 'h-4-bg x-1-cl' : ''"
                  @mouseenter="handMouseenter(item.link, 'sub')"
                  @mouseout="handMouseleave(item.link, 'sub')"
                  >
                  {{item.text}}
                </span>
              </li>
            </template>
          </ul>
        </vue-scroll>
      </div>
    </template>
    <c-dialog v-if="headerTemplateReceived" :showFlag="showFlag"
      :titleText="$t('header.set')"
      @confirm="setConfirm"
      @close="setClose">
      <div class="setBox">
        <div class="setColor clearfix">
          <div class="setColor-key x-2-cl">{{$t('header.color')}}</div>
          <ul class="setColor-value">
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
      </div>
    </c-dialog>
  </header>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/header/header';
import 'BlockChain-ui/PC/common-mixin/modules/header/header.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
