<template>
  <div class="bg-grey-2">
     <header-store></header-store>

     <div class="q-container">
       <div class="row q-col-gutter-lg q-py-lg">
         <div class="col-md-12">
           <span class="q-display-1">Filtros de búsqueda</span>
           <br>
         </div>
         <div class="col-md-4">
           <p class="caption q-mb-xs">Categoría
             <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
               <q-tooltip>
                 Selecciona una categoría para obtener sus productos
               </q-tooltip>
             </q-btn>
           </p>
           <tree-select
             :clearable="false"
             :append-to-body="true"
             class="q-mb-md"
             filter="searchText"
             :options="categories"
             value-consists-of="BRANCH_PRIORITY"
             v-model="categoryId"
             placeholder=""
           />
         </div>
         <div class="col-md-4">
           <p class="caption q-mb-xs">Nombre
             <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
               <q-tooltip>
                 Puedes buscar por las iniciales de un producto
               </q-tooltip>
             </q-btn>
           </p>
           <q-input dense v-model="search" placeholder=""></q-input>
         </div>
         <div class="col-md-4 text-center">
           <q-btn @click="getProducts()" color="primary" icon="fas fa-search">
             Buscar
           </q-btn>
         </div>
       </div>
     </div>

    <div class="q-container">
      <div class="row q-col-gutter-lg q-py-lg">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"  v-if="products.length" v-for="product in products" :key="product.id">
            <product :product="product" className="cardProductH"></product>
          </div>
          <div
            class="row"
            v-else>
            <div class="col-md-12">
              <span class="q-display-1">
                No hay productos que concuerden con la selección.
              </span>
            </div>
          </div>
          <div
            class="row"
            v-if="paginate.maxPages > 1">
            <div class="col-md-12 flex justify-end q-pt-xl">
              <q-pagination
                direction-links
                @input="getProducts()"
                v-model="paginate.page"
                :min="paginate.minPages"
                :max="paginate.maxPages"/>
            </div>
          </div>
        </div>
      </div>
      <!--Inner Loading-->
      <inner-loading :visible="visible"></inner-loading>
     <footer-store></footer-store>
    </div>
</template>

<script>
  import icommerceService from '@imagina/qcommerce/_services/index';
  import product from '@imagina/qmarketplace/_components/themes/01/product'
  import headerStore from '@imagina/qmarketplace/_components/themes/header'
  import footerStore from '@imagina/qmarketplace/_components/themes/footer'
  export default {

     meta() {
        let routetitle = this.$route.params.search || 'Productos de la tienda '+this.storeData.name;
        let siteName = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name')
        let siteDescription = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-description')
        return {
           title: `${routetitle.charAt(0).toUpperCase() + routetitle.slice(1)} | ${siteName}`,
           meta: {
              description: {name: 'description', content: (siteDescription || siteName)},
           },
        }
     },



    components: {
      product,
       footerStore,
       headerStore,
    },
    beforeRouteLeave(to, from, next) {
      next()
      // this.focusSearch()//Check if load search
    },
    watch: {
      $route(to, from) {
        this.getProducts()
      }
    },
    mounted() {
      console.log('params');
      console.log(this.$route.params);
      this.$nextTick(() => {
        this.init()
      })
    },
    data() {
      return {
        showProduct: false,
        visible: false,
        categoryId:null,
        products: [],
        categories: [],
        paginate: {
          page: 1,
          take: 10,
          minPages: 1,
          maxPages: 0
        },
        search: ''
      }
    },
    computed:{
      storeData(){
        let storeSlug = this.$route.params.slug
        return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
      }
    },
    methods: {
      //Init
      init() {
        this.search=this.$route.params.search;
        this.getProducts()//Get products
        this.getProductCategories()//Get products
      },
      // Get all products by category :slug
      getProducts() {
        this.visible = true
        let params = {
          params: {
            filter: {
              // categorySlug: this.$route.params.category,
              storeSlug:this.$route.params.slug,
              locale: 'es',
              search: this.search
            },
            take: this.paginate.take,
            page: this.paginate.page,
          }
        }
        if(this.categoryId){
          params.params.filter.categories=[this.categoryId]
        }

        icommerceService.crud
          .index('apiRoutes.qcommerce.products', params)
          .then(response => {
            this.paginate.maxPages = response.meta.page.lastPage
            this.products = response.data
            this.visible = false
          })
          .catch(error => {
            this.$alert.error({message: 'Failed: ' + error, pos: 'bottom'})
            this.visible = false
          })//
      },getProductCategories(){
        let params = {
          params: {
            filter:{
              'store': this.storeData.id
            }
          }
        }
        this.visible = true
        this.$crud.index('apiRoutes.qcommerce.categories', params).then( response => {
          this.categories=this.$array.tree(response.data);//
          this.visible = false
        }).catch( error => {
          this.$alert.error({ message: this.$tr('ui.message.errorRequest'), pos: 'bottom' })
          this.visible = false
        })
      },
    }
  }

</script>

<style lang="stylus">
  div.product
    cursor pointer

  .product-img
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%
    height 260px
    border: 1px solid #dddddd52
    border-radius 10px

  .btn-product
    margin-top 240px

  .color-secondary
    color: $secondary

  .color-primary
    color: $secondary

</style>
