<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qmarketplace.store',
          // permission: 'icommerce.products',
          create: {
            title: this.$tr('qmarketplace.layout.newStore'),
            to : 'qmarketplace.admin.stores.create'
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'name', label: this.$tr('ui.form.title'), field: 'name', style: 'width: 50px', align: 'rigth'},
              {
                name: 'createdAt', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
            ],
            requestParams: {
              include: 'categories',
              filter:{
                allTranslations: true,
                userId:this.userId,
              }
            },
            filters: {

            },
          },
          update: {
            title: this.$tr('qmarketplace.layout.editStore'),
            to : 'qmarketplace.admin.stores.edit'
          },
          delete: true,
          formLeft: {

          },
        }
      }
    }
  }
</script>
