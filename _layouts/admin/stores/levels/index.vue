<template>
  <div id="storeReport">

    <div class="text-h5 text-primary q-pb-md q-pl-lg font-family-secondary">Nivel de Mi Tienda</div>
    <q-card class="rounded-md bg-white full-width q-my-sm">
      <div class="q-pa-lg">
        <div class="row q-col-gutter-md q-pt-lg">
          <div class="col-xs-12 col-sm-12">
            <div class="q-pa-md">
              <div class="text-h6 q-mb-lg">
                <q-icon class="q-mr-sm icon-sm" name="event"/>
                {{nivel.title}}
              </div>


            </div>
          </div>
        </div>
      </div>

    </q-card>
  </div>
</template>
<script>
import {Chart} from 'highcharts-vue'
import cardUser from '@imagina/qmarketplace/_components/info/cardUser'
export default {
  props: {},
  components: {
    Chart,
    cardUser

  },
  watch: {},
  data() {
    return {
     loading:true,
      nivel:[],
      success:false
    }
  },
  mounted(){
    this.$nextTick(function () {
       this.init()
    });
  },
  methods: {
    async init() {

       this.getNivel()
    },
    marketplaceReport(){
      return new Promise((resolve, reject) => {

          //Params
          let params = {
            refresh: true,
            params: {
              include: 'relatedProducts,categories,parent',
              filter: { allTranslations: true }
            }
          }
          //Request
          this.$crud.show('apiRoutes.qmarketplace.level', productId, params).then(response => {
            this.orderDataItemToLocale(response.data)
            resolve(true)//Resolve
          }).catch(error => {
            this.$alert.error({ message: this.$tr('ui.message.errorRequest'), pos: 'bottom' })
            this.loading = false
            reject(false)//Resolve
          })
      })
    },

  }
}
</script>
<style lang="stylus">
#storeReport
   .btn-more
      border-top 1px solid #eee
   .highcharts-legend
      display none !important
   .avatar-user
      .q-avatar__content
         border-radius 50%
         border 2px solid #eee
   .q-list
      .items-product
         border-bottom 1px solid #eee
         padding 10px
      .items-product:last-child
         border-bottom 0
   @media screen and (max-width: $breakpoint-xs)
      .icon-sm
         display none !important
      .text-h6
         text-align center
</style>
