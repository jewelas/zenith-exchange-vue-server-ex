<template>
  <div class="mining home-bg">
    <div class="top-content" :style="backgroundImg">
      <div class="warp">
        <h2 class="page-title f-8-cl">
          <!-- 交易挖矿 -->
          {{$t('mining.minings')}}
        </h2>
        <div class="my-minning-pct">
          <p class="tit f-9-cl">
            <span>
              <!-- 已挖矿产出 -->
              {{$t('mining.already_output')}}
            </span>
            <span class="f_r">
              <!-- 可挖矿总量 -->
              {{$t('mining.dividend_total_amount')}}
            </span>
          </p>
          <div class="pct-bar c-10-bg">
            <div class="pct c-8-bg" :style="{'width': speed + '%'}"></div>
          </div>
          <p class="num f-8-cl">
            <span>
              {{fixDFun(myData.total_return_number, myData.coin)}}
              {{myData.coin | getCoinShowName(coinList)}}
            </span>
            <span class="f_r">
              {{fixDFun(myData.dividend_total_amount, myData.coin)}}
              {{myData.coin | getCoinShowName(coinList)}}
            </span>
          </p>
        </div>
        <div class="wk-info">
          <div class="item-box h5-left">
            <div class="box-bar c-9-bd">
              <p class="name f-8-cl">
                {{fixDFun(myData.today_return_number, myData.coin)}}
                {{myData.coin | getCoinShowName(coinList)}}
              </p>
              <p class="txt f-9-cl">
                <!-- 今日待分配挖矿累计产出 -->
                {{$t('mining.distribution')}}
              </p>
            </div>
          </div>
          <div class="item-box h5-right">
            <div class="box-bar c-9-bd">
              <p class="name f-8-cl">
                {{fixDFun(myData.today_dividend_number, 'BTC')}}
                BTC
              </p>
              <p class="txt f-9-cl">
                <!-- 今日分红收入累计折合 -->
                {{$t('mining.dividend_income')}}
              </p>
            </div>
          </div>
          <div class="item-box h5-left">
            <div class="box-bar c-9-bd">
              <p class="name f-8-cl">
                {{fixDFun(myData.yesterday_return_number, myData.coin)}}
                {{myData.coin | getCoinShowName(coinList)}}
              </p>
              <p class="txt f-9-cl">
                <!-- 昨日挖矿产出 -->
                {{$t('mining.mining_output')}}
              </p>
            </div>
          </div>
          <div class="item-box h5-right">
            <div class="box-bar c-9-bd">
              <p class="name f-8-cl">
                {{fixDFun(myData.yesterday_dividend_number, 'BTC')}}
                BTC
              </p>
              <p class="txt f-9-cl">
                <!-- 昨日分配收入累计折合 -->
                {{$t('mining.distribution_yesterday')}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="warp main-content">
      <div class="my-harvest c-4-bg">
        <div class="mian-nav c-5-bd" v-if="this.isLogin && isInviteOpen">
          <c-navTab
            activeClassName="f-1-cl"
            activeColor="c-8-bg"
            className="f-2-cl"
            :currentTab="currentTab"
            :navTab="navTab"
            :lineHeight="lineHeight"
            :marginRight="marginRight"
            @currentType="currentType"
          />
        </div>
        <div class="tit f-1-cl" v-if="!this.isLogin">
          <!-- 我的收益 -->
          {{$t('mining.my_earnings')}}
        </div>
        <div class="div-earnings" v-if="this.currentTab === 1">
          <div class="sy-num clearfix">
            <span class="f-1-cl" v-if="!myData.userTotalBackAmount">0</span>
            <span class="f-1-cl" v-else>
              {{fixDFun(myData.userTotalBackAmount, myData.coin)}}
            </span>
            <b class="f-2-cl">{{myData.coin | getCoinShowName(coinList)}}</b>
            <p class="f-2-cl">
              <!-- 累计挖矿收益 -->
              {{$t('mining.total_earnings')}}
            </p>
          </div>
          <div class="tt-num clearfix">
          <!--   <div class="tt-i">
              <span class="t f-2-cl">昨日挖矿产出</span>
              <span class="n f-1-cl">{{myData.yesterday_return_number}}
              {{myData.coin | getCoinShowName(coinList)}}</span>
            </div> -->
            <div class="tt-i c-5-bd">
              <span class="t f-2-cl">
                <!-- 累计挖矿产出 -->
                {{$t('mining.total_out')}}
              </span>
              <span class="n f-1-cl">
                {{fixDFun(myData.total_return_number, myData.coin)}}
                {{myData.coin | getCoinShowName(coinList)}}
              </span>
            </div>
          </div>
        </div>
        <div class="center" v-if="this.currentTab === 2">
          <div class="center-main">
            <div>
              <p class="f-2-cl">{{$t('personal.inviteCodeManagement.showNumber')}}</p>
              <p class="f-1-cl">{{inviteNumber}}</p>
            </div>
            <div>
              <p class="f-2-cl">{{$t('personal.inviteCodeManagement.showCommission')}}</p>
              <p class="f-1-cl">{{inviteReturnNumber}}</p>
            </div>
          </div>
          <div class="invitation-way">
            <p>{{$t('personal.inviteCodeManagement.commissionWay')}}</p>
            <div class="invitation-ways">
              <div class="a-4-bg">
                <svg class="icon icon-18" aria-hidden="true">
                  <use xlink:href="#icon-b_16"></use>
                </svg>
                <span>{{inviteCode}}</span>
                <span @click="copyClick('inviteCode')"
                      @mouseenter="handMouseenter('inviteCode')"
                      @mouseleave="handMouseleave('inviteCode')">
              <span v-if="inviteCodeShow">
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
              </div>
              <div class="a-4-bg">
                <svg class="icon icon-18" aria-hidden="true">
                  <use xlink:href="#icon-b_17"></use>
                </svg>
                <span>{{inviteUrl}}</span>
                <span @click="copyClick('inviteUrl')"
                      @mouseenter="handMouseenter('inviteUrl')"
                      @mouseleave="handMouseleave('inviteUrl')">
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
                <a class="inviteQECode-show" href="javascript:;">
                  <svg class="icon icon-18" aria-hidden="true">
                    <use xlink:href="#icon-b_18"></use>
                  </svg>
                  <div class="center-img b-2-bg">
                    <img :src="inviteQECode"/>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mining-data" v-if="this.currentTab === 1">
        <div class="mining-tit f-2-cl c-5-bd c-4-bg">
          <span
            class="item"
            :class="{'selected a-12-bd' : tableType === item.key}"
            v-for="(item, index) in tabList"
            :key = "index"
            @click="switcherType(item.key)">{{item.text}}</span>
        </div>
        <c-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          :columns = 'columns'
          :dataList = 'dataList'
          classes = 'c-4-bg'
          :loading = 'tableLoading'
          :bodyClasses = 'bodyClasses'
          :headClasses = 'headClasses'
         />
      </div>

      <c-pagination v-if="(pagination.count/pagination.pageSize) > 1"
              :total="pagination.count"
              classes="c-4-bg"
              :current-page='pagination.page'
              :display='pagination.pageSize'
              @pagechange="pagechange">
      </c-pagination>
      <div class="invite-bonus" v-if="this.currentTab === 2">
        <div class="main-table">
          <p class="main-table-title f-1-cl c-5-bd c-4-bg">
            {{$t('personal.inviteCodeManagement.commissionRecor')}}</p>
          <c-table
            :imgMap="imgMap"
            :colorMap="colorMap"
            :loading = 'loading'
            classes = 'c-5-bg'
            :headClasses = 'headClasses'
            :bodyClasses =  'bodyClasses'
            :lineClasses = 'lineClass'
            :columns = "columnsBonus"
            :dataList = "dataListBonus"
          />
          <c-pagination v-show="count !== 0"
                      :total="count"
                      :current-page='page'
                      :display='pageSize'
                      @pagechange="pagechangeBonus">
          </c-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/mining/mining';
import 'BlockChain-ui/PC/common-mixin/mining/mining.styl';

export default {
  mixins: [mixin],
  mounted() {
    const info = { page: this.page, pageSize: this.pageSize };
    this.$store.dispatch('inviteInfoList', info);
    // publicInfo
    const { publicInfo } = this.$store.state.baseData;
    if (publicInfo && Number(publicInfo.switch.is_invite_open) === 1) {
      this.isInviteOpen = true;
    } else {
      this.isInviteOpen = false;
    }
    this.getData();
  },
};
</script>
