<template>
  <v-btn v-on:click="switchTheme()">
    <v-icon left>mdi-theme-light-dark</v-icon>
    Zmień motyw
  </v-btn>
</template>

<script>
export default {
  name: 'ThemeSettings',
  data () {
    //
  },
  methods: {
    switchTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('theme', this.$vuetify.theme.dark ? 'dark' : 'light')
    }
  }
}
</script>
