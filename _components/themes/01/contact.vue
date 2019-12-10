<template>
  <div class="q-container">
    <div class="row q-col-gutter-lg items-center q-pt-xl">
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
      <div class="col-md-4 q-pb-xl">

        <q-list  class="q-mr-md">
          <q-item>
            <q-item-section avatar class="q-mr-md">
              <q-icon color="store-primary" size="lg" name="far fa-comment-dots" />
            </q-item-section>
            <q-item-section>
              <div class="text-subtitle1 text-bold">¿Tienes alguna duda?</div>
              <div class="text-subtitle1">Chatea aquí con la Tienda</div>
            </q-item-section>
          </q-item>
        </q-list>

      </div>
    </div>
  </div>
</template>
<script>
export default {

    props: {
      'address': { type:String, default: ""},
      'schedules': { type:Array, default: []},
    },
  mounted() {
    console.warn('contact', this.storeData)
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
