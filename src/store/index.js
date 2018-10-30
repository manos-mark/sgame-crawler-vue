import Vue from 'vue'
import Vuex from 'vuex'
import Crawler from './crawler'
import User from './user'
import Shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    crawler: Crawler,
    user: User,
    shared: Shared
  }
})
