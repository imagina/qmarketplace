<template>
   <div>
      <div v-if="store.themeId==1" class="theme-layout-01">
         <header1 :store="store" :cart="cart"></header1>
      </div>
      <div v-else-if="store.themeId==2" class="theme-layout-02">
         <header2 :store="store" :cart="cart"></header2>
      </div>
      <div v-else-if="store.themeId==3" class="theme-layout-03">
         <header3 :store="store" :cart="cart"></header3>
      </div>
   </div>
</template>

<script>
   import header1 from '@imagina/qmarketplace/_components/themes/01/top'
   import header2 from '@imagina/qmarketplace/_components/themes/02/top'
   import header3 from '@imagina/qmarketplace/_components/themes/03/top'

   export default {
      name: 'headerStore',
      components: {
         header1,
         header2,
         header3
      },
      data() {
         return {
            store: [],
            cart: null
         }
      },
      created() {
         this.getTheme();
         this.getCart();
      },
      methods: {
         getCart() {
            var carts = this.$q.localStorage.getItem("carts");
            if (carts) {
               var cartId = 0;
               for (var i = 0; i < carts.length; i++) {
                  if (carts[i].storeId == this.store.id) {
                     this.$crud.show("apiRoutes.qcommerce.cart", carts[i].id, {}).then(response => {
                        this.cart = response.data;
                     });
                     break;
                  }//if
               }//for
            }
         },
         getTheme() {
            let storeSlug = this.$route.params.slug
            let store = this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
            if (store) {
               this.store = store
            }
         },
      }
   }
</script>
<style lang="stylus">
</style>
