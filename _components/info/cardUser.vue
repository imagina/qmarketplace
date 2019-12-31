<template>
   <div>
      <q-card class="card-user">
         <q-img src="statics/img/fondo.jpg"/>
         <q-card-section class="text-center">
            <q-avatar size="100px">
               <img :src="card.info.mediumImage">
            </q-avatar>
            <div class="text-h6 ellipsis">{{card.info.fullName}}</div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="card.info.fields.sex">
               <q-icon name="fas fa-male" color="blue" size="30px" v-if="card.info.fields.sex.value==='hombre'"/>
               <q-icon name="fas fa-female" color="primary" size="30px" v-else/>
            </div>
            <div class="q-mt-md">
               <q-chip color="tertiary" text-color="white">puntos: {{pointsAvailables}}</q-chip>
            </div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="card.info.fields.neighborhood">
               <q-icon name="place" color="primary"/>
               {{card.info.fields.address.value}} - {{card.info.fields.neighborhood.value}}
            </div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="card.info.fields.birthday">
               <q-icon name="fas fa-calendar-alt" color="primary"/>
               {{$trd(card.info.fields.birthday.value)}}
            </div>

            <div class="text-subtitle2 text-grey ellipsis" v-if="card.info.fields.academicLevel">
               <q-icon name="fas fa-user-graduate" color="primary"/>
               {{card.info.fields.academicLevel.value}}
            </div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="card.info.fields.phone">
               <q-icon name="fas fa-phone" color="primary"/>
               {{card.info.fields.phone.value}}
            </div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="card.info.fields.civilState">
               <span class="text-primary text-weight-bold q-px-xs">Estado Civil:</span>
               {{card.info.fields.civilState.value}}
            </div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="card.info.fields.sons">
               <span class="text-primary text-weight-bold q-px-xs">Hijos:</span> {{card.info.fields.sons.value}}
            </div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="card.info.fields.favoriteMovie">
               <span class="text-primary text-weight-bold q-px-xs">Pelicula favorita:</span>
               {{card.info.fields.favoriteMovie.value}}
            </div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="card.info.fields.favoriteSerie">
               <span class="text-primary text-weight-bold q-px-xs">Serie favorita:</span>
               {{card.info.fields.favoriteSerie.value}}
            </div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="card.info.fields.favoriteTeam">
               <span class="text-primary text-weight-bold q-px-xs">Equipo favorito:</span>
               {{card.info.fields.favoriteTeam.value}}
            </div>
            <div class="q-mt-md" v-if="card.info.fields.leisures.value.length">
               <div class="text-subtitle2 text-grey ellipsis">
                  <span class="text-primary text-weight-bold q-px-xs">Pasatiempos</span>
               </div>
               <q-chip color="tertiary" text-color="white" v-for="(item, i) in card.info.fields.leisures.value"
                       :key="i">{{item}}
               </q-chip>

            </div>
            <div class="q-mt-md" v-if="card.info.fields.promotions.length">
               <div class="text-subtitle2 text-grey ellipsis">
                  <span class="text-primary text-weight-bold q-px-xs">De qué te gustaría recibir promoción</span>
               </div>
               <q-chip color="tertiary" text-color="white" v-for="item in card.info.fields.promotions.value"
                       :key="item.id">{{item.label}}
               </q-chip>

            </div>
            <div class="q-mt-md"
                 v-if="(card.info.fields.importantDate1 && card.info.fields.importantDate1Why) || (card.info.fields.importantDate2 && card.info.fields.importantDate2Why)">
               <div class="text-subtitle2 text-grey ellipsis">
                  <span class="text-primary text-weight-bold q-px-xs">Fechas Importantes </span>
               </div>
               <div class="text-subtitle2 text-grey ellipsis"
                    v-if="card.info.fields.importantDate1 && card.info.fields.importantDate1Why">
                  <q-icon name="fas fa-calendar-alt" color="primary"/>
                  {{$trd(card.info.fields.importantDate1.value)}} - {{card.info.fields.importantDate1Why.value}}
               </div>
               <div class="text-subtitle2 text-grey ellipsis"
                    v-if="card.info.fields.importantDate2 && card.info.fields.importantDate2Why">
                  <q-icon name="fas fa-calendar-alt" color="primary"/>
                  {{$trd(card.info.fields.importantDate2.value)}} - {{card.info.fields.importantDate2Why.value}}
               </div>
            </div>

            <div class="q-mt-md" v-if="card.info.fields.facebook">
               <div class="text-subtitle2 text-grey ellipsis">
                  <span class="text-primary text-weight-bold q-px-xs">Redes Sociales</span>
               </div>
               <q-item clickable @click.native="openUrl(card.info.fields.facebook.value, '_blank')"
                       v-if="card.info.fields.facebook">
                  <q-item-section avatar>
                     <q-icon color="blue" name="fab fa-facebook"/>
                  </q-item-section>
               </q-item>
               <q-item clickable @click.native="openUrl(card.info.fields.twiter.value, '_blank')" v-if="card.info.fields.twiter">
                  <q-item-section avatar>
                     <q-icon color="cian" name="fab fa-twitter-square"/>
                  </q-item-section>
               </q-item>
               <q-item clickable @click.native="openUrl(card.info.fields.instagram.value, '_blank')" v-if="card.info.fields.instagram">
                  <q-item-section avatar>
                     <q-icon color="primary" name="fab fa-instagram-square"/>
                  </q-item-section>
               </q-item>
               <q-separator class="bg-white"/>

            </div>


            <div class="q-my-md">
               <notification :userSelect="card.info"/>
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
      </q-card>


   </div>
</template>
<script>
   import chat from '@imagina/qmarketplace/_components/info/chat'
   import notification from '@imagina/qmarketplace/_components/info/notification'

   export default {
      name: 'CardUserComponent',
      props: {card: {default: 0}},
      watch: {
         card: async function (n) {
            await this.getPointsUser()
         }
      },
      components: {
         chat,
         notification
      },
      data() {
         return {
            pointsAvailables: 0,
            userSelect: [],
            openModalChat: false,
            openModalNotific: false,
         }
      },
      methods: {
         getPointsUser() {
            return new Promise((resolve, reject) => {

               this.pointsAvailables = 0

               //Params
               let params = {
                  params: {
                     filter: {
                        userId: this.card.info.id,
                        type: 'availablePointsUser'
                     }
                  }
               }

               http.get(config('apiRoutes.qredeems.calculates'), params)
                   .then(response => {

                      if (response.data.data.points > 0)
                         this.pointsAvailables = response.data.data.points

                      resolve(true);

                   })
                   .catch(error => {
                      reject(error);
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
