<template>
  <div style="width: 100%;">
    <q-carousel
            arrows
            animated
            v-model="slide"
            infinite
            autoplay
            height="600px"
    >
      <q-carousel-slide v-for="(slide,index) in gallery" :key="'slide'+index" :name="'slide'+index"  :img-src="slide.path">
        <div v-if="storeName" class="absolute-bottom custom-caption">
          <div v-if="storeName" class="text-h2">{{storeName}}</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
    export default {
        props:{
            gallery:{
                type: Array,
                default: []
            },
            storeName:{
              type:String,
              default:""
            }
        },
        data() {
            return {
                loading: false,
                position: {},
                slide: 1
            }
        },
        created() {
            // this.getBanner()
        },
        methods:{
            // getBanner(){
            //     let params = {
            //         params: {
            //             filter:{
            //                 field: 'system_name'
            //             }
            //         }
            //     }
            //     this.loading = true
            //     this.$crud.show('apiRoutes.qslider.sliders', this.systemName, params).then( response => {
            //         this.position = response.data
            //         // console.log( this.position)
            //
            //         this.loading = false
            //     }).catch( error => {
            //         this.$alert.error({ message: this.$tr('ui.message.errorRequest'), pos: 'bottom' })
            //         this.loading = false
            //     })
            // },
        }
    }
</script>
<style lang="stylus">
</style>
