<template>
    <div class="q-mb-lg">
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
          <div class="q-mt-md text-center" v-html="store.description">
          </div>
        </q-carousel-slide>

      </q-carousel>
    </q-dialog>
      <div class="row">
        <div class="col-12">
          <div class="q-container">
            <div class="q-mb-md border-slider" >
              <full-width-gallery :storeName="store.name" :gallery="store.gallery" system-name="principal"></full-width-gallery>

              <div class="q-container info-tienda" >
                <div class="row q-col-gutter-md justify-end q-mx-sm">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-3 q-mb-lg text-center">
                    <div class="row q-col-gutter-xs items-center justify-end">
                        <div class="col-xs-auto col-sm-auto col-md-auto col-lg-12">
                          <q-card @click="ratingStore=true;" class="card-circle text-center q-mb-sm">
                            <q-card-section class="q-pa-sm">
                              <div class="text-h6">
                                <q-icon color="white" size="30px" round name="grade" />
                              </div>
                              <div class="text-body2">7.5 de 200 usuarios</div>
                            </q-card-section>
                          </q-card>
                        </div>
                        <div class="col-xs-auto col-sm-auto col-md-auto col-lg-12">
                          <q-card class="card-circle text-center q-mb-sm">
                            <q-card-section class="q-pa-sm ">
                              <div class="text-h5">
                                <q-icon color="white" size="30px" round name="far fa-thumbs-up" />
                              </div>
                              <div class="text-body2"> Seguir Tienda</div>
                            </q-card-section>
                          </q-card>
                        </div>
                        <div class="col-xs-auto col-sm-auto col-md-auto col-lg-12">
                          <q-card class="card-rounded text-center">
                            <q-card-section class="q-pa-sm">
                              <div class="text-h6">350 </div>
                              <div class="text-body2">Seguidores</div>
                            </q-card-section>
                          </q-card>
                        </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="col-12 bg-store-primary menu-02">
          <div class="q-container">
            <div class="bg-white rounded-lg text-white q-mx-xl q-py-sm"  v-if="$q.platform.is.desktop">
              <div class="row">
                <div class="col q-pl-md">
                  <q-btn flat round dense icon="fas fa-home" no-caps color="store-primary"/>
                  <q-btn-dropdown lat icon="fas fa-bars" no-caps label="Categorias" color="store-primary">
                    <q-list>
                      <q-item v-for="item in categories" clickable v-close-popup @click="$router.push({name: 'stores.product.index', params : {slug:storeData.slug,category:item.slug}})">
                        <q-item-section>
                          <q-item-label>{{item.title}}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                  <q-btn @click="$router.push({name: 'stores.about', params : {slug:storeData.slug}})" flat icon="fas fa-map-marker-alt" no-caps label="Info Empresa" color="store-primary"/>
                  <q-btn flat icon="far fa-comment-dots" no-caps label="Chatea con la tienda" color="store-primary"/>
                </div>
                <div class="col-auto q-pr-md">
                  <div class="q-inline-block q-px-sm border-x">
                    <q-input dense
                      placeholder="¿Qué buscas?"
                      color="white" outlined  >
                      <template v-slot:append>
                        <q-icon name="search" color="white" />
                      </template>
                      </q-input>
                  </div>
                  <q-btn flat icon="fas fa-heart" color="store-secondary"/>
                  <q-btn  @click="$router.push({name: 'marketplace.checkout', params:{storeId:store.id}})"  flat icon="fa fa-shopping-cart"  color="store-secondary">
                     <q-badge v-if="cart" align="top" color="store-primary" floating>{{cart.products.length}}</q-badge>
                     <q-badge v-else align="top" color="store-primary" floating>0</q-badge>
                  </q-btn>
                </div>
              </div>
            </div>
            <q-toolbar color="white" text-color="store-primary" v-else>
              <q-btn flat round dense icon="fas fa-home"  />
              <q-btn flat round dense icon="fas fa-bars" />
              <q-btn @click="infoStore=true" flat round dense icon="fas fa-map-marker-alt"/>
              <q-btn flat round dense icon="far fa-comment-dots"/>
              <q-toolbar-title>
              </q-toolbar-title>
              <q-btn flat round dense icon="fas fa-search"/>
              <q-btn flat round dense icon="fas fa-heart"/>
              <q-btn flat round dense icon="fa fa-shopping-cart" color="store-secondary">
                 <q-badge v-if="cart" align="top" color="store-secondary" floating>{{cart.products.length}}</q-badge>
                 <q-badge v-else align="top" color="store-secondary" floating>1</q-badge>
              </q-btn>
            </q-toolbar>


            <p class="text-h6 text-center text-white q-my-xl">{{store.slogan}} </p>
            <!-- <p class="text-h6 text-center text-white q-my-xl">Tu pizzería por excelencia, con vista y vientos del mar </p> -->
          </div>
        </div>
        <!-- RATING STORE QDIALOG -->
        <q-dialog v-model="ratingStore" @hide="ratingStore=false;">
          <q-card>
            <q-card-section>
              <div class="text-h6">Calificar tienda</div>
            </q-card-section>

            <q-card-section>
              <q-rating size="20px"
                @input="val => { rating() }"
                v-model="store.averageRating"
                :max="5"
              />
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>

</template>
<script>
import fullWidthGallery from '@imagina/qmarketplace/_components/themes/qcarousel'
export default {
  name: 'TopComponent',
  props: ['cart','store'],
  components: {
    fullWidthGallery
  },
  data(){
    return {
      infoStore:false,
      ratingStore:false,
      followedStore:false,
      slide: 1,
      categories:[],
      loading:false
    }
  },
  mounted() {
   this.getProductCategories();
   this.getFollowedStore();
  },
  computed:{
    storeData(){
      let storeSlug = this.$route.params.slug
      return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
    }
  },
  methods:{
    getFollowedStore(){
      this.$crud.index("apiRoutes.qmarketplace.favoriteStore", {
        params:{
          filter:{
            userId:this.$store.state.quserAuth.userId,
            storeId:this.storeData.id
          }
        }
      }).then(response => {
        if(response.data.length>0){
          this.followedStore=true;
        }
      }).catch(error => {
        this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
      });
    },
    followStore(){
      this.$crud.create("apiRoutes.qmarketplace.favoriteStore", {
        userId:this.$store.state.quserAuth.userId,
        storeId:this.storeData.id
      }).then(response => {
        this.followedStore=true;
        this.$alert.success({message: "Ahora sigues esta tienda", pos: 'bottom'})
      }).catch(error => {
        this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
      });
    },
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
        this.loading = false
      }).catch( error => {
        this.$alert.error({ message: this.$tr('ui.message.errorRequest'), pos: 'bottom' })
        this.loading = false
      })
    },
    rating(){
      this.$axios.post(config('apiRoutes.qmarketplace.store')+'/rating/'+this.storeData.id,{
        attributes:{
          rating:this.storeData.averageRating
        }
      }).then(response => {
        this.$alert.success({message: "Calificación registrada exitosamente", pos: 'bottom'});
        this.getData();
        this.ratingStore=false;
      }).catch(error => {
        this.$alert.error({message: error.response.data.errors, pos: 'bottom'})
      });
    },//ratingStore
  }
}
</script>
<style lang="stylus">
.theme-layout-02
  .border-slider
    border 10px solid #fff
    position relative
    z-index 9
  .menu-02
    min-height 300px
    margin-top -150px
    padding-top 150px
  .info-tienda
    position absolute
    margin 0 auto
    left 0
    bottom 0
    right 0
    .card-rounded
      background-color $storeSecondary
      border-radius 20px 0 20px 0
      color #ffffff
      border 5px solid #fff
      width 150px
      margin 5px auto
      .q-card-section
        line-height 1.1rem
    .card-circle
      background-color $storeSecondary
      border-radius 50%
      color #ffffff
      border 5px solid #fff
      height 100px
      width 100px
      margin 5px auto
      .q-card-section
        line-height 1.1rem
  .border-x
    .q-field__control
      border-left 1px solid $storePrimary
      border-bottom 0
      border-right 1px solid $storePrimary
      border-radius 0
    .q-field--outlined .q-field__control:before
      border 0
    .q-placeholder
      color $storePrimary
</style>
