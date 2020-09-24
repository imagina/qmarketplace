<template>
  <div class="q-inline-block widget-notification">

    <q-btn-dropdown v-model="opened" class="desktop-only">
      <template v-slot:label>
        <div class="row items-center no-wrap">
          <q-icon left name="fas fa-bell"></q-icon>
        </div>
        <q-badge color="orange" floating v-if="notifications">{{ notifications }}</q-badge>
      </template>
      <q-list class="bg-light" v-if="notifications">
        <!--  :to="{name: 'user.profile.me'}" -->
        <!--<div v-if="notifications">-->
        <q-item clickable v-ripple v-for="item in notificationData" :key="item.id"
                @click="linkNotification(item.link,item.id)">
          <q-item-section class="q-py-md col-12">
            <div class="row q-col-gutter-sm">
              <div class="col-3">
                <q-avatar color="red" text-color="white" :icon="item.icon"/>
              </div>
              <div class="col-7">
                <div class="row"><span class="text-primary text-bold ">{{ item.title }}</span></div>
                <div class="row">{{ item.timeAgo }}</div>
              </div>
              <div class="col-2">
                <q-btn v-if="!item.isRead" dense round icon="fas fa-eye" class="q-mr-sm q-pa-xs"
                       size="10px" color="primary" @click="updateNotification(item.id)"/>
              </div>
            </div>
          </q-item-section>
          <q-separator/>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="text-center q-py-md">
              <q-btn class="rounded-sm  font-family-secondary" no-caps color="primary"
                     :to="{name:'qmarketplace.admin.notifications.index'}">Ir a Notificaciones
              </q-btn>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
      <q-list class="bg-light" v-else>
        <!--</div>-->
        <!--<div v-else>-->
        <q-item v-ripple>
          <q-item-section avatar>
            <q-avatar color="red" text-color="white" icon="far fa-times-circle"/>
          </q-item-section>
          <q-item-section class="q-py-md">
            <span class="text-primary text-bold ">No tiene Notificaciones</span>
          </q-item-section>
        </q-item>
        <!--</div>-->
      </q-list>
    </q-btn-dropdown>
    <q-btn class="q-ml-sm mobile-only" @click="showDialog = true">
      <q-icon left name="fas fa-bell"></q-icon>
      <q-badge color="orange" floating v-if="notifications">{{ notifications }}</q-badge>
    </q-btn>
    <q-dialog ref="dialog" v-model="showDialog">
      <q-card class="notify-dialog">
        <q-toolbar>
          <q-toolbar-title>Notificaciones</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup/>
        </q-toolbar>
        <q-card-section>
          <div id="notification-logs">
          </div>
          <q-list class="bg-light" v-if="notifications">
            <!--  :to="{name: 'user.profile.me'}" -->
            <!--<div v-if="notifications">-->
            <q-item clickable v-ripple v-for="item in notificationData" :key="item.id"
                    @click="linkNotification(item.link,item.id)">
              <q-item-section class="q-py-md col-12">
                <div class="row q-col-gutter-sm">
                  <div class="col-3">
                    <q-avatar color="red" text-color="white" :icon="item.icon"/>
                  </div>
                  <div class="col-7">
                    <div class="row"><span class="text-primary text-bold ">{{ item.tite }}</span></div>
                    <div class="row">{{ item.timeAgo }}</div>
                  </div>
                  <div class="col-2">
                    <q-btn v-if="!item.isRead" dense round icon="fas fa-eye" class="q-mr-sm q-pa-xs"
                           size="10px" color="primary" @click="updateNotification(item.id)"/>
                  </div>
                </div>
              </q-item-section>
              <q-separator/>
            </q-item>
            <q-item>
              <q-item-section>
                <div class="text-center q-py-md">
                  <q-btn class="rounded-sm  font-family-secondary" no-caps color="primary"
                         :to="{name:'qmarketplace.admin.notifications.index'}">Ir a Notificaciones
                  </q-btn>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
          <q-list class="bg-light" v-else>
            <!--</div>-->
            <!--<div v-else>-->
            <q-item v-ripple>
              <q-item-section avatar>
                <q-avatar color="red" text-color="white" icon="far fa-times-circle"/>
              </q-item-section>
              <q-item-section class="q-py-md">
                <span class="text-primary text-bold ">No tiene Notificaciones</span>
              </q-item-section>
            </q-item>
            <!--</div>-->
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>


<script>
   import Echo from "laravel-echo";
   export default {
      props: {},
      components: {},
      watch: {},
      computed:{
         focusWindow(){
            window.onfocus = function() {
               this.focused = true;
            };
            window.onblur = function() {
               this.focused = false;
            };
            return this.focused
         }
      },
      mounted() {
         this.$nextTick(function () {

            this.checkPermissionForNotification()
            if(this.$store.state.quserAuth.userData.id){
               this.getNotifications()
               this.initPusher()
            }


         })
      },
      data() {
         return {
            notificationData: false,
            opened: false,
            notifications: 0,
            focused: true,
            token:null,
            showDialog: false,
         }
      },
      methods: {
         getNotifications() {
            let params = {
               remember: false,
               params: {
                  include: '',
                  filter: {
                     me: true,
                     //read: false,
                  },
                  take: 5,
                  page: 1
               }
            };//params
            this.loading = true
            this.$crud.index("apiRoutes.qnotification.notifications", params).then(response => {
               //this.notifications = response.meta.page.total;
               let quantityNoti=0;
               for (let i in response.data){
                if(!response.data[i].isRead){
                  quantityNoti++;
                }
               }
               if (quantityNoti > 99) {
                  this.notifications = 99
               }else{
                  this.notifications=quantityNoti;
               }
               this.notificationData = response.data

            }).catch(error => {
               console.error('GET NOTIFICATIONS', error)
               //this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
               this.loading = false
            })
         },
         updateNotification(key) {
            this.loading = true
            let data = {
               isRead: true
            }
            this.$crud.update('apiRoutes.qnotification.notifications', key, data).then(response => {
            /*   this.$q.dialog({
                  title: 'Notificacion marcada como Leida!',
                  color: 'positive',
               }).onOk(() => {
                  this.getNotifications()
                  this.loading = false
               })*/
               this.getNotifications()
               this.loading = false
            }).catch(error => {
               this.loading = false
               this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
            })
         },
         initPusher() {
            this.echo = new Echo({
               broadcaster: env('BROADCAST_DRIVER', 'pusher'),
               key: env('PUSHER_APP_KEY'),
               cluster: env('PUSHER_APP_CLUSTER'),
               encrypted: env('PUSHER_APP_ENCRYPTED'),
            })
            this.echo.channel('imagina.notifications')
                .listen(`.notification.new.${this.$store.state.quserAuth.userData.id}`, response => {
                   this.getNotifications()
                   this.showPushNotitication(response)
                })
            if(this.$q.platform.is.cordova){
               FCMPlugin.subscribeToTopic(`notification.new.${this.$store.state.quserAuth.userData.id}`);

               cordova.plugins.firebase.analytics.setCurrentScreen(this.$store.state.quserAuth.userData.fullName);
            }

    },
    redirect(url, id) {
      let base = this.$route
      let uri = window.location.href + '/#' + url
    },
    linkNotification(url, id) {
      this.updateNotification(id);
      this.getNotifications()
      this.$router.push(url)
    },
    checkPermissionForNotification() {
      window.Notification.requestPermission().then(response => {
        if (response === 'granted') {
          this.permissionForNotification = true
        }
      })
    },
    showPushNotitication(data) {
      if (this.permissionForNotification && this.focused) {
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification(data.title, {
            body: data.message,
            icon: this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path,
            data: '/#' + data.link
          })
        }).catch(error => {
          console.error(error)
        });
      }
    },

      }
   }
</script>
<style lang="stylus">
.widget-notification
  .q-btn-dropdown__arrow
    display none !important
    margin-left 0

  .q-btn__wrapper
    padding-left: 0;

    &:before
      box-shadow none

.notify-dialog
  width: 95%
  @media (min-width: $breakpoint-md)
    width: 50%
</style>
