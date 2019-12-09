<template>
  <q-dialog v-model="openChat" position="bottom" :maximized="maximizedToggle">
    <q-card class="rounded-sm" style="min-width: 300px;">
      <q-bar>
        <div class="cursor-pointer"> <q-icon name="comment" color="green" /> Paula Martinez</div>
        <q-space />
        <q-btn dense flat icon="minimize" />
        <q-btn dense flat icon="crop_square" @click="maximizedToggle = !maximizedToggle" />
        <q-btn dense flat icon="close" v-close-popup />
      </q-bar>
      <q-card-section>
        <q-chat-message
          name="me"
          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
          :text="['hey, how are you?']"
          stamp="7 minutes ago"
          sent
          text-color="white"
          bg-color="blue-10"
        />
        <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar5.jpg"
          :text="['doing fine, how r you?']"
          stamp="4 minutes ago"
          text-color="white"
          bg-color="blue"
        />
        <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar5.jpg"
          text-color="white"
          bg-color="blue"
        >
          <q-spinner-dots size="2rem" />
        </q-chat-message>
      </q-card-section>
      <q-separator />
      <q-card-actions>

        <q-input outlined  class="full-width" bottom-slots v-model="text" counter maxlength="140" dense>
          <template v-slot:before>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar5.jpg">
            </q-avatar>
          </template>

          <template v-slot:append>
            <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
          </template>

          <template v-slot:hint>
            Field hint
          </template>

          <template v-slot:after>
            <q-btn round dense flat icon="send" />
          </template>
        </q-input>

      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: 'ChatComponent',
  props: ['openChat'],
  data(){
    return {
      maximizedToggle: false,
      text: '',
    }
  },
  methods:{

  }
}
</script>
<style lang="stylus">

</style>
