<template>
  <v-dialog width=350px v-model="editDialog">
    <v-btn floating round class="accent" slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Info</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="editedTitle"
              ></v-text-field>
              <v-text-field
                name="imageUrl"
                label="Image Url"
                id="imageUrl"
                v-model="editedImageUrl"
              ></v-text-field>
              <v-textarea
                name="description"
                label="Description"
                id="description"
                v-model="editedDescription"
              ></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat @click="editDialog=false">Close</v-btn>
              <v-btn flat @click="onSaveChanges">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['crawler'],
  data () {
    return {
      editDialog: false,
      editedTitle: this.crawler.title,
      editedDescription: this.crawler.description,
      editedImageUrl: this.crawler.imageUrl
    }
  },
  methods: {
    onSaveChanges () {
      if (this.editedTitle.trim() === '' || this.editedDescription === '') {
        return
      }
      this.editDialog = false
      this.$store.dispatch('updateCrawlerInfo', {
        id: this.crawler.id,
        title: this.editedTitle,
        description: this.editedDescription,
        imageUrl: this.editedImageUrl
      })
    }
  }
}
</script>
