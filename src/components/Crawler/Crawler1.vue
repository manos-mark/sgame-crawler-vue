<template>
  <v-container>
    <v-toolbar dense class="primary" fixed style="margin-top:60px">
      <v-btn round @click="changeView = !changeView" class="accent">Change View</v-btn>
      <v-btn round v-show="changeView" @click="all" v-if="panelIsEmpty" class="accent">View All</v-btn>
      <v-btn round v-show="changeView" @click="none" v-if="!panelIsEmpty" class="accent">View None</v-btn>
      <v-btn dark large outline color="success" fixed right>
        <v-icon dark left>edit</v-icon>
        Edit Mode
      </v-btn>
    </v-toolbar>
    <v-layout row wrap>
      <v-flex xs12 lg10 offset-lg1 mt-5>
        <v-btn fab dark large outline color="success" fixed bottom right>
          <v-icon dark>edit</v-icon>
        </v-btn>
        <h1 class="blue-grey--text text--darken-2 text-xs-left ml-4">{{ crawler.title }}</h1>
        <v-layout>
          <v-flex xs12 class="vertical-center">
            <v-progress-circular
              indeterminate
              color="black"
              :width="7"
              :size="70"
              v-if="loading"
            >
            </v-progress-circular>
          </v-flex>
        </v-layout>

        <v-expansion-panel
          v-if="!loading"
          v-model="panel"
          v-show="changeView"
          :popout="true"
          class="mt-4"
          expand
        >
          <v-expansion-panel-content
            class="info elevation-4"
            v-for="(details, index) in crawler.details"
            :key="index"
          >
            <div slot="header" v-if="isValid(details[expansionPanelTitle])">
              <v-avatar
                class="mr-2"
                :tile="false"
                size="60px"
                color="grey lighten-4"
              >
                <img :src="getImage(index)">
              </v-avatar>
              {{ details[expansionPanelTitle] }}
            </div>
            <!-- <v-img
              :src="getImage(index)"
              width="100%"
              contain
            >
            </v-img> -->
            <custom-data-table :details="details"></custom-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <div
          v-if="!changeView"
          class="mt-4 elevation-4 text-xs-center"
          color="info"
        >
          <v-pagination
            v-model="details"
            :length="crawler.details.length"
            :total-visible="7"
          ></v-pagination>
          <custom-data-table :details="details"></custom-data-table>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    data () {
      return {
        crawler: {},
        details: [],
        index: 0,
        changeView: true,
        panel: [],
        items: 0,
        expansionPanelTitle: 'Ονομασία Μνημείου'
      }
    },
    created () {
      this.$store.dispatch('downloadJson', this.id)
      this.crawler = this.$store.getters.loadedCrawler(this.id)
      for (const item in this.crawler) {
        this.details = item
        this.index++
      }
    },
    computed: {
      // crawler () {
      //   return this.$store.getters.loadedCrawler(this.id)
      // },
      panelIsEmpty () {   // watch if panel is empty
        return this.panel.length !== this.items
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    updated () {
      this.items = this.crawler.details.length
    },
    methods: {
      // Create an array the length of our items
      // with all values as true
      all () {
        this.panel = [...Array(this.items).keys()].map(_ => true)
      },
      // Reset the panel
      none () {
        this.panel = []
      },
      isValid (item) {
        return item !== null && item !== undefined
      },
      getImage (index) {
        return this.crawler.details[index].Image
      }
    }
  }
</script>

<style scoped>
  .title{
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 50px;
    background-color: rgba(0,0,0,.5);
    color: white;
    font-size: 2em;
    padding: 10px;
  }

  .vertical-center {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
</style>
