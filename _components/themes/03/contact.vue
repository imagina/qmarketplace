<template>
  <div class="bg-primary q-py-xl">
    <div class="q-container ">
      <div class="row">
        <div class="col bg-white q-pa-lg">
          <div class="row items-center gutter-md">
            <div class="col-md-5 text-center">

              <div class="text-h5 bg-primary q-inline-block q-pa-md text-white q-mb-sm">{{storeData.name}}</div>
              <h5 class="text-subtitle1 text-secondary q-mt-none">{{storeData.slogan}}</h5>

            </div>
            <div class="col-md-7">
              <q-list class="border-0">
                <q-item>
                  <q-item-section avatar class="q-mr-md">
                    <q-icon color="primary" size="lg" name="mail" />
                  </q-item-section>
                  <q-item-section class="q-py-md">
                    <div class="q-subheading text-weight-bold q-mb-none">Correo Electrónico:</div>
                      <div class="q-subheading "><a class="text-dark" :href="'mailto:'+storeData.options.email">{{storeData.options.email}}</a></div>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar class="q-mr-md">
                    <q-icon color="primary" size="lg" name="fas fa-map-marker-alt" />
                  </q-item-section>
                  <q-item-section class="q-py-md">
                    <div class="q-subheading text-weight-bold q-mb-none">Dirección:</div>
                    <div class="q-subheading">
                      {{storeData.address}}
                    </div>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar class="q-mr-md">
                    <q-icon color="primary" size="lg" name="far fa-clock" />
                  </q-item-section>
                  <q-item-section class="q-py-md">
                      <div class="q-subheading text-weight-bold q-mb-none">Horario de atención:</div>
                      <div class="q-subheading">
                        {{storeData.schedules[0]}}
                      </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
      </div>
    </div>
    <share></share>
  </div>
</template>
<script>
  import share from '@imagina/qmarketplace/_components/themes/03/shareNetworks'
export default {
  components: {
    share,

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
