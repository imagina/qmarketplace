<template>
  <div id="orderStatusComponent" class="q-pa-md">
    <p>
      <b>Nuevo estado</b>
    </p>
    <q-field
      helper="Helper" 
      :error="$v.form.status.$error"
      error-label="We need a valid email">
      <tree-select v-model="form.status" :options="statuses"/>
    </q-field>

    <p>
      <b style="font-size: 12px ">Comentario</b>
    </p>
    <q-field 
      helper="Helper"
      :error="$v.form.comment.$error"
      error-label="We need a valid email">
      <q-input class="text-comment" rows="2" type="textarea" placeholder="Escribe aqui tu comentario" v-model="form.comment" />
    </q-field>

    <div class="q-mt-md text-right">
      <q-btn label="Guardar" color="primary" icon="save" @click="saveOrderHistoryStatus()"/>
    </div>

  </div>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        loading: false,
        statuses:[],
        form :{
          orderId: this.$route.params.id,
          status:null,
          notify: false,
          comment:''
        }
      }
    },
    validations: {
      form: {
        orderId: { required },
        status: { required },
        comment: { required },
      }
    },
    created(){
      this.getStatus()
    },
    methods: {
      getStatus(){
        let params= {
          params :{

          }
        }
        this.$crud.index('apiRoutes.qcommerce.orderStatus', params)
          .then( response => {
            this.statuses =  response.data.map( item => {
              return {
                id: item.id,
                label: item.title
              }
            })
          })
          .catch( error => {

          })
      },
      saveOrderHistoryStatus(){
        this.$v.form.$touch()
        this.loading = true
        if (this.$v.form.$error) {
          this.$alert.error({message: this.$tr('ui.message.formInvalid'), pos: 'bottom'})
          this.loading = false
          return
        }
        this.$crud.create('apiRoutes.qcommerce.orderStatusHistory', this.form)
          .then( response => {
            this.$emit('orderHistoryCreated')
            this.$alert.success({message: this.$tr('ui.message.recordUpdated')})
            this.clearForm()
            this.loading = false
          })
          .catch( error => {
            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
            this.loading = false
        })
      },
      clearForm(){
        this.form.comment = ''
        this.form.status = null
      }
    }
  }
</script>
<style lang="stylus">
#orderStatusComponent
  .text-comment
    width 100%
    .q-field__native
      padding-top 0
</style>

