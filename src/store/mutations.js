import { IMGFILE, REFRESH } from './mutation-types.js'

export default {
  [IMGFILE](state, imgfile) {
    state.imgFile = imgfile
  },
  [REFRESH](state, flag) {
    state.boxRefreshFlag = flag
  }
}
