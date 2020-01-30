<template>
   <div class="q-mt-lg">
      <router-link
              :to="{name: 'stores.product.show',params:{slug: storeData.slug, product: product.slug}}">
      <q-img :ratio="1" :src="product.mainImage.path" :alt="product.name" />
      </router-link>
      <q-btn :to="{name: 'stores.product.show',params:{slug: storeData.slug, product: product.slug}}" no-caps class="rounded-lg btn-banner"  color="store-secondary" :label="product.name" />
   </div>
</template>
<script>
   export default {
      name: 'MainProduct',
      props: ['product'],
      mounted() {
      },
      computed: {
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         },
      },
      methods: {}
   }
</script>
<style lang="stylus">
   .cardProductTwo
      border-radius 20px 20px 20px 0
      position relative
      margin 8px
      background-color var(--q-color-light)

      & .card-title
         margin-right 30px
         margin-top -30px
         z-index 9
         position relative
         margin-bottom 10px
         padding 10px
         border-radius 0 10px 10px 0 !important

      & .card-main
         font-size 16px

      & .q-card__actions
         .q-btn
            margin-left -7px
            border-radius 0
            margin-bottom 10px
            box-shadow none
            padding-right 20px


</style>
