<template>
  <div>
    <div class="row" v-if="$q.platform.is.desktop">
      <div class="col-12 relative-position">
        <full-width-gallery :storeName="storeData.name" :gallery="storeData.slider"
                            system-name="principal"/>

        <div class="q-container info-tienda">
          <div class="row q-col-gutter-md justify-between">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3 text-center ">
              <div class="logo-tienda">
                <router-link :to="{name: 'stores.show', params : {slug:storeData.slug}}">
                  <img :src="storeData.logo.path">
                </router-link>
              </div>
              <div class="text-h5 bg-store-primary q-inline-block q-pa-md text-white q-mb-sm">
                <!-- Juliana Vargas -->
                {{ storeData.name }}
              </div>
              <h5 class="text-subtitle1 text-uppercase text-store-secondary q-mt-none">
                {{ storeData.slogan }}
                <!--
                MAQUILLADORA PROFESIONAL
                -->
              </h5>

            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-mb-lg">

              <q-card class="card-rounded  btn-top no-shadow q-mx-xl line-store-primary text-center q-mb-sm ">
                <q-list bordered>
                  <q-item clickable>
                    <q-item-section avatar class="q-pl-md">
                      <q-avatar color="store-primary" text-color="white" icon="far fa-thumbs-up"
                                v-if="!followedStore" @click="followStore()"/>
                      <q-avatar color="store-primary" text-color="white" icon="far fa-handshake" v-else
                      />

                    </q-item-section>
                    <q-item-section class="q-py-md text-h5 text-store-secondary" v-if="!followedStore">Seguir
                    </q-item-section>
                    <q-item-section class="q-py-md text-h5 text-store-secondary" v-else>Siguiendo</q-item-section>
                  </q-item>
                </q-list>
              </q-card>

              <q-card class="card-rounded no-shadow text-center">
                <q-card-section>
                  <span class="text-h5 text-store-primary">{{ storeData.usersFollowing }} usuarios</span>
                  <div class="text-store-secondary text-subtitle1 w-100">
                    Siguen esta página
                  </div>
                </q-card-section>
              </q-card>

            </div>
          </div>
        </div>
      </div>

      <div class="col-12 bg-store-primary menuStore menu-02">
        <div class="q-container">
          <div class="bg-white rounded-lg text-white shadow-4 q-mx-xl q-py-sm relative-position">
            <div class="row">
              <div class="col q-pl-md">
                <chat class="chat" color="store-primary" type="0" v-if="$store.state.quserAuth.userId"></chat>
              </div>
              <div class="col-auto q-pr-md">
                <div class="line-vertical"></div>

              </div>
            </div>
          </div>
          <p class="text-h6 text-center text-italic text-white q-my-xl">{{ storeData.slogan }} </p>

        </div>
      </div>

    </div>
    <div class="row" v-else>
      <div class="col-12 bg-store-primary">
        <full-width-gallery :storeName="storeData.name" :gallery="storeData.slider"
                            system-name="principal"/>
        <div class="top-mobile" style="margin-top: -75px;">
          <div class="absolute-top-left text-center q-ml-sm" @click="ratingStore=true">
            <div class="pts">
              {{ storeData.averageRating }}pts
            </div>
          </div>
          <div class="q-container">
            <div class="text-center" style="position:relative;">
              <q-avatar size="150px" round class="bg-white mx-auto">
                <img :src="storeData.logo.path">
              </q-avatar>
              <h1 class="text-h6 text-white q-mb-none">{{ storeData.name }}</h1>
              <q-badge color="store-secondary">
                Seguidores {{ storeData.usersFollowing }}
              </q-badge>
              <p class="text-body2 text-center text-italic text-white q-mb-sm q-mx-md">{{ storeData.slogan }} </p>
              <div class="absolute-right-top text-right">
                <q-btn v-if="!followedStore" @click="followStore()" color="store-secondary" dense round
                       icon="far fa-thumbs-up"/>
                <q-btn v-else dense color="store-secondary" round icon="far fa-handshake"/>
              </div>
            </div>

            <q-toolbar class="bg-white shadow-4">
              <chat class="chat" color="store-primary" type="0"></chat>
              <q-toolbar-title></q-toolbar-title>
            </q-toolbar>

          </div>
        </div>
      </div>
    </div>
    <!-- RATING STORE QDIALOG -->
    <q-dialog id="rating" v-model="ratingStore" @hide="ratingStore=false;">
      <q-card style="width: 550px; max-width: 80vw;" class="bg-degradado">
        <q-card-section class="flex flex-center">
          <div class="text-h5 text-white">CALIFICACIÓN</div>
        </q-card-section>
        <q-card-section>
          <div class="bg-white body-inter q-mx-lg rounded-borders q-pa-lg">
            <div class="flex flex-center q-mb-md">
              <q-rating
                  readonly
                  size="30px"
                  v-model="storeData.averageRating"
                  :max="5"/>
            </div>
            <div v-if="comments.length>0">
              <q-list>
                <q-item
                    class="q-mb-sm"
                    v-for="(comentary, key) in comments"
                    :key="key">
                  <q-item-section avatar>
                    <q-avatar square>
                      <img :src="comentary.user.smallImage">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section class="bg-degradado text-white rounded-borders q-px-sm">
                    {{ comentary.comment }}
                    <div class="block">
                      <small class="text-caption">
                        {{ comentary.diffTime }}
                      </small>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="OK" color="white" outline v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import fullWidthGallery from '@imagina/qmarketplace/_components/themes/qcarousel'
import chat from '@imagina/qmarketplace/_components/qchat/chat'

export default {
  components: {
    fullWidthGallery,
    chat
  },
  data() {
    return {
      logo: this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path,
      followedStore: false,
      loading: false,
      openChat: false,
      ratingStore: false,
      comments: [],
    }
  },
  mounted() {
    this.getFollowedStore();
    if (this.$store.state.quserAuth.userId) {
      this.getCommentsOfStore()
    }
  },
  computed: {
    storeData() {
      let storeSlug = this.$route.params.slug
      return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
    }
  },
  methods: {
    getCommentsOfStore() {
      this.$axios.get(config('apiRoutes.icomments.comments'), {
        params: {
          filter: {
            commentableId: this.storeData.id,
            commentableType: "Modules\\Marketplace\\Entities\\Store",
            order: {
              field: 'created_at',
              way: 'desc',
            }
          },
          take: 8
        }
      }).then(response => {
        this.comments = response.data.data;
      }).catch(error => {
        this.$alert.error({message: error.response.data.errors, pos: 'bottom'})
      });
    },
    getFollowedStore() {
      this.$crud.index("apiRoutes.qmarketplace.favoriteStore", {
        params: {
          filter: {
            userId: this.$store.state.quserAuth.userId,
            storeId: this.storeData.id
          }
        }
      }).then(response => {
        if (response.data.length > 0) {
          this.followedStore = true;
        }
      }).catch(error => {
        this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
      });
    },
    followStore() {
      this.$crud.create("apiRoutes.qmarketplace.favoriteStore", {
        userId: this.$store.state.quserAuth.userId,
        storeId: this.storeData.id
      }).then(response => {
        this.followedStore = true;
        this.$alert.success({message: "Ahora sigues esta tienda", pos: 'bottom'})
      }).catch(error => {
        this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
      });
    },
    rating() {
      this.$axios.post(config('apiRoutes.marketplace.store') + '/rating/' + this.storeData.id, {
        attributes: {
          rating: this.storeData.averageRating
        }
      }).then(response => {
        this.$alert.success({message: "Calificación registrada exitosamente", pos: 'bottom'});
        this.getData();
        this.ratingStore = false;
      }).catch(error => {
        this.$alert.error({message: error.response.data.errors, pos: 'bottom'})
      });
    },//ratingStore
  }

}
</script>
<style lang="stylus">
.theme-layout-04
  .logo-tienda
    margin-top -150px
    padding-bottom 5px !important

    img
      border 5px solid #E1E1E1 !important
      background-color #fff

  .line-store-primary
    border 1px solid $storePrimary

  .btn-top
    margin-top -40px
    position relative
    z-index 9

  .top-mobile
    .q-container
      border-bottom 2px solid $storePrimary

    .q-btn-dropdown__arrow
      display none

    .absolute-right-top
      right 10px
      top 85px
      position absolute

    .pts
      background-image url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 54.18'%3E%3Cdefs%3E%3Cstyle%3E.cls-1{fill:%23fff;}%3C/style%3E%3C/defs%3E%3Ctitle%3ERecurso 2%3C/title%3E%3Cg id='Capa_2' data-name='Capa 2'%3E%3Cg id='home'%3E%3Cpath class='cls-1' d='M42.37,54,24,44.26,5.63,54A4.54,4.54,0,0,1,0,49.41V0H48V49.41A4.54,4.54,0,0,1,42.37,54Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
      color $storeSecondary
      font-family $font-secondary
      display flex
      align-items center
      justify-content center
      background-size 100% 100%
      padding 0 5px
      height 55px
      width 55px
      background-repeat no-repeat
      background-position center

#rating
  @media screen and (max-width: $breakpoint-xs)
    .q-dialog__inner
      padding 0 !important

      .q-card
        max-width 100% !important

      .q-card__section
        padding 10px

      .body-inter
        margin-left 0 !important
        margin-right 0 !important
        padding 24px 10px !important

    .q-rating
      font-size 25px !important
</style>
