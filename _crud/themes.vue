<template></template>
<script>
   export default {
      computed: {
         crudData() {
            return {
               apiRoute: 'apiRoutes.qmarketplace.theme',
               // permission: 'icommerce.products',
               create: {
                  title: this.$tr('qmarketplace.layout.newTheme'),
               },
               read: {
                  columns: [
                     {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
                     {
                        name: 'name',
                        label: this.$tr('ui.form.name'),
                        field: 'name',
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
                  title: this.$tr('qmarketplace.layout.editTheme'),
               },
               delete: true,
               formLeft: {
                  name: {
                     props: {
                        label: this.$tr('ui.form.name'),
                        rules: [
                           val => !!val || this.$tr('ui.message.fieldRequired')
                        ],

                     },
                     value: '',
                     type: 'input',
                     isTranslatable: true,
                  },
                  description: {
                     props: {
                        label: this.$tr('ui.form.description'),
                     },
                     value: '',
                     type: 'html',
                     isTranslatable: true,
                  },
                  mediasSingle: {
                     name: 'mediasSingle',
                     value: {},
                     type: 'media',
                     props: {
                        label: this.$tr('ui.form.firstImage'),
                        zone: 'mainimage',
                        entity: "Modules\\Marketplace\\Entities\\Themes",
                        enitityId: null
                     }
                  },
               },
               formRight: {
                  type: {
                     value: [],
                     type: 'select',
                     label: this.$tr('ui.form.type'),
                     options: [
                        {label: this.$tr('ui.form.publish'), value: '2'},
                        {label: this.$tr('ui.form.noPublish'), value: '3'},
                        {label: this.$tr('ui.form.draft'), value: '0'},
                        {label: this.$tr('ui.form.pending'), value: '1'}
                     ]
                  },
               },
            }
         }
      }
   }
</script>
