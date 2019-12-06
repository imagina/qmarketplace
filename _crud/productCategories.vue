<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qcommerce.categories',
          permission: 'icommerce.categories',
          create: {
            title: this.$tr('qcommerce.layout.newCategory'),
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'name', label: this.$tr('ui.form.title'), field: 'title', align: 'left'},
              {name: 'slug', label: 'url amigable', field: 'slug', align: 'left'},
              {
                name: 'parent', label: 'Categoría padre', field: 'parent', align: 'left',
                format: val => val ? (val.title ? val.title : '-') : '-'
              },
              {
                name: 'created_at', label: 'Fecha Creación', field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
            ],
            requestParams: {
              include: 'parent',
              filter:{
                store: this.$store.state.qmarketplaceStores.storeSelected
              }
            }
          },
          update: {
            title: this.$tr('qcommerce.layout.updateCategory'),
            requestParams: {include: 'parent'}
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            storeId: {value: this.$store.state.qmarketplaceStores.storeSelected},
            userId: {value: this.$store.state.quserAuth.userId},
            title: {
              label: this.$tr('ui.form.title'),
              value: '',
              type: 'text',
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
              isTranslatable: true,
            },
            mediasSingle: {
              name: 'mediasSingle',
              label: this.$tr('ui.form.firstImage'),
              value: {},
              type: 'media',
              zone: 'mainimage',
              entity: "Modules\\Icommerce\\Entities\\Category",
              entityId: null
            },
            description: {
              label: this.$tr('ui.form.description'),
              value: '',
              type: 'html',
              isRequired: false,
              isTranslatable: true,
            },
            slug: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props : {
                label: `${this.$tr('ui.form.slug')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
            parentId: {
              value: '0',
              type: 'select',
              loadOptions: {
                apiRoute: 'apiRoutes.qcommerce.categories',
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
            metaTitle: {
              value: '',
              type: 'input',
              isTranslatable: true,
              label: this.$tr('ui.form.metaTitle'),
            },
            metaDescription: {
              value: '',
              type: 'input',
              isTranslatable: true,
              label: this.$tr('ui.form.metaDescription'),
            },

          },
          formRight: {
            showMenu: {
              value: false,
              type: 'checkbox',
              label: this.$tr('qcommerce.layout.form.showInMenu'),
            },
            // masterRecord : {
            //   value: '0',
            //   isFakeField : true,
            //   type: 'select',
            //   label: this.$tr('ui.form.masterRecord'),
            //   options: [
            //     {label: this.$tr('ui.label.yes'), value: '1'},
            //     {label: this.$tr('ui.label.no'), value: '0'},
            //   ]
            // },



          },
        }
      },

    }
  }
</script>
