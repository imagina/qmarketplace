<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qmarketplace.levelType',
          permission: 'marketplace.leveltypes',
          create: {
            title: this.$tr('qmarketplace.layout.newLevelType'),
            // to : {
            //   name : 'qmarketplace.admin.levels.create',
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
            // to : 'qmarketplace.admin.levels.update'
          },
          delete: true,
          formLeft: {
            name: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props:{
                label: this.$tr('ui.form.name'),
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
            entityNamespace: {
              value: '',
              type: 'input',
              isTranslatable: false,
              props:{
                label: "Entity namespace",
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },

          },
        }
      }
    }
  }
</script>
