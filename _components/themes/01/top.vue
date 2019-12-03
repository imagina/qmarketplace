<template>
    <div>
        <div class="row">
          <div class="col-12 relative-position">
            <full-width-gallery :storeName="storeData.name" :gallery="storeData.gallery" system-name="principal"></full-width-gallery>

            <div class="q-container info-tienda">
              <div class="row q-col-gutter-lg justify-end q-mx-sm">
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3 q-mb-lg">

                  <q-card class="card-rounded text-center q-mb-sm">
                    <q-card-section class="full-height text-center">
                      Seguir Tienda
                    </q-card-section>
                    <div class="absolute-bottom text-right">
                      <q-card-actions align="right">
                        <q-btn unelevated size="13px" round  color="store-secondary" icon="far fa-thumbs-up" />
                      </q-card-actions>
                    </div>
                  </q-card>

                  <q-card class="card-rounded text-center">
                    <q-card-section class="full-height text-center">
                      7.5 de 200 usuarios
                    </q-card-section>
                    <div class="absolute-bottom text-right">
                        <q-card-actions align="right">
                          <q-btn unelevated size="13px" @click="ratingStore=true;" round  color="store-secondary" icon="grade" />
                        </q-card-actions>
                      </div>
                  </q-card>

                </div>
              </div>
            </div>
          </div>
          <div class="col-12 bg-store-primary">
            <div class="q-container q-py-sm" v-if="$q.platform.is.desktop">
              <div class="row items-center justify-center">
                <div class="col">
                  <q-btn flat icon="fas fa-home" no-caps label="Inicio" color="white"/>
                  <q-btn-dropdown lat icon="fas fa-bars" no-caps label="Categorias" color="store-primary">
                    <q-list>
                      <q-item v-for="item in categories" clickable v-close-popup @click="$router.push({name: 'stores.product.index', params : {slug:storeData.slug,category:item.slug}})">
                        <q-item-section>
                          <q-item-label>{{item.title}}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                  <q-btn @click="$router.push({name: 'stores.about', params : {slug:storeData.slug}})" flat icon="fas fa-map-marker-alt" no-caps label="Info Empresa" color="white"/>
                  <q-btn flat icon="far fa-comment-dots" no-caps label="Chatea con la tienda" color="white"/>
                </div>

                <div class="col-auto">
                  <div class="q-inline-block q-px-sm border-x">
                    <q-input dense
                      placeholder="¿Qué buscas?"
                      class="bg-store-primary"
                      outlined  >
                      <template v-slot:append>
                        <q-icon name="search" color="white" />
                      </template>
                      </q-input>
                  </div>
                  <q-btn flat icon="fas fa-heart" color="white"/>
                  <q-btn @click="$router.push({name: 'marketplace.checkout', params:{storeId:storeData.id}})" flat icon="fa fa-shopping-cart"  color="white ">
                     <q-badge v-if="cart" align="top" class="bg-store-secondary"  floating>{{cart.products.length}}</q-badge>
                     <q-badge v-else align="top" class="bg-store-secondary"  floating>0</q-badge>
                  </q-btn>
                </div>
              </div>
            </div>
            <q-toolbar class="bg-store-primary" v-else>
              <q-btn flat round dense icon="fas fa-home" />
              <q-btn flat round dense icon="fas fa-bars" />
              <q-btn @click="infoStore=true" flat round dense icon="fas fa-map-marker-alt"/>
              <q-btn flat round dense icon="far fa-comment-dots"/>
              <q-toolbar-title>
              </q-toolbar-title>
              <q-btn flat round dense icon="fas fa-search"/>
              <q-btn flat round dense icon="fas fa-heart"/>
              <q-btn flat round dense icon="fa fa-shopping-cart">
                <q-badge v-if="cart" align="top" class="bg-store-secondary" floating>{{cart.products.length}}</q-badge>
                <q-badge v-else align="top" class="bg-store-secondary" floating>0</q-badge>
              </q-btn>
            </q-toolbar>
          </div>
        </div>
        <div class="q-container">
          <div class="row q-col-gutter-lg justify-end">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3 q-mb-lg">
              <div class="bg-store-secondary  text-white text-center q-pa-md">
                <div class="text-h4">340</div>
                <div class="text-subtitle1">usuarios siguen esta tienda</div>
              </div>
            </div>
          </div>
        </div>
        <!-- INFO ADDRESS STORE -->
        <q-dialog v-model="infoStore" @hide="infoStore=false;">
          <q-carousel
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          v-model="slide"
          control-color="primary"
          navigation-icon="radio_button_unchecked"
          navigation
          padding
          height="300px"
          class="bg-white shadow-1 rounded-borders"
          >
          <q-carousel-slide :name="1" class="column no-wrap flex-center">
            <i style="font-size:56px;" class="fas fa-map-marked-alt text-primary"></i>
            <!-- <q-icon name="style" color="primary" size="56px" /> -->
            <div class="q-mt-md text-center" v-html="storeData.description">
            </div>
          </q-carousel-slide>

        </q-carousel>
      </q-dialog>
      <!-- RATING STORE QDIALOG -->
      <q-dialog v-model="ratingStore" @hide="ratingStore=false;">
        <q-card>
          <q-card-section>
            <div class="text-h6">Calificar tienda</div>
          </q-card-section>

          <q-card-section>
            <q-rating size="20px"
              @input="val => { rating() }"
              v-model="storeData.averageRating"
              :max="5"
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </div>
</template>
<script>
import fullWidthGallery from '@imagina/qmarketplace/_components/themes/qcarousel'
export default {
  name: 'TopComponent',
  props: ['cart'],
  components: {
    fullWidthGallery
  },
  data(){
    return {
      infoStore:false,
      ratingStore:false,
      slide: 1,
      categories:[],
      loading:false
    }
  },
  mounted() {
   this.getProductCategories()
  },
  computed:{
    storeData(){
      let storeSlug = this.$route.params.slug
      return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
    }
  },
  methods:{
    getProductCategories(){
      let params = {
        params: {
          filter:{
            'store': this.storeData.id
          }
        }
      }
      this.loading = true
      this.$crud.index('apiRoutes.qcommerce.categories', params).then( response => {
        this.categories = response.data
        console.error(this.categories)
        this.loading = false
      }).catch( error => {
        this.$alert.error({ message: this.$tr('ui.message.errorRequest'), pos: 'bottom' })
        this.loading = false
      })
    },
    rating(){
      this.$axios.post(config('apiRoutes.qmarketplace.store')+'/rating/'+this.store.id,{
        attributes:{
          rating:this.store.averageRating
        }
      }).then(response => {
        this.$alert.success({message: "Calificación registrada exitosamente", pos: 'bottom'});
        this.getData();
        this.ratingStore=false;
      }).catch(error => {
        this.$alert.error({message: error.response.data.errors, pos: 'bottom'})
        console.log(error.response.data.errors);
      });
    },//ratingStore
  }
}
</script>
<style lang="stylus">
.theme-layout-01
  .info-tienda
    position absolute
    margin 0 auto
    left 0
    bottom 0
    right 0
    .card-rounded
      background-color #ffffff
      border-radius 20px 0 20px 0
      color $storePrimary
  .border-x
    .q-field__control
      border-left 1px solid #fff
      border-bottom 0
      border-right 1px solid #fff
      border-radius 0
    .q-field--outlined .q-field__control:before
      border 0
    .q-placeholder
      color #ffffff
</style>
