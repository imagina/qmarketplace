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
                  <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                    <q-tooltip>
                      Nombre del nivel
                    </q-tooltip>
                  </q-btn>
                </p>

                <q-input v-model="form.name" color="primary" class="codigo" outlined placeholder=""
                :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                />

              </q-card-section>

              <q-card-section class="q-pa-lg">
                <p class="caption q-mb-md">Descripción
                  <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                    <q-tooltip>
                      Ingresa la descripción del nivel
                    </q-tooltip>
                  </q-btn>
                </p>

                <q-editor v-model="form.description" class="full-width"
                :toolbar="editorText.toolbar" content-class="text-grey-9"
                toolbar-text-color="grey-9"
                :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>

              </q-card-section>

              <q-card-section class="q-pa-lg">
                <p class="caption q-mb-md">Orden
                  <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                    <q-tooltip>
                      Ingresa el número de orden del nivel (Ejemplo 1,2 o 3...)
                    </q-tooltip>
                  </q-btn>
                </p>

                <q-input type="number" v-model="form.order" color="primary" class="codigo" outlined
                placeholder="" :rules="[val =>  val >= 0 || $tr('ui.message.fieldRequired')]"/>

              </q-card-section>

              <q-card-section class="q-pa-lg">
                <p class="caption q-mb-md">Cantidad de beneficios
                  <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                    <q-tooltip>
                      Cantidad de beneficios activos que puede tener el usuario al estar en este nivel
                    </q-tooltip>
                  </q-btn>
                </p>

                <q-input type="number" v-model="form.benefitsQuantity" color="primary" class="codigo" outlined
                placeholder="" :rules="[val =>  val >= 0 || $tr('ui.message.fieldRequired')]"/>

              </q-card-section>


            </q-card>

            <q-card class="rounded-md bg-white q-mb-xl">

            </q-card>

            <q-card class="rounded-md bg-white q-mb-xl">

              <q-card-section class="q-pa-lg">
                <p class="caption q-mb-md">Tipo de nivel
                  <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                    <q-tooltip>
                      Tipo de nivel: Usuario o tienda
                    </q-tooltip>
                  </q-btn>
                </p>

                <q-select
                class="q-mb-md"
                :options="levelTypesOpt"
                @input="val => { getCriterias() }"
                v-model="form.levelTypeId"
                emit-value
                map-options
                option-label="label"
                placeholder=""
                :rules="[val => val !=='nw' || $tr('ui.message.fieldRequired')]"
                />

              </q-card-section>
            </q-card>


            <q-card class="rounded-md bg-white q-mb-xl" v-if="benefits.length>0 && form.levelTypeId">

              <q-card-section class="q-pa-lg">
                <p class="caption q-mb-md">Beneficios
                  <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                    <q-tooltip>
                      Beneficios que puede tener al estar en este nivel
                    </q-tooltip>
                  </q-btn>
                </p>

                <q-select
                filled
                v-model="form.benefits"
                multiple
                option-value="id"
                option-label="name"
                emit-value
                map-options
                :options="benefits"
                />

              </q-card-section>
            </q-card>

            <q-card class="rounded-md bg-white q-mb-xl" v-if="criterias.length>0 && form.levelTypeId">

              <q-card-section class="q-pa-lg">
                <p class="caption q-mb-md">Criterios
                  <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                    <q-tooltip>
                      Criterios para cumplir con el nivel
                    </q-tooltip>
                  </q-btn>
                </p>

                <q-select
                :options="criterias"
                v-model="criteriaId"
                option-value="id"
                option-label="name"
                emit-value
                map-options
                placeholder="Selecciona un criterio"

                />

              </q-card-section>
            </q-card>

            <q-card class="rounded-md bg-white q-mb-xl" v-if="form.options.criterias.length>0">

              <q-card-section class="q-pa-lg">
                <div class="q-mt-sm q-mb-sm" v-for="(criteriaOpt,indexCritOpt) in form.options.criterias">
                  <p class="caption q-mb-md">{{criteriaOpt.name}}
                  </p>
                  <q-input v-if="criteriaOpt.type=='0'" v-model="criteriaOpt.value" color="primary"
                  class="codigo" outlined placeholder="">
                  <template v-slot:append>
                    <q-icon name="close" @click="form.options.criterias.splice(indexCritOpt)"
                    class="cursor-pointer"/>
                  </template>
                </q-input>
              </div>

            </q-card-section>
          </q-card>


          <div class="text-right">
            <q-btn :loading="loading" v-if="$route.params.id"
            class="bg-primary text-white btn-arrow-send-pink"
            color="primary" label="Actualizar" type="submit"
            />
            <q-btn :loading="loading" v-else class="bg-primary text-white btn-arrow-send-pink"
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
  data() {
    return {
      loading: false,
      benefits: [],
      criterias: [],
      criteriaId: null,
      levelTypesOpt: [],
      form: {
        id: '',
        name: '',
        description: '',
        order: 0,
        benefitsQuantity: 1,
        levelTypeId: null,
        options: {
          criterias: []
        },
        benefits: []
      },
      editorText: {
        toolbar: [
          ['bold', 'italic', 'strike', 'underline', 'removeFormat'],
          ['link'],
          [
            {
              label: 'Font Size',
              icon: 'format_size',
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
            }
          ],
          ['quote', 'unordered', 'ordered'],
          ['fullscreen']
        ]
      }

    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initForm();
    })
  },
  watch: {
    'form.levelTypeId': {
      handler: function (levelTypeId) {
        this.getCriterias()
        this.getBenefits()
      },
      deep: true,
      immediate: true
    },
    'criteriaId': {
      handler: function (criteriaId) {
        this.setCriteria()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    initForm() {
      this.getLevelTypes();
      if (this.$route.params.id) this.getData();
    },
    getLevelTypes() {
      let params = {
        params: {
          include: '',
          filter: {
            allTranslations: true,
          }
        }
      };//params
      this.$crud.index("apiRoutes.qmarketplace.levelType", params).then(response => {
        this.levelTypesOpt = this.$array.select(response.data, {label: 'name', id: 'id'});
        this.levelTypesOpt.push({label: "Selecciona un tipo de nivel ", id: null, value:null});
      });
    },
    getCriterias() {
      return new Promise((resolve, reject) => {
        let params = {
          remember: false,
          params: {
            include: 'levelType',
            filter: {
              levelType: this.form.levelTypeId,
              allTranslations: true,
            }
          }
        };//params
        this.$crud.index("apiRoutes.qmarketplace.levelCriteria", params).then(response => {
          this.criterias = [];
          this.criterias = response.data;
          this.criterias.push({name: "Selecciona un criterio ", id: 0, value:0});
          this.criteriaId=0;
          // this.criterias = this.$array.select(response.data, {label: 'name', id: 'id'})

          resolve(true)
        }).catch(error => {
          reject(error)
        });
      })
    },
    getBenefits() {
      return new Promise((resolve, reject) => {
        let params = {
          remember: false,
          params: {
            include: '',
            filter: {
              allTranslations: true,
            }
          }
        };//params
        this.$crud.index("apiRoutes.qmarketplace.benefit", params).then(response => {
          this.benefits = response.data;
          resolve(true)
        }).catch(error => {
          reject(error)
        });
      })
    },
    setCriteria() {
      if (this.criteriaId > 0 && this.criteriaId!=null ) {
        var b = 0;
        for (var i = 0; i < this.form.options.criterias.length; i++) {
          if (this.form.options.criterias[i].id == this.criteriaId) {
            b = 1;
            break;
          }
        }//for
        if (b == 1) {
          this.$alert.error({message: "Ya has seleccionado este criterio", pos: 'bottom'});
          this.criteriaId = 0;
        } else {
          for (var i = 0; i < this.criterias.length; i++) {
            if (this.criterias[i].id == this.criteriaId) {
              this.form.options.criterias.push(this.criterias[i]);
              break;
            }
          }//for
        }
      }
    },
    getData() {
      this.loading = true
      let params = {
        refresh: true,
        params: {
          include:'benefits'
        },
      }
      this.$crud.show('apiRoutes.qmarketplace.level', this.$route.params.id, params)
      .then(response => {
        Object.assign(this.form, {...response.data})
        let bene=[];
        for(let i=0;i<response.data.benefits.length;i++){
          bene.push(response.data.benefits[i].id);
        }
        this.form.benefits=bene;

        setTimeout(() => {
          this.loading = false
        }, 1000);

      }).catch(error => {
        this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
        this.loading = false
      })
    },
    createItem() {
      this.loading = true;
      this.$crud.create('apiRoutes.qmarketplace.level', this.form)
      .then(response => {
        this.loading = false
        this.$router.push({name: 'qmarketplace.admin.levels.index'})
        this.$alert.success({message: `${this.$tr('ui.message.recordCreated')} ID: ${response.data.id}`})
      }).catch(error => {
        this.loading = false
        this.$alert.error({message: this.$tr('ui.message.recordNoCreatde'), pos: 'bottom'})
      });
    },
    updateItem() {
      this.loading = true
      this.$crud.update('apiRoutes.qmarketplace.level', this.form.id, this.form)
      .then(response => {
        this.loading = false
        this.$alert.success({message: `${this.$tr('ui.message.recordUpdated')}`})
        this.initForm()
      }).catch(error => {
        this.loading = false
        this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
      });
    },

  }
}
</script>
<style lang="stylus">

</style>
