<template>
    <div class="col-12 relative-position">
        <div class="row q-col-gutter-md" v-if="success">
            <div class="col-12 col-md-6" v-for="(user,k) in users">
                <card-user-single :userData="user.user" @input="openProfile" />
            </div>
            <div class="col-12">
                <q-dialog v-model="card.open">
                    <card-user :card="card"></card-user>
                </q-dialog>
            </div>
        </div>
        <inner-loading :visible="loading" />
    </div>
</template>

<script>
    import cardUserSingle from '@imagina/qmarketplace/_components/info/cardUserSingle'
    import cardUser from '@imagina/qmarketplace/_components/info/cardUser'
    export default {
        name: "answerUsers",
        components:{
          cardUser,
          cardUserSingle
        },
        props:{
          id:{
              required: true
          }
        },
        watch:{
          id(){
              this.init()
          }
        },
        data(){
            return {
                success: false,
                loading: false,
                users: [],
                card: {
                    open: false,
                    info: [],
                    stars: 2,
                },
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.init()
            })
        },
        methods:{
            init(){
                this.success = false
                this.loading = true
                let params = {
                    refresh: true,
                    params: {
                        filter: {
                            answer: this.id,
                        },
                        include: 'user,user.fields',
                    }
                }
                this.$crud.index('apiRoutes.qquiz.userQuestionAnswers', params).then(response => {
                    this.users = response.data
                    this.success = true
                    this.loading = false
                }).catch(error =>{
                    console.error(error)
                    this.loading = false
                })
                this.loading = false
            },
            openProfile(result) {
                //console.warn(result)
                this.card.info = result;
                if(this.card.info.fields[0])
                    this.card.info.fields = this.$helper.convertToFrontField(this.card.info.fields);
                this.card.open = true;
            }
        }
    }
</script>

<style scoped>

</style>