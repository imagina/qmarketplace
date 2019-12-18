<template>
   <div style="display: inline-block">
      <q-btn @click="openNotification = !openNotification" color="primary"
             class="q-mx-sm">enviar Votificacion
      </q-btn>
      <q-dialog v-model="openNotification" >
         <q-card class="topWidgetHomeMobile q-pa-lg" style="height:500px;">
            <q-toolbar>
               <q-btn flat v-close-popup color="primary" round dense icon="fas fa-arrow-left"/>
               <q-toolbar-title class="text-primary font-family-secondary">Enviar Mensajes</q-toolbar-title>
            </q-toolbar>

         </q-card>
      </q-dialog>
      
   </div>
</template>
<script>
   import {Picker} from 'emoji-mart-vue'
   import Echo from "laravel-echo";
   import Pusher from 'pusher-js';

   export default {
      name: 'ChatComponent',
      components: {
         Picker,
      },
      props: ['userSelect'],
      data() {
         return {
            loading: false,

            openNotification: false,
            user: this.$store.state.quserAuth.userData,
            messages: [],
            text: '',
         }
      },
      methods: {
         sendMessage() {
            if (this.form.body != '') {
               this.form.conversationId = this.conversationId
               this.loading = true
               this.$crud.create('apiRoutes.qchat.messages', this.form)
                   .then(response => {
                      this.form.body = ''
                      this.messages.push(response.data)
                      this.loading = false
                      this.animateScroll()
                   })
                   .catch(error => {
                      this.loading = false
                   })
            }
         },
      }
   }
</script>
<style lang="stylus">
   #qchat

      display block
      width: 350px
      z-index: 999999 !important;
      height: 413px
      border-radius: 10px 10px 0 0 !important;

      .q-bar
         background $storePrimary
         height 60px

         .cursor-pointer
            .q-icon
               color $storeSecondary

      .q-avatar
         position: relative
         vertical-align: middle
         display: inline-block
         border-radius: 50%
         font-size: 48px
         height: 45px
         width: 45px

      .messageSend
         border-radius inherit

   .minimizeChat
      height 60px !important

      .q-card__section, .q-card__actions
         display none

   .closeChat
      display none !important
</style>
