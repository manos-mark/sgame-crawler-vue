<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 mb-2 mt-4>
        <h1 class="blue-grey--text text--darken-2">Create a new Crawler</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 mb-2>
        <v-form @submit.prevent="onCreateCrawler">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                outline
                color="black"
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 mb-2>
              <v-textarea
                outline
                color="black"
                name="description"
                label="Description"
                id="description"
                v-model="description"
                required
              ></v-textarea>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 mb-2>
              <v-text-field
                outline
                color="black"
                name="imageUrl"
                label="Image Url"
                id="image-url"
                v-model="imageUrl"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 mb-2>
              <h3 class="grey--text text--darken-2">Image Preview</h3>
              <img :src="imageUrl" height="200px">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 mb-2>
              <h3 class="grey--text text--darken-2">Upload Json File</h3>
              <v-btn
                color="blue-grey"
                class="white--text"
                @click.native="onPickFile"
              >
                Upload
                <v-icon right dark>cloud_upload</v-icon>
              </v-btn>
              <input
                type="file"
                style="display:none"
                ref="fileInput"
                accept=".json"
                @change="onFilePicked">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="blue-grey"
                :disabled="!formIsValid"
                type="submit"
              >Create Crawler</v-btn>
            </v-flex>
            <v-flex xs2 sm6 offset-sm3>
              <v-btn
                @click="onTest"
                class="blue-grey"
              >Test</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        imageUrl: '',
        description: '',
        details: ''
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
          this.imageUrl !== '' &&
          this.description !== '' &&
          this.details !== ''
      }
    },
    methods: {
      onCreateCrawler () {
        if (!this.formIsValid) {
          return
        }
        const crawlerData = {
          title: this.title,
          description: this.description,
          imageUrl: this.imageUrl,
          details: this.details
        }
        this.$store.dispatch('createCrawler', crawlerData)
        this.$router.push('/crawlers')
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {                  // default DOM event passed into the method
        const files = event.target.files      // retrieve the file from this event
        let filename = files[0].name      // we only have 1 file cuz we dont have multiselector
        if (filename.lastIndexOf('.') <= 0) { // filename is provided by vanilla javascript
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.details = fileReader.result
        })
        fileReader.readAsText(files[0])
        fileReader.onload = function (event) {
          this.details = JSON.parse(event.target.result)
        }
      },
      onTest () {
        // const Crawler = require('crawler')
        console.log('ok')
      }
    }
  }
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
