<template>
  <q-page class="theme-layout-01">
    <!-- Imagen textos y menu usuarios que siguen la tienda-->
    <top></top>

    <!-- destacado encuesta nuevos y publicidad -->
    <div class="q-pa-md">
      <div class="q-container">
        <div class="row q-col-gutter-lg">
          <div class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
            <featured-products></featured-products>
            <new-products></new-products>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
            <quiz></quiz>

            <div class="banner-bottom q-mb-xl">
              <div class="row">
                <div class="col-12 content">
                  <div class="content text-center">
                    <h4 class="q-my-md text-white">NUEVA <br> COLECCIÓN</h4>
                    <q-btn  label="Comprar ahora" color="primary"/>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Productos -->
    <general-products :products="store.products"></general-products>

    <!-- Compartir -->
    <share :social="store.social"></share>

    <!-- direcciones -->
    <contact :address="store.address" :schedules="store.schedules"></contact>

  </q-page>
</template>
<script>
import imSocial from 'src/components/master/imSocial';
import generalProducts from '@imagina/qmarketplace/_components/themes/01/generalProducts'
import featuredProducts from '@imagina/qmarketplace/_components/themes/01/featuredProducts'
import newProducts from '@imagina/qmarketplace/_components/themes/01/newProducts'
import quiz from '@imagina/qmarketplace/_components/themes/01/quiz'
import top from '@imagina/qmarketplace/_components/themes/01/top'
import contact from '@imagina/qmarketplace/_components/themes/01/contact'
import share from '@imagina/qmarketplace/_components/themes/01/shareNetworks'
export default {
  name: 'PageLayout1',
  props: {
    'store'              : { type:Object, default: null},
  },
  components: {
    imSocial,
    featuredProducts,
    generalProducts,
    newProducts,
    quiz,
    top,
    contact,
    share
  },
  data() {
    return {

    }
  }
}
</script>
<style lang="stylus">
.theme-layout-01
  .banner-bottom
    background-image url('/statics/img/theme-one/banner-bottom.jpg')
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
      background-color  rgba(#282d46, 0.7)
      content ''
      position absolute
      top 0

</style>
