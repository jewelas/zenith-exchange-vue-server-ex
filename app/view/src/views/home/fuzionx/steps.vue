<template>
  <div class="fuz-section">
      <div class='fuz-title'>Trade the markets in</div>
      <div class='fuz-title fuz-gap'><i>four easy steps</i></div>
      <div class='list'>
        <div class='list-item fuz-split' v-for='item in items' :key='item.title'>
          <div class='img'>
            <img :src="item.img" alt="">
          </div>
          <div class='title'>{{item.title}}</div>
        </div>
      </div>
  </div>
</template>
<script>
import img01 from '@/assets/fuzionx/images/home/trade-step-1.png';
import img02 from '@/assets/fuzionx/images/home/trade-step-2.png';
import img03 from '@/assets/fuzionx/images/home/trade-step-3.png';
import img04 from '@/assets/fuzionx/images/home/trade-step-4.png';

export default {
  data() {
    return {
      items: [
        {
          title: 'Download',
          img: img01,
        },
        {
          title: 'Connect wallet',
          img: img02,
        },
        {
          title: 'Start trading',
          img: img03,
        },
        {
          title: 'Earn money',
          img: img04,
        },
      ],
    };
  },
};
</script>
<style lang="stylus" scoped>
.fuz-title
  text-align center
.list
  display grid
  grid-template-columns repeat(4, 1fr)

.list-item
  position relative
  margin-bottom 50px
  line-height 1.5
  padding 0 20px
  display flex
  flex-direction column
  justify-content center
  align-items center

.list-item .img
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.2);
  border-radius: 50%;
  width: 204px;
  height: 204px;

.list-item:last-child:after
  display none

.list-item .title
  margin-top 30px
  line-height: 140%
  color: #fff
  font-size:20px
  font-weight bold
</style>
