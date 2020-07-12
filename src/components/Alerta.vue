<template lang="pug">
  v-snackbar(
    v-model="snackbar"
    timeout=4000
    color="success"
    top
  ) {{ texto }}
</template>

<script>
export default {
  name: 'Alerta',

  props: {
    snackbar: {
      required: true,
      type: Boolean,
    },
    texto: {
      required: true,
      type: String,
    },
  },
};
</script>
