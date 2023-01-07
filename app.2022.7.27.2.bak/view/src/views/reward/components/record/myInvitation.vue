<template>
  <div>
    <section class="table">
      <div class="header-row">
        <div class="cell" v-for="(item, index) in headerList" :key="index">{{ item }}</div>
      </div>
      <div class="content-row" v-for="(item, index) in contentList" :key="index">
        <div class="cell">{{ item.uid }}</div>
        <div class="cell">{{ item.registerTime | formatTime }}</div>
        <div class="cell kycstatus" :style="item.kycStatus ? 'color:#2762FF' : 'color:#B7BCCA'">
          <i class="kyc" :class="item.kycStatus ? 'active' : 'deactive'"></i>
          {{ item.kycStatus | analysisStatus(self) }}
        </div>
        <div class="cell">{{ item.type || '--' }}</div>
        <div class="cell">{{ item.level | analysisLevel(self) }}</div>
        <div class="cell">{{ item.endTime | formatTime }}</div>
      </div>
    </section>
    <section v-if="!contentList.length" class="nodata">
      <span>{{ $t("reward.nodata") }}</span>
    </section>
    <section class="page" v-if="total / pageSize > 1">
      <c-pagination
        :total="total"
        :current-page="page"
        :display="pageSize"
        @pagechange="onPagechange"
        classes="pagination-bar a-5-bg"
      />
    </section>
  </div>
</template>

<script>
export default {
  name: 'MyInvitation',
  data() {
    return {
      self: this,
      // headerList: ['UID', 'Registration time', 'KYC status', 'Type', 'Level', 'Expire date'],
      contentList: [],
      total: 0,
      searchList: {
        page: undefined,
        pageSize: undefined,
      },
      page: 1,
      pageSize: 10,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      try {
        const { data, code, msg } = await this.axios({
          url: 'members/inviteList',
          headers: { 'Content-Type': 'application/json' },
          params: this.searchList,
          hostType: 'fe-increment-api',
          method: 'post',
        });
        if (code !== 0) throw new Error(msg);
        if (!data) return;
        const {
          inviteList, count, page, pageSize,
        } = data;
        this.contentList = inviteList;
        this.total = count;
        this.page = page;
        this.pageSize = pageSize;
      } catch ({ message }) {
        this.$bus.$emit('tip', { text: message, type: 'error' });
      }
    },
    onPagechange(num) {
      this.searchList.page = num;
      this.initData();
    },
  },
  computed: {
    headerList() {
      return this.$t('reward.myInvitationList');
    },
  },
  filters: {
    analysisStatus(state, self) {
      const statusMap = {
        // 0: '未实名',
        // 1: '已实名',
        0: self.$t('reward.status.noreal'),
        1: self.$t('reward.status.real'),
      };
      return statusMap[state];
    },
    // analysisType(state) {
    //   const statusMap = {
    //     0: '普通用户',
    //     1: '交易会员',
    //     2: '推广者',
    //   };
    //   return state ? `${statusMap[state]}` : '--';
    // },
    analysisLevel(state, self) {
      const statusMap = {
        1: self.$t('reward.level.level1'),
        2: self.$t('reward.level.level2'),
        3: self.$t('reward.level.level3'),
      };
      return state ? `${statusMap[state]}` : '--';
    },
    formatTime(time) {
      const padZero = num => (num < 10 ? `0${num}` : num);
      const date = new Date(time);
      const year = date.getFullYear();
      const month = padZero(date.getMonth() + 1);
      const day = padZero(date.getDate());
      const hour = padZero(date.getHours());
      const minute = padZero(date.getMinutes());
      const second = padZero(date.getSeconds());
      return time ? `${year}/${month}/${day} ${hour}:${minute}:${second}` : '--';
    },
  },
};
</script>

<style lang="stylus" scoped>
* {
  box-sizing: border-box;
  border-collapse: collapse;
}

.table {
  width: 100%;
  display: table;
  border: 1px solid #cccccc;

  .header-row, .content-row {
    display: table-row;
    text-align: center;
    border: 1px solid #cccccc;

    .cell {
      display: table-cell;
      width: 16%;
      padding: 12px 0;
      vertical-align: middle;
      border: 1px solid #cccccc;
    }
  }

  .content-row {
    .cell {
      color: #16181D;
    }
  }
}

.kycstatus {
  position: relative;
}

.kyc {
  position: absolute;
  display: block;
  width: 6px;
  height: 6px;
  left: 60px;
  top: 16px;
  border-radius: 50%;
  background: #2762FF;
  border: 3px solid rgba(39, 98, 255, 0.2) !important;
}

.active {
  background: #2762FF !important;
}

.deactive {
  background: #B7BCCA !important;
}

.a-5-bg {
  background: none !important;
}

.pagination-bar {
  border: none !important;

  >>> .pagination-bar {
    border: none !important;
  }
}

.page {
  display: flex;
  justify-content: flex-end;
}

.nodata {
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
}
</style>
