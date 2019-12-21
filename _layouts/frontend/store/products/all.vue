<template>
   <div class="">
      <header-store></header-store>
      <div class="bg-fondo">
         <div class="q-container ">
            <div class="row q-col-gutter-lg q-py-lg">
               <div class="col-md-12">
                  <h2 class="text-primary text-center font-family-secondary q-mb-sm q-mx-lg">
                     Búsqueda de productos
                  </h2>
               </div>
               <q-card class="q-mt-lg">
                  <q-card-section>
                     <div class="row">
                        <div class="col-xs-12 col-md-6 q-px-sm">
                           <q-item-label class="caption q-mb-xs">Categoría
                              <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                                 <q-tooltip>
                                    Selecciona una categoría para obtener sus productos
                                 </q-tooltip>
                              </q-btn>
                           </q-item-label>
                           <tree-select
                                   :clearable="false"
                                   :append-to-body="true"
                                   class="q-mb-md"
                                   filter="searchText"
                                   :options="categories"
                                   value-consists-of="BRANCH_PRIORITY"
                                   v-model="categoryId"
                                   placeholder=""
                           />
                        </div>
                        <div class="col-xs-12 col-md-6 q-px-sm">
                           <q-item-label class="caption q-mb-xs">Nombre
                              <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                                 <q-tooltip>
                                    Puedes buscar por las iniciales de un producto
                                 </q-tooltip>
                              </q-btn>
                           </q-item-label>
                           <q-input dense @keydown.enter=getProducts() v-model="search" placeholder=""></q-input>
                        </div>
                     </div>

                  </q-card-section>
                  <q-card-actions>
                     <q-btn @click="getProducts()" color="primary" icon="fas fa-search">
                        Buscar
                     </q-btn>
                  </q-card-actions>
               </q-card>
            </div>
         </div>
         <div class="q-container">
            <div class="row q-col-gutter-lg q-py-lg">
               <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3" v-if="products.length"
                    v-for="product in products" :key="product.id">
                  <product :product="product" className="cardProductH" color-btn="store-primary"></product>
               </div>
               <div
                       class="row"
                       v-else>
                  <div class="col-md-12">
              <span class="q-display-1">
                No hay productos que concuerden con la selección.
              </span>
                  </div>
               </div>
               <div
                       class="row"
                       v-if="paginate.maxPages > 1">
                  <div class="col-md-12 flex justify-end q-pt-xl">
                     <q-pagination
                             direction-links
                             @input="getProducts()"
                             v-model="paginate.page"
                             :min="paginate.minPages"
                             :max="paginate.maxPages"/>
                  </div>
               </div>
            </div>
         </div>
         <!--Inner Loading-->
         <inner-loading :visible="loading"></inner-loading>
      </div>
      <footer-store></footer-store>
   </div>
</template>

<script>
   import icommerceService from '@imagina/qcommerce/_services/index';
   import product from '@imagina/qmarketplace/_components/themes/01/product'
   import headerStore from '@imagina/qmarketplace/_components/themes/header'
   import footerStore from '@imagina/qmarketplace/_components/themes/footer'

   export default {
      preFetch({store, currentRoute, previousRoute, redirect, ssrContext}) {
         return new Promise(async resolve => {
            //Get data post
            let storeSlug = currentRoute.params.slug
            await store.dispatch('qcrudMaster/SHOW', {
               indexName: `qmarketplace-store-${storeSlug}`,
               criteria: storeSlug,
               apiRoute: 'apiRoutes.qmarketplace.store',
               requestParams: {
                  refresh: true,
                  params: {include: 'categories,user,products,paymentMethods,shippingMethods'}
               }
            })
            resolve(true)
         })
      },
      meta() {
         let routetitle = this.$route.params.search || 'Productos de la tienda ' + this.storeData.name;
         let siteName = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name')
         let siteDescription = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-description')
         return {
            title: `${routetitle.charAt(0).toUpperCase() + routetitle.slice(1)} | ${siteName}`,
            meta: {
               description: {name: 'description', content: (siteDescription || siteName)},
            },
         }
      },


      components: {
         product,
         footerStore,
         headerStore,
      },
      watch: {
         $route(to, from) {
            this.getProducts()
         }
      },
      mounted() {
         this.$nextTick(() => {
            this.init()
         })
      },
      data() {
         return {
            loading: false,
            showProduct: false,
            categoryId: null,
            products: [],
            categories: [],
            paginate: {
               page: 1,
               take: 10,
               minPages: 1,
               maxPages: 0
            },
            search: ''
         }
      },
      computed: {
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         }
      },
      methods: {
         //Init
         init() {
            this.loading = true
            this.search = this.$route.params.search;
            this.getProducts()//Get products
            this.getProductCategories()//Get products
            this.loading = false
         },
         // Get all products by category :slug
         getProducts() {
            this.loading = true
            let params = {
               params: {
                  filter: {
                     // categorySlug: this.$route.params.category,
                     storeSlug: this.$route.params.slug,
                     locale: 'es',
                     search: this.search
                  },
                  take: this.paginate.take,
                  page: this.paginate.page,
               }
            }
            if (this.categoryId) {
               params.params.filter.categories = [this.categoryId]
            }

            icommerceService.crud
                .index('apiRoutes.qcommerce.products', params)
                .then(response => {
                   this.paginate.maxPages = response.meta.page.lastPage
                   this.products = response.data
                   this.loading = false
                })
                .catch(error => {
                   this.$alert.error({message: 'Failed: ' + error, pos: 'bottom'})
                   this.loading = false
                })//
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
               this.categories = this.$array.tree(response.data);//
               this.loading = false
            }).catch(error => {
               this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
               this.loading = false
            })
         },
      }
   }

</script>

<style lang="stylus">
   div.product
      cursor pointer

   .product-img
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      width: 100%
      height 260px
      border: 1px solid #dddddd52
      border-radius 10px

   .btn-product
      margin-top 240px

   .color-secondary
      color: $secondary

   .color-primary
      color: $secondary

</style>
