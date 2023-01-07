<template>
  <div class="enterpriseCert-uploadFile">
    <h3 class="step-title v5-5-cl">{{$t('enterpriseCert.item3')}}</h3>
    <ul class="list-wrap">
      <!-- 注册证书 -->
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">1.{{$t('enterpriseCert.list1')}}</h6>
        <c-attachment
          name="1"
          :value="fileList['1']"
          :maxSize="5"
          sizeType="MB"
          :promptText="$t('enterpriseCert.attachment')"
          @change="fileChange"></c-attachment>
      </li>
      <!-- 公司章程 -->
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">2.{{$t('enterpriseCert.list2')}}</h6>
        <c-attachment
          name="2"
          :value="fileList['2']"
          :maxSize="5"
          sizeType="MB"
          :promptText="$t('enterpriseCert.attachment')"
          @change="fileChange"></c-attachment>
      </li>
      <!-- 董事名册/董事职权证明书(注册代理人证书)/注册信息摘要 -->
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">3.{{$t('enterpriseCert.list3')}}</h6>
        <div class="list-item_tip v5-6-cl">{{$t('enterpriseCert.list3Tip')}}</div>
        <c-attachment
          name="3"
          :value="fileList['3']"
          :maxSize="5"
          sizeType="MB"
          :promptText="$t('enterpriseCert.attachment')"
          @change="fileChange"></c-attachment>
      </li>
      <!-- 股东名册/董事职权证明书(注册代理人证书)/注册信息摘要 -->
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">4.{{$t('enterpriseCert.list4')}}</h6>
        <div class="list-item_tip v5-6-cl">{{$t('enterpriseCert.list4Tip')}}</div>
        <c-attachment
          name="4"
          :value="fileList['4']"
          :maxSize="5"
          sizeType="MB"
          :promptText="$t('enterpriseCert.attachment')"
          @change="fileChange"></c-attachment>
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
        <c-attachment
          name="5"
          :value="fileList['5']"
          :maxSize="5"
          sizeType="MB"
          :promptText="$t('enterpriseCert.attachment')"
          @change="fileChange"></c-attachment>
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
        <c-attachment
          name="6"
          :value="fileList['6']"
          :maxSize="5"
          sizeType="MB"
          :promptText="$t('enterpriseCert.attachment')"
          @change="fileChange"></c-attachment>
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
        <c-attachment
          name="7"
          :value="fileList['7']"
          :maxSize="5"
          sizeType="MB"
          :promptText="$t('enterpriseCert.attachment')"
          @change="fileChange"></c-attachment>
      </li>
      <!-- 经营状况证明 -->
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">8.{{$t('enterpriseCert.list8')}}</h6>
        <div class="list-item_tip v5-6-cl">{{$t('enterpriseCert.list8Tip')}}</div>
        <div class="list-item_tip v5-6-cl">1)&nbsp;{{$t('enterpriseCert.list8Tip1')}}</div>
        <div class="list-item_tip v5-6-cl">2)&nbsp;{{$t('enterpriseCert.list8Tip2')}}</div>
        <div class="list-item_tip v5-6-cl">3)&nbsp;{{$t('enterpriseCert.list8Tip3')}}</div>
        <c-attachment
          name="8"
          :value="fileList['8']"
          :maxSize="5"
          sizeType="MB"
          :promptText="$t('enterpriseCert.attachment')"
          @change="fileChange"></c-attachment>
      </li>
      <!-- 中间层股东信息 -->
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">9.{{$t('enterpriseCert.list9')}}</h6>
        <div class="list-item_tip v5-6-cl">1)&nbsp;{{$t('enterpriseCert.list9Tip1')}}</div>
        <div class="list-item_tip v5-6-cl">2)&nbsp;{{$t('enterpriseCert.list9Tip2')}}</div>
        <c-attachment
          name="9"
          :value="fileList['9']"
          :maxSize="5"
          sizeType="MB"
          :promptText="$t('enterpriseCert.attachment')"
          @change="fileChange"></c-attachment>
      </li>
      <!-- 公司网站 -->
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">10.{{$t('enterpriseCert.list10')}}</h6>
        <c-v5-input
          width="340px"
          :value="fileList['10']"
          :placeholder="$t('enterpriseCert.placeholder')"
          clearable
          name="companyNet"
          @onChanges="inputChange"
        ></c-v5-input>
        <div class="input-tip">{{$t('enterpriseCert.websiteTip')}}</div>
      </li>
      <!-- 补充材料 -->
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">11.{{$t('enterpriseCert.other')}}</h6>
        <c-attachment
          name="11"
          :value="fileList['11']"
          :maxSize="5"
          sizeType="MB"
          :promptText="$t('enterpriseCert.attachment')"
          @change="fileChange"></c-attachment>
      </li>
    </ul>
    <div class="attachment-tip v5-9-bg v5-5-cl">
      <svg class="icon icon-12" aria-hidden="true">
        <use xlink:href="#icon-v5_35"></use>
      </svg>
      {{$t('enterpriseCert.attachmentTip')}}
    </div>
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
import mixin from 'BlockChain-ui/PC/common-mixin/enterpriseCert/step3/index';
import 'BlockChain-ui/PC/common-mixin/enterpriseCert/step3/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
