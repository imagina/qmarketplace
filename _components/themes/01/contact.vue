<template>
  <div class="q-container">
    <div class="row q-col-gutter-lg items-center q-pt-xl">
      <div class="col-md-4 q-pb-xl">

        <q-list >
          <q-item>
            <q-item-section avatar class="q-mr-md">
              <q-icon color="primary"  size="lg" name="fas fa-map-marker-alt" />
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

        <q-list>
          <q-item>
            <q-item-section avatar class="q-mr-md">
              <q-icon color="primary"  size="lg" name="far fa-clock" />
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
      <div class="col-md-4 q-pb-xl">

        <q-list  class="q-mr-md">
          <q-item>
            <q-item-section avatar class="q-mr-md">
              <q-icon color="primary" size="lg" name="far fa-comment-dots" />
            </q-item-section>
            <q-item-section>
              <div class="q-subheading text-weight-bold q-mb-sm">¿Tienes alguna duda?</div>
              <div class="q-subheading">Chatea aquí con la Tienda</div>
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
}
</script>
<style lang="stylus">
</style>
