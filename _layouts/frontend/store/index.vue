<template>
   <q-page class="bg-fondo">

      <pre>
         {{category}}
      </pre>
       <q-card class="shadow-no banner-category" style="max-height: 250px; overflow: hidden">
         <q-img
                 :src="category.mainImage.path"
                 :ratio="21/9"
         />
         <div class="absolute-center q-mt-xl">
            <h1 class="title-label q-my-none bg-secondary text-white text-center text-uppercase">
               <div>{{category.title}}</div>
            </h1>
         </div>
      </q-card>
      <div>
         <div class="row gutter-xl">
            <div class="col-12">
               <p class="text-center text-h6 q-mx-lg">{{category.description}}</p>
            </div>
         </div>
         <div class="row q-pa-lg">
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3" v-for="store in category.stores" :key="store.id">
               <store :store="store"></store>
            </div>
         </div>
      </div>

      <div class="q-container banner q-py-xl text-center">
         <img class="full-width" src="/statics/img/publicidad2-100.jpg" alt="banner">
      </div>

   </q-page>
</template>
<script>
   import store from 'src/components/themes/store'
   export default {
      preFetch({store, currentRoute, previousRoute, redirect, ssrContext}) {
         return new Promise(async resolve => {
            let category = currentRoute.params.slug || false
            console.log(currentRoute)
            await store.dispatch('qcrudMaster/SHOW', {
               indexName: `marketplace-categories-${category}`,
               criteria: category,
               apiRoute: 'apiRoutes.qmarketplace.category',
               requestParams: {refresh: true, params: {include: 'stores'}}
            })
            resolve(true)
         })
      },
      components: {
         store
      },
      meta() {
         let routetitle = this.$route.params.slug || 'Tiendas'
         let siteName = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name')
         let siteDescription = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-description')
         let iconHref = this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::favicon').path
         //Set category data
         let category = this.$store.state.qcrudMaster.show[`marketplace-categories-${routetitle}`].data
         if (category) {
            routetitle = category.title
            siteDescription = category.summary
         }
         return {
            title: `${routetitle.charAt(0).toUpperCase() + routetitle.slice(1)} | ${siteName}`,
            meta: {
               description: {name: 'description', content: (siteDescription || siteName)},
            },
         }
      },
      data() {
         return {
            category: this.$store.state.qcrudMaster.show[`marketplace-categories-${this.$route.params.slug}`].data,
         }
      }
   }
</script>