<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qmarketplace.level',
          permission: 'marketplace.levels',
          create: {
            title: this.$tr('qmarketplace.layout.newLevel'),
            // to : {
            //   name : 'qmarketplace.admin.coupons.create',
            //   params : {},
            //   query : {}
            // }
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', align: 'left'},
              {name: 'name', label: this.$tr('ui.form.name'), field: 'name', align: 'left'},
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'},
            ],
            requestParams: {},
            filters: {},
          },
          update: {
            // to : 'qmarketplace.admin.coupons.edit'
          },
          delete: true,
          formLeft: {},
        }
      }
    }
  }
</script>
