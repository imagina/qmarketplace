<template>
  <div class="theme-layout-02">
    <!--  publicidad encuenta -->
    <div class="q-pa-md">
      <div class="q-container">
        <div class="row q-col-gutter-lg">
          <div class="col-xs-12 col-md-8">
            <mainProducts></mainProducts>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4">
            <quiz></quiz>
          </div>
        </div>
      </div>
    </div>

    <div class="banner-two q-mb-xl" style="background-image: url('/statics/img/theme-two/conocenos.jpg');">
      <div class="q-container">
        <div class="row justify-center">
          <div class="col-xs-12 col-sm-12 col-md-7 col-lg-6">
            <div class="content text-center">
              <h4 class="q-my-md text-white">CONÓCENOS</h4>
              <div class="text-white text-h6" v-html="store.description"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- destacado  y compartir -->
    <div class="q-pa-md">
      <div class="q-container">
        <div class="row q-col-gutter-lg">
          <div class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
            <featured-products ></featured-products>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
            <share></share>

            <q-btn color="store-secondary" no-caps class="rounded-sm q-py-lg q-px-xl">
              <div class="text-h6 q-mb-md full-width">¿Tienes alguna duda?</div>
              <q-icon size="3em" color="white" name="far fa-comment-dots" />
              <div class="text-h6 q-mt-md">CHATEA AQUI CON LA TIENDA</div>
            </q-btn>

          </div>
        </div>
      </div>
    </div>
    <!-- Productos -->
    <general-products ></general-products>


  </div>
</template>
<script>
import generalProducts from '@imagina/qmarketplace/_components/themes/02/generalProducts'
import featuredProducts from '@imagina/qmarketplace/_components/themes/02/featuredProducts'
import mainProducts from '@imagina/qmarketplace/_components/themes/02/mainP'
import quiz from '@imagina/qmarketplace/_components/themes/02/quiz'
import share from '@imagina/qmarketplace/_components/themes/02/shareNetworks'
export default {
  name: 'PageLayout2',
  components: {
    mainProducts,
    featuredProducts,
    generalProducts,
    quiz,
    share
  },
  mounted() {
    /*
    console.warn('block', this.store)
    */
  },
  computed:{
    store(){
      let storeSlug = this.$route.params.slug
      return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
    }
  },
  methods:{
  },
}
</script>
<style lang="stylus">
.theme-layout-02
  .line-store-secondary
    border 1px solid $storeSecondary
  .btn-banner
    border 2px solid #fff
    padding 5px 25px
    font-size 22px
    font-weight bold
    margin-top -25px
  .banner-two
    background-attachment fixed
    background-size cover
    padding 10% 0
    position relative
    &:before
      height 100%
      width 100%
      background-color rgba(#282d46, 0.7)
      content ''
      position absolute
      top 0
    .content
      position relative
      z-index 3
      .imsocial
        display inline-block
        a
        & i
          margin 10px
          font-size 2rem
          color #ffffff
          &:hover
            color $storeSecondary
</style>
