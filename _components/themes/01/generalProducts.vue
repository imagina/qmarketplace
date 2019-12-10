<template>
   <div class="bg-light q-py-lg q-px-md">
      <h4 class="text-center text-store-secondary">
         • PRODUCTOS •
      </h4>
      <div class="q-container">
         <div class="row q-col-gutter-lg q-py-lg">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-3" v-for="product in products">
               <product :product="product" className="cardProductOne"></product>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
   import product from '@imagina/qmarketplace/_components/themes/01/product'

   export default {

      components: {
         product
      },
      computed: {
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         }
      },
      mounted() {
         this.getProducts();
      },
      methods: {
         getProducts() {
            //
            let params = {
               remember: false,
               params: {
                  include: '',
                  filter: {
                     store: this.storeData.id,
                  },
                  take: 87
               }
            };//params
            this.$crud.index("apiRoutes.qcommerce.products", params).then(response => {
               this.products = response.data;
            });
         }
      },
      data() {
         return {
            products: []
         }
      }
   }
</script>
<style lang="stylus">
</style>
