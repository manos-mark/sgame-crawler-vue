<template>
  <v-container class="mt-4">
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert
          @dismissed="onDismissed"
          :text="error.message"
        >
        </app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="accent">
          <v-card-text>
            <v-container>
              <form @submit.prevent="onLogin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="E-mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4 offset-xs7 sm5 offset-sm7 md3 offset-md8 lg2 offset-lg10 class="mb-0">
                    <v-btn type="submit" class="primary" :loading="loading" :disabled="loading">
                      Login
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        username: '',
        email: '',
        password: ''
      }
    },
    computed: {
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLogin () {
        this.$store.dispatch('signUserIn', {username: this.username, email: this.email, password: this.password})
      },
      onDismissed () {
        this.$store.dispatch('clearError')
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>
