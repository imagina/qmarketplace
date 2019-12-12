<template>
   <q-card class="card-quiz-1 rounded-sm full-width q-mb-xl">

      <div class="q-card-title bg-store-primary rounded-sm text-center text-white q-py-sm">
         ENCUESTA
      </div>

      <q-stepper ref="stepper"
                 v-model="currentStep" class="no-shadow">
         <q-step :name="question.id" :order="index" :title="question.title" v-for="(question, index) in poll.questions"
                 :key="index">
            <q-card-section>

               <div class="text-subtitle1 text-bold text-center q-mb-sm">{{question.title}}</div>
               <div v-if="!question.users.find(function(element) {return element = userId;})">
                  <q-option-group keep-color
                                  v-model="selectedOption"
                                  :options="getAnswers(question.answers)"
                                  color="store-primary"

                  />
                  <q-stepper-navigation align="center" class="q-pa-md">
                     <q-btn class="bg-store-primary text-light font-family-secondary" @click="saveData(question)">Enviar
                     </q-btn>
                  </q-stepper-navigation>

               </div>
               <div v-else>
                     <div class="question q-mb-md">
                        <table class="q-mx-auto">
                           <thead>
                           <tr>
                              <th style="width:50%;"></th>
                              <th class="text-center" style="width:20%;">Votos</th>
                           </tr>
                           </thead>
                           <tbody>
                           <tr class="answers" v-for="(answer) in question.answers" :key="answer.id">
                              <td>{{answer.title}}</td>
                              <td class="text-center"> {{answer.votes}}</td>
                           </tr>
                           <tr>
                              <td>
                                 TOTAL
                              </td>
                              <td class="text-center">
                                 {{question.totalVotes}}
                              </td>
                           </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>

            </q-card-section>

            <q-stepper-navigation align="center" class="q-pa-md" v-if="index < poll.questions.length - 1">
               <div class="text-store-primary text-center cursor-pointer" @click="next()">
                  <div class="font-family-secondary">Siguiente</div>
               </div>
            </q-stepper-navigation>


         </q-step>

         <q-inner-loading :visible="loading"/>
      </q-stepper>


      <!-- msj final -->
      <q-card-section v-if="alertContent.active && !showVotes" class="q-py-xl">
         <div class="font-family-secondary text-center">
            {{alertContent.msj}}
         </div>
      </q-card-section>

   </q-card>


</template>
<script>
   //Plugins
   import {required} from 'vuelidate/lib/validators'

   export default {
      props: ['systemName'],
      validations() {
         return {
            selectedOption: {required}
         }
      },
      beforeMount() {
         this.$nextTick(function () {
            this.init()
         })
      },
      data() {
         return {
            loading: false,
            success: false,
            pollUserIds: [],
            polls: [],
            poll: null,
            selectedOption: null,
            finalDataSave: [],
            userId: this.$store.state.quserAuth.userId ? this.$store.state.quserAuth.userId : null,
            alertContent: {
               active: false,
               color: 'bg-secondary',
               icon: 'check',
               msj: 'Gracias por participar!!'
            },
            currentStep: 1,
            votesPoll: null,
            showVotes: false
         }
      },
      computed: {
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         },
      },
      methods: {
         // Init Method
         async init() {
            this.loading = true
            this.success = true
            this.loading = false
            this.getPoll()
         },
         getPoll() {
            return new Promise((resolve, reject) => {
               //Params
               let params = {
                  params: {
                     include: 'questions',
                     filter: {
                        storeId: this.storeData.id,
                        status: 1,
                        field: 'system_name'
                     },
                  }
               }
               this.$crud.show("apiRoutes.qquiz.polls", this.systemName, params)
                   .then(response => {
                      this.poll = response.data
                      resolve(true)//Resolve
                   }).catch(error => {
                  this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})

                  reject(false)//Resolve
               })

            })
         },
         saveData(question) {
            this.$v.$touch()
            if (!this.$v.$error) {

               this.loading = true;
               let data={
                  'user_id':this.userId,
                  'question_id':question.id,
                  'answer_id':this.selectedOption
               }

               this.$crud.create('apiRoutes.qquiz.userQuestionAnswers', data).then(response => {
                  this.$alert.info({message: 'Encuesta enviada'})
                  this.getPoll()
                  this.$v.$reset()
                  this.showVotes = true
                  this.loading = false;

               }).catch(error => {
                  console.error('[CREATE USER QUESTION ANSWERS] ', error)
                  this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
                  this.loading = false
               })

            } else {
               this.$alert.error({message: 'Encuesta: Debe seleccionar una respuesta', pos: 'bottom'})
            }

         },
         getAnswers(arrary) {
            let options = [];
            arrary.forEach((answer, index) => {
               options.push({
                  label: answer.title,
                  value: answer.id
               })
            });
            return options;

         },


      }

   }
</script>
<style lang="stylus">
   .card-quiz-1
      & .q-card-title
         position relative
         font-weight bold

         &:before
            content ''
            background-image url('/statics/img/icon-quiz.png')
            position absolute
            bottom 0
            left 5px
            height 60px
            width 60px
            background-size contain
            background-repeat no-repeat
            background-position bottom

      & .q-option-group
         font-size 17px


      .q-stepper
         .q-stepper__header
            display none

         .q-stepper__step-inner
            padding 15px
</style>
