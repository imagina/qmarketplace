<template>
   <q-page v-if="store">
      <header-store></header-store>
      <main-store></main-store>
      <footer-store></footer-store>
   </q-page>
</template>
<script>
   import headerStore from '@imagina/qmarketplace/_components/themes/header'
   import footerStore from '@imagina/qmarketplace/_components/themes/footer'
   import mainStore from '@imagina/qmarketplace/_components/themes/main'
   import {colors, AddressbarColor} from 'quasar'

   export default {
      name: 'showStore',

      preFetch({store, currentRoute, previousRoute, redirect, ssrContext}) {
         return new Promise(async resolve => {
            //Get data post
            let storeSlug = currentRoute.params.slug || false
            await store.dispatch('qcrudMaster/SHOW', {
               indexName: `qmarketplace-store-${storeSlug}`,
               criteria: storeSlug,
               apiRoute: 'apiRoutes.qmarketplace.store',
               requestParams: {refresh: true, params: {include: 'categories,user'}}
            })
            resolve(true)
         })
      },
      meta() {
         let storeSlug = this.$route.params.slug
         let routetitle = storeSlug || 'productos'
         let siteName = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name')
         let siteDescription = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-description')
         //Set category data
         let store = this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         if (store) {
            routetitle = store.name
            siteDescription = store.description
         }
         return {
            title: `${routetitle.charAt(0).toUpperCase() + routetitle.slice(1)} | ${siteName}`,
            meta: {
               description: {name: 'description', content: (siteDescription || siteName)},
            },
         }
      },

      components: {
         footerStore,
         mainStore,
         headerStore,
      },
      data() {
         return {
            loading: true,
            configName: 'apiRoutes.qmarketplace.store',
            storeSlug: this.$route.params.slug,
            store: null,
            cart:null
         }
      },
      mounted() {
         this.$nextTick(async function () {
            await this.getData().catch(error=>{})
            await  this.getCart()
         });
      },
      methods: {
         async init() {
            await this.getData()
            await this.rating()
         },
         rating() {
            return new Promise((resolve, reject) => {

               this.$axios.post(config('apiRoutes.qmarketplace.store') + '/rating/' + this.store.id, {
                  attributes: {
                     rating: 2
                  }
               })
                   .then(response => {
                      resolve(true);
                   })
                   .catch(error => {
                      reject(error);
                   });


            })
         },
         getData() {
            return new Promise((resolve, reject) => {
               const itemId = this.$clone(this.storeSlug)
               if (itemId) {
                  //Params--
                  let params = {
                     refresh: true,
                     params: {
                        filter: {
                           allTranslations: true,
                           field: 'slug'
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

            })
         },
         getCart(){
           let params = {
               params: {
                  filter:{
                     field:'store_id',
                     'user': this.$store.state.quserAuth.userId,
                     'status':1
                  }
               }
            }
            this.loading = true
            this.$crud.show('apiRoutes.qcommerce.cart',this.store.id, params).then( response => {
               this.cart = response.data
               this.loading = false
            }).catch( error => {
               this.loading = false
            })
            if(this.cart){
               store.dispatch('qcrudMaster/SHOW', {
                  indexName: `qmarketplace-store-cart-${this.cart.id}`,
                  criteria: this.cart.id,
                  apiRoute: 'apiRoutes.qcommerce.cart',
                  requestParams: {refresh: true, params: {filter:{'field':'id'},include: 'products'}}
               })
            }

         }

      }
   }
</script>
<style lang="stylus">
.theme-layout-02
  .btn-banner
    border 2px solid #fff
    padding 5px 25px
    font-size 22px
    font-weight bold
    margin-top -25px
  .banner-two
    background-image url('/statics/img/theme-two/conocenos.jpg')
    background-size cover
    padding 10% 0
    position relative
    &:before
      height 100%
      width 100%
      background-color  rgba(#282d46, 0.7)
      content ''
      position absolute
      top 0
    .content
      position relative
      z-index 3
      .imsocial
        display inline-block
        a
        & i
          margin 10px
          font-size 2rem
          color #ffffff
          &:hover
            color $secondary

</style>
