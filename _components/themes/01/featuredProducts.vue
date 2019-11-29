<template>
  <div class="q-mb-xl">
    <div class="bg-store-primary rounded-sm text-weight-bold q-inline-block text-white q-px-lg q-py-md">
      DESTACADOS
    </div>
    <div class="row q-col-gutter-lg q-py-lg">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" v-for="(product, index) in products" :key="index">
        <product :storeName="store.name" :storeId="store.id" :storeThemeConfig="store.options.theme_config" :product="product" className="cardProductOne"></product>
      </div>
    </div>
  </div>
</template>
<script>
import product from '@imagina/qmarketplace/_components/themes/01/product'
export default {
  name: 'FeaturedProductsComponent',
  components: {
    product
  },
  props: {
    'store': { type:Object, default: []}
  },
  mounted(){
    this.getProducts();
  },
  methods:{
    getProducts(){
      let params = {
        remember: false,
        params: {
          include: '',
          filter:{
            store: this.store.id,
            categories:[2]
          }
        }
      };//params
      this.$crud.index("apiRoutes.qcommerce.products",params).then(response => {
        this.products=response.data;
      });
    }
  },
  data () {
    return {
      products:  [
        // {
        //     name: 'Mochila 1',
        //     mainImage: { path: '/statics/img/product.jpg' },
        //     tienda: 'artesanias',
        //     price: 10.00,
        //     rating: 3
        // },
        // {
        //     name: 'Mochila 2',
        //     mainImage: { path: '/statics/img/product.jpg' },
        //     tienda: 'artesanias',
        //     price: 10.00,
        //     rating: 3
        // },
        // {
        //     name: 'Mochila 3',
        //     mainImage: { path: '/statics/img/product.jpg' },
        //     tienda: 'artesanias',
        //     price: 10.00,
        //     rating: 3
        // }
      ]
    }
  }
}
</script>
<style lang="stylus">
</style>
