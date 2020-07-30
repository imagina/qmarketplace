<template>
  <div id="adminQuestionsFrom">
   <!--Content-->
    <div class="relative-position q-mb-lg backend-page question-content">

      <!--Form-->
      <div class="box" v-if="success">
        <q-form autocorrect="off" autocomplete="off" ref="formContent" class="q-pa-lg"
                @submit="(!itemId) ? createItem() : updateItem()"
                @validation-error="$alert.error($tr('ui.message.formInvalid'))">
          <div class="row shadow-1 rounded">
            <div class="col-12 q-pb-sm">
              <q-bar class="bg-primary text-white rounded">
                <div class="full-width">
                  <q-icon :name="$route.meta.icon" /> {{ $tr($route.meta.title) }}
                  <q-btn size="11px" flat dense icon="arrow_back" class="float-right" @click="$router.push({name: 'qmarketplace.admin.questions.index', params: { id:  $route.params.pollId || locale.form.poll_id }})" />
                </div>
              </q-bar>
            </div>
            <div class="col-12">
              <div class="row q-pa-md-xl q-pa-xs-sm q-pa-none">
                <!--Languages-->
                <div class="col-12">
                  <locales v-model="locale" ref="localeComponent" :form="$refs.formContent" />
                </div>

                <!---Form Left-->
                <div class="col-12" v-if="locale.success">

                  <div class="text-bold q-mb-sm">Pregunta</div>
                  <!--Title-->
                  <div class="row q-col-gutter-sm">
                    <div class="col-12 col-md-8">
                      <q-input v-model="locale.formTemplate.title" dense
                               :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                               :label="`${$tr('ui.form.title')} (${locale.language})*`"/>
                    </div>
                    <div class="col-12 col-md-4">
                      <q-checkbox v-model="locale.formTemplate.status" :true-value="1" :false-value="0" :label="$tr('ui.label.enabled')" />
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-12 col-md-4">
                      <q-input
                              v-model="locale.formTemplate.startDate" :label="$tr('qquiz.layout.form.startDate')" v-bind="{
                          bgColor:'white', color:'primary', dense : true,
                          placeholder:'YYYY/MM/DD', mask:'date'}"
                      >
                        <template v-slot:append>
                          <q-icon name="fas fa-calendar-day"/>
                          <q-popup-proxy ref="qDateStartProxy" transition-show="scale" transition-hide="scale">
                            <q-date v-model="locale.formTemplate.startDate" @input="() => $refs.qDateStartProxy.hide()" />
                          </q-popup-proxy>
                        </template>
                      </q-input>
                    </div>
                    <div class="col-12 col-md-4">
                      <q-input
                              v-model="locale.formTemplate.endDate" :label="$tr('qquiz.layout.form.endDate')" v-bind="{
                          bgColor:'white', color:'primary', dense : true,
                          placeholder:'YYYY/MM/DD', mask:'date'}"
                      >
                        <template v-slot:append>
                          <q-icon name="fas fa-calendar-day"/>
                          <q-popup-proxy ref="qDateEndProxy" transition-show="scale" transition-hide="scale">
                            <q-date v-model="locale.formTemplate.endDate" @input="() => $refs.qDateEndProxy.hide()" />
                          </q-popup-proxy>
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <div class="text-bold q-mb-sm">Respuestas</div>
                  <div class="row q-col-gutter-sm" v-if="itemId">
                    <div class="col-12 col-md-8">
                      <div class="row" v-for="(answer,index) in locale.formTemplate.answers">
                        <div class="col-3 col-md-1">
                          <q-checkbox size="xs" v-model="answer.status" :true-value="1" :false-value="0" @change="updateAnswer(index)" :indeterminate-value="0" />
                        </div>
                        <div class="col-6 col-md-10">
                          <q-input v-model="answer[locale.language].title" dense
                                   :rules="[val => !!val || $tr('ui.message.fieldRequired')]" @blur="updateAnswer(index)" />
                        </div>
                        <div class="col-3 col-md-1 text-right">
                          <q-btn size="xs" icon="fas fa-trash" @click="deleteAnswer(index)" color="primary">
                            <q-tooltip>
                              Eliminar Respuesta
                            </q-tooltip>
                          </q-btn>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-8 text-right">
                      <q-btn icon="fas fa-plus" size="xs" @click="addNewAnswer" color="primary">
                        <q-tooltip>
                          Agregar Respuesta
                        </q-tooltip>
                      </q-btn>
                    </div>
                    <div class="col-12">
                      <q-expansion-item
                              icon="play_arrow"
                              label="Ver Resultados"
                      >
                        <q-card>
                          <q-card-section>
                            <div class="row">
                              <div class="col-12">
                                <div class="text-bold q-mb-md">Resultados de la Encuesta: {{ locale.formTemplate.title }}</div>
                                <chart :options="chartOptions"/>
                              </div>
                              <div class="col-12">
                                <div class="text-bold q-mb-md">Usuarios que han marcado las respuestas:</div>
                              </div>
                              <div class="col-12">
                                <q-tabs
                                    v-model="tab"
                                    class="text-primary"
                                    active-color="primary"
                                    indicator-color="primary"
                                    align="justify"
                                    narrow-indicator
                                >
                                  <q-tab v-for="(answer,index) in locale.form.answers" :name="'tabResults'+answer.id" :key="index" :label="answer.title" v-if="answer.id" />
                                </q-tabs>
                                <q-separator />
                                <q-tab-panels v-model="tab" keep-alive animated swipeable>
                                  <q-tab-panel v-for="(answer,index) in locale.form.answers" :name="'tabResults'+answer.id" :key="index" v-if="answer.id">
                                    <div class="row q-col-gutter-md">
                                        <answerUsers :id="answer.id" v-if="answer.votes" />
                                        <div class="col-12" v-else>
                                          <div class="text-bold q-mb-md text-center">Ningún usuario ha votado por esta opción</div>
                                        </div>
                                    </div>
                                  </q-tab-panel>
                                </q-tab-panels>
                              </div>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                    </div>
                  </div>
                  <div class="row" v-else>
                    <div class="col-12 text-center">
                      <div class="q-my-md">
                        <q-icon name="fas fa-exclamation-triangle" color="warning"></q-icon>
                        {{`${$tr('qmarketplace.layout.messages.warnAddAnswers')}...`}}
                      </div>
                      <q-btn icon="fas fa-save" :label="optionsFields.btn.saveAndEdit"
                             @click="buttonActions.value = 2; createItem()" color="positive" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-form>
      </div>
      <!--Buttons Actions-->
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <!--Update button-->
        <q-btn
          v-if="itemId"
          color="positive" :loading="loading.page"
          icon="fas fa-edit" :label="$tr('ui.label.update')" @click="updateItem()"
        />
        <!--Save button-->
        <q-btn-dropdown :label="buttonActions.label" split v-else :loading="loading.app"
                        content-style="min-width: 250px !important"
                        color="positive" icon="fas fa-save" @click="createItem()" rounded align="right">
          <q-list>
            <q-item class="q-py-sm" clickable @click.native="buttonActions = {label : optionsFields.btn.saveAndReturn, value : 1}">
              {{optionsFields.btn.saveAndReturn}}
            </q-item>
            <q-item class="q-py-sm" clickable @click.native="buttonActions = {label : optionsFields.btn.saveAndEdit, value : 2}">
              {{optionsFields.btn.saveAndEdit}}
            </q-item>
            <q-item class="q-py-sm" clickable @click.native="buttonActions = {label : optionsFields.btn.saveAndCreate, value : 3}">
              {{optionsFields.btn.saveAndCreate}}
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-page-sticky>

      <!--Loading-->
      <inner-loading :visible="loading.page"/>
    </div>
  </div>
</template>
<script>
  import answerUsers from '@imagina/qmarketplace/_components/info/answerUsers'
  export default {
    props: [
      //'pollIDP'
    ],
    components: {
      answerUsers,
    },
    validations() {
      return this.getObjectValidation()
    },
    watch: {
      $route(to, from) {
        this.init()
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.init()
      })
    },
    data() {
       return {
        loading: {
          page: false
        },
        configName: 'apiRoutes.qquiz.questions',
        tab: '',
        itemId: false,
        locale: {},
        buttonActions: {},
        success: false,
         chartOptions: {
           chart: {
             type: 'column',
             backgroundColor: null,
             height: 9 / 16 * 100 + "%" // 16:9 ratio
           },
           title: {
             text: '',
           },
           xAxis: {
             categories: [], //Answers
             title: {
               text: null,
               style: {
                 color: '#f96353'
               }
             },
             labels: {
               style: {
                 fontSize: '12px',
                 color: '#333333',
               }
             },
             gridLineWidth: 0,
             crosshair: true
           },
           yAxis: {
             gridLineWidth: 1,
             min: 0,
             title: {
               text: ''
             },
             labels: {
               overflow: 'justify'
             }
           },
           credits: {
             enabled: false
           },
           colors: ['#f96353'],
           series: []

         },
      }
    },
    computed: {
      //Options translatables
      optionsFields() {
        return {
          btn: {
            saveAndReturn: this.$tr('ui.message.saveAndReturn'),
            saveAndCreate: this.$tr('ui.message.saveAndCreate'),
            saveAndEdit: this.$tr('ui.message.saveAndEdit'),
          }
        }
      },
      dataLocale(){
        return {
          fields: {
            poll_id: this.$route.params.pollId || '',
            status: 1,
            startDate: '',
            endDate: '',
            answers: [],
          },
          fieldsTranslatable: {
            title: ''
          },
        }
      },
    },
    methods: {
       //Init
      async init() {
        this.success = false
        //Search id in params URL
        if (this.$route.params.id) this.itemId = this.$route.params.id
        this.locale = this.$clone(this.dataLocale)//Add fields
        if (this.locale.success) this.$refs.localeComponent.vReset()//Reset locale
        if(this.itemId) await this.getData()//Get data if is edit
        //Set default button action
        this.buttonActions = {label: this.optionsFields.btn.saveAndReturn, value: 1}
        this.success = true
      },
      //Get data item
      getData() {
        return new Promise((resolve, reject) => {
          this.loading.page = true
          const itemId = this.$clone(this.itemId)
          if (itemId) {
            //Params
            let params = {
              refresh: true,
              params: {
                include: 'answers.userQuestionAnswers,userQuestionAnswers.user',
                filter: {allTranslations: true}
              }
            }
            //Request
            this.$crud.show(this.configName, itemId, params).then(response => {

              this.locale.form = this.$clone(response.data)
              let answers = this.$clone(this.locale.form.answers)
              if(answers.length){
                this.tab = 'tabResults'+answers[0].id
                let votes = {
                  name: 'Votos',
                  data: [],
                }
                let categories = []
                for(let x in answers){
                  votes.data.push(answers[x].votes)
                  categories.push(answers[x].title)
                }
                this.chartOptions.series.push(votes)
                this.chartOptions.xAxis.categories = categories
              }

              this.loading.page = false
              resolve(true)//Resolve
            }).catch(error => {
              this.loading.page = false
              reject(false)//Resolve
            })
          } else {
            this.loading.page = false
            resolve(true)//Resolve
          }

        })
      },
      //Return object to validations
      getObjectValidation() {
        let response = {}
        if (this.locale && this.locale.formValidations)
          response = {locale: this.locale.formValidations}
        return response
      },
      //Create Product
      async createItem() {
        if (await this.$refs.localeComponent.validateForm()) {
          this.loading.page = true
          this.$crud.create(this.configName, this.locale.form).then(response => {
            this.$alert.success({message: `${this.$tr('ui.message.recordCreated')}`})
            this.actionAfterCreated(response.data.id)
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
            this.loading.page = false
          })
        } else {
          this.$alert.error({message: this.$tr('ui.message.formInvalid'), pos: 'bottom'})
        }
      },
      //Action after created
      actionAfterCreated(id) {
        setTimeout(() => {
          let action = this.buttonActions.value
          switch (action) {
            case 1://redirect to index products
              this.$router.push({name: 'qmarketplace.admin.questions.index', params: { id: this.locale.form.poll_id || this.$route.params.pollId }})
              break;
            case 2://redirect to edit products
              this.$router.push({name: 'qmarketplace.admin.questions.edit', params:{ id: id}})
              break;
            case 3://Reset and init form
              this.$refs.localeComponent.vReset()
              this.loading.page = false
              break;
          }
        }, 500)
      },
      //Update Product
      async updateItem() {
        if (await this.$refs.localeComponent.validateForm()) {
          this.loading.page = true
          this.$crud.update(this.configName, this.itemId, this.locale.form).then(response => {
            this.$alert.success({message: `${this.$tr('ui.message.recordUpdated')}`})
            this.$router.push({name: 'qmarketplace.admin.questions.index', params: { id: this.locale.form.poll_id }})//Redirect to index
            this.loading.page = false
          }).catch(error => {
            this.loading.page = false
            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
          })
        } else {
          this.$alert.error({message: this.$tr('ui.message.formInvalid'), pos: 'bottom'})
        }
      },

      addNewAnswer(){
        let newAnswer = {
          status: 1,
          questionId: this.itemId
        }
        for(let x in this.locale.languages){
          newAnswer[this.locale.languages[x]] = {
            title: ''
          }
        }
        this.locale.form.answers.push(newAnswer)
      },
      deleteAnswer(index){
        this.$q.dialog({
          title: 'Eliminar respuesta',
          message: 'Está seguro de Eliminar esta respuesta? Recuerda que el proceso es irreversible',
          cancel: true,
          persistent: true
        }).onOk(() => {
          let answer = this.$clone(this.locale.form.answers[index])
          if(answer.id){
            this.$crud.delete('apiRoutes.qquiz.questions', answer.id).then(response => {
            }).catch(error => {
              this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
            })
          }
          this.locale.form.answers.splice(index,1)
        })
      },
      updateAnswer(index){
        let answer = this.$clone(this.locale.form.answers[index])
        if(answer.id){
          this.$crud.update('apiRoutes.qquiz.answers', answer.id,answer).then(response => {
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
          })
        }else{
          this.$crud.create('apiRoutes.qquiz.answers',answer).then(response => {
            this.locale.form.answers[index].id = response.data.id
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
          })
        }
      },
    },
  }
</script>
<style lang="stylus">
  //@import "~variables";
  .question-content
    .rounded
      border-top-left-radius: 8px
      border-top-right-radius 8px
</style>
