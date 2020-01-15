<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qmarketplace.levelCriteria',
          permission: null,
          // permission: 'marketplace.levelcriterias',
          create: {
            title: this.$tr('qmarketplace.layout.newLevelCriteria'),
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
            title: this.$tr('qmarketplace.layout.updateLevelCriteria'),
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
            type: {
              props:{
                label: this.$tr('qsubscription.layout.form.type'),
                options: [
                  {label: this.$tr('qmarketplace.layout.form.types.quantity'), value: 0},
                  {label: this.$tr('qmarketplace.layout.form.types.text'), value: 1},
                  {label: this.$tr('qmarketplace.layout.form.types.boolean'), value: 2},
                ],
              },
              value: 1,
              type: 'select',
            },

          },
        }
      }
    }
  }
</script>
