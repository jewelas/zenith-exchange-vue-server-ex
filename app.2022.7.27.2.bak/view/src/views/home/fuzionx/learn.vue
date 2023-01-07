<template>
  <div class="fuz-section">
      <div class='fuz-title'>Learn about <i>Cryptocurrency</i></div>
      <div class='fuz-title fuz-gap'><i>and crypto</i></div>
      <FlyCoin class='fly-coin' />
      <div class='list'>
        <div class='list-item fuz-split' v-for='item in items' :key='item.title'>
          <div class='img'>
            <img :src="item.img" alt="">
          </div>
          <div class='title'>{{item.title}}</div>
          <div class='date'>{{item.date}}</div>
          <div class='content'>{{item.content}}</div>
          <div class='link'>Learn more -></div>
        </div>
      </div>
      <div class='fuz-center' @click='toView'>
        <fuz-button animation width='260'>View All</fuz-button>
      </div>
  </div>
</template>
<script>
import img01 from '@/assets/fuzionx/images/demo/01.png';
import img02 from '@/assets/fuzionx/images/demo/02.png';
import img03 from '@/assets/fuzionx/images/demo/03.png';
import img04 from '@/assets/fuzionx/images/demo/04.png';
import FlyCoin from './flyCoin.vue';

export default {
  components: { FlyCoin },
  data() {
    return {
      items: [
        {
          title: 'Advanced Tools',
          date: 'Jun 1, 2021',
          img: img01,
          content: 'Whether you’re a seasoned trader or just starting out, the FuzionX offers advanced charting features to allow traders to visualize orders, positions, and price alerts.',
        },
        {
          title: 'Buy and sell digital assets at the best prices on FuzionX',
          date: 'Jun 1, 2021',
          img: img02,
          content: 'We provide high liquidity and trusted prices.',
        },
        {
          title: 'Leveraged tokens now available',
          date: 'Jun 1, 2021',
          img: img03,
          content: 'Our API feed lets you easily gain access to real-time market data, while our trading API lets you develop secure, programmatic trading bots.',
        },
        {
          title: 'Low fees',
          date: 'Jun 1, 2021',
          img: img04,
          content: 'Trading fees are determined based on trading activity and do not exceed 0.2%. Free deposit and low withdrawal fees for all assets.',
        },
      ],
    };
  },
  methods: {
    toView() {
      window.location.href = 'https://defi.fuzionx.io/learn';
    },
  },
};
</script>
<style lang="stylus" scoped>

.fuz-section
  position relative

.fuz-title
  text-align center

.fly-coin
  position absolute
  top: -25px
  right: 425px;

.list
  display grid
  grid-template-columns repeat(4, 1fr)
  margin-top: 50px

.list-item
  position relative
  height: 432px
  margin-bottom 50px
  line-height 1.5
  padding 0 20px

.list-item .title
  margin-top 16px
  margin-bottom 10px
  line-height: 140%
  color: #4056d8
  font-weight bold

.list-item .date
  margin-bottom 10px
  line-height 140%
  color #ffffff80

.list-item .content
  color #fff

.list-item .link
  position absolute
  bottom 0%
  color: #4056d8

</style>
