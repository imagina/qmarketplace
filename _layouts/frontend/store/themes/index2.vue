<template>
  <q-page class="theme-layout-02">
    <!-- Imagen textos y menu usuarios que siguen la tienda-->
    <top
    :slogan="store.slogan"
    >
    </top>

    <!--  publicidad encuenta -->
    <div class="q-pa-md">
      <div class="q-container">
        <div class="row q-col-gutter-lg">
          <div class="col-xs-12 col-sm-12 col-md-4 q-mb-xl text-center">
            <q-img :ratio="1" src="/statics/img/theme-two/banner1.jpg" />
            <q-btn no-caps class="rounded-lg btn-banner"  color="secondary" label="Lorem ipsum" />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 q-mb-xl text-center">
            <q-img :ratio="1" src="/statics/img/theme-two/banner2.jpg" />
            <q-btn no-caps class="rounded-lg btn-banner"  color="secondary" label="Lorem ipsum" />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4">
            <quiz></quiz>
          </div>
        </div>
      </div>
    </div>

    <div class="banner-two q-mb-xl">
      <div class="q-container">
        <div class="row justify-center">
          <div class="col-xs-12 col-sm-12 col-md-7 col-lg-6">
            <div class="content text-center">
              <h4 class="q-my-md text-white">CONÓCENOS</h4>
              <div class="text-white" v-html="store.description">
              </div>
              <!-- <p class="text-white" v-html="store.description"></p> -->
              <!-- <p class="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur architecto cumque fugit placeat assumenda illum debitis minima ducimus fuga enim quod nihil, ullam non vitae iusto repellat libero voluptate. Cumque.</p> -->
<!--  -->
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
            <featured-products></featured-products>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
            <share :social="store.social"></share>

            <q-btn color="secondary" no-caps class="rounded-sm q-py-lg q-px-xl">
              <div class="text-h6 q-mb-md full-width">¿Tienes alguna duda?</div>
              <q-icon size="3em" color="white" name="far fa-comment-dots" />
              <div class="text-h6 q-mt-md">CHATEA AQUI CON LA TIENDA</div>
            </q-btn>

          </div>
        </div>
      </div>
    </div>


    <!-- Productos -->
    <general-products :products="store.products"></general-products>


    <!-- direcciones -->
    <contact :address="store.address" :schedules="store.schedules"></contact>

  </q-page>
</template>
<script>
import top from '@imagina/qmarketplace/_components/themes/02/top'
import generalProducts from '@imagina/qmarketplace/_components/themes/02/generalProducts'
import featuredProducts from '@imagina/qmarketplace/_components/themes/02/featuredProducts'
import newProducts from '@imagina/qmarketplace/_components/themes/02/newProducts'
import quiz from '@imagina/qmarketplace/_components/themes/02/quiz'
import contact from '@imagina/qmarketplace/_components/themes/02/contact'
import share from '@imagina/qmarketplace/_components/themes/02/shareNetworks'
export default {
  name: 'PageLayout2',
  props: {
    'store'              : { type:Object, default: null},
  },
  components: {
    share,
    featuredProducts,
    generalProducts,
    newProducts,
    quiz,
    top,
    contact
  },
  data() {
    return {

    }
  }
}
</script>
<style lang="stylus">
.theme-layout-02
  .btn-banner
    border 2px solid #fff
    padding 5px 25px
    font-size 22px
    font-weight bold
    margin-top -25px
  .banner-two
    background-image url('/statics/img/theme-two/conocenos.jpg')
    background-attachment fixed
    background-size cover
    padding 10% 0
    position relative
    &:before
      height 100%
      width 100%
      background-color  rgba(#282d46, 0.7)
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
            color $secondary

</style>
