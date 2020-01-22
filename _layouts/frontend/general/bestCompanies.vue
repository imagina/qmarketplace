<template>
   <q-page class="bg-fondo best-companies">
      <div class=" q-py-xl q-container">
         <div class="row">
            <div class="col-12">
               <div class="text-h5 text-primary q-mb-md font-family-secondary">Mejores Empresas</div>
            </div>
            <div class="col-12">
               <q-card class="rounded-md bg-white q-mb-xl">
                  <q-card-section>
                     <div class="row">
                        <div class="col-xs-12 col-sm-4 q-px-sm filters">
                           <q-select
                                   outlined
                                   v-model="filter.categories"
                                   :options="cateOption"
                                   stack-label
                                   clearable
                                   use-input
                                   @filter="(val, update)=>update(()=>{cateOption = $helper.filterOptions(val,categoryOptions,filter.categories)})"
                                   @input="getStores()"
                                   label="Filtrar Por Categoria"
                           />
                        </div>
                     </div>
                  </q-card-section>
                  <q-card-section class="q-pa-lg">
                     <ul>
                        <li v-for="(item,i) in stores" :key="item.id">
                           <div class="row q-col-gutter-md items-center" v-if="false">
                              <div class="col text-truncate">
                                 <div class="row">
                                    <div class="col-xs-12 col-md-2 col-xl-1 text-truncate">
                                       <q-avatar round class="bg-white mx-auto">
                                          <img :src="item.logo.path">
                                       </q-avatar>
                                    </div>
                                    <div class="col-xs-12 col-md-10 col-xl-11 ">
                                       <div class="row"><span class="text-primary text-bold ">{{item.name}}</span>
                                       </div>
                                       <div class="row">{{item.slogan}}</div>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-xs-2 text-truncate">
                                 <div class="row">
                                    <div class="col-xs-12 col-md-10 col-xl-11 ">
                                       <div class="row"><span class="text-primary text-bold ">Nivel</span>
                                       </div>
                                       <div class="row">{{item.levelName}}</div>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-xs-1 text-truncate">
                                 <div class="row">
                                    <div class="col-xs-12 col-md-10 col-xl-11 ">
                                       <div class="row"><span class="text-primary text-bold ">Puntos</span>
                                       </div>
                                       <div class="row">{{item.averageRating}}/{{item.countRatings}}</div>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-xs-1 text-truncate">
                                 <div class="row">
                                    <div class="col-xs-12 col-md-10 col-xl-11 ">
                                       <div class="row"><span class="text-primary text-bold ">Seguidores</span>
                                       </div>
                                       <div class="row">{{item.usersFollowing}}</div>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-xs-1 text-truncate">
                                 <div class="row">
                                    <div class="col-xs-12 col-md-10 col-xl-11 ">
                                       <div class="row"><span class="text-primary text-bold ">Ventas</span>
                                       </div>
                                       <div class="row">{{item.completedOrders}}</div>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-auto">
                                 <q-btn dense round icon="fas fa-eye" class="q-mr-sm q-pa-xs"
                                        size="10px" color="primary" :to="item.link"/>
                              </div>
                           </div>
                           <div class="row q-col-gutter items-center" v-if="true">
                             <div class="col-12">
                                <div class="row q-mb-sm">
                                   <div class="row">
                                      <div class="col-xs-12 text-center">
                                         <q-avatar round class="bg-white mx-auto" size="100px">
                                            <img :src="item.logo.path">
                                         </q-avatar>
                                      </div>
                                      <div class="col-xs-12">
                                         <div class="row"><span class="text-primary text-bold ">{{item.name}}</span>
                                         </div>
                                         <div class="row">{{item.slogan}}</div>
                                      </div>
                                   </div>
                                </div>
                                <div class="row q-col-gutter-md q-mb-sm">
                                   <div class="col-3 text-truncate">
                                      <div class="row">
                                         <div class="col-xs-12">

                                            <div class="row"><span class="text-primary text-bold ">Nivel</span>
                                            </div>
                                            <div class="row">{{item.levelName}}</div>

                                         </div>
                                      </div>
                                   </div>
                                   <div class="col-3 text-truncate">
                                      <div class="row">
                                         <div class="col-xs-12">
                                            <div class="row"><span class="text-primary text-bold ">Puntos</span>
                                            </div>
                                            <div class="row">{{item.averageRating}}/{{item.countRatings}}</div>
                                         </div>
                                      </div>
                                   </div>
                                   <div class="col-3 text-truncate">
                                      <div class="row">
                                         <div class="col-xs-12 col-md-10 col-xl-11 ">
                                            <div class="row"><span class="text-primary text-bold ">Seguidores</span>
                                            </div>
                                            <div class="row">{{item.usersFollowing}}</div>
                                         </div>
                                      </div>
                                   </div>
                                   <div class="col-3 text-truncate">
                                      <div class="row">
                                         <div class="row">
                                            <div class="col-xs-12 col-md-10 col-xl-11 ">
                                               <div class="row"><span class="text-primary text-bold ">Ventas</span>
                                               </div>
                                               <div class="row">{{item.completedOrders}}</div>
                                            </div>
                                         </div>
                                      </div>
                                   </div>
                                </div>
                                <div class="row q-mb-sm">
                                   <div class="col text-center">
                                      <div class="row">
                                         <div class="col text-center">
                                            <q-btn dense size="md"
                                                   label="Ir a Tienda" color="primary" :to="item.link"/>
                                         </div>
                                      </div>
                                   </div>
                                </div>
                             </div>
                           </div>
                        </li>
                     </ul>
                     <div class="q-pa-lg flex flex-center" v-if="page">
                        <q-pagination
                                v-model="page"
                                :max="pages.lastPage"
                                :direction-links="true"
                                @input="getNotifications()"
                        >
                        </q-pagination>
                     </div>
                     <div class="q-pa-lg flex flex-center" v-else><span class="text-primary text-h6 text-bold ">Notificaciones no encontradas</span>
                     </div>
                  </q-card-section>
                  <inner-loading :visible="loading"/>

               </q-card>
            </div>
         </div>

      </div>
   </q-page>
</template>
<script>var cateOption;
var cateOption;


export default {
   components: {},
   meta() {
      let routetitle = this.$route.params.slug || 'Mejores Empresas'
      let siteName = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name')
      let siteDescription = "Listado de las mejores empresas"
      let iconHref = this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::favicon').path
      //Set category data
      return {
         title: `${routetitle.charAt(0).toUpperCase() + routetitle.slice(1)} | ${siteName}`,
         meta: {
            description: {name: 'description', content: (siteDescription || siteName)},
         },
      }
   },
   mounted() {
      this.$nextTick(function () {
         this.init()
      })
   },
   data() {
      return {
         page: 1,
         pages: {lastPage: 0},
         loading: false,
         filter: {
            categories: null,
         },
         stores: [],
         categoryOptions: [],
         cateOption: [],
      }
   },
   computed: {},
   methods: {
      async init() {
         await this.getCategoryStore()
         await this.getStores()
      },
      getStores() {
         return new Promise((resolve, reject) => {
            let params = {
               refresh: true,
               params: {
                  include: 'categories',
                  filter: {
                     categories: this.filter.categories,
                     ranting: 'top'
                  },
                  take: 20,
                  page: this.page ? this.page : 1
               }
            }
            //Request
            this.$crud.index('apiRoutes.qmarketplace.store', params).then(response => {
               this.stores = response.data
               this.pages = response.meta.page
               if (!this.stores.length) this.page = null;
               this.loading = false
               resolve(true)//Resolve
            }).catch(error => {
               this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
               this.loading = false
               reject(false)//Resolve
            })
         })
      },

      getCategoryStore() {
         return new Promise((resolve, reject) => {
            let params = {
               params: {
                  filter: {},
                  include: ''
               }
            };
            let child = [];
            this.$crud.index("apiRoutes.qmarketplace.category", params).then(response => {
               this.categoryOptions = this.$array.select(response.data, {label: 'title', id: 'name'})
               this.cateOption = this.$clone(this.categoryOptions)
               resolve(true);
            }).catch(error => {
               this.loading = false
               console.error('[ERROR - GET STORES SEARCH] ', error)
               this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
               reject(error)//Resolve
            })
         });
      },
   },
}
</script>

<style lang="stylus">
   .best-companies
      .q-list
         padding 0

      .q-collapsible-sub-item
         background white
         padding 8px 0 8px 35px

         .mesageNotification
            padding 15px

      ul
         list-style none
         padding-left 0

         li
            border 1px solid $primary
            padding 20px
            border-radius 10px
            margin-bottom 20px

      .filters
         font-size 12px
      @media screen and (max-width: $breakpoint-xs)
         ul
            li
               .q-avatar
                  font-size 12px
</style>