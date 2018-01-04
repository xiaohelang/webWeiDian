import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = (resolve) => {
  import('../components/home/home').then((module) => {
    resolve(module)
  })
}

const AllGoods = (resolve) => {
  import('../components/all-goods/all-goods').then((module) => {
    resolve(module)
  })
}

const SalesGoods = (resolve) => {
  import('../components/sales-goods/sales-goods').then((module) => {
    resolve(module)
  })
}

const NewGoods = (resolve) => {
  import('../components/new-goods/new-goods').then((module) => {
    resolve(module)
  })
}

const WShare = (resolve) => {
  import('../components/w-share/w-share').then((module) => {
    resolve(module)
  })
}

const Me = (resolve) => {
  import('../components/me/me').then((module) => {
    resolve(module)
  })
}

const ShopDetail = (resolve) => {
  import('../components/shop-detail/shop-detail').then((module) => {
    resolve(module)
  })
}

const AddAddress = (resolve) => {
  import('../components/add-address/add-address').then((module) => {
    resolve(module)
  })
}

const AddressList = (resolve) => {
  import('../components/address-list/address-list').then((module) => {
    resolve(module)
  })
}

const MyOrder = (resolve) => {
  import('../components/my-order/my-order').then((module) => {
    resolve(module)
  })
}

const OrderList = (resolve) => {
  import('../components/order-list/order-list').then((module) => {
    resolve(module)
  })
}
// 订单详情
const OrderDetail = (resolve) => {
  import('../components/order-detail/order-detail').then((module) => {
    resolve(module)
  })
}

const GoodDetail = (resolve) => {
  import('../components/good-detail/good-detail').then((module) => {
    resolve(module)
  })
}
// 下单详情
const PorderDetail = (resolve) => {
  import('../components/porder-detail/porder-detail').then((module) => {
    resolve(module)
  })
}
// 账户金额
const AccountAmount = (resolve) => {
  import('../components/account-amount/account-amount').then((module) => {
    resolve(module)
  })
}
// 提现详情
const WithdrawlsDetails = (resolve) => {
  import('../components/withdrawals-details/withdrawals-details').then((module) => {
    resolve(module)
  })
}
// 账单详情 (消费)
const BillDetails = (resolve) => {
  import('../components/bill-detail/bill-detail').then((module) => {
    resolve(module)
  })
}
// 提现界面
const Cash = (resolve) => {
  import('../components/cash/cash').then((module) => {
    resolve(module)
  })
}
// 绑定体现账号
const BingBrank = (resolve) => {
  import('../components/bing-brank/bing-brank').then((module) => {
    resolve(module)
  })
}
// 修改密码
const ResetPW = (resolve) => {
  import('../components/reset-pw/reset-pw').then((module) => {
    resolve(module)
  })
}
// 拼单界面
const groupList = (resolve) => {
  import('../components/group-list/group-list').then((module) => {
    resolve(module)
  })
}
// 拼单详情页
const groupDetail = (resolve) => {
  import('../components/group-detail/group-detail').then((module) => {
    resolve(module)
  })
}
// 拼单成功详情页
const groupSuccess = (resolve) => {
  import('../components/group-succes/group-succes').then((module) => {
    resolve(module)
  })
}
// 分享砍价
const shareList = (resolve) => {
  import('../components/share-list/share-list').then((module) => {
    resolve(module)
  })
}

// 分享砍价
const ShareKan = (resolve) => {
  import('../components/share-kan/share-kan').then((module) => {
    resolve(module)
  })
}
// 我的关注列表
const concernList = (resolve) => {
  import('../components/concern-list/concern-list').then((module) => {
    resolve(module)
  })
}

// 拼主支付成功
const pinzhuShare = (resolve) => {
  import('../components/pinzhu-share/pinzhu-share').then((module) => {
    resolve(module)
  })
}

export default new Router({
  // history: false,
  // hashbang: true,
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: 'Home',
      path: '/home',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/allgoods',
      component: AllGoods
    },
    {
      path: '/salesgoods',
      component: SalesGoods
    },
    {
      path: '/newgoods',
      component: NewGoods
    },
    {
      path: '/wshare',
      component: WShare
    },
    {
      path: '/shopdetail',
      component: ShopDetail,
      meta: {
        title: '店铺详情'
      }
    },
    {
      path: '/me',
      component: Me
    },
    {
      path: '/addaddress',
      component: AddAddress
    },
    {
      path: '/addresslist',
      component: AddressList
    },
    {
      path: '/myorder',
      component: MyOrder
    },
    {
      path: '/orderlist',
      component: OrderList
    },
    {
      path: '/orderdetail',
      component: OrderDetail
    },
    {
      path: '/gooddetail',
      component: GoodDetail
    },
    {
      path: '/porderdetail',
      component: PorderDetail
    },
    {
      path: '/accountamount',
      component: AccountAmount
    },
    {
      path: '/withdrawals',
      component: WithdrawlsDetails
    },
    {
      path: '/billDetails',
      component: BillDetails
    },
    {
      path: '/cash',
      component: Cash
    },
    {
      path: '/bingbrank',
      component: BingBrank
    },
    {
      path: '/resetpw',
      component: ResetPW
    },
    {
      path: '/sharekan',
      component: ShareKan
    },
    {
      path: '/groupDetail',
      component: groupDetail
    },
    {
      path: '/groupSuccess',
      component: groupSuccess
    },
    {
      path: '/groupList',
      component: groupList
    },
    {
      path: '/sharelist',
      component: shareList
    },
    {
      path: '/concernlist',
      component: concernList
    },
    {
      path: '/pinzhushare',
      component: pinzhuShare
    }
  ]
})
