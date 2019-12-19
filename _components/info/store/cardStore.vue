<template>
   <div>
      <q-card class="card-user">
         <q-img :src="card.info.mainImage.path"/>
         <q-card-section class="text-center">
            <q-avatar size="100px">
               <img :src="card.info.logo.path">
            </q-avatar>
            <div class="text-h6 ellipsis">{{card.info.name}}</div>
            <div class="text-subtitle2 text-grey ellipsis">
               <q-icon name="place" color="primary"/>
               {{card.info.address}}
            </div>
            <q-rating v-model="card.info.averageRating" :max="5" size="20px"/>
            <div class="q-mt-md">
               <q-chip color="tertiary" text-color="white">Bookmark</q-chip>
               <q-chip color="tertiary" text-color="white">Bookmark</q-chip>
            </div>
            <div class="q-my-md">
               <router-link :to="{name: 'stores.show',params: {slug: card.info.slug}}" color="primary"
                      class="q-mx-sm q-btn q-btn-item non-selectable no-outline q-mx-sm q-btn--standard q-btn--rectangle bg-primary text-white q-btn--actionable q-focusable q-hoverable">
                  <div class="q-btn__wrapper col row no-wrap q-anchor--skip"><div class="q-btn__content text-center col items-center q-anchor--skip justify-center row">Ver Tienda
                  </div></div>

               </router-link>
            </div>
            <div class="text-subtitle2 text-grey">{{card.info.slogan}}</div>

         </q-card-section>
         <q-separator/>

             <q-card-actions align="around">
                  <q-btn icon="phone" label="Seguidores" stack flat />
                  <q-btn icon="phone" label="segir tienda" stack flat />
                  <q-btn icon="phone" label="puntos" stack flat />
                </q-card-actions>
      </q-card>


   </div>
</template>
<script>
   import chat from '@imagina/qmarketplace/_components/info/chat'
   import notification from '@imagina/qmarketplace/_components/info/notification'

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
