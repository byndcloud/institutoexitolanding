<template lang="pug">
    v-container
      v-card(style='margin-top: 100px;')
        v-layout(column)
          v-layout(column)
            v-layout( wrap)
              v-flex(pa-4)
                v-radio-group(v-model="cardDetail.personType" name="personType")
                  v-radio(v-for="p in ['Pessoa Física', 'Pessoa Jurídica']" :label='p' :key="p" :value="p")
              v-flex(pa-4)
                v-text-field(v-model="cardDetail.cpf" name="cpf" label="CPF" v-if='cardDetail.personType == "Pessoa Física" ')
                v-text-field(v-model="cardDetail.cnpj" name="cnpj" label="CNPJ" v-if='cardDetail.personType == "Pessoa Jurídica"')                
            v-layout( wrap)
              v-flex(pa-4)
                v-text-field(v-model="cardDetail.email" name="email" label="Endereço de email")
              v-flex(pa-4)
                v-text-field(v-model="cardDetail.phone" name="phone" label="Telefone com DDD")
            v-layout( wrap)
              v-flex(pa-4)
                v-text-field(v-model="cardDetail.cep" name="cep" label="CEP")
              v-flex(pa-4)
                v-text-field(v-model="cardDetail.street" name="street" label="Nome da Rua")
              v-flex(pa-4)
                v-text-field(v-model="cardDetail.numero" name="numero" label="Número da residência")
              v-flex(pa-4)
                v-text-field(v-model="cardDetail.complemento" name="complemento" label="Complemento (Ex.: Apt. 402)")
                
                
            v-layout( wrap)
              v-flex(pa-4)
                v-text-field(v-model="cardDetail.bairro" name="bairro" label="Bairro")
              v-flex(pa-4)
                v-text-field(v-model="cardDetail.cidade" name="cidade" label="Cidade")
              v-flex(pa-4)
                v-text-field(v-model="cardDetail.pais" name="pais" label="País")
            v-divider
            v-layout( wrap)
              v-flex(pa-4)
                v-text-field(v-model="cardDetail.number" name="number" label="Número do cartão")
              v-flex(pa-4)
                v-text-field(v-model="cardDetail.name" name="name" label="Nome completo")
            v-layout( wrap)
              v-flex(pa-4)
                v-text-field(v-model="cardDetail.expiry" name="expiry" label="Data de validade")
              v-flex(pa-4)  
                v-text-field(v-model="cardDetail.cvc" name="name" label="CVC" @focus="invertedCard = true" @blur="invertedCard = false")
        v-layout(justify-center)
          Card(
            v-model="cardDetail"
            :invert-card.sync="invertedCard"
            format-data
            )
</template>
<script>
// import creditcard from 'vuetify-credit-card'
import Card from 'vuetify-credit-card'
const defaultCreditCardData = {
  number: '',
  name: '',
  expiry: '',
  cvc: ''
}
export default {
  data () {
    return {
      cardDetail: defaultCreditCardData,
      invertedCard: false
    }
  },
  components: {
    Card
  }
}
</script>
