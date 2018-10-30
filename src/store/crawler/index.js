import * as firebase from 'firebase'

export default {
  state: {
    loadedCrawlers: [
      {
        id: 'feqwfwe',
        title: 'Web Crawler 2',
        zdate: new Date(),
        imageUrl: 'https://www.newgen.co/images/web-crawler.jpg',
        description: '',
        details: []
      }
    ]
  },
  mutations: {
    setLoadedCrawlers (state, payload) {
      state.loadedCrawlers = payload
    },
    createCrawler (state, payload) {
      state.loadedCrawlers.push(payload)
    },
    setDetails (state, payload) {
      for (const index in state.loadedCrawlers) {
        if (state.loadedCrawlers[index].id === payload.payload) {
          state.loadedCrawlers[index].details = payload.details
        }
      }
    },
    updateCrawlerInfo (state, payload) {
      const crawler = state.loadedCrawlers.find(crawler => {
        return crawler.id === payload.id
      })
      if (payload.title) {
        crawler.title = payload.title
      }
      if (payload.description) {
        crawler.description = payload.description
      }
      if (payload.imageUrl) {
        crawler.imageUrl = payload.imageUrl
      }
    }
  },
  actions: {
    loadCrawlers ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('crawlers').once('value')
        .then((data) => {
          const crawlers = []
          const obj = data.val() // extract the object without metadata
          for (let key in obj) {
            crawlers.push({
              id: key,
              title: obj[key].title,
              zdate: obj[key].zdate,
              imageUrl: obj[key].imageUrl,
              description: obj[key].description,
              creatorId: obj[key].creatorId,
              details: 'jsonHasntLoad'
            })
          }
          commit('setLoading', false)
          commit('setLoadedCrawlers', crawlers)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    // 3 step aproach to save json file
    // we wanna store a json file in firebase and we wanna make sure
    // that it is conected to our crawler, so we need the id of the crawler
    // the id of the crawler is created by firebase thought
    // 1st upload all the data to the database which gives me the id
    // firebase will return the id
    // 2cond upload the json file and associate it with that crawler
    // 3rd hopefully  a succes response from firebase with the url of the uploaded file
    // then reach out on the firebase database and update the crawler with the download url
    createCrawler ({commit, getters}, payload) {
      const newCrawler = {
        title: payload.title,
        imageUrl: payload.imageUrl,
        description: payload.description,
        zdate: new Date().toISOString(),
        creatorId: getters.user.id
      }
      let key
      firebase.database().ref('crawlers').push(newCrawler)
        .then((data) => {
          key = data.key                          //  step 1
          return key
        })
        .then(key => {                           //   step 2
          return firebase.database().ref('jsonFiles').child(key).set(payload.details)
        })
        .then(() => {
          commit('createCrawler', {
            ...newCrawler,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    downloadJson ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('jsonFiles/').child(payload).once('value')
        .then(data => {
          const obj = data.val() // extract the object without metadata
          const details = JSON.parse(obj)
          commit('setLoading', false)
          commit('setDetails', {details, payload}) // edw payload einai to id
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    updateCrawlerInfo ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.imageUrl) {
        updateObj.imageUrl = payload.imageUrl
      }
      firebase.database().ref('crawlers').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateCrawlerInfo', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    loadedCrawlers (state) {
      return state.loadedCrawlers.sort((crawlerA, crawlerB) => {
        return crawlerA.date > crawlerB.date
      })
    },
    loadedCrawler (state) {
      return (crawlerId) => {
        return state.loadedCrawlers.find((crawler) => {
          return crawler.id === crawlerId
        })
      }
    },
    featuredCrawlers (state, getters) {
      return getters.loadedCrawlers.slice(0, 5)
    }
  }
}
