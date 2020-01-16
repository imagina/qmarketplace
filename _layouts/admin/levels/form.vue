<template>
   <q-page class="bg-fondo store-page cupones">
     <q-form @submit="$route.params.id ? updateItem() : createItem()" ref="formContent"
     @validation-error="$alert.error($tr('ui.message.formInvalid'))" autocomplete="off">
      <div class="q-py-xl">
        <div class="q-container">
          <div class="row">
            <div class="col-12">
              <div class="text-h5 text-primary q-mb-md font-family-secondary">Crear Nivel</div>
            </div>
            <div class="col-12 form-general">

              <q-card class="rounded-md bg-white q-mb-xl">

                <q-card-section class="q-pa-lg">
                  <p class="caption q-mb-md">Nombre
                    <q-btn round class="no-shadow" size="6px" icon="fas fa-question" >
                      <q-tooltip>
                        Nombre del nivel
                      </q-tooltip>
                    </q-btn>
                  </p>

                  <q-input v-model="form.name" color="primary" class="codigo" outlined placeholder="lorem ipsum" />

                </q-card-section>
              </q-card>


              <div class="text-right">
                 <q-btn :loading="loading"v-if="$route.params.id" class="bg-primary text-white btn-arrow-send-pink"
                          color="primary" label="Actualizar" type="submit"
                        />
                 <q-btn :loading="loading"v-else class="bg-primary text-white btn-arrow-send-pink"
                          color="primary" label="Guardar" type="submit"
                        />
              </div>



            </div>

          </div>
      </div>
    </div>
  </q-form>
   </q-page>
</template>

<script>
   export default {
      name: "CuponesPage",
      data () {
        return {
          loading: false,
          criterias: [],
          form: {
            id: '',
            name: '',
            type: 0,
            options:{
              criterias:{

              }
            }
          },

        }
      },
      mounted () {
        this.$nextTick(() => {
          this.initForm();
        })
      },
      methods: {
        initForm () {
          if (this.$route.params.id) this.getData()
        },
        getData () {
          this.loading = true
          let params = {
            refresh: true,
            params: {}
          }
          this.$crud.show('apiRoutes.qmarketplace.levels', this.$route.params.id, params)
            .then(response => {
              Object.assign(this.form, { ...response.data })
              setTimeout(() => {
                this.loading = false
              }, 1000);

            }).catch(error => {
            this.$alert.error({ message: this.$tr('ui.message.errorRequest'), pos: 'bottom' })
            this.loading = false
          })
        },
        createItem () {
          this.loading = true;
          this.$crud.create('apiRoutes.qmarketplace.levels', this.form)
            .then(response => {
              this.loading = false
              this.$router.push({ name: 'qmarketplace.admin.levels.index' })
              this.$alert.success({ message: `${this.$tr('ui.message.recordCreated')} ID: ${response.data.id}` })
            })
            .catch(error => {
              this.loading = false
              this.$alert.error({ message: this.$tr('ui.message.recordNoCreatde'), pos: 'bottom' })
            })
        },
        updateItem () {
          this.loading = true
          this.$crud.update('apiRoutes.qmarketplace.levels', this.form.id, this.form)
            .then(response => {
              this.loading = false
              this.$alert.success({ message: `${this.$tr('ui.message.recordUpdated')}` })
              this.initForm()
            })
            .catch(error => {
              this.loading = false
              this.$alert.error({ message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom' })
            })
        },

      }
   }
</script>
<style lang="stylus">

</style>
