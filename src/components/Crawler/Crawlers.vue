<!--List of cards with all the crawlers-->
<template>
  <v-container fluid>
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
    <v-layout
      v-if="!loading"
      row
      wrap
      v-for="crawler in crawlers"
      :key="crawler.id"
    >
      <v-flex xs12 lg8 offset-lg2>
        <v-card
          class="info mt-4"
        >
          <v-layout row>
            <v-flex xs5>
              <v-img
                :src="crawler.imageUrl"
                height="125px"
                contain
              >
              </v-img>
            </v-flex>
            <v-flex xs7>
              <v-card-title primary-title>
                <div>
                  <div class="headline"><h5>{{ crawler.title }}</h5></div>
                  <div class="mt-1">Creation date: {{ crawler.zdate | date-filter }}</div>
                  <div class="mt-1">Description: {{ crawler.description }}</div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <register-dialog :crawlerId="crawler.id"></register-dialog>
            <v-btn class="success" flat :to="/crawlers/ + crawler.id">
              <v-icon left>arrow_forward</v-icon>
              View crawler
            </v-btn>
          </v-card-actions>
          </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      crawlers () {
        return this.$store.getters.loadedCrawlers
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>
  .vertical-center {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
</style>
