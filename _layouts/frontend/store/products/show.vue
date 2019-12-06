<template>
  <div>
    <header-store></header-store>
    <div id="showProductPage" class="q-container">
      <div class="row gutter-x-sm q-mt-md">
        <!--== Content ==-->
        <div id="product" class="col-12">
          <div class="row">
            <div class="col-12 col-md-6 Image">
              <q-img
                      :src="productData.mainImage.path"
                      spinner-color="white"
                      style="width: 100%"
              ></q-img>
            </div>
            <div class="col-12 col-md-6 attributes q-pl-xl">
              <h1 class="text-h1">{{productData.name}}</h1>
              <q-rating size="40px"
                        v-model="productData.averageRating" color="store-secondary"
                        :max="5" @input="val => { rating() }"
              />
              <div class="summary q-pt-lg">
                {{productData.summary}}
              </div>
              <add-to-cart :product-id="productData.id" :price="productData.price" />
            </div>
          </div>
          <div class="row description q-pt-xl">
            <div class="col">
              <h3 class="title-label-tertiary text-center">
                <div>Descripción</div>
              </h3>
              <div class="q-container">
                <div class="row q-pa-lg">
                 <div class="col" v-html="productData.description">
                 </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-store></footer-store>
  </div>
</template>

<script>
  // Components
  import menuCategories from '@imagina/qcommerce/_components/frontend/categories/menu'
  import selectProducts from '@imagina/qcommerce/_components/frontend/products/widgets/selectProducts'
  import addToCart from '@imagina/qmarketplace/_components/cart/addToCart'
  import headerStore from '@imagina/qmarketplace/_components/themes/header'
  import footerStore from '@imagina/qmarketplace/_components/themes/footer'
  // Services
  import icommerceService from '@imagina/qcommerce/_services/index';
  import {helper} from '@imagina/qhelper/_plugins/helper'


  export default {
    preFetch({store, currentRoute, previousRoute, redirect, ssrContext}) {
      return new Promise(async resolve => {
        //Get data post
        let storeSlug = currentRoute.params.slug
        let slugProduct = currentRoute.params.product
        await store.dispatch('qcrudMaster/SHOW', {
          indexName: `qmarketplace-store-${storeSlug}-product-${slugProduct}`,
          criteria: slugProduct,
          apiRoute: 'apiRoutes.qcommerce.products',
          requestParams: {
            refresh: true,
            params: {}
          }
        })
        resolve(true)
      })
    },
    meta() {
      let slugProduct = this.$route.params.product || false
      let storeSlug= this.$route.params.slug || false
      let routetitle = slugProduct || 'productos'
      let siteName = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name')
      let siteDescription = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-description')
      //Set category data
      let product = this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}-product-${slugProduct}`].data
      if (product) {
        routetitle = product.name
        siteDescription = product.description
      }
      return {
        title: `${routetitle.charAt(0).toUpperCase() + routetitle.slice(1)} | ${siteName}`,
        meta: {
          description: {name: 'description', content: (siteDescription || siteName)},
        },
      }
    },

    props: {},
    components: {
      menuCategories,
      selectProducts,
      addToCart,
      footerStore,
      headerStore,
    },
    mounted() {
      this.$nextTick(function () {
        this.getData(),
        this.getDataStore()
      })
    },
    watch: {
      $route(to, from) {
        this.getData()
      }
    },
    data() {
      return {
        loading: false,
        productData: false,
        productSelectd: false,
      }
    },
    computed: {},
    methods: {
      //Get data
      getData() {
        this.loading = true
        let slugProduct = this.$route.params.product
        let params = {
          refresh: true,
          params: {filter: {field: 'slug'}, include: 'productOptions,optionValues'}
        }
        icommerceService.crud.show('apiRoutes.qcommerce.products', slugProduct, params).then(response => {
          this.productData = response.data//Add data
          this.productSelectd = response.data.slug//Set product selected
          this.loading = false
        }).catch(error => {
          this.$alert.error({message : 'Failed: ' + error, pos : 'bottom'})
          this.loading = false
        })
      },
      getDataStore() {
        return new Promise((resolve, reject) => {
          const itemId = this.$clone(this.storeSlug)
          if (itemId) {
            //Params--
            let params = {
              refresh: true,
              params: {
                include:'products,paymentMethods,shippingMethods',
                filter: {
                  allTranslations: true,
                  field: 'slug',
                },
              }
            }//test
            //Request
            this.$crud.show(this.configName, itemId, params).then(response => {
              this.store = this.$clone(response.data);
              colors.setBrand('storeprimary', this.store.options.theme_config.color_primary)
              colors.setBrand('storesecondary', this.store.options.theme_config.color_secondary)
              colors.setBrand('storebackground', this.store.options.theme_config.background)
              resolve(true)//Resolve
            }).catch(error => {
              this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
              reject(false)//Resolve
            })
          } else {
            resolve(true)//Resolve
          }

        }).catch(error => {})
      },
      rating() {
        this.$axios.post(config('apiRoutes.qcommerce.products') + '/rating/' + this.productData.id, {
          attributes: {
            rating: this.productData.averageRating
          }
        }).then(response => {
          this.$alert.success({message: "Calificación registrada exitosamente", pos: 'bottom'});
          this.getData();
        }).catch(error => {
          this.$alert.error({message: error.response.data.errors, pos: 'bottom'})
        });
      },
    }
  }
</script>

<style lang="stylus">
  #showProductPage
    #product
      .text-h1
        font-size 1.5rem
        font-weight bold
        color $storeprimary
      .summary
        font-size 1rem
      .q-rating
        color $amber-6 !important
      .description
        font-size 1.1rem
</style>
