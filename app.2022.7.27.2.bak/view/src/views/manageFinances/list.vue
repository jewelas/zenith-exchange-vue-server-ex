<template>
  <div class="managefinances">
    <c-pageBanner
      :title="bannerTitle"
      :backgroungImgUrl="bannerImg"
      :imgMap="imgMap"
    ></c-pageBanner>
    <div class="managefinances-content">
      <div class="manageTop">
        <div class="topLeft">
          <span class="topTitle b-1-cl">{{$t('manageFinances.manage_finances')}}</span>
          <span class="topNotice b-2-cl">{{$t('manageFinances.subTitle')}}</span>
        </div>
        <div class="li-right clearfix">
          <c-button
            @click="getList"
            class="record"
            type="text">
            {{$t('manageFinances.record')}}
          </c-button>
        </div>
      </div>
      <div class="manageList">
         <div class="manageListItem c-4-bg" v-for="(item,index) in dataList" :key="index">
            <div class="itemCon1 b-1-cl">
              {{$t('manageFinances.recommend')}}-{{$t('manageFinances.manage_finances')}}
              {{item.limit_day}}{{$t('manageFinances.day')}}
            </div>
            <div class="itemCon2 b-2-cl">{{$t('manageFinances.safe')}}</div>
            <div class="itemCon3 b-4-cl">{{item.rate}}<span class="scale">%</span></div>
            <div class="itemCon4 b-2-cl">
              {{$t('manageFinances.expected')}}{{item.rate_type_text}}{{$t('manageFinances.rate')}}
            </div>
            <div class="itemCon5">
               <div class="itemCon5Left a-3-bd">
                <p class="subItemTop b-1-cl">{{item.limit_day}}{{$t('manageFinances.day')}}</p>
                <p class="subItemBot b-2-cl">{{$t('manageFinances.timeLimit')}}</p>
              </div>
              <div class="itemCon5right">
                <p class="subItemTop b-1-cl">
                  {{item.people_number}}{{$t('manageFinances.people')}}
                </p>
                <p class="subItemBot b-2-cl">{{$t('manageFinances.join')}}</p>
              </div>
            </div>
            <div class="itemCon6">
              <c-button class="bottom-button"
                height="40px"
                type="hollow"
                :big="true"
                @click="submit(item.id)">
                {{$t('manageFinances.now')}}
              </c-button>
            </div>
         </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/manageFinances/list/list';
import 'BlockChain-ui/PC/common-mixin/manageFinances/list/list.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
