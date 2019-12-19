<template>
   <div>
      <div v-if="storeData.themeId==1" class="headerStore theme-layout-01">
         <header1 :store="storeData" :cart="cart"></header1>
      </div>
      <div v-else-if="storeData.themeId==2" class="headerStore theme-layout-02">
         <header2 :store="storeData" :cart="cart"></header2>
      </div>
      <div v-else-if="storeData.themeId==3" class="headerStore theme-layout-03">
         <header3 :store="storeData" :cart="cart"></header3>
      </div>
   </div>
</template>

<script>
   import header1 from '@imagina/qmarketplace/_components/themes/01/top'
   import header2 from '@imagina/qmarketplace/_components/themes/02/top'
   import header3 from '@imagina/qmarketplace/_components/themes/03/top'

   export default {
      name: 'headerStore',
      components: {
         header1,
         header2,
         header3
      },
      data() {
         return {
            store: [],
            cart: null
         }
      },
      mounted() {
         this.$nextTick(function () {
            this.getCart();
         })
      },
      computed:{
         storeData(){
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         }
      },
      methods: {

      }
   }
</script>
<style lang="stylus">
   .headerStore
      .menuStore
         .q-btn-dropdown
            .q-btn__wrapper:before
               border: none !important
               box-shadow: none !important
               transition: none
</style>
