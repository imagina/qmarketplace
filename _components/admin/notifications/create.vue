<template>
   <div>
      <div class="q-pa-md q-gutter-sm">
         <q-btn label="Crear Notificaciòn" color="primary" @click="CreateNotification = !CreateNotification"></q-btn>
      </div>
      <q-dialog v-model="CreateNotification">
         <q-card>
            <q-toolbar>
               <q-avatar icon="far fa-envelope-open" class="text-primary">
               </q-avatar>
               <q-toolbar-title class="text-primary"><span class="text-weight-bold">Crear </span> Notificaciòn</q-toolbar-title>
               <q-btn flat round dense icon="close" v-close-popup></q-btn>
            </q-toolbar>
            <div class="relative-position q-mb-lg backend-page">
               <q-form autocorrect="off" autocomplete="off" ref="formContent" class="box q-mx-md"
                       @submit="createItem()"
                       @validation-error="$alert.error($tr('ui.message.formInvalid'))">
                  <div class="row q-col-gutter-x-md" v-if="success">
                     <!--Language-->
                     <q-card-section>
                        <q-input v-model="form.title" outlined dense
                                 :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                 label="titulo"/>
                        <q-field v-model="form.message" borderless
                                 :rules="[val => !!val || $tr('ui.message.fieldRequired')]">
                           <q-editor v-model="form.message" class="full-width"
                                     :toolbar="editorText.toolbar" content-class="text-grey-9"
                                     toolbar-text-color="grey-9"/>
                        </q-field>
                        <q-select
                                outlined
                                v-model="form.icon"
                                :options="optionsEntity"
                                label="Tipo de Notificacion"
                                option-label="label"
                                dense
                                emit-value
                                map-options
                        />
                        <div class="col">
                           Enviar Notificaciòn a
                        </div>
                        <q-toggle
                                :false-value="true"
                                label="A todos los segidores"
                                :true-value="false"
                                color="red"
                                v-model="followers"
                        />
                        <div v-if="followers">
                           <q-select
                                   filled
                                   v-model="form.person"
                                   multiple
                                   :options="optionsFollowers"
                                   use-chips
                                   stack-label
                                   label="Usuarios"
                                   emit-value
                           ></q-select>
                        </div>
                     </q-card-section>
                  </div>
               </q-form>
            </div>
         </q-card>
      </q-dialog>
   </div>
</template>

<script>
   export default {
      name: 'create-notification',
      data() {
         return {
            loading: false,
            CreateNotification: false,
            success: true,
            editorText: {
               toolbar: [
                  ['bold', 'italic', 'strike', 'underline', 'removeFormat'],
                  ['link'],
                  [
                     {
                        label: 'Font Size',
                        icon: 'format_size',
                        fixedLabel: true,
                        fixedIcon: true,
                        list: 'no-icons',
                        options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
                     }
                  ],
                  ['quote', 'unordered', 'ordered'],
                  ['fullscreen']
               ]
            },
            followers: true,
            form: {
               title: null,
               message: null,
               icon: null,
               person: []
            },
            optionsEntity: [
               {label: 'Notification', value: 'far fa-bell'},
               {label: 'Noticia', value: 'far fa-newspaper'},
               {label: 'Promociòn', value: 'fas fa-percent'},
               {label: 'Cupon de descuento', value: 'fas fa-tag'}
            ],
            optionsFollowers: []
         }
      },
      methods: {
         createItem() {
            this.loading = true
            this.$crud.create("apiRoutes.notification.notifications", this.getDataForm()).then(response => {
               this.$alert.success({ message: `${this.$tr('ui.message.recordCreated')} ID: ${response.data.id}` })
               this.actionAfterCreated(response.data.id)
            }).catch(error => {
               this.loading = false
               this.$alert.error({ message: this.$tr('ui.message.recordNoCreatde'), pos: 'bottom' })
            })
         },
         clearForm() {
            this.form.comment = ''
            this.form.status = null
         },
         getFollowers() {
            //Params
            let params = {
               refresh: true,
               params: {
                  include: 'user',
                  filter: {storeId: this.storeId},
                  take: 10
               }
            }

            this.$crud.index("apiRoutes.qmarketplace.favoriteStore", params).then(response => {
               this.optionsFollowers = this.$array.select(response.data,{label: 'fullName', id: 'id'})

            }).catch(error => {
               console.error("ERROR - GET USERS FROM FAVORITE STORES")
               this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})

            })
         }
      }
   }
</script>
