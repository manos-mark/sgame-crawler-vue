<template>
  <!-- <v-dialog
      v-model="dialog"
      max-width="50%"
  > -->
  <v-dialog v-model="dialog" max-width="50%">
    <v-btn floating round class="accent" slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-img :src="img"></v-img>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          flat="flat"
          @click="dialog=false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['img'],
    data () {
      return {
        dialog: true
      }
    }
  }
</script>
