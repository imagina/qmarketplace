<template>
	<div id="pageCreateNotification"
	     class="q-layout-page row layout-padding q-container">

	</div>
</template>
<script>
	//plugins
	export default {
		props: {},
		watch: {},
		mounted() {
			this.$nextTick(function () {
			})
		},
		data() {
			return {
				//Data
				platforms: [],
				toAllUsers: true,
				usersSelected: [],

				btnLoading: false,
				filterUsersContent: false,
				loading: true
			}
		},
		methods: {}
	}
</script>
<style lang="stylus">
	#formNotification
		border 1px solid $grey-4

		.fields
			padding 5px 15px

		.q-collapsible-sub-item
			padding 8px 0
</style>
