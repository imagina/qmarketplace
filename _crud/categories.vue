<template></template>
<script>
   export default {
      data() {
         return {
            crudId: this.$uid()
         }
      },
      computed: {
         crudData() {
            return {
               crudId: this.crudId,
               apiRoute: 'apiRoutes.qmarketplace.category',
               permission: 'marketplace.categorystores',
               create: {
                  title: this.$tr('qmarketplace.layout.newCategory'),
               },
               read: {
                  columns: [
                     {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
                     {
                        name: 'name',
                        label: this.$tr('ui.form.name'),
                        field: 'title',
                        style: 'width: 50px',
                        align: 'rigth'
                     },
                     {
                        name: 'createdAt', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
                        format: val => val ? this.$trd(val) : '-',
                     },
                     {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
                  ],
                  requestParams: {
                     include: '',
                     filter: {
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
                     value: null,
                     type: 'input',
                     isTranslatable: true,
                     props: {
                        label: `${this.$tr('ui.form.name')} *`,
                        rules: [
                           val => !!val || this.$tr('ui.message.fieldRequired')
                        ]
                     }

                  },
                  slug: {
                     value: '',
                     type: 'input',
                     isTranslatable: true,
                     props: {
                        label: `${this.$tr('ui.form.slug')}*`,
                        //vIf: (this.crudInfo.typeForm == 'update'),
                        rules: [
                           val => !!val || this.$tr('ui.message.fieldRequired')
                        ],
                     },
                  },
                  description: {
                     value: '',
                     type: 'html',
                     isTranslatable: true,
                     props: {
                        label: `${this.$tr('ui.form.description')}*`,
                        rules: [
                           val => !!val || this.$tr('ui.message.fieldRequired')
                        ],
                     }
                  },
               },
               formRight: {
                  parentId: {
                     value: 0,
                     type: 'select',
                     props: {
                        label: this.$tr('ui.form.parent'),
                        options: [
                           {label: this.$tr('ui.label.disabled'), value: 0},
                        ],
                        loadOptions: {
                           apiRoute: 'apiRoutes.qmarketplace.category',
                           select: {label: 'title', id: 'id'},
                           requestParams: {include: 'parent'}
                        }
                     },
                  },
                  icon: {
                     value: '',
                     type: 'input',
                     props: {
                        label: 'Icon',
                     }
                  },
                  mediasSingle: {
                     name: 'mediasSingle',
                     value: {},
                     type: 'media',
                     props: {
                        label: this.$tr('ui.form.firstImage'),
                        zone: 'mainimage',
                        entity: "Modules\\Marketplace\\Entities\\CategoryStore",
                        enitityId: null
                     }
                  },
               },
            }
         },
         //Crud info
         crudInfo() {
            return this.$store.state.qcrudComponent.component[this.crudId] || {}
         }
      }
  }
</script>
