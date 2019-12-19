<template>
  <div id="pageNotifications"
       class="q-layout-page row layout-padding q-container">
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
</style>
