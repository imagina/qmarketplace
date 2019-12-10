<template>
   <div class="q-mb-xl">
      <div class="bg-store-primary rounded-sm text-weight-bold q-inline-block text-white q-px-lg q-py-md">
         DESTACADOS
      </div>
      <div class="row q-col-gutter-lg q-py-lg">
         <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" v-for="(product, index) in products" :key="index">
            <product :product="product" className="cardProductOne"></product>
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
            let params = {
               remember: false,
               params: {
                  include: '',
                  filter: {
                     store: this.storeData.id,
                     categories: [2]
                  },
                  take:2
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
