<template>
	<q-page class="bg-fondo-q store-page layout-padding">
		<div class="q-container">
			<div class="row q-mb-md">
				<div class="text-h5 text-primary q-mb-xs font-family-secondary">
					Seguidores
				</div>
			</div>
			<div class="row">
				<q-card class="rounded-md q-mb-xl full-width q-py-md">
					<q-card-section class="q-px-xl form-general">
						
						<div class="row flex justify-end">
							<div class="col-md-6">
								
								<q-input
									rounded
									dense
									placeholder="Búsqueda"
									outlined
									@keydown.enter="searchNewUsers()"
									v-model="search">
									<template v-slot:append>
										<q-btn
											rounded
											dense
											outlined
											flat
											v-if="search !== ''"
											icon="close"
											@click="clearSeach"
											class="search" />
									</template>
									<template v-slot:after>
										<q-btn
											round
											color="primary"
											icon="search"
											@click="searchNewUsers"/>
									</template>
								</q-input>
							</div>
						</div>
						
						<div class="row q-col-gutter-lg q-my-md">
							<div v-for="(user, key) in users" :key="key" class="col-xs-12 col-sm-6">
								<q-card class="flat bordered">
									<q-card-section>
										<div class="row text-center card-seguidor">
											<div class="col-xs-12 col-md-12 col-lg-4">
												<q-avatar size="100px">
													<img :src="user.mediumImage">
												</q-avatar>
											</div>
											<div class="col-xs-12 col-md-12  col-lg-8">
												<div class="text-h6">{{user.fullName}}</div>
												<div class="text-subtitle2 text-tertiary">Nivel: Club de Conocidos</div>
												<div class="text-subtitle2">
													<q-icon name="fas fa-envelope" color="primary"/>
													{{user.email}}
												</div>
											</div>
										</div>
									</q-card-section>
									<q-separator/>
									<q-card-section class="q-pa-none">
										<div class="link-profile text-right">
											<q-btn
												flat
												color="primary"
												class="text-bold"
												label="+ Ver Perfil"
												@click="openProfile(user)"/>
										</div>
									</q-card-section>
								</q-card>
							</div>
						</div>
						<infinite-loading
							class="q-pt-md"
							:identifier="infiniteId"
							v-if="showInfiniteLoading"
							spinner="waveDots"
							@infinite="getUsers">
							<div slot="no-more">
								No hay mas usuarios
							</div>
							<div slot="no-results">
								No hay resultador
							</div>
							<div slot="error">
								Error
							</div>
						</infinite-loading>
					</q-card-section>
				</q-card>
				<q-dialog v-model="card.open">
					<card-user :card="card"></card-user>
				</q-dialog>
			</div>
		</div>
	</q-page>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading'
  import cardUser from '@imagina/qmarketplace/_components/info/cardUser'
  
	export default {
    components:{
      InfiniteLoading,
      cardUser
    },
	  data () {
	    return {
        showInfiniteLoading: false,
        users: [],
        page: 1,
        take: 20,
        lastPage: 1,
        search: '',
        infiniteId: +new Date(),
        card: {
          open: false,
          info: [],
          stars: 2,
        },
	    }
	  },
		mounted() {
	    this.$nextTick( () => {
        setTimeout( () => (
          this.showInfiniteLoading = true
        ) , 500)
	    })
    },
		methods:{
	    getUsers($state){
        let params = {
          refresh: true,
          params: {
            filter: {
              search: this.search
            },
            page: this.page,
            take: this.take,
          }
        }
        this.$crud.index('apiRoutes.quser.users', params).then(response => {
          if (response.data.length) {
            this.page += 1;
            this.users.push(...response.data);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
	    },
      searchNewUsers(){
        this.page = 1;
        this.users = [];
        this.infiniteId += 1;
      },
			clearSeach(){
	      this.search = ''
				this.searchNewUsers()
			},
      openProfile(result) {
        this.card.open = true;
        this.card.info = result;
        this.card.info.fields = this.$helper.convertToFrontField(this.card.info.fields);
      }
		}
  }
</script>

<style lang="stylus">

</style>
