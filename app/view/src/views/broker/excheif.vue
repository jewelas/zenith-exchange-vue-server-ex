<template>
  <div class="broker">
    <div class="top-content" :style="backgroundImg">
      <div class="warp">
        <h2 class="page-title f-8-cl">
          <!-- 经纪人系统 -->
          {{$t('broker.broker')}}
        </h2>
        <div class="top-carp">
          <div class="carp-affilte" :style="carpbgImg">
            <p>Affiliate</p>
            <p>
              <!-- 会员分享20位会员即可升级为普通合伙人 -->
          {{$t('excheif.affiliate')}}
              </p>
          </div>
          <div class="carp-master" :style="carpbgImgTow">
            <p>Master Affiliate</p>
            <p>
              <!-- 普通合伙人培育10位普通合伙人即可升级为高级合伙人 -->
              {{$t('excheif.affiliateTow')}}
              </p>
          </div>
        </div>
      </div>
    </div>
    <div class="warp main-content">
      <div class="mining-data c-4-bg">
        <div class="mining-tit f-2-cl c-5-bd">
          <span
            class="f-1-cl">{{$t('excheif.title')}}</span>
        </div>
        <div class="center first-center">
          <div class="center-main">
            <div>
              <p class="f-2-cl">{{$t('personal.inviteCodeManagement.showNumber')}}</p>
              <p class="f-1-cl">{{userCount}}</p>
            </div>
          </div>
          <div class="invitation-way">
            <div class="invitation-ways">
              <div class="a-4-bg">
                <svg class="icon icon-18" aria-hidden="true">
                  <use xlink:href="#icon-b_17"></use>
                </svg>
                <span>{{inviteUrl}}</span>
                <span @click="copyClick()"
                      @mouseenter="handMouseenter()"
                      @mouseleave="handMouseleave()">
              <span v-if="inviteUrlShow">
                <svg class="icon icon-14"
                     aria-hidden="true">
                  <use xlink:href="#icon-a_9"></use>
                </svg>
              </span>
              <span v-else>
                <svg class="icon icon-14"
                     aria-hidden="true">
                  <use xlink:href="#icon-a_9_1"></use>
                </svg>
              </span>
            </span>
                <a class="inviteQECode-show" href="javascript:;" @click="imgCodeShow">
                  <svg class="icon icon-18" aria-hidden="true">
                    <use xlink:href="#icon-b_18"></use>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mining-data c-4-bg">
        <div class="mining-tit f-2-cl c-5-bd">
          <span
            class="f-1-cl">{{$t('excheif.account')}}</span>
        </div>
        <div class="center">
          <div class="center-main">
            <div class="main-right">
              <p class="f-2-cl">{{$t('excheif.message')}}</p>
              <p class="f-1-cl">{{level.levelOneSum}} {{level.symbol}}</p>
            </div>
            <div class="main-right">
              <p class="f-2-cl">{{$t('excheif.message2')}}</p>
              <p class="f-1-cl">{{level.levelTwoSum}} {{level.symbol}}</p>
            </div>
            <div class="main-right">
              <p class="f-2-cl">{{$t('excheif.message3')}}</p>
              <p class="f-1-cl">{{level.allSum}} {{level.symbol}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-for="(item, i) in tableData"
       :key="item.agentRoleId" :class="i === 0 ? '' : 'user-tow'">
        <div class="content-master c-4-bg">
          <span class="f-1-cl">
            {{item.agentRoleName}}（{{item.agentRoleNum}}{{$t('excheif.preson')}}）
          </span>
        </div>
        <c-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          :columns = 'columns'
          :dataList = 'item.newList'
          :loading = 'tableLoading'
          :bodyClasses = 'bodyClasses'
          :headClasses = 'headClasses'
        />
      </div>
      <div class="user-tow remark c-4-bg">
          <div>
            <div class="content-master f-1-cl">
              {{$t('excheif.remeakerTile')}}
            </div>
            <ul class="remark-list">
              <li>
                1.{{$t('excheif.remark[0]')}}。
              </li>
              <li style="padding-left:12px">
                {{$t('excheif.remark[1]')}}。
              </li>
              <li>
                2.{{$t('excheif.remark[2]')}}。
              </li>
            </ul>
          </div>
          <div>
            <div class="content-master f-1-cl">
              {{$t('excheif.remarkTitle2')}}
            </div>
            <ul class="remark-list">
              <li>
                1.{{$t('excheif.remark2[0]')}}。
              </li>
              <li style="padding-left:12px">
                {{$t('excheif.remark2[1]')}}。
              </li>
              <li>
                2.{{$t('excheif.remark2[2]')}}。
              </li>
              <li>
                3.{{$t('excheif.remark2[3]')}}：2019.10.12-2020.10.03
              </li>
            </ul>
          </div>
          <div>
            <div class="content-master f-1-cl">
              {{$t('excheif.remarkTitle3')}}
            </div>
            <ul class="remark-list">
              <li>
                {{$t('excheif.remark3[0]')}}。
              </li>
              <li>
                {{$t('excheif.remark3[1]')}}。
              </li>
            </ul>
          </div>
      </div>
      </div>
      <div class="center-img" v-if="imgCodeFlag" @click="imgCodeHide">
        <img :src="inviteQECode"/>
      </div>
    </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/broker/excheif/excheif';
import 'BlockChain-ui/PC/common-mixin/broker/excheif/excheif.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
