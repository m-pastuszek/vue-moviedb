<template>
  <v-app>
    <AppBar></AppBar>

    <v-main>
      <router-view/>
    </v-main>

    <!-- Stopka -->
    <Footer></Footer>
  </v-app>
</template>

<script>
import AppBar from './layouts/AppBar'
import Footer from './layouts/Footer'

export default {
  name: 'App',

  data: () => ({

  }),
  components: {
    AppBar,
    Footer
  }
}
</script>
