<template>
  <v-app>
    <!-- Belka menu -->
    <AppBar></AppBar>

    <!-- Zawartość strony -->
    <AppView></AppView>
  </v-app>
</template>

<script>
import AppBar from './layouts/AppBar'
import AppView from './layouts/View'

export default {
  name: 'App',
  components: {
    AppBar,
    AppView
  }
}
</script>
