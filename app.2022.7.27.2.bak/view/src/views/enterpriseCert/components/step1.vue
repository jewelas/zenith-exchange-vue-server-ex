<template>
  <div class="enterpriseCert-prepare">
    <h3 class="step-title v5-5-cl">{{$t('enterpriseCert.item1')}}</h3>
    <div class="prepareTip v5-6-cl">{{$t('enterpriseCert.prepareTip')}}</div>
    <div class="country-select">
      <c-v5-select
        :value="country"
        :promptText="$t('enterpriseCert.region')"
        width="340px"
        @onChanges='countryChange'
        name="country"
        :imgMap="imgMap"
        :errorHave="true"
        :options="countryListMoy"
        :filterable="true" />
    </div>
    <div class="companyType-select">
      <c-v5-select
        :value="companyType"
        :promptText="$t('enterpriseCert.enterpriseType')"
        width="340px"
        @onChanges='companyTypeChange'
        name="companyType"
        :imgMap="imgMap"
        :errorHave="true"
        :options="companyTypeList"
        :filterable="true" />
    </div>
    <div v-if="companyType === 3" class="companyType-other">
      <c-v5-input
        :value="companyOther"
        :promptText="$t('enterpriseCert.enterpriseTypeDetail')"
        clearable
        name="companyOther"
        @onChanges="inputChange">
      </c-v5-input>
    </div>
    <h3 class="step-title list-title v5-5-cl">{{$t('enterpriseCert.list')}}</h3>
    <div class="listTip v5-6-cl">{{$t('enterpriseCert.listTip')}}</div>
    <ul class="list-wrap">
      <!-- 注册证书 -->
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">1.{{$t('enterpriseCert.list1')}}</h6>
      </li>
      <!-- 公司章程 -->
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">2.{{$t('enterpriseCert.list2')}}</h6>
      </li>
      <!-- 董事名册/董事职权证明书(注册代理人证书)/注册信息摘要 -->
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">3.{{$t('enterpriseCert.list3')}}</h6>
        <div class="list-item_tip v5-6-cl">{{$t('enterpriseCert.list3Tip')}}</div>
      </li>
      <!-- 股东名册/董事职权证明书(注册代理人证书)/注册信息摘要 -->
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">4.{{$t('enterpriseCert.list4')}}</h6>
        <div class="list-item_tip v5-6-cl">{{$t('enterpriseCert.list4Tip')}}</div>
      </li>
      <!-- 所有权结构图 -->
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">5.{{$t('enterpriseCert.list5')}}</h6>
        <div class="list-item_tip v5-6-cl">{{$t('enterpriseCert.list5Tip')}}</div>
        <div class="download-temp">
          <span class="v5-6-cl">{{$t('enterpriseCert.download')}}</span>&nbsp;
          <a
            href="javascript:void;"
            @click="download(templateList[0])"
            class="v5-1-cl">{{$t('enterpriseCert.template')}}</a>
        </div>
      </li>
      <!-- 制裁问卷 -->
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">6.{{$t('enterpriseCert.list6')}}</h6>
        <div class="list-item_tip v5-6-cl">{{$t('enterpriseCert.list6Tip')}}</div>
        <div class="download-temp">
          <span class="v5-6-cl">{{$t('enterpriseCert.download')}}</span>&nbsp;
          <a
            href="javascript:void;"
            @click="download(templateList[1])"
            class="v5-1-cl">{{$t('enterpriseCert.template')}}</a>
        </div>
      </li>
      <!-- 授权信 -->
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">7.{{$t('enterpriseCert.list7')}}</h6>
        <div class="list-item_tip v5-6-cl">1)&nbsp;{{$t('enterpriseCert.list7Tip1')}}</div>
        <div class="list-item_tip v5-6-cl">2)&nbsp;{{$t('enterpriseCert.list7Tip2')}}</div>
        <div class="download-temp">
          <span class="v5-6-cl">{{$t('enterpriseCert.download')}}</span>&nbsp;
          <a
            href="javascript:void;"
            @click="download(templateList[2])"
            class="v5-1-cl">{{$t('enterpriseCert.template')}}</a>
        </div>
      </li>
      <!-- 经营状况证明 -->
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">8.{{$t('enterpriseCert.list8')}}</h6>
        <div class="list-item_tip v5-6-cl">{{$t('enterpriseCert.list8Tip')}}</div>
        <div class="list-item_tip v5-6-cl">1)&nbsp;{{$t('enterpriseCert.list8Tip1')}}</div>
        <div class="list-item_tip v5-6-cl">2)&nbsp;{{$t('enterpriseCert.list8Tip2')}}</div>
        <div class="list-item_tip v5-6-cl">3)&nbsp;{{$t('enterpriseCert.list8Tip3')}}</div>
      </li>
      <!-- 中间层股东信息 -->
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">9.{{$t('enterpriseCert.list9')}}</h6>
        <div class="list-item_tip v5-6-cl">1)&nbsp;{{$t('enterpriseCert.list9Tip1')}}</div>
        <div class="list-item_tip v5-6-cl">2)&nbsp;{{$t('enterpriseCert.list9Tip2')}}</div>
      </li>
      <!-- 公司网站 -->
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">10.{{$t('enterpriseCert.list10')}}</h6>
      </li>
      <!-- 相关人员证件 -->
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">11.{{$t('enterpriseCert.list11')}}</h6>
        <div class="list-item_tip v5-6-cl">{{$t('enterpriseCert.list11Tip')}}</div>
      </li>
      <!-- 相关人员近照 -->
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">12.{{$t('enterpriseCert.list12')}}</h6>
        <div class="list-item_tip v5-6-cl">{{$t('enterpriseCert.list12Tip')}}</div>
      </li>
    </ul>
    <div class="enterpriseCert-footer">
      <div>
        <c-v5-button
          type="solid"
          width="150px"
          height="40px"
          paddingW="0"
          :disabled="btnDisabled"
          @click="start"
        >{{$t('enterpriseCert.start')}}</c-v5-button>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/enterpriseCert/step1/index';
import 'BlockChain-ui/PC/common-mixin/enterpriseCert/step1/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
