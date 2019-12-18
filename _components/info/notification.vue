<template>
   <div style="display: inline-block">
      <q-btn @click="openNotification = !openNotification" color="primary"
             class="q-mx-sm">Enviar Notificacion
      </q-btn>
      <q-dialog v-model="openNotification">
         <q-card class="q-pa-lg bg-fondo" style="height: 80vh; max-width: 450px; width: 100% ">
            <q-toolbar>
               <q-btn flat v-close-popup color="primary" round dense icon="fas fa-arrow-left"/>
               <q-toolbar-title class="text-primary font-family-secondary">Enviar Notificacion</q-toolbar-title>
            </q-toolbar>
            <q-form @submit="sendMessage" ref="formRegister" class="box relative-position bg-white q-mt-md" autocomplete="off" style="border-radius: 20px"
                    @validation-error="$alert.error($tr('ui.message.formInvalid'))">
               <q-card-section class="q-pa-lg">
                  <q-input v-model="form.title" color="primary"  outlined placeholder="Asunto*"
                           :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
               </q-card-section>
               <q-card-section class="q-pa-lg">
                  <q-input v-model="form.caption" color="primary"  outlined placeholder="Mensaje*"
                           :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
               </q-card-section>
               <q-card-section class="q-pa-lg">
                  <q-input v-model="form.link" color="primary"  outlined placeholder="Enlace"/>
               </q-card-section>
               <q-card-section class="q-pa-lg text-right">
                  <q-btn :loading="loading" class="bg-primary text-white btn-arrow-send-pink"
                         color="primary" label="enviar" type="submit"
                  />
               </q-card-section>
            </q-form>
         </q-card>
      </q-dialog>

   </div>
</template>
<script>

   export default {
      name: 'ChatComponent',
      props: ['userSelect'],
      data() {
         return {
            loading: false,
            openNotification: false,
            user: this.$store.state.quserAuth.userData,
            form: {
               title: null,
               caption: null,
               entity: 'far fa-bell',
               userId: this.userSelect.id,
               link:null
            },
            text: '',
         }
      },
      methods: {
         sendMessage() {

            this.form.conversationId = this.conversationId
            this.loading = true
            this.$crud.create('apiRoutes.qnotification.notifications', this.form)
                .then(response => {
                   this.$alert.success({message: `${this.$tr('ui.message.recordCreated')}`})
                   this.loading = false
                   this.openNotification=!this.openNotification
                   this.form= {
                      title: null,
                          caption: null,
                          entity: 'far fa-bell',
                          userId: this.userSelect.id,
                          link:null
                   }
                })
                .catch(error => {
                   this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                   this.loading = false
                })
         },
      }
   }
</script>
<style lang="stylus">

</style>
