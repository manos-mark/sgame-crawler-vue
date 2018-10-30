import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    registerUserForCrawler (state, payload) {
      const id = payload.id
      if (state.user.registeredCrawlers.findIndex(crawler => crawler.id === id) >= 0) {
        return
      }
      state.user.registeredCrawlers.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromCrawler (state, payload) {
      const registeredCrawlers = state.user.registeredCrawlers
      registeredCrawlers.splice(registeredCrawlers.findIndex(crawler => crawler.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    }
  },
  actions: {
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.uid,
            registeredCrawlers: [],
            username: user.displayName,
            fbKeys: {}
          }
          commit('setLoading', false)
          commit('setUser', newUser)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.uid,
            registeredCrawlers: [],
            username: user.displayName,
            fbKeys: {}
          }
          commit('setLoading', false)
          commit('setUser', newUser)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    autoLogin ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredCrawlers: [],
        fbKeys: {}
      })
    },
    logout ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signOut()
        .then(() => {
          commit('setLoading', false)
          commit('setUser', null)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
          commit('setError', error)
        })
      commit('setUser', null)
    },
    registerUserForCrawler ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registration/').push(payload)
        .then(data => {
          commit('setLoading', false)
          commit('registerUserForCrawler', {id: payload, fbKey: data.key})
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    unregisterUserFromCrawler ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/registration/').child(fbKey).remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserFromCrawler', payload)
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
        })
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
