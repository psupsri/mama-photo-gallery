import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import MyAlbum from '@/pages/MyAlbum'
import Photo from '@/pages/Photo'
import MyProfile from '@/pages/MyProfile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Index },
    { path: '/myalbum/:id', component: MyAlbum, meta: { requiresAuth: true } },
    { path: '/photo/:id', component: Photo },
    { path: '/profile/:id', component: MyProfile, meta: { requiresAuth: true } }
  ]
})
