<template>
  <q-card :class="className">
    <q-img :ratio="1" :src="product.mainImage.path" />
    <q-card-actions>
      <q-btn flat dense icon="favorite"/>
      <q-btn @click="addCart" flat dense icon="shopping_cart"/>
    </q-card-actions>
    <q-card-section class="text-left q-pa-sm">
      <q-rating size="20px"
        v-model="product.rating"
        :max="5" v-if="product.rating>0"
      />
      <h5 class="q-my-sm">${{product.price}}</h5>
      <p class="q-my-none text-truncate">{{product.name}}</p>
      <p class="q-my-none text-truncate"><small>{{product.tienda}}</small></p>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
    name: 'ProductComponent',
    props: ['product','className'],
    mounted(){
      console.log('adsadadadada product component');
    },
    methods:{
      addCart(){

        var cart_id=this.$q.localStorage.getItem("cart_id");
        if(cart_id){
          this.$crud.create("apiRoutes.qcommerce.cartProducts", {
            cart_id:cart_id,
            product_id:this.product.id,
            product_name:this.product.name,
            price:this.product.price,
            quantity:1
          }).then(response => {
            this.$alert.success({message: "Producto agregado al carrito exitosamente.", pos: 'bottom'})
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
          })
        }else{
          console.log('Adding cart method');
          this.$crud.create("apiRoutes.qcommerce.cart", {
            total:0
          }).then(response => {
            var id=response.data.id;
            this.$q.localStorage.set("cart_id", id)
            this.addCart();
          })
        }
      }//addCart
    }
}
</script>
<style lang="stylus">
.cardProductOne
  border-radius 0
  background-color #ffffff
  h5
    color $primary
  & .q-card-main
    font-size 16px
  & .q-card__actions
    background-color $secondary
    float right
    margin-top -15px
    z-index 9
    position relative
    .q-btn
      color #fff
      border-radius 0
    .q-btn:first-child
      border-left 1px solid #fff
    .q-btn:last-child
      border-right 1px solid #fff
  &:hover
    background-color $secondary
    color #fff
    h5
      color #fff
    & .q-card__actions
      background-color $primary
</style>
