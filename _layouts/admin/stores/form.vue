<template>
  <q-page class="bg-fondo-q store-page layout-padding">

      <div class="q-container" style="padding-top: 40px;">
        <div class="row gutter-md">
          <div class="col-12">

            <q-card  class="rounded-md bg-white w-100 q-mb-xl">

              <!-- <q-card-actions  align="end" no-caps class="q-pa-lg">
                <q-btn class="rounded-sm  font-family-secondary" no-caps color="primary" icon="fas fa-eye" label="Vista previa"/>
              </q-card-actions> -->

              <q-card-section class="q-px-xl q-pb-xl form-general">

                <div class="q-headline text-primary q-mb-xs capitalize">{{company.name}}</div>
                <div class="q-subheading text-secondary">
                  Completa la configuración de tu tienda, ¡es muy fácil!
                </div>
                <div class="q-my-lg line-grey w-100"></div>


                <div class="row gutter-lg">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">

                    <q-field class="q-mb-lg" label="Agregar Logo" stack-label>
                      <!-- <p class="caption q-mb-md">Agregar Logo
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question" >
                          <q-tooltip>
                            Agrega una imagen como logo de la tienda
                          </q-tooltip>
                        </q-btn>
                      </p> -->
                      <upload-media
                      v-model="company.mediasSingle"
                      entity="Modules\Marketplace\Entities\Store"
                      :entity-id="storeId ? storeId : null"
                      zone='mainimage'
                      />
                    </q-field>

                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                     <q-field class="q-mb-lg" label="Agregar imágenes para slider" stack-label>
                        <!-- <p class="caption q-mb-md">Agregar imágenes para slider
                          <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Agrega imágenes promociones de tu tienda
                          </q-tooltip>
                        </q-btn>
                        </p> -->

                        <upload-media
                          multiple
                          v-model="company.mediasMulti"
                          entity="Modules\Marketplace\Entities\Store"
                          :entity-id="storeId ? storeId : null"
                          zone='slider'
                        />

                      </q-field>
                  </div>
                </div>

                <div class="q-mt-lg q-mb-xl line-grey w-100"></div>

                <div class="row gutter-lg">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    <q-field class="q-mb-xl" label="Nombre de tu empresa" stack-label>
                      <!-- <p class="caption q-mb-sm">Nombre de tu empresa
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Ingresa el nombre de tu tienda
                          </q-tooltip>
                        </q-btn>
                      </p> -->
                      <q-input v-model="company.name" placeholder="WAFFEE" />
                    </q-field>
                    <q-field class="q-mb-xl" label="Slogan" stack-label>
                      <!-- <p class="caption q-mb-sm">Slogan
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Agrega un slogan para tu tienda
                          </q-tooltip>
                        </q-btn>
                      </p> -->
                      <q-input v-model="company.slogan" placeholder="Lorem Ipsum" />
                    </q-field>

                    <!--Description-->
                    <q-field class="q-mb-xl" label="Descripción de la empresa" stack-label>
                      <!-- <p class="caption q-mb-sm">Descripción de la empresa
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Ingresa una breve descripción de tu empresa
                          </q-tooltip>
                        </q-btn>
                      </p> -->
                      <q-editor v-model="company.description" class="full-width"
                      :toolbar="editorText.toolbar" content-class="text-grey-9" toolbar-text-color="grey-9"/>
                    </q-field>
                    <q-field  class="q-mb-xl" label="Dirección de la empresa" stack-label>
                      <!-- <p class="caption q-mb-sm">Dirección de la empresa
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Ingresa la dirección de tu empresa
                          </q-tooltip>
                        </q-btn>
                      </p> -->
                      <q-input  v-model="company.address" placeholder="Lorem Ipsum"
                        :before="[{ icon: 'fas fa-map-marker-alt'}]" />
                    </q-field>
                    <q-field  class="q-mb-xl" label="Url Mapa" stack-label>
                      <!-- <p class="caption q-mb-sm">Url mapa
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Ingresa la dirección de tu empresa vía google maps
                          </q-tooltip>
                        </q-btn>
                      </p> -->
                      <q-input  v-model="company.options.map" placeholder="google maps"  />
                    </q-field>
                    <q-field  class="q-mb-xl" label="Horario de atención" stack-label>
                      <!-- <p class="caption q-mb-sm">Horario de atención
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Aquí puedes ingresar tu horario de atención al público
                          </q-tooltip>
                        </q-btn>
                      </p> -->
                      <q-input  v-model="company.schedules[0]" placeholder="Lunes - Sabado 7am - 6pm"
                        :before="[{ icon: 'far fa-clock'}]" />
                    </q-field>
                    <q-field  class="q-mb-xl" label="Enlace de youtube" stack-label>
                      <!-- <p class="caption q-mb-sm">Enlace de youtube
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Aquí puedes ingresar el link de un video promocional
                          </q-tooltip>
                        </q-btn>
                      </p> -->
                      <q-input  v-model="company.options.youtube" placeholder="youtube.com"  />
                    </q-field>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    <q-field class="q-mb-xl" label="Categoría" stack-label>
                      <!-- <p class="caption q-mb-xs">Categoría
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Selecciona las categorías a las que pertenece tu empresa
                          </q-tooltip>
                        </q-btn>
                      </p> -->
                      <tree-select
                        :clearable="false"
                        :append-to-body="true"
                        class="q-mb-md"
                        :options="categoryOptions"
                        value-consists-of="BRANCH_PRIORITY"
                        v-model="company.categories"
                        placeholder=""
                      />
                      <!-- <q-select multiple v-model="company.categories" :options="categoryOptions" /> -->
                    </q-field>

                    <q-field class="q-mb-xl" label="Barrio" stack-label>
                      <!-- <p class="caption q-mb-sm">Barrio
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Selecciona el barrio al que pertenece tu empresa
                          </q-tooltip>
                        </q-btn>
                      </p> -->
                      <q-input v-model="company.neighborhood" placeholder="Lorem Ipsum" />
                    </q-field>

                    <!-- <q-field  class="q-mb-xl">
                      <p class="caption q-mb-sm">Barrio
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Some text as content of Tooltip
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-select v-model="company.neighborhood" :options="sectorOptions" />
                    </q-field> -->
                    <q-field  class="q-mb-xl" label="Provincia" stack-label>
                      <!-- <p class="caption q-mb-sm">Provincia
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Selecciona la provincia a la que pertenece tu empresa
                          </q-tooltip>
                        </q-btn>
                      </p> -->
                      <tree-select
                        :clearable="false"
                        :append-to-body="true"
                        class="q-mb-md"
                        :options="provincesOptions"
                        value-consists-of="BRANCH_PRIORITY"
                        v-model="company.province_id"
                        @input="val => { getCities() }"
                        placeholder=""
                      />
                      <!-- <q-select @input="val => { getCities() }" v-model="company.province_id" :options="provincesOptions" /> -->
                    </q-field>

                    <q-field  class="q-mb-xl" label="Ciudad" stack-label>
                      <!-- <p class="caption q-mb-sm">Cuidad
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Selecciona la ciudad a la que pertenece tu empresa
                          </q-tooltip>
                        </q-btn>
                      </p> -->
                      <tree-select
                        :clearable="false"
                        :append-to-body="true"
                        class="q-mb-md"
                        :options="cityOptions"
                        value-consists-of="BRANCH_PRIORITY"
                        v-model="company.city_id"
                        placeholder=""
                      />
                      <!-- <q-select v-model="company.city_id" :options="cityOptions" /> -->
                    </q-field>
                    <q-field  class="q-mb-xl" label="Correo electrónico" stack-label>
                      <!-- <p class="caption q-mb-sm">Correo electrónico
                        <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Ingresa un correo electrónico para el contacto cliente - tienda
                          </q-tooltip>
                        </q-btn>
                      </p> -->
                      <q-input v-model="company.options.email" placeholder="info@lorem.com"
                        :before="[{ icon: 'fas fa-envelope'}]" />
                    </q-field>
                    <q-field class="q-mb-lg" v-if="company.gallery.length>0"  label="Galería de la empresa" stack-label>
                        <!-- <p class="caption q-mb-md">Galeria de la empresa
                          <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                          <q-tooltip>
                            Ingresa múltiples imágenes promocionales de tu empresa
                          </q-tooltip>
                        </q-btn>
                        </p> -->

                        <upload-media
                          multiple
                          v-model="company.mediasMulti"
                          entity="Modules\Marketplace\Entities\Store"
                          :entity-id="storeId ? storeId : null"
                          zone='gallery'
                        />

                      </q-field>

                  </div>
                </div>


              </q-card-section>
            </q-card>

            <q-card class="rounded-md bg-white w-100 q-mb-xl">

              <q-card-section class="q-px-xl form-general">

                <q-field class="q-my-lg"  label="Redes sociales de tu tienda" stack-label>
                  <!-- <p class="caption q-mb-lg">Redes sociales de tu tienda
                    <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                      <q-tooltip>
                        Puedes seleccionar las redes sociales disponibles de tu empresa
                      </q-tooltip>
                    </q-btn>
                  </p> -->

                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-7">
                      <div v-for="(item,index) in company.social" :key="index">
                        <div class="row items-center q-mb-md">
                          <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                            <q-checkbox left-label v-model="item.active" :label="item.name+':'">
                              <q-icon class="q-mx-md" :color="item.color" :name="item.icon" />
                            </q-checkbox>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
                            <q-input v-model="item.url" placeholder="@lorem_ipsom" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </q-field>
              </q-card-section>
            </q-card>

            <q-card class="rounded-md bg-white w-100 q-mb-xl">
              <q-card-section class="q-px-xl form-general">

                <q-field class="q-my-lg" label="¿Que metodos de pago aceptas?" stack-label>
<!--
                  <p class="caption q-mb-lg">¿Que metodos de pago aceptas?
                    <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                      <q-tooltip>
                        Puedes seleccionar los métodos de pago disponibles en tu empresa
                      </q-tooltip>
                    </q-btn>
                  </p> -->

                  <div v-for="(item,index) in company.options.payment_methods" :key="index">
                    <div class="row items-center q-py-md border-bottom-gray">
                      <div class="col">
                        <q-checkbox v-model="item.active">
                          <span class="q-px-sm">{{item.name}}</span>
                        </q-checkbox>
                      </div>
                      <div class="col-auto">
                        <q-icon color="faded" name="fas fa-edit" size="md" />
                      </div>
                    </div>
                  </div>

                </q-field>
              </q-card-section>
            </q-card>

            <q-card class="rounded-md bg-white w-100 q-mb-lg">
              <q-card-section class="q-px-xl form-general">

                <q-field class="q-my-lg" label="¿Cuales son los medotos de envío?" stack-label>
<!--
                  <p class="caption q-mb-lg">¿Cuales son los medotos de envío?
                    <q-btn round class="no-shadow" size="6px" color="tertiary" icon="fas fa-question">
                      <q-tooltip>
                        Puedes seleccionar los métodos de envío disponibles en tu empresa
                      </q-tooltip>
                    </q-btn>
                  </p> -->

                  <div v-for="(item,index) in company.options.shipping_methods" :key="index">
                    <div class="row items-center q-py-md border-bottom-gray">
                      <div class="col">
                        <q-checkbox v-model="item.active">
                          <span class="q-px-sm">{{item.name}}</span>
                        </q-checkbox>
                      </div>
                      <div class="col-auto">
                        <q-icon color="faded" name="fas fa-edit" size="md" />
                      </div>
                    </div>
                  </div>

                </q-field>
              </q-card-section>
            </q-card>

          </div>

          <div class="col-12 text-right">
              <q-field class="q-mb-xl">
                <q-btn class="bg-primary text-white btn-arrow-send-pink" @click="createStore()">Crear</q-btn>
              </q-field>
          </div>

        </div>
      </div>

  </q-page>
</template>
<script>
import uploadMedia from 'src/components/qmedia/form'


export default {
  name: 'PageTienda',
  components: {
    uploadMedia,
  },
  data() {
    return {
      stores:[],
      storesOptions:[],
      storeId:false,
      configName: 'apiRoutes.qmarketplace.store',
      lang: this.$i18n.locale,
      userId: this.$store.state.quserAuth.userId,
      company: {
        name:'Nombre de tienda',
        slogan: '',
        description: '',
        user_id: this.$store.state.quserAuth.userId,
        address: '',
        schedules: [
          ""
        ],
        city: '',
        city_id: 0,
        province_id: 0,
        neighborhood: '',
        categories:[],
        logo: {
          path:'/statics/img/fondo.jpg',
          mimeType:''
        },
        category: '',
        mediasSingle: {},
        mediasMulti: {},
        slider: [
          {
            path:'/statics/img/fondo.jpg',
            mimeType:''
          },{
            path:'/statics/img/fondo.jpg',
            mimeType:''
          }
        ],
        gallery: [
          {
            path:'/statics/img/fondo.jpg',
            mimeType:''
          },{
            path:'/statics/img/fondo.jpg',
            mimeType:''
          }
        ],
        options:{
          youtube: '',
          email: '',
          map: '',
          theme_config:{
            color_primary:"#4CAF50",
            color_secondary:"#E91E63",
            background:"#FFFFFF",
          },
          payment_methods: [
            {
              name: 'Contraentrega',
              active: false
            },
            {
              name: 'Paypal',
              active: false
            },
            {
              name: 'Entrega de Tienda',
              active: false
            },
            {
              name: 'PayU',
              active: false
            }
          ],
          shipping_methods: [
            {
              name: 'Recoger en Tienda',
              active: false
            },
            {
              name: 'Servicio a Domicilio',
              active: false
            },
            {
              name: 'A convenir',
              active: false
            }
          ]
        },
        social: [
          {
            icon: 'fab fa-twitter',
            name: 'Twitter',
            color: 'blue-4',
            url: '',
            active: false
          },
          {
            icon: 'fab fa-facebook',
            name: 'Facebook',
            color: 'indigo',
            url: '',
            active: false
          },
          {
            icon: 'fab fa-instagram',
            name: 'Instagram',
            color: 'primary',
            url: '',
            active: false
          }
        ]
      },
      showingPrimary: false,
      showingSecondary: false,
      showingBackground: false,
      searchModel: '',
      sectorOptions: [
        // {
        //   label: 'Barrios',
        //   value: '1'
        // },
        // {
        //   label: 'Barrioswert',
        //   value: '2'
        // }
      ],
      cityOptions: [],
      provincesOptions: [],
      categoryOptions: [
        // {
        //   label: 'Comida',
        //   value: '1',
        //   id: '1',
        //   children: [
        //     { label: 'Restaurantes', value: '2' , id: '2' },
        //     { label: 'Comidas rápidas', value: '3', id: '3'  },
        //     { label: 'Panaderías', value: '4', id: '4' }
        //   ]
        // },
        // {
        //   label: 'Good service (disabled node)',
        //   value: '2',
        //   id: '2',
        //   children: [
        //     { label: 'Prompt attention', value: '2', id: '2' },
        //     { label: 'Professional waiter', value: '3', id: '3' }
        //   ]
        // },
        // {
        //   label: 'Pleasant surroundings',
        //   value: '3',
        //   id: '3',
        //   children: [
        //     { label: 'Happy atmosphere', value: '2', id: '2' },
        //     { label: 'Good table presentation', value: '3', id: '3' },
        //     { label: 'Pleasing decor', value: '4', id: '4' }
        //   ]
        // }
      ],
      statusOptions: [
        {
          label: 'Habilitado',
          value: '1', id: '1'
        },
        {
          label: 'Inhabilitado',
          value: '2', id: '2'
        }
      ],
      theme: {
        id: null,
        image: '/statics/img/product.jpg',
        primary: '#4CAF50',
        secondary: '#E91E63',
        background: '#FFFFFF'
      },
      themes_option: [
        {
          id: 1,
          name: 'Tienda personal',
          mainImage:{
            path:'/statics/img/product.jpg',
            mimeType:'jpg'
          }
        },
        {
          id: 2,
          name: 'Tienda corporativa',
          mainImage:{
            path:'/statics/img/pregunta.jpg',
            mimeType:'jpg'
          }
        }
      ],
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
      product: {
        name: '',
        summary: '',
        description: '',
        image: '/statics/img/fondo.jpg',
        gallery: [
          {image:'/statics/img/fondo.jpg'},{image:'/statics/img/fondo.jpg'}
        ],
        status:'',
        category: '',
        categories:[],
        price: 0,
        stock: false,
        length: 0,
        quantity: 0,
        weight: 0,
        reference: '',
        order_min: 0,
        width: 0,
        height: 0,
        points: 0,
        active_home: false
      }
    }
  },
  methods: {
    async init(){
      if (this.$route.params.id) this.storeId = this.$route.params.id
      if (this.storeId) await this.getData()//Get data if is edit
      this.getStoreCategories();//
      this.getProvinces();//
      this.getThemes();//
    },
    //Get data item
    getData() {
      return new Promise((resolve, reject) => {
        // this.loading.page = true
        const itemId = this.$clone(this.storeId)

        if (itemId) {
          //Params
          let params = {
            refresh: true,
            params: {
              include: 'categories',
              filter: {allTranslations: true}
            }
          }
          //Request
          this.$crud.show(this.configName, itemId, params).then(response => {
            this.company = this.$clone(response.data);
            // this.loading.page = false;
            resolve(true)//Resolve
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
            // this.loading.page = false
            reject(false)//Resolve
          })
        } else {
          resolve(true)//Resolve
        }

      })
    },
    slugable: function(title) {
      var slug = "";
      // Change to lower case
      var titleLower = title.toLowerCase();
      // Letter "e"
      slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
      // Letter "a"
      slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
      // Letter "o"
      slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
      // Letter "u"
      slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
      // Letter "d"
      slug = slug.replace(/đ/gi, 'd');
      // Trim the last whitespace
      slug = slug.replace(/\s*$/g, '');
      // Change whitespace to "-"
      slug = slug.replace(/\s+/g, '-');

      return slug;
    },
    getStoreCategories(){
      //Get stores of user
      let params = {
        remember: false,
        params: {
          include: '',
          filter:{
            allTranslations: true,
          }
        }
      };//params
      this.$crud.index("apiRoutes.qmarketplace.category",params).then(response => {
        this.categoryOptions=response.data;//
        // for(var i=0;i<this.stores.length;i++){
        //   this.storesOptions.push({
        //     label:this.stores[i][this.lang].name,
        //     value:i
        //   });
        // }//for
      });

    },
    getThemes(){
      //Get stores of user
      let params = {
        remember: false,
        params: {
          include: '',
          filter:{
            allTranslations: true,
          }
        }
      };//params
      this.$crud.index("apiRoutes.qmarketplace.theme",params).then(response => {
        this.themes_option=response.data;//
        // for(var i=0;i<this.stores.length;i++){
        //   this.storesOptions.push({
        //     label:this.stores[i][this.lang].name,
        //     value:i
        //   });
        // }//for
      });

    },

    clearForm(){
      //Clear data of form create store
      this.company.name="Nombre de tienda";
      this.company.slogan="";
      this.company.description="";
      this.company.address="";
      this.company.schedules[0]="";
      this.company.options.map="";
      this.company.options.youtube="";
      this.company.categories=[];
      this.company.city="";
      this.company.city_id=null;
      this.company.province_id=null;
      this.company.neighborhood="";
      this.company.options.email="";
      this.company.mediasSingle={};
      this.company.mediasMulti={};
      this.company.logo={
        path:'/statics/img/fondo.jpg',
        mimeType:""
      };
      this.company.slider=[
        {
          path:'/statics/img/fondo.jpg',
          mimeType:''
        },{
          path:'/statics/img/fondo.jpg',
          mimeType:''
        }
      ];
      this.company.gallery=[
        {
          path:'/statics/img/fondo.jpg',
          mimeType:''
        },{
          path:'/statics/img/fondo.jpg',
          mimeType:''
        }
      ];
      this.theme.id=null;
      this.theme.primary='#4CAF50';
      this.theme.secondary='#E91E63';
      this.theme.background='#FFFFFF';

      for(var i=0;i<this.company.social.length;i++){
        this.company.social[i].active=false;
        this.company.social[i].url=null;
      }
      for(var i=0;i<this.company.options.payment_methods.length;i++){
        this.company.options.payment_methods[i].active=false;
      }
      for(var i=0;i<this.company.options.shipping_methods.length;i++){
        this.company.options.shipping_methods[i].active=false;
      }
    },
    createStore(){
      this.company[this.lang]={
        name:this.company.name,
        slogan:this.company.slogan,
        description:this.company.description,
        slug:this.slugable(this.company.name)
      };
      this.company.user_id=this.userId;
      // this.company.schedules=[this.company.schedule];
      this.$crud.create("apiRoutes.qmarketplace.store", this.company).then(response => {
        this.$alert.success({message: this.$tr('ui.message.recordCreated'), pos: 'bottom'})
      }).catch(error => {
        this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
      })
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
        this.provincesOptions=[];
        this.provincesOptions.push({label:"Selecciona una provincia",value:0,id:0});
        for(var i=0;i<response.data.length;i++){
          this.provincesOptions.push({label:response.data[i].name,value:response.data[i].id,id:response.data[i].id});
        }
      });
    },
    getCities(){
      if(this.company.province_id){
        let params = {
          remember: false,
          params: {
            include: '',
            filter:{
              allTranslations: true,
              province_id:this.company.province_id
            }
          }
        };//params
        this.$crud.index("apiRoutes.ilocations.cities",params).then(response => {
          this.cityOptions=[];
          this.cityOptions.push({label:"Selecciona una ciudad",value:0,id:0});
          for(var i=0;i<response.data.length;i++){
            this.cityOptions.push({label:response.data[i].name,value:response.data[i].id,id:response.data[i].id});
          }
        });
      }
    }


  },
  mounted(){
    this.init();
  }
}
</script>
<style lang="stylus">
/* .store-page
  .images
    .absolute-bottom-right
      bottom -5px
      right -5px
      .btn
        width 40px
        height 40px
  .q-carousel-quick-nav
    background transparent
  .border-bottom-gray
    border-bottom 1px solid #E1E1E1
  .btn-arrow-send-pink:after
    right 92px

  .card-border-right
    border-right 3px solid #E1E1E1
    padding-right 32px
    @media screen and (max-width: $breakpoint-md)
        border-right 0
        padding-right 0
  .border
    border 1px solid #E1E1E1
    box-shadow none !important
    border-radius 5px
  .border-top-contact
    border-top 1px solid #e0e0e0
  .selectStore
    border-bottom 2px solid $tertiary
    .q-input-target
      color $tertiary
      font-weight bold
      font-size 1.2rem
    .q-icon
      color $tertiary
      font-size 2rem
#listMenuAdmin
  .selected-item
    background-color $tertiary
    color #ffffff
    .q-icon
      color #ffffff !important */

</style>
