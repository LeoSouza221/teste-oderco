<template lang="pug">
  .tabela-imposto
    v-row
      cadastro-imposto(:buscarImpostoProdutos="buscarImpostoProdutos")
      v-spacer
      simular-imposto
    v-data-table(
      :items="impostos"
      :headers="headers"
      no-data-text="Sem impostoso cadastrados"
    )
      template(v-slot:item.percentual="{ item }")
        span {{ item.percentual }} %
</template>

<script>
import http from '@/utils/http';
import CadastroImposto from './CadastroImposto.vue';
import SimularImposto from './SimularImposto.vue';

export default {
  components: {
    CadastroImposto,
    SimularImposto,
  },

  data: () => ({
    impostos: [],
    headers: [
      {
        text: 'ID',
        align: 'start',
        value: 'id',
      },
      {
        text: 'UF',
        value: 'uf',
      },
      {
        text: 'Produto',
        value: 'produto_id',
      },
      {
        text: 'Percentual',
        value: 'percentual',
      },
    ],
  }),

  created() {
    this.buscarImpostoProdutos();
  },

  methods: {
    buscarImpostoProdutos() {
      http.get('imposto')
        .then(({ data }) => {
          this.impostos = data;
        });
    },
  },
};
</script>
