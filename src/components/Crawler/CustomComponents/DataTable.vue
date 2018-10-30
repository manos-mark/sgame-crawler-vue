<template>
  <v-data-table
    :headers="headers"
    :items="[details]"
    class="elevation-1"
    hide-actions
  >
    <template
      slot="items"
      slot-scope="props"
    >
      <tr v-for="(value, key) in props.item">
        <td class="text-xs-left">
          <b>{{ key }}:</b>
        </td>
        <td class="text-xs-left">
          {{ value }}
        </td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    props: ['details'],
    data () {
      return {
        dialog: false,
        editedIndex: -1,
        headers: [
          {
            text: 'Property',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Value', value: 'name', sortable: false },
          { text: 'Actions', value: 'name', sortable: false }
        ]
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    methods: {
      editItem (item) {
        console.log(item)
        // this.editedIndex = this.details.indexOf(item)
        // this.editedItem = Object.assign({}, item)
        this.dialog = true
      }
      // deleteItem (item) {
      //   const index = this.details.indexOf(item)
      //   confirm('Are you sure you want to delete this item?') && this.details.splice(index, 1)
      // },
      // close () {
      //   this.dialog = false
      //   setTimeout(() => {
      //     this.editedItem = Object.assign({}, this.defaultItem)
      //     this.editedIndex = -1
      //   }, 300)
      // },
      // save () {
      //   if (this.editedIndex > -1) {
      //     Object.assign(this.desserts[this.editedIndex], this.editedItem)
      //   } else {
      //     this.details.push(this.editedItem)
      //   }
      //   this.close()
      // }
    }
  }
</script>
