<template>
   <q-page class="bg-fondo page-chat">
      <div class="q-py-xl">
         <div class="q-container">
            <div class="row">
               <div class="col-12">
                  <div class="text-h5 text-primary q-mb-xs font-family-secondary">Chat</div>
               </div>
               <div class="col-12">
                  <q-card class="rounded-md bg-white full-width q-my-xl">

                     <div class="row gutter-md justify-center">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 card-border-right">
                           <chat :conversation-id="conversationId" v-if="conversationId!=null"></chat>
                           <q-card id="qchat" v-else>
                              <q-bar>
                                 <div class="cursor-pointer">
                                    <q-avatar>
                                       <img :src="$store.getters['qsiteSettings/getSettingMediaByName']('isite::favicon').path"
                                            alt="">
                                    </q-avatar>

                                 </div>
                              </q-bar>
                              <q-card-section class="q-gutter-md row items-center" style="height: 550px">
                                 <img :src="$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path"
                                      style="max-width: 150px; margin: auto"/>
                              </q-card-section>
                           </q-card>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 bg-light"
                             style="border-bottom-right-radius: 20px;">
                           <q-toolbar class="bg-grey-9 text-white q-pr-none" style="border-top-right-radius: 20px;">
                              <q-btn flat icon="fas fa-arrow-left"/>
                              <q-toolbar-title>
                                 Mensajes directos
                              </q-toolbar-title>
                           </q-toolbar>
                           <q-card-section class="userMessages">
                              <q-input @input="search" outlined placeholder="Busqueda" bg-color="white"
                                       class="full-width q-mb-lg"
                                       v-model="text" dense>
                                 <q-btn round color="primary" flat icon="search"/>
                              </q-input>

                              <q-list>
                                 <q-item @click="conversationId=conversation.id" v-for="conversation in table.data"
                                         :key="conversation.id" class="q-my-sm"
                                         clickable v-ripple>

                                    <q-item-section avatar>
                                       <q-avatar color="primary" text-color="white">
                                          <img :src="conversation.user.smallImage">
                                       </q-avatar>
                                    </q-item-section>

                                    <q-item-section>
                                       <q-item-label>{{ conversation.user.fullName }}</q-item-label>
                                       <q-item-label caption lines="1">{{ conversation.user.email }}</q-item-label>
                                    </q-item-section>

                                    <q-item-section side>
                                       <q-icon name="chat_bubble" :class="`newMessage${conversation.id}`" color="grey"/>
                                    </q-item-section>

                                 </q-item>

                              </q-list>


                           </q-card-section>

                        </div>
                     </div>

                  </q-card>


               </div>

            </div>
         </div>
      </div>
   </q-page>
</template>

<script>
   import {Picker} from 'emoji-mart-vue'
   import Echo from "laravel-echo";
   import Pusher from 'pusher-js';
   import chat from '@imagina/qmarketplace/_components/admin/qchat/chat'

   export default {
      name: "about",
      components: {
         chat,
         Picker,
      },
      data() {
         return {
            tab: 'chats',
            text: '',
            contacts: [],
            leftDrawerOpen: false,
            currentConversationIndex: 0,
            echo: null,
            loading: false,
            user: this.$store.state.quserAuth.userData,
            conversationId: null,
            messages: [],
            newMessage: 'green',
            table: {
               data: [],
               pagination: {
                  page: 1,
                  rowsNumber: '',
                  rowsPerPage: 50
               },
               filter: {
                  search: null
               }
            },
         }
      },
      created() {
         this.$nextTick(function () {
            this.getDataTable()
            this.initPusher()
         })
      },
      methods: {
         getDataTable(refresh = false) {
            this.getData({pagination: this.table.pagination}, refresh)
         },
         getData({pagination, filter}, refresh = false) {
            this.loading = true
            //Params to request
            let params = {
               refresh: refresh,
               params: {
                  filter: {between: [this.$store.state.quserAuth.userId]},
                  include: 'users'
               }
            }
            //Request
            this.$crud.index('apiRoutes.qchat.conversations', params)
                .then(response => {
                   this.table.data = response.data.map(item => {
                      return {
                         id: item.id,
                         user: item.users.find(user => user.id !== this.$store.state.quserAuth.userId)
                      }

                   })
                   this.loading = false
                })
                .catch(error => {
                   this.loading = false
                })
         },
         initPusher() {
            this.echo = new Echo({
               broadcaster: env('BROADCAST_DRIVER', 'pusher'),
               key: env('PUSHER_APP_KEY'),
               cluster: env('PUSHER_APP_CLUSTER'),
               encrypted: env('PUSHER_APP_ENCRYPTED'),
            })
            this.echo.channel('global')
                .listen(`.conversationsUserUpdated${this.$store.state.quserAuth.userData.id}`, response => {
                   this.getDataTable(true)
                   console.warn(response.message.conversationId)
                })
         },

      }
   }
</script>
<style lang="stylus">
   .page-chat
      .card-border-right
         border-right 2px solid #E1E1E1

      .userMessages
         .q-item
            margin 5px 0
            padding 10px 10px
</style>