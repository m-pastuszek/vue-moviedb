<template>
  <v-footer padless>
    <v-col class="py-4 text-center" cols="12">
      © {{ new Date().getFullYear() }} <strong>Marcin Pastuszek</strong> | Wersja aplikacji: {{ this.$appVersion }}
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>

</style>
