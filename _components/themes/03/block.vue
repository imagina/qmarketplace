<template>
  <div class="theme-layout-03">
    <!-- destacado encuenta nuevos y publicidad -->
    <div class="q-pa-md">
      <div class="q-container">
        <div class="row q-col-gutter-xl">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8">
            <div class="line-grey q-my-lg"></div>

            <q-list padding>
              <q-item>
                <q-item-section top avatar class="q-mr-md q-hide q-md-show">
                  <q-icon size="xl" color="store-primary" name="far fa-user" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h5 text-weight-bold q-mb-sm">Mi perfil</q-item-label>
                  <q-item-label class="text-subtitle1">
                    <div class="q-mb-md" v-html="storeData.description">
                    </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <div class="line-grey q-my-lg"></div>
          
         <services/>

          <div class="line-grey q-my-lg"></div>

        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">

          <q-card class="no-border-radius" v-if="$q.platform.is.desktop">
            <q-card-section class="q-pa-lg text-center">
              <chat color="store-secondary" type="5"/>
              <div class="line-grey q-my-md"></div>
              <q-btn no-caps flat class=" q-py-sm">
                <q-icon size="3em" color="store-primary" name="fas fa-briefcase" />
                <h5 class="text-store-secondary q-mt-sm q-mb-none full-width">Solicita tu servicio</h5>
              </q-btn>

              <div class="line-grey q-my-md"></div>
              <q-btn no-caps flat class=" q-py-sm">
                <q-icon size="3em" color="store-primary" name="star" />
                <h5 class="text-store-secondary q-mt-sm q-mb-none full-width">Calificar servicio</h5>
              </q-btn>

              <div class="line-grey q-my-md"></div>
              <share></share>

            </q-card-section>
          </q-card>
          <quiz :system-name="`home-${storeData.id}`"/>

        </div>
      </div>
    </div>
  </div>


  <div>
    <div class="q-container">


      <q-list padding class="q-mb-md">
        <q-item>
          <q-item-section top avatar class="q-mr-md">
            <q-icon size="xl" color="store-primary" name="far fa-images" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h5 text-weight-bold q-mb-sm">Conoce mi trabajo</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>


    </div>
    <div class="row">
      <div class="col-xs-6 col-sm-6 col-md-3" v-for="img in storeData.gallery">
        <div class="ratio-4-3" style="border: 2px solid #fff;">
          <img :src="img.path" alt="">
        </div>
      </div>
    </div>


  </div>
</div>
</template>
<script>
import quiz from '@imagina/qmarketplace/_components/themes/quiz'
import share from '@imagina/qmarketplace/_components/themes/03/shareNetworks'
import chat from '@imagina/qmarketplace/_components/qchat/chat'
import services from  '@imagina/qmarketplace/_components/themes/03/services'
export default {
  name: 'PageLayout3',
  components: {
    quiz,
    share,
    chat,
    services
  },
  computed:{
    storeData(){
      let storeSlug = this.$route.params.slug
      return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
    }
  },
}
</script>
<style lang="stylus">
.theme-layout-03
  .list-item
    display flex
    text-align justify
    margin-bottom 10px
  .card-quiz-1 
    border-radius 0!important
    border-top 6px solid $storeSecondary
    box-shadow 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12)
    .q-card-title
      padding-top 20px
      padding-bottom 20px
      border-radius 0!important
      background-color #fff !important
      color $storePrimary !important
      font-family $font-secondary
      font-size 20px
      &:before
        content none
</style>
