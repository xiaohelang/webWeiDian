<template>
  <transition name="detail">
    <div class="good-detail" ref="goodDetail">
      <!--<x-header :left-options="{backText: '返回'}" :right-options="{showMore: true}">{{title}}-->
      <!--</x-header>-->
      <swiper :list="bannerList" dots-position="center" v-model="bannerIndex"
              @on-index-change="demo01_onIndexChange"></swiper>
      <div class="good-des">
        <ul class="des-top">
          <li class="des-li-left">
            <p style="font-size: 0.32rem; margin:0.1rem 0 0.15rem;">{{productName}}</p>
            <p style="font-size: 0.24rem; ">{{sTitle}} </p>
          </li>
          <li v-show="showDown">
            <p v-show="isPing || isKan " style="margin-top: 0.55rem; font-size: 0.24rem; color: #f96c9e;">
              {{countDown}} <span v-if="isEnd"> {{h}}:{{m}}:{{s}}</span></p>
          </li>
          <!--<li class="des-li-right">-->
            <!--<div class="des-li-right-box">-->
            <!--<div class="des-li-right-box">-->
            <!--<div class="des-li-right-box">-->
            <!--<div class="des-li-right-box">-->
            <!--<div class="des-li-right-box">-->
              <!--<img class="right-star" src="../../common/image/star2.png" alt="">-->
              <!--<p style="font-size: 0.24rem; margin-top: 0.1rem;">收藏</p>-->
            <!--</div>-->
          <!--</li>-->
        </ul>
        <p class="des-mid">
          <span style="font-size: 0.3rem">￥</span>{{groupPrice}}<span style="font-size: 0.24rem">元</span>
          <span v-if="isPing&&showMaxGroupSize" style="float: right; font-size: 0.24rem; color: #8e8e8e;">上限团：{{maxGroupSize}}</span>
          <span v-if="!isPing" style="float: right; font-size: 0.24rem; color: #8e8e8e;">库存：{{inventory}}</span>
        </p>
        <p class="des-bot">
          <span style="color: #ccc;">市场价：<span style="position: relative; text-decoration: line-through;">￥{{oldprice}}元 </span></span>
          <span v-if="isPing" style="color: #8e8e8e;">累计成团{{times}}次-{{pingGrounpNum}}人拼团</span>
          <span v-if="isKan" style="color: #8e8e8e;">月售{{salesVolume}}件</span>
          <span v-if="!isKan && !isPing" style="color: #8e8e8e;">月售{{salesVolume}}件</span>
        </p>
      </div>
      <div v-show="isPing && !isActive" style="background: #fff;">
        <group v-if="allList.length > 0">
          <cell title="已开团" value="查看更多" is-link @click.native="getPingAllMore(5)"></cell>
          <div style="width: 7.5rem; text-align: center; padding: 0.1rem 0; border-top: 0.01rem solid #f4f4f4; color: #333333" v-if="allList.length === 0">暂无拼团</div>
          <div class="hl-cellEty" v-if="allList.length > 0">
            <div class="hl-cellIn" v-for="item in allList">
              <!--<panel :list="recordList" :type="type"></panel>-->
              <div class="hl-cell-left">
                <img :src="item.headImgUrl" style="width: 0.74rem; height: 0.74rem; border-radius: 50%; margin-right: 0.2rem;" alt="">
              </div>
              <div class="hl-cell-right">
                <p style="line-height: 0.22rem;">{{item.memberName}}</p>
                <p style="line-height: 0.22rem; margin-top: 0.2rem;">还差 {{item.groupSize-item.orderSize}}人，
                 {{item.deleteDate}}</p>
              </div>
              <x-button
                style=" height: 0.6rem; color: #8e8e8e; border: 1px solid #f96c9e; margin-top: 0.2rem; color: #f96c9e;"
                plain mini @click.native="toPinTuan(item.vGroupOrderGuid, item.vShopProductGuid)">去参团
              </x-button>
            </div>
          </div>
        </group>
      </div>
      <div v-show="isKan">
      </div>
      <ul class="hl-cellS" v-show="isKan">
        <li class="hl-cellSLi">
          <img style="width: 0.42rem; height: 0.42rem; margin-right: 0.1rem;" src="../../common/image/kanIcon.png"
               alt="">
          <span style="color: #8e8e8e;">砍价时间截止：砍价订单{{hours}}小时后结算价格</span>
        </li>
      </ul>
      <!--砍价说明-->
      <!--<ul class="hl-cellS" style="justify-content: space-between;" v-show="isKan" @click.stop="showKan">-->
        <!--<li class="hl-cellSLi">-->
          <!--<img style="width: 0.42rem; height: 0.42rem; margin-right: 0.1rem;" src="../../common/image/kanSM.png"-->
               <!--alt="">-->
          <!--<span style="color: #8e8e8e;">砍价说明</span>-->
        <!--</li>-->
        <!--<img style="margin-top: 0.4rem; margin-right: 0.5rem; height: 0.3rem;" src="../../common/image/arrow-r.png" alt="">-->
      <!--</ul>-->
      <!--拼团说明-->
 <!--     <ul class="hl-cellS" style="justify-content: space-between;" v-show="isPing" @click.stop="showPin">
        <li class="hl-cellSLi">
          <img style="width: 0.42rem; height: 0.42rem; margin-right: 0.1rem;" src="../../common/image/kanSM.png"
               alt="">
          <span style="color: #8e8e8e;">拼团说明</span>
        </li>
        <img style="margin-top: 0.4rem; margin-right: 0.5rem; height: 0.3rem;" src="../../common/image/arrow-r.png" alt="">
      </ul>-->
      <ul class="hl-cellS">
        <li class="hl-cellSLi">
          <img style="width: 0.42rem; height: 0.42rem; margin-right: 0.1rem;" src="../../common/image/pinzhi.png"
               alt="">
          <span style="color: #8e8e8e;">品质保证</span>
        </li>
        <!--<li class="hl-cellSLi" v-show="noDelivery">-->
        <li class="hl-cellSLi" v-show="noDelivery">
          <img style="width: 0.42rem; height: 0.42rem; margin-right: 0.1rem;" src="../../common/image/fu.png"
               alt="">
          <span style="color: #8e8e8e;">服务商品</span>
        </li>
        <li class="hl-cellSLi">
          <img style="width: 0.42rem; height: 0.42rem; margin-right: 0.1rem;" src="../../common/image/tiexin.png"
               alt="">
          <span style="color: #8e8e8e;">贴心服务</span>
        </li>
      </ul>
      <!--拼团规则-->
      <div class="hl-cellGZ" v-if="isPing">
        <p class="hl-cellGZ-title">
          <span style="float: left; display: block; margin-top: 0.1rem;">拼团规则</span>
          <img style="width: 0.42rem; height: 0.42rem; margin-right: 0.1rem; float: left;" src="../../common/image/kanSM.png"
               v-show="isPing" @click.stop="showPin">
        </p>
        <ul class="hl-cellGZ-box">
          <li class="hl-cellGZ-li">
            <div class="hl-cellGZ-cri">1 <span class="cri-line"></span></div>
            <p class="hl-cellGZ-text">选择商品</p>
          </li>
          <li class="hl-cellGZ-li">
            <div class="hl-cellGZ-cri">2<span class="cri-line"></span></div>
            <p class="hl-cellGZ-text">参团</p>
          </li>
          <li class="hl-cellGZ-li">
            <div class="hl-cellGZ-cri">3<span class="cri-line"></span></div>
            <p class="hl-cellGZ-text">邀请好友</p>
          </li>
          <li class="hl-cellGZ-li">
            <div class="hl-cellGZ-cri">4</div>
            <p class="hl-cellGZ-text">人满开团</p>
          </li>
        </ul>
      </div>
      <!--砍价规则-->
      <div class="hl-cellGZ" v-if="isKan">
        <p class="hl-cellGZ-title">
          <span style="float: left; display: block; margin-top: 0.1rem;">砍价规则</span>
          <img style="width: 0.42rem; height: 0.42rem; margin-right: 0.1rem; float: left;" src="../../common/image/kanSM.png" v-show="isKan" @click.stop="showKan" alt="">
        </p>
        <ul class="hl-cellGZ-box">
          <li class="hl-cellGZ-li">
            <div class="hl-cellGZ-cri">1 <span class="cri-line"></span></div>
            <p class="hl-cellGZ-text">选择商品</p>
          </li>
          <li class="hl-cellGZ-li">
            <div class="hl-cellGZ-cri">2<span class="cri-line"></span></div>
            <p class="hl-cellGZ-text">发起砍价</p>
          </li>
          <li class="hl-cellGZ-li">
            <div class="hl-cellGZ-cri">3<span class="cri-line"></span></div>
            <p class="hl-cellGZ-text">邀请好友</p>
          </li>
          <li class="hl-cellGZ-li">
            <div class="hl-cellGZ-cri">4</div>
            <p class="hl-cellGZ-text">支付成交</p>
          </li>
        </ul>
      </div>
      <!--砍价规则-->
      <div class="showModeKan" v-show="isShowKan" @click.stop="hideKan">
        <div class="showMoreKan">
          <span class="closeBtnKan" @click="hideKan">X</span>
          <h4 class="showMoreH4Kan">砍价说明</h4>
          <p class="showMoreP1Kan">最低价成交</p>
          <p class="showMoreP2Kan">如商品原价100元，商户设定最低成交价为50元。这时，你可以分享此商品信息给好友，邀请他们帮你进行砍价。越多好友帮忙，价钱越低。在截止时间前如砍价至商户设定的最低成交价（此示例为50元）则，按照最低成交价结算。
          </p>
          <p class="showMoreP1Kan" style="margin-top: 0.2rem;">实时金额成交</p>
          <p class="showMoreP2Kan">如商品原价100元，商户设定最低成交价为50元。这时，你可以分享此商品信息给好友，邀请他们帮你进行砍价。越多好友帮忙，价钱越低。当时间截止后未砍价至最低成交价，则按照砍价后的实时金额进行结算。
          </p>
        </div>
      </div>
      <!--拼团说明-->
      <div class="showModeKan" v-show="isShowPin" @click.stop="hidePin">
        <div class="showMoreKan">
          <span class="closeBtnKan" @click="hidePin">X</span>
          <h4 class="showMoreH4Kan">拼团说明</h4>
          <p class="showMoreP2Kan">如商家设定一件商品拼团时间为24小时，5人成团，你是团长，付款后要通过分享的链接在24小时之内找到另外4个购买者才行，若限定时间内没凑齐规定的人数（此示例为5人）则拼团失败，付款金额则全款原路退回。
          </p>
        </div>
      </div>
      <!--活动内容-->
      <div class="active-con" v-show="projects.length > 0">
        <div class="active-title">活动内容</div>
        <div class="active-cell" v-for="item in projects">
          <p style="flex: 1;text-align: center; margin: 0.1rem;">{{item.project}}</p>
          <p style="flex: 1;text-align: center; margin: 0.1rem;">{{item.remark1}}</p>
          <p style="flex: 1;text-align: center; margin: 0.1rem;">{{item.remark2}}</p>
        </div>
        <!--<div class="active-cell">-->
          <!--<span style="flex: 1;display: block;text-align: center;">半永久西施眉半永久西施眉</span>-->
          <!--<span style="flex: 1;display: block;text-align: center;">3月31日前有效</span>-->
          <!--<span style="flex: 1;display: block;text-align: center;">3月31日前有效</span>-->
        <!--</div>-->
      </div>
      <div class="active-shop" v-show="address || phone">
        <div class="active-shopleft">
          <p style="color: #333;">适用门店</p>
          <!--<p style="margin-top: 0.2rem; font-size: 0.24rem;">美甲沙龙</p>-->
          <p style="margin-top: 0.16rem; font-size: 0.24rem;">{{address}}</p>
        </div>
        <div class="active-shopright">
          <img v-show="phone" @click.stop="callPhone"  style="width: 0.72rem; height: 0.72rem;" src="../../common/image/shop-phone.png" alt="">
        </div>
      </div>
      <div class="beizhu" v-show="remark !== ''">
        <div class="beizhu-title">备注</div>
        <div class="beizhu-cell">{{remark}}</div>
        <!--<div class="beizhu-cell">-->
          <!--<p class="beizhu-p">活动有效期</p>-->
          <!--<p class="beizhu-p">2017-11-05至2017-11-15</p>-->
        <!--</div>-->
        <!--<div class="beizhu-cell">-->
          <!--<p class="beizhu-p">团购劵适用有效期</p>-->
          <!--<p class="beizhu-p">2017-11-05至2017-11-15</p>-->
        <!--</div>-->
        <!--<div class="beizhu-cell">-->
          <!--<p class="beizhu-p">预约信息</p>-->
          <!--<p class="beizhu-p">使用本套餐前需提前预约</p>-->
        <!--</div>-->
        <!--<div class="beizhu-cell">-->
          <!--<p class="beizhu-p">规则提醒</p>-->
          <!--<p class="beizhu-p">每次消费极限1张</p>-->
          <!--<p class="beizhu-p">每次消费极限1张</p>-->
          <!--<p class="beizhu-p">不得与其他优惠同时使用</p>-->
          <!--<p class="beizhu-p">只适用商家为您安排的服务人员</p>-->
          <!--<p class="beizhu-p">活动优惠仅限本人使用</p>-->
        <!--</div>-->
        <!--<div class="beizhu-cell">-->
          <!--<p class="beizhu-p">温馨提示</p>-->
          <!--<p class="beizhu-p">如需要发票请在消费时向服务员咨询</p>-->
        <!--</div>-->
      </div>
      <!--评论-->
      <!--<div class="userRang">
        <div class="rangTitle">
          <span style="display: inline-block; color: #333;">用户评价 <span style="color:#f96c9e; ">（好评率100%）</span></span>
          <span style="display: inline-block; color: #333;">查看评论(5356)</span>
        </div>
        <div class="rangcell">
          <div class="rangcellIn">
            <img class="cellInImg" src="../../common/image/wshare.png" alt="">
            <span class="cellName">艾露莎</span>
            <span class="cellTime">2017.08.29</span>
          </div>
          <p class="cellInP">5555色素植入皮肤组织内形成稳定的色块，由于表皮很薄，成半透明状</p>
        </div>
        <div class="rangcell">
          <div class="rangcellIn">
            <img class="cellInImg" src="../../common/image/wshare.png" alt="">
            <span class="cellName">艾露莎</span>
            <span class="cellTime">2017.08.29</span>
          </div>
          <p class="cellInP">色素植入皮肤组织内形成稳定的色块，由于表皮很薄，成半透明状</p>
        </div>
      </div>-->
      <div class="hl-imgs">
        <p class="hl-imgsT">商品详情</p>
        <div class="productIntro" v-html="productIntro" style="color: #333; padding: 0.1rem; width: 100%; box-sizing: border-box;"></div>
      </div>
      <ul v-if="is_ok && showView" class="hl-buy">
        <li class="hl-buy-shop">
          <div class="hl-bShopOne" @click="toHome">
            <img style="display: inline-block; width: 0.4rem; height: 0.4rem; margin-top: 0.15rem;" src="../../common/image/toShop.png" alt="">
            <p style="text-align: center; font-size: 0.22rem; margin-top: 0.05rem;">店铺</p>
          </div>
          <div class="hl-bShopOne" @click="quanShare" v-show="isWeixin">
            <img style="display: inline-block; width: 0.4rem; height: 0.4rem; margin-top: 0.15rem;" src="../../common/image/kanshare.png" alt="">
            <p style="text-align: center; font-size: 0.22rem; margin-top: 0.05rem; color: #8e8e8e;">分享</p>
          </div>
          <div class="hl-bShopOne" @click="anzhuoShare" v-show="!isWeixin">
            <img style="display: inline-block; width: 0.4rem; height: 0.4rem; margin-top: 0.15rem;" src="../../common/image/kanshare.png" alt="">
            <p style="text-align: center; font-size: 0.22rem; margin-top: 0.05rem; color: #8e8e8e;">分享</p>
          </div>
        </li>
        <li ref="wBuy" @touchstart="touchStartwBuy" @touchend="touchEndwBuy" @mouseover="touchStartwBuy" @mouseout="touchEndwBuy" v-show="!isPing && !isKan" class="hl-buy-liOn" @click="sigerToBuy">
          直接购买
        </li>
        <li ref="sigerBuy1" @touchstart="touchStartSbuy1" @touchend="touchEndSbuy1" @mouseover="touchStartSbuy1" @mouseout="touchEndSbuy1" v-show="isPing" class="hl-buy-li" @click="sigerToBuy">
          <p style="font-size: 0.32rem; line-height: 0.38rem; text-align: center; margin-top: 0.12rem;">{{isPingSinger}}</p>
          <p style="font-size: 0.28rem; line-height: 0.38rem; text-align: center; margin-top: 0.05rem;">￥{{singerPrice}}</p>
        </li>
        <li ref="groundBuy" @touchstart="touchStartGbuy" @touchend="touchEndGbuy" @mouseover="touchStartGbuy" @mouseout="touchEndGbuy" v-show="isPing" :class="[hlBuyLi2, {overBtb: isActive}]" @click="groudToBuy">
          <p style="font-size: 0.32rem; line-height: 0.38rem; text-align: center; margin-top: 0.12rem;">{{isPingGrounp()}}</p>
          <p style="font-size: 0.28rem; line-height: 0.38rem; text-align: center; margin-top: 0.05rem;">￥{{groupPrice}}</p>
        </li>
        <li ref="sigerBuy2" @touchstart="touchStartSbuy2" @touchend="touchEndSbuy2" @mouseover="touchStartSbuy2" @mouseout="touchEndSbuy2" v-show="isKan" class="hl-buy-li" @click="sigerToBuy">
          <p style="font-size: 0.32rem; line-height: 0.38rem; text-align: center; margin-top: 0.28rem;">{{isPingSinger}}</p>
        </li>
        <li ref="help" @touchstart="touchStartHelp" @touchend="touchEndHelp" @mouseover="touchStartHelp" @mouseout="touchEndHelp" v-show="isKan" :class="[hlBuyLi2, {overBtb: isActive}]" @click="kanToBuy">
          <p style="font-size: 0.32rem; line-height: 0.38rem; text-align: center; margin-top: 0.28rem;">{{isKanHelp}}</p>
        </li>
      </ul>
      <div class="showMode" v-if="showMode">
        <div class="showMore">
          <span class="closeBtn"@click.stop="closeBtn">X</span>
          <h4 class="showMoreH4">正在开团</h4>
          <ul>
            <li class="showMoreLi" v-if="allListMore.length > 2" v-for="item in allListMore">
              <div class="showMoreLi-left">
                <div class="hl-cell-left">
                  <img :src="item.headImgUrl" style="width: 0.74rem; height: 0.74rem; border-radius: 50%; margin-right: 0.2rem;" alt="">
                </div>
                <div class="hl-cell-right">
                  <p style="line-height: 0.22rem;">{{item.memberName}}</p>
                  <p style="line-height: 0.22rem; margin-top: 0.2rem;">还差 {{item.groupSize-item.orderSize}}人，{{interTime(item.expiredDate)}}</p>
                </div>
              </div>
              <x-button
                  style=" height: 0.6rem; color: #8e8e8e; border: 1px solid #f96c9e; margin-top: 0.2rem; color: #f96c9e;"
                  plain mini @click.native="toPinTuan(item.vGroupOrderGuid, item.vShopProductGuid)">去参团
                </x-button>
            </li>
          </ul>
          <h5 class="showMoreH5" v-if="allListMore.length > 2">仅显示{{allListMore.length}}个正在开的团</h5>
          <h5 class="showMoreH5" v-else-if="allListMore.length <= 2">没有更多的开团</h5>
        </div>
      </div>
      <div class="setShare" @click.stop="setShare" v-if="showShare">
        <img src="../../common/image/setShare.png" style="width: 7.5rem; height: 7.65rem; position: absolute; left: 0; top: -0.5rem;" alt="">
      </div>
    </div>
  </transition>
</template>

<script>
  import { XHeader, Swiper, Group, Cell, Panel, XButton, Step, StepItem } from 'vux'
  import api from '../../fetch/api'
  import { mapGetters, mapMutations } from 'vuex'
  import wx from 'weixin-js-sdk'
  import { getTimer, getCountDown } from '../../util/util'
  import Scroll from '../../base/scroll/scroll.vue'
  import {ERR_OK} from '../../common/js/config'
//  import BScroll from 'better-scroll'

  /*
    let baseList = [{
      url: 'javascript:',
      img: 'http://wenxiu-bucket.oss-cn-shenzhen.aliyuncs.com/upload/question/2017-08-29/7e1af5b5ad504422a149ec851c11332c1503996528461'
    }, {
      url: 'javascript:',
      img: 'http://wenxiu-bucket.oss-cn-shenzhen.aliyuncs.com/upload/question/2017-08-29/7e1af5b5ad504422a149ec851c11332c1503996528988'
    }]  */
  //  let baseList = []
  function ListItem (url, img) {
    this.url = url
    this.img = img
  }
  function PinListItem (item) {
    this.vGroupOrderGuid = item.vGroupOrderGuid
    this.expiredDate = item.expiredDate
    this.groupSize = item.groupSize
    this.headImgUrl = item.headImgUrl
    this.memberGuid = item.memberGuid
    this.memberName = item.memberName
    this.now = item.now
    this.orderSize = item.orderSize
    this.expiredDate = item.expiredDate
    this.deleteDate = getTimer(item.expiredDate)
    this.timer = function () {
      let t = null
      clearInterval(t)
      t = setInterval(() => {
        this.deleteDate = getTimer(item.expiredDate)
      }, 0)
    }
  }

  export default {
    data () {
      return {
        vShopGuid: '',
        vSPGuid: '',
        is_ok: true,
        isActionOk: true,
        title: '',
        bannerList: [],
        bannerIndex: 0,
        productName: '',
        sTitle: '',
        oldprice: 0,
        salesVolume: 0,
        singerPrice: 0,
        groupPrice: 0,
        times: 0,
        productIntro: '',
        productType: 0,
        isPing: false,
        isPingSinger: '直接购买',
        pingGrounpNum: 0,
        hlBuyLi2: 'hl-buy-li2',
        isActive: false,
        isKan: false,
        isKanText: '直接购买',
        isKanHelp: '发起砍价',
        isType: false,
        recordList: [],
        allList: [],
        allListMore: [],
        vGroupOrderGuid: '',
        vGroupProductGuid: '',
        config: {},
        showMode: false,
        showShare: false,
        shareStr: '',
        heliang: '',
        isWeixin: true,
        isShowKan: false,
        isShowPin: false,
        noDelivery: true,
        hours: 24,
        beginDate: 0,
        endDate: 0,
        inventory: 0,  // 库存
        maxGroupSize: 0,
        h: 0,
        m: 0,
        s: 0,
        countDown: '倒计时',
        countSecs: 0,
        allHours: 0,
        timer1: null,
        timer2: null,
        isEnd: true,
        projects: [],
        remark: '',
        shops: [],
        address: '',
        phone: 0,
        showView: true,
        showDown: true,
        showMaxGroupSize: false,
        view: 0
      }
    },
    mounted () {
//      this.hhh()
      this.getQueryStr()
      this.productdetail()
      this.is_weixin()
    },
    activated () {
      window.scrollTo(0, -40)
    },
    beforeRouteEnter (to, from, next) {
      if (to.path === '/gooddetail') {
        next(vm => {
          vm.productdetail()
        })
      }
    },
    methods: {
      getQueryStr () {
        this.showView = true
        if (window.location.search.slice(1).indexOf('&') !== -1) {
          let viewstr = window.location.search.slice(1).split('&')[1].split('=')[1]
          if (viewstr === '1') {
            this.showView = false
          } else {
            this.showView = true
          }
        } else {
          return
        }
      },
      callPhone () {
        window.location.href = 'tel://' + this.phone
      },
      interTime (expiredDate) {
        let timer = null
        clearInterval(timer)
        timer = setInterval(getTimer(expiredDate), 500)
      },
      demo01_onIndexChange (index) {
        this.bannerIndex = index
      },
      touchStartwBuy () {
        this.$refs.wBuy.style.opacity = '0.88'
      },
      touchEndwBuy () {
        this.$refs.wBuy.style.opacity = '1'
      },
      touchStartSbuy1 () {
        this.$refs.sigerBuy1.style.opacity = '0.88'
      },
      touchEndSbuy1 () {
        this.$refs.sigerBuy1.style.opacity = '1'
      },
      touchStartGbuy () {
        this.$refs.groundBuy.style.opacity = '0.88'
      },
      touchEndGbuy () {
        this.$refs.groundBuy.style.opacity = '1'
      },
      touchStartSbuy2 () {
        this.$refs.sigerBuy2.style.opacity = '0.88'
      },
      touchEndSbuy2 () {
        this.$refs.sigerBuy2.style.opacity = '1'
      },
      touchStartHelp () {
        this.$refs.help.style.opacity = '0.88'
      },
      touchEndHelp () {
        this.$refs.help.style.opacity = '1'
      },
      toHome () {
        this.$router.push({path: '/home', query: {vShopGuid: this.vShopGuid}})
      },
      hhh () {
        if (this.$route.query.productId !== undefined) {
          this.vSPGuid = this.$route.query.productId
          return
        }
        let url = window.location.href
        let path = url.split('?')[1]
        if (path === undefined) {
          return
        }
        let str = url.split('?')[1]
        console.log(str)
        let str2 = url.split('?')[1].split('=')[1]
        let str3 = str2.split('#')[0]
        this.vSPGuid = str3
       /* let vGroupProductGuid = getQueryString('vGroupProductGuid') */
       /* this.vSPGuid = vGroupProductGuid */
        console.log(`hhh1:${this.vSPGuid}`)
      },
      /* 判断是否是拼团，砍价 */
      isPType (roductType) {
        if (roductType === 0) {
          this.isPing = false
          this.isKan = false
        } else if (roductType === 1) {
          this.isPing = true
          this.isKan = false
          this.isPingSinger = '直接购买'
        } else if (roductType === 2) {
          this.isPing = false
          this.isKan = true
          this.isPingSinger = '直接购买'
          this.isKanHelp = '发起砍价'
        }
        localStorage.isPing = this.isPing
      },
      /* 拼团人数 */
      isPingGrounp () {
        return '去开团(' + this.pingGrounpNum + '人)'
      },
      /* 单独购买 */
      sigerToBuy () {
        document.cookie = `vShopProductGuid=${this.vSPGuid}`
        window.localStorage.price = this.singerPrice
        this.isPing = false
        localStorage.isPing = this.isPing
        window.localStorage.isSingerOrGrounp = 'singer'
        window.localStorage.isFrom = 'goods'
        this.$router.push({path: '/porderdetail', query: {productId: this.vSPGuid}})
//        this.$router.push('/porderdetail')
      },
      /* 拼团购买 */
      groudToBuy () {
        if (this.isActionOk === false) {
          this.$msgbox('商品活动异常', '商品活动异常')
        } else {
          document.cookie = `vShopProductGuid=${this.vSPGuid}`
          window.localStorage.price = this.groupPrice
          window.localStorage.isSingerOrGrounp = 'grounp'
          window.localStorage.isFrom = 'goods'
//          this.$router.push('/porderdetail')
          this.$router.push({path: '/porderdetail', query: {productId: this.vSPGuid}})
        }
      },
      /* 砍价 */
      kanToBuy () {
        if (this.isActionOk === false) {
          this.$msgbox('商品活动异常', '商品活动异常')
        } else {
//          window.localStorage.price = this.groupPrice
          window.localStorage.isSingerOrGrounp = 'kan'
//          this.signApi()
//          if (localStorage.vGroupProductGuid === '') {
          if (this.vGroupProductGuid === '') {
            console.log('vGroupProductGuid:' + this.vGroupProductGuid)
            return
          } else {
            let vGPGId = this.vGroupProductGuid
            let that = this
            this.userKan(vGPGId, function (vGroupProductLogGuid) {
              that.$router.push({path: '/sharekan', query: {vGroupProductLogGuid: vGroupProductLogGuid}})
            })
          }
        }
      },
      /* 用户发起砍价数据请求  */
      userKan (vGPGId, cbFn) {
//        let token = this.$getCookie('token')
        api.userKan({
//          token: token,
          vGroupProductGuid: vGPGId
        }).then(res => {
          console.log('res用户发起砍价')
          console.log(res)
          if (res.code === ERR_OK) {
            let vGroupProductLogGuid = res.data.vGroupProductLogGuid
            cbFn && cbFn(vGroupProductLogGuid)
          } else {
            this.$msgbox('提示', res.message)
          }
        }, err => {
          console.log('err用户发起砍价')
          console.log(err)
          this.$msgbox('提示', err.data.message)
        })
      },
      /* 砍价单买 */
      sigerKanBuy () {
        if (this.isActionOk === false) {
          this.$msgbox('商品活动异常', '商品活动异常')
        } else {
          document.cookie = `vShopProductGuid=${this.vSPGuid}`
          window.localStorage.price = this.groupPrice
          window.localStorage.isSingerOrGrounp = 'kan'
//          this.signApi()
          window.localStorage.isFrom = 'goods'
//          this.$router.push('/porderdetail')
          this.$router.push({path: '/porderdetail', query: {productId: this.vSPGuid}})
        }
      },
      /* 关闭蒙层 */
      setShare () {
        this.showShare = false
      },
      /* 砍价说明蒙层 */
      showKan () {
        console.log('显示蒙层')
        this.isShowKan = true
      },
      /* 砍价说明蒙层 */
      hideKan () {
        console.log('隐藏蒙层')
        this.isShowKan = false
      },
      /* 拼团说明蒙层 */
      showPin () {
        console.log('显示蒙层')
        this.isShowPin = true
      },
      /* 拼团说明蒙层 */
      hidePin () {
        console.log('隐藏蒙层')
        this.isShowPin = false
      },
      /* 兼容安卓ios分享 */
      quanShare () {
//        this.is_weixin()
        this.showShare = true
      },
      anzhuoShare () {
        let that = this
        window.opPanel.share(that.shareStr)
      },
      /* 判断是否为微信浏览器 */
      is_weixin () {
        let ua = window.navigator.userAgent.toLowerCase()
        let ts = /micromessenger/i
//        if (ua.test(/MicroMessenger/i) === 'micromessenger') {
        if (ts.test(ua)) {
          this.isWeixin = true
        } else {
          this.isWeixin = false
        }
      },
      /* 加拼团 */
      toPinTuan (vGroupOrderGuid) {
        window.localStorage.price = this.groupPrice
        window.localStorage.isSingerOrGrounp = 'join'
        window.localStorage.vGroupOrderGuid = vGroupOrderGuid
        document.cookie = `vShopProductGuid=${this.vSPGuid}`
        this.$router.push({path: '/porderdetail', query: {vGroupOrderGuid: vGroupOrderGuid, productId: this.vShopProductGuid}})
//        this.$router.push('/porderdetail')
      },
//      跳转到下单详情
      toPorderDetail () {
        this.$router.push({path: '/porderdetail', query: {productId: this.vSPGuid}})
      },
      /* 获取商品详情 */
      productdetail () {
        this.hhh()
        this.remark = ''
        this.shops = []
        this.address = ''
        this.projects = []
        this.h = 0
        this.m = 0
        this.s = 0
        /* 为匹配安卓 */
        let that = this
        this.setShareProduct(function (res) {
          let options2 = {
            'shareTitle': res.shareTitle,
            'shareContent': res.shareContent,
            'shareUrl': res.shareUrl,
            'shareLogo': res.shareLogo,
            'type': '微信商品'
          }
          that.shareStr = JSON.stringify(options2)
        })
//        let vSPGuid = this.$getCookie('vShopProductGuid')
//        let vSPGuid = this.$route.query.productId
        api.productInfo({
          vShopProductGuid: this.vSPGuid
        }).then(res => {
          console.log('获取商品详情res')
          console.log(res)
          if (res.code === 0) {
            this.is_ok = true
            this.setvProductDetail(res.data)
            this.vShopGuid = res.data.vShopGuid
            this.productName = res.data.vShopProductName
            this.setTitle(this.productName)
            this.sTitle = res.data.subTitle
            this.groupPrice = res.data.price
            this.singerPrice = res.data.price
            this.oldprice = res.data.marketPrice
            this.salesVolume = res.data.salesVolume
            this.times = res.data.groups
            this.productIntro = res.data.productIntro
            this.productType = res.data.vGroupProductType
            this.title = res.data.vShopProductName
            this.noDelivery = res.data.noDelivery
            this.hours = res.data.hours
            this.inventory = res.data.inventory
            localStorage.noDelivery = res.data.noDelivery
            localStorage.noReceive = res.data.noReceive
            let baseList = []
            for (let i = 0; i < res.data.shopProductImages.length; i++) {
              let imgs = res.data.shopProductImages
              let Litem = new ListItem('javascript:', imgs[i])
              baseList.push(Litem)
              this.bannerList = baseList
            }
            this.isPType(this.productType)
            this.productActionRequest()
          } else {
            this.is_ok = false
//            this.$msgbox('商品详情异常', `code:${res.message}`)
          }
        }, err => {
          this.is_ok = false
          console.log(err)
//          this.$msgbox('商品详情异常', `code:${err.data.message}`)
        })
        /* 根据vGroupProductType查询数据 */
      },
      /* 微店商品活动 */
      productActionRequest () {
//        let vSPGuid = this.$getCookie('vShopProductGuid')
//        let vSPGuid = this.$route.query.productId
        api.productAction({
          vShopProductGuid: this.vSPGuid
        }).then(res => {
          console.log('店铺活动商品')
          console.log(res)
          if (res.code === 0) {
            if (res.data.recordList.length > 0) {
              this.isActionOk = true
              this.signApi()
              let beginDate = '2017-11-9'
              let endDate = '2117-12-9'
              this.showDown = true
//              try {
//                // 此处是可能产生例外的语句
//              } catch (error) {
//                // 此处是负责例外处理的语句
//              } finally {
//                // 此处是出口语句
//              }
//              console.log('begin')
              if (res.data.recordList[0].beginDate) {
                this.showDown = true
                beginDate = res.data.recordList[0].beginDate // 计算开始时间
                endDate = res.data.recordList[0].endDate
              } else {
                this.showDown = false
              }
              let that = this
              that.isActive = false
              getCountDown(beginDate, endDate, function (data1, data2) {
                if (data1 < 0 && data2 < 0) {
                  that.isActive = true
                  that.isEnd = true
                  that.countSecs = Math.floor(-data1 / 1000)
                  that.allHours = Math.floor(-data1 / 1000 / 60 / 60)
                  clearInterval(that.timer1)
                  clearInterval(that.timer2)
                  that.timer1 = setInterval(function () {
                    console.log('活动未开始')
                    that.countSecs--
                    if (that.countSecs < 1) {
                      that.productActionRequest()
                    }
                    that.allHours = Math.floor(that.countSecs / 60 / 60)
                    if (that.allHours > 99) {
                      that.h = 99
                      that.m = 59
                      that.s = 59
                    } else {
                      let hh = Math.floor(that.countSecs / 60 / 60)
                      if (hh < 10) {
                        that.h = '0' + hh
                      } else {
                        that.h = Math.floor(that.countSecs / 60 / 60)
                      }
                      let mm = Math.floor(that.countSecs / 60 % 60)
                      if (mm < 10) {
                        that.m = '0' + mm
                      } else {
                        that.m = Math.floor(that.countSecs / 60 % 60)
                      }
                      let ss = Math.floor(that.countSecs % 60)
                      if (ss < 10) {
                        that.s = '0' + ss
                      } else {
                        that.s = Math.floor(that.countSecs % 60)
                      }
                    }
                  }, 1000)

                  that.countDown = '未开始'
                } else if (data1 > 0 && data2 < 0) {
                  that.countDown = '进行中'
                  that.isActive = false
                  that.isEnd = true
                  that.allHours = Math.floor(-data2 / 1000 / 60 / 60)
                  that.countSecs = Math.floor(-data2 / 1000)
                  clearInterval(that.timer1)
                  clearInterval(that.timer2)
                  that.timer1 = setInterval(function () {
                    console.log('活动进行中')
                    that.countSecs--
                    if (that.countSecs < 1) {
                      that.productActionRequest()
                    }
                    that.allHours = Math.floor(that.countSecs / 60 / 60)
                    if (that.allHours > 99) {
                      that.h = 99
                      that.m = 59
                      that.s = 59
                    } else {
                      let hh = Math.floor(that.countSecs / 60 / 60)
                      if (hh < 10) {
                        that.h = '0' + hh
                      } else {
                        that.h = Math.floor(that.countSecs / 60 / 60)
                      }
                      let mm = Math.floor(that.countSecs / 60 % 60)
                      if (mm < 10) {
                        that.m = '0' + mm
                      } else {
                        that.m = Math.floor(that.countSecs / 60 % 60)
                      }
                      let ss = Math.floor(that.countSecs % 60)
                      if (ss < 10) {
                        that.s = '0' + ss
                      } else {
                        that.s = Math.floor(that.countSecs % 60)
                      }
                    }
                  }, 1000)
                } else {
                  that.isActive = true
                  that.isEnd = false
                  that.countDown = '活动已结束'
                  that.countSecs = 0
                  clearInterval(that.timer1)
                  clearInterval(that.timer2)
                  that.h = '0' + 0
                  that.m = '0' + 0
                  that.s = '0' + 0
                  console.log('活动已经过时')
                }
              })
              if (res.data.recordList[0].remark) {
                this.remark = res.data.recordList[0].remark
              } else {
                this.remark = ''
              }
              if (res.data.recordList[0].shops) {
                this.shops = JSON.parse(res.data.recordList[0].shops)
                this.phone = this.shops[0].phone
                this.address = this.shops[0].address
              } else {
                this.shops = []
              }
              if (res.data.recordList[0].projects) {
                this.projects = JSON.parse(res.data.recordList[0].projects)
              } else {
                this.projects = []
              }
              if (res.data.recordList[0].vGroupProductType === 1) {
                this.pingGrounpNum = res.data.recordList[0].groupSize
                this.showMaxGroupSize = false
                if (res.data.recordList[0].maxGroupSize) {
                  this.showMaxGroupSize = true
                  this.maxGroupSize = res.data.recordList[0].maxGroupSize
                }
                window.localStorage.pingGrounpNum = this.pingGrounpNum
                this.groupPrice = res.data.recordList[0].groupPrice
                this.vGroupProductGuid = res.data.recordList[0].vGroupProductGuid
//                兼容支付
                window.localStorage.vGroupProductGuid = res.data.recordList[0].vGroupProductGuid
                this.getPingAll(res.data.recordList[0].vGroupProductGuid)
              } else if (res.data.recordList[0].vGroupProductType === 2) {
                this.groupPrice = res.data.recordList[0].groupPrice
                this.vGroupProductGuid = res.data.recordList[0].vGroupProductGuid
//                window.localStorage.vGroupProductGuid = res.data.recordList[0].vGroupProductGuid
                console.log('砍价')
              } else {
                this.$msgbox('提示', '没有此活动类型商品')
              }
            } else if (res.data.recordList.length === 0) {
//              有可能出现没数据这样的情况
              this.isActive = true
              this.isEnd = false
              this.countDown = '活动已结束'
              this.countSecs = 0
              clearInterval(this.timer1)
              clearInterval(this.timer2)
              this.h = '0' + 0
              this.m = '0' + 0
              this.s = '0' + 0
            } else {
              console.log('单独购买')
              this.signApi()
            }
          } else {
            this.isActionOk = false
            this.$msgbox('提示', `code:${res.message}`)
          }
        }, err => {
          console.log('店铺活动商品数据错误')
          console.log(err)
          this.isActionOk = false
        })
      },
      clearTime () {
        clearInterval(this.timer1)
        clearInterval(this.timer2)
      },
      // 拼团用户列表
      getPingAll (vGroupProductGuid) {
        api.pingAll({
          vGroupProductGuid: vGroupProductGuid,
          pinSize: 2
        }).then(res => {
          console.log('拼团列表成功')
          console.log(res)
          if (res.code === 0) {
            console.log('拼团列表成功data')
            console.log(res.data)
//            this.allList = res.data.recordList
            let listArr = res.data.recordList
            this.allList = []
            for (let i = 0; i < listArr.length; i++) {
              let lItem = new PinListItem(listArr[i])
              lItem.timer()
              this.allList.push(lItem)
            }
            console.log('alllist')
            console.log(this.allList)
          } else {
            this.$msgbox('提示', res.message)
          }
        }, err => {
          console.log('拼团列表失败')
          console.log(err)
        })
      },
      // 拼团更多用户列表
      getPingAllMore (pinSize) {
        this.showMode = true
        if (this.vGroupProductGuid === '') {
          return
        }
        api.pingAll({
//          vGroupProductGuid: window.localStorage.vGroupProductGuid,
          vGroupProductGuid: this.vGroupProductGuid,
          pinSize: pinSize
        }).then(res => {
          console.log('更多拼团列表成功')
          console.log(res)
          if (res.code === 0) {
            console.log('更多拼团列表成功data')
            console.log(res.data)
//            this.allListMore = res.data.recordList
            let listArr = res.data.recordList
            this.allListMore = []
            for (let i = 0; i < listArr.length; i++) {
              let lItem = new PinListItem(listArr[i])
              this.allListMore.push(lItem)
            }
            console.log('更多alllist')
            console.log(this.allListMore)
          } else {
            this.$msgbox('提示', res.message)
          }
        }, err => {
          console.log('更多拼团列表失败')
          console.log(err)
        })
      },
      /* 关闭弹出框 */
      closeBtn () {
        this.showMode = false
      },
      //      签名
      signApi () {
        let that = this
        let urlRe = encodeURIComponent(window.location.href.split('#')[0])
        api.sign({
          url: urlRe
        }).then(res => {
          console.log('签名res2')
          console.log(res)
          that.config = res.data
          wx.config({
            debug: false,
            appId: that.config.appId,                // 必填，公众号的唯一标识
            timestamp: that.config.timestamp,        // 必填，生成签名的时间戳
            nonceStr: that.config.nonceStr,          // 必填，生成签名的随机串
            signature: that.config.signature,        // 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
          wx.ready(function () {
            that.setShareProduct(function (res) {
              let options = {
                title: res.shareTitle,
                desc: res.shareContent,
                link: res.shareUrl,
                imgUrl: res.shareLogo,
                success: function () {
                  console.log('ok')
                },
                cancel: function () {
                  console.log('not_ok')
                }
              }
              wx.onMenuShareTimeline(options)
              wx.onMenuShareAppMessage(options)
            })
          })
        }, err => {
          console.log('签名err')
          console.log(err)
        })
      },
      setShareProduct (optionFn) {
//        let vSPGuid = this.$getCookie('vShopProductGuid')
//        let vSPGuid = this.$route.query.productId
        api.shareProduct({
          vShopProductGuid: this.vSPGuid
        }).then(res => {
          console.log('分享成功2')
          console.log(res)
          if (res.code === 0) {
            optionFn && optionFn(res.data)
          }
        }, err => {
          console.log('分享错误2')
          console.log(err)
        })
      },
      ...mapMutations({
        setvProductDetail: 'SET_VPRODUCTDETAIL',
        setvShopProductGuid: 'SET_VSHOPPRODUCTGUID'
      })
    },
    computed: {
      ...mapGetters([
        'vShopProductGuid',
        'vGroupProductType'
      ])
    },
    watch: {
      vShopProductGuid () {
        this.productdetail()
      },
      '$route': 'clearTime'
    },
    components: {
      Scroll,
      XHeader,
      Swiper,
      Group,
      Cell,
      Panel,
      XButton,
      Step,
      StepItem
    }
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
 /* .detail-enter-active
    transition: all 0.3s

  .detail-enter, .detail-leave-to
    transform: translate3d(100%, 0, 0)*/

  .good-detail
    font-size: 0.28rem
    position: absolute
    left: 0
    top: 0
    width: 7.5rem
    min-height: 13.3rem
    z-index: 102
    background: #f4f4f4
    .vux-header
      background: #ffffff
      border-bottom: 0.03rem solid #f4f4f4
      .vux-header-back
        color: #333333
      .left-arrow:before
        border-top: 1px solid #333 !important
        border-left: 1px solid #333 !important
      .vux-header-more:after
        color: #333 !important
      .vux-header-title
        color: #333333
        margin: 0 110px
    .vux-swiper
      width: 7.5rem
      height: 7.5rem !important
    .good-des
      background: #fff
      width: 7.5rem
      padding: 0.2rem 0.2rem 0.18rem 0.24rem
      box-sizing: border-box
      .des-top
        display: flex
        flex-direction: row
        color: #333
        justify-content: space-between
        min-height: 1rem
        width: 7rem
        .des-li-left
          width: 4.8rem
          min-height: 1rem
        .des-li-right
          box-sizing: border-box
          padding-left: 0.3rem
          min-height: 1rem
          width: 1.2rem
          position: relative
          .des-li-right-box
            position: absolute
            left: 50%
            top: 50%
            transform: translate(-50%,-50%)
      .des-mid
        color: #f96c9e
        font-size: 0.34rem
        margin-top: 0.1rem
      .des-bot
        flex-direction: row
        justify-content: space-between
        margin-top: 0.2rem
        font-size: 0.24rem
        display: flex
    .weui-cells
      background-color: #f7f7f7 !important
      margin-top: 0.12rem
      .vux-label
        color: #333333
    .hl-cellEty
      width: 100%
      padding: 0.1rem 0.2rem
      .hl-cellIn
        display: flex
        justify-content: space-between
        width: 7.1rem
        padding: 0.2rem 0
        border-top: 1px solid #e8e8e9
        .hl-cell-left
          width: 0.74rem
          height: 0.74rem
          margin-top: 0.2rem
          margin-right: 0.2rem
        .hl-cell-right
          color: #8e8e8e
          width: 4rem
          margin-top: 0.2rem
          font-size: 0.2rem
        .weui-media-box
          padding: 10px 0 !important
          background-color: #f7f7f7 !important
        .weui-panel:before
          border-top: none
          border-bottom: none
        .weui-media-box__thumb
          border-radius: 50%
        .weui-panel
          width: 5rem
    .hl-cellS
      display: flex
      flex-direction: row
      height: 1.02rem
      background: #fff
      margin-top: 0.12rem
      width: 100%
      .hl-cellSLi
        display: flex
        margin-top: 0.32rem
        margin-left: 0.2rem
        line-height: 0.42rem
        flex-direction: row

    .hl-cellGZ
      width: 100%
      background: #ffffff
      margin-top: 0.12rem
      padding-top: 0.28rem
      box-sizing: border-box
      height: 2.18rem
      .hl-cellGZ-title
        color: #333
        margin-left: 0.2rem
        overflow: hidden
      .hl-cellGZ-box
        display: flex
        flex-direction: row
        margin-top: 0.3rem
        width: 7.5rem
        .hl-cellGZ-li
          width: 1.2rem
          height: 1.2rem
          margin: 0 0.4rem
          .hl-cellGZ-text
            color: #8e8e8e
            font-size: 0.24rem
            margin-top: 0.18rem
            text-align: center
          .hl-cellGZ-cri
            border-radius: 50%
            position: relative
            height: 0.6rem
            line-height: 0.6rem
            margin-left: 0.3rem
            font-size: 0.28rem
            text-align: center
            background: #f96c9e
            color: #fff
            width: 0.6rem
            .cri-line
              display: inline-block
              height: 2px
              position: absolute;
              top: 50%
              right: -1.3rem
              width: 1.3rem
              background-color: #ccc
    .active-con
      width: 100%
      overflow: hidden
      background: #fff
      color: #333333
      margin-top: 0.1rem
      font-size: 0.24rem
      .active-title
        width: 96%
        height: 0.8rem
        line-height: 0.8rem
        margin: auto
      .active-cell
        width: 96%
        /*height: 0.8rem*/
        /*line-height: 0.8rem*/
        padding: 0.15rem 0
        overflow: hidden
        margin: auto
        display: flex
        color: #9f9f9f
        border-top: 1px solid #f4f4f4
    .active-shop
      width: 100%
      overflow: hidden
      background: #fff
      color: #333333
      margin-top: 0.1rem
      display: flex
      flex-direction: row
      justify-content: space-between
      padding: 0.2rem
      box-sizing: border-box
      .active-shopleft
        color: #9c9c9c
      .active-shopright
        color: #9c9c9c
        width: 0.72rem
        height: 0.72rem
        margin-right: 0.4rem
    .beizhu
      width: 100%
      overflow: hidden
      background: #fff
      color: #333333
      margin-top: 0.1rem
      .beizhu-title
        width: 96%
        height: 0.8rem
        line-height: 0.8rem
        margin: auto
        border-bottom: 1px solid #f4f4f4
      .beizhu-cell
        width: 96%
        overflow: hidden
        margin: 0.25rem auto
        color: #9c9c9c
        .beizhu-p
          margin-top: 0.15rem
          color: #9c9c9c
          font-size: 0.24rem
    .userRang
      width: 100%
      margin-top: 0.12rem
      background-color: #fff
      .rangTitle
        height: 0.88rem
        display: flex
        flex-direction: row
        line-height: 0.88rem
        padding: 0 0.2rem
        box-sizing: border-box
        justify-content: space-between
        border-bottom: 1px solid #f4f4f4
        width: 100%
      .rangcell
        border-bottom: 1px solid #f4f4f4
        padding-top: 0.2rem
        padding-bottom: 0.2rem
        margin-left: 0.24rem
        margin-right: 0.24rem
        width: 7rem
        .rangcellIn
          width: 100%
          height: 0.48rem
          .cellInImg
            width: 0.48rem
            height: 0.48rem
            border-radius: 50%
          .cellName
            margin-left: 0.2rem
            color: #333
          .cellTime
            float: right
            display: inline-block
            margin-top: 0.2rem
            color: #333
            margin-left: 0.3rem
        .cellInP
          margin-top: 0.2rem
          font-size: 0.24rem
          color: #333
          line-height: 20px
          color: #8e8e8e
    .hl-imgs
      width: 100%
      margin-top: 0.12rem
      padding-top: 0.37rem
      background: #fff
      margin-bottom: 0.96rem
      .hl-imgsT
        color: #333
        margin-bottom: 0.2rem
        margin-left: 0.24rem
      .productIntro img
        width: 100%;
    .hl-buy
      position: fixed
      display: flex
      flex-direction: row
      left: 0
      bottom: 0
      color: #fff
      z-index: 101
      height: 0.96rem
      width: 7.5rem
      .hl-buy-shop
        width: 33.34%
        height: 100%
        display: flex
        flex-direction: row
        background: #fff
        color: #f96c9e
        .hl-bShopOne
          flex: 1
          height: 100%
          text-align: center
          color: #f96c9e
      .hl-buy-liOn
        width: 66.66%
        height: 100%
        line-height: 0.96rem
        font-size: 0.32rem
        background: #ff8bb4
        text-align: center
      .hl-buy-li
        background: #ff8bb4
        height: 100%
        width: 33.33%
        flex: 1
      .hl-buy-li2
        flex: 1
        background: #f96c9e
        height: 100%
        width: 33.33%
        &.overBtb
          background: #ccc
          pointer-events: none
  .good-detail .weui-cells
    background-color: #fff!important
    color: #8e8e8e
  .weui-dialog__hd
    padding: 0em 1.6em 0.1em !important
    color: #333 !important
  .showMode
    position: fixed
    z-index: 102
    background: rgba(0, 0, 0, 0.3)
    overflow: hidden
    top: 0
    left: 0
    bottom: 0
    right: 0
  .showMore
    position: fixed
    background: #fff
    width: 80%
    z-index: 5000
    top: 50%
    left: 50%
    -webkit-transform: translate(-50%,-50%)
    transform: translate(-50%,-50%)
    text-align: center
    border-radius: 5px
    .closeBtn
      position: absolute
      right: -0.25rem
      top: -0.25rem
      background: #ccc
      display: inline-block
      width: 0.5rem
      height: 0.5rem
      line-height: 0.5rem
      color: #333
      border-radius: 50%
      border: 1px solid #fff
    .showMoreH4
      color: #333
      line-height: 0.8rem
      height: 0.8rem
      border-bottom: 1px solid #f4f4f4
    .showMoreLi
      width: 90%
      height: 1rem
      margin: auto
      border-bottom: 1px solid #f4f4f4
      display: flex
      justify-content: space-between
      .showMoreLi-left
        display: flex
        width: 4.2rem
      .hl-cell-left
        width: 0.74rem
        height: 0.74rem
        margin-top: 0.2rem
        margin-right: 0.2rem
      .hl-cell-right
        text-align: left
        color: #8e8e8e
        width: 3rem
        margin-top: 0.2rem
        font-size: 0.2rem
    .showMoreH5
      color: #333
      line-height: 0.6rem
      height: 0.6rem
  .showModeKan
    position: fixed
    z-index: 103
    background: rgba(0, 0, 0, 0.3)
    overflow: hidden
    top: 0
    left: 0
    bottom: 0
    right: 0
    .showMoreKan
      position: fixed
      background: #fff
      width: 80%
      z-index: 110
      top: 50%
      left: 50%
      -webkit-transform: translate(-50%,-50%)
      transform: translate(-50%,-50%)
      text-align: center
      border-radius: 5px
      padding-bottom: 0.3rem
      .closeBtnKan
        position: absolute
        right: -0.25rem
        top: -0.25rem
        background: #ccc
        display: inline-block
        width: 0.5rem
        height: 0.5rem
        line-height: 0.5rem
        color: #333
        border-radius: 50%
        border: 1px solid #fff
      .showMoreH4Kan
        color: #333
        line-height: 0.8rem
        height: 0.8rem
        border-bottom: 1px solid #f4f4f4
      .showMoreP1Kan
        text-align: left
        margin-left: 0.1rem
        font-size: 0.24rem
        margin-top: 0.1rem
        border-left: 5px solid blue
        line-height: 0.4rem
        padding-left: 0.1rem
        color: #333333
      .showMoreP2Kan
        text-align: left
        margin-left: 0.3rem
        padding-right: 0.15rem
        font-size: 0.2rem
        line-height: 0.5rem
        color: #333333
      .showMoreH5Kan
        border-top: 1px solid #f4f4f4
        color: #333
        line-height: 0.6rem
        height: 0.6rem
  .setShare
    position: fixed
    z-index: 102
    background: rgba(0, 0, 0, 0.6)
    overflow: hidden
    line-height: 12rem
    text-align: center
    font-size: 0.4rem
    color: #fff
    top: 0
    left: 0
    bottom: 0
    right: 0
</style>
