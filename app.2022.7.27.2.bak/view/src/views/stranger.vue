<template>
  <div class="strangerPage a-5-bg">
    <div class="stranger">
      <div class="stranger-header clearfix a-5-bg">
        <div class="strangerbar">
          <div class="stranger-top clearfix">
            <div class="user-logo clearfix a-12-bg b-1-cl">
              <span v-show="!imageUrl" style="color:#EDF4F8;">{{name}}</span>
              <img :src=imageUrl v-show="imageUrl"/>
              <i class="a-5-bd" :class="loginStatus === 1 ? 'a-18-bg' : 'a-1-bg'"></i>
            </div>
            <div class="user-name clearfix b-1-cl">
              <p>{{otcNickName}}
                <c-button
                  v-show="blackList !== 0"
                  className="b-4-cl blackListButton"
                  type="text"
                  @click="blackClick"
                >
                  {{blackList === 0 ?
                  '' : blackList === 2
                  ? $t('stranger.addBlackList')
                  : $t('stranger.removeBlackList')}}
                </c-button>
            </p>
              <p class="b-2-cl">{{loginStatus === 1
                ? $t('stranger.online')
                : $t('stranger.offline')}}</p>
            </div>
            <div class="certification clearfix">
              <ul>
                <li class="b-1-cl clearfix">
                  <svg v-if="authLevel === 1" class="icon icon-24" aria-hidden="true">
                    <use xlink:href="#icon-e_13_1"></use>
                  </svg>
                  <svg v-else class="icon icon-24" aria-hidden="true">
                    <use xlink:href="#icon-e_13"></use>
                  </svg>
                  <span>{{$t('stranger.identity')}}{{authLevel === 1
                    ? $t('stranger.already')
                    : $t('stranger.never')}}{{$t('stranger.certification')}}</span>
                </li>
                <li class="b-1-cl clearfix">
                  <svg v-if="authLevel === 1" class="icon icon-24" aria-hidden="true">
                    <use xlink:href="#icon-e_13_1"></use>
                  </svg>
                  <svg v-else class="icon icon-24" aria-hidden="true">
                    <use xlink:href="#icon-e_13"></use>
                  </svg>
                  <span>{{$t('stranger.phone')}}{{mobileAuthStatus === 1
                    ? $t('stranger.already')
                    : $t('stranger.never')}}{{$t('stranger.certification')}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="stranger-bottom clearfix">
            <ul class="b-1-cl">
              <li class="clearfix">
                <p>{{completeOrders}}</p>
                <p class="b-2-cl">{{$t('stranger.headerList')[0]}}</p>
              </li>
              <li class="clearfix">
                <p>{{complainNum}}</p>
                <p class="b-2-cl">{{$t('stranger.headerList')[1]}}</p>
              </li>
              <li class="clearfix">
                <p>{{sucComplainNum}}</p>
                <p class="b-2-cl">{{$t('stranger.headerList')[2]}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="stranger-center clearfix a-5-bg">
        <div class="strangerbar">
          <div class="nav-tab clearfix a-3-bd">
            <c-navTab
              activeClassName="b-1-cl"
              activeColor="a-12-bg"
              className="b-2-cl"
              :currentTab="currentTab"
              :navTab="navTab"
              :lineHeight="lineHeight"
              :marginRight="marginRight"
              @currentType="currentType"
            />
          </div>
          <div class="tables clearfix">
            <c-table
              :loading = 'loading'
              :imgMap="imgMap"
              :colorMap="colorMap"
              :classes = 'classes'
              :headClasses = 'headClasses'
              :bodyClasses =  'bodyClasses'
              :lineClasses = 'lineClass'
              :columns = "columns"
              :dataList = "dataList"
              :lineNumber = 'lineNumber'
              :cellHeight = 'cellHeight'
              :headHeight = 'headHeight'
              @elementClick = 'operation'
            />
            <c-pagination v-show="count > 10"
                        :total="count"
                        :current-page='page'
                        :display='pageSize'
                        classes="a-5-bg"
                        @pagechange="pagechange">
            </c-pagination>
          </div>
        </div>
      </div>
      <c-dialog :showFlag="dialogFlag"
              paddingBottom="14px"
              :confirmLoading="dialogConfirmLoading"
              :confirmDisabled="dialogConfirmDisabled"
              @close="dialogClose"
              @confirm="dialogConfirm"
              :titleText="$t('personal.dialog.blackPrompt')">
        <p class="dialog-p">{{blackList === 2
          ? $t('stranger.blackListPrompt')[0]
          : $t('stranger.blackListPrompt')[1]}}</p>
      </c-dialog>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/stranger/stranger';
import 'BlockChain-ui/PC/common-mixin/stranger/stranger.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
