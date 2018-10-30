<template>
  <v-dialog width=400px v-model="registerDialog">
    <v-btn floating class="secondary mr-2" slot="activator">
      {{ userIsRegistered ? 'Remove from My Crawlers' : 'Add to My Crawlers' }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered">Remove from My Crawlers?</v-card-title>
            <v-card-title v-else>Add to My Crawlers?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>You can always change your decision later on!</v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                flat
                @click="registerDialog=false"
                class="red--text darken-1"
                >Cancel
              </v-btn>
              <v-btn
                flat
                @click="onAgree"
                class="green--text darken-1"
                >Confirm
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['crawlerId'],
  data () {
    return {
      registerDialog: false
    }
  },
  computed: {
    userIsRegistered () {
      return this.$store.getters.user.registeredCrawlers.findIndex(crawlerId => {
        return crawlerId === this.crawlerId
      }) >= 0
    }
  },
  methods: {
    onAgree () {
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterUserFromCrawler', this.crawlerId)
      } else {
        this.$store.dispatch('registerUserForCrawler', this.crawlerId)
      }
    }
  }
}
</script>
