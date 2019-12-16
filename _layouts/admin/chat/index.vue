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
                      <chat></chat>
                      <q-toolbar class="bg-blue-grey-2 q-pr-none" style="border-top-left-radius: 20px;">
                        <q-toolbar-title>
                          <q-icon name="chat_bubble" color="green" /> Paula Martinez
                        </q-toolbar-title>
                      </q-toolbar>

                      <q-card-section class="q-pa-xl">
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

                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 bg-light" style="border-bottom-right-radius: 20px;">
                      <q-toolbar class="bg-grey-9 text-white q-pr-none" style="border-top-right-radius: 20px;">
                        <q-btn flat  icon="fas fa-arrow-left" />
                        <q-toolbar-title>
                          Mensajes directos
                        </q-toolbar-title>
                      </q-toolbar>

                      <q-card-section>
                        
                        <q-input outlined placeholder="Busqueda" bg-color="white" class="full-width q-mb-lg" v-model="text"  dense>
                          <q-btn round color="primary" flat icon="search" />
                        </q-input>

                        <q-list>
                          <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>
                            <q-item-section avatar>
                              <q-avatar color="primary" text-color="white">
                                {{ contact.letter }}
                              </q-avatar>
                            </q-item-section>

                            <q-item-section>
                              <q-item-label>{{ contact.name }}</q-item-label>
                              <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
                            </q-item-section>

                            <q-item-section side>
                              <q-icon name="chat_bubble" color="green" />
                            </q-item-section>
                          </q-item>

                          <q-separator class="q-mt-md" />
                          <q-item-label header>Offline</q-item-label>

                          <q-item v-for="contact in offline" :key="contact.id" class="q-mb-sm" clickable v-ripple>
                            <q-item-section avatar>
                              <q-avatar>
                                <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`">
                              </q-avatar>
                            </q-item-section>

                            <q-item-section>
                              <q-item-label>{{ contact.name }}</q-item-label>
                              <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
                            </q-item-section>

                            <q-item-section side>
                              <q-icon name="chat_bubble" color="grey" />
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
  import { Picker } from 'emoji-mart-vue'
  import Echo from "laravel-echo";
  import Pusher from 'pusher-js';
  import chat from '@imagina/qmarketplace/_components/admin/qchat/chat'
   export default {
      name: "about",
     components:{
     chat,
       Picker,
     },
     data () {
       return {
         tab: 'chats',
         text: '',
         contacts: [{
           id: 1,
           name: 'Ruddy Jedrzej',
           email: 'rjedrzej0@discuz.net',
           letter: 'R'
         }, {
           id: 2,
           name: 'Mallorie Alessandrini',
           email: 'malessandrini1@marketwatch.com',
           letter: 'M'
         }, {
           id: 3,
           name: 'Elisabetta Wicklen',
           email: 'ewicklen2@microsoft.com',
           letter: 'E'
         }, {
           id: 4,
           name: 'Seka Fawdrey',
           email: 'sfawdrey3@wired.com',
           letter: 'S'
         }],
         offline: [{
           id: 5,
           name: 'Brunhilde Panswick',
           email: 'bpanswick4@csmonitor.com',
           avatar: 'avatar2.jpg'
         }, {
           id: 6,
           name: 'Winfield Stapforth',
           email: 'wstapforth5@pcworld.com',
           avatar: 'avatar6.jpg'
         }],
         leftDrawerOpen: false,
         search: '',
         message: '',
         currentConversationIndex: 0,
         conversations: [
           {
             id: 1,
             person: 'Razvan Stoenescu',
             avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
             caption: 'I\'m working on Quasar!',
             time: '15:00',
             sent: true
           },
           {
             id: 2,
             person: 'Dan Popescu',
             avatar: 'https://cdn.quasar.dev/team/dan_popescu.jpg',
             caption: 'I\'m working on Quasar!',
             time: '16:00',
             sent: true
           },
           {
             id: 3,
             person: 'Jeff Galbraith',
             avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
             caption: 'I\'m working on Quasar!',
             time: '18:00',
             sent: true
           },
           {
             id: 4,
             person: 'Allan Gaunt',
             avatar: 'https://cdn.quasar.dev/team/allan_gaunt.png',
             caption: 'I\'m working on Quasar!',
             time: '17:00',
             sent: true
           }
         ],
         echo:null,
         loading: false,
         close:!this.openChat,
         openChat:false,
         minimize:false,
         maximize:false,
         paginate:{
           page: 1,
           take: 20,
           lastPage:0,
         },
         user:this.$store.state.quserAuth.userData,
         conversation: {
           users: [],
           messages: []
         },
         conversationId:null,
         messages: [],
         showEmoji: false,
         maximizedToggle: false,
         text: '',
         form:{
           body: '',
           userId: this.$store.state.quserAuth.userId,
           conversationId:null
         }
       }
     },
     computed: {
       currentConversation () {
         return this.conversations[this.currentConversationIndex]
       },
       style () {
         return {
           height: this.$q.screen.height + 'px'
         }
       },
       storeData(){
         let storeSlug = this.$route.params.slug
         return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
       },
       lastMessage () {
         let lastIndex = this.conversation.messages.length-1
         if ( lastIndex == -1 ){
           return {
             id: null
           }
         }
         return this.conversation.messages[this.conversation.messages.length-1]
       },
     },
     watch:{
       openChat: async function (n) {
         if(this.openChat){
           await this.initconversation ()
           await  this.getConversation(true)
           await  this.getMessagesPaginated(true)
           this.initPusher()
         }
       }
     },
     created() {
       this.messages = []
       if (this.conversationId != null) {
         this.$root.$on("newMessage", message => {
           this.messages.push(message)
         });
       }
     },
     methods:{
       async createMessage(data){
         this.$crud.create('apiRoutes.qchat.messages',data)
                 .then( response => {
                   return response.data
                 })
                 .catch( error => {})
       },
       getConversation(refresh = false){
         this.loading = true
         let params = {
           refresh: refresh,
           params: {
             include: 'messages,users'
           }
         }
         let criteria=this.conversationId;
         this.$crud.show('apiRoutes.qchat.conversations', criteria, params)
                 .then( response => {
                   this.conversation = response.data
                   this.loading = false
                 })
                 .catch( error => {
                   this.loading = false
                 })
       },
       getMessagesPaginated(refresh = false){
         this.loading = true
         let params = {
           refresh: refresh,
           params: {
             filter:{
               conversation: this.conversationId,
               order:{
                 field: 'created_at',
                 way: 'desc'
               }
             },
             page: this.paginate.page,
             take: this.paginate.take,
           }
         }
         this.$crud.index('apiRoutes.qchat.messages', params)
                 .then( response => {
                   //this.messages = response.data.reverse()
                   this.paginate.lastPage = response.meta.page.lastPage
                   response.data.forEach(item => {
                     this.messages.unshift(item)
                   })
                   this.loading = false
                   this.animateScroll()
                 })
                 .catch( error => {
                   this.loading = false
                 })
       },
       loadMoreMessage(){
         if (this.paginate.page < this.paginate.lastPage){
           this.paginate.page++
           this.getMessagesPaginated(true)
         }
       },
       getUrlImg(uri){
         return `${config('apiRoutes.api.base_url')}/${uri}`
       },
       isSendMessage(message){
         return message.userId == this.$store.state.quserAuth.userId ? true : false
       },
       updateConversation() {
         this.loading = true
         let conversationsUsers = this.$store.getters['qchatConversation/getConversationsUsers']
                 .find(item => {
                   return item.conversationId == this.conversationId;
                 })
         let params = {params: {}}
         if (parseInt(conversationsUsers.lastMessageReaded) != null) {
           conversationsUsers.lastMessageReaded = null
           this.$crud.update('apiRoutes.qchat.conversationUser', conversationsUsers.id, conversationsUsers, params)
                   .then(response => {
                     this.loading = false
                   })
                   .catch(error => {
                     this.loading = false
                   })
         }
       },
       sendMessage(){
         if (this.form.body != ''){
           this.form.conversationId=this.conversationId
           this.loading = true
           this.$crud.create('apiRoutes.qchat.messages', this.form)
                   .then( response => {
                     this.form.body = ''
                     this.messages.push(response.data)
                     this.loading = false
                     this.animateScroll()
                   })
                   .catch( error => {
                     this.loading = false
                   })
         }
       },
       onInput( event ){
         if( !event ){
           return false
         }
         if( !this.form.body ){
           this.form.body = event.native
         }else{
           this.form.body = this.form.body + event.native
         }
         this.showEmoji = false
       },
       async initconversation () {
         let conversation = await this.createConversation()
         this.conversationId=conversation.id
       },
       async createConversation(){
         let res
         let form = {
           users: [
             this.$store.state.quserAuth.userId,
             this.storeData.userId,
           ]
         }
         await this.$crud.create('apiRoutes.qchat.conversations',form)
                 .then( response => {
                   res = response.data
                 })
                 .catch( error => {
                   res = null
                 })
         return res
       },
       initPusher(){


         this.echo = new Echo({
           broadcaster: env('BROADCAST_DRIVER', 'pusher'),
           key: env('PUSHER_APP_KEY'),
           cluster: env('PUSHER_APP_CLUSTER'),
           encrypted: env('PUSHER_APP_ENCRYPTED'),
         })
         this.echo.channel('global')
                 .listen(`.notification_${this.$store.state.quserAuth.userData.id}_${this.storeData.userId}`, message => {
                   console.log(message);
                   this.messages.push(message.data)
                   this.animateScroll()
                 })
       },
       closeChat(){
         this.close=!this.close
         this.openChat=!this.openChat
       },
       animateScroll () {
         console.warn('sdafadsadsasddsafsa')
         this.$refs.scrollArea.setScrollPosition(10000000, 300)
       }
     }
   }
</script>
<style lang="stylus">
.page-chat
  .card-border-right
    border-right 2px solid #E1E1E1
</style>