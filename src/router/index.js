import Vue from 'vue'
import Router from 'vue-router'
import Sofa from '@/components/Sofa'
import Pillow from '@/components/Pillow'
import Cart from '@/components/Cart'
import Options from '@/components/Options'
import Output_order from '@/components/Output_order'

Vue.use(Router)
export default new Router({
  routes: [{
      path: '/',
      name: 'sofa',
      component: Sofa
    },
    {
      path: '/pillow',
      name: 'pillow',
      component: Pillow
    }, {
      path: '/cart',
      name: 'cart',
      component: Cart
    }, {
      path: '/options',
      name: 'options',
      component: Options
    }, {
      path: '/Output_order',
      name: 'Output_order',
      component: Output_order
    }
  ]
})
