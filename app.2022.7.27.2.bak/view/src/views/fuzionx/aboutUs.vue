<template>
  <section class="about-us">
    <div class="intro">
      <div class="intro-text">
        <div class="fuz-title intro-title">About <i>FuzionX</i></div>
        <p class="fuz-content mod-p">
          Fuzion X is a comprehensive cryptocurrency exchange that combines the features of both
          DeFi and CeFi. We are a highly regulated exchange platform that addresses critical
          challenges, including security, liquidity, fiat to crypto transactions, and vice versa.
        </p>
        <p class="fuz-content mod-p">
          FuzionX is all-encompassing and unique trading and storage featuring a DeFi zone and a
          web3 wallet where users can participate in various liquidity pools. We also feature a
          centralized exchange that offers spot and margin trading, simplified coin swap, credit and
          debit card trading, and staking and earning features. It also includes an NFT marketplace
          where you can mint and trade NFTs.
        </p>
        <div class="mod-line"></div>
        <ul class="mod-ul">
          <li>
            <p class="label">Cryptocurrencies listed</p>
            <p class="fuz-title-tiny mod-info">200+</p>
          </li>
          <li>
            <p class="label">Supported countries</p>
            <p class="fuz-title-tiny mod-info">175</p>
          </li>
          <li>
            <p class="label">Registered users who trust us</p>
            <p class="fuz-title-tiny mod-info">55 MLN</p>
          </li>
        </ul>
      </div>
      <div class="intro-pic">
        <img src="@/assets/fuzionx/images/about/group.png" alt="" />
      </div>
    </div>
    <div class="fuz-card-padding mission">
      <div class="fuz-title-tiny mission-title">Our Mission</div>
      <p class="fuz-content mod-p">
        Fuzion is building the next-gen financial ecosystem with blockchain technology. Our goal is
        to eliminate financial barriers and change the world for the better. We're constantly
        innovating and improving our user experience so that cryptocurrency trading and investing
        are available to everyone.
      </p>
      <p class="fuz-content mod-p">
        We are 100% blockchain-powered for your security and convenience. At FuzionX, we take
        security seriously. Our crypto trading platform is built on a foundation of global server
        load balancing, distributed clusters, and other cutting-edge technologies. And because your
        needs are always changing, we're constantly updating our products and services to ensure you
        have the best possible experience.
      </p>
    </div>
    <div class="fuz-title-small reason-title">Why FuzionX?</div>
    <p class="fuz-content mod-p">
      With our advanced financial services, you can enjoy trading on one of the leading exchanges by
      trading volume. We serve millions of users in over 175 countries providing spot, margin,
      futures, options, perpetual swaps trading DeFi , lending ,and mining services . So come join
      us on this exciting journey into the future of finance.
    </p>
    <ul class="card-content">
      <li class="fuz-card-plain mod-card" v-for="(item,index) in reason" :key="index">
        <img :src="item.img" alt="" />
        <p class="fuz-title-tiny card-title">{{item.title}}</p>
        <p class="mod-card-content">{{item.content}}</p>
      </li>
    </ul>
  </section>
</template>

<script>
import img1 from '@/assets/fuzionx/images/about/safety.png';
import img2 from '@/assets/fuzionx/images/about/performance.png';
import img3 from '@/assets/fuzionx/images/about/liquidity.png';
import img4 from '@/assets/fuzionx/images/about/language.png';
import img5 from '@/assets/fuzionx/images/about/multi.png';

export default {
  name: 'AboutUs',
  data() {
    return {
      reason: [
        {
          img: img1,
          title: 'Safety and Stability',
          content: 'Multi-tier, multi-cluster system architecture',
        },
        {
          img: img2,
          title: 'High Performance',
          content: 'High performance trade matching engine technology handling a gigantic 1.4 million units per second',
        },
        {
          img: img3,
          title: 'High Liquidity',
          content: '6+ Million traders along with MEXC GLOBAL partners ensuring enough liquidity and abundant resources on the platform',
        },
        {
          img: img4,
          title: 'Localized Language Support',
          content: 'Provides support for multiple languages all across the globe making localized content for our native traders',
        },
        {
          img: img5,
          title: 'Multi Cryptocurrency Support',
          content: 'Providing trading pairs and cryptocurrencies for our traders including BTC, ETH, USDT, USDC etc. to name a few',
        },
      ],
    };
  },
};
</script>

<style lang="stylus" scoped>
.about-us{
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 15px;
}
.intro-title{
  font-size:48px !important;
  margin: 63px 0 30px;
}
.card-title{
  font-weight: 700;
  line-height: 140%;
  margin: 30px 0 10px;
}
.mission-title{
  font-weight: 600;
  font-size: 24px !important;
  line-height: 130%;
  margin-bottom: 40px;
}
.reason-title{
  margin: 80px 0 20px;
  font-weight: 600;
  font-size: 32px !important;
  position:relative
  transform-style: preserve-3d;
  &::before{
    content: '';
    position:absolute;
    bottom:0;
    left:0;
    width: 280px;
    height: 15px;
    transform: translateZ(-1px) rotate(180deg);
    background: linear-gradient(270deg, #4056D8 0.1%, rgba(64, 86, 216, 0) 77.17%);
  }
}
.mod-p{
  margin-bottom: 20px;
  line-height: 140%;
  letter-spacing: 0.04em;
}
.mod-ul{
  display: flex;
  justify-content: flex-start;
  li{
    margin-right: 63px;
    &:last-child{
      margin-right: 0;
    }
    .label{
      margin-bottom: 6px;
      color: #FFFFFF80;
    }
  }
}
.mod-info{
  font-weight: 700;
  font-size: 24px !important;
  line-height: 140%;
}
.mod-card{
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 308px;
  padding:30px;
  margin:0 40px 40px 0;
  &:nth-child(3){
    margin-right: 0;
  }
  img{
    width: 96px;
    height: 96px;
  }
  p{
    text-align: center;
  }
}
.mod-card-content{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 28px;
  color: rgba(255, 255, 255, 0.5);
}
.mod-line{
  width: 620px;
  height: 4px;
  margin: 60px 0 40px;
  transform: rotate(180deg);
  background: linear-gradient(270deg, #4056D8 0.1%, rgba(64, 86, 216, 0) 77.17%);
}
.intro{
  display: flex;
  justify-content: space-between;
  .intro-text{
    width:620px;
  }
  .intro-pic{
    margin-top: 20px;
    opacity : 0.8;
  }
}
.mission{
  margin-top:20px;
}
.card-content{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 80px;
}
</style>
