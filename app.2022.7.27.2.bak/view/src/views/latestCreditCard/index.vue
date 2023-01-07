<template>
    <section class="newOtc">
        <div class="newOtc-header" style="border:none">
            <div class="newOtc-header-box fuz-page-content">
                <div class="header-box-left v5-6-cl">
                    <c-v5-navTab
                        activeClassName="v5-5-cl"
                        activeColor="v5-1-bg"
                        className="v5-6-cl"
                        :currentTab="nowType"
                        :navTab="navTab"
                        @currentType="currentType"
                    />
                </div>
                <div class="header-box-right v5-6-cl" v-if="userInfo">
                    <!-- <div class="box-right-c2c"
                    :class="{'v5-5-cl': isHover, 'v5-6-cl': !isHover}"
                    @mouseover="isHover=true"
                    @mouseout="isHover=false"
                    > -->
                    <div class="box-right-c2c"
                    >

                        <svg class="icon icon-14" aria-hidden="true" v-if="isHover5">
                            <use xlink:href="#icon-v5_icon3_2" />
                        </svg>
                         <svg class="icon icon-14" aria-hidden="true" v-else>
                            <use xlink:href="#icon-v5_icon3_1" />
                        </svg>
                        <span class="c2c-text" @click="btnLink('/newOrder/thirdOrder')"
                        :class="{'v5-1-cl': isHover5, 'v5-6-cl': !isHover5}"
                        @mouseover="isHover5=true"
                        @mouseout="isHover5=false">
                            <!-- 第三方订单 -->
                            {{ $t('newOtc.text48') }}
                        </span>
                    </div>
                    <div class="box-right-c2c"
                    >
                         <svg class="icon icon-14" aria-hidden="true" v-if="isHover6">
                            <use xlink:href="#icon-v5_icon4_2" />
                        </svg>
                         <svg class="icon icon-14" aria-hidden="true" v-else>
                            <use xlink:href="#icon-v5_icon4_1" />
                        </svg>
                        <span class="c2c-text" @click="btnLink('/newOrder/otcOrder')"
                        :class="{'v5-1-cl': isHover6, 'v5-6-cl': !isHover6}"
                        @mouseover="isHover6=true"
                        @mouseout="isHover6=false">
                            <!-- C2C订单 -->
                            {{ $t('newOtc.text49') }}
                            <div class="orderCount" v-if="orderist.length"></div>
                        </span>

                        <div class="c2c-order v5-10-bg v5-12-bd">
                            <div class="c2c-order-title  v5-12-bd">
                                <div class="c2c-order-title-l v5-5-cl">
                                    <!-- 进行中 -->
                                    {{ $t('newOtc.text32') }}
                                </div>
                                <div
                                class="c2c-order-title-r v5-1-cl"
                                @click="btnLink('/newOrder/otcOrder')">
                                <!-- 全部订单 -->
                                {{ $t('newOtc.text50') }}
                               </div>
                            </div>
                            <div class="c2c-order-list">
                                <div
                                v-if="orderist.length ===  0"
                                class="c2c-order-list-nodata v5-6-cl">
                                    <!-- <svg class="icon icon-50" aria-hidden="true">
                                        <use xlink:href="#icon-assets_24" />
                                    </svg> -->
                                    <img :src="imgMap.no_data" alt="">
                                    <p>
                                        <!-- 无进行中的订单 -->
                                        {{ $t('newOtc.text51') }}
                                    </p>
                                </div>
                                <div class="c2c-order-list-item"
                                v-else
                                xf
                                v-for="(item,index) in orderist"
                                :class="{
                                    'v5-9-bg': currencyHover === index
                                }"
                                @mouseover="currencyHover = index"
                                @click="btnLink(`/otcDetailOrder?orderId=${item.sequence}`)"
                                @mouseout="currencyHover = null"
                                :key="index">
                                    <div class="list-item-title v5-5-cl">
                                        <span
                                        :class="
                                        {'v5-2-cl': item.side === 'BUY',
                                        'v5-3-cl': item.side === 'SELL'}">
                                        {{item.type}}
                                        </span>
                                        <span>{{item.coinSymbol}}</span>
                                    </div>
                                    <div class="list-item-number v5-5-cl">
                                        {{ $t('newOtc.text52') }}
                                        {{item.volume}} {{item.coinSymbol}}
                                    </div>
                                    <div class="list-item-value v5-5-cl">
                                        {{ $t('newOtc.text53') }} {{item.totalPrice}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box-center v5-6-bg">

                    </div>
                    <div
                    class="box-right-mnt"
                    v-if='show'
                    @click="btnLink('newAssets/mnFait?type=recharge')"
                    :class="{'v5-1-cl': isHover7, 'v5-6-cl': !isHover7}"
                    @mouseover="isHover7=true"
                    @mouseout="isHover7=false">
                        <!-- 充值提现 -->
                        {{ $t('newOtc.text54') }}
                    </div>
                    <div class="box-right-more">
                        <div class="more-title"
                        :class="{'v5-1-cl': isHover, 'v5-6-cl': !isHover}"
                        @mouseover="isHover=true"
                        @mouseout="isHover=false">
                           <span class="more-title-text">
                               <!-- 更多 -->
                                {{ $t('newOtc.text55') }}
                            </span>
                           <svg class="icon icon-16"
                           aria-hidden="true"
                           v-if="!isHover"
                           style="transition: all 0.3s ease-in-out;width: 0.5em;">
                            <use xlink:href="#icon-v5_25" />
                           </svg>
                           <svg
                           class="icon icon-16"
                           aria-hidden="true"
                           v-else
                           style="transform:rotate(180deg);transition: all 0.3s ease-in-out;
                           width:0.5em;">
                            <use xlink:href="#icon-v5_25" />
                           </svg>
                        </div>
                        <div class="more-list v5-10-bg"
                         @mouseover="isHover=true"
                         @mouseout="isHover=false">
                            <div class="more-list-item"
                            @click="btnLink('/personal/setUp')"
                            :class="{'v5-9-bg v5-5-cl': isHover1, 'v5-10-bg': !isHover1}"
                            @mouseover="isHover1=true"
                            @mouseout="isHover1=false"
                            >
                                <svg class="icon icon-14" aria-hidden="true">
                                    <use xlink:href="#icon-v5_icon7" />
                                </svg>
                                <span class="more-list-item-text">
                                    <!-- 收款方式 -->
                                    {{ $t('newOtc.text56') }}
                                </span>
                            </div>
                            <div class="more-list-item"
                            @click="btnLink('/personal/blackList')"
                            :class="{'v5-9-bg v5-5-cl': isHover2, 'v5-10-bg': !isHover2}"
                            @mouseover="isHover2=true"
                            @mouseout="isHover2=false"
                            >
                                <svg class="icon icon-14" aria-hidden="true">
                                    <use xlink:href="#icon-v5_icon8" />
                                </svg>
                                <span class="more-list-item-text">
                                    <!-- 黑名单 -->
                                    {{ $t('newOtc.text57') }}
                                </span>
                            </div>
                            <div class="more-list-item"
                            @click="btnLink('/personal/modifySettings')"
                            :class="{'v5-9-bg v5-5-cl': isHover3, 'v5-10-bg': !isHover3}"
                            @mouseover="isHover3=true"
                            @mouseout="isHover3=false"
                            >
                               <svg class="icon icon-14" aria-hidden="true" >
                                    <use xlink:href="#icon-v5_icon9" />
                                </svg>
                                <span class="more-list-item-text">
                                    <!-- 资金密码 -->
                                    {{ $t('newOtc.text58') }}
                                </span>
                            </div>
                            <div class="more-list-item"
                            @click="btnLink('/companyApplication')"
                            :class="{'v5-9-bg v5-5-cl': isHover4, 'v5-10-bg': !isHover4}"
                            @mouseover="isHover4=true"
                            @mouseout="isHover4=false"
                            >
                                <svg class="icon icon-14" aria-hidden="true">
                                    <use xlink:href="#icon-v5_icon10" />
                                </svg>
                                <span class="more-list-item-text">
                                    <!-- 申请商户 -->
                                    {{ $t('newOtc.text59') }}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <Quick v-if="nowType === 0"/>
        <C2C v-if="nowType === 1"/>
        <MyAd v-if="nowType === 2"/>
    </section>
</template>


<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newOtc/index/index';
import 'BlockChain-ui/PC/common-mixin/newOtc/index/index.styl';
import C2C from './c2c.vue';
import Quick from './quick.vue';
import MyAd from './adList.vue';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  components: {
    C2C,
    Quick,
    MyAd,
  },
};
</script>
