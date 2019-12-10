<template>
  <div class="theme-layout-01">
    <div class="q-pa-md">
      <div class="q-container">
        <div class="row q-col-gutter-lg">
          <div class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
            <featured-products ></featured-products>
            <new-products :store="store"></new-products>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
            <quiz></quiz>
            <div class="banner-bottom q-mb-xl" style="background-image: url('/statics/img/theme-one/banner-bottom.jpg')">
              <div class="row">
                <div class="col-12 content">
                  <div class="content text-center">
                    <h4 class="q-my-md text-white">NUEVA <br> COLECCIÓN</h4>
                    <q-btn  label="Comprar ahora" color="store-primary"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Productos -->
    <general-products ></general-products>
    <!-- Compartir -->
    <share ></share>


  </div>
</template>
<script>
import imSocial from 'src/components/master/imSocial';
import generalProducts from '@imagina/qmarketplace/_components/themes/01/generalProducts'
import featuredProducts from '@imagina/qmarketplace/_components/themes/01/featuredProducts'
import newProducts from '@imagina/qmarketplace/_components/themes/01/newProducts'
import quiz from '@imagina/qmarketplace/_components/themes/01/quiz'
import share from '@imagina/qmarketplace/_components/themes/01/shareNetworks'
export default {

  components: {
    imSocial,
    featuredProducts,
    generalProducts,
    newProducts,
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
.theme-layout-01
  .banner-bottom
    background-size cover
    padding-top 60%
    padding-bottom 40%
    position relative
    .content
      position relative
      z-index 3
    &:before
      height 100%
      width 100%
      background rgba(#282d46, 0.7)
      content ''
      position absolute
      top 0
</style>
