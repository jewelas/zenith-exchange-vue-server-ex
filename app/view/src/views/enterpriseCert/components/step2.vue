<template>
  <div class="enterpriseCert-basicInfo">
    <h3 class="step-title v5-5-cl">{{$t('enterpriseCert.item2')}}</h3>
    <div class="info-item">
      <h6 class="info-item_title v5-5-cl">{{$t('enterpriseCert.accountInfo')}}</h6>
      <div class="info-item_tip v5-6-cl">{{$t('enterpriseCert.accountTip')}}</div>
    </div>
    <!-- 公司名称 -->
    <div class="form-item">
      <c-v5-input
        :value="formData.companyName"
        :promptText="$t('enterpriseCert.info1')"
        clearable
        name="companyName"
        @onChanges="inputChange"
      ></c-v5-input>
    </div>
    <!-- 注册号 -->
    <div class="form-item">
      <c-v5-input
        :value="formData.companySign"
        :promptText="$t('enterpriseCert.info2')"
        clearable
        name="companySign"
        @onChanges="inputChange"
      ></c-v5-input>
    </div>
    <!-- 成立日期 -->
    <div class="form-item">
      <div class="form-item_title v5-5-cl">{{$t('enterpriseCert.info3')}}</div>
      <c-v5-calendar
        :value="formData.setUpTime"
        class="date-selecter"
        width="340px"
        name="setUpTime"
        :placeholder="'YYYY-MM-DD'"
        :futureDayHide="futureDayHide"
        @onChanges="dateChange"
      />
    </div>
    <!-- 联系电话 -->
    <div class="form-item">
      <c-v5-select
        :value="formData.dialingCode"
        :promptText="$t('enterpriseCert.info4')"
        width="100px"
        @onChanges='selectChange'
        name="dialingCode"
        :imgMap="imgMap"
        :errorHave="true"
        :options="countryFilterCodeList"
        :filterable="true" />
      <c-v5-input
        width="232px"
        class="ml8"
        type="number"
        :value="formData.phoneNumber"
        :placeholder="$t('enterpriseCert.placeholder')"
        clearable
        name="phoneNumber"
        @onChanges="inputChange"
      ></c-v5-input>
    </div>
    <!-- 资金来源 -->
    <div class="form-item">
      <c-v5-input
        :value="formData.sourceOfFunds"
        :promptText="$t('enterpriseCert.info5')"
        :placeholder="$t('enterpriseCert.placeholder')"
        clearable
        name="sourceOfFunds"
        @onChanges="inputChange"
      ></c-v5-input>
    </div>
    <!-- 业务性质 -->
    <div class="form-item">
      <c-v5-select
        :value="formData.companyBusiness"
        :promptText="$t('enterpriseCert.info6')"
        width="340px"
        @onChanges='selectChange'
        name="companyBusiness"
        :imgMap="imgMap"
        :errorHave="true"
        :options="companyTypes"
        :filterable="true" />
    </div>
    <!-- shenqingyuanyin -->
    <div class="form-item">
      <c-v5-input
        type="textarea"
        :inputStyle="inputStyle"
        :value="formData.applyReason"
        :promptText="$t('enterpriseCert.info7')"
        :placeholder="$t('enterpriseCert.placeholder')"
        clearable
        name="applyReason"
        @onChanges="inputChange"
      ></c-v5-input>
    </div>
    <!-- 注册地址 -->
    <div class="info-item">
      <h6 class="info-item_title v5-5-cl">{{$t('enterpriseCert.info8')}}</h6>
    </div>
    <div class="form-item">
      <c-v5-select
        :value="formData.baseCountry"
        :promptText="$t('enterpriseCert.region')"
        width="164px"
        @onChanges='selectChange'
        name="baseCountry"
        :imgMap="imgMap"
        :errorHave="true"
        :disabled="true"
        :options="countryNameList"
        :filterable="true" />
      <c-v5-input
        :value="formData.baseCity"
        width="166px"
        class="ml8"
        :promptText="$t('enterpriseCert.city')"
        :placeholder="$t('enterpriseCert.placeholder')"
        clearable
        name="baseCity"
        @onChanges="inputChange"
      ></c-v5-input>
    </div>
    <div class="form-item">
      <c-v5-input
        :value="formData.baseStreet"
        :promptText="$t('enterpriseCert.street')"
        :placeholder="$t('enterpriseCert.placeholder')"
        clearable
        name="baseStreet"
        @onChanges="inputChange"
      ></c-v5-input>
    </div>
    <div class="form-item">
      <c-v5-input
        :value="formData.baseZipCode"
        :promptText="$t('enterpriseCert.zipCode')"
        :placeholder="$t('enterpriseCert.placeholder')"
        clearable
        name="baseZipCode"
        @onChanges="inputChange"
      ></c-v5-input>
    </div>
    <!-- 商务运营地址 -->
    <div class="info-item">
      <h6 class="info-item_title v5-5-cl">{{$t('enterpriseCert.info9')}}</h6>
      <div class="info-item_tip v5-6-cl">{{$t('enterpriseCert.option')}}</div>
    </div>
    <div class="form-item">
      <c-redio :value="formData.isSameAddress === 1" @click="redioChange(1)" />
      <span class="v5-5-cl form-item_title ml8">{{$t('enterpriseCert.yes')}}</span>
    </div>
    <div class="form-item">
      <c-redio :value="formData.isSameAddress === 0" @click="redioChange(0)"/>
      <span class="v5-5-cl form-item_title ml8">{{$t('enterpriseCert.no')}}</span>
    </div>
    <!-- 商务运营地址 -->
    <transition name='slideInDown'>
      <div v-show="formData.isSameAddress === 0">
        <div class="form-item">
          <c-v5-select
            :value="formData.businessCountry"
            :promptText="$t('enterpriseCert.region')"
            width="164px"
            @onChanges='selectChange'
            name="businessCountry"
            :imgMap="imgMap"
            :errorHave="true"
            :options="countryNameList"
            :filterable="true" />
          <c-v5-input
            :value="formData.businessCity"
            width="166px"
            class="ml8"
            :promptText="$t('enterpriseCert.city')"
            :placeholder="$t('enterpriseCert.placeholder')"
            clearable
            name="businessCity"
            @onChanges="inputChange"
          ></c-v5-input>
        </div>
        <div class="form-item">
          <c-v5-input
            :value="formData.businessStreet"
            :promptText="$t('enterpriseCert.street')"
            :placeholder="$t('enterpriseCert.placeholder')"
            clearable
            name="businessStreet"
            @onChanges="inputChange"
          ></c-v5-input>
        </div>
        <div class="form-item">
          <c-v5-input
            :value="formData.businessZipCode"
            :promptText="$t('enterpriseCert.zipCode')"
            :placeholder="$t('enterpriseCert.placeholder')"
            clearable
            name="businessZipCode"
            @onChanges="inputChange"
          ></c-v5-input>
        </div>
      </div>
    </transition>
    <div class="enterpriseCert-footer">
      <div>
        <c-v5-button
          type="solid"
          width="150px"
          height="40px"
          paddingW="0"
          :disabled="btnDisabled"
          @click="next"
        >{{$t('enterpriseCert.next')}}</c-v5-button>
        <span
          class="save-draft v5-1-cl"
          @click="saveDraft">{{$t('enterpriseCert.saveDraft')}}</span>
      </div>
      <span
        class="previous v5-6-cl"
        @click="previous">
        <svg class="icon icon-12" aria-hidden="true">
          <use xlink:href="#icon-v5_3"></use>
        </svg>{{$t('enterpriseCert.previous')}}
      </span>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/enterpriseCert/step2/index';
import 'BlockChain-ui/PC/common-mixin/enterpriseCert/step2/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
