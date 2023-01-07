<!-- // Created by 侯东东.
// 表格组件
// ***************************** -->
<template>
<section class="h5Box">
  <div class="common-tabel-content" :style="classBoxStyle">
    <div :class='classBox'>
      <!-- 展示容器 -->
      <div class='b-2-cl' :class='classHead'>
        <table>
          <thead>
            <tr :style='{ height: headHeight + "px" }'>
              <th
                v-for='(item, index) in columns'
                :key='item.key'
                :width='cellWidth[index]'
                :class='item.classes'
                :style='cellStyleTh(item)'
              >
                <div
                  :class='{ isSorte: item.sortable }'
                  @click='sorteChane(item.key, item.sortable)'
                >
                  {{ item.title }}
                  <span
                    v-if='item.sortable'
                    :class='{ selected: sorteKey === item.key }'
                    class='sorte'
                  >
                    <svg
                      v-if='sorteKey === item.key && sortType === "down"'
                      class='icon icon-14'
                      aria-hidden='true'
                    >
                      <use xlink:href='#icon-a_17_1'></use>
                    </svg>
                    <svg
                      v-else-if='sorteKey === item.key && sortType === "up"'
                      class='icon icon-14'
                      aria-hidden='true'
                    >
                      <use xlink:href='#icon-a_17_2'></use>
                    </svg>
                    <svg v-else class='icon icon-14' aria-hidden='true'>
                      <use xlink:href='#icon-a_17'></use>
                    </svg>
                  </span>
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <!--  :style='tableBodyHeight' -->
      <div class='table-body' :class='bodyClasses'>
        <!-- <vue-scroll :ops='ops'> -->
        <div class='table-body-bar b-1-cl'>
          <div v-if='loading' class='no-data'>
            <c-loading size='50' />
          </div>
          <table v-else-if='tableDataList && tableDataList.length'>
            <tbody>
              <template v-for='(line, index) in tableDataList'>
                <tr
                  @click='lineClickEvent(line)'
                  :class='[classLine, line.classes, lineClassesH(index)]'
                  @mouseenter='enter(index)'
                  @mouseleave='leave()'
                  :style='{ height: cellHeight + "px" }'
                  :key='index'
                >
                  <td
                    v-for='(item, i) in line.data'
                    :ref='index === 0 ? "td" + i : ""'
                    :key='"td" + i'
                    :style='cellStyleTd(i)'
                    :class='cellStyleClass(i)'
                  >
                    <div v-if='isType(item) === "string"'>{{ item }}</div>
                    <div v-if='isType(item) === "Array"'>
                      <template v-for='(element, n) in item'>
                        <!-- 普通文字 -->
                        <span
                          v-if='!element.type'
                          class='text'
                          :key='"text" + n'
                          :class='element.classes'
                        >
                          {{ element.text }}
                        </span>
                        <!-- label -->
                        <label
                          v-if='element.type === "label"'
                          :class='element.classes'
                          :key='"label" + n'
                          class='label'
                        >
                          {{ element.text }}
                        </label>
                        <!-- 按钮 -->
                        <c-button
                          class='button'
                          type='text'
                          :key='"btn" + n'
                          :class='element.classes'
                          v-if='
                            element.type === "button" || element.type === "link"
                          '
                          @click='elementClickEvent(element, line.id)'
                        >
                          {{ element.text }}
                        </c-button>
                        <!-- input -->
                        <input
                          class='inputext'
                          type='text'
                          :key='"input" + n'
                          :class='element.classes'
                          :value='element.text'
                          v-if='element.type === "input"'
                          @input='
                            onChaneForm(element, line.id, $event.target.value)
                          '
                        />
                        <!-- html -->
                        <div
                          class='html'
                          v-html='element.text'
                          :key='"icon" + n'
                          :class='[element.classes]'
                          v-if='element.type === "html" && !element.eventType'
                        ></div>
                        <!-- html -->
                        <div
                          class='html'
                          v-html='element.text'
                          :key='"icon" + n'
                          :class='[element.classes]'
                          v-if='element.type === "html" && element.eventType'
                          @click.stop='elementClickEvent(element, line.id)'
                        ></div>
                        <!-- icon -->
                        <div
                          class='icon-btn'
                          v-html='element.iconSvg'
                          :key='"icon" + n'
                          :class='[element.classes, element.iconClass]'
                          v-if='element.type === "icon"'
                          @click.stop='elementClickEvent(element, line.id)'
                        ></div>
                        <!-- 下拉框 -->
                        <span
                          class='t-select'
                          v-if='element.type === "select"'
                          :key='"sel" + n'
                          :class='element.classes'
                        >
                          <i
                            class='icon-btn'
                            v-html='element.iconSvg'
                            :class='element.iconClass'
                            @click.stop='elementClickEvent(element, line.id)'
                          >
                          </i>
                          <div class='select-box a-5-bg'>
                            <vue-scroll>
                              <ul class='select-box-ul'>
                                <li
                                  :style='
                                    `${
                                      element.selectWidth
                                        ? "width: " + element.selectWidth + "px"
                                        : ""
                                    }`
                                  '
                                  class='select-option'
                                  v-on:mouseover='listMouseOver'
                                  v-on:mouseout='listMouseOut'
                                  v-for='(list, k) in element.selectOption'
                                  :key='"opt" + k'
                                  @click.stop='elementClickEvent(element, list)'
                                >
                                  {{ list.value ? list.value : list }}
                                </li>
                              </ul>
                            </vue-scroll>
                          </div>
                        </span>
                        <!-- 展开 -->
                        <template v-if='element.type === "subTable"'>
                          <span
                            :key='"view" + n'
                            v-if='subPpenId === line.id && subLoading'
                          >
                            <c-loading size='14' className='detailLoading' />
                          </span>
                          <span
                            v-else
                            :key='"view" + n'
                            @click.stop='opentSubCOntent(element, line.id)'
                            :class='[
                              element.classes,
                              { isopen: subPpenId === line.id && subIsOpen }
                            ]'
                            class='sub-table-btn a-1-cl'
                          >
                            {{ element.text }}
                            <i class='view-icon' :class='element.iconClass'>
                              v
                            </i>
                          </span>
                        </template>
                        <p
                          v-if='element.subContent'
                          class='sub-text'
                          :key='"p" + n'
                          :class='element.subContent.classes'
                        >
                          <template v-if='typeof element.subContent === "object"'>
                            {{ element.subContent.text }}
                          </template>
                          <template v-if='typeof element.subContent === "string"'>
                            {{ element.subContent }}
                          </template>
                        </p>
                      </template>
                    </div>
                  </td>
                </tr>
                <!-- sub Table -->
                <tr
                  :key='index + "sub"'
                  class='sub-tr'
                  v-if='subContentId === line.id && subIsOpen && !subLoading'
                >
                  <!-- :class='subPpenId === line.id ? 'animateIn' : 'animateOut'' -->
                  <td :colspan='line.data.length'>
                    <div class='sub-table a-5-bg' :class='subClass'>
                      <div
                      class="sub_content b-2-cl"
                        v-if='subContent && subContent.length'>
                        <div class="type_item" v-for="ele in subContent" :key="ele.id">
                          <div class="type_title">
                            <span :class="Number(ele.type) === 1 ? 'u-1-cl' : 'u-4-cl'">
                              {{ele.typeText}}
                            </span>
                            <p>
                              {{ele.orderCtime}}
                            </p>
                          </div>
                          <div class="type_detial">
                            <dl>
                              <dt>{{$t('contract.nowList8')}}({{ele.balanceSymbol}})</dt>
                              <dd class="b-1-cl">{{ele.avgPrice}}</dd>
                            </dl>
                            <dl>
                              <dt>{{$t('contract.volume')}}({{ele.numSymbol}})</dt>
                              <dd class="b-1-cl">{{ele.dealVolume}}</dd>
                            </dl>
                            <dl>
                              <dt>{{$t('kol.kolTraderOrderDel.t8')}}({{ele.balanceSymbol}})</dt>
                              <dd class="b-1-cl">{{ele.dealMoney}}</dd>
                            </dl>
                          </div>
                        </div>

                      </div>
                      <div v-else class='no-data b-2-cl'>
                        <svg class='icon icon-50' aria-hidden='true'>
                          <use xlink:href='#icon-g_2'></use>
                        </svg>
                        <p>
                          <!-- 暂无数据 -->
                          {{ $t('common.notData') }}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <div v-else class='no-data b-2-cl'>
            <svg class='icon icon-50' aria-hidden='true'>
              <use xlink:href='#icon-g_2'></use>
            </svg>
            <p>
              <!-- 暂无数据 -->
              {{ $t('common.notData') }}
            </p>
          </div>
        </div>
        <!-- </vue-scroll> -->
      </div>
      <c-otcPayIcon style='display: none'></c-otcPayIcon>
    </div>
  </div>
</section>
</template>

<script>
import { getComplexType } from 'BlockChain-ui/utils';

export default {
  name: 'GridTabel',
  props: {
    h5Width: {
      type: String,
      default: '800px',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    // 表头数据列表
    columns: {
      type: Array,
      default: () => [],
    },
    // 表格数据列表
    dataList: {
      type: Array,
      default: () => [],
    },
    // 展开数据
    subContent: {
      type: Array,
      default: () => [],
    },
    // 整个表格根元素的class
    classes: {
      type: [String, Array],
      default: () => [],
    },
    // 表头class
    headClasses: {
      type: [String, Array],
      default: () => [],
    },
    // 表内容class
    bodyClasses: {
      type: [String, Array],
      default: () => [],
    },
    // 表格每一行class
    lineClasses: {
      type: [String, Array],
      default: () => ['b—3-bd'],
    },
    // 表格每一行的hover class
    lineClassesHover: {
      type: [String, Array],
      default: () => [],
    },
    // 大于多少条后出现滚动条
    lineNumber: {
      type: Number,
      default: 20,
    },
    // 表格每一行的高度
    cellHeight: {
      type: Number,
      default: 50,
    },
    // 表头高度
    headHeight: {
      type: Number,
      default: 30,
    },
    // sub 表头
    subColumns: {
      type: Array,
      default: () => [],
    },
    // sub 表的自定义class
    subClass: {
      type: String,
      default: '',
    },
    subContentId: {
      type: [Number, String],
    },
    subLoading: {
      type: Boolean,
      default: false,
    },
    colorMap: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      // 是否排序
      isSorte: false,
      // 排序 使用的Key
      sorteKey: null,
      // 排序方向
      sortType: null,
      // 表头单元格的宽度
      cellWidth: [],
      // sub 显示的 id
      subPpenId: null,
      subIsOpen: 0,
      // 滚动条配置
      ops: {
        rail: {
          gutterOfSide: '0px',
        },
      },
    };
  },

  mounted() {
    this.setCellWidth();
    this.$bus.$on('WINFOW_ON_RESIIZE', () => {
      this.setCellWidth();
    });
  },
  computed: {
    classBoxStyle() {
      // const max = window.matchMedia('(max-width:960px)');
      let str = 'width: 100%;';
      // if (max.matches) {
      str += `min-width: ${this.h5Width}`;
      // }
      return str;
    },
    // 表格 根目录 class
    classBox() {
      const cls = this.isType(this.classes) === 'Array'
        ? [...this.classes] : this.classes;
      return ['common-table', 'a-5-bg', cls];
    },
    // 表头 class
    classHead() {
      const cls = this.isType(this.headClasses) === 'Array'
        ? [...this.headClasses] : this.headClasses;
      return ['table-head', 'a-3-bd', cls];
    },
    // 表格行 class
    classLine() {
      const cls = this.isType(this.lineClasses) === 'Array'
        ? [...this.lineClasses] : this.lineClasses;
      return ['a-3-bd', cls];
    },
    // 表格 数据列表 设置排序
    tableDataList() {
      if (!this.dataList || !this.dataList.length) return [];
      if (this.isSorte) {
        return this.sortType === 'down'
          ? this.quickSort(this.dataList)
          : this.quickSort(this.dataList).reverse();
      }
      return this.dataList;
    },
    // 获取表头传入的宽
    columnsWidth() {
      const [...columns] = this.columns;
      const arr = [];
      columns.forEach((item, i) => {
        const obj = { index: i };
        if (item.width) {
          obj.width = item.width;
        }
        if (item.align) {
          obj['text-align'] = item.align;
        }
        if (item.styleClass) {
          obj.styleClass = item.styleClass;
        }
        arr.push(obj);
      });
      return arr;
    },
    // 表格内容 高度 超出高度 出现滚动条
    tableBodyHeight() {
      if (this.tableDataList.length <= this.lineNumber) {
        return false;
      }
      return { height: `${this.lineNumber * this.cellHeight}px` };
    },
  },
  watch: {
    // 监听表格数据的变化
    dataList(val) {
      setTimeout(() => {
        // 重新设置表头单元格的宽度
        this.setCellWidth();
      }, 0);
      if (val) {
        // 设置成默认排序
        // this.isSorte = false;
        // 排序 使用的Key
        // this.sorteKey = null;
        // 排序方向
        // this.sortType = null;
      }
    },
  },
  methods: {
    isObjectType(element) {
      return getComplexType(element) === 'Object';
    },
    isObjectTypeJoinClass(element) {
      return this.isObjectType(element) && element.class ? element.class : '';
    },
    isObjectTypeJoinStyle(element) {
      return this.isObjectType(element) && element.style ? element.style : '';
    },
    isObjectTypeJoinText(element) {
      return this.isObjectType(element) && element.text
        ? element.text
        : element;
    },
    onChaneForm(item, id, val) {
      const data = {};
      data[id] = val;
      this.$emit('elementClick', item.eventType, data);
    },
    listMouseOver(e) {
      const { colorMap } = this;
      e.target.style.backgroundColor = colorMap['a-4-bg'];
    },
    listMouseOut(e) {
      e.target.style.backgroundColor = 'transparent';
    },
    enter(index) {
      this.hoverIndex = index;
    },
    leave() {
      this.hoverIndex = null;
    },
    lineClassesH(index) {
      if (index === this.hoverIndex) {
        return this.lineClassesHover;
      }
      return null;
    },
    isType(obj) {
      const types = Object.prototype.toString.call(obj);
      if (types === '[object Array]') {
        return 'Array';
      }
      if (types === '[object Object]') {
        return 'Object';
      }
      return 'string';
    },
    // 表头文字 居中
    cellStyleTh(item) {
      return {
        'text-align': item.align,
      };
    },
    cellStyleClass(index) {
      if (this.columnsWidth.length) {
        let obj = {};
        this.columnsWidth.forEach((item) => {
          if (item.index === index && item.styleClass) {
            obj = item.styleClass;
          }
        });
        return obj;
      }
      return false;
    },
    // 设置 单元格 的宽度
    cellStyleTd(index) {
      if (this.columnsWidth.length) {
        let obj = {};
        this.columnsWidth.forEach((item) => {
          if (item.index === index) {
            obj = item;
          }
        });
        return obj;
      }
      return false;
    },
    // 设置表头单元格的宽度
    setCellWidth() {
      const tdFefsKeys = Object.keys(this.$refs);
      this.cellWidth = [];
      tdFefsKeys.forEach((item) => {
        if (item.indexOf('td') !== -1) {
          if (this.$refs[item][0]) {
            this.cellWidth.push(this.$refs[item][0].offsetWidth);
          }
        }
      });
    },
    // 行 点击事件
    lineClickEvent(item) {
      this.$emit('lineClick', item);
    },
    // 按钮 点击事件
    elementClickEvent(item, id) {
      this.$emit('elementClick', item.eventType, id);
      if (item.type === 'link') {
        this.$router.push(item.links);
      }
    },
    // 点击排序事件
    sorteChane(key, asynSorte) {
      if (asynSorte) {
        this.isSorte = true;
        this.sortType = this.sortType === 'down' ? 'up' : 'down';
        if (this.sorteKey !== key) {
          this.sortType = 'down';
          this.sorteKey = key;
        }
      }
      this.$emit('sortOnChange', { key: this.sorteKey, type: this.sortType });
    },
    getSortValue(itemArr) {
      let val = null;
      if (this.isType(itemArr) === 'Array') {
        itemArr.forEach((option) => {
          if (this.isType(option) === 'Array') {
            option.forEach((data) => {
              if (data.key === this.sorteKey) {
                val = data.sortVal;
              }
            });
          }
        });
      }
      return parseFloat(val);
    },
    // 排序
    quickSort(datas) {
      const [...dataArray] = datas;
      if (!dataArray.length) {
        return dataArray;
      }
      return dataArray.sort(
        (a, b) => this.getSortValue(b.data) - this.getSortValue(a.data),
      );
    },
    // 展开 sub 表格
    opentSubCOntent(item, ids) {
      this.subIsOpen = this.subPpenId !== ids ? 1 : 0;
      this.$emit('elementClick', item.eventType, {
        id: ids,
        open: this.subPpenId !== ids ? 1 : 0,
      });
      this.subPpenId = this.subPpenId === ids ? null : ids;
    },
  },
};
</script>

<style lang='stylus'>
.sub_content {
  width 100%;
}
.type_title {
  display flex;
  margin-bottom 6px;
  line-height 20px;
}
.type_title span {
  margin-right 13px;
}
.type_detial {
  display flex;
  justify-content space-between;
  margin-bottom 14px;
  line-height 18px;
}
.type_detial dt {
  margin-bottom 6px;
}
  .common-table {
    width: 100%;
    .mmd-loading-circle-right, .mmd-loading-circle-left {
      border-color: #1baaec;
    }
    .detailLoading {
      margin-right: 5px
    }
    table {
      width: 100%
      font-size: 12px;
    }
  }
  .table-head {
    padding: 0 20px;
    border-bottom-width: 1px ;
    border-bottom-style: solid;
    tr {
      vertical-align: middle;
    }
    th {
      text-align: right;
      vertical-align: middle;
      &:first-child {
        text-align: left;
      }
    }
    .isSorte {
      cursor: pointer;
      user-select: none;
      display: inline-block;
      line-height: 14px;
      height: 14px;
    }
    .sorte {
      display: inline-block;
      float: right;
      width: 14spx;
      height: 14px;
      .icon {
        vertical-align: initial;
      }
      i {
        display: inline-block;
        width: 8px;
        height: 8px;
        position: absolute;
        left: 0;
        line-height: 6px;
        overflow: hidden;
        em {
          position: absolute;
          top: 0;
          right: 0;
          transition: all .3s ease-in-out;
          display: block;
          border-width: 4px;
          border-style: solid dashed dashed;
          border-color: #828ea1 transparent transparent;
          font-size: 0;
          line-height: 0;
          transform: rotate(180deg);
        }
        &.icon-triangle-up {
          bottom: 0;
          em {
            transform: rotate(0deg);
          }
        }
      }
      &.selected {
        .cur {
          em {
            border-color: #1baaec transparent transparent;
          }
        }
      }
    }
  }
  .table-body {
    min-height: 330px;
    border-radius: 0 0 2px 2px;
    .table-body-bar {
      padding: 0 20px;
    }
    tr {
      height: 50px;
      border-top-width: 1px ;
      border-top-style: solid;
      &:first-child {
        border-top-width: 0px;
      }
    }
    td {
      text-align: right;
      vertical-align: middle;
      line-height: 14px;
      &:first-child {
        text-align: left;
      }
      .label {
        line-height: 24px;
        display: inline-block;
        border-radius: 2px;
        text-align: center;
        padding: 0 10px;
      }
      .button, .link, .icon-btn {
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
        line-height: 14px;
        cursor: pointer;
      }
      span {
        display: inline-block;
        line-height: 14px;
      }
      p {
        line-height: 14px;
      }
    }
    .t-select {
      position: relative;
      .icon {
        margin: 0;
      }
      &:hover {
        .select-box {
          display: block;
        }
      }
    }
    .inputext {
      line-height: 30px;
      width: 80px;
      padding: 0 10px;
      border-width: 1px;
      border-style: solid;
      border-radius: 3px;
    }
    .select-box {
      display: none;
      position: absolute;
      text-align: left;
      transform-origin: center top 0px;
      top: 16px;
      // left: 0;
      right: 0;
      z-index: 9;
      box-shadow: 0 3px 4px 1px rgba(0,0,0,0.28);
      border-radius: 2px;
      font-size: 14px;
      min-width: 120px;
      // overflow-y: scroll;
      padding: 10px 0px;
      .select-box-ul {
        max-height: 200px;
      }
      .select-option {
        line-height: 40px;
        padding: 0 20px;
        cursor: pointer;
        font-size: 12px;
        &:hover {
          background-color: #263043;
        }
      }
    }
    .sub-table-btn {
      cursor: pointer;
      position: relative;
      padding: 0 20px 0 10px;
      display: inline-block;
      height: 24px;
      line-height: 26px;
      border-radius: 2px;
      vertical-align: middle;
      user-select: none;
      .view-icon {
        position: absolute;
        top: 10px;
        right: 5px;
        display: block;
        border-width: 5px;
        border-style: solid dashed dashed;
        border-color: #1baaec transparent transparent;
        font-size: 0;
        line-height: 0;
      }
      &.isopen {
        .view-icon {
          transform: rotate(180deg);
          top: 5px;
        }
      }
    }
    .icon-btn {
      display: inline-block;
    }
    .sub-tr {
      border: none;
    }
  }
  .sub-table {
    padding: 0 20px
    tr {
      border: none;
      height: 40px;
      th {
        text-align: right;
        vertical-align: middle;
        width: 1%;
        &:first-child {
          text-align: left;
        }
      }
    }
    &.showSubTable {
      height: auto;
      transition: all 3s;
    }
  }
  .no-data {
    padding: 80px 0 80px;
    text-align: center;
    font-size: 12px;
    p {
      margin-top: 5px;
    }
    .icon {
      font-size: 36px;
    }
  }
  // 国际版
.Int {
  .table-head {
    padding: 0;
  }
}
//   .animateIn {
//   height: auto;
//   -webkit-transition: height 1s;
//   transition: height 1s;
//   -webkit-animation: accordionIn 0.45s normal ease-in-out both 1;
//           animation: accordionIn 0.45s normal ease-in-out both 1;
// }

// .animateOut {
//   height: 0;
//   -webkit-transition: height 1s;
//   transition: height 1s;
//   -webkit-animation: accordionOut 0.45s alternate ease-in-out both 1;
//           animation: accordionOut 0.45s alternate ease-in-out both 1;
// }

// @-webkit-keyframes accordionIn {
//   0% {
//     opacity: 0;
//     -webkit-transform: scale(0.9) rotateX(-60deg);
//             transform: scale(0.9) rotateX(-60deg);
//     -webkit-transform-origin: 50% 0;
//             transform-origin: 50% 0;
//   }
//   100% {
//     opacity: 1;
//     -webkit-transform: scale(1);
//             transform: scale(1);
//   }
// }

// @keyframes accordionIn {
//   0% {
//     opacity: 0;
//     -webkit-transform: scale(0.9) rotateX(-60deg);
//             transform: scale(0.9) rotateX(-60deg);
//     -webkit-transform-origin: 50% 0;
//             transform-origin: 50% 0;
//   }
//   100% {
//     opacity: 1;
//     -webkit-transform: scale(1);
//             transform: scale(1);
//   }
// }
// @-webkit-keyframes accordionOut {
//   0% {
//     opacity: 1;
//     -webkit-transform: scale(1);
//             transform: scale(1);
//   }
//   100% {
//     opacity: 0;
//     -webkit-transform: scale(0.9) rotateX(-60deg);
//             transform: scale(0.9) rotateX(-60deg);
//   }
// }
// @keyframes accordionOut {
//   0% {
//     opacity: 1;
//     -webkit-transform: scale(1);
//             transform: scale(1);
//   }
//   100% {
//     opacity: 0;
//     -webkit-transform: scale(0.9) rotateX(-60deg);
//             transform: scale(0.9) rotateX(-60deg);
//   }
// }
.common-tabel-content {
  width: 100%;
}
@media only screen and (max-width: 600px) {
  .h5Box {
    width: 100%;
    overflow: scroll
  }
  .common-table {
    .table-body {
      min-height: 173px;
    }
  }
}
@media only screen and (max-width: 600px) {
  .common-tabel-content {
    position: relative;
    // .common-table {
    //   width: 960px;
    // }
  }
}
</style>
