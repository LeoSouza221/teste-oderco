<template lang="pug">
  .simular-imposto
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
        ) Simular Imposto
      v-card
        v-toolbar.primary(dark height=50)
          v-toolbar-title Simular Imposto
          v-spacer
          v-btn(icon dark @click="fechar")
            v-icon mdi-close
        v-form(ref="impostoForm" v-model="validaCalculo")
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
                  v-model="imposto.preco"
                  label="Preco"
                  prefix="R$"
                  :rules="rules.preco"
                  type="number"
                )
              v-col(cols="12")
                v-card-title Resultado: R$ {{ resultadoCalculo.valor_imposto | toTwoDecimalCase }}
              v-btn.secondary(
                @click="calcularImposto"
                :disabled="!validaCalculo"
              ) Calcular
</template>

<script>
import http from '@/utils/http';
import Alerta from '@/components/Alerta.vue';

export default {
  name: 'SimularImposto',

  components: {
    Alerta,
  },

  data: () => ({
    abrirAlerta: false,
    dialog: false,
    validaCalculo: false,
    texto: '',
    resultadoCalculo: {
      valor_imposto: 0,
    },
    imposto: {
      produto_id: null,
      uf: null,
      preco: null,
    },
    rules: {
      produto_id: [
        (v) => !!v || 'Campo Obrigatorio',
      ],
      uf: [
        (v) => !!v || 'Campo Obrigatorio',
      ],
      preco: [
        (v) => !!v || 'Campo Obrigatorio',
      ],
    },
    produtos: [],
  }),

  filters: {
    toTwoDecimalCase(value) {
      return value.toFixed(2);
    },
  },

  created() {
    this.buscarProdutos();
  },

  methods: {
    calcularImposto() {
      http.put('imposto', this.imposto)
        .then(({ data }) => {
          this.resultadoCalculo = data;
        }).catch((erro) => {
          console.error(erro);
          this.alertar('Imposto não cadastrado para produto e uf');
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
    },

    fechar() {
      this.imposto = {
        produto_id: null,
        uf: null,
        percentual: null,
      };
      this.dialog = false;
    },
  },
};
</script>
