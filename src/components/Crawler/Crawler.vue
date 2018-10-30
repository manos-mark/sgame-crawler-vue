<template>
  <v-container>
    <!-- Toolbar -->
    <v-toolbar flat fixed dense class="primary pt-2 pb-2 hidden-xs-only" style="margin: 4em 0">
      <v-btn round @click="changeView = !changeView" class="accent">Change View</v-btn>
      <v-btn round v-show="changeView" @click="all" v-if="panelIsEmpty" class="accent">View All</v-btn>
      <v-btn round v-show="changeView" @click="none" v-if="!panelIsEmpty" class="accent">View None</v-btn>
      <v-btn color="success" @click="onEditMode" round dark large outline fixed right>
        <v-icon dark left>edit</v-icon>
        Edit Mode
      </v-btn>
    </v-toolbar>
    <!-- Toolbar xs -->
    <v-toolbar flat dense class="primary hidden-sm-and-up pt-1 pb-1">
      <v-btn round @click="changeView = !changeView" class="accent">Change View</v-btn>
      <v-btn round v-show="changeView" @click="all" v-if="panelIsEmpty" class="accent">View All</v-btn>
      <v-btn round v-show="changeView" @click="none" v-if="!panelIsEmpty" class="accent">View None</v-btn>
    </v-toolbar>
    <!-- Floated edit button xs -->
    <v-btn fab dark medium fixed bottom right color="success" class="hidden-sm-and-up">
      <v-icon dark>edit</v-icon>
    </v-btn>
    <v-layout row wrap>
      <!-- Divider xs & md-and-up -->
      <v-flex xs12>
        <v-divider style="margin-top: 4em" class="hidden-xs-only"></v-divider>
        <v-divider class="hidden-sm-and-up"></v-divider>
      </v-flex>
      <v-flex xs12 lg10 offset-lg1 mt-5>
        <v-layout row wrap>
          <v-flex xs10>
            <!-- Main Title -->
            <h1 class="blue-grey--text text--darken-2 text-xs-left ml-4">{{ crawler.title }}</h1>
          </v-flex>
          <v-flex xs2>
            <!-- Edit Info Dialog-->
            <template v-if="userIsCreator">
              <edit-crawler-info-dialog :crawler="crawler"></edit-crawler-info-dialog>
            </template>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 lg10 offset-lg1>
        <!-- Circular Loader -->
        <v-layout row wrap v-if="loading">
          <v-flex xs12 class="vertical-center">
            <v-progress-circular
              indeterminate
              color="black"
              :width="7"
              :size="70"
            >
            </v-progress-circular>
          </v-flex>
        </v-layout>
        <!-- Expantion Panel View -->
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
            v-for="(item, index) in crawler.details"
            :key="index"
          >
            <div slot="header">
              <!--<v-avatar-->
                <!--class="mr-2"-->
                <!--size="60px"-->
                <!--@click.native="showImageDialog(getImage(index))"-->
              <!--&gt;-->
              <v-avatar
                class="mr-2"
                size="60px"
              >
                <img :src="getImage(index)">
              </v-avatar>
              <span v-if="isValid(item[expansionPanelTitle])">{{ item[expansionPanelTitle] }}</span>
              <span v-else>Title not found</span>
            </div>
            <data-table :details="item"></data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- Pagination View -->
        <div v-if="!changeView" class="mt-4 elevation-4 text-xs-center info">
          <v-layout row wrap>
            <v-flex xs1>
              <v-avatar
                size="60px"
                class="mt-2 mb-2"
              >
                <img :src="getImage(page)">
              </v-avatar>
            </v-flex>
            <!-- Custom Image Dialog -->
            <!-- <image-dialog
              :img="dialogImage"
            </image-dialog> -->
            <!-- Pagination -->
            <v-flex xs10>
              <v-pagination
                v-model="page"
                :length="crawler.details.length"
                :total-visible="10"
                color="accent"
                class="pt-3 pb-3"
              >
              </v-pagination>
            </v-flex>
          </v-layout>
          <!-- Custom Data Table -->
          <v-layout row wrap>
            <v-flex xs12>
              <data-table :details="crawler.details[page]"></data-table>
            </v-flex>
          </v-layout>
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
        dialogImage: '',
        page: 1,
        changeView: true,
        panel: [],
        // panelLength: 0,
        expansionPanelTitle: 'Ονομασία Μνημείου'
      }
    },
    created () {
      this.$store.dispatch('downloadJson', this.id)
    },
    computed: {
      panelIsEmpty () {
        for (const item in this.panel) {
          if (this.panel[item]) {
            return false
          }
        }
        return true
      },
      loading () {
        return this.$store.getters.loading
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.crawler.creatorId
      }
    },
    updated () {
      this.crawler = this.$store.getters.loadedCrawler(this.id)
      // this.panelLength = this.crawler.details.length
    },
    methods: {
      // Create an array the length of our panelLength
      // with all values as true
      all () {
        this.panel = [...Array(this.crawler.details.length).keys()].map(_ => true)
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
      },
      onEditMode (event) {
        const btn = event.target
        console.log(btn.style)
      },
      setDialogImage (img) {
        this.dialogImage = img
        console.log(this.dialogImage)
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
