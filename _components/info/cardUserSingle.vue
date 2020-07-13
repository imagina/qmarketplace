<template>
    <!-- USER -->
    <div>
        <q-card class="flat bordered" v-if="success">
            <q-card-section>
                <div class="row text-center card-seguidor">
                    <div class="col-xs-12 col-md-12 col-lg-3">
                        <q-avatar size="60px">
                            <img :src="user.mediumImage">
                        </q-avatar>
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-9">
                        <div class="text-h6 full-width">{{user.fullName}}</div>
                        <div class="text-subtitle2 text-tertiary">Nivel: Club de Conocidos</div>
                        <div class="text-subtitle2">
                            <q-icon name="fas fa-envelope" color="primary"/>
                            {{user.email}}
                        </div>
                    </div>
                </div>
            </q-card-section>
            <q-separator/>
            <q-card-section class="q-pa-none">
                <div class="link-profile text-right">
                    <!-- <q-btn flat label="+ Ver Perfil" :to="{name:'quser.account.public.profile',params:{userId:result.user.id}}" /> -->

                    <q-btn flat color="primary" class="text-bold" label="+ Ver Perfil"
                           @click="openProfile(user)"/>
                </div>
            </q-card-section>
        </q-card>
        <inner-loading :visible="loading" />
    </div>
</template>

<script>
    export default {
        name: "cardUserSingle",
        props:{
            id:{
                default: null
            },
            userData:{
                default: null
            }
        },
        data(){
            return {
                user: {},
                success: false,
                loading: false,
            }
        },
        watch:{
          id(){
              this.init()
          }
        },
        mounted(){
          this.$nextTick(()=>{
            this.init()
          })
        },
        methods:{
            init(){
                this.loading = true
                this.success = false
                if(this.id) {
                    let params = {
                        refresh: true,
                        params: {
                            include: 'fields'
                        }
                    }
                    this.$crud.show("apiRoutes.quser.users", this.id, params)
                        .then(response => {
                            this.user = response.data
                            this.success = true
                            this.loading = false
                        }).catch(error => {
                        console.error("ERROR - GET USERS FROM FAVORITE STORES")
                        this.loading = false
                    });
                }else{
                    this.user = this.userData
                    this.success = true
                    this.loading = false
                }
            },
            openProfile(result) {
                this.$emit('input',result)
            }
        }
    }
</script>

<style scoped>

</style>