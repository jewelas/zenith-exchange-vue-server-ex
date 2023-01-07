<template>
  <div class="user-management-id-auth a-5-bg">
    <p class="user-management-child-header b-1-cl a-3-bd">
      {{ $t("personal.idAuth.title") }}
    </p>
    <div class="user-management-center a-5-bg">
      <div class="certification-process" v-if="!cropPassSwitch">
        <div class="div-line a-3-bd clearfix"></div>
        <div class="step-left a-5-bg">
          <p :class="this.activeP1">
            <span class="span-mark b-8-cl clearfix a-12-bg">1</span>
            {{ $t("personal.idAuth.info") }}
          </p>
        </div>
        <div class="step-center a-5-bg">
          <p :class="this.activeP2">
            <span class="span-mark b-8-cl clearfix" :class="this.activeS2"
              >2</span
            >
            {{ $t("personal.idAuth.uploadDocuments") }}
          </p>
        </div>
        <div class="step-right a-5-bg">
          <p :class="this.activeP3">
            <span class="span-mark b-8-cl clearfix" :class="this.activeS3"
              >3</span
            >
            {{ $t("personal.idAuth.submitted") }}
          </p>
        </div>
      </div>
      <div class="idAuth-center clearfix">
        <div v-if="active === '1'">
          <!-- 国家或地区 -->
          <c-inputLine
            :promptText="$t('personal.kyc.areaTitle')"
            :value="kycNationality"
            :disabled="true"
            :errorHave="true"
          />
          <!-- 证件类型 -- 中国 -->
          <c-inputLine
            v-if="kycType === '1'"
            :promptText="$t('personal.kyc.type')"
            :value="$t('personal.label.idCard')"
            :disabled="true"
            :errorHave="true"
          />
          <!-- 证件类型 -- 外国 -->
          <c-select
            v-if="kycType === '2'"
            :value="certificateType"
            :promptText="$t('personal.kyc.type')"
            @onChanges="idAuthTypeChange"
            name="certificateType"
            :errorHave="true"
            :errorFlag="certificateTypeErrorFlag"
            :options="idAuthType"
          />

          <!-- 中国 - 姓名 -->
          <c-inputLine
            v-if="kycType === '1'"
            maxLength="50"
            name="name"
            inputType="text"
            :promptText="promptText2"
            :errorHave="true"
            marginTop="0px"
            :value="checkValue2"
            @onchanges="inputChanges"
          />
          <!-- 外国 - 名 -->
          <c-inputLine
            maxLength="50"
            v-if="kycType === '2'"
            name="kycName"
            :promptText="$t('personal.kyc.name')"
            :errorHave="true"
            :value="kycName"
            @onchanges="inputChanges"
          />
          <!-- 外国 - 姓 -->
          <c-inputLine
            maxLength="50"
            v-if="kycType === '2'"
            name="kycFamilyName"
            :promptText="$t('personal.kyc.fName')"
            :errorHave="true"
            :value="kycFamilyName"
            @onchanges="inputChanges"
          />
          <c-inputLine
            name="idNo"
            maxLength="35"
            inputType="text"
            :promptText="promptText1"
            :errorHave="true"
            :errorText="errorText1"
            :errorFlag="checkErrorFlag1"
            marginTop="0px"
            :value="checkValue1"
            @onchanges="inputChanges"
          />
          <div class="upload-text clearfix">
            <!-- 1、认证信息一经验证不可修改，请务必如实填写 -->
            <p>1、{{ $t("personal.kyc.text1") }}</p>
            <!-- 2、被认证的实名信息不能重复认证 -->
            <p>2、{{ $t("personal.kyc.text2") }}</p>
          </div>
          <c-button
            type="solid"
            :big="true"
            :disabled="kycStep1Disabled"
            marginTop="18px"
            height="40px"
            width="100%"
            @click="btnLink(1)"
            >{{ $t("personal.idAuth.next") }}
            </c-button>
        </div>
        <div v-if="active === '2'">
          <div>
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
                  <p v-if="kycType === '1'" class="b-4-cl">
                    {{
                      firstPhoto
                        ? $t("personal.idAuth.uploadIdCardPositiveAgain")
                        : $t("personal.idAuth.uploadIdCardPositive")
                    }}
                  </p>
                  <p v-else class="b-4-cl">
                    {{
                      firstPhoto
                        ? $t("personal.idAuth.uploadPassportPositiveAgain")
                        : $t("personal.idAuth.uploadPassportPositive")
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
                  <p v-if="kycType === '1'" class="b-4-cl">
                    {{
                      secondPhoto
                        ? $t("personal.idAuth.uploadIdCardBackAgain")
                        : $t("personal.idAuth.uploadIdCardBack")
                    }}
                  </p>
                  <p v-else class="b-4-cl">
                    {{
                      secondPhoto
                        ? $t("personal.idAuth.uploadPassportBackAgain")
                        : $t("personal.idAuth.uploadPassportBack")
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
                  <p v-if="kycType === '1'" class="b-4-cl">
                    {{
                      thirdPhoto
                        ? $t("personal.idAuth.uploadIdCardPersonalPositivAgain")
                        : $t("personal.idAuth.uploadIdCardPersonalPositiv")
                    }}
                  </p>
                  <p v-else class="b-4-cl">
                    {{
                      thirdPhoto
                        ? $t(
                            "personal.idAuth.uploadPassportPersonalPositivAgain"
                          )
                        : $t("personal.idAuth.uploadPassportPersonalPositiv")
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
            <div class="upload-text clearfix">
              <p>1、{{ $t("personal.idAuth.uploadText")[0] }}</p>
              <p>2、{{ $t("personal.idAuth.uploadText")[1] }}</p>
              <p>3、{{ $t("personal.idAuth.uploadText")[2] }}</p>
              <p v-if="kycMetaText.length">4、{{ kycMetaText }}</p>
              <p v-else>4、{{ $t("personal.idAuth.uploadText")[3] }}</p>
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
import mixin from 'BlockChain-ui/PC/common-mixin/personal/IdAuth/IdAuth';
import 'BlockChain-ui/PC/common-mixin/personal/IdAuth/IdAuth.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
