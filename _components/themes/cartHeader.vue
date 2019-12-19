<template>
   <div id="cartHeader">
      <q-btn-dropdown
              split
              push
      >
         <template v-slot:label>
            <div class="row items-center no-wrap">
               <q-icon left name="fa fa-shopping-cart" color="white "></q-icon>
               <q-badge align="top" class="bg-store-secondary" floating>{{cart.products.length}}</q-badge>
            </div>
         </template>
         <div class="row no-wrap q-pa-md">
            <div class="column">
               <q-list>
                  <q-item class="q-my-sm" v-close-popup v-for="product in cart.products" :key="product.id">
                     <q-item-section avatar>
                        <q-avatar text-color="white">
                           <img :src="product.mainImage.path" alt="">
                        </q-avatar>
                     </q-item-section>
                     <q-item-section>
                        <q-item-label>{{product.name}}</q-item-label>
                        <q-item-label>cant. {{product.quantity}}</q-item-label>
                        <q-item-label class="text-right" color="primary">$ {{$n(product.total)}}</q-item-label>
                     </q-item-section>
                     <q-item-section side>
                        <q-btn>
                           <q-icon name="delete" color="red"></q-icon>
                        </q-btn>

                     </q-item-section>
                  </q-item>
                  <q-separator inset class="q-mx-lg "></q-separator>
                  <q-item class="q-my-sm">
                     <q-btn
                             @click="$router.push({name: 'marketplace.checkout', params:{storeId:storeData.id}})"
                             color="primary"
                             label="Ir a Pagar"
                             push
                             size="md"
                             v-close-popup

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
         }
      },

      mounted() {
         this.$nextTick(function () {
            this.getCart()
         })
      },

      computed: {
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         },
         cart() {
            this.$store.dispatch('qmarketplaceCart/GET_CART', this.storeData.id);
            return this.$store.state.qmarketplaceCart.cart
         },
      },
      methods: {


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
