<template>
  <div class="user-management-exccAuthorization">
    <p class="user-management-child-header b-1-cl a-3-bd">
      {{$t('personal.exccAuthorization.title2')}}
    </p>
    <div class="loadinBox" v-if="isLoading">
      <c-loading size="60" />
    </div>
    <div v-else class="user-management-center">
      <div v-if="authLevel === 0 || active === '1'" class="audit-information">
        <svg class="icon icon-50" aria-hidden="true">
          <use xlink:href="#icon-g_3"></use>
        </svg>
        <p>{{$t('personal.idAuth.wait')[0]}}
          <br/>{{$t('personal.idAuth.wait')[1]}}</p>
      </div>
      <div v-else>
        <p class="note b-7-cl">
          <svg class="icon icon-16" aria-hidden="true" style="marginRight: 5px">
              <use xlink:href="#icon-c_2"></use>
            </svg>
          {{$t('personal.exccAuthorization.title')}}
        </p>
        <div class="idAuth-center clearfix">
          <!-- 别名 -->
          <c-inputLine
              name="aliasname"
              inputType="text"
              :promptText="$t('personal.exccAuthorization.promptText1')"
              :errorHave="true"
              :disabled="true"
              :value="aliasname"
            >
          </c-inputLine>
          <!-- 性别 -->
          <c-inputLine
              name="sex"
              inputType="text"
              :promptText="$t('personal.exccAuthorization.promptText2')"
              :errorHave="true"
              :disabled="true"
              :value="sex"
            >
          </c-inputLine>
           <!-- 身份证/居住证/护照号码 -->
          <c-inputLine
              name="uinfin"
              inputType="text"
              :promptText="$t('personal.exccAuthorization.promptText3')"
              :errorHave="true"
              :disabled="true"
              :value="uinfin"
            >
          </c-inputLine>
          <!-- 全名 -->
          <c-inputLine
              name="name"
              inputType="text"
              :promptText="$t('personal.exccAuthorization.promptText4')"
              :errorHave="true"
              :disabled="true"
              :value="name"
            >
          </c-inputLine>
          <!-- 国籍 -->
          <c-inputLine
              name="nationality"
              inputType="text"
              :promptText="$t('personal.exccAuthorization.promptText5')"
              :errorHave="true"
              :disabled="true"
              :value="nationality"
            >
          </c-inputLine>
          <!-- 居留身份 -->
          <c-inputLine
              name="residentialstatus"
              inputType="text"
              :promptText="$t('personal.exccAuthorization.promptText6')"
              :errorHave="true"
              :disabled="true"
              :value="residentialstatus"
            >
          </c-inputLine>
          <!-- {{dob}}12 -->
          <!-- 出生日期 -->
          <c-inputLine
              name="dob"
              inputType="text"
              :promptText="$t('personal.exccAuthorization.promptText7')"
              :errorHave="true"
              :disabled="true"
              :value="dob"
            >
          </c-inputLine>
          <!-- 出生国家 -->
          <c-inputLine
              name="birthcountry"
              inputType="text"
              :promptText="$t('personal.exccAuthorization.promptText8')"
              :errorHave="true"
              :disabled="true"
              :value="birthcountry"
            >
          </c-inputLine>
          <!-- 注册地址 -->
          <c-inputLine
              name="regadd"
              inputType="text"
              :promptText="$t('personal.exccAuthorization.promptText9')"
              :errorHave="true"
              :disabled="true"
              :value="regadd"
            >
          </c-inputLine>
          <!-- 手机号码 -->
          <c-inputLine
              name="mobileno"
              inputType="text"
              :promptText="$t('personal.exccAuthorization.promptText10')"
              :errorHave="true"
              errorText=""
              maxLength="13"
              :value="mobileno"
              @onchanges="inputChanges"
            >
          </c-inputLine>
          <!-- 通信地址 -->
          <c-inputLine
              name="mailadd"
              inputType="text"
              :promptText="$t('personal.exccAuthorization.promptText11')"
              :errorHave="true"
              maxLength="50"
              :value="mailadd"
              @onchanges="inputChanges"
            >
          </c-inputLine>
          <!-- 收入来源 -->
          <c-select
            :filterable="true"
            :value="income"
            :promptText="$t('personal.exccAuthorization.promptText12')"
            @onChanges='incomeChange'
            name="income"
            :errorHave="true"
            :options="incomeList"
          />
          <!-- 您选择了其他收入来源，请描述 -->
          <c-inputLine
              v-if="income === '6'"
              name="qtTExt"
              inputType="text"
              :promptText="$t('personal.exccAuthForm.text15')"
              marginTop="0px"
              maxLength="256"
              :value="qtTExt"
              @onchanges="inputChanges"
          />
          <c-button type="solid"
                  :big="true"
                  className=""
                  paddingW="0px"
                  :disabled="disabled"
                  marginTop="18px"
                  height="40px"
                  width="100%"
                  @click="submitData()">{{$t('personal.exccAuthorization.submit')}}</c-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/exccAuthorization/exccAuthorization';
import 'BlockChain-ui/PC/common-mixin/personal/exccAuthorization/exccAuthorization.styl';

export default {
  mixins: [mixin],
  created() {
    this.init();
  },
};
</script>
