<template>
   <div>
      <div v-if="storeData.themeId==1" class="headerStore theme-layout-01">
         <header1></header1>
      </div>
      <div v-else-if="storeData.themeId==2" class="headerStore theme-layout-02">
         <header2></header2>
      </div>
      <div v-else-if="storeData.themeId==3" class="headerStore theme-layout-03">
         <header3></header3>
      </div>
   </div>
</template>

<script>
   import header1 from '@imagina/qmarketplace/_components/themes/01/top'
   import header2 from '@imagina/qmarketplace/_components/themes/02/top'
   import header3 from '@imagina/qmarketplace/_components/themes/03/top'
   import {colors, AddressbarColor} from 'quasar'

   export default {
      name: 'headerStore',
      components: {
         header1,
         header2,
         header3
      },
      data() {
         return {}
      },
      mounted() {
         this.$nextTick(async function () {
            await this.getData().catch(error=>{})
         });
      },
      computed:{
         storeData(){
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         }
      },
      methods: {
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
console.log(colors)
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
      }
   }
</script>
<style lang="stylus">
   .headerStore
      background $primaryStore
      .menuStore
         .q-btn-dropdown
            .q-btn__wrapper:before
               border: none !important
               box-shadow: none !important
               transition: none
</style>
