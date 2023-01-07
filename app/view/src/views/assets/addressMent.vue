<template>
  <section class="page-addressMent">
    <!-- 添加提币地址 -->
    <header class="addressMent-header b-1-cl a-3-bd">
      {{ $t('assets.addressMent.addAddress') }}
    </header>
    <div class="addressBox clearfix a-7-bd">
      <div class="addressBox-left" :class="{'autoW':isHavePage}">
        <div class="clearfix">
          <!-- 添加地址 -- 币种 -->
          <div class="addressBox-select">
            <c-select :promptText="$t('assets.addressMent.coin')"
              :errorHave="false"
              :value="symbolValue"
              :options="selectList"
              :filterable="true"
              @onChanges="selectLineChange"/>
          </div>
          <!-- 添加地址 -- 链名称 -->
          <div class="addressBox-select addressBox-select-branch"
            v-if="showBranch">
            <c-select :promptText="$t('assets.branchName')"
              :errorHave="false"
              :value="activeBranch"
              :options="branchArr"
              :filterable="true"
              @onChanges="setActiveBranch">
              <span slot="promptExtend">
                <div class="mainChain-title" v-if="branchTip">
                  <div class="mainChain-page-icon">
                    <svg class="icon icon-14" aria-hidden="true">
                      <use xlink:href="#icon-a_15"></use>
                    </svg>
                    <ul class="mainChain-page-market a-4-bg">
                      <li>
                        {{branchTip}}
                      </li>
                      <!-- <li class="warn b-7-cl">
                        充提时请务必核对USDT的主链类型
                      </li> -->
                    </ul>
                  </div>
                </div>
              </span>
            </c-select>
          </div>
          <!-- 添加地址 -- 地址 -->
          <div class="addressBox-address">
            <c-inputLine name="addressValue"
              :promptText="$t('assets.addressMent.WithdrawalAddress')"
              :errorHave="false"
              :value="addressValue"
              @onchanges="inputLineChange"/>
          </div>
        </div>
        <div>
          <!-- 添加地址 -- 备注 -->
          <div class="addressBox-remarks">
            <c-inputLine name="remarksValue"
              maxLength="20"
              :promptText="$t('assets.addressMent.Remarks')"
              :errorHave="false"
              :value="remarksValue"
              @onchanges="inputLineChange"/>
          </div>
          <!-- 添加地址 -- 标签 -->
          <div class="addressBox-pages" v-if="isHavePage">
            <c-inputLine name="pagesValue"
              maxLength="64"
              className="addressTag"
              :promptText="$t('assets.addressMent.label')"
              :errorHave="false"
              :value="pagesValue"
              @onchanges="inputLineChange">
              <div class="addressBox-page-icon">
                <svg class="icon icon-14" aria-hidden="true">
                  <use xlink:href="#icon-a_15"></use>
                </svg>
                <div class="addressBox-page-market a-4-bg">
                  {{ $t('assets.addressMent.pageText') }}
                </div>
              </div>
            </c-inputLine>
          </div>
        </div>
      </div>
      <div class="addressBox-right">
        <!-- 添加 -->
        <c-button width="120px"
          height="40px"
          :disabled="addressBtnDisabled"
          @click="addressBtnClick">{{ $t('assets.addressMent.add') }}</c-button>
      </div>
    </div>
    <header class="addressMent-header b-1-cl a-3-bd">
      <!-- 地址列表 -->
      {{ $t('assets.addressMent.AddressList') }}
      <!-- 添加地址 -- 币种 -->
      <!-- <div class="header-select">
        <c-select promptText='币种'
          :errorHave="false"
          :value="symbolValue"
          :options="selectList"
          @onChanges="selectLineChange"/>
      </div> -->
    </header>
    <div class="addressMent-table">
      <c-table
        :loading="tabelLoading"
        :columns="columns"
        :imgMap="imgMap"
        :colorMap="colorMap"
        :dataList="tableList"
        @elementClick="tableClick"
      />
      <c-pagination v-if="paginationObj.total > paginationObj.display"
        :total='paginationObj.total'
        :display='paginationObj.display'
        :currentPage='paginationObj.currentPage'
        @pagechange="pagechange"/>
    </div>
    <!-- 提示框 -->
    <c-verifyCationc-alert
      :showFlag="alertFlag"
      :imgMap="imgMap"
      :titleText="$t('assets.addressMent.safetyWarning')"
      :detaText="authTitleText"
      :dataList="alertData"
      :buttonText="$t('assets.addressMent.GotoOpen')"
      @close="alertClone"
      @confirm="alertGo"/>
    <!-- 对话框  38-24=14 -->
    <c-dialog :showFlag="dialogFlag"
      paddingBottom="14px"
      :confirmLoading="dialogConfirmLoading"
      :confirmDisabled="dialogConfirmDisabled"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :titleText="$t('assets.addressMent.safetyVerification')">
      <!-- 手机号验证框 -->
      <c-inputLine
        v-if="OpenMobile"
        maxLength="6"
        name="phoneValue"
        :value="phoneValue"
        :promptText="$t('assets.addressMent.phoneCode')"
        :errorHave="true"
        :errorFlag="phoneError"
        :errorText="$t('assets.addressMent.phoneCodeError')"
        @onchanges="inputLineChange"
      >
        <!-- 获取验证码 -->
        <c-getCode
          :voiceOpen ="voiceSmsOpen"
          name="addressGetcode"
          @click="getCodeClick"/>
      </c-inputLine>
      <!-- 谷歌验证码 -->
      <c-inputLine
        v-if="OpenGoogle"
        maxLength="6"
        name="googleValue"
        :value="googleValue"
        :promptText="$t('assets.addressMent.googleCode')"
        :errorHave="true"
        :errorFlag="googleError"
        :errorText="$t('assets.addressMent.googleCodeError')"
        @onchanges="inputLineChange"
      ></c-inputLine>
    </c-dialog>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/addressMent/addressMent';
import 'BlockChain-ui/PC/common-mixin/assets/addressMent/addressMent.styl';
import mainChainMixins from 'BlockChain-ui/PC/common-mixin/assets/mainChainMixins';

export default {
  mixins: [mixin, mainChainMixins],
  mounted() {
    this.init();
  },
};
</script>
