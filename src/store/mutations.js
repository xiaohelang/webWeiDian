import * as types from './mutation-types'

const mutations = {
  [types.SET_MEMBERGUID] (state, memberGuid) {
    state.memberGuid = memberGuid
  },
  [types.SET_VSHOPGUID] (state, vShopGuid) {
    state.vShopGuid = vShopGuid
  },
  [types.SET_VSHOPGUID2] (state, vShopGuid2) {
    state.vShopGuid2 = vShopGuid2
  },
  [types.SET_VSHOPPRODUCTGUID] (state, vShopProductGuid) {
    state.vShopProductGuid = vShopProductGuid
  },
  [types.SET_VGROUNPPRODUCTTYPE] (state, vGroupProductType) {
    state.vGroupProductType = vGroupProductType
  },
  [types.SET_VSHOPDETAIL] (state, vShopDetail) {
    state.vShopDetail = vShopDetail
  },
  [types.SET_VPRODUCTDETAIL] (state, vProductDetail) {
    state.vProductDetail = vProductDetail
  },
  [types.SET_VORDERGUID] (state, vOrderGuid) {
    state.vOrderGuid = vOrderGuid
  },
  [types.SET_VITEMADDRESS] (state, vItemAddress) {
    state.vItemAddress = vItemAddress
  }
}

export default mutations
