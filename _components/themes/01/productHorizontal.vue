<template>
  <q-card :class="className" class="q-pa-md">
    <q-card-section class="q-pb-lg">
      <div class="row">
        <div class="col-6">
            <q-img :ratio="1" :src="product.mainImage.path" />
        </div>
        <div class="col-6">
          <q-card-section>
            <p class="q-my-none text-truncate">{{product.name}}</p>
            <p class="q-my-none text-truncate"><small>{{storeName}}</small></p>
            <h5 class="q-my-sm text-store-primary">${{product.price}}</h5>
          </q-card-section>
          <q-card-actions>
            <q-btn flat dense icon="favorite"/>
            <q-btn @click="addCart" flat dense icon="shopping_cart"/>
          </q-card-actions>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
    name: 'ProductHorizontalComponent',
    props: ['product','className','storeName','storeId','storeThemeConfig'],
    methods:{
      createCart(){
        this.$crud.create("apiRoutes.qcommerce.cart", {
          total:0
        }).then(response => {
          var id=response.data.id;
          var carts=this.$q.localStorage.getItem("carts");
          if(carts){
            carts.push({id:id,storeId:this.storeId});
          }else{
            var carts=[];
            carts.push({id:id,storeId:this.storeId});
          }
          this.$q.localStorage.set("carts", carts)
          this.addCart();
        })
      },
      addCart(){
        var carts=this.$q.localStorage.getItem("carts");
        if(carts){
          var cartId=0;
          for (var i=0;carts.length;i++){
            if(carts[i].storeId==this.storeId){
              cartId=carts[i].id;
              break;
            }//if
          }//for
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
          })
        }else{
          this.createCart();
        }
      }//addCart

    }
}
</script>
<style lang="stylus">
.cardProductH01
  border-radius 0
  background-color #ffffff
  position relative
  h5
    color $storePrimary
  & .q-card__section
    font-size 16px
  & .q-card__actions
    background-color $storeSecondary
    position absolute
    right 0
    bottom 15px
    .q-btn
      color #fff
      border-radius 0
    .q-btn:first-child
      border-left 1px solid #fff
    .q-btn:last-child
      border-right 1px solid #fff
  &:hover
    background-color $storeSecondary
    color #fff !important
    h5
      color #fff !important
    & .q-card__actions
      background-color $storePrimary

</style>
