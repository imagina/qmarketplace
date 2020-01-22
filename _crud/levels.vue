<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qmarketplace.level',
          //permission: 'marketplace.levels',
          create: {
            title: this.$tr('qmarketplace.layout.newLevel'),
            to : {
              name : 'qmarketplace.admin.levels.create',
              params : {},
              query : {}
            }
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', align: 'left'},
              {name: 'name', label: this.$tr('ui.form.name'), field: 'name', align: 'left'},
              {
                 name: 'type', label: 'Tipo de nivel', field: 'type', align: 'left',
                 format: val => val=='1' ? 'Tienda' : 'Usuario',
              },
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'},
            ],
            requestParams: {
              include:'levelType'
            },
            filters: {},
          },
          update: {
            to : 'qmarketplace.admin.levels.update'
          },
          delete: true,
          formLeft: {},
        }
      }
    }
  }
</script>
