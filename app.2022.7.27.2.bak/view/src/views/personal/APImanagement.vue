<template>
  <div class='fuz-card with-title'>
    <ModifyApi v-if="modifyApiShow" :getApiList="getApiList"></ModifyApi>
    <div class='two-column'>
      <div>
        <p class="header-top-title fuz-card-title">
          {{this.$t('personal.APImanagement.navTab')[0]}}
        </p>
        <div class="center1-inputs clearfix fuz-card-content" style="width: 384px">
            <div  class="center1-input clearfix" :style="enStyle">
              <c-inputLine
                name="ip"
                inputType="text"
                :promptText="promptText1"
                :errorHave="true"
                :errorText="errorText1"
                :errorFlag="checkErrorFlag1"
                marginTop="0px"
                :value="checkValue1"
                @onchanges="inputChanges"
              >
              </c-inputLine>
            </div>
            <div class="center1-input clearfix" :style="enStyle">
              <c-inputLine
                name="note"
                maxLength="25"
                inputType="text"
                :promptText="promptText2"
                :errorHave="true"
                :errorText="errorText2"
                :errorFlag="checkErrorFlag2"
                marginTop="0px"
                :value="checkValue2"
                @onchanges="inputChanges"
              >
              </c-inputLine>
            </div>
            <div class="center1-input clearfix" v-show="smsCode" :style="enStyle">
              <c-inputLine
                maxLength="6"
                name="phoneCode"
                inputType="text"
                :promptText="promptText3"
                :errorHave="true"
                :errorText="errorText3"
                :errorFlag="checkErrorFlag3"
                marginTop="0px"
                :value="checkValue3"
                @onchanges="inputChanges"
              >
                <!-- 获取验证码 -->
                <c-getCode
                  name="phone"
                  :autoStart="autoStart"
                  :voiceOpen ="voiceSmsOpen"
                  @click="getCodeClick"
                  buttonName="loginGetcodeBtn"/>
              </c-inputLine>
            </div>
            <div class="center1-input clearfix" v-show="googleCode" :style="enStyle">
              <c-inputLine
                name="googleCode"
                maxLength="6"
                inputType="text"
                :promptText="promptText4"
                :errorHave="true"
                :errorText="errorText4"
                :errorFlag="checkErrorFlag4"
                marginTop="0px"
                :value="checkValue4"
                @onchanges="inputChanges"
              >
              </c-inputLine>
            </div>
            <div class="center1-header">
              <p class="fuz-content-small">
                <svg class="icon icon-16" aria-hidden="true" style="margin-right: 10px;">
                  <use xlink:href="#icon-c_2"></use>
                </svg>
                <span>{{$t('personal.prompt.warningApi')}}</span>
              </p>
            </div>
            <div class="center1-button clearfix">
              <c-button type="solid"
                  :big="true"
                  className="fuz-primary-btn"
                  :loading="loading2"
                  paddingW="0px"
                  :disabled="disabled"
                  marginTop="18px"
                  height="40px"
                  width="100%"
                  @click="btnLink"
              >
                {{$t('personal.tool.create')}}
              </c-button>
            </div>
          </div>
        </div>
        <div class="api-management fuz-clear-float" v-if="!modifyApiShow">
          <div class="api-management-header-top fuz-noborder fuz-clear-float">
            <p class="header-top-title fuz-card-title">
              {{$t('personal.APImanagement.apiDocument')}}
            </p>
            <div class="header-top-center fuz-card-content">
              <div v-if="!thirdApiDocUrl" class="top-center-text fuz-gap">
                <span class="b-1-cl">{{$t('personal.APImanagement.domainName')}}：</span>
                <span class="b-1-cl">{{openApiUrl}}</span>
              </div>
              <div class="fuz-primary-btn small">
                <a :href="apiNoteUrl"
                  target="_blank"
                  class="api-document">
                  {{$t('personal.APImanagement.lookApiDocument')}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- table -->
      <div class="api-management-center">
        <div class="center1 clearfix  fuz-clear-float " v-show="currentTab === 1">
          <div class="center1-table clearfix fuz-noborder">
            <p class="fuz-card-title" style='width:100%'>
              {{$t('personal.APImanagement.recordTitle')}}
            </p>
            <c-table
              :imgMap="imgMap"
              className='transparent'
              :colorMap="colorMap"
              :loading = 'loading'
              :classes = 'classes'
              :headClasses = 'headClasses'
              :bodyClasses =  'bodyClasses'
              :lineClasses = 'lineClass'
              :columns = "columns"
              :dataList = "apiList"
              :lineNumber = 'lineNumber'
              :cellHeight = 'cellHeight'
              :headHeight = 'headHeight'
              @elementClick = 'deleteData'
            />
            <c-pagination v-show="count !== 0"
                        :total="count"
                        :current-page='page'
                        :display='pageSize'
                        @pagechange="pagechange">
            </c-pagination>
          </div>
        </div>
        <div class="center2 clearfix" v-show="currentTab === 2">
          <a href="https://github.com/exchange-doc/api/blob/master/api/zh_cn/api_doc_cn.md"
             @mouseenter="handMouseenter"
             @mouseleave="handMouseleave"
             target="_blank"
             class="api-down a-12-bd b-2-cl">{{$t('personal.APImanagement.downloadDocumen')}}</a>
          <c-table
            :imgMap="imgMap"
            :colorMap="colorMap"
            className='transparent'
            :classes = 'classes'
            :headClasses = 'headClasses'
            :bodyClasses =  'bodyClasses'
            :lineClasses = 'lineClass'
            :columns = "columns2"
            :dataList = "apiList2"
            :lineNumber = 'lineNumber'
            :cellHeight = 'cellHeight'
            :headHeight = 'headHeight'
            @elementClick = 'deleteData'
          />
        </div>
        <div class="center3 clearfix" v-show="currentTab === 3">
          <a href="https://github.com/exchange-doc/api/blob/master/api/zh_cn/api_doc_cn.md"
             target="_blank"
             @mouseenter="handMouseenter"
             @mouseleave="handMouseleave"
             class="api-down a-12-bd b-2-cl">{{$t('personal.APImanagement.downloadDocumen')}}</a>
          <c-table
            :imgMap="imgMap"
            :colorMap="colorMap"
            :classes = 'classes'
            :headClasses = 'headClasses'
            :bodyClasses =  'bodyClasses'
            :lineClasses = 'lineClass'
            :columns = "columns2"
            :dataList = "apiList3"
            :lineNumber = 'lineNumber'
            :cellHeight = 'cellHeight'
            :headHeight = 'headHeight'
            @elementClick = 'deleteData'
          />
        </div>
      </div>
      <c-dialog :showFlag="dialogFlag"
              paddingBottom="14px"
              :confirmLoading="dialogConfirmLoading"
              :confirmDisabled="dialogConfirmDisabled"
              @close="dialogClose"
              @confirm="dialogConfirm"
              :titleText="titleText">
        <div class="dialog-div a-4-bg">
          <ul>
            <li class="a-5-bd">
              <p class="b-2-cl">{{$t('personal.APImanagement.secretKey')}}</p>
              <p class="b-2-cl">{{secretKey}}
                <span @click="copyClick('secretKey')"
                      @mouseenter="handMouseenters('secretKey')"
                      @mouseleave="handMouseleaves('secretKey')">>
                <span v-if="secretKeyShow">
                  <svg class="icon icon-14" aria-hidden="true">
                    <use xlink:href="#icon-a_9"></use>
                  </svg>
                </span>
                <span v-else>
                  <svg class="icon icon-14" aria-hidden="true">
                    <use xlink:href="#icon-a_9_1"></use>
                  </svg>
                </span>
              </span>
              </p>
            </li>
            <li class="a-5-bd">
              <p class="b-2-cl">{{$t('personal.APImanagement.APIKye')}}</p>
              <p class="b-2-cl">{{apiKey}}
                <span @click="copyClick('apiKey')"
                      @mouseenter="handMouseenters('apiKey')"
                      @mouseleave="handMouseleaves('apiKey')">
                <span v-if="apiKeyShow">
                  <svg class="icon icon-14" aria-hidden="true">
                    <use xlink:href="#icon-a_9"></use>
                  </svg>
                </span>
                <span v-else>
                  <svg class="icon icon-14" aria-hidden="true">
                    <use xlink:href="#icon-a_9_1"></use>
                  </svg>
                </span>
              </span>
              </p>
            </li>
            <li class="b-4-bd">
              <p class="b-2-cl">{{$t('personal.APImanagement.ip')}}</p>
              <p class="b-2-cl">{{checkValue1}}</p>
            </li>
          </ul>
        </div>
      </c-dialog>
      <!-- 提示框 -->
      <c-alert :showFlag="alertFlag"
             :buttonText="$t('assets.addressMent.GotoOpen')"
             :imgMap="imgMap"
             @close="alertClose"
             @confirm="alertGo">
        <div class="alertTitle b-2-cl">{{$t('personal.alert.title')}}</div>
        <div class="alertText">{{$t('personal.alert.text')}}</div>
        <div class="alertError a-2-bd">
          <span class="alertError-text b-4-cl">{{$t('personal.alert.alertErrorTextGoogle')}}</span>
          <span class="alertError-icon">+</span>
        </div>
        <div class="alertError alertBot a-2-bd">
          <span class="alertError-text b-4-cl">{{$t('personal.alert.alertErrorTextPhone')}}</span>
          <span class="alertError-icon">+</span>
        </div>
      </c-alert>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/APImanagement/APImanagement';
import 'BlockChain-ui/PC/common-mixin/personal/APImanagement/APImanagement.styl';
import ModifyApi from './modifyApi.vue';

export default {
  mixins: [mixin],
  components: {
    ModifyApi,
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.two-column {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 160px;
}
</style>
