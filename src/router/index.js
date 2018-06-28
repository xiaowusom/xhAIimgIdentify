import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import TakingPictures from '@/pages/TakingPictures'
import details from '@/pages/details'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      // redirect: '/TakingPictures',
      component: TakingPictures
    },
    {
      path: '/details',
      name: 'details',
      // redirect: '/TakingPictures',
      component: details
    }
  ]
})
