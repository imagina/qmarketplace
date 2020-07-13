<template></template>
<script>
   export default {
      computed: {
         crudData() {
            return {
               crudId: this.crudId,
               apiRoute: 'apiRoutes.qquiz.questions',
               permission: 'marketplace.questions',
               create: {
                  title: this.$tr('qquiz.layout.newQuestion'),
                  to: {
                      name: 'qmarketplace.admin.questions.create',
                      params:{
                          pollId: this.$route.params.id
                      }
                  }
               },
               read: {
                  columns: [
                     {
                        name: 'id',
                        label: this.$tr('ui.form.id'),
                        field: 'id',
                        align: 'left',
                        style: 'width: 10%',
                     },
                     {
                        name: 'title',
                        label: this.$tr('ui.form.title'),
                        field: 'title',
                        align: 'left',
                        style: 'width: 50%',
                     },
                     {
                        name: 'created_at',
                        label: this.$tr('ui.form.createdAt'),
                        field: 'createdAt',
                        align: 'left',
                        format: val => val ? this.$trd(val) : '-',
                        style: 'width: 20%',
                     },
                     {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right', style: 'width: 20%',},
                  ],
                  requestParams: {
                     filter: {pollId: this.$route.params.id}
                  },
                  filters: {},
               },
               update: {
                  requestParams: {filter: {pollId: this.$route.params.id}},
                  to: 'qmarketplace.admin.questions.edit'
               },
               delete: true,
               formLeft: {
                  pollId: {value: this.$route.params.id},
                  title: {
                     value: null,
                     type: 'input',
                     isTranslatable: true,
                     props: {
                        label: `${this.$tr('ui.form.title')} *`,
                        rules: [
                           val => !!val || this.$tr('ui.message.fieldRequired')
                        ]
                     }
                  },
               },
               formRight: {
                  status: {
                     value: 0,
                     type: 'select',
                     props: {
                        label: `${this.$tr('ui.form.status')}:`,
                        rules: [
                           val => !!val || this.$tr('ui.message.fieldRequired')
                        ],
                        options: [
                           {label: this.$tr('ui.label.enabled'), value: '1'},
                           {label: this.$tr('ui.label.disabled'), value: '0'},
                        ],
                     },

                  },
                  startDate: {
                     value: '',
                     type: 'date',
                     props: {
                        label: this.$tr('qquiz.layout.form.startDate'),
                     }
                  },
                  endDate: {
                     label: this.$tr('qquiz.layout.form.endDate'),
                     value: '',
                     type: 'date',
                     props: {
                        label: this.$tr('qquiz.layout.form.endDate'),
                     }
                  },
               },
            }
         },
         crudInfo() {
            return this.$store.state.qcrudComponent.component[this.crudId] || {}
         }
      }

   }
</script>
