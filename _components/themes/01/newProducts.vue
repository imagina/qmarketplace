<template>
    <div class="q-mb-xl">
        <div class="bg-store-primary rounded-sm text-weight-bold q-inline-block text-white q-px-lg q-py-md">
            NUEVO
        </div>
        <div class="row q-col-gutter-lg q-pt-lg">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6" v-for="product in products">
            <product :product="product" className="cardProductH01"></product>
          </div>
        </div>
    </div>
</template>
<script>
import product from '@imagina/qmarketplace/_components/themes/01/productHorizontal'
export default {
  name: 'NewProductsComponent',
  components: {
    product
  },
  computed:{
    store(){
      let storeSlug = this.$route.params.slug
      return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
    }
  },
  mounted(){
    this.getProducts();
  },
  methods:{
    getProducts(){
      //
      let params = {
        remember: false,
        params: {
          include: '',
          filter:{
            store: this.store.id,
            news:true
          },
          take:4
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
        //     image: '/statics/img/product.jpg',
        //     tienda: 'artesanias',
        //     price: 10.00,
        //     rating: 3
        // },
        // {
        //     name: 'Mochila 2',
        //     image: '/statics/img/contacto.jpg',
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
