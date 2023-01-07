<template>
    <div class="broker-system fuz-card">
      <div class="broker-system-header fuz-card-tab">
        <c-navTab
          activeClassName="b-1-cl"
          activeColor="a-12-bg"
          className="b-2-cl"
          :currentTab="currentTab"
          :navTab="navTab"
          :lineHeight="lineHeight"
          :marginRight="marginRight"
          @currentType="currentType"
        />
      </div>
      <div class="broker-user-info fuz-border" :style="customStyle">
        <!-- 用户名称 -->
        <div class="user-name">
          <!-- <div class="top b-2-cl">{{$t('assets.coAccount.accountRight')}}</div> -->
          <div class="top b-1-cl a-12-bd">{{roleName}}</div>
          <div class="phone b-1-cl">{{ userName }}</div>
          <!-- 推广助手 -->
          <c-button
            class="invite-help b-4-cl"
            @click="currentType({index:5})"
            type="text">
            {{$t('brokerSystem.navTab[4]')}}
          </c-button>
        </div>
        <div class="user-text-bar">
          <!-- 直推返佣 -->
          <div class="user-text a-4-bg">
            <span class="title b-2-cl">{{ scaleflag ?
              $t('brokerSystem.text2') : $t('brokerSystem.homeText[1]')}}</span>
            <span class="info b-1-cl">{{ scaleReturn }}</span>
          </div>
          <!-- 子经济分佣 -->
          <div class="user-text a-4-bg" v-if="scaleSub">
            <span class="title b-2-cl">{{$t('brokerSystem.homeText[2]')}}</span>
            <span class="info b-1-cl">{{ scaleSub }}%</span>
          </div>
          <!-- 二级返佣 -->
          <div class="user-text a-4-bg" v-if="scaleSecond">
            <span class="title b-2-cl">{{$t('brokerSystem.homeText[3]')}}</span>
            <span class="info b-1-cl">{{ scaleSecond }}%</span>
          </div>
          <!-- 添加 -->
          <div  style="margin-left:10px;display:inline-block">
                        <c-button
                          type="solid"
                          v-if="scaleflag"
                          :big="true"
                          className="user-button"
                          paddingW="18px"
                          height="30px"
                          @click="addBroker()">{{$t('brokerSystem.text1')}}</c-button>
          </div>
          </div>
      </div>
      <div class="broker-content">
        <overview v-show="currentTab===1" :reqData="reqData"
          :reqReady="reqReady"/>
        <Commission v-if="currentTab===2"/>
        <Lower v-if="currentTab===3"/>
        <TradeSearch v-if="currentTab===4"/>
        <Invite v-if="currentTab===5"/>
        <Studio v-if="currentTab===6"/>
        <ScaleSetting v-if="currentTab===7"/>
      </div>
         <c-dialog :showFlag="dialogFlag"
            paddingBottom="150px"
            paddingTop="14px"
            :confirmLoading="dialogConfirmLoading"
            :confirmDisabled="dialogConfirmDisabled"
            @close="dialogClose"
            @confirm="dialogConfirm"
            :titleText="titleText">
      <!-- 验证框 -->
      <c-inputLine
        name="checkValue"
        promptText="UID/Email/Phone"
        :errorHave="true"
        :errorText="errorText"
        :errorFlag="checkErrorFlag"
        marginTop="0px"
        :value="checkValue"
        @onchanges="inputChanges"
        :disabled="checkValueDisabled"
        @focus="checkFocus"
      >
      </c-inputLine>
      <c-select
        :value="scale"
        :promptText="$t('brokerSystem.text2')"
        @onChanges='scaleChange'
        name="certificateType"
        :errorHave="true"
        :options="scaleList"
        :filterable="true"
      />
    </c-dialog>
    <c-dialog :showFlag="deletedialogFlag"
            paddingBottom="40px"
            paddingTop="40px"
            :confirmLoading="dialogConfirmLoading"
            @close="deletedialogClose"
            @confirm="deletedialogConfirm"
            :titleText="$t('brokerSystem.text3')">
          <div class="cancelAppealDialog">
            <!-- 该经纪人角色若被取消后，将不再享受下级返佣！ -->
            {{ $t('brokerSystem.text4') }}
          </div>
    </c-dialog>
    </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/newBrokerSystem/index/index';
import 'BlockChain-ui/PC/common-mixin/personal/newBrokerSystem/index/index.styl';
import overview from './overview.vue';
import Commission from './commission.vue';
import Lower from './lower.vue';
import TradeSearch from './tradeSearch.vue';
import Invite from './invite.vue';
import Studio from './studio.vue';
import ScaleSetting from './scaleSetting.vue';


export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  components: {
    Commission,
    Lower,
    TradeSearch,
    Invite,
    overview,
    Studio,
    ScaleSetting,
  },
};
</script>
