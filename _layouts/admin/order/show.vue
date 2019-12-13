<template>
  <div id="pageId" class="q-layout-page layout-padding">
    <!--TITLE-->
    <h1 class="text-h5 text-primary q-mb-md font-family-secondary">
      <q-icon v-if="$route.meta.icon" :name="$route.meta.icon"/>
      {{$tr($route.meta.title)}} {{this.$route.params.id}}
    </h1>


    <div class="row q-col-gutter-lg">
      <div class="col-md-6">

        <q-card class="rounded-sm">

          <q-card-section class="q-pa-lg">
            <div class="text-h6 text-bold q-mb-md">{{$tr('qcommerce.layout.orderAccountInformation')}}</div>

            <div class="row">
              <div class="col-md-4">
                <div class="text-bold">{{$tr('qcommerce.layout.orderStatus')}}</div>
              </div>
              <div class="col-md-8">
                {{order.statusName}}
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="text-bold">{{$tr('qcommerce.layout.orderDate')}}</div>
              </div>
              <div class="col-md-8">{{(order.createdAt)}}</div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="text-bold">{{$tr('qcommerce.layout.placedFromIP')}}</div>
              </div>
              <div class="col-md-8">{{order.ip}}</div>
            </div>

          </q-card-section>
        </q-card>


      </div>

      <div class="col-md-6">

        <q-card class="rounded-sm" style="min-height: 179px;">

          <q-card-section class="q-pa-lg">
            <div class="text-h6 text-bold q-mb-md">{{$tr('qcommerce.layout.accountInformation')}}</div>

            <div class="row">
              <div class="col-md-3">
                <div class="text-bold">{{$tr('ui.form.name')}}</div>
              </div>
              <div class="col-md-6">
                {{order.customer.fullName}}
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <div class="text-bold">{{$tr('ui.form.email')}}</div>
              </div>
              <div class="col-md-6">
                {{order.customer.email}}
              </div>
            </div>

          </q-card-section>
        </q-card>

      </div>

      <div class="col-md-12">

        <q-card class="rounded-sm">
          <q-card-section>
            <div class="text-h6 text-bold q-mb-md">{{$tr('qcommerce.layout.addressInformation')}}</div>
          </q-card-section>

          <q-card-section>

            <div class="row">
              <div class="col-md-12">
                <b>{{$tr('qcommerce.layout.billingAddress')}}</b>
              </div>
              <div class="col-md-12 q-mt-sm">
                {{order.shippingFirstName}},
                {{order.shippingLastName}},
                {{order.shippingAddress1}},
                {{order.shippingCity}},
                {{order.shippingZipCode}},
                {{order.shippingCountry}}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-12">

        <q-card class="rounded-sm">
          <q-card-section>
            <div class="text-h6 text-bold q-mb-md">{{$tr('qcommerce.layout.paymentShippingMethod')}}</div>
          </q-card-section>

          <q-card-section>

            <div class="row">
              <div class="col-md-12">
                <b>{{$tr('qcommerce.layout.paymentInformation')}}</b>
              </div>
              <div class="col-md-12 q-mt-sm">
                {{order.paymentMethod}}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-12">

        <q-card class="rounded-sm">
          <q-card-section>
            <div class="text-h6 text-bold q-mb-md">{{$tr('qcommerce.layout.itemsOrdered')}}</div>
          </q-card-section>

          <q-card-section>

            <div class="row">
              <div class="col-md-12">
                <orderItems :items="order.items"/>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-6 ">
        <q-card class="rounded-sm">
          <q-card-section>
            <div class="text-h6 text-bold q-mb-md">{{$tr('qcommerce.layout.orderHistory')}}</div>
          </q-card-section>

          <q-card-section>
            <order-status-history :items="order.histories" />
            <addStatusOrder @orderHistoryCreated="getOrder()"/>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-6 ">
        <q-card class="rounded-sm">
          <q-card-section>
            <div class="text-h6 text-bold q-mb-md">{{$tr('qcommerce.layout.orderTotal')}}</div>
          </q-card-section>

          <q-card-section>

            <div class="row">
              <div class="col-md-12">

                <div class="row">
                  <div class="row q-mb-sm full-width">
                    <div class="col-6 secondary-font">
                      {{$tr('qcommerce.layout.subtotal')}}
                    </div>
                    <div class="col-6 text-right secondary-font">

                      $ {{$n(order.total - order.shippingAmount)}}
                    </div>
                  </div>
                  <div class="row q-mb-sm full-width">
                    <div class="col-6 secondary-font">
                      {{$tr('qcommerce.layout.shipping')}}
                    </div>
                    <div class="col-6 text-right secondary-font">
                      $ {{$n(order.shippingAmount)}}
                    </div>
                  </div>
                  <div class="row q-mb-sm q-title text-weight-bold full-width">
                    <div class="col-6  secondary-font">
                      {{$tr('qcommerce.layout.form.total')}}
                    </div>
                    <div class="col-6 text-right secondary-font">
                      $ {{$n(order.total)}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>







    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
import orderStatusHistory from '@imagina/qmarketplace/_components/admin/orders/orderStatusHistory';
import orderItems from '@imagina/qcommerce/_components/frontend/orders/orderItems';
import addStatusOrder from '@imagina/qmarketplace/_components/admin/orders/addStatusOrder'
export default {
  components:{
    orderItems,
    orderStatusHistory,
    addStatusOrder
  },
  data (){
    return {
      loading: false,
      order : {
        customer: {
          fullName: ''
        },
        items:[],
      }
    }
  },
  created() {
    this.getOrder()
  },
  methods:{
    getOrder () {
      this.loading = true
      let params = {
        params :{
        }
      }
      let criteria = this.$route.params.id
      this.$crud.show('apiRoutes.qcommerce.orders', criteria , params)
      .then( response => {
        this.order = response.data
        this.loading = false
      })
      .catch( error => {
        this.loading = false
      })
    }
  }
}
</script>
