<template>
   <div id="cartHeader">
      <q-btn-dropdown
              split
              push
      >
         <template v-slot:label>
            <div class="row items-center no-wrap">
               <q-icon left name="fa fa-shopping-cart" color="white "></q-icon>
               <q-badge align="top" class="bg-store-secondary" floating>{{countProduct}}</q-badge>

            </div>
         </template>
         <div class="row no-wrap q-pa-md">
            <div class="column">
               <q-list>
                  <q-item class="q-my-sm" v-close-popup v-for="product in cart.products" :key="product.id">
                     <q-item-section avatar top>
                        <q-avatar  rounded default text-color="white">
                           <img :src="product.mainImage.path" alt="">
                        </q-avatar>
                     </q-item-section>
                     <q-item-section top>
                        <q-item-label  lines="1">
                           <span class="text-weight-medium">{{product.name}}</span></q-item-label>
                        <q-item-label class="text-right"><spam class="text-weight-medium">Cant.</spam>{{product.quantity}}</q-item-label>
                        <q-item-label class="text-right text-weight-bold" color="primary">$ {{$n(product.total)}}</q-item-label>
                     </q-item-section>
                     <q-item-section top side>
                        <div class="text-grey-8 q-gutter-xs">
                           <q-btn @click="deleteProduct(product.id)" class="gt-xs" size="12px" flat dense round icon="delete" ></q-btn>
                        </div>
                     </q-item-section>
                  </q-item>
                  <q-separator spaced></q-separator>
                  <q-item class="q-my-sm">
                     <q-btn
                             @click="$router.push({name: 'marketplace.checkout', params:{storeId:storeData.id}})"
                             color="primary"
                             label="Ir a Pagar"
                             push
                             size="md"
                             v-close-popup
                             style="margin: auto"
                     ></q-btn>
                  </q-item>
               </q-list>

            </div>


         </div>
      </q-btn-dropdown>

   </div>
</template>
<script>

   export default {
      name: 'CardUserComponent',
      data() {
         return {
            countProduct:0
         }
      },

      mounted() {
         this.$nextTick(function () {
         })
      },

      computed: {
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         },
         cart() {
            this.$store.dispatch('qmarketplaceCart/GET_CART', this.storeData.id);
            let cart=this.$store.state.qmarketplaceCart.cart
            if(cart.products) this.countProduct=cart.products.length;
            return cart
         },
      },
      methods: {
         async  deleteProduct(id) {
               this.loading = true
               this.$store.dispatch('qmarketplaceCart/DEL_PRODUCT_FROM_CART',id).then(response => {
                  this.$q.dialog({
                     title: 'Producto eliminado del carrito!',
                     color: 'negative',
                     ok: 'Ir al carrito',
                     cancel: 'Seguir comprando'
                  }).then(async data => {
                     this.$router.push({name: 'shopping.cart.index'})
                  }).catch(() => {
                     this.init()
                     this.loading = false
                  })
               }).catch(error => {
                  this.$alert.error(error)
                  this.loading = false
               })
         },
      }
   }
</script>

<style lang="stylus">
   #cartHeader
      .q-btn-group
         box-shadow: none;

      .q-btn-dropdown__arrow
         display block !important
</style>
