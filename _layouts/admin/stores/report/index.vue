<template>
  <div id="storeReport">

    <div class="text-h5 text-primary q-pb-md q-pl-lg font-family-secondary">Informes</div>
    <q-card class="rounded-md bg-white full-width q-my-sm">

      <div class="bg-light">
        <div class="row justify-end items-center q-col-gutter-md q-pb-md q-px-md">
          <div class="col-xs-12 col-sm-12 col-md-auto text-center">
            <q-icon name="event" class="q-mr-sm" /> Julio / Junio / Hoy
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <q-select filled v-model="model" color="primary" bg-color="white" :options="options" dense>
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-select>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <q-select filled v-model="model" color="primary" bg-color="white" :options="options" dense>
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-select>
          </div>
        </div>
      </div>

      <div class="q-pa-lg">
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-xs-12 col-sm-6 col-md-3">

            <div class="row items-center bg-teal full-height">
              <div class="col-5 bg-teal-8 full-height">
                <div class="row full-height justify-center items-center text-white text-h5">
                  50
                </div>
              </div>
              <div class="col-7">
                <div class="q-pl-md text-white q-py-md">Productos <br>Vendidos</div>
              </div>
            </div>

          </div>
          <div class="col-xs-12 col-sm-6 col-md-3">
            <div class="row items-center bg-red full-height">
              <div class="col-5 bg-red-8 full-height">
                <div class="row full-height justify-center items-center text-white text-h5">
                  150
                </div>
              </div>
              <div class="col-7">
                <div class="q-pl-md text-white q-py-md">Total de <br>seguidores</div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-3">
            <div class="row items-center bg-blue full-height">
              <div class="col-5 bg-blue-8 full-height">
                <div class="row full-height justify-center items-center text-white text-h5">
                  250
                </div>
              </div>
              <div class="col-7">
                <div class="q-pl-md text-white q-py-md">Encuentas</div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-3">
            <div class="row items-center bg-amber full-height">
              <div class="col-5 bg-amber-8 full-height">
                <div class="row full-height justify-center items-center text-white text-h5">
                  300
                </div>
              </div>
              <div class="col-7">
                <div class="q-pl-md text-white q-py-md">Total de <br>vistas</div>
              </div>
            </div>
          </div>
        </div>
        <div class="row q-col-gutter-md q-pt-lg">
          <div class="col-xs-12 col-sm-12 col-md-7">
            <div class="q-pa-md">
              <div class="text-h6 q-mb-lg">
                <q-icon class="q-mr-sm icon-sm" name="event"/>
                Ventas totales
              </div>

              <chart :options="chartOptionsBase" style=" height:430px;"/>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-5">
            <div class="line-grey q-pa-md">
              <div class="text-h6 q-mb-lg">
                <q-icon class="q-mr-sm icon-sm" name="fas fa-shopping-basket"/>
                Productos más vendidos
              </div>
              <q-list>
                <q-item class="items-product" v-for="product in products" :key="product.id">
                  <q-item-section avatar top>
                    <q-avatar rounded class="q-mr-sm" size="70px">
                      <img :src="product.logo.path">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{product.name}}</q-item-label>
                    <q-item-label caption> Código: {{product.codigo}}</q-item-label>
                  </q-item-section>

                </q-item>
              </q-list>
            </div>
          </div>
          <div class="col-12">
            <div class="line-grey q-pa-md">
              <div class="text-h6 q-mb-lg">
                <q-icon class="q-mr-sm icon-sm" name="fas fa-users"/>
                Mis seguidores destacados
              </div>

              <div class="row justify-center q-col-gutter-md">
                <div class="col-lg-3" v-for="user in users">

                  <q-card class="no-shadow text-center">
                    <q-avatar class="bg-white avatar-user" size="100px">
                      <img :src="user.logo.path">
                    </q-avatar>
                    <q-card-section class="text-subtitle2 ">
                      <div>{{user.name}}</div>
                      <q-rating v-model="user.rating" readonly color="yellow" :max="5" />
                      <div class="q-mt-xs" >
                        <q-btn color="primary" class="btn-more" no-caps flat label="Ver más"/>
                      </div>
                    </q-card-section>

                  </q-card>

                </div>
              </div>


            </div>
          </div>
        </div>
      </div>

    </q-card>
  </div>
</template>
<script>
import {Chart} from 'highcharts-vue'
export default {
  props: {},
  components: {
    Chart
  },
  watch: {},
  mounted() {
    this.$nextTick(function () {
    })
  },
  data() {
    return {
      model: '',
      options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle' ],
      users:  [
        {
          name: 'Nombre Apellido',
          logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
          rating: 5
        },
        {
          name: 'Nombre Apellido',
          logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
          rating: 5
        },
        {
          name: 'Nombre Apellido',
          logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
          rating: 5
        },
        {
          name: 'Nombre Apellido',
          logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
          rating: 5
        },
        {
          name: 'Nombre Apellido',
          logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
          rating: 5
        },
        {
          name: 'Nombre Apellido',
          logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
          rating: 5
        },
        {
          name: 'Nombre Apellido',
          logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
          rating: 5
        },
        {
          name: 'Lorem Ipsom',
          logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
          rating: 5
        }
      ],
      products:  [
        {
          name: 'Lorem Ipsom',
          logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
          codigo: 5
        },
        {
          name: 'Lorem Ipsom',
          logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
          codigo: 5
        },
        {
          name: 'Lorem Ipsom',
          logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
          codigo: 5
        },
        {
          name: 'Lorem Ipsom',
          logo : { path: 'https://cdn.quasar.dev/img/avatar.png' },
          codigo: 5
        }
      ],
      chartOptionsBase: {
        chart: {
          type: 'column',
          backgroundColor: null,
        },
        title: {
          text: '',
        },
        xAxis: {
          categories: [
            'Ene',
            'Feb',
            'Mar',
            'Abr',
            'May',
            'Jun',
            'Jul',
            'Ago',
            'Sep',
          ], //Answers
          title: {
            text: null,
            style: {
              color: '#f96353'
            }
          },
          labels: {
            style: {
              fontSize: '12px',
              color: '#333333',
            }
          },
          gridLineWidth: 0,
          crosshair: true
        },
        yAxis: {
          gridLineWidth: 1,
          min: 0,
          title: {
            text: ''
          },
          labels: {
            overflow: 'justify'
          }
        },
        credits: {
          enabled: false
        },
        colors: ['#f96353'],
        series: [{
          name: 'Ventas',
          data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4]

        }]

      }
    }
  },
  mounted(){
    this.marketplaceReport()
  },
  methods: {
    marketplaceReport(){
      let params = {
        params: {
          filter:{
            storeId:this.$store.state.qmarketplaceStores.storeSelected,
            totalFollowers: 1,
            followers: 1,
            soldProducts: 1,
          }
        }
      };//params
      this.$crud.index("apiRoutes.ianalytics.marketplace",params).then(response => {
        console.log(response.data);
      });
    }

  }
}
</script>
<style lang="stylus">
#storeReport
   .btn-more
      border-top 1px solid #eee
   .highcharts-legend
      display none !important
   .avatar-user
      .q-avatar__content
         border-radius 50%
         border 2px solid #eee
   .q-list
      .items-product
         border-bottom 1px solid #eee
         padding 10px
      .items-product:last-child
         border-bottom 0
   @media screen and (max-width: $breakpoint-xs)
      .icon-sm
         display none !important
      .text-h6
         text-align center
</style>
