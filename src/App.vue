<!--Menu Bar && Navigation Drawer-->
<template>
  <v-app class="primary">
    <v-navigation-drawer v-model="sideNav" temporary fixed>
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
          v-on="item.title === 'Logout' ? { click: onLogout } : {}"
        >
          <v-list-tile-action>
            <v-icon> {{ item.icon }} </v-icon>
          </v-list-tile-action>
          <v-list-tile-content> {{ item.title }} </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="secondary" fixed>
      <v-toolbar-side-icon @click="sideNav = !sideNav" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer;">Serious Game's Crawler</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
          class="info"
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
          v-on="item.title === 'Logout' ? { click: onLogout } : {}"
        >
          <v-icon left> {{ item.icon }} </v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main class="mt-5">
      <router-view></router-view>
    </main>
    <!--<v-footer class="pa-3 mb-0 accent">-->
      <!--<v-spacer></v-spacer>-->
      <!--<div>&copy; {{ new Date().getFullYear() }}</div>-->
    <!--</v-footer>-->
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'face', title: 'Register', link: 'signup' },
        { icon: 'lock_open', title: 'Login', link: '/login' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'view_list', title: 'Crawlers', link: '/crawlers' },
          { icon: 'border_color', title: 'My Crawlers', link: '/edit' },
          { icon: 'add_circle_outline', title: 'Create New', link: '/new' },
          { icon: 'lock', title: 'Logout', link: '/' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      if (this.$store.getters.user !== null && this.$store.getters.user !== undefined) {
        this.$router.push('/')
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  },
  name: 'App'
}
</script>
