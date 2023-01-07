<template>
  <section class="v5-page-withdraw">
    <div class="withdraw-form fuz-card-plain">
      <!-- 提现 -->
      <header class="withdraw-header v5-5-cl">
        <svg class="icon icon-20" aria-hidden="true" @click="goBack">
          <use xlink:href="#icon-v5_36"></use>
        </svg>
        <span>{{ $t('assets.withdraw.withdraw') }}</span>
      </header>
      <div class="withdraw-details a-7-bd">
        <div class="details-left">
          <c-v5-select
            width="340px"
            name="symbol"
            :imgMap="imgMap"
            :promptText="$t('assets.otcAccount.coin')"
            :options="withdrawCoinList"
            :filterable="true"
            :value="symbol"
            @onChanges="selectChange"></c-v5-select>
          <div class="numberList">
            <ul class="numberList-key v5-5-cl">
              <!-- 总额 -->
              <li>{{ $t('assets.withdraw.lumpSum') }}</li>
              <!-- 可用 -->
              <li>{{ $t('assets.withdraw.Available') }}</li>
              <!-- 冻结 -->
              <li>{{ $t('assets.withdraw.freeze') }}</li>
            </ul>
            <ul class="numberList-value v5-5-cl">
              <li v-for="(item, index) in detailsList" :key="index">
                {{ item.value }}
              </li>
            </ul>
          </div>
          <div class="amount-tips">
            <div class="v5-5-cl">{{$t('assets.b2c.warning')}}</div>
            <ul>
              <li>
                <span class="v5-6-cl">{{$t('assets.withdraw.withdrawable')}}</span>
                <i class="v5-5-cl">{{withdrawalbe}}&nbsp;{{showSymbol}}</i>
              </li>
              <li>
                <span class="v5-6-cl">{{$t('assets.withdraw.withdrawLimit')}}</span>
                <i class="v5-5-cl">{{withdrawalLimit}}&nbsp;USDT</i>
              </li>
            </ul>
          </div>
          <div class="details-warking b-7-cl fuz-gap">
            <svg class="icon icon-16" aria-hidden="true" style="marginRight: 10px">
              <use xlink:href="#icon-c_2"></use>
            </svg>
            <!-- 最小提币限额 -->
            <template v-if="idAuth === 1">
            {{ $t('assets.withdraw.MinimumCoinLimit') }} {{withdrawMin}}，
            </template>
            <!-- 最大提币限额 -->
            {{ $t('assets.withdraw.MaximumCoinLimit') }} {{withdrawMax}}
            <br/>
          </div>
          <!-- notice -->
          <!-- <div class="notice">
            <div class="fuz-text-large fuz-gap" style='color:#fff'>Notice</div>
            <p class='fuz-link-text fuz-text-small'>
              When transferring funds to your FUZIONX custodial wallet,
              transaction fees are waived and transaction speeds are increased.
            </p>
            <p class='fuz-link-text fuz-text-small fuz-gap'>
              As Upbit exchange has launched new compliance rules,
              FUZIONX is connecting relevant businesses with Upbit.
              To prevent irreversible asset loss,
              users should temporarily avoid withdrawing assets from FUZIONX
              to Upbit until this situation is fully resolved.
            </p>
            <p class='fuz-text-small'>
              Please do not withdraw funds to an ICO address or
              for the purposes of crowdfunding.
              FUZIONX will not be responsible for distributing any future tokens you might receive.
            </p>
          </div> -->

        </div>
        <div class="cut-line v5-12-bg"></div>
        <div class="details-right">
          <div class="details-branch" v-if="showBranch">
            <mainChain
              :branchTip="branchTip"
              :branchArr="branchArr"
              :activeBranch="activeBranch"
              @setActiveBranch="setActiveBranch"/>
          </div>
          <div class="withdraw-address">
            <div class="title">
              <span class="v5-6-cl">{{$t('assets.withdraw.CoinAddress')}}</span>
              <span
                class="v5-1-cl addressMent"
                @click="goAddress">{{$t('assets.index.addressMent')}}</span>
            </div>
            <div class="address-select">
              <div
                class="input-content v5-9-bg"
                :class="inputHover || inputFocus ? 'v5-1-bd' : 'v5-9-bd'"
                @mouseover="inputHover = true"
                @mouseout="inputHover = false">
                <input
                  type="text"
                  class="v5-5-cl"
                  :placeholder="$t('trade.pleaseInput') + $t('assets.withdraw.CoinAddress')"
                  :value="addressText"
                  @input="addressInput"
                  @focus="inputFocus = true"
                  @blur="inputFocus = false" />
                <span
                  v-if="addressValue"
                  class="clear"
                  @click="addressValue = ''"
                  @mouseover="clearHover = true"
                  @mouseout="clearHover = false">
                  <svg v-show="!clearHover" class="icon icon-12" aria-hidden="true">
                    <use xlink:href="#icon-v5_37"></use>
                  </svg>
                  <svg v-show="clearHover" class="icon icon-12" aria-hidden="true">
                    <use xlink:href="#icon-v5_37_h"></use>
                  </svg>
                </span>
              </div>
              <transition name="slide-fade">
                <ul v-show="inputFocus" class="select-option v5-10-bg v5-9-bd">
                  <li
                    v-for="(item, index) in addressList"
                    :key="index"
                    class="option"
                    :class="{'v5-9-bg': optionHover === item.code || optionSelect === item.code }"
                    @mouseover="optionHover = item.code"
                    @mouseout="optionHover = null"
                    @click="addressChange(item)">
                    <div class="text v5-5-cl">{{item.value}}</div>
                    <div class="subText v5-6-cl">{{item.label}}</div>
                  </li>
                  <li class="addNew v5-1-cl v5-9-bd" @click="addWithdrawAddress">
                    <svg class="icon icon-12" aria-hidden="true">
                      <use xlink:href="#icon-assets_10"></use>
                    </svg>{{$t('assets.addressMent.addAddress')}}
                  </li>
                </ul>
              </transition>
            </div>
          </div>
          <!-- 标签 -->
          <div class="memo" v-if="isHavePage">
            <c-v5-input
              name="pagesValue"
              width="378px"
              :placeholder="$t('assets.withdraw.label')"
              :value="pagesValue"
              :readonly="!canLableEdit"
              @onChanges="inputChange">
              <div slot="promptExtend" class="v5-6-cl">{{$t('assets.withdraw.label')}}</div>
            </c-v5-input>
            <div
              class="addressBox-page-icon"
              @mouseover="helpIconHover = true"
              @mouseout="helpIconHover = false">
              <svg v-if="!helpIconHover" class="icon icon-12" aria-hidden="true">
                <use xlink:href="#icon-assets_6"></use>
              </svg>
              <svg v-if="helpIconHover" class="icon icon-12" aria-hidden="true">
                <use xlink:href="#icon-assets_6_h"></use>
              </svg>
              <transition name="slide-fade">
                <div v-show="helpIconHover" class="iconPage-market v5-19-bg v5-5-cl box-shadow">
                  {{ $t('assets.withdraw.pageText') }}
                </div>
              </transition>
            </div>
          </div>
          <!-- 提币数量 -->
          <div
            class="withdraw-num"
            :class="{ hasError: numberOptions.error && numberOptions.text }">
            <c-v5-input
              name="numberValue"
              width="378px"
              :placeholder="$t('assets.withdraw.NumberOfCoins')"
              @onChanges="inputChange"
              :value="numberValue"
              :errorFlag="numberOptions.error"
              :errorText="numberOptions.text">
              <div class="v5-6-cl" slot="promptExtend">{{$t('assets.withdraw.NumberOfCoins')}}</div>
              <!-- 全部提现 -->
              <span class="allWithdraw v5-1-cl" slot="append" @click="allWithDraw">
                {{ $t('assets.withdraw.allWithdraw') }}
              </span>
            </c-v5-input>
          </div>
          <!-- 矿工手续费 -->
          <div class="withdraw-fee v5-6-cl">
            {{$t('assets.withdraw.fee')}}: {{proceduresValue}}
          </div>
          <!-- 提现按钮 -->
          <c-v5-button
            width="378px"
            marginTop="35px"
            class="fuz-primary-btn"
            height="40px"
            @click="withdrawClick"
            :disabled="btnDisabled">{{ $t('assets.withdraw.buttonWithdraw') }}</c-v5-button>
        </div>
        <div v-if="symbol_withdraw_msg" class="withdrawMsg v5-6-cl">
          <p>{{$t('application.applyRegion.focus')}}</p>
          <p>{{symbol_withdraw_msg}}</p>
        </div>
      </div>
    </div>
    <!-- 最近充值记录 -->
    <div class="withdrawRecord fuz-card">
      <div class="withdrawRecord-title fuz-card-title">
        <span class="title-text">
          {{ $t('assets.withdraw.RecentWithdrawalRecords') }}
        </span>
        <span class="all-record v5-1-cl" @click="lookAll">{{$t('assets.otcAccount.all')}}</span>
      </div>
      <div class="withdraw-table">
        <c-v5-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          :loading="tabelLoading"
          :bodyHeight="420"
          :columns="columns"
          :dataList="tabelList"
        >
          <!-- 币种 -->
          <dl
            v-if="coinList && coinList[scope.row.coin]"
            slot="coin" slot-scope="scope" class="table-coin">
            <dt>
              <img :src="coinList[scope.row.coin].icon" alt="" />
            </dt>
            <dd>
              <div class="coinShowName v5-5-cl">{{scope.row.coin | getCoinShowName(coinList)}}</div>
              <div class="coinLongName v5-6-cl">
                {{ coinList[scope.row.coin].longName || scope.row.coin }}
              </div>
            </dd>
          </dl>
          <!-- 地址 -->
          <div class="address-col" slot="address" slot-scope="scope">
            <span class="col-value">{{scope.row.address}}</span>
            <span
              class="copy"
              @click="copy(scope.row.addressLong)">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-assets_7"></use>
              </svg>
            </span>
            <div class="long-value v5-5-cl v5-19-bg box-shadow">
              {{scope.row.addressLong}}
            </div>
          </div>
          <!-- 交易ID -->
          <div class="address-col" slot="txid" slot-scope="scope">
            <span class="col-value">{{scope.row.txid}}</span>
            <span
              v-if="scope.row.txidLong"
              class="copy"
              @click="copy(scope.row.txidLong)">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-assets_7"></use>
              </svg>
            </span>
            <div v-if="scope.row.txidLong" class="long-value v5-5-cl v5-19-bg box-shadow">
              {{scope.row.txidLong}}
            </div>
          </div>
          <!-- 操作 -->
          <div slot="operation" class="operation" slot-scope="scope">
            <span v-if="scope.row.status === 0" class="revoke v5-1-cl" @click="revoke(scope.row)">
              {{scope.row.operation}}
            </span>
            <span v-else>--</span>
          </div>
        </c-v5-table>
        <c-v5-pagination
          v-if="paginationObj.total > paginationObj.display"
          :total='paginationObj.total'
          :display='paginationObj.display'
          :currentPage='paginationObj.currentPage'
          @pagechange="pagechange"/>
      </div>
    </div>
    <!-- 提示框 -->
    <c-verifyCationc-alert
      :showFlag="alertFlag"
      :imgMap="imgMap"
      :titleText="$t('assets.withdraw.safetyWarning')"
      :detaText="authTitleText"
      :dataList="alertData"
      :buttonText="$t('assets.withdraw.GotoOpen')"
      @close="alertClone"
      @confirm="alertGo"/>
    <!-- 添加提币地址 -->
    <c-v5-dialog
      :showFlag="showAddressDialog"
      :titleText="$t('assets.addressMent.addAddress')"
      :haveOption="false"
      @close="showAddressDialog = false">
      <add-address
        chainTitleClass="v5-5-cl"
        :selectList="addressCoinList"
        :defaultSymbol="symbol"
        ref="addAddress"
        @add="showConfirmVerify"></add-address>
    </c-v5-dialog>
    <!-- 对话框  38-24=14 -->
    <c-v5-dialog
      :showFlag="dialogFlag"
      :titleText="$t('assets.withdraw.safetyVerification')"
      :confirmLoading="dialogConfirmLoading"
      :confirmDisabled="dialogConfirmDisabled"
      @close="dialogClose"
      @confirm="dialogConfirm">
      <!-- 手机号验证框 -->
      <div class="valid-form_item">
        <c-v5-input
          v-if="OpenMobile"
          maxLength="6"
          name="phoneValue"
          width="378px"
          :value="phoneValue"
          :placeholder="$t('assets.withdraw.phoneCode')"
          :errorHave="true"
          :errorFlag="phoneError"
          :errorText="$t('assets.withdraw.phoneCodeError')"
          @onChanges="inputChange"
        >
          <div class="v5-6-cl" slot="promptExtend">{{$t('assets.withdraw.phoneCode')}}</div>
          <!-- 获取验证码 -->
          <div slot="append">
            <c-v5-getCode
              name="withdrawGetcode"
              :voiceOpen ="voiceSmsOpen"
              @click="getCodeClick"/>
          </div>
        </c-v5-input>
      </div>
      <div class="valid-form_item">
      <!-- 邮箱验证框 -->
        <c-v5-input
          v-if="hasEmail"
          maxLength="6"
          name="emailCode"
          width="378px"
          :value="emailCode"
          :placeholder="$t('register.emailCode')"
          :errorHave="true"
          :errorFlag="emailError"
          :errorText="$t('register.emailCodeError')"
          @onChanges="inputChange"
        >
          <div class="v5-6-cl" slot="promptExtend">{{$t('register.emailCode')}}</div>
          <!-- 获取验证码 -->
          <div slot="append">
            <c-v5-getCode
              name="withdrawGetEmailCode"
              @click="getEmailCodeClick"/>
          </div>
        </c-v5-input>
      </div>
      <!-- 谷歌验证码 -->
      <div class="valid-form_item">
        <c-v5-input
          v-if="OpenGoogle"
          maxLength="6"
          name="googleValue"
          width="378px"
          :value="googleValue"
          :placeholder="$t('assets.withdraw.googleCode')"
          :errorHave="true"
          :errorFlag="googleError"
          :errorText="$t('assets.withdraw.googleCodeError')"
          @onChanges="inputChange"
        >
          <div class="v5-6-cl" slot="promptExtend">{{$t('assets.withdraw.googleCode')}}</div>
        </c-v5-input>
      </div>
    </c-v5-dialog>
    <!-- 提示框 -->
    <c-alert :showFlag="notIdShowDialog"
        :buttonText="$t('otcRelease.DeCertification')"
        :imgMap="imgMap"
        @close="alertClone"
        @confirm="gotoAuth">
      <div class="ts-content-text">
        {{$t('personal.exccAuthForm.text19')}}
      </div>
    </c-alert>
    <!-- 提现二次确认 -->
    <c-v5-dialog
      :showFlag="showConfirmDialog"
      :titleText="$t('assets.withdraw.confrim')"
      @confirm="doWithdraw"
      @close="showConfirmDialog = false">
      <div class="withdraw-confirm">
        <div class="confirm-title">
          <div class="v5-6-cl">{{$t('assets.withdraw.withdrawVolume')}}</div>
          <p class="v5-5-cl">{{numberValue | thousands}}&nbsp;{{showSymbol}}</p>
        </div>
        <ul class="info-list">
          <li class="list-item">
            <span class="key v5-6-cl">{{$t('assets.b2c.arrivalAccount')}}</span>
            <span class="value v5-5-cl">{{(numberValue - proceduresValue) | fixDFn(this)}}</span>
          </li>
          <li class="list-item">
            <span class="key v5-6-cl">{{$t('assets.withdraw.fee')}}</span>
            <span class="value v5-5-cl">{{proceduresValue}}</span>
          </li>
          <li class="list-item">
            <span class="key v5-6-cl">{{$t('assets.withdraw.mainChain')}}</span>
            <span class="value v5-5-cl">{{mainChainName}}</span>
          </li>
          <li class="list-item">
            <span class="key v5-6-cl">{{$t('assets.withdraw.withdrawAddress')}}</span>
            <span class="value v5-5-cl">{{addressText}}</span>
          </li>
        </ul>
        <div v-if="trustType === 1" class="trust-tip b-7-cl">
          {{$t('assets.withdraw.trustTip')}}
        </div>
        <div class="doWithdrawTip v5-6-cl">{{$t('assets.withdraw.doWithdrawTip')}}</div>
      </div>
    </c-v5-dialog>
    <!-- 复制使用 -->
    <input ref="copyValue" class="copyValue" type="text" :value="copyValue" />
    <div v-show="loading" class="assets-loading">
      <c-loading size="50" />
    </div>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/withdraw/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/withdraw/index.styl';
import mainChainMixins from 'BlockChain-ui/PC/common-mixin/newAssets/mainChainMixins';
import mainChain from './mainChain.vue';
import addAddress from './addAddress.vue';

export default {
  mixins: [mixin, mainChainMixins],
  components: {
    mainChain,
    addAddress,
  },
  mounted() {
    this.init();
  },
};

</script>
<style scoped>
.details-left {
  width: 455px !important
}
</style>
