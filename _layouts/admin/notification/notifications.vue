<template>
  <div id="pageNotifications"
       class=" q-py-xl q-container">

    <div class="row">
      <div class="col-12">
        <div class="text-h5 text-primary q-mb-md font-family-secondary">Notificaciones</div>
      </div>
      <div class="col-12">

        <q-card class="rounded-md bg-white q-mb-xl">

          <q-card-section class="q-pa-lg">


            <ul>
              <li>
                <div class="row q-col-gutter-md items-center">
                  <div class="col text-truncate">
                    <span class="text-primary text-bold ">1. </span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas architecto, temporibus odio provident veniam rem, impedit magni minima doloribus natus repellat dignissimos asperiores similique, enim quae, error aut. Non, quo!
                    </div>
                    <div class="col-auto">
                      <q-btn dense round icon="fas fa-eye" class="q-mr-sm q-pa-xs" size="10px" color="primary" />
                      <q-btn dense round icon="fas fa-trash-alt" class="q-mr-sm q-pa-xs" size="10px" color="primary" />
                    </div>
                </div> 
              </li>
              <li>
                <div class="row q-col-gutter-md items-center">
                  <div class="col text-truncate">
                    <span class="text-primary text-bold ">2. </span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas architecto, temporibus odio provident veniam rem, impedit magni minima doloribus natus repellat dignissimos asperiores similique, enim quae, error aut. Non, quo!
                    </div>
                    <div class="col-auto">
                      <q-btn dense round icon="fas fa-eye" class="q-mr-sm q-pa-xs" size="10px" color="primary" />
                      <q-btn dense round icon="fas fa-trash-alt" class="q-mr-sm q-pa-xs" size="10px" color="primary" />
                    </div>
                </div>  
              </li>
              <li>
                <div class="row q-col-gutter-md items-center">
                  <div class="col text-truncate">
                    <span class="text-primary text-bold ">3. </span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas architecto, temporibus odio provident veniam rem, impedit magni minima doloribus natus repellat dignissimos asperiores similique, enim quae, error aut. Non, quo!
                    </div>
                    <div class="col-auto">
                      <q-btn dense round icon="fas fa-eye" class="q-mr-sm q-pa-xs" size="10px" color="primary" />
                      <q-btn dense round icon="fas fa-trash-alt" class="q-mr-sm q-pa-xs" size="10px" color="primary" />
                    </div>
                </div> 
              </li>
            </ul>

          </q-card-section>
        </q-card>
      </div>
    </div>
 
      
  </div>
</template>
<script>
  export default {
    props: {},
    watch: {},
    mounted() {
      this.$nextTick(function () {
      })
    },
    data() {
      return {
        page: 2,
        loading: false,
        notificationsRead: []
      }
    },
    methods: {
      //Get users with infinite scroll
      getNotifications() {
        return true
      },
      //Redirec to URL from notification
      goToNotificationURL(url) {
        return true
      },
      //Update viewed at from notification
      updateNotification(notification, key) {
        return true
      }
    }
  }
</script>
<style lang="stylus">
  #pageNotifications
    .q-list
      padding 0
    .q-collapsible-sub-item
      background white
      padding 8px 0 8px 35px
      .mesageNotification
        padding 15px

    ul 
      list-style none
      padding-left 0
      li    
        border 1px solid $primary
        padding 20px
        border-radius 10px
        margin-bottom 20px
</style>
