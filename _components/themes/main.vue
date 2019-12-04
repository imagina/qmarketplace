<template>
   <div v-if="storeData.themeId==1">
      <main1/>
   </div>
   <div v-else-if="storeData.themeId==2">
      <main2/>
   </div>
   <div v-else-if="storeData.themeId==3">
      <main3/>
   </div>
</template>

<script>
   import main1 from '@imagina/qmarketplace/_components/themes/01/block'
   import main2 from '@imagina/qmarketplace/_components/themes/02/block'
   import main3 from '@imagina/qmarketplace/_components/themes/03/block'

   export default {
      name: 'mainStore',
      components: {
         main1,
         main2,
         main3
      },
      mounted() {
        /*
        console.warn('ain', this.storeData)
        */
      },
      computed:{
         storeData(){
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         }
      },
   }
</script>
<style lang="stylus">
</style>
