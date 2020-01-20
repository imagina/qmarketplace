<template>
   <div>
      <div class="row">
         <div class="col-12 relative-position">
            <full-width-gallery :storeName="storeData.name" :gallery="storeData.slider"
                                system-name="principal"/>

            <div class="q-container info-tienda">
               <div class="row q-col-gutter-md justify-between">
                  <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3 text-center ">
                     <div class="logo-tienda">
                        <router-link :to="{name: 'stores.show', params : {slug:storeData.slug}}">
                           <img :src="storeData.logo.path">
                        </router-link>
                     </div>
                     <div class="text-h5 bg-primary q-inline-block q-pa-md text-white q-mb-sm">
                        <!-- Juliana Vargas -->
                        {{storeData.name}}
                     </div>
                     <h5 class="text-subtitle1 text-secondary q-mt-none">
                        {{storeData.slogan}}
                        <!--
                        MAQUILLADORA PROFESIONAL
                        -->
                     </h5>

                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-mb-lg">

                     <q-card class="card-rounded  btn-top no-shadow q-mx-xl line-primary text-center q-mb-sm ">
                        <q-list bordered>
                           <q-item clickable>
                              <q-item-section avatar class="q-pl-md">
                                 <q-avatar color="primary" text-color="white" icon="far fa-thumbs-up"
                                           v-if="!followedStore" @click="followStore()"/>
                                 <q-avatar color="primary" text-color="white" icon="far fa-handshake" v-else
                                 />

                              </q-item-section>
                              <q-item-section class="q-py-md text-h5" v-if="!followedStore">Seguir</q-item-section>
                              <q-item-section class="q-py-md text-h5" v-else>Siguiendo</q-item-section>
                           </q-item>
                        </q-list>
                     </q-card>

                     <q-card class="card-rounded no-shadow text-center">
                        <q-card-section>
                           <span class="text-primary">{{storeData.usersFollowing}} usuarios</span>
                           <div class="text-secondary w-100">
                              Siguen esta página
                           </div>
                        </q-card-section>
                     </q-card>

                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>

   import fullWidthGallery from '@imagina/qmarketplace/_components/themes/qcarousel'
   export default {
      components: {
         fullWidthGallery
      },
      data() {
         return {
            logo: this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path,
            followedStore: false,
            loading: false,
            openChat: false,
         }
      },
      mounted() {
         this.getFollowedStore();
      },
      computed: {
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         }
      },
      methods: {
         getFollowedStore() {
            this.$crud.index("apiRoutes.qmarketplace.favoriteStore", {
               params: {
                  filter: {
                     userId: this.$store.state.quserAuth.userId,
                     storeId: this.storeData.id
                  }
               }
            }).then(response => {
               if (response.data.length > 0) {
                  this.followedStore = true;
               }
            }).catch(error => {
               this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
            });
         },
         followStore() {
            this.$crud.create("apiRoutes.qmarketplace.favoriteStore", {
               userId: this.$store.state.quserAuth.userId,
               storeId: this.storeData.id
            }).then(response => {
               this.followedStore = true;
               this.$alert.success({message: "Ahora sigues esta tienda", pos: 'bottom'})
            }).catch(error => {
               this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
            });
         },
      }

   }
</script>
<style lang="stylus">
   .theme-layout-03
      .logo-tienda
         margin-top -150px
         padding-bottom 5px !important

         img
            border 5px solid #E1E1E1 !important
            background-color #fff

      .btn-top
         margin-top -40px
         position relative
         z-index 9
</style>
