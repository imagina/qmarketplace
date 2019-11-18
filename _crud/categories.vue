<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qmarketplace.category',
          // permission: 'icommerce.products',
          create: {
            title: this.$tr('qmarketplace.layout.newCategory'),
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'name', label: this.$tr('ui.form.name'), field: 'title', style: 'width: 50px', align: 'rigth'},
              {
                name: 'createdAt', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
            ],
            requestParams: {
              include: '',
              filter:{
                allTranslations: true,
              }
            },
            filters: {}
          },
          update: {
            title: this.$tr('qmarketplace.layout.editCategory'),
          },
          delete: true,
          formLeft: {
            title: {
              label: this.$tr('ui.form.name'),
              value: '',
              type: 'text',
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
              isTranslatable: true,
            },
            slug: {
              label: this.$tr('ui.form.slug'),
              value: '',
              type: 'text',
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
              isTranslatable: true,
            },
            description: {
              label: this.$tr('ui.form.description'),
              value: '',
              type: 'html',
              isRequired: false,
              isTranslatable: true,
            },
            mediasSingle: {
              name: 'mediasSingle',
              label: this.$tr('ui.form.firstImage'),
              value: {},
              type: 'media',
              zone: 'mainimage',
              entity: "Modules\\Marketplace\\Entities\\CategoryStore",
              entityId: null
            },
          },
        }
      }
    }
  }
</script>
