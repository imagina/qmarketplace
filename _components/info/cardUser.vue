<template>
   <div>
      <q-card class="card-user">
         <q-img src="statics/img/fondo.jpg"/>
         <q-card-section class="text-center">
            <q-avatar size="100px">
               <img :src="card.info.mediumImage">
            </q-avatar>
            <div class="text-h6 ellipsis">{{card.info.fullName}}</div>
            <div class="text-subtitle2 text-grey ellipsis">
               <q-icon name="place" color="primary"/>
               Lugar
            </div>
            <!--<q-rating v-model="card.stars" :max="5" size="20px" />-->
            <div class="q-mt-md">
               <q-chip color="tertiary" text-color="white">puntos: {{pointsAvailables}}</q-chip>
               <!-- <q-chip color="tertiary" text-color="white">Bookmark</q-chip>
                <q-chip color="tertiary" text-color="white">Bookmark</q-chip>-->
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
   import notification from '@imagina/qmarketplace/_components/info/chat'
   export default {
      name: 'CardUserComponent',
      props: ['card'],

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
