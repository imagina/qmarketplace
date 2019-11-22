<template>
  <q-list class="q-mb-lg border-0">
    <q-item class="bg-secondary text-white rounded-sm q-mb-sm text-center">
      <q-item-section avatar>
        <q-icon color="white" name="share" />
      </q-item-section>
      <q-item-section class="q-py-md">COMPARTIR</q-item-section>
    </q-item>
    <div v-for="soc in social" v-if="soc.active">
      <q-item clickable>
        <q-item-section avatar>
          <q-icon color="primary" :name="soc.icon" />
        </q-item-section class="q-py-md">
        <q-item-section class="q-py-md">{{soc.name}}</q-item-section>
        <q-tooltip>
          {{soc.url}}
        </q-tooltip>
      </q-item>
      <q-separator />
    </div>
    <!-- <q-item clickable>
      <q-item-section avatar>
        <q-icon color="primary" name="fab fa-twitter" />
      </q-item-section>
      <q-item-section class="q-py-md">Twitter</q-item-section>
    </q-item>
    <q-separator />
    <q-item clickable>
      <q-item-section avatar>
        <q-icon color="primary" name="fab fa-instagram" />
      </q-item-section>
      <q-item-section class="q-py-md">Instagram</q-item-section>
    </q-item>
    <q-separator /> -->
  </q-list>
</template>
<script>
export default {
  name: 'ShareNetworksComponent',
  props: {
    'social'              : { type:Array, default: []},
  },
}
</script>
