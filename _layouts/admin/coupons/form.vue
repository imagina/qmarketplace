<template>
  <div id="pageId" class="q-layout-page layout-padding">

    <div class="relative-position q-mb-lg backend-page">

      <q-form @submit="$route.params.id ? updateItem() : createItem()" ref="formContent"
      @validation-error="$alert.error($tr('ui.message.formInvalid'))"
      class="row q-col-gutter-x-md" autocomplete="off">

      <!-- First box -->
      <div class="col-md-12 q-pa-md ">
        <div class="box">
          <p class="caption q-mb-sm">Código de descuento</p>
          <q-btn class="float-right" @click="generateCoupon()" size="sm" color="primary">
            Generar código
            <!-- <q-tooltip>Generar Cpodigo</q-tooltip> -->
          </q-btn>
          <q-input rounded outlined v-model="form.code"
          :rules="[val => !!val || $tr('ui.message.fieldRequired')]" />
        </div>
      </div>

      <!-- Second box -->
      <div class="col-md-12 q-pa-md ">
        <div class="box">
          <p class="caption q-mb-sm">Tipos</p>
          <q-option-group
          :options="[
          {label: 'Cantidad Fija', value: '0'},
          {label: 'Porcentaje', value: '1'},
          ]"
          type="radio"
          v-model="form.typeDiscount"
          />
        </div>
      </div>

      <!-- Third box -->
      <div class="col-md-12 q-pa-md ">
        <div class="box">
          <p class="caption q-mb-sm">Valor</p>


          <q-input rounded outlined placeholder="Valor de descuento" color="teal" outlined v-model="form.discount" >
                  <template v-slot:append>
                    %
                    <!-- <q-avatar>
                      <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
                    </q-avatar> -->
                  </template>
          </q-input>

          <hr>

          <strong>
            Se aplica a
          </strong>
          <q-option-group
          :options="[
              {label: 'Pedido completo', value: 1},
              {label: 'Productos específicos', value: 2},
              {label: 'Colecciones específicas', value: 3},
            ]"
          type="radio"
          v-model="form.type"
          />

        </div>
      </div>

      <!-- 4th box -->
      <div class="col-md-12 q-pa-md ">
        <div class="box">
          <p class="caption q-mb-sm">Período de duración</p>

          <q-input dense mask="date" bg-color="white" v-model="form.dateStart" color="primary"
                   :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                   :label="`${$tr('qcommerce.layout.form.dateStart')}*`"
                   rounded outlined placeholder="YYYY/MM/DD">
            <template v-slot:append>
              <q-icon name="fas fa-calendar-day"/>
              <q-popup-proxy ref="qDateStart" transition-show="scale" transition-hide="scale">
                <q-date v-model="form.dateStart" @input="$refs.qDateStart.hide()"/>
              </q-popup-proxy>
            </template>
          </q-input>

          <q-input dense mask="date" bg-color="white" v-model="form.dateEnd" color="primary"
                   :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                   :label="`${$tr('qcommerce.layout.form.dateEnd')}*`"
                   rounded outlined placeholder="YYYY/MM/DD">
            <template v-slot:append>
              <q-icon name="fas fa-calendar-day"/>
              <q-popup-proxy ref="qDateEnd" transition-show="scale" transition-hide="scale">
                <q-date v-model="form.dateEnd" @input="$refs.qDateEnd.hide()"/>
              </q-popup-proxy>
            </template>
          </q-input>

        </div>
      </div>

      <q-page-sticky
      position="bottom-right"
      class=" btn-arrow-send-pink"
      :offset="[18, 18]">
      <!--Update button-->
      <q-btn class="bg-primary text-white" v-if="$route.params.id"  :loading="loading"
      icon="fas fa-edit" :label="$tr('ui.label.update')" type="submit"/>
      <!--Save button-->
      <q-btn class="bg-primary text-white" v-else  :loading="loading" icon="fas fa-edit"
      label="Guardar" type="submit"/>
    </q-page-sticky>
  </q-form>
  <inner-loading :visible="loading"/>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        loading: false,
        types: [],
        products: {
          data: [],
          loading: false
        },
        categories: {
          data: [],
          loading: false
        },
        form: {
          id: '',
          code: '',
          type: null,
          storeId: this.$store.state.qmarketplaceStores.storeSelected,
          categoryId: null,
          productId: null,
          customerId: null,
          discount: '',
          typeDiscount: null,
          logged: 1,
          shipping: 1,
          dateStart: '',
          dateEnd: '',
          quantityTotal: 100,
          quantityTotalCustomer: 1,
          status: 1,
        },
      }
    },
    watch: {
      'form.type': function (val) {
        this.form.categoryId = null
        this.form.productId = null
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.initForm();
      })
    },
    methods: {
      initForm () {
        this.getCategories()
        this.getProducts()
        if (this.$route.params.id) this.getData()
      },
      getData () {
        this.loading = true
        let params = {
          refresh: true,
          params: {}
        }
        this.$crud.show('apiRoutes.qcommerce.coupons', this.$route.params.id, params)
          .then(response => {
            Object.assign(this.form, { ...response.data })
            setTimeout(() => {
              this.form.productId = response.data.productId
              this.form.categoryId = response.data.categoryId
              this.loading = false
            }, 1000)
          }).catch(error => {
          this.$alert.error({ message: this.$tr('ui.message.errorRequest'), pos: 'bottom' })
          this.loading = false
        })
      },
      getCategories () {
        this.categories.loading = true
        let params = {
          refresh: true,
          params: {
            include: 'parent'
          },
        }
        this.$crud.index('apiRoutes.qcommerce.categories', params)
          .then(response => {
            this.categories.data = this.$array.tree(response.data)
            this.categories.loading = false
          })
          .catch(error => {
            this.$alert.error({ message: this.$tr('ui.message.errorRequest'), pos: 'bottom' })
            this.categories.loading = false
          })
      },
      getProducts () {
        this.products.loading = true
        let params = {
          refresh: true,
          params: {},
        }
        this.$crud.index('apiRoutes.qcommerce.products', params)
          .then(response => {
            this.products.data = response.data.map(item => {
              return {
                id: item.id,
                label: item.name,
              }
            })
            this.products.loading = false
          })
          .catch(error => {
            this.$alert.error({ message: this.$tr('ui.message.errorRequest'), pos: 'bottom' })
            this.products.loading = false
          })
      },
      createItem () {
        this.loading = true;
        this.$crud.create('apiRoutes.qcommerce.coupons', this.form)
          .then(response => {
            this.loading = false
            this.$router.push({ name: 'qmarketplace.admin.coupons.index' })
            this.$alert.success({ message: `${this.$tr('ui.message.recordCreated')} ID: ${response.data.id}` })
          })
          .catch(error => {
            this.loading = false
            this.$alert.error({ message: this.$tr('ui.message.recordNoCreatde'), pos: 'bottom' })
          })
      },
      updateItem () {
        this.loading = true
        this.$crud.update('apiRoutes.qcommerce.coupons', this.form.id, this.form)
          .then(response => {
            this.loading = false
            this.$router.push({ name: 'qmarketplace.admin.coupons.index' })
            this.$alert.success({ message: `${this.$tr('ui.message.recordUpdated')}` })
            this.initForm()
          })
          .catch(error => {
            this.loading = false
            this.$alert.error({ message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom' })
          })
      },
      generateCoupon () {
        this.form.code = this.makeCouponCode(20).toUpperCase()
      },
      makeCouponCode (length = 10) {
        let result = ''
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let charactersLength = characters.length
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
      },
    }
  }
</script>
