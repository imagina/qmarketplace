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

                  <q-input v-model="form.name" color="primary" class="codigo" outlined placeholder="" />

                </q-card-section>
              </q-card>

              <q-card class="rounded-md bg-white q-mb-xl">

                <q-card-section class="q-pa-lg">
                  <p class="caption q-mb-md">Tipo de nivel
                    <q-btn round class="no-shadow" size="6px" icon="fas fa-question" >
                      <q-tooltip>
                        Tipo de nivel: Usuario o tienda
                      </q-tooltip>
                    </q-btn>
                  </p>

                  <q-checkbox
                  v-model="form.type"
                  color="primary"
                  label="¿Es un nivel de tienda?"
                  true-value="1"
                  false-value="0"
                  />

                </q-card-section>
              </q-card>

              <q-card class="rounded-md bg-white q-mb-xl" v-if="form.type=='1'">

                <q-card-section class="q-pa-lg">
                  <p class="caption q-mb-md">Criterios
                    <q-btn round class="no-shadow" size="6px" icon="fas fa-question" >
                      <q-tooltip>
                        Criterios para cumplir con el nivel
                      </q-tooltip>
                    </q-btn>
                  </p>

                  <tree-select
                  :clearable="false"
                  :append-to-body="true"
                  class="q-mb-md"
                  :options="criterias"
                  value-consists-of="BRANCH_PRIORITY"
                  @input="val => { setCriteria() }"
                  v-model="criteriaIndex"
                  placeholder=""
                  />

                </q-card-section>
              </q-card>

              <q-card class="rounded-md bg-white q-mb-xl" v-if="form.options.criterias.length>0">

                <q-card-section class="q-pa-lg">
                  <div class="q-mt-sm q-mb-sm" v-for="criteriaOpt in form.options.criterias">
                    <p class="caption q-mb-md">{{criteriaOpt.label}}
                    </p>
                    <q-input v-if="criteriaOpt.type=='0'" v-model="criteriaOpt.value" color="primary" class="codigo" outlined placeholder="" />
                  </div>

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
          criteriaIndex:'nw',
          form: {
            id: '',
            name: '',
            type: '0',
            options:{
              criterias:[]
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
          this.getCriterias();
          if (this.$route.params.id) this.getData();
        },
        getCriterias(){
          let params = {
            remember: false,
            params: {
              include: '',
              filter:{
                allTranslations: true,
              }
            }
          };//params
          this.$crud.index("apiRoutes.qmarketplace.levelCriteria",params).then(response => {
            this.criterias=[];
            this.criterias.push({label:"Selecciona un criterio ",id:'nw'});
            for(var i=0;i<response.data.length;i++){
              this.criterias.push({label:response.data[i].name,type:response.data[i].type,value:'0',id:response.data[i].id});
            }
          });
        },
        setCriteria(){
          if(this.criteriaIndex>=0){
            var b=0;
            for(var i=0;i<this.form.options.criterias.length;i++){
              if(this.form.options.criterias[i].id==this.criterias[this.criteriaIndex].id){
                b=1;
                break;
              }
            }//for
            if(b==1){
              this.$alert.error({ message: "Ya has seleccionado este criterio", pos: 'bottom' });
              this.criteriaIndex='nw';
            }else{
              this.form.options.criterias.push(this.criterias[this.criteriaIndex]);
            }
          }
        },
        getData () {
          this.loading = true
          let params = {
            refresh: true,
            params: {}
          }
          this.$crud.show('apiRoutes.qmarketplace.level', this.$route.params.id, params)
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
          this.$crud.create('apiRoutes.qmarketplace.level', this.form)
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
          this.$crud.update('apiRoutes.qmarketplace.level', this.form.id, this.form)
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
