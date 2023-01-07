<template>
  <section class="v5-page-addressMent ">
    <!-- 添加提币地址 -->
    <div class="addressMent-form fuz-card fuz-gap-small">
      <header class="addressMent-header fuz-card-title">
        <svg class="icon icon-20" aria-hidden="true" @click="goBack">
          <use xlink:href="#icon-v5_36"></use>
        </svg>
        <span>{{ $t('assets.index.addressMent') }}</span>
      </header>
      <div class="add-address">
        <h6 class="v5-5-cl" style='margin-top: 20px'>{{$t('assets.addressMent.addAddress')}}</h6>
        <add-address
          ref="addAddress"
          :selectList="selectList"
          @add="showConfirmVerify"></add-address>
      </div>
    </div>
    <div class="addressmentRecord fuz-card">
      <div class="addressmentRecord-title fuz-card-title">
        <span class="title-text">
          <!-- 地址列表 -->
          {{ $t('assets.addressMent.AddressList') }}
        </span>
      </div>
      <div class="addressMent-table">
        <c-v5-table
          :bodyHeight="420"
          :loading="tabelLoading"
          :columns="columns"
          :imgMap="imgMap"
          :colorMap="colorMap"
          :dataList="tableList">
          <div class="address-qrcode" slot="address" slot-scope="scope">
            <span
              class="qrcode"
              :id="'popover' + scope.row.id"
              @mouseover="qrIconHover(scope.row)"
              @mouseout="qrIconHoverOut">
              <svg
                v-if="qrcodeHover === scope.row.id"
                class="icon icon-14"
                aria-hidden="true">
                <use xlink:href="#icon-assets_11_h"></use>
              </svg>
              <svg
                v-else
                class="icon icon-14"
                aria-hidden="true">
                <use xlink:href="#icon-assets_11"></use>
              </svg>
            </span>
            <span class="col-value">
              {{scope.row.address}}
              <div v-if="scope.row.addressLong" class="long-value v5-5-cl v5-19-bg box-shadow">
                {{scope.row.addressLong}}
              </div>
            </span>
          </div>
          <div slot="operation" slot-scope="scope">
            <c-v5-button
              class="delete-button"
              type="text"
              paddingW="0"
              @click="delAddress(scope.row)"
            >{{scope.row.operation}}</c-v5-button>
          </div>
        </c-v5-table>
      </div>
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
    <c-v5-dialog
      :showFlag="dialogFlag"
      :titleText="$t('assets.addressMent.safetyVerification')"
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
          :palceholder="$t('assets.addressMent.phoneCode')"
          :errorHave="true"
          :errorFlag="phoneError"
          :errorText="$t('assets.addressMent.phoneCodeError')"
          @onChanges="inputLineChange">
          <div class="v5-6-cl" slot="promptExtend">{{$t('assets.addressMent.phoneCode')}}</div>
          <!-- 获取验证码 -->
          <div slot="append">
            <c-v5-getCode
              :voiceOpen ="voiceSmsOpen"
              name="addressGetcode"
              @click="getCodeClick"/>
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
          :palceholder="$t('assets.addressMent.googleCode')"
          :errorHave="true"
          :errorFlag="googleError"
          :errorText="$t('assets.addressMent.googleCodeError')"
          @onChanges="inputLineChange">
          <div class="v5-6-cl" slot="promptExtend">{{$t('assets.addressMent.googleCode')}}</div>
        </c-v5-input>
      </div>
    </c-v5-dialog>
    <transition name="slide-fade">
      <div v-show="addressQRCode" class="qrcode-img">
        <img :src="addressQRCode" alt="" />
      </div>
    </transition>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/addressMent/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/addressMent/index.styl';
import addAddress from './addAddress.vue';

export default {
  mixins: [mixin],
  components: {
    addAddress,
  },
  mounted() {
    this.init();
  },
};
</script>
