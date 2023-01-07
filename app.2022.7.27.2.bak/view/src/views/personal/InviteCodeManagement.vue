<template>
  <div class="invite-code-management a-5-bg">
    <div class="header a-3-bd">
      <p class="title1 b-1-cl">{{$t('personal.inviteCodeManagement.title')}}</p>
      <p class="title2 b-2-cl">{{$t('personal.inviteCodeManagement.titleText')}}</p>
    </div>
    <div class="center a-7-bd">
      <div class="center-main">
        <div>
          <p class="b-2-cl">{{$t('personal.inviteCodeManagement.showNumber')}}</p>
          <p class="b-1-cl">{{inviteNumber}}</p>
        </div>
        <div>
          <p class="b-2-cl">{{$t('personal.inviteCodeManagement.showCommission')}}</p>
          <p class="b-1-cl">{{inviteReturnNumber}}</p>
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
      <img class="center-bg" :src="friendImg"/>
    </div>
    <div class="main-center">
      <div class="main-table">
        <p class="main-table-title b-1-cl a-3-bd">
          {{$t('personal.inviteCodeManagement.commissionRecor')}}</p>
        <c-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          :loading = 'loading'
          :classes = 'classes'
          :headClasses = 'headClasses'
          :bodyClasses =  'bodyClasses'
          :lineClasses = 'lineClass'
          :columns = "columns"
          :dataList = "dataList"
          :lineNumber = 'lineNumber'
          :cellHeight = 'cellHeight'
          :headHeight = 'headHeight'
        />
        <c-pagination v-show="count !== 0"
                    :total="count"
                    :current-page='page'
                    :display='pageSize'
                    @pagechange="pagechange">
        </c-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/InviteCodeManagement/InviteCodeManagement';
import 'BlockChain-ui/PC/common-mixin/personal/InviteCodeManagement/InviteCodeManagement.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
