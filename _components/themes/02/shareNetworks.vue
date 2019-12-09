<template>
  <q-list class="share-networks q-mb-lg border-0">
    <div class="bg-store-secondary title-share text-white rounded-sm q-mb-sm text-center">
      <div class="q-py-sm text-subtitle1"> <q-icon color="white" name="share" /> COMPARTIR</div>
    </div>
    <div v-for="soc in store.social" v-if="soc.active">
      <q-item clickable :to="soc.url">
        <q-item-section avatar>
          <q-icon color="store-primary" :name="soc.icon" />
        </q-item-section class="q-py-md">
        <q-item-section class="q-py-md">{{soc.name}}</q-item-section>
      </q-item>
      <q-separator />
    </div>
  </q-list>
</template>
<script>
export default {
  name: 'ShareNetworksComponent',
  computed:{
    store(){
      let storeSlug = this.$route.params.slug
      return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
    }
  },
}
</script>
<style lang="stylus">
.theme-layout-02
  .share-networks
    overflow hidden
    .title-share
      -webkit-transform skew(10deg)
      transform skew(10deg)
      margin-left -10px
      margin-right 20px
      & > div
        -webkit-transform  skew(-10deg)
        transform skew(-10deg)
</style>