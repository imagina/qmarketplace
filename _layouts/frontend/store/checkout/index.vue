<template>
  <q-page class="page">

    <div class="bg-fondo q-px-sm q-py-xl">
      <div class="q-container">
        <div class="row justify-end">
          <div class="col-auto text-center q-my-lg">
            <q-breadcrumbs>
              <q-breadcrumbs-el label="Inicio"  to="/" />
              <q-breadcrumbs-el :label="$tr('qsubscription.layout.form.checkout.finalizePurchase')"/>
            </q-breadcrumbs>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <h5 class="q-ma-md text-secondary font-family-secondary"><i class="fas fa-truck text-primary"></i>
              {{$tr('qsubscription.layout.form.checkout.shippingInformation')}}
            </h5>
          </div>
        </div>
        <div class="row gutter-lg">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8">

            <q-card class="rounded-sm bg-white q-mb-xl">

              <q-card-section class="q-pa-xl form-general">

                <div class="row gutter-md justify-center">

                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Dirección</p>
                      <q-select
                      class="full-width"
                      v-model="form.addressShippingId"
                      :options="addresses"
                      />
                    </q-field>
                  </div>

                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">

                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">{{$tr('ui.form.name')}}</p>
                      <q-input dense v-model="form.firstName" placeholder="Emelis" />
                    </q-field>
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">{{$tr('ui.form.phone')}}</p>
                      <q-input type="text" v-model="form.telephone" placeholder="+00 00 00" />
                    </q-field>
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">Provincia</p>
                      <q-select
                      @input="val => { getCities() }"
                      v-model="province_id"
                      :options="optionsProvinces"
                      />
                    </q-field>

                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-none">{{$tr('ui.form.address')}}</p>
                      <q-input type="text" v-model="form.paymentAddress1" placeholder="(Para la entrega de productos adquiridos)" />
                    </q-field>

                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">{{$tr('ui.form.lastName')}}</p>
                      <q-input type="text" v-model="form.lastName" placeholder="Gonzalez" />
                    </q-field>

                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">{{$tr('ui.form.email')}}</p>
                      <q-input type="email" v-model="form.email" placeholder="info@lorem.com" />
                    </q-field>

                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">{{$tr('qsubscription.layout.form.checkout.cityResidence')}}</p>
                      <q-select
                      v-model="city_id"
                      :options="optionsCities"
                      />
                    </q-field>
                    <q-btn
                    @click="addAddress()"
                    size="lg"
                    class="capitalize text-weight-bold rounded-sm q-mb-md" color="primary"
                    label="Agregar dirección" />

                  </div>

                  <q-radio v-model="form.shippingMethodId" v-for="(shipMethod,index) in shippingMethods" :key="'shippingMethod'+index" :val="shipMethod.id" :label="shipMethod.title" />
                  <!-- <div class="col-xs-12 col-sm-6 text-center">

                    <q-btn outline size="lg" class="rounded-md" no-caps icon="fa fa-truck text-primary" :label="$tr('qsubscription.layout.form.checkout.homeDelivery')" />
                  </div> -->
                  <!-- <div class="col-xs-12 col-sm-6 text-center">
                    <q-btn outline size="lg" class="rounded-md" no-caps icon="fa fa-shopping-basket text-primary" :label="$tr('qsubscription.layout.form.checkout.storePickup')" />
                  </div> -->


                </div>
              </q-card-section>

            </q-card>


            <h5 class="q-ma-md text-secondary font-family-secondary">
              <i class="fas fa-credit-card text-primary"></i>
              {{$tr('qsubscription.layout.form.checkout.paymentMethods')}}
            </h5>

            <q-card class="rounded-sm bg-white q-mb-xl">

              <q-card-section class="q-pa-xl form-general">

                <div class="row gutter-md justify-center">
                  <div class="col-12">

                    <!-- <hr class="line-grey">
                    <div class="text-primary q-subheading q-my-lg">
                    <i class="fas fa-credit-card q-mr-md"></i>
                    <strong>
                    Paypal
                  </strong>
                </div>
                <hr class="line-grey">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do ei.</span> -->

                <!-- <div class="q-my-xl">
                <span >
                <i class="fab fa-cc-mastercard q-mr-sm fa-4x"></i>
              </span>
              <span >
              <i class="fab fa-cc-visa q-mr-sm fa-4x"></i>
            </span>
            <span >
            <i class="fab fa-cc-diners-club q-mr-sm fa-4x"></i>
          </span>
          <span >
          <i class="fab fa-cc-amex q-mr-sm fa-4x"></i>
        </span>
      </div> -->

      <q-radio v-model="form.paymentMethodId" v-for="(payMethod,index) in paymentMethods" :key="'paymentMethod'+index" :val="payMethod.id" :label="payMethod.title" />
      <!-- <q-radio v-model="paymentMethod" val="paypal" label="Paypal" />
      <hr class="line-grey q-my-md">
      <q-radio v-model="paymentMethod" val="payu" label="PayU" />
      <hr class="line-grey q-my-md">
      <q-radio v-model="paymentMethod" val="contraentrega"  label="Contraentrega" />
      <hr class="line-grey q-mt-md"> -->

    </div>
  </div>

</q-card-section>

</q-card>


<h5 class="q-ma-md text-secondary font-family-secondary">
  <i class="fas fa-shopping-basket text-primary"></i>
  {{$tr('qsubscription.layout.form.checkout.products')}}
</h5>

<q-card class="rounded-sm bg-white q-pa-md" v-if="cart">

  <q-card-section>
    <!-- PRODUCT ROW -->
    <div class="row gutter-sm" v-for="product in cart.products">
      <div class="col-xs-5 col-sm-2 col-md-2">
        <div class="ratio-1" style="border: 2px solid #ccc;">
          <q-img
          :src="product.mainImage.path"
          style="width: 100%"
          >
        </q-img>
        <!-- <img :src="product.mainImage.path" class="img" :alt="product.name"> -->
        <!-- <img src="/assets/img/plan-oro.png" alt="name product"> -->
      </div>
    </div>
    <div class="col-xs-7 col-sm-6 col-md-6">
      <h6 class="text-primary font-family-secondary q-mt-sm q-mb-none">{{product.name}}</h6>
      <div class="q-body-1 text-secondary q-mb-lg">{{product.product.summary}}</div>
      <div class="q-subheading text-primary text-weight-bold q-mb-lg">$ {{product.priceUnit}}</div>
      <!-- <div class="q-body-1 text-secondary q-mb-sm">Enviado y Vendido por Lorem Ipsum</div> -->
    </div>
    <div class="col-xs-11 col-sm-3 col-lg-3 self-center">
      <div class="row items-center">
        <div class="col-6 text-right q-pr-sm">
          <div class="q-body-1 text-secondary">{{$tr('qsubscription.layout.form.types.quantity')}}</div>
        </div>
        <div class="col-6">
          <q-select
          @input="val => { updateCart(product) }"
          class="select-border"
          v-model="product.quantity"
          align="right"
          hide-underline
          :options="selectOptions"
          />
        </div>
      </div>
    </div>
    <div class="col-xs-1 col-sm-1 col-md-1 self-center">
      <q-btn @click="deleteProductCart(product)" round color="primary" icon="fas fa-times" />
    </div>

  </div>

  <!-- SHIPPING OPTIONS -->
  <!-- <div class="row">
  <div class="col-12">
  <hr class="line-grey q-my-md">
  <h6 class="text-primary font-family-secondary q-mt-sm q-mb-none">
  <i class="fas fa-shopping-basket"></i>
  {{$tr('qsubscription.layout.form.checkout.shippingOptions')}}
</h6>
<q-field class="q-mt-md">
<q-radio class="q-ml-xl" v-model="shippingOptions" val="lorem"  label="Lorem ipsum dolor sit amet, co" />
</q-field>
<hr class="line-grey q-mt-md">
</div>
</div> -->

</q-card-section>

</q-card>

<div class="row">
  <div class="col-12 text-right">
    <h6 class="text-weight-bold q-my-lg">
      TOTAL
      <span v-if="cart" class="text-primary q-pl-md">$ {{cart.total}}</span>
      <span v-else class="text-primary q-pl-md">$ 0</span>
    </h6>
    <q-btn
    @click="submitOrder"
    size="lg"
    class="capitalize text-weight-bold rounded-sm q-mb-md" color="primary"
    :label="$tr('qsubscription.layout.form.checkout.finalizePurchase')" />
  </div>
</div>


</div>
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">
  <q-card class="rounded-sm bg-white plan">
    <q-card-section style="color: #333333;">
      <q-btn size="lg"
      class="capitalize text-weight-bold full-width rounded-sm q-mb-md" color="primary"
      :label="$tr('qsubscription.layout.form.checkout.finalizePurchase')" />
      <hr class="line-grey">
      <div class="row">
        <div class="col-6">
          <p class="q-subheading q-my-md">Subtotal</p>
        </div>
        <div class="col-6 text-right">
          <p v-if="cart" class="q-subheading q-my-md">$ {{cart.total}}</p>
          <p v-else class="q-subheading q-my-md">$ 0</p>
        </div>
      </div>
      <hr class="line-grey">
      <div class="row">
        <div class="col-6">
          <p class="q-subheading q-my-md">{{$tr('qsubscription.layout.form.checkout.shipping')}}</p>
        </div>
        <div class="col-6 text-right">
          <p class="q-subheading q-my-md">$0</p>
        </div>
      </div>
      <hr class="line-grey">
      <div class="row">
        <div class="col-6">
          <p class="q-subheading q-my-md">{{$tr('qsubscription.layout.form.checkout.discount')}}</p>
        </div>
        <div class="col-6 text-right">
          <p class="q-subheading q-my-md">$0</p>
        </div>
      </div>
      <hr class="line-grey">
      <div class="row">
        <div class="col-12">
          <div class="q-subheading q-my-md cursor-pointer" ><u>{{$tr('qsubscription.layout.form.checkout.calculateShipping')}}</u></div>
        </div>
      </div>
      <hr class="line-grey">
      <div class="row">
        <div class="col-6">
          <p class="q-subheading text-weight-bold q-my-md">TOTAL</p>
        </div>
        <div class="col-6 text-right">
          <p v-if="cart" class="q-subheading text-weight-bold text-primary q-my-md">$ {{cart.total}}</p>
          <p v-else class="q-subheading text-weight-bold text-primary q-my-md">$ 0</p>
        </div>
      </div>
    </q-card-section>
  </q-card>

</div>
</div>
</div>
</div>


</q-page>
</template>
<script>
//Plugins
import {required} from 'vuelidate/lib/validators'
//Components
import mediaForm from '@imagina/qmedia/_components/form'
export default {
  props: {},
  components: { mediaForm},
  watch: {},
  validations() {
    return {}
  },
  computed:{

  },
  data() {
    return {
      loading: {
        page: false
      },
      cart:null,
      configName: 'apiRoutes.qmarketplace.checkout',
      // product:[],
      paymentMethods:[],
      shippingMethods:[],
      storeId: null,
      cartId: null,
      //Quantity of product select options
      selectOptions:[
        {label:"1",value:1},
        {label:"2",value:2},
        {label:"3",value:3},
        {label:"4",value:4},
        {label:"5",value:5},
        {label:"6",value:6},
        {label:"7",value:7},
        {label:"8",value:8},
        {label:"9",value:9},
        {label:"10",value:10},
        {label:"11",value:11},
        {label:"12",value:12},
      ],
      optionsCities:[],
      shippingOptions:"lorem",
      addresses:[],
      form:{
        firstName:'',
        lastName:'',
        email:'',
        telephone:'',
        paymentAddress1:'',
        paymentZipCode:'1234',
        addressPaymentId:0,
        addressShippingId:{label:"Selecciona una dirección",value:0,id:0},
        paymentCity:{label:"Selecciona una ciudad",value:0,id:0},
        paymentCountry:{label:"Selecciona una provincia",value:0,id:0},
        paymentMethodId:0,
        // paymentMethod:'',
        // paymentCode:'',
        shippingAddress1:'',
        shippingZipCode:'1234',
        shippingCity:{label:"Selecciona una ciudad",value:0,id:0},
        shippingCountry:{label:"Selecciona una provincia",value:0,id:0},
        shippingMethodId:0,
        // shippingMethod:'',
        // shippingCode:'',
        storeId:0,
        customerId: this.$store.state.quserAuth.userId,
        coupon_code:''
      },


      name: '',
      lastName: '',
      phone: '',
      email: '',
      city_id:{label:"Selecciona una ciudad",value:0,id:0},
      province_id:{label:"Selecciona una provincia",value:0,id:0},
      optionsProvinces:[],
      address:'',
      paymentMethod:"",
      paymentMethodIndex:0,
      quantity:1,
      locale: {
        fields: {
          id: '',
          name:''
        },
        fieldsTranslatable: {

        },
        validations: {
          name: {required}
        }
      },
      editorText: {
        toolbar: [
          ['bold', 'italic', 'strike', 'underline', 'removeFormat'],
          ['link'],
          [
            {
              label: 'Font Size',
              icon: 'format_size',
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
            }
          ],
          ['quote', 'unordered', 'ordered'],
          ['fullscreen']
        ]
      },
      buttonActions: {}
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.storeId=this.$route.params.storeId;
      this.getCart();
      this.getPaymentMethods();
      this.getShippingMethods();
      this.getProvinces();
      this.getAddresses();

    })
  },
  methods: {
    getAddresses(){
      let params = {
        remember: false,
        params: {
          include: '',
          filter:{
            userId: this.$store.state.quserAuth.userId,
          }
        }
      };//params
      this.$crud.index("apiRoutes.quser.addresses",params).then(response => {
        this.addresses=[];
        this.addresses.push({label:"Selecciona una dirección",value:0,id:0});
        for(var i=0;i<response.data.length;i++){
          this.addresses.push({address1:response.data[i].address1,firstName:response.data[i].firstName,lastName:response.data[i].lastName,label:response.data[i].firstName+' '+response.data[i].lastName+' - '+response.data[i].address1,value:response.data[i].id,id:response.data[i].id});
        }
      });
    },
    addAddress(){
      if(this.form.firstName==""){
        this.$alert.error({message: "Debes ingresar un nombre", pos: 'bottom'})
      }else if(this.form.lastName==""){
        this.$alert.error({message: "Debes ingresar un apellido", pos: 'bottom'})
      }else if(this.form.telephone==""){
        this.$alert.error({message: "Debes ingresar un número de teléfono", pos: 'bottom'})
      }else if(this.form.email==""){
        this.$alert.error({message: "Debes ingresar un correo electrónico", pos: 'bottom'})
      }else if(this.province_id.value==0){
        this.$alert.error({message: "Debes seleccionar una provincia", pos: 'bottom'})
      }else if(this.city_id.value==0){
        this.$alert.error({message: "Debes seleccionar una ciudad", pos: 'bottom'})
      }else if(this.form.paymentAddress1==""){
        this.$alert.error({message: "Debes ingresar una dirección", pos: 'bottom'})
      }else{
        var data={
          userId: this.$store.state.quserAuth.userId,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          address1: this.form.paymentAddress1,
          countryId:48,
          country:"Colombia",
          provinceId:this.province_id.value,
          city:this.city_id.label,
          type:"shipping"

        };
        this.$crud.create("apiRoutes.quser.addresses", data).then(response => {
          this.$alert.success({message: this.$tr('ui.message.recordCreated'), pos: 'bottom'});
          this.form.firstName="";
          this.form.lastName="";
          this.form.telephone="";
          this.form.email="";
          this.form.paymentAddress1="";
          this.getAddresses();
        }).catch(error => {
          this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
        });
      }//else
    },
    submitOrder(){
      if(this.form.addressShippingId.value==0){
        this.$alert.error({message: "Debes seleccionar una dirección", pos: 'bottom'})
      }else if(this.form.shippingMethodId==0){
        this.$alert.error({message: "Debes seleccionar un método de envío", pos: 'bottom'})
      }else if(this.form.paymentMethodId==0){
        this.$alert.error({message: "Debes seleccionar un método de pago", pos: 'bottom'})
      }else{
        var data={};
        data=this.$clone(this.form)
        // data=this.form;
        data.paymentCity=this.city_id.value;
        data.shippingCity=data.paymentCity;
        data.paymentCountry="Bogotá";
        data.shippingCountry=data.paymentCountry;
        data.cartId=this.cart.id;
        data.storeID=this.storeId;
        var shippingMethod="";
        for(var i=0;i<this.shippingMethods.length;i++){
          if(this.shippingMethods[i].id==this.form.shippingMethodId){
            shippingMethod=this.shippingMethods[i].name;
            break;
          }
        }//for
        data.shippingMethod=shippingMethod;
        data.payment_first_name=data.addressShippingId.firstName;
        data.shipping_first_name=data.addressShippingId.firstName;
        data.payment_last_name=data.addressShippingId.lastName;
        data.shipping_last_name=data.addressShippingId.lastName;
        data.paymentAddress1=data.addressShippingId.address1;
        data.shippingAddress1=data.paymentAddress1;
        data.addressShippingId=data.addressShippingId.id;
        data.addressPaymentId=data.addressShippingId;
        // console.log('form submit');
        // console.log(data);
        this.$crud.create("apiRoutes.qcommerce.orders", data).then(response => {
          this.$alert.success({message: this.$tr('ui.message.recordCreated'), pos: 'bottom'})
        }).catch(error => {
          this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
        })
      }
    },
    getProvinces(){
      // cityOptions
      // sectorOptions
      let params = {
        remember: false,
        params: {
          include: '',
          filter:{
            allTranslations: true,
            country:48
          }
        }
      };//params
      this.$crud.index("apiRoutes.ilocations.provinces",params).then(response => {
        this.optionsProvinces=[];
        this.optionsProvinces.push({label:"Selecciona una provincia",value:0,id:0});
        for(var i=0;i<response.data.length;i++){
          this.optionsProvinces.push({label:response.data[i].name,value:response.data[i].id,id:response.data[i].id});
        }
      });
    },
    getCities(){
      if(this.province_id){
        let params = {
          remember: false,
          params: {
            include: '',
            filter:{
              allTranslations: true,
              province_id:this.province_id.value
            }
          }
        };//params
        this.$crud.index("apiRoutes.ilocations.cities",params).then(response => {
          this.optionsCities=[];
          this.optionsCities.push({label:"Selecciona una ciudad",value:0,id:0});
          for(var i=0;i<response.data.length;i++){
            this.optionsCities.push({label:response.data[i].name,value:response.data[i].id,id:response.data[i].id});
          }
        });
      }
    },
    getPaymentMethods(){
      this.$crud.index("apiRoutes.qcommerce.paymentMethods", {}).then(response => {
        this.paymentMethods=response.data;
      })
    },
    getShippingMethods(){
      this.$crud.index("apiRoutes.qcommerce.shippingMethods", {}).then(response => {
        this.shippingMethods=response.data;
      })
    },
    updateCart(product){
      var params={
        cart_id:this.cart.id,
        product_id:product.productId,
        quantity:product.quantity.value
      };
      this.$crud.update("apiRoutes.qcommerce.cartProducts", product.id, params).then(response => {
        this.$alert.success({message: "Producto actualizado correctamente.", pos: 'bottom'})
        this.getCart();

      });
    },
    deleteProductCart(product){
      this.$crud.delete("apiRoutes.qcommerce.cartProducts", product.id, {}).then(response => {
        this.$alert.success({message: "Producto eliminado correctamente.", pos: 'bottom'})
      });
      this.getCart();
    },
    getCart(){
      if(!this.storeId){
        this.$alert.error({message: "Se ha producido un error al intentar ingresar a esta ventana", pos: 'bottom'})
        this.$router.push({ name: 'home'});
      }
      var carts=this.$q.localStorage.getItem("carts");
      if(carts){
        for (var i=0;i<carts.length;i++){
          if(carts[i].storeId==this.storeId){
            this.cartId=carts[i].id;
            break;
          }//if
        }//for
        console.log('Carro de compras y storeId: '+this.storeId);
        console.log(carts);
        console.log(this.cartId);
        if(!this.cartId){
          this.$alert.error({message: "Se ha producido un error al intentar obtener el carro de compras", pos: 'bottom'})
          this.$router.push({ name: 'home'});
        }else{
          this.$crud.show("apiRoutes.qcommerce.cart", this.cartId, {}).then(response => {
            this.cart=response.data;
            if(this.cart.products.length==0){
              //Redirect back
              this.$router.go(-1);
              this.$alert.error({message: "Debes agregar al menos un producto al carrito de compras", pos: 'bottom'})
            }
          })
        }//else
      }
    }
  }
}
</script>
<style lang="stylus">
</style>
