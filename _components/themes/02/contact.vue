<template>
  <div class="q-container">
    <div class="row q-col-gutter-lg items-center q-pt-xl">
      <div class="col-md-4 q-pb-xl text-center">
        <div class="logo">
          <router-link :to="{ name: 'app.home'}">
            <img :src="logo">
          </router-link>
        </div>
      </div>
      <div class="col-md-4 q-pb-xl">

        <q-list class="no-border">
          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-map-marker-alt" />
            </q-item-section>
            <q-item-section>
              <div class="q-subheading text-weight-bold q-mb-sm">Dirección:</div>
              <div class="q-subheading">
                {{address}}
              </div>
            </q-item-section>
          </q-item>
        </q-list>

      </div>
      <div class="col-md-4 q-pb-xl">

        <q-list class="no-border">
          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="far fa-clock" />
            </q-item-section>
            <q-item-section>
              <div class="q-subheading text-weight-bold q-mb-sm">Horario de atención:</div>
              <div class="q-subheading" v-for="schedule in schedules">
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
  data() {
    return {
      logo : this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path
    }
  }
}
</script>
<style lang="stylus">
</style>
