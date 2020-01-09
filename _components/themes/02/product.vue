<template>
   <q-card :class="className">
      <q-card-section class="q-pa-sm">
         <router-link
                 :to="{name: 'stores.product.show',params:{slug: storeData.slug, product: product.slug}}">
            <q-img :ratio="1" :src="product.mainImage.path" class="rounded-sm"/>
         </router-link>
      </q-card-section>
      <q-card-section class="card-title bg-store-primary adri">
         <q-list>
            <q-item>
               <q-item-section><h5 class="q-my-none text-white">${{$n(product.price)}}</h5></q-item-section>
               <q-item-section avatar>
                  <add-cart-favorite :favorite="true" :addCartDisable="false" color="white"></add-cart-favorite>
               </q-item-section>
            </q-item>
         </q-list>
      </q-card-section>
      <q-card-section class="card-main q-pt-sm">
         <q-rating size="20px"
                   v-model="product.averageRating" color="store-secondary"
                   :max="5" @input="val => { rating() }"
         />
         <router-link :to="{name: 'stores.product.show',params:{slug: storeData.slug, product: product.slug}}">
            <p class="q-my-sm text-dark">{{product.name}}</p>
         </router-link>
         <p class="q-my-sm "><small>{{storeData.name}}</small></p>
      </q-card-section>
      <q-card-actions>
         <add-cart-favorite :productId="product.id"  :price="product.price" :favorite="false" color="storePrimary"></add-cart-favorite>
      </q-card-actions>
   </q-card>
</template>
<script>
   import addCartFavorite from '@imagina/qmarketplace/_components/cart/addCartFavorite';
   export default {
      name: 'ProductComponent',
      props: ['product', 'className'],
      components: {
         addCartFavorite
      },
      mounted() {
      },
      computed: {
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         },
      },
      methods: {
         rating() {
            this.$axios.post(config('apiRoutes.qcommerce.products') + '/rating/' + this.product.id, {
               attributes: {
                  rating: this.product.averageRating
               }
            }).then(response => {
               this.$alert.success({message: "Calificación registrada exitosamente", pos: 'bottom'});
               this.getData();
            }).catch(error => {
               this.$alert.error({message: error.response.data.errors, pos: 'bottom'})
            });
         },//rating
         createCart() {
            this.$crud.create("apiRoutes.qcommerce.cart", {
               total: 0
            }).then(response => {
               var id = response.data.id;
               var carts = this.$q.localStorage.getItem("carts");
               if (carts) {
                  carts.push({id: id, storeId: this.storeData.id});
               } else {
                  var carts = [];
                  carts.push({id: id, storeId: this.storeData.id});
               }
               this.$q.localStorage.set("carts", carts)
               this.addCart();
            })
         },
         addCart() {
            var carts = this.$q.localStorage.getItem("carts");
            if (carts) {
               var cartId = 0;
               for (var i = 0; i < carts.length; i++) {
                  if (carts[i].storeId == this.storeData.id) {
                     cartId = carts[i].id;
                     break;
                  }//if
               }//for
               if (cartId == 0) {
                  this.createCart();
               } else {
                  this.$crud.create("apiRoutes.qcommerce.cartProducts", {
                     cart_id: cartId,
                     product_id: this.product.id,
                     product_name: this.product.name,
                     price: this.product.price,
                     quantity: 1
                  }).then(response => {
                     this.$alert.success({message: "Producto agregado al carrito exitosamente.", pos: 'bottom'})
                  }).catch(error => {
                     this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
                  });
               }//else
            } else {
               this.createCart();
            }
         }//addCart

      }
   }
</script>
<style lang="stylus">
   .cardProductTwo
      border-radius 20px 20px 20px 0
      position relative
      margin 8px
      background-color var(--q-color-light)
      overflow hidden
      & .card-title
         margin-right 30px
         margin-top -30px
         z-index 9
         position relative
         margin-bottom 10px
         padding 10px
         border-radius 0 10px 10px 0 !important
         margin-left -10px
         -webkit-transform skew(10deg)
         transform skew(10deg)
         & .q-list
            -webkit-transform  skew(-10deg)
            transform skew(-10deg)
      & .card-main
         font-size 16px

      & .q-card__actions
         .q-btn
            margin-left -7px
            border-radius 0
            margin-bottom 10px
            box-shadow none
            padding-right 20px


</style>
