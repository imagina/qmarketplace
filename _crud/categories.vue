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
            }
          },
           formRight: {
              parentId: {
                 value: '0',
                 type: 'select',
                 loadOptions: {
                    apiRoute: 'apiRoutes.qmarketplace.category',
                    select: {label: 'title', id: 'id'},
                    requestParams: {
                       include: 'parent',
                       filter:{
                          store: this.$store.state.qmarketplaceStores.storeSelected
                       }
                    }
                 },
                 label: this.$tr('ui.form.parent'),
                 props : {
                    clearable: true,
                    options : [
                       {label: this.$tr('ui.label.disabled'), value: 0},
                    ],
                 }
              },
              icon: {
                 label: 'Icon',
                 value: '',
                 type: 'text',
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
