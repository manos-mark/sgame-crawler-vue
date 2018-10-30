<!--Home - Carousel-->
<template>
  <v-container>
    <v-layout v-if="loading">
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
    <v-layout row wrap class="mt-4" v-if="!loading">
      <v-flex sm12 md10 offset-md1 lg8 offset-lg2 xl6 offset-xl3>  <!-- style="height: 50vh"> -->
        <h1 class="blue-grey--text text--darken-2 text-xs-center mb-4">Home Page</h1>
        <v-carousel style="width:100%; cursor:pointer;">
          <v-carousel-item
            v-for="crawler in crawlers"
            :src="crawler.imageUrl"
            :key="crawler.id"
            @click="onLoadCrawler(crawler.id)"
            contain
          ><div class="title">
            {{ crawler.title }}
          </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12 class="text-xs-center">
        <p>Click the image to see the crawler!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      crawlers () {
        return this.$store.getters.featuredCrawlers
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadCrawler (id) {
        this.$router.push('/crawlers/' + id)
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
