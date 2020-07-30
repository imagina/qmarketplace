<template>
   <div>
      <q-card class="card-user" style="min-width: 350px" v-if="success">
         <q-img src="statics/img/fondo.jpg"/>
         <q-card-section class="text-center">
            <q-avatar size="100px">
               <img :src="user.mediumImage">
            </q-avatar>
            <div class="text-h6 ellipsis">{{user.fullName}}</div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="user.fields.sex">
               <q-icon name="fas fa-male" color="blue" size="30px" v-if="user.fields.sex.value==='hombre'"/>
               <q-icon name="fas fa-female" color="primary" size="30px" v-else/>
            </div>
            <div class="q-mt-md">
               <q-chip color="tertiary" text-color="white">puntos: {{pointsAvailables}}</q-chip>
            </div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="user.fields.neighborhood">
               <q-icon name="place" color="primary"/>
               {{user.fields.address.value}} - {{user.fields.neighborhood.value}}
            </div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="user.fields.birthday">
               <q-icon name="fas fa-calendar-alt" color="primary"/>
               {{$trd(user.fields.birthday.value)}}
            </div>

            <div class="text-subtitle2 text-grey ellipsis" v-if="user.fields.academicLevel">
               <q-icon name="fas fa-user-graduate" color="primary"/>
               {{user.fields.academicLevel.value}}
            </div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="user.fields.phone">
               <q-icon name="fas fa-phone" color="primary"/>
               {{user.fields.phone.value}}
            </div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="user.fields.civilState">
               <span class="text-primary text-weight-bold q-px-xs">Estado Civil:</span>
               {{user.fields.civilState.value}}
            </div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="user.fields.sons">
               <span class="text-primary text-weight-bold q-px-xs">Hijos:</span> {{user.fields.sons.value}}
            </div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="user.fields.favoriteMovie">
               <span class="text-primary text-weight-bold q-px-xs">Pelicula favorita:</span>
               {{user.fields.favoriteMovie.value}}
            </div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="user.fields.favoriteSerie">
               <span class="text-primary text-weight-bold q-px-xs">Serie favorita:</span>
               {{user.fields.favoriteSerie.value}}
            </div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="user.fields.favoriteTeam">
               <span class="text-primary text-weight-bold q-px-xs">Equipo favorito:</span>
               {{user.fields.favoriteTeam.value}}
            </div>
            <div class="q-mt-md" v-if="user.fields.leisures">
               <div class="text-subtitle2 text-grey ellipsis">
                  <span class="text-primary text-weight-bold q-px-xs">Pasatiempos</span>
               </div>
               <q-chip color="tertiary" text-color="white" v-for="(item, i) in user.fields.leisures.value"
                       :key="i">{{item}}
               </q-chip>

            </div>
            <div class="q-mt-md" v-if="user.fields.promotions">
               <div class="text-subtitle2 text-grey ellipsis">
                  <span class="text-primary text-weight-bold q-px-xs">De qué te gustaría recibir promoción</span>
               </div>
               <q-chip color="tertiary" text-color="white" v-for="item in user.fields.promotions.value"
                       :key="item.id">{{item.label}}
               </q-chip>

            </div>
            <div class="q-mt-md"
                 v-if="(user.fields.importantDate1 && user.fields.importantDate1Why) || (user.fields.importantDate2 && user.fields.importantDate2Why)">
               <div class="text-subtitle2 text-grey ellipsis">
                  <span class="text-primary text-weight-bold q-px-xs">Fechas Importantes </span>
               </div>
               <div class="text-subtitle2 text-grey ellipsis"
                    v-if="user.fields.importantDate1 && user.fields.importantDate1Why">
                  <q-icon name="fas fa-calendar-alt" color="primary"/>
                  {{$trd(user.fields.importantDate1.value)}} - {{user.fields.importantDate1Why.value}}
               </div>
               <div class="text-subtitle2 text-grey ellipsis"
                    v-if="user.fields.importantDate2 && user.fields.importantDate2Why">
                  <q-icon name="fas fa-calendar-alt" color="primary"/>
                  {{$trd(user.fields.importantDate2.value)}} - {{user.fields.importantDate2Why.value}}
               </div>
            </div>

            <div class="q-mt-md" v-if="user.fields.facebook">
               <div class="text-subtitle2 text-grey ellipsis">
                  <span class="text-primary text-weight-bold q-px-xs">Redes Sociales</span>
               </div>
               <div class="q-pa-md q-gutter-sm">
                  <q-btn round color="blue-10" text-color="white" icon="fab fa-facebook-f"
                         @click="openUrl(user.fields.facebook.value, '_blank')"
                         v-if="user.fields.facebook"/>

                  <q-btn round color="light-blue-6" text-color="white" icon="fab fa-twitter"
                         @click="openUrl(user.fields.twiter.value, '_blank')"
                         v-if="user.fields.twiter"/>

                  <q-btn round color="blue-grey-6" text-color="white" icon="fab fa-instagram"
                         @click="openUrl(user.fields.instagram.value, '_blank')"
                         v-if="user.fields.instagram"/>
               </div>


               <q-item clickable @click.native="openUrl(user.fields.instagram.value, '_blank')" v-if="user.fields.instagram">
                  <q-item-section avatar>
                     <q-icon color="primary" name="fab fa-instagram-square"/>
                  </q-item-section>
               </q-item>
               <q-separator class="bg-white"/>

            </div>


            <div class="q-my-md">
               <notification :userSelect="user.id"/>
               <chat :userSelect="card.info"/>
            </div>
            <!--
                     <div class="text-subtitle2 text-grey">Small plates, salads & sandwiches in an intimate setting.</div>
            -->
         </q-card-section>
         <q-separator/>

         <!--	    <q-card-actions align="around">
                  <q-btn icon="phone" label="Puntos" stack flat />
                  <q-btn icon="phone" label="Stacked" stack flat />
                  <q-btn icon="phone" label="Stacked" stack flat />
                </q-card-actions-->
          <!--Inner loading-->

      </q-card>
      <inner-loading :visible="loading"/>
   </div>
</template>
<script>
   import chat from '@imagina/qmarketplace/_components/info/chat'
   import notification from '@imagina/qmarketplace/_components/info/notification'
   import http from "axios"
   import cardUser from "../../../../../src/components/quser/cardUser";

   export default {
      name: 'CardUserComponent',
      props: {card: {default: 0}},
      watch: {
         card: async function (n) {
            await this.init()

         }
      },
      components: {
         chat,
         notification
      },
      mounted() {
        this.$nextTick(function () {
            this.init()
        })
      },
      data() {
         return {
            pointsAvailables: 0,
            user: [],
            openModalChat: false,
            openModalNotific: false,
            loading: false,
            success:false,
         }
      },
      methods: {
        async init() {
          await this.getUser()
          await this.getPointsUser()

        },
         getPointsUser() {
            return new Promise((resolve, reject) => {

               this.pointsAvailables = 0
               this.loading = true

               //Params
               let params = {
                  params: {
                     filter: {
                        userId: this.card.userId,
                        type: 'availablePointsUser'
                     }
                  }
               }

               http.get(config('apiRoutes.qredeems.calculates'), params)
                   .then(response => {

                      if (response.data.data.points > 0)
                         this.pointsAvailables = response.data.data.points

                      this.loading = false
                      resolve(true);

                   })
                   .catch(error => {

                      this.loading = false
                      reject(error);
                   });
            })
         },
         getUser(){
            return new Promise((resolve, reject) => {
               this.pointsAvailables = 0
               this.loading = true
               let criteria=this.card.userId
               //Params
               let params = {
                  params: {
                     filter: {
                     },
                     include:'fields'
                  }
               }
               this.$crud.show('apiRoutes.quser.users',criteria, params).then(response => {
                  this.user = response.data
                  if(this.user.fields.length)
                  this.user.fields= this.$helper.convertToFrontField(this.user.fields);
                  this.success=true
                  resolve(true)
               }).catch(error => {
                  console.error("ERROR - GET USERS FROM FAVORITE STORES" + error)
                  reject(error)

               });
            })
         },
         openUrl(url, target) {
            return window.open(url, target)
         }
      }
   }
</script>

<style lang="stylus">
   .card-user
      .q-img
         height 150px

      .q-card__section
         margin-top -50px
</style>
