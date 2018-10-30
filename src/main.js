import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import * as firebase from 'firebase'
import AlertCmp from './components/SharedCustomComponents/Alert'
import DataTable from './components/Crawler/CustomComponents/DataTable'
import ImageDialog from './components/Crawler/CustomComponents/ImageDialog'
import DateFilter from './filters/date'
import EditCrawlerInfoDialog from './components/Crawler/CustomComponents/EditCrawlerInfoDialog'

Vue.use(Vuetify, { theme: {
  primary: '#afb7bf',
  secondary: '#bdadb1',
  accent: '#bdb3ad',
  error: '#941818',
  info: '#b1bdad',
  success: '#546646',
  warning: '#c6d65e'
}})

Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)
Vue.component('data-table', DataTable)
Vue.component('image-dialog', ImageDialog)
Vue.component('edit-crawler-info-dialog', EditCrawlerInfoDialog)
Vue.filter('date-filter', DateFilter)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
      authDomain: 'sgame-crawler-vue.firebaseapp.com',
      databaseURL: 'https://sgame-crawler-vue.firebaseio.com',
      projectId: 'sgame-crawler-vue',
      storageBucket: 'sgame-crawler-vue.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoLogin', user)
      }
    })
    this.$store.dispatch('loadCrawlers')
  }
})
