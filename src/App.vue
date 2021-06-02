<template>
  <v-app>
    <!-- Belka menu -->
    <AppBar></AppBar>

    <!-- Zawartość strony -->
    <AppView></AppView>

    <!-- Stopka -->
    <AppFooter></AppFooter>
  </v-app>
</template>

<script>
import AppBar from './layouts/AppBar'
import AppView from './layouts/View'
import AppFooter from './layouts/Footer'

export default {
  name: 'App',
  components: {
    AppBar,
    AppView,
    AppFooter
  }
}
</script>
