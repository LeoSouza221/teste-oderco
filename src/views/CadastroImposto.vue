<template lang="pug">
  .cadastro-imposto
    alerta(
      :snackbar="abrirAlerta"
      :texto="texto"
    )
    v-dialog(v-model="dialog" persistent max-width="300")
      template(v-slot:activator="{ on, attrs }")
        v-btn(
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        ) Cadastro de Imposto
      v-card
        v-toolbar.primary(dark height=50)
          v-toolbar-title Cadastrar Imposto
          v-spacer
          v-btn(icon dark @click="fechar")
            v-icon mdi-close
        v-form(ref="impostoForm" v-model="validaImposto")
          v-card-text
            v-row(justify="center")
              v-col(cols="12")
                v-select(
                  v-model="imposto.produto_id"
                  label="Produtos"
                  :items="produtos"
                  item-text="nome"
                  item-value="id"
                  :rules="rules.produto_id"
                )
              v-col(cols="12")
                v-text-field(
                  v-model="imposto.uf"
                  label="UF"
                  :rules="rules.uf"
                )
              v-col(cols="12")
                v-text-field(
                  v-model="imposto.percentual"
                  label="Percentual"
                  suffix="%"
                  :rules="rules.percentual"
                  type="number"
                )
              v-btn.secondary(
                @click="salvarImposto"
                :disabled="!validaImposto"
              ) Salvar
</template>

<script>
import http from '@/utils/http';
import Alerta from '@/components/Alerta.vue';

export default {
  name: 'CadastroImposto',

  props: {
    buscarImpostoProdutos: {
      required: true,
      type: Function,
    },
  },

  components: {
    Alerta,
  },

  data: () => ({
    abrirAlerta: false,
    dialog: false,
    validaImposto: false,
    texto: '',
    imposto: {
      produto_id: null,
      uf: null,
      percentual: null,
    },
    rules: {
      produto_id: [
        (v) => !!v || 'Campo Obrigatorio',
      ],
      uf: [
        (v) => !!v || 'Campo Obrigatorio',
      ],
      percentual: [
        (v) => !!v || 'Campo Obrigatorio',
      ],
    },
    produtos: [],
  }),

  created() {
    this.buscarProdutos();
  },

  methods: {
    salvarImposto() {
      http.post('imposto', this.imposto)
        .then(({ data }) => {
          const { mensagem } = data;
          this.alertar(mensagem);
        });
    },

    buscarProdutos() {
      http.get('produto')
        .then(({ data }) => {
          this.produtos = data;
        });
    },

    alertar(mensagem) {
      this.texto = mensagem;
      this.abrirAlerta = true;
      this.limparCamposEFechar();
    },

    limparCamposEFechar() {
      this.imposto = {
        produto_id: null,
        uf: null,
        percentual: null,
      };
      this.dialog = false;
      this.buscarImpostoProdutos();
    },

    fechar() {
      this.dialog = false;
    },
  },
};
</script>
