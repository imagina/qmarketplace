<template>
  <q-card :class="className">
    <q-card-section class="q-pa-sm">
      <q-img :ratio="1" :src="product.mainImage.path" class="rounded-sm"/>
    </q-card-section>
    <q-card-section class="card-title bg-store-primary">
      <q-list>
        <q-item>
          <q-item-section><h5 class="q-my-none text-white">${{product.price}}</h5></q-item-section>
          <q-item-section avatar>
            <q-icon color="white" name="favorite" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-section class="card-main q-pt-sm">
      <q-rating size="20px"
        v-model="product.averageRating" color="store-secondary"
        :max="5" @input="val => { rating() }"
      />
      <p class="q-my-sm ">{{product.name}}</p>
      <p class="q-my-sm "><small>{{store.name}}</small></p>
    </q-card-section>
    <q-card-actions>
      <q-btn @click="addCart" color="store-secondary" label="COMPRAR" icon="shopping_cart"/>
    </q-card-actions>
  </q-card>
</template>
<script>
export default {
    name: 'ProductComponent',
    props: ['product','className'],
    computed:{
      store(){
        let storeSlug = this.$route.params.slug
        return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
      }
    },
    mounted(){
    },
    methods:{
      rating(){
        this.$axios.post(config('apiRoutes.qcommerce.products')+'/rating/'+this.product.id,{
          attributes:{
            rating:this.product.averageRating
          }
        }).then(response => {
          this.$alert.success({message: "Calificación registrada exitosamente", pos: 'bottom'});
        }).catch(error => {
          this.$alert.error({message: error.response.data.errors, pos: 'bottom'})
        });
      },//rating
      createCart(){
        this.$crud.create("apiRoutes.qcommerce.cart", {
          total:0
        }).then(response => {
          var id=response.data.id;
          var carts=this.$q.localStorage.getItem("carts");
          if(carts){
            carts.push({id:id,storeId:this.product.storeId});
          }else{
            carts=[];
            carts.push({id:id,storeId:this.product.storeId});
          }
          this.$q.localStorage.set("carts", carts)
          this.addCart();
        })
      },
      addCart(){
        var carts=this.$q.localStorage.getItem("carts");
        if(carts){
          var cartId=0;
          for (var i=0;i<carts.length;i++){
            if(carts[i].storeId==this.product.storeId){
              cartId=carts[i].id;
              break;
            }//if
          }///for
          if(cartId==0){
            this.createCart();
          }else{
            this.$crud.create("apiRoutes.qcommerce.cartProducts", {
              cart_id:cartId,
              product_id:this.product.id,
              product_name:this.product.name,
              price:this.product.price,
              quantity:1
            }).then(response => {
              this.$alert.success({message: "Producto agregado al carrito exitosamente.", pos: 'bottom'})
            }).catch(error => {
              this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
            });
          }//else
        }else{
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
  & .card-title
    margin-right 30px
    margin-top -30px
    z-index 9
    position relative
    margin-bottom 10px
    padding 10px
    border-radius 0 10px 10px 0 !important
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
