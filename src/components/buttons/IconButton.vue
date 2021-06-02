<template>
  <v-btn
    icon v-on="$listeners">
    <v-icon v-text="icon"></v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'IconButton',
  props: { icon: String }
}
</script>

<style scoped>

</style>
