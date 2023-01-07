<template>
    <section class="quick">
        <div class="quick-box">
            <!-- 文案 -->
            <div class="quick-left v5-5-cl">
                <div class="quick-left-logo">
                    <svg class="icon icon-14"
                    aria-hidden="true">
                        <use xlink:href="#icon-v5_title" />
                    </svg>
                </div>
                <div class="quick-left-title">
                    {{text[1]}}
                </div>
                <div class="quick-left-list">
                    <div class="quick-left-list-img">
                        <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220515220250934.png" alt="">
                    </div>
                    <div class="quick-left-list-text">
                        <p>{{text[2]}}</p>
                        <p>{{text[3]}}</p>
                        <p>{{text[4]}}</p>
                    </div>
                </div>
            </div>
            <!-- 购买出售 -->
            <div class="quick-right fuz-bg v5-5-cl">
                <!-- tab -->
                <div class="quick-right-tab v5-6-cl">
                    <div class="quick-right-tabItem  quick-right-tabItem-buy"
                    :class="{'v5-5-cl': type === 'BUY', 'fuz-bg': type === 'BUY'}"
                    @click="changeType('BUY')">{{ $t('newOtc.text9') }}</div>
                    <div class="quick-right-tabItem  quick-right-tabItem-sell"
                    :class="{'v5-5-cl': type === 'SELL', 'fuz-bg': type === 'SELL'}"
                    @click="changeType('SELL')">{{ $t('newOtc.text16') }}</div>
                </div>
                <div class='fuz-form-box fuz-bg'>
                <!-- 输入框 -->
                <div class="input-box" v-if="type === 'SELL'">
                    <!-- 币种数量 -->
                    <div class="input-volume-box input-normal-box v5-5-cl">
                        <div class="input-volume-title  input-normal-title" v-if="userInfo">
                            <div>{{text[0]}}</div>
                            <div class="v5-6-cl">
                                {{accountText}}:{{balance}}
                                <span @click="showTrans" v-if="showTransIcon">
                                    <svg class="icon icon-14"
                                        aria-hidden="true">
                                            <use xlink:href="#icon-v5_transfer" />
                                        </svg>
                                </span>
                            </div>

                        </div>
                            <div class="input-box-relative">
                                <c-v5-select-1
                                width="100%"
                                name="coin"
                                :imgMap="imgMap"
                                :options="coinList"
                                :filterable="true"
                                :value="coin"
                                @onChanges="selectChange"
                                :volumes='coinVolume'
                                @inputchanges="inputchanges"
                                @blurInput="blurInput"
                                :promptText1="$t('newOtc.text60')"
                                >
                                </c-v5-select-1>
                                <span class="allBalance v5-1-cl v5-9-bd"
                                @click="allBalance" v-if="userInfo">
                                <!-- 全部 -->
                                {{ $t('newOtc.text61') }}
                                </span>
                                <div class='error-text v5-4-cl' v-if="balanceErrorText">
                                    <svg
                                    class="icon icon-12 details-warking-icon"
                                    aria-hidden="true">
                                        <use xlink:href="#icon-c_2" />
                                    </svg>
                                    {{balanceErrorText}}
                                </div>
                        </div>
                    </div>
                    <!-- 法币价值 -->
                    <div class="input-number-box input-normal-box">
                        <div class="input-volume-title  input-normal-title">
                            <div>
                                <!-- 我将获得 -->
                                {{ $t('newOtc.text62') }}
                            </div>
                        </div>
                        <div class="input-box-relative">
                            <c-v5-select-1
                                width="100%"
                                name="rate"
                                :imgMap="imgMap"
                                :options="rateList"
                                :filterable="true"
                                :value="rate"
                                @onChanges="selectChange"
                                :volumes='rateVolume'
                                @inputchanges="inputchanges"
                                @blurInput="blurInput"
                                :promptText1="$t('newOtc.text63')"
                                >
                                </c-v5-select-1>
                                <div class='error-text v5-4-cl'
                                v-if="maxErrorTextBuy || minErrorTextBuy">
                                    <svg class="icon icon-12 details-warking-icon"
                                    aria-hidden="true">
                                        <use xlink:href="#icon-c_2" />
                                    </svg>
                                    {{maxErrorTextBuy || minErrorTextBuy}}
                                </div>
                        </div>
                    </div>
                </div>
                <!-- 输入框 -->
                <div class="input-box" v-else>
                    <!-- 法币价值 -->
                    <div class="input-number-box input-normal-box">
                        <div class="input-volume-title  input-normal-title">
                            <div>{{text[0]}}</div>
                        </div>
                        <div class="input-box-relative">
                                <c-v5-select-1
                                width="100%"
                                name="rate"
                                :imgMap="imgMap"
                                :options="rateList"
                                :filterable="true"
                                :value="rate"
                                @onChanges="selectChange"
                                :volumes='rateVolume'
                                @inputchanges="inputchanges"
                                @blurInput="blurInput"
                                :promptText1="$t('newOtc.text63')"
                                >
                                </c-v5-select-1>
                                <div class='error-text v5-4-cl'
                                v-if="maxErrorTextBuy || minErrorTextBuy">
                                    <svg class="icon icon-12 details-warking-icon"
                                    aria-hidden="true">
                                        <use xlink:href="#icon-c_2" />
                                    </svg>
                                    {{maxErrorTextBuy || minErrorTextBuy}}
                                </div>
                        </div>

                    </div>
                    <!-- 币种数量 -->
                    <div class="input-volume-box input-normal-box v5-5-cl">
                        <div class="input-volume-title  input-normal-title">
                            <div>
                                <!-- 我将获得 -->
                                {{ $t('newOtc.text62') }}
                            </div>
                        </div>
                          <div class="">
                                <c-v5-select-1
                                width="100%"
                                name="coin"
                                :imgMap="imgMap"
                                :options="coinList"
                                :filterable="true"
                                :value="coin"
                                @onChanges="selectChange"
                                :volumes='coinVolume'
                                @inputchanges="inputchanges"
                                @blurInput="blurInput"
                                :promptText1="$t('newOtc.text60')"
                                >
                                </c-v5-select-1>
                        </div>
                    </div>

                </div>
                <!-- 暂无支持 -->
                <div v-if="noSupport" class="v5-6-cl noSupport">
                  <!-- 非常抱歉，系统暂时无法为您匹配到合适的交易渠道，您可以在C2C尝试更多选择 -->
                  {{ $t('newOtc.text64') }}
                </div>
                <!-- 第三方列表 -->
                <div v-else class="third-box">
                    <div class="input-normal-box">
                        <div class="input-volume-title  input-normal-title">
                            <div>
                                <!-- 交易渠道 -->
                                {{ $t('newOtc.text65') }}
                            </div>
                        </div>

                        <div class="input-box-relative">
                                <c-v5-select
                                width="100%"
                                name="way"
                                :imgMap="imgMap"
                                :options="thirdList"
                                :filterable="true"
                                :value="way"
                                @onChanges="selectChange"
                                >
                                </c-v5-select>
                                <div class="input-box-price">
                                    <div v-if="way && way !== 'c2c'" >
                                         <div class="creditCard-imgs">
                                            <svg class="icon icon-54" aria-hidden="true">
                                                <use xlink:href="#icon-assets_18"></use>
                                            </svg>
                                            <svg class="icon icon-54" aria-hidden="true">
                                                <use xlink:href="#icon-assets_19"></use>
                                            </svg>
                                            <svg class="icon icon-54" aria-hidden="true"
                                             style="margin-right:0">
                                                <use xlink:href="#icon-assets_20"></use>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class='error-text v5-4-cl'
                                v-if="errorCode && errorMsg && way === 'c2c'">
                                <div v-if="errorCode === '2069'"  class='v5-6-cl'>
                                    <svg class="icon icon-12 details-warking-icon"
                                    aria-hidden="true">
                                        <use xlink:href="#icon-assets_6" />
                                    </svg>
                                    {{ $t('newOtc.text66') }},<span
                                    class="nowCheck v5-1-cl"
                                    @click="checkNow">{{ $t('newOtc.text67') }}</span>
                                    <svg class="icon icon-12 details-warking-icon"
                                    aria-hidden="true">
                                        <use xlink:href="#icon-v5_3_h" />
                                    </svg>
                                </div>
                                <div v-else>
                                    <svg class="icon icon-12 details-warking-icon"
                                    aria-hidden="true">
                                        <use xlink:href="#icon-c_2" />
                                    </svg>
                                    {{errorMsg}}
                                </div>

                                </div>
                        </div>
                    </div>
                </div>
                <!-- 确认按钮 -->
                <div class="bottom-button" v-if="userInfo">
                    <c-v5-button
                    width="358px"
                    marginTop="10px"
                    class='fuz-primary-btn'
                    height="44px"
                    @click="submit"
                    :disabled="btnDisabled">{{text[5]}} {{coinShow}}</c-v5-button>
                </div>
                <div class="goLogin-button v5-5-c" v-else>
                    <span class="v5-1-cl"  @click="btnLink('/login')">
                    {{$t('login.login')}}</span>{{$t('trade5.or')}}<span
                    class="v5-1-cl"  @click="btnLink('/register')">{{$t('login.goRegister')}}</span>
                </div>
            </div>
            </div>
        </div>
    <!-- 提示框 -->
    <c-verifyCationc-alert
      :showFlag="alertFlag"
      :imgMap="imgMap"
      :titleText="$t('assets.withdraw.safetyWarning')"
      :detaText="authTitleText"
      :dataList="alertData"
      :buttonText="$t('newOtc.text68')"
      @close="alertClone"
      @confirm="alertGo"/>
    <!-- 生成订单弹窗 -->
    <c-v5-dialog
      :showFlag="dialogFlag"
      :titleText="text[6]"
      :confirmLoading="dialogConfirmLoading"
      :confirmDisabled="dialogConfirmDisabled"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :confirmText='text[6]'>
      <div v-if="type === 'BUY'">
        <div v-if="finalType === 'price'">
            <div class="rate-volume v5-5-cl">  {{rateVolume}} <span>{{rate}}</span></div>
            <div class="coin-volume v5-5-cl" v-if="way === 'c2c'">
                {{$t('newOtc.text69')}}:
                {{fixNum((rateVolume / checkItem.price), coinFix)}} {{coinShow}}
            </div>
            <div class="coin-volume v5-5-cl" v-else>
                {{ $t('newOtc.text69') }}: {{thirdPrice}} {{coinShow}}
            </div>
        </div>
        <div v-else>
            <div class="rate-volume v5-5-cl" v-if="way === 'c2c'">
                {{fixNum((coinVolume * checkItem.price), 2)}} <span>{{rate}}</span></div>
             <div class="rate-volume v5-5-cl" v-else>  {{thirdPrice}} <span>{{rate}}</span></div>
            <div class="coin-volume v5-5-cl">
                {{ $t('newOtc.text69') }}: {{coinVolume}} {{coinShow}}
            </div>
        </div>


        <div class="warn-text v5-6-cl">
            <span v-if="way === 'c2c'">{{ $t('newOtc.text70') }}</span>
            <span v-else>
                <!-- 由于行情存在波动，最终交易以第三方{{thirdObj.serverName}}为准 -->
                {{ $t('newOtc.text71', {serverName: thirdObj.serverName}) }}
                </span>
        </div>
        <div v-if="way === 'c2c'">
            <div v-if="adList.length" class="adList-box">
                <div
                v-for="(item, index) in adList"
                :key="index"
                class="adList-item v5-9-bg v5-5-cl">
                    <div class="adList-item-left">
                        <!-- <img :src="item.paymentLogo" alt=""> -->
                        <span class="line" :style="{'background-color': item.paymentColor}"></span>
                        <div class="adList-item-title">{{item.paymentTitle}}</div>
                        <div v-if="index === 0" class="max-price v5-1-cl v5-17-bg">
                            <!-- 价格最优 -->
                            {{ $t('newOtc.text72') }}
                        </div>
                    </div>
                    <div class="adList-item-right">
                        <div  class="adList-item-price">{{item.price}}</div>
                        <div  class="adList-item-check" @click="changeAd(item, index)">
                            <svg class="icon icon-14"
                            aria-hidden="true" v-if="currentCheck === index">
                                <use xlink:href="#icon-v5_icon5_2" />
                            </svg>
                            <svg class="icon icon-14" aria-hidden="true" v-else>
                                <use xlink:href="#icon-v5_icon5_1" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="adList-box-nodata v5-6-cl">{{ $t('newOtc.text73') }}</div>
        </div>
        <div v-else>
            <div   class="third-note v5-9-bg v5-5-cl">
                <div class="v5-5-cl  third-note-title">{{ $t('newOtc.text74') }}</div>
                <div class="v5-6-cl third-note-content">{{thirdObj.disclaimer}}</div>
            </div>
            <div class="read-box v5-5-cl">
                <div @click="haveRead()" class="read-check">
                    <svg class="icon icon-14" aria-hidden="true" v-if="readCheck">
                        <use xlink:href="#icon-v5_icon5_2" />
                    </svg>
                    <svg class="icon icon-14" aria-hidden="true" v-else>
                        <use xlink:href="#icon-v5_icon5_1" />
                    </svg>
                </div>
                <div>{{ $t('newOtc.text75') }}</div>
            </div>
        </div>

      </div>
      <div v-else>
        <!-- <div class="rate-volume v5-5-cl">  {{coinVolume}} <span>{{coinShow}}</span></div>
        <div class="coin-volume v5-5-cl" v-if="way === 'c2c'">
            {{ $t('newOtc.text69') }}: {{rateVolume}} {{rate}}
        </div>
        <div class="coin-volume v5-5-cl" v-else>
            {{ $t('newOtc.text69') }}: {{thirdPrice}} {{rate}}
        </div> -->
        <div v-if="finalType === 'price'">
            <div class="rate-volume v5-5-cl" v-if="way === 'c2c'">
                {{fixNum((rateVolume / checkItem.price), coinFix)}} <span>{{coinShow}}</span></div>
             <div class="rate-volume v5-5-cl" v-else>
                 {{thirdPrice}} <span>{{coinShow}}</span></div>
            <div class="coin-volume v5-5-cl">
                {{ $t('newOtc.text69') }}: {{rateVolume}} {{rate}}
            </div>
        </div>
        <div v-else>
            <div class="rate-volume v5-5-cl">  {{coinVolume}} <span>{{coinShow}}</span></div>
            <div class="coin-volume v5-5-cl" v-if="way === 'c2c'">
                {{$t('newOtc.text69')}}:
                {{fixNum((coinVolume * checkItem.price), 2)}} {{rate}}
            </div>
            <div class="coin-volume v5-5-cl" v-else>
                {{ $t('newOtc.text69') }}: {{thirdPrice}} {{rate}}
            </div>
        </div>

        <div class="warn-text v5-6-cl">
            <span v-if="way === 'c2c'">{{ $t('newOtc.text70') }}</span>
            <span v-else>{{ $t('newOtc.text71', {serverName: thirdObj.serverName}) }}</span>
        </div>
        <div v-if="way === 'c2c'">
            <div v-if="adList.length" class="adList-box">
                <div
                v-for="(item, index) in adList"
                :key="index" class="adList-item v5-9-bg v5-5-cl">
                    <div class="adList-item-left">
                        <!-- <img :src="item.paymentLogo" alt=""> -->
                        <div class="adList-item-fist">
                            <div class="adList-item-fist-top">
                                <span
                                  class="line"
                                  :style="{'background-color': item.paymentColor}">
                                </span>
                                <div class="adList-item-title">
                                  {{item.paymentTitle}}
                                </div>
                                <div v-if="index === 0" class="max-price v5-1-cl v5-17-bg">
                                    {{ $t('newOtc.text72') }}
                                </div>
                            </div>
                            <div v-if="item.account" class="adList-item-fist-bot v5-6-cl">
                                {{item.account.account}}
                            </div>
                            <div v-else class="adList-item-fist-bot v5-6-cl">
                                <!-- 未绑定收款方式 -->
                                {{ $t('newOtc.text76') }}
                            </div>
                        </div>


                    </div>
                    <div class="adList-item-right">
                        <div  class="adList-item-price">{{item.price}}</div>
                        <div  class="adList-item-check" @click="changeAd(item, index)">
                            <svg class="icon icon-14"
                            aria-hidden="true" v-if="currentCheck === index">
                                <use xlink:href="#icon-v5_icon5_2" />
                            </svg>
                            <svg class="icon icon-14" aria-hidden="true" v-else>
                                <use xlink:href="#icon-v5_icon5_1" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="password-input">
                    <c-v5-input
                    width="100%"
                    type='password'
                    name="password"
                    :placeholder="$t('newOtc.text77')"
                    :promptText="$t('newOtc.text77')"
                    :value="password"
                    :errorText="$t('assets.otcAccount.volumeError')"
                    @onChanges="passwordinputChange">
                   </c-v5-input>
                </div>
                <div class="setUp-link v5-1-cl" >
                    <span @click="btnLink('/personal/setUp')">{{ $t('newOtc.text78') }}</span>
                </div>
            </div>
            <div v-else class="adList-box-nodata v5-6-cl">{{ $t('newOtc.text73') }}</div>
        </div>
          <div v-else>
            <div   class="third-note v5-9-bg v5-5-cl">
                <div class="v5-5-cl  third-note-title">{{ $t('newOtc.text74') }}</div>
                <div class="v5-6-cl third-note-content">{{thirdObj.disclaimer}}</div>
            </div>
            <div class="read-box v5-5-cl">
                <div @click="haveRead()" class="read-check">
                    <svg class="icon icon-14" aria-hidden="true" v-if="readCheck">
                        <use xlink:href="#icon-v5_icon5_2" />
                    </svg>
                    <svg class="icon icon-14" aria-hidden="true" v-else>
                        <use xlink:href="#icon-v5_icon5_1" />
                    </svg>
                </div>
                <div>{{ $t('newOtc.text75') }}</div>
            </div>
        </div>
      </div>

    </c-v5-dialog>
    <!-- 生成订单弹窗 -->
    <c-v5-dialog
      :showFlag="returnFlag"
      :titleText="$t('newOtc.text79')"
      @close="dialogClose"
      @confirm="returnConfirm"
      :confirmText="$t('newOtc.text80')">
       <div  class="return-box">
           <p class="v5-5-cl">
               <!-- 1.{{thirdObj.serverName}}会在您付款成功后的2~10分钟之内，将您购买的数字货币充值到您的币币账户充值地址中。 -->
               {{ $t('newOtc.text81', {serverName: thirdObj.serverName}) }}
            </p>
           <p class="v5-5-cl">
               <!-- 2.当付款完成，您会收到来自{{thirdObj.serverName}}的邮件 -->
               {{ $t('newOtc.text82', {serverName: thirdObj.serverName}) }}
            </p>
           <p class="v5-5-cl">
               <!-- 3.付款完成后，{{thirdObj.serverName}}将通过充值的方式充值至您的币币账户 -->
               {{ $t('newOtc.text83', {serverName: thirdObj.serverName}) }}
            </p>
           <p class="v5-5-cl">
               <!-- 4.如果您有任何问题，请联系{{thirdObj.serverName}}的客服服务 -->
               {{ $t('newOtc.text84', {serverName: thirdObj.serverName}) }}({{thirdObj.feedback}})
            </p>
       </div>
      </c-v5-dialog>
          <!-- 划转 -->
    <c-v5-dialog
      :showFlag="showTransfer"
      :titleText="$t('assets.otcAccount.CapitalTransfer')"
      :confirmText="$t('assets.leverageAccount.transfer')"
      :confirmDisabled="transferDisabled"
      size="large"
      @close="closeTransfer"
      @confirm="confirmTransfer">
      <div class="transfer-form">
        <!-- 账户 -->
        <div class="transfer-account" :class="{ 'reverse': transferSide === 2 }">
          <div class="exchange account-side">
            <c-v5-input
              width="184px"
              name="exchangeAccount"
              :readonly="true"
              :value="$t('assets.index.exchangeAccount')">
              <div class="v5-6-cl" slot="promptExtend">
                {{transferSide === 1 ? $t('assets.otcAccount.from') : $t('assets.otcAccount.to')}}
              </div>
            </c-v5-input>
              <div class="available v5-6-cl">
                {{$t('assets.otcAccount.Available')}}:
                {{exchangeAvailable | thousands}}&nbsp;{{transferCoin}}
              </div>
          </div>
          <div class="change-icon">
            <svg class='icon icon-24' aria-hidden='true' @click="changeTransferSide">
              <use xlink:href='#icon-assets_9'></use>
            </svg>
          </div>
          <div class="other account-side">
            <c-v5-input width="184px" :readonly="true" :value="$t('assets.index.otcAccount')">
              <div class="v5-6-cl" slot="promptExtend">
                {{transferSide === 2 ? $t('assets.otcAccount.from') : $t('assets.otcAccount.to')}}
              </div>
            </c-v5-input>
              <div class="available v5-6-cl">
                {{$t('assets.otcAccount.Available')}}:
                {{otherAvailable | thousands}}&nbsp;{{transferCoin}}
              </div>
          </div>
        </div>
        <!-- 币种 -->
        <div class="transfer-coin">
          <c-v5-select
            width="100%"
            name="transferCoin"
            :imgMap="imgMap"
            :options="otcCoinList"
            :filterable="true"
            :value="transferCoin"
            @onChanges="selectChangeTran">
            <div class="v5-6-cl" slot="promptExtend">
              {{$t('assets.otcAccount.coin')}}
            </div>
          </c-v5-select>
        </div>
        <div class="transfer-num">
          <c-v5-input
            width="100%"
            name="transferNum"
            :placeholder="$t('trade.pleaseInput') + $t('assets.otcAccount.volume')"
            :value="transferNum"
            :clearable="true"
            :errorFlag="transferError"
            :errorText="$t('assets.otcAccount.volumeError')"
            :warningText="transferWarningText"
            @onChanges="inputChangeTran">
            <div class="v5-6-cl" slot="promptExtend">
              {{$t('assets.otcAccount.volume')}}
            </div>
            <span
              class="transfer-all v5-1-cl"
              slot="append"
              @click="transferAll">{{$t('assets.otcAccount.all')}}</span>
          </c-v5-input>
        </div>
      </div>
    </c-v5-dialog>
    </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newOtc/quick/index';
import 'BlockChain-ui/PC/common-mixin/newOtc/quick/index.styl';


export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  components: {

  },
};
</script>
<style scoped>
.quick-right{
  height: 540px !important;
}
.fuz-form-box{
    height: 470px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
}
</style>
