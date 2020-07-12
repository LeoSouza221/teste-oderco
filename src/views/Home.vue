<template lang="pug">
  .home
    d-header
    v-main
      v-container
        tabela-imposto
</template>

<script>
import DefaultHeader from '@/components/DefaultHeader.vue';
import TabelaImposto from './TabelaImposto.vue';

export default {
  name: 'Home',

  components: {
    'd-header': DefaultHeader,
    TabelaImposto,
  },
};
</script>
