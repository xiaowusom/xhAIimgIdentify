import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import TakingPictures from '@/pages/TakingPictures'
import details from '@/pages/details'
import imgBox from '@/pages/imgBox'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      // redirect: '/TakingPictures',
      component: TakingPictures,
      meta: {
        title: '相似宝贝'
      }
    },
    {
      path: '/details',
      name: 'details',
      // redirect: '/TakingPictures',
      component: details
    },
    {
      path: '/imgBox',
      name: 'imgBox',
      // redirect: '/TakingPictures',
      component: imgBox
    }
  ]
})
