<template>
   <div class="q-pb-lg">
      <q-dialog v-model="infoStore" @hide="infoStore=false">
         <q-carousel
                 transition-prev="slide-right"
                 transition-next="slide-left"
                 swipeable
                 animated
                 v-model="slide"
                 control-color="primary"
                 navigation-icon="radio_button_unchecked"
                 navigation
                 padding
                 height="300px"
                 class="bg-white shadow-1 rounded-borders"
         >
            <q-carousel-slide :name="1" class="column no-wrap flex-center">
               <i style="font-size:56px;" class="fas fa-map-marked-alt text-primary"></i>
               <!-- <q-icon name="style" color="primary" size="56px" /> -->
               <div class="q-mt-md text-center" v-html="storeData.description">
               </div>
            </q-carousel-slide>

         </q-carousel>
      </q-dialog>
      <div class="row">
         <div class="col-12">
            <div class="" style="margin: 0 5%;">
               <div class="q-mb-md border-slider">
                  <full-width-gallery :storeName="storeData.name" :gallery="storeData.gallery"
                                      system-name="principal"></full-width-gallery>
                  <div class="absolute-bottom-left text-center q-ma-sm">
                     <q-avatar id="store-logo" round class="bg-white">
                        <img :src="storeData.logo.path">
                     </q-avatar>
                     <h1 class="store-title">{{storeData.name}}</h1>
                  </div>
                  <div class="q-container info-tienda" v-if="$q.platform.is.desktop">
                     <div class="row q-col-gutter-md justify-end q-mx-sm">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-3 q-mb-lg text-center">
                           <div class="row q-col-gutter-xs items-center justify-end">
                              <div class="col-xs-auto col-sm-auto col-md-auto col-lg-12">
                                 <q-card @click="ratingStore=true" class="card-circle text-center q-mb-sm">
                                    <q-card-section class="q-pa-sm">
                                       <div class="text-h6">
                                          <q-icon color="white" size="30px" round name="grade"/>
                                       </div>
                                       <div class="text-body2">{{storeData.averageRating}} de {{storeData.countRatings}}
                                          usuarios
                                       </div>
                                    </q-card-section>
                                 </q-card>
                              </div>
                              <div class="col-xs-auto col-sm-auto col-md-auto col-lg-12">
                                 <q-card class="card-circle text-center q-mb-sm">
                                    <q-card-section class="q-pa-sm ">
                                       <div class="text-h5">
                                          <q-icon v-if="!followedStore" @click="followStore()" color="white" size="30px"
                                                  round name="far fa-thumbs-up"/>
                                          <q-icon v-else color="white" size="30px" round name="far fa-handshake"/>
                                       </div>
                                       <div v-if="!followedStore" class="text-body2"> Seguir Tienda</div>
                                       <div v-else class="text-body2"> Ya sigues esta tienda</div>
                                    </q-card-section>
                                 </q-card>
                              </div>
                              <div class="col-xs-auto col-sm-auto col-md-auto col-lg-12">
                                 <q-card class="card-rounded text-center">
                                    <q-card-section class="q-pa-sm">
                                       <div class="text-h5">{{storeData.usersFollowing}}</div>
                                       <div class="text-body2">Seguidores</div>
                                    </q-card-section>
                                 </q-card>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div v-else>
                     <div class="row bg-store-secondary full-height">
                        <div class="col border-movil">
                           <q-card @click="ratingStore=true"
                                   class="cursor-pointer full-height text-center bg-store-secondary no-shadow no-border-radius ">
                              <q-card-section class="q-pa-sm text-white">
                                 <div class="text-h6">
                                    <q-icon color="white" size="30px" round name="grade"/>
                                 </div>
                                 <div class="text-body2">{{storeData.countRatings}} han calificado</div>
                              </q-card-section>
                           </q-card>
                        </div>
                        <div class="col border-movil">
                           <q-card class="text-center bg-store-secondary no-shadow no-border-radius">
                              <q-card-section class="q-pa-sm text-white">
                                 <div class="text-h5">
                                    <q-icon v-if="!followedStore" @click="followStore()" color="white" size="30px" round
                                            name="far fa-thumbs-up"/>
                                    <q-icon v-else color="white" size="30px" round name="far fa-thumbs-up"/>
                                 </div>
                                 <div v-if="!followedStore" class="text-body2"> Seguir Tienda</div>
                                 <div v-else class="text-body2"> Ya sigues esta tienda</div>
                              </q-card-section>
                           </q-card>
                        </div>
                        <div class="col border-movil">
                           <q-card class="text-center bg-store-secondary no-shadow full-height no-border-radius">
                              <q-card-section class="q-pa-sm text-white">
                                 <div class="text-h4">{{storeData.usersFollowing}}</div>
                                 <div class="text-body2">Seguidores</div>
                              </q-card-section>
                           </q-card>
                        </div>
                     </div>
                  </div>

               </div>
            </div>
         </div>
         <div class="col-12 bg-store-primary menuStore menu-02">
            <div class="q-container">
               <div class="bg-white rounded-lg text-white shadow-4 q-mx-xl q-py-sm relative-position"
                    v-if="$q.platform.is.desktop">
                  <div class="row">
                     <div class="col q-pl-md">
                        <q-btn flat class="q-mx-sm" dense icon="fas fa-home" no-caps color="store-primary"
                               @click="$router.push({name: 'stores.show', params : {slug:storeData.slug}})"/>
                        <div class="line-vertical"></div>
                        <q-btn-dropdown lat icon="fas fa-bars" class="text-bold" label="CategorÍas"
                                        text-color="store-primary" color="white">
                           <q-list>
                              <q-item v-for="item in categories" :key="'category'+item.title" clickable v-close-popup
                                      @click="$router.push({name: 'stores.product.index', params : {slug:storeData.slug,category:item.slug}})">
                                 <q-item-section>
                                    <q-item-label>{{item.title}}</q-item-label>
                                 </q-item-section>
                              </q-item>
                           </q-list>
                        </q-btn-dropdown>
                        <div class="line-vertical"></div>
                        <q-btn @click="$router.push({name: 'stores.about', params : {slug:storeData.slug}})" flat
                               icon="fas fa-map-marker-alt" class="text-bold" label="Info Empresa"
                               color="store-primary"/>
                        <div class="line-vertical"></div>
                        <chat color="store-primary" type="0"></chat>
                     </div>
                     <div class="col-auto q-pr-md">
                        <div class="line-vertical"></div>
                        <div class="q-inline-block q-px-sm border-x">
                           <q-input dense
                                    placeholder="¿Qué buscas?"
                                    v-model="searchText"
                                    :keyup="search()"
                                    color="white" outlined>
                              <template v-slot:append>
                                 <q-icon name="search" class="text-bold" color="store-secondary"/>
                              </template>
                           </q-input>

                           <div class="dropdown-content" :style="productsStore.length>0 ? 'display: block;' : ''">
                              <router-link v-for="(product,index) in productsStore" :key="product.id" v-if="index<=4"
                                           :to="{name: 'stores.product.show',params:{slug: product.slug, product: product.slug}}">
                                 <p class="q-my-sm text-store-primary">{{product.name}}</p>
                              </router-link>
                           </div>

                        </div>
                        <div class="line-vertical"></div>
                        <q-btn flat icon="fas fa-heart" color="store-secondary"/>
                        <div class="line-vertical"></div>
                       <cartHeader color="store-secondary" style="display: inline-block;"/>
                     </div>
                  </div>
               </div>
               <q-toolbar class="bg-white shadow-4" v-else>
                  <q-btn flat round dense icon="fas fa-home"
                         @click="$router.push({name: 'stores.show', params : {slug:storeData.slug}})"
                         color="store-primary"/>
                  <q-btn-dropdown flat icon="fas fa-bars" no-caps color="store-primary">
                     <q-list>
                        <q-item v-for="item in categories" :key="'category'+item.title" clickable v-close-popup
                                @click="$router.push({name: 'stores.product.index', params : {slug:storeData.slug,category:item.slug}})">
                           <q-item-section>
                              <q-item-label>{{item.title}}</q-item-label>
                           </q-item-section>
                        </q-item>
                     </q-list>
                  </q-btn-dropdown>
                  <q-btn @click="$router.push({name: 'stores.about', params : {slug:storeData.slug}})" flat
                         icon="fas fa-map-marker-alt" no-caps color="store-primary"/>
                  <chat color="store-primary" type="0"></chat>
                  <q-toolbar-title>
                  </q-toolbar-title>
                  <q-btn flat round dense icon="fas fa-search" color="store-primary"/>
                  <q-btn flat round dense icon="fas fa-heart" v-if="!followedStore" @click="followStore()"
                         color="white"/>
                 <cartHeader color="store-secondary" style="display: inline-block;"/>
               </q-toolbar>

               <p class="text-h6 text-center text-italic text-white q-my-xl">{{storeData.slogan}} </p>

            </div>
         </div>
         <!-- RATING STORE QDIALOG -->
         <q-dialog v-model="ratingStore" @hide="ratingStore=false;">
            <q-card>
               <q-card-section>
                  <div class="text-h6">Calificar tienda</div>
               </q-card-section>

               <q-card-section>
                  <q-rating size="20px"
                            @input="val => { rating() }"
                            v-model="storeData.averageRating"
                            :max="5"
                  />
               </q-card-section>

               <q-card-actions align="right">
                  <q-btn flat label="OK" color="primary" v-close-popup/>
               </q-card-actions>
            </q-card>
         </q-dialog>
      </div>
      <!-- Chat -->

   </div>
</template>
<script>
   import fullWidthGallery from '@imagina/qmarketplace/_components/themes/qcarousel'
   import chat from '@imagina/qmarketplace/_components/qchat/chat'
   import cartHeader from '@imagina/qmarketplace/_components/themes/cartHeader'

   export default {
      name: 'TopComponent',
      components: {
         fullWidthGallery,
         chat,
         cartHeader
      },
      data() {
         return {
            infoStore: false,
            ratingStore: false,
            followedStore: false,
            slide: 1,
            categories: [],
            loading: false,
            openChat: false,
            productsStore: [],
            searchText: ''
         }
      },
      mounted() {
         this.getProductCategories();
         this.getFollowedStore();
      },
      computed: {
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         }
      },
      methods: {
         search() {
            if (this.searchText != "") {
               this.$crud.index("apiRoutes.qcommerce.products", {
                  params: {
                     filter: {
                        store: this.storeData.id,
                        search: this.searchText
                     }
                  }
               }).then(response => {
                  this.productsStore = response.data;
               });
            }
         },
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
         getProductCategories() {
            let params = {
               params: {
                  filter: {
                     'store': this.storeData.id
                  }
               }
            }
            this.loading = true
            this.$crud.index('apiRoutes.qcommerce.categories', params).then(response => {
               this.categories = response.data
               this.loading = false
            }).catch(error => {
               this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
               this.loading = false
            })
         },
         rating() {
            this.$axios.post(config('apiRoutes.qmarketplace.store') + '/rating/' + this.storeData.id, {
               attributes: {
                  rating: this.storeData.averageRating
               }
            }).then(response => {
               this.$alert.success({message: "Calificación registrada exitosamente", pos: 'bottom'});
               this.getData();
               this.ratingStore = false;
            }).catch(error => {
               this.$alert.error({message: error.response.data.errors, pos: 'bottom'})
            });
         },//ratingStore
      }
   }
</script>
<style lang="stylus">
   .theme-layout-02
      .dropdown-content
         display: none;
         position: absolute;
         background-color: #f9f9f9;
         min-width: 160px;
         box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
         padding: 12px 16px;
         z-index: 1;

      #store-logo
         font-size 304px
         margin 0 100px 47px 100px

      .store-title
         display inline-block
         color $storePrimary
         background #ffffff
         max-width 250px
         font-size 40px
         padding 0 30px
         border-radius 10%
         line-height: normal !important

      .border-movil
         border 3px solid #fff

      .border-slider
         border 10px solid #fff
         position relative
         z-index 9

      .menu-02
         min-height 300px
         margin-top -150px
         padding-top 150px

         .line-vertical
            display inline-block
            margin 1px

            &:before
               position absolute
               content ''
               background $storePrimary
               width 1px
               height 27px
               top 12px

      .info-tienda
         position absolute
         margin 0 auto
         left 0
         bottom 0
         right 0

         .card-rounded
            background-color $storeSecondary
            border-radius 20px 0 20px 0
            color #ffffff
            border 5px solid #fff
            width 150px
            margin 5px auto

            .q-card-section
               line-height 1.1rem

         .card-circle
            background-color $storeSecondary
            border-radius 50%
            color #ffffff
            border 5px solid #fff
            height 110px
            width 110px
            margin 5px auto

            .q-card-section
               line-height 1.1rem

      .border-x
         .q-field__control
            border-bottom 0
            border-radius 0
            padding 0
            height 30px

         .q-field--outlined .q-field__control:before
            border 0

         .q-placeholder
            color $storeSecondary
      @media screen and (max-width: $breakpoint-md)
         #store-logo
            font-size 250px
            margin 0 11px 70px 50px
      @media screen and (max-width: $breakpoint-sm)
         #store-logo
            font-size 150px
            margin 0 11px 80px 50px
      @media screen and (max-width: $breakpoint-sm)
         #store-logor
            font-size 100px
            margin 0 11px 90px 20px

         .store-title
            max-width 100%
            font-size 25px
            line-height: normal !important
            padding 0 30px
            border-radius 10%
            margin-bottom 50px
            position absolute
</style>
