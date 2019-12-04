<template>
  <div class="q-container">
    <div class="row q-col-gutter-lg items-center q-pt-xl">
      <div class="col-md-4 q-pb-xl text-center">
        <div class="logo">
          <router-link :to="{ name: 'app.home'}">
            <img :src="storeData.logo.path" :alt="storeData.name" width="100%"/>
          </router-link>
        </div>
      </div>
      <div class="col-md-4 q-pb-xl">

        <q-list >
          <q-item>
            <q-item-section avatar class="q-mr-md">
              <q-icon color="store-primary"  size="lg" name="fas fa-map-marker-alt" />
            </q-item-section>
            <q-item-section>
              <div class="text-subtitle1 text-bold">Dirección:</div>
              <div class="text-subtitle1">
                {{address}}
              </div>
            </q-item-section>
          </q-item>
        </q-list>

      </div>
      <div class="col-md-4 q-pb-xl">

        <q-list>
          <q-item>
            <q-item-section avatar class="q-mr-md">
              <q-icon color="store-primary"  size="lg" name="far fa-clock" />
            </q-item-section>
            <q-item-section>
              <div class="text-subtitle1 text-bold">Horario de atención:</div>
              <div class="text-subtitle1" v-for="schedule in schedules">
                {{schedule}}
              </div>
            </q-item-section>
          </q-item>
        </q-list>

      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'ContactComponent',
  props: {
    'address': { type:String, default: ""},
    'schedules': { type:Array, default: []},
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
