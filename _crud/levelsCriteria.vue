<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qmarketplace.levelCriteria',
          permission: null,
          permission: 'marketplace.levelcriterias',
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
              {
                name: 'levelType', label: "Tipo de nivel", field: 'levelType', align: 'left',
                format: val => (val && val.name) ? val.name : ''
              },
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'},
            ],
            requestParams: {
              include:'levelType'
            },
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
            levelTypeId: {
              value: 0,
              type: 'select',
              loadOptions: {
                apiRoute: 'apiRoutes.qmarketplace.levelType',
                select: {label: 'name', id: 'id'},
                requestParams: {}
              },
              props : {
                label: "Tipo de nivel",
                clearable: true,
                options : [
                  {label: "Seleccione un tipo de nivel", value: 0},
                ],
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
            relationName: {
              value: '',
              type: 'input',
              isTranslatable: false,
              props:{
                label: "Nombre de relación",
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
            operator: {
              props:{
                label: "Operador",
                options: [
                  {label: '<', value: '<'},
                  {label: '<=', value: '<='},
                  {label: '>', value: '>'},
                  {label: '>=', value: '>='},
                  {label: '==', value: '=='},
                ],
              },
              value: 'count',
              type: 'select',
            },
            type: {
              props:{
                label: this.$tr('qsubscription.layout.form.type'),
                options: [
                  {label: this.$tr('qmarketplace.layout.form.types.quantity'), value: 0},
                  {label: this.$tr('qmarketplace.layout.form.types.boolean'), value: 1},
                ],
              },
              value: 0,
              type: 'select',
            },

          },
        }
      }
    }
  }
</script>
