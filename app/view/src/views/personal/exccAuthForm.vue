<template>
  <div class="user-management-excc-auth-form a-5-bg">
    <p class="user-management-child-header b-1-cl a-3-bd">{{$t('personal.idAuth.title')}}</p>
    <div class="user-management-center">
      <div class="certification-process">
        <div class="div-line a-3-bd clearfix"></div>
        <div class="step-left a-5-bg">
          <p :class="this.activeP1">
            <span class="span-mark b-8-cl clearfix a-12-bg">1</span>
            {{$t('personal.idAuth.info')}}</p>
        </div>
        <div class="step-center a-5-bg">
          <p :class="this.activeP2">
            <span class="span-mark b-8-cl clearfix" :class="this.activeS2">2</span>
            {{$t('personal.idAuth.uploadDocuments')}}</p>
        </div>
        <div class="step-right a-5-bg">
          <p :class="this.activeP3">
            <span class="span-mark b-8-cl clearfix" :class="this.activeS3">3</span>
            {{$t('personal.idAuth.submitted')}}</p>
        </div>
      </div>
      <div class="idAuth-center clearfix">
        <div v-if="active === '1'">
          <!-- 姓名 -->
          <c-inputLine
              name="full_name"
              inputType="text"
              :promptText="$t('personal.exccAuthForm.promptText1')"
              :errorHave="true"
              maxLength="50"
              :errorFlag="checkErrorFlag2"
              marginTop="0px"
              :value="full_name"
              @onchanges="inputChanges"
            >
          </c-inputLine>
          <!-- 性别 -->
          <div class="gender">
            <span class="gender-tit">{{$t('personal.exccAuthForm.promptText2')}}</span>
            <label @click="selectGender('0')">
              <c-redio :value="sex === '0'"/>
              {{$t('personal.exccAuthForm.sex1')}}
            </label>
            <label @click="selectGender('1')">
              <c-redio :value="sex === '1'"/>
              {{$t('personal.exccAuthForm.sex2')}}
            </label>
          </div>
          <!-- 出生日期 -->
          <!-- <c-calendar
            name="birthday"
            :value="birthday"
            :promptText="$t('personal.exccAuthForm.promptText3')"
            :errorHave="true"
            :errorFlag="checkErrorFlag2"
            :defaultShowDate="defaultShowDate"
            marginTop="0px"
            @onChanges="onChangeCalendar"
          /> -->
          <!-- 出生日期 -->
          <c-inputLine
              name="birthday"
              inputType="text"
              :promptText="$t('personal.exccAuthForm.promptText3')"
              :errorHave="true"
              :value="birthday"
              :errorFlag="birthdayErrorFlag"
              :errorText="birthdayErrorText"
              :warningText="$t('personal.exccAuthForm.text17')"
              @onchanges="inputChanges"
            >
          </c-inputLine>
          <!-- 住宅地址 -->
          <c-inputLine
              name="address"
              inputType="text"
              :promptText="$t('personal.exccAuthForm.promptText4')"
              :errorHave="true"
              :errorFlag="checkErrorFlag2"
              marginTop="0px"
              maxLength="50"
              :value="address"
              @onchanges="inputChanges"
            >
          </c-inputLine>
          <!-- 市 -->
          <c-inputLine
              name="city"
              inputType="text"
              :promptText="$t('personal.exccAuthForm.promptText5')"
              :errorHave="true"
              :errorFlag="checkErrorFlag2"
              marginTop="0px"
              maxLength="50"
              :value="city"
              @onchanges="inputChanges"
            >
          </c-inputLine>
          <!-- 邮政编码 -->
          <c-inputLine
              name="postcode"
              inputType="text"
              :promptText="$t('personal.exccAuthForm.promptText6')"
              :errorHave="true"
              :errorFlag="checkErrorFlag2"
              marginTop="0px"
              maxLength="50"
              :value="postcode"
              @onchanges="inputChanges"
            >
          </c-inputLine>
          <!-- 国家或地区 -->
          <c-inputLine
              name="country"
              inputType="text"
              :promptText="$t('personal.exccAuthForm.promptText7')"
              :errorHave="true"
              :disabled="true"
              :value="kycNationality"
            >
          </c-inputLine>
          <!-- 身份证/居住证/护照号码 -->
          <c-inputLine
            name="certificateNumber"
            maxLength="50"
            inputType="text"
            :promptText="$t('personal.exccAuthForm.promptText8')"
            :errorHave="true"
            :errorText="errorText1"
            :errorFlag="checkErrorFlag1"
            marginTop="0px"
            :value="certificateNumber"
            @onchanges="inputChanges">
          </c-inputLine>
          <!-- 收入来源 -->
          <c-select
            :filterable="true"
            :value="income"
            :promptText="$t('personal.exccAuthForm.promptText9')"
            @onChanges='incomeChange'
            name="income"
            :errorHave="true"
            :errorFlag="incomeErrorFlag"
            :errorText='errorText'
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
          >
          </c-inputLine>
           <c-button
            type="solid"
            :big="true"
            :disabled="disabled"
            marginTop="18px"
            height="40px"
            width="100%"
            @click="btnLink(1)"
            >{{ $t("personal.idAuth.next") }}
          </c-button>
        </div>
        <div v-if="active === '2'">
          <div>
            <!-- 上传1 正面-->
            <div class="upload1 clearfix">
              <div class="upload1-left a-4-bg a-2-bd clearfix">
                <div v-if="firstPhotoLoading">
                  <c-loading
                    size="34"
                    className="common-button-loading a-12-bd"
                  />
                  <p class="b-4-cl loading-text">
                    {{ $t("personal.prompt.uploading") }}
                  </p>
                </div>
                <div class="loading-Img" v-else>
                  <svg class="icon icon-24" aria-hidden="true">
                    <use xlink:href="#icon-e_9"></use>
                  </svg>
                  <p class="b-4-cl">
                    {{
                      firstPhoto
                        ? $t('personal.exccAuthForm.text10')
                        : $t('personal.exccAuthForm.text11')
                    }}
                  </p>
                </div>
                <div class="loading-mc b-2-bg" v-if="firstPhotoImg !== ''">
                  <img :src="firstPhotoImg" class="loading-img" />
                  <div class="b-2-bg"></div>
                </div>
                <c-oldUploadFile
                  className="upload_file"
                  maxSize="8"
                  name="firstPhoto"
                  url="common/upload_img"
                  :isOpenUploadImg="isOpenUploadImg"
                  :expand="[]"
                  imageType="1"
                  @tellMessage="onChangeFileFun"
                  @uploadFinish="uploadFinish"
                >
                </c-oldUploadFile>
              </div>
              <div class="upload1-right clearfix" :style="bg1"></div>
            </div>
            <!-- 上传2 背面-->
            <div class="upload2 clearfix">
              <div class="upload2-left a-4-bg a-2-bd clearfix">
                <div v-if="secondPhotoLoading">
                  <c-loading
                    size="34"
                    className="common-button-loading a-12-bd"
                  />
                  <p class="b-4-cl loading-text">
                    {{ $t("personal.prompt.uploading") }}
                  </p>
                </div>
                <div class="loading-Img" v-else>
                  <svg class="icon icon-24" aria-hidden="true">
                    <use xlink:href="#icon-e_9"></use>
                  </svg>
                  <p class="b-4-cl">
                    {{
                      secondPhoto
                        ? $t('personal.exccAuthForm.text8')
                        : $t('personal.exccAuthForm.text9')
                    }}
                  </p>
                </div>
                <div class="loading-mc b-2-bg" v-if="secondPhotoImg !== ''">
                  <img :src="secondPhotoImg" class="loading-img" />
                  <div class="b-2-bg"></div>
                </div>
                <c-oldUploadFile
                  className="upload_file"
                  maxSize="8"
                  name="secondPhoto"
                  url="common/upload_img"
                  :isOpenUploadImg="isOpenUploadImg"
                  :expand="[]"
                  imageType="1"
                  @tellMessage="onChangeFileFun"
                  @uploadFinish="uploadFinish"
                >
                </c-oldUploadFile>
              </div>
              <div class="upload2-right clearfix" :style="bg2"></div>
            </div>
            <!-- 上传3  手持证件-->
            <div class="upload3 clearfix">
              <div class="upload2-left a-4-bg a-2-bd clearfix">
                <div v-if="thirdPhotoLoading">
                  <c-loading
                    size="34"
                    className="common-button-loading a-12-bd"
                  />
                  <p class="b-4-cl loading-text">
                    {{ $t("personal.prompt.uploading") }}
                  </p>
                </div>
                <div class="loading-Img" v-else>
                  <svg class="icon icon-24" aria-hidden="true">
                    <use xlink:href="#icon-e_9"></use>
                  </svg>
                  <p class="b-4-cl">
                    {{
                      thirdPhoto
                        ? $t('personal.exccAuthForm.text12')
                        : $t('personal.exccAuthForm.text13')
                    }}
                  </p>
                </div>
                <div class="loading-mc" v-if="thirdPhotoImg !== ''">
                  <img :src="thirdPhotoImg" class="loading-img" />
                  <div class="b-2-bg"></div>
                </div>
                <c-oldUploadFile
                  className="upload_file"
                  maxSize="8"
                  name="thirdPhoto"
                  url="common/upload_img"
                  :isOpenUploadImg="isOpenUploadImg"
                  :expand="[]"
                  :isWaterMark="true"
                  imageType="1"
                  @tellMessage="onChangeFileFun"
                  @uploadFinish="uploadFinish"
                >
                </c-oldUploadFile>
              </div>
              <div class="upload2-right clearfix" :style="bg3"></div>
            </div>
            <!-- 上传4  居住证 -->
            <div class="upload4 clearfix">
              <div class="upload2-left a-4-bg a-2-bd clearfix">
                <div v-if="livePhotoLoading">
                  <c-loading size="34" className="common-button-loading a-12-bd"/>
                  <p class="b-4-cl loading-text">{{$t('personal.prompt.uploading')}}</p>
                </div>
                <div class="loading-Img" v-else>
                  <svg class="icon icon-24" aria-hidden="true">
                    <use xlink:href="#icon-e_9"></use>
                  </svg>
                  <p class="b-4-cl">
                    {{livePhoto ?
                    $t('personal.exccAuthForm.text1') :
                    $t('personal.exccAuthForm.text2') }}
                  </p>
                </div>
                <div class="loading-mc" v-if="livePhotoImg !== ''">
                  <img :src="livePhotoImg" class="loading-img"/>
                  <div class="b-2-bg"></div>
                </div>
                <c-oldUploadFile
                  className="upload_file"
                  maxSize= "8"
                  name= "livePhoto"
                  url= "common/upload_img"
                  :isOpenUploadImg= "isOpenUploadImg"
                  :expand= []
                  :isWaterMark="true"
                  imageType="1"
                  @tellMessage="onChangeFileFun"
                  @uploadFinish="uploadFinish">
                </c-oldUploadFile>
              </div>
              <div class="upload2-right clearfix" :style="bg4"></div>
            </div>
            <div class="upload-text clearfix">
              <p>1、{{$t('personal.exccAuthForm.text3')}}</p>
              <p>2、{{$t('personal.exccAuthForm.text4')}}</p>
              <p>3、{{$t('personal.exccAuthForm.text5')}}</p>
              <p v-if="kycMetaText.length">4、{{ kycMetaText }}</p>
              <p>
                <span v-if="kycMetaText.length">5、</span>
                <span v-else>4、</span>
                {{$t('personal.exccAuthForm.text7')}}
              </p>
            </div>
            <c-button
              type="solid"
              :big="true"
              className=""
              paddingW="0px"
              :loading="loading"
              :disabled="disabled2"
              marginTop="18px"
              height="40px"
              width="100%"
              @click="btnLink(2)"
              >{{ $t("personal.tool.submit") }}</c-button
            >
          </div>
        </div>
        <div v-if="active === '3'">
          <div class="audit-information">
            <svg class="icon icon-50" aria-hidden="true">
              <use xlink:href="#icon-g_3"></use>
            </svg>
            <p>
              {{ $t("personal.idAuth.wait")[0] }} <br />{{
                $t("personal.idAuth.wait")[1]
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/exccAuthForm/exccAuthForm';
import 'BlockChain-ui/PC/common-mixin/personal/exccAuthForm/exccAuthForm.styl';

export default {
  mixins: [mixin],
  created() {
    this.init();
  },
  mounted() {
    this.mountedInit();
  },
};
</script>
