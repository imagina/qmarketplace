<template>
  <q-page  v-if="store">
    <div v-if="store.themeId==1">
      <layout1 :store="store"></layout1>
    </div>
    <div v-else-if="store.themeId==2">
      <layout2 :store="store"></layout2>
    </div>
    <div v-else-if="store.themeId==3">
      <layout3></layout3>
    </div>
  </q-page>

</template>
<script>
import layout1 from '@imagina/qmarketplace/_layouts/frontend/store/themes/index1'
import layout2 from '@imagina/qmarketplace/_layouts/frontend/store/themes/index2'
import layout3 from '@imagina/qmarketplace/_layouts/frontend/store/themes/index3'
import { colors, AddressbarColor } from 'quasar'
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
    layout1,
    layout2,
    layout3
  },
  data() {
    return {
      loading:true,
      configName: 'apiRoutes.qmarketplace.store',
      storeSlug:this.$route.params.slug,
      store:null
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData() {
      return new Promise((resolve, reject) => {
        const itemId = this.$clone(this.storeSlug)

        if (itemId) {
          //Params
          let params = {
            refresh: true,
            params: {
              include: 'categories,products',
              filter: {
                allTranslations: true,
                field:'slug'
              },
            }
          }
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
